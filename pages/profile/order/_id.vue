<template>
<div class="container mx-auto py-3 overflow-x-scroll">
	<p class="font-extrabold text-3xl">Orders</p>
    <table class="border-collapse w-full">
	    <thead>
	        <tr>
		       	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Order ID</th>
		        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Package</th>
		        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Player ID</th>
		        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Amount</th>
		        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Status</th>
	        </tr>
	    </thead>
      	<tbody>
	        <tr v-for="item in myorder" :key="item.id">
	          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.id }}</td>
	         	<td class="p-3 text-gray-800 text-center border border-b">{{ item.name }}</td>
	          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.playerid }}</td>
	          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.amount }}</td>
	          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.status }}</td>
	        </tr>
	        <tr>
	        	<td colspan="3" align="right" class="p-3 text-gray-800 font-black text-right text-center border border-b">Total:</td>
	        	<td class="p-3 text-gray-800 text-center border border-b">{{ totalItem }}</td>
	        	<td class="p-3 text-gray-800 text-center border border-b"></td>
	        </tr>
      	</tbody>
    </table>

	<p class="font-extrabold text-3xl py-3">Offer Orders</p>

    <table class="border-collapse w-full">
      	<thead>
	        <tr>
	          	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Order ID</th>
	          	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Package</th>
	          	<th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Date</th>
	        </tr>
      	</thead>
      	<tbody>
	        <tr v-for="item in offerorder" :key="item.id">
	          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.id }}</td>
	          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.amount }}</td>
	          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.created_at }}</td>
	        </tr>
      	</tbody>
	</table>
</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	import axios from '~/plugins/axios'
	export default {
		data(){
			return{
				myorder:[],
				offerorder:[],
				sum:0
			}
		},
		computed: {
		  totalItem: function(){
		      let sum = 0;
		      for(let i = 0; i < this.myorder.length; i++){
		        sum += parseFloat(this.myorder[i].amount);
		      }

		     return sum;
		   }
		},
		async asyncData ({ params }) {
		    let myorder =  await axios.get(`/api/myorder/`+params.id)
		    let offerorder =  await axios.get(`/api/offerorder/`+params.id)

		    return { 
		    	myorder: myorder.data,
		    	offerorder: offerorder.data,
		    }
	  	}
	}
</script>