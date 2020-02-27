<template>
	<v-card
		class="mx-auto"
		min-width="300"
		text-align="center"
	>
		<v-card-text>
		   <v-avatar color="indigo">
		      <v-icon dark>mdi-account-circle</v-icon>
		    </v-avatar>
			<p class="display-1 text--primary">
				{{ authuser.username }}
			</p>

			<v-card
			    class="mx-auto"
			    max-width="276"
			    outlined
			  >
			      <v-list-item-content>
			        <h2>৳{{ authuser.wallet+authuser.earn_wallet }}</h2>
			        <h5>Available Balance</h5>
			      </v-list-item-content>
			</v-card>

			<div class="root">
		      <v-list-item-content>
		        <h4>{{ authuser.matchesplayed }}</h4>
		        <h6>Match Played</h6>
		      </v-list-item-content>
		
		      <v-list-item-content>
		        <h4>{{ authuser.totalkills }}</h4>
		        <h6>Total Kills</h6>
		      </v-list-item-content>
	
		      <v-list-item-content>
		        <h4>{{ authuser.winamounts }}</h4>
		        <h6>Winnings</h6>
		      </v-list-item-content>
			</div>

			<div class="text--primary">
				
			</div>
		</v-card-text>
	</v-card>
</template>
<script>
	import { mapMutations, mapGetters } from 'vuex'
	export default {
		computed: mapGetters({
		   authuser: 'authuser'
		}),
		asyncData () {
			return axios.get(`/api/updateuser/`+authuser.id)
			.then((res) => {
				return { authuser: res.data }
			})
		}
	}
</script>
<style scoped="">
	.root{
		margin-top: 5px;
	    display: -webkit-box;
	    display: flex;
	    flex-wrap: wrap;
	    width: 300px;
	    justify-content: center;
	    margin: 10px auto;
	}
	.v-card__text{
		margin-top: 20px;
		text-align: center;
	}
	.text--primary{
		text-transform: capitalize;
	}
	h5{
		font-size: 22px;
		margin-top: 6px;
		font-weight: 500;
	}
	h2{
		font-size: 30px;
	}
	h4{
		font-size: 18px;
	}
	H6{
		font-size: 12px;
	}
</style>