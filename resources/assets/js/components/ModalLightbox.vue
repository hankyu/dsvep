<style lang="scss">
@import '../../sass/variables';

.fade-in-down-enter-active,
.fade-in-down-leave-active {
    transition: transform 0.2s $specialBezier;
}

.fade-in-down-enter,
.fade-in-down-leave-to {
    transform: translateY(-150px);
    opacity: 0;
}
.fade-in-down-enter-to,
.fade-in-down-leave {
    transform: translateY(0px);
}

.modalLightbox {
    display: block;

    .modalLightbox__layer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        height: 100vh;
    }
    .modalLightbox__imgBox {
        position: relative;
        min-height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modalLightbox__img {
        max-width: 80vw;
        max-height: 90vh;
    }
    .modalLightbox__closeBtn {
        position: absolute;
        opacity: 0.25;
        background-color: $white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        right: -20px;
        top: -20px;
        bottom: auto;
        &:hover {
            opacity: 1;
        }
    }

    .modalLightbox__btn {
        position: relative;
        opacity: 0.25;
        background-color: $white;
        border-radius: 50%;
        width: 60px;
        height: 60px;

        &:hover {
            opacity: 1;
        }
        &.modalLightbox__btn--l {
            z-index: 10;
            margin-left: 20px;
        }
        &.modalLightbox__btn--r {
            z-index: 11;
            margin-right: 20px;
        }
    }
    @media (max-width: $max-w-xs) {
        overflow: hidden;

        .modalLightbox__layer {
            margin: 0 -30px;
            width: auto;
        }

        .modalLightbox__img {
            max-width: 85vw;
            max-height: 85vh;
        }
        .modalLightbox__btn {
            width: 40px;
            height: 40px;

            &.modalLightbox__btn--l {
                z-index: 10;
                margin-left: 0;
                transform: translateX(30px);
            }
            &.modalLightbox__btn--r {
                z-index: 11;
                margin-right: 0;
                transform: translateX(-30px);
            }
        }
    }
}
</style>

<template>
    <BaseFullMask
        @shakeModalLayer="shakeModalLayer"
        class="modalLightbox"
        maskColor="#000C"
        v-bind="$props"
        v-if="isShow"
    >
        <!-- maskCloseEvent="close-lightbox-modal" -->
        <transition
            appear
            name="fade-in-down"
        >
            <div
                @click="closeModal"
                class="modalLightbox__layer"
                v-if="showLayer"
            >
                <button
                    @click.stop="changeImg(-1)"
                    class="modalLightbox__btn modalLightbox__btn--l"
                >&lt;</button>
                <div
                    @click.stop
                    class="modalLightbox__imgBox"
                >
                    <img
                        :src="currImg"
                        alt
                        class="modalLightbox__img"
                    />
                    <button
                        @click="closeModal"
                        class="modalLightbox__closeBtn"
                    >X</button>
                </div>
                <button
                    @click.stop="changeImg(1)"
                    class="modalLightbox__btn modalLightbox__btn--r"
                >&gt;</button>
            </div>
        </transition>
    </BaseFullMask>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import BaseModal from './global/BaseModal'
import CloseButton from './CloseButton'

export default {
    name: 'ModalLightbox',
    extends: BaseModal,
    components: { CloseButton },
    data() {
        return {
            isShow: false,
            imageList: [],
            currIdx: null
        }
    },
    created() {},
    mounted() {
        EventBus.$on('show-lightbox-modal', this.showModal)
        EventBus.$on('close-lightbox-modal', this.closeModal)
    },
    updated() {},
    computed: {
        currImg() {
            return this.imageList[this.currIdx]
        }
    },
    methods: {
        showModal({ imgs, iIdx }) {
            this.imageList = imgs
            this.currIdx = iIdx
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModal() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        changeImg(num) {
            let l = this.imageList.length
            this.currIdx = (this.currIdx + l + num) % l
        }
    },

    beforeDestroy() {
        EventBus.$off('show-lightbox-modal', this.showModal)
        EventBus.$off('close-lightbox-modal', this.closeModal)
    }
}
</script>