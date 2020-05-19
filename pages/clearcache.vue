<template>
	<p>aaaaaaaaa {{ logout() }}</p>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined
	export default {
		methods: {
			async logout () {
				Cookie.remove('token')
		      	Cookie.remove('setUser')
		      	this.$store.commit('setToken', null)
		      	this.$store.commit('setUser', null)
				this.$router.push('/')
			},
		}
	}
</script>