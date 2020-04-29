<template>
<div style="margin-top: -35px;">
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
	>   
		<div v-if="0">
		 	<div style="width: 320px; margin: auto;border: 1px solid #CA1F4D;padding: 5px;">
		 		<v-alert
		 		class="text-center"
			      v-model="alert1"
				    outlined
			      	type="success"
			     	text
			    >
			      {{ resmessage }}
			    </v-alert>
		 		<p class="text-center" v-if="orders.paymentmathod">{{ orders.paymentmathod.info }}</p>
		 		<hr>
		 		<v-simple-table>
				    <template v-slot:default>
				      <tbody style="font-size: 15px;font-weight: 700;">
					        <tr>
				 				<td>Transaction id: </td>
				 				<td>{{ orders.id }}</td>
				 			</tr>
				 			<tr>
				 				<td>Player id: </td>
				 				<td>{{ orders.playerid }}</td>
				 			</tr>
				 			<tr>
				 				<td>Package: </td>
				 				<td v-if="orders.topuppackage">{{ orders.topuppackage.name }}</td>
				 			</tr>
				 			<tr>
				 				<td>Amount: </td>
				 				<td>{{ orders.amount }} BDT</td>
				 			</tr>
				 			<tr>
				 				<td>Time: </td>
				 				<td>{{ orders.created_at }}</td>
				 			</tr>
				 			<tr>
				 				<td>Status</td>
				 				<td>
				 					<v-btn v-if="orders.status=='pending'" small color="primary">{{ orders.status }}</v-btn>
				 					<v-btn v-else small color="error">{{ orders.status }}</v-btn>
				 				</td>
				 			</tr>
				      </tbody>
				    </template>
				  </v-simple-table>

				<div class="my-2 text-center">
					<nuxt-link class="primary" to='/'>
						Back To Home
					</nuxt-link>
			    </div>
		 	</div>
		</div>
	    <v-row v-else>
	    	<v-col cols="12" md="4" lg="4">
	    		<div v-if="packageinfo[0]">
		    		<div class="product-top-banner__container">
				    	<img :src="'https://admin.selften.com/uploads/topupinfo/'+packageinfo[0].banner" alt="" class="w-100">
				    </div>
				    <div :class="active ? 'product__description' : ''" v-html="packageinfo[0].content">
				    	
				    </div>
				    <a href="#" @click="seemore">See more</a>
			    </div>
	    	</v-col>
	    	<v-col cols="12" md="8" lg="8">
				<v-row>
		    		<v-col md="6" lg="6" class="d-none">

			    		<div class="section select-server">
						    <h2 class="circle">
						        <span>1</span>
						        Enter Player ID
						    </h2>
						    <div class="pl-3">
						        <v-text-field
							        label="Enter Player ID"
							        v-model="playerid"
							    ></v-text-field>

						        <!--<span class="ico-question">?</span>
						        <p class="form__field-instruction-text">Your player ID is shown on the profile page in the app. Example: “5363266446".</p>
						    -->
						    </div>
						</div>
					</v-col>

					<v-col md="6" lg="6">

			    		<div class="section select-server">
						    <h2 class="circle">
						        <span>1</span>
						        Facebook/Gmail ID
						    </h2>
						    <div class="pl-3">
						        <v-text-field
							        label="Facebook/Gmail ID"
							        v-model="ingameid"
							  		:rules="nameRules"
							    ></v-text-field>

						        <!--<span class="ico-question">?</span>
						        <p class="form__field-instruction-text">Your player ID is shown on the profile page in the app. Example: “5363266446".</p>
						    -->
						    </div>
						</div>
					</v-col>
						    
					<v-col md="6" lg="6">

			    		<div class="section select-server">
						    <h2 class="circle">
						        <span>1</span>
						        Password
						    </h2>
						    <div class="pl-3">
						        <v-text-field
							        label="Password"
							        v-model="ingamepassword"
							  		:rules="nameRules"
							    ></v-text-field>

						        <!--<span class="ico-question">?</span>
						        <p class="form__field-instruction-text">Your player ID is shown on the profile page in the app. Example: “5363266446".</p>
						    -->
						    </div>
						</div>
					</v-col>

					<p class="form__field-instruction-text ml-3">Facebook/Gmail ID & Password Required</p>

				</v-row>

				<div class="section select-server">
				    <h2 class="circle">
				        <span>2</span>
				        Select Recharge
				    </h2>
				    <div>
						<div class="row">
						  	<div class="col-md-3 col-6 col-sm-6 text-center" v-for="game in packages" :key="game.id">
					  			<label :for="game.id" class="mb-0 w-100 list-group-item p-2 d-block"  style="font-size: 11px;width:100%;position: relative;    overflow: hidden;">
					  				<span :class="selectedpackage.id==game.id ? 'element-check-label' : ''" style="color: #fff;"> L </span>
						  			<input required style="visibility: hidden;" :id="game.id" @change="changepackage(game)" name="send" :value="game.id" type="radio">
									{{ game.name }}
						  		</label>
						  	</div> 
					  	</div>
				    </div>
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
					  		<nuxt-link :to="/wallet/+authuser.id">
								<v-btn depressed small color="primary">Add Money</v-btn>
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
							        <v-btn :loading="loading" depressed color="primary" v-if="selectedpackage.price>(authuser.wallet+authuser.earn_wallet)" disabled>Buy Now</v-btn>
							        <v-btn  :disabled="!valid" :loading="loading" depressed color="primary" @click="buynow()" v-else>Buy Now</v-btn>
							      </div>
							      <div v-else>
							      	<nuxt-link to="/login">
										<v-btn depressed small color="primary">Buy Now</v-btn>
									</nuxt-link>
							      </div>
								<br>
								<v-alert
							      v-model="alert"
								    outlined
							      	type="success"
							     	text
							    >
							      {{ resmessage }}
							    </v-alert>
							  </div>
					  	</div>
				    </div>
				</div>
	    	</v-col>
	    </v-row>
	</v-form>
	<p style="visibility: hidden">{{ users() }}</p>
