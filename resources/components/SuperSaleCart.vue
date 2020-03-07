<template>
<div class="product-card">
	<div class="product-pic" style="overflow: hidden;">
		<img :src="'https://admin.selften.com/uploads/product/'+product.logo" alt="" width="100%">
	</div>
	<div class="text-center">
		<div>
			<a href="">{{ product.name }}</a>
		</div>
		<div class="product-price">{{ product.price }} BDT</div>
	</div>
	<div class="text-center">
		<v-btn color="primary" @click="placeorder(product.id)" desable>
			Order now
		</v-btn>
	</div>
	<v-alert
	      v-model="alert"
		    outlined
	      	type="success"
	     	text
	    >
	      Request sent successfully
	</v-alert>
</div>
</template>
<script>
	import { mapMutations, mapGetters } from 'vuex'
	import axios from '~/plugins/axios'
	export default {
		props:['product'],
		data: () => ({
	  		alert: false,
	    }),
		computed:mapGetters({
			authuser: 'authuser'
	    }),
	    methods:{
	    	placeorder(id){
	    		var self= this;
	    		if(this.authuser){
	    			axios.post('/api/order', {
						product_id : this.product.id,
						user_id : this.authuser.id,
						amount : this.product.price,
					})
					.then(function (response) {
						console.log(response);
						if(response.data=='success'){
							self.alert=true
						}
					})
					.catch(function (error) {
						console.log(error);
					});
	    		}else{
	    			alert("Please Login to order");
	    		}
	    	}
	    }
	}
</script>

<style>
.product-card{
	width: 310px;
	background: #ecedef;
	text-transform: uppercase;
}
.product-card:hover{
	-webkit-box-shadow: 2.736px 7.518px 20px 0px rgba(0, 0, 0, 0.14);
    -moz-box-shadow: 2.736px 7.518px 20px 0px rgba(0, 0, 0, 0.14);
    -o-box-shadow: 2.736px 7.518px 20px 0px rgba(0, 0, 0, 0.14);
    box-shadow: 2.736px 7.518px 20px 0px rgba(0, 0, 0, 0.14);
    -webkit-transform: translate(0, -5px);
    -moz-transform: translate(0, -5px);
    -ms-transform: translate(0, -5px);
    -o-transform: translate(0, -5px);
    transform: translate(0, -5px);
    transition: .3s all;
}
.product-card h1{
	font-size: 22px;
	margin-bottom: 4px;
}
.product-card p{
	font-size: 13px;
	color: #bbb;
}
.product-pic{
	width: 100%;
	height: 200px;
	background-size: cover;
	background-position: center;
	transition: .6s linear;
}
.product-colors{
	margin-bottom: 40px;
	display: flex;
	justify-content: center;
}

.product-colors span{
	width: 14px;
	height: 14px;
	margin: 0 10px;
	border-radius: 50%;
	cursor: pointer;
	position: relative;
}
.blue{
	background: #7ed6df;
}
.green{
	background: #badc58;
}
.yellow{
	background: #f9ca24;
}
.rose{
	background: #ff7979;
}

.product-colors .active:after{
	content: "";
	width: 22px;
	height: 22px;
	border: 2px solid #8888;
	position: absolute;
	border-radius: 50%;
	box-sizing: border-box;
	left: -4px;
	top: -4px;
}
.product-info{
	display: flex;
	align-items: center;
}
.product-price{
	color: #7ed6df;
	font-size: 26px;
}
.product-button{
	margin-left: auto;
	color: #7ed6df;
	text-decoration: none;
	border: 2px solid;
	padding: 8px 24px;
	border-radius: 20px;
	transition: .4s linear;
}

.product-button:hover{
	transform: scale(1.06);
}

</style>