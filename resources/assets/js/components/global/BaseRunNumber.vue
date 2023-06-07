<style lang="scss">
@import '../../../sass/variables';
</style>

<template>
    <span class="baseRunNumber">
        <span :class="integerClass">{{ integer }}</span>.
        <span :class="decimalClass">{{ decimal}}</span>
    </span>
</template>

<script>
import { JS_CONFIG } from '../../config.js'
const STEPS = [
        0.0,
        0.15,
        0.62,
        1.38,
        2.45,
        3.81,
        5.45,
        7.37,
        9.55,
        11.98,
        14.64,
        17.53,
        20.61,
        23.88,
        27.3,
        30.87,
        34.55,
        38.33,
        42.18,
        46.08,
        50.0,
        53.92,
        57.82,
        61.67,
        65.45,
        69.13,
        72.7,
        76.12,
        79.39,
        82.47,
        85.36,
        88.02,
        90.45,
        92.63,
        94.55,
        96.19,
        97.55,
        98.62,
        99.38,
        100
    ],
    DURATIONS = [
        20,
        20,
        20,
        19,
        18,
        17,
        16,
        15,
        13,
        12,
        10,
        8,
        7,
        5,
        4,
        3,
        2,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        2,
        3,
        4,
        5,
        7,
        8,
        10,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        20
    ]

export default {
    name: 'BaseRunNumber',
    data: function() {
        return {
            step: 0,
            timeoutId: null,
            showNumber: 0
        }
    },
    props: {
        targetNumber: {
            type: Number,
            required: true
        },
        stepDuration: {
            type: Number,
            default: 1
        },
        precision: {
            type: Number,
            default: JS_CONFIG.PRESENCE_RATE_PRECISION
        },
        integerClass: {
            type: String,
            default: 'baseRunNumber__integer'
        },
        dotClass: {
            type: String,
            default: 'baseRunNumber__dot'
        },
        decimalClass: {
            type: String,
            default: 'baseRunNumber__decimal'
        }
    },
    mounted() {
        this.step = 0
        this.keepRunning()
    },
    computed: {
        integer() {
            return this.showNumber
                .toFixed(this.precision)
                .toString()
                .split('.')[0]
        },
        decimal() {
            return this.showNumber
                .toFixed(this.precision)
                .toString()
                .split('.')[1]
        }
    },
    methods: {
        keepRunning() {
            this.showNumber = (this.targetNumber * STEPS[this.step]) / 100
            if (this.showNumber == this.targetNumber) {
                this.finish()
            } else {
                this.step++
                this.timeoutId = setTimeout(() => {
                    if (this.step < STEPS.length) {
                        this.keepRunning()
                    } else {
                        this.finish()
                    }
                }, this.stepDuration * DURATIONS[this.step])
            }
        },
        finish() {
            clearTimeout(this.timeoutId)
        }
    },
    beforeDestroy: function() {
        this.finish()
    }
}
</script>