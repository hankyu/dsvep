<style lang="scss" scoped>
@import '../../sass/variables';

.emailVerifySender__content {
    position: relative;
    padding: 1rem;
    width: 400px;

    @media (max-width: $max-w-xs) {
        width: auto;
    }
}

.emailVerifySender__desc {
    margin-top: 1rem;
    font-size: 0.9rem;

    em {
        @extend .color-emphasized2;
        font-style: normal;
    }
}
</style>

<template>
    <BaseModal class="emailVerifySender" closeEvent="close-email-verify-sender" v-if="isShow">
        <h2 class="popupModalHeader" slot="header">
            <font-awesome-icon :icon="['far', 'address-card']" class="faIcon" />Email 尚未驗證
        </h2>
        <div class="emailVerifySender__content">
            <InputTextSetEmail
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="email"
                inputId="email"
                v-if="isShow && sendStatus == 0"
            />
            <!-- :phone="cellphone" -->
            <div class="emailVerifySender__desc" v-if="sendStatus == 0">
                <p>
                    註冊時已發送 Email 驗證信至 Email
                    信箱。若收件夾及垃圾郵件都沒收到驗證信，可重新發送驗證信。(可更改修正 Email
                    信箱)
                </p>
                <p>
                    會員 Email
                    <em>驗證</em>後，即可 <em>購買課程</em>，收到課程
                    <em>Email 通知</em>。且可以利用 <em>Email</em>搭配
                    <em>平台密碼</em>
                    登入平台。
                </p>
            </div>
            <LoadingSet v-else-if="sendStatus == 1" />
            <div v-else>
                Email 驗證信已寄出。
                <br />請至設定的 Email 信箱收信，並點擊驗證帳號按鈕。
            </div>
        </div>
        <div class="popupModalFooter" slot="footer">
            <b-button
                :disabled="!isValidatedOK"
                @click="send"
                class="popupModalFooterBtn"
                v-if="sendStatus == 0"
                variant="success"
                >重新發送</b-button
            >
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import InputTextSetEmail from './InputTextSetEmail'
import LoadingSet from './LoadingSet'

export default {
    name: 'ModalEmailVerifySender',
    components: {
        InputTextSetEmail,
        LoadingSet
    },
    created() {
        EventBus.$on('show-email-verify-sender', this.showModel)
        EventBus.$on('close-email-verify-sender', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            email: {
                value: '',
                state: null
            },
            initValidate: false,
            sendStatus: 0 // 0: default, 1: sending, 2: sent
        }
    },
    props: {},
    computed: {
        isValidatedOK() {
            return this.email.state
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            if (this.$store.state.member.memberFullData.data.email) {
                this.email.value = this.$store.state.member.memberFullData.data.email
                this.initValidate = true
            }
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        async send() {
            this.sendStatus = 1
            try {
                let response = await this.$store.dispatch(
                    'member/sendEmailVerification',
                    this.email.value
                )
                if (response.data.status == 0) {
                    this.sendStatus = 2
                    EventBus.$emit('email-verify-sent', this.email.value)
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'sendEmailVerification',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        }
    },
    beforeDestroy() {
        EventBus.$off('show-email-verify-sender', this.showModel)
        EventBus.$off('close-email-verify-sender', this.closeModel)
    }
}
</script>
