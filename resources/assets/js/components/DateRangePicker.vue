<style lang="scss">
@import '../../sass/variables';
@import '../../sass/vendors/datepicker';

.dateRagePicker {
    display: inline-block;

    .dateRagePicker__datepicker {
        @extend .customDatepicker;
        display: inline-block;

        &.vdp-datepicker {
            width: 120px;
            font-size: 0.8em;

            @media (max-width: $max-w-sm) {
                width: 100%;
            }
        }
    }

    @media (max-width: $max-w-sm) {
        display: block;
        /* 
        .vdp-datepicker__calendar {
            width: 100%;
            max-width: 300px;
        } */
    }
    @media (max-height: $max-h-xxs) {
        /*   .vdp-datepicker__calendar .cell {
            height: 30px;
            line-height: 30px;
        } */
    }
    /* 
    .form-control {
        background-color: $white;
        border: 1px solid $bs-border;
    } */
}
</style>

<template>
    <div class="dateRagePicker">
        <Datepicker
            :disabled-dates="startTimeDisabledDate"
            :highlighted="highlighted"
            :language="zh"
            :placeholder="startPlaceholder"
            @input="onStartTimeChange"
            bootstrap-styling
            class="dateRagePicker__datepicker"
            format="yyyy-MM-dd"
            required
            v-model="startTime"
        ></Datepicker>
        <span>至</span>
        <Datepicker
            :disabled-dates="endTimeDisabledDate"
            :highlighted="highlighted"
            :language="zh"
            :placeholder="endPlaceholder"
            @input="onEndTimeChange"
            bootstrap-styling
            class="dateRagePicker__datepicker"
            format="yyyy-MM-dd"
            required
            v-model="endTime"
        ></Datepicker>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'

export default {
    name: 'DateRangePicker',
    components: {
        Datepicker
    },
    data() {
        return {
            zh: zh,
            startTime: '',
            startTimeDisabledDate: {},
            endTime: '',
            endTimeDisabledDate: {},
            highlighted: {}
        }
    },
    props: {
        timeRange: {
            type: Object,
            required: true
        },
        startPlaceholder: {
            type: String,
            default: '開始時間'
        },
        endPlaceholder: {
            type: String,
            default: '結束時間'
        }
    },
    mounted() {
        this.startTime = this.timeRange.startTime
        this.endTime = this.timeRange.endTime
    },
    methods: {
        onStartTimeChange() {
            console.log('this.startTime', this.startTime, 'this.endTime', this.endTime)
            if (!this.endTime || this.endTime.getTime() < this.startTime.getTime()) {
                this.endTime = new Date(
                    this.startTime.getFullYear(),
                    this.startTime.getMonth(),
                    this.startTime.getDate()
                )
            }
            let yesterday = new Date(
                this.startTime.getFullYear(),
                this.startTime.getMonth(),
                this.startTime.getDate() - 1,
                0,
                0,
                1
            )
            this.highlighted = {
                from: this.startTime.setHours(0, 0, 0, 0),
                to: this.endTime.setHours(0, 0, 0, 1)
            }
            this.endTimeDisabledDate = { to: yesterday }
            this.$emit('update:timeRange', {
                startTime: this.startTime,
                endTime: this.endTime
            })
        },
        onEndTimeChange() {
            console.log('this.startTime', this.startTime, 'this.endTime', this.endTime)
            if (!this.startTime || this.endTime.getTime() < this.startTime.getTime()) {
                this.startTime = new Date(
                    this.endTime.getFullYear(),
                    this.endTime.getMonth(),
                    this.endTime.getDate()
                )
            }
            console.log('this.endTime.getDate()', this.endTime.getDate())
            let tomorrow = new Date(
                this.endTime.getFullYear(),
                this.endTime.getMonth(),
                this.endTime.getDate() + 1,
                0,
                0,
                0
            )
            this.highlighted = {
                from: this.startTime.setHours(0, 0, 0, 0),
                to: this.endTime.setHours(0, 0, 0, 1)
            }
            this.startTimeDisabledDate = { from: tomorrow }
            this.$emit('update:timeRange', {
                startTime: this.startTime,
                endTime: this.endTime
            })
        }
    }
}
</script>