<template>
	<nav class="nav-menu" :class="{ full: showNavMenu }" @mouseover="mouseOver" @mouseout="mouseOut">
		<div v-if="!showNavMenu">
			=
		</div>
		<ul v-else>
			<li 
				v-for="opt in options"
				:key="`opt-${opt.page}`"
				class="nav-item"
				:class="{ active: navPage == opt.page }"
				:disabled="opt.disabled"
				@click="opt.action"
			>
				{{ opt.label }}
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'NavMenu',
	props: {
		navPage: String,
		fixed: Boolean
	},
	data() {
		return {
			showNavMenu: true,
			options: [
				{ page: 'home', label: 'Home', action: ''},
				{ page: 'cat', label: 'Catalogue', action: ''},
				{ page: 'demos', label: 'Demonstrators', action: ''},
				{ page: 'training', label: 'Training materials', action: ''},
				{ page: 'help', label: 'Explainers', action: '', disabled: true},
				{ page: 'videos', label: 'Videos', action: '', disabled: true},
				{ page: 'handbook', label: 'Handbook', action: '', disabled: true},
			]
		}
	},
	methods: {
		mouseOver() {
			if (!this.fixed) {
				this.showNavMenu = true
			}
		},
		mouseOut() {
			if (!this.fixed) {
				this.showNavMenu = false
			}
		}
	},
	mounted() {
		if (typeof this.fixed == 'boolean' && !this.fixed) {
			this.showNavMenu = false
		}
	}
}
</script>

<style scoped>
.nav-menu {
	width: 100vw;
	background: var(--vpDark);
	display: flex;
	flex-direction: row;
	padding: 0 32px;
}
.nav-menu.full {
	border-bottom: 1px solid var(--vpOrange);
}

ul {
	width: 100%;
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}

.nav-item {
	list-style: none;
	padding: 8px;
	color: var(--whiteDisabled);
	background: transparent;
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
</style>
