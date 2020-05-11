<template>
	<div class="container mx-auto shadow-xl my-5 bg-white p-5">
		<span style="visibility: hidden;">{{ check() }}  {{ isjoined }}</span>
		<div class="text-center">
			<img :src="base_url+'/uploads/product/'+match.product.logo" alt="!opps" class="h-20 w-20 mx-auto object-contain">
		</div>
		<h2 class="text-center text-xl font-bold">{{ match.match_name.substring(0, 30) }}</h2>
		
		<div class="text-center">
			<div v-if="match.status=='upcoming'">
				<button class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"  v-if="match.users.length>=match.max_join">
			       Registration Closed
			    </button>
			    <button color="success" v-else class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg" >
			      Registration open
			    </button>
			</div>
		    <button class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"  v-else-if="match.status=='ongoing'">
		       Live
		    </button>
		</div>

		<p class="py-3 text-center text-capitalize mb-0">Platform: {{ match.platform }}</p>
		
		<div class="flex justify-center">
			<div class="text-center w-32 font-limit">
				<button class="align-middle bg-green-100 hover:bg-green-300 p-1 my-2">
	              <img src="~/assets/tropy1.svg" alt=""  width="25px">
	            </button>
	            <p class="mb-0">{{ match.start_time }}</p>
			</div>
			<div class="text-center w-32 font-limit">
				<button class="align-middle bg-green-100 hover:bg-green-300 p-1 my-2">
	              <img src="~/assets/tropy1.svg" alt=""  width="25px">
	            </button>
	            <p class="mb-0">BDT {{ match.total_prize }}</p>
			</div>
			<div class="text-center w-32 font-limit">
				<button class="align-middle bg-green-100 hover:bg-green-300 p-1 my-2">
	              <img src="~/assets/userp.svg" alt=""  width="25px">
	            </button>
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
import PrizeModel from '~/components/PrizeModel'
import RulesModel from '~/components/RulesModel'
import ParticipantModel from '~/components/ParticipantModel'
import ResultModel from '~/components/ResultModel'
import { mapMutations, mapGetters } from 'vuex'
import axios from '~/plugins/axios'
export default {
	props:['matches'],
	components:{
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
		authuser: 'user',
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
