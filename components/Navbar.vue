<template>
<div class="shadow">
	<div class="bg-white mx-auto container">
		<div class="w-full flex flex-wrap py-2">
			<nav id="header1" class="w-auto flex-1 border-b-1 border-gray-300 order-1 lg:order-2">
				<div class="flex h-full justify-between items-center">
					<div class="relative w-50 px-6">
						<div class="hidden md:block">
							<nuxt-link to="/">
								<img src="~/assets/selften.png" alt="" class="w-40">
							</nuxt-link>
						</div>
					</div>
					<!--Menu-->
					<div class="flex relative inline-block pr-6">
						<div class="relative text-sm">
							<div class="flex">
								<template v-if="token"> 
									<button id="userButton" class="flex items-center focus:outline-none mr-3" @click="dropdown()">
										<avatar :username="user.name" v-if="user" backgroundColor="#276749" :size="30"></avatar>
										<span v-if="user" class="hidden md:inline-block ml-1">Hi, {{ user.name }}</span>
									</button>
								</template>
								<template v-else>
									<nuxt-link class="bg-green-100 hover:bg-green-200 text-white font-bold py-2 px-4 rounded" :to="{ name: 'login' }">
										login
									</nuxt-link>
									<router-link class="ml-3 bg-white hover:text-white hover:bg-green-100 text-green-800 font-semibold py-2 px-4 border border-green-100 rounded shadow" :to="{ name: 'register' }">
										register
									</router-link>
								</template>
							</div>
							<div id="userMenu" v-bind:class="activeClass ? '' : 'hidden'"  class="bg-white nunito rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30">
								<ul class="list-reset">
									<li @click="dropdown()">
										<router-link to="/settings" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline">
											My account
										</router-link>
									</li>
									<li>
										<a href="#" class="px-4 py-2 block text-gray-900 hover:bg-green-400 hover:text-white no-underline hover:no-underline">
											Notifications
										</a>
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
					<!-- / Menu -->
				</div>
			</nav>
		</div>
	</div>
</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data: () => ({
			appName:"a",
			activeClass: false,
		}),

		computed: mapGetters({
			user: 'auth/user',
			token: 'auth/token',
			ismobile: 'sidebar/ismobile'
		}),

		methods: {
			async logout () {
				this.activeClass=!this.activeClass
				await this.$store.dispatch('auth/logout')
				this.$router.push({ name: 'login' })
			}
		},
	};
</script>

