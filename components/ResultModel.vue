<template>
  <div justify="center">
	<div class="my-2 text-center">
    	<button small class="w-300" color="secondary" dark @click.stop="dialog = true">Result</button>
  	</div>

	<div
	  v-model="dialog"
	  max-width="290"
	>
	  <div>
		<h4 class="text-center py-2">Result</h4>
		<hr>
		<table class="table-sm table-bordered text-center">
		      <thead>
		        <tr>
		          <th class="text-center">S.NO</th>
		          <th class="text-center">Game Name</th>
		          <th class="text-center">Kills</th>
		          <th class="text-center">Winning</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match.users" :key="item.name">
		          <td>{{ index+1 }}</td>
		          <td>{{ item.pivot.gamename }}</td>
		          <td>{{ item.pivot.total_kill }}</td>
		          <td>{{ item.pivot.total_earn }}</td>
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
<style>
	td,th{
		font-size: 10px!important;
		padding: 0 4px;
	}
</style>