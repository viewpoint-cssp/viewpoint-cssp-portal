<template>
	<div>
		<Banner
			class="banner-style"
			enTitle="A showcase for the Climate Science for Service Partnership with China"
		></Banner>
		<div class="about-page">
			<h2>VIEWpoint and CSSP China</h2>
			<hr />
			<div class="bilingual">
				<p>
					The VIEWpoint project seeks to maximise the impact of the
					world-class collaborative scientific research of the
					<a
						href="https://www.metoffice.gov.uk/research/approach/collaboration/newton/cssp-china/index"
						target="_blank"
						rel="noopener noreferrer"
					>
						<font-awesome-icon
							icon="external-link-alt"
						></font-awesome-icon
						>&nbsp;CSSP China (Climate Science for Service
						Partnership China)</a
					> programme. VIEWpoint has created tools, demonstrators,
					articles and videos to make research outputs more accessible
					to a wider audience, including government, industry and the
					public.
				</p>
				<p lang="zh-cn">
					“新观点” (VIEWpoint) 项目旨在最大化地发挥“中英气候科学到服务伙伴关系计划”
					<a
						href="https://www.metoffice.gov.uk/research/approach/collaboration/newton/cssp-china/index"
						target="_blank"
						rel="noopener noreferrer"
					>
						(CSSP China: Climate Science for Service Partnership China)</a
					> 的世界级科研合作的影响力。通过创建工具、演示、文章和视频，“新观点”项目让包括政府、企业和公众等在内的不同群体更易获得研究成果。
				</p>
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
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'

export default {
	name: 'Home',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pages: [
				{
					pageName: 'About',
					imageName: 'about',
					title: 'About VIEWpoint',
					enDesc:
						'Find out more about how and why these materials were created as part of a global scientific collaboration.',
					cnDesc: 'TODO: Chinese here'
				},
				{
					pageName: 'Resources',
					imageName: 'resources',
					title: 'Resources',
					enDesc:
						'A variety of accessible information to browse on climate science and addressing the challenges of climate change.',
					cnDesc: 'TODO: Chinese here'
				},
				{
					pageName: 'Demonstrators',
					imageName: 'demonstrators',
					title: 'Demonstrators',
					enDesc:
						'Explore climate datasets for yourself with easy-to-use interfaces to engage directly with the current and potential future scenarios.',
					cnDesc: 'TODO: Chinese here'
				},
				{
					pageName: 'Catalogue',
					imageName: 'catalogue',
					title: 'Catalogue of CSSP China published papers',
					enDesc:
						'The full suite of scientific peer-reviewed publications organised into a searchable catalogue which can be filtered by themes.',
					cnDesc: 'TODO: Chinese here'
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
		//this.$el.parentElement.scrollIntoView(true)
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
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
}

.about-page {
	padding: 64px;
}

.about-page a {
	text-decoration: none;
	outline: 0;
}
.about-page a:lang(zh-cn) {
	text-decoration: underline;
	color: var(--chineseAnchor);
}
.about-page a:hover,
.about-page a:hover svg path {
	color: var(--vpOrange);
}

.button-panel {
	width: 100%;
	max-width: var(--widthLimit);
	margin: 0 auto;
	border: 1px solid transparent;
	border-right-color: var(--primaryLightest);
	border-left-color: var(--primaryLightest);
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
}
.button-panel:hover .button-item {
	border-color: var(--vpOrange);
	box-shadow: 5px 5px 10px var(--vpDark);
}
.button-panel:hover .button-item.desc * {
	color: whitesmoke;
}

/* for zooming image on hover * /
.button-item.image {
	position: relative;
	overflow: hidden;
}
.button-item.image img {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
	transition: width 0.3s ease-in-out 0s;
	transition-property: width;
}
.button-panel:hover .button-item.image img {
	width: 110%;
}
/* end of styling to zoom on hover */

@media (max-width: 1007px) {
	.about-page,
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
	.about-page,
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
