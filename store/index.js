const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
	return {
		token: null,
		user:[],
		base_url:"https://admin.selften.com/"
	}
}

export const getters = {
  user (state) {
	return state.user
  },
  base_url (state) {
	return state.base_url
  }
}


export const mutations = {
	setToken (state, token) {
		state.token = token
	},
	setUser (state, user) {
		state.user = user
	}
}

export const actions = {
	nuxtServerInit ({ commit }, { req }) {
		let token = null
		let user = null
		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie)
			try {
				token = JSON.parse(parsed.token)
				user = JSON.parse(parsed.user)
			} catch (err) {
				// No valid cookie found
			}
		}
		commit('setToken', token)
		commit('setUser', user)
	}
}

	