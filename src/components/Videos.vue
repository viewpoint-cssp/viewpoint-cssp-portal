<template>
	<div>
		<Banner class="banner-style" enTitle="Videos"></Banner>
		<div class="about-page">
			<h2>About the videos</h2>
			<hr />
			<p>
				Here are a range of short videos highlighting the excellent
				science and services developed in CSSP China. From understanding
				more about climate issues for our urban landscapes, to specific
				tools and information allowing the exploration of future climate
				threats across China, from next season to the coming decades.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
		</div>
		<div class="selected-page-wrapper">
		<div class="selected-page">
			<div
				class="selected-page-button"
				:class="{ selected: selectedPage == 'cities' }"
				@click="selectPage('cities')"
			>
				<p>City climates</p>
				<p lang="zh-cn">TODO: Mandarin</p>
			</div>
			<div
				class="selected-page-button"
				:class="{ selected: selectedPage == 'findings' }"
				@click="selectPage('findings')"
			>
				<p>Research findings</p>
				<p lang="zh-cn">TODO: Mandarin</p>
			</div>
			<div
				class="selected-page-button"
				:class="{ selected: selectedPage == 'climate' }"
				@click="selectPage('climate')"
			>
				<p>Climate tools</p>
				<p lang="zh-cn">TODO: Mandarin</p>
			</div>
			<div
				class="selected-page-button"
				:class="{ selected: selectedPage == 'renewables' }"
				@click="selectPage('renewables')"
			>
				<p>Renewable energy tools</p>
				<p lang="zh-cn">TODO: Mandarin</p>
			</div>
		</div>
		</div>
		<div
			id="cities"
			class="video-panel"
			v-show-slide:500:ease-in-out="selectedPage == 'cities'"
		>
			<p class="text english">
				What is special about city climates? Cities are living things,
				always growing and changing, needing to adapt to the needs of
				their populations and to an ever-changing climate, which may
				threaten the city. These three short clips cover the topics of
				urban climate, climate change resilience for city infrastructure
				and data use for mapping urban areas.
			</p>
			<p class="text mandarin" lang="zh-cn">
				TODO: Mandarin here?
			</p>
			<div class="video-wrapper">
				<div
					v-for="lang in Object.keys(cityVideos)"
					:key="`city-${lang}`"
					class="video-column"
					:class="{ english: lang == 'en', mandarin: lang == 'cn' }"
				>
					<div
						class="video"
						v-for="(video, i) in cityVideos[lang]"
						:key="`city-${lang}-${i}`"
					>
						<iframe
							:src="setSrc(video.id, video.altId)"
							:title="video.title"
							:data-id="video.id"
							:data-alt-id="video.altId"
							frameborder="0"
							scrolling="auto"
							allowfullscreen
							v-if="video.id || video.altId"
						></iframe>
						<div class="no-video" v-else>
							<h2 :lang="lang == 'cn' ? 'zh-cn' : ''">
								{{ video.title }}
							</h2>
							<p class="watermark">
								<font-awesome-icon
									icon="video-slash"
								></font-awesome-icon>
								No video
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			id="findings"
			class="video-panel"
			v-show-slide:500:ease-in-out="selectedPage == 'findings'"
		>
			<p class="text english">
				Hear directly from researchers in CSSP China on their
				collaborative UK-China work and the fascinating findings. Dr
				Liang Guo and Dr Nick Klingaman talk about tracing the sources
				of moisture that fall as rain and snow over China. Dr Buwen Dong
				talks about analysing heatwaves in China and his predictions for
				the second half of this century.
			</p>
			<p class="text mandarin" lang="zh-cn">
				TODO: Mandarin here?
			</p>
			<div class="video-wrapper">
				<div
					v-for="lang in Object.keys(collaborationVideos)"
					:key="`coll-${lang}`"
					class="video-column"
					:class="{ english: lang == 'en', mandarin: lang == 'cn' }"
				>
					<div
						class="video"
						v-for="(video, i) in collaborationVideos[lang]"
						:key="`coll-${lang}-${i}`"
					>
						<iframe
							:src="setSrc(video.id, video.altId)"
							:title="video.title"
							:data-id="video.id"
							:data-alt-id="video.altId"
							frameborder="0"
							scrolling="auto"
							allowfullscreen
							v-if="video.id || video.altId"
						></iframe>
						<div class="no-video" v-else>
							<h2 :lang="lang == 'cn' ? 'zh-cn' : ''">
								{{ video.title }}
							</h2>
							<p class="watermark">
								<font-awesome-icon
									icon="video-slash"
								></font-awesome-icon>
								No video
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			id="climate"
			class="video-panel"
			v-show-slide:500:ease-in-out="selectedPage == 'climate'"
		>
			<p class="text english">
				For those who want to explore their own hands-on information,
				CSSP China has produced practical tools for businesses, planners
				and decision-makers to use directly to find out more about the
				current and future climate. Here are three videos summarising
				three different tools which are tailored specifically for
				infrastructure and cities.
			</p>
			<p class="text mandarin" lang="zh-cn">
				TODO: Mandarin here?
			</p>
			<div class="video-wrapper">
				<div
					v-for="lang in Object.keys(toolVideos)"
					:key="`tool-${lang}`"
					class="video-column"
					:class="{ english: lang == 'en', mandarin: lang == 'cn' }"
				>
					<div
						class="video"
						v-for="(video, i) in toolVideos[lang]"
						:key="`tool-${lang}-${i}`"
					>
						<iframe
							:src="setSrc(video.id, video.altId)"
							:title="video.title"
							:data-id="video.id"
							:data-alt-id="video.altId"
							frameborder="0"
							scrolling="auto"
							allowfullscreen
							v-if="video.id || video.altId"
						></iframe>
						<div class="no-video" v-else>
							<h2 :lang="lang == 'cn' ? 'zh-cn' : ''">
								{{ video.title }}
							</h2>
							<p class="watermark">
								<font-awesome-icon
									icon="video-slash"
								></font-awesome-icon>
								No video
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			id="renewables"
			class="video-panel"
			v-show-slide:500:ease-in-out="selectedPage == 'renewables'"
		>
			<p class="text english">
				Enabling renewable energy systems are at the heart of our
				net-zero future and the climate is a key part of efficient and
				beneficial solutions. Hear about three tools and services from
				scientists and engineers within the CSSP China project revealing
				information on the next season and the next decades to help
				planning and operation.
			</p>
			<p class="text mandarin" lang="zh-cn">
				TODO: Mandarin here?
			</p>
			<div class="video-wrapper">
				<div
					v-for="lang in Object.keys(reVideos)"
					:key="`re-${lang}`"
					class="video-column"
					:class="{ english: lang == 'en', mandarin: lang == 'cn' }"
				>
					<div
						class="video"
						v-for="(video, i) in reVideos[lang]"
						:key="`re-${lang}-${i}`"
					>
						<iframe
							:src="setSrc(video.id, video.altId)"
							:title="video.title"
							:data-id="video.id"
							:data-alt-id="video.altId"
							frameborder="0"
							scrolling="auto"
							allowfullscreen
							v-if="video.id || video.altId"
						></iframe>
						<div class="no-video" v-else>
							<h2 :lang="lang == 'cn' ? 'zh-cn' : ''">
								{{ video.title }}
							</h2>
							<p class="watermark">
								<font-awesome-icon
									icon="video-slash"
								></font-awesome-icon>
								No video
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'

