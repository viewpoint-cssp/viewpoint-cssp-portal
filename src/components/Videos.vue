<template>
	<div>
		<Banner class="banner-style" enTitle="Videos"></Banner>
		<div class="about-page">
			<h2>About the videos</h2>
			<hr />
			<p>
				TODO: This paragraph should be a nice description about the
				videos but, for the moment, this page is just to prove we can
				embed JWPlayer videos into the page.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
			<div
				style="max-width:640px;margin:0 auto;border:1px solid var(--text);padding:4px 8px;"
			>
				<div class="exclamation">!</div>
				<p style="display:inline;">
					There's a couple of things to note:
				</p>
				<ul>
					<li>
						The image is the <strong>thumbnail</strong> that I think
						is generated automatically when the video is uploaded
						but we can change those thumbnails. As it stands, these
						seem to be a bit dark.
					</li>
					<li>
						When you right-click you get an
						<strong>&quot;About this video&quot;</strong> option
						which shows the title and duration. This <i>might</i> be
						able to contain any edited title and description we put
						against the video - but I couldn't get that to work
						(maybe I just didn't give it a chance to refresh
						properly). However, if it is simply showing the title of
						the uploaded .mp4, we need to be careful (and
						consistent) in our <strong>file names</strong>.
					</li>
				</ul>
			</div>
		</div>
		<div class="video-wrapper">
			<div class="video" v-for="(video, i) in videos" :key="i">
				<h2>Test of &quot;{{ video.title }}&quot;</h2>
				<iframe
					:src="setSrc(video.id)"
					:title="video.title"
					frameborder="0"
					scrolling="auto"
					allowfullscreen
				></iframe>
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
			videos: [
				{
					id: 'Vv6fBT2P',
					title: 'Buwen Heatwaves 02 Chn Sub V2 HQ'
				},
				{
					id: '0WGfTYf0',
					title: 'Buwen Heatwaves 02 Chn Sub V2 Social'
				}
			]
		}
	},
	methods: {
		setSrc(id) {
			return `https://cdn.jwplayer.com/players/${id}-NocosEfA.html`
		},
		resized() {
			// JWPlayer suggests 640 by 360 soooo...
			const oldWidth = document.documentElement.style.getPropertyValue(
				'--iframeWidth'
			)
			const width = Math.min(640, window.innerWidth - 20)
			if (width != oldWidth) {
				document.documentElement.style.setProperty(
					'--iframeWidth',
					`${width}px`
				)
				document.documentElement.style.setProperty(
					'--iframeHeight',
					`${Math.floor((width / 16) * 9)}px`
				)
				// and set the src to itself again to force a refresh
				const iframes = document.getElementsByTagName('iframe')
				for (let i = 0; i < iframes.length; i++) {
					iframes[i].src = this.setSrc(this.videos[i].id)
				}
			}
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		this.resized() /* reset size of video immediately on loading */
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

.exclamation {
	display: inline-block;
	width: 24px;
	height: 24px;
	border-radius: 12px;
	background: var(--vpOrange);
	color: white;
	font-weight: bold;
	text-align: center;
}

.video-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}

.video {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 0 auto 32px auto;
}

iframe {
	width: var(--iframeWidth);
	height: var(--iframeHeight);
}
</style>
