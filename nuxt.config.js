module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Signal Property Management Portal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This site manages tenant applications, rental agreements, maintenance requests' }
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
    '~/plugins/vuetify.js'
  ],

  pwa: {
    manifest: {
      name: 'Signal Property Management Portal',
      short_name: 'Signal',
      description: 'This site manages tenant applications, rental agreements, maintenance requests'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
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
