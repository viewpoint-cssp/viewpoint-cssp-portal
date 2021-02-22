<template>
	<div>
		<Banner class="banner-style" enTitle="Briefing Notes"></Banner>
		<div id="placeholder">
			<p>Placeholder for Briefing Notes</p>
		</div>
	</div>
</template>

<script>
import Banner from './Banner.vue'

export default {
	name: 'Briefing',
	components: {
		Banner
	},
	data() {
		return {}
	},
	methods: {
		resized() {
			// recalculate placeholder using 100vh and deducting height of this banner
			// AND App.vue's NavMenu and Footer (since this component sits between them)
			let usedHeight = 0
			const banner = document.getElementsByClassName('banner')
			if (banner) {
				usedHeight += banner[0].getBoundingClientRect().height
			}
			const appFixed = document.getElementsByClassName('app-fixed')
			if (appFixed) {
				for (let i = 0; i < appFixed.length; i++) {
					usedHeight += appFixed[i].getBoundingClientRect().height
				}
			}
			if (usedHeight) {
				document.getElementById(
					'placeholder'
				).style.height = `${window.innerHeight - usedHeight}px`
			}
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		this.resized() /* reset size of placeholder immediately on loading */
		window.addEventListener('resize', this.resized)
		window.addEventListener('orientationchange', this.resized)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resized)
		window.removeEventListener('orientationchange', this.resized)
	}
}
</script>

<style scoped>
.banner-style {
	background-image: url('../assets/images/briefing.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
}

#placeholder {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
#placeholder p {
	font-size: 3rem;
	letter-spacing: 12px;
	line-height: 1;
	opacity: 0.25;
}
</style>
