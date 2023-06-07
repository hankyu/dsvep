<style lang="scss">
@import '../../sass/variables';
@import '../../sass/vendors/cardContainer';

.teacherLessons {
    .noData {
        margin-bottom: 30vh;
    }
}

.teacherLessons__selfBar {
    text-align: right;
    margin-top: -1rem;
}
.teacherLessons__goLessonsManage {
    font-size: 0.8rem;
    text-decoration: underline;
}

.teacherLessons__filterInput {
    margin: auto $halfGutter-card;
}

.teacherLessons__card {
    width: 100%;
    min-width: 0;
    margin: 0 auto 30px;

    @media (max-width: $max-w-xs) {
        max-width: 280px;
    }
}
</style>

<template>
    <div class="teacherLessons">
        <div
            class="teacherLessons__selfBar"
            v-if="isLogined && isSelf"
        >
            <!-- <router-link
                class="teacherLessons__goLessonsManage"
                to="/teacher/lesson/overview"
            >管理所有課程</router-link>-->
            <a
                class="teacherLessons__goLessonsManage"
                href="/teacher/lesson/overview"
            >管理所有課程</a>
        </div>
        <BaseInputTextSet
            :inputValue.sync="keyword"
            class="teacherLessons__filterInput"
            inputId="keyword"
            inputPlaceholder="過濾課程名稱"
        />
        <b-container
            class="defaultCardContainer"
            v-if="lessons.loadStatus==3 && filteredLessons.length"
        >
            <b-row>
                <b-col
                    :key="lesson.l_id"
                    cols="12"
                    lg="4"
                    sm="6"
                    v-for="lesson in filteredLessons"
                >
                    <LessonCard
                        :lessonData="lesson"
                        :managerMode="isWorker"
                        class="teacherLessons__card"
                        noTeacherAvatar
                    />
                </b-col>
            </b-row>
        </b-container>
        <LoadingSet v-else-if="lessons.loadStatus==1 || lessons.loadStatus==2" />
        <div
            class="noData"
            v-else-if="lessons.loadStatus==3 && !filteredLessons.length"
        >無課程</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import LessonCard from './LessonCard'
import LoadingSet from './LoadingSet'
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    name: 'TeacherLessons',
    components: {
        LessonCard,
        LoadingSet
    },
    data: function() {
        return {
            lessons: {
                data: [],
                loadStatus: 0
            },
            keyword: { value: '', state: null }
        }
    },

    props: {},
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        this.getLessons()
    },

    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        tid() {
            return this.$route.params.t_id
        },

        isSelf() {
            return this.memberTid == this.tid
        },

        filteredLessons() {
            let lessonsData = this.lessons.data,
                keyword = this.keyword.value

            if (keyword) {
                return lessonsData.filter(lesson => {
                    return lesson.l_name.indexOf(keyword) >= 0
                })
            } else {
                return lessonsData
            }
        },
        ...mapGetters({
            isLogined: 'member/isLoginedMember',
            memberTid: 'member/memberTid',
            isWorker: 'member/isWorker'
        })
    },
    methods: {
        async getLessons() {
            this.lessons.data = []

            try {
                this.lessons.loadStatus = 1
                let filters = { teachers: [this.tid] },
                    response

                if (this.isWorker) {
                    response = await this.$store.dispatch('lesson/getTeacherLessons', {
                        t_id: this.tid
                    })
                } else {
                    response = await this.$store.dispatch('lesson/getLessons', {
                        filters,
                        teacherLessonsMode: true
                    })
                }
                if (response.data.status == 0) {
                    this.lessons.data = response.data.data

                    if (this.isWorker) {
                        this.lessons.loadStatus = 3
                    } else {
                        // 行政以外的角色，用 getTeacherLessons 來補缺的發布課程（以前賣的）
                        let response1 = await this.$store.dispatch('lesson/getTeacherLessons', {
                            t_id: this.tid,
                            public_only: 1
                        })

                        if (response1.data.status == 0) {
                            let snapshot = response1.data.data

                            snapshot.forEach(lesson => {
                                if (lesson.cancel_lesson != 1) {
                                    // 不秀出已取消的課程
                                    let exist = this.lessons.data.some(existLesson => {
                                        return existLesson.l_id == lesson.l_id
                                    })
                                    if (!exist) {
                                        this.lessons.data.push(lesson)
                                    }
                                }
                            })
                            this.lessons.loadStatus = 3
                        } else {
                            this.lessons.loadStatus = 2
                            this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                                api: 'getTeacherLessons',
                                code: response1.data.status,
                                isError: true
                            })
                        }
                    }

                    this.lessons.data.forEach(lesson => {
                        lesson.cancel_lesson =
                            lesson.cancel_lesson_init && !lesson.cancel_lesson
                                ? 2
                                : lesson.cancel_lesson
                        lesson.current_fee = lesson.end_fund
                            ? COMMON_UTILITY.isPast(lesson.end_fund, true)
                                ? lesson.origin_fee
                                : lesson.current_fee
                            : null
                    })
                } else {
                    this.lessons.loadStatus = 2
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: this.isWorker ? 'getTeacherLessons' : getLessons,
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.lessons.loadStatus = 2
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        async deleteLesson(l_id) {
            try {
                let response = await this.$store.dispatch('lesson/deleteLesson', l_id)

                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '刪除成功')
                    this.getLessons()
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'deleteLesson',
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
        }
    }
}
</script>