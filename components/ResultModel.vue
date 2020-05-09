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
		<table class="border-collapse w-full">
		      <thead>
		        <tr>
		          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">S.NO</th>
		          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Game Name</th>
		          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Kills</th>
		          <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">Winning</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match.users" :key="item.name">
		          	<td class="p-3 text-gray-800 text-center border border-b">{{ index+1 }}</td>
		          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.pivot.gamename }}</td>
		          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.pivot.total_kill }}</td>
		          	<td class="p-3 text-gray-800 text-center border border-b">{{ item.pivot.total_earn }}</td>
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