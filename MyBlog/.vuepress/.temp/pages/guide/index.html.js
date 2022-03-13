export const data = {
  "key": "v-fffb8e28",
  "path": "/guide/",
  "title": "Guides",
  "lang": "en-US",
  "frontmatter": {
    "index": false,
    "icon": "creative",
    "category": [
      "Guide"
    ],
    "summary": "Guides Page Config; Markdown Enhance; Function Disable; Encryption Demo;",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://vuepress-theme-hope-v2-demo.mrhope.site/guide/"
        }
      ],
      [
        "meta",
        {
          "property": "og:site_name",
          "content": "Theme Demo"
        }
      ],
      [
        "meta",
        {
          "property": "og:title",
          "content": "Guides"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "article"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale",
          "content": "en-US"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale:alternate",
          "content": "zh-CN"
        }
      ],
      [
        "meta",
        {
          "name": "twitter:card",
          "content": "summary_large_image"
        }
      ],
      [
        "meta",
        {
          "name": "twitter:image:alt",
          "content": "Theme Demo"
        }
      ],
      [
        "meta",
        {
          "property": "article:author",
          "content": "Mr.Hope"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [],
  "readingTime": {
    "minutes": 0.04,
    "words": 13
  },
  "filePathRelative": "guide/README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
