<style lang="scss">
@import '../../sass/variables';

.newMessage__header {
    @extend .popupModalHeader;
}

.newMessage__icon {
    @extend .faIcon;
}
.newMessage__body {
    padding: $pd-popupModal;
    font-size: 0.8rem;
}

$minw-input: 500px;
$minw-input-xs: 280px;
.newMessage__targetAcc {
    width: 100%;
    min-width: $minw-input;
    border: 1px solid $color-border-primary;
    font-size: 0.8rem;

    @media (max-width: $max-w-xs) {
        min-width: $minw-input-xs;
    }
}
.newMessage__message {
    margin-top: 10px;
    font-size: 0.8rem;

    .newMessage__btn {
        font-size: 0.9rem;
    }
}
.newMessage__btnBar {
    text-align: right;
    padding: 0 10px 10px;
}
</style>

<template>
    <BaseModal v-if="isShow">
        <h2
            class="newMessage__header"
            slot="header"
        >
            <font-awesome-icon
                :icon="['far', 'comment-dots']"
                class="newMessage__icon"
            ></font-awesome-icon>新訊息
        </h2>
        <div class="newMessage__body">
            <InputTextSetAccount
                :inputValidated="true"
                :inputValue.sync="account"
                :mode="1"
                :trim="true"
                inputId="targetAcc"
                inputInvalidFeedback="6~20 個英數字"
                inputPlaceholder="輸入對方帳號（必填）"
            />
            <BaseTextareaSet
                :inputValidated="true"
                :inputValue.sync="message"
                :mode="1"
                :rows="5"
                :trim="true"
                class="newMessage__message"
                inputId="message"
                inputInvalidFeedback="訊息必填。"
                inputPlaceholder="輸入訊息（必填）"
            />
        </div>
        <template slot="footer">
            <div class="newMessage__btnBar">
                <b-button
                    @click="closeModel"
                    class="newMessage__btn"
                    variant="danger"
                >{{ getTerm('CANCEL') }}</b-button>
                <b-button
                    :disabled="!isValidate"
                    @click="send"
                    class="newMessage__btn"
                    variant="success"
                >送出</b-button>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus.js'
import { JS_CONFIG } from '../config.js'
import { validateMixin } from '../mixins/validate'
import InputTextSetAccount from './InputTextSetAccount'
import BaseTextareaSet from './global/BaseTextareaSet'

export default {
    name: 'ModalNewMessage',
    mixins: [validateMixin],
    components: { InputTextSetAccount, BaseTextareaSet },
    data: function() {
        return {
            isShow: false,
            account: { value: '', state: null },
            message: { value: '', state: null }
        }
    },
    created() {
        EventBus.$on('show-modal-new-message', this.showModel)
        EventBus.$on('close-modal-new-message', this.closeModel)
    },
    computed: {
        isValidate() {
            return this.account.state && this.message.state
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.message = { value: '', state: null }
            this.account = { value: '', state: null }
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        send() {
            if (!(this.account.state && this.message.showModeltate)) {
                return
            }
            let to = this.account.value,
                from = this.$store.state.member.memberData.data.account,
                content = this.message.value,
                data = { to, from, content }

            try {
                gtag('event', 'userMessage', {
                    event_category: 'message',
                    event_action: 'userMessage',
                    event_label: from,
                    value: to
                })
            } catch (e) {}
            this.$store
                .dispatch('message/sendMessage', { data })
                .then(response => {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '訊息已送出')
                    this.closeModel()
                })
                .catch(e => {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'sendMessage',
                        code: e,
                        isError: true
                    })
                })
        }
    },
    beforeDestroy() {
        EventBus.$off('show-modal-new-message', this.showModel)
        EventBus.$off('close-modal-new-message', this.closeModel)
    }
}
</script>