<style lang="scss" scoped>
@import '../../sass/variables';

.pageH1 {
    display: none;
}

.home__banner {
    img {
        width: 100%;
    }
}

.lessonSlider {
    margin-top: 2rem;

    @media (max-width: $max-w-xs) {
        margin-top: 1rem;
    }
}
</style>

<template>
    <div class="webPage">
        <h1 class="pageH1">首頁</h1>

        <div class="wrapper">
            <LessonSlider
                :complete="recentLessonsLoadComplete"
                :lessons="recentLessons"
                :sliderTitle="this.getTerms('RECENT_LESSONS')"
                class="lessonSlider"
                moreLessonHref="/lesson/all"
                v-if="!recentLessonsLoadComplete || recentLessons.length>0"
            ></LessonSlider>
            <LessonSlider
                :complete="monthHotLessonsLoadComplete"
                :lessons="monthHotLessons"
                :sliderTitle="this.getTerms('HOT_LESSONS')"
                class="lessonSlider"
                moreLessonHref="/lesson/all"
                v-if="!monthHotLessonsLoadComplete || monthHotLessons.length>0"
            ></LessonSlider>
            <LessonSlider
                :complete="recentFreeLessonsLoadComplete"
                :lessons="recentFreeLessons"
                :sliderTitle="this.getTerms('RECENT_FREE_LESSONS')"
                class="lessonSlider"
                moreLessonHref="/lesson/all"
                v-if="!recentFreeLessonsLoadComplete || recentFreeLessons.length>0"
            ></LessonSlider>
            <LessonSlider
                :complete="recentEntityLessonsLoadComplete"
                :lessons="recentEntityLessons"
                :sliderTitle="this.getTerms('NEWEST_ENTITY_LESSONS')"
                class="lessonSlider"
                moreLessonHref="/lesson/all"
                v-if="!recentEntityLessonsLoadComplete || recentEntityLessons.length>0"
            ></LessonSlider>
            <LessonSlider
                :complete="recentOnlineLessonsLoadComplete"
                :lessons="recentOnlineLessons"
                :sliderTitle="this.getTerms('NEWEST_ONLINE_LESSONS')"
                class="lessonSlider"
                moreLessonHref="/lesson/all"
                v-if="!recentOnlineLessonsLoadComplete || recentOnlineLessons.length>0"
            ></LessonSlider>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LessonSlider from '../components/LessonSlider'
import { COOKIE_KIT } from '../class/cookieKit'
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    components: {
        LessonSlider
    },
    data: function() {
        return {
            title: 'My Home Title'
        }
    },
    created() {
        let fireworkPlayed = COOKIE_KIT.getCookie('fireworkPlayed')
        this.$store.commit('SET_FIREWORK_PLAYED', fireworkPlayed == 1 ? true : false)
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        EventBus.$on('reload-lessons', this.init)
        this.init()
        EventBus.$emit('show-home-promote')
    },
    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        ...mapState({
            recentLessons: state => state.lesson.recentLessons.data,
            recentLessonsLoadingStatus: state => state.lesson.recentLessons.data,
            monthHotLessons: state => state.lesson.monthHotLessons.data,
            monthHotLessons: state => state.lesson.monthHotLessons.data,
            recentFreeLessons: state => state.lesson.recentFreeLessons.data,
            recentFreeLessons: state => state.lesson.recentFreeLessons.data,
            recentEntityLessons: state => state.lesson.recentEntityLessons.data,
            recentEntityLessons: state => state.lesson.recentEntityLessons.data,
            recentOnlineLessons: state => state.lesson.recentOnlineLessons.data,
            recentOnlineLessons: state => state.lesson.recentOnlineLessons.data
        }),
        ...mapGetters({
            recentLessonsLoadComplete: 'lesson/recentLessonsLoadComplete',
            recentLessonsLoadComplete: 'lesson/recentLessonsLoadComplete',
            monthHotLessonsLoadComplete: 'lesson/monthHotLessonsLoadComplete',
            recentFreeLessonsLoadComplete: 'lesson/recentFreeLessonsLoadComplete',
            recentEntityLessonsLoadComplete: 'lesson/recentEntityLessonsLoadComplete',
            recentOnlineLessonsLoadComplete: 'lesson/recentOnlineLessonsLoadComplete'
        })
    },
    methods: {
        getTerms(name) {
            return JS_CONFIG.TERMS[name]
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(
                !this.$store.state.fireworkPlayed && this.$refs['modalHomePromote'].isShow
            )
        },
        checkReloadCondition(loadTime, now) {
            let dt1 = COMMON_UTILITY.timestamp2DatetimeString(now),
                dt2 = COMMON_UTILITY.timestamp2DatetimeString(loadTime)

            if (dt1.substr(0, 10) != dt2.substr(0, 10) || dt1.substr(11, 2) == '00') {
                return true
            } else {
                return false
            }
        },
        init() {
            let now = new Date().getTime(),
                lessonState = this.$store.state.lesson,
                recentLessons = lessonState.recentLessons,
                monthHotLessons = lessonState.monthHotLessons,
                recentFreeLessons = lessonState.recentFreeLessons,
                recentEntityLessons = lessonState.recentEntityLessons,
                recentOnlineLessons = lessonState.recentOnlineLessons

            if (
                recentLessons.loadStatus != 3 ||
                (recentLessons.loadTimestamp &&
                    this.checkReloadCondition(recentLessons.loadTimestamp, now))
            ) {
                this.$store.dispatch('lesson/getPromotingLessons', 0)
            }

            if (
                monthHotLessons.loadStatus != 3 ||
                (monthHotLessons.loadTimestamp &&
                    this.checkReloadCondition(monthHotLessons.loadTimestamp, now))
            ) {
                this.$store.dispatch('lesson/getPromotingLessons', 1)
            }

            if (
                recentFreeLessons.loadStatus != 3 ||
                (recentFreeLessons.loadTimestamp &&
                    this.checkReloadCondition(recentFreeLessons.loadTimestamp, now))
            ) {
                this.$store.dispatch('lesson/getPromotingLessons', 2)
            }

            if (
                recentEntityLessons.loadStatus != 3 ||
                (recentEntityLessons.loadTimestamp &&
                    this.checkReloadCondition(recentEntityLessons.loadTimestamp, now))
            ) {
                this.$store.dispatch('lesson/getPromotingLessons', 3)
            }

            if (
                recentOnlineLessons.loadStatus != 3 ||
                (recentOnlineLessons.loadTimestamp &&
                    this.checkReloadCondition(recentOnlineLessons.loadTimestamp, now))
            ) {
                this.$store.dispatch('lesson/getPromotingLessons', 4)
            }
        }
    },
    beforeDestroy() {
        EventBus.$off('reload-lessons', this.init)
    }
}
</script>