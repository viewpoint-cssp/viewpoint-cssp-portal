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
	name: 'Resources',
	components: {
		Banner,
		Gotop,
		SelectionPanel
	},
	data() {
		return {
			pages: [
				{
					pageName: 'Handbook',
					imageName: 'handbook.jpg',
					enTitle: 'Handbook',
					enDesc:
						'A collection of articles and highlights of several years of the CSSP China project, including interviews with world-leading scientists.',
					cnTitle: '手册',
					cnDesc:
						'本手册涵盖了一系列气候科学支持服务伙伴关系(CSSP)计划中国项目过去几年项目成果相关的文章和项目亮点，手册内容包括对世界顶尖科学家的采访。'
				},
				{
					pageName: 'Explainers',
					imageName: 'explainers.jpg',
					enTitle: 'Explainers',
					enDesc:
						'One-page summaries of CSSP China research work, each covering the importance and approach to investigating the topic, with links to the original publications.',
					cnTitle: '主题解说',
					cnDesc:
						'主题解说是对气候科学支持服务伙伴关系(CSSP)计划中国项目研究工作的一页概述。每一个主题解说都涵盖了所选取主题的重要性、研究方法和原始来源链接。'
				},
				{
					pageName: 'Briefing',
					imageName: 'briefing.jpg',
					enTitle: 'Briefing notes',
					enDesc:
						'Each note collates a range of information sources on one pressing topic, clearly summarising the underlying issues, relevance and recommendations of the scientific evidence.',
					cnTitle: '简报',
					cnDesc:
						'每一份简报都整理了当下一系列焦点话题的信息来源，清楚地总结了潜在的问题、关联性并给出了基于科学证据的建议。'
				},
				{
					pageName: 'Videos',
					imageName: 'videos.jpg',
					enTitle: 'Videos',
					enDesc:
						'A range of video and audio from specialists within CSSP China, sharing their expertise in concise and engaging ways.',
					cnTitle: '视频',
					cnDesc:
						'观看来自气候科学支持服务伙伴关系(CSSP)计划中国项目中的专家们所做的一系列短视频和音频讨论，他们用简洁和有趣的方式来分享他们的专业知识。'
				},
				{
					pageName: 'Infographics',
					imageName: 'infographics.jpg',
					enTitle: 'Infographics',
					enDesc:
						'Climate services and fundamental science distilled into attractive graphics, produced by the Met Office.',
					cnTitle: '信息图表',
					cnDesc:
						'浏览英国气象局(Met Office)如何将气候服务和基础科学信息浓缩成有趣的信息图表。'
				},
				{
					pageName: 'Training',
					imageName: 'training.jpg',
					enTitle: 'Training materials',
					enDesc:
						'These training materials are for those with some technical knowledge to get started in some of the tools within CSSP China.',
					cnTitle: '培训材料',
					cnDesc: 'TODO: Chinese.'
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
	background-image: url('../assets/images/resources-banner.jpg');
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

@media (max-width: 1007px) {
	.fa-link {
		font-size: 0.75rem;
	}
}
</style>
