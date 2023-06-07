<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/layout/baseFormTable';
</style>


<template>
    <table class="baseFormTable">
        <tr>
            <th class="baseFormTable__required">銀行代碼</th>
            <td role="group">
                <b-form-input
                    :state="bankNumState"
                    @blur="onlyNumber('bankNum')"
                    @input="doValidate('bankNum')"
                    placeholder="輸入您的銀行代碼"
                    trim
                    v-model="bankNum"
                ></b-form-input>
                <b-form-invalid-feedback id="input-name-feedback">應為 3 位數數字</b-form-invalid-feedback>
            </td>
        </tr>
        <tr>
            <th class="baseFormTable__required">戶名</th>
            <td role="group">
                <b-form-input
                    :state="bankAccNameState"
                    @input="doValidate('bankAccName')"
                    placeholder="輸入您的銀行戶名"
                    trim
                    v-model="bankAccName"
                ></b-form-input>
                <b-form-invalid-feedback id="input-name-feedback">{{getTerm('REQUIRED')}}</b-form-invalid-feedback>
            </td>
        </tr>
        <tr>
            <th class="baseFormTable__required">帳號</th>
            <td role="group">
                <b-form-input
                    :state="bankAccNumState"
                    @blur="onlyNumber('bankAccNum')"
                    @input="doValidate('bankAccNum')"
                    placeholder="輸入您的銀行帳號"
                    trim
                    v-model="bankAccNum"
                ></b-form-input>
                <b-form-invalid-feedback id="input-name-feedback">{{getTerm('REQUIRED')}}</b-form-invalid-feedback>
            </td>
        </tr>
        <tr>
            <td
                class="text-right"
                colspan="2"
            >
                <b-button
                    :disabled="!allValidated"
                    @click="submit"
                    variant="success"
                >送出</b-button>
            </td>
        </tr>
    </table>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config.js' // JS_CONFIG.MEDIA_PATH
import { validateMixin } from '../mixins/validate'

export default {
    name: 'MemberCredit',
    mixins: [validateMixin],
    data() {
        return {
            bankNumState: null,
            bankNum: '',
            bankAccNameState: null,
            bankAccName: '',
            bankAccNumState: null,
            bankAccNum: ''
        }
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        this.bankNum = this.memberFullData.bank_number
        this.bankAccName = this.memberFullData.account_name
        this.bankAccNum = this.memberFullData.account_number

        EventBus.$emit('do-resize')
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    props: {},
    computed: {
        allValidated() {
            return this.bankNumState && this.bankAccNameState && this.bankAccNumState
        },
        ...mapGetters({
            memberFullData: 'member/memberFullData'
        })
    },
    methods: {
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        doValidate(field) {
            switch (field) {
                case 'bankNum':
                    this.bankNumState = this.validWordNumberLimit(this.bankNum, 3, 3)
                    break
                case 'bankAccName':
                    this.bankAccNameState = this.validWordNumberLimit(this.bankAccName, 1, 20)
                    break
                case 'bankAccNum':
                    this.bankAccNumState = this.validWordNumberLimit(this.bankAccNum, 1, 30)
                    break
            }
        },
        onlyNumber(field) {
            switch (field) {
                case 'bankNum':
                    this.bankNum = this.bankNum.replace(/\D/g, '')
                    this.doValidate(field)
                    break
                case 'bankAccNum':
                    break
            }
        },
        async submit() {
            if (!this.allValidated) {
                return
            }

            let postData = {}

            postData.bank_number = this.bankNum
            postData.account_name = this.bankAccName
            postData.account_number = this.bankAccNum

            try {
                let response = await this.$store.dispatch('member/updateBankInfo', postData)

                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '匯款資訊儲存成功')
                } else {
                    this.$store.commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'updateBankInfo',
                            code: response.data.status,
                            isError: true
                        },
                        { root: true }
                    )
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        }
    }
}
</script>