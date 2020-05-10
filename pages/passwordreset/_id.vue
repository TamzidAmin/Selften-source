<template>
<div class="container mx-auto my-10">
		<h2 class="text-center">Reset Password</h2>
		<form @submit.prevent="validate" method="post">
             <label for="email" class="mb-2 font-bold">Email</label>
			<input
				v-model="email"
				class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
				type="text"
				placeholder="Email"
				required
			>
           <div class="error text-red-900" v-if="!$v.email.required">Email is required</div>

            <label for="email" class="mb-2 font-bold">New Password</label>
			<input
				v-model="password"
				class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
				:type="show1 ? 'text' : 'password'"
				@click:append="show1 = !show1"
				placeholder="New Password"
				required
			>
           <div class="error text-red-900" v-if="!$v.password.required">Password is required</div>
			
			<div class="text-right mt-3">
				<button
					class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"
					@click="validate"

				>
					Change Password
				</button>
			</div>
			<br>
			<p class="text-red-500" v-if="submitStatus === 'OK'">{{ res.message }}</p>
			<p class="text-red-500" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
			<p class="text-red-500" v-if="submitStatus === 'PENDING'">Sending...</p>
		</form>
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
					this.snackbar = true
					var self = this;
					axios.post('api/password/reset', {
							token: this.$route.params.id,
							email: this.email,
							password: this.password,
					})
					.then(function (response) {
			  			self.submitStatus = 'OK'
						self.res=response.data
						self.alert=true
						self.loading=false
					})
					.catch(function (error) {
							console.log(error);
						this.loading=false
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

<style>
		.v-card{
				margin: auto!important;
		}
</style>