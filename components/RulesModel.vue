<template>
  <v-row justify="center">
	<div class="my-2 text-center">
    	<v-btn small class="w-300" color="secondary" dark @click.stop="dialog = true">RULES</v-btn>
  	</div>

	<v-dialog
	  v-model="dialog"
	  max-width="290"
	>
	  <v-card>
		<h2 class="text-center">Rules</h2>
		<div v-html="match.product.rules">
		 	
		</div>

		<div class="text-right">
		  <v-btn
		  	class="m-3"
			color="primary"
			small
			@click="dialog = false"
		  >
			Close
		  </v-btn>
		</div>
	  </v-card>
	</v-dialog>
  </v-row>
</template>
<script>
  export default {
  	props:['match'],
	data () {
	  return {
		dialog: false,
	  }
	},
  }
</script>