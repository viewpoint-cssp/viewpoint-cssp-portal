<template>
	<div>
		<Banner class="banner-style" enTitle="Infographics"></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					TODO: English description of infographics
				</p>
				<p lang="zh-cn">
					TODO: Mandarin here?
				</p>
			</div>
		</div>
		<div class="flex-outer">
			<div
				v-for="(group, g) in groupedPdfs"
				:key="`inner-${g}`"
				class="flex-inner"
			>
				<div
					v-for="(pdf, p) in group"
					:key="`div-${g}-${p}`"
					class="bilingual"
				>
					<a
						v-for="lang in pdf.langs"
						:key="`a-${g}-${p}-${lang}`"
						:href="require(`../assets/pdfs/${pdf[lang].pdf}.pdf`)"
						:download="`${pdf[lang].pdf}.pdf`"
						target="_blank"
						rel="noopener noreferrer"
						:title="pdf[lang].button"
					>
						<img
							:src="
								require(`../assets/images/${pdf[lang].img}.jpg`)
							"
						/>
						<button lang="lang == 'cn' ? 'zh-cn' : ''">
							{{ pdf[lang].button }}
						</button>
						<p class="draft" v-if="pdf[lang].draft">Draft</p>
					</a>
				</div>
			</div>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'

export default {
	name: 'Infographics',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			pdfs: [
				{
					langs: ['en'],
					en: {
						pdf: 'I01-en-assessing-risk',
						img: 'infographic-1',
						button: `Assessing China's risk to climate related extremes`
					}
				},
				{
					langs: ['en'],
					en: {
						pdf: 'I02-en-air-quality',
						img: 'infographic-2',
						button: 'Urban China Decadal Air Quality Service',
						draft: true
					}
				},
				{
					langs: ['en'],
					en: {
						pdf: 'I03-en-seasonal-forecast',
						img: 'infographic-3',
						button:
							'Seasonal forecast service for the Yangtze River Basin'
					}
				},
				{
					langs: ['en', 'cn'],
					en: {
						pdf: 'I04-en-food-security',
						img: 'infographic-4',
						button: 'Food security in CSSP China'
					},
					cn: {
						pdf: 'I04-cn-food-security',
						img: 'infographic-4-cn',
						button: '中英气候科学支持服务伙伴关系计划之粮食安全'
					}
				}
			]
		}
	},
	computed: {
		groupedPdfs() {
			const group = []
			group.push(this.pdfs.slice(0, 2))
			group.push(this.pdfs.slice(2, 4))
			return group
		}
	},
	methods: {
		scrollCursor() {
			const anchors = document.getElementsByTagName('a')
			for (let a = 0; a < anchors.length; a++) {
				anchors[a].classList.add('scroll-cursor')
			}
		},
		pointerCursor() {
			const anchors = document.getElementsByTagName('a')
			for (let a = 0; a < anchors.length; a++) {
				anchors[a].classList.remove('scroll-cursor')
			}
		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			// this is only here because Chrome and Edge don't correctly refresh
			// :hover state as elements are moved under the cursor while scrolling
			document.addEventListener('scroll', this.scrollCursor)
			document.addEventListener('mousemove', this.pointerCursor)
		}
	},
	beforeDestroy() {
		if (navigator.userAgent.indexOf('Firefox/') < 0) {
			document.removeEventListener('scroll', this.scrollCursor)
			document.removeEventListener('mousemove', this.pointerCursor)
		}
	}
}
</script>

<style scoped>
.banner-style {
	background-image: url('../assets/images/infographics.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
}

.flex-outer,
.flex-inner {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	margin: 0 auto;
}
.flex-outer {
	flex-direction: column;
}

a {
	text-decoration: none;
	position: relative;
}
a:hover img,
button:hover {
	box-shadow: 4px 4px 5px var(--primarySelected);
}
a:focus {
	outline: none;
}
a:active img,
button:active {
	transform: translateY(1px);
	box-shadow: none;
}

img {
	width: 300px;
	margin: 12px;
}

button {
	cursor: pointer;
	display: none;
}

p.draft {
	position: absolute;
	top: 40%;
	left: 20%;
	font-size: 64px;
	font-weight: bold;
	letter-spacing: 8px;
	transform-origin: center;
	transform: rotate(-30deg);
	background: transparent;
	color: var(--bannerGrey);
}

@media (max-width: 1300px) {
	.flex-inner {
		flex-direction: column;
	}
}

@media (max-width: 684px) {
	.bilingual {
		margin: 0 auto;
	}
	img {
		width: 90%;
		max-width: calc(50vw - 24px);
	}
}

@media (max-width: 640px) {
	/* needed to override default .bilingual at 640px */
	.bilingual {
		flex-direction: row;
	}
}
</style>
