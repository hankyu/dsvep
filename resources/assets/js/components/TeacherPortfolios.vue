<style lang="scss">
@import '../../sass/variables';

.TeacherPortfoliosShow__btnBar {
    text-align: right;
    margin: 0 15px 1rem;
}
</style>

<template>
    <div class="teacherPortfolios">
        <div class="TeacherPortfoliosShow__btnBar">
            <b-button
                @click="edit"
                size="sm"
                v-if="loaded && isSelf && !editing"
                variant="info"
            >編輯作品</b-button>
        </div>
        <LoadingSet v-if="!loaded" />
        <TeacherPortfoliosSetup
            :portfoliosData="portfoliosData"
            v-else-if=" isSelf && editing"
        />
        <TeacherPortfoliosShow
            :portfoliosData="portfoliosData"
            v-else
        />
        <div
            class="noData"
            v-else
        >尚無資料</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import LoadingSet from './LoadingSet'
import TeacherPortfoliosShow from './TeacherPortfoliosShow'
import TeacherPortfoliosSetup from './TeacherPortfoliosSetup'

export default {
    name: 'TeacherPortfolios',
    components: {
        LoadingSet,
        TeacherPortfoliosShow,
        TeacherPortfoliosSetup
    },
    data: function() {
        return {
            portfoliosData: [],
            loaded: false,
            editing: false
        }
    },

    props: {},
    created() {
        EventBus.$emit('do-resize')
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        EventBus.$on('teacherDetail-ready', this.getPortfoliosData)
        if (this.teacherDetailLoadCompleted) {
            this.getPortfoliosData()
        }
    },
    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        isSelf() {
            return this.$route.params['t_id'] == this.memberTid
        },
        ...mapGetters({
            teacherDetail: 'teacher/teacherDetail',
            teacherDetailLoadCompleted: 'teacher/teacherDetailLoadCompleted',
            memberTid: 'member/memberTid'
        })
    },
    methods: {
        getPortfoliosData() {
            this.portfoliosData = []
            let portfolios = this.teacherDetail.portfolios,
                re = /\[\[(\w{3,4})\]\]/,
                tmp = portfolios ? portfolios.split(/\n|\r\n/) : []

            tmp.forEach((elm, idx) => {
                let tag = elm.match(re)[1],
                    str = elm.replace('[[' + tag + ']]', '').trim(),
                    obj

                if (idx == 0 && tag != 'TIT') {
                    obj = { title: '', links: [], imgs: [] }
                    this.portfoliosData.push(obj)
                } else if (idx) {
                    obj = this.portfoliosData[this.portfoliosData.length - 1]
                }

                switch (tag) {
                    case 'TIT':
                        obj = { title: str, links: [], imgs: [] }
                        this.portfoliosData.push(obj)
                        break
                    case 'LINK':
                        if (str.indexOf('http') != 0) {
                            str = 'http://' + str
                        }
                        obj.links.push(str)
                        break
                    case 'IMG':
                        let tmp = str.split('[[,]]')
                        obj.imgs.push(tmp)
                        break
                }
            })
            this.loaded = true
        },
        edit() {
            this.editing = true
        }
    },
    beforeDestroy() {
        EventBus.$off('teacherDetail-ready', this.getPortfoliosData)
    }
}
</script>