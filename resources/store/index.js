const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
	return {
		auth: null,
		authuser:[],
		base_url:"https://admin.selften.com/"
	}
}

export const getters = {
  authuser (state) {
    return state.authuser
  },
  base_url (state) {
    return state.base_url
  }
}


export const mutations = {
	setAuth (state, auth) {
		state.auth = auth
	},
	setUser (state, user) {
		state.authuser = user
	}
}

export const actions = {
	nuxtServerInit ({ commit }, { req }) {
		let auth = null
		let user = null
		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie)
			try {
				auth = JSON.parse(parsed.auth)
				user = JSON.parse(parsed.user)
			} catch (err) {
				// No valid cookie found
			}
		}
		commit('setAuth', auth)
		commit('setUser', user)
	}
}

	