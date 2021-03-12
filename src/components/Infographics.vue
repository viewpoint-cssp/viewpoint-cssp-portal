<template>
	<div>
		<Banner class="banner-style" enTitle="Infographics"></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					The Met Office have produced these high quality infographics
					as quick reference documents on important scientific topics
					for China. They are an easy way to find out a lot on the
					science in one place.
				</p>
				<p lang="zh-cn">
					TODO: Chinese here
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
					:download="`${doc.enPdf}.pdf`"
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
				<div 
					class="img-wrapper"
					:class="{ double: doc.cnPdf }"	
				>
					<img
						:src="require(`../assets/images/${doc.img}.jpg`)"
					/>
					<img
						:src="require(`../assets/images/${doc.img}-cn.jpg`)"
						v-if="doc.cnPdf"
					/>
				</div>
				<a
					class="title chinese clickable"
					:href="require(`../assets/pdfs/${doc.cnPdf}.pdf`)"
					:download="`${doc.cnPdf}.pdf`"
					target="_blank"
					rel="noopener noreferrer"
					v-if="doc.cnPdf"
				>
					<p class="draft" v-if="doc.cnDraft">Draft</p>
					<h3 v-if="doc.cnTitle" lang="zh-cn">{{ doc.cnTitle }}</h3>
					<p v-else lang="zh-cn">
						TODO: 'Not available in Chinese' in Chinese!
					</p>
					<font-awesome-icon
						icon="download"
						v-if="doc.cnPdf"
					></font-awesome-icon>
				</a>
				<div class="title" v-else>
					<p class="draft" v-if="doc.cnDraft">Draft</p>
					<h3 v-if="doc.cnTitle" lang="zh-cn">{{ doc.cnTitle }}</h3>
					<p v-else lang="zh-cn">
						TODO: 'Not available in Chinese' in Chinese!
					</p>
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
					img: 'infographic-4',
					enPdf: 'I04-en-food-security',
					enTitle: 'Food security in CSSP China',
					cnPdf: 'I04-cn-food-security',
					cnTitle: '中英气候科学支持服务伙伴关系计划之粮食安全'
				},
				{
					img: 'infographic-2',
					enPdf: 'I02-en-air-quality',
					enTitle: 'Urban China Decadal Air Quality Service',
					cnPdf: 'I02-cn-air-quality',
					cnTitle: '中国城市十年空气质量服务'
				},
				{
					img: 'infographic-5',
					enPdf: 'I05-en-urban',
					enTitle: 'Urban Climate Services in CSSP China',
					cnPdf: 'I05-cn-urban',
					cnTitle: '中英气候科学服务伙伴关系计划 (CSSP)之中国城市气候服务'
				},
				{
					img: 'infographic-1',
					enPdf: 'I01-en-assessing-risk',
					enTitle: `Assessing China's risk to climate related extremes`
				},
				{
					img: 'infographic-3',
					enPdf: 'I03-en-seasonal-forecast',
					enTitle: 'Seasonal forecast service for the Yangtze River Basin'
				}
			]
		}
	},
	methods: {
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
.banner-style {
	background-image: url('../assets/images/infographics.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
}

.wrapper {
	display: flex;
	flex-direction: column;
}

.button-panel {
	width: 100%;
	max-width: 1358px;
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

.button-panel .img-wrapper {	
	width: calc((100% - 56px) * 0.2); /* 20% */
	margin: 0 32px;
	height: 170px;
}
.button-panel .img-wrapper.double {
	padding-right: 50px; /* 2nd image is offset by 50px */
	height: 195px; /* 2nd image is offset by 25px; */
	position: relative; /* for 2nd image */
}

.button-panel img {
	position: absolute;
	width: 120px;
}
.button-panel img:nth-of-type(even) {
	top: 25px;
	left: 50px;
}

@media (max-width: 1007px) {
	.button-panel {
		padding: 12px 16px;
	}
	.button-panel .img-wrapper {	
		margin: 0 16px;
		height: 85px;
	}
	.button-panel .img-wrapper.double {
		padding-right: 25px; /* 2nd image is offset by 25px */
		height: 97px; /* 2nd image is offset by 12px; */
	}
	.button-panel img {
		width: 60px;
	}
	.button-panel img:nth-of-type(even) {
		top: 12px;
		left: 25px;
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
	.button-panel img:nth-of-type(even) {
		display: none;
	}
}
</style>
