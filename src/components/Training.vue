<template>
	<div id="training">
		<div class="banner">
			<div class="header-left">
				<img id="logo" src="../assets/images/logo.png" />
				<h1>
					Training materials
					<br class="wrap-item" />
					<sup lang="zh-cn">培训材料</sup>
				</h1>
			</div>
		</div>
		<div class="training-handbook">
			<div class="contents">
				<font-awesome-icon
					icon="thumbtack"
					class="pin-contents"
					:class="{ pinned: sticky }"
					@click="toggleSticky"
				></font-awesome-icon>
				<h2 class="section header" @click="showAbout = !showAbout">
					About
					<font-awesome-icon
						icon="caret-down"
						class="section-header-icon"
						:class="{ expanded: showAbout }"
					></font-awesome-icon>
				</h2>
				<div v-show-slide="showAbout">
					<div
						class="section"
						:class="{ selected: page == 'TrainingIntroduction' }"
						@click="page = 'TrainingIntroduction'"
					>
						Introduction <sup>介绍</sup>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingBackground' }"
						@click="page = 'TrainingBackground'"
					>
						Background
					</div>
				</div>
				<h2
					class="section header"
					@click="showGettingStarted = !showGettingStarted"
				>
					Getting Started
					<font-awesome-icon
						icon="caret-down"
						class="section-header-icon"
						:class="{ expanded: showGettingStarted }"
					></font-awesome-icon>
				</h2>
				<div v-show-slide="showGettingStarted">
					<div
						class="section"
						:class="{ selected: page == 'TrainingJupyter' }"
						@click="page = 'TrainingJupyter'"
					>
						Installing Jupyter Notebook
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingAnaconda' }"
						@click="page = 'TrainingAnaconda'"
					>
						Installing Anaconda and Jupyter Notebook
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingQgis' }"
						@click="page = 'TrainingQgis'"
					>
						Installing QGIS and UMEP
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingSupport' }"
						@click="page = 'TrainingSupport'"
					>
						UMEP technical support
					</div>
				</div>
				<h2
					class="section header"
					@click="showUsingUMEP = !showUsingUMEP"
				>
					Using UMEP
					<font-awesome-icon
						icon="caret-down"
						class="section-header-icon"
						:class="{ expanded: showUsingUMEP }"
					></font-awesome-icon>
				</h2>
				<div v-show-slide="showUsingUMEP">
					<div
						class="section"
						:class="{ selected: page == 'TrainingFirstSteps' }"
						@click="page = 'TrainingFirstSteps'"
					>
						First steps with UMEP
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingBasics' }"
						@click="page = 'TrainingBasics'"
					>
						Basics of QGIS and UMEP
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingGrid' }"
						@click="page = 'TrainingGrid'"
					>
						Creating a grid in QGIS and UMEP
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingData' }"
						@click="page = 'TrainingData'"
					>
						Meteorological data for UMEP modelling
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingWebServices' }"
						@click="page = 'TrainingWebServices'"
					>
						Web services
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingTutorials' }"
						@click="page = 'TrainingTutorials'"
					>
						Ongoing tutorials
					</div>
				</div>
				<hr />
				<div
					class="section header"
					:class="{ selected: page == 'TrainingReferences' }"
					@click="page = 'TrainingReferences'"
				>
					References
				</div>
			</div>
			<hr class="contents-divider" />
			<div class="page-content">
				<transition name="fade" mode="out-in">
					<component
						:is="page"
						@skipTo="skipTo"
						@resizePlayer="resizePlayer"
					></component>
				</transition>
				<div class="page-bottom">
					<button
						@click="prevPage"
						:class="{ hidden: page == pages[0] }"
					>
						<font-awesome-icon
							icon="chevron-left"
						></font-awesome-icon>
						Previous
					</button>
					<button
						@click="nextPage"
						:class="{ hidden: page == pages[pages.length - 1] }"
					>
						Next
						<font-awesome-icon
							icon="chevron-right"
						></font-awesome-icon>
					</button>
				</div>
			</div>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
