<template>
<div class="container mx-auto text-center">
	<div class="p-3 shadow-xl my-5 bg-white">

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
	        
			<t-button :disabled="!valid" class="mt-3" :loading="loading">
				Add
			</t-button>

			<p class="text-red-500" v-if="submitStatus === 'OK'">{{  error }}</p>
			<p class="text-red-500" v-if="submitStatus === 'ERROR'"> <form method="post" action="https://shurjopay.com/sp-data.php" id="frm_submit"><div id="spay"></div></form> </p>
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
				axios.post('/api/addwallet1', {
					amount : this.amount,
					purpose : 'addwallet',
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
						document.getElementById("spay").innerHTML=response.data;
						setTimeout(function(){ 

    						// document.getElementById('frm_submit').submit();

					 	}, 1000);
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