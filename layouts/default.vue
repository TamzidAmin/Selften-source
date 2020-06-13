<template>
<div class="bg-gray-100">
	<div class="min-h">
		<div> <span class="hidden">{{ getnotice }}</span>
			<center v-if="notice[0]">
				<div><marquee behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();" id="MARQUEE1" class="scrolling">
					<b class="text-info">NOTICE : <span class="text-green-100" v-if="notice[0]"> {{ notice[0].notice }}</span></b></marquee>
				</div>
			</center>
		</div>
		<Navbar/>
		<div class="mx-auto">
			<nuxt />
			<div class="container mx-auto">
				<adsbygoogle ad-slot="2896692395" ad-format="auto"/>
			</div>
		</div>
	</div>
	<Footer/>
</div>
</template>

<script>
	import Navbar from '~/components/Navbar.vue'
	import Footer from '~/components/Footer.vue'
	import axios from '~/plugins/axios'
	export default{
		data () {
			return {
				notice:[]
			}
		},
		components: {
			Navbar,
			Footer,
		},
		computed:{
			async getnotice(){
				let notice = await axios.get(`/api/notice/`)
				console.log(notice)
				this.notice=notice.data
			}
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