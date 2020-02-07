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
				    	<v-card style="padding: 10px;">
					    	<div class="d-flex">
					    		<div>
					    			<img :src="'http://127.0.0.1:3333/uploads/product/'+i.product.logo" alt="!opps" style="object-fit: contain;width: 75px;height: 75px;">
					    		</div>
					    		<div class="content">
					    			<h2 class="text-left">{{ i.match_name }}</h2>
					    			<div class="d-flex">
					    				<div style="margin-right: 10px;">
					    					<img src="~/assets/clendar.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
					    					<span>{{ formatDate(i.start_at) }} | {{ i.start_time }}</span>
					    				</div>
					    				<div>
					    					<img src="~/assets/userp.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
					    					<span>{{ i.users.length }} / {{ i.max_join }}</span>
					    				</div>
					    			</div>
					    			<div class="d-flex">
					    				<div style="margin-right: 10px;">
					    					<img src="~/assets/trophy.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
					    					<span>{{ i.total_prize }}</span>
					    				</div>
					    				<div>
					    					<img src="~/assets/money.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
					    					<span>{{ i.entryfee }} </span>
					    				</div>
					    			</div>
					    			<div class="d-flex">
					    				<div style="margin-right: 10px;">
					    					<img src="~/assets/map.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
					    					<span>{{ i.map.name }}</span>
					    				</div>
					    				<div>
					    					<div v-if="i.type=='solo'">
						    					<img src="~/assets/solo.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
						    					<span>{{ i.type }} </span>
					    					</div>
					    					<div v-if="i.type=='duo'">
						    					<img src="~/assets/duo.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
						    					<span>{{ i.type }} </span>
					    					</div>
					    					<div v-if="i.type=='squad'">
						    					<img src="~/assets/userp.svg" alt="!opps" style="object-fit: contain;width: 17px;height: 17px;">
						    					<span>{{ i.type }} </span>
					    					</div>
					    				</div>
					    			</div>
					    		</div>
					    	</div>
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