import TrainingIntroduction from './training/TrainingIntroduction.vue'
import TrainingBackground from './training/TrainingBackground.vue'
import TrainingJupyter from './training/TrainingJupyter.vue'
import TrainingAnaconda from './training/TrainingAnaconda.vue'
import TrainingQgis from './training/TrainingQgis.vue'
import TrainingSupport from './training/TrainingSupport.vue'
import TrainingFirstSteps from './training/TrainingFirstSteps.vue'
import TrainingBasics from './training/TrainingBasics.vue'
import TrainingGrid from './training/TrainingGrid.vue'
import TrainingData from './training/TrainingData.vue'
import TrainingWebServices from './training/TrainingWebServices.vue'
import TrainingTutorials from './training/TrainingTutorials.vue'
import TrainingReferences from './training/TrainingReferences.vue'
import Gotop from './Gotop.vue'

// stickiness on scroll based on https://cssanimation.rocks/scroll-animations/
// requestionAnimationFrame happens every 1/60s
// if not supported by browser, setTimeout is used instead
let scroll =
	window.requestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60)
	}

export default {
	name: 'Training',
	components: {
		TrainingIntroduction,
		TrainingBackground,
		TrainingJupyter,
		TrainingAnaconda,
		TrainingQgis,
		TrainingSupport,
		TrainingFirstSteps,
		TrainingBasics,
		TrainingGrid,
		TrainingData,
		TrainingWebServices,
		TrainingTutorials,
		TrainingReferences,
		Gotop
	},
	data() {
		return {
			page: 'TrainingIntroduction',
			showAbout: true,
			showGettingStarted: false,
			showUsingUMEP: false,
			fixedContents: false,
			pages: [
				'TrainingIntroduction',
				'TrainingBackground',
				'TrainingJupyter',
				'TrainingAnaconda',
				'TrainingQgis',
				'TrainingSupport',
				'TrainingFirstSteps',
				'TrainingBasics',
				'TrainingGrid',
				'TrainingData',
				'TrainingWebServices',
				'TrainingTutorials',
				'TrainingReferences'
			],
			sticky: false // set TRUE to make the contents sticky
		}
	},
	watch: {
		page() {
			const contents = document.getElementsByClassName('contents')
			if (contents.length > 0) {
				contents[0].style.marginTop = `0px`
			}
			if ('scrollBehavior' in document.documentElement.style) {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			} else {
				// EdgeHTML scrolls to top by scrolling the .nav-menu into view
				const navFtr = document.getElementsByClassName('app-fixed')
				navFtr[0].scrollIntoView(true)
			}
		}
	},
	methods: {
		prevPage() {
			const ix = this.pages.indexOf(this.page) - 1
			if (ix >= 0) {
				this.skipTo(this.pages[ix])
			}
		},
		nextPage() {
			const ix = this.pages.indexOf(this.page) + 1
			if (ix <= this.pages.length - 1) {
				this.skipTo(this.pages[ix])
			}
		},
		skipTo(page) {
			// could set this up to do this programmatically but...
			const ix = this.pages.indexOf(page)
			if (ix <= 1) {
				this.showAbout = true
			} else if (ix <= 5) {
				this.showGettingStarted = true
			} else {
				this.showUsingUMEP = true
			}
			this.page = page
		},
		resized() {
			// recalculate a best-fit width for the two panels
			let lhWidth = 360
			let availableWidth = window.innerWidth
			if (availableWidth >= 1400) {
				availableWidth = 1400
				lhWidth = Math.floor(availableWidth / 4)
			} else {
				lhWidth = Math.floor(availableWidth / 3)
			}
			document.documentElement.style.setProperty(
				'--rightTrainingWidth',
				`${availableWidth - lhWidth}px`
			)
			document.documentElement.style.setProperty(
				'--leftTrainingWidth',
				`${lhWidth}px`
			)
			this.resizePlayer()
		},
		resizePlayer() {
			// JWPlayer suggests 640 by 360 soooo...
			const oldWidth = document.documentElement.style.getPropertyValue(
				'--playerWidth'
			)
			let width = parseInt(
				document.documentElement.style.getPropertyValue(
					'--rightTrainingWidth'
				)
			) // default is width of right hand panel
			// get default amount of air either side (parent <p>'s margins)
			let airPx = 64
			if (window.matchMedia('(max-width: 645px)').matches) {
				airPx = 32
			}
			// get width of any iframe's parent <p> less its padding and margins
			const iframes = document.getElementsByTagName('iframe')
			if (iframes.length) {
				const parent = iframes[0].parentElement
				width = Math.min(
					parent.getBoundingClientRect().width,
					width - airPx
				)
			} else {
				width = width - airPx
			}
			if (width > 640) {
				width = 640
			}
			if (!oldWidth || width != parseInt(oldWidth)) {
				document.documentElement.style.setProperty(
					'--playerWidth',
					`${width}px`
				)
				document.documentElement.style.setProperty(
					'--playerHeight',
					`${Math.floor((width / 16) * 9)}px`
				)
				// and set the src to itself again to force a refresh
				this.$nextTick(() => {
					for (let i = 0; i < iframes.length; i++) {
						const src = iframes[i].src
						if (src) {
							iframes[i].src = src
						}
					}
				})
			}
		},
		toggleSticky() {
			this.sticky = !this.sticky
			if (this.sticky) {
				// start listening for training-contents to scroll out of viewport
				this.stickyContents()
			} else {
				// reset margin and next stickyContents will leave it alone (and not listen any more)
				const contents = document.getElementsByClassName('contents')
				if (contents.length > 0) {
					contents[0].style.marginTop = `0px`
				}
			}
		},
		stickyContents() {
			const contents = document.getElementsByClassName('contents')
			let offsetTop = 0
			if (contents.length > 0) {
				const banner = document.getElementsByClassName('banner')
				if (
					this.sticky &&
					banner.length > 0 &&
					banner[0].getBoundingClientRect().bottom < 0
				) {
					// banner has scrolled above the viewport...
					const page = document.getElementsByClassName('page-content')
					if (page.length > 0) {
						if (
							page[0].getBoundingClientRect().height >
							contents[0].getBoundingClientRect().height
						) {
							// ... and page is longer than the contents
							// calculate a top margin that will keep the contents in view
							offsetTop = Math.abs(
								banner[0].getBoundingClientRect().bottom
							)
						}
					}
				}
				contents[0].style.marginTop = `${offsetTop}px`
			}
			if (this.sticky) {
				// wait 1/60 of a second and check again
				scroll(this.stickyContents)
			}
		}
	},
	mounted() {
		this.resized() /* reset size-based CSS vars immediately on loading */
		window.addEventListener('resize', this.resized)
		window.addEventListener('orientationchange', this.resized)
		if (this.sticky) {
			// start listening for training-contents to scroll out of viewport
			this.stickyContents()
		}
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resized)
		window.removeEventListener('orientationchange', this.resized)
	}
}
</script>

