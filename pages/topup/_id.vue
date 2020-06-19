<template>
<div class="container mx-auto shadow-md">
	
    <div class="my-3 md:flex p-3 bg-white">
    	<div v-if="packages.topuptype==1" class="md:w-1/3">
			<div v-if="packageinfo[0]">
	    		<div class="product-top-banner__container">
			    	<img :src="'https://admin.selften.com/uploads/topupinfo/'+packageinfo[0].banner" alt="" class="w-100">
			    </div>
			    <div :class="active ? 'product__description' : ''" v-html="packageinfo[0].content">
			    	
			    </div>
			    <a href="#" v-if="packageinfo[0].content" @click="seemore">See more</a>
		    </div>
		</div>
		<div v-else class="md:w-1/3">
			<div v-html="packages.rules">
			    
			</div>
		</div>
		<div class="md:w-2/3">
	     	<form @submit.prevent="buynow()" method="post">
	    		<div class="section select-server" v-if="packages.topuptype==1">
				    <h2 class="circle font-bold">
				        <span>1</span>
				        Enter Player ID
				    </h2>
				    <div class="pl-3">
				        <input
				        	class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
					       	placeholder="Enter Player ID"
					        v-model="playerid"
					    />
				    </div>
                    <div class="error text-red-900 ml-3 mb-3" v-if="!$v.playerid.required">Playerid is required</div>
				</div>
				<div v-else class="section select-server flex flex-wrap justify-center">
					<div class="w-full md:w-1/3">
                    	<h2 class="circle font-bold">
					        <span>1</span>
					    </h2>
					    <div class="mt-5 pl-3">
					    	<label class="font-semibold">Account Type</label>
					        <select v-model="accounttype" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full">
					        	<option value="null">Select And Option</option>
					        	<option value="facebook">Facebook</option>
					        	<option value="gmail">Gmail</option>
					        </select>
	                    	<div class="error text-red-900 mb-3" v-if="!$v.accounttype.required">Account type is required</div>
					    </div>
                    </div>

					<div class="w-full md:w-1/3">
						<h2 class="circle font-bold">
					        <span>1</span>
					    </h2>
					    <div class="pl-3 mt-5">
					    	<label class="font-semibold">
					    		<span v-if="accounttype=='gmail'">Your Gmail</span>
					    		<span v-else>Facebook Number</span>
					    	</label>
					        <input
					        	class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
						       	:placeholder="accounttype=='gmail' ? 'Enter Email' : 'Enter Number'"
						        v-model="playerid"
						    />
					    </div>
	                    <div class="error text-red-900 ml-3 mb-3" v-if="!$v.playerid.required">Facebook/Gmail is required</div>
					</div>

                    <div class="w-full md:w-1/3">
                    	<h2 class="circle font-bold">
					        <span>1</span>
					    </h2>
					    <div class="mt-5 pl-3">
					    	<label class="font-semibold">Password</label>
					        <input
					        	class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
						       	placeholder="Enter Password"
						        v-model.trim="$v.ingamepassword.$model"
						    />
	                    	<div class="error text-red-900 mb-3" v-if="!$v.ingamepassword.required">Password is required</div>
					    </div>
                    </div>
				</div>
				<div class="section select-server">
				    <h2 class="circle">
				        <span>2</span>
				        Select Recharge
				    </h2>
				    <div class="flex flex-wrap justify-center">
					  	<div class="text-center w-40" v-for="game in packages.topuppackage" :key="game.id">
					  		<div class="m-1">
					  			<label :for="game.id" class="mb-0 w-40 list-group-item px-1 py-3 d-block"  style="font-size: 11px;position: relative;    overflow: hidden;">
					  				<span class="absolute left-0" :class="selectedpackage.id==game.id ? 'element-check-label' : ''" style="color: #fff;"> L </span>
						  			<input class="absolute" required style="visibility: hidden;" :id="game.id" @change="changepackage(game)" name="send" :value="game.id" type="radio">
									<span class="text-xs">{{ game.name }}</span> <sup class="text-green-100">BDT{{ game.price }}</sup>
						  		</label>
						  	</div>
					  	</div> 
				    </div>
                    <div class="error text-red-900 ml-3 text-center" v-if="!$v.selectedpackage.required">Package is required</div>
				</div>
				<div class="section select-server">
				    <h2 class="circle">
				        <span>3</span>
				    </h2>
				    <div v-if="authuser && selectedpackage.price>(authuser.wallet+authuser.earn_wallet)">
						<div class="row">
						  	<div class="col-md-12 col-12 col-sm-12 text-center mt-4">
					  			 <p>Your Available Balance BDT {{ authuser.wallet+authuser.earn_wallet }}</p>
					  			 <p>You Need BDT <span v-if="selectedpackage.price">{{ selectedpackage.price }}</span><span v-else>0</span> to purchase the product</p>
						  		<nuxt-link :to="'/profile/wallet/'+authuser.id">
									<button class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Add Money</button>
								</nuxt-link>
						  	</div> 
						</div>
				    </div>
				    <div v-else-if="authuser">
				    	<div class="row">
						  	 <div class="col-md-12 col-12 col-sm-12 text-center mt-4">
					  			 <p>Your Available Balance BDT {{ authuser.wallet+authuser.earn_wallet }}</p>
					  			 <p>You Need BDT <span v-if="selectedpackage.price">{{ selectedpackage.price }}</span><span v-else>0</span> to purchase the product</p>
						  	</div> 
						 </div>
				    </div>
				    <div v-else>
				    	<div class="row">
						  	<div class="col-md-12 col-12 col-sm-12 text-center mt-4">
					  			<p>You Need BDT <span v-if="selectedpackage.price">{{ selectedpackage.price }}</span><span v-else>0</span> to purchase the product</p>
						  	</div> 
						 </div>
				    </div>
				</div>
				<div>
				    <div>
						<div class="row">
							<div class="col-md-12 text-right">
							  	 <div v-if="authuser">
							  	 	<button v-if="selectedpackage.price>(authuser.wallet+authuser.earn_wallet)" class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg opacity-50">Buy Now</button>
										
									<t-button class="mt-3" :loading="loading">
										Buy Now
									</t-button>

							      </div>
							      <div v-else>
							      	<nuxt-link to="/login">
										<button class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Buy Now</button>
									</nuxt-link>
							      </div>
								<br>
							</div>
							<p class="text-red-500 font-extrabold text-2xl" v-if="submitStatus === 'OK'">{{  resmessage }}</p>
							<p class="text-red-500" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
							<p class="text-red-500" v-if="submitStatus === 'PENDING'">Sending...</p>
					  	</div>
				    </div>
				</div>
				<p style="visibility: hidden">{{ users() }}</p>
   			</form>
		</div>
    </div>
