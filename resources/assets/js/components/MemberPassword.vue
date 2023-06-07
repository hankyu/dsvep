<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/layout/baseFormTable';
</style>


<template>
    <div>
        <template v-if="isGoogleLogin">
            此帳號為 google 登入。若要設定 google 新密碼，請至
            <a
                href="https://myaccount.google.com/personal-info"
                target="_blank"
            >google</a> 設定。
        </template>
        <table
            class="baseFormTable"
            v-else
        >
            <tr>
                <th class="baseFormTable__required">原密碼</th>
                <td role="group">
                    <b-form-input
                        :state="oldPasswordState"
                        @input="doValidate('oldPassword')"
                        placeholder="輸入您的原密碼"
                        trim
                        v-model="oldPassword"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-name-feedback">{{getTerm('PASSWORD_FORMAT_WRONG_DETAIL')}}</b-form-invalid-feedback>
                </td>
            </tr>
            <tr>
                <th class="baseFormTable__required">新密碼</th>
                <td role="group">
                    <b-form-input
                        :state="newPasswordState"
                        @input="doValidate('newPassword')"
                        placeholder="輸入您的新密碼"
                        trim
                        v-model="newPassword"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-name-feedback">{{getTerm('PASSWORD_FORMAT_WRONG_DETAIL')}}</b-form-invalid-feedback>
                </td>
            </tr>
            <tr>
                <th class="baseFormTable__required">確認新密碼</th>
                <td role="group">
                    <b-form-input
                        :state="newPasswordState2"
                        @input="doValidate('newPassword2')"
                        placeholder="再次輸入您的新密碼"
                        trim
                        v-model="newPassword2"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-name-feedback">與新密碼需相同</b-form-invalid-feedback>
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config.js' // JS_CONFIG.MEDIA_PATH
import { validateMixin } from '../mixins/validate'

export default {
    name: 'MemberPassword',
    mixins: [validateMixin],
    data() {
        return {
            oldPasswordState: null,
            oldPassword: '',
            newPasswordState: null,
            newPassword: '',
            newPasswordState2: null,
            newPassword2: ''
        }
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        this.name = this.memberFullData.nickname
        this.gender = this.memberFullData.sex
        this.email = this.memberFullData.email

        EventBus.$emit('do-resize')
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    props: {},
    computed: {
        allValidated() {
            return this.oldPasswordState && this.newPasswordState && this.newPasswordState2
        },
        ...mapGetters({
            memberFullData: 'member/memberFullData',
            isGoogleLogin: 'member/isGoogleLogin'
        })
    },
    methods: {
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        doValidate(field) {
            switch (field) {
                case 'oldPassword':
                    this.oldPasswordState = this.validWordNumberLimit(this.oldPassword, 8, 30)
                    break
                case 'newPassword':
                    this.newPasswordState = this.validWordNumberLimit(this.newPassword, 8, 30)
                    this.newPasswordState2 = this.newPassword == this.newPassword2
                    break
                case 'newPassword2':
                    this.newPasswordState2 = this.newPassword == this.newPassword2
                    break
            }
        },
        async submit() {
            if (!this.allValidated || this.oldPassword == this.newPassword) {
                return
            }

            let postData = {}

            postData.old_password = this.oldPassword
            postData.new_password = this.newPassword

            try {
                let response = await this.$store.dispatch('member/updatePassword', postData)

                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '新密碼儲存成功')
                } else {
                    this.$store.commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'updatePassword',
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