<style lang="scss">
@import '../../sass/variables';

.teacherIntro__field + .teacherIntro__field {
    border-top: 1px solid $color-border-light;
    padding-top: 1rem;
}

.teacherIntro__field {
    margin-bottom: 1rem;

    .teacherIntro__itemTitle {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.25rem;
    }

    .teacherIntro__itemContent {
        font-size: 0.9rem;
        margin-bottom: 0;
    }

    .teacherIntro__itemLinkP {
        font-size: 0.8rem;
        line-height: 1;
        margin-bottom: 0;
    }
}
</style>

<template>
    <div
        class="teacherIntro"
        v-if="teacherDetail"
    >
        <!--學歷-->
        <!--自我介紹-->
        <div class="teacherIntro__field">
            <h3 class="teacherIntro__itemTitle">自我介紹</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="htmlWithLink(teacherDetail.intro_exp)"
            />
        </div>

        <!--個人經歷-->
        <div
            class="teacherIntro__field"
            v-if="teacherDetail.work_exp"
        >
            <h3 class="teacherIntro__itemTitle">個人經歷</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="htmlWithLink(teacherDetail.work_exp)"
            />
        </div>

        <!--我的著作-->
        <div
            class="teacherIntro__field"
            v-if="teacherDetail.book_exp"
        >
            <h3 class="teacherIntro__itemTitle">我的著作</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="htmlWithLink(teacherDetail.book_exp)"
            />
        </div>

        <!--證書-->
        <div
            class="teacherIntro__field"
            v-if="teacherDetail.certificate_exp"
        >
            <h3 class="teacherIntro__itemTitle">證書</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="htmlWithLink(teacherDetail.certificate_exp)"
            />
        </div>

        <!--獎項-->
        <div
            class="teacherIntro__field"
            v-if="teacherDetail.awards_exp"
        >
            <h3 class="teacherIntro__itemTitle">獎項</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="htmlWithLink(teacherDetail.awards_exp)"
            />
        </div>

        <!--報導-->
        <div
            class="teacherIntro__field"
            v-if="teacherDetail.repo_exp"
        >
            <h3 class="teacherIntro__itemTitle">報導</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="htmlWithLink(teacherDetail.repo_exp)"
            />
        </div>

        <!--公開發表-->
        <div
            class="teacherIntro__field"
            v-if="teacherDetail.pub_exp"
        >
            <h3 class="teacherIntro__itemTitle">公開發表</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="htmlWithLink(teacherDetail.pub_exp)"
            />
        </div>

        <!--教學類型-->
        <div class="teacherIntro__field">
            <h3 class="teacherIntro__itemTitle">教學類型</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="teacherDetail.teach_type.replace(/\n|\r\n/g,'<br>')"
            />
        </div>

        <!--教學經驗-->
        <div class="teacherIntro__field">
            <h3 class="teacherIntro__itemTitle">教學經驗</h3>
            <p
                class="teacherIntro__itemContent"
                v-html="teacherDetail.teach_exp.replace(/\n|\r\n/g,'<br>')"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { COMMON_UTILITY } from '../class/commonUtility.js'

export default {
    name: 'TeacherIntroShow',
    data: function() {
        return {}
    },

    props: {},
    created() {},
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        EventBus.$emit('do-resize')
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: mapGetters({
        teacherDetail: 'teacher/teacherDetail'
    }),
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        htmlWithLink(text) {
            let returnV = COMMON_UTILITY.text2htmlWithLinks(text)

            return returnV
        }
    },
    beforeDestroy() {}
}
</script>