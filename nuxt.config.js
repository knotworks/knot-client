require('dotenv').config()

export default {
  mode: 'universal',
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
          'viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-startup-image', href: '/launch.png' },
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter-ui.css'
      }
    ]
  },

  pwa: {
    manifest: {
      theme_color: '#e53e3e'
    }
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
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/cloudinary.js', ssr: true },
    { src: '~/plugins/flickity.js', ssr: false },
    { src: '~/plugins/lazysizes.js', ssr: false },
    { src: '~/plugins/eventBus.js', ssr: true }
    // { src: '~/plugins/localStorage.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/svg',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    [
      'vue-warehouse/nuxt',
      {
        plugins: ['store/plugins/expire', 'store/plugins/defaults'],
        storages: [
          'store/storages/localStorage',
          'store/storages/cookieStorage'
        ]
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: false
          },
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: false
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post',
            propertyName: false
          }
        }
      }
    },
    redirect: {
      home: '/'
    },
    plugins: [{ src: '~/plugins/http.js', ssr: true }]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
