<template>
<v-layout column justify-center align-center>
	<div class="text-center" style="width: 100%">
	    <v-tabs
	      v-model="tab"
	      align-with-title
	    >
	      <v-tabs-slider color="yellow"></v-tabs-slider>

	      <v-tab style="justify-content: center;" v-for="item in items" :key="item">
	        {{ item }}
	      </v-tab>
	    </v-tabs>

	    <v-tabs-items v-model="tab">  
	      <v-tab-item
	        v-for="item in items"
	        :key="item"
	      >
	        <div class="root">
		         <div
				    v-for="i in match"
				   	v-if="i.status==item"
				   	class="bg-color"
				  > 
				    <v-list-item three-line style="padding: 10px;margin: 10px;">
				    	<v-card style="padding: 10px;" class="bg-light">
				    		<nuxt-link :to="/singlegame/+i.id">
						    	<div class="d-flex">
						    		<div>
						    			<img :src="base_url+'/uploads/product/'+i.product.logo" alt="!opps" style="object-fit: contain;width: 75px;height: 75px;">
						    		</div>
						    		<div class="content">
						    			<h2 class="text-left">{{ i.match_name }}</h2>
						    			<div class="d-flex">
						    				<div style="margin-right: 10px;">
						    					<span class="time">Time : {{ formatDate(i.start_at) }} at {{ i.start_time }}</span>
						    				</div>
						    			</div>
						    		</div>
						    	</div>
					    		<div class="d-flex single-box">
									<div style="margin-right: 10px;">
				    					<h5>TOTAL PRIZE</h5>
				    					<span>৳ {{ i.total_prize }}</span>
				    				</div>
									<div style="margin-right: 10px;">
				    					<h5>PER KILL</h5>
				    					<span>৳ {{ i.perkill }}</span>
				    				</div>
					    			<div style="margin-right: 10px;">
				    					<h5>ENTRY FEE</h5>
				    					<span>৳ {{ i.entryfee }}</span>
				    				</div>
					    		</div>
					    		<div class="d-flex single-box">
									<div style="margin-right: 10px;">
				    					<h5>TYPE</h5>
				    					<span style="text-transform: capitalize">{{ i.type }}</span>
				    				</div>
									<div style="margin-right: 10px;">
				    					<h5>PLATFORM</h5>
				    					<span>{{ i.platform }}</span>
				    				</div>
					    			<div style="margin-right: 10px;">
				    					<h5>MAP</h5>
				    					<span>{{ i.map.name }}</span>
				    				</div>
					    		</div>
						    </nuxt-link>
							<div class="" style="display: flex;">
		    					<div style="width: 75%;margin-top: 12px">
		    						<Prograsvar :abcd="(i.users.length/i.max_join)*100"/>
									<span style="font-size: 12px;">
									Only {{ i.max_join-i.users.length }} spots left</span> {{ i.users.length }}/{{ i.max_join }}
		    					</div>
		    					<div style="width: 25%">
		    						<Joinbutton :match="i" :authuser='authuser'/>
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
	    return axios.get(`/api/match/${params.id}`)
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
			font-size: 12px!important;
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
