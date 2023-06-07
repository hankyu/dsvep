<style lang="scss" scoped>
@import '../../sass/variables';

.phoneVerify__title {
    @extend .popupModalHeader;
}

.phoneVerify__content {
    width: 500px;
    padding: 1rem;

    @media (max-width: $max-w-xs) {
        padding: 0.5rem;
        width: auto;
    }
}

.phoneVerify__originImgContainer {
    width: 402px;
    height: 302px;
    background-color: $dark;
    padding: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: $max-w-xs) {
        width: 302px;
        height: 302px;
    }
    /* @media (max-width: $max-w-sm) {
        width: 402px;
        height: 402px;
    } */
    @media (max-width: $max-w-xxs) {
        width: 242px;
        height: 242px;
    }
}

.phoneVerify__originImg {
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
}

.phoneVerify__fileInputSet {
    position: relative;
    width: 120px;
    margin: auto;
    margin-top: 0.5rem;
}

.phoneVerify__fileInputFakeBtn {
    width: 100%;
    font-size: 0.9rem;
}

.phoneVerify__imgFileInputLable {
    width: 100%;
    font-size: 0.9rem;
}

.phoneVerify__fileInput {
    display: none;
}

.phoneVerify__footer {
    @extend .popupModalFooter;

    .phoneVerify__footerBtn {
        @extend .popupModalFooterBtn;
    }

    @media (max-width: $max-w-xs) {
        padding: 0.5rem;

        .phoneVerify__footerBtn {
            width: 100%;
        }
        .phoneVerify__footerBtn + .phoneVerify__footerBtn {
            margin-top: 0.25rem;
        }
    }
}

.phoneVerify__loading {
    min-height: 0;
    margin-top: 10px;
}
</style>

<template>
    <BaseModal
        class="phoneVerify"
        closeEvent="close-phone-verify"
        v-if="isShow"
    >
        <h2
            class="phoneVerify__title"
            slot="header"
        >
            <font-awesome-icon
                class="faIcon"
                icon="user-check"
            />手機驗證
        </h2>
        <div class="phoneVerify__content">
            <div
                class="phoneVerify__container"
                v-if="sendStatus==3"
            >
                驗證碼簡訊已發送至 {{cellphone}}，請於10分鐘內完成驗證。若未能在時間內驗證完成，請點擊「重新發送驗證碼」按鈕，發送新的驗證碼。
                <b-form-group class="phoneVerify__group">
                    <b-form-input
                        :state="codeState"
                        @input="doValidate"
                        class="phoneVerify__input"
                        id="inputPassword"
                        placeholder="請填寫驗證碼"
                        required
                        type="text"
                        v-model="code"
                    />
                    <b-form-invalid-feedback class="phoneVerify__inputFeedback">必填。</b-form-invalid-feedback>
                </b-form-group>
            </div>
            <div v-else-if="sendStatus==1">
                正在發送驗證碼簡訊至 {{cellphone}}
                <LoadingSet class="phoneVerify__loading" />
            </div>
            <div v-else-if="sendStatus == 2">發送驗證碼簡訊至 {{cellphone}} 似乎發生問題，請檢查手機簡訊。若未收到驗證碼簡訊，請點擊「重新發送驗證碼」按鈕。</div>
        </div>
        <div
            class="phoneVerify__footer"
            slot="footer"
        >
            <ButtonRegetVerifyCode
                :disabledMode="true"
                :setupTime="{ hh: 0, mm: 1, ss: 0 }"
                @click.native="getCode"
                class="phoneVerify__footerBtn"
                ref="buttonRegetVerifyCode"
                text="重新寄送驗證碼"
                variant="info"
            />
            <ButtonVerifyPhone
                :disabledMode="false"
                :setupTime="{ hh: 0, mm: 10, ss: 0 }"
                @click.native="sendCode"
                class="phoneVerify__footerBtn"
                ref="buttonVerifyPhone"
                text="驗證手機"
                variant="danger"
            />
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import { setTimeout } from 'timers'
import LoadingSet from './LoadingSet'
import ButtonRegetVerifyCode from './ButtonRegetVerifyCode'
import ButtonVerifyPhone from './ButtonVerifyPhone'

export default {
    name: 'ModalPhoneVerify',
    components: {
        LoadingSet,
        ButtonRegetVerifyCode,
        ButtonVerifyPhone
    },
    created() {
        EventBus.$on('show-phone-verify', this.showModel)
        EventBus.$on('close-phone-verify', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            cellphone: '',
            sendStatus: 0, // 0: 尚未傳送簡訊, 1: 傳送中, 2: 傳送失敗, 3: 傳送成功
            codeState: null,
            code: ''
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel(cellphone) {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            this.cellphone = cellphone
            this.sendStatus = 1
            this.code = ''
            this.getCode()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        async getCode() {
            try {
                this.sendStatus = 1

                let response = await this.$store.dispatch(
                    'member/getPhoneVerificationCode',
                    this.cellphone
                )
                if (response.data.status == 0) {
                    // 發送成功
                    this.sendStatus = 3
                    this.$refs.buttonRegetVerifyCode.start({
                        hh: 0,
                        mm: 0,
                        ss: 60 - response.data.data
                    })
                    this.$refs.buttonVerifyPhone.start({
                        hh: 0,
                        mm: 9,
                        ss: 60 - response.data.data
                    })
                } else {
                    this.sendStatus = 2
                    this.$refs.buttonRegetVerifyCode.start()
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getPhoneVerificationCode',
                        code: response.data.status,
                        isError: true
                    })
                    EventBus.$emit('show-phone-setter')
                    this.closeModel()
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        async sendCode() {
            try {
                this.sendStatus = 1

                let response = await this.$store.dispatch(
                    'member/checkPhoneVerificationCode',
                    this.code
                )
                this.sendStatus = 3
                if (response.data.status == 0) {
                    // 發送成功
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '手機驗證成功')
                    EventBus.$emit('phone-verfiy-completed')
                    this.closeModel()
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'checkPhoneVerificationCode',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.sendStatus = 3
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'checkPhoneVerificationCode',
                    code: e,
                    isError: true
                })
            }
        },
        doValidate() {}
    },
    beforeDestroy() {
        EventBus.$off('show-phone-verify', this.showModel)
        EventBus.$off('close-phone-verify', this.closeModel)
    }
}
</script>