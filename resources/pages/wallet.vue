<template>
<div>
	<v-card
	    class="mx-auto text-center"
	    max-width="400"
	  >
	    <v-card-text style="padding: 0px;">
	    	<div style="background: #D0254B;color: #fff;padding: 10px;">
	    		<h4 style="font-size: 25px;padding: 18px;">Balance</h4>
		    	<h2 style="font-size: 35px;">৳ {{ authuser.wallet+authuser.earn_wallet }}</h2>
		    	<div class="d-flex" >
		    		<div class="w-50">
		    			<h4>Diposite</h4>
		    			<h2>৳ {{ authuser.wallet }}</h2>
		    		</div>
		    		<div class="w-50">
		    			<h4>Wining</h4>
		    			<h2>৳ {{ authuser.earn_wallet }}</h2>
		    		</div>
		    	</div>
	    	</div>
	    	<div class="d-flex" >
				<div>
					p
				</div>
	    	</div>
	        {{ authuser }}
	    </v-card-text>
	</v-card>
</div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
	data: () => ({
		valid: true,
		name: '',
		nameRules: [
			v => !!v || 'Name is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		select: null,
		items: [
			'Item 1',
			'Item 2',
			'Item 3',
			'Item 4',
		],
		checkbox: false,
	}),
	computed: mapGetters({
	   authuser: 'authuser'
	}),
	methods: {
		validate () {
			if (this.$refs.form.validate()) {
				this.snackbar = true
			}
		},
		reset () {
			this.$refs.form.reset()
		},
		resetValidation () {
			this.$refs.form.resetValidation()
		},
	},
}
</script>