<template>
	<div>
		<Banner class="banner-style" enTitle="Handbook"></Banner>
		<div class="about-page">
			<h2>About the handbook</h2>
			<hr />
			<p>
				Some description about the handbook.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
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
		</div>
		<div class="toggle-wrapper">
			<div class="toggles">
				<div class="page-toggles">
					<font-awesome-icon
						icon="backward"
						class="toggle-icon"
						@click="moveToIndex(0)"
						title="Go to first page"
					></font-awesome-icon>
					<font-awesome-icon
						icon="caret-left"
						class="toggle-icon"
						@click="moveToIndex(pageIndex - 1)"
						title="Go to previous page"
					></font-awesome-icon>
					<p>
						<span v-if="pageIndex == 0">
							Page {{ pageNumber }}
						</span>
						<span v-else>
							Pages {{ pageNumber }}/{{ pageNumber * 1 + 1 }}
						</span>
						of {{ pages.length * 2 - 1 }}
					</p>
					<font-awesome-icon
						icon="caret-right"
						class="toggle-icon"
						@click="moveToIndex(pageIndex + 1)"
						title="Go to next page"
					></font-awesome-icon>
					<font-awesome-icon
						icon="forward"
						class="toggle-icon"
						@click="moveToIndex(pages.length - 1)"
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
								@click.stop="moveToIndex(section.index)"
							>
								{{ section.name }}
							</li>
						</ul>
					</div>
				</div>
				<div class="other-toggles">
					<a
						class="download"
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
					<font-awesome-icon
						icon="search-minus"
						class="toggle-icon boxed"
						:disabled="zoomIndex <= 0"
						@click="
							zoomIndex <= 0
								? (zoomIndex = 0)
								: (zoomIndex = zoomIndex - 1)
						"
						title="Zoom out"
					></font-awesome-icon>
					<p>{{ Math.round(zoomLevels[zoomIndex] * 100) }}%</p>
					<font-awesome-icon
						icon="search-plus"
						class="toggle-icon boxed"
						:disabled="zoomIndex >= zoomLevels.length - 1"
						@click="
							zoomIndex >= zoomLevels.length - 1
								? (zoomIndex = zoomLevels.length - 1)
								: (zoomIndex = zoomIndex + 1)
						"
						title="Zoom in"
					></font-awesome-icon>
					<font-awesome-icon
						:icon="!fullWidth ? 'arrows-alt-h' : 'arrows-alt-v'"
						class="toggle-icon boxed"
						@click="fullWidth = !fullWidth"
						:title="
							!fullWidth ? 'Make full width' : 'Make full height'
						"
					></font-awesome-icon>
				</div>
			</div>
		</div>
		<div class="slider-wrapper">
			<div class="shadow left-shadow"></div>
			<div class="shadow right-shadow"></div>
			<slider
				v-model="pageIndex"
				class="slider"
				:class="{ zoomed: zoomIndex > 0 }"
				animation="normal"
				:autoplay="false"
				nextBtnLabel="Next page"
				prevBtnLabel="Previous page"
				@change="changedToPage"
			>
				<slider-item v-for="(page, i) in pages" :key="i">
					<img :src="page" :alt="`Handbook page ${i + 1}`" />
				</slider-item>
			</slider>
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
			pages: [],
			sections: [
				{ name: 'Introduction by the MetOffice', index: 4 },
				{ name: 'Using the Handbook', index: 5 },
				{ name: 'Explainers', index: 17 },
				{ name: 'Infographics', index: 25 },
				{ name: 'Demonstrators', index: 27 },
				{ name: 'Briefing notes', index: 28 }
			],
			pageIndex: 0,
			pageNumber: 1,
			showContents: false,
			fullWidth: false,
			zoomIndex: 0,
			zoomLevels: [1.0, 1.1, 1.2, 1.33, 1.5, 1.7, 2.0, 2.4, 3.0, 4.0],
			sliderObject: null,
			narrowPage: false
		}
	},
	watch: {
		fullWidth() {
			this.resized()
		},
		pageIndex() {
			this.pageNumber = this.pageIndex ? this.pageIndex * 2 : 1
		},
		pageNumber() {
			this.moveToIndex(Math.floor(this.pageNumber / 2))
		},
		zoomIndex() {
			const width = document.documentElement.style.getPropertyValue(
				'--handbookWidth'
			)
			document.documentElement.style.setProperty(
				'--handbookScale',
				`${(parseInt(width) / 1024) * this.zoomLevels[this.zoomIndex]}`
			)
		}
	},
	methods: {
		moveToIndex(index) {
			if (index >= 0 && index < this.pages.length) {
				this.pageIndex = index
				this.showContents = false
			}
		},
		changedToPage(index) {
			const shadow = document.getElementsByClassName('shadow')
			const buttons = document.getElementsByClassName('slider-btn')
			if (shadow.length < 2 || buttons.length < 2) return // just in case!
			if (index == 0) {
				shadow[0].classList.add('hidden')
				shadow[1].classList.remove('hidden')
				buttons[0].classList.add('transparent')
				buttons[1].classList.remove('transparent')
			} else if (index == this.pages.length - 1) {
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
		resized() {
			// default size is 1024 x 724 (landscape 2-page spread)
			const ratio = 1024 / 724
			let width
			let height
			if (this.fullWidth) {
				width = Math.min(parseInt(window.innerWidth) - 32, 2 * 1024)
				height = width / ratio
			} else {
				width = Math.min(parseInt(window.innerWidth) - 8, 1024)
				height = Math.min(parseInt(window.innerHeight) - 16, 724)
				if (width / height != ratio) {
					width = height * ratio
				}
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
				`${(width / 1024) * this.zoomLevels[this.zoomIndex]}`
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
		// load pages
		for (let i = 1; i < 34; i++) {
			this.pages.push(
				require(`../assets/images/DRAFT_06_VP Handbook_SS Feb 221024_${i}.jpg`)
			)
		}
		this.changedToPage(this.pageIndex) // remove left-shadow if on first page
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

a.download,
.fa-download {
	background: transparent;
}
.fa-download path {
	color: var(--whiteDefault);
}

.toggle-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
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
.toggles * {
	background: transparent;
	color: var(--whiteDisabled);
}

.toggle-icon {
	box-sizing: content-box;
	width: 24px;
	height: 24px;
	padding: 4px;
	margin: 0 4px;
	background: transparent;
}
.toggle-icon path {
	color: var(--whiteDisabled);
}
.toggle-icon.boxed {
	border: 1px solid var(--whiteDisabled);
	width: 18px;
	height: 18px;
}
.toggle-icon:not([disabled]) {
	cursor: pointer;
}
.toggle-icon:not([disabled]):hover path {
	color: var(--whiteHover);
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

.contents-selector {
	position: relative;
}
ul.contents-list {
	position: absolute;
	margin: 0 8px;
	top: 30px;
	left: -18px;
	width: max-content;
	z-index: 100;
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

.slider-wrapper,
.slider {
	width: var(--handbookWidth) !important;
	height: var(--handbookHeight) !important;
}

/*.slider-wrapper.sides,
.slider.sides {
	height: calc(var(--handbookWidth) * 1024 / 724) !important;
}*/

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

.slider >>> .slider-item {
	background: var(--bannerGrey);
}

.slider >>> .slider-item img {
	transform: scale(var(--handbookScale));
	transform-origin: left top;
}

/*.slider.sides >>> .slider-item img {
	transform: scale(calc(var(--handbookScale) * 2));
}
.slider.sides >>> .slider-item:nth-of-type(odd) img {
	transform: scale(calc(var(--handbookScale) * 2)) translateX(calc(var(--handbookWidth) / -2));
}*/

/* cover page will be formatted portrait so this is needed to correct that */
/* TODO back page (if single page) will also be formatted portrait so similar is needed to correct that too */
.slider >>> .slider-item:first-of-type img {
	width: var(--handbookWidth);
	height: var(--handbookHeight);
	transform: scaleX(0.5);
	transform-origin: right top;
}
/*.slider.sides >>> .slider-item:first-of-type img {
	transform: scaleX(1) scaleY(2);
}*/

.slider >>> .slider-btn.transparent {
	background: transparent;
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
}

.slider >>> .slider-indicators {
	bottom: -2px;
	width: 100%;
	background: transparent;
	text-align: center;
}

.slider >>> .slider-indicator-icon:hover {
	background: var(--vpPeach);
}

.slider >>> .slider-indicator-active {
	background: var(--vpOrange);
}

/* following is to style and give space for scroll bars */
.slider.zoomed >>> .slider-item {
	scrollbar-color: var(--vpOrange) var(--vpPeach);
	scrollbar-width: revert;
	scrollbar-arrow-color: transparent;
	overflow: scroll;
}
.slider.zoomed >>> .slider-btn {
	height: calc(100% - 16px);
}
.slider.zoomed >>> .slider-btn-right {
	right: 16px;
}
.slider.zoomed >>> .slider-indicators {
	width: calc(100% - 26px);
	bottom: 16px;
}

@media (max-width: 784px) {
	.toggle-wrapper,
	.slider-wrapper {
		display: none;
	}
	.about-page {
		display: flex;
		flex-direction: column;
	}
	.about-page a {
		align-self: center;
	}
	.about-page a button {
		padding: 32px;
	}
}
</style>
