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
					class="title english"
					:href="require(`../assets/pdfs/${doc.enPdf}.pdf`)"
					target="_blank" rel="noopener noreferrer"
					v-if="doc.enPdf"
				>
					<p class="draft" v-if="doc.enDraft">Draft</p>
					<h3>{{ doc.enTitle }}</h3>
					<font-awesome-icon
						icon="file-pdf"
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
				/>
				<a
					class="title mandarin"
					:href="require(`../assets/pdfs/${doc.cnPdf}.pdf`)"
					target="_blank" rel="noopener noreferrer"
					v-if="doc.cnPdf"
				>
					<p class="draft" v-if="doc.cnDraft">Draft</p>
					<h3 v-if="doc.cnTitle" lang="zh-cn">{{ doc.cnTitle }}</h3>
					<p v-else lang="zh-cn">
						TODO: 'Not available in Mandarin' in Mandarin!
					</p>
					<font-awesome-icon
						icon="file-pdf"
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
	</div>
</template>

<script>
import Banner from './Banner.vue'

export default {
	name: 'Explainers',
	components: {
		Banner
	},
	data() {
		return {
			pdfs: [
				{
					enTitle:
						'Investigating heatwaves in China under climate change – unchartered waters',
					enPdf: 'Investigating heatwaves in China under climate',
					enDraft: true
				},
				{
					enTitle:
						'Increasing flash floods in a drying climate: dual challenges facing Southwest China',
					enPdf:
						'Increasing flash floods in a drying climate dual challenges facing Southwest China No2',
					enDraft: true
				},
				{
					enTitle:
						'Investigating TPV tracking: comparison between modern and conventional methods',
					enPdf:
						'DRAFT Investigating TPV Tracking Comparison Between Modern and Conventional Methods Exp No3',
					enDraft: true
				},
				{
					enTitle: 'What will shape future Beijing haze events?',
					enPdf: 'Explainer_Beijing_haze_No 4',
					enDraft: true,
					cnTitle: '什么会影响北京未来的雾霾事件？',
					cnPdf:
						'Mandarin Explainer No4 What will shape future Beijing Haze events',
					cnDraft: true
				},
				{
					enTitle: 'Efficient assessments of Chinese Fengyun-3 satellites instruments to improve weather forecast',
					enPdf: 'Explainer No 5 Chinese_satellite_instrument',
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
					enDraft: true
				},
				{
					enTitle: `High-resolution revolution brings insight into China's climate`,
					enPdf: `High-Resolution Revolution Brings Insight into China's Climate No 7`,
					enDraft: true
				},
				{
					png: true,
					enTitle:
						'Safer operation for urban rail transport with an integrated wind risk warning system',
					enPdf:
						'8 Safer operation for urban rail transport with integrated wind ri',
					enDraft: true
				},
				{
					enTitle:
						'A promising outlook for skilful seasonal forecast for energy sectors in China',
					enPdf:
						'Explainer_promising outlook for skilful seasonal forecast for energy sectors_No 9',
					enDraft: true
				},
				{
					enTitle:
						'Correcting urban bias in large-scale temperature records in China'
				},
				{
					enTitle:
						'Flood footprint assessment: a new approach for flood-induced indirect economic impact measurement and post-flood recovery',
					enPdf: 
						'11 Flood footprint assessment a new approach for flood-induced indirect economic impact',
					enDraft: true
				},
				{
					png: true,
					enTitle: 'The China Framework for Climate Services (CFCS)',
					enPdf: 'China Framework for Climate services No12 HG',
					enDraft: true
				},
				{
					enTitle: 'Wake characteristics of tall buildings in a realistic urban canopy',
					enPdf: 'Wake characteristics of tall buildings No13 (HG)',
					enDraft: true
				},
				{
					enTitle:
						'Robust increase in extreme summer rainfall intensity during the past four decades observed in China',
					enPdf: 'VIEWpoint Explainer extreme_rainfall No14',
					enDraft: true
				}
			]
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
	}
}
</script>

<style scoped>
.banner-style {
	background-image: url('../assets/images/resources.jpg');
	background-blend-mode: soft-light;
}
@supports (-ms-ime-align: auto) {
	/* EdgeHTML since background-blend-style doesn't work, use a white box 'shadow' to lighten */
	.banner-style {
		box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.8);
	}
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

.button-panel .title .fa-file-pdf {
	background: transparent;
	align-self: flex-end;
	margin-top: auto;
	font-size: 24px;
}

.button-panel a.title:hover h3,
.button-panel a.title:hover .fa-file-pdf path {
	color: var(--vpOrange);
}

.button-panel img {
	width: calc((100% - 56px) * 0.2); /* 20%; */
	min-width: calc((100% - 56px) * 0.2); /* 20%; */
	max-height: 130px;
	margin: 0 32px;
	object-fit: cover;
	object-position: center;
	align-self: flex-start;
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
