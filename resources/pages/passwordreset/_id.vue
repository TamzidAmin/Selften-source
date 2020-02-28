<template>
    <v-card style="padding: 20px;" max-width="600">
        <h2 class="text-center" style="padding: 20px">Login</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              type="text"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="New Password"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              required
            ></v-text-field>

            
            <div class="text-right">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  :loading="loading"
                  @click="validate"

                >
                  Change Password
                </v-btn>
            </div>
            <br>
            <v-alert
              v-model="alert"
                outlined
                :type="res.type"
                text
            >
              {{ res.message }}
            </v-alert>
          </v-form>
    </v-card>
</template>


<script>
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    data: () => ({
        loading: false,
        show1: false,
        error:null,
        res:[],
        valid: true,
        alert: false,
        dialog: false,
        name: '',
        email: '',
        password:'',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules:[
            v => !!v || 'Password is required',

        ]
    }),

    methods: {
        validate () {
            this.loading=true;
            if (this.$refs.form.validate()) {
              this.snackbar = true
              var self = this;
                axios.post('api/password/reset', {
                    token: this.$route.params.id,
                    email: this.email,
                    password: this.password,
                })
                .then(function (response) {
                    self.res=response.data
                    self.alert=true
                    self.loading=false
                })
                .catch(function (error) {
                    console.log(error);
                	this.loading=false
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

<style>
    .v-card{
        margin: auto!important;
    }
</style>
