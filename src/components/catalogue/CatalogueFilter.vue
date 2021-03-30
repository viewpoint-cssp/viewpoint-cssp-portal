<template>
	<div class="filter-settings">
		<div class="header" @click="$emit('close')">
			Filter
			<span v-if="currentFilterCount">
				{{ currentFilterCount }}
			</span>
			<font-awesome-icon
				icon="times"
				class="close-icon"
			></font-awesome-icon>
		</div>
		<div class="settings">
			<div class="filter-on">
				<label for="input-chars"><h3>Filter on</h3></label>
				<input
					id="input-chars"
					type="text"
					placeholder='Use "phrases" and words'
					autocomplete="off"
					spellcheck="false"
					v-model="searchString"
				/>
				<div
					class="caret clickable"
					@click="showSearchInList = !showSearchInList"
				>
					<font-awesome-icon
						icon="caret-down"
						class="filter-icon"
						:class="{ expanded: showSearchInList }"
					></font-awesome-icon>
				</div>
			</div>
			<div
				class="search-in-list"
				:class="{ visible: showSearchInList }"
				v-show-slide="showSearchInList"
			>
				<div
					class="keyword"
					:class="{ selected: searchTitle }"
					@click="searchTitle = !searchTitle"
				>
					Title
					<p v-html="tickOrCross(searchTitle)"></p>
				</div>
				<div
					class="keyword"
					:class="{ selected: searchAbstract }"
					@click="searchAbstract = !searchAbstract"
				>
					Abstract
					<p v-html="tickOrCross(searchAbstract)"></p>
				</div>
				<div
					class="keyword"
					:class="{ selected: searchAuthor }"
					@click="searchAuthor = !searchAuthor"
				>
					Authors
					<p v-html="tickOrCross(searchAuthor)"></p>
				</div>
				<div
					class="keyword"
					:class="{ selected: searchTags }"
					@click="searchTags = !searchTags"
				>
					Keywords
					<p v-html="tickOrCross(searchTags)"></p>
				</div>
				<button
					class="reset-button"
					@click="resetChars"
					:disabled="searchString.length == 0"
				>
					Reset
				</button>
			</div>
			<div class="filter-section">
				<h3>Publication years</h3>
				<div
					class="keyword"
					:class="{
						selected: selectedYears.length == 0
					}"
					@click="toggleAnyYear"
				>
					Any
					<p v-html="tickOrCross(selectedYears.length == 0)"></p>
				</div>
				<div class="caret clickable" @click="showYears = !showYears">
					<font-awesome-icon
						icon="caret-down"
						class="filter-icon"
						:class="{ expanded: showYears }"
					></font-awesome-icon>
				</div>
			</div>
			<div
				class="keyword-list"
				:class="{ visible: showYears }"
				v-show-slide="showYears"
			>
				<div
					v-for="(year, i) in yearList"
					:key="`year-${i}`"
					class="keyword"
					:class="{
						selected: selectedYears.includes(yearList[i])
					}"
					@click="toggleYear(year)"
				>
					{{ year }}
					<p
						v-html="
							tickOrCross(selectedYears.includes(yearList[i]))
						"
					></p>
				</div>
			</div>
			<div class="filter-section">
				<h3>Themes ({{ selectedTags.length }} selected)</h3>
				<div
					class="keyword"
					:class="{
						selected: selectedTags.length == 0
					}"
					@click="toggleAnyTag"
				>
					Any
					<p v-html="tickOrCross(selectedTags.length == 0)"></p>
				</div>
				<div class="caret clickable" @click="showTags = !showTags">
					<font-awesome-icon
						icon="caret-down"
						class="filter-icon"
						:class="{ expanded: showTags }"
					></font-awesome-icon>
				</div>
			</div>
			<div
				class="keyword-list"
				:class="{ visible: showTags }"
				v-show-slide="showTags"
			>
				<div
					v-for="(tag, i) in allTags"
					:key="`tag-${i}`"
					class="keyword"
					:class="{
						selected: selectedTags.includes(
							allTags[i].toUpperCase()
						)
					}"
					@click="toggleTag(tag)"
				>
					{{ tag }}
					<p
						v-html="
							tickOrCross(
								selectedTags.includes(allTags[i].toUpperCase())
							)
						"
					></p>
				</div>
			</div>
			<div class="buttons">
				<button
					@click="applyFilter"
					:data-disabled="!filterChanged || !filterSet"
				>
					Apply filter
				</button>
				<button @click="clearFilter" :data-disabled="!filterSet">
					Clear filter
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CatalogueFilter',
	props: {
		tagList: Array,
		yearList: Array,
		filterSettings: Object,
		count: Number
	},
	data() {
		return {
			filterChanged: false,
			searchString: '',
			searchTitle: true,
			searchAbstract: true,
			searchAuthor: true,
			searchTags: true,
			allTags: [],
			selectedTags: [],
			showTags: false,
			showSearchInList: false,
			allYears: [],
			selectedYears: [],
			showYears: false
		}
	},
	computed: {
		filterSet() {
			return (
				this.searchString ||
				this.selectedTags.length ||
				this.selectedYears.length
			)
		},
		currentFilterCount() {
			if (
				this.filterSettings.chars ||
				(this.filterSettings.themes &&
					this.filterSettings.themes.length > 0) ||
				(this.filterSettings.years &&
					this.filterSettings.years.length > 0)
			) {
				return `Entries found: ${this.count}`
			}
			return null
		}
	},
	watch: {
		searchString() {
			this.filterChanged =
				this.filterChanged ||
				this.searchString !== this.filterSettings.chars
		},
		searchTitle() {
			this.filterChanged =
				this.filterChanged ||
				this.searchTitle != this.filterSettings.fields.includes('title')
			this.showSearchInList =
				!this.searchTitle ||
				!this.searchAbstract ||
				!this.searchAuthor ||
				!this.searchTags
		},
		searchAbstract() {
			this.filterChanged =
				this.filterChanged ||
				this.searchAbstract !=
					this.filterSettings.fields.includes('abstract')
			this.showSearchInList =
				!this.searchTitle ||
				!this.searchAbstract ||
				!this.searchAuthor ||
				!this.searchTags
		},
		searchAuthor() {
			this.filterChanged =
				this.filterChanged ||
				this.searchAuthor !=
					this.filterSettings.fields.includes('author')
			this.showSearchInList =
				!this.searchTitle ||
				!this.searchAbstract ||
				!this.searchAuthor ||
				!this.searchTags
		},
		searchTags() {
			this.filterChanged =
				this.filterChanged ||
				this.searchTags != this.filterSettings.fields.includes('tags')
			this.showSearchInList =
				!this.searchTitle ||
				!this.searchAbstract ||
				!this.searchAuthor ||
				!this.searchTags
		},
		selectedTags() {
			if (!this.filterChanged) {
				const newCount = this.selectedTags.length
				const origCount = this.filterSettings.themes
					? this.filterSettings.themes.length
					: 0
				if (newCount != origCount) {
					this.filterChanged = true
				}
			}
			if (!this.filterChanged) {
				this.selectedTags.map(newTag => {
					if (!this.filterSettings.themes.includes(newTag)) {
						this.filterChanged = true
					}
				})
			}
			if (!this.filterChanged) {
				this.filterSettings.themes.map(origTag => {
					if (!this.selectedTags.includes(origTag)) {
						this.filterChanged = true
					}
				})
			}
		},
		selectedYears() {
			if (!this.filterChanged) {
				const newCount = this.selectedYears.length
				const origCount = this.filterSettings.years
					? this.filterSettings.years.length
					: 0
				if (newCount != origCount) {
					this.filterChanged = true
				}
			}
			if (!this.filterChanged) {
				this.selectedYears.map(newYear => {
					if (!this.filterSettings.years.includes(newYear)) {
						this.filterChanged = true
					}
				})
			}
			if (!this.filterChanged) {
				this.filterSettings.years.map(origYear => {
					if (!this.selectedYears.includes(origYear)) {
						this.filterChanged = true
					}
				})
			}
		}
	},
	methods: {
		tickOrCross(boo) {
			return boo ? '&#x2713;' : '&#x2717;'
		},
		resetChars() {
			this.searchString = ''
			this.searchTitle = true
			this.searchAbstract = true
			this.searchAuthor = true
			this.searchTags = true
		},
		toggleAnyTag() {
			if (this.selectedTags.length == 0) {
				// clicking 'Any' when 'Any' is selected toggles the list visiblity
				this.showTags = !this.showTags
			} else {
				// clicking 'Any' when 'Any' is not selected clears and closes the list
				this.selectedTags = []
				this.showTags = false
			}
		},
		toggleTag(tag) {
			const ucTag = tag.toUpperCase()
			if (this.selectedTags.includes(ucTag)) {
				this.selectedTags.splice(this.selectedTags.indexOf(ucTag), 1)
			} else {
				this.selectedTags.push(ucTag)
			}
		},
		toggleAnyYear() {
			if (this.selectedYears.length == 0) {
				// clicking 'Any' when 'Any' is selected toggles the list visiblity
				this.showYears = !this.showYears
			} else {
				// clicking 'Any' when 'Any' is not selected clears and closes the list
				this.selectedYears = []
				this.showYears = false
			}
		},
		toggleYear(year) {
			if (this.selectedYears.includes(year)) {
				this.selectedYears.splice(this.selectedYears.indexOf(year), 1)
			} else {
				this.selectedYears.push(year)
			}
		},
		clearFilter() {
			this.searchString = ''
			this.searchTitle = true
			this.searchAbstract = true
			this.searchAuthor = true
			this.searchTags = true
			this.showSearchInList = false
			this.selectedYears = []
			this.showYears = false
			this.selectedTags = []
			this.showTags = false
			this.$emit('setFilter', {})
		},
		applyFilter() {
			const newFilter = {}
			if (
				this.searchString &&
				(this.searchTitle ||
					this.searchAbstract ||
					this.searchAuthor ||
					this.searchTags)
			) {
				newFilter.chars = this.searchString
				newFilter.matches = 'all' // TODO offer any/all toggle?
				newFilter.fields = []
				if (this.searchTitle) {
					newFilter.fields.push('title')
				}
				if (this.searchAbstract) {
					newFilter.fields.push('abstract')
				}
				if (this.searchAuthor) {
					newFilter.fields.push('author')
				}
				if (this.searchTags) {
					newFilter.fields.push('tags')
				}
			}
			if (this.selectedTags.length) {
				newFilter.themes = [...this.selectedTags]
			}
			if (this.selectedYears.length) {
				newFilter.years = [...this.selectedYears]
			}
			this.$emit('setFilter', newFilter)
		},
		keyUp(key) {
			if (key.code === 'Enter') {
				this.applyFilter()
			}
		}
	},
	created() {
		this.allTags = this.tagList.sort()
	},
	mounted() {
		if (this.filterSettings.chars) {
			this.searchString = this.filterSettings.chars
			this.searchTitle = this.filterSettings.fields.includes('title')
			this.searchAbstract = this.filterSettings.fields.includes(
				'abstract'
			)
			this.searchAuthor = this.filterSettings.fields.includes('author')
			this.searchTags = this.filterSettings.fields.includes('tags')
			this.showSearchInList =
				!this.searchTitle ||
				!this.searchAbstract ||
				!this.searchAuthor ||
				!this.searchTags
		}
		if (this.filterSettings.themes) {
			this.selectedTags = [...this.filterSettings.themes]
			this.showTags = true
		}
		if (this.filterSettings.years) {
			this.selectedYears = [...this.filterSettings.years]
			this.showYears = true
		}
		document.addEventListener('keyup', this.keyUp) // listen for an enter key
		this.$nextTick(() => {
			const input = document.getElementsByTagName('input')
			if (input.length) {
				input[0].focus()
			}
		})
	},
	beforeDestroy() {
		document.removeEventListener('keyup', this.keyUp)
	}
}
</script>

