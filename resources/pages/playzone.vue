<template>
<v-layout column justify-center align-center>
	<Carousels/>
	<Navmanu/>
	<div>
		<div class="playzone">
			<div class="single-playzone">
				<div style="width: 30%;">
					<img src="~/assets/poster.jpg" alt="!opps">
				</div>
				<div class="card_2nd_right">
					<div class="card_right_top">
						<h4>PUBG Mobile Solo Premium</h4>
					</div>
					<div class="card_right_bottom">
						<ul class="card_right_bottom_left">
							<li><i class="fas fa-calendar-week"></i> <p>jan 20, 12:00PM</p></li>
							<li><i class="fas fa-trophy"></i><p>BDT 1000</p></li>
						</ul >
						<ul class="card_right_bottom_right">
							<li><i class="fas fa-user-friends"></i> <p>12/100</p></li>
							<li><i class="fas fa-info-circle"></i> <p>SOLO</p></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="single-playzone">
				<div style="width: 30%;">
					<img src="~/assets/poster.jpg" alt="!opps">
				</div>
				<div class="card_2nd_right">
					<div class="card_right_top">
						<h4>PUBG Mobile Solo Premium</h4>
					</div>
					<div class="card_right_bottom">
						<ul class="card_right_bottom_left">
							<li><i class="fas fa-calendar-week"></i> <p>jan 20, 12:00PM</p></li>
							<li><i class="fas fa-trophy"></i><p>BDT 1000</p></li>
						</ul >
						<ul class="card_right_bottom_right">
							<li><i class="fas fa-user-friends"></i> <p>12/100</p></li>
							<li><i class="fas fa-info-circle"></i> <p>SOLO</p></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="single-playzone">
				<div style="width: 30%;">
					<img src="~/assets/poster.jpg" alt="!opps">
				</div>
				<div class="card_2nd_right">
					<div class="card_right_top">
						<h4>PUBG Mobile Solo Premium</h4>
					</div>
					<div class="card_right_bottom">
						<ul class="card_right_bottom_left">
							<li><i class="fas fa-calendar-week"></i> <p>jan 20, 12:00PM</p></li>
							<li><i class="fas fa-trophy"></i><p>BDT 1000</p></li>
						</ul >
						<ul class="card_right_bottom_right">
							<li><i class="fas fa-user-friends"></i> <p>12/100</p></li>
							<li><i class="fas fa-info-circle"></i> <p>SOLO</p></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
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