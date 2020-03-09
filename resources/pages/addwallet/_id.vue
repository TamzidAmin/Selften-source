<template>
<v-layout column justify-center align-center>
	<v-card
	    class="mx-auto p-3"
	    max-width="400"
	    min-width="310"
	>
  	<v-list> 
  		<v-list-item>
	      	<v-list-item-avatar>
	          	<v-img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo"></v-img>
	        </v-list-item-avatar>

	        <v-list-item-content class="text-left">
	          	<v-list-item-title>{{ paymentmethod.name }} ( {{ paymentmethod.info }} )</v-list-item-title>
	        </v-list-item-content>
			
		

	    </v-list-item>
  	</v-list>
	<div class="text-center">
		<v-btn
		  color="primary"
		  small class="w-300" dark @click.stop="dialog = true"
		>
		  How to add money?
		</v-btn>
		<v-dialog
		  v-model="dialog"
		  max-width="340"
		>
		  	<v-card class="p-3" style="font-size: 14px;">
		  		<p>Follow below steps 👇</p>
				Step 1: 
				<ol>
					<li> Dial *247# or *167#</li>
					<li> Select Send Money Option.</li>
					<li> Enter Self-Ten Personal Account Number.</li>
					<li> Enter Your amount</li>
					<li> Enter Reference Number "PlayZone".</li>
					<li> Now Enter your PIN.</li>
				</ol>
				Almost Done. Now follow step 2. 
				Step 2: 
				<ol class="mt-2">
					<li> Visit Self-Ten Website or Open App.</li>
					<li> Go to My Wallet and Select your Mobile Banking Service(bKash or Nagad).</li>
					<li> Verify your Payment by entering amount and bKash/Nagad mobile account number.</li>
				</ol> 
				<span class="text-danger">Once Self-Ten Verify your payment details, Within 1 hours your money will be added.</span>
		  	</v-card>
		</v-dialog>
	</div>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
	  >
		<v-text-field
		  v-model="amount"
		  :rules="amountRules"
		  label="Amount To Add"
		  required
		></v-text-field>

		<v-text-field
		  v-model="number"
		  :rules="nameRules"
		  label="Sender Number"
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
		    @click="clode()"
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
	middleware: 'authenticated',
	data: () => ({
     	amount:null,
     	number:null,
     	isopen:false,
     	dialog:false,
     	error:null,
  		valid: true,
  		paymentmethod:{},
  		alert: false,
  		nameRules: [
			v => !!v || 'Amount is required',
	  	],
	  	amountRules: [
			v => !!v || 'Amount is required',
			v => (v && v <= 1000) || 'Amount must be less than 1000 BDT',
			v => (v && v > 19 ) || 'Amount must be greater than 20 BDT',
	  	],
    }),
    computed:mapGetters({
		authuser: 'authuser'
    }),
    methods:{
    	clode(){
			this.alert=false
		},
		howtoadd(){
			this.isopen=true;
		},
    	addwallet ({ params }) {
			if (this.$refs.form.validate()) {
			  	var self = this;
				axios.post('/api/addwallet', {
					amount : this.amount,
					number : this.number,
					purpose : 'addwallet',
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