<style scoped>
#training {
	min-height: var(--minContentHeight);
}

.banner {
	width: 100vw;
	background-image: url('../assets/images/training.jpg');
	background-position: center;
	background-size: cover;
	background-blend-mode: luminosity;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.8);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
}
.banner sup {
	color: inherit;
	background: transparent;
	font-size: 0.95rem;
}

.header-left {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	background: transparent;
}

img#logo {
	padding: 4px 0 4px 32px;
	height: 60px;
	background: transparent;
}

.banner h1 {
	align-self: flex-end;
	margin: 0 0 4px 32px;
	color: var(--vpOrange);
}

br.wrap-item {
	display: none;
}

.training-handbook {
	max-width: var(--widthLimit);
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
}

.contents {
	width: var(--leftTrainingWidth);
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	position: relative;
}

.pin-contents {
	position: absolute;
	top: 8px;
	right: 8px;
	cursor: pointer;
	transform: rotate(45deg);
	transition: transform 0.3s linear;
}
.pin-contents:hover path {
	color: var(--vpOrange);
}
.pin-contents.pinned {
	transform: none;
}

.section {
	margin: 8px 32px 8px 64px;
	cursor: pointer;
}

.section.header {
	margin-left: 32px;
}

.section-header-icon {
	transition: transform 0.4s linear;
}
.section-header-icon.expanded {
	transform: rotate(180deg);
}

