<template>
<div class="shadow bg-white">
	<header class="mx-auto container">
		<div class="py-1">
			<nav class="flex items-center justify-between">
				<div class="block lg:hidden">
					<button @click="toggle()"
							class="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
						<svg class="fill-current h-6 w-6 text-gray-700" viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>
				<nuxt-link to="/">
					<img src="~/assets/logo.png" alt="" class="w-24 md:w-40">
				</nuxt-link>
				
				<div class="w-full flex-grow lg:flex items-center lg:w-auto hidden">
					<div class="text-sm lg:flex-grow mt-2 animated jackinthebox xl:mx-8">
			
						<nuxt-link to="/topup"
							class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg">
							TOP-UP
						</nuxt-link>
						<nuxt-link to="/shop"
							class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg">
							SHOP
						</nuxt-link>
						<nuxt-link to="/leaderboard"
							class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg uppercase">
							leaderboard
						</nuxt-link>
						<a href="https://t.me/joinchat/Q77WBk4Jli5iqWsgJqatKw" target="_blank" 
							class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg">
							CONTACT US
						</a>
					</div>
				</div>

				<div class="relative">
					<div class="flex">
						<template v-if="token">
							<button id="userButton" class="flex items-center focus:outline-none mr-3 ml-3" @click="dropdown()">
								<div v-if="user">
									<avatar v-if="user.avatar" :src="user.avatar" backgroundColor="#D81C4B" color="#fff" :size="30"></avatar>
									<avatar v-else :username="user.username" backgroundColor="#D81C4B" color="#fff" :size="30"></avatar>
								</div>
								<div v-if="user" class="flex"><span class="px-3">Hi, {{ user.username }}</span> <svg  aria-hidden="true" focusable="false" data-prefix="fad" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-5 h-5"><g class="fa-group"><path fill="currentColor" d="M160 256.14l-56.51 56.47-96.44-96.15a23.77 23.77 0 0 1-.18-33.61l.18-.18 22.59-22.51a23.94 23.94 0 0 1 33.85 0z" class="fa-secondary"></path><path fill="currentColor" d="M313 182.57L290.21 160a23.94 23.94 0 0 0-33.85 0L103.47 312.61 143 352l.06.06a24 24 0 0 0 33.93-.16L313 216.36l.18-.17a23.78 23.78 0 0 0-.18-33.62z" class="fa-primary"></path></g></svg></div> 
							</button>
						</template>
						<template v-else>
							<div class="p-3">
								<nuxt-link class="bg-white hover:text-white hover:bg-green-100 text-green-800 font-semibold text-sm uppercase px-1 py-1 md:px-4 border border-green-100 rounded shadow" to="/login">
									login
								</nuxt-link>
								<nuxt-link class="ml-3 bg-green-100 border border-green-100 hover:bg-green-200 text-white text-sm font-semibold py-1 px-1 md:px-4 rounded uppercase" to="/register">
									register
								</nuxt-link>
							</div>
						</template>

						<div class="mt-2">
							<nuxt-link  to="/card">
								<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="cart-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-6 w-6 svg-inline--fa text-red-500 fa-cart-plus fa-w-18 fa-2x"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64s64-28.654 64-64c0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM464 424c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm-256 0c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm279.438-152H184.98l-31.31-160h368.548l-34.78 160zM272 200v-16c0-6.627 5.373-12 12-12h32v-32c0-6.627 5.373-12 12-12h16c6.627 0 12 5.373 12 12v32h32c6.627 0 12 5.373 12 12v16c0 6.627-5.373 12-12 12h-32v32c0 6.627-5.373 12-12 12h-16c-6.627 0-12-5.373-12-12v-32h-32c-6.627 0-12-5.373-12-12z" class=""></path></svg>
							</nuxt-link>
						</div>
					</div>
					<div id="userMenu" v-if="token" v-bind:class="activeClass ? '' : 'hidden'"  class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30">
						<ul class="list-reset">
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
								<router-link :to="'/profile/addwallet/'+user.id" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline">
									Add wallet
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

			</nav>
		</div>
		
		<div id="main-nav" class="w-full lg:w-auto hidden absolute left-0 bg-white z-20">
			<div class="text-sm lg:flex-grow mt-2 animated jackinthebox xl:mx-8">
				<nuxt-link to="/topup" @click.native="remove()"
					class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg">
					TOP-UP
				</nuxt-link>
				<nuxt-link to="/shop" @click.native="remove()"
					class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg">
					SHOP
				</nuxt-link>
				<nuxt-link to="/leaderboard" @click.native="remove()"
					class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg uppercase">
					leaderboard
				</nuxt-link>
				<a href="https://www.facebook.com/selften/?notif_id=1589113107445395&notif_t=page_fan&ref=notif" target="_blank" @click="remove()"
					class="block lg:inline-block text-md font-bold hover:text-red-900 mx-2 p-1 rounded-lg">
					CONTACT US
				</a>
			</div>
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

		mounted () {
		    	document.addEventListener('click', this.close)
		    	document.addEventListener('click', this.close1)
		},
	  	beforeDestroy () {
	    	document.removeEventListener('click',this.close)
	    	document.removeEventListener('click',this.close1)
		},
		methods: {
			close (e) {
	      		if (!this.$el.contains(e.target)) {
	      		  	this.activeClass = false
	      		}
    		},
    		close1 (e) {
      			if (!this.$el.contains(e.target)) {
      		  		var $target = document.getElementById('main-nav');
					$target.classList.add('hidden');
      		  	}
      		},
			toggle(){
				var $target = document.getElementById('main-nav');
				$target.classList.toggle('hidden');
			},
			remove(){
				console.log("aaaaaaaaaaaaaa");
				var $target = document.getElementById('main-nav');
				$target.classList.add('hidden');
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

