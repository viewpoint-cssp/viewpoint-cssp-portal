<template>
	<div id="explainers">
		<Banner
			class="banner-style"
			enTitle="Explainers"
			cnTitle="主题解说"
		></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					Explainers are one-page summaries of CSSP China research
					work. Each explainer covers the importance and approach to
					investigating the topic and includes links to the original
					publications.
				</p>
				<p lang="zh-cn">
					主题解说是对气候科学支持服务伙伴关系（CSSP）计划中国项目研究工作的概述。每个解说涵盖了该主题研究的的重要性、研究方法和来源链接。
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
						require(`../assets/images/explainer-${i + 1}.${
							doc.png ? 'png' : 'jpg'
						}`)
					"
					:class="doc.imgPosition"
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
					<h3 lang="zh-cn">{{ doc.cnTitle }}</h3>
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
import { explainerPdfs } from '../js/explainers.js'

export default {
	name: 'Explainers',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pdfs: []
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
	created() {
		this.pdfs = explainerPdfs // in explainers.js
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
#explainers {
	min-height: var(--minContentHeight);
}

.banner-style {
	background-image: url('../assets/images/explainers-banner.jpg');
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.8);
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

@media (hover: hover) {
	.button-panel a.title:hover h3,
	.button-panel a.title:hover .fa-download path {
		color: var(--vpOrange);
	}
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
.button-panel img.top {
	object-position: top;
}
.button-panel img.bottom {
	object-position: bottom;
}

@media (max-width: 1007px) {
	.button-panel {
		padding: 12px 16px;
	}
}

@media (max-width: 820px) {
	.button-panel img {
		height: 100px;
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
