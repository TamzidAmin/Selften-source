<template>
<div class="p-2 h-screen overflow-hidden flex items-center justify-center"><span class="loading-screen loading-circle loading-text"></span>
    <div class="bg-white shadow-lg rounded-lg bg-gray-300">
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
		<div title="register">
			<div class="w-full">
				<form @submit.prevent="register" class="rounded px-8 pt-6 pb-8 mb-4 capitalize">
					<!-- Name -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="username" class="mb-2 font-bold">User Name</label>
	                        <input type="username" v-model="$v.username.$model" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="User Name" style="transition: all 0.15s ease 0s;">
                    	</div>
                        <div class="text-red-900" v-if="!$v.username.required">Username is required</div>
					</div>

					<div class="form-group row">
						<div class="mb-4">
	                        <label for="email" class="mb-2 font-bold">Phone</label>
	                        <vuenumber
							    v-model="phone"
							    @update="onUpdate" default-country-code="BD"
							  />
							<div v-if="results!=null && !results.isValid" class="text-red-900"> Phone Number Must Be A Valid Number. </div>
                    	</div>
					</div>

					<!-- Email -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="email" class="mb-2 font-bold">Email</label>
	                        <input type="email" v-model="$v.email.$model" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="E-mail" style="transition: all 0.15s ease 0s;">
                    	</div>
                    	<div class="error text-red-900" v-if="!$v.email.required">Email is required</div>
					</div>

					<!-- Password -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="password" class="mb-2 font-bold">Password</label>
	                        <input type="password" v-model="$v.password.$model" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style="transition: all 0.15s ease 0s;">
                    	</div>
                    	<div class="error text-red-900" v-if="!$v.password.required">Password is required</div>
					</div>

					<!-- Password Confirmation -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="password" class="mb-2 font-bold">Confirm Password</label>
	                        <input type="password" v-model="$v.password_confirmation.$model" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="password_confirmation" style="transition: all 0.15s ease 0s;">
                    	</div>
                    	<div class="error text-red-900" v-if="!$v.password_confirmation.required">Password confirmation is required</div>
					</div>

					<div class="form-group row">
						<div class="text-center mt-2">
							<button type="submit" class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">REGISTER</button>
						</div>
						<p class="text-red-500" v-if="submitStatus === 'OK'">{{  error }}</p>
						<p class="text-red-500" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
						<p class="text-red-500" v-if="submitStatus === 'PENDING'">Sending...</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import axios from '~/plugins/axios'
import LoginWithFacebook from '~/components/LoginWithFacebook'
import LoginWithGoogle from '~/components/LoginWithGoogle'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
	middleware: 'guest',
	// components: {
	// 	LoginWithGithub
	// },
	data: () => ({
		username: '',
		phone: '',
		email: '',
		password: '',
		password_confirmation: '',
		mustVerifyEmail: false,
		error:'',
		submitStatus:null,
		results:null
	}),
	components:{
    	LoginWithFacebook,
    	LoginWithGoogle,
    },
	validations: {
		username: {
	      required
	    },
	    phone: {
	      required
	    },
	    email: {
	      required
	    },
	    password: {
	      required
	    },
	    password_confirmation: {
	      required
	    }
	},

	methods: {
		onUpdate (payload) {
        	this.results = payload
      	},
		async register () {
			if(this.results && this.results.isValid){
				this.phone=this.results.formattedNumber;
				this.$v.$touch()
			  	this.loading=true;
				if (this.$v.$invalid) {
		    		this.submitStatus = 'ERROR'
		  		}else {
	  			this.submitStatus = 'PENDING'
		        	this.loading=true
		          	this.snackbar = true
		          	var self = this;
		         	axios.post('/api/register', {
					    name: this.username,
					    phone: this.phone,
					    email: this.email,
					    password: this.password,
					    password_confirmation:this.password
					})
					.then(function (response) {
						self.submitStatus = 'OK'
						console.log(response.data);
						if(response.data[0]){
							self.loading=false
							self.error=response.data[0].message
						}else{
							self.loading=false
						    setTimeout(() => { // we simulate the async request with timeout.
					        const auth = {
					          accessToken: response.data.token
					        }
					        self.$store.commit('setToken', auth) //mutating to store for client rendering
					        self.$store.commit('setUser', response.data.data) //mutating to store for client rendering
					        Cookie.set('token', auth,{ expires: 365 }) //saving token in cookie for server rendering
					        Cookie.set('user', response.data,{ expires: 365 }) //saving token in cookie for server rendering
					        self.$router.push('/profile/'+response.data.user.id)
					      }, 1000)
						}
					})
					.catch(function (error) {
					    console.log(error);
					});
		        }
		    }
		}
	}
};
</script>
