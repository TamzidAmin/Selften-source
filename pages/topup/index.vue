<template>
	<div class="pt-5 text-center min-h-screen">

		<siema ref="siema" auto-play>
			<div class="slide">
			  	<img src="~/assets/img/banner.jpg" alt="" class="mx-auto">
			</div>

			<div class="slide">
			  	<img src="~/assets/img/banner1.jpg" alt="" class="mx-auto">
			</div>

			<div class="slide">
			  	<img src="~/assets/img/banner2.jpg" alt="" class="mx-auto">
			</div>
		</siema>
		<section class="container mx-auto">
			<h3 class="font-bold text-green-100 mt-4 text-xl">VOUCHER PURCHASE</h3>
			<div class="flex flex-wrap justify-center">
				<div class="mt-5 hover:shadow-xl w-1/2 sm:w-1/4 md:w-1/5 xl:w-1/6" v-for="product in topupproduct">
				    <div class="text-center shadow-lg">
				        <nuxt-link :to="/topup/+product.id">
				            <div class="text-center">
				            	<img class="w-full h-48 object-cover" :src="'https://admin.selften.com/uploads/product/'+product.logo" :alt=" product.name">
				            </div>
				            <div>
				                <p class="text-green-100 font-bold py-3">{{ product.name }}</p>
				            </div>
				        </nuxt-link>
				    </div>
				</div>
			</div>
			<div class="mt-3 hidden">
				<button class="ml-3 bg-green-100 border border-green-100 hover:bg-green-200 text-white font-semibold py-2 px-4 rounded uppercase">See All</button>
			</div>
		</section>

		<section class="bg-white mt-10 py-10">
			<div class="container mx-auto h-64">
				<h3 class="font-bold text-green-100 mt-4 text-xl py-3">Top-up or Buy game's item, cheap and fast only at selften.com</h3>
			</div>
		</section>

	</div>
</template>

<script>
	import axios from '~/plugins/axios'
	export default {
		data () {
			return {
				topupproduct:[],
			}
		},
		async asyncData ({ params }) {
			let topupproduct = await axios.get(`api/topupproduct/`)

			return {
				topupproduct: topupproduct.data,
			}
		}
  	};
</script>