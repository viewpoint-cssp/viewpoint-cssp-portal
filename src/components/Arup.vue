<template>
	<div id="arup">
		<Banner
			class="banner-style"
			enTitle="Climate Risk to Infrastructure"
			cnTitle="基础设施面临的气候风险"
		></Banner>
		<div class="selected-page-wrapper">
			<div class="selected-page">
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'focus' }"
					@click="setPage('focus')"
				>
					<p>Focus</p>
					<p lang="zh-cn">焦点</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'handbook-en' }"
					@click="setPage('handbook-en')"
				>
					<p>In the Handbook</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'handbook-cn' }"
					@click="setPage('handbook-cn')"
				>
					<p lang="zh-cn">在手册中</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'explainer-en' }"
					@click="setPage('explainer-en')"
				>
					<p>See the Explainer</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'explainer-cn' }"
					@click="setPage('explainer-cn')"
				>
					<p lang="zh-cn">请见“主题解说”</p>
				</div>
			</div>
		</div>
		<div class="about-page selected-content" v-if="selectedPage == 'focus'">
			<div class="bilingual">
				<p>
					Arup has created a climate service that enables
					infrastructure planners, engineers and project managers in
					Chinese city authorities to assess the impacts of future
					climatic extremes, such as high temperatures or high
					rainfall, on critical infrastructure systems and to identify
					solutions to enable adaptation.
					<br />
					Based on research undertaken through the CSSP China project,
					the decision support tool provides easy access to an
					ensemble of trusted global climate model (GCM) datasets. The
					changing severity of hazards under future climate scenarios
					can be quantified and combined with the user’s knowledge of
					city infrastructure to assess risk and plan for targeted
					adaptation.
				</p>
				<p lang="zh-cn">
					奥雅纳 Arup 现已创建一项气候服务， 它
					可令中国市政部门中的基础设施规划师、工程师和项目经
					理能够评估未来的极端气候条件（例如高温或高强度降雨） 对
					关键基础设施系统 的 影响 ，并确定解决 方案 。根据气候科学
					支持 服务伙伴关系 计划 CSSP China ）中国 项目的研究， 这款
					决策支持工具可轻 松访问 整个 可信 赖的 全球气候模型 GCM
					数据集。用户可以未来气候情景下量化不断变化 的危害程 度，
					结合自身对城市基础设施的了解来实施风险评估 并 做出
					有针对性的适应措施。
				</p>
			</div>
			<!--<div class="bilingual">
				<p class="two-buttons">
					<button @click="setPage('handbook-en')">
						Handbook
					</button>
					<button @click="setPage('explainer-en')">
						Explainer
					</button>
				</p>
				<p class="two-buttons">
					<button @click="setPage('handbook-cn')">
						手册
					</button>
					<button @click="setPage('explainer-cn')">
						主题解说
					</button>
				</p>
			</div>-->
		</div>
		<div
			class="about-page selected-content"
			v-if="selectedPage == 'handbook-en'"
		>
			<img
				class="spread"
				src="../assets/images/MASTER_ENG_VP_Handbook_Web17.jpg"
			/>
		</div>
		<div
			class="about-page selected-content"
			v-if="selectedPage == 'handbook-cn'"
		>
			<img
				class="spread"
				src="../assets/images/MASTER_CHN_VP_Handbook_Web17.jpg"
			/>
		</div>
		<div
			class="about-page selected-content center"
			v-if="selectedPage == 'explainer-en'"
		>
			<img
				class="explainer"
				src="../assets/images/E06-en-arup-climate-risk-images.jpg"
			/>
		</div>
		<div
			class="about-page selected-content center"
			v-if="selectedPage == 'explainer-cn'"
		>
			<img
				class="explainer"
				src="../assets/images/E06-cn-arup-climate-risk-images.jpg"
			/>
		</div>
		<div class="about-page use-button">
			<p v-if="!toolReady">
				The tool is undergoing final testing and will be available in
				late spring 2021.
				<br />
				<span lang="zh-cn"
					>该工具正在进行最后的测试，并计划于2021年春末推出。</span
				>
			</p>
			<button class="use-button" disabled v-if="!toolReady">
				Use the tool<br /><span lang="zh-cn">使用此工具</span>
			</button>
			<a
				href="https://app.powerbi.com/view?r=eyJrIjoiZjkzYWE4YjMtMzQ0MC00YjdjLTliNmYtNGVjY2NlNjcxOTYzIiwidCI6IjRhZTQ4YjQxLTAxMzctNDU5OS04NjYxLWZjNjQxZmU3N2JlYSIsImMiOjh9&pageName=ReportSection"
				target="_blank"
				rel="noopener noreferrer"
				v-else
			>
				<button class="use-button">
					Use the tool<br /><span lang="zh-cn">使用此工具</span>
				</button>
			</a>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'

export default {
	name: 'Training',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			selectedPage: 'focus',
			toolReady: false
		}
	},
	methods: {
		setPage(page) {
			this.selectedPage = page
			this.$nextTick(() => {
				const content = document.getElementsByClassName(
					'selected-page-wrapper'
				)
				if (content.length > 0) {
					if ('scrollBehavior' in document.documentElement.style) {
						window.scrollTo({
							top: content[0].offsetTop,
							behavior: 'smooth'
						})
					} else {
						content[0].scrollIntoView(false) // not smooth behaviour! :(
					}
				}
			})
		}
	},
	mounted() {}
}
</script>

<style scoped>
#arup {
	min-height: var(--minContentHeight);
}

.banner-style {
	background-image: url('../assets/images/training-banner.jpg');
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.7);
}

.selected-page-wrapper {
	width: 100%;
	background: var(--vpDark);
}

.selected-page {
	max-width: var(--widthLimit);
	margin: 0 auto;
	padding: 0 64px;
	display: flex;
	flex-direction: row;
	background: transparent;
}

.selected-page-button {
	margin-right: 32px;
	padding: 8px 0;
	background: transparent;
}
.selected-page-button:last-of-type {
	margin-right: 0;
}
.selected-page-button p {
	background: transparent;
	color: var(--whiteDisabled);
}
.selected-page-button.selected p {
	color: var(--whiteDefault);
}
@media (hover: hover) {
	.selected-page-button:not([disabled]):not(.selected):hover p {
		color: var(--whiteHover);
	}
}
.selected-page-button:not([disabled]) {
	cursor: pointer;
}

.bilingual p br {
	margin-bottom: 16px;
}

.two-buttons button:first-of-type {
	margin-right: 4px;
}

.selected-content.center {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

img.spread {
	width: 100%;
}
img.explainer {
	width: 100%;
	max-width: 620px;
	height: auto;
}

.about-page.use-button {
	padding-top: 0;
	text-align: center;
}
button.use-button {
	font-size: 1.2rem;
	padding: 20px 50px;
}
button.use-button span {
	color: inherit;
	background: transparent;
	font-size: inherit;
}

@media (max-width: 1007px) {
	.selected-page {
		padding: 0 32px;
	}
}
@media (max-width: 640px) {
	.selected-page {
		padding: 0 16px;
	}
}
@media (max-width: 640px) {
	.selected-page {
		flex-direction: column;
	}
	.selected-page-button {
		display: flex;
		flex-direction: row;
		padding: 4px 8px 4px 0;
	}
	.selected-page-button:first-of-type {
		padding-top: 8px;
	}
	.selected-page-button:last-of-type {
		padding-bottom: 8px;
	}
	.selected-page-button p {
		margin-right: 8px;
	}
}
@media (max-width: 520px) {
	.selected-page {
		padding: 0 8px;
	}
	p.text {
		padding: 8px;
	}
}
</style>
