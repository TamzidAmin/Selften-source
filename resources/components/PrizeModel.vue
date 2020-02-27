<template>
  <v-row justify="center">
	<div class="my-2 text-center">
    	<v-btn small class="w-300" color="secondary" dark @click.stop="dialog = true">Prize Pool</v-btn>
  	</div>

	<v-dialog
	  v-model="dialog"
	  max-width="290"
	>
	  <v-card>
		<v-simple-table> 
		    <template v-slot:default>
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
		          <td>{{ item.prize }}</td>
		          <td>{{ item.propoints }}</td>
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