<template>
	<p> {{ users }}</p>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
export default{
	data: () => ({
		id: 0,
	}),
	computed: {
		users(){
		 	var self = this;
			axios.post('/api/loginbyid/'+this.id)
			.then(function (response) {
				console.log(response.data);
				setTimeout(() => { // we simulate the async request with timeout.
				const auth = {
				  accessToken: response.data.token
				}
				self.$store.commit('setTokeno', auth) // mutating to store for client rendering
				self.$store.commit('setUsero', response.data) // mutating to store for client rendering
				// Cookie.set('token', auth,{ expires: 365 }) // saving token in cookie for server rendering
				// Cookie.set('user', response.data,{ expires: 365 }) // saving token in cookie for server rendering
				self.$router.push('/')
				// window.close();
			  }, 1000)
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
	destroyed () {
	    if (process.client) { 
			// self.$router.push('/')
			window.close();
	    }
	},
	beforeDestroy () {
	    if (process.client) { 
			// self.$router.push('/')
			window.reload()
	    }
	},
	async asyncData ({ params }) {
		return {
			id:params.id
		}

	}
}
</script>