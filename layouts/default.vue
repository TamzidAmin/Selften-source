<template>
<div class="bg-gray-100">
	<Navbar/>
	<div class="container mx-auto">
		<nuxt />
	</div>
</div>
</template>

<script>
	import Navbar from '~/components/Navbar.vue'
	export default{
		components: {
			Navbar,
			// Footer,
		},
	}
</script>