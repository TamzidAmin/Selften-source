<template>
<div class="container mx-auto">
	<div class="flex">
		<div class="w-1/4">
			
		</div>
		<div class="w-3/4 border-2 bg-white p-5 m-5">
				<h2>User Information</h2>
				<p style="visibility: hidden;">{{ username=authuser.username }}</p>
				<h3>User id : {{ authuser.id }}</h3>
				<h3>email   : {{ authuser.email }}</h3>
				<h3>Phone   : {{ authuser.phone }}</h3>
			  <form v-if="edit">
				<input type="text" class="px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full">

					<div class="text-right">
						<button
						  	class="mr-4"
						  	@click="validate"
						>
						  Change
						</button>
					</div>
				<br>
			  </form>
		</div>
	</div>
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
		edit:false,
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

