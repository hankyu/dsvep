<style lang="scss">
@import '../../sass/variables';

.modalRollcallQRcode {
    font-size: 1rem;
    .popupModal__layer {
        min-width: 20rem;

        @media (max-width: $max-w-md) {
            min-width: auto;
            width: 80%;
        }

        @media (max-width: $max-w-xs) {
            min-width: auto;
            width: 90%;
        }
    }
}

.modalRollcallQRcode__header {
    @extend .popupModalHeader;
}

.modalRollcallQRcode__content {
    padding: $pd-popupModal;
}

.modalRollcallQRcode__img {
    width: 100%;
}
</style>

<template>
    <BaseModal
        :modalHeaderWithBorder="false"
        :z="950"
        class="modalRollcallQRcode"
        closeEvent="close-qrcode"
        maskCloseEvent="close-qrcode"
        v-if="isShow"
    >
        <h2
            class="modalRollcallQRcode__header"
            slot="header"
        >點名 {{ unitTimeString }}</h2>
        <div class="modalRollcallQRcode__content">
            <img
                :src="imgSrc"
                alt
                class="modalRollcallQRcode__img"
                v-if="imgSrc"
            />
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: 'ModalRollcallQRcode',
    data() {
        return {
            isShow: false,
            imgSrc: '',
            unitTimeString: ''
        }
    },
    mounted() {
        EventBus.$on('show-qrcode', this.showModal)
        EventBus.$on('close-qrcode', this.closeModal)
    },
    methods: {
        closeModal() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        showModal({ imgSrc, unitTimeString }) {
            this.isShow = true
            this.imgSrc = imgSrc
            this.unitTimeString = unitTimeString
            this.$parent.checkBodyScrollStatus()
        }
    },
    beforeDestroy() {
        this.closeModal()
        EventBus.$off('show-qrcode', this.showModal)
        EventBus.$off('close-qrcode', this.closeModal)
    }
}
</script>