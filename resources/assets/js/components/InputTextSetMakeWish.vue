<style lang="scss">
@import '../../sass/variables';
</style>

<template>
    <div
        class="baseInputTextSet"
        role="group"
    >
        <label
            class="baseInputTextSet__label"
            for="input-live"
            v-if="inputLabel"
        >
            {{ inputLabel }}:
            <span
                class="baseInputTextSet__validatedMark"
                v-if="isRequired"
            >*</span>
        </label>
        <b-form-input
            :aria-describedby="inputId+'-help '+inputId+'-feedback'"
            :placeholder="inputPlaceholder"
            :state="inputState"
            :trim="trim"
            :value="inputValue.value"
            @keyup="keyup"
            class="baseInputTextSet__input"
            v-model="input"
        ></b-form-input>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback class="baseInputTextSet__invalidFeedback">{{ inputInvalidFeedback }}</b-form-invalid-feedback>

        <!-- This is a form text block (formerly known as help block) -->
        <b-form-text
            id="input-live-help"
            v-if="inputHelp"
        >{{ inputHelp }}</b-form-text>
    </div>
</template>

<script>
import BaseInputTextSet from './global/BaseInputTextSet'

export default {
    name: 'InputTextSetMakeWish',
    extends: BaseInputTextSet,
    props: {
        isRequired: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        validateInput(v) {
            let val = this.trim ? (v.trim ? v.trim() : v.toString ? v.toString().trim() : v) : v
            return this.isRequired
                ? this.validWordNumberLimit(val, 1, 255)
                : this.validWordNumberLimit(val, 0, 255)
        }
    }
}
</script>