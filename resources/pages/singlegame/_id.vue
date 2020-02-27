<template>
	<div>
		<span style="visibility: hidden;">{{ check() }}  {{ isjoined }}</span>
		<div class="text-center">
			<img :src="base_url+'/uploads/product/'+match.product.logo" alt="!opps" style="object-fit: contain;width: 120px;height: 120px;">
		</div>
		<h2 class="text-center">{{ match.match_name.substring(0, 30) }}</h2>
		
		<div class="text-center">
			<v-btn tile small color="success" v-if="match.status=='upcoming'">
		      <v-icon left>mdi-check</v-icon> Registration open
		    </v-btn>
		    <v-btn tile small class="danger" v-if="match.status=='ongoing'">
		      <v-icon left>mdi-check</v-icon> Live
		    </v-btn>
		</div>

		<p class="py-3 text-center text-capitalize mb-0">Platform: {{ match.platform }}</p>
		
		<div class="d-flex">
			<div class="text-center w-33 font-limit">
				<v-btn color="#C91F4E" fab small dark>
	              <v-icon>mdi-alarm</v-icon>
	            </v-btn>
	            <p class="mb-0">{{ match.start_time }}</p>
			</div>
			<div class="text-center w-33 font-limit">
				<v-btn color="#C91F4E" fab small dark>
	              <img src="~/assets/tropy.svg" alt=""  width="25px">
	            </v-btn>
	            <p class="mb-0">BDT {{ match.total_prize }}</p>
			</div>
			<div class="text-center w-33 font-limit">
				<v-btn color="#C91F4E" fab small dark>
	              <img src="~/assets/userp.svg" alt=""  width="25px">
	            </v-btn>
	            <p class="mb-0">{{ match.users.length }}/{{ match.max_join }}</p>
			</div>
		</div>

      	<PrizeModel :match='match'/>
      	<PulesModel :match='match'/>

      	<div class="my-2 text-center">
        	
      	</div>

      	<div class="my-2 text-center">
        	<v-btn small class="w-300" color="secondary" dark>Participant</v-btn>
      	</div>

		
		<br>
		<h2 class="text-center">Users</h2>
		<v-simple-table dark class="table-sm">
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">S.NO</th>
		          <th class="text-left">Game Name</th>
		          <th class="text-left">Total Kill</th>
		          <th class="text-left">Total Win</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match.users" :key="item.name">
		          <td>{{ index+1 }}</td>
		          <td>{{ item.pivot.gamename }}</td>
		          <td>{{ item.pivot.total_kill }}</td>
		          <td>{{ item.pivot.total_earn }}</td>
		        </tr>
		      </tbody>
		    </template>
		</v-simple-table>
	</div>
</template>

<script>
import Card from '~/components/Card'
import PrizeModel from '~/components/PrizeModel'
import PulesModel from '~/components/PulesModel'
import { mapMutations, mapGetters } from 'vuex'
import axios from '~/plugins/axios'
export default {
	props:['matches'],
	components:{
		Card,
		PrizeModel,
		PulesModel
	},
    data () {
      return {
      	match:[],
        tab: null,
        knowledge: 0,
        isjoined:0,
        items: [
          'upcoming','ongoing','result',
        ],
      }
    },
	computed: mapGetters({
		authuser: 'authuser',
		base_url:'base_url'
	}),
	methods: {
	  	formatDate(date) {
	  		console.log(date);
	  		var d = new Date(date);
	  		var day = d.getDate();
		  	var monthIndex = d.getMonth();
		  	var year = d.getFullYear();
		  	return day + '/' + ++monthIndex + '/' + year;
		},
		check(){
			let exists=0;
			if(this.authuser){
				for (var i = this.match.users.length - 1; i >= 0; i--) {
					let exists = Object.values(this.match.users[i]).includes(this.authuser.id);
					if(exists==true){
						this.isjoined=1;
						console.log(this.isjoined);
						break;
					}
				}
			}
		}
	},
	asyncData ({ params }) {
	    return axios.get(`/api/singlematch/${params.id}`)
	      	.then((res) => {
	      		console.log(res.data);
	        	return { match: res.data[0] }
	    })
  	}
}
</script>

<style>
	.v-data-table__wrapper td th{
		height: 40px;
	}
	.font-limit{
		font-size: 10px;
    	font-weight: 700;
	}
	.font-limit p{
		padding-top:5px; 
	}
	.font-limit p button i{
		font-size: 14px;
	}
</style>