<style lang="scss" scoped>
@import '../../sass/variables';

.confirmPhone__title {
    @extend .popupModalHeader;
}

.confirmPhone__content {
    position: relative;
    padding: 1rem;
    width: 400px;

    @media (max-width: $max-w-xs) {
        width: auto;
    }
}

.confirmPhone__group {
    margin-bottom: $mb-inputGroup;
}

.confirmPhone__phoneInputSet {
    margin-bottom: 1.5rem;
}

.confirmPhone__desc {
    margin-bottom: 1.5rem;

    em {
        @extend .color-emphasized2;
        font-style: normal;
    }
}

.confirmPhone__footer {
    @extend .popupModalFooter;
}

.confirmPhone__footerBtn {
    @extend .popupModalFooterBtn;
}

.confirmPhone__loading {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: $white-semi-transparent;
}
</style>

<template>
    <BaseModal
        class="becomeTeacherFillData"
        closeEvent="close-phone-setter"
        v-if="isShow"
    >
        <h2
            class="confirmPhone__title"
            slot="header"
        >
            <font-awesome-icon
                :icon="['far', 'address-card']"
                class="faIcon"
            />設定手機號碼
        </h2>
        <div class="confirmPhone__content">
            <PhoneInputGroup
                :phoneInfo.sync="cellphoneInfo"
                class="confirmPhone__phoneInputSet"
                ref="phoneNumberInput"
            />
            <!-- :phone="cellphone" -->
            <div class="confirmPhone__desc">
                <p>
                    會員帳號經設定手機號碼並
                    <em>驗證</em>後，即可
                    <em>購買課程</em>，收到課程
                    <em>簡訊通知</em>。更可以利用
                    <em>手機號碼</em>搭配
                    <em>平台密碼</em>
                    登入平台。
                </p>
            </div>
        </div>
        <div
            class="confirmPhone__footer"
            slot="footer"
        >
            <ButtonRegetVerifyCode
                :disabledMode="true"
                :setupTime="{ hh: 0, mm: 1, ss: 0 }"
                :text="btnText"
                @click.native="getPhoneVerificationCode"
                class="phoneVerify__footerBtn"
                ref="buttonGetVerifyCode"
                v-show="checkedLastDeliverTime"
                variant="info"
            />
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import PhoneInputGroup from './PhoneInputGroup'
import ButtonRegetVerifyCode from './ButtonRegetVerifyCode'

export default {
    name: 'ModalPhoneSetter',
    components: {
        PhoneInputGroup,
        ButtonRegetVerifyCode
    },
    created() {
        EventBus.$on('show-phone-setter', this.showModel)
        EventBus.$on('close-phone-setter', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            checkedLastDeliverTime: false,
            isReget: false,
            cellphoneInfo: {
                cellphone: '',
                state: null
            }
        }
    },
    props: {},
    computed: {
        isValidatedOK() {
            return this.cellphoneInfo.state && this.checkedLastDeliverTime
        },
        btnText() {
            return this.isReget ? '重新寄送驗證碼' : '取得驗證碼'
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        async showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            this.cellphoneInfo.cellphone = this.$store.state.member.memberData.data.cellphone

            this.checkedLastDeliverTime = false
            try {
                let response = await this.$store.dispatch('member/getPhoneVerificationCodeTime')

                if (response.data.status == 0) {
                    this.checkedLastDeliverTime = true

                    let leftTime
                    if (response.data.data >= 60) {
                        leftTime = 1
                    } else {
                        this.isReget = true
                        leftTime = 60 - response.data.data
                    }
                    this.$refs.buttonGetVerifyCode.start({ hh: 0, mm: 0, ss: leftTime })
                } else {
                    this.checkedLastDeliverTime = false
                    this.$refs.buttonGetVerifyCode.start()
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getPhoneVerificationCodeTime',
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
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        getPhoneVerificationCode() {
            EventBus.$emit('show-phone-verify', this.cellphoneInfo.cellphone)
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-phone-setter', this.showModel)
        EventBus.$off('close-phone-setter', this.closeModel)
    }
}
</script>