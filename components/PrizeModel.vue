<template>
  <div justify="center">
	<div class="my-2 text-center">
    	<button small class="w-300" color="secondary" dark @click.stop="dialog = true">Prize Pool</button>
  	</div>

	<div
	  v-model="dialog"
	  max-width="290"
	>
	  <div>
		<div> 
		      <thead> 
		        <tr>
		          <th class="text-left">Position</th>
		          <th class="text-left">Prize</th>
		          <th class="text-left">Pro Points</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="(item,index) in match.prizes" :key="item.name">
		          <td>{{ item.lavel }}</td>
		          <td>BDT {{ item.prize }}</td>
		          <td>{{ item.propoints }}</td>
		        </tr>
		      </tbody>
		</div>

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