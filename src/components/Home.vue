<template>
	<div>
		<Banner
			enTitle="A showcase for the Climate Science for Service Partnership with China"
		></Banner>
		<div class="about">
			<h2>VIEWpoint and CSSP China</h2>
			<hr />
			<p>
				The VIEWpoint project seeks to maximise the impact of the
				world-class collaborative scientific research of the
				<a
					href="https://www.metoffice.gov.uk/research/approach/collaboration/newton/cssp-china/index"
					target="_blank" rel="noopener noreferrer"
				>CSSP China</a>
				(Climate Science for Service Partnership China) programme.
				VIEWpoint has created tools, demonstrators, articles and videos
				to make research outputs more accessible to a wider audience,
				including government, industry and the public.
			</p>
			<p>
				<span lang="zh-cn">“新观点”</span> (VIEWpoint)
				<span lang="zh-cn">
					项目旨在最大化地发挥“中英气候科学到服务伙伴关系计划”
				</span>
				(CSSP China: Climate Science for Service Partnership China)
				<span lang="zh-cn">
					的世界级科研合作的影响力。通过创建工具、演示、文章和视频，“新观点”项目让包括政府、企业和公众等在内的不同群体更易获得研究成果。
				</span>
			</p>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'About')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/about.png" />
				<div class="button-item">
					<h3>About VIEWpoint</h3>
					<p>
						TODO: Short summary here?.
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Catalogue')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/catalogue.jpg" />
				<div class="button-item">
					<h3>Catalogue of CSSP China Papers</h3>
					<p>
						All 300+ journal papers published through CSSP China
						have been organised into a searchable catalogue,
						organised by theme.
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Demonstrators')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/demonstrators.jpg" />
				<div class="button-item">
					<h3>Demonstrators</h3>
					<p>
						TODO: Online demonstrators of CSSP China projects, including
						...
					</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
		<div class="button-panel" @click="$emit('goTo', 'Training')">
			<div class="button-content">
				<img class="button-item" src="../assets/images/training.jpg" />
				<div class="button-item">
					<h3>Training materials</h3>
					<p>TODO: Lots of lovely things to learn.</p>
					<p lang="zh-cn">TODO: Mandarin here?</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Banner from './Banner.vue'

export default {
	name: 'Home',
	components: {
		Banner
	}
}
</script>

<style scoped>
.about {
	padding: 64px;
}
.about hr {
	margin-bottom: 32px;
}
.about p {
	margin-bottom: 16px;
}
.about a:hover {
	color: var(--vpOrange);
}

.button-panel {
	width: 100%;
	border: 1px solid transparent;
	padding: 64px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;
}
.button-panel:nth-of-type(odd) {
	background: var(--primaryLightest);
}
.button-content {
	background: transparent;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
}
.button-content p:lang(zh-cn) {
	margin-top: 12px;
	font-style: italic;
	opacity: 0.95;
}
.button-item {
	width: 50%;
	max-width: 400px;
	margin: 0 16px;
	border: 2px solid transparent;
}
img.button-item {
	height: 250px;
	object-fit: cover;
}
div.button-item {
	padding: 16px 32px;
	background: var(--vpGreen);
	color: var(--vpCoolGrey);
}
div.button-item * {
	background: transparent;
	color: currentColor;
}
.button-panel:nth-of-type(odd) div.button-item {
	background: var(--vpDark);
}
.button-panel:nth-of-type(even) div.button-content {
	flex-direction: row-reverse;
}
.button-panel:hover {
	background: var(--bannerGrey);
	/*border-color: var(--vpOrange);*/
}
.button-panel:hover .button-item {
	border-color: var(--vpOrange);
	box-shadow: 5px 5px 10px var(--vpDark);
}
.button-panel:hover div.button-item * {
	color: whitesmoke;
}

@media (max-width: 768px) {
	.button-panel {
		padding: 32px;
	}
}
</style>