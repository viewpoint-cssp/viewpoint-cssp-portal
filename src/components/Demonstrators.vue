<template>
	<div>
		<Banner class="banner-style" enTitle="Demonstrators"></Banner>
		<div class="about-page">
			<h2>About the demonstrators</h2>
			<hr />
			<p>
				Some description about demonstrators, what they are, why these
				were selected.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
		</div>
		<div
			v-for="page in pages"
			:key="page.pageName"
			class="button-panel"
			@click="goTo(page.pageName)"
		>
			<div class="button-content">
				<div class="button-item image">
					<img
						:src="require(`../assets/images/${page.imageName}.png`)"
					/>
				</div>
				<div class="button-item desc">
					<h3>{{ page.title }}</h3>
					<p>{{ page.enDesc }}</p>
					<p lang="zh-cn">{{ page.cnDesc }}</p>
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
	name: 'Demonstrators',
	components: {
		Banner
	},
	data() {
		return {
			pages: [
				{
					pageName: 'suhi',
					imageName: 'suhi-laptop',
					title: 'Surface Urban Heat Island',
					enDesc: 'Intro...',
					cnDesc: 'TODO: Mandarin here?'
				},
				{
					pageName: 'wrm',
					imageName: 'wrm-laptop',
					title: 'Water Resources Management',
					enDesc:
						'A prototype dashboard to investigate the impact of climate change and water abstraction on the Upper Yellow River basin.',
					cnDesc: 'TODO: Mandarin here?'
				}
			]
		}
	},
	methods: {
		goTo(page) {
			if (page == 'suhi') {
				location.href = 'https://the-iea.github.io/viewpoint-suhi'
			} else if (page == 'wrm') {
				location.href = 'https://the-iea.github.io/viewpoint-wrm'
			}
		},
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
	background-image: url('../assets/images/demonstrators.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.7);
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
.button-panel:nth-of-type(odd) div.button-content {
	flex-direction: row-reverse;
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
	background: var(--vpCoolGrey);
	border-color: var(--vpGreen);
}
.button-item img {
	height: 100%;
	width: 100%;
	object-fit: cover;
	opacity: 0.6;
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

.button-panel:nth-of-type(odd) .button-item.desc {
	background: var(--vpDark);
}
.button-panel:nth-of-type(odd) .button-item.image {
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
	.button-item.image {
		height: auto;
	}
	.button-item img {
		object-fit: contain;
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