<style scoped>
.filter-settings {
	width: var(--rightCatalogueWidth);
	height: var(--catalogueHeight);
	overflow-x: hidden;
	overflow-y: scroll;
}

.header {
	margin: 0 2px 2px 2px;
	border-top: 2px solid var(--vpCoolGrey);
	padding: 8.5px 16px; /* extra 0.5 matches table header height */
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background: var(--vpDark);
	color: var(--whiteDefault);
	cursor: pointer;
	z-index: 1; /* needed to force transformed .caret behind .header */
}

.header span {
	color: var(--whiteDisabled);
	background: transparent;
	font-size: 0.75rem;
}

.close-icon {
	background: transparent;
}

.close-icon path {
	color: var(--whiteDisabled);
}

@media (hover: hover) {
	.header:hover .close-icon path {
		color: var(--whiteHover);
	}
}

.settings {
	padding: 8px 16px;
}

h3 {
	color: var(--vpDark);
}

.filter-on,
.filter-section {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.filter-section {
	justify-content: flex-start;
}

.filter-on label {
	width: 80px;
	flex-shrink: 0;
}

#input-chars {
	width: 100%;
	padding: 4px 8px;
	background: var(--primaryLightest);
}

.caret {
	width: 36px;
	flex-shrink: 0;
	text-align: center;
}

