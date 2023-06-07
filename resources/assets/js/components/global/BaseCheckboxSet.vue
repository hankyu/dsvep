<style lang="scss">
@import '../../../sass/variables';

.baseCheckboxSet__label {
    margin-bottom: 0;
}

.baseCheckboxSet__validatedMark {
    color: $emphasized2;
    // font-size: 0.8rem;
}

.baseCheckboxSet__invalidFeedback {
    margin-top: 0;
}
</style>

<template>
    <div
        class="baseCheckboxSet"
        role="group"
    >
        <label
            class="baseCheckboxSet__label"
            v-if="inputLabel"
        >
            {{ inputLabel }}:
            <span
                class="baseCheckboxSet__validatedMark"
                v-if="minSelected"
            >*</span>
        </label>
        <!-- <b-form-group>
            <b-form-checkbox-group
                :options="options"
                :state="checkboxState"
                v-model="selected"
            />
        </b-form-group>
        <b-form-invalid-feedback class="baseCheckboxSet__invalidFeedback">{{ inputInvalidFeedback }}</b-form-invalid-feedback>-->

        <b-form-checkbox-group
            :options="options"
            :state="checkboxState"
            @change.native="onChange"
            v-model="selected"
        >
            <b-form-invalid-feedback :state="checkboxState">{{ inputInvalidFeedback }}</b-form-invalid-feedback>
            <!-- <b-form-valid-feedback :state="checkboxState">Thank you</b-form-valid-feedback> -->
        </b-form-checkbox-group>
    </div>
</template>

<script>
import { validateMixin } from '../../mixins/validate'

export default {
    name: 'BaseCheckboxSet',
    mixins: [validateMixin],
    data() {
        return {
            checkboxState: null,
            selected: []
        }
    },
    updated() {
        this.isUpdated = true
    },
    props: {
        preventSelectMore: {
            type: Boolean,
            default: true
        },
        minSelected: {
            type: Number,
            default: 0
        },
        maxSelected: {
            type: Number,
            default: -1
        },
        inputLabel: {
            type: String,
            default: ''
        },
        inputInvalidFeedback: {
            type: String,
            default: 'Invalid!'
        },
        inputValue: {
            type: Object,
            default: { selected: [], state: null }
        },
        options: {
            type: Array,
            required: true
        }
    },
    methods: {
        validateInput() {
            if (this.minSelected && this.selected.length < this.minSelected) {
                return false
            }

            if (this.maxSelected != -1 && this.selected.length > this.maxSelected) {
                if (this.preventSelectMore) {
                    this.selected.splice(3, this.selected.length - this.maxSelected)
                    return true
                } else {
                    return false
                }
            }
            return true
        },
        onChange(event) {
            if (
                this.preventSelectMore &&
                event.target.checked &&
                this.maxSelected != -1 &&
                this.selected.length > this.maxSelected
            ) {
                event.target.checked = false
            }
            this.checkboxState = this.validateInput()
            this.$emit('update:inputValue', {
                selected: this.selected,
                state: this.checkboxState
            })
        }
    },
    watch: {}
}
</script>