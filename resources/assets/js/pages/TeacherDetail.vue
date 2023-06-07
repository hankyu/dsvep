<style lang="scss">
@import '../../sass/variables';
@import '../../sass/vendors/bTabs';

.teacherDetail {
    margin-top: 0.5rem;
    display: flex;

    .teacherDetail__avatarSection {
        width: 200px;
    }
    .teacherDetail__teacherName {
        font-size: 1rem;
        text-align: center;
        margin-top: 0.5rem;

        span {
            display: block;
        }
    }

    .teacherDetail__infoSection {
        flex: 1;
        margin-left: 1rem;
        overflow: hidden;
    }

    .teacherDetail__tabContainer {
        padding: 2rem 2rem;
    }

    @media (max-width: $max-w-lg) {
        display: block;

        .teacherDetail__avatarSection {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1rem;

            .baseAvatar {
                transform: scale(0.75);
                margin: -20px;
            }
        }

        .teacherDetail__teacherName {
            text-align: left;
            margin-left: 0.5rem;
        }

        .teacherDetail__infoSection {
            width: 100%;
            margin-left: 0;
        }
    }
    @media (max-width: $max-w-sm) {
        .teacherDetail__tabContainer {
            padding: 1rem 0.25rem;
        }
    }
    @media (max-width: $max-w-xs) {
        .teacherDetail__avatarSection {
            flex-direction: column;
        }
        .teacherDetail__teacherName {
            text-align: center;
            margin-left: 0;

            span {
                display: inline;
            }
        }
    }
}
</style>

<template>
    <div class="webPage">
        <BreadCrumbs
            :crumbs="[{text: '首頁', link: '/'},{text: getPageTitle('HOT_TEACHER'), link: '/teacher/overview'},{text: '導師室'}]"
            class="wrapper"
            v-if="loaded"
        />
        <LoadingSet v-else />
        <div
            class="wrapper teacherDetail"
            v-show="loaded"
        >
            <section class="teacherDetail__avatarSection">
                <BaseAvatar
                    :avatarImg="teacherDetail.avg_img"
                    :avatarWidth="200"
                />
                <h2 class="teacherDetail__teacherName">
                    <span>{{teacherDetail.nickname}}</span>
                    <span v-if="teacherDetail.m_name">({{teacherDetail.m_name}})</span>
                </h2>
            </section>
            <section class="teacherDetail__infoSection">
                <UrlParamTabs v-if="loaded">
                    <UrlParamTab>
                        <UrlParamTabLink
                            :active="routeName=='lessons'?true:false"
                            link="lessons"
                            ref="lessons"
                            text="講師課程"
                        />
                    </UrlParamTab>
                    <UrlParamTab>
                        <UrlParamTabLink
                            :active="routeName=='intro'?true:false"
                            link="intro"
                            text="講師介紹"
                        />
                    </UrlParamTab>
                    <UrlParamTab>
                        <UrlParamTabLink
                            :active="routeName=='portfolios'?true:false"
                            link="portfolios"
                            ref="portfolios"
                            text="講師作品"
                        />
                    </UrlParamTab>
                </UrlParamTabs>
                <UrlParamTabsContent />
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from '../components/LoadingSet'
import BreadCrumbs from '../components/BreadCrumbs'

import UrlParamTabs from '../components/UrlParamTabs'
import UrlParamTab from '../components/UrlParamTab'
import UrlParamTabLink from '../components/UrlParamTabLink'
import UrlParamTabsContent from '../components/UrlParamTabsContent'

export default {
    name: 'TeacherDetail',

    components: {
        LoadingSet,
        BreadCrumbs,
        UrlParamTabs,
        UrlParamTab,
        UrlParamTabLink,
        UrlParamTabsContent
    },

    data: function() {
        return {
            tabName: ''
        }
    },

    mounted() {
        EventBus.$on('updateTeacherDetail-completed', this.getTeacherDetail)
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$on('portfolios-saved', this.getTeacherDetail)

        this.getTeacherDetail()
        if (this.routeName == 'lessons') {
        }

        EventBus.$emit('do-resize')
    },

    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        routeName() {
            return this.$route.name
        },
        isSelf() {
            return this.$route.params['t_id'] == this.memberTid
        },

        ...mapGetters({
            memberTid: 'member/memberTid',
            teacherDetail: 'teacher/teacherDetail',
            loaded: 'teacher/teacherDetailLoadCompleted'
        })
    },

    methods: {
        async getTeacherDetail() {
            try {
                let response = await this.$store.dispatch(
                    'teacher/getTeacherDetail',
                    this.$route.params['t_id']
                )

                if (response.data.status == 0) {
                    this.$store.commit('teacher/SET_DETAIL', {
                        stateName: 'teacherDetail',
                        data: response.data.data
                    })
                    EventBus.$emit('teacherDetail-ready')
                } else {
                    this.$store.commit('teacher/SET_DETAIL_LOAD_STATUS', {
                        stateName: 'teacherDetail',
                        status: 2
                    })
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getTeacherDetail',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('teacher/SET_DETAIL_LOAD_STATUS', {
                    stateName: 'teacherDetail',
                    status: 2
                })
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        getPageTitle(term) {
            return JS_CONFIG.TERMS.PAGE_TITLE[term]
        },
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(this.$refs['modalBuyNotice'].isShow)
        }
    },

    beforeDestroy() {
        EventBus.$off('portfolios-saved', this.getTeacherDetail)
        EventBus.$off('updateTeacherDetail-completed', this.getTeacherDetail)
        this.$parent.switchBodyScrollStatus(false)
    }
}
</script>
