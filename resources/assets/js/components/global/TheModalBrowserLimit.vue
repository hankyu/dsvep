<style lang="scss">
@import '../../../sass/variables';

.browserLimit__content {
    padding: $pd-popupModal;
    text-align: center;
    margin-bottom: 0;

    .browserLimit__chromeIcon {
        display: block;
        margin: auto;
        width: 20%;
        height: auto;
        margin-bottom: 0.5rem;
    }
    .browserLimit__download {
        @include btnBgColorCustom($brand-primary);
        font-size: 1.2rem;
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
                />請使用先進瀏覽器
            </h2>
        </template>
        <div class="browserLimit__content">
            <p>
                您目前使用的瀏覽器不支援很多先進網站功能。
                <br />下載並使用 Chrome 來享受本平台服務。
            </p>
            <img
                alt="chrome icon"
                class="browserLimit__chromeIcon"
                src="https://www.google.com/chrome/static/images/chrome-logo.svg"
            />
            <a
                class="btn btn-outline-primary"
                href="https://www.google.com/intl/zh-TW/chrome/"
                target="_blank"
            >下載</a>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'

export default {
    name: 'TheModalBrowserLimit',
    data: function() {
        return {
            isShow: false
        }
    },
    mounted() {
        EventBus.$on('show-modal-browser-limit', this.showModal)
        EventBus.$on('close-modal-browser-limit', this.closeModal)
    },
    computed: {
        browser() {
            return this.$store.state.browser
        }
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
        EventBus.$off('show-modal-browser-limit', this.showModal)
        EventBus.$off('close-modal-browser-limit', this.closeModal)
    }
}
</script>