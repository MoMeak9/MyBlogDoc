export type OfflineSearchState = {
  phase:
    | "checking"
    | "available"
    | "downloading"
    | "ready"
    | "error"
    | "unsupported";
  completed?: number;
  total?: number;
  totalBytes?: number;
  version?: string;
  hasDownload?: boolean;
};
type Version = { version: string; totalBytes?: number; filesCount?: number };
type Reply = {
  type: string;
  ok?: boolean;
  state?: OfflineSearchState;
  error?: string;
};

/** The full search pack is downloaded only through the returned download action. */
export function createOfflineSearch(
  base: string,
  onState: (state: OfflineSearchState) => void,
) {
  let disposed = false;
  let lastState = "";
  let latestVersion: Version | undefined;
  let registration: ServiceWorkerRegistration | undefined;
  let pendingDownload: Promise<void> | undefined;
  let checkVersion = 0;
  let operationVersion = 0;
  let hasDownload = false;
  let removing = false;
  const events = new AbortController();
  const channels = new Set<() => void>();
  const emit = (state: OfflineSearchState) => {
    if (disposed) return;
    if (typeof state.hasDownload === "boolean") hasDownload = state.hasDownload;
    const output = { ...state, hasDownload };
    const serialized = JSON.stringify(output);
    if (lastState !== serialized) {
      lastState = serialized;
      onState(output);
    }
  };
  const unavailable = () => {
    emit({ phase: "unsupported" });
    return {
      download: async () => {
        throw new Error(
          "Offline search is unavailable in this browser context.",
        );
      },
      remove: async () => {
        throw new Error(
          "Offline search is unavailable in this browser context.",
        );
      },
      dispose: () => {
        disposed = true;
      },
    };
  };
  if (
    !window.isSecureContext ||
    !("serviceWorker" in navigator) ||
    !("caches" in window)
  )
    return unavailable();
  let scope: URL;
  try {
    if (!base.startsWith("/") || base.startsWith("//")) return unavailable();
    scope = new URL(base.endsWith("/") ? base : `${base}/`, location.origin);
    if (
      scope.origin !== location.origin ||
      scope.search ||
      scope.hash ||
      !location.pathname.startsWith(scope.pathname)
    )
      return unavailable();
  } catch {
    return unavailable();
  }
  const workerUrl = new URL("search-sw.js", scope).href;
  const ownWorker = (worker: ServiceWorker | null | undefined) =>
    worker?.scriptURL === workerUrl;

  const activeWorker = (
    reg: ServiceWorkerRegistration,
  ): Promise<ServiceWorker> => {
    const worker = [reg.installing, reg.waiting, reg.active].find(
      (item) => ownWorker(item) && item?.state !== "redundant",
    );
    if (!worker || !ownWorker(worker))
      return Promise.reject(
        new Error("Offline search worker could not start."),
      );
    if (worker.state === "activated") return Promise.resolve(worker);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => finish(new Error("Offline search worker startup timed out.")),
        25000,
      );
      const finish = (error?: Error) => {
        clearTimeout(timer);
        worker.removeEventListener("statechange", changed);
        if (error) reject(error);
        else resolve(worker);
      };
      const changed = () => {
        if (worker.state === "activated") finish();
        else if (worker.state === "redundant")
          finish(new Error("Offline search worker was replaced."));
      };
      worker.addEventListener("statechange", changed);
      changed();
    });
  };
  const workerPromise = (async () => {
    const existing = await navigator.serviceWorker.getRegistration(scope.href);
    try {
      registration = await navigator.serviceWorker.register(workerUrl, {
        scope: scope.pathname,
        updateViaCache: "none",
      });
    } catch (error) {
      if (existing?.scope !== scope.href || !ownWorker(existing.active))
        throw error;
      registration = existing;
    }
    return activeWorker(registration);
  })();

  const send = async (type: string, detail: Record<string, unknown> = {}) => {
    const started = await workerPromise;
    const worker = registration ? await activeWorker(registration) : started;
    if (disposed) return undefined;
    return new Promise<OfflineSearchState | undefined>((resolve, reject) => {
      const channel = new MessageChannel();
      let timer: ReturnType<typeof setTimeout>;
      const cleanup = () => {
        clearTimeout(timer);
        channel.port1.close();
        channels.delete(cancel);
      };
      const cancel = () => {
        cleanup();
        resolve(undefined);
      };
      const heartbeat = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          cleanup();
          reject(new Error("Offline search worker stopped responding."));
        }, 90000);
      };
      channels.add(cancel);
      channel.port1.onmessage = (event: MessageEvent<Reply>) => {
        const message = event.data;
        if (message.type === "OFFLINE_SEARCH_PROGRESS") {
          heartbeat();
          if (message.state) emit(message.state);
          return;
        }
        if (message.type !== "OFFLINE_SEARCH_REPLY") return;
        cleanup();
        if (message.ok) resolve(message.state);
        else
          reject(
            new Error(message.error || "Offline search operation failed."),
          );
      };
      heartbeat();
      worker.postMessage({ type, ...detail }, [channel.port2]);
    });
  };
  const readVersion = async (): Promise<Version | undefined> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(new URL("search-version.json", scope), {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) return undefined;
      const value = (await response.json()) as Version;
      return typeof value.version === "string" &&
        /^[\w.-]{1,128}$/.test(value.version)
        ? value
        : undefined;
    } catch {
      return undefined;
    } finally {
      clearTimeout(timer);
    }
  };
  const versionFields = (version?: Version) => ({
    ...(version ? { version: version.version } : {}),
    ...(Number.isSafeInteger(version?.totalBytes)
      ? { totalBytes: version!.totalBytes }
      : {}),
    ...(Number.isSafeInteger(version?.filesCount)
      ? { total: version!.filesCount }
      : {}),
  });
  const refresh = async () => {
    const check = ++checkVersion;
    emit({ phase: "checking" });
    try {
      const [state, version] = await Promise.all([
        send("OFFLINE_SEARCH_STATUS"),
        readVersion(),
      ]);
      if (disposed || check !== checkVersion || !state) return;
      latestVersion = version ?? latestVersion;
      if (
        state.phase === "ready" &&
        version &&
        state.version !== version.version
      )
        emit({
          phase: "available",
          hasDownload: true,
          ...versionFields(version),
        });
      else if (state.phase === "available")
        emit({ phase: "available", ...versionFields(latestVersion) });
      else emit(state);
    } catch {
      if (!disposed && check === checkVersion) emit({ phase: "error" });
    }
  };
  navigator.serviceWorker.addEventListener(
    "message",
    (event: MessageEvent<Reply>) => {
      if (
        !ownWorker(event.source as ServiceWorker) ||
        event.data?.type !== "OFFLINE_SEARCH_STATE" ||
        !event.data.state
      )
        return;
      if (removing) return;
      const state = event.data.state;
      if (state.phase === "available")
        emit({ ...state, ...versionFields(latestVersion) });
      else emit(state);
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "online",
    () => {
      if (!pendingDownload) void refresh();
    },
    { signal: events.signal },
  );
  const initial = refresh();

  return {
    download: () => {
      if (pendingDownload) return pendingDownload;
      pendingDownload = (async () => {
        await initial;
        if (disposed) return;
        checkVersion++;
        const operation = ++operationVersion;
        latestVersion = (await readVersion()) ?? latestVersion;
        if (disposed || operation !== operationVersion) return;
        emit({
          phase: "downloading",
          completed: 0,
          ...versionFields(latestVersion),
        });
        try {
          const state = await send("OFFLINE_SEARCH_DOWNLOAD", {
            expectedVersion: latestVersion?.version,
          });
          if (operation !== operationVersion) return;
          if (state) emit(state);
          // Messaging the active registration also works before the first controllerchange.
          if (!ownWorker(navigator.serviceWorker.controller))
            await send("OFFLINE_SEARCH_CLAIM");
        } catch (error) {
          if (operation === operationVersion)
            emit({ phase: "error", ...versionFields(latestVersion) });
          throw error;
        }
      })().finally(() => {
        pendingDownload = undefined;
      });
      return pendingDownload;
    },
    remove: async () => {
      await initial;
      if (disposed) return;
      checkVersion++;
      operationVersion++;
      removing = true;
      for (const cancel of [...channels]) cancel();
      try {
        await send("OFFLINE_SEARCH_REMOVE");
        emit({
          phase: "available",
          hasDownload: false,
          ...versionFields(latestVersion),
        });
      } catch (error) {
        emit({ phase: "error" });
        throw error;
      } finally {
        removing = false;
      }
    },
    dispose: () => {
      disposed = true;
      checkVersion++;
      events.abort();
      for (const cancel of [...channels]) cancel();
    },
  };
}
