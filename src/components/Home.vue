<template>
	<div>
		<Banner
			class="banner-style"
			enTitle="A showcase for the Climate Science for Service Partnership with China"
			cnTitle="气候科学支持服务伙伴关系(CSSP)计划中国项目成果展示"
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
					“新观点” (VIEWpoint) 项目旨在最大化地发挥“中英气候科学支持服务伙伴关系计划”
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
					<h3>{{ page.enTitle }}</h3>
					<p>{{ page.enDesc }}</p>
					<h3 lang="zh-cn">{{ page.cnTitle }}</h3>
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
					enTitle: 'About VIEWpoint',
					enDesc:
						'Find out more about how and why these materials were created as part of a global scientific collaboration.',
					cnTitle: '关于VIEWpoint新观点项目',
					cnDesc: '点击了解此项目作为全球科研合作的一部分，项目相关研究的合作方式以及服务目的等信息。'
				},
				{
					pageName: 'Resources',
					imageName: 'resources',
					enTitle: 'Resources',
					enDesc:
						'A variety of accessible information to browse on climate science and addressing the challenges of climate change.',
					cnTitle: '资源',
					cnDesc: '浏览各种关于气候科学和应对气候变化挑战的可访问信息。'
				},
				{
					pageName: 'Demonstrators',
					imageName: 'demonstrators',
					enTitle: 'Demonstrators',
					enDesc:
						'Explore climate datasets for yourself with easy-to-use interfaces to engage directly with the current and potential future scenarios.',
					cnTitle: '演示工具',
					cnDesc: '通过简单易操作的界面来探索气候数据集，并与当前和未来的应用场景进行直接互动。'
				},
				{
					pageName: 'Catalogue',
					imageName: 'catalogue',
					enTitle: 'Catalogue of CSSP China published papers',
					enDesc:
						'The full suite of scientific peer-reviewed publications organised into a searchable catalogue which can be filtered by themes.',
					cnTitle: '由CSSP China出版的论文目录',
					cnDesc: '该论文目录来源于学术界专家评审过的出版物，我们对此进行了重组，您可根据主题进行检索。'
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
	max-width: 500px;
	margin: 0 16px;
	border: 2px solid transparent;
}
.button-item.image {
	max-width: 400px;
	max-height: 250px;
	flex: 2 2 40%;
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
	flex: 3 3 60%;
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
