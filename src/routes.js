import Vue from 'vue'
import VueRouter from 'vue-router'
import About from './components/About.vue'
import Arup from './components/Arup.vue'
import Briefing from './components/Briefing.vue'
import Catalogue from './components/Catalogue.vue'
import Demonstrators from './components/Demonstrators.vue'
import Explainers from './components/Explainers.vue'
import Glossary from './components/Glossary.vue'
import Handbook from './components/Handbook.vue'
import Home from './components/Home.vue'
import Infographics from './components/Infographics.vue'
import Resources from './components/Resources.vue'
import Training from './components/Training.vue'
import Umep from './components/Umep.vue'
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
			component: About,
			meta: {
				title: 'VIEWpoint About'
			}
		},
		{
			path: '/arup',
			name: 'Arup City Tool',
			component: Arup,
			meta: {
				title: 'VIEWpoint Arup City Tool'
			}
		},
		{
			path: '/briefing',
			name: 'Briefing',
			component: Briefing,
			meta: {
				title: 'VIEWpoint Briefing notes'
			}
		},
		{
			path: '/catalogue',
			name: 'Catalogue',
			component: Catalogue,
			meta: {
				title: 'VIEWpoint Catalogue'
			}
		},
		{
			path: '/demonstrators',
			name: 'Demonstrators',
			component: Demonstrators,
			meta: {
				title: 'VIEWpoint Demonstrators'
			}
		},
		{
			path: '/explainers',
			name: 'Explainers',
			component: Explainers,
			meta: {
				title: 'VIEWpoint Explainers'
			}
		},
		{
			path: '/glossary',
			name: 'Glossary',
			component: Glossary,
			meta: {
				title: 'VIEWpoint Glossary'
			}
		},
		{
			path: '/handbook',
			name: 'Handbook',
			component: Handbook,
			meta: {
				title: 'VIEWpoint Handbook'
			}
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			meta: {
				title: 'VIEWpoint Home'
			}
		},
		{
			path: '/infographics',
			name: 'Infographics',
			component: Infographics,
			meta: {
				title: 'VIEWpoint Infographics'
			}
		},
		{
			path: '/resources',
			name: 'Resources',
			component: Resources,
			meta: {
				title: 'VIEWpoint Resources'
			}
		},
		{
			path: '/videos',
			name: 'Videos',
			component: Videos,
			meta: {
				title: 'VIEWpoint Videos'
			}
		},
		{
			path: '/training',
			name: 'Training',
			component: Training,
			meta: {
				title: 'VIEWpoint Training materials'
			}
		},
		{
			path: '/umep',
			name: 'UMEP Training',
			component: Umep,
			meta: {
				title: 'VIEWpoint UMEP Training'
			}
		},
		{
			path: '*',
			redirect: '/home',
			name: 'VIEWpoint404'
		}
	]
})

// from https://alligator.io/vuejs/vue-router-modify-head/
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.title)

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.metaTags)

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) document.title = nearestWithTitle.meta.title

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(
		document.querySelectorAll('[data-vue-router-controlled]')
	).map(el => el.parentNode.removeChild(el))

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next()

	// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map(tagDef => {
			const tag = document.createElement('meta')

			Object.keys(tagDef).forEach(key => {
				tag.setAttribute(key, tagDef[key])
			})

			// We use this to track which meta tags we create, so we don't interfere with other ones.
			tag.setAttribute('data-vue-router-controlled', '')

			return tag
		})
		// Add the meta tags to the document head.
		.forEach(tag => document.head.appendChild(tag))

	next()
})

router.afterEach(() => {
	// if selected by a dropdown (a resources page) this will kindly remove the dropdown (rather
	// than waiting until the cursor moves away or, in touch screens, somewhere else gets focus)
	const navMenu = document.getElementsByClassName('nav-menu')
	if (navMenu.length > 0) {
		const subNav = navMenu[0].getElementsByClassName('sub-nav')
		for (let i = 0; i < subNav.length; i++) {
			// parent <li> is no longer being hovered over
			subNav[i].style.display = 'none'
			setTimeout(() => {
				// and quickly set ul.sub-nav's display back again
				// to its default state (which is { display: none })
				subNav[i].style.display = ''
			}, 500)
		}
	}
})

export default router
