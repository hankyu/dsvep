<style lang="scss">
@import '../../sass/variables';

.filerSet__panel {
    width: 100%;
    min-height: 200px;
    border-radius: $half-h-filterBtn;
    background-color: $bgc-filterSet;
}

.filerSet__filterIcon {
    @extend .faIcon;
    color: $complementary1;
}

.filterSet__filterSwitcher {
    font-size: $fz-filterSet;
    padding-left: $half-h-filterBtn;
    padding-right: $half-h-filterBtn;
    background-color: $bgc-filterSet;
    line-height: 1;
    color: $dark;
    padding-top: $ptb-filterHeader;
    padding-bottom: $ptb-filterHeader;
    border: 1px solid $gray;
    border-radius: $half-h-filterBtn;
}

.filerSet__modalHeader {
    @extend .popupModalHeader;
    font-size: $fz-filterSet;
    padding-top: $ptb-filterHeader;
    padding-bottom: $ptb-filterHeader;
    padding-left: $half-h-filterBtn;
}

.filterSet__modalBody {
    max-height: 60vh;
    overflow-y: auto;
    padding: 0 $pd-popupModal;
    font-size: 0.9rem;

    .form-group {
        margin-bottom: 0;
    }

    .col-form-label {
        font-size: 1.2rem;
        padding-bottom: 0;
    }

    .custom-control-label::after,
    .custom-control-label::before {
        top: 0;
        bottom: 0;
        margin: auto;
    }

    @media (max-width: $max-w-xs) {
        padding: 1rem;
    }
}

.filterSet__group {
    margin-bottom: $mb-inputGroup;
}

.filterSet__field {
    padding: $pd-popupModal 0;
}
.filterSet__fieldGroup + .filterSet__field,
.filterSet__field + .filterSet__field {
    border-top: 1px solid $color-border-light;
}

.filterSet__fieldGroup {
    display: flex;

    .filterSet__field {
        width: 50%;
        border-top: 1px solid $color-border-light;
    }

    @media (max-width: $max-w-sm) {
        display: block;

        .filterSet__field {
            width: 100%;
            border-top: 1px solid $color-border-light;
        }
    }
}

.filterSet__selectResult {
    // border: 1px solid $color-border-light;
    // flex: 1;
    // min-height: 50px;
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 0;

    li {
        display: inline-block;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        background-color: $bs-info;
        border-radius: 1.5rem;
        padding-left: 0.75rem;
        margin-bottom: 0.25rem;

        .filterSet__clearBtn {
            background-color: transparent;
            color: $white;
            border: none;
        }
    }
}

.filterSet__selectBtn {
    background-color: $white;
    border: 1px solid $color-border-layout;
    height: 30px;
    border-radius: 5px;
    margin-left: 0.5rem;
    font-size: 0.8rem;

    &:hover,
    &:active {
        background-color: darken($white, 10%);
    }
}

.filterSet__modalFooter {
    @extend .popupModalFooter;
    border-top: 1px solid $color-border-light;
}

.nowrap {
    white-space: nowrap;
}

.filterSet__chkboxType {
    display: inline-block;
}
.filterSet__select {
    width: 120px;
}
</style>

