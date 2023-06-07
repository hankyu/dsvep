<style lang="scss">
@import '../../../sass/variables';

.enableCookie__content {
    padding: $pd-popupModal;
    text-align: center;
    margin-bottom: 0;

    p {
        margin-bottom: 0;
    }

    a {
        display: inline-block;
        text-decoration: underline;
        margin-top: 2rem;
    }
}
</style>

<template>
    <BaseModal
        :modalStatus="3"
        :z="2000"
        v-if="isShow"
    >
        <template v-slot:header>
            <h2 class="popupModalHeader">
                <font-awesome-icon
                    class="faIcon"
                    icon="exclamation-circle"
                />請開啟瀏覽器 Cookie 功能
            </h2>
        </template>
        <div class="enableCookie__content">
            <p>大俠教學平台，需使用有支援 Cookie 功能之瀏覽器</p>
            <!-- <p>請使用有支援 Cookie 功能之瀏覽器，且啟用其 Cookie 功能（預設即為啟用）</p> -->
            <p>立刻啟用 Cookie 功能，在大俠教學平台遨遊吧。</p>
            <a
                href="https://www.google.com/search?q=%E5%95%9F%E7%94%A8+cookie&oq=%E5%95%9F%E7%94%A8+cookie&aqs=chrome..69i57j0l4.7956j1j7&sourceid=chrome&ie=UTF-8"
                target="_blank"
            >如何啟用 Cookie</a>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'

export default {
    name: 'TheModalEnableCookie',
    data: function() {
        return {
            isShow: false
        }
    },
    mounted() {
        EventBus.$on('show-modal-enable-cookie', this.showModal)
        EventBus.$on('close-modal-enable-cookie', this.closeModal)
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        closeModal() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        showModal() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-modal-enable-cookie', this.showModal)
        EventBus.$off('close-modal-enable-cookie', this.closeModal)
    }
}
</script>