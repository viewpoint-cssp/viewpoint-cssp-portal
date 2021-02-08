<template>
	<div id="app">
		<NavMenu class="app-fixed" :navPage="navPage" :portal="true" @goTo="loadPage"></NavMenu>
		<transition name="fade" mode="out-in">
			<component 
				:is="navPage" 
				@goTo="loadPage"
			></component>
		</transition>
		<Footer class="app-fixed" :portal="true"></Footer>
	</div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'
import Footer from './components/Footer.vue'
import About from './components/About.vue'
import Home from './components/Home.vue'
import Catalogue from './components/Catalogue.vue'
import Demonstrators from './components/Demonstrators.vue'
import Resources from './components/Resources.vue'
import Training from './components/Training.vue'
import Explainers from './components/Explainers.vue'
import Briefing from './components/Briefing.vue'
import Videos from './components/Videos.vue'
import Handbook from './components/Handbook.vue'
import Glossary from './components/Glossary.vue'

// NOTE This is defined here AND in NavMenu.vue in order to allow that 
// component to be copied stand-alone for inclusion in the demonstrators
const appPages = [
	'Home',
	'About',
	'Catalogue',
	'Demonstrators',
	'Resources',
	'Training',
	'Explainers',
	'Briefing',
	'Videos',
	'Handbook',
	'Glossary'
]

export default {
	name: 'App',
	components: {
		NavMenu,
		Footer,
		About,
		Home,
		Catalogue,
		Demonstrators,
		Resources,
		Training,
		Explainers,
		Briefing,
		Videos,
		Handbook,
		Glossary
	},
	data() {
		return {
			navPage: 'Home' 
		}
	},
	watch: {
		navPage() {
			if ('scrollBehavior' in document.documentElement.style) {
				window.scrollTo({ top: 0, behavior: 'smooth'})
			} else {
				// EdgeHTML scrolls to top by scrolling the .nav-menu into view
				const navFtr = document.getElementsByClassName('app-fixed')
				navFtr[0].scrollIntoView(true)
			}
		}
	},
	methods: {
		setPage() {
			const hash = location.hash.replace('#', '') || 'home'
			this.loadPage(hash)
		},
		loadPage(page) {
			// nicer to have hash part as all lowercase so this just needs to a page
			// argumet that could be a hash part in lowercase or a navPage in Propercase
			const properPage = page.substr(0, 1).toUpperCase() + page.substr(1).toLowerCase()
			if (appPages.includes(properPage)) {
				location.hash = page.toLowerCase()
				this.navPage = properPage
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
@import './assets/css/viewpoint-cssp.css';

#app {
	overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
