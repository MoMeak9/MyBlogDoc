export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-4eaf9f84","v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690","v-184f4da6","v-0e503981","v-4c863446","v-bf720700","v-0978b044","v-fffb8e28"]},"/zh/":{"path":"/zh/article/","keys":["v-7a8fca2f","v-f5ca1ef4","v-f933d032","v-fc9d8170","v-4ba29552","v-31cd694c","v-35371a8a","v-38a0cbc8","v-3c0a7d06","v-3f742e44","v-42dddf82","v-464790c0","v-49b141fe","v-998b2620","v-3f1f8b68","v-b20b5e22","v-6a0a3d62","v-47357bdb"]}},"encrypted":{"/":{"path":"/encrypted/","keys":["v-bf720700"]},"/zh/":{"path":"/zh/encrypted/","keys":["v-b20b5e22"]}},"slide":{"/":{"path":"/slides/","keys":["v-0e503981"]},"/zh/":{"path":"/zh/slides/","keys":["v-998b2620"]}},"star":{"/":{"path":"/star/","keys":["v-4eaf9f84","v-5deafbd7","v-0c0c61ab","v-0538ff2f"]},"/zh/":{"path":"/zh/star/","keys":["v-7a8fca2f","v-f5ca1ef4","v-38a0cbc8","v-464790c0"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690","v-4eaf9f84"]},"/zh/":{"path":"/zh/timeline/","keys":["v-f5ca1ef4","v-f933d032","v-fc9d8170","v-4ba29552","v-31cd694c","v-35371a8a","v-38a0cbc8","v-3c0a7d06","v-3f742e44","v-42dddf82","v-464790c0","v-49b141fe","v-7a8fca2f"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
