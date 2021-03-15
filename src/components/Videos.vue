<template>
	<div>
		<Banner class="banner-style" enTitle="Videos"></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					Here are a range of short videos and audio discussions
					highlighting the excellent science and services developed in
					CSSP China. From understanding more about climate issues for
					our urban landscapes, to specific tools and information
					allowing the exploration of future climate threats across
					China, from next season to the coming decades.
				</p>
				<p lang="zh-cn">TODO: Chinese here</p>
			</div>
		</div>
		<div class="selected-page-wrapper">
			<div class="selected-page">
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'cities' }"
					@click="selectPage('cities')"
				>
					<p>City climates</p>
					<p lang="zh-cn">TODO: Chinese</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'findings' }"
					@click="selectPage('findings')"
				>
					<p>Research findings</p>
					<p lang="zh-cn">TODO: Chinese</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'climate' }"
					@click="selectPage('climate')"
				>
					<p>Infrastructure design</p>
					<p lang="zh-cn">TODO: Chinese</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'renewables' }"
					@click="selectPage('renewables')"
				>
					<p>Renewable energy</p>
					<p lang="zh-cn">TODO: Chinese</p>
				</div>
				<div
					class="selected-page-button"
					:class="{ selected: selectedPage == 'audio' }"
					@click="selectPage('audio')"
				>
					<p>Audio discussions</p>
					<p lang="zh-cn">TODO: Chinese</p>
				</div>
			</div>
		</div>
		<div
			id="cities"
			class="video-panel"
			v-show-slide:500:ease-in="selectedPage == 'cities'"
			:class="{ active: activePage.cities }"
			@slide-open-end="activePage.cities = true"
			@slide-close-start="activePage.cities = false"
		>
			<div class="bilingual">
				<p class="text english">
					What is special about city climates? Cities are living
					things, always growing and changing, needing to adapt to the
					needs of their populations and to an ever-changing climate,
					which may threaten the city. These three short clips cover
					the topics of urban climate, climate change resilience for
					city infrastructure and data use for mapping urban areas.
					Available in English and Chinese.
				</p>
				<p class="text chinese" lang="zh-cn">
					TODO: Chinese here
				</p>
			</div>
			<VideoWrapper :videos="cityVideos"></VideoWrapper>
		</div>
		<div
			id="findings"
			class="video-panel"
			v-show-slide:500:ease-in="selectedPage == 'findings'"
			:class="{ active: activePage.findings }"
			@slide-open-end="activePage.findings = true"
			@slide-close-start="activePage.findings = false"
		>
			<div class="bilingual">
				<p class="text english">
					Hear directly from researchers in CSSP China on their
					collaborative UK-China work and the fascinating findings. Dr
					Liang Guo and Dr Nick Klingaman talk about tracing the
					sources of moisture that fall as rain and snow over China.
					Dr Buwen Dong talks about analysing heatwaves in China and
					his predictions for the second half of this century. Videos
					in English with Chinese subtitles available.
				</p>
				<p class="text chinese" lang="zh-cn">
					TODO: Chinese here
				</p>
			</div>
			<VideoWrapper :videos="collaborationVideos"></VideoWrapper>
		</div>
		<div
			id="climate"
			class="video-panel"
			v-show-slide:500:ease-in="selectedPage == 'climate'"
			:class="{ active: activePage.climate }"
			@slide-open-end="activePage.climate = true"
			@slide-close-start="activePage.climate = false"
		>
			<div class="bilingual">
				<p class="text english">
					For those who want to explore their own hands-on
					information, CSSP China has produced practical tools for
					businesses, planners and decision-makers to use directly to
					find out more about the current and future climate. Here are
					three videos summarising three different tools which are
					tailored specifically for infrastructure and cities. Videos
					in English and with Chinese voiceover.
				</p>
				<p class="text chinese" lang="zh-cn">
					TODO: Chinese here
				</p>
			</div>
			<VideoWrapper :videos="toolVideos"></VideoWrapper>
		</div>
		<div
			id="renewables"
			class="video-panel"
			v-show-slide:500:ease-in="selectedPage == 'renewables'"
			:class="{ active: activePage.renewables }"
			@slide-open-end="activePage.renewables = true"
			@slide-close-start="activePage.renewables = false"
		>
			<div class="bilingual">
				<p class="text english">
					Enabling renewable energy systems are at the heart of our
					net-zero future and the climate is a key part of efficient
					and beneficial solutions. Hear about three tools and
					services from scientists and engineers within the CSSP China
					project revealing information on the next season and the
					next decades to help planning and operation. Videos in
					English and with Chinese voiceover.
				</p>
				<p class="text chinese" lang="zh-cn">
					TODO: Chinese here
				</p>
			</div>
			<VideoWrapper :videos="reVideos"></VideoWrapper>
		</div>
		<div
			id="audio"
			class="video-panel"
			v-show-slide:500:ease-in="selectedPage == 'audio'"
			:class="{ active: activePage.audio }"
			@slide-open-end="activePage.audio = true"
			@slide-close-start="activePage.audio = false"
		>
			<div class="bilingual" style="margin-bottom:24px;">
				<p class="text english">
					Audio discussions will live here.
				</p>
				<p class="text chinese" lang="zh-cn">
					TODO: Chinese here
				</p>
			</div>
			<VideoWrapper :videos="audioTracks" audio="true"></VideoWrapper>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'
