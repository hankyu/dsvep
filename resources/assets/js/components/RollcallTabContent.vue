<style lang="scss">
@import '../../sass/variables';

.rollcallTabContent__unitSelect {
    margin-bottom: 0.25rem;

    .custom-select {
        width: auto;
    }

    @media (max-width: $max-w-xs) {
        margin-bottom: 0.5rem;
        font-size: 0.8rem;

        .custom-select {
            padding: 0.375rem 1.35rem 0.375rem 0.35rem;
            font-size: 0.8rem;
        }
    }
}

.rollcallTabContent__btnQRcode {
    display: inline-block;
    width: 47px;
    height: 47px;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 4px;
    vertical-align: middle;
    font-size: 1.2rem;

    @media (max-width: $max-w-xs) {
        width: 37px;
        height: 37px;
    }
}

.rollcallTabContent__classmatesFilter {
    text-align: right;

    .rollcallTabContent__classmatesFilterInput {
        width: 200px;
        display: inline-block;
    }

    @media (max-width: $max-w-xs) {
        text-align: left;
        font-size: 0.8rem;

        .rollcallTabContent__classmatesFilterInput {
            padding: 0.375rem 1.35rem 0.375rem 0.35rem;
            font-size: 0.8rem;
        }
    }
}

.rollcallTabContent__rollcallSystem {
    width: 100%;
    overflow-x: auto;
    margin-top: 0.5rem;

    table {
        min-width: 100%;
        /* border-spacing: 0 1rem;
        border-collapse: separate; */
        border-collapse: collapse;
        tr {
            td {
                padding: 0.5rem;
                vertical-align: middle;
                border-bottom: 1px solid $color-border-primary;

                &.rollcallTabContent__tdCheckbox {
                    white-space: nowrap;
                    width: 1px;
                }
            }
        }
    }
    .rollcallTabContent__checkbox {
        display: none;
    }

    .rollcallTabContent__label {
        width: auto;
        margin-bottom: 0;
        cursor: pointer;

        &::before {
            content: attr(data-tittle);
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.25rem;
        }
        &:after {
            content: '';
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 1px solid $font-primary;
            background-color: $gainsboro;
            border-radius: 3px;
            vertical-align: middle;
        }
    }

    .rollcallTabContent__checkbox:checked + .rollcallTabContent__label {
        &:after {
            background-color: $emphasized4;
            background-image: url(/img/checkIcon.svg);
            background-size: 100% 100%;
        }
    }

    @media (max-width: $max-w-xs) {
        table,
        tr,
        td {
            display: block;
            font-size: 1rem;
        }

        table {
            tr {
                border-bottom: 1px solid $color-border-primary;
                padding-top: 1rem;
                padding-bottom: 1rem;

                &:after {
                    content: '';
                    display: block;
                    clear: both;
                }

                td {
                    padding: 0;
                    border: none;
                    width: 100%;

                    &:nth-child(1) {
                        font-weight: bold;
                    }

                    &.rollcallTabContent__tdEmail {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    &.rollcallTabContent__tdPhone {
                        width: 60%;
                        float: left;
                    }

                    &.rollcallTabContent__tdCheckbox {
                        white-space: normal;
                        width: 39%;
                        float: right;
                        text-align: right;
                    }
                }
            }
        }
    }
}

.rollcallTabContent__rollcallSystemBtnBar {
    text-align: right;
    padding-top: 0.5rem;
}

.rollcallTabContent__rollcallSystemBtn {
    font-size: 0.9rem;
}
.rollcallTabContent__noticeNotRollcallable {
    padding: 2rem 0;
    text-align: center;
    color: $emphasized2;
}
</style>


<template>
    <div class="rollcallTabContent">
        <p class="rollcallTabContent__unitSelect">
            選擇課堂：
            <br class="br-xxs" />
            <b-form-select
                :options="dateOptions"
                @change="changeDate"
                v-model="dateSelected"
            ></b-form-select>
            <b-form-select
                :options="unitOptions"
                v-model="unitSelected"
            ></b-form-select>
            <button
                @click="getQRCode"
                class="rollcallTabContent__btnQRcode"
                role="qrcode"
                v-if="rollcllable"
            >
                <font-awesome-icon icon="qrcode" />
            </button>
        </p>
        <div
            class="rollcallTabContent__classmates"
            v-if="rollcllable"
        >
            <div class="rollcallTabContent__classmatesFilter">
                手機號碼：
                <br class="br-xxs" />
                <b-form-input
                    @keyup="telModify"
                    class="rollcallTabContent__classmatesFilterInput"
                    type="tel"
                    v-model="filterPhone"
                />
            </div>
            <div
                class="rollcallTabContent__rollcallSystem"
                v-if="loaded"
            >
                <table>
                    <tr v-for="(classmate, idx) in filteredLessonClassmates">
                        <td>{{classmate.nickname+(classmate.m_name?' ('+classmate.m_name+')':'')}}</td>
                        <td
                            :title="classmate.email"
                            class="rollcallTabContent__tdEmail"
                        >{{classmate.email}}</td>
                        <td class="rollcallTabContent__tdPhone">{{classmate.cellphone}}</td>
                        <td class="rollcallTabContent__tdCheckbox">
                            <input
                                :id="'rollcallCeckbox'+idx"
                                :value="classmate.m_id"
                                @change="addToModify"
                                class="rollcallTabContent__checkbox"
                                name="rollcallCeckbox"
                                type="checkbox"
                                v-model="rollcalls[(unitSelected-1)*lessonClassmates.length+idx]"
                            />
                            <label
                                :for="'rollcallCeckbox'+idx"
                                class="rollcallTabContent__label"
                                data-tittle="出席"
                            ></label>
                        </td>
                    </tr>
                </table>
                <div class="rollcallTabContent__rollcallSystemBtnBar">
                    <b-button
                        :disabled="!modifiedDatas.length"
                        @click="save"
                        class="rollcallTabContent__rollcallSystemBtn"
                        variant="success"
                    >儲存</b-button>
                </div>
            </div>
            <LoadingSet v-else />
        </div>
        <div
            class="rollcallTabContent__noticeNotRollcallable"
            v-else
        >尚不可點名，課堂開始一小時前始可進行點名。</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import { rollcallMixin } from '../mixins/rollcall.js' // for getKeyPointUnitId()
import { COMMON_UTILITY } from '../class/commonUtility'
import LoadingSet from './LoadingSet'

export default {
    name: 'RollcallTabContent',
    mixins: [rollcallMixin],
    components: { LoadingSet },
    data: function() {
        return {
            dateSelected: null,
            unitSelected: null,
            dateOptions: [],
            unitOptions: [],
            unitQRcode: {},
            filterPhone: '',
            lessonRollcalls: [],
            lessonRollcallsLoadStatus: 0,
            rollcalls: [],
            modifiedDatas: [],
            rollcllable: null
        }
    },
    props: {
        units: {
            type: Array,
            default() {
                return []
            }
        },
        lid: { type: Number, required: true }
    },
    async mounted() {
        this.getOptions()
        if (!this.lessonClassmatesLoadCompleted) {
            try {
                let response = await this.$store.dispatch('lesson/getLessonClassmates', this.lid)

                if (response.data.status == 0) {
                    this.$store.commit('lesson/SET_DATAS', {
                        stateName: 'lessonClassmates',
                        data: response.data.data
                    })
                } else {
                    this.$store.commit('lesson/DATAS_STATUS', {
                        stateName: 'lessonClassmates',
                        status: 2
                    })
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getLessonClassmates',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('lesson/DATAS_STATUS', {
                    stateName: 'lessonClassmates',
                    status: 2
                })

                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        }
        this.getLessonRollcalls()
    },
    computed: {
        unitRollcalls() {
            if (this.unitSelected && this.lessonRollcallsLoadStatus == 3) {
                return this.lessonRollcalls.filter(rc => {
                    return rc.u_id == this.unitSelected
                })
            } else {
                return []
            }
        },
        loaded() {
            return this.lessonClassmatesLoadCompleted && this.lessonRollcallsLoadStatus == 3
        },
        filteredLessonClassmates() {
            return this.lessonClassmates.filter(classmate => {
                let re = new RegExp('^' + this.filterPhone)
                return classmate.cellphone.match(re)
            })
        },
        ...mapGetters({
            lessonClassmates: 'lesson/lessonClassmates',
            lessonClassmatesLoadCompleted: 'lesson/lessonClassmatesLoadCompleted'
        })
    },
    methods: {
        getOptions() {
            /* ------------------ */
            /*     日期Options     */
            /* ------------------ */
            this.dateOptions = []
            this.units.forEach(unit => {
                let d = COMMON_UTILITY.fullTimeString2DateString(unit.l_start_time)
                if (
                    !this.dateOptions.some(option => {
                        return option.text == d
                    })
                ) {
                    this.dateOptions.push({ text: d, value: unit.l_start_time.substr(0, 10) })
                }
            })

            /* ------------------ */
            /*     找出預設日期     */
            /* ------------------ */
            let now = new Date().getTime(),
                oneHrMicroSec = 3600000 * JS_CONFIG.START_ROLLCALL_HOUR_BEFORE

            // 時間未到第一堂課的一小時前
            if (
                now <
                COMMON_UTILITY.timeString2Timestamp(this.units[0].l_start_time) - oneHrMicroSec
            ) {
                this.dateSelected = this.units[0].l_start_time.substr(0, 10)
                this.unitSelected = this.units[0].u_id
            }

            // 時間超過第一堂課的一小時前
            else {
                for (let i = this.units.length - 1; i >= 0; i--) {
                    if (
                        now >=
                        COMMON_UTILITY.timeString2Timestamp(this.units[i].l_start_time) -
                            oneHrMicroSec
                    ) {
                        this.dateSelected = this.units[i].l_start_time.substr(0, 10)
                        this.unitSelected = this.units[i].u_id
                        break
                    }
                }
                if (!this.unitSelected) {
                    this.dateSelected = this.units[this.units.length - 1].l_start_time.substr(0, 10)
                    this.unitSelected = this.units[this.units.length - 1].u_id
                }
            }

            this.getUnitOptions()
        },
        async getUnitOptions() {
            /* ------------------ */
            /*     章節 Options    */
            /* ------------------ */
            this.unitOptions = []
            this.units.forEach(unit => {
                if (unit.l_start_time.substr(0, 10) == this.dateSelected) {
                    this.unitOptions.push({
                        text: unit.l_start_time.substr(11, 5),
                        value: unit.u_id
                    })
                }
            })

            if (!this.unitSelected && this.unitOptions.length) {
                this.unitSelected = this.unitOptions[0].value
            }

            // 檢查選擇的章節是否已可點名
            if (this.unitSelected) {
                let selectedUnit = this.units.filter(unit => {
                    return unit.u_id == this.unitSelected
                })

                if (selectedUnit.length) {
                    let now = new Date().getTime(),
                        oneHrMicroSec = 3600000 * JS_CONFIG.START_ROLLCALL_HOUR_BEFORE

                    this.rollcllable =
                        now >=
                        COMMON_UTILITY.timeString2Timestamp(selectedUnit[0].l_start_time) -
                            oneHrMicroSec
                            ? true
                            : false
                } else {
                    this.rollcllable = false
                }
            } else {
                this.rollcllable = false
            }
        },
        changeDate(val) {
            this.unitSelected = null
            this.getUnitOptions()
        },
        async getQRCode() {
            if (!this.unitQRcode[this.unitSelected]) {
                try {
                    let response = await this.$store.dispatch('rollcall/getRollcallQRCode', {
                        l_id: this.lid,
                        u_id: this.unitSelected
                    })
                    if (response.data.status == 0) {
                        this.unitQRcode[this.unitSelected] = response.data.data.replace(
                            '../public',
                            ''
                        )
                        this.showQRCode()
                    } else {
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'getRollcallQRCode',
                            code: response.data.status,
                            isError: true
                        })
                    }
                } catch (e) {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'unknown',
                        code: e,
                        isError: true
                    })
                }
            } else {
                this.showQRCode()
            }
        },
        showQRCode() {
            let timeString
            this.units.some(unit => {
                if (unit.u_id == this.unitSelected) {
                    timeString = unit.l_start_time.replace(/-/g, '/').substr(0, 16)
                    return true
                }
            })
            EventBus.$emit('show-qrcode', {
                imgSrc: this.unitQRcode[this.unitSelected],
                unitTimeString: timeString
            })
        },
        telModify(evt) {
            this.filterPhone = evt.target.value.replace(/\D/gi, '')
        },
        /* lessonClassmates() {
            return this.$store.state.lesson.lessonClassmates.data
        }, */
        async getLessonRollcalls() {
            this.lessonRollcallsLoadStatus = 1
            try {
                let response = await this.$store.dispatch('rollcall/getLessonRollcalls', {
                    l_id: this.lid
                })
                if (response.data.status == 0) {
                    this.lessonRollcalls = response.data.data
                    this.lessonRollcallsLoadStatus = 3
                } else {
                    this.lessonRollcallsLoadStatus = 2
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getLessonRollcalls',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.lessonRollcallsLoadStatus = 2

                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }

            if (this.lessonClassmatesLoadCompleted) {
                let classmates = this.lessonClassmates

                this.units.forEach(unit => {
                    classmates.forEach(classmate => {
                        let tmp = this.lessonRollcalls.filter(rc => {
                            return rc.u_id == unit.u_id && rc.m_id == classmate.m_id
                        })
                        let bool = tmp.length ? true : false
                        this.rollcalls.push(bool)
                    })
                })
            }
        },
        addToModify(evt) {
            let mid = evt.target.value * 1,
                matchData = this.modifiedDatas.filter(data => {
                    return data.u_id == this.unitSelected && data.m_id == mid
                })

            if (matchData.length) {
                matchData[0].status = evt.target.checked
            } else {
                this.modifiedDatas.push({
                    u_id: this.unitSelected,
                    m_id: mid,
                    status: evt.target.checked
                })
            }
        },
        save() {
            let lid = this.lid,
                effectiveData = []

            this.modifiedDatas.forEach(elm => {
                let matchedOldData = this.lessonRollcalls.filter(oldRC => {
                    return oldRC.m_id == elm.m_id && oldRC.u_id == elm.u_id
                })

                // matchedOldData.length XOR elm.status
                if (matchedOldData.length ? !elm.status : elm.status) {
                    effectiveData.push(elm)
                }
            })
            this.$store.dispatch('rollcall/updateRollcall', { effectiveData, lid })
        }
    },
    beforeDestroy() {
        this.unitQRcode = {}
    }
}
</script>