<template>
	<div>
		<h2 class="text-center">Prize</h2>
		<v-simple-table dark>
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">S.NO</th>
		          <th class="text-left">Lavel</th>
		          <th class="text-left">Prize</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match[0].prizes" :key="item.name">
		          <td>{{ index+1 }}</td>
		          <td>{{ item.lavel }}</td>
		          <td>{{ item.prize }}</td>
		        </tr>
		      </tbody>
		    </template>
		</v-simple-table>
		<br>
		<h2 class="text-center">Users</h2>
		<v-simple-table dark>
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">S.NO</th>
		          <th class="text-left">Game Name</th>
		          <th class="text-left">Game ID</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match[0].users" :key="item.name">
		          <td>{{ index+1 }}</td>
		          <td>{{ item.pivot.gamename }}</td>
		          <td>{{ item.pivot.gameid }}</td>
		        </tr>
		      </tbody>
		    </template>
		</v-simple-table>
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