<template>
	<nav class="nav-menu">
		<ul class="main-nav">
			<li
				v-for="opt in options"
				:key="`opt-${opt.page}`"
				class="nav-item"
				:class="{ active: navPage == opt.page }"
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
						@click="goTo(sub.page)"
					>
						{{ sub.label }}
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script>
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
			]
		}
	},
	methods: {
		goTo(page) {
			if (page == this.navPage) return
			if (appPages.includes(page)) {
				if (this.portal) {
					this.$emit('goTo', page)
				} else {
					location.href =
						'https://viewpoint-cssp.github.io/viewpoint-viewpoint-cssp-portal#' + page
				}
			} else if (page == 'suhi') {
				location.href = 'https://the-iea.github.io/viewpoint-suhi'
			} else if (page == 'wrm') {
				location.ref = 'https://the-iea.github.io/viewpoint-wrm'
			}
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

.nav-item:hover:not([disabled]):not(.active) ul.sub-nav {
	display: block;
}

.sub-nav .nav-item {
	margin-left: 0;
	white-space: nowrap;
}
</style>
