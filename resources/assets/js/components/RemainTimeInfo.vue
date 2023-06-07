<style lang="scss">
@import '../../sass/variables';
</style>

<template>
    <span>{{RemainTime}}</span>
</template>
<script>
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    name: 'RemainTimeInfo',
    data: function() {
        return {
            now: null,
            timeoutId: null
        }
    },
    props: {
        timeString: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.getNow()
        this.timeoutId = setTimeout(this.getNow, 60000)
    },
    computed: {
        RemainTime() {
            if (!this.timeString) {
                return ''
            }

            let timestamp = COMMON_UTILITY.timeString2Timestamp(this.timeString)
            let fundRemaionMS = timestamp - this.now
            if (fundRemaionMS <= 0 && this.timeoutId) {
                clearTimeout(this.timeoutId)
                return ''
            } else {
                return COMMON_UTILITY.microSecond2TimeString(fundRemaionMS, 3)
            }
        }
    },
    methods: {
        getNow() {
            this.now = new Date().getTime()
        }
    },
    beforeDestroy() {}
}
</script>