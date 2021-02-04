<template>
	<div class="banner">
		<img id="logo" alt="VIEWpoint logo" src="../assets/images/logo.png" />
		<h1 v-if="enTitle">{{ enTitle }}</h1>
		<h1 v-if="cnTitle">{{ cnTitle }}</h1>
	</div>
</template>

<script>
export default {
	name: 'Banner',
	props: {
		enTitle: String,
		cnTitle: String
	}
}
</script>

<style scoped>
.banner {
	background-image: url('../assets/images/banner.png');
	background-position: center;
	background-size: cover;
	background-attachment: fixed;
	/*height: 50vh;
	min-height: 250px;
	max-height: 450px;
	padding: 32px 64px;*/
	height: 280px;
	padding: 12px 64px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.banner #logo {
	background: transparent;
	width: 50%;
	align-self: flex-end;
}
.banner h1 {
	width: 50%;
	color: var(--vpOrange);
}

@supports (-ms-ime-align:auto) { 
	/* EdgeHTML is jerky if 'fixed' so set it to scroll up with the rest of the page */
	.banner {
		background-attachment: scroll;
	}
}
</style>