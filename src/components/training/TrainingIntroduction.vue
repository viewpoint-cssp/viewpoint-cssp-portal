<template>
	<div>
		<h1>Introduction</h1>
		<p>
			There are three key resources available for help with using UMEP.
			Workshop materials, tutorials and videos to allow you to follow
			along. All of these are complimentary and have been organised to
			streamline your user experience. The example data is available in
			the tutorials.
			<a
				href="https://umep-docs.readthedocs.io/en/latest/Introduction.html"
				target="_blank" rel="noopener noreferrer"
				class="nowrap"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				A detailed introduction to UMEP</a
			>
			and associated projects is available at the UMEP website.
		</p>
		<p>
			If you are familiar with Python and already have Python installed,
			skip to the section to install
			<span class="goto nowrap" @click="$emit('skipTo', 'TrainingQgis')">
				<font-awesome-icon icon="forward"></font-awesome-icon>&nbsp;
				<strong>QGIS and UMEP</strong></span
			>.
		</p>
		<p>
			If you have UMEP installed and are ready to go, skip to the
			<span class="goto nowrap" @click="$emit('skipTo', 'TrainingFirstSteps')">
				<font-awesome-icon icon="forward"></font-awesome-icon>&nbsp;
				<strong>First Steps</strong></span
			>
			section.
		</p>
		<p>
			UMEP is a powerful tool and opens up a world of possibilities for
			manipulating urban data. For a full list of the available tutorials
			including Energy, Water and radiation fluxes for one location, Mean
			radiation temperature modelling in complex urban settings, and other
			things, please see the
			<a
				href="https://umep-docs.readthedocs.io/projects/tutorial/en/latest/index.html"
				target="_blank" rel="noopener noreferrer"
				class="nowrap"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				UMEP tutorial</a
			>. A few detailed examples are provided here, along with
			installation instructions. For more information, see the linked
			pages.
		</p>
	</div>
</template>

<script>
export default {
	name: 'Introduction'
}
</script>

<style scoped></style>
