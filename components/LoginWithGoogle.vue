<template>
 <button  @click="login" class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style="transition: all 0.15s ease 0s;">
	<svg aria-hidden="true" data-prefix="fab" data-icon="google" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" class="w-4 h-4 mr-2"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg> Google
</button>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
	name: 'LoginWithFacebook',

	computed: mapGetters({
		url: 'base_url',
	}),

	mounted () {
		window.addEventListener('message', this.onMessage, false)
	},

	beforeDestroy () {
		window.removeEventListener('message', this.onMessage)
	},



	methods: {
		async login () {
			const newWindow = openWindow('', 'login')

			// const url = await this.$store.dispatch('auth/fetchOauthUrl', {
			// 	provider: 'facebook'
			// })

			// window.location.href = this.url+'/au/google'
			newWindow.location.href = this.url+'/au/google'

		},

		/**
		 * @param {MessageEvent} e
		 */
		onMessage (e) {
			console.log(e);
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
