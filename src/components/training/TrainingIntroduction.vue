<template>
	<div>
		<div class="bilingual">
			<h1>Introduction</h1>
			<h1 lang="zh-cn">介绍</h1>
		</div>
		<div class="bilingual">
			<p>
				There are three key resources available for help with using
				UMEP: Workshop materials, tutorials and videos to allow you to
				follow along. All of these are complimentary and have been
				organised to streamline your user experience. The example data
				is available in the tutorials.
				<a
					href="https://umep-docs.readthedocs.io/en/latest/Introduction.html"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="nowrap"
						><font-awesome-icon
							icon="external-link-alt"
						></font-awesome-icon>
						A detailed</span
					>
					introduction to UMEP</a
				>
				and associated projects is available at the UMEP website.
			</p>
			<p>
				为了帮助您使用UMEP，您可以跟随研讨会材料、教程和视频这三个重要材料进行学习。
				所有这些资源均是免费的，并且已经被重新组建以优化您的用户体验。示例数据可在教程中获得。<a
					href="https://umep-docs.readthedocs.io/en/latest/Introduction.html"
					target="_blank"
					rel="noopener noreferrer"
					lang="zh-cn"
					>关于UMEP</a
				>及其相关项目的详细介绍可在UMEP网站上查阅。
			</p>
		</div>
		<div class="bilingual">
			<p>
				If you are familiar with Python and already have Python
				installed, skip to the section to install
				<span
					class="goto nowrap"
					@click="$emit('skipTo', 'TrainingQgis')"
				>
					<font-awesome-icon icon="forward"></font-awesome-icon>&nbsp;
					<strong>QGIS and UMEP</strong></span
				>.
			</p>
			<p>
				如果您熟悉Python并且已经安装了Python，请跳过安装&nbsp;<span
					class="goto nowrap"
					lang="zh-cn"
					@click="$emit('skipTo', 'TrainingQgis')"
				>
					QGIS和UMEP</span
				>一节。
			</p>
		</div>
		<div class="bilingual">
			<p>
				If you have UMEP installed and are ready to go, skip to the
				<span
					class="goto nowrap"
					@click="$emit('skipTo', 'TrainingFirstSteps')"
				>
					<font-awesome-icon icon="forward"></font-awesome-icon>&nbsp;
					<strong>First Steps</strong></span
				>
				section.
			</p>
			<p>
				如果您已经安装了UMEP，并且已经完成准备，请跳过<span
					class="goto nowrap"
					lang="zh-cn"
					@click="$emit('skipTo', 'TrainingFirstSteps')"
					>第一步</span
				>。
			</p>
		</div>
		<div class="bilingual">
			<p>
				UMEP is a powerful tool and opens up a world of possibilities
				for manipulating urban data. For a full list of the available
				tutorials including energy, water and radiation fluxes for one
				location, mean radiation temperature modelling in complex urban
				settings, and other things, please see the
				<a
					href="https://umep-docs.readthedocs.io/projects/tutorial/en/latest/index.html"
					target="_blank"
					rel="noopener noreferrer"
					class="nowrap"
				>
					<font-awesome-icon
						icon="external-link-alt"
					></font-awesome-icon>
					UMEP tutorial</a
				>. A few detailed examples are provided here, along with
				installation instructions. For more information, see the linked
				pages.
			</p>
			<p>
				UMEP是一个强大的工具，让操作城市数据成为可能。如需获取现有教程的完整列表（内容包括特定地点的能源、水资源和辐射通量，复杂城市环境下的平均辐射温度建模以及其他内容），请参阅<a
					href="https://umep-docs.readthedocs.io/projects/tutorial/en/latest/index.html"
					target="_blank"
					rel="noopener noreferrer"
					class="nowrap"
					lang="zh-cn"
					>UMEP教程</a
				>。这里提供了一些详细的示例和安装说明。有关更多信息，请参阅链接页面。
			</p>
		</div>
		<div class="bilingual">
			<p>
				Instructions in English; all videos have Chinese subtitles.
			</p>
			<p>
				英文教程。所有视频均有中文字幕。
			</p>
		</div>
		<div class="bilingual download-buttons">
			<p>
				<a
					class="download"
					:href="require('../../assets/pdfs/placeholder.pdf')"
					download="VIEWpoint-video-transcripts-en.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button>
						<font-awesome-icon icon="download"></font-awesome-icon>
						Download the transcripts
					</button>
				</a>
			</p>
			<p>
				<a
					class="download"
					:href="require('../../assets/pdfs/placeholder.pdf')"
					download="VIEWpoint-video-transcripts-cn.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button>
						<font-awesome-icon icon="download"></font-awesome-icon
						>&nbsp;下载视频字幕文本
					</button>
				</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Introduction'
}
</script>

<style scoped>
.bilingual {
	margin: 16px 64px !important;
}
.bilingual h1,
.bilingual p {
	margin: 0 !important;
}

a:lang(zh-cn) {
	text-decoration: underline !important;
	color: var(--chineseAnchor);
}

a.download,
.fa-download {
	background: transparent;
}
.fa-download path {
	color: var(--whiteDefault);
}

.download-buttons a:hover button svg path {
	color: var(--whiteDefault);
}

@media (max-width: 1007px) {
	.bilingual {
		margin: 12px 32px !important;
	}
}
@media (max-width: 640px) {
	.bilingual {
		margin: 8px 16px !important;
	}
	.bilingual p:last-of-type {
		margin-top: 8px !important;
	}
}
</style>
