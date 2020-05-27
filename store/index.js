
const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = require('js-cookie')
export const state = () => {
	return {
		token: null,
		user:[],
		base_url: process.env.baseUrl
	}
}

export const getters = {
  user (state) {
	return state.user
  },
  token (state) {
	return state.token
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
	},

	setTokeno (state, token) {
		state.token = token
		Cookie.set('token', token,{ expires: 365 }) // saving token in cookie for server rendering
	},
	setUsero (state, user) {
		state.user = user
		Cookie.set('user', user,{ expires: 365 }) // saving token in cookie for server rendering
		
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

	