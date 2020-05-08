<template>
<div class="container mx-auto">
	<div class="mx-auto p-3">

	  	<ul> 
	  		<li>
		        <img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo"/>
		        <p>{{ paymentmethod.name }} ( {{ paymentmethod.info }} )</p>
		    </li>
	  	</ul>

		<div class="text-center">
			<button
			  color="primary"
			  small class="w-300" dark @click.stop="dialog = true"
			>
			  How to add money?
			</button>
			<div
			  v-model="dialog"
			  max-width="340"
			>
			  	<div class="p-3" style="font-size: 14px;">
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
			  	</div>
			</div>
		</div>
		<form>
			<input
			  v-model="amount"
			  required
			>

			<input
			  v-model="number"
			  required
			/>
		
			<button
			  :disabled="!valid"
			  color="success"
			  class="mr-4"
			  @click="addwallet"
			>
			  Add
			</button>
			<br><br>
			<v-alert
		      v-model="alert"
			    outlined
			    @click="clode()"
		      	type="success"
		     	text
		    >
		      {{ resmassage  }}
		    </v-alert>
		</form>
	</div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'

export default {
	middleware: 'auth',
	data: () => ({
     	amount:null,
     	number:null,
     	isopen:false,
     	dialog:false,
     	error:null,
     	resmassage:'Request sent successfully',
  		valid: true,
  		paymentmethod:{},
  		alert: false,
  		nameRules: [
			v => !!v || 'Amount is required',
	  	],
	  	amountRules: [
			v => !!v || 'Amount is required',
			v => (v && v <= 5000) || 'Amount must be less than 5000 BDT',
			v => (v && v > 14 ) || 'Amount must be greater than 15 BDT',
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
					}else{
						self.resmassage=response.data
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