</div>
</template>

<script>
	import TButton from '~/components/Button'
	import { mapMutations, mapGetters } from 'vuex'
	import { required } from 'vuelidate/lib/validators'
	import axios from '~/plugins/axios'
	export default {
		data(){
			return{
				alert1:true,
				orders:[],
				ingameid:null,
				ingamepassword:null,
				cal:0,
				accounttype:null,
				packages:[
					
				],
				getways:[
					{
						name:"Bksh",
						logo:"https://admin.selften.com/uploads/payment/1582898292684_logo.png",
						id:1,
					},
					{
						name:"Nogod",
						logo:"https://admin.selften.com/uploads/payment/1582787174633_logo.png",
						id:2,
					},
				],
				selectedpackage:[],
				selectedmgetway:[],
				playerid:null,
				emailaddress:'',
				loading:false,
	  			valid: true,
				alert: false,
				resmessage:"Order successfully",
				active:true,
				packageinfo:[],
				submitStatus: null
			}
		},
		components:{
	    	TButton
	    },
		validations: {
		    playerid: {
		      required
		    },
		    ingamepassword: {
		      required
		    },
		    selectedpackage: {
		      required
		    },
		    accounttype: {
		      required
		    }
		},
		computed: mapGetters({
			authuser: 'user',
			base_url:'base_url',
			token:'token',
		}),
		methods:{
			async users(){
				if(this.authuser && this.cal==0){
					this.cal=1;
					let { data } = await axios.get(`/api/updateuser/`+this.authuser.id);
					this.$store.commit('setUser', data)
					console.log(data);
				}
			},
			seemore(){
				this.active=!this.active
			},
			changepackage(g){
				this.selectedpackage=g;
			},
			changegetway(p){
				this.selectedmgetway=p;
			},
			buynow(){
				console.log(this.token)
					if(this.packages.topuptype==1){
						this.ingamepassword="IDCODE"
						this.accounttype="1"
					}
					let con= confirm("The Money Will Take From your Wallet. Are You Sure Want to Confirm?? ");
					if(con){
					this.loading=true;
					var self = this
					this.$v.$touch()
				  	this.loading=true;
					if (this.$v.$invalid) {
			    		this.submitStatus = 'ERROR'
			  		}else {
			  			this.submitStatus = 'PENDING'
						axios.post('/api/packageorder', {
						    topuppackage_id: this.selectedpackage.id,
						    accounttype: this.accounttype,
						    name: this.selectedpackage.name,
						    product_id: this.selectedpackage.product_id,
						    ingameid: this.ingameid,
						    ingamepassword: this.ingamepassword,
						    user_id:this.authuser.id,
						    playerid:this.playerid,
						    emailaddress:'111',
						    status: 'pending',
						    amount:this.selectedpackage.price,
						    bprice:this.selectedpackage.bprice,
						},{
				        headers: { 'Authorization': 'Bearer '+this.token.accessToken }
				      	})
						.then(function (response) {
							self.submitStatus = 'OK'
						    self.loading=false
							self.alert=true
							if(response.data=='faliled'){
								self.resmessage="Please Add Money"
							}
							if(response.data=='StockOut'){
								self.resmessage="Stock Out"
							}
							self.orders=response.data
						})
						.catch(function (error) {
							self.loading=false;
						    console.log(error);
						});
					}
				}
			},
			async datat(){
				if(this.authuser){
				    let orders = await axios.get(`/api/pendingorder/`+this.authuser.id)
				    this.orders=orders.data
				}
			}
		},
		async asyncData ({ params }) {
		    let pack = await axios.get(`/api/topuppackage/`+params.id)
		    let paymentMethod =  await axios.get(`/api/paymentMethod`)
		    let packageinfo =  await axios.get(`/api/topupinfo`)
		    return { 
		    	packages: pack.data[0],
		    	getways: paymentMethod.data,
		    	packageinfo: packageinfo.data,
		    }
	  	},
	  	head () {
		    return {
			    title: "Free Fire diamond",
			    meta: [
			        { hid: 'diamond', name: 'diamond', content: 'Free Fire diamond' }
			    ]
			}
	  	}
	}
