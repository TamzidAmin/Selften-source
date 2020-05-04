<template>
<div class="p-2 h-screen overflow-hidden flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg px-10">
		<div v-if="mustVerifyEmail" class="alert alert-success" role="alert">
			verify_email_address
		</div>
		<div v-else title="register">
			<div class="max-w-xs m-auto">
				<form @submit.prevent="register" class="rounded px-8 pt-6 pb-8 mb-4 capitalize">
					<!-- Name -->
					<div class="form-group row">
						<label class="block text-green-500 text-sm font-bold mb-2 text-left">name</label>
						<div class="col-md-7">
							<input v-model="name" :class="{ 'is-invalid': errors }" class="block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md rounded-full pl-12 pr-4 py-3" type="text" placeholder="Name" name="name">
						</div>
					</div>

					<!-- Email -->
					<div class="form-group row">
						<label class="block text-green-500 text-sm font-bold mb-2 text-left">email</label>
						<div class="col-md-7">
							<input v-model="email" :class="{ 'is-invalid': 'email' }" class="block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md rounded-full pl-12 pr-4 py-3" placeholder="Email" type="email" name="email">
						</div>
					</div>

					<!-- Password -->
					<div class="form-group row">
						<label class="block text-green-500 text-sm font-bold mb-2 text-left">password</label>
						<div class="col-md-7">
							<input v-model="password" :class="{ 'is-invalid': 'password' }" class="block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md rounded-full pl-12 pr-4 py-3" placeholder="Password" type="password" name="password">
						</div>
					</div>

					<!-- Password Confirmation -->
					<div class="form-group row">
						<label class="block text-green-500 text-sm font-bold mb-2 text-left">confirm_password</label>
						<div class="col-md-7">
							<input v-model="password_confirmation" :class="{ 'is-invalid': 'password_confirmation' }" class="block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md rounded-full pl-12 pr-4 py-3" placeholder="Confirm Password" type="password" name="password_confirmation">
						</div>
					</div>

					<div class="form-group row">
						<div class="text-center mt-2">
							<!-- Submit Button -->
							<v-button :loading="busy">
								register
							</v-button>

							<!-- GitHub Register Button -->
							<login-with-github />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// import LoginWithGithub from '~/components/LoginWithGithub'

export default {
	middleware: 'guest',
	// components: {
	// 	LoginWithGithub
	// },
	data: () => ({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		mustVerifyEmail: false
	}),
	methods: {
		async register () {
			// Register the user.
			const { data } = await this.post('/api/register')

			// Must verify email fist.
			if (data.status) {
				this.mustVerifyEmail = true
			} else {
				// Log in the user.
				const { data: { token } } = await this.post('/api/login')

				// Save the token.
				this.$store.dispatch('auth/saveToken', { token })

				// Update the user.
				await this.$store.dispatch('auth/updateUser', { user: data })

				// Redirect home.
				this.$router.push({ name: 'home' })
			}
		}
	}
};
</script>
