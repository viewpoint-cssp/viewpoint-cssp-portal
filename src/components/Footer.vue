<template>
	<footer 
		:class="{ 'stand-alone': !portal }"
		@mouseenter="stopTimer" 
		@mouseleave="startTimer"
	>
		<p v-if="!narrowPage">
			Copyright &copy;
			<a href="https://www.the-iea.org" target="_blank" rel="noopener noreferrer">
				The Institute for Environmental Analytics</a
			>,
			<a href="https://www.reading.ac.uk" target="_blank" rel="noopener noreferrer">
				University of Reading</a>
			2021
		</p>
		<div class="logo-wrapper narrow-page" v-else>
			<div class="copyright">
				<p>&copy;</p>
				<p class="tiny">2021</p>
			</div>
			<a id="iea-logo" href="https://www.the-iea.org" target="_blank" rel="noopener noreferrer">
				<img alt="Institute for Environmental Analytics" src="../assets/images/iea-logo.png" />
			</a>
			<a id="uor-logo" href="https://www.reading.ac.uk" target="_blank" rel="noopener noreferrer">
				<img alt="University of Reading" src="../assets/images/uor-logo.png" />
			</a>
		</div>
		<p v-if="!narrowPage">
			Contact:
			<a href="mailto:viewpoint@the-iea.org">viewpoint@the-iea.org</a>
		</p>
		<div class="envelope-wrapper" v-else>
			<a href="mailto:viewpoint@the-iea.org"><div class="mail-solid icon"></div></a>
		</div>
		<div class="logo-wrapper" :class="{ 'narrow-page': narrowPage }">
			<a id="nf-logo" href="https://www.newton-gcrf.org/" target="_blank" rel="noopener noreferrer">
				<img alt="Newton Fund" src="../assets/images/nf-logo.png" />
			</a>
			<a id="mo-logo" href="https://www.metoffice.gov.uk/weather/climate/science" target="_blank" rel="noopener noreferrer">
				<img alt="UK Met Office" src="../assets/images/mo-logo.png" />
			</a>
			<a :href="urlCMA" target="_blank" rel="noopener noreferrer">
				<img alt="CMA" src="../assets/images/cma-logo.png" />
			</a>
			<a id="iap-logo" :href="urlIAP" target="_blank" rel="noopener noreferrer">
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
		portal: Boolean, // passed true only when component is called from viewpoint-cssp-portal's App.vue
		forceIconsOnly: Boolean // passed true to use icons only regardless of browser width
},
	data() {
		return {
			timeout: null,
			urlCMA: 'http://www.cma.gov.cn/en2014/',
			urlIAP: 'http://english.iap.cas.cn/',
			narrowPage: false 
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
		},
		resized() {
			// NOTE this method is only ever called if !this.forceIconsOnly
			if (window.matchMedia('(max-width: 580px)').matches) {
				this.narrowPage = true
			} else {
				this.narrowPage = false
			}
		}
	},
	mounted() {
		// change URLs to Chinese version if possible 
		if (navigator && navigator.language && navigator.language.indexOf('CN') >= 0) {
			this.urlCMA = 'http://www.cma.gov.cn/'
			this.urlIAP = 'http://www.iap.cas.cn/'
		}
		// check whether the required CSS vars exist
		if (!getComputedStyle(document.documentElement).getPropertyValue('--vpOrange')) {
			document.documentElement.style.setProperty('--vpCoolGrey', '#d9d8d6')
			document.documentElement.style.setProperty('--vpDark', '#4d5858')
			document.documentElement.style.setProperty('--vpOrange', '#ff671d')
			document.documentElement.style.setProperty('--text', '#4d5858')
			document.documentElement.style.setProperty(
				'--font-family',
				`'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
			)
		}
		// if forcing use of just icons, set props, otherwise listen for 
		// resize event to see when just-icons mode needs to be toggled on/off
		if (this.forceIconsOnly) {
			this.narrowPage = true
		} else {
			this.resized() 
			window.addEventListener('resize', this.resized)
			window.addEventListener('orientationchange', this.resized)
		}
		if (!this.portal && !window.matchMedia('(hover: hover)').matches) { // or '(pointer: none)' ?
			// if called from the likes of SUHI or WRM pages on a touch device: if nothing is selected 
			// within 10 seconds, this component will emit a mouseleave event for the parent to hide/close
			// it (parent can chose to ignore mouseleave if the navMenu is permanently on the screen)
			this.timeout = setTimeout(() => { 
				this.$emit('mouseleave')
			}, 10000)
		}
	},
	beforeDestroy() {
		if (!this.forceIconsOnly) {
			window.removeEventListener('resize', this.resized)
			window.removeEventListener('orientationchange', this.resized)
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
#iea-logo {
	margin-left: 4px;
	margin-right: 8px;
}
#mo-logo { /* has lots of air either side */
	margin-left: -6px;
	margin-right: -4px;
}
#iap-logo { /* for air between cma-logo and this logo */
	margin-left: 4px;
}

.narrow-page .copyright {
	line-height: 1;
}
.tiny {
	font-size: 10px;
}

.envelope-wrapper {
	/* needed to size and therefore position the anchor properly*/
	width: 24.5px;
	height: 17px;
}

.mail-solid.icon {
	box-sizing: content-box;
color: var(--whiteDefault);
  position: absolute;
  width: 22.5px;
  height: 15px;
  border-radius: 1.5px;
  border: solid 1.5px currentColor;
  background-color: currentColor;
}
.mail-solid.icon:hover {
	color: var(--vpOrange);
}

.mail-solid.icon:before {
  content: '';
  position: absolute;
  left: 10.5px;
  top: -6px;
  width: 1.5px;
  height: 15px;
  color: var(--vpDark);
  background-color: currentColor;
  -webkit-transform-origin: bottom;
          transform-origin: bottom;
  -webkit-transform: rotate(-54deg);
          transform: rotate(-54deg);
}

.mail-solid.icon:after {
  content: '';
  position: absolute;
  left: 10.5px;
  top: -6px;
  width: 1.5px;
  height: 15px;
  color: var(--vpDark);
  background-color: currentColor;
  -webkit-transform-origin: bottom;
          transform-origin: bottom;
  -webkit-transform: rotate(54deg);
          transform: rotate(54deg);
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
	footer {
		padding-right: 16px;
	}
	footer
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
@media (max-width: 430px) {
	.logo-wrapper img {
		object-fit: cover;
		object-position: left;
	}
	#iea-logo {
		margin-left: 6px;
		margin-right: 10px;
	}
	#iea-logo img,
	#nf-logo img {
		width: 27px;
	}
	#uor-logo img {
		width: 23px;
	}
	#mo-logo {
		margin-left: 0;
		margin-right: 8px;
	}
	#mo-logo img {
		width: 24px;
	}
	#iap-logo {
		margin-left: 8px;
	}
}

</style>
