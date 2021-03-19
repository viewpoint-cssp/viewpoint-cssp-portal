<template>
	<div>
		<Banner
			class="banner-style"
			enTitle="Demonstrators"
			cnTitle="演示工具"
		></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					The CSSP China project has produced a wealth of excellent
					research that has huge practical impact in understanding and
					dealing with climate change. The three data visualisations
					available here allow hands-on exploration of research
					outputs for mapping surface temperature, water resources or
					crop stress for locations in China. These datasets have the
					potential to form the basis of new operational climate
					services.
				</p>
				<p lang="zh-cn">
					气候科学支持服务伙伴关系(CSSP)计划中国项目结成了大量优秀的研究成果，对于更好地理解和应对气候变化产生了比较大的实际影响。这里提供的三种数据可视化工具，可以对中国各地地表温度的进行测绘、对水资源或作物胁迫等研究成果进行探索实践。这些数据集有可能成为全新的可操作气候服务的基础。
				</p>
			</div>
			<div class="bilingual">
				<p>
					These demonstrators have been co-developed by the
					<a
						href="https://www.the-iea.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="nowrap">
							<font-awesome-icon
								icon="external-link-alt"
							></font-awesome-icon>
							Institute
						</span>
						for Environmental Analytics</a
					>
					(IEA) based on user requirements and the data provided by
					projects in CSSP China.
				</p>
				<p lang="zh-cn">
					这些演示工具是由<a
						href="https://www.the-iea.org"
						target="_blank"
						rel="noopener noreferrer"
						lang="zh-cn"
						>环境分析研究所</a
					>（IEA）根据用户需求以及CSSP中国项目中所提供的数据共同开发的。
				</p>
			</div>
		</div>
		<div
			v-for="page in pages"
			:key="page.pageName"
			class="button-panel"
			:disabled="page.disabled"
			@click="goTo(page.pageName)"
		>
			<div class="button-content">
				<div class="button-item image">
					<img
						:src="require(`../assets/images/${page.imageName}.png`)"
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
	name: 'Demonstrators',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pages: [
				{
					pageName: 'suhi',
					imageName: 'suhi-laptop',
					enTitle: 'Surface Urban Heat Island',
					enDesc:
						'Use satellite data to explore the variation in surface temperatures across four cities in China. Developed with the Met Office.',
					cnTitle: '地表城市热岛',
					cnDesc:
						'利用卫星数据探索中国四个城市地表温度的变化。此工具是与英国气象局合作开发的。'
				},
				{
					pageName: 'wrm',
					imageName: 'wrm-laptop',
					enTitle: 'Water Resources Management',
					enDesc:
						'A prototype dashboard to investigate the impact of climate change and water abstraction on the Upper Yellow River basin. Developed with the University of Leeds.',
					cnTitle: '水资源管理',
					cnDesc:
						'研究气候变化和引水对黄河上游流域影响的原型操作界面。此工具与利兹大学共同开发。'
				},
				{
					pageName: 'verdant',
					imageName: 'verdant-laptop',
					enTitle: 'Verdant',
					enDesc:
						'Example output of satellite mapping of crop drought conditions, in development as an automated daily service. Developed with the University of Leicester.',
					cnTitle: '作物健康监测',
					cnDesc:
						'用卫星地图输出的作物干旱状况示例，此工具将作为全自动化的日常监测服务。此工具是与莱斯特大学合作开发的。',
					disabled: true
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

.button-panel {
	width: 100%;
	max-width: var(--widthLimit);
	margin: 0 auto;
	border: 1px solid transparent;
	border-right-color: var(--primaryLightest);
	border-left-color: var(--primaryLightest);
	padding: 64px;
	transition: background 0.2s ease-in-out;
}
.button-panel:not([disabled]) {
	cursor: pointer;
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
}

.button-item {
	max-width: 500px;
	margin: 0 16px;
	border: 2px solid transparent;
}
.button-item.image {
	max-width: 400px;
	flex: 2 2 40%;
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
	flex: 3 3 60%;
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
.button-panel:not([disabled]):hover {
	background: var(--bannerGrey);
	/*border-color: var(--vpOrange);*/
}
.button-panel:not([disabled]):hover .button-item {
	border-color: var(--vpOrange) !important;
	box-shadow: 5px 5px 10px var(--vpDark);
}
.button-panel:not([disabled]):hover .button-item.desc * {
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
