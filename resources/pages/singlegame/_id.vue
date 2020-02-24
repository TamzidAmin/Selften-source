<template>
	<div style="width: 80%;margin: auto;">
		<h2 class="text-center">Prize   {{ check() }}  {{ isjoined }}</h2>
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
		        <tr v-for="(item,index) in match.prizes" :key="item.name">
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
		          <th class="text-left">Total Kill</th>
		          <th class="text-left">Total Win</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match.users" :key="item.name">
		          <td>{{ index+1 }}</td>
		          <td>{{ item.pivot.gamename }}</td>
		          <td>{{ item.pivot.total_kill }}</td>
		          <td>{{ item.pivot.total_earn }}</td>
		        </tr>
		      </tbody>
		    </template>
		</v-simple-table>
		<h2 class="text-center">Rules</h2>
		<div v-html="match.product.rules">
		 	
		</div>
	</div>
</template>

<script>
import Card from '~/components/Card'
import { mapMutations, mapGetters } from 'vuex'
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
        isjoined:0,
        items: [
          'upcoming','ongoing','result',
        ],
      }
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
		},
		check(){
			let exists=0;
			for (var i = this.match.users.length - 1; i >= 0; i--) {
				let exists = Object.values(this.match.users[i]).includes(this.authuser.id);
				if(exists==true){
					this.isjoined=1;
					console.log(this.isjoined);
					break;
				}
			}
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