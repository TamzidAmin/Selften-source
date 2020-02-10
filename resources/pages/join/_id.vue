<template>
	<div>
		{{ match }}
	</div>
</template>

<script>
import Card from '~/components/Card'
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'
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
	computed: mapGetters({
	   authuser: 'authuser'
	}),
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
	        return { match: res.data[0] }
	      })
  	}
}
</script>

<style>
	
</style>