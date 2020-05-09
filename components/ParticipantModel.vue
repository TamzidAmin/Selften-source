<template>
  <div justify="center">
	<div class="my-2 text-center">
    	<button small class="w-300" color="secondary" dark @click.stop="dialog = true">Participants</button>
  	</div>

	<div
	  v-model="dialog"
	  max-width="290"
	>
	  <div>
		<h4 class="text-center py-2">Registered Participants</h4>
		<hr>
		<table class="border-collapse w-full">
		      <thead>
		        <tr>
		          <th class="p-3 text-gray-800 text-center border border-b">S.NO</th>
		          <th class="p-3 text-gray-800 text-center border border-b">Game Name</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match.users" :key="item.name">
		          <td class="p-3 text-gray-800 text-center border border-b">{{ index+1 }}</td>
		          <td class="p-3 text-gray-800 text-center border border-b">{{ item.pivot.gamename }}</td>
		        </tr>
		      </tbody>
		</table>

		<div class="text-right">
		  <button
		  	class="m-3"
			color="primary"
			small
			@click="dialog = false"
		  >
			Close
		  </button>
		</div>
	  </div>
	</div>
  </div>
</template>
<script>
  export default {
  	props:['match'],
	data () {
	  return {
		dialog: false,
	  }
	},
  }
</script>