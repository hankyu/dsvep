<style lang="scss">
@import '../../../sass/variables';

.baseInputTextSet__label {
    margin-bottom: 0;
}

.baseInputTextSet__invalidFeedback {
    margin-top: 0;
}
</style>

<template>
    <div
        class="baseInputTextSet"
        role="group"
    >
        <label
            :for="inputId"
            class="baseInputTextSet__label"
            v-if="inputLabel"
        >
            {{ inputLabel }}:
            <span
                class="baseInputTextSet__validatedMark"
                v-if="inputValidated"
            >*</span>
        </label>
        <b-form-textarea
            :aria-describedby="inputId+'-help '+inputId+'-feedback'"
            :id="inputId"
            :placeholder="inputPlaceholder"
            :rows="rows"
            :state="inputState"
            :trim="trim"
            @keyup="keyup"
            no-resize
            v-model="input"
        >{{ inputValue.value }}</b-form-textarea>
        <!-- size="md" -->

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback
            :id="inputId+'feedback'"
            class="baseInputTextSet__invalidFeedback"
            v-if="inputValidated"
        >{{ inputInvalidFeedback }}</b-form-invalid-feedback>

        <!-- This is a form text block (formerly known as help block) -->
        <b-form-text
            :id="inputId+'-help'"
            v-if="inputHelp"
        >{{ inputHelp }}</b-form-text>
    </div>
</template>

<script>
import { validateMixin } from '../../mixins/validate'

export default {
    name: 'BaseTextareaSet',
    mixins: [validateMixin],
    data() {
        return {
            input: '',
            inputState: null
        }
    },
    props: {
        inputValidated: {
            type: Boolean,
            default: false
        },
        inputId: {
            type: String,
            required: true
        },
        inputPlaceholder: {
            type: String,
            default: ''
        },
        inputLabel: {
            type: String,
            default: ''
        },
        inputInvalidFeedback: {
            type: String,
            default: 'Invalid!'
        },
        inputHelp: {
            type: String,
            default: ''
        },
        inputValue: {
            type: Object,
            default: { value: '', state: null }
        },
        trim: {
            type: Boolean,
            default: true
        },
        rows: {
            type: Number,
            default: 3
        },
        initValidate: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.input = this.inputValue.value
        if (this.initValidate && this.inputValidated && this.input) {
            this.inputState = this.validateInput(this.input)
            this.$emit('update:inputValue', { value: this.input, state: this.inputState })
        }
    },
    methods: {
        validateInput(v) {
            let val = this.trim ? (v.trim ? v.trim() : v.toString ? v.toString().trim() : v) : v
            return this.inputValidated ? this.isFilled(val) : null
        },
        keyup(event) {
            if (this.inputValidated) {
                this.inputState = this.validateInput(event.target.value)
            }
            this.$emit('update:inputValue', {
                value: event.target.value,
                state: this.inputState
            })
        }
    }
}
</script>