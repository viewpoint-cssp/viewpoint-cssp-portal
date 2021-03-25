<template>
	<div id="briefing">
		<Banner
			class="banner-style"
			enTitle="Briefing Notes"
			cnTitle="简报"
		></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					Each briefing note collates a range of information sources
					on one pressing topic, clearly summarising the underlying
					issues, relevance and recommendations of the scientific
					evidence.
				</p>
				<p lang="zh-cn">
					每一份简报都整理了当下一系列焦点话题的信息来源，并清楚地总结了潜在的问题、关联性并给出了基于科学证据的建议。
				</p>
			</div>
		</div>
		<div class="wrapper">
			<div
				class="button-panel"
				v-for="(doc, i) in pdfs"
				:key="i"
				:ref="`panel-${i}`"
			>
				<h2>{{ i + 1 }}</h2>
				<a
					class="title english clickable"
					:href="require(`../assets/pdfs/${doc.enPdf}.pdf`)"
					:download="`VIEWpoint-${doc.enPdf}.pdf`"
					target="_blank"
					rel="noopener noreferrer"
					v-if="doc.enPdf"
				>
					<p class="draft" v-if="doc.enDraft">Draft</p>
					<h3>{{ doc.enTitle }}</h3>
					<font-awesome-icon
						icon="download"
						v-if="doc.enPdf"
					></font-awesome-icon>
				</a>
				<div class="title" v-else>
					<p class="draft" v-if="doc.enDraft">Draft</p>
					<h3>{{ doc.enTitle }}</h3>
				</div>
				<img
					:src="
						require(`../assets/images/briefing-${i + 1}.${
							doc.png ? 'png' : 'jpg'
						}`)
					"
					:class="{ 'with-border': doc.imgBorder }"
					:alt="doc.imgAlt"
					:title="getTooltip(doc)"
				/>
				<a
					class="title chinese clickable"
					:href="require(`../assets/pdfs/${doc.cnPdf}.pdf`)"
					:download="`VIEWpoint-${doc.cnPdf}.pdf`"
					target="_blank"
					rel="noopener noreferrer"
					v-if="doc.cnPdf"
				>
					<p class="draft" v-if="doc.cnDraft">Draft</p>
					<h3 v-if="doc.cnTitle" lang="zh-cn">{{ doc.cnTitle }}</h3>
					<p v-else lang="zh-cn">{{ doc.enTitle }} in Chinese</p>
					<font-awesome-icon
						icon="download"
						v-if="doc.cnPdf"
					></font-awesome-icon>
				</a>
				<div class="title" v-else-if="doc.cnTitle">
					<h3 v-if="doc.cnTitle" lang="zh-cn">{{ doc.cnTitle }}</h3>
					<p lang="zh-cn" style="opacity:0.3;">
						暂无中文版
					</p>
				</div>
				<div class="title" v-else>
					<p lang="zh-cn">暂无中文版</p>
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
	name: 'Briefing',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pdfs: [
				{
					enTitle:
						'Why is it so important to control sulphate aerosols? A complex role in a warming climate',
					enPdf:
						'BN01-en-sulphate-aerosol',
					cnTitle: '为什么控制硫酸盐气溶胶如此重要？--一个在气候变暖问题发挥复杂作用的角色',
					cnPdf: 'BN01-cn-sulphate-aerosol',
					imgCredit: 'Photoholgic, Unsplash',
					imgAlt: 'Air Pollution in Shanghai'
				},
				{
					enTitle:
						'Urban flood control in coastal mega cities: Shanghai',
					enPdf: 'BN02-en-urban-flood',
					cnTitle: '沿海大城市的城市防洪：上海的应用实例',
					cnPdf: 'BN02-cn-urban-flood',
					imgCredit: 'Kelly Sikkema, Unsplash',
					imgAlt: 'Urban flood'
				},
				{
					enTitle: 'Risks to food security in China under climate change',
					enPdf: 'BN03-en-food-security',
					cnTitle: '气候变化对中国粮食安全的威胁',
					cnPdf: 'BN03-cn-food-security',
					imgCredit: ' Pixabay.com',
					imgAlt: 'Maize harvest'
				},
				{
					enTitle:
						'Communicating uncertainty in climate and extreme weather forecasting',
					enPdf: 'BN04-en-communicating-uncertainity',
					cnTitle: '传达气候预报和极端天气预报的不确定性',
					cnPdf: 'BN04-cn-communicating-uncertainity',
					imgCredit: 'www.viewpoint-cssp.org/glossary',
					imgBorder: true
				}
			]
		}
	},
	methods: {
		getTooltip(doc) {
			let alt = doc.imgAlt || ''
			let credit = doc.imgCredit ? `Image 图片来源: ${doc.imgCredit}` : ''
			return alt && credit ? `${alt}\n${credit}` : alt + credit
		},
		scrollCursor() {
			const anchors = document.getElementsByTagName('a')
			for (let a = 0; a < anchors.length; a++) {
				anchors[a].classList.add('scroll-cursor')
			}
		},
		pointerCursor() {
			const anchors = document.getElementsByTagName('a')
			for (let a = 0; a < anchors.length; a++) {
				anchors[a].classList.remove('scroll-cursor')
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
#briefing {
	min-height: var(--minContentHeight);
}

.banner-style {
	background-image: url('../assets/images/briefing.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
}

.wrapper {
	display: flex;
	flex-direction: column;
}

.button-panel {
	width: 100%;
	max-width: var(--widthLimit);
	margin: 0 auto;
	border: 0 solid var(--primaryLightest);
	border-left-width: 1px;
	border-right-width: 1px;
	padding: 12px 32px;
	transition: background 0.2s ease-in-out;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
}

.button-panel:nth-of-type(odd) {
	background: var(--primaryLightest);
}

.button-panel:last-of-type {
	border-bottom-width: 1px;
}

.button-panel div,
.button-panel a,
.button-panel h3,
.button-panel p {
	background: transparent;
	margin-top: 0;
}

.button-panel h2 {
	width: 56px; /* 4%; */
	align-self: flex-start;
	margin: 0 8px 0 0;
	padding: 8px;
	border-radius: 50%;
	background: var(--vpOrange);
	color: var(--vpCoolGrey);
	text-align: center;
}

.button-panel .title {
	width: calc((100% - 56px) * 0.4); /* 38%; */
	display: flex;
	flex-direction: column;
	position: relative; /* for .draft */
	text-decoration: none;
}
.button-panel .title:focus {
	outline: none;
}

.button-panel .draft {
	position: absolute;
	font-size: 64px;
	font-weight: bold;
	letter-spacing: 8px;
	transform: rotate(-30deg) translateY(12px);
	opacity: 0.1;
}

.button-panel .title .fa-download {
	background: transparent;
	align-self: flex-end;
	margin-top: auto;
	font-size: 24px;
}

.button-panel a.scroll-cursor {
	cursor: ns-resize;
}

.button-panel a.title:hover h3,
.button-panel a.title:hover .fa-download path {
	color: var(--vpOrange);
}

.button-panel img {
	width: calc((100% - 56px) * 0.2); /* 20%; */
	min-width: calc((100% - 56px) * 0.2); /* 20%; */
	height: 130px;
	margin: 0 32px;
	object-fit: cover;
	object-position: center;
	align-self: flex-start;
}
.button-panel img.with-border {
	border: 1px solid var(--primaryLighter);
}

@media (max-width: 1007px) {
	.button-panel {
		padding: 12px 16px;
	}
}

@media (max-width: 820px) {
	.button-panel img {
		height: auto;
		align-self: stretch;
		margin: 0 16px;
	}
}

@media (max-width: 640px) {
	.button-panel {
		padding: 8px;
	}
	.button-panel h2 {
		width: 32px;
	}
	.button-panel img {
		margin: 0 8px;
	}
}
</style>
