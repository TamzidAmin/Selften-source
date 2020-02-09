<template>
<v-layout column justify-center align-center>
	<v-card class="text-center" style="width: 100%">
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
				  > 
				    <v-list-item three-line style="padding: 10px;margin: 10px;">
				    	<v-card style="padding: 10px;" class="bg-light">
				    		<nuxt-link :to="/singlegame/+i.id">
						    	<div class="d-flex">
						    		<div>
						    			<img :src="'http://127.0.0.1:3333/uploads/product/'+i.product.logo" alt="!opps" style="object-fit: contain;width: 75px;height: 75px;">
						    		</div>
						    		<div class="content">
						    			<h2 class="text-left">{{ i.match_name }}</h2>
						    			<div class="d-flex">
						    				<div style="margin-right: 10px;">
						    					<span>Time : {{ formatDate(i.start_at) }} at {{ i.start_time }}</span>
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
								<div class="" style="display: flex;">
			    					<div style="width: 75%;margin-top: 12px">
			    						<v-progress-linear
									      v-model="knowledge"
									      height="5"
									      reactive
									      style="width: 96%;margin-left: auto;"
									    >
									    </v-progress-linear>
										<span style="font-size: 12px;">
										Only {{ i.max_join-i.users.length }} spots left</span> {{ i.users.length }}/{{ i.max_join }}
										 <span style="visibility: hidden"> {{ knowledge=(i.users.length/i.max_join)*100 }}</span>
			    					</div>
			    					<div style="width: 25%">
			    						<button class="v-btn v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small primary--text" style="margin-top: 10px;">join</button>
			    					</div>
			    				</div>
						    </nuxt-link>
				    	</v-card>
				    </v-list-item>
				 </div>
				 
	        </div>
	      </v-tab-item>
	    </v-tabs-items>
	 </v-card>
</v-layout>
</template>

<script>
import Carousels from '~/components/Carousels'
import Navmanu from '~/components/Navmanu'
import Card from '~/components/Card'
import axios from '~/plugins/axios'
export default {
	props:['matches'],
	components:{
		Carousels,
		Card,
		Navmanu
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
	computed:{
	
	},
	methods: {
	  	formatDate(date) {
	  		console.log(date);
	  		var d = new Date(date);
	  		var day = d.getDate();
		  	var monthIndex = d.getMonth();
		  	var year = d.getFullYear();
		  	return day + '/' + ++monthIndex + '/' + year;
		}
	},
	asyncData ({ params }) {
		console.log(params);
	    return axios.get(`/api/match/${params.id}`)
	      .then((res) => {
	        return { match: res.data }
	      })
  	}
}
</script>
<style>
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
