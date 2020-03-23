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
				style="color: #fff;margin: 15px !important;font-size: 16px;" 
			>
				{{ link }}
			</a>
			<a href="https://m.me/selften"
				color="white"
				target='_blank'
				text
				style="color: #fff;margin: 15px !important;font-size: 16px;" 
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