<template>
    <div class="filterSet">
        <button
            @click="showFilter"
            class="filterSet__filterSwitcher"
        >
            <font-awesome-icon
                class="filerSet__filterIcon"
                icon="search"
            />找課程？
        </button>
        <FilterSetModal ref="filterSetModal">
            <h2
                class="filerSet__modalHeader"
                slot="header"
            >
                <font-awesome-icon
                    class="filerSet__filterIcon"
                    icon="search"
                />找課程？
                <b-button
                    @click="doFilter(true)"
                    variant="info"
                >所有課程</b-button>
            </h2>

            <div class="filterSet__modalBody">
                <div class="filterSet__field">
                    <form
                        @submit="doFilter(false)"
                        action="javascript:void(0);"
                        method="POST"
                    >
                        <b-form-input
                            placeholder="輸入課程、導師、地區之關鍵字"
                            size="sm"
                            v-model="keyword"
                        ></b-form-input>
                    </form>
                    <!-- @keyup.enter="doFilter(false)" -->
                </div>
                <div class="filterSet__field">
                    課程日期範圍：
                    <DateRangePicker v-bind:timeRange.sync="timeRange" />
                </div>
                <div class="filterSet__fieldGroup">
                    <div class="filterSet__field">
                        授課方式：
                        <!-- <b-form-group class="filterSet__chkboxType">
                            <b-form-checkbox-group
                                :options="typeOptions"
                                name="filterSetType"
                                v-model="typeSelected"
                            ></b-form-checkbox-group>
                        </b-form-group>-->
                        <b-form-select
                            :options="typeOptions"
                            class="filterSet__select"
                            size="sm"
                            v-model="typeSelected"
                        ></b-form-select>
                    </div>
                    <div class="filterSet__field">
                        課程費用：
                        <!-- <b-form-group class="filterSet__chkboxType">
                            <b-form-checkbox-group
                                :options="priceOptions"
                                name="filterSetType"
                                v-model="priceSelected"
                            ></b-form-checkbox-group>
                        </b-form-group>-->
                        <b-form-select
                            :options="priceOptions"
                            class="filterSet__select"
                            size="sm"
                            v-model="priceSelected"
                        ></b-form-select>
                    </div>
                </div>
                <!-- <div class="filterSet__field">
                    開課狀況：
                    <b-form-select
                        :options="successOptions"
                        class="filterSet__select"
                        size="sm"
                        v-model="successSelected"
                    ></b-form-select>
                </div>-->
                <div class="filterSet__field filterSet__field--teacher">
                    授課講師：
                    <button
                        @click="teacherSelector"
                        class="filterSet__selectBtn"
                        title="選擇講師"
                    >選擇</button>
                    <button
                        @click="resetTeacher"
                        class="filterSet__selectBtn"
                        title="清空講師"
                    >清空</button>
                    <ul
                        class="filterSet__selectResult"
                        v-if="teacherSelected.length"
                    >
                        <li
                            :key="teacher.tid"
                            v-for="teacher in teacherSelected"
                        >
                            {{teacher.name+(teacher.nickname?'('+teacher.nickname+')':'')}}
                            <button
                                @click="clearTeacher(teacher.tid)"
                                class="filterSet__clearBtn"
                            >
                                <font-awesome-icon icon="times-circle" />
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="filterSet__field">
                    開課地區：
                    <button
                        @click="areaSelector"
                        class="filterSet__selectBtn"
                        title="選擇地區"
                    >選擇</button>
                    <button
                        @click="resetArea"
                        class="filterSet__selectBtn"
                        title="清空地區"
                    >清空</button>
                    <ul
                        class="filterSet__selectResult"
                        v-if="areaSelected.length"
                    >
                        <li
                            :key="areaIdx"
                            v-for="(area,areaIdx) in areaSelected"
                        >
                            {{area}}
                            <button
                                @click="clearArea(area)"
                                class="filterSet__clearBtn"
                            >
                                <font-awesome-icon icon="times-circle" />
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="filterSet__field">
                    領域類別：
                    <button
                        @click="topicLabelSelector"
                        class="filterSet__selectBtn"
                        title="選擇領域類別"
                    >選擇</button>
                    <button
                        @click="resetTopicLabel"
                        class="filterSet__selectBtn"
                        title="清空領域類別"
                    >清空</button>
                    <ul
                        class="filterSet__selectResult"
                        v-if="topicLabelSelectedModified.length"
                    >
                        <li
                            :key="topicLabel.id"
                            v-for="topicLabel in topicLabelSelectedModified"
                        >
                            {{topicLabel.topic + ' / ' + topicLabel.label}}
                            <button
                                @click="clearTopicLabel(topicLabel.topic, topicLabel.label)"
                                class="filterSet__clearBtn"
                            >
                                <font-awesome-icon icon="times-circle" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="filterSet__modalFooter"
                slot="footer"
            >
                <b-button
                    @click="cancel"
                    variant="danger"
                >取消</b-button>

                <b-button
                    @click="doFilter(false)"
                    variant="success"
                >確定</b-button>
            </div>
        </FilterSetModal>
        <ModalTeacherSelector :teacherSelected.sync="teacherSelected" />
        <ModalAreaSelector :areaSelected.sync="areaSelected" />
        <ModalTopicLabelSelector :topicLabelSelected.sync="topicLabelSelected" />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import FilterSetModal from './FilterSetModal'
import DateRangePicker from './DateRangePicker'
import ModalTeacherSelector from './ModalTeacherSelector'
import ModalAreaSelector from './ModalAreaSelector'
import ModalTopicLabelSelector from './ModalTopicLabelSelector'

