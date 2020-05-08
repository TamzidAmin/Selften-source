<template>
<div class="container mx-auto text-center">
	<div class="p-3 shadow-xl my-5 bg-white">

	  	<ul> 
	  		<li>
		        <img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo" class="h-8 w-8 mx-auto"/>
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
		<form @submit.prevent="addwallet" method="post">
			<input
			  v-model="amount"
			  required
			  class="px-3 my-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
			  placeholder="Amount To Add"
			>
            <div class="text-red-900" v-if="!$v.amount.required">Amount is required</div>
            <div class="text-red-900" v-if="!$v.amount.between">
            	Must be between {{$v.amount.$params.between.min}} and {{$v.amount.$params.between.max}}</div>
            </span>


			<input
			  v-model="number"
			  required
			  placeholder="Sender Number"
			  class="px-3 mb-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
			/>
            <div class="error text-red-900" v-if="!$v.number.required">Number is required</div>

			<button
			  :disabled="!valid"
			  class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"
			>
			  Add
			</button>
			<p class="text-red-500" v-if="submitStatus === 'OK'">{{  error }}</p>
			<p class="text-red-500" v-if="submitStatus === 'ERROR'">{{ resmassage }}</p>
			<p class="text-red-500" v-if="submitStatus === 'PENDING'">Sending...</p>
			<br><br>
		</form>
	</div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'
import { required,between } from 'vuelidate/lib/validators'

export default {
	middleware: 'auth',
	data: () => ({
		submitStatus:null,
     	amount:null,
     	number:null,
     	isopen:false,
     	dialog:false,
     	error:null,
     	resmassage:'Please fill the form correctly.',
  		valid: true,
  		paymentmethod:{},
  		alert: false,
    }),

	validations: {
	    amount: {
	      	required,
	      	between: between(10, 90000)
	    },
	    number: {
	      	required
	    }
	},

    computed:mapGetters({
		authuser: 'user'
    }),
    methods:{
    	clode(){
			this.alert=false
		},
		howtoadd(){
			this.isopen=true;
		},
    	addwallet ({ params }) {
			this.$v.$touch()
		  	this.loading=true;
			if (this.$v.$invalid) {
	    		this.submitStatus = 'ERROR'
	  		}else {
	  			this.submitStatus = 'PENDING'
			  	var self = this;
				axios.post('/api/addwallet', {
					amount : this.amount,
					number : this.number,
					purpose : 'addwallet',
					paymentmethod : this.paymentmethod.id,
					user_id: this.authuser.id
				})
				.then(function (response) {
					self.submitStatus = 'OK'
					if(response.data=='success'){
						self.submitStatus = 'ERROR'
						self.resmassage="Request Send SuccessFully"
					}else{
						self.submitStatus = 'ERROR'
						self.resmassage=response.data
						self.alert=true
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