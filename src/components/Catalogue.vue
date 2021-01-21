<template>
	<div class='placeholder'>
		This is a placeholder for the catalogue of papers
	</div>
</template>

<script>
export default {
	name: 'Catalogue'
}
</script>

<style scoped>
.placeholder {
	background-image: url('../assets/catalogue.jpg');
	background-size: cover;
	background-blend-mode: soft-light;
	width: 100%;
	height: calc(100vh - 92px); /* nav is 41px footer is 51px */
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
</style>