<template>
<v-layout column justify-center align-center>
	<v-card style="padding: 10px;" width="320px" class="bg-light">
		<v-simple-table >
		    <template v-slot:default>
		      <tbody style="text-align: center;">
		        <tr>
		          <td style="background: black;color: white;text-align: center;">{{ i.match_name }}</td>
		        </tr>
		        <tr><td>Available Balance: ৳{{ authuser.wallet }}</td></tr>
		        <tr><td>Match Entry Fee Per Person: ৳{{ i.entryfee }}</td></tr>
		        <tr v-if="i.type!='solo'"><td>Team Entry Fee : ৳{{ i.entryfee }}</td></tr>
		        <tr><td><v-btn small color="primary">{{ i.max_join-i.users.length }} Spots Left</v-btn></td></tr>
		      </tbody>
		    </template>
		</v-simple-table>
	</v-card>
	<br>
	<v-card style="padding: 10px;" width="320px" class="bg-light">
		<v-simple-table>
		    <template v-slot:default>
		      <tbody>
		        <tr>
		          <td style="background: black;color: white;text-align: center;text-transform: capitalize;">{{ i.type }} Registration</td>
		        </tr>
		        <tr>
		        	<td style="padding: 5px;text-align: center;">
		        		<span v-if="i.type=='duo'">This is Duo match.You can join as Solo or Duo.</span>
		        		<span v-if="i.type=='solo'">This is Solo match.You can join as Solo.</span>
		        		<span v-if="i.type=='squad'">This is Squad match.You can join as Solo,Duo or Squad</span>
		        	</td>
		    	</tr>
		    	<tr style="text-align: center;">
		    		<v-radio-group v-model="row" row style="justify-content: center;">
				      <div v-if="i.type=='duo'" class="d-flex" style="justify-content: center">
				      	<v-radio label="Solo" value="solo"></v-radio>
				      	<v-radio label="Duo" value="duo"></v-radio>
				      </div>
				      {{  }}
				      <div v-if="i.type=='solo'" style="text-align: center">
				      	<v-radio v-if="i.type=='duo'" label="Option 1" value="radio-1"></v-radio>
				      </div>
				      <div v-if="i.type=='squad'" class="d-flex" style="justify-content: center">
				      	<v-radio v-if="i.type=='duo'" label="Option 1" value="radio-1"></v-radio>
				      	<v-radio label="Option 2" value="radio-2"></v-radio>
				      	<v-radio label="Option 3" value="radio-3"></v-radio>
				      </div>
				    </v-radio-group>
		    	</tr>
		    	<tr style="text-align: center;">
		    		<div v-if="row=='solo'" style="padding: 10px">
		    			<v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      :label="'Enter Your Exact '+i.product.name+' Name'"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      :label="'Enter Your Exact '+i.product.name+' Name'"
					      required
					    ></v-text-field>
		    		</div>
		    		<div v-if="row=='duo'" style="padding: 10px">
		    			<v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      :label="'Enter Your Exact '+i.product.name+' Name'"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      :label="'Enter Your Exact '+i.product.name+' Name'"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      :label="'Enter Your Exact '+i.product.name+' Name'"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
		    		</div>
		    		<div v-if="row=='squad'" style="padding: 10px">
		    			<v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
					    <v-text-field
					      v-model="name"
					      :counter="10"
					      :rules="nameRules"
					      label="Name"
					      required
					    ></v-text-field>
		    		</div>
		    	</tr>
		      </tbody>
		    </template>
		</v-simple-table>
	</v-card>
</v-layout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Carousels from '~/components/Carousels'
import Navmanu from '~/components/Navmanu'
import Card from '~/components/Card'
import axios from '~/plugins/axios'
export default {
	props:['matches'],
	components:{
		Carousels,
		Card,
		Navmanu
	},
    data () {
      return {
      	i:[],
      	row:'',
        tab: null,
        knowledge: 0,
        items: [
          'upcoming','ongoing','result',
        ],
      }
    },
	computed:{
	
	},
	computed: mapGetters({
	   authuser: 'authuser'
	}),
	methods: {
	  	formatDate(date) {
	  		console.log(date);
	  		var d = new Date(date);
	  		var day = d.getDate();
		  	var monthIndex = d.getMonth();
		  	var year = d.getFullYear();
		  	return day + '/' + ++monthIndex + '/' + year;
		}
	},
	asyncData ({ params }) {
		console.log(params);
	    return axios.get(`/api/singlematch/${params.id}`)
	      .then((res) => {
	        return { i: res.data[0] }
	      })
  	}
}
</script>
<style>
.bg-light{
	background: #F5F5F5!important;
}
.single-box{
	justify-content: center;
	text-align: center;
}
.single-box div{
	width: 33.33%;
}
.single-box div h5{
	color: black;
	padding: 5px 0px;
}
.single-box div span{
	color: #D0254B;
	
}
a{
	text-decoration: none;
}
span{
	font-size: 15px;
}
.v-list-item{
	padding: 0px!important;
}
.content{
	margin-left: 10px;
}
.v-slide-group__content{
	justify-content: center!important;
}
.root{
	display: flex;
	flex-wrap: wrap;
	justify-content: center!important;
}
</style>
<style scoped>
.card_2nd_right{
	    padding: 0px 10px;
    font-size: 15px;
}
.playzone{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: #000000;
}
.playzone img{
    object-fit:cover;
}
.single-playzone{
	display: flex;
}
.playzone > div {
	padding: 10px;
    min-width: 320px;
    max-width: 320px;
    margin: 10px;
    background: #F1F1F1;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    -moz-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow: -2px 2px 8px 6px #ccc;
}
ul{
	list-style: none;
	padding: 0px!important;
	margin: 0px;
	
}
ul li{
	padding: 0px!important;
	margin: 0px!important;

}
ul p{
	margin-bottom: 0px!important;
}
img{
	width: 100%;
}
</style>
