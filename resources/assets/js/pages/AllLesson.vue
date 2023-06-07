<style lang="scss" scoped>
@import '../../sass/variables';
@import '../../sass/vendors/cardContainer';

.allLesson {
    .allLesson__allLoaded {
        @extend .noData;
        margin-top: 0;
    }
}
.allLesson__card {
    width: 100%;
    min-width: 0;
    margin: 0 auto 30px;

    @media (max-width: $max-w-xs) {
        max-width: 280px;
    }
}

#scrollLoad {
    position: relative;
    top: -110vh;
    z-index: -1;
    height: 1;
    overflow: hidden;
}

.allLesson__wishBar {
    height: 0;
    position: relative;
    text-align: right;
    width: 100%;
}

.allLesson__btnWish {
    font-size: 0.9rem;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>

<template>
    <div class="webPage wrapper allLesson">
        <h1 class="pageH1">{{ title }}</h1>
        <FilterSetAllLesson
            filterName="課程篩選器"
            ref="filterSetAllLesson"
        />
        <BaseBtnBar
            class="allLesson__wishBar"
            v-if="isLoginedMember"
        >
            <b-button
                @click="makeWish"
                class="allLesson__btnWish"
                variant="success"
            >許願池</b-button>
        </BaseBtnBar>
        <b-container
            class="defaultCardContainer"
            v-if="lessons.length"
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
                        class="allLesson__card"
                    />
                </b-col>
            </b-row>
        </b-container>
        <div
            class="noData"
            v-if="loadStatus==3 && !lessons.length"
        >尚無符合條的課程</div>
        <LoadingSet v-if="loadStatus==1||loadStatus==2" />
        <b-nav v-b-scrollspy>
            <b-nav-item
                ref="scrollLoadSpyer"
                to="#scrollLoad"
            >&nbsp;</b-nav-item>
        </b-nav>
        <div id="scrollLoad">&nbsp;</div>
        <p
            class="allLesson__allLoaded"
            v-if="allLoaded && lessons.length"
        >已全部載入</p>
        <MakeWishSet />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import { COMMON_UTILITY } from '../class/commonUtility'
import FilterSetAllLesson from '../components/FilterSetAllLesson'
import LoadingSet from '../components/LoadingSet'
import LessonCard from '../components/LessonCard'
import MakeWishSet from '../components/MakeWishSet'

export default {
    name: 'AllLesson',
    components: {
        FilterSetAllLesson,
        LoadingSet,
        LessonCard,
        MakeWishSet
    },
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.ALL_LESSON,
            allLoaded: false
        }
    },
    created() {
        this.$root.$on('bv::scrollspy::activate', this.onActivate)
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        EventBus.$emit('show-filter-modal')
        EventBus.$on('reload-lessons', this.getLessons)
        EventBus.$on('filter-set-complete', this.filterSetComplete)
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        ...mapState({
            loadStatus: state => state.lesson.allLessons.loadStatus,
            lessons: state => state.lesson.allLessons.data
        }),
        ...mapGetters({
            isLoginedMember: 'member/isLoginedMember'
        })
    },
    methods: {
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(this.$refs['filterSetAllLesson'].isShow)
        },
        getLoadedLessonsNum() {
            return this.lessons.length
        },
        init() {},
        filterSetComplete() {
            this.allLoaded = false
            this.getLessons()
        },
        async getLessons(scrollLoad) {
            let filters = this.$refs.filterSetAllLesson.filters,
                startIdx = scrollLoad ? this.getLoadedLessonsNum() : 0

            try {
                let response = await this.$store.dispatch('lesson/getLessons', {
                    filters: filters,
                    startIdx: startIdx
                })
                if (response.data.status == 0) {
                    let snapshot = response.data.data

                    if (snapshot.length < JS_CONFIG.LESSONS_PER_LOAD) {
                        this.allLoaded = true
                    }

                    snapshot.forEach(lesson => {
                        lesson.cancel_lesson =
                            lesson.cancel_lesson_init && !lesson.cancel_lesson
                                ? 2
                                : lesson.cancel_lesson
                        lesson.current_fee = COMMON_UTILITY.isPast(lesson.end_fund, true)
                            ? lesson.origin_fee
                            : lesson.current_fee
                    })

                    this.$store.commit('lesson/PUSH_LESSONS', {
                        stateName: 'allLessons',
                        data: snapshot
                    })
                } else {
                    this.$store.commit('lesson/DATAS_STATUS', {
                        stateName: 'allLessons',
                        status: 2
                    })
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getLessons',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('lesson/DATAS_STATUS', { stateName: 'allLessons', status: 2 })

                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        onActivate(target) {
            if (
                !this.allLoaded &&
                this.$refs.filterSetAllLesson &&
                this.$refs.filterSetAllLesson.filterDone &&
                this.loadStatus == 3
            ) {
                this.getLessons(true)
            }
        },
        makeWish() {
            EventBus.$emit('show-wish-maker')
        }
    },
    beforeDestroy() {
        this.$store.commit('lesson/SET_DATAS', {
            stateName: 'allLessons',
            data: []
        })
        this.$store.commit('lesson/DATAS_STATUS', { stateName: 'allLessons', status: 0 })
        this.$root.$off('bv::scrollspy::activate', this.onActivate)
        EventBus.$off('filter-set-complete', this.filterSetComplete)
        EventBus.$off('reload-lessons', this.getLessons)
        this.$parent.switchBodyScrollStatus(false)
    }
}
</script>
