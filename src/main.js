import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faBackward,
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
import VShowSlide from 'v-show-slide'

library.add(
	faBackward,
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

Vue.use(VShowSlide)

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')
