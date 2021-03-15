<template>
	<div class="banner">
		<div class="content">
			<img
				id="logo"
				alt="VIEWpoint logo"
				src="../assets/images/logo.png"
			/>
			<div class="h1-wrapper">
				<h1 v-if="enTitle">{{ enTitle }}</h1>
				<h1 lang="zh-cn" v-if="cnTitle">{{ cnTitle }}</h1>
			</div>
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
	background-image: url('../assets/images/banner.jpg');
	background-position: bottom;
	background-size: cover;
	background-attachment: fixed;
	background-blend-mode: luminosity;
	height: 280px;
	padding: 12px 64px;
}

.banner div {
	max-width: var(--widthLimit);
	background: transparent;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.banner div.content {
	margin: 0 auto;
}

.banner #logo {
	background: transparent;
	width: 50%;
	align-self: flex-end;
}

.banner div.h1-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
}
.h1-wrapper h1 {
	width: 50%;
	color: var(--vpOrange);
}
.h1-wrapper h1:lang(zh-cn) {
	text-align: right;
}

@supports (-ms-ime-align: auto) {
	/* EdgeHTML is jerky if 'fixed' so set it to scroll up with the rest of the page */
	.banner {
		background-attachment: scroll;
	}
}

@media (max-width: 1007px) {
	.banner {
		height: 200px;
		padding: 8px 32px;
	}
}

@media (max-width: 792px) {
	.banner {
		height: 180px;
		padding: 8px 32px;
	}
}

@media (max-width: 640px) {
	.banner {
		height: 150px;
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
	.banner div.h1-wrapper h1 {
		font-size: 2rem;
		margin: 0;
	}
}
</style>
