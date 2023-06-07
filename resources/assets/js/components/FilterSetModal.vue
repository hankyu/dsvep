<style lang="scss" scoped>
@import '../../sass/variables';
.filterSetModal__layer {
    @extend .wrapper;
    @extend .modalShadow;
    display: flex;
    flex-flow: column;
    min-width: 0;
    max-width: 100%;
    min-height: 0;

    padding: 0;
    border-top: none;
    cursor: default;
    border-radius: $radius-selectorModal;
    overflow: hidden;

    &.popupModal__layer--1 {
        border: 1px solid $gray;
    }
}

.fade-in-down-enter-active,
.fade-in-down-leave-active {
    // transition: transform 0.2s $specialBezier;
    transform-origin: 0 0;
    transition: transform 0.2s ease-in-out, opacity 0.1s 0.1s;
}

.fade-in-down-enter,
.fade-in-down-leave-to {
    transform: translateY(0px);
    transform: scaleX(0.1) scaleY(0.1);
    opacity: 0;
}
.fade-in-down-enter-to,
.fade-in-down-leave {
    transform: translateY(0px);
    transform: scaleX(1) scaleY(1);
}
</style>

<template>
    <BaseFullMask
        @shakeModalLayer="shakeModalLayer"
        v-bind="$props"
        v-show="isShow"
    >
        <transition
            appear
            name="fade-in-down"
        >
            <div
                :class="popupModalLayerClass"
                :style="layerStyle"
                @click.stop
                class="popupModal__layer filterSetModal__layer"
                ref="popupModalLayer"
                v-if="showLayer"
            >
                <div
                    :class="popupModalHeaderClass"
                    class="popupModal__header"
                >
                    <div class="popupModal__title">
                        <slot name="header" />
                    </div>
                    <CloseButton
                        @click="closeModal"
                        class="popupModal__close"
                        v-if="closeEvent"
                    />
                </div>

                <div class="popupModal__body">
                    <slot />
                </div>
                <div class="popupModal__footer">
                    <slot name="footer" />
                </div>
            </div>
        </transition>
    </BaseFullMask>
</template>

<script>
import { EventBus } from '../event-bus'
import BaseModal from './global/BaseModal'

export default {
    name: 'FilterSetModal',
    extends: BaseModal,
    data() {
        return {
            isShow: false
        }
    },
    mounted() {
        EventBus.$on('show-filter-modal', this.showModal)
        EventBus.$on('close-filter-modal', this.closeModal)
    },
    methods: {
        showModal() {
            this.showLayer = true
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        async closeModal() {
            await this.closeModalLayer()
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        closeModalLayer() {
            return new Promise((resolve, reject) => {
                this.showLayer = false
                setTimeout(resolve, 200)
            })
        }
    },
    beforeDestroy() {
        EventBus.$off('show-filter-modal', this.showModal)
        EventBus.$off('close-filter-modal', this.closeModal)
    }
}
</script>