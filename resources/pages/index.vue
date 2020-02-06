<template>
<v-layout column justify-center align-center>
	<div>
		<h1>Home Pages</h1>
	</div>
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
