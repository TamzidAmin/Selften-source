<template>
	<div class="container mx-auto">
		<p style="visibility: hidden;">{{ username=authuser.username }}</p>
		User id : {{ authuser.id }}
		email   : {{ authuser.email }}

		<h2 class="text-center">Settings</h2>
		  <form>
			<input type="text">

			<div class="text-right">
				<button
				  	class="mr-4"
				  	@click="validate"
				>
				  Change
				</button>
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
		  </form>
	</div>
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
	}),
	computed: mapGetters({
		authuser: 'user'
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

