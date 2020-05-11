<template>
<div class="container mx-auto my-5 shadow-lg bg-white p-5">
	   
	<ul>
	  		<li>
		        <img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo" class="h-8 w-8" />

		        <p>{{ paymentmethod.name }} ( {{ paymentmethod.info }} )</p>
		    </li>
	</ul>
	<form @submit.prevent="addwallet" method="post">
		<input
		  v-model="amount"
		  required
		  class="px-3 py-3 font-normal rounded shadow focus:outline-none focus:shadow-outline w-full"
		  placeholder="Amount To Add"
		>
        <div class="text-green-100" v-if="!$v.amount.required">Amount is required</div>
        <div class="text-green-100" v-if="!$v.amount.between">
        	Must be between {{$v.amount.$params.between.min}} and {{$v.amount.$params.between.max}}</div>
        </span>


		<input
		  v-model="number"
		  required
		  placeholder="Sender Number"
		  class="px-3 py-3 font-normal rounded shadow focus:outline-none focus:shadow-outline w-full"
		/>
        <div class="error text-green-100" v-if="!$v.number.required">Number is required</div>

		<button
		  v-if="authuser.earn_wallet>=amount"
		  @click="addwallet"
		  class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"
		>
		  Withdraw
		</button>
		<button
		  disabled
		  v-else
		  class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 opacity-50 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"
		 
		>
		  Withdraw
		</button>
		<br><br>
		<p class="text-red-500" v-if="submitStatus === 'OK'">{{  error }}</p>
			<p class="text-red-500" v-if="submitStatus === 'ERROR'">{{ message }}</p>
			<p class="text-red-500" v-if="submitStatus === 'PENDING'">Sending...</p>
	</form>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'
import { required,between } from 'vuelidate/lib/validators'
export default {
	data: () => ({
		submitStatus:null,
     	amount:null,
     	number:null,
     	error:null,
     	type:'success',
     	message:"Please fill the form correctly.",
  		valid: true,
  		paymentmethod:{},
  		alert: false,
    }),

	validations: {
	    amount: {
	      	required,
	      	between: between(100, 90000)
	    },
	    number: {
	      	required
	    }
	},

    computed:mapGetters({
		authuser: 'user'
    }),
    methods:{
    	addwallet ({ params }) {
			this.$v.$touch()
		  	this.loading=true;
			if (this.$v.$invalid) {
	    		this.submitStatus = 'ERROR'
	  		}else {
	  			this.submitStatus = 'PENDING'
			  	var self = this;
				axios.post('/api/withdrawwallet', {
					amount : this.amount,
					number : this.number,
					purpose : 'withdraw',
					paymentmethod : this.paymentmethod.id,
					user_id: this.authuser.id
				})
				.then(function (response) {
					self.submitStatus = 'ERROR'
					self.alert=true
					self.message=response.data
					self.amount=null
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