<template>
	<div id="handbook">
		<Banner class="banner-style" enTitle="Handbook" cnTitle="手册"></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					Browse here for an overview and highlights of the CSSP China
					project – available in Chinese and English. A collection of
					expert interviews alongside succinct summaries of the
					climate science and examples of the climate services. Find
					out more about the work that has been produced
					collaboratively over several years by hundreds of
					researchers in China and the UK.
				</p>
				<p lang="zh-cn">
					浏览关于气候科学支持服务伙伴关系(CSSP)计划中国项目的概述和项目亮点（内含有中英文两个版本）。该手册包括一系列专家访谈，对气候科学的总结和与气候服务相关的例子。您可以通过下载手册来更好了解中英数百名研究人员在过去几年间共同合作的项目成果。
				</p>
			</div>
			<div class="download-buttons">
				<div class="button-pairs">
					<button disabled>
						<font-awesome-icon icon="download"></font-awesome-icon>
						Download the handbook
					</button>
					<a
						class="download"
						:href="
							require('../assets/pdfs/handbook-en-webversion-opt.pdf')
						"
						download="VIEWpoint-Handbook-en.pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button>PDF</button>
					</a>
					<a
						class="download"
						:href="require('../assets/pdfs/handbook-en.epub')"
						download="VIEWpoint-Handbook-en.epub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button>ePUB</button>
					</a>
				</div>
				<div class="button-pairs">
					<button disabled>
						<font-awesome-icon icon="download"></font-awesome-icon
						>&nbsp; 下载手册
					</button>
					<a
						class="download"
						:href="
							require('../assets/pdfs/handbook-cn-webversion-opt.pdf')
						"
						download="VIEWpoint-Handbook-cn.pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button lang="zh-cn">PDF</button>
					</a>
					<a
						class="download"
						:href="require('../assets/pdfs/handbook-cn.epub')"
						download="VIEWpoint-Handbook-cn.epub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button lang="zh-cn">ePUB</button>
					</a>
				</div>
			</div>
		</div>
		<div class="toggle-wrapper">
			<div class="toggles">
				<div class="page-toggles">
					<font-awesome-icon
						icon="backward"
						class="toggle-icon"
						:disabled="onFirstPage"
						@click="moveToIndex('first')"
						title="Go to first page"
					></font-awesome-icon>
					<font-awesome-icon
						icon="caret-left"
						class="toggle-icon"
						:disabled="onFirstPage"
						@click="moveToIndex('prev')"
						title="Go to previous page"
					></font-awesome-icon>
					<p>{{ pageNumber }}</p>
					<font-awesome-icon
						icon="caret-right"
						class="toggle-icon"
						:disabled="onLastPage"
						@click="moveToIndex('next')"
						title="Go to next page"
					></font-awesome-icon>
					<font-awesome-icon
						icon="forward"
						class="toggle-icon"
						:disabled="onLastPage"
						@click="moveToIndex('last')"
						title="Go to last page"
					></font-awesome-icon>
					<div class="contents-selector" v-if="sections.length">
						<font-awesome-icon
							icon="list-alt"
							class="toggle-icon"
							@click="showContents = !showContents"
							title="Contents"
						></font-awesome-icon>
						<ul
							class="contents-list"
							:class="{ 'show-contents': showContents }"
							v-show-slide="showContents"
						>
							<li
								v-for="(section, i) in sections"
								:key="`section-${i}`"
								class="nav-item"
								@click.stop="moveToIndex(section[showMode] - 1)"
							>
								{{ section.name }}
							</li>
						</ul>
					</div>
				</div>
				<div class="other-toggles">
					<img
						class="flag"
						src="../assets/images/en-flag.png"
						@click="language = 'en'"
						v-if="language == 'cn'"
					/>
					<img
						class="flag"
						src="../assets/images/cn-flag.png"
						@click="language = 'cn'"
						v-else
					/>
					<a
						class="download"
						:href="
							require(`../assets/pdfs/handbook-${language}-webversion-opt.pdf`)
						"
						:download="`VIEWpoint-handbook-${language}.pdf`"
						target="_blank"
						rel="noopener noreferrer"
						title="Download the PDF"
					>
						<font-awesome-icon
							icon="download"
							class="toggle-icon"
						></font-awesome-icon>
					</a>
					<font-awesome-layers
						class="toggle-icon"
						@click="changeMode"
						:title="
							`${
								showMode == 'sides'
									? 'Show as two page spreads'
									: 'Show as individual pages'
							}`
						"
						v-if="!narrowPage"
					>
						<font-awesome-icon
							icon="book-open"
							class="toggle-icon"
						></font-awesome-icon>
						<font-awesome-icon
							icon="slash"
							v-show="showMode == 'spreads'"
						></font-awesome-icon>
					</font-awesome-layers>
					<font-awesome-icon
						:icon="!fullWidth ? 'arrows-alt-h' : 'arrows-alt-v'"
						class="toggle-icon boxed"
						@click="fullWidth = !fullWidth"
						:title="
							!fullWidth ? 'Make full width' : 'Make full height'
						"
						v-if="!narrowPage"
					></font-awesome-icon>
				</div>
			</div>
		</div>
		<div class="slider-wrapper">
			<div class="shadow left-shadow" :class="showMode"></div>
			<div class="shadow right-shadow" :class="showMode"></div>
			<slider
				v-model="sideIndex"
				class="slider sides"
				animation="normal"
				:autoplay="false"
				nextBtnLabel="Next page"
				prevBtnLabel="Previous page"
				@change="changedToPage"
				:key="`sides-${renderKey}`"
				v-if="showMode == 'sides'"
			>
				<slider-item v-for="(file, i) in sides" :key="i">
					<img :src="file" :alt="`Handbook side ${i + 1}`" />
				</slider-item>
			</slider>
			<slider
				v-model="spreadIndex"
				class="slider"
				animation="normal"
				:autoplay="false"
				nextBtnLabel="Next page"
				prevBtnLabel="Previous page"
				@change="changedToPage"
				:key="`spreads-${renderKey}`"
				v-else
			>
				<slider-item v-for="(file, i) in spreads" :key="i">
					<img :src="file" :alt="`Handbook spread ${i + 1}`" />
				</slider-item>
			</slider>
			<div class="center-fold" v-if="showMode == 'xspreads'"></div>
		</div>
		<div class="narrow-page">
			<img :src="sides[0]" class="cover-page " />
		</div>
	</div>
