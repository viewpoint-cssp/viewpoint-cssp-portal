<template>
	<div id="infographics">
		<Banner
			class="banner-style"
			enTitle="Infographics"
			cnTitle="信息图表"
		></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					The Met Office have produced these high quality infographics
					as quick reference documents on important scientific topics
					for China. They are an easy way to find out a lot on the
					science in one place.
				</p>
				<p lang="zh-cn">
					英国气象局制作了这些高质量的信息图表，以作为一系列中国重要科学课题项目的快速参考文件。这些信息图表可以帮助读者轻松获取大量的科学信息。
				</p>
			</div>
		</div>
		<div class="wrapper">
			<div
				class="button-panel-wrapper"
				v-for="(doc, i) in pdfs"
				:key="i"
				:ref="`panel-${i}`"
			>
				<div class="button-panel" :class="{ alt: i % 2 == 0 }">
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
					<div class="img-wrapper" :class="{ double: doc.cnPdf }">
						<img
							class="button-img"
							:class="{
								'in-preview':
									preview.index == i && preview.lang == 'en'
							}"
							:src="
								require(`../assets/images/infographic-${i +
									1}.jpg`)
							"
							@click="setPreview(i, 'en')"
							v-if="
								!doc.cnPdf ||
									!narrowPage ||
									(narrowPage && language == 'en')
							"
						/>
						<img
							class="button-img"
							:class="{
								'in-preview':
									preview.index == i && preview.lang == 'cn'
							}"
							:src="
								require(`../assets/images/infographic-${i +
									1}-cn.jpg`)
							"
							@click="setPreview(i, 'cn')"
							v-if="
								doc.cnPdf &&
									(!narrowPage ||
										(narrowPage && language == 'cn'))
							"
						/>
					</div>
					<a
						class="title chinese clickable"
						:href="require(`../assets/pdfs/${doc.cnPdf}.pdf`)"
						:download="`VIEWpoint-${doc.cnPdf}.pdf`"
						target="_blank"
						rel="noopener noreferrer"
						v-if="doc.cnPdf"
					>
						<p class="draft" v-if="doc.cnDraft">Draft</p>
						<h3 v-if="doc.cnTitle" lang="zh-cn">
							{{ doc.cnTitle }}
						</h3>
						<p v-else>{{ doc.enTitle }} in Chinese</p>
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
						<p lang="zh-cn">
							暂无中文版
						</p>
					</div>
				</div>
				<div
					class="preview"
					:class="{ alt: i % 2 == 0 }"
					v-show-slide="preview.index == i"
					@slide-open-end="previewOpened"
					@slide-close-end="previewClosed"
				>
					<iframe
						:src="
							require(`../assets/pdfs/${
								preview.lang == 'cn' && doc.cnPdf
									? doc.cnPdf
									: doc.enPdf
							}.pdf`) + '#statusbar=1&toolbar=0'
						"
						v-if="previewMode == 'iframe'"
					>
						This browser does not support PDFs
					</iframe>
					<img
						:src="
							require(`../assets/images/infographic-${i +
								1}-cn.jpg`)
						"
						v-else-if="preview.lang == 'cn' && doc.cnPdf"
					/>
					<img
						:src="
							require(`../assets/images/infographic-${i + 1}.jpg`)
						"
						v-else-if="preview.lang == 'en'"
					/>
					<div class="preview-icons">
						<a
							class="clickable"
							:href="require(`../assets/pdfs/${doc.enPdf}.pdf`)"
							:download="`VIEWpoint-${doc.enPdf}.pdf`"
							target="_blank"
							rel="noopener noreferrer"
							v-if="preview.lang == 'en' && doc.enPdf"
						>
							<font-awesome-icon
								icon="download"
							></font-awesome-icon>
						</a>
						<a
							class="clickable"
							:href="require(`../assets/pdfs/${doc.cnPdf}.pdf`)"
							:download="`VIEWpoint-${doc.cnPdf}.pdf`"
							target="_blank"
							rel="noopener noreferrer"
							v-else-if="preview.lang == 'cn' && doc.cnPdf"
						>
							<font-awesome-icon
								icon="download"
							></font-awesome-icon>
						</a>
						<font-awesome-icon
							icon="times"
							class="close-icon clickable"
							@click="setPreview(-1)"
						></font-awesome-icon>
					</div>
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
					enPdf: 'I01-en-food-security',
					enTitle: 'Food security in CSSP China',
					cnPdf: 'I01-cn-food-security',
					cnTitle: '中英气候科学支持服务伙伴关系计划之粮食安全'
				},
				{
					enPdf: 'I02-en-urban',
					enTitle: 'Urban Climate Services in CSSP China',
					cnPdf: 'I02-cn-urban',
					cnTitle:
						'中英气候科学服务伙伴关系计划 (CSSP)之中国城市气候服务'
				},
				{
					enPdf: 'I03-en-air-quality',
					enTitle: 'Urban China Decadal Air Quality Service',
					cnPdf: 'I03-cn-air-quality',
					cnTitle: '中国城市十年空气质量服务'
				},
				{
					enPdf: 'I04-en-seasonal-forecast',
					enTitle:
						'Seasonal forecast service for the Yangtze River Basin',
					cnTitle: '长江流域的季节性预测服务'
				},
				{
					enPdf: 'I05-en-assessing-risk',
					enTitle: `Assessing China's risk to climate related extremes`,
					cnTitle: '评估与中国气候相关的极端事件的风险'
				}
			],
			previewMode: 'img', // can be set here to 'iframe' to use iframes for PDFs instead
			preview: {
				index: -1,
				lang: ''
			},
			closedIndex: -1,
			nextPreview: {
				index: -1,
				lang: ''
			},
			narrowPage: false,
			language: 'en'
		}
	},
	methods: {
		setPreview(index, lang) {
			if (
				index < 0 ||
				(this.preview.index == index && this.preview.lang == lang)
			) {
				// either clicked close icon in preview or the currently previewed thumbnail
				this.nextPreview.lang = ''
				this.nextPreview.index = -1 // will cause scroll in previewClosed to...
				this.closedIndex = this.preview.index // ... this .preview's .button-panel
				this.preview.index = -1 // close the current .preview (and fire previewClosed)
			} else if (this.preview.index < 0 || this.preview.index == index) {
				// nothing already open or the .preview is already open (in the other language)
				this.preview.lang = lang
				this.preview.index = index
			} else {
				this.nextPreview.lang = lang // previewClosed will use this to set next preview.lang...
				this.nextPreview.index = index // ... and preview.index
				this.preview.index = -1 // close the current .preview (and fire previewClosed)
			}
		},
		previewOpened() {
			// scroll to put this newly opened .preview into the viewport
			const previews = document.getElementsByClassName('preview')
			if (previews.length > this.preview.index) {
				if ('scrollBehavior' in document.documentElement.style) {
					window.scrollTo({
						top: previews[this.preview.index].offsetTop,
						behavior: 'smooth'
					})
				} else {
					previews[this.preview.index].scrollIntoView(true) // not smooth behaviour! :(
				}
			}
		},
		previewClosed() {
			// if there isn't another .preview just opened, scroll to put the
			// .button-panel for the closed preview back in the viewport
			if (this.closedIndex >= 0) {
				const panels = document.getElementsByClassName('button-panel')
				if (
					panels.length > this.closedIndex &&
					panels[this.closedIndex].getBoundingClientRect().top < 0
				) {
					if ('scrollBehavior' in document.documentElement.style) {
						window.scrollTo({
							top: panels[this.closedIndex].offsetTop,
							behavior: 'smooth'
						})
					} else {
						panels[this.closedIndex].scrollIntoView(true) // not smooth behaviour! :(
					}
				}
				this.closedIndex = -1 // don't do this again unless specifically set by setPreview
			}
			// if the next .preview has been set by setPreview, use it now
			if (this.nextPreview.index >= 0) {
				this.preview.lang = this.nextPreview.lang
				this.preview.index = this.nextPreview.index
			}
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
		},
		resized() {
			if (window.matchMedia('(max-width: 640px)').matches) {
				this.narrowPage = true
			} else {
				this.narrowPage = false
			}
			document.documentElement.style.setProperty(
				'--previewWidth',
				`${Math.min(window.innerWidth - 32, 720)}px`
			)
		}
	},
	mounted() {
		// change default language to Chinese if possible
		if (
			navigator &&
			navigator.language &&
			navigator.language.indexOf('CN') >= 0
		) {
			this.language = 'cn'
		}
		this.$el.parentElement.scrollIntoView(true)
		this.resized() /* reset size-based CSS vars immediately on loading */
		window.addEventListener('resize', this.resized)
		window.addEventListener('orientationchange', this.resized)
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			// this is only here because Chrome and Edge don't correctly refresh
			// :hover state as elements are moved under the cursor while scrolling
			document.addEventListener('scroll', this.scrollCursor)
			document.addEventListener('mousemove', this.pointerCursor)
		}
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resized)
		window.removeEventListener('orientationchange', this.resized)
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			document.removeEventListener('scroll', this.scrollCursor)
			document.removeEventListener('mousemove', this.pointerCursor)
		}
	}
}
</script>

