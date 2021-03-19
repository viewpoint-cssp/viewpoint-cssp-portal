<template>
	<div
		class="selection-panel"
		:disabled="page.disabled"
		@click="$emit('goTo', page.pageName)"
	>
		<div class="selection-content">
			<div class="selection-item desc">
				<h3>{{ page.enTitle }}</h3>
				<p>{{ page.enDesc }}</p>
				<h3 lang="zh-cn">{{ page.cnTitle }}</h3>
				<p lang="zh-cn">{{ page.cnDesc }}</p>
			</div>
			<div class="selection-item image">
				<img
					:src="require(`../assets/images/${page.imageName}`)"
					:class="{ color: color }"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SelectionPanel',
	props: {
		page: Object,
		color: Boolean
	}
}
</script>

<style scoped>
.selection-panel {
	width: 100%;
	max-width: var(--widthLimit);
	margin: 0 auto;
	border: 1px solid transparent;
	border-right-color: var(--primaryLightest);
	border-left-color: var(--primaryLightest);
	padding: 64px;
	transition: background 0.2s ease-in-out;
}
.selection-panel:not([disabled]) {
	cursor: pointer;
}
.selection-panel.scroll-cursor {
	cursor: ns-resize;
}
.selection-panel:nth-of-type(odd) {
	background: var(--primaryLightest);
}
.selection-panel:nth-of-type(odd) div.selection-content {
	flex-direction: row-reverse;
}

.selection-content {
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
}
.selection-content p:lang(zh-cn) {
	margin-top: 12px;
}

.selection-item {
	max-width: 500px;
	margin: 0 16px;
	border: 2px solid transparent;
}
.selection-item.image {
	max-width: 400px;
	flex: 2 2 40%;
	background: rgba(65, 105, 91, 0.5); /*var(--vpGreen);*/
}
.selection-item img {
	height: 100%;
	width: 100%;
	object-fit: cover;
	opacity: 0.7;
}
.selection-item img:not(.color) {
	opacity: 1;
	mix-blend-mode: luminosity;
	filter: blur(0.5px) grayscale(100%) opacity(0.5);
	border-color: var(--vpGreen);
}
.selection-item.desc {
	flex: 3 3 60%;
	padding: 16px 32px;
	background: var(--vpGreen);
	color: var(--vpCoolGrey);
}
.selection-item.desc * {
	background: transparent;
	color: currentColor;
}

.selection-panel:nth-of-type(odd) .selection-item.desc {
	background: var(--vpDark);
}
.selection-panel:nth-of-type(odd) .selection-item.image {
	background: var(--vpDarkImage);
}
.selection-panel:not([disabled]):hover {
	background: var(--bannerGrey);
}
.selection-panel:not([disabled]):hover .selection-item {
	border-color: var(--vpOrange) !important;
	box-shadow: 5px 5px 10px var(--vpDark);
}
.selection-panel:not([disabled]):hover .selection-item.desc * {
	color: whitesmoke;
}

/* for zooming image on hover * /
.selection-item.image {
	position: relative;
	overflow: hidden;
}
.selection-item.image img {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
	transition: width 0.3s ease-in-out 0s;
	transition-property: width;
}
.selection-panel:hover .selection-item.image img {
	width: 110%;
}
/* end of styling to zoom on hover */

@media (max-width: 1007px) {
	.selection-panel {
		padding: 32px;
	}
	.selection-item {
		margin: 8px;
	}
	/*.selection-item.image {
		height: auto;
	}
	.selection-item img {
		object-fit: contain;
	}*/
	.selection-item.desc {
		padding: 8px 16px;
	}
}

@media (max-width: 768px) {
	.selection-panel {
		padding: 16px;
	}
	.selection-item {
		margin: 4px;
	}
	.selection-item.desc {
		padding: 4px 8px;
	}
}
</style>