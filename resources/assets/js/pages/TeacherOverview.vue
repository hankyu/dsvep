<style lang="scss" scoped>
@import '../../sass/variables';
.teacherOverview {
    .teacherOverview__allLoaded {
        @extend .noData;
        margin-top: 0;
    }
}
.colTeacherCard {
    text-align: center;
}

.teacherOverview__sorter {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 1rem;
    text-align: right;
    font-size: 0.9rem;
}
.teacherOverview__sorterItem {
    display: inline-block;
    margin-left: 0.25rem;

    .teacherOverview__sorterBtn {
        @include btnBgColorCustom($lightgray);
        color: $white;
        height: 1.4rem;
        line-height: 1.4rem;
        border-radius: 1.4rem;
        font-size: 0.8rem;
        padding: 0 0.7rem;
        border: none;
    }

    &.teacherOverview__sorterItem--active {
        .teacherOverview__sorterBtn {
            @include btnBgColorCustom($brand-primary);
        }
    }
}
</style>

<template>
    <div class="wrapper webPage teacherOverview">
        <h1 class="pageH1">{{ title }}</h1>

        <ul class="teacherOverview__sorter">
            <li
                :class="sorterItemClass(idx)"
                :key="idx"
                class="teacherOverview__sorterItem"
                v-for="(sorter, idx) in sorters"
            >
                <button
                    @click="switchSort(idx)"
                    class="teacherOverview__sorterBtn"
                >{{ sorter }}</button>
            </li>
        </ul>
        <b-container v-if="teachers.length">
            <b-row>
                <b-col
                    :key="teacher.t_id"
                    class="colTeacherCard"
                    cols="12"
                    lg="4"
                    sm="6"
                    v-for="teacher in teachers"
                    xl="3"
                >
                    <TeacherCard :teacherData="teacher" />
                </b-col>
            </b-row>
        </b-container>
        <LoadingSet v-if="loadStatus==1||loadStatus==2" />
        <b-nav v-b-scrollspy>
            <b-nav-item
                ref="scrollLoadSpyer"
                to="#scrollLoad"
            >&nbsp;</b-nav-item>
        </b-nav>
        <div id="scrollLoad">&nbsp;</div>
        <p
            class="teacherOverview__allLoaded"
            v-if="allLoaded"
        >已全部載入</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import TeacherCard from '../components/TeacherCard'
import LoadingSet from '../components/LoadingSet'

export default {
    components: {
        TeacherCard,
        LoadingSet
    },
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.HOT_TEACHER,
            allLoaded: false,
            sortIdx: 0,
            // sortAsc: true,
            sorters: ['熱門', '近期開課']
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
        this.getTeachers()
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: mapGetters({
        teachers: 'teacher/teachers',
        loadStatus: 'teacher/teachersLoadStatus'
    }),
    methods: {
        sorterItemClass(idx) {
            let classStr = ''

            classStr += idx == this.sortIdx ? 'teacherOverview__sorterItem--active' : ''
            return classStr
        },

        switchSort(idx) {
            if (idx != this.sortIdx) {
                this.allLoaded = false
                this.$store.commit('teacher/INIT_TEACHERS')
                this.sortIdx = idx
                this.getTeachers()
            }
        },

        async getTeachers() {
            let response = await this.$store
                .dispatch('teacher/getTeachers', {
                    startIdx: this.teachers.length,
                    mode: this.sortIdx
                })

                .then(response => {
                    if (response.data.status == 0) {
                        if (this.teachers.length) {
                            // 加載
                            this.$store.commit('teacher/PUSH_TEACHERS', response.data.data)
                        } else {
                            // 第一次
                            this.$store.commit('teacher/SET_TEACHERS', response.data.data)
                        }
                        if (response.data.data.length < JS_CONFIG.TEACHERS_PER_LOAD) {
                            // 全部 load
                            this.allLoaded = true
                        }
                    } else {
                        this.$store.commit('teacher/SET_TEACHERS_LOAD_STATUS', 2)
                        this.$store.commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getTeachers',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    this.$store.commit('teacher/SET_TEACHERS_LOAD_STATUS', 2)
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'unknown',
                        code: e,
                        isError: true
                    })
                })
        },
        onActivate(target) {
            if (!this.allLoaded && this.loadStatus == 3) {
                this.getTeachers()
            }
        }
    }
}
</script>