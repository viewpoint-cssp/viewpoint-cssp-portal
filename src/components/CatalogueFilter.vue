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
			<table class="filter-on">
				<tr>
					<td>
						<label for="input-chars"><h3>Filter on</h3></label>
					</td>
					<td>
						<input
							id="input-chars"
							type="text"
							placeholder='Use "phrases" and words'
							autocomplete="off"
							spellcheck="false"
							v-model="searchString"
						/>
					</td>
				</tr>
			</table>
			<div class="search-in-list">
				<div
					class="keyword"
					:class="{ selected: searchTitle }"
					@click="searchTitle = !searchTitle"
				>
					Title
				</div>
				<div
					class="keyword"
					:class="{ selected: searchAbstract }"
					@click="searchAbstract = !searchAbstract"
				>
					Abstract
				</div>
				<div
					class="keyword"
					:class="{ selected: searchAuthor }"
					@click="searchAuthor = !searchAuthor"
				>
					Authors
				</div>
				<div
					class="keyword"
					:class="{ selected: searchTags }"
					@click="searchTags = !searchTags"
				>
					Keywords
				</div>
				<button
					class="reset-button"
					@click="resetChars"
					:disabled="searchString.length == 0"
				>
					Reset
				</button>
			</div>
			<h3>Themes ({{ selectedTags.length }} selected)</h3>
			<div class="keyword-list">
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
				</div>
				<button
					class="reset-button"
					@click="selectedTags = []"
					:disabled="selectedTags.length == 0"
				>
					Reset
				</button>
			</div>
			<div class="buttons">
				<button
					@click="applyFilter"
					:data-disabled="!filterChanged || !filterSet"
				>
					Apply filter
				</button>
				<button
					@click="$emit('setFilter', {})"
					:data-disabled="!filterSet"
				>
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
			selectedTags: []
		}
	},
	computed: {
		filterSet() {
			return this.searchString || this.selectedTags.length
		},
		currentFilterCount() {
			if (this.filterSettings.chars ||
				(this.filterSettings.themes && this.filterSettings.themes.length > 0)
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
		},
		searchAbstract() {
			this.filterChanged =
				this.filterChanged ||
				this.searchAbstract !=
					this.filterSettings.fields.includes('abstract')
		},
		searchAuthor() {
			this.filterChanged =
				this.filterChanged ||
				this.searchAuthor !=
					this.filterSettings.fields.includes('author')
		},
		searchTags() {
			this.filterChanged =
				this.filterChanged ||
				this.searchTags != this.filterSettings.fields.includes('tags')
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
		}
	},
	methods: {
		resetChars() {
			this.searchString = ''
			this.searchTitle = true
			this.searchAbstract = true
			this.searchAuthor = true
			this.searchTags = true
		},
		toggleTag(tag) {
			const ucTag = tag.toUpperCase()
			if (this.selectedTags.includes(ucTag)) {
				this.selectedTags.splice(this.selectedTags.indexOf(ucTag), 1)
			} else {
				this.selectedTags.push(ucTag)
			}
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
			this.$emit('setFilter', newFilter)
		}
	},
	created() {
		this.allTags = this.tagList.sort()
	},
	mounted() {
		if (this.filterSettings.chars) {
			this.searchString = this.filterSettings.chars
			this.searchTitle = this.filterSettings.fields.includes('title')
			this.searchAbstract = this.filterSettings.fields.includes('abstract')
			this.searchAuthor = this.filterSettings.fields.includes('author')
			this.searchTags = this.filterSettings.fields.includes('tags')
		}
		if (this.filterSettings.themes) {
			this.selectedTags = [...this.filterSettings.themes]
		}
	}
}
</script>

<style scoped>
.filter-settings {
	width: var(--rightPanelWidth);
	height: var(--contentHeight);
	overflow-x: hidden;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
}

.header {
	margin: 2px;
	padding: 8px 16px;
	position: sticky;
	top: 2px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background: var(--vpDark);
	color: var(--whiteDefault);
	cursor: pointer;
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

.header:hover .close-icon path {
	color: var(--whiteHover);
}

.settings {
	padding: 8px 16px;
}

h3 {
	color: var(--vpDark);
}

table.filter-on {
	width: 100%;
}

#input-chars {
	width: 100%;
	padding: 4px 8px;
	background: var(--primaryLightest);
}

.search-in-list,
.keyword-list {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: baseline;
	flex-wrap: wrap;
}

.search-in-list p {
	margin-right: 8px;
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
	margin-top: 12px;
	align-items: flex-start;
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
.keyword:after {
	content: '\2717'; 
	font-size: 0.7rem;
}
.keyword.selected {
	background: var(--primarySelected);
}
.keyword.selected:after {
	content: '\2713'; 
}
.keyword:hover {
	background: var(--vpOrange);
}

.buttons {
	margin-top: 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
