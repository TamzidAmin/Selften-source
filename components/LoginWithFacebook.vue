<template>
 <button  @click="login" class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style="transition: all 0.15s ease 0s;">
	<svg aria-hidden="true" data-prefix="fab" data-icon="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 mr-2"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg> Facebook
</button>
</template>

<script>
export default {
	name: 'LoginWithFacebook',

	computed: {
		url: () => `https://admin.selften.com/au/facebook`
	},

	mounted () {
		window.addEventListener('message', this.onMessage, false)
	},

	beforeDestroy () {
		window.removeEventListener('message', this.onMessage)
	},

	methods: {
		async login () {
			const newWindow = openWindow('', "login")

			// const url = await this.$store.dispatch('auth/fetchOauthUrl', {
			// 	provider: 'facebook'
			// })

			newWindow.location.href = this.url
		},

		/**
		 * @param {MessageEvent} e
		 */
		onMessage (e) {
			if (e.origin !== window.origin || !e.data.token) {
				return
			}

			this.$store.dispatch('auth/saveToken', {
				token: e.data.token
			})

			this.$router.push({ name: 'home' })
		}
	}
}

/**
 * @param  {Object} options
 * @return {Window}
 */
function openWindow (url, title, options = {}) {
	if (typeof url === 'object') {
		options = url
		url = ''
	}

	options = { url, title, width: 600, height: 720, ...options }

	const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
	const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
	const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
	const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height

	options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
	options.top = ((height / 2) - (options.height / 2)) + dualScreenTop

	const optionsStr = Object.keys(options).reduce((acc, key) => {
		acc.push(`${key}=${options[key]}`)
		return acc
	}, []).join(',')

	const newWindow = window.open(url, title, optionsStr)

	if (window.focus) {
		newWindow.focus()
	}

	return newWindow
}
</script>
