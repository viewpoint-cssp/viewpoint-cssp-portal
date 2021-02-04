<template>
	<div>
		<Banner class="banner-style" enTitle="Explainers"></Banner>
		<div class="wrapper">
			<div
				class="button-panel"
				:class="{ hidden: !showPanel(i) }"
				v-show-slide="showPanel(i)"
				v-for="(doc, i) in pdfs"
				:key="i"
			>
				<h2>{{ i + 1 }}</h2>
				<div
					class="title english clickable"
					@click="togglePdf(i, 'en')"
				>
					<p>{{ doc.enTitle }}</p>
					<font-awesome-icon
						icon="book-open"
						:class="{ expanded: showPdf(i, 'en') }"
					></font-awesome-icon>
				</div>
				<img
					:src="
						require(`../assets/images/explainer-${i + 1}.${
							doc.png ? 'png' : 'jpg'
						}`)
					"
				/>
				<div
					class="title mandarin"
					:class="{ clickable: doc.cnTitle }"
					@click="togglePdf(i, 'cn')"
				>
					<p v-if="doc.cnTitle" lang="zh-cn">{{ doc.cnTitle }}</p>
					<p v-else>TODO: Not available in Mandarin</p>
					<font-awesome-icon
						icon="book-open"
						:class="{ expanded: showPdf(i, 'cn') }"
						v-if="doc.cnTitle"
					></font-awesome-icon>
				</div>
			</div>
			<div class="pdf" v-show-slide="expandedIndex >= 0">
				<font-awesome-icon
					icon="times"
					class="close-icon"
					@click="togglePdf(expandedIndex, expandedLang)"
				></font-awesome-icon>
				<iframe
					:class="{ hidden: expandedIndex < 0 }"
					:src="require(`../assets/pdfs/${expandedPdf}.pdf`)"
				></iframe>
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
					enPdf: 'Investigating heatwaves in China under climate'
				},
				{
					enTitle:
						'Increasing flash floods in a drying climate: dual challenges facing Southwest China',
					enPdf:
						'Increasing flash floods in a drying climate dual challenges facing Southwest China No2',
					cnTitle:
						`Test of Mandarin version (actually it's the first one in English)!`,
					cnPdf: 'Investigating heatwaves in China under climate'
				}
			],
			expandedIndex: -1,
			expandedLang: 'en',
			expandedPdf: 'Investigating heatwaves in China under climate'
		}
	},
	methods: {
		showPanel(index) {
			return this.expandedIndex < 0 || this.expandedIndex == index
		},
		showPdf(index, lang) {
			return this.expandedIndex == index && this.expandedLang == lang
		},
		togglePdf(index, lang) {
			const pdf = this.pdfs[index][`${lang}Pdf`]
			if (this.expandedIndex == index && this.expandedLang == lang) {
				this.expandedIndex = -1
			} else if (pdf) {
				this.expandedPdf = pdf
				this.expandedIndex = index
				this.expandedLang = lang
			} else {
				this.expandedIndex = -1
			}
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
	border: 1px solid transparent;
	padding: 12px 64px 12px 32px;
	transition: background 0.2s ease-in-out;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
}
.button-panel.hidden {
	padding: 0;
}

.button-panel:nth-of-type(odd) {
	background: var(--primaryLightest);
}

.button-panel div,
.button-panel p {
	background: transparent;
}

.button-panel h2 {
	width: 4%;
	margin: 0;
}

.button-panel .title {
	width: 38%;
	display: flex;
	flex-direction: column;
}

.button-panel .title .fa-book-open {
	background: transparent;
	align-self: flex-end;
	margin-top: auto;
	font-size: 24px;
	transition: transform 0.2s linear;
}
.button-panel .title .fa-book-open.expanded {
	transform: rotate(180deg);
}

.button-panel .title:hover .fa-book-open path {
	color: var(--vpOrange);
}

.button-panel img {
	width: 20%;
	max-height: 130px;
	margin: 0 32px;
	object-fit: fill;
	align-self: flex-start;
}

.pdf {
	display: flex;
	flex-direction: column;
	background: var(--vpPeach);
	position: relative;
}

.pdf .fa-times {
	position: absolute;
	top: 12px;
	right: 32px;
	font-size: 32px;
	background: transparent;
	cursor: pointer;
}
.pdf .fa-times:hover path {
	color: var(--vpOrange);
}

iframe {
	width: 800px;
	min-height: 1114px;
	margin: 12px auto;
	border-color: var(--vpOrange);
	box-shadow: 5px 5px 5px var(--vpDark);
}
iframe.hidden {
	min-height: 0;
	margin: 0;
	border: none;
}

@media (max-width: 768px) {
	.button-panel {
		padding: 12px 32px;
	}
}
</style>
