
export default {
	mode: 'universal',

	env: {
    	baseUrl:process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'https://admin.selften.com'
  	},

	/*
	** Headers of the page
	*/
	head: { 
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		  	{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vue-phone-number-input@1.1.10/dist/vue-phone-number-input.css' }
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
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'./plugins/maz-ui',
		{ src: '~/plugins/common', ssr: false },
		{ src: '~/plugins/validator'},
		{ src: '~/plugins/vue-fb-customer-chat.js', ssr: false }
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		// Doc: https://github.com/nuxt-community/nuxt-tailwindcss
		'@nuxtjs/tailwindcss',
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa'
	],

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
	** Build configuration
	*/
	build: {
		babel: {
	      plugins: [
	        [
	          'component', {
	            libraryName: 'maz-ui',
	            styleLibraryName: 'css'
	          }
	        ]
	      ]
    	}
	}
}
