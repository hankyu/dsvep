<style lang="css">
</style>

<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    name: 'BasePieChart',
    props: {
        chartData: {
            type: Object,
            required: true
        },
        chartOption: {
            type: Object,
            default: {}
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOption)
    }
}
</script>