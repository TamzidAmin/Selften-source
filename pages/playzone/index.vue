<template>
<div class="pt-5 text-center min-h-screen">
	<section class="container mx-auto">
		<h3 class="font-bold text-green-100 mt-4 text-xl">PLAYZONE</h3>
		<div class="flex flex-wrap justify-center">
			<div v-for="product in topupproduct" class="mt-5 w-1/2 md:w-1/3 xl:w-1/6">
				<div class="mx-1 hover:shadow-xl shadow-lg border-2 border-green-500">
				    <div class="text-center">
				        <nuxt-link :to="/playzone/+product.id">
				            <div class="text-center pt-5">
				            	<img class="w-32 h-32 mx-auto object-contain" :src="'https://admin.selften.com/uploads/product/'+product.logo" :alt=" product.name"/>
				            </div>
				            <div>
				                <p class="text-green-100 font-bold py-3">{{ product.name }}</p>
				                <p class="text-green-100 font-normal">{{ product.matches.length }} Match Found</p>
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
	
	<div style="min-height: 350px;max-height: 350px">
			
		<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<!-- ads2 -->
		<ins class="adsbygoogle"
		     style="display:block"
		     data-ad-client="ca-pub-2716727174821674"
		     data-ad-slot="7639053074"
		     data-ad-format="auto"
		     data-full-width-responsive="true"></ins>
		<script>
		     (adsbygoogle = window.adsbygoogle || []).push({});
		</script>

	</div>

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