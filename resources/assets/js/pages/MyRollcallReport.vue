<style lang="scss" scoped>
@import '../../sass/variables';

.myRollcall__checkAllBar {
    text-align: right;
}

.myRollcall__checkAll {
    display: inline-block;
    font-size: 0.8rem;
}

.rollcallContainer {
    @media (min-width: $min-w-sm) {
        max-width: 100%;
    }
}

.colRollcallCard {
    text-align: center;
    padding-top: 15px;
    padding-bottom: 30px;
}

.myRollcall__noData {
    @extend .noData;
}
</style>

<template>
    <div class="wrapper webPage">
        <h1 class="pageH1">{{ title }}</h1>
        <RollcallAveragePresence v-if="allChecked" />
        <BaseBtnBar
            class="myRollcall__checkAllBar"
            v-else
        >
            <b-button
                @click="checkAll"
                class="myRollcall__checkAll"
                variant="success"
            >查詢全部</b-button>
        </BaseBtnBar>

        <LoadingSet
            class="myRollcall__loading"
            v-if="!loadCompleted"
        />
        <b-container
            class="rollcallContainer"
            v-else-if="myEntityLessons.length"
        >
            <b-row>
                <b-col
                    :key="lesson.l_id"
                    class="colRollcallCard"
                    cols="12"
                    lg="4"
                    sm="6"
                    v-for="lesson in myEntityLessons"
                    xl="4"
                >
                    <RollcallCard
                        :lessonData="lesson"
                        :mode="mode"
                    ></RollcallCard>
                </b-col>
            </b-row>
        </b-container>
        <div
            class="myRollcall__noData"
            v-else
        >尚無任何實體課程</div>
        <RollcallPopupTable
            :lessonTitle="lessonTitle"
            :mode="mode"
            :rollcallData="showData"
            ref="rollcallPopupTable"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from '../components/LoadingSet'
import RollcallCard from '../components/RollcallCard'
import RollcallAveragePresence from '../components/RollcallAveragePresence'
import RollcallPopupTable from '../components/RollcallPopupTable'

export default {
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.MY_ROLLCALL_REPORT,
            mid: null,
            allChecked: false,
            showTableId: null,
            mode: 0
        }
    },
    components: {
        LoadingSet,
        RollcallCard,
        RollcallAveragePresence,
        RollcallPopupTable
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        this.mid = this.$store.state.member.memberData.data.m_id
        if (!this.loadCompleted) {
            this.$store.dispatch('lesson/getMyLessons')
        }
        EventBus.$on('check-rollcall', this.checkAllDone)
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        showData() {
            return this.showTableId == null ? {} : this.myRollcallData[this.showTableId]
        },
        lessonTitle() {
            return this.showTableId == null
                ? ''
                : this.myLessonsData.find(elm => {
                      return elm.l_id == this.showTableId
                  }).l_name
        },
        ...mapGetters({
            myLessonsData: 'lesson/myLessonsData',
            myEntityLessons: 'lesson/myEntityLessons',
            loadCompleted: 'lesson/myLessonsLoadComplete',
            myRollcallData: 'rollcall/myRollcallData'
        })
    },
    methods: {
        checkAll() {
            EventBus.$emit('check-all-presenceRate')
        },
        checkAllDone() {
            this.allChecked = this.myEntityLessons.length == Object.keys(this.myRollcallData).length
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(this.$refs['rollcallPopupTable'].isShow)
        }
    },
    beforeDestroy() {
        EventBus.$off('check-rollcall', this.checkAllDone)
        this.$parent.switchBodyScrollStatus(false)
    }
}
</script>