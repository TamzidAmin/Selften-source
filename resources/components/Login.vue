<template>
	<v-row justify="center">
		<v-btn
			color="primary"
			dark
			@click.stop="dialog = true"
			outlined
			small
		>
			Login l 
		</v-btn>
		
		<v-dialog
			v-model="dialog"
			max-width="600"
		>
			<v-card style="padding: 20px;">
				<h2 class="text-center" style="padding: 20px">Login</h2>
				  <v-form
					ref="form"
					v-model="valid"
					lazy-validation
				  >
					<v-text-field
					  v-model="email"
					  :rules="emailRules"
					  label="E-mail"
					  required
					></v-text-field>

					<v-text-field
					  v-model="password"
					  :rules="nameRules"
					  label="Password"
					  required
					></v-text-field>
					<p style="color: red;" v-if="error!=null">{{ error }}</p>
					<v-btn
					  :disabled="!valid"
					  color="success"
					  class="mr-4"
					  @click="validate"
					>
					  Login
					</v-btn>

					<v-btn
					  color="error"
					  class="mr-4"
					  @click.stop="dialog = false"
					>
					  Cancel
					</v-btn>
				  </v-form>
			</v-card>
		</v-dialog>
	</v-row>
</template>


<script>
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
  export default {
	data: () => ({
		error:null,
	  valid: true,
		dialog: false,
	  name: '',
	  nameRules: [
		v => !!v || 'Name is required',
		v => (v && v.length <= 6) || 'Name must be less than 6 characters',
	  ],
	  email: '',
	  password:'',
	  emailRules: [
		v => !!v || 'E-mail is required',
		v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
	  ],
	}),

	methods: {
	  validate () {
		if (this.$refs.form.validate()) {
		  this.snackbar = true
		  var self = this;
			axios.post('/api/login', {
				email: this.email,
				password: this.password
			})
			.then(function (response) {
				console.log(response.data);
				if(response.data.message){
					self.error=response.data.message
				}else{
					setTimeout(() => { // we simulate the async request with timeout.
					const auth = {
					  accessToken: response.data.token
					}
					self.$store.commit('setAuth', auth) // mutating to store for client rendering
					self.$store.commit('setUser', response.data) // mutating to store for client rendering
					Cookie.set('auth', auth) // saving token in cookie for server rendering
					Cookie.set('user', response.data) // saving token in cookie for server rendering
					self.$router.push('/')
				  }, 1000)
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		}
	  },
	  reset () {
		this.$refs.form.reset()
	  },
	  resetValidation () {
		this.$refs.form.resetValidation()
	  },
	},
  }
</script>

