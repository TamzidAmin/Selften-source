<template>
<div class="shadow bg-white">
	<header class=" mx-auto container">
		<div class="py-1">
			<nav class="flex items-center justify-between flex-wrap">
				<nuxt-link to="/">
					<img src="~/assets/selften.png" alt="" class="w-40">
				</nuxt-link>
				<div class="block lg:hidden">
							<button
							@click="toggle()"
							class="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
							<svg class="fill-current h-6 w-6 text-gray-700" viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>
				<div id="main-nav" class="w-full flex-grow lg:flex items-center lg:w-auto hidden">
						<div class="text-sm lg:flex-grow mt-2 animated jackinthebox xl:mx-8">
							<nuxt-link to="/"
								class="block lg:inline-block text-md font-bold  text-gray-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
								PLAYZONE
							</nuxt-link>
							<nuxt-link to="/topup"
								class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg">
								TOP-UP
							</nuxt-link>
							<nuxt-link to="/shop"
								class="block lg:inline-block text-md font-bold  text-gray-900  sm:hover:border-indigo-400  hover:text-green-100 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
								SHOP
							</nuxt-link>
							<a href="#home"
								class="block lg:inline-block text-md font-bold  text-gray-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
								CONTACT US
							</a>
						</div>
					<div class="relative">
						<div class="flex">
							<template v-if="token"> 
								<button id="userButton" class="flex items-center focus:outline-none mr-3" @click="dropdown()">
									<avatar :username="user.username" v-if="user" backgroundColor="#276749" :size="30"></avatar>
									<span v-if="user" class="hidden md:inline-block ml-1">Hi, {{ user.username }}</span>
								</button>
							</template>
							<template v-else>
								<nuxt-link class="bg-white hover:text-white hover:bg-green-100 text-green-800 font-semibold py-2 uppercase px-4 border border-green-100 rounded shadow" to="/login">
									login
								</nuxt-link>
								<nuxt-link class="ml-3 bg-green-100 border border-green-100 hover:bg-green-200 text-white font-semibold py-2 px-4 rounded uppercase" to="/register">
									register
								</nuxt-link>
							</template>
						</div>
						<div id="userMenu" v-if="token" v-bind:class="activeClass ? '' : 'hidden'"  class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30">
							<ul class="list-reset w-40">
								<li @click="dropdown()">
									<router-link :to="/profile/+user.id" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline">
										My Account
									</router-link>
								</li>
								<li @click="dropdown()">
									<router-link :to="'/profile/order/'+user.id" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline">
										My Order
									</router-link>
								</li>
								<li @click="dropdown()">
									<router-link :to="'/profile/wallet/'+user.id" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline">
										My wallet
									</router-link>
								</li>
								<li @click="dropdown()">
									<router-link :to="'/profile/settings/'+user.id" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline">
										Settings
									</router-link>
								</li>
								<li>
									<hr class="border-t mx-2 border-gray-400">
								</li>
								<li>
									<a href="#" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline" @click="logout">
										Logout
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</div>
	</header>
</div>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined
	import { mapGetters } from 'vuex'
	import Avatar from 'vue-avatar'
	export default {
		data: () => ({
			appName:"a",
			activeClass: false,
		}),

		components: {
		    Avatar
		},

		computed: mapGetters({
			user: 'user',
			token: 'token',
			ismobile: 'sidebar/ismobile'
		}),

		methods: {
			toggle(){
				var $target = document.getElementById('main-nav');
				$target.classList.toggle('hidden');
			},
			async logout () {
				this.activeClass=!this.activeClass
				Cookie.remove('token')
		      	Cookie.remove('setUser')
		      	this.$store.commit('setToken', null)
		      	this.$store.commit('setUser', null)
				this.$router.push('/')
			},
			dropdown(){
				this.activeClass=!this.activeClass
			}
		},
	};
</script>

