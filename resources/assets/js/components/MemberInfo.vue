<style lang="scss">
@import '../../sass/variables';
@import '../../sass/vendors/datepicker';
@import '../../sass/layout/baseFormTable';

.memberInfo__datepicker {
    @extend .customDatepicker;

    .form-control {
        font-size: 1rem;
    }
}
.memberInfo {
    table.baseFormTable {
        border-spacing: 0 0rem;
        tr {
            th,
            td {
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
            }

            th {
                padding-left: 1rem;
            }
            td {
                padding-right: 1rem;
            }

            .memberInfo__cellphoneTh {
                vertical-align: top;
            }
            .memberInfo__cellphone {
                margin-top: 0.5rem;
                line-height: 1.4rem;
                margin-bottom: 0;
            }
            .memberInfo__cellphoneHelp {
                color: $lightgray;
                font-size: 0.8rem;
            }

            &.memberInfo__useCompanyIdTr {
                background-color: $complementary3;
            }
            &.memberInfo__useCompanyIdTr--header {
                /* th {
                    text-align: left;
                } */

                label {
                    margin-bottom: 0;
                }
            }
        }

        @media (max-width: $max-w-xs) {
            tr {
                .memberInfo__cellphone {
                    margin-top: 0;
                }
            }
        }
    }
}

.memberInfo__showMoreCheckbox {
    display: none;
}
.memberInfo__showMoreLabel {
    color: $emphasized3;
    text-decoration: underline;
    cursor: pointer;
}

.memberInfo__verified {
    font-size: 0.8rem;
    color: $bs-success;
}

.memberInfo__btnSmall {
    font-size: 0.7rem;
    padding: 0 0.5rem;
    line-height: 1rem;
    vertical-align: baseline;
}
</style>

