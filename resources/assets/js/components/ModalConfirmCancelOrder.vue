<style lang="scss" scoped>
@import '../../sass/variables';
</style>

<template>
    <BaseModal
        closeEvent="close-confirm-cancel-order"
        maskCloseEvent="close-confirm-cancel-order"
        v-if="isShow"
    >
        <h2
            class="popupModalHeader"
            slot="header"
        >
            <font-awesome-icon
                :icon="['far', 'address-card']"
                class="faIcon"
            />確定取消此訂單？
        </h2>
        <div class="popupModalBody">
            <p>
                是否確定取消
                <span class="color-emphasized3">
                    訂單
                    {{this.orderData.oid}}
                </span>
                (#{{this.orderData.lid}} {{this.orderData.lname}})？
            </p>
            <p class="color-emphasized2">
                注意：
                <br />取消此訂單後，此訂單之超商繳費或匯款將失效，無法完成購買。
                <br />若欲再次購買課程，請重新購買。
            </p>
        </div>
        <div
            class="popupModalFooter"
            slot="footer"
        >
            <b-button
                @click="confirm"
                class="popupModalFooterBtn"
                variant="success"
            >確定取消訂單</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

export default {
    name: 'ModalConfirmCancelOrder',
    created() {
        EventBus.$on('show-confirm-cancel-order', this.showModel)
        EventBus.$on('close-confirm-cancel-order', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            orderData: {}
        }
    },
    methods: {
        showModel(orderData) {
            this.orderData = orderData
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        confirm() {
            EventBus.$emit('cancel-order', this.orderData.id)
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-confirm-cancel-order', this.showModel)
        EventBus.$off('close-confirm-cancel-order', this.closeModel)
    }
}
</script>