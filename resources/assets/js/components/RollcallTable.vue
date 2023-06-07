<style lang="scss">
@import '../../sass/variables';

.rollcallTable__container {
    overflow-x: auto;
    border-right: 1px solid $gainsboro;
    border-left: 1px solid $gainsboro;
}

.rollcallTable__table {
    border-collapse: collapse;
    font-size: 0.9rem;
    text-align: center;
    min-width: 100%;

    tr:nth-child(even) {
        background-color: #fafafa;
    }

    th,
    td {
        border: 1px solid $color-border-layout;
        padding: 0.5rem 1rem;
        white-space: nowrap;
    }

    thead {
        th {
            white-space: nowrap;
            background: $gainsboro;
        }
    }
    tbody {
        th {
            background: $gainsboro;
        }
        td {
            .rollcallTable__icon {
                @extend .faIcon;
            }
        }
        .rollcallTable__td--useless {
            color: $lightgray;
        }
        .rollcallTable__td--presence {
            color: $bs-success;
        }
        .rollcallTable__td--absence {
            color: $bs-danger;
        }
    }
}
</style>

<script>
import { rollcallMixin } from '../mixins/rollcall.js'
import { JS_CONFIG } from '../config.js'

export default {
    name: 'RollcallTable',
    mixins: [rollcallMixin],
    data: function() {
        return {}
    },
    props: {
        rollcallData: {
            type: Object,
            required: true
        },
        mode: {
            type: Number,
            required: true
        }
    },
    render: function(createElement) {
        // 個人
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
                                { attrs: { class: 'rollcallTable__td--useless' } },
                                [
                                    createElement('font-awesome-icon', {
                                        props: { icon: 'exclamation-circle' },
                                        class: 'rollcallTable__icon'
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
                                { attrs: { class: 'rollcallTable__td--presence' } },
                                [
                                    createElement('font-awesome-icon', {
                                        props: { icon: 'check-circle' },
                                        class: 'rollcallTable__icon'
                                    }),
                                    '出席'
                                ]
                            )
                        )
                        tbodyTrTd.push(
                            createElement(
                                'td',
                                { attrs: { class: 'rollcallTable__td--presence' } },
                                currUnitData.rollcall_time.replace(/-/g, '/').substr(0, 16)
                            )
                        )
                    } else if (isPassedData) {
                        tbodyTrTd.push(
                            createElement(
                                'td',
                                { attrs: { class: 'rollcallTable__td--absence' } },
                                [
                                    createElement('font-awesome-icon', {
                                        props: { icon: 'times-circle' },
                                        class: 'rollcallTable__icon'
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
                table = createElement('table', { class: 'rollcallTable__table' }, theadbody)
                tableSliderContainer = createElement('div', { class: 'rollcallTable__container' }, [
                    table
                ])
                return tableSliderContainer
            }
        }

        // 多人
        else {
        }
    },
    methods: {}
}
</script>