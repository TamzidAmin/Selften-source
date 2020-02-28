<template>
	<div>
		<v-progress-linear
	      v-model="abcd"
	      height="5"
	      reactive
	    >
	    </v-progress-linear>
	</div>
</template>

<script>
	export default {
		props:['abcd']
	}
</script>