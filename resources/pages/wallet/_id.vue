<template>
<div>
	<v-card
	    class="mx-auto text-center"
	    max-width="400"
	  >
	    <v-card-text style="padding: 0px;">
	    	<div style="background: #D0254B;color: #fff;padding: 10px;">
	    		<h4 style="font-size: 20px;padding: 18px;">Available Balance</h4>
		    	<h2 style="font-size: 27px;">৳ {{ authuser.wallet+authuser.earn_wallet }}</h2>
		    	<div class="d-flex" >
		    		<div class="w-50">
		    			<h4>Diposite</h4>
		    			<h2>৳ {{ authuser.wallet }}</h2>
		    		</div>
		    		<div class="w-50">
		    			<h4>Winning</h4>
		    			<h2>৳ {{ authuser.earn_wallet }}</h2>
		    		</div>
		    	</div>
		    	<p class="pt-3 f-10">You Can withdraw Only Winning Amount</p>
	    	</div>
	    	<div class="d-flex getw">
				<div style="width: 25%;">
					<div class="p-2 text-capitalize pointer" v-bind:class="{ active: name=='addmoney' ? true : '' }" @click="addmoney('addmoney')">
				     	<img src="~/assets/wallet.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
				     	<p>add money</p>
				    </div>
				</div>
				<div style="width: 25%;">
					<div class="p-2 text-capitalize pointer" v-bind:class="{ active: name=='withdraw' ? true : '' }" @click="withdraw('withdraw')">
				     	<img src="~/assets/withdrow.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
				     	<p>Withdraw</p>
				    </div>
				</div>
				<div style="width: 25%;">
					<div class="p-2 text-capitalize pointer" v-bind:class="{ active: name=='transfer' ? true : '' }" @click="transfer('transfer')">
				     	<img src="~/assets/transfer.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
				     	<p>Transfer</p>
				    </div>
				</div>
				<div style="width: 25%;">
					<div class="p-2 text-capitalize pointer" v-bind:class="{ active: name=='transaction' ? true : '' }" @click="transaction('transaction')">
				     	<img src="~/assets/transaction.svg" alt="" style="width: 13px;margin-left: 7px;margin-right: 10px;">
				     	<p>Transaction</p>
				    </div>
				</div>
	    	</div> 
	    	<div v-if="name=='addmoney'">
	    		<v-list class="p-2">
					<nuxt-link v-for="paymentmethod in data" :to="/addwallet/+paymentmethod.id" :key="paymentmethod.id">
						<v-list-item>
					      	<v-list-item-avatar style="margin-left: 21px;">
					          	<v-img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo"></v-img>
					        </v-list-item-avatar>

					        <v-list-item-content class="text-left">
					          	<v-list-item-title>{{ paymentmethod.name }}</v-list-item-title>
					        </v-list-item-content>
					    </v-list-item>
					</nuxt-link>
	    		</v-list>
	    	</div>
	    	<div v-if="name=='transfer'">
	    		<p>Comming Soon</p>
	    	</div>
	    	<div v-if="name=='transaction'">
	    		<v-simple-table>
				    <template v-slot:default>
				      <thead>
				        <tr>
				          <th class="text-center">Amount</th>
				          <th class="text-center">Number</th>
				          <th class="text-center">Status</th>
				          <th class="text-center">Date</th>
				        </tr>
				      </thead>
				      <tbody>
				        <tr v-for="item in data" :key="item.name">
				          <td>৳ {{ item.amount }}</td>
				          <td>{{ item.number }}</td>
				          <td>
				          	<v-btn x-small color="error" dark v-if="item.status=='cancel'">{{ item.status }}</v-btn>
				          	<v-btn x-small color="primary" dark v-else-if="item.status=='pending'">{{ item.status }}</v-btn>
				          	<v-btn x-small color="success" dark v-else>{{ item.status }}</v-btn>
				          </td>
				          <td>{{ item.created_at.substring(0,10) }}</td>
				        </tr>
				      </tbody>
				    </template>
				</v-simple-table>
	    	</div>
	    	<div v-if="name=='withdraw'">
	    		<v-list class="p-2">
					<nuxt-link v-for="paymentmethod in data" :to="/withdraw/+paymentmethod.id" :key="paymentmethod.id">
						<v-list-item>
					      	<v-list-item-avatar style="margin-left: 21px;">
					          	<v-img :src="'https://admin.selften.com/uploads/payment/'+paymentmethod.logo"></v-img>
					        </v-list-item-avatar>

					        <v-list-item-content class="text-left">
					          	<v-list-item-title>{{ paymentmethod.name }} </v-list-item-title>
					        </v-list-item-content>
					    </v-list-item>
					</nuxt-link>
	    		</v-list>
	    	</div>
	    </v-card-text>
	</v-card>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from '~/plugins/axios'
export default {
	middleware: 'authenticated',
	data: () => ({
		valid: true,
		name: 'addmoney',
		isActive:true,
		data:[],
	}),
	computed: mapGetters({
	   authuser: 'authuser'
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