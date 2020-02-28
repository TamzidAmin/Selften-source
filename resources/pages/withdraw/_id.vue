<template>
<v-layout column justify-center align-center>
	<v-card
	    class="mx-auto p-3"
	    max-width="400"
	    min-width="300"
	  >
	  <v-list>
	  		<v-list-item>
		      	<v-list-item-avatar>
		          <v-img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo"></v-img>
		        </v-list-item-avatar>

		        <v-list-item-content class="text-left">
		          <v-list-item-title>{{ paymentmethod.name }}</v-list-item-title>
		        </v-list-item-content>
		    </v-list-item>
	  </v-list>
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
		  >
			<v-text-field
			  v-model="amount"
			  :rules="nameRules"
			  label="Amount To Withdraw"
			  required
			></v-text-field>

			<v-text-field
			  v-model="number"
			  :rules="nameRules"
			  label="Receiver Number"
			  required
			></v-text-field>
			<v-btn
			  :disabled="!valid"
			  color="success"
			  class="mr-4"
			  v-if="authuser.earn_wallet>=amount"
			  @click="addwallet"
			>
			  Withdraw
			</v-btn>
			<v-btn
			  disabled
			  color="success"
			  class="mr-4"
			  v-else
			 
			>
			  Withdraw
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
	</v-card>
</v-layout>
</template>
<script>
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'

export default {
	data: () => ({
     	amount:null,
     	number:null,
     	error:null,
  		valid: true,
  		paymentmethod:{},
  		alert: false,
  		nameRules: [
			v => !!v || 'Amount is required',
			v => (v && v <= 1000) || 'Amount must be less than 1000 BDT',
			v => (v && v > 99 ) || 'Amount must be greater than 100 BDT',
	  	]
    }),
    computed:mapGetters({
		authuser: 'authuser'
    }),
    methods:{
    	addwallet ({ params }) {
			if (this.$refs.form.validate()) {
			  	var self = this;
				axios.post('/api/addwallet', {
					amount : this.amount,
					number : this.number,
					purpose : 'withdraw',
					paymentmethod : this.paymentmethod.id,
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
    },
    asyncData ({ params }) {
		return axios.get(`/api/paymentMethod/${params.id}`)
		.then((res) => {
			return { paymentmethod: res.data }
		})
	}
}
</script>