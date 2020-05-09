<template>
<div class="container mx-auto my-5">
	<div class="text-center">
		<div>
			<div>{{ check() }}
				<tbody style="text-align: center;">
					<tr>
						<td style="background: black;color: white;text-align: center;">{{ i.match_name }}</td>
					</tr>
					<tr><td>Available Balance: ৳{{ authuser.wallet }}</td></tr>
					<tr><td>Match Entry Fee Per Person: ৳{{ i.entryfee }}</td></tr>
					<tr v-if="row=='solo'" style="visibility: hidden;"><td>Team Entry Fee : ৳{{ totalfee=i.entryfee }}</td></tr>
					<tr v-if="row=='duo'"><td>Team Entry Fee : ৳{{ totalfee=i.entryfee*2 }}</td></tr>
					<tr v-if="row=='squad'"><td>Team Entry Fee : ৳{{ totalfee=i.entryfee*4 }}</td></tr>
					<tr><td><button small color="primary">{{ i.max_join-i.users.length }} Spots Left</button></td></tr>
				</tbody>
			</div>
		</div>
		<br>
		<form>
		 	<div style="padding: 10px;" width="320px" class="bg-light">
				<table>
					<tbody>
						<tr>
							<td style="background: black;color: white;text-align: center;text-transform: capitalize;">{{ i.type }} Registration</td>
						</tr>
						<tr>
							<td style="padding: 5px;text-align: center;">
								<span v-if="i.type=='duo'">This is Duo match.You can join as Solo or Duo.</span>
								<span v-if="i.type=='solo'">This is Solo match.You can join as Solo.</span>
								<span v-if="i.type=='squad'">This is Squad match.You can join as Solo,Duo or Squad</span>
							</td>
						</tr>
						<tr style="text-align: center;">
							 <td>
								<div v-if="i.type=='duo'" class="d-flex" style="justify-content: center">
									<input type="radio" v-model="row" name="match" label="Solo" value="solo"/>
									<input type="radio" v-model="row" name="match" label="Duo" value="duo"/>
								</div>
								{{  }}
								<div v-if="i.type=='solo'" style="text-align: center">
									<input type="radio" v-model="row" name="match" label="solo" value="solo"/>
								</div>
								<div v-if="i.type=='squad'" class="d-flex" style="justify-content: center">
									<input type="radio" v-model="row" name="match" label="solo" value="solo"/>
									<input type="radio" v-model="row" name="match" label="duo" value="duo"/>
									<input type="radio" v-model="row" name="match" label="squad" value="squad"/>
								</div>
							 </td>
						</tr>
						<tr class="text-center">
							<td class="text-center">
								Enter Your Exact {{ i.product.name }} Name
							</td>
						</tr>
						<tr style="text-align: center;">
							<td>
								<div v-if="row=='solo'" style="padding: 10px">
									<input
										v-model="player1"
										class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
										:placeholder="'Player 1 '+i.product.name+' Name'"
										required
									/>
                        			<div class="error text-red-900" v-if="!$v.player1.required">Player is required</div>
								</div>
								<div v-if="row=='duo'" style="padding: 10px">
										<input
											v-model="player1"
											class="px-3 py-3 my-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
											 :placeholder="'Player 1 '+i.product.name+' Name'"
											required
										/>
										<input
											v-model="player2"
											class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
											:placeholder="'Player 2 '+i.product.name+' Name'"
											required
										/>
								</div>
								<div v-if="row=='squad'" style="padding: 10px">
										<input
											v-model="player1"
											class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
											 :placeholder="'Player 1 '+i.product.name+' Name'"
											required
										/>
										<input
											v-model="player2"
											class="px-3 py-3 my-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
											 :placeholder="'Player 2 '+i.product.name+' Name'"
											required
										/>
										<input
											v-model="player3"
											class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
											 :placeholder="'Player 3 '+i.product.name+' Name'"
											required
										/>
										<input
											v-model="player4"
											class="px-3 py-3 my-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
											:placeholder="'Player 4 '+i.product.name+' Name'"
											required
										/>
								</div>
								<div> 
									<button v-if="(authuser.wallet+authuser.earn_wallet)>=totalfee && isjoined==0" @click="join" class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Join</button>
									<button v-else-if="isjoined==1" class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg opacity-50">Joined</button>
									<nuxt-link :to="/wallet/+authuser.id" v-else>
										<button class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Add Money</button>
									</nuxt-link>
								</div>
								<p class="text-red-500" v-if="submitStatus === 'OK'">{{  error }}</p>
								<p class="text-red-500" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
								<p class="text-red-500" v-if="submitStatus === 'PENDING'">Sending...</p>
								</td>
							</tr>
					</tbody>
				</table>
				<br>
			</div>
		</form>		
	</div>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from '~/plugins/axios'
