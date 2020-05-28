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
		provider_id: 0,
	}),
	computed: {
		users(){
		 	var self = this;
			axios.post('/api/loginbyid/'+this.id+'/'+this.provider_id)
			.then(function (response) {
				if(response.data==0){
					self.$router.push('/')
				}else{
					const auth = {
					  accessToken: response.data.token
					}
					self.$store.commit('setTokeno', auth) // mutating to store for client rendering
					self.$store.commit('setUsero', response.data) // mutating to store for client rendering
					// Cookie.set('token', auth,{ expires: 365 }) // saving token in cookie for server rendering
					// Cookie.set('user', response.data,{ expires: 365 }) // saving token in cookie for server rendering
					self.$router.push('/')
					// window.close();
				}
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
	async asyncData ({ params }) {
		return {
			id:params.id,
			provider_id:params.provider_id,
		}

	}
}
</script>