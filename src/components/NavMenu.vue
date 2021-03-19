<template>
	<nav
		class="nav-menu"
		:class="{ 'stand-alone': !portal }"
		@mouseenter="stopTimer"
		@mouseleave="startTimer"
	>
		<div class="hamburger" v-if="hamburgerMenu">
			<div
				class="hamburger-icon"
				:class="{ close: showOptions }"
				@click="showOptions = !showOptions"
			>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</div>
		</div>
		<ul 
			class="main-nav" 
			:class="{ hamburger: hamburgerMenu }"
			v-if="showOptions"
		>
			<li
				v-for="opt in options"
				:key="`opt-${opt.page}`"
				class="nav-item"
				:class="{ active: isActive(opt.page, opt.options) }"
				:disabled="opt.disabled"
				@click="goTo(opt.page)"
			>
				{{ opt.label || opt.page }}
				<br class="wrap-item" v-if="!hamburgerMenu" />
				{{ opt.cnLabel }}
				<ul v-if="opt.options" class="sub-nav">
					<li
						v-for="sub in opt.options"
						:key="`sub-${sub.page}`"
						class="nav-item"
						:class="{ active: navPage == sub.page }"
						:disabled="sub.disabled"
						@click.stop="goTo(sub.page)"
					>
						{{ sub.label || sub.page }}
						<br v-if="!hamburgerMenu" />
						{{ sub.cnLabel}}
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

// NOTE This is defined here AND in App.vue in order to allow this 
// component to be copied stand-alone for inclusion in the demonstrators
const appPages = [
	'About',
	'Briefing',
	'Catalogue',
	'Demonstrators',
	'Explainers',
	'Glossary',
	'Handbook',
	'Home',
	'Infographics',
	'Resources',
	'Training',
	'Videos'
]

