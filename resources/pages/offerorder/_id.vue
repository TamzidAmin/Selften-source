<template>
<div style="width: 300px;margin: auto;text-align: center;" v-if="authuser">
	<p v-if="packageinfo[1]" v-html="offerproduct.rules"></p>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
	>

		<v-text-field
			v-model="playerid"
			:rules="nameRules"
			:label="'Player Id'"
			required
		></v-text-field>
		<v-btn v-if="authuser && authuser.wallet+authuser.earn_wallet>=offerproduct.price && offerproduct.start_at!='NULL'" color="primary" @click="placeorder(offerproduct.id)" desable>
			Order now
		</v-btn>
		<div v-if="authuser">
			<div v-if="authuser.wallet+authuser.earn_wallet>=offerproduct.price">
				<p>Your Available Balance BDT {{ authuser.wallet+authuser.earn_wallet }}</p>
				<p>You Need BDT <span v-if="offerproduct.price">{{ offerproduct.price }}</span><span v-else>0</span> to purchase the product</p>
			</div>
	  		<nuxt-link :to="/wallet/+authuser.id" v-else>
				<v-btn depressed small color="primary">Add Money</v-btn>
			</nuxt-link>
		</div>
		<nuxt-link v-else to="/login" class="primary">
			Please Login
		</nuxt-link>
	</v-form>	
	<v-alert
      	v-model="alert"
	    outlined
      	type="success"
     	text
    >
      {{ message }}
    </v-alert>
</div>
</template>
<script>
	import { mapMutations, mapGetters } from 'vuex'
	import axios from '~/plugins/axios'
	export default{
		data: () => ({
			playerid:'',
	  		alert: false,
  			valid: true,
	  		offerproduct:[],
	  		message:"Order successfully",
	  		packageinfo:[],
	  		nameRules: [
				v => !!v || 'Player Id is required',
			]
	    }),
		computed:mapGetters({
			authuser: 'authuser'
	    }),
		methods:{
	    	placeorder(id){
	    		var self = this;
				if (this.$refs.form.validate()) {
	    		var ss=confirm("Are You Sure Want To Purchase This Product");
	    		if(ss){
			    		if(this.authuser){
			    			axios.post('/api/order', {
								product_id : this.offerproduct.id,
								playerid:this.playerid,
								user_id : this.authuser.id,
								amount : this.offerproduct.price,
							})
							.then(function (response) {
								if(response.data=='success'){
									self.alert=true
								}else{
									self.alert=true
									self.message=response.data	
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
	    },
	    async asyncData ({ params }) {
	    	let offerproduct = await axios.get(`/api/offerproduct/`)
		    let packageinfo =  await axios.get(`/api/topupinfo`)
		    return { 
		    	offerproduct: offerproduct.data[0],
		    	packageinfo: packageinfo.data,
		    }
	  	}

	}
</script>