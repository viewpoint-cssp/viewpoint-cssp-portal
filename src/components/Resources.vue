<template>
	<div>
		<div class="banner">
			<img id="logo" alt="VIEWpoint logo" src="../assets/images/logo.png" />
			<h1>
				Resources
			</h1>
		</div>
		<div class="about">
			<h2>About the resources</h2>
			<hr />
			<p>
				Some description about the different resources.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Training')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/training.jpg" />
				<div class="button-item">
					<h3>Training materials</h3>
					<p>TODO: Lots of lovely things to learn.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Explainers')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/training.jpg" />
				<div class="button-item">
					<h3>Explainers</h3>
					<p>TODO: Explain the explainers.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Briefing')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/training.jpg" />
				<div class="button-item">
					<h3>Briefing notes</h3>
					<p>TODO: Brief description of what briefing notes are.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Videos')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/training.jpg" />
				<div class="button-item">
					<h3>Videos</h3>
					<p>TODO: All about the videos.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Videos')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/training.jpg" />
				<div class="button-item">
					<h3>Videos</h3>
					<p>TODO: All about the videos.</p>
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
	name: 'Resources',
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
.button-panel:nth-of-type(even) div.button-content {
	flex-direction: row-reverse;
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
