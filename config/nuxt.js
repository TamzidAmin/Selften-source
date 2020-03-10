const { resolve } = require('path')
const colors = require('vuetify/es5/util/colors').default

module.exports = {
	mode: 'universal',
	dev: process.env.NODE_ENV === 'development',
	srcDir: resolve(__dirname, '..', 'resources'),
	/*
	** Headers of the page
	*/
	head: {
		titleTemplate: '%s - ' + process.env.npm_package_name,
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: 'red' },
	/*
	** Global CSS
	*/
	css: [
		'~/assets/css/global.css'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/vuetify',
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/onesignal',
		'@nuxtjs/pwa',
	],

	// Options
	oneSignal: {
	  init: {
	    appId: 'a7c8cd5b-cd30-40a8-9e7c-ce688d1b0445',
	    allowLocalhostAsSecureOrigin: true,
	    welcomeNotification: {
	        disable: false
	    },
	  },
	  // Use CDN
	  cdn: true,

	  // Use any custom URL
	  OneSignalSDK: 'https://cdn.onesignal.com/sdks/OneSignalSDK.js'
	},

	pwa: {
	  icon: {
	    iconSrc:'~/assets/selften.png',
	  },
	  manifest: {
	    name: 'Selften',
	  }
	},
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
	},
	/*
	** vuetify module configuration
	** https://github.com/nuxt-community/vuetify-module
	*/
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
		 dark: false,
			themes: {
				dark: {
					primary: "#C91F4E",
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
		}
	},
}
