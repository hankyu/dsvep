<style lang="scss">
@import '../../sass/variables';
.averagePresence {
    text-align: center;

    .averagePresence__pieChart {
        display: inline-block;
        width: 250px;
        vertical-align: top;
    }
    .averagePresence__infos {
        display: inline-block;
        text-align: left;
        vertical-align: top;
        padding-top: 50px;
        padding-left: 30px;
        font-size: 0.9rem;

        .averagePresence__averageRate {
            font-size: 1.4rem;
        }
    }

    @media (max-width: $max-w-xs) {
        .averagePresence__pieChart {
            display: inline-block;
            width: 200px;
        }
        p {
            margin-bottom: 0;
        }
        .averagePresence__infos {
            display: block;
            margin: auto;
            padding-top: 0;
            padding-left: 0;
            text-align: center;
            margin-top: -20px;
        }
    }
}
</style>


<template>
    <div class="averagePresence">
        <BasePieChart
            :chartData="chartData"
            :chartOption="chartOption"
            class="averagePresence__pieChart"
        />
        <div class="averagePresence__infos">
            <p class="averagePresence__averageRate">平均出席率：{{ averagePresenceRate }}%</p>
            <p>總應出席數：{{ totalRollcallTimes }}</p>
            <p>總實際出席數：{{ totalPresenceTimes }}</p>
        </div>
    </div>
</template>

<script>
import { JS_CONFIG } from '../config.js'

export default {
    name: 'rollcallAveragePresence',
    data: function() {
        return {
            totalRollcallTimes: 0,
            totalPresenceTimes: 0,
            averagePresenceRate: 0,
            chartData: {},
            chartOption: {}
        }
    },
    props: {},
    created() {
        let myRollcall = this.$store.state.rollcall.myRollcall,
            totalRollcallTimes = 0,
            totalPresenceTimes = 0,
            averagePresenceRate

        Object.values(myRollcall).forEach(elm => {
            totalRollcallTimes += elm.rollcallTimes
            totalPresenceTimes += elm.presenceTimes
        })
        averagePresenceRate = totalRollcallTimes
            ? ((totalPresenceTimes / totalRollcallTimes) * 100).toFixed(
                  JS_CONFIG.PRESENCE_RATE_PRECISION
              )
            : 0

        this.totalRollcallTimes = totalRollcallTimes
        this.totalPresenceTimes = totalPresenceTimes
        this.averagePresenceRate = averagePresenceRate

        this.chartData = {
            datasets: [
                {
                    data: [
                        this.totalPresenceTimes,
                        this.totalRollcallTimes - this.totalPresenceTimes
                    ],
                    backgroundColor: ['#5dc0de', '#ff4b68']
                }
            ],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['出席', '缺席']
        }

        this.chartOption = {
            legend: {
                onClick: () => {},
                position: 'left'
            },
            aspectRatio: 2
        }
    }
}
</script>