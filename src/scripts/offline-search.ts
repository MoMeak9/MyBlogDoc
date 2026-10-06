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
  paused?: boolean;
  errorKind?: "quota" | "network";
};
export type OfflineSearchOptions = { automatic?: boolean };
type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
type Version = { version: string; totalBytes?: number; filesCount?: number };
type Reply = {
  type: string;
  ok?: boolean;
  state?: OfflineSearchState;
  error?: string;
  code?: string;
};

/** Check the tiny version now; optional automatic preparation waits for foreground idle time. */
export function createOfflineSearch(
  base: string,
  onState: (state: OfflineSearchState) => void,
  options: OfflineSearchOptions = {},
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
  let busy = false;
  let phase: OfflineSearchState["phase"] = "checking";
  let paused = false;
  let initialFinished = false;
  let autoFailures = 0;
  let retryAfter = 0;
  let quotaBlocked = false;
  let automaticallyStopped = false;
  let needsRefresh = false;
  let loadedAt = document.readyState === "complete" ? Date.now() : Infinity;
  let idleAfter = Date.now() + 1000;
  let automaticTimer: ReturnType<typeof setTimeout> | undefined;
  let idleCallback: number | undefined;
  let scheduleAutomatic = () => {};
  const events = new AbortController();
  const channels = new Set<() => void>();
  const emit = (state: OfflineSearchState) => {
    if (disposed) return;
    if (typeof state.hasDownload === "boolean") hasDownload = state.hasDownload;
    const output = { ...state, hasDownload };
    phase = state.phase;
    paused = state.paused === true;
    const serialized = JSON.stringify(output);
    if (lastState !== serialized) {
      lastState = serialized;
      onState(output);
      if (options.automatic) scheduleAutomatic();
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
      setBusy: (_busy: boolean) => {},
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
  let workerRequest: Promise<ServiceWorker> | undefined;
  const ensureWorker = () =>
    (workerRequest ||= (async () => {
      const existing = await navigator.serviceWorker.getRegistration(
        scope.href,
      );
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
    })().catch((error) => {
      workerRequest = undefined;
      throw error;
    }));

  const send = async (type: string, detail: Record<string, unknown> = {}) => {
    const started = await ensureWorker();
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
            Object.assign(
              new Error(message.error || "Offline search operation failed."),
              { code: message.code },
            ),
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
        priority: "low",
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
  const automaticFailure = (quota: boolean) => {
    autoFailures++;
    retryAfter = Date.now() + Math.min(60000 * 2 ** (autoFailures - 1), 300000);
    if (quota) {
      quotaBlocked = true;
      try {
        sessionStorage.setItem(
          `myblogdoc-search-quota:${scope.pathname}`,
          "blocked",
        );
      } catch {}
    }
  };
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
      if (initialFinished && pendingDownload && state.phase !== "downloading") {
        operationVersion++;
        for (const cancel of [...channels]) cancel();
        await pendingDownload.catch(() => {});
      }
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
      if (options.automatic && state.phase === "error" && !pendingDownload)
        automaticFailure(state.errorKind === "quota");
      if (state.phase === "available")
        emit({ ...state, ...versionFields(latestVersion) });
      else emit(state);
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "online",
    () => {
      needsRefresh = true;
      if (options.automatic) scheduleAutomatic();
      else if (!pendingDownload) void refresh();
    },
    { signal: events.signal },
  );
  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  const networkAllowed = () =>
    !connection?.saveData &&
    !/^(?:slow-2g|2g)$/.test(connection?.effectiveType || "");
  const visible = () => document.visibilityState === "visible";
  const permission = () =>
    options.automatic === true &&
    !disposed &&
    !automaticallyStopped &&
    !quotaBlocked &&
    autoFailures < 3 &&
    !busy &&
    visible() &&
    networkAllowed() &&
    navigator.onLine &&
    Date.now() >= Math.max(loadedAt + 5000, idleAfter, retryAfter);
  const notifyActivity = (allowed = permission()) => {
    const worker = registration?.active || navigator.serviceWorker.controller;
    if (ownWorker(worker))
      worker!.postMessage({
        type: "OFFLINE_SEARCH_ACTIVITY",
        allowed,
        busy: !disposed && busy,
      });
  };
  const cancelAutomatic = () => {
    clearTimeout(automaticTimer);
    automaticTimer = undefined;
    if (idleCallback !== undefined) window.cancelIdleCallback?.(idleCallback);
    idleCallback = undefined;
  };
  const quotaKey = `myblogdoc-search-quota:${scope.pathname}`;
  try {
    quotaBlocked = sessionStorage.getItem(quotaKey) === "blocked";
  } catch {}
  const initial = refresh().finally(() => {
    initialFinished = true;
  });
  const startDownload = (automatic = false): Promise<void> => {
    if (pendingDownload) return pendingDownload;
    const task = (async () => {
      await initial;
      if (disposed) return;
      checkVersion++;
      const operation = ++operationVersion;
      latestVersion = (await readVersion()) ?? latestVersion;
      if (disposed || operation !== operationVersion) return;
      if (automatic && !permission()) return;
      if (automatic) notifyActivity(true);
      emit({
        phase: "downloading",
        completed: 0,
        ...versionFields(latestVersion),
      });
      try {
        const state = await send("OFFLINE_SEARCH_DOWNLOAD", {
          expectedVersion: latestVersion?.version,
          automatic,
        });
        if (operation !== operationVersion) return;
        if (state) emit(state);
        if (automatic && state?.phase === "ready") {
          autoFailures = 0;
          retryAfter = 0;
        }
        // Messaging the active registration also works before the first controllerchange.
        if (!ownWorker(navigator.serviceWorker.controller))
          await send("OFFLINE_SEARCH_CLAIM");
      } catch (error) {
        if (automatic) {
          automaticFailure(
            (error as { code?: string }).code === "QuotaExceededError" ||
              /quota/i.test(String(error)),
          );
        }
        if (operation === operationVersion)
          emit({ phase: "error", ...versionFields(latestVersion) });
        throw error;
      }
    })().finally(() => {
      if (pendingDownload === task) pendingDownload = undefined;
      if (options.automatic) scheduleAutomatic();
    });
    pendingDownload = task;
    return task;
  };
  const attemptAutomatic = async () => {
    if (!permission()) {
      notifyActivity(false);
      return;
    }
    notifyActivity(true);
    if (needsRefresh || phase === "error" || phase === "downloading") {
      needsRefresh = false;
      await refresh();
    }
    if (
      !permission() ||
      pendingDownload ||
      phase === "ready" ||
      phase === "downloading" ||
      phase === "checking"
    )
      return;
    if (phase === "available" || phase === "error")
      await startDownload(true).catch(() => {});
  };
  scheduleAutomatic = () => {
    cancelAutomatic();
    if (
      !options.automatic ||
      disposed ||
      automaticallyStopped ||
      quotaBlocked ||
      autoFailures >= 3 ||
      busy ||
      !visible() ||
      !networkAllowed() ||
      !navigator.onLine ||
      !Number.isFinite(loadedAt) ||
      phase === "unsupported" ||
      phase === "checking"
    )
      return;
    if (
      !needsRefresh &&
      (phase === "ready" || (phase === "downloading" && !paused))
    )
      return;
    if (pendingDownload && phase !== "downloading") return;
    const wait = Math.max(
      0,
      loadedAt + 5000 - Date.now(),
      idleAfter - Date.now(),
      retryAfter - Date.now(),
    );
    automaticTimer = setTimeout(() => {
      automaticTimer = undefined;
      const run = () => {
        idleCallback = undefined;
        void attemptAutomatic();
      };
      if (typeof window.requestIdleCallback === "function")
        idleCallback = window.requestIdleCallback(run, { timeout: 2500 });
      else automaticTimer = setTimeout(run, 1000);
    }, wait);
  };
  if (options.automatic) {
    window.addEventListener(
      "load",
      () => {
        loadedAt = Date.now();
        scheduleAutomatic();
      },
      { signal: events.signal, once: true },
    );
    document.addEventListener(
      "visibilitychange",
      () => {
        idleAfter = Date.now() + 1000;
        needsRefresh = true;
        notifyActivity(false);
        scheduleAutomatic();
      },
      { signal: events.signal },
    );
    connection?.addEventListener(
      "change",
      () => {
        notifyActivity(false);
        scheduleAutomatic();
      },
      { signal: events.signal },
    );
    window.addEventListener(
      "pagehide",
      () => {
        cancelAutomatic();
        notifyActivity(false);
      },
      { signal: events.signal },
    );
    window.addEventListener(
      "pageshow",
      () => {
        idleAfter = Date.now() + 1000;
        needsRefresh = true;
        scheduleAutomatic();
      },
      { signal: events.signal },
    );
    window.addEventListener(
      "offline",
      () => {
        cancelAutomatic();
        notifyActivity(false);
      },
      { signal: events.signal },
    );
    void initial.then(scheduleAutomatic);
  }

  return {
    download: () => startDownload(),
    setBusy: (value: boolean) => {
      if (disposed || busy === value) return;
      busy = value;
      idleAfter = Date.now() + 1000;
      notifyActivity(false);
      scheduleAutomatic();
    },
    remove: async () => {
      await initial;
      if (disposed) return;
      checkVersion++;
      operationVersion++;
      removing = true;
      automaticallyStopped = true;
      cancelAutomatic();
      notifyActivity(false);
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
      cancelAutomatic();
      notifyActivity(false);
      checkVersion++;
      events.abort();
      for (const cancel of [...channels]) cancel();
    },
  };
}