</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	import axios from '~/plugins/axios'
	export default {
		data(){
			return{
				alert1:true,
				orders:[],
				ingameid:'',
				ingamepassword:'',
				cal:0,
				packages:[
					{
						id:1,
						name:"25 diamonds",
					},
					{
						id:2,
						name:"50 diamonds",
					},
					{
						id:4,
						name:"310 diamonds",
					},
					{
						id:5,
						name:"25 diamonds",
					},
					{
						id:6,
						name:"50 diamonds",
					},
					{
						id:7,
						name:"310 diamonds",
					}
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
				nameRules: [
					v => !!v || 'is required',
				],
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
				],
				loading:false,
	  			valid: true,
				alert: false,
				resmessage:"Order successfully",
				active:true,
				packageinfo:[]

			}
		},
		computed: mapGetters({
			authuser: 'authuser',
			base_url:'base_url'
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
				let con= confirm("The Money Will Take From your Wallet. Are You Sure Want to Confirm?? ");
					if(con){
					this.loading=true;
					var self = this
					if (this.$refs.form.validate()) {
						axios.post('/api/packageorder', {
						    topuppackage_id: this.selectedpackage.id,
						    name: this.selectedpackage.name,
						    ingameid: this.ingameid,
						    ingamepassword: this.ingamepassword,
						    user_id:this.authuser.id,
						    playerid:this.playerid,
						    emailaddress:'111',
						    status: 'pending',
						    amount:this.selectedpackage.price,
						})
						.then(function (response) {
						    self.loading=false
							self.alert=true
							if(response=='faliled'){
								self.resmessage=response
							}
							self.orders=response.data
						})
						.catch(function (error) {
							self.loading=false;
						    console.log(error);
						});
					}else{
						this.loading=false;
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
		    let pack = await axios.get(`/api/topuppackage/`)
		    let paymentMethod =  await axios.get(`/api/paymentMethod`)
		    let packageinfo =  await axios.get(`/api/topupinfo`)
		    return { 
		    	packages: pack.data,
		    	getways: paymentMethod.data,
		    	packageinfo: packageinfo.data,
		    }
	  	},
	  	head () {
	    return {
		    title: "Free Fire diamond",
		    meta: [
		        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
		        { hid: 'diamond', name: 'diamond', content: 'Free Fire diamond' }
		      ]
		    }
	  	}
	}
</script>

<style>
	.primary{
		color: #fff!important; 
		padding: 10px;
	}
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
	    font-weight: 400;
	    font-size: 20px;
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
	    line-height: 36px;
	    width: 46px;
	    height: 46px;
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
/* 	.select-server{
		background: #C81F4F!important;
	} */
</style>