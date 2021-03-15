<template>
	<div class="video-wrapper">
		<div
			v-for="lang in Object.keys(videos)"
			:key="`city-${lang}`"
			class="video-column"
			:class="{ english: lang == 'en', chinese: lang == 'cn' }"
		>
			<div
				class="video"
				v-for="(video, i) in videos[lang]"
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
					<p class="watermark" v-if="audio">
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
</template>

<script>
export default {
	name: 'VideoWrapper',
	props: {
		videos: Object,
		audio: String // can be passed as "true"
	}
}
</script>

<style scoped>
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
	.video-wrapper {
		flex-direction: column;
		margin-top: 8px;
	}
	.video-column {
		width: 100%;
	}
}
@media (max-width: 640px) {
	.video-wrapper {
		margin-top: 4px;
	}
	.no-video p.watermark {
		letter-spacing: normal;
	}
}
</style>