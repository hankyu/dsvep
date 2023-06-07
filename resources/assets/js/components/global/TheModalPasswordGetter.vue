<style lang="scss" scoped>
@import '../../../sass/variables';

.passwordGetterModal__h2 {
    @extend .popupModalHeader;
}

.passwordGetterModal__content {
    max-width: 400px;
    input {
        font-size: 0.8rem;
    }
}

#clue1 {
    margin-bottom: 0.25rem;
    label {
        font-size: 0.7rem;
    }
}

.passwordGetterModal__field {
    padding: $pd-popupModal;
    margin-bottom: 0;
}

.passwordGetterModal__field + .passwordGetterModal__field {
    border-top: 1px solid $gainsboro;
}

.passwordGetterModal__phoneInputSet {
    margin-bottom: $mb-inputGroup;
}

.passwordGetterModal__group {
    margin-bottom: $mb-inputGroup;
    position: relative;
}
$h-PopupModalInput: 2.3rem;
$pl-input: 1.8rem;
$w-faIcon: 1.5rem;
.passwordGetterModal__Label {
    position: absolute;
    left: $pl-input - $w-faIcon;
    height: $h-PopupModalInput;
    line-height: $h-PopupModalInput;
    color: $font-primary;
    margin-bottom: 0;

    .fontAwesomeIcon {
        width: $w-faIcon;
        color: $darkgray;
    }
}

.passwordGetterModal__input {
    width: 100%;
    height: $h-PopupModalInput;
    padding-left: $pl-input;
}

.passwordGetterModal__btn {
    width: 100%;
    color: $white;
    &:hover,
    &:active {
        color: $white;
    }
}

.passwordGetterModal__btn + .passwordGetterModal__btn {
    margin-top: $mb-inputGroup;
}

.passwordGetterModal__btn--signUp {
    @include btnBgColorCustom($brand-primary);
}

.passwordGetterModal__btn--google {
    @include btnBgColorCustom(#4b88ef);
}

.passwordGetterModal__btn--facebook {
    @include btnBgColorCustom(#4267b2);
}

.passwordGetterModal__footer {
    padding: 0.5rem;
    text-align: right;
}
</style>

<template>
    <BaseModal
        closeEvent="close-password-getter"
        v-bind="$props"
        v-if="isShow"
    >
        <template v-slot:header>
            <h2 class="passwordGetterModal__h2">{{ getTerms('FORGET_PASSWORD') }}</h2>
        </template>
        <div class="passwordGetterModal__content">
            <div
                class="passwordGetterModal__field"
                v-if="sendStatus==0"
            >
                <b-form-group
                    id="clue1"
                    label
                >
                    <b-form-radio-group
                        :options="optionsClue1"
                        name="plain-inline"
                        plain
                        v-model="clue1"
                    />
                </b-form-group>
                <InputTextSetAccount
                    :inputValidated="true"
                    :inputValue.sync="account"
                    :mode="1"
                    class="passwordGetterModal__group"
                    inputId="acc"
                    v-if="clue1 =='acc'"
                />

                <PhoneInputGroup
                    :phoneInfo.sync="cellphoneInfo"
                    class="passwordGetterModal__phoneInputSet"
                    v-else
                />
                <InputTextSetEmail
                    :inputValidated="true"
                    :inputValue.sync="email"
                    :mode="1"
                    class="passwordGetterModal__group"
                    inputId="email"
                />

                <p class="passwordGetterModal__notification">通過驗證驗證之手機，才能配合 Email 查詢平台登入密碼。若手機尚未驗證，請使用「平台帳號」配合 Email 查詢。</p>
            </div>
            <LoadingSet v-else />
            <div
                class="popupModalFooter"
                slot="footer"
                v-if="sendStatus==0"
            >
                <b-btn
                    :disabled="!isValid"
                    @click="getNewPassword"
                    class="passwordGetterModal__btn"
                    variant="warning"
                >獲得新密碼</b-btn>
                <b-btn
                    @click="goLogin"
                    class="passwordGetterModal__btn passwordGetterModal__btn--signUp"
                    variant="primary"
                >回到登入</b-btn>
            </div>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus.js'
import { JS_CONFIG } from '../../config'
import { validateMixin } from '../../mixins/validate'
import PhoneInputGroup from '../PhoneInputGroup'
import InputTextSetAccount from '../InputTextSetAccount'
import InputTextSetEmail from '../InputTextSetEmail'
import LoadingSet from '../LoadingSet'

export default {
    name: 'TheModalPasswordGetter',
    mixins: [validateMixin],
    data: function() {
        return {
            isShow: false,
            account: { value: '', state: null },
            cellphoneInfo: { cellphone: '', state: null },
            email: { value: '', state: null },
            clue1: 'acc',
            optionsClue1: [{ text: '平台帳號', value: 'acc' }, { text: '手機', value: 'phone' }],
            sendStatus: 0 // 0: init, 1: ing 2: fail
        }
    },
    components: {
        PhoneInputGroup,
        InputTextSetAccount,
        InputTextSetEmail,
        LoadingSet
    },
    mounted() {
        EventBus.$on('prompt-password-getter', this.showModal)
        EventBus.$on('close-password-getter', this.closeModal)
    },
    computed: {
        isValid() {
            return (
                (this.clue1 == 'acc' ? this.account.state : this.cellphoneInfo.state) &&
                this.email.state
            )
        }
    },
    methods: {
        getTerms(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModal() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModal() {
            this.account = { value: '', state: null }
            this.cellphoneInfo = { cellphone: '', state: null }
            this.email = { value: '', state: null }
            this.clue1 = 'acc'
            this.sendStatus = 0
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        async getNewPassword() {
            let condition1 = this.clue1 == 'phone' && !this.cellphoneInfo.state, // 手機不對
                condition2 = this.clue1 == 'acc' && !this.account.state, // 帳號不對
                condition3 = !this.email.state // email 不對

            if (condition1 || condition2 || condition3) {
                return false
            }

            let postData = { email: this.email.value }

            if (this.clue1 == 'phone') {
                postData.cellphone = this.cellphoneInfo.cellphone
            } else {
                postData.account = this.account.value
            }

            this.sendStatus = 1
            try {
                let response = await this.$store.dispatch('member/getPlainPassword', postData)

                if (response.data.status == 0) {
                    this.sendStatus = 0
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '密碼 Email 已寄出')
                    this.closeModal()
                } else {
                    this.sendStatus = 2
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getPlainPassword',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.sendStatus = 2
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        goLogin() {
            this.closeModal()
            EventBus.$emit('prompt-login')
        }
    },
    beforeDestroy() {
        EventBus.$off('prompt-password-getter', this.showModal)
        EventBus.$off('close-password-getter', this.closeModal)
    }
}
</script>