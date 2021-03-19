<template>
	<div>
		<Banner
			class="banner-style"
			enTitle="Resources"
			cnTitle="资源"
		></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					VIEWpoint draws together research from hundreds of
					scientists in the UK and China. Here we present a range of
					condensed information in plain language, based on the
					science and vast expertise. The original research can be
					found directly in the
					<span
						class="goto nowrap"
						@click="$router.push('catalogue')"
					>
						<font-awesome-icon icon="link"></font-awesome-icon>
						<strong>Catalogue</strong></span
					>
					of publications.
				</p>
				<p lang="zh-cn">
					VIEWpoint新观点项目汇集了来自中英两国数百名科学家的研究成果。在这里，我们基于科学和丰富的专业知识，用通俗易懂的语言将大量信息浓缩。对于初始研究成果，您可以直接在<span
						class="goto noicon nowrap"
						@click="$router.push('catalogue')"
					>
						出版论文目录</span
					>中找到。
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
					enTitle: 'Handbook',
					enDesc:
						'A collection of articles and highlights of several years of the CSSP China project, including interviews with world-leading scientists.',
					cnTitle: '手册',
					cnDesc: '本手册涵盖了一系列气候科学支持服务伙伴关系(CSSP)计划中国项目过去几年项目成果相关的文章和项目亮点，手册内容包括对世界顶尖科学家的采访。'
				},
				{
					pageName: 'Explainers',
					imageName: 'explainers',
					enTitle: 'Explainers',
					enDesc:
						'One-page summaries of CSSP China research work, each covering the importance and approach to investigating the topic, with links to the original publications.',
					cnTitle: '主题解说',
					cnDesc: '主题解说是对气候科学支持服务伙伴关系(CSSP)计划中国项目研究工作的一页概述。每一个主题解说都涵盖了所选取主题的重要性、研究方法和原始来源链接。'
				},
				{
					pageName: 'Briefing',
					imageName: 'briefing',
					enTitle: 'Briefing notes',
					enDesc:
						'Each note collates a range of information sources on one pressing topic, clearly summarising the underlying issues, relevance and recommendations of the scientific evidence.',
					cnTitle: '简报',
					cnDesc: '每一份简报都整理了当下一系列焦点话题的信息来源，清楚地总结了潜在的问题、关联性并给出了基于科学证据的建议。'
				},
				{
					pageName: 'Videos',
					imageName: 'videos',
					enTitle: 'Videos',
					enDesc:
						'A range of video and audio from specialists within CSSP China, sharing their expertise in concise and engaging ways.',
					cnTitle: '视频',
					cnDesc: '观看来自气候科学支持服务伙伴关系(CSSP)计划中国项目中的专家们所做的一系列短视频和音频讨论，他们用简洁和有趣的方式来分享他们的专业知识。'
				},
				{
					pageName: 'Infographics',
					imageName: 'infographics',
					enTitle: 'Infographics',
					enDesc:
						'Climate services and fundamental science distilled into attractive graphics, produced by the Met Office.',
					cnTitle: '信息图表',
					cnDesc: '浏览英国气象局(Met Office)如何将气候服务和基础科学信息浓缩成有趣的信息图表。'
				},
				{
					pageName: 'Training',
					imageName: 'training',
					enTitle: 'Training materials',
					enDesc:
						'For those interested in the urban climate, here is training to introduce the hands-on use of the Urban Multi-scale Environmental Predictor (UMEP) software.',
					cnTitle: '培训材料',
					cnDesc: '对于城市气候感兴趣的人，这里介绍了如何使用城市多尺度环境预测器(UMEP)软件的培训。'
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
span.goto.noicon {
	text-decoration: underline;
	color: var(--chineseAnchor);
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
	flex: 2 2 40%;
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