</script>

<style>
	.product__description{
		height: 29px;
		overflow: hidden;
	}
	.list-group-item {
	    display: table-cell;
	    text-decoration: none;
	    color: #666;
	    font-weight: 700;
	    font-size: 14px;
	    text-align: center;
	    border: 1px solid #ccc;
	    border-radius: 4px;
	    word-break: break-word;
	}
	.element-check-label {
	   background-color: #E01B4C;
	    color: #fff;
	    width: 20px;
	    height: 52px;
	    text-align: center;
	    position: absolute;
	    line-height: 52px;
	    top: -19px;
	    z-index: 5;
	    left: -1px;
	    transform: rotate(45deg) scaleX(-1);
	    font-size: 14px;
	    font-weight: 700;
	}
	.section {
	    padding: 15px 5px;
	    margin: 20px 0;
	    box-shadow: 0 1px 6px rgba(57,73,76,.35)!important;
	    animation: fadeIn ease 1s;
	    position: relative;
	}
	.circle {
	    font-size: 15px;
	    color: #333;
	    padding-left: 55px;
	    margin-top: -12px;
	    margin-bottom: 8px;
	}
	.circle span {
	    border-radius: 50%;
	    border: 4px solid #C81F4E;
	    color: #fcfcfc;
	    margin-right: 5px;
	    background-color: #C81F4E;
	    font-weight: 700;
	    font-size: 18px;
	    position: absolute;
	    top: -10px;
	    left: 10px;
	    line-height: 30px;
	    width: 36px;
	    height: 36px;
	    text-align: center;
	}
	.ico-question {
	    background-color: #f66b1c;
	    color: #fff;
	    border-radius: 50%;
	    width: 24px;
	    height: 24px;
	    line-height: 24px;
	    display: inline-block;
	    text-align: center;
	    cursor: pointer;
	}
</style>