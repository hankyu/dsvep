<style lang="scss">
@import '../../sass/variables';

$pd-rollcallCard: 3px;
.rollcallCard {
    padding: $pd-rollcallCard;
    width: 100%;

    @media (max-width: $max-w-xs) {
        max-width: 280px;
    }
}
.rollcallCard__wrapper {
    position: relative;
    padding-top: 15px;
}
$w-folded: 3px;
$h-over: 9px;
.rollcallCard__type {
    @extend .lessonTypeShadow;
    position: absolute;
    left: 0px;
    top: -$pd-rollcallCard - $h-over;
    padding: 3px 5px;
    color: $white;
    z-index: 3;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: -$w-folded;
        border-bottom: $h-over solid $gray;
        border-top: none;
        border-right: $w-folded solid transparent;
        border-left: none;
        width: $w-folded;
        height: $h-over;
        z-index: 2;
    }
}
.rollcallCard__id {
    position: absolute;
    right: 0;
    top: 0;
    padding: 3px 5px;
    color: $bs-primary;
    text-shadow: 1px 1px 0 $white;
    font-size: 0.8rem;
    z-index: 2;
}
.rollcallCard__nameLink {
    color: $font-primary;

    &:hover {
        color: $font-primary;
        text-decoration: underline;
    }
}

$fsz-lessonName: 1.2rem;
$h-lessonName: $fsz-lessonName * 1.5;
$fsz-lessonName-xs: 1rem;
$h-lessonName-xs: $fsz-lessonName-xs * 1.5;
.rollcallCard__name {
    @extend .singleLineEllipsis;
    font-size: $fsz-lessonName;
    line-height: $h-lessonName;
    height: $h-lessonName;
    text-align: center;
    font-weight: bold;
    color: $font-primary;
    margin-top: 0.5rem;

    @media (max-width: $max-w-xs) {
        font-size: $fsz-lessonName-xs;
        line-height: $h-lessonName-xs;
        height: $h-lessonName-xs;
    }
}
.rollcallCard__teacherName {
    text-align: center;
    font-size: 0.8rem;
    margin-bottom: 0;
    color: $darkgray;
}

.rollcallCard__timeArea {
    text-align: center;
    font-size: 0.8rem;
    margin-bottom: 0;
    color: $darkgray;
}

.rollcallCard__display {
    height: 120px;
    position: relative;
}
.rollcallCard__checkBtn {
    width: 90%;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
}
.rollcallCard__checkBtnIcon {
    @extend .faIcon;
}

