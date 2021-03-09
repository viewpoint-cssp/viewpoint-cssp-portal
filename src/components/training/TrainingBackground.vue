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
		<p class="boxed" v-if="noVideos" >
			<font-awesome-icon icon="video"></font-awesome-icon>
			<span>
				You may like to view the urban animations on the 
				<span class="goto nowrap" @click="$router.push('videos')">
					<font-awesome-icon
						icon="link"
					></font-awesome-icon>
					<strong>Videos and audiocasts</strong></span
				> page before continuing.
			</span>
		</p>
		<hr v-if="!noVideos" />
		<p v-if="!noVideos">
			You may like to view these urban animations before continuing.  
			They can also be found on the 
			<span class="goto nowrap" @click="$router.push('videos')">
				<font-awesome-icon
					icon="link"
				></font-awesome-icon>
				<strong>Videos and audiocasts</strong></span
			> page.
		</p>
		<p v-for="(video, i) of videos" :key="i">
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
		</p>
	</div>
</template>

<script>
export default {
	name: 'Background',
	props: {
		altId: Boolean
	},
	data() {
		return {
			videos: [
				{ id: '', altId: '', title: 'Quick guide to urban climate' },
				{ id: '', altId: '', title: 'Futureproofing cities' },
				{ id: '', altId: '', title: 'Mapping and modelling cities' }
			]
		}
	},
	computed: {
		noVideos() {
			return this.videos.filter(a => a.id || a.altId).length == 0
		}
	},
	methods: {
		setSrc(id, altId) {
			// set the source video depending on whether normal or altId mode is selected
			const video = this.altId && altId ? altId : id
			return `https://cdn.jwplayer.com/players/${video}-NocosEfA.html`
		}
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

.fa-video {
	font-size: 32px;
	margin-right: 12px;
}

</style>
