<template>
	<div>
		<h1>Background</h1>
		<p>
			The UMEP workshop website holds much additional information: 
		</p>
		<p>
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/BackGroundMet/BGM0.html"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				Introductory material for the meteorological terms used</a
			>
		</p>
		<p>
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/BackGroundEval/BGE0.html"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				Introductory material on the benchmark system for evaluating the
				model performance with observations and differences between
				model versions (for checking developments)</a
			>
		</p>
		<p>
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/BackGroundMet/BGM1.html"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				A glossary of terms used</a
			>
		</p>
		<hr />
		<p>
			You may like to view these urban animations before continuing.  
			They can also be found on the 
			<span class="goto nowrap" @click="$router.push('videos')">
				<font-awesome-icon
					icon="link"
				></font-awesome-icon>
				<strong>Videos</strong></span
			> page.
			<Toggle
				class="language"
				v-model="inEnglish"
				onImage="en-flag.png"
				offImage="cn-flag.png"
				width="82"
			></Toggle>
		</p>
		<p v-for="(video, i) of videos" :key="`${language}-${i}`">
			<iframe
				:src="`https://cdn.jwplayer.com/players/${video.id}-NocosEfA.html`"
				:title="video.title"
				:data-id="video.id"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
			></iframe>
		</p>
	</div>
</template>

<script>
import { videoPages } from '../../js/videos.js'
import Toggle from '../Toggle.vue'

export default {
	name: 'Background',
	components: {
		Toggle
	},
	data() {
		return {
			videos: [],
			inEnglish: true
		}
	},
	computed: {
		language() {
			return this.inEnglish ? 'en' : 'cn'
		}
	},
	watch: {
		language() {
			this.videos = videoPages[0].videos[this.language]
		}
	},
	created() {
		this.videos = videoPages[0].videos[this.language] // in videos.js
	},
	mounted() {
		this.$emit('resizePlayer')
	}
}
</script>

<style scoped>
span.goto {
	cursor: pointer;
}
span.goto:hover,
span.goto:hover strong,
span.goto:hover svg path {
	color: var(--vpOrange);
}

.fa-link {
	font-size: 0.9rem;
	margin-right: 0.1rem;
	transform: translateY(-0.1rem);
}

p.boxed {
	display: flex;
	flex-direction: row;
	align-items: center;
}

div.language {
	float: right;
	margin: 8px 0;
	font-size: 0.8rem;
}

.language >>> img {
	height: 25px;
	clip-path: inset(15% 0 10% 0);
}
</style>
