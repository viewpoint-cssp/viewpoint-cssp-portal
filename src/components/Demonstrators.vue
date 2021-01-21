<template>
	<div>
		<div class="banner">
			<img id="logo" alt="VIEWpoint logo" src="../assets/logo.png" />
			<h1>
				Demonstrators
				<!--<br />
				<span lang="zh-cn">網站說明</span>-->
			</h1>
		</div>
		<div class="about">
			<h2>About the demonstrators</h2>
			<hr />
			<p>
				Some description about demonstrators, what they are, why these were selected.
			</p>
			<p>
				<span lang="zh-cn">網站說明</span>
			</p>
		</div>
		<div class="button-panel" @click="goTo('suhi')">
			<div class="button-content">
				<div class="button-item">
					<h3>SUHI</h3>
					<p>
						Intro...
					</p>
					<h3 lang="zh-cn">網站範例</h3>
					<p lang="zh-cn">網站說明</p>
				</div>
				<img class="button-item" src="../assets/demonstrators.jpg" />
			</div>
		</div>
		<div class="button-panel" @click="goTo('wrm')">
			<div class="button-content">
				<img class="button-item" src="../assets/demonstrators.jpg" />
				<div class="button-item">
					<h3>WRM</h3>
					<p>
						Intro...
					</p>
					<h3 lang="zh-cn">網站範例</h3>
					<p lang="zh-cn">網站說明</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Demonstrators',
	methods: {
		goTo(page) {
			if (page == 'suhi') {
				location.href = 'https://the-iea.github.io/viewpoint-suhi'
			} else if (page == 'wrm') {
				location.href = 'https://the-iea.github.io/viewpoint-wrm'
			}
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
	}
}
</script>

<style scoped>
.banner {
	background-image: url('../assets/demonstrators.jpg');
	background-position: center;
	background-size: cover;
	background-blend-mode: soft-light;
	background-attachment: fixed;
	height: 70vh;
	min-height: 250px;
	padding: 32px 64px;
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
.banner h1 span {
	color: var(--vpOrange);
}

.about {
	padding: 64px;
}
.about hr {
	margin-bottom: 32px;
}
.about p {
	margin-bottom: 16px;
}
.about a:hover {
	color: var(--vpOrange);
}

.button-panel {
	width: 100%;
	border: 1px solid transparent;
	padding: 64px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;
}
.button-panel:nth-of-type(odd) {
	background: var(--primaryLightest);
}
.button-content {
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
}
.button-item {
	width: 50%;
	max-width: 400px;
	margin: 0 16px;
}
img.button-item {
	height: 250px;
	object-fit: cover;
}
div.button-item {
	padding: 16px 32px;
	background: var(--vpGreen);
	color: var(--vpCoolGrey);
}
div.button-item * {
	background: transparent;
	color: currentColor;
}
.button-panel:nth-of-type(odd) div.button-item {
	background: var(--vpDark);
}
.button-panel:hover {
	background: var(--bannerGrey);
	border-color: var(--vpOrange);
}
.button-panel:hover div.button-item * {
	color: whitesmoke;
	font-size: 1.1rem;
}
</style>