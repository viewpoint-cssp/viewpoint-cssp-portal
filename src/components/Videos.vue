<template>
	<div>
		<Banner class="banner-style" enTitle="Videos"></Banner>
		<div id="placeholder">
			<p>Placeholder for Videos</p>
		</div>
	</div>
</template>

<script>
import Banner from './Banner.vue'

export default {
	name: 'Videos',
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
	background-image: url('../assets/images/resources.jpg');
	background-blend-mode: soft-light;
}
@supports (-ms-ime-align: auto) {
	/* EdgeHTML since background-blend-style doesn't work, use a white box 'shadow' to lighten */
	.banner-style {
		box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.8);
	}
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
