<template>
<div class="bg-gray-100">
	<Navbar/>
	<div class="mx-auto">
		<nuxt />
	</div>
	<Footer/>
</div>
</template>

<script>
	import Navbar from '~/components/Navbar.vue'
	import Footer from '~/components/Footer.vue'
	export default{
		components: {
			Navbar,
			Footer,
		},
	}
</script>

<style>
	.nuxt-link-exact-active{
		color: #D81C4B;
		background: #fff;
	}
</style>