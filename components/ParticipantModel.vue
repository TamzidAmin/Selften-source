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
		<table class="table-sm">
		      <thead>
		        <tr>
		          <th class="text-left">S.NO</th>
		          <th class="text-left">Game Name</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match.users" :key="item.name">
		          <td>{{ index+1 }}</td>
		          <td>{{ item.pivot.gamename }}</td>
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