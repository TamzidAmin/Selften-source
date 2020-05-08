<template>
<div class="min-h-screen">
	<div class="container">
		<p>Home Page</p>
	</div>
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

