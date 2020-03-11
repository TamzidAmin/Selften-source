<template>
	<v-footer
		color="primary"
		padless
	>
		<v-row
			justify="center"
			no-gutters
		>
			<v-btn
				v-for="link in links"
				:key="link"
				color="white"
				text
				rounded
				class="my-2"
			>
				{{ link }}
			</v-btn>
			<a  href="https://wa.me/+8801301997184"
				color="white"
				target='_blank'
				text
				style="color: #fff;margin-top: 15px !important;font-size: 16px;" 
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