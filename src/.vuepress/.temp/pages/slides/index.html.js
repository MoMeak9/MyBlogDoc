export const data = {
  "key": "v-2897d318",
  "path": "/slides/",
  "title": "幻灯片",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "幻灯片",
    "blog": {
      "type": "type",
      "key": "slide"
    },
    "layout": "Blog",
    "summary": "",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://vuepress-theme-hope-v2-demo.mrhope.site/slides/"
        }
      ],
      [
        "meta",
        {
          "property": "og:site_name",
          "content": "主题演示"
        }
      ],
      [
        "meta",
        {
          "property": "og:title",
          "content": "幻灯片"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "website"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale",
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
          "content": "主题演示"
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
    "minutes": 0,
    "words": 0
  },
  "filePathRelative": null
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
