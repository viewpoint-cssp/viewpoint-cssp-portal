<template>
	<div
		class="gotop-button"
		title="Scroll back to the top of the page"
		@click="scrollTop"
	>
		<font-awesome-icon
			class="gotop-icon"
			icon="chevron-up"
		></font-awesome-icon>
	</div>
</template>

<script>
export default {
	name: 'Gotop',
	methods: {
		showHideButton() {
			let display = 'none'
			if (!window.matchMedia('(max-width: 640px)').matches) {
				// (wider res only) show button once the navMenu and banner are off the screen
				let bannerHeight = 0
				const navFtr = document.getElementsByClassName('app-fixed')
				if (navFtr) {
					bannerHeight += navFtr[0].getBoundingClientRect().height
				}
				const banner = document.getElementsByClassName('banner')
				if (banner) {
					bannerHeight += banner[0].getBoundingClientRect().height
				}
				if (document.getElementById('app').getBoundingClientRect().y < (0 - bannerHeight)) {
					display = 'block'
				}
			}
			document.getElementsByClassName(
				'gotop-button'
			)[0].style.display = display
		},
		scrollTop() {
			if ('scrollBehavior' in document.documentElement.style) {
				window.scrollTo({ top: 0, behavior: 'smooth'})
			} else {
				// EdgeHTML scrolls to top by scrolling the .nav-menu into view
				const navFtr = document.getElementsByClassName('app-fixed')
				navFtr[0].scrollIntoView(true)
			}
		}
	},
	mounted() {
		this.showHideButton()
		document.addEventListener('scroll', this.showHideButton)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.showHideButton)
	}
}
</script>

<style scoped>
.gotop-button {
	display: none;
	position: fixed;
	bottom: 6px;
	right: 10px;
	background-color: var(--vpGreen);
	color: var(--whiteDefault);
	border-radius: 20px;
	margin: 0;
	padding: 3px 4px;
	cursor: pointer;
	z-index: 50;
}

.gotop-button:hover {
	background-color: var(--vpOrange);
}

.gotop-icon {
	height: 30px;
	width: 30px;
	background: transparent;
}

.gotop-icon path {
	color: var(--whiteDefault);
}
</style>
