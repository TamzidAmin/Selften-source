<template>
<v-container>
    <v-row>
    	<v-col cols="12" md="4" lg="4">
    		<div class="product-top-banner__container">
		    	<img src="https://cdn1.codashop.com/S/content/common/images/mno/freefire_640x241_in.jpg" alt="" class="w-100">
		    </div>
		    <div class="product__name">Free Fire</div>
		    <div class="product__description">Top up using bKash and get a 7D Gear set for Free + 30BDT cashback from bKash.
		        <br>
		        <br>
		        <b>Free Fire Terms and Conditions:</b>
		        <br> Get a Free 7D Gear set with any top-up using bKash (Once during an entire month)
		        <br>
		        <br> Content of 7D Gear Set - 7D Blood Moon Scar,7D New Year MP40, 7D Carnival M4A1,7D Shimada AK,7D Rome Fama, 7D Pharoah M1014 ,and 7D Cheetah SKS .
		        <br>
		        <br> The gift will be sent on the following day of the top-up via in-game mail between 15:00 - 18:00 GMT+8.
		        <br>
		        <br>
		        <b>bKash Terms and Conditions:</b>
		        <br> Customer is entitled for 30 BDT cashback on purchase of BDT 200 or above
		        <br>
		        <br> Customers can avail this offer only one time in the whole campaign period from 12th March till 8th April 2020.
		        <br>
		        <br> Offer applicable for PUBG Mobile &amp; Free Fire available <a href="">here</a>
		        <br>
		        <br> Free Fire direct Top-up! Buy Free Fire diamonds on Codashop and pay using bKash. Simply enter your Player ID, and diamonds will be added in your game account as soon as your payment has been confirmed. No credit card, registration or login required. This is the best way to buy diamonds online without a credit card!
		    </div>
    	</v-col>
    	<v-col cols="12" md="8" lg="8">
    		<div class="section select-server">
			    <h2 class="circle">
			        <span>1</span>
			        Enter Player ID
			    </h2>
			    <div class="pl-3">
			        <v-text-field
				        label="Enter Player ID"
				        required
				    ></v-text-field>

			        <!--<span class="ico-question">?</span>
			        <p class="form__field-instruction-text">Your player ID is shown on the profile page in the app. Example: “5363266446".</p>
			    -->
			    </div>
			</div>

			<div class="section select-server">
			    <h2 class="circle">
			        <span>2</span>
			        Select Recharge
			    </h2>
			    <div class="pl-3">
					<div class="row">
				  	 <div class="col-md-3 col-12 col-sm-4 text-center" v-for="game in packages" :key="game.id">
			  			<label :for="game.id" class="mb-0 w-100 list-group-item p-2 d-block"  style="position: relative;    overflow: hidden;">
			  				<span :class="selectedpackage.id==game.id ? 'element-check-label' : ''" style="color: #fff;"> L </span>
				  			<input style="visibility: hidden;" :id="game.id" @change="changepackage(game)" name="send" :value="game.id" type="radio">
							{{ game.name }}
				  		</label>
				  	</div> 
				  </div>
			    </div>
			</div>

			<div class="section select-server">
			    <h2 class="circle">
			        <span>3</span>
			        Select payment
			    </h2>
			    <div class="pl-3">
					<div class="row">
				  	 <div class="col-md-3 col-12 col-sm-4 text-center" v-for="getway in getways" :key="getway.id">
			  			<label :for="'g'+getway.id" class="mb-0 w-100 list-group-item p-2 d-block"  style="position: relative;    overflow: hidden;display: flex!important;padding-left: 25px;align-items: center;">
			  				<span :class="selectedmgetway.id==getway.id ? 'element-check-label' : ''" style="color: #fff;"> L </span>
			  				<img :src="getway.logo" :alt="getway.name" style="width: 35px;height: 35px;">
				  			<input style="visibility: hidden;" :id="'g'+getway.id" @change="changegetway(getway)" name="getway" :value="getway.id" type="radio">
							{{ getway.name }}
				  		</label>
				  	</div> 
				  </div>
			    </div>
			</div>
			<div class="section select-server">
			    <h2 class="circle">
			        <span>4</span>
			       	Buy!
			    </h2>
			    <div class="pl-3">
			    	<p>OPTIONAL: If you would like a receipt of the purchase by email, please enter an email address</p>
					<div class="row">
						 <div class="col-md-12">
						 	<v-text-field
					            label="Email Address"
					            required
					          ></v-text-field>
						 </div>
						  <div class="col-md-12 text-right">
						  	 <div>
						        <v-btn depressed color="primary">Buy Now</v-btn>
						      </div>
						  </div>
				  	</div>
			    </div>
			</div>
    	</v-col>
    </v-row>
</v-container>
</template>

<script>
	export default {
		data(){
			return{
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
			}
		},
		methods:{
			changepackage(g){
				console.log(g);
				this.selectedpackage=g;
			},
			changegetway(p){
				console.log(p);
				this.selectedmgetway=p;
			}
		}
	}
</script>

<style>
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
</style>