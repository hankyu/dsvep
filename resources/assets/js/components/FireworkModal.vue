<style lang="scss">
.fireworkModal .canvasBox {
    z-index: -1;
}
</style>

<template>
    <div
        :class="maskClass"
        :style="maskStyle"
        @click.stop="maskClick"
        @shakeModalLayer="shakeModalLayer"
        class="baseMask fireworkModal"
        v-if="!played"
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
        <Firework
            :boxHeight="'100%'"
            :boxWidth="'100%'"
        />
    </div>
</template>

<script>
import BaseModal from './global/BaseModal'
import CloseButton from './CloseButton'
import { EventBus } from './../event-bus'
import Firework from './Firework'

export default {
    name: 'FireworkModal',
    extends: BaseModal,
    components: {
        CloseButton,
        Firework
    },
    computed: {
        played() {
            return this.$store.state.fireworkPlayed
        }
    }
}
</script>