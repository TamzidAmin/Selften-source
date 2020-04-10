<template>
	<div class="text-center dropdown" style="width: 150px;">
		<v-menu open-on-hover top offset-y>
			<template v-slot:activator="{ on }">
				<v-btn
					color="primary"
					dark
					small

					v-on="on"
				>
					{{  user.username }} 
					<img src="~/assets/downarrow.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
				</v-btn>
			</template>

			<v-list>
				<v-list-item>
					<nuxt-link :to="/profile/+user.id">
						<img src="~/assets/user.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
						My Profile
					</nuxt-link>
				</v-list-item>

				<v-list-item>
					<nuxt-link :to="/myorder/+user.id">
						<img src="~/assets/cart.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
						My Orders
					</nuxt-link>
				</v-list-item>

				<v-list-item>
					<nuxt-link :to="/wallet/+user.id">
						<img src="~/assets/wallet.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
						My Wallet
					</nuxt-link>
				</v-list-item>

				<v-list-item>
					<nuxt-link :to="/settings/+user.id">
						<img src="~/assets/setting.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
						Settings
					</nuxt-link>
				</v-list-item>

				<v-list-item class="d-none">
					<nuxt-link to="/profile">
						<img src="~/assets/supprot.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
						Support
					</nuxt-link>
				</v-list-item>

				<v-list-item class="d-none">
					<nuxt-link to="/profile">
						<img src="~/assets/users.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;">
						Refer And Earn
					</nuxt-link>
				</v-list-item>

				<v-list-item>
					<a @click="logout">
						<img src="~/assets/logout.svg" alt="" style="width: 16px;margin-left: 7px;margin-right: 10px;margin-right: 10px;">
						<span>Logout</span>
					</a>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined;
	export default {
		props:['user'],
		data: () => ({
			
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

<style scoped="">
	a{
		text-decoration: none;
		color: #DB1B4A!important;
	}
</style>

<style>
	.v-list-item:hover{
		background: #F6F6F6;
	}
	.dropdown img{
		margin-right: 10px!important;
	}
</style>