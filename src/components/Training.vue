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
					TODO: Words about the training.
				</p>
				<p lang="zh-cn">
					TODO: Words translated to Chinese.
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
						'The Urban Multi-scale Environmental Predictor (UMEP) has been developed to investigate urban processes, including the effects of climate change. This page help you to get started on using the software.',
					cnTitle: 'UMEP',
					cnDesc: 'TODO: In Chinese.'
				},
				{
					pageName: 'arup',
					imageName: 'arup.jpg',
					enTitle: 'Climate Risk to Infrastructure',
					enDesc: `Arup, the global engineering company, have created this hands-on step-by-step tool to help planners and policy-makers understand how climate change may impact a city's infrastructure.`,
					cnTitle: 'ARUP',
					cnDesc: 'TODO: In Chinese.'
				},
				{
					pageName: 'qump',
					imageName: 'qump.jpg',
					enTitle: 'Climate Projection Uncertainty',
					enDesc:
						'Because there is no single best estimate of future climate change, Quantifying Uncertainty in Model Projections (QUMP) is a Met Office project to explore the range of uncertainty using multiple outcomes of climate projections.',
					cnTitle: 'QUMP',
					cnDesc: 'TODO: In Chinese.'
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
	background-image: url('../assets/images/training.jpg');
	background-position: bottom;
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
a:hover,
a:hover span,
a:hover svg path {
	color: var(--vpOrange);
}
</style>