</template>

<script>
import Banner from './Banner.vue'
import { Slider, SliderItem } from 'vue-easy-slider'

const SPREADWIDTH = 1191
const PAGEHEIGHT = 842

export default {
	name: 'Handbook',
	components: {
		Banner,
		Slider,
		SliderItem
	},
	data() {
		return {
			language: 'en',
			spreads: [],
			sides: [],
			showMode: 'spreads',
			// define these once handbook is finalised
			sections: [],
			// sideIndex and spreadIndex needed to try to stop
			// multiple pages becoming visible at the same time
			sideIndex: 0,
			spreadIndex: 0,
			showContents: false,
			fullWidth: false,
			narrowPage: false,
			renderKey: 1
		}
	},
	computed: {
		pageNumber() {
			let noLabel = this.narrowPage || this.language == 'cn'
			if (!noLabel) {
				const toggles = document.getElementsByClassName('toggles')
				if (
					toggles.length > 0 &&
					toggles[0].getBoundingClientRect().width < 460
				) {
					noLabel = true
				}
			}
			let suffix = noLabel ? '/' : ' of '
			suffix += this.sides.length
			if (this.showMode == 'sides') {
				return `${noLabel ? '' : 'Page '}${this.sideIndex + 1}${suffix}`
			} else if (this.spreadIndex == 0) {
				return `${noLabel ? '' : 'Page '}1${suffix}`
			} else if (this.spreadIndex == this.spreads.length - 1) {
				return `${noLabel ? '' : 'Page '}${this.sides.length}${suffix}`
			} else {
				return `${noLabel ? '' : 'Pages '}${this.spreadIndex * 2}${
					noLabel ? '-' : '/'
				}${this.spreadIndex * 2 + 1}${suffix}`
			}
		}
	},
	watch: {
		language() {
			this.loadSpreads()
			if (this.showMode == 'sides') {
				this.sideIndex = Math.min(this.sideIndex, this.sides.length - 1)
			} else {
				this.spreadIndex = Math.min(
					this.spreadIndex,
					this.spreads.length - 1
				)
			}
		},
		fullWidth() {
			this.resized()
		},
		sideIndex() {
			this.checkPages()
		},
		spreadIndex() {
			this.checkPages()
		}
	},
	methods: {
		checkPages() {
			// frustratingly more than one slider-item can become visible at the same time
			// probably relating to toggling between spreads and sides
			// having the renderKey may have resolved this but keep this here just in case!
			let index =
				this.showMode == 'sides' ? this.sideIndex : this.spreadIndex
			this.$nextTick(() => {
				const items = document.getElementsByClassName('slider-item')
				let visible = []
				for (let i = 0; i < items.length; i++) {
					if (items[i].style.display !== 'none') visible.push(i)
				}
				if (visible.length > 1) {
					console.info(this.showMode, 'visible pages', visible)
					visible = []
					for (let i = 0; i < items.length; i++) {
						if (items[i].style.display !== 'none') {
							if (i != index) {
								items[i].style.display = 'none'
							} else {
								items[i].style.display = ''
								visible.push(i)
							}
						}
					}
				}
			})
		},
		changeMode() {
			if (this.showMode == 'sides') {
				// will become two-page spreads so update index
				this.spreadIndex = !this.sideIndex
					? 0
					: Math.ceil(this.sideIndex / 2)
				this.showMode = 'spreads'
			} else {
				// will become single sides so update index
				this.sideIndex = !this.spreadIndex
					? 0
					: this.spreadIndex * 2 - 1
				this.showMode = 'sides'
			}
			// force rerender to ensure only the required page is visible!
			this.renderKey += 1
			// force rescaling
			this.resized()
			// and check the shadows!
			this.changedToPage(
				this.showMode == 'sides' ? this.sideIndex : this.spreadIndex
			)
		},
		onFirstPage() {
			if (this.showMode == 'sides') {
				return this.sideIndex == 0
			} else {
				return this.spreadIndex == 0
			}
		},
		onLastPage() {
			if (this.showMode == 'sides') {
				return this.sideIndex == this.sides.length - 1
			} else {
				return this.spreadIndex == this.spreads.length - 1
			}
		},
		moveToIndex(index) {
			if (typeof index == 'number') {
				if (this.showMode == 'sides') {
					if (index >= 0 && index < this.sides.length - 1) {
						this.sideIndex = index
					}
				} else {
					if (index >= 0 && index < this.spreads.length - 1) {
						this.spreadIndex = index
					}
				}
			} else {
				if (this.showMode == 'sides') {
					if (index == 'first') {
						this.sideIndex = 0
					} else if (index == 'prev' && this.sideIndex > 0) {
						this.sideIndex = this.sideIndex - 1
					} else if (
						index == 'next' &&
						this.sideIndex < this.sides.length - 1
					) {
						this.sideIndex = this.sideIndex + 1
					} else if (index == 'last') {
						this.sideIndex = this.sides.length - 1
					}
				} else {
					if (index == 'first') {
						this.spreadIndex = 0
					} else if (index == 'prev' && this.spreadIndex > 0) {
						this.spreadIndex = this.spreadIndex - 1
					} else if (
						index == 'next' &&
						this.spreadIndex < this.spreads.length - 1
					) {
						this.spreadIndex = this.spreadIndex + 1
					} else if (index == 'last') {
						this.spreadIndex = this.spreads.length - 1
					}
				}
			}
			this.showContents = false
		},
		changedToPage(index) {
			const shadow = document.getElementsByClassName('shadow')
			const buttons = document.getElementsByClassName('slider-btn')
			if (shadow.length < 2 || buttons.length < 2) return // just in case!
			const lastIndex =
				this.showMode == 'sides'
					? this.sides.length - 1
					: this.spreads.length - 1
			if (index == 0 || (this.showMode == 'sides' && index % 2 == 0)) {
				// first page or even pages in single page view only needs shadow on right side
				shadow[0].classList.add('hidden')
				shadow[1].classList.remove('hidden')
				buttons[0].classList.add('transparent')
				buttons[1].classList.remove('transparent')
			} else if (
				index == lastIndex ||
				(this.showMode == 'sides' && index % 2 == 1)
			) {
				// last page or odd pages in single page view only needs shadow on left side
				shadow[0].classList.remove('hidden')
				shadow[1].classList.add('hidden')
				buttons[0].classList.remove('transparent')
				buttons[1].classList.add('transparent')
			} else {
				shadow[0].classList.remove('hidden')
				shadow[1].classList.remove('hidden')
				buttons[0].classList.remove('transparent')
				buttons[1].classList.remove('transparent')
			}
		},
		loadSpreads() {
			this.spreads = []
			this.sides = []
			this.sections = []
			if (this.language == 'en') {
				for (let i = 1; i < 36; i++) {
					this.spreads.push(
						require(`../assets/images/MASTER_ENG_VP_Handbook_Web${i}.jpg`)
					)
					this.sides.push(
						require(`../assets/images/MASTER_ENG_VP_Handbook_Web${i}.jpg`)
					)
					if (i > 1 && i < 35) {
						this.sides.push(
							require(`../assets/images/MASTER_ENG_VP_Handbook_Web${i}.jpg`)
						)
					}
				}
				// note these are real page numbers, not array index references
				// (so, for ease of moveToIndex, spreads are real too)
				this.sections = [
					{ name: 'Foreword', spreads: 3, sides: 4 },
					{ name: 'Welcome', spreads: 4, sides: 7 },
					{
						name: 'Using the VIEWpoint handbook',
						spreads: 7,
						sides: 12
					},
					{ name: 'CSSP China themes', spreads: 7, sides: 13 },
					{ name: 'The CSSP China Project', spreads: 8, sides: 14 },
					{
						name: 'Catalogue of published papers',
						spreads: 8,
						sides: 15
					},
					{ name: 'Food security', spreads: 9, sides: 16 },
					{ name: 'Historic data rescue', spreads: 10, sides: 19 },
					{
						name: 'Yangtze River Basin seasonal forecasts',
						spreads: 11,
						sides: 21
					},
					{
						name: 'Seasonal forecasting of tropical cyclones',
						spreads: 13,
						sides: 24
					},
					{
						name:
							'Implications of climate change for tea production',
						spreads: 14,
						sides: 26
					},
					{ name: 'Attribution workshops', spreads: 15, sides: 28 },
					{
						name: 'Untangling the natural from the man-made',
						spreads: 16,
						sides: 31
					},
					{
						name: 'Climate risk assessment of infrastructure',
						spreads: 17,
						sides: 32
					},
					{ name: 'Explainers', spreads: 18, sides: 34 },
					{
						name: 'Working together – photo album',
						spreads: 25,
						sides: 49
					},
					{ name: 'Infographics', spreads: 26, sides: 50 },
					{ name: 'VIEWpoint demonstrators', spreads: 28, sides: 55 },
					{ name: 'Briefing Notes', spreads: 29, sides: 56 },
					{
						name: 'Guide to climate science terminology',
						spreads: 34,
						sides: 66
					}
				]
			} else {
				for (let i = 1; i < 36; i++) {
					this.spreads.push(
						require(`../assets/images/MASTER_CHN_VP_Handbook_Web${i}.jpg`)
					)
					this.sides.push(
						require(`../assets/images/MASTER_CHN_VP_Handbook_Web${i}.jpg`)
					)
					if (i > 1 && i < 35) {
						this.sides.push(
							require(`../assets/images/MASTER_CHN_VP_Handbook_Web${i}.jpg`)
						)
					}
				}
				this.sections = [
					{
						name: '英国驻中华人民共和国大使致辞',
						spreads: 3,
						sides: 4
					},
					{ name: '欢迎', spreads: 4, sides: 7 },
					{ name: '新观点手册的使用', spreads: 7, sides: 12 },
					{ name: '项目的话题', spreads: 7, sides: 13 },
					{
						name: '气候科学支持服务伙伴关系（CSSP）计划',
						spreads: 8,
						sides: 14
					},
					{ name: '发表论文目录', spreads: 8, sides: 15 },
					{ name: '粮食安全', spreads: 9, sides: 16 },
					{ name: '恢复历史数据', spreads: 10, sides: 19 },
					{
						name: '长江流域的季节性预测服务',
						spreads: 11,
						sides: 21
					},
					{ name: '热带气旋的季节性预报', spreads: 13, sides: 24 },
					{
						name: '气候变化对茶叶生产的影响:挑战与机遇',
						spreads: 14,
						sides: 26
					},
					{ name: '归因研讨会', spreads: 15, sides: 28 },
					{ name: '厘清自然与人为因素', spreads: 16, sides: 31 },
					{ name: '基础设施的气候风险评估', spreads: 17, sides: 32 },
					{ name: '合作解说', spreads: 18, sides: 34 },
					{
						name: '相册展示：项目人员齐心协力',
						spreads: 25,
						sides: 49
					},
					{ name: '信息图', spreads: 26, sides: 50 },
					{ name: '新观点演示工具', spreads: 28, sides: 55 },
					{ name: '简报', spreads: 29, sides: 56 },
					{ name: '气候科学术语指南', spreads: 34, sides: 66 }
				]
			}
		},
		resized() {
			let testHeight = PAGEHEIGHT + 32
			let testWidth = SPREADWIDTH + 32
			if (window.matchMedia(`(max-width: ${testHeight}px)`).matches) {
				// less than PAGEHEIGHTpx + 16px either side is narrow
				if (!this.narrowPage) {
					// when first becames too narrow, change to fullwidth single page view
					this.narrowPage = true
					this.showMode = 'sides'
					this.fullWidth = true // TODO use this to hide buttons?
					this.changedWidth = 0
				}
			} else if (
				!window.matchMedia(`(max-width: ${testWidth}px)`).matches
			) {
				// more than SPREADWIDTHpx + 16px either side is wide
				if (this.narrowPage) {
					// when first no longer narrow, change to two page spreads and normal width view
					this.narrowPage = false
					this.showMode = 'spreads'
					this.fullWidth = false
					this.changedWidth = 0
				}
			} else if (this.narrowPage) {
				// when first no longer narrow (more than PAGEHEIGHTpx + 16px and less
				// than SPREADWIDTH + 16px),just change flag without changing view
				this.narrowPage = false
				this.changedWidth = 0
			}
			// default size of .jpg is SPREADWIDTH x PAGEHEIGHT (landscape 2-page spread)
			const ratio =
				(SPREADWIDTH * (this.showMode == 'sides' ? 0.5 : 1)) /
				PAGEHEIGHT
			let width
			let height
			if (this.fullWidth) {
				// width is available browser width less 16px either side
				// (limited to the system maximum of var(--widthLimit))
				width = Math.min(parseInt(window.innerWidth) - 32, 1358)
				height = width / ratio
			} else {
				// height is available browser height less 8px top and bottom
				// (limited to the maximum that would yield a width of var(--widthLimit))
				height = Math.min(
					parseInt(window.innerHeight) - 16,
					1358 / ratio
				)
				width = height * ratio
			}
			document.documentElement.style.setProperty(
				'--handbookWidth',
				`${width}px`
			)
			document.documentElement.style.setProperty(
				'--handbookHeight',
				`${height}px`
			)
			document.documentElement.style.setProperty(
				'--handbookScale',
				`${width /
					(SPREADWIDTH * (this.showMode == 'sides' ? 0.5 : 1))}`
			)
			let skew = width < 1180 ? 2 : 1
			document.documentElement.style.setProperty(
				'--leftShadowSkew',
				`-${skew}deg`
			)
			document.documentElement.style.setProperty(
				'--rightShadowSkew',
				`${skew}deg`
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
		// load page images for the language
		this.loadSpreads()
		// force removal of left-shadow if index is on first page
		if (this.showMode == 'sides') {
			this.changedToPage(this.sideIndex)
		} else {
			this.changedToPage(this.spreadIndex)
		}
		// ... before the usual mounted() functionality
		this.$el.parentElement.scrollIntoView(true)
		this.resized() /* reset size-based CSS vars immediately on loading */
		window.addEventListener('resize', this.resized)
		window.addEventListener('orientationchange', this.resized)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resized)
		window.removeEventListener('orientationchange', this.resized)
	}
}
</script>

<style scoped>
#handbook {
	min-height: var(--minContentHeight);
}

