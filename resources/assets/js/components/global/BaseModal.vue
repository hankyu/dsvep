<style lang="scss">
@import '../../../sass/variables';

.popupModal__layer {
    @extend .modalShadow;
    display: flex;
    flex-flow: column;
    min-width: 10rem;
    max-width: 70%;
    min-height: 6rem;
    max-height: 70vh;
    padding: 0;
    border-radius: 4px;
    border-top: 5px solid $brand-primary;
    cursor: default;
    overflow: hidden;

    &.popupModal__layer--0 {
        border-radius: $radius-selectorModal;
        border-top: none;
    }
    &.popupModal__layer--1 {
        border-top: 5px solid $brand-primary;
    }
    &.popupModal__layer--2 {
        border-top: 5px solid $bs-warning;
    }
    &.popupModal__layer--3 {
        border-top: 5px solid $bs-danger;
    }

    @media (max-width: $max-w-md) {
        max-width: 90%;
    }
}
.popupModal__header {
    text-align: left;
    font-size: 0;

    &.popupModal__header--withCloseBtn {
        position: relative;
    }

    &.popupModal__header--withBorder {
        border-bottom: 1px solid $gainsboro;
    }
}
.popupModal__title {
    padding-right: $size-popupModalClose;
}
.popupModal__close {
    position: absolute;
    right: 5px;
    top: 4px;
    width: $size-popupModalClose;
    height: $size-popupModalClose;
}
.popupModal__body {
    flex: 1;
    overflow-y: auto;
    background-color: $darkwhite;
}

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

@keyframes shake {
    0% {
        transform: translateX(0px);
    }
    12% {
        transform: translateX(5px);
    }
    25% {
        transform: translateX(0px);
    }
    37% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(0px);
    }
    62% {
        transform: translateX(2px);
    }
    75% {
        transform: translateX(0px);
    }
    87% {
        transform: translateX(-2px);
    }
    100% {
        transform: translateX(0px);
    }
}

.popupModal__layer--shake {
    animation: shake 300ms ease 0s 1 alternate;
    -webkit-animation: shake 300ms ease 0s 1 alternate;
}
</style>

<template>
    <BaseFullMask
        @shakeModalLayer="shakeModalLayer"
        v-bind="$props"
    >
        <transition
            appear
            name="fade-in-down"
        >
            <div
                :class="popupModalLayerClass"
                :style="layerStyle"
                @click.stop
                class="popupModal__layer"
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
import BaseFullMask from './BaseFullMask'
import CloseButton from '../CloseButton'
import { EventBus } from '../../event-bus'

export default {
    name: 'BaseModal',
    extends: BaseFullMask,
    components: {
        CloseButton
    },
    data: function() {
        return {
            showLayer: false
        }
    },
    props: {
        layerBgColor: {
            type: String,
            default: '#fff',
            validator: function(value) {
                return value.search(/^#[a-f0-9]{3,8}$/i) == 0
            }
        },
        modalStatus: {
            type: Number,
            default: 1
        },
        closeEvent: {
            type: String
        },
        modalHeaderWithBorder: {
            type: Boolean,
            default: true
        }
    },
    mounted: function() {
        this.showLayer = true
    },
    computed: {
        layerStyle() {
            let bgcStyle = `background-color: ${this.layerBgColor};`

            return bgcStyle
        },
        popupModalLayerClass() {
            return `popupModal__layer--${this.modalStatus}`
        },
        popupModalHeaderClass() {
            let withClose = this.closeEvent ? ' popupModal__header--withCloseBtn' : '',
                withBorder = this.modalHeaderWithBorder ? ' popupModal__header--withBorder' : ''
            return withClose + withBorder
        }
    },
    methods: {
        shakeModalLayer() {
            this.$refs.popupModalLayer.classList.add('popupModal__layer--shake')
            setTimeout(this.removeLayerShakeClass, 500)
        },
        removeLayerShakeClass() {
            this.$refs.popupModalLayer.classList.remove('popupModal__layer--shake')
        },
        closeModal() {
            EventBus.$emit(this.closeEvent)
        }
    },
    beforeDestroy: function() {
        this.showLayer = false
    }
}
</script>