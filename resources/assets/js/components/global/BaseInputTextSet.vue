<style lang="scss">
@import '../../../sass/variables';

$h-PopupModalInput: 2.3rem;
$pl-input: 1.8rem;
$w-faIcon: 1.5rem;
.baseInputTextSet-1 {
    position: relative;

    .baseInputTextSet__label {
        position: absolute;
        left: $pl-input - $w-faIcon;
        height: $h-PopupModalInput;
        line-height: $h-PopupModalInput;
        color: $font-primary;
        margin-bottom: 0;

        .baseInputTextSet__faIcon {
            width: $w-faIcon;
            color: $darkgray;
        }
    }

    .baseInputTextSet__input {
        width: 100%;
        height: $h-PopupModalInput;
        padding-left: $pl-input;
    }
}

.baseInputTextSet__label {
    margin-bottom: 0;
}

.baseInputTextSet__validatedMark {
    color: $emphasized2;
    // font-size: 0.8rem;
}

.baseInputTextSet__invalidFeedback,
.baseInputTextSet__help {
    margin-top: 0;
}
</style>

<template>
    <div
        :class="inputSetClass"
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
        <b-form-input
            :aria-describedby="inputId+'-help '+inputId+'-feedback'"
            :id="inputId"
            :placeholder="inputPlaceholder"
            :state="inputState"
            :trim="trim"
            :value="inputValue.value"
            @keyup="keyup"
            class="baseInputTextSet__input"
            v-model="input"
        ></b-form-input>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback
            :id="inputId+'-feedback'"
            class="baseInputTextSet__invalidFeedback"
            v-if="inputValidated"
        >{{ inputInvalidFeedback }}</b-form-invalid-feedback>

        <!-- This is a form text block (formerly known as help block) -->
        <b-form-text
            :id="inputId+'-help'"
            class="baseInputTextSet__help"
            v-if="inputHelp"
        >{{ inputHelp }}</b-form-text>
    </div>
</template>

<script>
import { validateMixin } from '../../mixins/validate'

export default {
    name: 'BaseInputTextSet',
    mixins: [validateMixin],
    data() {
        return {
            input: '',
            inputState: null
        }
    },
    props: {
        mode: {
            type: Number,
            default: 0
        },
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
    computed: {
        inputSetClass() {
            return this.mode ? 'baseInputTextSet-1' : ''
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
            this.$emit('update:inputValue', { value: this.input, state: this.inputState })
        }
    }
}
</script>