<template>
	<v-card
		:loading="loading"
		class="mx-auto"
		max-width="100%"
	>
		<v-img
			src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
		></v-img>

		<v-card-title>Cafe Badilico</v-card-title>

		<v-card-text>
			<v-row
				align="center"
				class="mx-0"
			>
				<v-rating
					:value="4.5"
					color="amber"
					dense
					half-increments
					readonly
					size="14"
				></v-rating>

				<div class="grey--text ml-4">4.5 (413)</div>
			</v-row>
		</v-card-text>
	</v-card>
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