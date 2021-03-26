<template>
	<div class="toggle switch-wrapper">
		<span class="switch-label" v-if="label">{{ label }}</span>
		<div
			class="switch-plate"
			ref="switchPlate"
			:class="{
				'switch-off': !value,
				'switch-on': value
			}"
			@click="toggleValue"
		>
			<div
				class="switch-state switch-off"
				:class="{ 'off-disabled': offDisabled }"
				v-if="!value"
			></div>
			<span
				class="switch-text switch-off"
				:class="{ 'off-disabled': offDisabled }"
				v-if="!value && offImage"
			>
				<img :src="require(`../assets/images/${offImage}`)" />
			</span>
			<span
				class="switch-text switch-off"
				:class="{ 'off-disabled': offDisabled }"
				v-else-if="!value"
			>
				{{ offState ? offState : 'Off' }}
			</span>
			<span class="switch-text switch-on" v-else-if="value && onImage">
				<img :src="require(`../assets/images/${onImage}`)" />
			</span>
			<span class="switch-text switch-on" v-else-if="value">
				{{ onState ? onState : 'On' }}
			</span>
			<div class="switch-state switch-on" v-if="value"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'toggle',
	props: {
		value: {
			type: Boolean,
			required: true
		},
		label: {
			type: String,
			required: false
		},
		offState: {
			type: String,
			required: false
		},
		offImage: {
			type: String,
			required: false,
		},
		onState: {
			type: String,
			required: false
		},
		onImage: {
			type: String,
			required: false
		},
		offDisabled: {
			type: Boolean,
			required: false
		},
		width: {
			type: String,
			required: false
		}
	},
	methods: {
		toggleValue() {
			this.$emit('change', this.value)
			this.$emit('input', !this.value)
		}
	},
	mounted() {
		if (!isNaN(this.width)) {
			this.$refs.switchPlate.style.width = `${this.width}px`
			this.$refs.switchPlate.style.maxWidth = `${this.width}px`
			this.$refs.switchPlate.style.minWidth = `${this.width}px`
		}
	}
}
</script>

<style scoped>
.switch-wrapper {
	font-size: 18px;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.switch-label {
	text-align: right;
	margin-right: 12px;
}

.switch-plate {
	border: 1px solid var(--text);
	border-radius: 32px;
	height: 32px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
}

.switch-state {
	background-color: var(--text);
	width: 28px;
	height: 28px;
	border-radius: 28px;
}

.switch-text {
	font-size: 0.9rem;
}

.switch-text.switch-off {
	margin: 0 16px 0 10px;
}

.switch-text.switch-on {
	margin: 0 10px 0 16px;
}

.switch-off.off-disabled {
	opacity: 0.7;
}

.switch-plate:hover {
	border-color: var(--vpOrange);
}
.switch-plate:hover .switch-state {
	background-color: var(--vpOrange);
}

@media (max-width: 1007px) {
	.switch-wrapper,
	.swith-text {
		font-size: var(--fontSizeMedium);
	}
}

@media (max-width: 640px) {
	.switch-wrapper,
	.swith-text {
		font-size: var(--fontSizeSmall);
	}
}
</style>
