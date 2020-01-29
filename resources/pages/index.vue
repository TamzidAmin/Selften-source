<template>
<v-layout column justify-center align-center>
	<Carousels/>
	<Navmanu/>
	<v-row>
	    <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
	    <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
	     <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
	     <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
	     <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
	     <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
	     <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
	     <v-col cols="6" sm="3" md="3" xl="2">
	    	<Card/>
	    </v-col>
    </v-row>
</v-layout>
</template>

<script>
import Carousels from '~/components/Carousels'
import Navmanu from '~/components/Navmanu'
import Card from '~/components/Card'
export default {
	components:{
		Carousels,
		Card,
		Navmanu
	}
}
</script>
