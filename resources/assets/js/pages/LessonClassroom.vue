<style lang="scss">
@import '../../sass/variables';
@import '../../sass/vendors/bTabs';

.lessonClassroom__loading {
    margin-top: 10vh;
}
$color-border-lessonClassroom: $color-border-primary;
$bgc-lessonClassroom: $white;

.lessonClassroom__sumary {
    border: 1px solid $color-border-lessonClassroom;
    background-color: $bgc-lessonClassroom;

    @extend .afterClearBoth;
}

.lessonClassroom__cover {
    width: 50%;
    height: 0;
    padding-bottom: 37.5%;
    background-size: cover;
    background-position: center center;
    float: left;

    @media (max-width: $max-w-xs) {
        width: 100%;
        padding-bottom: 75%;
        float: none;
    }
}

.lessonClassroom__info {
    width: 49%;
    float: right;
    padding: 3%;
    position: relative;

    @media (max-width: $max-w-xs) {
        width: 100%;
        float: none;
    }
}

$sizeX-type-folded: 5px;
$sizeY-type-folded: 3px;
.lessonClassroom__type {
    @extend .lessonTypeShadow;
    position: absolute;
    right: -$sizeX-type-folded;
    top: 4px;
    padding: 0.2rem 0.5rem;
    z-index: 20;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: $sizeX-type-folded;
        height: $sizeY-type-folded;
        bottom: -$sizeY-type-folded;
        right: 0;
        border-bottom: $sizeY-type-folded solid transparent;
        border-left: $sizeX-type-folded solid $gray;
    }
}

.lessonClassroom__area {
    margin-bottom: 0;
}

.lessonClassroom__lessonName {
    font-size: 1.4rem;
    margin-bottom: 0;
    padding-right: 1.6rem;
}

.lessonClassroom__id {
    color: $bs-primary;
    font-size: 0.7rem;
    margin-bottom: 0;
}

.lessonClassroom__teacher {
    margin-top: 1rem;
    margin-bottom: 0;
}

.lessonClassroom__startDate {
    margin-bottom: 0;
}

.lessonClassroom__labelP {
    margin-top: 1rem;
    margin-bottom: 0;

    @media (max-width: $max-w-xs) {
        text-align: center;
    }
}

.lessonShop__gmapIcon {
    width: 30px;
    height: auto;
    vertical-align: bottom;
}

.lessonClassroom__detail {
    margin-top: $mt-lessonShop;
}

.lessonClassroom__classmateList {
    margin-top: 0.5rem;
}
</style>

