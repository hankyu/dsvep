<style lang="scss" scoped>
@import '../../../sass/variables';

.signUpModal__h2 {
    @extend .popupModalHeader;
}

// $pdrl-signUpModalContent:
.signUpModal__content {
    input {
        font-size: 0.8rem;
    }
    padding: $pd-popupModal-2col-body ($pd-popupModal-2col-body - 0.7rem);

    @media (max-width: $max-w-xs) {
        padding: $pd-popupModal-2col-body-xs ($pd-popupModal-2col-body-xs - 0.7rem);
    }
}

.signUpModal__container--footer {
    border-top: 1px solid $gainsboro;
    padding: $ptb-popupModal-2col-footer $plr-popupModal-2col-footer $ptb-popupModal-2col-footer;

    @media (max-width: $max-w-xs) {
        padding: $ptb-popupModal-2col-footer-xs $plr-popupModal-2col-footer-xs
            $ptb-popupModal-2col-footer-xs;
    }
}

.signUpModal__group {
    margin-bottom: $mb-inputGroup;
    position: relative;
}
$h-PopupModalInput: 2.3rem;
$pl-input: 1.8rem;
$w-faIcon: 1.5rem;
.signUpModal__Label {
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

.signUpModal__input {
    width: 100%;
    height: $h-PopupModalInput;
    padding-left: $pl-input;
}

.signUpModal__btn {
    width: 100%;
    color: $white;
    &:hover,
    &:active {
        color: $white;
    }
}

.signUpModal__btn {
    margin-top: $mb-inputGroup;
}

.signUpModal__btn--signUp {
    @include btnBgColorCustom($brand-primary);
}

.signUpModal__btn--google {
    @include btnBgColorCustom(#4b88ef);
}

.signUpModal__btn--facebook {
    @include btnBgColorCustom(#4267b2);
}

.signUpModal__footer {
    padding: 0.5rem;
    text-align: right;
}
</style>

<template>
    <BaseModal
        closeEvent="close-signup"
        v-bind="$props"
        v-if="isShow"
    >
        <template v-slot:header>
            <h2 class="signUpModal__h2">{{ getTerms('SIGNUP') }}</h2>
        </template>
        <div class="signUpModal__content">
            <LoadingSet v-if="sending" />
            <b-container
                class="signUpModal__container"
                fluid
                v-else
            >
                <b-row>
                    <b-col
                        cols="12"
                        md="6"
                    >
                        <InputTextSetAccount
                            :inputValidated="true"
                            :inputValue.sync="account"
                            :mode="1"
                            class="signUpModal__group"
                            inputId="acc"
                        />
                        <InputTextSetPassword
                            :inputValidated="true"
                            :inputValue.sync="password"
                            :mode="1"
                            class="signUpModal__group"
                            inputId="password"
                        />
                        <InputTextSetPassword
                            :confirmValue="password.value"
                            :inputValidated="true"
                            :inputValue.sync="passwordConfirm"
                            :mode="1"
                            class="signUpModal__group"
                            inputId="passwordConfirm"
                            inputInvalidFeedback="8~30字，須含英文數字，且須與密碼同"
                            inputPlaceholder="再輸入一次密碼"
                        />
                    </b-col>
                    <b-col
                        cols="12"
                        md="6"
                    >
                        <b-form-group class="signUpModal__group">
                            <label
                                class="signUpModal__Label"
                                for="inputName"
                            >
                                <font-awesome-icon
                                    class="fontAwesomeIcon"
                                    icon="user"
                                />
                            </label>
                            <b-form-input
                                :state="nameState"
                                @input="doValidate('name')"
                                class="signUpModal__input"
                                placeholder="姓名"
                                required
                                type="email"
                                v-model="inputName"
                            />
                            <b-form-invalid-feedback class="loginModal__inputFeedback">姓名欄位必填</b-form-invalid-feedback>
                        </b-form-group>
                        <InputTextSetEmail
                            :inputValidated="true"
                            :inputValue.sync="email"
                            :mode="1"
                            class="signUpModal__group"
                            inputId="email"
                        />
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <template v-slot:footer>
            <b-container
                class="signUpModal__container signUpModal__container--footer"
                fluid
                v-if="!sending"
            >
                <b-row>
                    <b-col
                        cols="12"
                        md="6"
                    >
                        <b-btn
                            @click="goLogin"
                            class="signUpModal__btn"
                            variant="warning"
                        >已有會員</b-btn>
                    </b-col>
                    <b-col
                        cols="12"
                        md="6"
                    >
                        <b-btn
                            :disabled="!isValid"
                            @click="signUp"
                            class="signUpModal__btn signUpModal__btn--signUp"
                            variant="primary"
                        >{{ getTerms('SIGNUP') }}</b-btn>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'
import { validateMixin } from '../../mixins/validate'
import InputTextSetAccount from '../InputTextSetAccount'
import InputTextSetEmail from '../InputTextSetEmail'
import InputTextSetPassword from '../InputTextSetPassword'
import LoadingSet from '../LoadingSet'

export default {
    name: 'TheModalSignUp',
    // extends: BaseModal,
    mixins: [validateMixin],
    components: { InputTextSetAccount, InputTextSetEmail, InputTextSetPassword, LoadingSet },
    data: function() {
        return {
            isShow: false,
            account: { value: '', state: null },
            password: { value: '', state: null },
            passwordConfirm: { value: '', state: null },
            nameState: null,
            inputName: '',
            email: { value: '', state: null },
            sending: false
        }
    },
    mounted() {
        EventBus.$on('prompt-signup', this.showModal)
        EventBus.$on('close-signup', this.closeModal)
    },
    computed: {
        isValid() {
            return (
                this.account.state &&
                this.password.state &&
                this.passwordConfirm.state &&
                this.nameState &&
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
            this.password = { value: '', state: null }
            this.passwordConfirm = { value: '', state: null }
            this.nameState = null
            this.inputName = ''
            this.email = { value: '', state: null }
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        goLogin() {
            this.closeModal()
            EventBus.$emit('prompt-login')
        },
        async signUp() {
            if (
                !(
                    this.account.state &&
                    this.password.state &&
                    this.passwordConfirm.state &&
                    this.nameState &&
                    this.email.state
                )
            ) {
                return
            }

            this.sending = true
            try {
                let response = await this.$store.dispatch('member/signUp', {
                    acc: this.account.value,
                    psw: this.password.value,
                    name: this.inputName,
                    email: this.email.value
                })
                if (response.data.status == 0) {
                    // this.$store.commit('alert/SHOW_COMPLETE_ALERT', '註冊完成')
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        messageMode: true,
                        api:
                            '註冊驗證信已寄送至該信箱，若未收到，請您檢查垃圾郵件；或至「基本資料頁」點擊「' +
                            this.getTerms('RESEND_EMAIL_VALIDATION') +
                            '」按鈕。'
                    })
                    this.closeModal()
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'signUp',
                        code: response.data.status,
                        isError: true
                    })
                    this.sending = false
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
                this.sending = false
            }
        },
        doValidate(v) {
            switch (v) {
                case 'name':
                    this.nameState = this.isFilled(this.inputName)
                    break
            }
        }
    },
    beforeDestroy() {
        EventBus.$off('prompt-signup', this.showModal)
        EventBus.$off('close-signup', this.closeModal)
    }
}
</script>