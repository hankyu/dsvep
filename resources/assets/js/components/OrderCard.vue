<style lang="scss" scoped>
@import '../../sass/variables';

.orderCard {
    padding: 0.5rem 0 0.5rem 0.5rem;
    width: 100%;
    display: flex;
    @media (max-width: $max-w-xs) {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        display: block;
    }
}

.orderCard__lessonCover {
    width: 30%;
    @media (max-width: $max-w-md) {
        width: 37.5%;
    }
    @media (max-width: $max-w-sm) {
        display: none;
    }
}

.orderCard__lessonCoverImg {
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    @extend .bgSizeCover;
}

$pdlr-orderCardInfo: 30px;
$pdlr-orderCardInfo-md: 20px;
$translate-y-orderCardStatus: 10px;
$translate-x-orderCardStatus: 5px;
.orderCard__infoContainer {
    flex: 1;
    padding-left: $pdlr-orderCardInfo;
    padding-right: $pdlr-orderCardInfo - $translate-x-orderCardStatus;
    min-width: 0;
    @media (max-width: $max-w-md) {
        padding-left: $pdlr-orderCardInfo-md;
        padding-right: $pdlr-orderCardInfo-md - $translate-x-orderCardStatus;
    }
    @media (max-width: $max-w-xs) {
        padding-left: 0;
        padding-right: 0;
    }
}

.orderCard__linkHeader {
    color: $font-primary;
    text-decoration: none;

    &:hover,
    &:active {
        text-decoration: underline;
    }
}

.orderCard__header {
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.25;
    border-bottom: 1px solid $color-border-primary;
    padding-bottom: 0.25rem;
    padding-top: 0.25rem;
}

.orderCard__LessonId {
    color: $bs-primary;
}

.orderCard__table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0.5rem 0;
    margin-top: 0.25rem;
    color: $darkgray;
    th,
    td {
        font-size: 1rem;
    }

    th {
        width: 1%;
        white-space: nowrap;
        text-align: right;
    }

    td {
        text-align: left;
    }

    @media (max-width: $max-w-xs) {
        th,
        td {
            font-size: 0.9rem;
        }
    }
}

.orderCard__func {
    width: 100px;

    @media (max-width: $max-w-xs) {
        width: auto;
        margin-top: 5px;
        margin-right: -10px;

        &:after {
            content: '';
            display: block;
            height: 0;
            clear: both;
        }
    }
}

.orderCard__status {
    display: inline-block;
    width: 100%;
    background-color: $brand-primary;
    text-align: center;
    color: $white;
    padding: 0.5rem;
    position: relative;
    top: $translate-y-orderCardStatus;
    left: $translate-x-orderCardStatus;
    z-index: 10;

    &:before {
        content: '';
        display: inline-block;
        width: $translate-x-orderCardStatus;
        border-top: none;
        border-right: none;
        border-left: $translate-x-orderCardStatus solid $gray;
        border-bottom: $translate-x-orderCardStatus solid transparent;
        z-index: 11;
        position: absolute;
        right: 0;
        bottom: -$translate-x-orderCardStatus;
    }

    &.orderCard__status--payed {
        background-color: $emphasized3;
    }

    &.orderCard__status--paying {
        background-color: $emphasized2;
    }

    &.orderCard__status--canceled {
        background-color: $gray;
    }

    @media (max-width: $max-w-xs) {
        position: static;
        display: inline-block;
        width: 100px;
        padding: 0.3rem;
        line-height: 1;
        float: right;

        &:before {
            content: '';
            display: none;
        }
    }
}

