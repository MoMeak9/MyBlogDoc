export const categoryMap = {"category":{"/":{"path":"/category/","map":{"使用指南":{"path":"/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","keys":["v-4eaf9f84","v-4c863446","v-bf720700","v-0978b044","v-fffb8e28"]},"CategoryA":{"path":"/category/categorya/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690"]},"CategoryB":{"path":"/category/categoryb/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce"]}}}},"tag":{"/":{"path":"/tag/","map":{"禁用":{"path":"/tag/%E7%A6%81%E7%94%A8/","keys":["v-4c863446"]},"文章加密":{"path":"/tag/%E6%96%87%E7%AB%A0%E5%8A%A0%E5%AF%86/","keys":["v-bf720700"]},"markdown":{"path":"/tag/markdown/","keys":["v-0978b044"]},"页面配置":{"path":"/tag/%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE/","keys":["v-4eaf9f84"]},"使用指南":{"path":"/tag/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","keys":["v-4eaf9f84"]},"tag A":{"path":"/tag/tag-a/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690"]},"tag B":{"path":"/tag/tag-b/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690"]}}}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