.filter-section h3 {
	margin-right: 8px;
	flex-shrink: 0;
}

@media (hover: hover) {
	.clickable:hover h3,
	.clickable:hover .fa-caret-down path,
	.caret:hover .fa-caret-down path {
		color: var(--vpOrange);
	}
}
.fa-caret-down {
	font-size: 24px;
}
.fa-caret-down {
	transition: transform 0.4s linear;
}
.fa-caret-down.expanded {
	transform: rotate(180deg);
}

.search-in-list,
.keyword-list {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: baseline;
	flex-wrap: wrap;
}

.reset-button {
	margin: 0 0 2px 4px;
	padding: 4px 8px;
	white-space: nowrap;
	word-break: break-all;
	font-size: 12px;
	align-self: flex-end;
}

.keyword-list {
	align-items: flex-start;
}

.search-in-list.visible,
.keyword-list.visible {
	margin-bottom: 8px;
}

.keyword {
	margin: 0 2px 2px 0;
	padding: 4px 8px;
	background: var(--primaryLighter);
	border-radius: 5px;
	white-space: nowrap;
	word-break: break-all;
	font-size: 16px;
	cursor: pointer;
}
/* :after and :before are nice but only while the contents were the same width! */
/* when the tick had to change for Edge, the widths changed and so now tickOrCross is used instead :( */
/*.keyword:after {
	content: '\2717'; 
	font-size: 0.7rem;
}*/
.keyword.selected {
	background: var(--primarySelected);
}
/*.keyword.selected:after {
	content: '\2713'; 
}*/
@media (hover: hover) {
	.keyword:hover {
		background: var(--vpOrange);
		box-shadow: 2px 2px 5px var(--primarySelected);
	}
}
.keyword:active {
	transform: translateY(1px);
	box-shadow: none;
}
.keyword p {
	display: inline-block;
	width: 11px;
	background: transparent;
	font-size: 0.7rem;
}

.buttons {
	margin-top: 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.buttons > button {
	max-width: 50%;
}
.buttons > button:nth-child(1) {
	margin-right: 2px;
}
</style>
