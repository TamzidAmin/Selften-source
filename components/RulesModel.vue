<template>
  <div>
	<div class="my-2 text-center">
    	<button small class="w-300" color="secondary" dark @click.stop="dialog = true">RULES</button>
  	</div>

	<div
	  v-model="dialog"
	  max-width="290"
	>
	  <div>
		<h2 class="text-center">Rules</h2>
		<div v-html="match.product.rules">
		 	
		</div>

		<div class="text-right">
		  <button
		  	class="m-3"
			color="primary"
			small
			@click="dialog = false"
		  >
			Close
		  </button>
		</div>
	  </div>
	</div>
  </div>
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