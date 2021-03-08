<template>
	<div>
		<Banner class="banner-style" enTitle="Resources"></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					VIEWpoint draws together research from hundreds of scientists in
					the UK and China. Here we present a range of condensed
					information in plain language, based on the science and vast
					expertise. The original research can be found directly in the
					<span class="goto nowrap" @click="$router.push('catalogue')">
						<font-awesome-icon
							icon="link"
						></font-awesome-icon>
						<strong>Catalogue</strong></span
					>
					of publications.
				</p>
				<p lang="zh-cn">TODO: Mandarin here?</p>
			</div>
		</div>
		<div
			v-for="page in pages"
			:key="page.pageName"
			class="button-panel"
			@click="$router.push(page.pageName.toLowerCase())"
		>
			<div class="button-content">
				<div class="button-item image">
					<img
						:src="require(`../assets/images/${page.imageName}.jpg`)"
					/>
				</div>
				<div class="button-item desc">
					<h3>{{ page.title }}</h3>
					<p>{{ page.enDesc }}</p>
					<p lang="zh-cn">{{ page.cnDesc }}</p>
				</div>
			</div>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
/* TODO 
At the moment this looks and works very similar to Home.vue. That may change. 
If it doesn't, the styling could go into the .css or simplify by using new component(s)?
*/
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'

export default {
	name: 'Resources',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pages: [
				{
					pageName: 'Handbook',
					imageName: 'handbook',
					title: 'Handbook',
					enDesc:
						'A collection of articles compiling highlights of several years of the CSSP China project, including behind the scenes interviews with world-leading scientists.',
					cnDesc: 'TODO: Mandarin here?'
				},
				{
					pageName: 'Explainers',
					imageName: 'explainers',
					title: 'Explainers',
					enDesc:
						'One-page summaries of CSSP China research work, each covering the importance and approach to investigating the topic, with links to the original publications.',
					cnDesc: 'TODO: Mandarin here?'
				},
				{
					pageName: 'Infographics',
					imageName: 'infographics',
					title: 'Infographics',
					enDesc:
						'What the infographics are all about.',
					cnDesc: 'TODO: Mandarin here?'
				},
				{
					pageName: 'Briefing',
					imageName: 'briefing',
					title: 'Briefing notes',
					enDesc:
						'Each note collates a range of information sources on one pressing topic, clearly summarising the underlying issues, relevance and recommendations of the scientific evidence.',
					cnDesc: 'TODO: Mandarin here?'
				},
				{
					pageName: 'Videos',
					imageName: 'videos',
					title: 'Videos',
					enDesc:
						'A range of short videos from scientists and engineers in CSSP China, sharing their expertise in concise and engaging ways.',
					cnDesc: 'TODO: Mandarin here?'
				},
				{
					pageName: 'Training',
					imageName: 'training',
					title: 'Training materials',
					enDesc:
						'For those interested in the urban climate, here is a sequence of videos to introduce the hands-on use of the Urban Multi-scale Environmental Predictor (UMEP) software.',
					cnDesc: 'TODO: Mandarin here?'
				}
			]
		}
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

span.goto {
	cursor: pointer;
}
span.goto:hover,
span.goto:hover strong,
span.goto:hover svg path {
	color: var(--vpOrange);
}

.fa-link {
	font-size: 0.9rem;
	margin-right: 0.1rem;
	transform: translateY(-0.1rem);
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
	background: var(--vpDarkImage);
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
	.fa-link {
		font-size: 0.75rem;
	}
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
