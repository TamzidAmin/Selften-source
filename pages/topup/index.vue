<template>
<div class="pt-5 text-center min-h-screen">
	<siema ref="siema" auto-play class="hidden">
		<div class="slide">
		  	<img src="~/assets/img/banner.jpg" alt="" class="mx-auto"/>
		</div>

		<div class="slide">
		  	<img src="~/assets/img/banner1.jpg" alt="" class="mx-auto"/>
		</div>

		<div class="slide">
		  	<img src="~/assets/img/banner2.jpg" alt="" class="mx-auto"/>
		</div>
	</siema>
	<section class="container mx-auto">
		<h3 class="font-bold text-green-100 mt-4 text-xl uppercase">top up games credi</h3>
		<div class="flex flex-wrap justify-center">
			<div class="w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6" v-for="product in topupproduct">
				<div class="hover:shadow-xl shadow-lg m-2 border-2 border-green-500">
				    <div class="text-center pt-5">
				        <nuxt-link :to="/topup/+product.id">
				            <div class="text-center">
				            	<img class="w-32 h-32 mx-auto object-contain" :src="'https://admin.selften.com/uploads/product/'+product.logo" :alt=" product.name"/>
				            </div>
				            <div>
				                <p class="text-green-100 font-bold py-3 text-xs md:text-sm">{{ product.name }}</p>
				            </div>
				        </nuxt-link>
				    </div>
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
	<adsbygoogle ad-slot="6929831472" ad-format	="auto"/>
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