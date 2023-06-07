<style lang="scss">
@import '../../sass/variables';

.RollcallPopupTable__header {
    @extend .popupModalHeader;
}

.RollcallPopupTable__body {
    padding: $pd-popupModal;
    font-size: 0.8rem;
}
</style>


<template>
    <BaseModal
        closeEvent="close-rollcall-report-popup-table"
        maskCloseEvent="close-rollcall-report-popup-table"
        v-if="isShow"
    >
        <h2
            class="RollcallPopupTable__header"
            slot="header"
        >{{ lessonTitle }}</h2>
        <div class="RollcallPopupTable__body">
            <RollcallTable
                :mode="mode"
                :rollcallData="rollcallData"
            />
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { rollcallMixin } from '../mixins/rollcall'
import { JS_CONFIG } from '../config'
import RollcallTable from './RollcallTable'

export default {
    name: 'RollcallPopupTable',
    mixins: [rollcallMixin],
    components: { RollcallTable },
    created() {
        EventBus.$on('show-rollcall-report-popup-table', this.showModel)
        EventBus.$on('close-rollcall-report-popup-table', this.closeModel)
    },
    data: function() {
        return {
            isShow: false
        }
    },
    props: {
        rollcallData: {
            type: Object,
            required: true
        },
        lessonTitle: {
            type: String,
            required: true
        },
        mode: {
            type: Number,
            required: true
        }
    },
    render: function(createElement) {
        if (this.mode == 0) {
            if (this.rollcallData.unit_time) {
                let unitTime = [],
                    lastDate = '',
                    keypointUids

                let theadTrThTerms = ['日期', '開課時間', '出席狀況', '點名時間'],
                    theadTrTh = [],
                    theadTr,
                    thead,
                    tbodyTrTh = [],
                    tbodyTr = [],
                    tbody,
                    theadbody,
                    table,
                    tableSliderContainer,
                    BM

                // {activeUid , passedUid}
                keypointUids = this.getKeyPointUnitId(this.rollcallData.unit_time)

                this.rollcallData.unit_time.forEach((v, k, arr) => {
                    let uDate = v.substr(0, 10),
                        uTime = v.substr(11, 8),
                        tbodyTrTd = [],
                        currUnitData

                    tbodyTrTd.push(createElement('td', uTime))
                    currUnitData = this.rollcallData.unit_data.find((vv, kk) => {
                        return vv.u_id == k + 1
                    })

                    let isUselessData = k + 1 < keypointUids.activeUid,
                        isPassedData = k < keypointUids.passedUid
                    if (isUselessData) {
                        tbodyTrTd.push(
                            createElement(
                                'td',
                                { attrs: { class: 'RollcallPopupTable__td--useless' } },
                                [
                                    createElement('font-awesome-icon', {
                                        props: { icon: 'exclamation-circle' },
                                        class: 'RollcallPopupTable__icon'
                                    }),
                                    '無效資料'
                                ]
                            )
                        )
                        tbodyTrTd.push(createElement('td', ''))
                    } else if (currUnitData) {
                        tbodyTrTd.push(
                            createElement(
                                'td',
                                { attrs: { class: 'RollcallPopupTable__td--presence' } },
                                [
                                    createElement('font-awesome-icon', {
                                        props: { icon: 'check-circle' },
                                        class: 'RollcallPopupTable__icon'
                                    }),
                                    '出席'
                                ]
                            )
                        )
                        tbodyTrTd.push(
                            createElement(
                                'td',
                                { attrs: { class: 'RollcallPopupTable__td--presence' } },
                                currUnitData.rollcall_time
                            )
                        )
                    } else if (isPassedData) {
                        tbodyTrTd.push(
                            createElement(
                                'td',
                                { attrs: { class: 'RollcallPopupTable__td--absence' } },
                                [
                                    createElement('font-awesome-icon', {
                                        props: { icon: 'times-circle' },
                                        class: 'RollcallPopupTable__icon'
                                    }),
                                    '缺席'
                                ]
                            )
                        )
                        tbodyTrTd.push(createElement('td', ''))
                    } else {
                        tbodyTrTd.push(createElement('td', ''))
                        tbodyTrTd.push(createElement('td', ''))
                    }

                    if (uDate == lastDate) {
                        tbodyTrTh[tbodyTrTh.length - 1].data.attrs.rowspan += 1
                    } else {
                        tbodyTrTh.push(createElement('th', { attrs: { rowspan: 1 } }, uDate))
                        tbodyTrTd.unshift(tbodyTrTh[tbodyTrTh.length - 1])
                    }
                    tbodyTr.push(createElement('tr', tbodyTrTd))
                    lastDate = uDate
                })

                theadTrThTerms.forEach(elm => {
                    theadTrTh.push(createElement('th', elm))
                })
                theadTr = [createElement('tr', theadTrTh)]
                thead = createElement('thead', theadTr)
                tbody = createElement('tbody', tbodyTr)
                theadbody = [thead, tbody]
                table = createElement('table', { class: 'RollcallPopupTable__table' }, theadbody)
                tableSliderContainer = createElement(
                    'div',
                    { class: 'RollcallPopupTable__container' },
                    [table]
                )
                BM = createElement(
                    'BaseModal',
                    {
                        props: {
                            closeEvent: 'close-rollcall-report-popup-table',
                            maskCloseEvent: 'close-rollcall-report-popup-table'
                        }
                    },
                    [
                        createElement(
                            'header',
                            { slot: 'header', class: 'RollcallPopupTable__header' },
                            this.lessonTitle
                        ),
                        tableSliderContainer
                    ]
                )
                if (this.isShow) {
                    return BM
                }
            }
        }
    },
    methods: {
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-rollcall-report-popup-table', this.showModel)
        EventBus.$off('close-rollcall-report-popup-table', this.closeModel)
    }
}
</script>