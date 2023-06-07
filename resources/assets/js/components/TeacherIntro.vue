<style lang="scss">
@import '../../sass/variables';

.teacherIntro__btnBar {
    text-align: right;
}
</style>

<template>
    <div>
        <div class="teacherIntro__btnBar">
            <b-button
                @click="edit"
                size="sm"
                v-if="loaded && isSelf && !editing"
                variant="info"
            >編輯介紹</b-button>
        </div>
        <LoadingSet v-if="!loaded" />
        <TeacherIntroSetup
            :teacherDetail="teacherDetail"
            v-else-if="isSelf && editing"
        />
        <TeacherIntroShow v-else />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import LoadingSet from './LoadingSet'
import TeacherIntroSetup from './TeacherIntroSetup'
import TeacherIntroShow from './TeacherIntroShow'

export default {
    name: 'TeacherIntro',
    components: { LoadingSet, TeacherIntroSetup, TeacherIntroShow },
    data: function() {
        return {
            editing: false
        }
    },

    props: {},
    created() {},
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        EventBus.$on('cancel-setup-teacher-intro', this.cancelSetup)
        EventBus.$on('updateTeacherDetail-completed', this.cancelSetup)

        EventBus.$emit('do-resize')
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        isSelf() {
            return this.$route.params['t_id'] == this.memberTid
        },
        teacherDetail() {
            return this.teacherDetail
        },
        ...mapGetters({
            memberTid: 'member/memberTid',
            teacherDetail: 'teacher/teacherDetail',
            loaded: 'teacher/teacherDetailLoadCompleted'
        })
    },
    methods: {
        edit() {
            this.editing = true
        },
        cancelSetup() {
            this.editing = false
        }
    },
    beforeDestroy() {
        EventBus.$off('cancel-setup-teacher-intro', this.cancelSetup)
        EventBus.$off('updateTeacherDetail-completed', this.cancelSetup)
    }
}
</script>