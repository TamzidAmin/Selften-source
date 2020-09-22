<template>
<div class="container mx-auto text-center"> 
	<div v-if="user">
		<div class="w-12 mx-auto py-3">
			<avatar :username="user.username" v-if="user" backgroundColor="#D81C4B" color="#fff" :size="40"></avatar>
		</div>
		<p class="font-extrabold">
			{{ user.username }}
		</p>

		<router-link :to="'/profile/settings/'+user.id" class="bg-red-500 border border-red-500 hover:bg-red-500 text-white text-xs py-1 px-2 md:px-2 rounded uppercase" v-if="user.account_status=='pending'">
			Not Verified
		</router-link>

		<button class="bg-indigo-500 border border-indigo-500 hover:bg-indigo-500 text-white text-xs py-1 px-2 md:px-2 rounded capitalize font-bold" v-else-if="user.account_status=='active'">
			<div class="flex">
				<div>Verified</div> 
				<div>
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-4 ml-2"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" class=""></path></svg>
				</div>
			</div>
		</button>

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
	        	<h4>{{ user.earn_wallet }}</h4>
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
