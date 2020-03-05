<template>
<v-layout column justify-center align-center>
	<Carousels :banner="banner"/>
	<div class="mt-3">
		<TimeCountDown 
         starttime="Jun 5, 2020 15:37:25" 
         endtime="Nov 8, 2021 16:37:25" 
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
		<SuperSaleCart/>
		<SuperSaleCart/>
		<SuperSaleCart/>
		<SuperSaleCart/>
		<SuperSaleCart/>
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
      }
    },
	asyncData ({ params }) {
	    return axios.get(`/api/banner/`)
	      	.then((res) => {
	      		console.log(res.data);
	        	return { banner: res.data }
	    })
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
