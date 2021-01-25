<template>
	<div id="app">
		<NavMenu :navPage="navPage" :portal="true" @goTo="loadPage"></NavMenu>
		<Catalogue v-if="navPage == 'cat'"></Catalogue>
		<Training v-else-if="navPage == 'training'"></Training>
		<Demonstrators v-else-if="navPage == 'demonstrators'"></Demonstrators>
		<Home v-else @goTo="loadPage"></Home>
		<Footer :portal="true"></Footer>
	</div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'
import Footer from './components/Footer.vue'
import Home from './components/Home.vue'
import Catalogue from './components/Catalogue.vue'
import Training from './components/Training.vue'
import Demonstrators from './components/Demonstrators.vue'

const appPages = ['home', 'cat', 'training', 'demonstrators']

export default {
	name: 'App',
	components: {
		NavMenu,
		Footer,
		Home,
		Catalogue,
		Training,
		Demonstrators
	},
	data() {
		return {
			navPage: 'home'
		}
	},
	methods: {
		setPage() {
			const hash = location.hash.replace('#', '') || 'home'
			this.loadPage(hash)
		},
		loadPage(page) {
			if (appPages.includes(page)) {
				location.hash = page
				this.navPage = page
			}
		}
	},
	mounted() {
		this.setPage()
		window.addEventListener("hashchange", this.setPage)
	}
}
</script>

<style>
@import './assets/viewpoint-cssp.css';

#app {
	overflow-x: hidden;
}
</style>
