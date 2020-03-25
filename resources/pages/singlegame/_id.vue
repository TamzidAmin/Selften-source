<template>
	<div class="max-width-320">
		<span style="visibility: hidden;">{{ check() }}  {{ isjoined }}</span>
		<div class="text-center">
			<img :src="base_url+'/uploads/product/'+match.product.logo" alt="!opps" style="object-fit: contain;width: 120px;height: 120px;">
		</div>
		<h2 class="text-center">{{ match.match_name.substring(0, 30) }}</h2>
		
		<div class="text-center">
			<div v-if="match.status=='upcoming'">
				<v-btn tile small class="danger" v-if="match.users.length>=match.max_join">
			      <v-icon left>mdi-check</v-icon> Registration Closed
			    </v-btn>
			    <v-btn tile small color="success" v-else>
			      <v-icon left>mdi-check</v-icon> Registration open
			    </v-btn>
			</div>
		    <v-btn tile small class="danger" v-else-if="match.status=='ongoing'">
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
	              <img src="~/assets/tropy1.svg" alt=""  width="25px">
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
      	<RulesModel :match='match'/>
      	<div v-if="match.status=='result'">
      		<ResultModel :match='match'/>
      	</div>
      	<div v-else>
      		<ParticipantModel :match='match'/>
      	</div>
	</div>
</template>

<script>
import Card from '~/components/Card'
import PrizeModel from '~/components/PrizeModel'
import RulesModel from '~/components/RulesModel'
import ParticipantModel from '~/components/ParticipantModel'
import ResultModel from '~/components/ResultModel'
import { mapMutations, mapGetters } from 'vuex'
import axios from '~/plugins/axios'
export default {
	props:['matches'],
	components:{
		Card,
		PrizeModel,
		RulesModel,
		ParticipantModel,
		ResultModel
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