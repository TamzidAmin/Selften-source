<template>
	<div>
		<p>aaaaaaa</p>
		<v-btn color="primary" @click="placeorder(product.id)" desable>
			Order now
		</v-btn>
	</div>
</template>
<script>
	import { mapMutations, mapGetters } from 'vuex'
	export default{
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
	    },

	}
</script>