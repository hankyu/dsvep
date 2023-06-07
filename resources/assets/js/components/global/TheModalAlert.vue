<style lang="scss">
@import '../../../sass/variables';

.alertModal__content {
    padding: 1rem;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 0;
}

.alertModal__contentItem {
    padding-left: 0;
    list-style-type: none;
}

.alertModal__contentItem + .alertModal__contentItem {
    border-top: 1px solid $color-border-light;
    padding-top: 0.25rem;
}

.alertModal__code {
    font-size: 0.7rem;
    margin-bottom: 0;
    color: $lightgray;
}

.alertModal__message {
    margin-bottom: 0.25rem;

    &.alertModal__message--error {
        color: $bs-danger;
    }
}

.alertModal__headerIcon {
    @extend .faIcon;
}

.alertModal__footer {
    @extend .popupModalFooter;
}
</style>

<template>
    <BaseModal
        :maskCloseEvent="modalMode==1?'close-modal-alert':''"
        :modalStatus="modalMode"
        :z="950"
        v-if="isShow"
    >
        <!-- <template v-slot:header>
            <h2 class="alertModal__h2">
                <font-awesome-icon
                    class="alertModal__headerIcon"
                    icon="exclamation-circle"
                />通知
            </h2>
        </template>-->
        <ul class="alertModal__content">
            <li
                class="alertModal__contentItem"
                v-for="alert in alertMessages"
            >
                <p
                    class="alertModal__code"
                    v-if="alert.code"
                >Code: {{alert.code}}</p>
                <p
                    :class="alert.isError ? 'alertModal__message--error' : ''"
                    class="alertModal__message"
                >
                    <font-awesome-icon
                        class="alertModal__headerIcon"
                        icon="exclamation-circle"
                        v-if="alert.isError"
                    />
                    {{alert.message}}
                </p>
            </li>
        </ul>
        <div
            class="alertModal__footer"
            slot="footer"
        >
            <b-button
                @click="closeModal"
                class="alertModal__footerBtn"
                variant="success"
            >{{ getTerm('CONFIRM')}}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'

export default {
    name: 'TheModalAlert',
    data: function() {
        return {
            isShow: false,
            mode: -1
        }
    },
    mounted() {
        EventBus.$on('show-modal-alert', this.showModal)
        EventBus.$on('close-modal-alert', this.closeModal)
    },
    computed: {
        alertMessages() {
            return this.$store.state.alert.alertMessages
        },
        modalMode() {
            if (this.mode != -1) {
                return this.mode
            }

            let hasError = this.$store.state.alert.alertMessages.some(item => {
                return item.isError
            })
            let hasMessage = this.$store.state.alert.alertMessages.some(item => {
                return item.isError ? false : true
            })

            if (hasError && hasMessage) {
                return 2
            } else if (hasError) {
                return 3
            } else {
                return 1
            }
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        closeModal() {
            this.mode = -1
            this.$store.commit('alert/CLEAR_ALERT_MESSAGE')
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        showModal(mode) {
            if (mode) {
                this.mode = mode
            }
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        }
        /* messageClass(alert) {
            return alert.isError ? 'alertModal__message--error' : ''
        } */
    },
    beforeDestroy() {
        EventBus.$off('show-modal-alert', this.showModal)
        EventBus.$off('close-modal-alert', this.closeModal)
    }
}
</script>