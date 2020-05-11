<template>
<div class="mt-5">
	<section class="container mx-auto">
		<p class="my-10 text-xl text-green-100" v-if="notice[0]"> <marquee>{{ notice[0].notice }}</marquee> </p>
		<div style="min-height: 350px;max-height: 350px" class="overflow-hidden">
			<a :href="banner[0].link" target="_blank"><img :src="'https://admin.selften.com/uploads/banner/'+banner[0].banner" alt="" class="mx-auto"/></a>
		</div>
	</section>

	<section class="bg-green-100 mt-3">
		<div class="container mx-auto py-20">
			<div class="flex flex-wrap justify-center">
				<div class="w-64 text-center bg-green-500 p-5 rounded m-2">
					<svg class="h-8 w-8 mx-auto text-teal-500" aria-hidden="true" data-prefix="far" data-icon="users" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M544 224c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-112c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM96 224c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-112c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm396.4 210.9c-27.5-40.8-80.7-56-127.8-41.7-14.2 4.3-29.1 6.7-44.7 6.7s-30.5-2.4-44.7-6.7c-47.1-14.3-100.3.8-127.8 41.7-12.4 18.4-19.6 40.5-19.6 64.3V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-44.8c.2-23.8-7-45.9-19.4-64.3zM464 432H176v-44.8c0-36.4 29.2-66.2 65.4-67.2 25.5 10.6 51.9 16 78.6 16 26.7 0 53.1-5.4 78.6-16 36.2 1 65.4 30.7 65.4 67.2V432zm92-176h-24c-17.3 0-33.4 5.3-46.8 14.3 13.4 10.1 25.2 22.2 34.4 36.2 3.9-1.4 8-2.5 12.3-2.5h24c19.8 0 36 16.2 36 36 0 13.2 10.8 24 24 24s24-10.8 24-24c.1-46.3-37.6-84-83.9-84zm-236 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm0-176c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM154.8 270.3c-13.4-9-29.5-14.3-46.8-14.3H84c-46.3 0-84 37.7-84 84 0 13.2 10.8 24 24 24s24-10.8 24-24c0-19.8 16.2-36 36-36h24c4.4 0 8.5 1.1 12.3 2.5 9.3-14 21.1-26.1 34.5-36.2z"/></svg>
					<h1 class="text-4xl text-white font-bold">
						10549
					</h1>
					<p class="text-xl font-medium">Our Customer</p>
				</div>
				<div class="w-64 text-center bg-green-500 p-5 rounded m-2">
					<svg aria-hidden="true" data-prefix="far" data-icon="user-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-8 w-8 mx-auto text-teal-500"><path fill="currentColor" d="M224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96zm89.6 256c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zm224-248h-72v-72c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v72h-72c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h72v72c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-72h72c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16z"/></svg>
					<h1 class="text-4xl text-white font-bold">
						500
					</h1>
					<p class="text-xl font-medium">New Customer</p>
				</div>
				<div class="w-64 text-center bg-green-500 p-5 rounded m-2">
					<svg class="h-8 w-8 mx-auto text-teal-500" aria-hidden="true" data-prefix="far" data-icon="code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M234.8 511.7L196 500.4c-4.2-1.2-6.7-5.7-5.5-9.9L331.3 5.8c1.2-4.2 5.7-6.7 9.9-5.5L380 11.6c4.2 1.2 6.7 5.7 5.5 9.9L244.7 506.2c-1.2 4.3-5.6 6.7-9.9 5.5zm-83.2-121.1l27.2-29c3.1-3.3 2.8-8.5-.5-11.5L72.2 256l106.1-94.1c3.4-3 3.6-8.2.5-11.5l-27.2-29c-3-3.2-8.1-3.4-11.3-.4L2.5 250.2c-3.4 3.2-3.4 8.5 0 11.7L140.3 391c3.2 3 8.2 2.8 11.3-.4zm284.1.4l137.7-129.1c3.4-3.2 3.4-8.5 0-11.7L435.7 121c-3.2-3-8.3-2.9-11.3.4l-27.2 29c-3.1 3.3-2.8 8.5.5 11.5L503.8 256l-106.1 94.1c-3.4 3-3.6 8.2-.5 11.5l27.2 29c3.1 3.2 8.1 3.4 11.3.4z"/></svg>
					<h1 class="text-4xl text-white font-bold">
						10549
					</h1>
					<p class="text-xl font-medium">Our Customer</p>
				</div>
			</div>
		</div>
	</section>
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

