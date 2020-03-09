<template>
<v-layout column justify-center align-center>
	<Carousels :banner="banner"/>
	<div class="mt-3">
		<TimeCountDown 
         :starttime="dateformate(offerproduct[0].start_at)" 
         :endtime="dateformate(offerproduct[0].end_at)" 
         trans='{  
         "day":"Day",
         "hours":"Hours",
         "minutes":"Minuts",
         "seconds":"Seconds",
         "expired":"Event has been expired.",
         "running":"Till the end of event.",
         "upcoming":"Till start of event.",
         "status": {
	        "expired":"Expired",
	        "running":"Running",
	        "upcoming":"Future"
	       }}'
        ></TimeCountDown>
	</div>
	<div class="mt-3 d-flex flex-wrap">
		<SuperSaleCart v-for="(product,key) in offerproduct" key="key" :product="product" />
	</div>
</v-layout>
</template>

<script>
import Carousels from '~/components/Carousels'
import TimeCountDown from '~/components/TimeCountDown'
import SuperSaleCart from '~/components/SuperSaleCart'
import Navmanu from '~/components/Navmanu'
import Card from '~/components/Card'
import axios from '~/plugins/axios'
export default {
	components:{
		Carousels,
		SuperSaleCart,
		Card,
		Navmanu,
		TimeCountDown
	},
	data () {
      return {
      	banner:[],
      	offerproduct:[]
      }
    },
    methods:{
    	dateformate(date){
    		var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];
    		console.log(date);
    		var t = new Date(date);
    		console.log(t);
  			var date1 = t.getDate() + ' ' + monthShortNames[t.getMonth()] + ', ' + t.getFullYear()+' '+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
  			// console.log(date1);
  			return date1;
    	},
    },
	async asyncData ({ params }) {
	    let banner = await axios.get(`/api/banner/`)
	    let offerproduct = await axios.get(`/api/offerproduct/`)

	   	return {
	       banner: banner.data,
	       offerproduct: offerproduct.data
	    }
  	}
}
</script>
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
