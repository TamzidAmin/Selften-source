<template>
	<div
		class="mx-auto"
		min-width="300"
		text-align="center"
	> 
		<div v-if="authuser">
			<avatar :username="user.username" v-if="user" backgroundColor="#276749" :size="30"></avatar>
			<p class="display-1 text--primary">
				{{ authuser.username }}
			</p>

			<div
			    class="mx-auto"
			    max-width="276"
			    outlined
			  >
			      <div>
			        <h2>৳{{ authuser.wallet+authuser.earn_wallet }}</h2>
			        <h5>Available Balance</h5>
			      </div>
			</div>

			<div class="root">
		      <div>
		        <h4>{{ authuser.matchesplayed }}</h4>
		        <h6>Match Played</h6>
		      </div>
		
		      <div>
		        <h4>{{ authuser.totalkills }}</h4>
		        <h6>Total Kills</h6>
		      </div>
	
		      <div>
		        <h4>{{ authuser.winamounts }}</h4>
		        <h6>Winnings</h6>
		      </div>
			</div>

			<div class="text--primary">
				
			</div>
		</div>
	</div>
</template>
<script>
	import { mapMutations, mapGetters } from 'vuex'
	import axios from '~/plugins/axios'
	import Avatar from 'vue-avatar'
	export default {
		middleware: 'auth',
		computed: {
			...mapGetters({
			   user: 'user'
			}),
		},

		components: {
		    Avatar
		},

		fetch ({ store, params }) {
		    return axios.get(`/api/updateuser/`+params.id)
		    .then((res) => {
		      store.commit('setUser', res.data)
		    })
		}
	}
</script>
