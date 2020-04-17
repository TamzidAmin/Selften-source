<template>
	<v-card style="padding: 20px;" max-width="600"><p style="visibility: hidden;">{{ username=authuser.username }}</p>
		User id : {{ authuser.id }}
		email   : {{ authuser.email }}

		<h2 class="text-center" style="padding: 20px">Settings</h2>
		  <v-form
			ref="form"
			v-model="valid"
			lazy-validation
		  >
			<v-text-field
			  v-model="username"
			  :rules="nameRules"
			  label="Username"
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
				  Change
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
	import { mapMutations, mapGetters } from 'vuex'

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
		username:'',
		nameRules: [
			v => !!v || 'User Name is required',
		],
	}),
	computed: mapGetters({
		authuser: 'authuser'
	}),
	methods: {
		validate () {
		  	this.loading=true;
			if (this.$refs.form.validate()) {
			  this.snackbar = true
			  var self = this;
				axios.post('api/change/'+this.authuser.id, {
					username: this.username,
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
