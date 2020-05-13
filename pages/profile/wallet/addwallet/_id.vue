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
			<button class="bg-green-100 py-1 px-2 text-white font-bold">
			  How to add money?
			</button>
			<div
			  v-model="dialog"
			  max-width="340"
			>
			  	<div class="p-3" style="font-size: 14px;">
			  		<p>Follow below steps 👇</p>
					<h3 class="font-bold">Step 1: </h3>
					<ol>
						<li> Dial *247# or *167#</li>
						<li> Select Send Money Option.</li>
						<li> Enter Self-Ten Personal Account Number.</li>
						<li> Enter Your amount</li>
						<li> Enter Reference Number "PlayZone".</li>
						<li> Now Enter your PIN.</li>
					</ol>
					<h3 class="font-bold">Almost Done. Now follow Step 2:
					</h3>
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
			<div class="text-left my-3">
				<label class="font-normal">Amount To Add</label>
				<input
				  v-model="amount"
				  required
				  class="px-3 py-3 font-normal rounded shadow focus:outline-none focus:shadow-outline w-full"
				  placeholder="Amount To Add"
				>
	            <div class="text-green-100 text-left" v-if="!$v.amount.required">Amount is required</div>
	            <div class="text-green-100 text-left" v-if="!$v.amount.between">
	            	Must be between {{$v.amount.$params.between.min}} and {{$v.amount.$params.between.max}}</div>
	            </span>
	        </div>

			<div class="text-left my-3">
				<label class="font-normal">Sender Number</label>
				<input
				  v-model="number"
				  required
				  placeholder="Sender Number"
				  class="px-3 py-3 font-normal rounded shadow focus:outline-none focus:shadow-outline w-full"
				/>
	            <div class="error text-green-100 text-left" v-if="!$v.number.required">Number is required</div>
			</div>
				
			<t-button :disabled="!valid" class="mt-3" :loading="loading">
				Add
			</t-button>

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
import TButton from '~/components/Button'
import { mapMutations, mapGetters } from 'vuex'
import { required,between } from 'vuelidate/lib/validators'

export default {
	middleware: 'auth',
	data: () => ({
		submitStatus:null,
     	amount:null,
     	number:null,
     	loading:false,
     	isopen:false,
     	dialog:false,
     	error:null,
     	resmassage:'Please fill the form correctly.',
  		valid: true,
  		paymentmethod:{},
  		alert: false,
    }),

	components:{
    	TButton
    },

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
					self.loading=false;
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