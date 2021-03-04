import Vue from 'vue'
import VueRouter from 'vue-router'
import About from './components/About.vue'
import Briefing from './components/Briefing.vue'
import Catalogue from './components/Catalogue.vue'
import Demonstrators from './components/Demonstrators.vue'
import Explainers from './components/Explainers.vue'
import Handbook from './components/Handbook.vue'
import Home from './components/Home.vue'
import Glossary from './components/Glossary.vue'
import Resources from './components/Resources.vue'
import Training from './components/Training.vue'
import Videos from './components/Videos.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/home',
			name: 'root'
		},
		{
			path: '/about',
			name: 'About',
			component: About
		},
		{
			path: '/briefing',
			name: 'Briefing',
			component: Briefing
		},
		{
			path: '/catalogue',
			name: 'Catalogue',
			component: Catalogue
		},
		{
			path: '/demonstrators',
			name: 'Demonstrators',
			component: Demonstrators
		},
		{
			path: '/explainers',
			name: 'Explainers',
			component: Explainers
		},
		{
			path: '/glossary',
			name: 'Glossary',
			component: Glossary
		},
		{
			path: '/handbook',
			name: 'Handbook',
			component: Handbook
		},
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
		{
			path: '/resources',
			name: 'Resources',
			component: Resources
		},
		{
			path: '/videos',
			name: 'Videos',
			component: Videos
		},
		{
			path: '/training',
			name: 'Training',
			component: Training
		},
		{
			path: '*',
			name: 'VIEWpoint404'
		}
	]
})

export default router