<template>
    <div class="webPage">
        <BreadCrumbs
            :crumbs="[{text: '首頁', link: '/'},{text: '講師所有課程', link: '/teacher/'+lessonDetail.t_id+'/lessons'},{text: getPageTitle('LESSON_SHOP'), link: '/lesson/'+lessonId},{text: '課程教室'}]"
            class="wrapper"
        />
        <LoadingSet
            class="lessonClassroom__loading"
            v-if="!lessondLoaded"
        />
        <div
            class="lessonClassroom__sumary wrapper"
            v-else
        >
            <div
                :style="coverStyle"
                class="lessonClassroom__cover"
            />
            <div class="lessonClassroom__info">
                <LessonCardType
                    :lessonType="lessonDetail.type"
                    class="lessonClassroom__type"
                />
                <P class="lessonClassroom__area">{{lessonArea}}</P>
                <h2 class="lessonClassroom__lessonName">{{ lessonDetail.l_name }}</h2>
                <p class="lessonClassroom__id">#{{ lessonDetail.l_id }}</p>
                <p class="lessonClassroom__teacher">授課講師：{{ teacherFullName }}</p>
                <p class="lessonClassroom__startDate">開課日期：{{ lessonDetail.start_time.replace(/-/g,'/') }}</p>
                <P class="lessonClassroom__labelP">
                    <LessonCardLabel
                        :lessonData="lessonDetail"
                        class="lessonClassroom__label"
                    />
                </P>
            </div>
        </div>
        <div class="lessonClassroom__detail wrapper">
            <b-tabs
                class="default-b-tabs"
                fill
                lazy
                v-show="lessondLoaded"
            >
                <!-- 課表時間 -->
                <b-tab
                    :active="hash=='chapter'"
                    :title="getTerm('LESSON_UNIT_TIME')"
                    @click="tabClick"
                    class="default-b-tab-container"
                    id="chapter"
                    key="1"
                >
                    <LessonUnitFoldableSet
                        :lessonType="lessonDetail.type"
                        :units="lessonUnit"
                        class="lessonClassroom__unitSet"
                    />
                </b-tab>

                <!-- 課堂討論 -->
                <b-tab
                    :active="hash=='qa'"
                    :title="getTerm('CLASSROOM_QA')"
                    @click="tabClick"
                    class="default-b-tab-container"
                    id="qa"
                    key="2"
                >
                    <LoadingSet
                        class="lessonClassroom__QAloading"
                        v-if="!lessonShopQALoaded"
                    />
                    <LessonQA
                        :qaData="lessonShopQA"
                        v-else
                    />
                </b-tab>

                <!-- 同學 -->
                <b-tab
                    :active="hash=='classmate'"
                    :title="getTerm('CLASSMATE')"
                    @click="tabClick"
                    class="default-b-tab-container"
                    id="classmate"
                    key="3"
                    v-if="isLessonTeacher || isWorker"
                >
                    <ClassmateList
                        :lessonType="lessonDetail.type"
                        :lid="lessonDetail.l_id"
                        class="lessonClassroom__classmateList"
                    />
                </b-tab>

                <!-- 優惠券 -->
                <!-- 器材展閹割 -->
                <!-- <b-tab
                    :active="hash=='coupon'"
                    :title="getTerm('LESSON_COUPON')"
                    @click="tabClick"
                    class="default-b-tab-container"
                    id="coupon"
                    key="4"
                    v-if="isLessonTeacher || isWorker || notFree"
                >
                    <CouponSystem :lid="lid" />
                </b-tab>-->
                <!-- 教室位置 -->
                <b-tab
                    :active="hash=='location'"
                    :title="getTerm('CLASSROOM_LOCATION')"
                    @click="tabClick"
                    class="lessonClassroom__detailContainer"
                    id="location"
                    key="5"
                    v-if="isEntityLesson"
                >
                    <p>上課地點：{{ fullLocation }}</p>
                    <GoogleMapWithKeyword
                        :location="lessonLocation"
                        :locationNote="lessonDetail.location_note"
                        v-if="lessonLocation || lessonDetail.location_note"
                    />
                </b-tab>

                <!-- 點名 -->
                <b-tab
                    :active="hash=='rollcall'"
                    :title="getTerm('ROLLCALL')"
                    @click="tabClick"
                    class="default-b-tab-container"
                    id="rollcall"
                    key="6"
                    v-if="isEntityLesson && isLogined"
                >
                    <RollcallTabContent
                        :lid="lid"
                        :units="lessonUnit"
                        v-if="isLessonTeacher || isWorker"
                    />
                    <RollcallTabContentStudent
                        :lid="lid"
                        :units="lessonUnit"
                        v-else
                    />
                </b-tab>
            </b-tabs>
        </div>
        <ModalVideo
            :chapters="activeChapters"
            :lessonId="lessonId"
            ref="modalVideo"
            v-if="lessondLoaded && !isEntityLesson"
        />
        <ModalRollcallQRcode
            ref="modalQRcode"
            v-if="lessondLoaded && isEntityLesson"
        />
        <ModalNewCouponSet ref="modalNewCouponSet" />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import BaseAvatar from '../components/global/BaseAvatar'
