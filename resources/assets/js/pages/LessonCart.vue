<style lang="scss">
@import '../../sass/variables';

.lessonCart__loading {
    margin-top: 10vh;
}
$color-border-lessonClassroom: $color-border-primary;
$bgc-lessonClassroom: $white;

.lessonCart__sumary {
    // margin-top: $mt-lessonShop;
    border: 1px solid $color-border-lessonClassroom;
    background-color: $bgc-lessonClassroom;

    @extend .afterClearBoth;
}

.lessonCart__cover {
    width: 50%;
    height: 0;
    padding-bottom: 37.5%;
    background-size: cover;
    background-position: center center;
    float: left;

    @media (max-width: $max-w-xs) {
        width: 100%;
        padding-bottom: 75%;
        float: none;
    }
}

.lessonCart__info {
    width: 49%;
    float: right;
    padding: 3%;
    position: relative;

    @media (max-width: $max-w-xs) {
        width: 100%;
        float: none;
    }
}

$sizeX-type-folded: 5px;
$sizeY-type-folded: 3px;
.lessonCart__type {
    @extend .lessonTypeShadow;
    position: absolute;
    right: -$sizeX-type-folded;
    top: 4px;
    padding: 0.2rem 0.5rem;
    z-index: 20;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: $sizeX-type-folded;
        height: $sizeY-type-folded;
        bottom: -$sizeY-type-folded;
        right: 0;
        border-bottom: $sizeY-type-folded solid transparent;
        border-left: $sizeX-type-folded solid $gray;
    }
}

.lessonCart__area {
    margin-bottom: 0;
}

.lessonCart__lessonName {
    font-size: 1.4rem;
    margin-bottom: 0;
}

.lessonCart__id {
    color: $bs-primary;
    font-size: 0.7rem;
    margin-bottom: 0;
}

.lessonCart__teacher {
    margin-top: 1rem;
    margin-bottom: 0;
}

.lessonCart__startDate {
    margin-bottom: 0;
}

.lessonCart__price {
    margin-top: 1.5rem;
}

.lessonCart__currFee {
    color: $emphasized2;
    font-size: 1.5rem;
    line-height: 1.25;
    font-weight: 900;

    &::before {
        content: 'NT$';
        display: inline;
    }

    @media (max-width: $max-w-xs) {
        font-size: 1.2rem;
    }
    &.lessonCart__currFee--free {
        &:before {
            content: '';
            display: none;
            margin-right: 0;
        }
    }
}

.lessonCart__originFee {
    display: block;
    color: $gray;
    font-size: 0.7rem;
    text-decoration: line-through;
}

.lessonCart__labelP {
    margin-top: 1rem;
    margin-bottom: 0;

    @media (max-width: $max-w-xs) {
        text-align: center;
    }
}

.lessonCart__detail {
    margin-top: $mt-lessonShop;
}

.nav-tabs .nav-link {
    background-color: $gainsboro;
    border: 1px solid $color-border-primary;
    color: $lightgray;

    &:hover,
    &:active {
        background-color: darken($gainsboro, 5%);
        border: 1px solid $color-border-primary;
    }

    &.active {
        border: 1px solid $color-border-primary;
        border-bottom: 1px solid $white;
        color: $font-primary;

        &:hover,
        &:active {
            border-bottom: 1px solid $white;
            background-color: $white;
        }
    }
}

.lessonCart__detailContainer {
    border: 1px solid $color-border-primary;
    border-top: none;
    background-color: $bgc-lessonClassroom;
    padding: 1rem;
}

.lessonCart__classmateInfo {
    font-size: 0.8rem;
    text-align: right;
    margin-bottom: 0;
}

.lessonCart__classmateList {
    margin-top: 0.5rem;
}

.lessonCart__buyer {
    margin-top: 0.5rem;
    border: 1px solid $color-border-primary;
    background-color: $white;

    .container-fluid {
        padding: 2rem;
    }

    .col,
    .col-md-6,
    .col-12 {
        margin-bottom: 0.5rem;
    }
    .form-group {
        margin-bottom: 0;
    }

    @media (max-width: $max-w-md) {
        .container-fluid {
            padding: 1rem;
        }
    }
    @media (max-width: $max-w-xs) {
        .container-fluid {
            padding: 0.5rem;
        }
    }
}

