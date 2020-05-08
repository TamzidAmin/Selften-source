<template>
<div class="container mx-auto text-center"> 
	<div v-if="user">
		<div class="w-12 mx-auto py-3">
			<avatar :username="user.username" v-if="user" backgroundColor="#276749" :size="40"></avatar>
		</div>
		<p class="font-extrabold">
			{{ user.username }}
		</p>

		<div class="my-5">
	     	<div class="border-2 w-64 mx-auto p-3">
	        	<h2 class="text-3xl font-bold">৳{{ user.wallet+user.earn_wallet }}</h2>
	        	<h5 class="text-2xl font-bold">Available Balance</h5>
	      	</div>
		</div>

		<div class="flex items-center justify-center">
	      <div class="p-2 font-semibold">
	        <h4>{{ user.matchesplayed }}</h4>
	        <h6>Match Played</h6>
	      </div>
	
	      <div class="p-2 font-semibold">
	        <h4>{{ user.totalkills }}</h4>
	        <h6>Total Kills</h6>
	      </div>

	      <div class="p-2 font-semibold">
	        <h4>{{ user.winamounts }}</h4>
	        <h6>Winnings</h6>
	      </div>
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
