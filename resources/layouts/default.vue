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
					:to="'/'"
					router
					exact
				>
					<v-list-item-action>
						<div>
							<img src="~/assets/sidebaricon/home.svg" alt="" style="height: 30px;width: 30px;">
						</div>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="'Home'" />
					</v-list-item-content>
				</v-list-item>

				<v-list-item
					:to="'/playzone'"
					router
					exact
				>
					<v-list-item-action>
						<div>
							<img src="~/assets/sidebaricon/play.svg" alt="" style="height: 30px;width: 30px;">
						</div>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="'PlayZone'" />
					</v-list-item-content>
				</v-list-item>
					
				<v-list-item
					:to="'/topup'"
					router
					exact
				>
					<v-list-item-action>
						<div>
							<img src="~/assets/sidebaricon/topup.svg" alt="" style="height: 30px;width: 30px;">
						</div>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="'Top-Up'" />
					</v-list-item-content>
				</v-list-item>

				<v-list-item
					:to="'/leaderboard'"
					router
					exact
				>
					<v-list-item-action>
						<div>
							<img src="~/assets/tropy.svg" alt="" style="height: 30px;width: 30px;">
						</div>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="'Leaderboard'" />
					</v-list-item-content>
				</v-list-item>

			</v-list>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="clipped" fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<div class="logo">
				<nuxt-link to="/">
					<img src="~/assets/selften.png" alt="" width="100%"/>
				</nuxt-link>
			</div>
			<v-spacer></v-spacer>
			<div class="d-flex" style="min-width: 170px;" v-if="authuser==null"> 
				<Login class="abc"/>
				<Register class="abc"/>
			</div>
			<div class="text-right" style="min-width: 170px;" v-else> 
				<Dropdown :user="authuser"/>
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
	import Dropdown from '~/components/Dropdown.vue'
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
			Footer,
			Dropdown
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
				this.$router.push('/')
		    }
		},
		mounted() {
		  
		}
	}
</script>

<style>
	.v-menu__content--fixed{
		top: 30px!important;
	}
	.w-50{
		width: 50%;
	}
	.v-list-item__action{
		width: 30px;
	    height: 30px;
	    margin: 10px;
	}
	.v-list-item__action svg{
		color: #C81F4E;
	}
	body{
		overflow-x: hidden!important;
	}
	.drow-root{
		display: flex;
	}
	.abc .primary--text{
		margin-right: 38px!important;
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
	@media only screen and (max-width: 425px) {
		.abc .primary--text{
			margin-right: -14px!important;
		}
		.abc .v-btn__content{
			font-size: 11px;
		}
		.abc button{
			padding: 0 9.444444px;
		}
	}
</style>
