<template>
	<div>
		<div class="banner">
			<img id="logo" alt="VIEWpoint logo" src="../assets/images/logo.png" />
			<h1>
				Demonstrators
			</h1>
		</div>
		<div class="about">
			<h2>About the demonstrators</h2>
			<hr />
			<p>
				Some description about demonstrators, what they are, why these
				were selected.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
		</div>
		<div class="button-panel" @click="goTo('suhi')">
			<div class="button-content">
				<div class="button-item">
					<h3>Surface Urban Heat Island</h3>
					<p>
						Intro...
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
				<img class="button-item" src="../assets/images/suhi.png" />
			</div>
		</div>
		<div class="button-panel" @click="goTo('wrm')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/wrm.png" />
				<div class="button-item">
					<h3>Water Resources Management</h3>
					<p>
						A prototype dashboard to investigate the impact of
						climate change and water abstraction on the Upper Yellow
						River basin.
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* TODO 
At the moment this looks and works very similar to Home.vue. That may change. 
If it doesn't, the styling could go into the .css or simplify by using new component(s)?
*/

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
	background-image: url('../assets/images/demonstrators.jpg');
	background-position: center;
	background-size: cover;
	background-blend-mode: soft-light;
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
.about p:lang(zh-cn) {
	font-style: italic;
	opacity: 0.95;
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
.button-content p:lang(zh-cn) {
	margin-top: 12px;
	font-style: italic;
	opacity: 0.95;
}
.button-item {
	width: 50%;
	max-width: 400px;
	margin: 0 16px;
	border: 2px solid transparent;
}
img.button-item {
	height: 250px;
	object-fit: cover;
	object-position: top left;
	border-color: var(--vpGreen);
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
.button-panel:nth-of-type(odd) img.button-item {
	border-color: var(--vpDark);
}
.button-panel:hover {
	background: var(--bannerGrey);
	/*border-color: var(--vpOrange);*/
}
.button-panel:hover .button-item {
	border-color: var(--vpOrange) !important;
	box-shadow: 5px 5px 10px var(--vpDark);
}
.button-panel:hover div.button-item * {
	color: whitesmoke;
}

@supports (-ms-ime-align: auto) {
	/* EdgeHTML is jerky if 'fixed' so set it to scroll up with the rest of the page 
	AND since background-blend-style doesn't work, use a white box 'shadow' to lighten */
	.banner {
		background-attachment: scroll;
		box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.8);
	}
}

@media (max-width: 768px) {
	.button-panel {
		padding: 32px;
	}
}
</style>
