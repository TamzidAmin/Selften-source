<template>
  <v-row justify="center">
	<div class="my-2 text-center">
    	<v-btn small class="w-300" color="secondary" dark @click.stop="dialog = true">Result</v-btn>
  	</div>

	<v-dialog
	  v-model="dialog"
	  max-width="290"
	>
	  <v-card>
		<h4 class="text-center py-2">Result</h4>
		<hr>
		<v-simple-table class="table-sm table-bordered text-center">
		    <template v-slot:default>
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
		    </template>
		</v-simple-table>

		<div class="text-right">
		  <v-btn
		  	class="m-3"
			color="primary"
			small
			@click="dialog = false"
		  >
			Close
		  </v-btn>
		</div>
	  </v-card>
	</v-dialog>
  </v-row>
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