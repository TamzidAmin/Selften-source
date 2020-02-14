<template>
	<div>
		<v-progress-linear
	      v-model="abcd"
	      height="5"
	      reactive
	      style="width: 96%;margin-left: auto;"
	    >
	    </v-progress-linear>
	</div>
</template>

<script>
	export default {
		props:['abcd']
	}
</script>