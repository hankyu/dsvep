<style lang="scss">
@import '../../sass/variables';
@import '../../sass/components/vue-phone-input.scss';

.phoneInputGroup {
    position: relative;

    .phoneInputGroup__inputFeedback {
        display: none;
        font-size: 0.7rem;
        margin-top: 0;
        color: $bs-inputInvalid;
    }

    &.phoneInputGroup--invalid {
        .phoneInputGroup__inputFeedback {
            display: block;
            font-size: 0.7rem;
            margin-top: 0;
            color: $bs-inputInvalid;
        }
    }
}

.phoneInputGroup .country-selector.has-value .field-input,
.phoneInputGroup
    .vue-phone-number-input
    .input-phone-number.field.vue-input-ui
    input#VuePhoneNumberInput_phone_number.field-input {
    background-color: $white !important;
}
// :not(.is-dark): not(.is-disabled);
</style>

<template>
    <div
        :class="phoneInputGroupClass"
        class="phoneInputGroup"
    >
        <keep-alive>
            <VuePhoneNumberInput
                :translations="translations"
                @input="type"
                @update="doValidate"
                color="#999"
                ref="phoneNumberInput"
                v-if="ready"
                v-model="inputPhone"
                valid-color="#28a745"
            />
        </keep-alive>
        <div class="phoneInputGroup__inputFeedback">手機 格式錯誤</div>
    </div>
</template>

<script>
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import VuePhoneNumberInput from 'vue-phone-number-input'
import { EventBus } from '../event-bus'

export default {
    name: 'PhoneInputGroup',
    components: {
        VuePhoneNumberInput
    },
    data() {
        return {
            typed: false,
            ready: false,
            inputPhone: '',
            resultPhone: '',
            phoneState: null,
            results: {},
            translations: {
                countrySelectorLabel: '國碼',
                // countrySelectorError: 'Choisir un pays',
                phoneNumberLabel: '輸入手機號碼'
                // example: 'Exemple :'
            }
        }
    },
    props: {
        phoneInfo: {
            type: Object,
            required: true
        }
    },
    mounted() {
        console.log('PhoneInputGroup mounted')
        if (this.phoneInfo.cellphone) {
            this.inputPhone = this.phoneInfo.cellphone
        }
        this.ready = true
    },
    updated() {
        // this.$refs.phoneNumberInput.$emit('change', this.$refs.phoneNumberInput.results)
    },
    computed: {
        phoneInputGroupClass() {
            return !this.typed && !this.inputPhone
                ? ''
                : this.phoneState
                ? 'phoneInputGroup--valid'
                : this.phoneState === false
                ? 'phoneInputGroup--invalid'
                : ''
        }
    },
    methods: {
        type(v) {
            console.log('type')
            if (v) {
                this.typed = true
            }
        },
        doValidate(results) {
            console.log('results', results)
            this.phoneState = results.isValid
            this.results = results
            if (results.e164) {
                this.resultPhone = results.e164
                if (results.countryCode == 'TW') {
                    this.resultPhone = this.resultPhone.replace('+886', '0')
                }
            } else {
                this.resultPhone = ''
            }

            console.log('this.resultPhone', this.resultPhone, 'this.phoneState', this.phoneState)
            this.$emit('update:phoneInfo', {
                cellphone: this.resultPhone,
                state: this.phoneState
            })
        }
    }
    /* watch: {
        phoneState(newValue) {
            EventBus.$emit('phone-state-change')
        }
    } */
}
</script>