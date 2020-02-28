<template>
	<div> {{ check() }}
		<div v-if="match.status=='ongoing'">
			<button class="v-btn disabled v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small primary--text" style="margin-top: 10px;">Closed</button>
		</div>
		<nuxt-link :to="/join/+match.id" v-else-if="authuser && isjoined==0">
			<button class="v-btn v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small primary--text" style="margin-top: 10px;">join</button>
		</nuxt-link>
		<div v-else-if="isjoined">

			<button @click="roomactives" class="v-btn v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small success--text" style="margin-top: 10px;">
				Room Details
			</button>

			<nuxt-link :to="/join/+match.id">
				<button class="v-btn v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small success--text" style="margin-top: 10px;">joined</button>
			</nuxt-link>

			<div v-if="roomactive">
				<span>Room id: {{ match.room_id }}</span>
				<span>Password: {{ match.password }}</span>
			</div>

		</div>
		<div v-else>
			<button onclick="return alert('Please Login to Join');" class="v-btn disabled v-btn--depressed v-btn--flat v-btn--outlined theme--dark v-size--small primary--text" style="margin-top: 10px;">join</button>
		</div>
	</div>
</template>

<script>
	export default {
		props:['match','authuser'],
		data () {
	      return {
	      	isjoined:0,
	      	roomactive:false
	      }
	    },
		methods:{
			roomactives(){
				this.roomactive=!this.roomactive
				console.log(this.roomactive);
			},
			check(){
				if(this.authuser){
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
			}
		}
	}
</script>