$translate-y-orderCardBtnCancel: $translate-y-orderCardStatus + 10px;
.orderCard__btnCancel {
    position: relative;
    top: $translate-y-orderCardBtnCancel;
    left: $translate-x-orderCardStatus;
    font-size: 0.8rem;
    width: 100%;
    border: none;
    background-color: transparent;
    text-decoration: underline;
    color: $emphasized2;

    &:hover,
    &:active {
        color: darken($emphasized2, 10%);
    }

    @media (max-width: $max-w-xs) {
        position: static;
        width: auto;
        float: right;
        margin-top: 0px;
        margin-right: 15px;
        font-size: 0.9rem;
    }
}
.orderCard__btnBuyAgain {
    position: relative;
    top: 80px;
    left: 0;
    font-size: 0.9rem;
    width: 100%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    @media (max-width: $max-w-xs) {
        position: static;
        width: auto;
        float: right;
        margin-top: 0px;
        margin-right: 15px;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
}

.orderCard__faIcon {
    @extend .faIcon;
}
</style>


<template>
    <BaseCard class="orderCard">
        <div class="orderCard__lessonCover">
            <div
                :style="lessonCoverStyle"
                class="orderCard__lessonCoverImg"
            ></div>
        </div>
        <div class="orderCard__infoContainer">
            <header class="orderCard__header">
                <router-link
                    :to="orderData.filter==1?'/profile/lesson/classroom/' + orderData.l_id:'/lesson/' + orderData.l_id"
                    class="orderCard__linkHeader"
                    target="_blank"
                >
                    <font-awesome-icon icon="book" />
                    {{orderData.l_name}}
                    <small class="orderCard__LessonId">#{{orderData.l_id}}</small>
                </router-link>
            </header>
            <table class="orderCard__table">
                <tr>
                    <th>訂單編號：</th>
                    <td>{{orderData.o_id}}</td>
                </tr>
                <tr>
                    <th>訂單金額：</th>
                    <td>NT$ {{orderData.price}}</td>
                </tr>
                <tr>
                    <th>付款方式：</th>
                    <td>
                        <font-awesome-icon
                            :icon="['far', 'credit-card']"
                            class="orderCard__faIcon"
                            v-if="orderData.payment=='CREDIT'"
                        />
                        <template v-if="orderData.payment">{{ payment }}</template>
                        <span
                            class="color-bs-danger"
                            v-else-if="orderData.filter==0"
                        >無付款方式，請取消此訂單或重新購買</span>
                        <template v-else>無付款方式</template>
                    </td>
                </tr>
                <tr>
                    <th>下單時間：</th>
                    <td>{{orderData.order_time.replace(/-/g, '/')}}</td>
                </tr>
                <tr v-if="orderData.checkout_time">
                    <th>付款時間：</th>
                    <td
                        class="color-emphasized3"
                    >{{orderData.checkout_time?orderData.checkout_time.replace(/-/g, '/'):''}}</td>
                </tr>
                <tr v-else-if="orderData.delete_time">
                    <th>取消時間：</th>
                    <td class="color-emphasized2">{{orderData.delete_time?orderData.delete_time.replace(/-/g, '/'):''}}</td>
                </tr>

                <tr v-else>
                    <th>付款期限：</th>
                    <td class="color-emphasized3">{{orderData.expire_time?orderData.expire_time.replace(/-/g, '/'):''}}</td>
                </tr>
            </table>
        </div>
        <div class="orderCard__func">
            <span
                :class="statusClass"
                class="orderCard__status"
            >{{cardStatus}}</span>
            <button
                @click="confirmCancelOrder"
                class="orderCard__btnCancel"
                v-if="!orderData.checkout_time && !orderData.delete_time"
            >取消訂單</button>
            <button
                @click="buyAgain"
                class="orderCard__btnBuyAgain btn-info"
                v-if="orderData.delete_time || !orderData.payment"
            >重新購買</button>
        </div>
    </BaseCard>
</template>

<script>
import { JS_CONFIG } from '../config.js' // JS_CONFIG.MEDIA_PATH
import { EventBus } from '../event-bus'

export default {
    name: 'OrderCard',
    props: {
        orderData: {
            type: Object,
            required: true
        }
    },
    mounted() {},
    computed: {
        lessonCoverStyle() {
            return `background-image: url(${JS_CONFIG.MEDIA_PATH.replace(
                'LESSON_ID',
                this.orderData.l_id
            ) + this.orderData.cover});`
        },
        cardStatus() {
            switch (this.orderData.filter) {
                case 0:
                    return '未付款'
                case 1:
                    return '已付款'
                case 2:
                    return '已取消'
            }
        },
        statusClass() {
            let desc

            switch (this.orderData.filter) {
                case 1:
                    desc = 'payed'
                    break
                case 0:
                    desc = 'paying'
                    break
                case 2:
                    desc = 'canceled'
                    break
            }
            return 'orderCard__status--' + desc
        },
        payment() {
            let payments = {
                FREE: '免費',
                CREDIT: '信用卡',
                CASH: '現金',
                VACC: 'ATM',
                CVS: '超商付款'
            }

            return payments[this.orderData.payment]
        }
    },
    methods: {
        confirmCancelOrder() {
            if (this.orderData.payment) {
                EventBus.$emit('show-confirm-cancel-order', {
                    id: this.orderData.id,
                    oid: this.orderData.o_id,
                    lname: this.orderData.l_name,
                    lid: this.orderData.l_id
                })
            } else {
                EventBus.$emit('cancel-order')
            }
        },
        buyAgain() {
            this.$store
                .dispatch('order/cancelLessonExistedOrder', this.orderData.l_id)
                .then(response => {
                    if (response.data.status == 0) {
                        console.warn('器材展閹割')
                        // this.$router.push('/cart/' + this.orderData.l_id)
                        document.location.href = '/cart/' + this.orderData.l_id
                    } else {
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'cancelLessonExistedOrder',
                            code: response.data.status,
                            isError: true
                        })
                    }
                })
                .catch(e => {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'unknown',
                        code: e,
                        isError: true
                    })
                })
        }
    }
}
</script>