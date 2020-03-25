<template>
	<div>
		 <v-simple-table dense>
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">Phone</th>
		          <th class="text-left">Amount</th>
		          <th class="text-left">Status</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="item in myorder" :key="item.id">
		          <td>{{ item.phone }}</td>
		          <td>{{ item.amount }}</td>
		          <td>{{ item.status }}</td>
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
				myorder:[]
			}
		},
		async asyncData ({ params }) {
		    let myorder =  await axios.get(`/api/myorder/`+params.id)
		    return { 
		    	myorder: myorder.data,
		    }
	  	}
	}
</script>