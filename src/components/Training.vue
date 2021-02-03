<template>
	<div id="training">
		<div class="banner">
			<div class="header-left">
				<img id="logo" src="../assets/images/logo.png" />
			</div>
		</div>
		<div class="training-handbook">
			<div class="contents">
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
						Introduction
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingIntroduction'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingBackground' }"
						@click="page = 'TrainingBackground'"
					>
						Background
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingBackground'"
						></font-awesome-icon>
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
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingJupyter'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingAnaconda' }"
						@click="page = 'TrainingAnaconda'"
					>
						Installing Anaconda and Jupyter Notebook
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingAnaconda'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingQgis' }"
						@click="page = 'TrainingQgis'"
					>
						Installing QGIS and UMEP
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingQgis'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingSupport' }"
						@click="page = 'TrainingSupport'"
					>
						UMEP technical support
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingSupport'"
						></font-awesome-icon>
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
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingFirstSteps'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingBasics' }"
						@click="page = 'TrainingBasics'"
					>
						Basics of QGIS and UMEP
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingBasics'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingGrid' }"
						@click="page = 'TrainingGrid'"
					>
						Creating a grid in QGIS and UMEP
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingGrid'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingData' }"
						@click="page = 'TrainingData'"
					>
						Meteorological data for UMEP modelling
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingData'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingWebServices' }"
						@click="page = 'TrainingWebServices'"
					>
						Web services
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingWebServices'"
						></font-awesome-icon>
					</div>
					<div
						class="section"
						:class="{ selected: page == 'TrainingTutorials' }"
						@click="page = 'TrainingTutorials'"
					>
						Ongoing tutorials
						<font-awesome-icon
							icon="caret-right"
							v-if="page == 'TrainingTutorials'"
						></font-awesome-icon>
					</div>
				</div>
				<hr />
				<div
					class="section header"
					:class="{ selected: page == 'TrainingReferences' }"
					@click="page = 'TrainingReferences'"
				>
					References
					<font-awesome-icon
						icon="caret-right"
						v-if="page == 'TrainingReferences'"
					></font-awesome-icon>
				</div>
			</div>
			<div class="page-content">
				<transition name="fade" mode="out-in">
					<component 
						:is="page" 
						@skipTo="skipTo"
					></component>
				</transition>
				<div class="page-bottom">
					<button @click="prevPage" :class="{ hidden: page == pages[0] }">
						<font-awesome-icon icon="chevron-left"></font-awesome-icon>
						Previous
					</button>
					<button @click="nextPage" :class="{ hidden: page == pages[pages.length - 1] }">
						Next
						<font-awesome-icon icon="chevron-right"></font-awesome-icon>
					</button>
				</div>
			</div>
		</div>
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
		TrainingReferences
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
			]
		}
	},
	watch: {
		page() {
			if (typeof window.scrollTo == 'function') {
				window.scrollTo({ top: 0, behavior: 'smooth'})
			} else {
				window.scrollTop = 0
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
			// recalculate --minTrainingHeight using 100vh and deducting
			// App.vue's NavMenu and Footer (since this component sits between them)
			let usedHeight = 0
			const appFixed = document.getElementsByClassName('app-fixed')
			if (appFixed) {
				for (let i = 0; i < appFixed.length; i++) {
					usedHeight += appFixed[i].getBoundingClientRect().height
				}
			}
			if (usedHeight) {
				document.documentElement.style.setProperty(
					'--minTrainingHeight',
					`${window.innerHeight - usedHeight}px`
				)
			}
			// and recalculate a best-fit width for the two panels too
			let lhWidth = 360
			if (window.innerWidth >= 1600) {
				lhWidth = Math.floor(window.innerWidth / 4)
			} else if (window.innerWidth >= 300) {
				lhWidth = Math.floor(window.innerWidth / 3)
			} else {
				lhWidth = Math.floor(window.innerWidth / 2)
			}
			document.documentElement.style.setProperty(
				'--rightTrainingWidth',
				`${window.innerWidth - lhWidth}px`
			)
			document.documentElement.style.setProperty(
				'--leftTrainingWidth',
				`${lhWidth}px`
			)
		}
	},
	mounted() {
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
#training {
	min-height: var(--minTrainingHeight);
}

.banner {
	width: 100vw;
	background-image: url('../assets/images/banner.png');
	background-position: center;
	background-size: cover;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
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

.training-handbook {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
}

.contents {
	min-width: var(--leftTrainingWidth);
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	border-right: 1px solid var(--primaryLightest);
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

.fa-caret-right {
	transform: translateY(2px);
}

.section.selected,
.section:hover,
.section:hover path,
.fa-caret-right path {
	color: var(--vpOrange);
}

hr {
	border-bottom: none;
	border-color: var(--primaryLightest);
}

.page-content {
	border-left: 1px solid var(--primaryLightest);
	width: 100%;
}

.page-content >>> h1 {
	color: var(--vpOrange);
}

.page-content >>> h1,
.page-content >>> h2,
.page-content >>> p {
	margin: 16px 64px;
}

.page-content >>> span.goto {
	cursor: pointer;
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

.page-content >>> img.youtube {
	display: block;
	max-width: 360px;
	margin-top: 8px;
}
/*.page-content >>> iframe {
	margin-top: 12px;
}*/

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
	.page-content >>> p {
		margin: 12px 32px;
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
	.page-content >>> p {
		margin: 8px 16px;
	}
}
</style>