import LoadingSet from '../components/LoadingSet'
import LessonCardType from '../components/LessonCardType'
import LessonCardLabel from '../components/LessonCardLabel'
import LessonUnitFoldableSet from '../components/LessonUnitFoldableSet'
import LessonQA from '../components/LessonQA'
import animateScrollTo from 'animated-scroll-to'
import ModalVideo from '../components/ModalVideo'
import GoogleMapWithKeyword from '../components/GoogleMapWithKeyword'
import ClassmateList from '../components/ClassmateList'
import RollcallTabContent from '../components/RollcallTabContent'
import RollcallTabContentStudent from '../components/RollcallTabContentStudent'
import ModalRollcallQRcode from '../components/ModalRollcallQRcode'
import CouponSystem from '../components/CouponSystem'
import BreadCrumbs from '../components/BreadCrumbs'
import ModalNewCouponSet from '../components/ModalNewCouponSet'
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    name: 'LessonClassroom',

    components: {
        BaseAvatar,
        LoadingSet,
        LessonCardType,
        LessonCardLabel,
        LessonUnitFoldableSet,
        LessonQA,
        ModalVideo,
        GoogleMapWithKeyword,
        ClassmateList,
        RollcallTabContent,
        RollcallTabContentStudent,
        ModalRollcallQRcode,
        CouponSystem,
        BreadCrumbs,
        ModalNewCouponSet
    },

    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.LESSON_CLASSROOM + this.$route.params['l_id'],
            hash: ''
        }
    },

    created() {
        this.hash = location.hash
    },

    async mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        EventBus.$on('qa-send-completed', this.getQA)
        this.getQA()

        this.$store.commit('lesson/CLEAN_DATAS', 'lessonUnitDetail')

        try {
            let response = await this.$store.dispatch(
                'lesson/getLessonDetail',
                this.$route.params['l_id']
            )

            if (response.data.status == 0) {
                let snapshot = response.data.data

                snapshot.cancel_lesson =
                    snapshot.cancel_lesson_init && !snapshot.cancel_lesson
                        ? 2
                        : snapshot.cancel_lesson
                snapshot.current_fee = COMMON_UTILITY.isPast(snapshot.end_fund, true)
                    ? snapshot.origin_fee
                    : snapshot.offer_fee

                this.$store.commit('lesson/SET_DATAS', {
                    stateName: 'lessonDetail',
                    data: snapshot
                })

                this.$store.dispatch('teacher/getTeacher', snapshot.l_id)
            } else {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'getLessonDetail',
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

        try {
            let response = await this.$store.dispatch('lesson/getLessonUnitDetail', {
                l_id: this.$route.params['l_id'],
                mode: 1
            })
            if (response.data.status == 0) {
                let snapshot = response.data.data

                if (this.isOnlineLesson) {
                    let uData = [],
                        tmpUnit = [],
                        idx = 0

                    snapshot.forEach(chapter => {
                        chapter.idx = idx++
                        console.warn('器材展閹割')
                        chapter.time_watched = 0
                        if (uData.length && uData[uData.length - 1][0].u_id == chapter.u_id) {
                            uData[uData.length - 1].push(chapter)
                        } else {
                            uData.push([chapter])
                        }
                    })

                    this.$store.commit('lesson/SET_DATAS', {
                        stateName: 'lessonUnitDetail',
                        data: uData
                    })
                } else {
                    this.$store.commit('lesson/SET_DATAS', {
                        stateName: 'lessonUnitDetail',
                        data: snapshot
                    })
                }
            } else {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'getLessonUnitDetail',
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

        EventBus.$emit('do-resize')
    },

    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        lessonId() {
            return this.lid ? this.lid : ''
        },

        isLessonTeacher() {
            return this.$store.getters['member/memberTid'] == this.lessonDetail.t_id
        },
        avatarImgSrc() {
            return this.teacher.avg_img
        },
        avatarImgFullSrc() {
            return JS_CONFIG.PERSONAL_AVATAR_PATH + this.teacher.avg_img
        },
        lessonUnit() {
            return this.$store.state.lesson.lessonUnitDetail.data
        },

        activeChapters() {
            let units = this.lessonUnit,
                chapters = []

            units.forEach(unit => {
                unit.forEach(chapter => {
                    if (chapter.c_video) {
                        chapters.push(chapter)
                    }
                })
            })

            return chapters
        },
        coverStyle() {
            return `background-image:url(${JS_CONFIG.MEDIA_PATH.replace(
                'LESSON_ID',
                this.lessonDetail.l_id
            ) + this.lessonDetail.cover});`
        },
        lid() {
            return this.lessonDetail.l_id
        },

        ...mapState({
            lessonDetail: state => state.lesson.lessonDetail.data
        }),
        ...mapGetters({
            isLogined: 'member/isLoginedMember',
            lessondLoaded: 'lesson/lessonDetailLoadComplete',
            lessonShopQALoaded: 'lesson/lessonShopQALoadComplete',
            isWorker: 'member/isWorker',
            isOtherArea: 'lesson/lessonDetailIsOtherArea',
            lessonArea: 'lesson/lessonDetailArea',
            lessonLocation: 'lesson/lessonDetailLocation',
            isEntityLesson: 'lesson/lessonDetailIsEntityLesson',
            isOnlineLesson: 'lesson/lessonDetailIsOnlineLesson',
            fullLocation: 'lesson/lessonDetailFullLocation',
            notFree: 'lesson/lessonDetailNotFree',
            lessonShopQA: 'lesson/lessonShopQA',
            teacher: 'teacher/lessonShopTeacher',
            teacherLoaded: 'teacher/lessonShopTeacherLoadCompleted',
            teacherFullName: 'teacher/lessonShopTeacherFullName'
        })
    },

    methods: {
        getPageTitle(term) {
            return JS_CONFIG.TERMS.PAGE_TITLE[term]
        },
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(
                (this.$refs.modalVideo && this.$refs.modalVideo.isShow) ||
                    (this.$refs.modalQRcode && this.$refs.modalQRcode.isShow) ||
                    this.$refs.modalNewCouponSet.isShow
            )
        },

        getQA() {
            this.$store.dispatch('lesson/getLessonShopQA', {
                l_id: this.$route.params['l_id'],
                area: 'classroom'
            })
        },

        watchDeadline() {
            if (this.lessonDetail.deadline == 999) {
                return '永久觀看'
            } else {
                return this.lessonDetail.deadline + ' 個月'
            }
        },
        tabClick(evt) {
            console.warn('tabClick(evt)最後再處理')
            /* let id = evt.target.id.replace('___BV_tab_button__', '')
            location.hash = id */
        }
    },

    beforeDestroy() {
        this.$store.commit('lesson/LOAD_LESSON_DETAIL_INIT')
        this.$parent.switchBodyScrollStatus(false)
    },

    destroyed() {
        this.$store.commit('lesson/LOAD_LESSON_DETAIL_INIT')
        this.$parent.switchBodyScrollStatus(false)
        EventBus.$off('qa-send-completed', this.getQA)
    }
}
</script>
