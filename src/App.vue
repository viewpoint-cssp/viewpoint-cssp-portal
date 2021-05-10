<template>
	<div id="app">
		<NavMenu class="app-fixed" :navPage="navPage"></NavMenu>
		<transition name="fade" mode="out-in">
			<router-view>
				<component :is="navPage"></component>
			</router-view>
		</transition>
		<Footer class="app-fixed"></Footer>
	</div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'
import Footer from './components/Footer.vue'
import About from './components/About.vue'
import Briefing from './components/Briefing.vue'
import Catalogue from './components/Catalogue.vue'
import Demonstrators from './components/Demonstrators.vue'
import Explainers from './components/Explainers.vue'
import Handbook from './components/Handbook.vue'
import Home from './components/Home.vue'
import Infographics from './components/Infographics.vue'
import Glossary from './components/Glossary.vue'
import Resources from './components/Resources.vue'
import Training from './components/Training.vue'
import Videos from './components/Videos.vue'

export default {
	name: 'App',
	components: {
		NavMenu,
		Footer,
		About,
		Briefing,
		Catalogue,
		Demonstrators,
		Explainers,
		Glossary,
		Handbook,
		Home,
		Infographics,
		Resources,
		Training,
		Videos
	},
	data() {
		return {
			navPage: 'Home'
		}
	},
	watch: {
		navPage() {
			if ('scrollBehavior' in document.documentElement.style) {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			} else {
				// EdgeHTML scrolls to top by scrolling the .nav-menu into view
				const navFtr = document.getElementsByClassName('app-fixed')
				navFtr[0].scrollIntoView(true)
			}
		},
		$route(to) {
			this.navPage = to.name
		}
	},
	methods: {
		resized() {
			// recalculate --minContentHeight using 100vh and deducting
			// App.vue's NavMenu and Footer (since this component sits between them)
			let usedHeight = 0
			const appFixed = document.getElementsByClassName('app-fixed')
			if (appFixed.length) {
				for (let i = 0; i < appFixed.length; i++) {
					usedHeight += appFixed[i].getBoundingClientRect().height
				}
			}
			if (usedHeight) {
				document.documentElement.style.setProperty(
					'--minContentHeight',
					`${window.innerHeight - usedHeight}px`
				)
			}
		}
	},
	mounted() {
		this.navPage = this.$route.name
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

@media print {
	.app-fixed {
		display: none !important;
	}
}
</style>
