<template>
    <div class="p-2 h-screen overflow-hidden flex items-center justify-center">
        <div class="bg-gray-300 shadow-lg rounded-lg px-10">
            <div class="w-full px-0 md:px-6 py-16">
            	<div class="rounded-t mb-0 px-6 py-6">
                    <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">Sign in with</h6></div>
                    <div class="btn-wrapper text-center">
                       <LoginWithFacebook/>
                       <LoginWithGoogle/>
                    </div>
                    <hr class="mt-6 border-b-1 border-gray-400">
                </div>
                <div class="text-gray-500 text-center mb-3 font-bold"><small>Or sign in with credentials</small></div>	
                <form @submit.prevent="validate" method="post">
                    <div class="mb-4">
                        <label for="email" class="mb-2 font-bold">Email</label>
                        <input type="email" v-model="$v.email.$model" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
                        <div class="error text-red-900" v-if="!$v.email.required">Email is required</div>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="mb-2 font-bold">Your password</label>
                        <input type="password" v-model="$v.password.$model" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style="transition: all 0.15s ease 0s;">
                        <div class="error text-red-900" v-if="!$v.password.required">Password is required</div>
                    </div>
                    <label class="mb-4 flex items-center">
                        <input type="checkbox" class="form-checkbox" name="remeber" id="remeber" checked="">
                        <span class="ml-2">Remember me</span>
                    </label>
                    <div class="block md:flex items-center justify-between">
                        <button type="submit" class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg" :disabled="submitStatus === 'PENDING'">LOGIN</button>

                        <nuxt-link class="text-gray-600 hover:text-gray-700 no-underline block mt-3" to="forgetpassword">
                        	Forgot Your Password?
                        </nuxt-link>
                    </div>
                	<p class="text-red-500" v-if="submitStatus === 'OK'">{{  error }}</p>
					<p class="text-red-500" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
					<p class="text-red-500" v-if="submitStatus === 'PENDING'">Sending...</p>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from '~/plugins/axios'
import { required } from 'vuelidate/lib/validators'
import LoginWithFacebook from '~/components/LoginWithFacebook'
import LoginWithGoogle from '~/components/LoginWithGoogle'
const Cookie = process.client ? require('js-cookie') : undefined
  export default {
	data: () => ({
		loading: false,
		show1: false,
		error:null,
	  	valid: true,
		dialog: false,
	  	name: '',
	  	email: '',
	  	password:'',
	  	submitStatus: null
	}),

	components:{
    	LoginWithFacebook,
    	LoginWithGoogle,
    },

	validations: {
	    email: {
	      required
	    },
	    password: {
	      required
	    }
	},
	methods: {
	  validate () {
	  	this.$v.$touch()
	  	this.loading=true;
		if (this.$v.$invalid) {
    		this.submitStatus = 'ERROR'
  		}else {
  			this.submitStatus = 'PENDING'
		 	var self = this;
			axios.post('/api/login', {
				email: this.email,
				password: this.password
			})
			.then(function (response) {
				self.submitStatus = 'OK'
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
					self.$router.push('/')
				  }, 1000)
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	  },
	  reset () {
		this.$refs.form.reset()
	  },
	  resetValidation () {
		this.$refs.form.resetValidation()
	  },
	},
  }
</script>

