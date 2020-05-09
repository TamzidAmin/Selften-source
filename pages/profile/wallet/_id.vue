<template>
<div class="container mx-auto">
	<div class="mx-auto text-center shadow-xl my-5">
	    <div>
	    	<div style="background: #D0254B;color: #fff;padding: 10px;">
	    		<h4 style="font-size: 20px;padding: 18px;">Available Balance</h4>
		    	<h2 style="font-size: 27px;">৳ {{ authuser.wallet+authuser.earn_wallet }}</h2>
		    	<div class="d-flex" >
		    		<div class="w-50">
		    			<h4>Deposit</h4>
		    			<h2>৳ {{ authuser.wallet }}</h2>
		    		</div>
		    		<div class="w-50">
		    			<h4>Winning</h4>
		    			<h2>৳ {{ authuser.earn_wallet }}</h2>
		    		</div>
		    	</div>
		    	<p class="pt-3 f-10">You Can withdraw Only Winning Amount</p>
	    	</div>
	    	<div class="flex">
				<div style="width: 25%;">
					<div class="p-2 text-capitalize cursor-pointer" v-bind:class="{ active: name=='addmoney' ? true : '' }" @click="addmoney('addmoney')">
				     	<img src="~/assets/wallet.svg" alt="" class="w-4 h-4 mx-auto">
				     	<p>addmoney</p>
				    </div>
				</div>
				<div style="width: 25%;">
					<div class="p-2 text-capitalize cursor-pointer" v-bind:class="{ active: name=='withdraw' ? true : '' }" @click="withdraw('withdraw')">
				     	<img src="~/assets/withdrow.svg" alt="" class="w-4 h-4 mx-auto">
				     	<p>Withdraw</p>
				    </div>
				</div>
				<div style="width: 25%;">
					<div class="p-2 text-capitalize cursor-pointer" v-bind:class="{ active: name=='transfer' ? true : '' }" @click="transfer('transfer')">
				     	<img src="~/assets/transfer.svg" alt="" class="w-4 h-4 mx-auto">
				     	<p>Transfer</p>
				    </div>
				</div>
				<div style="width: 25%;">
					<div class="p-2 text-capitalize cursor-pointer" v-bind:class="{ active: name=='transaction' ? true : '' }" @click="transaction('transaction')">
				     	<img src="~/assets/transaction.svg" alt="" class="w-4 h-4 mx-auto">
				     	<p>Transaction</p>
				    </div>
				</div>
	    	</div> 
	    	<div v-if="name=='addmoney'">
	    		<div class="p-2">
					<nuxt-link v-for="paymentmethod in data" :to="'/profile/wallet/addwallet/'+paymentmethod.id" :key="paymentmethod.id">
						<div class="p-3 text-center hover:border-2">
					       <img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo" class="w-10 h-10"></img>

					        <div class="text-left">
					          	<div>{{ paymentmethod.name }}</div>
					        </div>
					    </div>
					</nuxt-link>
	    		</div>
	    	</div>
	    	<div v-if="name=='transfer'">
	    		<p>Comming Soon</p>
	    	</div>
	    	<div v-if="name=='transaction'">
	    		<table class="border-collapse w-full">
				    <thead>
				        <tr>
				          	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Amount</th>
				          	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Number</th>
				          	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Status</th>
				          	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Date</th>
				        </tr>
				    </thead>
				    <tbody>
				        <tr v-for="item in data" :key="item.name">
				          	<td class="p-3 text-gray-800 text-center border border-b">৳ {{ item.amount }}</td>
				          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.number }}</td>
				          	<td class="p-3 text-gray-800 text-center border border-b">
				          		<button color="error" v-if="item.status=='cancel'">canceled</button>
				          		<button color="primary" v-else-if="item.status=='pending'">{{ item.status }}</button>
				          		<button color="success" v-else>{{ item.status }}</button>
				          	</td>
				          <td class="p-3 text-gray-800 text-center border border-b" v-if="item.created_at">{{ item.created_at.substring(0,10) }}</td>
				        </tr>
				    </tbody>
				</table>
	    	</div>
	    	<div v-if="name=='withdraw'">
	    		<ul class="p-2">
					<nuxt-link v-for="paymentmethod in data" :to="'/profile/wallet/withdraw/'+paymentmethod.id" :key="paymentmethod.id">
						<li class="p-3">
					        <img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo" class="w-10 h-10"/>

					        <div class="text-left">
					          	<div>{{ paymentmethod.name }} </div>
					        </div>
					    </li>
					</nuxt-link>
	    		</ul>
	    	</div>
	    </div>
	</div>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from '~/plugins/axios'
import Avatar from 'vue-avatar'
export default {
	middleware: 'auth',
	data: () => ({
		valid: true,
		name: 'addmoney',
		isActive:true,
		data:[],
	}),
	components: {
		Avatar
	},
	computed: mapGetters({
	   authuser: 'user'
	}),
	methods: {
		addmoney(name){
			var self = this;
			this.name=name;
			axios.get(`/api/paymentMethod/`)
			.then((res) => {
				self.data=res.data
			})
		},
		withdraw(name){
			this.name=name;
			var self = this;
			console.log(this.name);
			axios.get(`/api/paymentMethod`)
			.then((res) => {
				self.data=res.data
			})
		},
		transfer(name){
			this.name=name;
			console.log(this.name);
			// axios.get(`/api/userwallet/${name}`)
			// .then((res) => {
				
			// })
		},
		transaction(name){
			var self = this;
			this.name=name;
			console.log(this.name);
			axios.get(`/api/usertransaction/${this.authuser.id}`)
			.then((res) => {
				self.data=res.data
			})
		}
	},
	asyncData () {
		return axios.get(`/api/paymentMethod`)
		.then((res) => {
			return { data: res.data }
		})
	},
	fetch ({ store, params }) {
	    return axios.get(`/api/updateuser/`+params.id)
	    .then((res) => {
	    	console.log(res.data);
	      store.commit('setUser', res.data)
	    })
	}
}
</script>

<style>
	.active{
		border: 1px solid #ED1944;
	}
	@media only screen and (max-width: 375px) {
		.getw p{
			font-size: 10px;
		}
	}
</style>