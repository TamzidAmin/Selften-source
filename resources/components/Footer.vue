<template>
	<v-footer
		color="primary"
		padless
	>
		<v-row
			justify="center"
			no-gutters
		>
			<a
				href="#"
				v-for="link in links"
				:key="link"
				color="white"
				text
				rounded
				style="color: #fff;margin: 11px !important;font-size: 13px;" 
			>
				{{ link }}
			</a>
			<a href="https://m.me/selften"
				color="white"
				target='_blank'
				text
				style="color: #fff;margin: 11px !important;font-size: 13px;" 
			>
				Message Us
			</a>
		</v-row>
	</v-footer>
</template>
<script>
	export default {
		data: () => ({
			links: [
				'Home',
				'About Us'
			],
		}),
	}
</script>

<style scoped>
	.primary{
		padding: 0px!important;
	}
</style>