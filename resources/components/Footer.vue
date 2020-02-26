<template>
<footer>
	<div class="footer">
		<div>
			<h4>QUICK LINKS</h4>
			<a href="#">About US</a><br>
		</div>
		<div>
			<h4>Around The Web</h4>
			<div class="link">
				
			</div>
		</div>
		<div>
			<h4>ABOUT FRELANCER</h4>
			<p>Lorem ipsum dolor</p>
		</div>
	</div>
</footer>
</template>
<script>
	export default {
		data: () => ({
			icons: [
				'fab fa-facebook',
				'fab fa-twitter',
				'fab fa-google-plus',
				'fab fa-linkedin',
				'fab fa-instagram',
			],
		}),
	}
</script>
<style>
footer{
	background-image: url("~assets/footer-bg.png");
	background-color: #D0254B;
	padding: 20px;
}
.footer {
	width: 80%;
	margin: auto;
    display: flex;
    justify-content: center;
    color: #ffffff;
    background-repeat: no-repeat;
    background-position: center 10px;    
}
.footer div{
	width: 33.33%;
	text-align: center;
}
.footer a{
	color: #fff;
	text-decoration: none;
}
</style>