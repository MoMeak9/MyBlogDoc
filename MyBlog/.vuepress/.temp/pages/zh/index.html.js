export const data = {
  "key": "v-2d0ad528",
  "path": "/zh/",
  "title": "博客主页",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "layout": "Blog",
    "icon": "home",
    "title": "博客主页",
    "heroImage": "/logo.svg",
    "heroText": "你博客的名称",
    "heroFullScreen": true,
    "tagline": "你可以在这里放置你的口号与标语",
    "projects": [
      {
        "icon": "project",
        "name": "项目名称",
        "desc": "项目详细描述",
        "link": "https://你的项目链接"
      },
      {
        "icon": "link",
        "name": "链接名称",
        "desc": "链接详细描述",
        "link": "https://链接地址"
      },
      {
        "icon": "book",
        "name": "书籍名称",
        "desc": "书籍详细描述",
        "link": "https://你的书籍链接"
      },
      {
        "icon": "article",
        "name": "文章名称",
        "desc": "文章详细描述",
        "link": "https://你的文章链接"
      },
      {
        "icon": "friend",
        "name": "伙伴名称",
        "desc": "伙伴详细介绍",
        "link": "https://你的伙伴链接"
      },
      {
        "icon": "/logo.svg",
        "name": "自定义项目",
        "desc": "自定义详细介绍",
        "link": "https://你的自定义链接"
      }
    ],
    "footer": "自定义你的页脚文字",
    "summary": "这是一个博客主页。 要使用此布局，你应该在页面前端设置 layout: Blog 和 home: true。 相关配置文档请见 博客主页。",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://vuepress-theme-hope-v2-demo.mrhope.site/zh/"
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
          "content": "博客主页"
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
          "property": "og:locale:alternate",
          "content": "en-US"
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
    "minutes": 0.17,
    "words": 50
  },
  "filePathRelative": "zh/README.md"
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
