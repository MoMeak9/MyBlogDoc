/** Astro 7.3 leaves a literal percent in generated prerender request URLs. */
export function correctPrerenderUrl(value) {
  return value.replace(/%(?![0-9a-f]{2})/gi, "%25");
}

export function literalPercentRoutes() {
  return {
    name: "myblogdoc:literal-percent-routes",
    hooks: {
      "astro:build:start": ({ setPrerenderer }) => {
        setPrerenderer((defaultPrerenderer) => ({
          ...defaultPrerenderer,
          name: "myblogdoc:literal-percent-prerenderer",
          render(request, options) {
            const url = correctPrerenderUrl(request.url);
            const corrected =
              url === request.url
                ? request
                : new Request(url, {
                    method: request.method,
                    headers: request.headers,
                    signal: request.signal,
                  });
            return defaultPrerenderer.render(corrected, options);
          },
        }));
      },
    },
  };
}
