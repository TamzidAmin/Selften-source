<template>
	<v-row justify="center">
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
				  :type="show1 ? 'text' : 'password'"
				  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
				  @click:append="show1 = !show1"
				  required
				></v-text-field>
				<div>
					<nuxt-link to="forgetpassword">
						forgot password ?
					</nuxt-link>
				</div>
				<p style="color: red;" v-if="error!=null">{{ error }}</p>
				<v-btn
				  :disabled="!valid"
				  color="success"
				  class="mr-4"
				  :loading="loading"
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
	</v-row>
</template>


<script>
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
  export default {
	data: () => ({
		loading: false,
		show1: false,
		error:null,
	  	valid: true,
		dialog: false,
	  name: '',
	  nameRules: [
		v => !!v || 'Name is required',
		v => (v && v.length >= 6) || 'Name must be less than 6 characters',
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
	  	this.loading=true;
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
					self.loading=false
					self.error=response.data.message
				}else{
					self.loading=false
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

		}else{
			this.loading=false
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

