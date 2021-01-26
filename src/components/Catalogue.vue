<template>
	<div id="catalogue">
		<div class="banner">
			<div class="header-left">
				<img id="logo" src="../assets/logo.png" />
			</div>
			<div class="header-right">
				<p>{{ count }} entries</p>
				<h1 class="filter" @click="toggleFilter">
					Filter&nbsp;
					<font-awesome-icon
						icon="caret-down"
						class="filter-icon"
						:class="{ expanded: showFilter }"
					></font-awesome-icon>
				</h1>
			</div>
		</div>
		<CatalogueContent
			:showFilter="showFilter"
			@filterClosed="closeFilter"
			@filterOpen="showFilter = true"
			@updateCount="updateCount"
		></CatalogueContent>
	</div>
</template>

<script>
import CatalogueContent from './CatalogueContent.vue'

export default {
	name: 'Catalogue',
	components: {
		CatalogueContent
	},
	data() {
		return {
			showFilter: false,
			count: '0'
		}
	},
	methods: {
		toggleFilter() {
			if (this.showFilter) {
				this.closeFilter()
			} else {
				this.showFilter = true
			}
		},
		closeFilter() {
			// filter can't be closed if no entries exist
			if (this.count > 0) {
				this.showFilter = false
			}
		},
		updateCount(val) {
			this.count = val
		},
		resized() {
			// recalculate --contentHeight using 100vh and deducting height of this banner
			// AND App.vue's NavMenu and Footer (since this component sits between them)
			let usedHeight = 0
			const banner = document.getElementsByClassName('banner')
			if (banner) {
				usedHeight += banner[0].getBoundingClientRect().height
			}
			const appFixed = document.getElementsByClassName('app-fixed')
			if (appFixed) {
				for (let i = 0; i < appFixed.length; i++) {
					usedHeight += appFixed[i].getBoundingClientRect().height
				}
			}
			if (usedHeight) {
				document.documentElement.style.setProperty(
					'--contentHeight',
					`${window.innerHeight - usedHeight}px`
				)
			}
			// and recalculate a best-fit width for the two panels too
			let rhWidth = 480
			if (window.innerWidth >= 1600)
				rhWidth = Math.floor(window.innerWidth / 4) 
			if (window.innerWidth >= 900) {
				rhWidth = Math.floor(window.innerWidth / 3) 
			} else {
				rhWidth = Math.floor(window.innerWidth / 2)
			}
			document.documentElement.style.setProperty(
				'--rightPanelWidth',
				`${rhWidth}px`
			)
			document.documentElement.style.setProperty(
				'--leftPanelWidth',
				`${window.innerWidth - rhWidth}px`
			)
		}
	},
	mounted() {
		this.resized() /* reset size-based CSS vars immediately on loading */
		window.addEventListener('resize', this.resized)
		window.addEventListener('changeorientation', this.resized)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resized)
		window.removeEventListener('changeorientation', this.resized)
	}
}
</script>

<style scoped>
#catalogue {
	width: 100vw;
	overflow: hidden;
}

.banner {
	width: 100vw;
	background-image: url('../assets/banner.png');
	background-position: center;
	background-size: cover;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	border-bottom: 4px solid var(--vpDark);
}

.header-left {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
}

img#logo {
	padding: 4px 0 4px 32px;
	height: 60px;
	background: transparent;
}

.banner h1 {
	background: transparent;
	color: var(--vpOrange);
	margin: 0 32px 4px 32px;
}

.banner p,
.banner svg {
	background: transparent;
}

.banner div {
	background: transparent;
	display: flex;
	flex-direction: column;
}

.header-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.header-right p {
	text-align: right;
	margin-right: 32px;
	color: var(--vpCoolGrey);
}

h1.filter {
	color: var(--vpCoolGrey);
	cursor: pointer;
}
h1.filter:hover {
	color: var(--vpOrange);
}

h1.filter path {
	fill: var(--vpCoolGrey);
}
h1.filter:hover path {
	fill: var(--vpOrange);
}

.filter-icon {
	transition: transform 0.4s linear;
}

.filter-icon.expanded {
	transform: rotate(180deg);
}

@media (max-width: 1007px) {
	img#logo {
		height: calc(80px * 0.925);
	}
	.banner h1 {
		margin-left: calc(32px * 0.925);
	}
}
@media (max-width: 640px) {
	img#logo {
		padding-left: 12px;
		height: calc(80px * 0.85);
	}
	.banner h1 {
		margin-left: calc(32px * 0.85);
	}
	.header-right p,
	.header-right h1 {
		margin-left: 10px;
		margin-right: 12px;
	}
}
</style>
