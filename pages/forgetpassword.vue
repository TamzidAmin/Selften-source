<template>
<div class="container mx-auto ">
    <div class="bg-gray-300 m-2 shadow-lg rounded-lg px-10">
        <div class="w-full  py-16 my-10">
            <div class="mb-4 font-light tracking-widest text-2xl text-center font-bold">LOGIN</div>
			  	<form @submit.prevent="validate" method="post">
                    <label for="email" class="mb-2 font-bold">Email</label>
					<input
					  v-model="email"
					  required
					  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
					  placeholder="Enter Your Email"
					/>
                    <div class="error text-red-900" v-if="!$v.email.required">Email is required</div>

					<div class="text-right mt-3">
						<button
							type="submit"
						  	class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"
						  	@click="validate"
						>
						  Send Code
						</button>
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
import axios from '~/plugins/axios'
import { required } from 'vuelidate/lib/validators'
const Cookie = process.client ? require('js-cookie') : undefined
  export default {
	data: () => ({
		loading: false,
		show1: false,
		error:null,
		res:[],
	  	valid: true,
	  	alert: false,
		dialog: false,
		name: '',
		email: '',
		password:'',
		submitStatus:null
	}),
	validations: {
	    email: {
	      required
	    },
	},
	methods: {
		validate () {
		  	this.$v.$touch()
			  	this.loading=true;
				if (this.$v.$invalid) {
		    		this.submitStatus = 'ERROR'
		  		}else {
		  			this.submitStatus = 'PENDING'
			  this.snackbar = true
			  var self = this;
				axios.post('api/password/email', {
					email: this.email,
				})
				.then(function (response) {
		  			self.submitStatus = 'OK'
					self.res=response.data
					self.error=response.data.message
					self.alert=true
					self.loading=false
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
