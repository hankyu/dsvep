<style lang="scss">
@import '../../../sass/variables';

$halfGutter: 0.25rem;
.contactUs__body {
    @extend .popupModalBody;

    .form-control {
        font-size: 0.8rem;
    }

    .container-fluid {
        padding: 0;
        .row {
            margin-left: -$halfGutter;
            margin-right: -$halfGutter;

            .col,
            .col-md-6,
            .col-12 {
                padding-left: $halfGutter;
                padding-right: $halfGutter;
                padding-bottom: $halfGutter * 2;
            }
        }
    }
}

.contactUs__help {
    font-size: 0.8rem;
    margin-bottom: 0;

    &::before {
        content: 'hint';
        color: $white;
        padding: 0 0.25rem;
        border-radius: 4px;
        background-color: $bs-warning;
        margin-right: 0.25rem;
    }
}

.contactUs__footer {
    padding: 10px;
    text-align: right;
}
</style>

<template>
    <BaseModal
        closeEvent="close-contact-us"
        v-bind="$props"
        v-if="isShow"
    >
        <template v-slot:header>
            <h2 class="popupModalHeader">{{ getPageTitle('CONTACT') }}</h2>
        </template>
        <div class="contactUs__body">
            <b-container fluid>
                <b-row>
                    <b-col>
                        <BaseInputTextSet
                            :inputValidated="true"
                            :inputValue.sync="subject"
                            inputId="contactSubj"
                            inputInvalidFeedback="主旨必填"
                            inputPlaceholder="聯絡主旨"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        cols="12"
                        md="6"
                    >
                        <b-form-input
                            placeholder="您的姓名（選填）"
                            trim
                            v-model="name"
                        ></b-form-input>
                    </b-col>
                    <b-col
                        cols="12"
                        md="6"
                    >
                        <b-form-input
                            placeholder="連絡電話（選填）"
                            trim
                            v-model="phone"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-input
                            placeholder="連絡信箱（選填）"
                            trim
                            v-model="email"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <BaseTextareaSet
                            :inputValidated="true"
                            :inputValue.sync="content"
                            inputId="content"
                            inputInvalidFeedback="聯絡內容必填"
                            inputPlaceholder="聯絡內容"
                        />
                    </b-col>
                </b-row>
            </b-container>
            <p class="contactUs__help">若需要客服人員回覆您的問題，請至少留下一種聯絡方式。</p>
        </div>
        <div
            class="popupModalFooter"
            slot="footer"
        >
            <b-button
                :disabled="submitDisabled"
                @click="submit"
                class="modalWishMaker__footerBtn"
                variant="success"
            >{{ getTerm('SUBMIT')}}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'
import { validateMixin } from '../../mixins/validate'

export default {
    name: 'TheModalContactUs',
    components: {},
    data: function() {
        return {
            isShow: false,
            subject: { value: '', state: null },
            name: '',
            phone: '',
            email: '',
            content: { value: '', state: null }
        }
    },
    mounted() {
        EventBus.$on('show-contact-us', this.showModal)
        EventBus.$on('close-contact-us', this.closeModal)
    },
    computed: {
        submitDisabled() {
            return !this.subject.state || !this.content.state
        }
    },
    methods: {
        getPageTitle(name) {
            return JS_CONFIG.TERMS.PAGE_TITLE[name]
        },
        getTerm(name) {
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
        },
        closeModal() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        submit() {
            let subject = this.subject.value,
                name = this.name,
                phone = this.phone,
                email = this.email,
                content = this.content.value

            this.$store.dispatch('member/contactUs', { subject, name, phone, email, content })
        }
    },
    beforeDestroy() {
        EventBus.$off('show-contact-us', this.showModal)
        EventBus.$off('close-contact-us', this.closeModal)
    }
}
</script>