<template>
<div class="container mx-auto my-5">
	<p class="my-10 text-xl text-green-100"> <marquee>{{ notice[0].notice }}</marquee> </p>
	<siema ref="siema" auto-play>
		<div class="slide" v-for="b in banner">
		  	<a :href="b.link" target="_blank"><img :src="'https://admin.selften.com/uploads/banner/'+b.banner" alt="" class="mx-auto"/></a>
		</div>
	</siema>
</div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
	data () {
		return {
			banner:[],
			offerproduct:[],
			notice:[]
		}
	},
	computed:{
			
	},
	methods:{
		
	},
	async asyncData ({ params }) {
		let banner = await axios.get(`/api/banner/`)
		let notice = await axios.get(`/api/notice/`)
		let offerproduct = await axios.get(`/api/offerproduct/`)

		return {
			banner: banner.data,
			offerproduct: offerproduct.data,
			notice: notice.data,
		}
	}
}
</script>

