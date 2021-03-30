<template>
	<div id="training">
		<Banner
			class="banner-style"
			enTitle="Training materials"
			cnTitle="培训材料"
		></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					These training materials are for those with some technical
					knowledge to get started in some of the tools within CSSP
					China. Find out more about how climate change can impact
					cities and infrastructure, and investigate the range of
					outcomes for climate projections in the second half of this
					century.
				</p>
				<p lang="zh-cn">
					这些培训材料为具有一定技术知识的人员设计，帮助他们着手使用气候科学支持服务伙伴关系（CSSP）
					计划中国项目下的一些工具。这些培训材料可以帮助相关人员获取更多有关气候变化如何影响城市和基础设施的相关信息，并调查本世纪下半叶的气候预测结果范围。
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
	name: 'Demonstrators',
	components: {
		Banner,
		Gotop,
		SelectionPanel
	},
	data() {
		return {
			pages: [
				{
					pageName: 'umep',
					imageName: 'umep.jpg',
					enTitle: 'Urban Modelling',
					enDesc:
						'The Urban Multi-scale Environmental Predictor (UMEP) has been developed to investigate urban processes, including the effects of climate change.',
					cnTitle: '城市模型',
					cnDesc:
						'城市多尺度环境预测器（UMEP）的开发可以调查包括气候变化影响在内的城市发展过程。'
				},
				{
					pageName: 'arup',
					imageName: 'arup.jpg',
					enTitle: 'Climate Risk to Infrastructure',
					enDesc: `Arup, the global engineering company, have created this hands-on step-by-step tool to help planners and policy-makers understand how climate change may impact a city's infrastructure.`,
					cnTitle: '基础设施面临的气候风险',
					cnDesc:
						'国际工程咨询公司奥雅纳（Arup）已创建了实用的逐步操作工具，以帮助城市规划人员和政策制定者了解气候变化将如何影响城市基础设施。'
				},
				{
					pageName: 'qump',
					imageName: 'qump.jpg',
					enTitle: 'Climate Projection Uncertainty',
					enDesc:
						'Because there is no single best estimate of future climate change, Quantifying Uncertainty in Model Projections (QUMP) is a Met Office project to explore the range of uncertainty using multiple outcomes of climate projections.',
					cnTitle: '气候预测的不确定性',
					cnDesc:
						'由于没有关于对未来气候变化的最佳预估，由英国气象局（Met Office）开发的气候预测模型不确定性量化（QUMP）项目，旨在利用多种气候预测结果探索气候预测不确定性的范围。'
				}
			]
		}
	},
	methods: {
		goTo(page) {
			if (page == 'umep') {
				this.$router.push(page.toLowerCase())
			} else if (page == 'arup') {
				location.href =
					'https://app.powerbi.com/view?r=eyJrIjoiZjkzYWE4YjMtMzQ0MC00YjdjLTliNmYtNGVjY2NlNjcxOTYzIiwidCI6IjRhZTQ4YjQxLTAxMzctNDU5OS04NjYxLWZjNjQxZmU3N2JlYSIsImMiOjh9&pageName=ReportSection'
			} else if (page == 'qump') {
				location.href = 'https://qump-project.github.io/qump-hadgem3/'
			}
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
#training {
	min-height: var(--minContentHeight);
}

.banner-style {
	background-image: url('../assets/images/training-banner.jpg');
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.7);
}

a {
	text-decoration: none;
	outline: 0;
}
a:lang(zh-cn) {
	text-decoration: underline;
	color: var(--chineseAnchor);
}
@media (hover: hover) {
	a:hover,
	a:hover span,
	a:hover svg path {
		color: var(--vpOrange);
	}
}

.selection-panel >>> .selection-item.image {
	/* these images are square so width needs to be reduced */
	max-width: 300px;
}
</style>