.rollcallCard__loading {
    width: 50px;
    height: 50px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.rollcallCard__errorMessage {
    font-size: 0.8rem;
    color: $bs-danger;
    padding-top: 40px;
}
.rollcallCard__showTableBtn {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.8rem;
    color: $emphasized3;
    border: none;
    background-color: transparent;
    text-align: right;
    line-height: 1.2;
    &:hover {
        text-decoration: underline;
    }
}
.rollcallCard__rating {
    padding-left: 20px;
}
</style>


<template>
    <BaseCard class="rollcallCard">
        <div class="rollcallCard__wrapper">
            <LessonCardType
                :lessonType="lessonData.type"
                class="rollcallCard__type"
            />
            <span class="rollcallCard__id">#{{ lessonData.l_id }}</span>
            <router-link
                :to="lessonURL"
                class="rollcallCard__nameLink"
            >
                <header class="rollcallCard__name">{{ lessonData.l_name }}</header>
            </router-link>
            <p class="rollcallCard__teacherName">{{ teacherFullName }}</p>
            <p class="rollcallCard__timeArea">
                {{ lessonStartTime }}
                <font-awesome-icon
                    icon="map-marker-alt"
                    v-if="lessonData.area"
                />
                {{ lessonData.area }}
            </p>
            <div class="rollcallCard__display">
                <b-button
                    @click="getRollcalls"
                    class="rollcallCard__checkBtn"
                    v-if="loadStatus == 0"
                    variant="info"
                >
                    <font-awesome-icon
                        class="rollcallCard__checkBtnIcon"
                        icon="chart-pie"
                    />查詢
                </b-button>
                <TheLoadingRoller
                    class="rollcallCard__loading"
                    v-else-if="loadStatus == 1"
                />
                <RollcallCardErrorMessage
                    class="rollcallCard__errorMessage"
                    errorMessage="載入資料失敗，請重整再試試"
                    v-else-if="loadStatus == 2"
                />
                <RollcallCardLabel
                    :rollcallLabel="lessonLabel"
                    v-else-if="lessonLabel"
                />
                <RollcallCardPresenceRate
                    :stepDuration="2"
                    :targetNumber="presenceRate"
                    class="rollcallCard__rating"
                    v-else
                />
                <!-- <RollcallCardShowTableBtn
                    :btnWord="btnWord"
                    
                    class="rollcallCard__showTableBtn"
                    v-if="btnWord"
                />-->

                <button
                    @click="popupTable"
                    class="rollcallCard__showTableBtn"
                    v-html="btnWord"
                    v-show="loadStatus == 3 && !lessonLabel"
                />
            </div>
        </div>
    </BaseCard>
</template>

<script>
import { EventBus } from '../event-bus.js'
import { rollcallMixin } from '../mixins/rollcall' // for getKeyPointUnitId()
import { COMMON_UTILITY } from '../class/commonUtility'
import { JS_CONFIG } from '../config'
import LessonCardType from './LessonCardType'
import RollcallCardPresenceRate from './RollcallCardPresenceRate'
import RollcallCardErrorMessage from './RollcallCardErrorMessage'
import RollcallCardLabel from './RollcallCardLabel'

export default {
    name: 'RollcallCard',
    mixins: [rollcallMixin],
    components: {
        LessonCardType,
        RollcallCardPresenceRate,
        RollcallCardErrorMessage,
        RollcallCardLabel
        // RollcallCardShowTableBtn
    },
    data: function() {
        return {
            loadStatus: 0,
            rollcallDatesL: null,
            rollcallTimes: null,
            presenceTimes: null,
            presenceRate: null,
            lessonLabel: '',
            btnWord: ''
        }
    },
    props: {
        mode: {
            type: Number,
            required: true
        },
        lessonData: {
            type: Object,
            required: true
        }
    },
    mounted() {
        EventBus.$on('check-all-presenceRate', this.getRollcalls)
        if (!COMMON_UTILITY.isPast(this.lessonData.l_start_time)) {
            // 還沒開課
            this.loadStatus = 3
            this.processPresenceData(null, null, 1)

            this.$store.commit('rollcall/SET_MY_LESSONS_ROLLCALL', {
                lid: this.lessonData.l_id,
                unit_data: [],
                unit_time: [],
                rollcallTimes: 0,
                presenceTimes: 0,
                presenceRate: 0
            })
        }
        if (
            JS_CONFIG.ROLLCALL_SYSTEM_ACTIVE_TIME >
            COMMON_UTILITY.timeString2Timestamp(this.lessonData.l_end_time)
        ) {
            // 無有效資料（請假系統之前的課程）
            this.loadStatus = 3
            this.processPresenceData(null, null, 2)

            this.$store.commit('rollcall/SET_MY_LESSONS_ROLLCALL', {
                lid: this.lessonData.l_id,
                unit_data: [],
                unit_time: [],
                rollcallTimes: 0,
                presenceTimes: 0,
                presenceRate: 0
            })
        }
    },
    computed: {
        lessonURL() {
            return '/lesson/' + this.lessonData.l_id
        },
        teacherFullName() {
            return (
                this.lessonData.t_nickname +
                (this.lessonData.t_name ? '(' + this.lessonData.t_name + ')' : '')
            )
        },
        lessonType() {
            return this.lessonData.type == 'online' ? '線上' : '實體'
        },
        lessonStartTime() {
            let l_start_time = this.lessonData.l_start_time
            return l_start_time
                ? l_start_time.substr(0, 16) +
                      ` (${COMMON_UTILITY.timeString2ChinesWeekDay(l_start_time)})`
                : ' '
        }
    },
    methods: {
        async getRollcalls() {
            if (this.presenceRate !== null) {
                return
            }
            let mid = this.$store.state.member.memberData.data.m_id,
                rollcallData,
                unitTime,
                calculatedRollcallData

            this.loadStatus = 1
            try {
                let responseRC = await this.$store.dispatch('rollcall/getLessonRollcalls', {
                    l_id: this.lessonData.l_id,
                    studentMode: true
                })
                if (responseRC.data.status == 0) {
                    rollcallData = responseRC.data.data

                    let response = await this.$store.dispatch('lesson/getLessonUnitTimes', {
                        lid: this.lessonData.l_id
                    })
                    if (response.data.status == 0) {
                        unitTime = response.data.data
                        this.loadStatus = 3
                    } else {
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'getLessonUnitTimes',
                            code: response.data.status,
                            isError: true
                        })
                        this.loadStatus = 2
                    }
                } else {
                    this.loadStatus = 2
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getLessonRollcalls',
                        code: responseRC.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.loadStatus = 2
            }

            this.processPresenceData(rollcallData, unitTime)

            this.$store.commit('rollcall/SET_MY_LESSONS_ROLLCALL', {
                lid: this.lessonData.l_id,
                unit_data: rollcallData,
                unit_time: unitTime,
                rollcallTimes: this.rollcallTimes,
                presenceTimes: this.presenceTimes,
                presenceRate: this.presenceRate
            })
        },

        processPresenceData(rollcallData, unitTime, noDataMode) {
            if (noDataMode) {
                this.presenceRate = this.rollcallDatesL = this.rollcallTimes = this.presenceTimes = 0
                this.lessonLabel = noDataMode == 1 ? '尚未開課' : '無有效資料'
            } else {
                let keypointUids,
                    now = new Date().getTime()

                keypointUids = this.getKeyPointUnitId(unitTime)

                // all unit or some unit are after rollcall system active day.
                if (keypointUids.activeUid) {
                    this.rollcallDatesL = keypointUids.passedUid - keypointUids.activeUid + 1
                    this.rollcallTimes =
                        this.mode == 0
                            ? this.rollcallDatesL
                            : this.rollcallDatesL * lessons[idx].classmates.length

                    this.presenceTimes = rollcallData.filter(rc => {
                        if (rc.u_id > keypointUids.passedUid) {
                            this.rollcallTimes++
                        }
                        return rc.u_id >= keypointUids.activeUid
                    }).length
                }

                // all units are before rollcall active day and passed.
                else {
                    this.rollcallDatesL = this.rollcallTimes = this.presenceTimes = 0
                }

                this.presenceRate =
                    this.rollcallTimes == 0
                        ? 0
                        : ((this.presenceTimes / this.rollcallTimes) * 100).toFixed(2) * 1

                // remove check btn
                if (this.rollcallTimes == 0) {
                    if (this.rollcallDatesL == 0) {
                        this.lessonLabel =
                            this.timeString2Timestamp(unitTime[0]) >= now
                                ? '尚未開課'
                                : '無有效資料'
                    } else {
                        this.lessonLabel = '尚無學員'
                    }
                    this.presenceTimes = 0
                    this.rollcallTimes = 0
                } else {
                    if (this.mode == 0) {
                        this.btnWord = `應出席 ${this.rollcallTimes} 次<br>實際出席 ${this.presenceTimes} 次`
                    } else {
                        this.btnWord = `應出席 ${this.rollcallTimes} 人次<br>實際出席 ${this.presenceTimes} 人次`
                    }
                }
            }
        },

        popupTable() {
            this.$parent.showTableId = this.lessonData.l_id
            EventBus.$emit('show-rollcall-report-popup-table')
        }
    },
    beforeDestroy() {
        EventBus.$off('check-all-presenceRate', this.getRollcalls)
    }
}
</script>