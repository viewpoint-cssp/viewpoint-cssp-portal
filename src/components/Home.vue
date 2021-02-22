<template>
	<div>
		<Banner class="banner-style"
			enTitle="A showcase for the Climate Science for Service Partnership with China"
		></Banner>
		<div class="about-page">
			<h2>VIEWpoint and CSSP China</h2>
			<hr />
			<p>
				The VIEWpoint project seeks to maximise the impact of the
				world-class collaborative scientific research of the
				<a
					href="https://www.metoffice.gov.uk/research/approach/collaboration/newton/cssp-china/index"
					target="_blank" rel="noopener noreferrer"
				>CSSP China</a>
				(Climate Science for Service Partnership China) programme.
				VIEWpoint has created tools, demonstrators, articles and videos
				to make research outputs more accessible to a wider audience,
				including government, industry and the public.
			</p>
			<p>
				<span lang="zh-cn">“新观点”</span> (VIEWpoint)
				<span lang="zh-cn">
					项目旨在最大化地发挥“中英气候科学到服务伙伴关系计划”
				</span>
				(CSSP China: Climate Science for Service Partnership China)
				<span lang="zh-cn">
					的世界级科研合作的影响力。通过创建工具、演示、文章和视频，“新观点”项目让包括政府、企业和公众等在内的不同群体更易获得研究成果。
				</span>
			</p>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'About')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/about.jpg" /></div>
				<div class="button-item desc">
					<h3>About VIEWpoint</h3>
					<p>
						TODO: Short summary here?.
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Catalogue')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/catalogue.jpg" /></div>
				<div class="button-item desc">
					<h3>Catalogue of CSSP China Papers</h3>
					<p>
						All 300+ journal papers published through CSSP China
						have been organised into a searchable catalogue,
						organised by theme.
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Demonstrators')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/demonstrators.jpg" /></div>
				<div class="button-item desc">
					<h3>Demonstrators</h3>
					<p>
						TODO: Online demonstrators of CSSP China projects, including
						...
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Training')">
			<div class="button-content">
				<div class="button-item image"><img src="../assets/images/training.jpg" /></div>
				<div class="button-item desc">
					<h3>Training materials</h3>
					<p>TODO: Lots of lovely things to learn.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Banner from './Banner.vue'

export default {
	name: 'Home',
	components: {
		Banner
	},
	methods: {
		scrollCursor() {
			const buttons = document.getElementsByClassName('button-panel')
			for (let b = 0; b < buttons.length; b++) {
				buttons[b].classList.add('scroll-cursor')
			}
		},
		pointerCursor() {
			const buttons = document.getElementsByClassName('button-panel')
			for (let b = 0; b < buttons.length; b++) {
				buttons[b].classList.remove('scroll-cursor')
			}
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			// this is only here because Chrome and Edge don't correctly refresh 
			// :hover state as elements are moved under the cursor while scrolling
			document.addEventListener('scroll', this.scrollCursor)
			document.addEventListener('mousemove', this.pointerCursor)
		}
	},
	beforeDestroy() {
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			document.removeEventListener('scroll', this.scrollCursor)
			document.removeEventListener('mousemove', this.pointerCursor)
		}
	}
}
</script>

<style scoped>
.banner-style {
	background-position: top;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
}

.about-page {
	padding: 64px;
}

.button-panel {
	width: 100%;
	border: 1px solid transparent;
	padding: 64px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;
}
.button-panel.scroll-cursor {
	cursor: ns-resize;
}
.button-panel:nth-of-type(odd) {
	background: var(--primaryLightest);
}

.button-content {
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
}
.button-content p:lang(zh-cn) {
	margin-top: 12px;
	font-style: italic;
	opacity: 0.95;
}

.button-item {
	width: 50%;
	max-width: 400px;
	margin: 0 16px;
	border: 2px solid transparent;
}
.button-item.image {
	height: 250px;
	background: rgba(65, 105, 91, 0.5); /*var(--vpGreen);*/
}
.button-item img {
	height: 100%;
	width: 100%;
	object-fit: cover;
	mix-blend-mode: luminosity;
	filter: blur(0.5px) grayscale(100%) opacity(0.5);
}
.button-item.desc {
	padding: 16px 32px;
	background: var(--vpGreen);
	color: var(--vpCoolGrey);
}
.button-item.desc * {
	background: transparent;
	color: currentColor;
}
.button-panel:nth-of-type(odd) .button-item.image {
	background: rgba(90, 121, 121, 0.5); /*var(--vpDark);*/
}
.button-panel:nth-of-type(odd) .button-item.desc {
	background: var(--vpDark);
}
.button-panel:nth-of-type(even) div.button-content {
	flex-direction: row-reverse;
}
.button-panel:hover {
	background: var(--bannerGrey);
	/*border-color: var(--vpOrange);*/
}
.button-panel:hover .button-item {
	border-color: var(--vpOrange);
	box-shadow: 5px 5px 10px var(--vpDark);
}
.button-panel:hover .button-item.desc * {
	color: whitesmoke;
}

@media (max-width: 1007px) {
	.about-page,
	.button-panel {
		padding: 32px;
	}
	.button-item {
		margin: 8px;
	}
	.button-item.desc {
		padding: 8px 16px;
	}
}

@media (max-width: 768px) {
	.about-page,
	.button-panel {
		padding: 16px;
	}
	.button-item {
		margin: 4px;
	}
	.button-item.desc {
		padding: 4px 8px;
	}
}
</style>