import { required } from 'vuelidate/lib/validators'

export default {
	props:['matches'],
	data () {
		return {
			error:null,
			alert: false,
  			valid: true,
			dialog: false,
			totalfee:0,
			i:[],
			player1:'',
			player2:'',
			player3:'',
			player4:'',
			row:'solo',
			tab: null,
			isjoined:0,
			knowledge: 0,
			items: [
				'upcoming','ongoing','result',
			],
			submitStatus:null
		}
	},
	computed: mapGetters({
		authuser: 'user',
		base_url:'base_url'
	}),
	validations: {
	    player1: {
	      required
	    },
	},
	methods: {
		clode(){
			this.alert=false
		},
		join(){
			var self = this;
			this.$v.$touch()
		  	this.loading=true;
			if (this.$v.$invalid) {
	    		this.submitStatus = 'ERROR'
	  		}else {
	  			this.submitStatus = 'PENDING'
				self.isjoined=1;
				axios.post(`/api/join/${this.i.id}`,{
					user_id: this.authuser.id,
					match_id: this.i.id,
					player1: this.player1,
					player2: this.player2,
					player3: this.player3,
					player4: this.player4,
					type: this.row,
					fee:this.totalfee
				})
				.then((res) => {
					self.submitStatus = 'OK'
					self.alert=true
					console.log(res);
				})
			}
		},
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
			for (var i = this.i.users.length - 1; i >= 0; i--) {
				if(this.i.users[i].id==this.authuser.id){
					this.isjoined=1;
					break;
				}
			}
		}
	},
	asyncData ({ params }) {
		return axios.get(`/api/singlematch/${params.id}`)
		.then((res) => {
			console.log(res.data[0].users);
			return { i: res.data[0] }
		})
	}
}
</script>
<style>
.v-input--radio-group__input{
	text-transform: capitalize;
}
.bg-light{
	background: #F5F5F5!important;
}
.single-box{
	justify-content: center;
	text-align: center;
}
.single-box div{
	width: 33.33%;
}
.single-box div h5{
	color: black;
	padding: 5px 0px;
}
.single-box div span{
	color: #D0254B;
	
}
a{
	text-decoration: none;
}
span{
	font-size: 15px;
}
.v-list-item{
	padding: 0px!important;
}
.content{
	margin-left: 10px;
}
.v-slide-group__content{
	justify-content: center!important;
}
.root{
	display: flex;
	flex-wrap: wrap;
	justify-content: center!important;
}
</style>
<style scoped>
.card_2nd_right{
	padding: 0px 10px;
	font-size: 15px;
}
.playzone{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	color: #000000;
}
.playzone img{
	object-fit:cover;
}
.single-playzone{
	display: flex;
}
.playzone > div {
	padding: 10px;
	min-width: 320px;
	max-width: 320px;
	margin: 10px;
	background: #F1F1F1;
	-webkit-box-shadow: 3px 3px 5px 6px #ccc;
	-moz-box-shadow: 3px 3px 5px 6px #ccc;
	box-shadow: -2px 2px 8px 6px #ccc;
}
ul{
	list-style: none;
	padding: 0px!important;
	margin: 0px;
	
}
ul li{
	padding: 0px!important;
	margin: 0px!important;

}
ul p{
	margin-bottom: 0px!important;
}
img{
	width: 100%;
}
</style>