export default {
    name: 'FilterSetAllLesson',
    components: {
        FilterSetModal,
        DateRangePicker,
        ModalTeacherSelector,
        ModalAreaSelector,
        ModalTopicLabelSelector
    },
    data() {
        return {
            isShow: false,
            filterDone: false,
            filters: {},
            keyword: '',
            typeSelected: 0,
            typeOptions: [
                { value: 0, text: '全部' },
                { value: 1, text: '線上課' },
                { value: 2, text: '實體課' }
            ],
            priceOptions: [
                {
                    text: '全部',
                    value: 0
                },
                {
                    text: '付費',
                    value: 1
                },
                {
                    text: '免費',
                    value: 2
                }
            ],
            priceSelected: 0,
            /* successOptions: [
                {
                    text: '全部',
                    value: 0
                },
                {
                    text: '確定開班',
                    value: 1
                },
                {
                    text: '募資中',
                    value: 2
                }
            ],
            successSelected: 0, */
            timeRange: {
                startTime: '',
                endTime: ''
            },
            teacherSelected: [],
            areaSelected: [],
            topicLabelSelected: {}
        }
    },
    props: {},
    mounted() {},
    computed: {
        topicLabelSelectedModified() {
            let keys = Object.keys(this.topicLabelSelected),
                returnArr = []

            keys.forEach(key => {
                this.topicLabelSelected[key].forEach(result => {
                    returnArr.push(result)
                })
            })
            return returnArr
        }
    },
    methods: {
        showFilter() {
            EventBus.$emit('show-filter-modal')
        },
        checkBodyScrollStatus() {
            this.$parent.checkBodyScrollStatus()
        },
        closeModal() {
            EventBus.$emit('close-filter-modal')
        },
        teacherSelector() {
            EventBus.$emit('show-teacher-selector')
        },
        resetTeacher() {
            this.teacherSelected = []
        },
        clearTeacher(tid) {
            this.teacherSelected.some((teacher, idx, arr) => {
                if (teacher.tid == tid) {
                    arr.splice(idx, 1)
                    return true
                } else {
                    return false
                }
            })
        },
        areaSelector() {
            EventBus.$emit('show-area-selector')
        },
        resetArea() {
            this.areaSelected = []
        },
        clearArea(a) {
            this.areaSelected.some((area, idx, arr) => {
                if (area == a) {
                    arr.splice(idx, 1)
                    return true
                } else {
                    return false
                }
            })
        },
        topicLabelSelector() {
            EventBus.$emit('show-topicLabel-selector')
        },
        resetTopicLabel() {
            this.topicLabelSelected = {}
        },
        clearTopicLabel(clearTopic, clearedLabel) {
            let keys = Object.keys(this.topicLabelSelected),
                tmp = {}

            keys.forEach(key => {
                if (key == clearTopic) {
                    tmp[key] = []
                    this.topicLabelSelected[key].forEach(result => {
                        if (result.label != clearedLabel) {
                            tmp[key].push(result)
                        }
                    })
                } else {
                    tmp[key] = this.topicLabelSelected[key]
                }
            })
            this.topicLabelSelected = tmp
        },
        cancel() {
            if (!this.filterDone) {
                this.doFilter(true)
            } else {
                this.closeModal()
            }
        },
        doFilter(reset) {
            // 預設所有課程
            if (reset) {
                this.keyword = ''
                this.timeRange = {
                    startTime: '',
                    endTime: ''
                }
                this.typeSelected = 0
                this.priceSelected = 0
                // this.successSelected = 0
                this.teacherSelected = []
                this.areaSelected = []
                this.topicLabelSelected = {}
            }

            this.filterDone = true
            this.filters = {}
            if (this.keyword) {
                this.filters.keyword = this.keyword
            }
            if (this.timeRange.startTime) {
                this.filters.startTime = this.timeRange.startTime
            }
            if (this.timeRange.endTime) {
                this.filters.endTime = this.timeRange.endTime
            }
            this.filters.type = this.typeSelected
            this.filters.price = this.priceSelected
            // this.filters.success = this.successSelected
            this.filters.teachers = this.teacherSelected.map(elm => {
                return elm.tid
            })
            this.filters.areas = this.areaSelected.map(elm => {
                return elm
            })

            let keys = Object.keys(this.topicLabelSelected),
                tmpArr = []

            if (keys.length) {
                keys.forEach(key => {
                    let topicArr = this.topicLabelSelected[key]
                    if (topicArr && topicArr.length) {
                        topicArr.forEach(tl => {
                            tmpArr.push({ topic: tl.topic, label: tl.label })
                        })
                    }
                })
            }
            this.filters.topicLabels = tmpArr

            EventBus.$emit('filter-set-complete')
            EventBus.$emit('close-filter-modal')
        }
    }
}
</script>