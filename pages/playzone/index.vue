<template>
<div class="pt-5 text-center min-h-screen">
	<section class="container mx-auto">
		<h3 class="font-bold text-green-100 mt-4 text-xl">PLAYZONE</h3>
		<div class="flex flex-wrap justify-center">
			<div class="mt-5 hover:shadow-xl w-1/2 mx-3 sm:w-1/4 md:w-1/5 xl:w-1/6" v-for="product in topupproduct">
			    <div class="text-center shadow-lg">
			        <nuxt-link :to="/playzone/+product.id">
			            <div class="text-center">
			            	<img class="w-full h-48 object-cover" :src="'https://admin.selften.com/uploads/product/'+product.logo" :alt=" product.name"/>
			            </div>
			            <div>
			                <p class="text-green-100 font-bold py-3">{{ product.name }}</p>
			                <p class="text-green-100 font-normal">{{ product.matches.length }} Match Found</p>
			            </div>
			        </nuxt-link>
			    </div>
			</div>
		</div>
		<div class="mt-3 hidden">
			<button class="ml-3 bg-green-100 border border-green-100 hover:bg-green-200 text-white font-semibold py-2 px-4 rounded uppercase">See All</button>
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
			let topupproduct = await axios.get(`api/matchproduct/`)

			return {
				topupproduct: topupproduct.data,
			}
		}
  	};
</script>