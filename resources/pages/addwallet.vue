<template>
<v-layout column justify-center align-center>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
	  >
		<v-text-field
		  v-model="amount"
		  :rules="nameRules"
		  label="Amount"
		  required
		></v-text-field>
	
		<v-btn
		  :disabled="!valid"
		  color="success"
		  class="mr-4"
		  @click="addwallet"
		>
		  Add
		</v-btn>
		<br><br>
		<v-alert
	      v-model="alert"
		    outlined
	      	type="success"
	     	text
	    >
	      Request sent successfully
	    </v-alert>
	</v-form>
</v-layout>
</template>
<script>
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'

export default {
	data: () => ({
     	amount:null,
     	error:null,
  		valid: true,
  		alert: false,
  		nameRules: [
			v => !!v || 'Amount is required',
	  	],
    }),
    computed:mapGetters({
		authuser: 'authuser'
    }),
    methods:{
    	addwallet () {
			if (this.$refs.form.validate()) {
			  	var self = this;
				axios.post('/api/addwallet', {
					amount: this.amount,
					user_id: this.authuser.id
				})
				.then(function (response) {
					if(response.data=='success'){
						self.alert=true
						self.amount=null
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
    }
}
</script>