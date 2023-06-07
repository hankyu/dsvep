<style lang="scss" scoped>
@import '../../sass/variables';

.becomeTeacher {
    padding: 2rem 4rem;
    margin: 0.5rem auto;
    background-color: $white;
    border: 1px solid $color-border-primary;

    @extend .cartShadow;

    @media (max-width: $max-w-sm) {
        padding: 1rem 2rem;
        margin: 0.5rem 0.5rem;
    }

    @media (max-width: $max-w-xs) {
        padding: 1rem 1rem;
    }
}

.becomTeacher__auditing {
    text-align: center;

    img {
        width: 200px;
        margin: 1rem auto;
    }

    .becomTeacher__auditingHeader {
        color: $complementary1;
        font-size: 1.5rem;
    }

    .becomTeacher__failArticle {
        border: 1px solid $color-border-primary;
        border-radius: 4px;
        width: 300px;
        max-width: 100%;
        margin: 1rem auto;
        padding: 1.2rem 1rem 0;
    }

    .becomTeacher__failReason {
        margin-bottom: 0;
    }

    .becomTeacher__auditingTime {
        color: $gray;
        font-size: 0.8rem;
        margin-bottom: 0;
        text-align: right;
    }
}
</style>

<template>
    <div class="webPage becomeTeacher wrapper">
        <div
            class="becomTeacher__auditing"
            v-if="auditStatus==1"
        >
            <img
                alt
                src="/img/becometeacher/auditing.svg"
            />
            <header class="becomTeacher__auditingHeader">審核中</header>
            <p>平台管理員審核中，一旦通過審核，將以平台「我的訊息」以及您的 E-mail 通知您。</p>
        </div>
        <div
            class="becomTeacher__auditing"
            v-else-if="auditStatus==2"
        >
            <img
                alt
                src="/img/becometeacher/fail.svg"
            />
            <header>申請成為講師失敗</header>
            <article class="becomTeacher__failArticle">
                <p class="becomTeacher__failReason">{{auditReason}}</p>
                <p class="becomTeacher__auditingTime">{{auditTime.replace(/-/g,'/').substr(0,16)}}</p>
            </article>
            <div class="text-center">
                <b-button
                    @click="auditAgain"
                    variant="success"
                >修改資料並再次申請</b-button>
            </div>
        </div>
        <TeacherIntroSetup
            :applyMode="true"
            :teacherDetail="teacherDetail"
            v-else-if="auditStatus==0"
        />
        <LoadingSet v-else />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import TeacherIntroSetup from '../components/TeacherIntroSetup'
import LoadingSet from '../components/LoadingSet'

export default {
    name: 'BecomeTeacher',
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.BECOME_TEACHER,
            auditStatus: -1, // -1 尚未確定 0 未送審 1 審核中 2 被拒絕
            auditReason: '',
            auditTime: '',
            teacherDetail: {}
        }
    },
    components: { TeacherIntroSetup, LoadingSet },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)

        if (this.t_id) {
            this.getTeacherDetail()
        } else {
            this.auditStatus = 0
        }

        EventBus.$on('updateTeacherDetail-completed', this.applyComplete)
        EventBus.$on('cancel-setup-teacher-intro', this.cancel)

        EventBus.$emit('do-resize')

        this.scrollTop()
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        t_id() {
            return this.$store.state.member.memberData.data.t_id
        }
    },
    methods: {
        applyComplete() {
            this.auditStatus = 1
        },
        scrollTop() {
            let body = document.documentElement || document.body
            body.scrollTop = 0
        },
        async getTeacherDetail() {
            try {
                let response = await this.$store.dispatch('teacher/getTeacherDetail', this.t_id)
                if (response.data.status == 0) {
                    if (response.data.data.auth_situation == 'review') {
                        // 審核中
                        this.auditStatus = 1
                    } else if (response.data.data.auth_situation == 'fail') {
                        // 審核失敗
                        this.auditStatus = 2
                        this.auditReason = response.data.data.audit_reason
                        this.auditTime = response.data.data.audit_time
                        this.teacherDetail = response.data.data
                    }
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getTeacherDetail',
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
        },
        auditAgain() {
            this.auditStatus = 0
        },
        cancel() {
            this.auditStatus = 2
            this.scrollTop()
        }
    },
    beforeDestroy() {
        EventBus.$off('updateTeacherDetail-completed', this.applyComplete)
        EventBus.$off('cancel-setup-teacher-intro', this.cancel)
        this.$parent.switchBodyScrollStatus(false)
    }
}
</script>