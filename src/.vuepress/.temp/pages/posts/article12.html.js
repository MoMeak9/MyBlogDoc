export const data = {
  "key": "v-5deafbd7",
  "path": "/posts/article12.html",
  "title": "文章 12",
  "lang": "zh-CN",
  "frontmatter": {
    "icon": "edit",
    "date": "2022-01-12T00:00:00.000Z",
    "category": [
      "CategoryA",
      "CategoryB"
    ],
    "tag": [
      "tag A",
      "tag B"
    ],
    "star": true,
    "summary": "文章 12 标题 2 这里是内容。 标题 3 这里是内容。",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://vuepress-theme-hope-v2-demo.mrhope.site/posts/article12.html"
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
          "content": "文章 12"
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
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "tag A"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "tag B"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-12T00:00:00.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "标题 2",
      "slug": "标题-2",
      "children": [
        {
          "level": 3,
          "title": "标题 3",
          "slug": "标题-3",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 0.06,
    "words": 19
  },
  "filePathRelative": "posts/article12.md"
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
