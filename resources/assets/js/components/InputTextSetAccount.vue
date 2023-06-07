<style lang="scss">
@import '../../sass/variables';
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
            v-if="mode==1"
        >
            <font-awesome-icon
                class="baseInputTextSet__faIcon"
                icon="user"
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
    name: 'InputTextSetAccount',
    extends: BaseInputTextSet,
    props: {
        inputPlaceholder: {
            type: String,
            default: JS_CONFIG.TERMS.INPUT_PLATFORM_ACCOUNT
        },
        inputInvalidFeedback: {
            type: String,
            default: JS_CONFIG.TERMS.ACCOUNT_FORMAT_WRONG
        }
    },
    methods: {
        validateInput(v) {
            let val = this.trim ? (v.trim ? v.trim() : v.toString ? v.toString().trim() : v) : v

            return this.isAllEnglishAndNumber(val) && this.validWordNumberLimit(val, 6, 20)
        }
    }
}
</script>