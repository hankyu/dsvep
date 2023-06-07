<style lang="scss">
@import '../../sass/variables';

.couponSystem__btnAdd {
    font-size: 0.8rem;
}

.couponSystem__tableContainer {
    overflow-x: auto;
    margin-top: 1rem;

    table {
        min-width: 100%;

        th,
        td {
            padding: 0.2rem 1rem;
        }

        tr {
            td {
                border-top: 1px solid $color-border-primary;

                &.couponSystem__noData {
                    @extend .noData;
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                }
            }
        }
    }

    @media (max-width: $max-w-sm) {
        table {
            display: block;
            font-size: 1rem;

            thead {
                display: none;
            }
            tbody {
                display: block;
            }
            tr {
                display: block;
                border-bottom: 1px solid $color-border-primary;
                padding-bottom: 0.5rem;
                margin-bottom: 0.5rem;

                td {
                    padding: 0;
                    display: block;
                    border-top: none;
                    &:before {
                        display: inline-block;
                        content: attr(data-title);
                        font-weight: bold;
                        margin-right: 0.5rem;
                    }

                    &.couponSystem__tdCheckbox {
                        &:before {
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
}

.couponSystem__checkbox {
    display: none;
}

$w-switcher: 2rem;
$h-switcher: 1rem;
$w-switcher-xs: 2.4rem;
$h-switcher-xs: 1.2rem;
.couponSystem__label {
    display: inline-block;
    width: $w-switcher;
    height: $h-switcher;
    border: 1px solid $color-border-layout;
    border-radius: $h-switcher / 2;
    margin-bottom: 0;
    position: relative;
    background-color: $complementary2;
    box-sizing: content-box;
    vertical-align: middle;
    cursor: pointer;

    &:after {
        position: absolute;
        content: '';
        display: block;
        width: $h-switcher - 0.2rem;
        height: $h-switcher - 0.2rem;
        left: 0.1rem;
        top: 0.1rem;
        background-color: $white;
        border-radius: ($h-switcher - 0.2rem) / 2;
        box-sizing: border-box;
        transition: left 0.2s ease-in-out;
    }

    @media (max-width: $max-w-xs) {
        width: $w-switcher-xs;
        height: $h-switcher-xs;
        border-radius: $h-switcher-xs / 2;

        &:after {
            width: $h-switcher-xs - 0.2rem;
            height: $h-switcher-xs - 0.2rem;
            border-radius: ($h-switcher-xs - 0.2rem) / 2;
        }
    }
}

.couponSystem__checkbox:checked + .couponSystem__label {
    background-color: $emphasized4;

    &:after {
        left: $w-switcher - $h-switcher + 0.1rem;
        top: 0.1rem;
    }

    @media (max-width: $max-w-xs) {
        &:after {
            left: $w-switcher-xs - $h-switcher-xs + 0.1rem;
            // left: $h-switcher-xs + 0.1rem;
        }
    }
}

.couponSystem__checkbox.couponSystem__checkbox--saving + .couponSystem__label {
    background-color: $gainsboro;
}
</style>


<template>
    <div class="couponSystem">
        <div class="text-right">
            <b-button
                @click="addCoupon"
                class="couponSystem__btnAdd"
                variant="info"
            >
                <font-awesome-icon
                    class="faIcon"
                    icon="ticket-alt"
                />新優惠券
            </b-button>
        </div>
        <div
            class="couponSystem__tableContainer"
            v-if="loaded"
        >
            <table>
                <thead>
                    <tr>
                        <th>代碼</th>
                        <th>創建人</th>
                        <th>創建日期</th>
                        <th>截止日期</th>
                        <th>{{getTerm('DISCOUNT')}}</th>
                        <th>適用對象</th>
                        <th>狀態</th>
                    </tr>
                </thead>
                <tbody v-if="true">
                    <tr
                        :key="coupon.cp_id"
                        v-for="(coupon,idx) in coupons"
                    >
                        <td data-title="優惠代碼">{{ coupon.code }}</td>
                        <td data-title="創建人員">{{ coupon.creator ? coupon.creator : '無資料' }}</td>
                        <td data-title="創建日期">{{ coupon.created_at.replace(/-/g, '/') }}</td>
                        <td data-title="截止日期">{{ coupon.expire_time.replace(/-/g, '/') }}</td>
                        <td :data-title="getTerm('DISCOUNT')">{{ coupon.price }}</td>
                        <td data-title="適用對象">{{ coupon.object=='all' ? '通用' : coupon.object }}</td>
                        <td
                            class="couponSystem__tdCheckbox"
                            data-title="優惠狀態"
                        >
                            <!-- {{ coupon.situation ? '可使用' : '已停用' }} -->
                            <input
                                :id="'couponSystemCeckbox'+idx"
                                :value="coupon.cp_id"
                                @change="changeStatus"
                                class="couponSystem__checkbox"
                                name="couponSystemCeckbox"
                                type="checkbox"
                                v-model="couponsStatus[idx]"
                            />
                            <label
                                :for="'couponSystemCeckbox'+idx"
                                class="couponSystem__label"
                            ></label>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td
                            class="couponSystem__noData"
                            colspan="7"
                        >尚未設定優惠券</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <LoadingSet v-else />
    </div>
</template>

<script>
import { EventBus } from '../event-bus.js'
import LoadingSet from './LoadingSet'
import { JS_CONFIG } from '../config'

export default {
    name: 'CouponSystem',
    components: {
        LoadingSet
    },
    data: function() {
        return {
            coupons: [],
            couponsLoadStatus: 0,
            couponsStatus: []
        }
    },
    props: {
        lid: { type: Number, required: true }
    },
    async mounted() {
        try {
            this.couponsLoadStatus = 1
            let response = await this.$store.dispatch('lesson/getLessonCoupon', this.lid)
            if (response.status == 0) {
                this.coupons = response.data
                this.coupons.forEach(c => {
                    this.couponsStatus.push(c.situation ? true : false)
                })
                this.couponsLoadStatus = 3
            } else {
                this.couponsLoadStatus = 2
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'getLessonCoupon',
                    code: response.status,
                    isError: true
                })
            }
        } catch (e) {
            this.couponsLoadStatus = 2
            console.log('CouponSystem.vue mounted() e', e)
        }
    },
    computed: {
        loaded() {
            return this.couponsLoadStatus == 3
        }
    },
    methods: {
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        addCoupon() {
            EventBus.$emit('show-coupon-adder')
        },
        async changeStatus(evt) {
            let target = evt.target,
                cp_id = target.value

            try {
                target.classList.add('couponSystem__checkbox--saving')
                let response = await this.$store.dispatch('lesson/setLessonCouponStatus', cp_id)
                if (response.status == 0) {
                    target.classList.remove('couponSystem__checkbox--saving')
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'setLessonCouponStatus',
                        code: response.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        }
    }
}
</script>