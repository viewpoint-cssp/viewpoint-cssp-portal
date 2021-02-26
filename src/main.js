import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faArrowsAltH,
	faArrowsAltV,
	faBackward,
	faBookOpen,
	faCaretDown,
	faCaretLeft,
	faCaretRight,
	faChevronLeft,
	faChevronRight,
	faChevronUp,
	faComment,
	faCompressArrowsAlt,
	faDownload,
	faExpandArrowsAlt,
	faExternalLinkAlt,
	faForward,
	faLink,
	faListAlt,
	faSlash,
	faTimes,
	faVideoSlash
} from '@fortawesome/free-solid-svg-icons'
import {
	FontAwesomeIcon,
	FontAwesomeLayers
} from '@fortawesome/vue-fontawesome'
import VShowSlide from 'v-show-slide'

library.add(
	faArrowsAltH,
	faArrowsAltV,
	faBackward,
	faBookOpen,
	faCaretDown,
	faCaretLeft,
	faCaretRight,
	faChevronLeft,
	faChevronRight,
	faChevronUp,
	faComment,
	faCompressArrowsAlt,
	faDownload,
	faExpandArrowsAlt,
	faExternalLinkAlt,
	faForward,
	faLink,
	faListAlt,
	faSlash,
	faTimes,
	faVideoSlash
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.use(VShowSlide)

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')
