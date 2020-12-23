const { description } = require('../../package')
const { path } = require('@vuepress/shared-utils')

module.exports = {

  base: '/vuepress-test/',

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Docplanner Integrations Hub',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Integrations',
      description: 'Integrations Hub'
    },
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/img/docplanner-tech-logo-blue.png',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/guide/': getGuideSidebar(),
        }
      },
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@image": path.resolve(__dirname, '../assets/img')
      }
    }
  }
}

function getGuideSidebar () {
  return [
    {
      title: 'Getting Started',
      collapsable: false,
      children: [
        '',
        'integration-process',
      ]
    },
    {
      title: 'Tools and libraries',
      collapsable: false,
      children: [
        'tools-and-libraries/sdk-php',
        'tools-and-libraries/sdk-dotnet',
        'tools-and-libraries/postman-collection',
      ]
    },
    {
      title: 'Fundamentals',
      collapsable: false,
      children: [
      	'fundamentals/authorization',
        'fundamentals/errors',
        'fundamentals/extensions',
        'fundamentals/rate-limits',
      ]
    },
    {
      title: 'API Objects',
      collapsable: false,
      children: [
        'api-objects/context-map',
        'api-objects/resources',
        'api-objects/managing-calendars',
        'api-objects/checking-schedule-coverage',
        'api-objects/online-features',
        'api-objects/patient-presence',
      ]
    },
    {
      title: 'Callbacks',
      collapsable: false,
      children: [
        'callbacks/push-vs-pull',
        'callbacks/real-time-requests',
      ]
    },
    {
      title: 'Mappings',
      collapsable: false,
      children: [
        'mappings/mapping-interface',
        'mappings/vendor-mapping',
      ]
    },
  ]
}
