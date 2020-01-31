<template>
	<v-row justify="center">
		<v-btn
			color="primary"
			dark
			@click.stop="dialog = true"
			outlined
			small
		>
			Login
		</v-btn>

		<v-dialog
			v-model="dialog"
			max-width="290"
		>
			<v-card>
				<v-card-title class="headline">Use Google's location service?</v-card-title>

				<v-card-text>
					Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn
						color="green darken-1"
						text
						@click="dialog = false"
					>
						Disagree
					</v-btn>

					<v-btn
						color="green darken-1"
						text
						@click="login"
					>
						Agree
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined
	export default {
		data () {
			return {
				dialog: false,
			}
		},
		methods: {
		    login () {
		    	this.dialog=false;
			    setTimeout(() => { // we simulate the async request with timeout.
			        const auth = {
			          accessToken: 'someStringGotFromApiServiceWithAjax'
			        }
			        this.$store.commit('setAuth', auth) // mutating to store for client rendering
			        Cookie.set('auth', auth) // saving token in cookie for server rendering
			        this.$router.push('/')
			    }, 1000)
		    }
		}
	}
</script>