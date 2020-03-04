<template>
	<v-carousel
		cycle
		width="100%"
		hide-delimiter-background
		show-arrows-on-hover
	>
		<v-carousel-item
			v-for="(slide, i) in banner"
			:key="i"
			height="auto"
		>
			<img :src="'https://admin.selften.com/uploads/banner/'+slide.banner" alt="" style="object-fit: cover;width: 100%;max-height: 50vh;">
		</v-carousel-item>
	</v-carousel>
</template>

<script>
	export default {
		props:['banner'],
		data () {
			return {
				colors: [
					'indigo',
					'warning',
					'pink darken-2',
					'red lighten-1',
					'deep-purple accent-4',
				],
				slides: [
					'First',
					'Second',
					'Third',
					'Fourth',
					'Fifth',
				],
			}
		},
	}
</script>
<style>
	.v-carousel__item{
		height: auto!important;
	}
	.v-window--show-arrows-on-hover{
		height: auto!important;
	}
</style>