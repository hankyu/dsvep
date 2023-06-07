<style lang="scss">
@import '../../../sass/variables';

$w-messageNotice: 280px;
.messageNotice {
    @include verticalShadow(3px);
    position: fixed;
    right: 0;
    top: $h-header + 15px;
    padding: 0.8rem 1rem 0.8rem 2.5rem;
    background-color: lighten($emphasized3, 30%);
    z-index: 560;
    width: $w-messageNotice;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    text-align: center;
    font-size: 0.8rem;
    border: 1px solid lighten($emphasized3, 10%);
    border-right: none;
    transition: right 0.3s, bottom 0.3s;

    .messageNotice__link {
        color: $emphasized3;
        text-decoration: underline;
    }

    @media (max-width: $max-w-xs) {
        top: $h-header-xs + 15px;
    }
}

.messageNotice-enter,
.messageNotice-leave-to {
    right: -$w-messageNotice;
}
.messageNotice-enter-to,
.messageNotice-leave {
    right: -1px;
}

$w-messageNoticeBtnShow: 56px;
.messageNotice__btnShow {
    position: absolute;
    top: 0;
    left: 0;
    color: $emphasized3;
    width: $w-messageNoticeBtnShow;
    height: 100%;
    border: none;
    background-color: transparent;
}

.messageNotice__icon {
    font-size: 1.4rem;
}

.messageNotice__btnClose {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    background-color: transparent;
    color: $emphasized3;
}

.messageNotice--close {
    right: -$w-messageNotice + 56px;
}
</style>

<template>
    <transition name="messageNotice">
        <div
            :class="messageNoticeClass"
            class="messageNotice"
            v-if="messageNoticeShow"
        >
            <button
                @click="toggleNotice"
                class="messageNotice__btnShow"
            >
                <font-awesome-icon
                    class="messageNotice__icon"
                    icon="exclamation-circle"
                />
            </button>
            <button
                @click="closeNotice"
                class="messageNotice__btnClose"
            >X</button>
            <RouterLink
                class="messageNotice__link"
                to="/profile/message"
            >有 {{unreadNum}} 則未讀的站內訊息</RouterLink>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'TheMessageNotice',
    data() {
        return {
            close: false
        }
    },
    computed: {
        messageNoticeClass() {
            return this.close ? 'messageNotice--close' : ''
        },
        unreadNum() {
            return this.$store.state.message.unread
        },
        messageNoticeShow() {
            return this.$store.state.message.unread && this.$route.name != 'message'
        }
    },
    methods: {
        closeNotice() {
            this.close = true
        },
        toggleNotice() {
            this.close = !this.close
        }
    }
}
</script>