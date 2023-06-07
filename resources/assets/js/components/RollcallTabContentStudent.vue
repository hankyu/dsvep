<style lang="scss">
@import '../../sass/variables';

.rollcallTabContentStudent {
    margin-top: 1rem;
}
</style>


<template>
    <div class="rollcallTabContentStudent">
        <RollcallTable
            :mode="0"
            :rollcallData="rollcallData"
            v-if="loaded"
        />
        <LoadingSet v-else />
    </div>
</template>

<script>
import { rollcallMixin } from '../mixins/rollcall.js'
import LoadingSet from './LoadingSet'
import RollcallTable from './RollcallTable'

export default {
    name: 'RollcallTabContentStudent',
    mixins: [rollcallMixin],
    components: { LoadingSet, RollcallTable },
    data: function() {
        return {
            lessonRollcalls: [],
            lessonRollcallsLoadStatus: 0
        }
    },
    props: {
        units: {
            type: Array,
            default() {
                return []
            }
        },
        lid: { type: Number, required: true }
    },
    async mounted() {
        this.getLessonRollcalls()
    },
    computed: {
        loaded() {
            return this.lessonRollcallsLoadStatus == 3
        },
        rollcallData() {
            return {
                unit_data: this.lessonRollcalls,
                unit_time: this.processUnitTime(this.units)
            }
        }
    },
    methods: {
        async getLessonRollcalls() {
            this.lessonRollcallsLoadStatus = 1
            try {
                let response = await this.$store.dispatch('rollcall/getLessonRollcalls', {
                    l_id: this.lid,
                    studentMode: true
                })
                if (response.data.status == 0) {
                    this.lessonRollcalls = response.data.data
                    this.lessonRollcallsLoadStatus = 3
                } else {
                    this.lessonRollcallsLoadStatus = 2
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getLessonRollcalls',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.lessonRollcallsLoadStatus = 2
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        processUnitTime(units) {
            let unitTime = []

            units.forEach(unit => {
                unitTime.push(unit.l_start_time)
            })

            return unitTime

            /* c_id:null
c_name:null
c_video:null
c_video_length:null
c_video_situation:null
created_at:"2019-04-26 14:10:42"
description:"aaaaaa \nasbdsafsdf \ndasfdsf"
id:43
image_url:null
l_end_time:"2019-04-26 10:00:00"
l_id:19
l_start_time:"2019-04-26 00:00:00"
remark:"asdfsdf \nasdfasdf"
u_id:1
u_name:"第一章第一章第一章第一章第一章"
updated_at:"2 */

            /*  0:"2019-04-26 00:00:00"
1:"2019-04-26 11:00:00"
2:"2019-05-09 08:00:00"
3:"2019-07-05 08:00:00"
4:"2019-07-05 12:25:00"
5:"2019-07-05 14:51:00"
6:"2019-08-23 00:00:00"
7:"2020-12-01 13:00:00" */
        }
    }
}
</script>