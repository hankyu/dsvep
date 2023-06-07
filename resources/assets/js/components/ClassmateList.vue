<style lang="scss" scoped>
@import '../../sass/variables';

.classmateList {
    .classmateList__classmateInfo {
        font-size: 0.8rem;
        text-align: right;
        margin-bottom: 0;
    }

    .classmateList__container {
        width: 100%;
        overflow-x: auto;
    }

    .classmateList__table {
        min-width: 100%;
        border-collapse: collapse;
        box-sizing: border-box;
        font-size: 0.8rem;

        th,
        td {
            border: 1px solid $color-border-primary;
            padding: 0.25rem;
        }
    }

    .classmateList__noData {
        @extend .noData;
    }

    .classmateList__couponBtnBar {
        text-align: right;
        padding: 0.5rem 0;
    }
}
</style>


<template>
    <div class="classmateList">
        <p
            class="classmateList__classmateInfo"
            v-if="lessonClassmatesLoaded && lessonType=='online'"
        >課程人次：{{personTimes}}</p>
        <p
            class="classmateList__classmateInfo"
            v-if="lessonClassmatesLoaded"
        >課程人數：{{lessonClassmates.length}}</p>
        <LoadingSet v-if="!lessonClassmatesLoaded" />
        <div
            class="classmateList__container"
            v-else-if="lessonClassmates.length"
        >
            <table class="classmateList__table">
                <thead>
                    <tr>
                        <th>購買人</th>
                        <th>手機</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="classmate in lessonClassmates">
                        <td>{{classmate.nickname+(classmate.m_name?' ('+classmate.m_name+')':'')}}</td>
                        <td>{{classmate.cellphone}}</td>
                        <td>{{classmate.email}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div
            class="classmateList__noData"
            v-else
        >尚無購買人</div>
        <!-- <div
            class="classmateList__couponBtnBar"
            v-if="lessonClassmatesLoaded && lessonClassmates.length"
        >
            <b-button
                @click="newCoupon"
                variant="info"
            >
                <font-awesome-icon
                    class="faIcon"
                    icon="ticket-alt"
                />進階課程優惠券
            </b-button>
        </div>-->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config.js' // JS_CONFIG.MEDIA_PATH
import LoadingSet from './LoadingSet'

export default {
    name: 'ClassmateList',
    components: {
        LoadingSet
    },
    props: {
        lid: {
            type: Number,
            required: true
        },
        lessonType: {
            type: String,
            required: true
        }
    },
    async mounted() {
        try {
            let response = await this.$store.dispatch('lesson/getLessonClassmates', this.lid)

            if (response.data.status == 0) {
                this.$store.commit('lesson/SET_DATAS', {
                    stateName: 'lessonClassmates',
                    data: response.data.data
                })
            } else {
                this.$store.commit('lesson/DATAS_STATUS', {
                    stateName: 'lessonClassmates',
                    status: 2
                })
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'getLessonClassmates',
                    code: response.data.status,
                    isError: true
                })
            }
        } catch (e) {
            this.$store.commit('lesson/DATAS_STATUS', {
                stateName: 'lessonClassmates',
                status: 2
            })
            this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                api: 'unknown',
                code: e,
                isError: true
            })
        }
    },
    computed: {
        personTimes() {
            return this.lessonClassmates.reduce(
                (accumulator, elm) => accumulator + elm.buy_times * 1,
                0
            )
        },
        ...mapGetters({
            lessonClassmates: 'lesson/lessonClassmates',
            lessonClassmatesLoaded: 'lesson/lessonClassmatesLoadCompleted'
        })
    },
    methods: {
        newCoupon() {
            EventBus.$emit('show-coupon-adder', this.lessonClassmates)
        }
    }
}
</script>