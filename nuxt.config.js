import path from 'path'
import fs from 'fs'

require('dotenv').config()

export default {
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
      short_name: 'Knot',
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

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: ['~/components', '~/components/new-post', '~/components/posts'],
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/custom-utils.scss', '@/assets/css/animations.scss'],

  /*
   ** Runtime Configs
   */
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://knot.test',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    appEnv: process.env.APP_ENV || 'production',
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/cloudinary.js', ssr: false },
    { src: '~/plugins/lazysizes.js', ssr: false },
    { src: '~/plugins/eventBus.js', ssr: true },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/svg',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/cloudinary',
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
    baseURL: process.env.BASE_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: true,
  },

  auth: {
    strategies: {
      sanctum: {
        provider: 'laravel/sanctum',
        url: process.env.BASE_URL,
      },
    },
    cookie: {
      options: {
        expires: 182, // 6 months
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: false,
    },
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    useComponent: false,
    secure: true,
  },

  tailwindcss: {
    jit: true,
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
}
