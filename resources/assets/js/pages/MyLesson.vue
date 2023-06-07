<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/vendors/cardContainer';

.myLesson__card {
    width: 100%;
    min-width: 0;
    margin: 0 auto;

    @media (max-width: $max-w-xs) {
        max-width: 280px;
    }
}

.myLesson__deadline {
    margin-bottom: 1.5rem;
    font-size: 0.8rem;
    color: $complementary1;
}

.myLesson__orderDeadline {
    margin-bottom: 1.5rem;
    font-size: 0.8rem;
    color: $bs-success;
}

.myLesson__orderDeadline--past {
    color: $emphasized2;
}

.myLesson__noData {
    @extend .noData;
}

#scrollLoad {
    position: relative;
    top: -110vh;
    z-index: -1;
    height: 1;
    overflow: hidden;
}

.myLesson__filter,
.myLesson__sorter {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 0;
}

$bgc-filter: $bs-success, $emphasized3, $emphasized2, $gray;
.myLesson__filterItem {
    display: inline-block;
    background-color: $gainsboro;
    color: $gray;
    padding: 0.5rem 1rem;
    min-width: 100px;
    text-align: center;

    &.myLesson__filterItem--active {
        color: $white;

        @for $i from 1 through 4 {
            &:nth-child(#{$i}) {
                background-color: nth($bgc-filter, $i);
                &:hover,
                &:active {
                    background-color: nth($bgc-filter, $i);
                }
            }
        }
    }

    @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
            &:hover,
            &:active {
                background-color: lighten(nth($bgc-filter, $i), 30%);
            }
        }
    }

    @media (max-width: $max-w-xs) {
        padding: 0.25rem 0.5rem;
        min-width: 0;
    }
}
.myLesson__filterItem + .myLesson__filterItem {
    margin-left: 5px;
}

.myLesson__sorter {
    text-align: right;
    font-size: 0.9rem;
}

.myLesson__sorterBtn {
    @include btnBgColorCustom($brand-primary);
    color: $white;
    height: 1.4rem;
    line-height: 1.4rem;
    border-radius: 1.4rem;
    font-size: 0.8rem;
    padding: 0 0.7rem;
}
</style>

<template>
    <div class="webPage wrapper">
        <h1 class="pageH1">{{ title }}</h1>
        <ul class="myLesson__filter">
            <li
                :class="idx == filterIdx ? 'myLesson__filterItem--active' : ''"
                :key="idx"
                @click="switchFilter(idx)"
                class="myLesson__filterItem"
                v-for="(filter, idx) in filters"
            >{{ filter }}</li>
        </ul>
        <ul class="myLesson__sorter">
            <li
                :class="sorterItemClass(idx)"
                :key="idx"
                class="myLesson__sorterItem"
                v-for="(sorter, idx) in sorters"
            >
                <button
                    @click="switchSort(idx)"
                    class="myLesson__sorterBtn"
                >
                    <font-awesome-icon
                        icon="sort-amount-up"
                        v-if="idx==sortIdx && sortAsc"
                    />
                    <font-awesome-icon
                        icon="sort-amount-down"
                        v-else-if="idx==sortIdx"
                    />
                    {{ sorter }}
                </button>
            </li>
        </ul>
        <LoadingSet v-if="loadStatus==1||loadStatus==2" />
        <b-container
            class="defaultCardContainer"
            v-else-if="lessons.length"
        >
            <b-row>
                <b-col
                    :key="lesson.l_id"
                    cols="12"
                    lg="4"
                    sm="6"
                    v-for="lesson in lessons"
                    xl="3"
                >
                    <LessonCard
                        :lessonData="lesson"
                        :myLessonMode="true"
                        class="myLesson__card"
                    />
                    <p
                        class="myLesson__deadline"
                        v-if="lesson.type=='online' && !lesson.orderDeadline"
                    >{{lesson.deadline==999?'可永久觀看':'可觀看 '+lesson.deadline+' 個月'}}</p>
                    <p
                        :class="orderDeadlineClass(lesson)"
                        class="myLesson__orderDeadline"
                        v-else
                    >{{orderDeadline(lesson)}}</p>
                </b-col>
            </b-row>
        </b-container>
        <div
            class="myLesson__noData"
            v-else
        >尚未擁有任何課程</div>
        <b-nav v-b-scrollspy>
            <b-nav-item
                ref="scrollLoadSpyer"
                to="#scrollLoad"
            >&nbsp;</b-nav-item>
        </b-nav>
        <div id="scrollLoad">&nbsp;</div>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from '../components/LoadingSet'
import LessonCard from '../components/LessonCard'
import { COMMON_UTILITY } from '../class/commonUtility'
import { mapGetters } from 'vuex'

export default {
    name: 'MyLesson',
    components: {
        LoadingSet,
        LessonCard
    },
    data() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.MY_LESSON,
            filterIdx: 0,
            filters: ['全部', '線上', '實體'],
            sortIdx: 0,
            sortAsc: true,
            sorters: ['價格']
        }
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        this.$store.dispatch('lesson/getMyLessons')
    },
    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        lessons() {
            let types = ['', 'online', 'entity'],
                arr

            switch (this.filterIdx) {
                case 0:
                    arr = this.myLessonsData
                    break
                default:
                    arr = this.myLessonsData.filter(elm => {
                        return elm.type == types[this.filterIdx]
                    })
                    break
            }
            arr = JSON.parse(JSON.stringify(arr))
            arr.sort((a, b) => {
                if (a.orderPrice > b.orderPrice) {
                    return this.sortAsc ? 1 : -1
                } else if (a.orderPrice == b.orderPrice) {
                    return 0
                } else {
                    return this.sortAsc ? -1 : 1
                }
            })
            return arr
        },
        ...mapGetters({
            loadStatus: 'lesson/myLessonsLoadStatus',
            myLessonsData: 'lesson/myLessonsData'
        })
    },
    methods: {
        sorterItemClass(idx) {
            let classStr = ''

            classStr += idx == this.sortIdx ? 'myLesson__sorterItem--active ' : ''
            classStr += this.sortAsc ? 'myLesson__sorterItem--asc' : 'myLesson__sorterItem--desc'
            return classStr
        },
        switchFilter(idx) {
            this.filterIdx = idx
        },
        switchSort(idx) {
            if (idx == this.sortIdx) {
                this.sortAsc = !this.sortAsc
            } else {
                this.sortIdx = idx
                this.sortAsc = true
            }
        },
        orderDeadlineClass(lesson) {
            return lesson.orderDeadline && COMMON_UTILITY.isPast(lesson.orderDeadline, true)
                ? 'myLesson__orderDeadline--past'
                : ''
        },
        orderDeadline(lesson) {
            if (lesson.orderDeadline) {
                let text = COMMON_UTILITY.isPast(lesson.orderDeadline, true)
                    ? '觀看截止日已過期'
                    : '觀看截止日'
                return text + ': ' + lesson.orderDeadline.replace(/\-/g, '/')
            } else {
                return ''
            }
        }
    }
}
</script>
