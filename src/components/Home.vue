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
					>
					project. VIEWpoint has created tools, demonstrators,
					articles and videos to make research outputs more accessible
					to a wider audience, including government, industry and the
					public.
				</p>
				<p lang="zh-cn">
					“新观点” (VIEWpoint)
					项目旨在最大化地发挥“中英气候科学支持服务伙伴关系计划”
					<a
						href="https://www.metoffice.gov.uk/research/approach/collaboration/newton/cssp-china/index"
						target="_blank"
						rel="noopener noreferrer"
					>
						(CSSP China: Climate Science for Service Partnership
						China)</a
					>
					的世界级科研合作的影响力。通过创建工具、演示、文章和视频，“新观点”项目让包括政府、企业和公众等在内的不同群体更易获得研究成果。
				</p>
			</div>
		</div>
		<SelectionPanel
			v-for="page in pages"
			:page="page"
			:color="true"
			:key="page.pageName"
			@goTo="goTo"
		></SelectionPanel>
		<Gotop></Gotop>
	</div>
</template>

<script>
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'
import SelectionPanel from './SelectionPanel.vue'

export default {
	name: 'Home',
	components: {
		Banner,
		Gotop,
		SelectionPanel
	},
	data() {
		return {
			pages: [
				{
					pageName: 'About',
					imageName: 'about.jpg',
					enTitle: 'About VIEWpoint',
					enDesc:
						'Find out more about how and why these materials were created as part of a global scientific collaboration.',
					cnTitle: '关于VIEWpoint新观点项目',
					cnDesc:
						'点击了解此项目作为全球科研合作的一部分，项目相关研究的合作方式以及服务目的等信息。'
				},
				{
					pageName: 'Resources',
					imageName: 'resources.jpg',
					enTitle: 'Resources',
					enDesc:
						'A variety of accessible information to browse on climate science and addressing the challenges of climate change.',
					cnTitle: '资源',
					cnDesc:
						'浏览各种关于气候科学和应对气候变化挑战的可访问信息。'
				},
				{
					pageName: 'Demonstrators',
					imageName: 'demonstrators.jpg',
					enTitle: 'Demonstrators',
					enDesc:
						'Explore climate datasets for yourself with easy-to-use interfaces to engage directly with the current and potential future scenarios.',
					cnTitle: '演示工具',
					cnDesc:
						'通过简单易操作的界面来探索气候数据集，并与当前和未来的应用场景进行直接互动。'
				},
				{
					pageName: 'Catalogue',
					imageName: 'catalogue.jpg',
					enTitle: 'Catalogue of CSSP China published papers',
					enDesc:
						'The full suite of scientific peer-reviewed publications organised into a searchable catalogue which can be filtered by themes.',
					cnTitle: '由CSSP China出版的论文目录',
					cnDesc:
						'该论文目录来源于学术界专家评审过的出版物，我们对此进行了重组，您可根据主题进行检索。'
				}
			]
		}
	},
	methods: {
		goTo(pageName) {
			this.$router.push(pageName.toLowerCase())
		},
		scrollCursor() {
			const buttons = document.getElementsByClassName('selection-panel')
			for (let b = 0; b < buttons.length; b++) {
				buttons[b].classList.add('scroll-cursor')
			}
		},
		pointerCursor() {
			const buttons = document.getElementsByClassName('selection-panel')
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
	background-blend-mode: inherit; /* or overlay and no box-shadow */
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.7);
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
@media (hover: hover) {
	.about-page a:hover,
	.about-page a:hover svg path {
		color: var(--vpOrange);
	}
}

.selection-panel >>> .selection-item.image {
	max-height: 250px;
}

@media (max-width: 1007px) {
	.about-page {
		padding: 32px;
	}
}

@media (max-width: 768px) {
	.about-page {
		padding: 16px;
	}
}
</style>
