<template>
	<v-row>
		<v-col cols="3" sm="3" md="3" xl="3">
			<nuxt-link to="/playzone">
				<svg style="width: 75px;height: 75px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gamepad-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-gamepad-alt fa-w-20 fa-2x"><path fill="currentColor" d="M638.59 368.22l-33.37-211.59c-8.86-50.26-48.4-90.77-100.66-103.13h-.07a803.19 803.19 0 0 0-369 0C83.17 65.86 43.64 106.36 34.78 156.63L1.41 368.22C-8.9 426.73 38.8 480 101.51 480c49.67 0 93.77-30.07 109.48-74.64l7.52-21.36h203l7.49 21.36C444.72 449.93 488.82 480 538.49 480c62.71 0 110.41-53.27 100.1-111.78zM280 236a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52h-52a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm152 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z" class=""></path></svg>
				<p>PlayZone</p>
			</nuxt-link>
		</v-col>
		<v-col cols="3" sm="3" md="3" xl="3">
			<nuxt-link to="/topup">
				<svg style="width: 75px;height: 75px;"  aria-hidden="true" focusable="false" data-prefix="fal" data-icon="credit-card" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-credit-card fa-w-18 fa-2x"><path fill="currentColor" d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM48 64h480c8.8 0 16 7.2 16 16v48H32V80c0-8.8 7.2-16 16-16zm480 384H48c-8.8 0-16-7.2-16-16V224h512v208c0 8.8-7.2 16-16 16zm-336-84v8c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v8c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" class=""></path></svg>
				<p>Top-Up</p>
			</nuxt-link>
		</v-col>
		<v-col cols="3" sm="3" md="3" xl="3">
			<nuxt-link to="/">
				<svg style="width: 75px;height: 75px;" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="hotjar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-hotjar fa-w-14 fa-2x"><path fill="currentColor" d="M414.9 161.5C340.2 29 121.1 0 121.1 0S222.2 110.4 93 197.7C11.3 252.8-21 324.4 14 402.6c26.8 59.9 83.5 84.3 144.6 93.4-29.2-55.1-6.6-122.4-4.1-129.6 57.1 86.4 165 0 110.8-93.9 71 15.4 81.6 138.6 27.1 215.5 80.5-25.3 134.1-88.9 148.8-145.6 15.5-59.3 3.7-127.9-26.3-180.9z" class=""></path></svg>
				<p>Digital Code</p>
			</nuxt-link>
		</v-col>
		<v-col cols="3" sm="3" md="3" xl="3">
			<nuxt-link to="/leaderboard">
				<svg style="width: 75px;height: 75px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trophy-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-trophy-alt fa-w-18 fa-2x"><path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 66.5 77.9 131.7 171.9 142.4C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6C498.4 275.6 576 210.3 576 144V88c0-13.3-10.7-24-24-24zM64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-47.5-16.4-77-49.9-77-70.2zm448 0c0 20.2-29.4 53.8-77 70.2 7-25 11.8-53.6 12.8-86.2H512v16zm-127.3 4.7l-39.6 38.6 9.4 54.6c1.7 9.8-8.7 17.2-17.4 12.6l-49-25.8-49 25.8c-8.8 4.6-19.1-2.9-17.4-12.6l9.4-54.6-39.6-38.6c-7.1-6.9-3.2-19 6.7-20.5l54.8-8 24.5-49.6c4.4-8.9 17.1-8.9 21.5 0l24.5 49.6 54.8 8c9.6 1.5 13.5 13.6 6.4 20.5z" class=""></path></svg>
				<p>Leaderboard</p>
			</nuxt-link>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		data: () => ({
			loading: false,
			selection: 1,
		}),

		methods: {
			reserve () {
				this.loading = true

				setTimeout(() => (this.loading = false), 2000)
			},
		},
	}
</script>

<style scoped>
	a{
		margin: 10px;
	}
	@media only screen and (max-width: 600px){
		svg{
			width: 50px!important;
			height: 50px!important;
		}
		a{
			margin: 1px;
		}
		p{
			font-size: 11px;
			text-align: center;
			padding: 0px;
			margin: 0px;
		}
	}
</style>