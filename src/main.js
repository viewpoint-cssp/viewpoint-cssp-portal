import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faCaretDown,
	faCaretRight,
	faChevronLeft,
	faChevronRight,
	faCompressArrowsAlt,
	faExpandArrowsAlt,
	faExternalLinkAlt,
	faForward,
	faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
	faCaretDown,
	faCaretRight,
	faChevronLeft,
	faChevronRight,
	faCompressArrowsAlt,
	faExpandArrowsAlt,
	faExternalLinkAlt,
	faForward,
	faTimes
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')
