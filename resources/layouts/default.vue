<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action>
						<svg style="width: 40px;height: 40px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gamepad-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-gamepad-alt fa-w-20 fa-2x"><path fill="currentColor" d="M638.59 368.22l-33.37-211.59c-8.86-50.26-48.4-90.77-100.66-103.13h-.07a803.19 803.19 0 0 0-369 0C83.17 65.86 43.64 106.36 34.78 156.63L1.41 368.22C-8.9 426.73 38.8 480 101.51 480c49.67 0 93.77-30.07 109.48-74.64l7.52-21.36h203l7.49 21.36C444.72 449.93 488.82 480 538.49 480c62.71 0 110.41-53.27 100.1-111.78zM280 236a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52h-52a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm152 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z" class=""></path></svg>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>

			</v-list>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="clipped" fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<div class="logo">
				<img src="~/assets/selften.png" alt="" width="100%"/>
			</div>
			<v-spacer></v-spacer>
			<div class="d-flex" style="min-width: 170px;" v-if="authuser==null"> 
				<Login/>
				<Register/>
			</div>
			<div class="text-right" style="min-width: 170px;" v-else> 
				
				<v-btn
					color="primary"
					dark
					@click="logout"
					outlined
					small
				>
					Logout
				</v-btn>

			</div>
		</v-app-bar>
		<v-content>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
			<v-list>
				<v-list-item @click.native="right = !right">
					<v-list-item-action>
						<v-icon light>
							mdi-repeat
						</v-icon>
					</v-list-item-action>
					<v-list-item-title>Switch drawer (click me)</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<Footer/>
	</v-app>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	import Navbar from '~/components/Navbar.vue'
	import Footer from '~/components/Footer.vue'
	import Login from '~/components/Login.vue'
	import Register from '~/components/Register.vue'
	const Cookie = process.client ? require('js-cookie') : undefined;
	export default {
		data() {
			return {
				clipped: false,
				drawer: false,
				fixed: false,
				items: [
					{
						icon: 'mdi-apps',
						title: 'Home',
						to: '/'
					},
					{
						icon: 'mdi-apps',
						title: 'PlayZone',
						to: '/playzone'
					},
					{
						icon: 'mdi-apps',
						title: 'Top-Up',
						to: '/topup'
					},
					{
						icon: 'mdi-apps',
						title: 'Digital Code',
						to: '/digitalcode'
					},
					{
						icon: 'mdi-apps',
						title: 'Leaderboard',
						to: '/leaderboard'
					},
				],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: 'Vuetify.js'
			}
		},
		components: {
			Login,
			Register,
			Navbar,
			Footer
		},
		computed: mapGetters({
		   authuser: 'authuser'
		}),
		methods: {
		    logout () {
		      Cookie.remove('auth')
		      Cookie.remove('setUser')
		      this.$store.commit('setAuth', null)
		      this.$store.commit('setUser', null)
		    }
		}
	}
</script>

<style>
	body{
		overflow-x: hidden!important;
	}
	.drow-root{
		display: flex;
	}
	.logo{
		width: 130px;
	}
	.auth{
		margin-right: 0px;
		width: 76%;
		display: flex;
		justify-content: flex-end;
	}
	.login{
		width: 100px;
	}
	.v-application .primary{
		background: #C91F4E!important;
	}
	.v-application .primary--text{
		color: #C91F4E!important;
	}
</style>
