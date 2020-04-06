<template>
<v-layout column justify-center align-center width="100%">
	<div class="d-flex">
		<h2 class="text-primary p-3">Weekly Competition</h2>
		<div class="p-3 mt-2 text-center">
			<span class="text-primary pt-1 font-weight-bold">Top 3 Prizes:</span>
			<p class="m-0">1. <span class="font-weight-bold" style="font-size: 25px;">400</span></p>
			<p class="m-0">2. 200</p>
			<p class="m-0">3. 100</p>
		</div>
	</div>
	<template width="100%">
		<div class="v-data-table v-data-table--fixed-height theme--light" style="min-width: 350px;">
			<vue-scroll>
				<div style="height: 500px;">
					<table>
						<thead>
							<tr>
								<th class="text-left">Rank</th>
								<th class="text-left">Name</th>
								<th class="text-left">Points</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in leaderboard">
								<th class="text-left">
									<span style="font-size: 18px;">
										<span v-if="index+1==1">
											<img src="~/assets/l1.svg" alt="" style="height:30px;width:30px;margin-left: -8px;">
										</span>
										<span v-else-if="index+1==2">
											<img src="~/assets/l2.svg" alt="" style="height:30px;width:30px;margin-left: -8px;">
										</span>
										<span v-else-if="index+1==3">
											<img src="~/assets/l3.svg" alt="" style="height:30px;width:30px;margin-left: -8px;">
										</span>
										<span v-else>
											{{ index+1 }}
										</span>
									</span>
								</th>
								<th class="text-left"><span style="font-size: 18px;" class="text-primary">{{ item.username }}</span></th>
								<th class="text-left"><span style="font-size: 18px;">{{ item.leaderboard }}</span></th>
							</tr>
						</tbody>
					</table>
				</div>
			</vue-scroll>
			<table v-if="authuser" style="background: black;">
				<tbody>
					<tr>
						<th class="text-left"><span style="font-size: 18px;color: #fff">{{ 11 }}</span></th>
						<th class="text-left"><span style="font-size: 18px;" class="text-primary">{{ authuser.username }}</span></th>
						<th class="text-left"><span style="font-size: 18px;color: #fff">{{ authuser.leaderboard }}</span></th>
					</tr>
				</tbody>
			</table>
		</div>
	</template>
</v-layout>
</template>

<script>
import Carousels from '~/components/Carousels'
import Navmanu from '~/components/Navmanu'
import Card from '~/components/Card'
import axios from '~/plugins/axios'
import { mapMutations, mapGetters } from 'vuex'
export default {
	components:{
		Carousels,
		Card,
		Navmanu,
	},
	computed: mapGetters({
		authuser: 'authuser',
		base_url:'base_url'
	}),
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