.lessonCart__buyerSectionHeader {
    font-size: 1.2rem;
    position: relative;
    padding: 0.5rem 1rem;
}

.lessonCart__buyerPhone {
    line-height: 2.3rem;
    margin-bottom: 0;
}

.lessonCart__verified {
    font-size: 0.8rem;
    color: $bs-success;
}

.lessonCart__inputCouponCol {
    padding-top: 0.5rem;
}

.lessonCart__couponSet {
    font-size: 0;
    line-height: 0;
}

.lessonCart__inputCoupon {
    display: inline-block;
    width: 5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.lessonCart__btnCoupon {
    vertical-align: top;
    font-size: 1rem;
    line-height: 1.5;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

.lessonCart__loadingCoupon {
    transform: translateY(6px);
    height: auto;
    min-height: 0;
    display: inline-block;
    margin-left: 0.25rem;
}

.lessonCart__iconCouponChecked {
    font-size: 0.8rem;
    margin-left: 0.25rem;
}
.lessonCart__iconCouponChecked-complete {
    color: $bs-success;
}
.lessonCart__iconCouponChecked-fail {
    color: $bs-danger;
}

.lessonCart__notications {
    margin-top: 0.5rem;

    ul {
        list-style-type: disc;
    }
}

.lessonCart__amount {
    border-top: 1px solid $color-border-primary;
    padding: 1rem;
    text-align: right;

    .lessonCart__amountSpn {
        color: $gray;
        margin-right: 2rem;
    }
    .lessonCart__amountSpn--sum {
        font-size: 1.2rem;
        color: $font-primary;
        white-space: nowrap;
    }
    @media (max-width: $max-w-sm) {
        .lessonCart__amountSpn {
            color: $gray;
            margin-right: 1rem;
        }
        .lessonCart__amountSpn--sum {
            font-size: 1rem;
            color: $font-primary;
            white-space: nowrap;
        }
    }

    @media (max-width: $max-w-xs) {
        .lessonCart__amountSpn {
            display: block;
            text-align: center;
            margin-right: 0;
        }
        .lessonCart__amountSpn--sum {
            margin-bottom: 0.5rem;
        }
        .lessonCart__btnBuy {
            width: 100%;
        }
    }
}
</style>

<template>
    <div class="webPage">
        <BreadCrumbs
            :crumbs="[{text: '首頁', link: '/'},{text: '講師所有課程', link: '/teacher/'+lessonDetail.t_id+'#lesson'},{text: getPageTitle('LESSON_SHOP'), link: '/lesson/'+lessonId},{text: '課程購買'}]"
            class="wrapper"
            v-if="lessondLoaded"
        />
        <LoadingSet
            class="lessonCart__loading"
            v-if="!lessondLoaded"
        />
        <div
            class="lessonCart__sumary wrapper"
            v-else
        >
            <div
                :style="coverStyle"
                class="lessonCart__cover"
            />
            <div class="lessonCart__info">
                <LessonCardType
                    :lessonType="lessonDetail.type"
                    class="lessonCart__type"
                />
                <P class="lessonCart__area">{{lessonDetail.area}}</P>
                <h2 class="lessonCart__lessonName">{{ lessonDetail.l_name }}</h2>
                <p class="lessonCart__id">#{{ lessonDetail.l_id }}</p>
                <p class="lessonCart__teacher">授課講師：{{ teacherFullName }}</p>
                <p class="lessonCart__startDate">開課日期：{{ lessonDetail.start_time.replace(/-/g,'/') }}</p>

                <p class="lessonCart__price">
                    <del
                        class="lessonCart__originFee"
                        v-if="hasOriginFee"
                    >NT$ {{ lessonDetail.origin_fee }}</del>
                    <span
                        class="lessonCart__currFee"
                        v-if="lessonDetail.current_fee"
                    >{{ lessonDetail.current_fee }}</span>
                    <span
                        class="lessonCart__currFee lessonCart__currFee--free"
                        v-else
                    >免費</span>
                </p>
                <P class="lessonCart__labelP">
                    <LessonCardLabel
                        :lessonData="lessonDetail"
                        class="lessonCart__label"
                    />
                </P>
            </div>
        </div>
        <div
            class="lessonCart__buyer wrapper"
            v-if="lessondLoaded"
        >
            <header class="lessonCart__buyerSectionHeader">購買人資料</header>
            <b-container fluid>
                <b-row>
                    <b-col
                        cols="12"
                        sm="6"
                    >
                        <BaseInputTextSet
                            :initValidate="true"
                            :inputValidated="true"
                            :inputValue.sync="buyerName"
                            inputId="buyerName"
                            inputInvalidFeedback="買受人姓名必填。"
                            inputLabel="買受人姓名"
                            v-if="memberLoaded"
                        />
                    </b-col>
                    <b-col
                        cols="12"
                        sm="6"
                    >
                        <div
                            class="baseInputTextSet"
                            role="group"
                        >
                            <label
                                class="baseInputTextSet__label"
                                for="buyerPhone"
                            >買受人手機:</label>
                            <p
                                class="lessonCart__buyerPhone"
                                v-if="memberLoaded"
                            >
                                {{memberPhone}}
                                <span
                                    class="lessonCart__verified"
                                    v-if="cellphoneVerifyStatus"
                                >
                                    <font-awesome-icon icon="check-circle" />已驗證
                                </span>
                            </p>
                        </div>
                    </b-col>
                    <b-col cols="12">
                        <InputTextSetEmail
                            :initValidate="true"
                            :inputValidated="true"
                            :inputValue.sync="buyerEmail"
                            inputId="buyerEmail"
                            inputInvalidFeedback="Email 格式不正確。"
                            inputLabel="買受人 Email"
                            inputPlaceholder
                            v-if="memberLoaded"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="選擇發票：">
                            <b-form-radio-group
                                :options="receiptOptions"
                                button-variant="outline-primary"
                                buttons
                                id="receipt"
                                name="radio-btn-outline"
                                size="md"
                                v-model="receiptSelected"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- 手機條碼 -->
                <b-row
                    key="mobile_barcode"
                    v-if="receiptSelected=='mobile_barcode'"
                >
                    <b-col
                        cols="12"
                        sm="6"
                    >
                        <InputTextSetMobileBarCode
                            :inputValidated="true"
                            :inputValue.sync="mobileBarcode"
                            :trim="true"
                            inputId="mobileBarcode"
                            inputLabel="手機條碼"
                            v-if="memberLoaded"
                        />
                    </b-col>
                </b-row>

                <!-- 自然人憑證 -->
                <b-row
                    key="moica_barcode"
                    v-else-if="receiptSelected=='moica_barcode'"
                >
                    <b-col
                        cols="12"
                        sm="6"
                    >
                        <InputTextSetMoicaCode
                            :inputValidated="true"
                            :inputValue.sync="moicaBarcode"
                            :trim="true"
                            inputId="moicaBarcode"
                            inputLabel="輸入自然人憑證"
                            v-if="memberLoaded"
                        />
                    </b-col>
                </b-row>

                <!-- 捐贈 -->
                <b-row
                    key="love_code"
                    v-else-if="receiptSelected=='love_code'"
                >
                    <b-col
                        cols="12"
                        sm="6"
                    >
                        <InputTextSetLoveCode
                            :inputValidated="true"
                            :inputValue.sync="loveCode"
                            inputId="loveCode"
                            inputLabel="輸入愛心碼"
                            v-if="memberLoaded"
                        />
                    </b-col>
                </b-row>

                <!-- 統一編號 -->
                <b-row
                    key="company_id"
                    v-else-if="receiptSelected=='company_id'"
                >
                    <b-col
                        cols="12"
                        sm="6"
                    >
                        <InputTextSetCompanyId
                            :inputValidated="true"
                            :inputValue.sync="companyId"
                            :trim="true"
                            inputId="companyId"
                            inputLabel="統一編號"
                            v-if="memberLoaded"
                        />
                    </b-col>
                    <b-col
                        cols="12"
                        sm="6"
                    >
                        <BaseInputTextSet
                            :inputValidated="true"
                            :inputValue.sync="companyName"
                            inputId="companyName"
                            inputInvalidFeedback="公司抬頭必填。"
                            inputLabel="公司抬頭"
                            v-if="memberLoaded"
                        />
                    </b-col>
                </b-row>
                <b-row v-if="receiptSelected=='company_id'">
                    <b-col>
                        <BaseInputTextSet
                            :inputValidated="true"
                            :inputValue.sync="companyAddr"
                            inputId="companyAddr"
                            inputInvalidFeedback="地址必填。"
                            inputLabel="地址（統編需要）"
                            v-if="memberLoaded"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="lessonCart__inputCouponCol">
                        優惠代碼：
                        <span class="lessonCart__couponSet">
                            <b-form-input
                                @input="couponCodeChanged"
                                class="lessonCart__inputCoupon"
                                v-model="couponCode"
                            />
                            <b-button
                                :disabled="btnCouponDisabled || !couponCode"
                                @click="checkCoupon"
                                class="lessonCart__btnCoupon"
                                variant="warning"
                            >折抵</b-button>
                            <LoadingSet
                                :dotSize="5"
                                class="lessonCart__loadingCoupon"
                                rollerSize="xs"
                                v-if="couponCheckedStatus==1"
                            />
                            <font-awesome-icon
                                class="lessonCart__iconCouponChecked lessonCart__iconCouponChecked-complete"
                                icon="check-circle"
                                v-else-if="couponCheckedStatus==3"
                            />
                            <font-awesome-icon
                                class="lessonCart__iconCouponChecked lessonCart__iconCouponChecked-fail"
                                icon="times-circle"
                                v-else-if="couponCheckedStatus==2"
                            />
                        </span>
                    </b-col>
                </b-row>
            </b-container>
            <div class="lessonCart__amount">
                <span class="lessonCart__amountSpn">售價：{{ salePrice }} 元</span>
                <span class="lessonCart__amountSpn">折抵：{{ discountModified }} 元</span>
                <span class="lessonCart__amountSpn lessonCart__amountSpn--sum">應付金額：{{ sum }} 元</span>
                <b-button
                    :disabled="submitDisabled"
                    @click="buy"
                    class="lessonCart__btnBuy"
                    variant="success"
                >前往結帳</b-button>
            </div>
        </div>
        <section
            class="lessonCart__notications wrapper"
            v-if="lessondLoaded"
        >
            <header>注意事項</header>
            <ul>
                <li>部分課程在招生期間提供折扣價格，招生結束後可能會導致價格變動，實體課程開課之後就不接受購買，會自動從購物車中移除。</li>
                <li>付款完成以後將會在10分鐘內開通課程</li>
            </ul>
        </section>
        <ModalBuyNotice ref="modalBuyNotice" />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
// import BaseAvatar from '../components/global/BaseAvatar'
import LoadingSet from '../components/LoadingSet'
import LessonCardType from '../components/LessonCardType'
import LessonCardLabel from '../components/LessonCardLabel'
import BreadCrumbs from '../components/BreadCrumbs'
import InputTextSetEmail from '../components/InputTextSetEmail'
import ModalBuyNotice from '../components/ModalBuyNotice'
import InputTextSetMobileBarCode from '../components/InputTextSetMobileBarCode'
import InputTextSetMoicaCode from '../components/InputTextSetMoicaCode'
import InputTextSetLoveCode from '../components/InputTextSetLoveCode'
import InputTextSetCompanyId from '../components/InputTextSetCompanyId'
import { buyFreeLesson } from '../mixins/buyFreeLesson'
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    name: 'LessonCart',

    components: {
        // BaseAvatar,
        LoadingSet,
        LessonCardType,
        LessonCardLabel,
        BreadCrumbs,
        InputTextSetEmail,
        ModalBuyNotice,
        InputTextSetMobileBarCode,
        InputTextSetMoicaCode,
        InputTextSetLoveCode,
        InputTextSetCompanyId
    },

    mixins: [buyFreeLesson],

    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.LESSON_CART,
            buyerName: { value: '', state: null },
            buyerEmail: { value: '', state: null },
            receiptSelected: 'receipt_elec',
            receiptOptions: [
                { value: 'receipt_elec', text: '儲存於平台' },
                { value: 'mobile_barcode', text: '手機載具' },
                { value: 'moica_barcode', text: '自然人憑證載具' },
                { value: 'love_code', text: '捐贈' },
                { value: 'company_id', text: '統一編號' }
            ],

            couponCheckedStatus: 0,
            couponCode: '',
            mobileBarcode: { value: '', state: null },
            moicaBarcode: { value: '', state: null },
            loveCode: { value: '', state: null },
            companyId: { value: '', state: null },
            companyName: { value: '', state: null },
            companyAddr: { value: '', state: null },
            discount: 0,
            btnCouponDisabled: false
        }
    },

    async mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        try {
            let response = await this.$store.dispatch(
                'lesson/getLessonDetail',
                this.$route.params['l_id']
            )

            if (response.data.status == 0) {
                let snapshot = response.data.data

                snapshot.cancel_lesson =
                    snapshot.cancel_lesson_init && !snapshot.cancel_lesson
                        ? 2
                        : snapshot.cancel_lesson
                snapshot.current_fee = COMMON_UTILITY.isPast(snapshot.end_fund, true)
                    ? snapshot.origin_fee
                    : snapshot.offer_fee

                this.$store.commit('lesson/SET_DATAS', {
                    stateName: 'lessonDetail',
                    data: snapshot
                })

                this.$store.dispatch('teacher/getTeacher', snapshot.l_id)

                try {
                    let response2 = await this.$store.dispatch('member/getMemberDetail')
                    if (response2.data.status == 0) {
                        this.$store.commit('member/SET_MEMBER_DATA', {
                            name: 'memberFullData',
                            data: response2.data.data
                        })
                        let memberFullData = this.$store.state.member.memberFullData.data
                        this.buyerEmail.value = memberFullData.email
                        this.buyerName.value = memberFullData.nickname

                        this.mobileBarcode.value = memberFullData.mobile_barcode

                        this.moicaBarcode.value = memberFullData.moica_barcode

                        this.loveCode.value = memberFullData.love_code

                        this.companyId.value = memberFullData.company_id
                        this.companyName.value = memberFullData.company_name
                        this.companyAddr.value = memberFullData.address
                    } else {
                        this.$store.commit('member/SET_MEMBER_LOAD_STATUS', {
                            name: 'memberFullData',
                            status: 2
                        })
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'getMemberDetail',
                            code: response.status,
                            isError: true
                        })
                    }
                } catch (e) {
                    this.$store.commit('member/SET_MEMBER_LOAD_STATUS', {
                        name: 'memberFullData',
                        status: 2
                    })

                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'unknown',
                        code: e,
                        isError: true
                    })
                }

                console.warn('getLessonCoupon1 是暫時的，要拿掉')
                try {
                    let response3 = await this.$store.dispatch(
                        'lesson/getLessonCoupon1',
                        snapshot.l_id
                    )
                    if (response3.status == 0) {
                        let couponData = response3.data

                        if (couponData.length) {
                            couponData.sort((a, b) => {
                                if (a.price > b.price) {
                                    return -1
                                } else if (a.price < b.price) {
                                    return 1
                                } else {
                                    return 0
                                }
                            })
                            this.couponCode = couponData[0].code
                            this.discount = couponData[0].price
                            this.couponCheckedStatus = 3
                            this.btnCouponDisabled = true
                        }
                    } else {
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'getLessonCoupon',
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
            } else {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'getLessonDetail',
                    code: response.data.status,
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

        EventBus.$emit('do-resize')
    },

    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        lessondLoaded() {
            return this.$store.state.lesson.lessonDetail.loadStatus == 3
        },
        memberLoaded() {
            return this.$store.state.member.memberFullData.loadStatus == 3
        },
        lessonDetail() {
            return this.$store.state.lesson.lessonDetail.data
        },
        lessonId() {
            return this.$store.state.lesson.lessonDetail.data.l_id
                ? this.$store.state.lesson.lessonDetail.data.l_id
                : ''
        },
        teacherFullName() {
            let teacher = this.$store.state.teacher.lessonShopTeacher.data

            return teacher.nickname + (teacher.m_name ? ' (' + teacher.m_name + ')' : '')
        },
        salePrice() {
            return this.discount ? this.lessonDetail.origin_fee : this.lessonDetail.offer_fee
        },
        discountModified() {
            return this.discount > this.lessonDetail.origin_fee
                ? this.lessonDetail.origin_fee
                : this.discount
        },
        submitDisabled() {
            let receiptState, // 不同發票選項，欄位驗證通過
                couponCheckedState = this.couponCheckedStatus == 3 || this.couponCheckedStatus == 0

            switch (this.receiptSelected) {
                case 'receipt_elec':
                    receiptState = true
                    break
                case 'mobile_barcode':
                    receiptState = this.mobileBarcode.state
                    break
                case 'moica_barcode':
                    receiptState = this.moicaBarcode.state
                    break
                case 'love_code':
                    receiptState = this.loveCode.state
                    break
                case 'company_id':
                    receiptState =
                        this.companyId.state && this.companyName.state && this.companyAddr.state
                    break
            }

            return !(
                this.buyerName.state &&
                this.buyerEmail.state &&
                receiptState &&
                couponCheckedState
            )
        },
        coverStyle() {
            return `background-image:url(${JS_CONFIG.MEDIA_PATH.replace(
                'LESSON_ID',
                this.lessonDetail.l_id
            ) + this.lessonDetail.cover});`
        },
        cellphoneVerifyStatus() {
            return this.$store.state.member.memberFullData.data.cellphone_verify_status
        },
        memberPhone() {
            return this.$store.state.member.memberFullData.data.cellphone
        },
        sum() {
            return this.salePrice - this.discountModified
        },

        hasOriginFee() {
            let lessonDetailData = this.$store.state.lesson.lessonDetail.data
            return lessonDetailData.current_fee != lessonDetailData.origin_fee
        }
    },

    methods: {
        getPageTitle(term) {
            return JS_CONFIG.TERMS.PAGE_TITLE[term]
        },
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },

        /* checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(
                (this.$refs['modalVideo'] && this.$refs['modalVideo'].isShow) ||
                    (this.$refs['modalQRcode'] && this.$refs['modalQRcode'].isShow)
            )
        }, */

        watchDeadline() {
            if (this.lessonDetail.deadline == 999) {
                return '永久觀看'
            } else {
                return this.lessonDetail.deadline + ' 個月'
            }
        },

        async checkCoupon(evt) {
            this.btnCouponDisabled = true
            this.couponCheckedStatus = 1

            let response
            try {
                response = await this.$store.dispatch('lesson/checkLessonCoupon', {
                    lid: this.lessonDetail.l_id,
                    code: this.couponCode
                })

                if (response.status == 0) {
                    this.discount = response.data
                    this.couponCheckedStatus = 3
                } else {
                    this.couponCheckedStatus = 2
                    this.discount = 0
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        couponCodeChanged() {
            this.clearCoupon()
        },
        clearCoupon() {
            this.discount = 0
            this.couponCheckedStatus = 0
            this.btnCouponDisabled = false
        },
        buy() {
            if (this.sum) {
                EventBus.$emit('show-buy-notice', this.sum)
            } else {
                // 折扣折成免費
                this.buyFreeLesson({
                    l_id: this.$route.params['l_id'],
                    deadline: this.lessonDetail.deadline,
                    type: this.lessonDetail.type
                })
            }
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(this.$refs['modalBuyNotice'].isShow)
        }
    },

    beforeDestroy() {
        this.$store.commit('lesson/LOAD_LESSON_DETAIL_INIT')
        this.$parent.switchBodyScrollStatus(false)
        this.$store.commit('order/SET_STATUS', { name: 'buyFreeStatus', status: 0 })
    }
}
</script>
