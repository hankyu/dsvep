<style lang="scss">
@import '../../sass/variables';
@import '../../sass/vendors/datepicker';

.newCoupon__title {
    @extend .popupModalHeader;
}

.newCoupon__content {
    padding: 1rem;
    font-size: 1rem;
    width: 600px;
    max-width: 100%;

    .newCoupon__group {
        margin-bottom: 1rem;
    }

    .newCoupon__classmatesList {
        list-style-type: none;
        padding-left: 0;
        margin-bottom: 0;
    }

    .newCoupon__user {
        display: inline-block;
        padding: 0rem 0.5rem;
        background-color: $complementary2;
        border-radius: 1rem;
        margin-bottom: 0.25rem;
        margin-right: 0.25rem;
    }

    .newCoupon__radioSelectUser {
        .custom-control-label:before,
        .custom-control-label:after {
            top: 0.4rem;
        }
    }

    .form-text {
        margin-top: 0;
        font-size: 0.7rem;
    }

    .newCoupon__datepicker {
        @extend .customDatepicker;

        .vdp-datepicker__calendar {
            top: auto;
            bottom: 46px;
        }
    }

    @media (max-width: $max-w-xs) {
        padding: 0.5rem;

        .newCoupon__datepicker {
            .vdp-datepicker__calendar {
                bottom: 40px;
            }
        }
    }
}

.newCoupon__label {
    margin-bottom: 0.25rem;
}

.newCoupon__footer {
    @extend .popupModalFooter;
}

.newCoupon__footerBtn {
    @extend .popupModalFooterBtn;
}

.newCoupon__icon {
    @extend .faIcon;
}
</style>

<template>
    <div class="newCouponSet">
        <BaseModal
            class="newCoupon"
            closeEvent="close-coupon-adder"
            v-if="isShow"
        >
            <h2
                class="newCoupon__title"
                slot="header"
            >
                <font-awesome-icon
                    class="newCoupon__icon"
                    icon="ticket-alt"
                />
                新優惠券{{targetClassmates.length? 'B': 'A'}}
            </h2>
            <div class="newCoupon__content">
                <b-form-group
                    class="newCoupon__group"
                    v-if="targetClassmates.length"
                >
                    <label class="newCoupon__label">優惠對象：</label>
                    <ul class="newCoupon__classmatesList">
                        <li
                            :key="targetClassmate.m_id"
                            class="newCoupon__user"
                            v-for="targetClassmate in targetClassmates"
                        >{{targetClassmate.nickname+(targetClassmate.m_name?' ('+targetClassmate.m_name+')':'')}}</li>
                    </ul>
                </b-form-group>
                <InputTextSetInteger
                    :inputValidated="true"
                    :inputValue.sync="lessonId"
                    :trim="true"
                    class="newCoupon__group"
                    inputId="lessonId"
                    inputInvalidFeedback="進階課程編號應為數字"
                    inputLabel="進階課程編號"
                    inputPlaceholder="輸入進階課程編號"
                    v-if="targetClassmates.length"
                />
                <div
                    class="newCoupon__group"
                    v-else
                >
                    <b-form-group label="優惠對象：">
                        <b-form-radio
                            @click.native="switchToAll"
                            name="user"
                            v-model="userScopeSelected"
                            value="all"
                        >會員通用</b-form-radio>
                        <b-form-radio
                            class="newCoupon__radioSelectUser"
                            name="user"
                            v-model="userScopeSelected"
                            value="one"
                        >
                            <b-button
                                @click="selectUser"
                                size="sm"
                                variant="outline-primary"
                            >單一會員</b-button>
                            <span
                                class="newCoupon__user"
                                v-if="memberSelected.m_id"
                            >{{memberSelected.nickname+(memberSelected.m_name?' ('+memberSelected.m_name+')':'')}}</span>
                        </b-form-radio>
                    </b-form-group>
                </div>
                <InputTextSetInteger
                    :inputValidated="true"
                    :inputValue.sync="discount"
                    :trim="true"
                    class="newCoupon__group"
                    inputId="discount"
                    inputInvalidFeedback="折扣金額應為數字"
                    inputLabel="折扣金額"
                    inputPlaceholder="輸入折扣價格"
                />

                <b-form-group class="newCoupon__group">
                    <label
                        class="newCoupon__label"
                        for="input-live"
                    >截止日期：</label>
                    <Datepicker
                        :disabled-dates="state.disabledDates"
                        :language="zh"
                        bootstrap-styling
                        class="newCoupon__datepicker"
                        format="yyyy/MM/dd"
                        required
                        v-model="expire"
                    ></Datepicker>
                </b-form-group>
            </div>
            <div
                class="newCoupon__footer"
                slot="footer"
            >
                <b-button
                    :disabled="btnDisabled"
                    @click="newCoupon"
                    class="newCoupon__footerBtn"
                    variant="success"
                >{{ getTerm('CONFIRM') }}</b-button>
            </div>
        </BaseModal>
        <ModalMemberSelector :memberSelected.sync="memberSelected" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
