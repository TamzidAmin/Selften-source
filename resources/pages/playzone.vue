<template>
<v-layout column justify-center align-center>
	<div class="text-center" style="width: 100%">
	    <v-tabs
	      v-model="tab"
	      align-with-title
	    >
	      <v-tabs-slider color="yellow"></v-tabs-slider>

	      <v-tab style="justify-content: center;" v-for="item in items" @click="fetchdata(item)" :key="item">
	        {{ item }}
	      </v-tab>
	    </v-tabs>
		
	    <v-tabs-items v-model="tab">  
		
			<div v-if="loding">
				<v-progress-circular
			      :size="70"
			      :width="7"
			      color="purple"
			      indeterminate
			    ></v-progress-circular>
			</div>

	      <v-tab-item
	        v-for="item in items"
	        :key="item"
	      >
	        <div class="root">
		         <div
		         	style="border-radius: 15px;"
				    v-for="i in match"
				   	v-if="i.status==item"
				  > 
				    <v-list-item three-line style="padding: 10px;margin: 10px;border: 3px solid #C91F4E;border-radius: 15px;overflow: hidden">
				    	<v-card style="padding: 10px;" class="bg-light">
				    		<nuxt-link :to="/singlegame/+i.id">
						    	<div class="d-flex">
						    		<div>
						    			<img :src="base_url+'/uploads/product/'+i.product.logo" alt="!opps" style="object-fit: contain;width: 75px;height: 75px;">
						    		</div>
						    		<div class="content">
						    			<h2 class="text-left">{{ i.match_name.substring(0, 16) }}</h2>
						    			<div class="d-flex">
						    				<div>
						    					<span class="time">Time : {{ formatDate(i.start_at) }} at {{ i.start_time }}</span>
						    				</div>
						    			</div>
						    		</div>
						    	</div>
					    		<div class="d-flex single-box">
									<div style="margin-right: 10px;">
				    					<h5 style="font-size: 10px">TOTAL PRIZE</h5>
				    					<span>৳ {{ i.total_prize }}</span>
				    				</div>
									<div style="margin-right: 10px;">
				    					<h5 style="font-size: 10px">PER KILL</h5>
				    					<span>৳ {{ i.perkill }}</span>
				    				</div>
					    			<div style="margin-right: 10px;">
				    					<h5 style="font-size: 10px">ENTRY FEE</h5>
				    					<span>৳ {{ i.entryfee }}</span>
				    				</div>
					    		</div>
					    		<div class="d-flex single-box">
									<div style="margin-right: 10px;">
				    					<h5 style="font-size: 10px">TYPE</h5>
				    					<span style="text-transform: capitalize">{{ i.type }}</span>
				    				</div>
									<div style="margin-right: 10px;">
				    					<h5 style="font-size: 10px">PLATFORM</h5>
				    					<span class="text-capitalize">{{ i.platform }}</span>
				    				</div>
					    			<div style="margin-right: 10px;">
				    					<h5 style="font-size: 10px">MAP</h5>
				    					<span>{{ i.map.name }}</span>
				    				</div>
					    		</div>
						    </nuxt-link>
							<div style="display: flex;" class="text-left">
		    					<div style="width: 100%;margin-top: 12px">
		    						<Prograsvar   :abcd="(i.users.length/i.max_join)*100"/>
									<div class="d-flex">
										<div class="w-50" style="font-size: 12px;">
											Only {{ i.max_join-i.users.length }} spots left
										</div>
										<div class="w-50 text-right">
											{{ i.users.length }}/{{ i.max_join }}
										</div>
									</div>
		    					</div>

		    				</div>
		    				<div style="display: flex;">
			    				<div style="width: 100%">
		    						<div v-if="i.users.length>=i.max_join">
										<button class="v-btn disabled v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small primary--text" style="margin-top: 10px;">Closed</button>
									</div>
									<div v-else-if="i.status=='result'">
										<button class="v-btn disabled v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small primary--text" style="margin-top: 10px;">Closed</button>
									</div>
		    						<div v-else>
		    							<Joinbutton :match="i" :authuser='authuser'/>
		    						</div>
		    					</div>
		    				</div>
				    	</v-card>
				    </v-list-item>
				 </div>
	        </div>
	      </v-tab-item>
	    </v-tabs-items>
	 </div>
