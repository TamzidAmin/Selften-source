<template>
<v-layout column justify-center align-center width="100%">
	<h2>Leader Board</h2>
	<template width="100%">
	  <v-simple-table height="500px" width="100%">
	    <template v-slot:default>
	      <thead>
	        <tr>
	          <th class="text-left">Rank</th>
	          <th class="text-left">Name</th>
	          <th class="text-left">Points</th>
	        </tr>
	      </thead>
	      <tbody>
	        <tr v-for="(item,index) in leaderboard" :key="item.id">
	          <td style="color:#9C27B0">{{ index+1 }}</td>
	          <td style="color:#1A237E">{{ item.username }}</td>
	          <td style="color:#B71C1C">{{ item.leaderboard }}</td>
	        </tr>
	      </tbody>
	    </template>
	  </v-simple-table>
	</template>
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
	    let leaderboard = await axios.get(`/api/leaderboard/`)
	    return { 
	    	leaderboard: leaderboard.data,
	    }
  	}
}
</script>
