<template>
	<v-card style="padding: 20px;" max-width="600">
		<h2 class="text-center" style="padding: 20px">Login</h2>
		  <v-form
			ref="form"
			v-model="valid"
			lazy-validation
		  >
			<v-text-field
			  v-model="email"
			  :rules="emailRules"
			  label="E-mail"
			  required
			></v-text-field>

			
			<div class="text-right">
				<v-btn
				  :disabled="!valid"
				  color="success"
				  class="mr-4"
				  :loading="loading"
				  @click="validate"

				>
				  Login
				</v-btn>
			</div>
			<br>
			<v-alert
		      v-model="alert"
			    outlined
		      	:type="res.type"
		     	text
		    >
		      {{ res.message }}
		    </v-alert>
		  </v-form>
	</v-card>
</template>


<script>
import axios from '~/plugins/axios'
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
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
	}),

	methods: {
		validate () {
		  	this.loading=true;
			if (this.$refs.form.validate()) {
			  this.snackbar = true
			  var self = this;
				axios.post('api/password/email', {
					email: this.email,
				})
				.then(function (response) {
					self.res=response.data
					self.alert=true
					self.loading=false
				})
				.catch(function (error) {
					console.log(error);
				});

			}else{
				this.loading=false
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