<style scoped>
#infographics {
	min-height: var(--minContentHeight);
}

.banner-style {
	background-image: url('../assets/images/infographics-banner.jpg');
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.8);
}

.wrapper,
.button-panel-wrapper {
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

.button-panel.alt {
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
	width: 5%;
	max-width: 56px; /* 4%; */
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
	.button-panel a.title:hover .fa-download path,
	.preview a:hover .fa-download path {
		color: var(--vpOrange);
	}
}

a {
	text-decoration: none;
	outline: 0;
}

.button-panel .img-wrapper {
	width: 170px; /* wide enough for img width:120px plus left:50px for 2nd image */
	height: 170px;
	flex-shrink: 0;
	margin: 0 32px;
}
.button-panel .img-wrapper.double {
	height: 195px; /* tall enough for img height:170px plus top:25px for 2nd image */
	position: relative; /* for 2nd image */
}

.button-panel img {
	position: absolute;
	width: 120px;
	border: 2px solid transparent;
	cursor: zoom-in;
}
.button-panel img.in-preview {
	cursor: zoom-out;
	border-color: var(--vpOrange);
}
.button-panel img:nth-of-type(even) {
	left: 50px;
	top: 25px;
}
@media (hover: hover) {
	.button-panel img:hover {
		border-color: var(--vpOrange);
		box-shadow: 4px 4px 5px var(--primarySelected);
	}
}

.preview {
	border-top: 1px solid var(--primaryLightest);
	text-align: center;
	position: relative; /* for close-icon */
}
.preview.alt {
	background: var(--primaryLightest);
}

.preview-icons {
	position: absolute;
	top: 20px;
	right: 32px;
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 52px;
}
.preview-icons a,
.preview-icons .fa-download,
.close-icon {
	background: transparent;
	font-size: 24px;
}
.close-icon {
	font-size: 34px;
}
.close-icon path {
	color: var(--text);
}
@media (hover: hover) {
	.close-icon:hover path {
		color: var(--vpOrange);
	}
}

.preview iframe,
.preview img {
	width: var(--previewWidth);
	height: calc(
		var(--previewWidth) * 0.75 + 56px
	); /* ~half height + toolbar; Chrome toolbar is 56px others are less */
	margin: 16px;
}
.preview img {
	height: auto;
}

@media (max-width: 1007px) {
	.button-panel {
		padding: 12px 16px;
	}
	.button-panel .img-wrapper {
		margin: 0 16px;
	}
}

@media (max-width: 800px) {
	.button-panel .img-wrapper {
		width: 85px; /* wide enough for img width:60px plus left:25px for 2nd image */
		height: 85px;
	}
	.button-panel .img-wrapper.double {
		height: 97px; /* tall enough for img height:85px plus top:12px for 2nd image */
	}
	.button-panel img {
		width: 60px;
	}
	.button-panel img:nth-of-type(even) {
		left: 25px;
		top: 12px;
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
		cursor: default !important;
	}
	@media (hover: hover) {
		.button-panel img:hover {
			box-shadow: none;
		}
	}
	.button-panel img:nth-of-type(even) {
		display: none;
	}
}
</style>
