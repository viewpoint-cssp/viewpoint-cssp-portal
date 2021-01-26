<template>
	<nav class="nav-menu" @mouseenter="stopTimer" @mouseleave="startTimer">
		<ul class="main-nav">
			<li
				v-for="opt in options"
				:key="`opt-${opt.page}`"
				class="nav-item"
				:class="{ active: isActive(opt.page, opt.options) }"
				:disabled="opt.disabled"
				@click="goTo(opt.page)"
			>
				{{ opt.label }}
				<ul v-if="opt.options" class="sub-nav">
					<li
						v-for="sub in opt.options"
						:key="`sub-${sub.page}`"
						class="nav-item"
						:class="{ active: navPage == sub.page }"
						:disabled="sub.disabled"
						@click.stop="goTo(sub.page)"
					>
						{{ sub.label }}
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script>
/*
To deploy on a website external to the portal use something like:
<NavMenu navPage="suhi" v-if="showMenu" @mouseleave="showMenu = false"></NavMenu>
Use .nav-menu to position (eg absolute, at top left with any z-index)
@mouseleave not required if there's no v-if or there's another way to disappear it
*/
const appPages = ['home', 'cat', 'training', 'demonstrators']

export default {
	name: 'NavMenu',
	props: {
		navPage: String, // current page (see valid page names in options array below)
		portal: Boolean // passed true only when component is called from viewpoint-cssp-portal's App.vue
	},
	data() {
		return {
			options: [
				{ page: 'home', label: 'Home' },
				{ page: 'cat', label: 'Catalogue' },
				{ 
					page: 'demonstrators', 
					label: 'Demonstrators', 
					options: [
						{ page: 'suhi', label: 'Surface Urban Heat Island'},
						{ page: 'wrm', label: 'Water Resources Management'}
					]
				},
				{ page: 'training', label: 'Training materials' },
				{
					page: 'help',
					label: 'Explainers',
					disabled: true
				},
				{ page: 'videos', label: 'Videos', disabled: true },
				{
					page: 'handbook',
					label: 'Handbook',
					disabled: true
				}
			],
			timeout: null
		}
	},
	methods: {
		isActive(page, options) {
			if (page == this.navPage) {
				return true
			}
			if (!options) {
				return false
			}
			return options.filter(opt => opt.page == this.navPage).length > 0
		},
		goTo(page) {
			if (page == this.navPage) return
			if (appPages.includes(page)) {
				if (this.portal) {
					this.$emit('goTo', page)
				} else {
					location.href =
						'https://viewpoint-cssp.github.io/viewpoint-cssp-portal#' + page
				}
			} else if (page == 'suhi') {
				location.href = 'https://the-iea.github.io/viewpoint-suhi'
			} else if (page == 'wrm') {
				location.href = 'https://the-iea.github.io/viewpoint-wrm'
			}
		},
		// if called from the likes of SUHI or WRM pages: if the mouse is outside this navMenu for more
		// than 1 second, this component will emit a mouseleave event for the parent to hide/close it 
		// (parent can chose to ignore mouseleave if the navMenu is permanently on the screen)
		startTimer() {
			if (!this.portal) {
				this.timeout = setTimeout(() => { 
					this.$emit('mouseleave')
				}, 1000)
			}
		},
		stopTimer() {
			if (!this.portal) {
				clearTimeout(this.timeout)
			}
		}
	},
	mounted() {
		if (!this.portal && !window.matchMedia('(hover: hover)').matches) { // or '(pointer: none)' ?
			// if called from the likes of SUHI or WRM pages on a touch device: if nothing is selected 
			// within 10 seconds, this component will emit a mouseleave event for the parent to hide/close
			// it (parent can chose to ignore mouseleave if the navMenu is permanently on the screen)
			this.timeout = setTimeout(() => { 
				this.$emit('mouseleave')
			}, 10000)
		}
	}
}
</script>

<style scoped>
.nav-menu {
	background: var(--vpDark);
	width: 100%;
	display: flex;
	flex-direction: row;
	padding: 0 32px;
	border-bottom: 1px solid var(--vpOrange);
}

ul.main-nav {
	width: 100%;
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}

ul.sub-nav {
	position: absolute;
	margin: 0 8px;
	left: -16px;
	z-index: 100;
	padding: 8px;
	background: var(--vpDark);
	display: flex;
	flex-direction: column;
	display: none;
	border-bottom: 1px solid var(--vpOrange);
}

.nav-item {
	list-style: none;
	padding: 8px;
	color: var(--whiteDisabled);
	background: transparent;
	position: relative;
}
.nav-item.active {
	color: var(--whiteDefault);
}
.nav-item:not([disabled]) {
	cursor: pointer;
}
.nav-item:hover:not([disabled]):not(.active) {
	color: var(--whiteHover);
}

.nav-item:hover:not([disabled]) ul.sub-nav {
	display: block;
}

.sub-nav .nav-item {
	margin-left: 0;
	white-space: nowrap;
}
</style>
