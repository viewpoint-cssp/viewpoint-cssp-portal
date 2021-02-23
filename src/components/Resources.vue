<template>
	<div>
		<Banner class="banner-style"
			enTitle="Resources"
		></Banner>
		<div class="about-page">
			<h2>About the resources</h2>
			<hr />
			<p>
				TODO: Some description about the different resources.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Training')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/training.jpg" /></div>
				<div class="button-item desc">
					<h3>Training materials</h3>
					<p>TODO: Lots of lovely things to learn.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Explainers')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/explainers.jpg" /></div>
				<div class="button-item desc">
					<h3>Explainers</h3>
					<p>TODO: Explain the explainers.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Briefing')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/briefing.jpg" /></div>
				<div class="button-item desc">
					<h3>Briefing notes</h3>
					<p>TODO: Brief description.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Videos')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/videos.jpg" /></div>
				<div class="button-item desc">
					<h3>Videos</h3>
					<p>TODO: Look here!</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Handbook')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/handbook.jpg" /></div>
				<div class="button-item desc">
					<h3>Handbook</h3>
					<p>TODO: Handy summary.</p>
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
import Banner from './Banner.vue'

export default {
	name: 'Resources',
	components: {
		Banner
	},
	methods: {
		scrollCursor() {
			const buttons = document.getElementsByClassName('button-panel')
			for (let b = 0; b < buttons.length; b++) {
				buttons[b].classList.add('scroll-cursor')
			}
		},
		pointerCursor() {
			const buttons = document.getElementsByClassName('button-panel')
			for (let b = 0; b < buttons.length; b++) {
				buttons[b].classList.remove('scroll-cursor')
			}
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			// this is only here because Chrome and Edge don't correctly refresh 
			// :hover state as elements are moved under the cursor while scrolling
			document.addEventListener('scroll', this.scrollCursor)
			document.addEventListener('mousemove', this.pointerCursor)
		}
	},
	beforeDestroy() {
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			document.removeEventListener('scroll', this.scrollCursor)
			document.removeEventListener('mousemove', this.pointerCursor)
		}
	}
}
</script>

<style scoped>
.banner-style {
	background-image: url('../assets/images/resources.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.8);
}

.button-panel {
	width: 100%;
	border: 1px solid transparent;
	padding: 64px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;
}
.button-panel.scroll-cursor {
	cursor: ns-resize;
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
.button-item.image {
	height: 250px;
	background: rgba(65, 105, 91, 0.5); /*var(--vpGreen);*/
}
.button-item img {
	height: 100%;
	width: 100%;
	object-fit: cover;
	mix-blend-mode: luminosity;
	filter: blur(0.5px) grayscale(100%) opacity(0.5);
	border-color: var(--vpGreen);
}
.button-item.desc {
	padding: 16px 32px;
	background: var(--vpGreen);
	color: var(--vpCoolGrey);
}
.button-item.desc * {
	background: transparent;
	color: currentColor;
}
.button-panel:nth-of-type(odd) .button-item.image {
	background: rgba(90, 121, 121, 0.5); /*var(--vpDark);*/
}
.button-panel:nth-of-type(odd) .button-item.desc {
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
.button-panel:hover .button-item.desc * {
	color: whitesmoke;
}

@media (max-width: 1007px) {
	.button-panel {
		padding: 32px;
	}
	.button-item {
		margin: 8px;
	}
	.button-item.desc {
		padding: 8px 16px;
	}
}

@media (max-width: 768px) {
	.button-panel {
		padding: 16px;
	}
	.button-item {
		margin: 4px;
	}
	.button-item.desc {
		padding: 4px 8px;
	}
}
</style>
