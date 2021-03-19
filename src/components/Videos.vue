<template>
	<div>
		<Banner class="banner-style" enTitle="Videos" cnTitle="视频"></Banner>
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
				<p lang="zh-cn">以下是一系列短视频和音频讨论，它们着重突出气候科学支持服务伙伴关系(CSSP)计划中国项目中的卓越科学和服务成就。从城市环境中出现的气候问题，到特定的工具和信息，这些都帮助我们探索未来中国从下一季到未来几十年的气候威胁。</p>
			</div>
		</div>
		<div class="selected-page-wrapper">
			<div class="selected-page">
				<div
					v-for="page in pages"
					:key="`select-${page.name}`"
					class="selected-page-button"
					:class="{ selected: selectedPage == page.name }"
					@click="selectPage(page.name)"
				>
					<p>{{ page.enLabel }}</p>
					<p lang="zh-cn">{{ page.cnLabel }}</p>
				</div>
			</div>
		</div>
		<div
			v-for="page in pages"
			:key="`page-${page.name}`"
			:id="page.name"
			class="video-panel"
			v-show-slide:500:ease-in="selectedPage == page.name"
			:class="{ active: activePage[page.name] }"
			@slide-open-end="activePage[page.name] = true"
			@slide-close-start="activePage[page.name] = false"
		>
			<div class="bilingual">
				<p class="text english">{{ page.enText }}</p>
				<p class="text chinese" lang="zh-cn">
					{{ page.cnText }}
				</p>
			</div>
			<div class="video-wrapper">
				<div
					v-for="lang in Object.keys(page.videos)"
					:key="`city-${lang}`"
					class="video-column"
					:class="{ english: lang == 'en', chinese: lang == 'cn' }"
				>
					<div
						class="video"
						v-for="(video, i) in page.videos[lang]"
						:key="`city-${lang}-${i}`"
					>
						<iframe
							:src="
								`https://cdn.jwplayer.com/players/${video.id}-NocosEfA.html`
							"
							:title="video.title"
							:data-id="video.id"
							frameborder="0"
							scrolling="auto"
							allowfullscreen
							v-if="video.id"
						></iframe>
						<div class="no-video" v-else>
							<h2 :lang="lang == 'cn' ? 'zh-cn' : ''">
								{{ video.title }}
							</h2>
							<p class="watermark" v-if="page.audio">
								<font-awesome-icon
									icon="microphone-slash"
								></font-awesome-icon>
								No audio
							</p>
							<p class="watermark" v-else>
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
import { videoPages } from '../js/videos.js'

export default {
	name: 'Videos',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pages: [], // will be populated from videos.js when created
			selectedPage: 'cities',
			// this is just to allow old active page to darken
			// and fade before new active page takes its place
			activePage: {
				cities: true,
				findings: false,
				climate: false,
				renewables: false,
				audio: false
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
	created() {
		this.pages = videoPages // in videos.js
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
	max-width: var(--widthLimit);
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
	max-width: var(--widthLimit);
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
	max-width: var(--widthLimit);
	margin: 0 auto;
	padding: 32px 64px 0 64px;
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

.no-video h2 {
	text-align: center;
}

.no-video p.watermark {
	font-size: 64px;
	font-weight: bold;
	letter-spacing: 8px;
	opacity: 0.1;
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
	.video-wrapper {
		flex-direction: column;
		margin-top: 8px;
	}
	.video-column {
		width: 100%;
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
	.video-wrapper {
		margin-top: 4px;
	}
	.no-video p.watermark {
		letter-spacing: normal;
	}
}
@media (max-width: 640px) {
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
