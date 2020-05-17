<template>
	<p>Lgoin</p>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
export default{
	async asyncData ({ params }) {
		axios.post('/api/loginbyid/'+params.id)
		.then(function (response) {
			console.log(response.data);
			if(response.data.message){
				self.loading=false
				self.error=response.data.message
			}else{
				self.loading=false
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
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}
</script>