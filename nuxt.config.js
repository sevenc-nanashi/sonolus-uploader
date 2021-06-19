import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - SweetPotato',
    title: 'SweetPotato',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'PJSekai創作譜面投稿サイト' },
      { name: 'robots', content: 'nofollow,noindex,noarchive' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', href: '/sweet-potato-logo3.png', as: 'image' },
      { rel: 'preconnect dns-prefetch', href: '//servers.purplepalette.net' },
      { rel: 'preconnect dns-prefetch', href: '//firebasestorage.googleapis.com' },
      { rel: 'preconnect dns-prefetch', href: '//www.googleapis.com' },
      { rel: 'preconnect dns-prefetch', href: '//cdn.jsdelivr.net' },
      { rel: 'dns-prefetch', href: '//lh3.googleusercontent.com' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/utils/axios-accessor',
    '@/plugins/potato'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-purgecss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    // https://github.com/frenchrabbit/nuxt-precompress#readme
    'nuxt-precompress'
  ],

  purgeCSS: {
    enabled: ({ isDev }) => !isDev,
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      './node_modules/vuetify/dist/vuetify.js'
    ],
    styleExtensions: ['.css'],
    whitelist: ['v-application', 'v-application--wrap', 'layout', 'row', 'col'],
    whitelistPatterns: [
      /^v-((?!application).)*$/,
      /^theme--*/,
      /.*-transition/,
      /^justify-*/,
      /^p*-[0-9]/,
      /^m*-[0-9]/,
      /^text--*/,
      /--text$/,
      /^row-*/,
      /^col-*/
    ],
    whitelistPatternsChildren: [/^v-((?!application).)*$/, /^theme--*/],

    extractors: [
      {
        extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js']
      }
    ]
  },

  nuxtPrecompress: {
    enabled: process.env.NODE_ENV === 'production', // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip']
    },
    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 }
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    }
  },

  markdownit: {
    runtime: true, // Support `$md()`
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true // URLに似たテキストをリンクに自動変換する
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
      name: 'SweetPotato',
      short_name: 'potato',
      theme_color: '#9c27b0',
      ogTitle: 'SweetPotato',
      ogSiteName: 'SweetPotato',
      ogImage: 'https://potato.purplepalette.net/sweet-potato-logo3.png',
      display: 'standalone',
      description: 'PJSekai創作譜面投稿サイト',
      shortcuts: [
        {
          name: '譜面一覧画面を開く',
          short_name: '一覧',
          description: '新着順で投稿一覧画面を開きます',
          url: 'https://potato.purplepalette.net/fumen/list',
          icons: [{
            src: 'https://potato.purplepalette.net/menu.png', sizes: '128x128'
          }]
        }
      ]
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.purple.base,
          secondary: '#673AB7',
          accent: colors.indigo.base,
          error: colors.pink.base,
          warning: colors.amber.base,
          info: colors.teal.base,
          success: colors.green.base
        }
      }
    }
  },

  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    },
    extend (config, _ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.txt$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
