<style lang="scss" scoped>
@import '../../sass/variables';

.pageH1 {
    border-bottom: none;
}

.myOrder__card {
    margin-top: 30px;
    @media (max-width: $max-w-xs) {
        margin-top: 15px;
    }
}

.myOrder__filter {
    list-style-type: none;
    padding-left: 0;
}

$bgc-filter: $emphasized2, $emphasized3, $gray, $bs-success;
.myOrder__filterItem {
    display: inline-block;
    background-color: $gainsboro;
    color: $gray;
    padding: 0.5rem 1rem;
    min-width: 100px;
    text-align: center;

    &.myOrder__filterItem--active {
        color: $white;

        @for $i from 1 through 4 {
            &:nth-child(#{$i}) {
                background-color: nth($bgc-filter, $i);
                &:hover,
                &:active {
                    background-color: nth($bgc-filter, $i);
                }
            }
        }
    }

    @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
            &:hover,
            &:active {
                background-color: lighten(nth($bgc-filter, $i), 30%);
            }
        }
    }

    @media (max-width: $max-w-xs) {
        padding: 0.25rem 0.5rem;
        min-width: 0;
    }
}
.myOrder__filterItem + .myOrder__filterItem {
    margin-left: 5px;
}
</style>

<template>
    <div class="wrapper webPage">
        <h1 class="pageH1">{{ title }}</h1>
        <LoadingSet
            class="myOrder__loading"
            v-if="!loadCompleted"
        />
        <div v-else>
            <ul class="myOrder__filter">
                <li
                    :class="idx == filterIdx ? 'myOrder__filterItem--active' : ''"
                    :key="idx"
                    @click="switchFilter(idx)"
                    class="myOrder__filterItem"
                    v-for="(filter, idx) in filters"
                >{{ filter }}</li>
            </ul>
            <p class="color-emphasized2">※ 若訂單付款方式為超商付款或轉帳，請至 email 信箱查看詳細付款資訊的信件。</p>
            <OrderCard
                :key="order.o_id"
                :orderData="order"
                class="myOrder__card"
                v-for="order in orders"
            />
            <div
                class="noData"
                v-if="!orders.length"
            >{{noDataText}}</div>
        </div>
        <ModalConfirmCancelOrder ref="modalConfirmCancelOrder" />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from '../components/LoadingSet'
import OrderCard from '../components/OrderCard'
import { mapGetters } from 'vuex'
import ModalConfirmCancelOrder from '../components/ModalConfirmCancelOrder'

export default {
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.MY_ORDER,
            filterIdx: 0,
            // filters: ['全部', '已付款', '未付款', '已取消']
            filters: ['未付款', '已付款', '已取消', '全部']
        }
    },
    components: { OrderCard, LoadingSet, ModalConfirmCancelOrder },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body

        body.scrollTop = 0
        EventBus.$emit('do-resize')

        this.getOrders()
        EventBus.$on('cancel-order', this.cancelOrder)
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        orders() {
            switch (this.filterIdx) {
                case 3:
                    return this.ordersData
                    break
                default:
                    return this.ordersData.filter(elm => {
                        return elm.filter == this.filterIdx
                    })
                    break
            }
        },
        noDataText() {
            return '無任何' + (this.filterIdx != 3 ? this.filters[this.filterIdx] : '') + '訂單'
        },
        ...mapGetters({
            ordersData: 'order/ordersData',
            loadCompleted: 'order/ordersLoadCompleted'
        })
    },
    methods: {
        getOrders() {
            this.$store.dispatch('order/getOrders')
        },
        switchFilter(idx) {
            this.filterIdx = idx
        },
        async cancelOrder(id) {
            let response = await this.$store.dispatch('order/cancelOrder', id)

            try {
                if (response.data.status == 0) {
                    this.$store.commit('order/SET_STATUS', { name: 'cancelOrderStatus', status: 0 })
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '訂單取消成功')
                    this.getOrders()
                } else {
                    this.$store.commit('order/SET_STATUS', { name: 'cancelOrderStatus', status: 0 })
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'cancelOrder',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('order/SET_STATUS', { name: 'cancelOrderStatus', status: 0 })
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(this.$refs['modalConfirmCancelOrder'].isShow)
        }
    },
    beforeDestroy() {
        EventBus.$off('cancel-order', this.cancelOrder)
    }
}
</script>