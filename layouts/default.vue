<template>
<div class="bg-gray-100">
	<div class="min-h">
		<Navbar/>
		<div class="mx-auto">
			<nuxt />
			<div class="container mx-auto"><adsbygoogle ad-slot="2896692395" ad-format="auto"/></div>
		</div>
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
	.min-h{
		min-height: 93vh!important;
	}
</style>