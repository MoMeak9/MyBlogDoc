/** Public author identity and contact details. */
export const site = {
  author: {
    name: "Yihui",
    displayName: { zh: "泯泷 Yihui", en: "Yihui" },
  },
  repositoryUrl: "https://github.com/MoMeak9/MyBlogDoc",
  socials: {
    github: {
      icon: "github",
      href: "https://github.com/MoMeak9",
      account: "MoMeak9",
      labelKey: "socialGithub",
      ariaKey: "socialGithubLabel",
      external: true,
    },
    bilibili: {
      icon: "bilibili",
      href: "https://space.bilibili.com/298768693",
      account: "298768693",
      labelKey: "socialBilibili",
      ariaKey: "socialBilibiliLabel",
      external: true,
    },
    email: {
      icon: "email",
      href: "mailto:minntaki@foxmail.com",
      account: "minntaki@foxmail.com",
      labelKey: "socialEmail",
      ariaKey: "socialEmailLabel",
      external: false,
    },
  },
} as const;
