<template>
<div class="container mx-auto">
	<p class="my-10 text-xl">Home Page</p>
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

