<style lang="scss">
@import '../../sass/variables';

.buyNotice__content {
    @extend .popupModalBody;

    p {
        margin-bottom: 0;
    }

    @media (max-width: $max-w-xs) {
        font-size: 0.9rem;

        ul {
            padding-left: 1.5rem;
        }
    }
}
</style>

<template>
    <BaseModal
        class="buyNotice"
        closeEvent="close-buy-notice"
        v-if="isShow"
    >
        <h2
            class="popupModalHeader"
            slot="header"
        >
            <font-awesome-icon
                class="faIcon"
                icon="exclamation-circle"
            />購課注意事項
        </h2>
        <div class="buyNotice__content">
            <p>應付金額: {{sum}}</p>
            <p>訂單付款狀況請至「我的訂單」頁，查看訂單狀態。</p>
            <p>平台收到款項之後，會在十分鐘內開通課程，出現在「我的課程」頁。</p>
            <p>
                <br />
            </p>
            <p>為維護您的權益 請勿在報名截止後繳費付款，請注意:</p>
            <ul>
                <li>如欲申請退費，請於購買後七天內申請，逾期則不接受退款。</li>
                <li>如在線上課程開課後點入課程教室頁面即視同觀看，恕不退款。</li>
            </ul>更多詳細退費規定請參閱
            <router-link
                target="_blank"
                to="/contact/terms/refund"
            >退費規定</router-link>
        </div>
        <div
            class="popupModalFooter"
            slot="footer"
        >
            <b-button
                @click="submit"
                class="popupModalFooterBtn"
                variant="success"
            >{{ getTerm('CONFIRM') }}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

export default {
    name: 'ModalBuyNotice',
    created() {},
    data: function() {
        return {
            isShow: false,
            sum: 0
        }
    },
    props: {},
    mounted() {
        EventBus.$on('show-buy-notice', this.showModel)
        EventBus.$on('close-buy-notice', this.closeModel)
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel(sum) {
            this.sum = sum
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        submit() {
            console.log('submit()')

            // try {
            //     gtag('event', 'buy', {
            //         event_category: 'buy lesson',
            //         event_action: 'buy',
            //         event_label: 'free lesson',
            //         value: 200
            //     })
            // } catch (e) {}
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-buy-notice', this.showModel)
        EventBus.$off('close-buy-notice', this.closeModel)
    }
}
</script>