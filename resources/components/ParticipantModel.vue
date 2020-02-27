<template>
  <v-row justify="center">
	<div class="my-2 text-center">
    	<v-btn small class="w-300" color="secondary" dark @click.stop="dialog = true">Participants</v-btn>
  	</div>

	<v-dialog
	  v-model="dialog"
	  max-width="290"
	>
	  <v-card>
		<h4 class="text-center py-2">Registered Participants</h4>
		<hr>
		<v-simple-table class="table-sm">
		    <template v-slot:default>
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