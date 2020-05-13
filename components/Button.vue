<template>
	<button :type="nativeType" :disabled="loading" :class="{
		[`btn-${type}`]: true,
		'opacity-50 cursor-not-allowed': loading
	}" class="align-middle bg-green-100 hover:bg-green-300 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg"
	>
		<slot />
	</button>
</template>

<script>
export default {
	name: 'TButton',

	props: {
		type: {
			type: String,
			default: 'primary'
		},

		nativeType: {
			type: String,
			default: 'submit'
		},

		loading: {
			type: Boolean,
			default: false
		},

		block: {
			type: Boolean,
			default: false
		},

		large: {
			type: Boolean,
			default: false
		}
	}
}
</script>
