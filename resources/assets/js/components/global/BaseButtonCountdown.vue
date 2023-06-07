<style lang="scss" scoped>
@import '../../../sass/variables';
</style>


<template>
    <b-button
        :disabled="btnDisabled || disalbed"
        :variant="variant"
        class="buttonCountdown"
    >{{ text +' ('+ this.countdownText+')' }}</b-button>
</template>

<script>
export default {
    name: 'BaseButtonCountdown',
    data() {
        return {
            countdownText: '',
            countdownTime: {},
            intervalId: null
        }
    },
    props: {
        text: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            default: 'primary'
        },
        disabledMode: {
            type: Boolean,
            default: true
        },
        setupTime: {
            type: Object,
            required: true
        },
        disalbed: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.finish()
    },
    computed: {
        timeover() {
            let { hh, mm, ss } = this.countdownTime
            return hh == 0 && mm == 0 && ss == 0
        },
        btnDisabled() {
            return this.disabledMode ? !this.timeover : this.timeover
        }
    },
    methods: {
        start(setupTime) {
            let { hh, mm, ss } = setupTime ? setupTime : this.setupTime
            this.countdownTime = { hh, mm, ss }
            this.showCountdown()
            this.intervalId = setInterval(this.doCoundown, 1000)
        },
        doCoundown() {
            let { hh, mm, ss } = this.countdownTime

            if (ss == 0) {
                if (mm == 0) {
                    hh--
                    mm = 59
                    ss = 59
                } else {
                    mm--
                    ss = 59
                }
            } else {
                ss--
            }
            this.countdownTime = { hh, mm, ss }
            this.showCountdown()
            if (hh == 0 && mm == 0 && ss == 0) {
                clearInterval(this.intervalId)
                // this.timeover()
            }
        },
        showCountdown() {
            this.countdownText = this.countdownTime.hh ? this.countdownTime.hh + '小時' : ''
            this.countdownText +=
                this.countdownText || this.countdownTime.mm ? this.countdownTime.mm + '分' : ''
            this.countdownText +=
                this.countdownText || this.countdownTime.ss ? this.countdownTime.ss + '秒' : ''
        },
        stop() {
            clearInterval(this.intervalId)
        },
        finish() {
            this.countdownTime = { hh: 0, mm: 0, ss: 0 }
            clearInterval(this.intervalId)
        }
    }
}
</script>