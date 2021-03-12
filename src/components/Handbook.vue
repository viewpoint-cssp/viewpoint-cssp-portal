<template>
	<div>
		<Banner class="banner-style" enTitle="Handbook"></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					A collection of articles and highlights of several years of
					the CSSP China project, including interviews with
					world-leading scientists.
				</p>
				<p lang="zh-cn">TODO: Mandarin here?</p>
			</div>
			<div class="download-buttons">
				<a
					class="download"
					:href="
						require('../assets/pdfs/DRAFT_06_VP Handbook_SS Feb 22.pdf')
					"
					download="VIEWpoint-handbook.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button>
						<font-awesome-icon icon="download"></font-awesome-icon>
						Download the handbook
					</button>
				</a>
				<a
					class="download"
					:href="
						require('../assets/pdfs/DRAFT_06_VP Handbook_SS Feb 22.pdf')
					"
					download="VIEWpoint-handbook.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button>
						<font-awesome-icon icon="download"></font-awesome-icon>
						Download in Chinese
					</button>
				</a>
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
					<p>{{ pageNumber }} of {{ this.sides.length }}</p>
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
								@click.stop="moveToIndex(section[showMode])"
							>
								{{ section.name }}
							</li>
						</ul>
					</div>
				</div>
				<div class="other-toggles">
					<img
						src="../assets/images/en-flag.png"
						@click="language = 'en'"
					/>
					<img
						src="../assets/images/cn-flag.png"
						@click="language = 'cn'"
					/>
					<a
						class="download TODO"
						:href="
							require('../assets/pdfs/DRAFT_06_VP Handbook_SS Feb 22.pdf')
						"
						download="VIEWpoint-handbook.pdf"
						target="_blank"
						rel="noopener noreferrer"
						title="Download the handbook"
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
			// TODO define these once handbook is finalised
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
			if (this.showMode == 'sides') {
				return `${this.narrowPage ? '' : 'Page '}${this.sideIndex + 1}`
			} else if (this.spreadIndex == 0) {
				return `${this.narrowPage ? '' : 'Page '}1`
			} else {
				return `${this.narrowPage ? '' : 'Pages '}${this.spreadIndex *
					2}/${this.spreadIndex * 2 + 1}`
			}
		}
	},
	watch: {
		language() {
			this.loadSpreads()
			if (this.showMode == 'sides') {
				this.sideIndex = Math.min(this.sideIndex, this.sides.length - 1)
			} else {
				this.spreadIndex = Math.min(this.spreadIndex, this.spreads.length - 1)
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
					} else if (index == 'next' && this.sideIndex < this.sides.length - 1) {
						this.sideIndex = this.sideIndex + 1
					} else if (index == 'last') {
						this.sideIndex = this.sides.length - 1
					}
				} else {
					if (index == 'first') {
						this.spreadIndex = 0
					} else if (index == 'prev' && this.spreadIndex > 0) {
						this.spreadIndex = this.spreadIndex - 1
					} else if (index == 'next' && this.spreadIndex < this.spreads.length - 1) {
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
				// TODO finalise JPGs
				for (let i = 1; i < 34; i++) {
					this.spreads.push(
						require(`../assets/images/DRAFT_06_VP Handbook_SS Feb 221024_${i}.jpg`)
					)
					this.sides.push(
						require(`../assets/images/DRAFT_06_VP Handbook_SS Feb 221024_${i}.jpg`)
					)
					if (i > 1) {
						this.sides.push(
							require(`../assets/images/DRAFT_06_VP Handbook_SS Feb 221024_${i}.jpg`)
						)
					}
				}
				// TODO determine sections
				this.sections = [
					{
						name: 'Introduction by the MetOffice',
						spreads: 4,
						sides: 7
					},
					{ name: 'Using the Handbook', spreads: 5, sides: 9 },
					{ name: 'Explainers', spreads: 17, sides: 33 },
					{ name: 'Infographics', spreads: 25, sides: 49 },
					{ name: 'Demonstrators', spreads: 27, sides: 54 },
					{ name: 'Briefing notes', spreads: 28, sides: 55 }
				]
			} else {
				// TODO finalise for Chinese version (currently just the draft front cover)
				this.spreads.push(
					require(`../assets/images/DRAFT_06_VP Handbook_SS Feb 221024_1.jpg`)
				)
				this.sides.push(
					require(`../assets/images/DRAFT_06_VP Handbook_SS Feb 221024_1.jpg`)
				)
				// TODO don't forget the sections!
			}
		},
		resized() {
			if (window.matchMedia('(max-width: 756px)').matches) {
				// less than 724px + 16px either side is narrow
				if (!this.narrowPage) {
					// when first becames too narrow, change to fullwidth single page view
					this.narrowPage = true
					this.showMode = 'sides'
					this.fullWidth = true // TODO use this to hide buttons?
					this.changedWidth = 0
				}
			} else if (!window.matchMedia('(max-width: 1056px)').matches) {
				// more than 1024px + 16px either side is wide
				if (this.narrowPage) {
					// when first no longer narrow, change to two page spreads and normal width view
					this.narrowPage = false
					this.showMode = 'spreads'
					this.fullWidth = false
					this.changedWidth = 0
				}
			} else if (this.narrowPage) {
				// when first no longer narrow (more than 724px + 16px and less than 1024 + 16px),
				// just change flag without changing view
				this.narrowPage = false
				this.changedWidth = 0
			}
			// default size of .jpg is 1024 x 724 (landscape 2-page spread)
			const ratio = (this.showMode == 'sides' ? 512 : 1024) / 724
			let width
			let height
			if (this.fullWidth) {
				// width is available browser width less 16px either side
				// (limited to the system maximum of 1358px)
				width = Math.min(parseInt(window.innerWidth) - 32, 1358)
				height = width / ratio
			} else {
				// height is available browser height less 8px top and bottom
				// (limited to the maximum that would yield a width of 1358px)
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
				`${width / (this.showMode == 'sides' ? 512 : 1024)}`
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
.banner-style {
	background-image: url('../assets/images/handbook.jpg');
	background-position: bottom;
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

.download-buttons a:first-of-type {
	margin-right: 2px;
}
.download-buttons a:last-of-type {
	margin-left: 2px;
}

.download-buttons button {
	height: 100%;
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
.toggle-icon:not([disabled]):hover path {
	color: var(--whiteHover);
}
.toggle-icon.boxed {
	border: 1px solid var(--whiteDisabled);
	width: 18px;
	height: 18px;
}
.toggle-icon:not([disabled]):hover {
	border-color: var(--whiteHover);
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
	z-index: 101;
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
.nav-item:hover {
	color: var(--whiteHover);
}

.other-toggles {
	margin-right: 16px;
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.other-toggles img {
	background: transparent;
	width: 38px;
	margin: 0 2px;
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

/* cover page will be formatted portrait so this is needed to correct that */
/* TODO back page (if single page) will also be formatted portrait so similar is needed to correct that too */
.slider >>> .slider-item:first-of-type img {
	width: var(--handbookWidth);
	height: var(--handbookHeight);
}
.slider:not(.sides) >>> .slider-item:first-of-type img {
	/* since cover is only one page wide, this will correct that width problem */
	transform: scaleX(0.5);
	/* and this will ensure it's on the right hand side */
	transform-origin: right top;
}
.slider.sides >>> .slider-item:first-of-type img {
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

.slider >>> .slider-btn:hover {
	background: var(--primaryLighter); /*rgba(0, 0, 0, 0.1);*/
	box-shadow: none;
}

.slider >>> .slider-icon {
	background: transparent;
	border-color: var(--whiteDefault);
	border-width: 4px;
}
.slider >>> .slider-btn:hover .slider-icon {
	border-color: var(--vpOrange) !important;
	opacity: 1;
}

.slider >>> .slider-indicators {
	bottom: -2px;
	width: 100%;
	text-align: center;
}

.slider >>> .slider-indicator-icon:hover {
	background: var(--vpPeach);
}

.slider >>> .slider-indicator-active {
	background: var(--vpOrange);
}

.narrow-page {
	display: none;
}
.narrow-page img {
	width: 60vw;
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
