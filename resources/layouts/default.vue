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
						<v-icon>{{ item.icon }}</v-icon>
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
			<div class="d-flex" style="min-width: 170px;">
				<Login/>
				<Register/>
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
	import Navbar from '~/components/Navbar.vue'
	import Footer from '~/components/Footer.vue'
	import Login from '~/components/Login.vue'
	import Register from '~/components/Register.vue'
	export default {
		data() {
			return {
				clipped: false,
				drawer: false,
				fixed: false,
				items: [
					{
						icon: 'mdi-apps',
						title: 'Welcome',
						to: '/'
					},
					{
						icon: 'mdi-chart-bubble',
						title: 'Inspire',
						to: '/inspire'
					}
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
