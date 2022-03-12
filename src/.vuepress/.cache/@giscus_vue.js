import {
  computed,
  createVNode,
  defineComponent,
  onMounted,
  onUnmounted,
  ref
} from "./chunk-HD5WY5WL.js";
import "./chunk-3N7AOXF6.js";
import {
  init_define_ARTICLE_INFO_LOCALES,
  init_define_BACK_TO_TOP_LOCALES,
  init_define_CODE_COPY_LOCALES,
  init_define_CODE_COPY_OPIONS,
  init_define_CODE_DEMO_OPTIONS,
  init_define_COMMENT_OPTIONS,
  init_define_EXTERNAL_LINK_ICON_LOCALES,
  init_define_MERMAID_OPTIONS,
  init_define_PAGINATION_LOCALES,
  init_define_PHOTO_SWIPE_LOCALES,
  init_define_PHOTO_SWIPE_OPTIONS,
  init_define_READING_TIME_LOCALES,
  init_define_REVEAL_CONFIG,
  init_define_TOC_LOCALES,
  init_define_WALINE_LOCALES
} from "./chunk-UKRDVF2W.js";

// dep:@giscus_vue
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_TOC_LOCALES();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();

// node_modules/@giscus/vue/dist/index.es.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_TOC_LOCALES();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
var e = Object.defineProperty;
var t = Object.defineProperties;
var s = Object.getOwnPropertyDescriptors;
var r = Object.getOwnPropertySymbols;
var n = Object.prototype.hasOwnProperty;
var i = Object.prototype.propertyIsEnumerable;
var o = (t2, s2, r2) => s2 in t2 ? e(t2, s2, { enumerable: true, configurable: true, writable: true, value: r2 }) : t2[s2] = r2;
var d = "Please consider reporting this error at https://github.com/laymonage/giscus/issues/new.";
function p(e2) {
  return `[giscus] An error occurred. Error message: "${e2}".`;
}
function f(e2) {
  const t2 = document.querySelector(`meta[property='og:${e2}'],meta[name='${e2}']`);
  return t2 ? t2.content : "";
}
function h() {
  const e2 = document.getElementById("giscus-css") || document.createElement("style");
  e2.id = "giscus-css", e2.textContent = "\n    .giscus, .giscus-frame {\n      width: 100%;\n    }\n    .giscus-frame {\n      border: none;\n      color-scheme: normal;\n    }\n  ", document.head.prepend(e2);
}
var y = defineComponent({ props: { repo: { type: String, required: true }, repoId: { type: String, required: true }, category: String, categoryId: String, mapping: { type: String, required: true }, term: String, lang: { type: String, default: "en" }, theme: { type: String, default: "light" }, reactionsEnabled: { type: String, default: "1" }, emitMetadata: { type: String, default: "0" }, inputPosition: { type: String, default: "bottom" } }, setup(e2) {
  const a = ref(""), y2 = computed(() => {
    return function({ repo: e3, repoId: t2, category: s2 = "", categoryId: r2 = "", mapping: n2, term: i2 = "", theme: o2 = "light", reactionsEnabled: a2 = "1", emitMetadata: c2 = "0", inputPosition: l2 = "bottom", lang: u = "en", session: g, origin: m }) {
      const d2 = new URL(location.href);
      d2.searchParams.delete("giscus");
      const p2 = d2.toString(), h2 = { origin: m = m || p2, session: g, theme: o2, reactionsEnabled: a2, emitMetadata: c2, inputPosition: l2, repo: e3, repoId: t2, category: s2, categoryId: r2, description: f("description") };
      switch (n2) {
        case "url":
          h2.term = p2;
          break;
        case "title":
          h2.term = document.title;
          break;
        case "og:title":
          h2.term = f("title");
          break;
        case "specific":
          h2.term = i2;
          break;
        case "number":
          h2.number = i2;
          break;
        case "pathname":
        default:
          h2.term = location.pathname.length < 2 ? "index" : location.pathname.substring(1).replace(/\.\w+$/, "");
      }
      return `https://giscus.app/${u}/widget?${new URLSearchParams(h2)}`;
    }((c = ((e3, t2) => {
      for (var s2 in t2 || (t2 = {}))
        n.call(t2, s2) && o(e3, s2, t2[s2]);
      if (r)
        for (var s2 of r(t2))
          i.call(t2, s2) && o(e3, s2, t2[s2]);
      return e3;
    })({}, e2), l = { session: a.value }, t(c, s(l))));
    var c, l;
  });
  onMounted(() => {
    const e3 = location.href, t2 = new URL(e3), s2 = localStorage.getItem("giscus-session");
    if (a.value = t2.searchParams.get("giscus") || "", a.value)
      localStorage.setItem("giscus-session", JSON.stringify(a.value)), t2.searchParams.delete("giscus"), history.replaceState(void 0, document.title, t2.toString());
    else if (s2)
      try {
        a.value = JSON.parse(s2 || "") || "";
      } catch (r2) {
        a.value = "", localStorage.removeItem("giscus-session"), console.warn(`${p(r2 == null ? void 0 : r2.message)} Session has been cleared.`);
      }
  }), onMounted(h);
  const b2 = ref();
  return onMounted(() => {
    const e3 = function(e4, t2 = null) {
      return function(s2) {
        if (s2.origin !== "https://giscus.app")
          return;
        const { data: r2 } = s2;
        if (typeof r2 != "object" || !r2.giscus)
          return;
        if (t2 && r2.giscus.resizeHeight && (t2.style.height = `${r2.giscus.resizeHeight}px`), !r2.giscus.error)
          return;
        const n2 = r2.giscus.error;
        if (n2.includes("Bad credentials") || n2.includes("Invalid state value")) {
          if (localStorage.getItem("giscus-session") !== null)
            return localStorage.removeItem("giscus-session"), e4(), void console.warn(`${p(n2)} Session has been cleared.`);
          console.error(`${p(n2)} No session is stored initially. ${d}`);
        }
        n2.includes("Discussion not found") ? console.warn(`[giscus] ${n2}. A new discussion will be created if a comment/reaction is submitted.`) : console.error(`${p(n2)} ${d}`);
      };
    }(() => a.value = "", b2.value);
    window.addEventListener("message", e3), onUnmounted(() => window.removeEventListener("message", e3));
  }), () => createVNode("div", { className: "giscus" }, [createVNode("iframe", { className: "giscus-frame", title: "Comments", scrolling: "no", src: y2.value, ref: b2 }, null)]);
} });
var b = { install: (e2) => e2.component("Giscus", y) };
export {
  y as Giscus,
  b as plugin
};
//# sourceMappingURL=@giscus_vue.js.map