export default {
	name: 'Videos',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			altId: false,
			selectedPage: 'cities',
			zIndex: 1,
			cityVideos: {
				en: [
					{
						id: '',
						altId: '',
						title: 'Quick guide to urban climate'
					},
					{
						id: '',
						altId: '',
						title: 'Futureproofing cities'
					},
					{
						id: '',
						altId: '',
						title: 'Mapping and modelling cities'
					}
				],
				cn: [
					{
						id: '',
						altId: '',
						title: 'Quick guide to urban climate'
					},
					{
						id: '',
						altId: '',
						title: 'Futureproofing cities'
					},
					{
						id: '',
						altId: '',
						title: 'Mapping and modelling cities'
					}
				]
			},
			collaborationVideos: {
				en: [
					{
						id: '',
						altId: '',
						title: 'The water accounting tool'
					},
					{
						id: '0WGfTYf0',
						altId: 'Vv6fBT2P',
						title:
							'The evidence on past, present and future heatwaves in China'
					}
				]
			},
			toolVideos: {
				en: [
					{
						id: '',
						altId: '',
						title: 'City packs and urban heat service'
					},
					{
						id: '',
						altId: '',
						title: 'Visualising the surface urban heat island'
					},
					{
						id: '',
						altId: '',
						title: 'Climate risk assessments for infrastructure'
					}
				],
				cn: [
					{
						id: '',
						altId: '',
						title: 'City packs and urban heat service'
					},
					{
						id: '',
						altId: '',
						title: 'Visualising the surface urban heat island'
					},
					{
						id: '',
						altId: '',
						title: 'Climate risk assessments for infrastructure'
					}
				]
			},
			reVideos: {
				en: [
					{
						id: '',
						altId: '',
						title:
							'Seasonal forecasts for the Yangtze and wind farms'
					},
					{
						id: '',
						altId: '',
						title: 'Met Office example for renewables'
					},
					{
						id: '',
						altId: '',
						title: 'RE-SAT'
					}
				],
				cn: [
					{
						id: '',
						altId: '',
						title:
							'Seasonal forecasts for the Yangtze and wind farms'
					},
					{
						id: '',
						altId: '',
						title: 'Met Office example for renewables'
					},
					{
						id: '',
						altId: '',
						title: 'RE-SAT'
					}
				]
			}
		}
	},
	watch: {
		altId() {
			const iframes = document.getElementsByTagName('iframe')
			for (let i = 0; i < iframes.length; i++) {
				const src = this.setSrc(
					iframes[i].attributes['data-id'],
					iframes[i].attributes['data-alt-id']
				)
				if (src) {
					iframes[i].src = src
				}
			}
		}
	},
	methods: {
		setSrc(id, altId) {
			// set the source video depending on whether normal or altId mode is selected
			const video = this.altId && altId ? altId : id
			return `https://cdn.jwplayer.com/players/${video}-NocosEfA.html`
		},
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
	border: 2px solid var(--vpCoolGrey);
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
.selected-page-button p:lang(zh-cn) {
	font-style: italic;
	opacity: 0.95;
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
}
.video-panel:nth-of-type(odd) {
	background: var(--primaryLightest);
}
.video-panel * {
	background: transparent;
}

p.text {
	max-width: 1358px;
	margin: 0 auto;
	padding: 0 64px;
}
p.text.english {
	margin-top: 32px;
}
p.text:lang(zh-cn) {
	margin-top: 12px;
	font-style: italic;
	opacity: 0.95;
}

.video-wrapper {
	width: 100%;
	margin: 24px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: flex-start;
}

.video-column {
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.video {
	border: 1px solid var(--vpDark);
	margin: 2px;
	padding: 10px;
}

/* both need border to and .no-video needs addition margin-bottom to 'fix' 
   problem with .video height for .no-video not matching that for iframe! */
iframe,
.no-video {
	width: var(--iframeWidth);
	height: var(--iframeHeight);
	border: 2px solid transparent;
}

.no-video {
	margin-bottom: 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}

.no-video p.watermark {
	font-size: 64px;
	font-weight: bold;
	letter-spacing: 8px;
	opacity: 0.1;
}

@media (max-width: 1007px) {
	.selected-page  {
		padding: 0 32px;
	}
	.video-panel,
	div.text {
		padding: 16px 32px;
	}
	.video-wrapper {
		flex-direction: column;
	}
	.video-column {
		width: 100%;
	}
}
@media (max-width: 640px) {
	.selected-page  {
		padding: 0 16px;
	}
	.video-panel,
	div.text {
		padding: 8px 16px;
	}
	.no-video p.watermark {
		letter-spacing: normal;
	}
}
@media (max-width: 520px) {
	.selected-page  {
		padding: 0 8px;
	}
	.video-panel,
	div.text {
		padding: 8px;
	}
}
</style>
