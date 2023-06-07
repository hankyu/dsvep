<style lang="scss">
@import '../../sass/variables';

.messageSystem__ui {
    font-size: 0.9rem;
}

.pageH1 {
    border-bottom: none;
    margin-bottom: 0;
}

.wrapper.messageSystem__ui {
    @media (max-width: $max-w-xs) {
        margin-left: 0;
        margin-right: 0;
    }
}

$w-messageSystemList: 280px;
$h-messageSystemHeader: 60px;
$h-messageSystemContent: calc(100% - #{$h-messageSystemHeader});
.messageSystem__container {
    border: 1px solid $color-border-primary;
    height: 70vh;
    display: flex;
    background-color: $white;

    @media (max-width: $max-w-xs) {
        display: block;
        position: relative;
        border-left: none;
        border-right: none;
    }
}

.messageSystem__list {
    border-right: 1px solid $color-border-primary;
    width: $w-messageSystemList;
    height: 100%;
    transition: left 0.5s ease-in-out;
    background-color: $white;

    .messageSystem__switchBtn {
        display: none;
    }

    @media (max-width: $max-w-xs) {
        position: absolute;
        width: 100%;
        left: -100%;
        z-index: 200;

        .messageSystem__switchBtn {
            display: inline-block;
            position: absolute;
            right: -56px;
            top: 10px;
            font-size: 0.9rem;
            margin-left: 3px;
        }

        &.messageSystem__list--active {
            left: 0;

            .messageSystem__switchBtn {
                position: static;
                right: auto;
            }
        }
    }
}

$pd-header: 0.25rem;
.messageSystem__listHeader {
    height: $h-messageSystemHeader;
    text-align: right;
    padding: $pd-header;
    border-bottom: 1px solid $color-border-primary;
    @include verticalShadow(1px);

    &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
}

.messageSystem__newMessageBtn {
    font-size: 0.9rem;
}

.messageSystem__loading {
    height: $h-messageSystemContent;
}

.messageSystem__listContent {
    overflow-y: auto;
    padding: 0;
    list-style-type: none;
    height: $h-messageSystemContent;
    margin-bottom: 0;

    @media (max-width: $max-w-xs) {
    }
}

.messageSystem__listContentItem {
    padding: 0.5rem;
    border-bottom: 1px solid $gainsboro;
    display: flex;
    cursor: pointer;

    &:hover,
    &:active,
    &.messageSystem__listContentItem--curr {
        background-color: $gainsboro;
    }
}

.messageSystem__info {
    flex: 1;
    min-width: 0;
    padding-left: $pd-header;
}

.messageSystem__name {
    margin-top: $pd-header;
    font-size: 1.2rem;
    margin-bottom: 0;
    width: 100%;
    @extend .singleLineEllipsis;
}

.messageSystem__unread {
    margin-bottom: 0;
    font-size: 0.8rem;
    color: $brand-primary;
}

.messageSystem__contentContainer {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.messageSystem__contentHeader {
    height: $h-messageSystemHeader;
    border-bottom: 1px solid $color-border-primary;
    @include verticalShadow(1px);
    font-size: 1.2rem;
    padding-top: 14px;
    padding-left: $pd-header;

    @media (max-width: $max-w-xs) {
        padding-left: 60px;
    }
}

.messageSystem__content {
    overflow-y: auto;
    padding: 0;
    list-style-type: none;
    flex: 1;
    margin-bottom: 0;
    padding: 0.5rem 0;
}

.messageSystem__icon {
    @extend .faIcon;
}

$pd-messageSystemContentItemRole: 1rem;
$pd-messageSystemContentItemRoleTail: 3rem;
.messageSystem__contentItem {
    position: relative;
    margin-bottom: $pd-header;
    padding-left: $pd-messageSystemContentItemRole;
    padding-right: $pd-messageSystemContentItemRole;

    .messageSystem__bubble {
        display: inline-block;
        padding: 0.3rem 0.8rem 0.3rem;
        border-radius: $radius-bubble;
        position: relative;
        margin-bottom: 0;
    }

    .messageSystem__bubbleTime {
        font-size: 0.7rem;
        color: $gray;
        margin-bottom: 0;
    }

    &.messageSystem__contentItem--system,
    &.messageSystem__contentItem--other {
        .messageSystem__bubble {
            background-color: $gainsboro;
            &:before {
                content: '';
                display: inline-block;
                width: 19px;
                height: 13px;
                position: absolute;
                left: -15px;
                top: 10px;

                background: {
                    image: url(/img/talk-bubble-tail.svg);
                    size: 19px 13px;
                }
            }
        }
    }

    &.messageSystem__contentItem--other {
        padding-right: $pd-messageSystemContentItemRoleTail;
    }

    &.messageSystem__contentItem--self {
        text-align: right;
        padding-left: $pd-messageSystemContentItemRoleTail;
        padding-right: $pd-messageSystemContentItemRole;
        .messageSystem__bubble {
            text-align: left;
            background-color: $complementary2;
            &:before {
                content: '';
                display: inline-block;
                width: 19px;
                height: 13px;
                position: absolute;
                right: -15px;
                top: 10px;

                background: {
                    image: url(/img/talk-bubble-tail-send.svg);
                    size: 19px 13px;
                }
            }
        }
    }
}

.messageSystem__linkIcon {
    font-size: 0.8rem;
}

$w-reply: 66px;
$h-reply: 60px;
$pd-reply: 5px;
.messageSystem__reply {
    height: $h-reply;
    position: relative;
}

.messageSystem__replyTextarea {
    padding: $pd-reply $w-reply + $pd-reply * 2 $pd-reply $pd-reply;
    border-radius: 0;
    border: none;
    height: 100%;
    font-size: 0.8rem;
    line-height: 1.5;
    border-top: 1px solid $color-border-primary;
    box-sizing: border-box;
}

.messageSystem__btnSend {
    position: absolute;
    right: $pd-reply;
    bottom: $pd-reply;
    width: $w-reply;
    height: $h-reply - $pd-reply * 2;
    font-size: 0.8rem;
}

.messageSystem__hint {
    margin-top: 0.25rem;
    text-align: right;
    font-size: 0.7rem;
    color: $gray;
    kbd {
        background-color: $gray;
        padding: 0.1rem 0.2rem;
    }
    span + span {
        margin-left: 30px;
    }
}
</style>

<template>
    <div class="webPage messageSystem">
        <div class="wrapper messageSystem__ui">
            <h1 class="pageH1">{{ title }}</h1>
            <div class="messageSystem__container">
                <div
                    :class="messageSystemListClass"
                    class="messageSystem__list"
                >
                    <header class="messageSystem__listHeader">
                        <b-button
                            @click="showNewMessageModal"
                            class="messageSystem__newMessageBtn"
                            variant="info"
                        >
                            <font-awesome-icon
                                class="messageSystem__icon"
                                icon="edit"
                            ></font-awesome-icon>新增訊息
                        </b-button>
                        <b-button
                            @click="switchListActive"
                            class="messageSystem__switchBtn"
                        >
                            <font-awesome-icon icon="exchange-alt"></font-awesome-icon>
                        </b-button>
                    </header>
                    <LoadingSet
                        class="messageSystem__loading"
                        v-if="!loadCompleted"
                    />
                    <ul
                        class="messageSystem__listContent"
                        v-else
                    >
                        <MessageListItem
                            :class="messageSystemListContentItemClass(dialogName)"
                            :contents="contents"
                            :dialogName="dialogName"
                            :key="dialogName"
                            @click.native="switchDialog(dialogName)"
                            class="messageSystem__listContentItem"
                            v-for="(contents, dialogName) in messages"
                        />
                    </ul>
                </div>
                <div class="messageSystem__contentContainer">
                    <header class="messageSystem__contentHeader">{{ currDialogIdx }}</header>
                    <ul class="messageSystem__content">
                        <li
                            :class="messageSystemContentItemClass(dialog)"
                            :key="dialogHash"
                            class="messageSystem__contentItem"
                            v-for="(dialog, dialogHash) in currDialog"
                        >
                            <MessageBubble
                                :dialog="dialog"
                                class="messageSystem__bubble"
                            />
                        </li>
                    </ul>
                    <div
                        class="messageSystem__reply"
                        v-if="withMessageTextarea"
                    >
                        <b-form-textarea
                            @keypress.exact.enter.prevent="inputEnter"
                            class="messageSystem__replyTextarea"
                            id="textarea-no-resize"
                            no-resize
                            placeholder="輸入訊息內容"
                            rows="2"
                            v-model.trim="messageInput"
                        ></b-form-textarea>
                        <b-button
                            @click="reply"
                            class="btn btn-success messageSystem__btnSend"
                        >送出</b-button>
                    </div>
                </div>
            </div>
            <ModalNewMessage ref="modalNewMessage" />
        </div>
        <div
            class="messageSystem__hint wrapper"
            v-if="withMessageTextarea && !listActive && !mobile"
        >
            <span>
                <kbd>ENTER</kbd>: 送出
            </span>
            <span>
                <kbd>ENTER</kbd> +
                <kbd>SHIFT</kbd>: 換行
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import { COMMON_UTILITY } from '../class/commonUtility'
import LoadingSet from '../components/LoadingSet'
import ModalNewMessage from '../components/ModalNewMessage'
import MessageListItem from '../components/MessageListItem'
import MessageBubble from '../components/MessageBubble'

export default {
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.MY_MESSAGE,
            currDialogIdx: '',
            listActive: true,
            mobile: null,
            messageInput: ''
        }
    },
    components: { ModalNewMessage, LoadingSet, MessageListItem, MessageBubble },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        this.mobile = COMMON_UTILITY.isMobile()
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        currDialog() {
            return this.messages[this.currDialogIdx]
        },
        messageSystemListClass() {
            return this.listActive ? 'messageSystem__list--active' : ''
        },
        withMessageTextarea() {
            return this.currDialogIdx && this.currDialogIdx.indexOf('系統') < 0
        },
        ...mapGetters({
            messages: 'message/messages',
            loadCompleted: 'message/messagesLoadCompleted',
            account: 'member/memberAccount'
        })
    },
    methods: {
        switchDialog(dialogName) {
            this.currDialogIdx = dialogName
            this.listActive = false
            let tokens = Object.keys(this.currDialog),
                targetDialog = {}

            tokens.forEach(token => {
                let dialogObj = this.currDialog[token]
                if (dialogObj.read == 'unread') {
                    targetDialog[token] = dialogObj
                    this.$store.dispatch('message/readedMessage', {
                        dialogName,
                        token,
                        data: dialogObj
                    })
                }
            })
        },
        messageSystemListContentItemClass(dialogName) {
            return this.currDialogIdx == dialogName ? 'messageSystem__listContentItem--curr' : ''
        },
        messageSystemContentItemClass(dialog) {
            return dialog.from == '系統'
                ? 'messageSystem__contentItem--system'
                : dialog.from == this.account
                ? 'messageSystem__contentItem--self'
                : 'messageSystem__contentItem--other'
        },
        switchListActive() {
            this.listActive = !this.listActive
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(this.$refs['modalNewMessage'].isShow)
        },
        showNewMessageModal() {
            EventBus.$emit('show-modal-new-message')
        },
        inputEnter(event) {
            this.reply()
        },
        reply() {
            let arr = this.currDialogIdx.split(','),
                idx = arr.indexOf(this.account),
                targetAcc = arr[idx == 0 ? 1 : 0],
                data = {}

            data.from = this.account
            data.to = targetAcc
            data.content = this.messageInput

            try {
                gtag('event', 'userMessage', {
                    event_category: 'message',
                    event_action: 'userMessage',
                    event_label: data.from,
                    value: data.to
                })
            } catch (e) {}
            this.$store
                .dispatch('message/sendMessage', { data })
                .then(response => {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '訊息已送出')
                })
                .catch(e => {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'sendMessage',
                        code: e,
                        isError: true
                    })
                })

            if (this.messageInput) {
                this.messageInput = ''
            }
        }
    },
    beforeDestroy() {
        this.$parent.switchBodyScrollStatus(false)
    }
}
</script>