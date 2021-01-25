<template>
	<footer  @mouseenter="stopTimer" @mouseleave="startTimer">
		<p>
			Copyright &copy;
			<a href="https://www.the-iea.org">
				The Institute for Environmental Analytics</a
			>,
			<a href="https://www.reading.ac.uk">University of Reading</a>
			2021
		</p>
		<p>
			Contact:
			<a href="mailto:viewpoint@the-iea.org">viewpoint@the-iea.org</a>
		</p>
		<div class="logo-wrapper">
			<p>TODO: Logos of collaborating organisations here</p>
		</div>
	</footer>
</template>

<script>
/*
To deploy on a website external to the portal use something like:
<Footer v-if="showFooter" @mouseleave="showFooter = false"></Footer>
Use footer styling to position (eg absolute, at top left with any z-index)
@mouseleave not required if there's no v-if or there's another way to disappear it
*/

export default {
	name: 'Footer',
	props: {
		portal: Boolean // passed true only when component is called from viewpoint-cssp-portal's App.vue
	},
	data() {
		return {
			timeout: null
		}
	},
	methods: {
		// if called from the likes of SUHI or WRM pages: if the mouse is outside this navMenu for more
		// than 1 second, this component will emit a mouseleave event for the parent to hide/close it 
		// (parent can chose to ignore mouseleave if the navMenu is permanently on the screen)
		startTimer() {
			if (!this.portal) {
				this.timeout = setTimeout(() => { 
					this.$emit('mouseleave')
				}, 1000)
			}
		},
		stopTimer() {
			if (!this.portal) {
				clearTimeout(this.timeout)
			}
		}
	},
	mounted() {
		if (!this.portal && !window.matchMedia('(hover: hover)').matches) { // or '(pointer: none)' ?
			// if called from the likes of SUHI or WRM pages on a touch device: if nothing is selected 
			// within 10 seconds, this component will emit a mouseleave event for the parent to hide/close
			// it (parent can chose to ignore mouseleave if the navMenu is permanently on the screen)
			this.timeout = setTimeout(() => { 
				this.$emit('mouseleave')
			}, 10000)
		}
	}
}
</script>

<style scoped>
footer {
	width: 100%;
	background: var(--vpDark);
	border-top: 1px solid var(--vpOrange);
	padding: 16px 32px 16px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

footer * {
	background: transparent;
	color: var(--vpCoolGrey);
	font-size: 0.75rem;
}

footer a {
	text-decoration: none;
}
footer a:hover {
	color: var(--vpOrange);
}
</style>