</v-layout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Carousels from '~/components/Carousels'
import Navmanu from '~/components/Navmanu'
import Joinbutton from '~/components/Joinbutton'
import Card from '~/components/Card'
import Prograsvar from '~/components/Prograsvar'
import axios from '~/plugins/axios'
export default {
	props:['matches'],
	components:{
		Carousels,
		Card,
		Navmanu,
		Joinbutton,
		Prograsvar
	},
    data () {
      return {
      	match:[],
        tab: null,
        knowledge: 0,
        loding:false,
        items: [
          'upcoming','ongoing','result',
        ],
      }
    },
	computed: {
		...mapGetters({
		   authuser: 'authuser',
		   base_url:'base_url'
		})
	},
	methods: {
		fetchdata(item){
			this.loding=true;
			console.log(item);
			var self = this;
			axios.get(`/api/matchs/`+item)
		      .then((res) => {
		      	self.loding=false;
		      	self.match=res.data;
		    })
		},
	  	formatDate(date) {
	  		var d = new Date(date);
	  		var day = d.getDate();
		  	var monthIndex = d.getMonth();
		  	var year = d.getFullYear();
		  	return day + '/' + ++monthIndex + '/' + year;
		},
		check(){
			let exists=0;
			for (var i = this.i.users.length - 1; i >= 0; i--) {
				let exists = Object.values(this.i.users[i]).includes(this.authuser.id);
				if(exists==true){
					this.isjoined=1;
					console.log(this.isjoined);
					break;
				}
			}
		}
	},
	asyncData ({ params }) {
	    return axios.get(`/api/matchs/upcoming`)
	      .then((res) => {
	        return { match: res.data }
	    })
  	}
}
</script>

<style>
	.bg-color{
		background: #C91F4E;
		margin:5px;
	}
	@media only screen and (max-width: 320px) {
		.time{
			font-size: 11px!important;
		}
		.content{
			font-size: 20px;
		}
		.content h2{
			font-size: 17px;
		}
		h5{
			font-size: 11px;
		}
	}
	.v-slide-group__prev--disabled{
		display: none!important;
	}
	.v-tab{
		margin-left: 0px!important;
	}
	.bg-light{
		background: #F5F5F5!important;
	}
	.single-box{
		justify-content: center;
		text-align: center;
	}
	.single-box div{
		width: 33.33%;
	}
	.single-box div h5{
		color: black;
		padding: 5px 0px;
	}
	.single-box div span{
		color: #D0254B;
		
	}
	a{
		text-decoration: none;
	}
	span{
		font-size: 15px;
	}
	.v-list-item{
		padding: 0px!important;
	}
	.content{
		margin-left: 10px;
		color: black;
		font-weight: 700;
	}
	.v-slide-group__content{
		justify-content: center!important;
	}
	.root{
		display: flex;
		flex-wrap: wrap;
		justify-content: center!important;
	}
	</style>
	<style scoped>
	.card_2nd_right{
		    padding: 0px 10px;
	    font-size: 15px;
	}
	.playzone{
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: center;
	    color: #000000;
	}
	.playzone img{
	    object-fit:cover;
	}
	.single-playzone{
		display: flex;
	}
	.playzone > div {
		padding: 10px;
	    min-width: 320px;
	    max-width: 320px;
	    margin: 10px;
	    background: #F1F1F1;
	    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
	    -moz-box-shadow: 3px 3px 5px 6px #ccc;
	    box-shadow: -2px 2px 8px 6px #ccc;
	}
	ul{
		list-style: none;
		padding: 0px!important;
		margin: 0px;
		
	}
	ul li{
		padding: 0px!important;
		margin: 0px!important;

	}
	ul p{
		margin-bottom: 0px!important;
	}
	img{
		width: 100%;
	}
</style>
