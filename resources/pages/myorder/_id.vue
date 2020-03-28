<template>
	<div>
		 <v-simple-table dense>
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">Order ID</th>
		          <th class="text-left">Package</th>
		          <th class="text-left">Status</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="item in myorder" :key="item.id">
		          <td>{{ item.id }}</td>
		          <td>{{ item.topuppackage.name }}</td>
		          <td>{{ item.status }}</td>
		        </tr>
		      </tbody>
		    </template>
		  </v-simple-table>
			<p style="margin-top: 15px;">Offer Order</p>
		   <v-simple-table dense>
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">Order ID</th>
		          <th class="text-left">Package</th>
		          <th class="text-left">Date</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="item in offerorder" :key="item.id">
		          <td>{{ item.id }}</td>
		          <td>{{ item.amount }}</td>
		          <td>{{ item.created_at }}</td>
		        </tr>
		      </tbody>
		    </template>
		  </v-simple-table>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	import axios from '~/plugins/axios'
	export default {
		data(){
			return{
				myorder:[],
				offerorder:[]
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