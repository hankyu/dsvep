<style lang="scss">
@import '../../../sass/variables';

.completeAlert {
    position: fixed;
    z-index: 550;
    left: 0;
    top: -500px;
    width: 100%;
    @include verticalShadow(2px);
    background-color: $complementary1;
    color: $white;
    transition: top 0.3s ease-in-out;
    padding: 0.25rem;
    text-align: center;

    &.completeAlert--active {
        top: $h-header;

        @media (max-width: $max-w-xs) {
            top: $h-header-xs;
        }
    }
}
</style>

<template>
    <div
        :class="completeAlertClass"
        class="completeAlert"
    >{{completeAlertMessage}}</div>
</template>
<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'
import { setTimeout, clearTimeout } from 'timers'

export default {
    name: 'TheCompleteAlert',
    data() {
        return {
            isShow: false,
            timeoutId: null
        }
    },
    mounted() {
        EventBus.$on('show-complete-alert', this.showAlert)
        EventBus.$on('hide-complete-alert', this.hideAlert)
    },
    computed: {
        completeAlertClass() {
            return this.isShow ? 'completeAlert--active' : ''
        },
        completeAlertMessage() {
            return this.$store.state.alert.completeAlertMessage
        }
    },
    methods: {
        showAlert() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
            }
            this.isShow = true
            this.timeoutId = setTimeout(this.hideAlert, JS_CONFIG.COMPLETE_ALERT_DURATION)
        },
        hideAlert() {
            this.isShow = false
            this.$store.commit('alert/CLEAR_COMPLETE_ALERT_MESSAGE')
        }
    },
    beforeDestroy() {
        EventBus.$off('show-complete-alert', this.showAlert)
        EventBus.$off('hide-complete-alert', this.hideAlert)
        clearTimeout(this.timeoutId)
    }
}
</script>