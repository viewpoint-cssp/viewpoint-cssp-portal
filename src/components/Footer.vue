<template>
	<footer 
		:class="{ 'stand-alone': !portal }"
		@mouseenter="stopTimer" 
		@mouseleave="startTimer"
	>
		<p>
			Copyright &copy;
			<a href="https://www.the-iea.org" target="_blank">
				The Institute for Environmental Analytics</a
			>,
			<a href="https://www.reading.ac.uk" target="_blank">
				University of Reading</a>
			2021
		</p>
		<p>
			Contact:
			<a href="mailto:viewpoint@the-iea.org">viewpoint@the-iea.org</a>
		</p>
		<div class="logo-wrapper">
			<a href="https://www.newton-gcrf.org/" target="_blank">
				<img alt="Newton Fund" src="../assets/images/nf-logo.png" />
			</a>
			<a id="mo-logo" href="https://www.metoffice.gov.uk/weather/climate/science" target="_blank">
				<img alt="UK Met Office" src="../assets/images/mo-logo.png" />
			</a>
			<a href="https://data.cma.cn/en" target="_blank">
				<img alt="CMA" src="../assets/images/cma-logo.png" />
			</a>
			<a id="iap-logo" href="http://english.iap.cas.cn/" target="_blank">
				<img alt="IAP" src="../assets/images/iap-logo.png" />
			</a>
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
		// check whether the required CSS vars exist
		if (!document.documentElement.style.getPropertyValue('--vpOrange')) {
			document.documentElement.style.setProperty('--vpCoolGrey', '#d9d8d6')
			document.documentElement.style.setProperty('--vpDark', '#4d5858')
			document.documentElement.style.setProperty('--vpOrange', '#ff671d')
			document.documentElement.style.setProperty('--text', '#4d5858')
			document.documentElement.style.setProperty(
				'--font-family',
				`'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
			)
		}
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
	padding: 8px 32px 8px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

/* extra base styling needed on top of specific footer 
   styling when this component is used outside portal */
footer.stand-alone { 
	box-sizing: border-box;
	margin: 0;
	color: var(--text);
	font-family: var(--font-family);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 18px;
}

footer * {
	background: transparent;
	color: var(--vpCoolGrey);
	font-size: 12px;
	margin: 0;
	padding: 0;
}

footer a {
	text-decoration: none;
}
footer a:focus {
	outline: none;
	color: var(--vpOrange);
}
footer a:hover {
	color: var(--vpOrange);
}

.logo-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.logo-wrapper a, /* otherwise will be 35px for some reason */
.logo-wrapper img {
	height: 32px;
}
#mo-logo { /* has lots of air either side */
	margin-left: -6px;
	margin-right: -4px;
}
#iap-logo { /* for air between cma-logo and this logo */
	margin-left: 4px;
}

@media (max-width: 1007px) {
	.logo-wrapper a,
	.logo-wrapper img {
		height: 29.6px;
	}
	footer.stand-alone p,
	footer.stand-alone a,
	footer.stand-alone a:visited {
		font-size: 11px;
	}
}
@media (max-width: 640px) {
	.logo-wrapper a,
	.logo-wrapper img {
		height: 27.2px;
	}
	footer.stand-alone p,
	footer.stand-alone a,
	footer.stand-alone a:visited {
		font-size: 10px;
	}
}

</style>
