<style lang="scss" scoped>
@import '../../../sass/variables';

.loginModal__h2 {
    @extend .popupModalHeader;
}

.loginModal__content {
    input {
        font-size: 0.8rem;
    }
}

.loginModal__field {
    padding: $pd-popupModal;
    margin-bottom: 0;
}

.loginModal__field + .loginModal__field {
    border-top: 1px solid $gainsboro;
}

#login_way {
    margin-bottom: 0.25rem;
    label {
        font-size: 0.7rem;
    }
}

.loginModal__phoneInputSet {
    margin-bottom: $mb-inputGroup;
}

.loginModal__group {
    position: relative;
    margin-bottom: $mb-inputGroup;
}
$h-PopupModalInput: 2.3rem;
$pl-input: 1.8rem;
$w-faIcon: 1.5rem;
.loginModal__Label {
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

.loginModal__input {
    width: 100%;
    height: $h-PopupModalInput;
    padding-left: $pl-input;
}

.loginModal__inputFeedback {
    display: none;
    font-size: 0.7rem;
    margin-top: 0;
    color: $bs-inputInvalid;
}

.loginModal__btn {
    width: 100%;
    color: $white;
    &:hover,
    &:active {
        color: $white;
    }
}

.loginModal__btn + .loginModal__btn {
    margin-top: 6px;
}

.loginModal__btn--signUp {
    @include btnBgColorCustom($brand-primary);
}

.loginModal__btn--google {
    @include btnBgColorCustom(#4b88ef);
}

.loginModal__btn--facebook {
    @include btnBgColorCustom(#4267b2);
}

.loginModal__footer {
    padding: 10px;
    text-align: right;
}
</style>

<template>
    <BaseModal
        closeEvent="close-login"
        v-bind="$props"
        v-if="isShow"
    >
        <template v-slot:header>
            <h2 class="loginModal__h2">{{ getTerms('MEMBER_LOGIN') }}</h2>
        </template>
        <div class="loginModal__content">
            <div class="loginModal__field">
                <b-form-group
                    id="login_way"
                    label
                >
                    <b-form-radio-group
                        :options="options"
                        name="plain-inline"
                        plain
                        v-model="loginWay"
                    />
                    <!-- @change="switchLoginWay" -->
                </b-form-group>
                <InputTextSetAccount
                    :inputValidated="true"
                    :inputValue.sync="account"
                    :mode="1"
                    class="loginModal__group"
                    inputId="acc"
                    v-if="loginWay=='acc'"
                />
                <InputTextSetEmail
                    :inputValidated="true"
                    :inputValue.sync="email"
                    :mode="1"
                    class="loginModal__group"
                    inputId="email"
                    v-else-if="loginWay=='email'"
                />
                <PhoneInputGroup
                    :phoneInfo.sync="cellphoneInfo"
                    class="loginModal__phoneInputSet"
                    v-else
                />
                <InputTextSetPassword
                    :inputValidated="true"
                    :inputValue.sync="password"
                    :mode="1"
                    @keyup.native.enter="login"
                    class="loginModal__group"
                    inputId="password"
                />
                <b-btn
                    :disabled="!isValid"
                    @click="login"
                    class="loginModal__btn"
                    variant="success"
                >{{ getTerms('MEMBER_LOGIN') }}</b-btn>
                <b-btn
                    @click="goPasswordGetter"
                    class="loginModal__btn"
                    variant="warning"
                >{{ getTerms('FORGET_PASSWORD') }}</b-btn>
                <b-btn
                    @click="goSignUp"
                    class="loginModal__btn loginModal__btn--signUp"
                    variant="primary"
                >{{ getTerms('SIGNUP') }}</b-btn>
            </div>
            <div class="loginModal__field">
                <b-btn
                    @click="googleLogin"
                    class="loginModal__btn loginModal__btn--google"
                    variant="primary"
                >Ｇoogle 登入</b-btn>
                <!-- <b-btn
                    class="loginModal__btn loginModal__btn--facebook"
                    variant="primary"
                >facebook 登入</b-btn>-->
            </div>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'
import { validateMixin } from '../../mixins/validate'
import { COOKIE_KIT } from '../../class/cookieKit'
import InputTextSetAccount from '../InputTextSetAccount'
import InputTextSetEmail from '../InputTextSetEmail'
import PhoneInputGroup from '../PhoneInputGroup'
import InputTextSetPassword from '../InputTextSetPassword'

export default {
    name: 'TheModalLogin',
    // extends: BaseModal,
    mixins: [validateMixin],
    components: {
        InputTextSetAccount,
        InputTextSetEmail,
        PhoneInputGroup,
        InputTextSetPassword
    },
    data: function() {
        return {
            isShow: false,
            account: { value: '', state: null },
            email: { value: '', state: null },
            cellphoneInfo: { cellphone: '', state: null },
            password: { value: '', state: null },
            loginWay: 'acc',
            options: [
                { text: '平台帳號', value: 'acc' },
                { text: 'Email', value: 'email' },
                { text: '手機', value: 'phone' }
            ]
        }
    },
    mounted() {
        EventBus.$on('prompt-login', this.showModal)
        EventBus.$on('close-login', this.closeModal)
        // EventBus.$on('phone-state-change', this.getPhoneInputState)
    },
    computed: {
        isValid() {
            let identifyState
            switch (this.loginWay) {
                case 'acc':
                    identifyState = this.account.state
                    break
                case 'email':
                    identifyState = this.email.state
                    break
                case 'phone':
                    identifyState = this.cellphoneInfo.state
                    break
            }
            return this.password.state && identifyState
        }
    },
    methods: {
        getTerms(name) {
            return JS_CONFIG.TERMS[name]
        },
        /* switchLoginWay() {
            this.inputAccount = ''
            this.accountState = null
            if (!this.inputPassword) {
                this.passwordState = null
            }
        }, */
        showModal() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            COOKIE_KIT.deleteCookie('r_token')
            COOKIE_KIT.deleteCookie('m_id')
        },
        closeModal() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        login() {
            let condition1 = this.loginWay == 'acc' && !this.account.state, // 帳號不對
                condition2 = this.loginWay == 'phone' && !this.cellphoneInfo.state, // 手機不對
                condition3 = this.loginWay == 'email' && !this.email.state, // 帳號或 email 不對
                condition4 = !this.password.state // 密碼不對

            if (condition1 || condition2 || condition3 || condition4) {
                return false
            }

            let account
            switch (this.loginWay) {
                case 'acc':
                    account = this.account.value
                    break
                case 'email':
                    account = this.email.value
                    break
                case 'phone':
                    account = this.cellphoneInfo.cellphone
                    break
            }

            this.$store
                .dispatch('member/login', {
                    account,
                    password: this.password.value,
                    mode: this.loginWay
                })
                .then(response => {
                    if (response.data.status == 0) {
                        let snapshot = response.data.data

                        COOKIE_KIT.setCookie('r_token', snapshot.remember_token)
                        COOKIE_KIT.setCookie('m_id', snapshot.m_id)
                        this.$store.commit('alert/SHOW_COMPLETE_ALERT', '登入成功')
                        this.$store.commit('member/SET_MEMBER_DATA', {
                            name: 'memberData',
                            data: snapshot
                        })
                        if (this.$route.name == 'becomeTeacherIntro' && snapshot.t_id) {
                            if (snapshot.role & 16) {
                                // 已經是老師，redirect 導師室
                                this.$router.replace('/teacher/' + snapshot.t_id)
                            } else {
                                // 申請講師中，或申請失敗
                                this.$router.replace('/becometeacher')
                            }
                        } else {
                            this.$store.commit('lesson/INIT_ALL_PROMOTING_DATAS')
                            EventBus.$emit('reload-lessons')
                        }

                        this.$store.dispatch('message/getRealTimeMessage')

                        if (this.$store.state.routeAfterLogin) {
                            let path = this.$store.state.routeAfterLogin
                            this.$store.state.routeAfterLogin = ''
                            this.$router.replace(path)
                        }
                        this.closeModal()
                    } else {
                        this.$store.commit('member/SET_MEMBER_LOAD_STATUS', {
                            name: 'memberData',
                            status: 2
                        })
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'login',
                            code: response.data.status,
                            isError: true
                        })
                    }
                })
                .catch(e => {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'unknown',
                        code: e,
                        isError: true
                    })
                })
        },
        goSignUp() {
            this.closeModal()
            EventBus.$emit('prompt-signup')
        },
        goPasswordGetter() {
            this.closeModal()
            EventBus.$emit('prompt-password-getter')
        },
        googleLogin() {
            location.href = '/oauth/google'
        }
    },
    beforeDestroy() {
        EventBus.$off('prompt-login', this.showModal)
        EventBus.$off('close-login', this.closeModal)
        // EventBus.$off('phone-state-change', this.getPhoneInputState)
    }
}
</script>