<style lang="scss">
@import '../../../sass/variables';

.baseMask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.maskStyle--clickable {
    cursor: pointer;
}
</style>

<template>
    <div
        :class="maskClass"
        :style="maskStyle"
        @click.stop="maskClick"
        class="baseMask"
    >
        <slot />
    </div>
</template>

<script>
import { EventBus } from '../../event-bus'

export default {
    name: 'BaseFullMask',
    props: {
        maskColor: {
            type: String,
            default: '#0007',
            validator: function(value) {
                return value.search(/^#[a-f0-9]{3,8}$/i) == 0
            }
        },
        maskClickFn: {
            type: Function
        },
        maskCloseEvent: {
            type: String
        },
        z: {
            type: Number,
            default: 800
        }
    },
    computed: {
        maskStyle() {
            return `background-color: ${this.maskColor};z-index: ${this.z}`
        },
        maskClass() {
            // return this.maskClickFn ? 'maskStyle--clickable' : ''
            return this.maskCloseEvent ? 'maskStyle--clickable' : ''
        }
    },
    methods: {
        maskClick() {
            if (this.maskCloseEvent) {
                EventBus.$emit(this.maskCloseEvent)
            } else {
                this.$emit('shakeModalLayer')
            }
        }
    }
}
</script>