import ModalMemberSelector from './ModalMemberSelector'
import InputTextSetInteger from './InputTextSetInteger'

export default {
    name: 'ModalNewCouponSet',
    components: { Datepicker, ModalMemberSelector, InputTextSetInteger },
    created() {},
    data: function() {
        return {
            isShow: false,
            targetClassmates: [],
            // discount: 0,
            // discountState: null,
            discount: { value: '', state: null },
            expire: '',
            zh: zh,
            state: { disabledDates: {} },
            lessonId: { value: '', state: null },
            memberSelected: {},
            userScopeSelected: 'one'
        }
    },
    props: {},
    mounted() {
        EventBus.$on('show-coupon-adder', this.showModel)
        EventBus.$on('close-coupon-adder', this.closeModel)
    },
    computed: {
        btnDisabled() {
            let userBool, lessonBool

            if (this.targetClassmates.length) {
                // 同學 Tab: 進階課程優惠券，直接帶入同學
                userBool = true
                lessonBool = this.lessonId.state
            } else {
                // 優惠券 Tab: 新增優惠券
                userBool = this.memberSelected.m_id || this.userScopeSelected == 'all'
                lessonBool = true
            }
            return !(userBool && lessonBool && this.expire && this.discount.state)
        },
        ...mapGetters({
            lessonDetail: 'lesson/lessonDetail'
        })
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        getExpireTime() {
            let nowTimestamp = new Date().getTime()

            this.expire = new Date(nowTimestamp + 86400000 * JS_CONFIG.EXPIRE_TIME)
        },
        setDisabledDates() {
            let nowTimestamp = new Date().getTime(),
                yesterday = new Date(nowTimestamp - 86400000)

            this.state = {
                disabledDates: {
                    to: new Date(
                        yesterday.getFullYear(),
                        yesterday.getMonth(),
                        yesterday.getDate(),
                        1
                    )
                }
            }
        },
        showModel(classmates) {
            this.targetClassmates = classmates ? classmates : []
            this.memberSelected = {}
            this.userScopeSelected = 'all'
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            this.getExpireTime()
            this.setDisabledDates()
        },
        closeModel() {
            this.isShow = false
            this.discount = { value: '', state: null }
            this.expire = ''
            this.$parent.checkBodyScrollStatus()
        },
        switchToAll() {
            this.memberSelected = {}
        },
        selectUser() {
            this.userScopeSelected = 'one'
            EventBus.$emit('show-member-selector')
        },
        newCoupon() {
            if (this.btnDisabled) {
                return
            }

            let memberArr = [],
                lid

            if (this.targetClassmates.length) {
                // 同學 Tab: 進階課程優惠券，直接帶入同學
                memberArr = this.targetClassmates.map(elm => {
                    return elm.email
                })
                lid = this.lessonId.value
            } else {
                // 優惠券 Tab: 新增優惠券
                if (this.userScopeSelected == 'all') {
                    memberArr.push('all')
                } else {
                    memberArr.push(this.memberSelected.email)
                }
                lid = this.lessonDetail.l_id
            }
            let expire_time =
                    this.expire.getFullYear() +
                    '-' +
                    (this.expire.getMonth() + 1) +
                    '-' +
                    this.expire.getDate(),
                postData = {
                    lid,
                    object: memberArr,
                    expire_time,
                    price: this.discount.value * 1
                }

            this.$store
                .dispatch('lesson/postLessonCoupon', postData)
                .then(response => {
                    if (response.status == 0) {
                        this.$store.commit('alert/SHOW_COMPLETE_ALERT', '新增優惠券完成')
                        this.closeModel()
                    } else {
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'postLessonCoupon',
                            code: response.status,
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
        },
        checkBodyScrollStatus() {}
    },
    beforeDestroy() {
        EventBus.$off('show-coupon-adder', this.showModel)
        EventBus.$off('close-coupon-adder', this.closeModel)
    }
}
</script>