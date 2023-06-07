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
                icon="envelope"
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
    name: 'InputTextSetMoicaCode',
    extends: BaseInputTextSet,
    props: {
        inputPlaceholder: {
            type: String,
            default: '請輸入您的自然人憑證號碼'
        },
        inputInvalidFeedback: {
            type: String,
            default: '自然人憑證號碼格式錯誤'
        }
    },
    methods: {
        validateInput(v) {
            let val = this.trim ? (v.trim ? v.trim() : v.toString ? v.toString().trim() : v) : v
            return this.isMoicaBarCode(val) // 大寫英文 2 碼 加 數字 14 碼
        }
    }
}
</script>