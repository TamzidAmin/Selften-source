<template>
<v-layout column justify-center align-center>
	<div> 
		<h2 class="text-center" style="color: #D0254B;">Daily Matches</h2>
		<div class="playzone">
			<div class="single-playzone" v-for="m in match"> 
				 <v-hover> 
			      <template v-slot="{ hover }">
			        <v-card
			          :elevation="hover ? 24 : 6"
			          class="mx-auto pa-2"
			        >
			          	<nuxt-link :to="'gamematch/'+m.id">
			          		<div class="d-flex" style="margin-top: 7px;">
				          		<div>
									<img :src="'https://admin.selften.com/uploads/product/'+m.logo" alt="!opps" height="100px" width="100px" style="object-fit: contain;">
				          		</div>
				          		<div style="padding: 10px">
						          <div>
						          	<h3>{{ m.name }} </h3>
						          </div>
						          <span v-if="m.matches.length==0">No Match Found</span>
						          <span v-else>{{ m.matches.length }} Match Found</span>
					          	</div>
				          	</div>
			          	</nuxt-link>
			        </v-card>
			      </template>
			    </v-hover>
			</div>
		</div>
	</div>
	<div>
		<h2 class="text-center" style="color: #D0254B;">Tournaments</h2>
		<div class="playzone">
			<div class="single-playzone">
				 <v-hover>
			      <template v-slot="{ hover }">
			        <v-card
			          :elevation="hover ? 24 : 6"
			          class="mx-auto pa-2"
			        >
			          	<div class="d-flex" style="margin-top: 7px;">
			          		<div>
								<img src="~/assets/poster.jpg" alt="!opps" height="100px" width="100px" style="object-fit: contain;">
			          		</div>
			          		<div style="padding: 10px">
					          <div>
					          	<h3>Free Fire</h3>
					          </div>
					          <span>Upcoming</span>
				          	</div>
			          	</div>
			        </v-card>
			      </template>
			    </v-hover>
			</div>
			<div class="single-playzone">
				 <v-hover>
			      <template v-slot="{ hover }">
			        <v-card
			          :elevation="hover ? 24 : 6"
			          class="mx-auto pa-2"
			        >
			          	<div class="d-flex" style="margin-top: 7px;">
			          		<div>
								<img src="~/assets/poster.jpg" alt="!opps" height="100px" width="100px" style="object-fit: contain;">
			          		</div>
			          		<div style="padding: 10px">
					          <div>
					          	<h3>PUBG Mobile</h3>
					          </div>
					          <span>Upcoming</span>
				          	</div>
			          	</div>
			        </v-card>
			      </template>
			    </v-hover>
			</div>
			<div class="single-playzone">
				 <v-hover>
			      <template v-slot="{ hover }">
			        <v-card
			          :elevation="hover ? 24 : 6"
			          class="mx-auto pa-2"
			        >
			          	<div class="d-flex" style="margin-top: 7px;">
			          		<div>
								<img src="~/assets/poster.jpg" alt="!opps" height="100px" width="100px" style="object-fit: contain;">
			          		</div>
			          		<div style="padding: 10px">
					          <div>
					          	<h3>Call Of Duty Mobile</h3>
					          </div>
					          <span>Upcoming</span>
				          	</div>
			          	</div>
			        </v-card>
			      </template>
			    </v-hover>
			</div>
		</div>
	</div>
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
	data: () => ({
     	match:[]
    }),
    asyncData ({ params }) {
	    return axios.get(`/api/matchproduct`)
	      .then((res) => {
	        return { match: res.data }
	      })
  	}
}
</script>
<style scoped>
a{
	text-decoration: none;
	color: black;
}
.playzone{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.single-playzone{
	min-width: 285px;
	margin: 10px;
}
</style>