<template>
    <div class="memberInfo">
        <table class="baseFormTable">
            <tr>
                <th class="baseFormTable__required">姓名</th>
                <td>
                    <BaseInputTextSet
                        :initValidate="true"
                        :inputInvalidFeedback="getTerm('REQUIRED')"
                        :inputValidated="true"
                        :inputValue.sync="name"
                        :trim="true"
                        inputId="name"
                        inputPlaceholder="輸入您的姓名"
                        v-if="ready"
                    />
                </td>
            </tr>
            <tr>
                <th :class="nicknameThClass">暱稱</th>
                <td role="group">
                    <BaseInputTextSet
                        :initValidate="true"
                        :inputInvalidFeedback="getTerm('REQUIRED')"
                        :inputValidated="isTeacher"
                        :inputValue.sync="nickname"
                        :trim="true"
                        inputId="nickname"
                        inputPlaceholder="輸入您的暱稱"
                        v-if="ready"
                    />
                </td>
            </tr>
            <tr>
                <th>身分證</th>
                <td role="group">
                    <b-form-input
                        placeholder="輸入您的身分證號碼"
                        trim
                        v-model="idCode"
                    ></b-form-input>
                    <b-form-text id="idCodee-help">參加外拍申請保險用，其他使用者不會看到此資料。</b-form-text>
                </td>
            </tr>
            <tr>
                <th>性別</th>
                <td
                    class="baseFormTable__TDradio"
                    role="group"
                >
                    <b-form-group>
                        <b-form-radio-group
                            :options="genders"
                            id="gender"
                            v-model="gender"
                        ></b-form-radio-group>
                    </b-form-group>
                </td>
            </tr>
            <tr>
                <th class="memberInfo__cellphoneTh">手機號碼</th>
                <td role="group">
                    <p class="memberInfo__cellphone">
                        {{ cellphone }}
                        <span
                            class="memberInfo__verified"
                            v-if="cellphoneVerifyStatus"
                        >
                            <font-awesome-icon icon="check-circle" />已驗證
                        </span>
                        <b-button
                            @click="setPhone"
                            class="memberInfo__btnSmall"
                            variant="outline-primary"
                        >設定/驗證手機</b-button>
                    </p>
                    <p class="memberInfo__cellphoneHelp">
                        手機驗證後作為重要訊息通知，且可搭配平台密碼登入。手機、Email
                        皆驗證方可購買課程。
                    </p>
                </td>
            </tr>
            <tr>
                <th class="memberInfo__cellphoneTh">Email</th>
                <td role="group">
                    <p class="memberInfo__cellphone">
                        {{ email }}
                        <span
                            class="memberInfo__verified"
                            v-if="emailVerifyStatus"
                        >
                            <font-awesome-icon icon="check-circle" />已驗證
                        </span>
                        <b-button
                            @click="setEmail"
                            class="memberInfo__btnSmall"
                            v-else
                            variant="outline-primary"
                        >發送 Email 驗證</b-button>
                    </p>
                    <p class="memberInfo__cellphoneHelp">
                        Email 驗證後作為一般訊息通知且可搭配平台密碼登入。手機、Email
                        皆驗證方可購買課程。
                    </p>
                </td>
            </tr>
            <tr
                :class="useCompanyId ? 'memberInfo__useCompanyIdTr' : ''"
                class="memberInfo__useCompanyIdTr memberInfo__useCompanyIdTr--header"
            >
                <!-- :class="useCompanyId?'memberInfo__useCompanyIdTr':''" -->
                <th
                    class="text-left"
                    colspan="2"
                >
                    <input
                        id="useCompanyId"
                        name
                        type="checkbox"
                        v-model="useCompanyId"
                    />
                    <label for="useCompanyId">開立發票使用公司統編</label>
                </th>
            </tr>
            <template v-if="useCompanyId">
                <tr class="memberInfo__useCompanyIdTr">
                    <th>公司名稱</th>
                    <td class="group">
                        <b-form-input
                            placeholder="輸入您的公司名稱"
                            trim
                            v-model="companyName"
                        ></b-form-input>
                    </td>
                </tr>
                <tr class="memberInfo__useCompanyIdTr">
                    <th>公司統編</th>
                    <td class="group">
                        <b-form-input
                            placeholder="輸入您的公司統編"
                            trim
                            v-model="companyId"
                        ></b-form-input>
                    </td>
                </tr>
                <tr class="memberInfo__useCompanyIdTr">
                    <th>地址</th>
                    <td class="group">
                        <b-form-input
                            placeholder="輸入您的公司地址"
                            trim
                            v-model="companyAddr"
                        ></b-form-input>
                    </td>
                </tr>
            </template>
            <tr>
                <th
                    class="text-center"
                    colspan="2"
                >
                    <template v-if="!showMore">
                        <input
                            class="memberInfo__showMoreCheckbox"
                            id="showMore"
                            name
                            type="checkbox"
                            v-model="showMore"
                        />
                        <label
                            class="memberInfo__showMoreLabel"
                            for="showMore"
                        >讓我們更了解您...</label>
                    </template>
                </th>
            </tr>
            <template v-if="showMore">
                <tr>
                    <th>生日</th>
                    <td role="group">
                        <Datepicker
                            :disabled-dates="state.disabledDates"
                            :language="zh"
                            bootstrap-styling
                            class="memberInfo__datepicker"
                            format="yyyy/MM/dd"
                            required
                            v-model="birthday"
                        ></Datepicker>
                    </td>
                </tr>
                <tr>
                    <th>facebook</th>
                    <td role="group">
                        <b-form-input
                            placeholder="輸入您的 facebook 網址"
                            trim
                            v-model="facebook"
                        ></b-form-input>
                    </td>
                </tr>
                <tr>
                    <th>Line id</th>
                    <td role="group">
                        <b-form-input
                            placeholder="輸入您的 line id"
                            trim
                            v-model="lineId"
                        ></b-form-input>
                    </td>
                </tr>
            </template>
            <tr>
                <td
                    class="text-right"
                    colspan="2"
                >
                    <b-button
                        :disabled="!requiredValidated"
                        @click="submit"
                        variant="success"
                    >送出</b-button>
                </td>
            </tr>
        </table>

        <ModalEmailVerifySender ref="modalEmailVerifySender" />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config.js' // JS_CONFIG.MEDIA_PATH
import { validateMixin } from '../mixins/validate'
import { COMMON_UTILITY } from '../class/commonUtility'
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
import InputTextSetEmail from './InputTextSetEmail'
import ModalEmailVerifySender from './ModalEmailVerifySender'
import { mapGetters } from 'vuex'

