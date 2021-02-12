<template>
	<div class="banner">
		<div>
			<img
				id="logo"
				alt="VIEWpoint logo"
				src="../assets/images/logo.png"
			/>
			<h1 v-if="enTitle">{{ enTitle }}</h1>
			<h1 v-if="cnTitle">{{ cnTitle }}</h1>
		</div>
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
	height: 280px;
	padding: 12px 64px;
}

.banner div {
	max-width: 1358px;
	margin: 0 auto;
	background: transparent;
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

@supports (-ms-ime-align: auto) {
	/* EdgeHTML is jerky if 'fixed' so set it to scroll up with the rest of the page */
	.banner {
		background-attachment: scroll;
	}
}

@media print {
	.banner {
		background-image: none;
		height: 100px;
	}
	.banner div {
		flex-direction: row-reverse;
		align-items: flex-end;
	}
	.banner #logo {
		height: 80px;
		width: auto;
	}
	.banner h1 {
		font-size: 2rem;
		margin: 0;
	}
}
</style>
