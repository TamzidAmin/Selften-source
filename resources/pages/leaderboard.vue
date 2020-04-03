<template>
<v-layout column justify-center align-center>
	<h2>Comming Soon</h2>
	{{ leaderboard }}
</v-layout>
</template>

<script>
import Carousels from '~/components/Carousels'
import Navmanu from '~/components/Navmanu'
import Card from '~/components/Card'
import axios from '~/plugins/axios'
export default {
	components:{
		Carousels,
		Card,
		Navmanu
	},
	data () {
			return {
				leaderboard:[]
			}
	},
	async asyncData ({ params }) {
	    // let leaderboard = await axios.get(`/api/leaderboard/`)
	    // return { 
	    // 	leaderboard: leaderboard.data,
	    // }
  	}
}
</script>