export default {
    name: 'MemberInfo',
    mixins: [validateMixin],
    components: {
        Datepicker,
        InputTextSetEmail,
        ModalEmailVerifySender
    },
    data() {
        return {
            ready: false,
            name: { value: '', state: null },
            nickname: { value: '', state: null },
            idCode: '',
            genders: ['男', '女', '其他'],
            gender: '男',
            zh: zh,
            birthday: '',
            state: { disabledDates: {} },
            facebook: '',
            lineId: '',
            companyName: '',
            companyId: '',
            companyAddr: '',
            showMore: false,
            useCompanyId: false
        }
    },
    created() {
        let now = new Date(),
            tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 1)

        this.state = { disabledDates: { from: tomorrow } }
    },

    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        this.name.value = this.memberFullData.nickname
        this.nickname.value = this.memberFullData.m_name
        if (this.memberFullData.sex) {
            this.gender = this.memberFullData.sex
        }
        this.idCode = this.memberFullData.id_code

        this.companyName = this.memberFullData.company_name
        this.companyId = this.memberFullData.company_id
        this.companyAddr = this.memberFullData.address

        if (this.memberFullData.birthday) {
            let bd = this.memberFullData.birthday
            this.birthday = COMMON_UTILITY.timeString2DateObject(bd)
        } else {
            this.birthday = ''
        }

        this.facebook = this.memberFullData.facebook
        this.lineId = this.memberFullData.line_id

        if (
            this.memberFullData.company_id ||
            this.memberFullData.company_name ||
            this.memberFullData.address
        ) {
            this.useCompanyId = true
        }

        if (
            this.memberFullData.birthday ||
            this.memberFullData.facebook_link ||
            this.memberFullData.line_id
        ) {
            this.showMore = true
        }

        if (!this.emailVerifyStatus) {
            this.setEmail()
        }
        EventBus.$on('show-phone-verify', this.setPhoneComplete)
        EventBus.$on('phone-verfiy-completed', this.phoneVerfiyCompleted)
        EventBus.$on('email-verify-sent', this.emailVerifySent)
        this.ready = true
        EventBus.$emit('do-resize')
    },
    props: {},
    computed: {
        nicknameThClass() {
            return this.isTeacher ? 'baseFormTable__required' : ''
        },
        email() {
            return this.memberFullData.email
        },
        emailVerifyStatus() {
            return this.memberFullData.email_verify
        },
        cellphone() {
            return this.memberFullData.cellphone
        },
        cellphoneVerifyStatus() {
            return this.memberFullData.cellphone_verify_status
        },
        requiredValidated() {
            let bool = this.name.state
            if (this.isTeacher) {
                bool = bool && this.nickname.state
            }
            return bool
        },
        ...mapGetters({
            memberFullData: 'member/memberFullData',
            isTeacher: 'member/isTeacher'
        })
    },
    methods: {
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        setPhone() {
            EventBus.$emit('show-phone-setter', this.cellphone)
        },
        phoneVerfiyCompleted() {
            this.$store.commit('member/SWITCH_CELLPHONE_VERIFY_STATUS', 1)
        },
        setEmail() {
            EventBus.$emit('show-email-verify-sender')
        },
        checkBirthdayModified() {
            let bd
            if (this.birthday) {
                bd = COMMON_UTILITY.dateObject2DateString(this.birthday, '-')
            } else {
                bd = null
            }

            return this.memberFullData.birthday != bd ? bd : null
        },

        checkOtherModified() {
            let modifiedData = [],
                datas = [
                    ['id_code', 'idCode'],
                    ['company_name', 'companyName'],
                    ['company_id', 'companyId'],
                    ['address', 'companyAddr'],
                    ['facebook_link', 'facebook'],
                    ['line_id', 'lineId']
                ]

            datas.forEach(item => {
                if (this.memberFullData[item[0]] != this[item[1]]) {
                    modifiedData.push({ name: item[0], value: this[item[1]] })
                }
            })

            return modifiedData
        },

        async submit() {
            if (!this.requiredValidated) {
                return
            }
            let postData = {},
                checkBirthdayResult,
                modifiedOtherData

            postData.nickname = this.name.value
            postData.m_name = this.nickname.value
            postData.sex = this.gender

            if (this.isTeacher) {
                postData.mode = 1
            }

            // 檢查生日有無修改
            checkBirthdayResult = this.checkBirthdayModified()
            if (checkBirthdayResult != null) {
                postData.birthday = checkBirthdayResult
            }

            modifiedOtherData = this.checkOtherModified()
            modifiedOtherData.forEach(data => {
                postData[data.name] = data.value
            })

            try {
                let response = await this.$store.dispatch('member/saveUserData', postData)

                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '儲存成功')
                    EventBus.$emit('member-data-updated')
                } else {
                    this.$store.commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'updateMemberData',
                            code: response.data.status,
                            isError: true
                        },
                        { root: true }
                    )
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        checkBodyScrollStatus() {
            this.$parent.$parent.$parent.switchBodyScrollStatus(
                this.$refs['modalEmailVerifySender'].isShow
            )
        },
        setPhoneComplete(phone) {
            this.$store.commit('member/SET_CELLPHONE', phone)
        },
        emailVerifySent(email) {
            this.$store.commit('member/SET_EMAIL', email)
        }
    },
    beforeDestroy() {
        EventBus.$off('show-phone-verify', this.setPhoneComplete)
        EventBus.$off('phone-verfiy-completed', this.phoneVerfiyCompleted)
        EventBus.$off('email-verify-sent', this.emailVerifySent)
    }
}
</script>
