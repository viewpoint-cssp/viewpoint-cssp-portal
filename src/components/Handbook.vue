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
						:disabled="pageIndex == 0"
						@click="moveToIndex(0)"
						title="Go to first page"
					></font-awesome-icon>
					<font-awesome-icon
						icon="caret-left"
						class="toggle-icon"
						:disabled="pageIndex == 0"
						@click="moveToIndex(pageIndex - 1)"
						title="Go to previous page"
					></font-awesome-icon>
					<p>
						<span v-if="showMode == 'sides'">
							Page {{ pageIndex + 1 }}
						</span>
						<span v-else-if="pageIndex == 0">
							Page {{ pageNumber }}
						</span>
						<span v-else>
							Pages {{ pageNumber }}/{{ pageNumber * 1 + 1 }}
						</span>
						of 
						<span v-if="showMode == 'sides'">
							{{ sides.length }}
						</span>
						<span v-else>
							{{ spreads.length * 2 - 1 }}
						</span>
					</p>
					<font-awesome-icon
						icon="caret-right"
						class="toggle-icon"
						:disabled="pageIndex == pageCount - 1"
						@click="moveToIndex(pageIndex + 1)"
						title="Go to next page"
					></font-awesome-icon>
					<font-awesome-icon
						icon="forward"
						class="toggle-icon"
						:disabled="pageIndex == pageCount - 1"
						@click="moveToIndex(pageCount - 1)"
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
						<font-awesome-icon icon="download" class="toggle-icon"></font-awesome-icon>
					</a>
					<font-awesome-layers
						class="toggle-icon"
						:title="
							`${showMode == 'sides' ? 'Show as two page spreads' : 'Show as individual pages'}`
						"
						@click="changeMode"
					>
						<font-awesome-icon icon="book-open" class="toggle-icon"/>
						<font-awesome-icon
							icon="slash"
							v-show="showMode == 'spreads'"
						/>
					</font-awesome-layers>
					<font-awesome-icon
						:icon="!fullWidth ? 'arrows-alt-h' : 'arrows-alt-v'"
						class="toggle-icon boxed"
						@click="fullWidth = !fullWidth"
						:title="!fullWidth ? 'Make full width' : 'Make full height'"
					></font-awesome-icon>
				</div>
			</div>
		</div>
		<div class="slider-wrapper">
			<div class="shadow left-shadow"></div>
			<div class="shadow right-shadow"></div>
			<slider
				v-model="pageIndex"
				class="slider sides"
				animation="normal"
				:autoplay="false"
				nextBtnLabel="Next page"
				prevBtnLabel="Previous page"
				@change="changedToPage"
				v-if="showMode == 'sides'"
			>
				<slider-item v-for="(file, i) in sides" :key="i">
					<img :src="file" :alt="`Handbook side ${i + 1}`" />
				</slider-item>
			</slider>
			<slider
				v-model="pageIndex"
				class="slider"
				animation="normal"
				:autoplay="false"
				nextBtnLabel="Next page"
				prevBtnLabel="Previous page"
				@change="changedToPage"
				v-else
			>
				<slider-item v-for="(file, i) in spreads" :key="i">
					<img :src="file" :alt="`Handbook spread ${i + 1}`" />
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
			spreads: [],
			sides: [],
			showMode: 'spreads',
			nextIndex: 0,
			sections: [
				{ name: 'Introduction by the MetOffice', spreads: 4, sides: 7},
				{ name: 'Using the Handbook', spreads: 5, sides: 9 },
				{ name: 'Explainers', spreads: 17, sides: 33 },
				{ name: 'Infographics', spreads: 25, sides: 49 },
				{ name: 'Demonstrators', spreads: 27, sides: 54 },
				{ name: 'Briefing notes', spreads: 28, sides: 55 }
			],
			pageCount: 0,
			pageIndex: 0,
			pageNumber: 1,
			showContents: false,
			fullWidth: false,
			narrowPage: false
		}
	},
	watch: {
		fullWidth() {
			this.resized()
		},
		pageIndex() {
			if (this.showMode == 'sides') {
				this.pageNumber = this.pageIndex + 1
			} else {
				this.pageNumber = this.pageIndex ? this.pageIndex * 2 : 1
			}
			// somehow more than one slider-item can be visible
			// - this tries to fix it!
			this.$nextTick(() => {
				const items = document.getElementsByClassName('slider-item')
				let count = 0
				for (let i = 0; i < items.length; i++) {
					if (items[i].style.display != 'none') count += 1
				}
				if (count > 1) {
					alert('found ' + count + ' visible slider-item')
					console.warn('error', items.length, count)
					count = 0
					for (let i = 0; i < items.length; i++) {
						if (items[i].style.display != 'none') {
							if (i != this.pageIndex) {
								items[i].style.display = 'none'
							} else {
								items[i].style.display = ''
								count += 1
							}
						}
					}
					console.log('fixed', items.length, count)
				}
			})
		},
		/*pageNumber() {
			if (this.showMode == 'sides') {
				this.moveToIndex(this.pageNumber - 1)
			} else {
				this.moveToIndex(Math.floor(this.pageNumber / 2))
			}
		}*/
	},
	methods: {
		changeMode() {
			// determine the page to go to once the mode has changed
			let nextIndex = 0
			if (this.pageIndex > 0) {
				if (this.showMode == 'sides') {
					nextIndex = Math.ceil(this.pageIndex / 2)
				} else {
					nextIndex = this.pageIndex * 2 - 1
				}
			}
			// change the mode
			if (this.showMode == 'sides') {
				this.pageCount = this.spreads.length
				this.showMode = 'spreads'
			} else {
				this.pageCount = this.sides.length
				this.showMode = 'sides'
			}
			this.$nextTick(() => {
				// go to the right page
				if (nextIndex) {
					this.moveToIndex(nextIndex)
				}
			})
			// and force rescaling
			this.resized()
		},
		moveToIndex(index) {
			if (index >= 0 && index < this.pageCount) {
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
			} else if (index == this.pageCount - 1) {
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
				height = Math.min(parseInt(window.innerHeight) - 16, 1358 / ratio)
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
		// load pages
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
		this.pageCount = this.showMode == 'sides' ? this.sides.length : this.spreads.length
		this.changedToPage(this.pageIndex) // will remove left-shadow if on first page
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
	transform: scaleX(0.5); /* since cover is only one page wide, this will correct that width problem */
	transform-origin: right top; /* and this will ensure it's on the right hand side */
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
	text-align: center;
}

.slider >>> .slider-indicator-icon:hover {
	background: var(--vpPeach);
}

.slider >>> .slider-indicator-active {
	background: var(--vpOrange);
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