export default {
	name: 'NavMenu',
	props: {
		navPage: String, // current page (see valid page names in options array below)
		forceHamburger: Boolean // passed true to use hamburger/vertical menu regardless of browser width
	},
	data() {
		return {
			portal: false,
			options: [
				{ page: 'Home', cnLabel: '首页' },
				{ page: 'About', cnLabel: '关于' },
				{ 
					page: 'Resources', cnLabel: '资源',
					options: [
						{ page: 'Handbook', cnLabel:'手册' },
						{ page: 'Explainers', cnLabel: ' 主题解说' },
						{ page: 'Briefing', label: 'Briefing notes', cnLabel: '简报' },
						{ page: 'Videos', cnLabel: '视频' },
						{ page: 'Infographics', cnLabel: '信息图表'},
						{ page: 'Training', cnLabel: '培训材料' }
					]
				},
				{
					page: 'Demonstrators',
					cnLabel: '演示工具',
					options: [
						{ page: 'suhi', label: 'Surface Urban Heat Island', cnLabel: '地表城市热岛' },
						{ page: 'wrm', label: 'Water Resources Management', cnLabel: '水资源管理' },
						{ page: 'verdant', label: 'Verdant', cnLabel: '作物健康监测' }
					]
				},
				{ page: 'Catalogue', cnLabel: '目录' },
				{ page: 'Glossary', cnLabel: '术语表' }
			],
			timeout: null,
			narrowPage: false,
			showOptions: true,
			hamburgerMenu: false
		}
	},
	watch: {
		narrowPage() {
			// NOTE narrowPage only ever changed if !this.forceHamburger
			// the page has changed from being too-narrow to wide-enough or vice versa
			if (this.narrowPage) {
				// hide the normal options first to show the closed hamburger icon
				this.showOptions = false
				this.hamburgerMenu = true
			} else {
				// kill the hamburger icon and ensure the normal options are visible
				this.hamburgerMenu = false
				this.showOptions = true
			}
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
			if (this.hamburgerMenu) {
				this.showOptions = false
			}
			if (page == this.navPage) return
			if (appPages.includes(page) && this.portal) {
				this.$router.push(page.toLowerCase())
			} else if (appPages.includes(page) && !this.portal) {
				location.href =
					`https://www.viewpoint-cssp.org/${page.toLowerCase()}`
			} else if (page == 'suhi') {
				location.href = 'https://the-iea.github.io/viewpoint-suhi'
			} else if (page == 'wrm') {
				location.href = 'https://the-iea.github.io/viewpoint-wrm'
			} else if (page == 'verdant') {
				location.href = ' https://the-iea.github.io/viewpoint-verdant'
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
		},
		resized() {
			// NOTE this method is only ever called if !this.forceHamburger
			if (window.matchMedia('(max-width: 410px)').matches) {
				this.narrowPage = true
			} else {
				this.narrowPage = false
			}
		}
	},
	mounted() {
		// see whether this component is within the portal website or not
		if (this.$router) {
			const routes = this.$router.options.routes
			if (routes.length > 0 && routes[routes.length - 1].name == 'VIEWpoint404') {
				this.portal = true
			}
		}
		// check whether the required CSS vars exist
		if (!getComputedStyle(document.documentElement).getPropertyValue('--vpOrange')) {
			document.documentElement.style.setProperty('--vpCoolGrey', '#d9d8d6')
			document.documentElement.style.setProperty('--vpDark', '#4d5858')
			document.documentElement.style.setProperty('--vpOrange', '#ff671d')
			document.documentElement.style.setProperty('--whiteDefault', '#fff')
			document.documentElement.style.setProperty(
				'--whiteHover',
				'rgba(255, 255, 255, 0.75)'
			)
			document.documentElement.style.setProperty(
				'--whiteDisabled',
				'rgba(255, 255, 255, 0.5)'
			)
			document.documentElement.style.setProperty('--text', '#4d5858')
			document.documentElement.style.setProperty(
				'--font-family',
				`'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
			)
		}
		// if forcing use of hamburger, set props, otherwise listen for 
		// resize event to see when hamburger needs to be toggled on/off
		if (this.forceHamburger) {
			// show the closed hamburger icon
			this.showOptions = false 
			this.hamburgerMenu = true
		} else {
			this.resized() 
			window.addEventListener('resize', this.resized)
			window.addEventListener('orientationchange', this.resized)
		}
		// if called from the likes of SUHI or WRM pages on a touch device: if nothing is selected
		// within 10 seconds, this component will emit a mouseleave event for the parent to hide/close
		// it (parent can chose to ignore mouseleave if the navMenu is permanently on the screen)
		if (!this.portal && !window.matchMedia('(hover: hover)').matches) {
			// or '(pointer: none)' ?
			this.timeout = setTimeout(() => {
				this.$emit('mouseleave')
			}, 10000)
		}
	},
	beforeDestroy() {
		if (!this.forceHamburger) {
			window.removeEventListener('resize', this.resized)
			window.removeEventListener('orientationchange', this.resized)
		}
	}
}
</script>

<style scoped>
.nav-menu {
	background: var(--vpDark);
	width: 100%;
	padding: 0 32px;
	border-bottom: 1px solid var(--vpOrange);
	position: relative; /* for hamburger (vertical) ul.main-nav */
}

/* extra base styling needed on top of specific .nav-menu 
   styling when this component is used outside portal */
.nav-menu.stand-alone { 
	box-sizing: border-box;
	margin: 0;
	color: var(--text);
	font-family: var(--font-family);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 18px;
}

ul.main-nav,
.hamburger {
	width: 100%;
	margin: 0;
	padding: 0;
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
	margin-left: 40px;
	text-indent: -8px;
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

.nav-item .wrap-item {
	display: none;
}

.nav-item:hover:not([disabled]) ul.sub-nav {
	display: block;
}

.sub-nav .nav-item {
	margin-left: 0;
	white-space: nowrap;
}
.sub-nav .nav-item[disabled] {
	cursor: initial;
}

.hamburger-icon {
	background: transparent;
	color: var(--whiteDefault);
	width: 24px;
	height: 24px;
	margin: 8px 0;
	position: relative;
}
.hamburger-icon:hover {
	color: var(--whiteHover);
	cursor: pointer;
}

.hamburger-icon .hamburger-line {
	display: block;
	width: 100%;
	height: 4px;
	border-radius: 2px;
	background: #a6acac; /* ---whiteDisabled on --vpDark background */
	position: absolute;
	transition: all 200ms ease-out;
}
.hamburger-icon:hover .hamburger-line {
	background: var(--whiteHover);
}
.hamburger-icon .hamburger-line:nth-child(1) {
	top: 4px;
}
.hamburger-icon .hamburger-line:nth-child(2) {
	top: 10px;
}
.hamburger-icon .hamburger-line:nth-child(3) {
	bottom: 4px;
}
.hamburger-icon.close .hamburger-line:nth-child(1) {
	transform: translateY(6px) rotate(45deg);
	height: 4px;
}
.hamburger-icon.close .hamburger-line:nth-child(2) {
	transform: translateX(10px);
	width: 2px;
	opacity: 0;
}
.hamburger-icon.close .hamburger-line:nth-child(3) {
	transform: translateY(-6px) rotate(-45deg);
	height: 4px;
}

/* the following overrides normal horizontal 
nav menu to make a reasonable vertical menu */
.main-nav.hamburger {
	position: absolute; /* wrt .nav-menu */
	right: 0;
	z-index: 100;
	padding: 0 24px 8px 24px;
	width: auto;
	background: var(--vpDark);
	border-bottom: 1px solid var(--vpOrange);
	flex-direction: column;
	align-items: flex-start;
}
.main-nav.hamburger ul.sub-nav {
	position: relative;
	margin: 0;
	left: unset;
	display: block;
	padding-left: 0;
	padding-bottom: 0;
	border-bottom: none;
}
.main-nav.hamburger .nav-item {
	margin-left: 8px;
	padding: 4px 8px;
}

.main-nav.hamburger ul.sub-nav .nav-item {
	list-style: inside square;
	padding-left: 0;
}

@media (min-width: 1400px) {
	.nav-menu:not(.stand-alone) {
		padding-left: calc((100vw - 1400px) / 2);
		padding-right: calc((100vw - 1400px) / 2);
	}
}

@media (max-width: 1102px) {
	.nav-item .wrap-item {
		display: block;
	}
}
@media (max-width: 1007px) {
	.nav-menu {
		padding: 0 8px;
	}
	.nav-item {
		margin-left: 14px;
		text-indent: -6px;
	}
	.nav-item .wrap-item {
		display: none; /* font-size reduced so stop wrapping */
	}
	.nav-menu.stand-alone {
		font-size: 13.69px;
	}
}
@media (max-width: 740px) {
	.nav-item .wrap-item {
		display: block;
	}
}
@media (max-width: 640px) {
	.nav-menu {
		padding: 0 4px;
	}
	.nav-item {
		margin-left: 8px;
		text-indent: -4px;
	}
	.nav-item .wrap-item {
		display: none; /* font-size reduced again so stop wrapping */
	}
	.nav-menu.stand-alone {
		font-size: 11.56px;
	}
}
@media (max-width: 625px) {
	.nav-item .wrap-item {
		display: block;
	}
}
</style>
