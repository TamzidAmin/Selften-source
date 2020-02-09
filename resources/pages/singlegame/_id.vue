<template>
	<div>
		<p>{{ match }}</p>
	</div>
</template>

<script>
import Card from '~/components/Card'
import axios from '~/plugins/axios'
export default {
	props:['matches'],
	components:{
		Card,
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
	    return axios.get(`/api/singlematch/${params.id}`)
	      .then((res) => {
	        return { match: res.data }
	      })
  	}
}
</script>

<style>
	
</style>