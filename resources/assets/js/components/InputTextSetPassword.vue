<style lang="scss">
@import '../../sass/variables';

.inputPasswordSet .baseInputTextSet__faIcon {
    cursor: pointer;
}
</style>

<template>
    <div
        :class="inputSetClass"
        class="baseInputTextSet inputPasswordSet"
        role="group"
    >
        <label
            :for="inputId"
            class="baseInputTextSet__label"
            v-if="mode==1"
        >
            <font-awesome-icon
                :icon="visibleFaIcon"
                @click="switchVisible"
                class="baseInputTextSet__faIcon"
            />
        </label>
        <label
            :for="inputId"
            class="baseInputTextSet__label"
            v-if="mode==0 && inputLabel"
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
            :type="inputType"
            :value="inputValue.value"
            @keyup="keyup"
            class="baseInputTextSet__input"
            v-model="input"
        ></b-form-input>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback
            :id="inputId+'-feedback'"
            class="baseInputTextSet__invalidFeedback"
        >{{ inputInvalidFeedback }}</b-form-invalid-feedback>

        <!-- This is a form text block (formerly known as help block) -->
        <b-form-text
            :id="inputId+'-help'"
            v-if="inputHelp"
        >{{ inputHelp }}</b-form-text>
    </div>
</template>

<script>
import BaseInputTextSet from './global/BaseInputTextSet'
import { JS_CONFIG } from '../config'

export default {
    name: 'InputTextSetPassword',
    extends: BaseInputTextSet,
    data() {
        return {
            visible: false
        }
    },
    props: {
        inputPlaceholder: {
            type: String,
            default: JS_CONFIG.TERMS.INPUT_PLATFORM_PASSWORD
        },
        inputInvalidFeedback: {
            type: String,
            default: JS_CONFIG.TERMS.PASSWORD_FORMAT_WRONG_DETAIL
        },
        confirmValue: {
            type: String
        }
    },
    computed: {
        visibleFaIcon() {
            return this.visible ? 'eye' : 'eye-slash'
        },
        inputType() {
            return this.visible ? 'text' : 'password'
        }
    },
    methods: {
        validateInput(v) {
            let val = this.trim ? (v.trim ? v.trim() : v.toString ? v.toString().trim() : v) : v
            return (
                this.validWordNumberLimit(val, 8, 30) &&
                (this.confirmValue ? val == this.confirmValue : true)
            )
        },
        switchVisible() {
            this.visible = !this.visible
        }
    }
}
</script>