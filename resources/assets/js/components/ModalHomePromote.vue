<style lang="scss">
@import '../../sass/variables';

.homePromote {
    border-top: none;

    .popupModal__layer--0 {
        border-top: 5px solid $bs-warning;
        border: 5px solid $bs-warning;
    }
}

.homePromote__content {
    @extend .popupModalBody;
    padding: 2rem;
    max-width: 600px;

    h2 {
        font-weight: bold;
        text-align: center;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid $color-border-light;
        color: #804;
        small {
            color: #402;
            font-weight: normal;
            display: block;
        }
    }
    p {
        margin-bottom: 0;
    }

    @media (max-width: $max-w-xs) {
        font-size: 0.9rem;
        padding: 2rem;

        h2 {
            font-size: 1.2rem;

            small {
                display: block;
            }
        }
    }
}
</style>

<template>
    <FireworkModal
        :modalStatus="0"
        class="homePromote"
        closeEvent="close-home-promote"
        maskCloseEvent="close-home-promote"
        v-if="isShow"
    >
        <div class="homePromote__content">
            <h2>
                2019台北國際攝影器材展
                <small>課程同步優惠中</small>
            </h2>
            <p>
                為配合2019台北國際攝影器材暨影像應用展，於展覽期間購課 (2019/09/27 ~ 09/30)，凡購買原價 2000 元以上的課程，只要輸入優惠代碼「
                <span
                    class="color-emphasized2"
                >大俠學習</span>」即可以「
                <span class="color-emphasized2">原價</span>」折抵
                <span class="color-emphasized2">500</span> 元。
            </p>
            <p style="margin-top:.5rem;text-align: center">* 本平台各優惠方案請擇一使用 *</p>
        </div>
    </FireworkModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import FireworkModal from './FireworkModal'
import { COOKIE_KIT } from '../class/cookieKit'

export default {
    name: 'ModalHomePromote',
    components: { FireworkModal },
    created() {},
    data: function() {
        return {
            isShow: false
        }
    },
    props: {},
    mounted() {
        EventBus.$on('show-home-promote', this.showModel)
        EventBus.$on('close-home-promote', this.closeModel)
    },
    computed: {},
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()

            COOKIE_KIT.setCookie('fireworkPlayed', 1)
            this.$store.commit('SET_FIREWORK_PLAYED', true)
        },
        submit() {
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-home-promote', this.showModel)
        EventBus.$off('close-home-promote', this.closeModel)
    }
}
</script>