.section.selected,
.section.selected span,
.section:hover,
.section:hover path {
	color: var(--vpOrange);
}

.section sup {
	color: inherit;
	font-size: 0.9rem;
	cursor: inherit;
}

hr {
	border-bottom: none;
	border-color: var(--primaryLightest);
}

hr.contents-divider {
	align-self: stretch;
	min-height: calc(var(--minContentHeight) - 60px); /* less banner */
	border: none;
	border-left: 1px solid var(--primaryLightest);
}

.page-content {
	width: calc(var(--rightTrainingWidth) - 2px);
}

.page-content >>> h1,
.page-content >>> h1 span {
	color: var(--vpOrange);
}

.page-content >>> h1,
.page-content >>> h2,
.page-content >>> p {
	margin: 16px 64px;
}

.page-content >>> p.boxed {
	padding: 8px;
	border: 1px solid var(--primaryDisabled);
}

.page-content >>> span.goto {
	cursor: pointer;
}
.page-content >>> span.goto:lang(zh-cn) {
	color: var(--chineseAnchor);
	text-decoration: underline;
}
.page-content >>> span.goto:hover,
.page-content >>> span.goto:hover strong,
.page-content >>> span.goto:hover svg path {
	color: var(--vpOrange);
}

.page-content >>> a {
	text-decoration: none;
	outline: 0;
}
.page-content >>> a:hover,
.page-content >>> a:hover span,
.page-content >>> a:hover svg path {
	color: var(--vpOrange);
}
.page-content >>> a:hover img {
	box-shadow: 4px 4px 5px var(--primarySelected);
}
.page-content >>> a:active img {
	transform: translateY(1px);
	box-shadow: none;
}

.page-content >>> iframe {
	width: var(--playerWidth);
	height: var(--playerHeight);
	margin-top: 8px;
}
.page-content >>> img.youtube {
	display: block;
	max-width: 360px;
	margin-top: 8px;
}

.page-content >>> hr {
	margin: 0 64px;
	border-bottom: none;
	border-color: var(--primaryLightest);
}

.page-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 16px 64px;
}

.page-bottom button svg {
	background: transparent;
}
.page-bottom button svg path {
	color: white;
}
.page-bottom button.hidden {
	visibility: hidden;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.4s ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

@media (min-width: 1400px) {
	.banner {
		padding-left: calc((100vw - 1400px) / 2);
		padding-right: calc((100vw - 1400px) / 2);
	}
}
@media (max-width: 1007px) {
	img#logo {
		height: calc(80px * 0.925);
	}
	.section {
		margin: 4px 16px 4px 32px;
	}
	.section.header {
		margin-left: 16px;
	}
	.page-content >>> h1,
	.page-content >>> h2,
	.page-content >>> p,
	.page-bottom {
		margin: 12px 32px;
	}
	.page-bottom button {
		padding: 8px 16px;
	}
}
@media (max-width: 640px) {
	img#logo {
		padding-left: 12px;
		height: calc(80px * 0.85);
	}
	.section {
		margin: 4px 8px 4px 16px;
	}
	.section.header {
		margin-left: 8px;
	}
	.page-content >>> h1,
	.page-content >>> h2,
	.page-content >>> p,
	.page-bottom {
		margin: 8px 16px;
	}
	.page-bottom button {
		padding: 4px 8px;
	}
}
@media (max-width: 300px) {
	img#logo {
		width: 50%;
		height: auto;
	}
	br.wrap-item {
		display: block;
	}
}
</style>
