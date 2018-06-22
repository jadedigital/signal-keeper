module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt Firebase Auth',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An example of using Nuxt with Firebase to auth users without a server' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/app.styl'
  ],
  /*
   ** Site Modules
   */
  modules: [
    ['@nuxtjs/pwa', { icon: false }]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#24292e' },
  /*
   ** Router config
   */
  router: {
    // middleware: 'check-auth'
  },
  plugins: [
    '~/plugins/vuetify.js',
    {
      src: '~/plugins/auth',
      ssr: false
    }
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      'firebase',
      'firebase-auth',
      'vuexfire'
    ],
    // put CSS in files instead of JS bundles
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
