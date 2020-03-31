<template>
	<v-row justify="center">
		<v-btn
			color="primary"
			dark
			@click.stop="dialog = true"
			small
		>
			Register
		</v-btn>
		
		<v-dialog
			v-model="dialog"
			max-width="600"
		>
			<v-card style="padding: 20px;">
				<h2 class="text-center" style="padding: 20px">Register</h2>
				  <v-form
				    ref="form"
				    v-model="valid"
				    lazy-validation
				  >
					<v-text-field
				      v-model="username"
				      :rules="required"
				      label="User name"
				      required
				    ></v-text-field>

				     <v-text-field
				      v-model="phone"
				      :rules="required"
				      label="Phone"
				      required
				    ></v-text-field>

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
				    <p style="color: red;" v-if="message!=null">{{ message }}</p>
				    <v-btn
				      :disabled="!valid"
				      color="success"
				      class="mr-4"
				      :loading="loading"
				      @click="validate"
				    >
				      Register
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
      	valid: true,
		dialog: false,
		show1: false,
		loading:false,
		message:null,
		phone:'',
      	username: '',
      	required:[
      		v => !!v || v+'is required',
      	],
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
        if (this.$refs.form.validate()) {
        	this.loading=true
          	this.snackbar = true
          	var self = this;
         	axios.post('/api/register', {
			    username: this.username,
			    phone: this.phone,
			    email: this.email,
			    password: this.password,
			    password_confirmation:this.password
			})
			.then(function (response) {
				console.log(response);
				if(response.data[0]){
					self.loading=false
					self.message=response.data[0].message
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
			        self.$router.push('/profile/'+response.data.id)
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

