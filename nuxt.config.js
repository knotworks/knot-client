require('dotenv').config()

export default {
  mode: 'universal',
  components: true,

  /*
   ** Headers of the page
   */
  head: {
    title: 'Knot',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-startup-image', href: '/launch.png' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'preload',
        as: 'style',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
        media: 'print',
        onload: 'this.media="all"',
      },
    ],
  },

  /*
   ** PWA Config
   */
  pwa: {
    manifest: {
      name: 'Knot',
      theme_color: '#e53e3e',
    },
    meta: {
      name: 'Knot',
      appleStatusBarStyle: 'black-translucent',
      viewport:
        'viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui',
      mobileAppIOS: true,
      theme_color: '#e53e3e',
    },
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['@/assets/css/custom-utils.scss', '@/assets/css/animations.scss'],

  /*
   ** Runtime Configs
   */
  publicRuntimeConfig: {
    apiURL: process.env.API_URL || 'http://knot.test',
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/cloudinary.js', ssr: true },
    { src: '~/plugins/flickity.js', ssr: false },
    { src: '~/plugins/lazysizes.js', ssr: false },
    { src: '~/plugins/eventBus.js', ssr: true },
    { src: '~/plugins/localStorage.js', ssr: false },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
    '@nuxt/components',
    '@nuxtjs/pwa',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/svg',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'vue-warehouse/nuxt',
      {
        plugins: ['store/plugins/expire', 'store/plugins/defaults'],
        storages: [
          'store/storages/localStorage',
          'store/storages/cookieStorage',
        ],
      },
    ],
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  },

  auth: {
    watchLoggedIn: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: false,
          },
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: false,
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post',
            propertyName: false,
          },
        },
      },
    },
    redirect: {
      login: false,
      home: false,
      logout: '/login',
      callback: false,
    },
    cookie: {
      options: {
        expires: 365,
      },
    },
    plugins: [{ src: '~/plugins/http.js', ssr: true }],
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  // server: {
  //   port: 1337,
  //   host: '0.0.0.0'
  // }
}
