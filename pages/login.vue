<template>
    <div class="p-2 h-screen overflow-hidden flex items-center justify-center">
        <div class="bg-white shadow-lg rounded-lg px-10">
            <div class="w-full px-6 py-16">
                <div class="mb-4 font-light tracking-widest text-2xl text-center font-bold">LOGIN</div>
                <form>
                    <div class="mb-4">
                        <label for="email" class="block mb-2 text-sm text-gray-800">Email</label>
                        <input type="email" name="email" id="email" class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="email" required="">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block mb-2 text-sm text-gray-800">Your password</label>
                        <input type="password" name="password" id="password" class="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autocomplete="current-password" required="">
                    </div>
                    <label class="mb-4 flex items-center">
                        <input type="checkbox" class="form-checkbox" name="remeber" id="remeber" checked="">
                        <span class="ml-2">I want to remember you ?</span>
                    </label>
                    <div class="block md:flex items-center justify-between">
                        <button type="submit" class="align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">LOGIN</button>

                        <a class="text-gray-600 hover:text-gray-700 no-underline block mt-3" href="/password/reset">
                            Forgot Your Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
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
	  	email: '',
	  	password:'',
	  	error:[]
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

