<template>
	<div>
		<Banner class="banner-style" enTitle="Explainers"></Banner>
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
				<img
					:src="
						require(`../assets/images/explainer-${i + 1}.${
							doc.png ? 'png' : 'jpg'
						}`)
					"
					:class="doc.imgPosition"
				/>
				<a
					class="title mandarin clickable"
					:href="require(`../assets/pdfs/${doc.cnPdf}.pdf`)"
					:download="`${doc.cnPdf}.pdf`"
					target="_blank"
					rel="noopener noreferrer"
					v-if="doc.cnPdf"
				>
					<p class="draft" v-if="doc.cnDraft">Draft</p>
					<h3 v-if="doc.cnTitle" lang="zh-cn">{{ doc.cnTitle }}</h3>
					<p v-else lang="zh-cn">
						TODO: 'Not available in Mandarin' in Mandarin!
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
						TODO: 'Not available in Mandarin' in Mandarin!
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
	name: 'Explainers',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pdfs: [
				{
					enTitle:
						'Investigating heatwaves in China under climate change',
					enPdf: 'E01-en-investigating-heatwaves',
					enDraft: true
				},
				{
					enTitle:
						'Increasing flash floods in a drying climate: dual challenges facing Southwest China',
					enPdf: 'E02-en-increasing-flash-floods',
					enDraft: true,
					imgPosition: 'bottom'
				},
				{
					enTitle:
						'Tibetan Plateau Vortices: a comparison of tracking methods',
					enPdf: 'E03-en-tibetan-plateau-vortices',
					enDraft: true,
					imgPosition: 'bottom'
				},
				{
					enTitle:
						'What will shape future Beijing haze events and air quality?',
					enPdf: 'E04-en-beijing-haze',
					enDraft: true,
					cnTitle: '什么会影响北京未来的雾霾事件？',
					cnPdf:
						'Mandarin Explainer No4 What will shape future Beijing Haze events',
					cnDraft: true,
					imgPosition: 'bottom'
				},
				{
					enTitle:
						'Efficient assessments of Chinese Fengyun-3 satellite instruments to improve weather forecasts',
					enPdf: 'E05-en-satellite-instrument',
					enDraft: true,
					cnTitle:
						'高效评估中国风云三号卫星仪器，借以 提高天气预报质量',
					cnPdf:
						'Mandarin Explainer No 5 Efficient assessments of Chin',
					cnDraft: true
				},
				{
					enTitle: 'Arup climate risk tool',
					enPdf: 'Arup Climate Risk Tool v6 No 6',
					enDraft: true,
					imgPosition: 'top'
				},
				{
					enTitle: `High-resolution revolution brings insight into China's climate`,
					enPdf: `E07-en-high-resolution`,
					enDraft: true
				},
				{
					enTitle:
						'Safer operation for urban rail transport: wind risk warning system',
					enPdf: 'E08-en-urban-rail-transport',
					enDraft: true
				},
				{
					enTitle:
						'A promising outlook: skilful seasonal forecasts for energy sectors in China',
					enPdf: 'E09-en-seasonal-forecast',
					enDraft: true
				},
				{
					enTitle:
						'Correcting urban bias in large-scale temperature records in China',
					enPdf: 'E10-en-correcting-urban-bias',
					enDraft: true
				},
				{
					enTitle:
						'Flood footprint assessment: a new approach for impacts and recovery',
					enPdf: 'E11-en-flood-footprint-assessment',
					enDraft: true,
					imgPosition: 'top'
				},
				{
					enTitle:
						'Working together: the China Framework for Climate Services (CFCS)',
					enPdf: 'E12-en-working-together',
					enDraft: true
				},
				{
					enTitle:
						'Examining airflow around tall buildings using a 3D model',
					enPdf: 'E13-en-examining-airflow',
					enDraft: true
				},
				{
					enTitle:
						'Increasing summer rainfall intensity during the past four decades observed in China',
					enPdf: 'E14-en-increasing-summer-rainfall',
					enDraft: true,
					imgPosition: 'top'
				},
				{
					enTitle:
						'Daily satellite monitoring of crop drought conditions: developing a service',
					enPdf: 'E15-en-daily-satellite-monitoring',
					enDraft: true
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
	background-image: url('../assets/images/explainers.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.8);
}

.wrapper {
	display: flex;
	flex-direction: column;
}

.button-panel {
	width: 100%;
	padding: 12px 64px 12px 32px;
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
.button-panel p:lang(zh-cn) {
	font-style: italic;
	opacity: 0.95;
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
.button-panel img.top {
	object-position: top;
}
.button-panel img.bottom {
	object-position: bottom;
}

@media (max-width: 1007px) {
	.button-panel {
		padding: 8px 32px 8px 16px;
	}
}
@media (max-width: 640x) {
	.button-panel {
		padding: 4px 16px 4px 8px;
	}
}
</style>