import VideoWrapper from './VideoWrapper.vue'

export default {
	name: 'Videos',
	components: {
		Banner,
		Gotop,
		VideoWrapper
	},
	data() {
		return {
			selectedPage: 'cities',
			// this is just to allow old active page to darken 
			// and fade before new active page takes its place
			activePage: {
				cities: true,
				findings: false,
				climate: false,
				renewables: false,
				audio: false
			},
			cityVideos: {
				en: [
					{
						id: '',
						title: 'Quick guide to urban climate'
					},
					{
						id: '',
						title: 'Futureproofing cities'
					},
					{
						id: '',
						title: 'Mapping and modelling cities'
					}
				],
				cn: [
					{
						id: '',
						title: 'Quick guide to urban climate'
					},
					{
						id: '',
						title: 'Futureproofing cities'
					},
					{
						id: '',
						title: 'Mapping and modelling cities'
					}
				]
			},
			collaborationVideos: {
				en: [
					{
						id: '',
						title: 'The water accounting tool'
					},
					{
						id: '0WGfTYf0',
						title:
							'The evidence on past, present and future heatwaves in China'
					}
				]
			},
			toolVideos: {
				en: [
					{
						id: '',
						title: 'City packs and urban heat service'
					},
					{
						id: '',
						title: 'Visualising the surface urban heat island'
					},
					{
						id: '',
						title: 'Climate risk assessments for infrastructure'
					}
				],
				cn: [
					{
						id: '',
						title: 'City packs and urban heat service'
					},
					{
						id: '',
						title: 'Visualising the surface urban heat island'
					},
					{
						id: '',
						title: 'Climate risk assessments for infrastructure'
					}
				]
			},
			reVideos: {
				en: [
					{
						id: '',
						title: 'Climate Services for the European Energy Sector'
					},
					{
						id: '',
						title:
							'Seasonal climate prediction, with applications for wind energy and for Yangtze rainfall'
					},
					{
						id: '',
						title:
							'A new energy analytics platform and its utility for expanding the penetration of renewable energy'
					}
				],
				cn: [
					{
						id: '',
						title: 'Climate Services for the European Energy Sector'
					},
					{
						id: '',
						title:
							'Seasonal climate prediction, with applications for wind energy and for Yangtze rainfall'
					},
					{
						id: '',
						title:
							'A new energy analytics platform and its utility for expanding the penetration of renewable energy'
					}
				]
			},
			audioTracks: {
				en: [
					{
						id: '',
						title: 'Audiocast'
					}
				]
			}
		}
	},
	methods: {
		selectPage(page) {
			this.selectedPage = page
		},
		resized() {
			// JWPlayer suggests 640 by 360 soooo...
			const oldWidth = document.documentElement.style.getPropertyValue(
				'--iframeWidth'
			)
			let width = window.innerWidth // default
			// use panel width and deduct any padding (width/padding can vary with screen width)
			const panel = document.getElementsByClassName('video-panel')
			if (panel.length) {
				const style = window.getComputedStyle(panel[0])
				width =
					parseInt(style.width) -
					(parseInt(style.paddingLeft) + parseInt(style.paddingRight))
			}
			// determine margin, border and padding for the .video divs
			const video = document.getElementsByClassName('video')
			let perVideo = 0
			if (video.length) {
				const style = window.getComputedStyle(video[0])
				perVideo =
					parseInt(style.marginLeft) +
					parseInt(style.borderLeftWidth) +
					parseInt(style.paddingLeft) +
					parseInt(style.paddingRight) +
					parseInt(style.borderRightWidth) +
					parseInt(style.marginRight)
			}
			// use @media max-width rule that converts .video-wrapper
			// from row to column
			if (window.matchMedia('(max-width: 1007px)').matches) {
				// flex-direction: column so just one column
				// width just needs to deduct air around 1 video
				width = width - perVideo
			} else {
				// flex-direction: row so two columns
				// width needs to deduct air around 2 videos and return half the total
				width = Math.floor((width - 2 * perVideo) / 2)
			}
			if (width > 640) {
				width = 640
			}
			if (!oldWidth || width != parseInt(oldWidth)) {
				document.documentElement.style.setProperty(
					'--iframeWidth',
					`${width}px`
				)
				document.documentElement.style.setProperty(
					'--iframeHeight',
					`${Math.floor((width / 16) * 9)}px`
				)
				// and set the src to itself again to force a refresh
				this.$nextTick(() => {
					const iframes = document.getElementsByTagName('iframe')
					for (let i = 0; i < iframes.length; i++) {
						const src = iframes[i].src
						if (src) {
							iframes[i].src = src
						}
					}
				})
			}
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		window.addEventListener('resize', this.resized)
		window.addEventListener('orientationchange', this.resized)
		this.$nextTick(() => {
			this.resized() /* reset size of video immediately on loading */
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resized)
		window.removeEventListener('orientationchange', this.resized)
	}
}
</script>

<style scoped>
.banner-style {
	background-image: url('../assets/images/videos.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
}

.selected-page-wrapper {
	width: 100%;
	background: var(--vpDark);
}

.selected-page {
	max-width: 1358px;
	margin: 0 auto;
	padding: 0 64px;
	display: flex;
	flex-direction: row;
	background: transparent;
}

.selected-page-button {
	margin-right: 32px;
	padding: 8px 0;
	background: transparent;
}
.selected-page-button:last-of-type {
	margin-right: 0;
}
.selected-page-button p {
	background: transparent;
	color: var(--whiteDisabled);
}
.selected-page-button.selected p {
	color: var(--whiteDefault);
}
.selected-page-button:not(disabled):not(.selected):hover p {
	color: var(--whiteHover);
}
.selected-page-button:not(disabled) {
	cursor: pointer;
}

.video-panel {
	width: 100%;
	margin: 0 auto;
	padding: 0 64px;
	background: var(--primaryLightest);
	opacity: 0.6;
	transition: background 0.3s ease-in-out, opacity 0.1s ease-in-out;
}
.video-panel.active {
	background: var(--vpCoolGrey);
	opacity: 1;
}
.video-panel * {
	background: transparent;
}

p.text {
	max-width: 1358px;
	margin: 0 auto;
	padding: 32px 64px 0 64px;
}

@media (max-width: 1007px) {
	.about-page p {
		margin-bottom: 12px;
	}
	.selected-page {
		padding: 0 32px;
	}
	.video-panel {
		padding: 0 16px;
	}
	p.text {
		padding: 16px 32px 0 32px;
	}
}
@media (max-width: 640px) {
	.about-page p {
		margin-bottom: 8px;
	}
	.selected-page {
		padding: 0 16px;
	}
	.video-panel {
		padding: 0 8px;
	}
	p.text {
		padding: 8px 16px 0 16px;
	}
}
@media (max-width: 640px) { /* TODO width TBC */
	.selected-page {
		flex-direction: column;
	}
	.selected-page-button {
		display: flex;
		flex-direction: row;
		padding: 4px 8px 4px 0;
	}
	.selected-page-button:first-of-type {
		padding-top: 8px;
	}
	.selected-page-button:last-of-type {
		padding-bottom: 8px;
	}
	.selected-page-button p {
		margin-right: 8px;
	}
}
@media (max-width: 520px) {
	.selected-page {
		padding: 0 8px;
	}
	p.text {
		padding: 8px;
	}
}
</style>
