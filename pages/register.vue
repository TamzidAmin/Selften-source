<template>
<div class="p-2 h-screen overflow-hidden flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg px-10 bg-gray-300">
		<div v-if="mustVerifyEmail" class="alert alert-success" role="alert">
			verify_email_address
		</div>
		<div v-else title="register">
			<div class="w-full px-6 py-16">
                <div class="mb-4 font-light tracking-widest text-2xl text-center font-bold">LOGIN</div>
				<form @submit.prevent="register" class="rounded px-8 pt-6 pb-8 mb-4 capitalize">
					<!-- Name -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="email" class="mb-2 font-bold">User Name</label>
	                        <input type="email" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
                    	</div>
					</div>

					<!-- Email -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="email" class="mb-2 font-bold">Email</label>
	                        <input type="email" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
                    	</div>
					</div>

					<!-- Password -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="email" class="mb-2 font-bold">Password</label>
	                        <input type="email" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
                    	</div>
					</div>

					<!-- Password Confirmation -->
					<div class="form-group row">
						<div class="mb-4">
	                        <label for="email" class="mb-2 font-bold">Confirm Password</label>
	                        <input type="email" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
                    	</div>
					</div>

					<div class="form-group row">
						<div class="text-center mt-2">
						<button type="submit" class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">REGISTER</button>
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
