<template>
	<div>
		<v-progress-linear
	      v-model="abcd"
	      height="5"
	      reactive
	      color="indigo darken-2"
	    >
	    </v-progress-linear>
	</div>
</template>

<script>
	export default {
		props:['abcd']
	}
</script>

<style>
	.v-progress-linear__determinate{
		background: #C31F53!important;
	}
	.v-application .indigo.darken-2{
		background: #C31F53!important;
	}
</style>