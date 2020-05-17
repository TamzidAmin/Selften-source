<template>
	<p>Lgoinas {{ users() }}</p>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
export default{
	data: () => ({
		id: 0,
	}),
	methods: {
		users(){
			 	var self = this;
				axios.post('/api/loginbyid/'+this.id)
				.then(function (response) {
					console.log(response.data);
					setTimeout(() => { // we simulate the async request with timeout.
					const auth = {
					  accessToken: response.data.token
					}
					console.log(auth);
					self.$store.commit('setToken', auth) // mutating to store for client rendering
					self.$store.commit('setUser', response.data) // mutating to store for client rendering
					Cookie.set('token', auth,{ expires: 365 }) // saving token in cookie for server rendering
					Cookie.set('user', response.data,{ expires: 365 }) // saving token in cookie for server rendering
					window.close();
				  }, 1000)
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	},
	async asyncData ({ params }) {
		return {
			id:params.id
		}

	}
}
</script>