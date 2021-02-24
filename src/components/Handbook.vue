<template>
	<div>
		<Banner class="banner-style" enTitle="Handbook"></Banner>
		<div class="about-page">
			<h2>About the handbook</h2>
			<hr />
			<p>
				Some description about the handbook.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
			<a 
				class="download"
				:href="require('../assets/pdfs/DRAFT_06_VP Handbook_SS Feb 22.pdf')"
				download="VIEWpoint handbook.pdf"
				target="_blank" rel="noopener noreferrer"
			>
				<button>
					<font-awesome-icon icon="download"></font-awesome-icon>
					Download the handbook
				</button>
			</a>
		</div>
		<div class="slider-wrapper">
			<div class="left-shadow"></div>
			<div class="right-shadow"></div>
			<slider 
				class="slider"
				animation="normal"
				:autoplay=false
			>
				<slider-item v-for="(page, i) in pages" :key="i">
					<img :src="page" :alt="`Handbook page ${i + 1}`" />
				</slider-item>
			</slider>
		</div>
	</div>
</template>

<script>
import Banner from './Banner.vue'
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
	name: 'Handbook',
	components: {
		Banner,
		Slider,
		SliderItem
	},
	data() {
		return {
			pages: []
		}
	},
	methods: {
		resized() {
			// default size is 1024 x 724 (landscape 2-page spread)
			const ratio = 1024 / 724
			let width = Math.min(parseInt(window.innerWidth) - 8, 1024)
			let height = Math.min(parseInt(window.innerHeight) - 16, 724)
			if (width / height != ratio) {
				width = height * ratio
			}
			document.documentElement.style.setProperty(
				'--handbookWidth',
				`${width}px`
			)
			document.documentElement.style.setProperty(
				'--handbookHeight',
				`${height}px`
			)
			document.documentElement.style.setProperty(
				'--handbookScale',
				`${height / 724}`
			)
		}
	},
	mounted() {
		// load pages
		for (let i = 1; i < 34; i++) {
			this.pages.push(require(`../assets/images/DRAFT_06_VP Handbook_SS Feb 221024_${i}.jpg`))
		}
		this.$el.parentElement.scrollIntoView(true)
		this.resized() /* reset size-based CSS vars immediately on loading */
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
	background-image: url('../assets/images/handbook.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.8);
}

.fa-download {
	background: transparent;
}

.fa-download path {
	color: var(--whiteDefault);
}

.slider-wrapper,
.slider {
	width: var(--handbookWidth) !important;
	height: var(--handbookHeight) !important;
}

.slider-wrapper {
	margin: 32px auto;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.1);
	position: relative;
}
.slider-wrapper .left-shadow, .slider-wrapper .right-shadow {
	position: absolute;
	width: 40%;
	height: 10px;
	content: ' ';
	left: 12px;
	bottom: 7px;
	background: transparent;
	transform: skew(-2deg) rotate(-2deg);
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.9);
} 
.slider-wrapper .right-shadow {
	left: auto;
	right: 12px;
	transform: skew(2deg) rotate(2deg);
}

.slider >>> .slider-item img {
	transform: scale(calc(100% * var(--handbookScale)));
	transform-origin: top left;
}

/* cover page will be formatted portrait so this is needed to correct that */
/* TODO back page (if single page) will also be formatted portrait so similar is needed to correct that too */
.slider >>> .slider-item:first-of-type img {
	width: var(--handbookWidth);
	height: var(--handbookHeight);
	transform: scaleX(50%);
	transform-origin: top right;
}

.slider >>> .slider-indicators {
	background: transparent;
}

.slider >>> .slider-btn:hover {
	background: var(--primaryLighter); /*rgba(0, 0, 0, 0.1);*/
	box-shadow: none;
}

.slider >>> .slider-icon {
	background: transparent;
	border-color: var(--whiteDefault);
	border-width: 4px;
}
.slider >>> .slider-btn:hover .slider-icon {
	border-color: var(--vpOrange) !important;
}

.slider >>> .slider-indicators {
	bottom: 0;
	width: max-content;
}

.slider >>> .slider-indicator-active {
	background: var(--vpOrange);
}

@media (max-width: 784px) {
	.slider-wrapper {
		display: none;
	}
	.about-page {
		display: flex;
		flex-direction: column;
	}
	.about-page a {
		align-self: center;
	}
	.about-page a button {
		padding: 32px;
	}
}
</style>
