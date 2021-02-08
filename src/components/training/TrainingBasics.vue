<template>
	<div>
		<h1>Basics of QGIS and UMEP</h1>
		<p>
			This covers the basics of QGIS: vector data and coordinates as well as an
			introduction to digital surface models (DSM) using data from the
			tutorial in the previous
			<span class="goto" @click="$emit('skipTo', 'TrainingFirstSteps')">
				<font-awesome-icon icon="backward"></font-awesome-icon>&nbsp;
				<strong>First Steps</strong></span
			> section.
			<a
				href="https://www.youtube.com/watch?v=69sbn95sucI&amp;list=PLShSKbdF7w3339RUz3_5RtYwYOWuYfOzy&amp;index=4"
				target="_blank" rel="noopener noreferrer"
			>
				<img class="youtube" src="../../assets/images/training-4.png" alt="YouTube video" />
			</a>
		</p>
	</div>
</template>

<script>
export default {
	name: 'Basics'
}
</script>

<style scoped></style>
