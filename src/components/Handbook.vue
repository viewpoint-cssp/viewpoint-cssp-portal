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
				:href="require('../assets/pdfs/placeholder.pdf')"
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
					<img class="youtube" :src="page" alt="YouTube video" />
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
			pages: [
				require('../assets/images/training-1.png'),
				require('../assets/images/training-2.png'),
				require('../assets/images/training-3.png'),
				require('../assets/images/training-4.png'),
				require('../assets/images/training-5.png'),
				require('../assets/images/training-6.png')
			]
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
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
	width: 728px !important;
	height: 409px !important;
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
	bottom: 12px;
	background: transparent;
	transform: skew(-5deg) rotate(-5deg);
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.9);
} 
.slider-wrapper .right-shadow {
	left: auto;
	right: 12px;
	transform: skew(5deg) rotate(5deg);
}

.slider >>> .slider-indicators {
	background: transparent;
}

.slider >>> .slider-btn:hover {
	background: rgba(0, 0, 0, 0.1);
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