.banner-style {
	background-image: url('../assets/images/resources-banner.jpg');
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.8);
}

.download-buttons {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
}

a.download,
.fa-download {
	background: transparent;
}
.fa-download path {
	color: var(--whiteDefault);
}

.download-buttons .button-pairs {
	max-width: 48%;
	display: flex;
	flex-direction: row;
}
.download-buttons .button-pairs:first-of-type {
	margin-right: 2px;
}
.download-buttons .button-pairs:last-of-type {
	margin-left: 2px;
}
.download-buttons a {
	margin: 0 1px;
}
.download-buttons button {
	height: 100%;
}
.download-buttons button:not([disabled]) {
	font-size: 0.9rem;
}

.toggle-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 16px;
}

.toggles {
	width: var(--handbookWidth);
	height: 36px;
	margin: 0 auto;
	background: var(--vpDark);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.toggle-icon {
	box-sizing: content-box;
	width: 24px;
	height: 24px;
	padding: 4px;
	margin: 0 4px;
	background: transparent;
}
.toggle-icon:not([disabled]) {
	cursor: pointer;
}
.toggle-icon path {
	color: var(--whiteDisabled);
}
@media (hover: hover) {
	.toggle-icon:not([disabled]):hover path {
		color: var(--whiteHover);
	}
}
.toggle-icon.boxed {
	border: 1px solid var(--whiteDisabled);
	width: 18px;
	height: 18px;
}
@media (hover: hover) {
	.toggle-icon:not([disabled]):hover {
		border-color: var(--whiteHover);
	}
}

.page-toggles {
	margin-left: 16px;
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.page-toggles * {
	background: transparent;
	color: var(--whiteDisabled);
}
.page-toggles .toggle-icon {
	margin: 0 2px;
}
.page-toggles .toggle-icon.fa-caret-left {
	margin: 0 0 0 -8px;
}
.page-toggles .toggle-icon.fa-caret-right {
	margin: 0 -8px 0 0;
}

.contents-selector {
	position: relative;
}
ul.contents-list {
	position: absolute;
	margin: 0 8px;
	top: 30px;
	left: -18px;
	width: max-content;
	z-index: 1001; /* slider buttons are at 999 */
	padding: 8px;
	background: var(--vpDark);
	display: flex;
	flex-direction: column;
	display: none;
}
ul.contents-list.show-contents {
	display: block;
}
.nav-item {
	list-style: none;
	margin-left: 0;
	padding: 2px 8px;
	color: var(--whiteDisabled);
	background: transparent;
	cursor: pointer;
}
@media (hover: hover) {
	.nav-item:hover {
		color: var(--whiteHover);
	}
}

.other-toggles {
	margin-right: 16px;
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.other-toggles img.flag {
	background: transparent;
	width: 38px;
	margin: 0 2px;
	clip-path: inset(15% 0 10% 0);
	transform: translateY(-1px);
	cursor: pointer;
}
@media (hover: hover) {
	.other-toggles img.flag:hover {
		background: var(--whiteHover);
	}
}

.fa-slash {
	background: transparent;
}
.fa-slash path {
	color: var(--vpDark) !important; /* even on hover */
}

.slider-wrapper,
.slider {
	width: var(--handbookWidth) !important;
	height: var(--handbookHeight) !important;
}

.slider-wrapper {
	margin: 0 auto 32px auto;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.1);
	position: relative;
}
.slider-wrapper .shadow {
	position: absolute;
	width: 40%;
	height: 10px;
	content: ' ';
	bottom: 7px;
	background: transparent;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.9);
}
.slider-wrapper .shadow.sides {
	width: 80%;
}
.slider-wrapper .left-shadow {
	left: 12px;
	transform: skew(var(--leftShadowSkew)) rotate(var(--leftShadowSkew));
}
.slider-wrapper .right-shadow {
	right: 12px;
	transform: skew(var(--rightShadowSkew)) rotate(var(--rightShadowSkew));
}
.slider-wrapper .shadow.hidden {
	visibility: hidden;
}
.slider-wrapper .center-fold {
	position: absolute;
	top: 0;
	left: 50%;
	width: 1px;
	background: rgba(0, 0, 0, 0.1);
	height: 100%;
	z-index: 100;
	box-shadow: 5px 0 5px rgba(0, 0, 0, 0.2), -5px 0 5px rgba(0, 0, 0, 0.2);
}

.slider >>> .slider-item {
	background: var(--bannerGrey);
}

/* spreads view */
.slider:not(.sides) >>> .slider-item img {
	transform: scale(var(--handbookScale));
	transform-origin: left top;
}
/* sides view */
.slider.sides >>> .slider-item:nth-of-type(even) img {
	clip-path: inset(0 50% 0 0);
	transform: scale(var(--handbookScale));
	transform-origin: left top;
}
.slider.sides >>> .slider-item:nth-of-type(odd) img {
	clip-path: inset(0 0 0 50%);
	transform: scale(var(--handbookScale)) translateX(-50%);
	transform-origin: left top;
}

/* cover and back pages will be formatted portrait so this is needed to correct that */
.slider >>> .slider-item:first-of-type img,
.slider >>> .slider-item:last-of-type img {
	width: var(--handbookWidth);
	height: var(--handbookHeight);
}
.slider:not(.sides) >>> .slider-item:first-of-type img,
.slider:not(.sides) >>> .slider-item:last-of-type img {
	/* since cover and back are only one page wide, this will correct that width problem */
	transform: scaleX(0.5);
}
.slider:not(.sides) >>> .slider-item:first-of-type img {
	/* and this will ensure the cover is on the right hand side */
	transform-origin: right top;
}
.slider.sides >>> .slider-item:first-of-type img,
.slider.sides >>> .slider-item:last-of-type img {
	clip-path: none; /* don't need to clip anything */
	transform: none;
}

.slider >>> .slider-indicators {
	background: transparent;
}
.slider.sides >>> .slider-indicators {
	display: none;
}

.slider >>> .slider-btn.transparent {
	background: transparent;
}
.slider >>> .slider-btn.transparent .slider-icon {
	opacity: 0.1;
}

@media (hover: hover) {
	.slider >>> .slider-btn:hover {
		background: var(--primaryLighter); /*rgba(0, 0, 0, 0.1);*/
		box-shadow: none;
	}
}

.slider >>> .slider-icon {
	background: transparent;
	border-color: var(--whiteDefault);
	border-width: 4px;
}
@media (hover: hover) {
	.slider >>> .slider-btn:hover .slider-icon {
		border-color: var(--vpOrange) !important;
		opacity: 1;
	}
}

.slider >>> .slider-indicators {
	bottom: -2px;
	width: 100%;
	text-align: center;
}

@media (hover: hover) {
	.slider >>> .slider-indicator-icon:hover {
		background: var(--vpPeach);
	}
}

.slider >>> .slider-indicator-active {
	background: var(--vpOrange);
}

.narrow-page {
	display: none;
}
.narrow-page img {
	height: 400px; /* this should define the width to stay in proportion */
	max-width: calc(100% - 16px);
	margin: 0 auto 8px auto;
}

@media (max-width: 1007px) {
	.toggle-wrapper {
		margin-top: 8px;
	}
	.page-toggles {
		margin-left: 8px;
	}
	.other-toggles {
		margin-right: 8px;
	}
}

@media (max-width: 640px) {
	.toggle-wrapper {
		margin-top: 4px;
	}
	.page-toggles {
		margin-left: 4px;
	}
	.other-toggles {
		margin-right: 4px;
	}
}

@media (max-width: 372px) {
	.about-page {
		display: flex;
		flex-direction: column;
	}
	.about-page a button {
		padding: 32px;
	}
	.toggle-wrapper,
	.slider-wrapper {
		display: none;
	}
	.narrow-page {
		display: flex;
	}
}
</style>
