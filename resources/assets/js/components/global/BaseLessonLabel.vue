<style lang="scss">
// @import "../../sass/variables";
</style>


<template>
    <span>{{ lessonLabel }}</span>
</template>

<script>
import { COMMON_UTILITY } from '../../class/commonUtility'

export default {
    name: 'BaseLessonLabel',
    components: { COMMON_UTILITY },
    data: function() {
        return {
            lessonStatus: 0, // 0: 離報名截止剩x天、離優惠截止剩x天 1:取消開班 2:確定開班 再x天上課、備課中 再 x 天上課 3:已額滿！再 x 天上課 4:即將上課、今日上課、上課中 5:已結業
            lessonLabel: '',
            nowTimestamp: 0
        }
    },
    props: {
        lessonData: {
            type: Object,
            required: true
        }
    },
    methods: {
        getDaysRemainFund() {
            let endFundDayTimestamp = COMMON_UTILITY.timeString2Timestamp(
                this.lessonData.end_fund,
                true
            )

            return Math.ceil((endFundDayTimestamp - this.nowTimestamp) / 86400000) + 1
        },

        getDaysBeforeStart() {
            let startDayTimestamp = COMMON_UTILITY.timeString2Timestamp(
                this.lessonData.start_time,
                true
            )

            return Math.ceil((startDayTimestamp - this.nowTimestamp) / 86400000)
        },

        getUnitStartDayTimestamp() {
            let unitStartDayTimestamp = COMMON_UTILITY.timeString2Timestamp(
                this.lessonData.l_start_time,
                true
            )
            return Math.ceil((unitStartDayTimestamp - this.nowTimestamp) / 86400000)
        },

        getLessonStatusAndLabel() {
            let lData = this.lessonData,
                isDiscount = lData.current_fee < lData.origin_fee,
                isFull = lData.type == 'entity' ? lData.buyers >= lData.max_people : false

            this.nowTimestamp = new Date().getTime()

            switch (lData.apply_situation) {
                case 'no apply':
                    this.lessonStatus = 1
                    this.lessonLabel = '草稿'
                    break

                case 'audit':
                    this.lessonStatus = 1
                    this.lessonLabel = '審核中'
                    break

                case 'success':
                    let daysBeforeStart = this.getDaysBeforeStart()
                    switch (lData.cancel_lesson) {
                        case 0: // 確定開課
                            if (daysBeforeStart <= 0) {
                                // start_time 後（含當天）
                                if (lData.type == 'entity') {
                                    // let daysBeforeUnitStart = this.getUnitStartDayTimestamp() // 現在是第一堂課的幾天前

                                    /* if (daysBeforeUnitStart > 0) {
                            // l_start_time 前
                                this.lessonStatus = 4
                                this.lessonLabel = '即將上課'
                            }
                            else  */
                                    if (daysBeforeStart == 0) {
                                        // l_start_time 當天
                                        this.lessonStatus = 4
                                        this.lessonLabel = '今日上課'
                                    }
                                    // l_start_time 後
                                    else {
                                        let unitEndTimestamp = COMMON_UTILITY.timeString2Timestamp(
                                            lData.l_end_time,
                                            false
                                        )

                                        // l_end_time 前 （含）
                                        if (this.nowTimestamp <= unitEndTimestamp) {
                                            this.lessonStatus = 4
                                            this.lessonLabel = '上課中'
                                        }
                                        // l_end_time 後
                                        else {
                                            this.lessonStatus = 5
                                            this.lessonLabel = '已結業'
                                        }
                                    }
                                } else {
                                    this.lessonStatus = 4
                                    this.lessonLabel = '上課中'
                                }
                            }
                            // start_time 前
                            else {
                                if (lData.type == 'entity') {
                                    // 額滿
                                    if (isFull) {
                                        this.lessonStatus = 3
                                        this.lessonLabel = `已額滿！再 ${daysBeforeStart} 天上課`
                                    } else {
                                        this.lessonStatus = 2
                                        this.lessonLabel = `確定開班 再 ${daysBeforeStart} 天上課`
                                    }
                                } else {
                                    this.lessonStatus = 2
                                    this.lessonLabel = `備課中 再 ${daysBeforeStart} 天上課`
                                }
                            }
                            break

                        case 1: // 取消開課
                            this.lessonStatus = 1
                            this.lessonLabel = '取消開班'
                            break

                        case 2: // 尚未確定
                            // 額滿
                            if (isFull) {
                                this.lessonStatus = 3
                                this.lessonLabel = `已額滿！再 ${daysBeforeStart} 天上課`
                            }
                            // 人數未達標
                            else if (lData.buyers < lData.least_people) {
                                let daysRemainFund = this.getDaysRemainFund()
                                // 優惠
                                if (isDiscount) {
                                    this.lessonStatus = 0
                                    this.lessonLabel =
                                        daysRemainFund == 1
                                            ? '優惠今日即將截止'
                                            : `離優惠截止剩 ${daysRemainFund} 天`
                                }
                                // 免費 or 原價
                                else {
                                    this.lessonStatus = 0
                                    this.lessonLabel =
                                        daysRemainFund == 1
                                            ? '今日即將截止報名'
                                            : `離報名截止剩 ${this.getDaysRemainFund()} 天`
                                }
                            }
                            // 人數達標
                            else {
                                // 優惠
                                if (isDiscount) {
                                    let daysRemainFund = this.getDaysRemainFund()
                                    this.lessonStatus = 2
                                    this.lessonLabel =
                                        daysRemainFund == 1
                                            ? '確定開班 優惠今日即將截止'
                                            : `確定開班 優惠剩 ${this.getDaysRemainFund()} 天`
                                }
                                // 免費 or 原價
                                else {
                                    this.lessonStatus = 2
                                    this.lessonLabel = `確定開班 再 ${daysBeforeStart} 天上課`
                                }
                            }

                            break
                    }
                    break
            }
        }
    }
}
</script>