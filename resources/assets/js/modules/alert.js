import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

const alertMessages = {
    unknown: {
        419: '平台閒置過久，請重新整理網頁。'
    },

    login: {
        1: '無此帳號',
        2: '手機驗證過後才能使用手機登入',
        3: 'Email 驗證過後才能使用 Email 登入',
        4: '帳號（或 email、手機)、密碼不正確'
    },
    logout: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    updateDataForTeacher: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: '暱稱為必填資料'
    },

    // member
    signUp: {
        1: JS_CONFIG.TERMS.ACCOUNT_FORMAT_WRONG,
        2: '此帳號已有人使用',
        3: JS_CONFIG.TERMS.PASSWORD_FORMAT_WRONG_DETAIL,
        4: JS_CONFIG.TERMS.EMAIL_FORMAT_WRONG,
        5: '此 E-mail 已有人使用',
        6: '此手機號碼已有人使用',
        7: '姓名未填'
    },
    getPlainPassword: {
        1: '無此帳號',
        2: '手機未驗證',
        3: 'email 未驗證',
        4: '您是使用 google 帳號登入，並非學習平台帳號與密碼。若是忘記 google 帳號密碼，請前往 google 申請忘記密碼。'
    },
    getMemberDetail: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    sendEmailVerification: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: 'email 格式錯誤',
        3: 'email 已有人使用'
    },
    uploadAvatar: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: '大頭照格式不符'
    },
    updateMemberData: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: '姓名、性別為必填。',
        2: '姓名、暱稱、性別為必填。'
    },
    updatePassword: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: '原密碼不正確',
        3: '新密碼格式錯誤',
        4: '所有欄位皆為必填'
    },
    updateBankInfo: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: '所有欄位皆為必填'
    },
    getPhoneVerificationCode: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(
            2,
            JS_CONFIG.TERMS.DELIVER + JS_CONFIG.TERMS.PHONE_VERIFY_CODE
        ),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '請求發送次數過多，請聯絡客服協助您驗證手機。'),
        4: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '手機號碼已驗證'),
        5: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '手機號碼已有人使用'),
        6: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '簡訊系統出問題')
    },
    getPhoneVerificationCodeTime: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    checkPhoneVerificationCode: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: JS_CONFIG.TERMS.PHONE_VERIFY_CODE + '錯誤'
    },
    sendContactEmail: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '寄送失敗')
    },

    // lesson
    getPromotingLessons: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(0)
    },
    getLessons: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(0)
    },
    getMyLessons: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    getMyFavoriteLessons: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    getLessonShopQA: {
        1: '讀取' + JS_CONFIG.TERMS.LESSON_QUESTION_ANSWER + '失敗',
        2: '讀取' + JS_CONFIG.TERMS.LESSON_QUESTION_ANSWER + '失敗',
        3: '讀取' + JS_CONFIG.TERMS.CLASSROOM_QA + '失敗',
        4: '讀取' + JS_CONFIG.TERMS.CLASSROOM_QA + '失敗'
    },
    sendLessonShopQA: {
        1: '讀取' + JS_CONFIG.TERMS.LESSON_QUESTION_ANSWER + '失敗',
        2: '讀取' + JS_CONFIG.TERMS.LESSON_QUESTION_ANSWER + '失敗',
        3: '讀取' + JS_CONFIG.TERMS.LESSON_QUESTION_ANSWER + '失敗',
        4: '讀取' + JS_CONFIG.TERMS.CLASSROOM_QA + '失敗',
        5: '讀取' + JS_CONFIG.TERMS.CLASSROOM_QA + '失敗',
        6: '讀取' + JS_CONFIG.TERMS.CLASSROOM_QA + '失敗'
    },
    getLessonDetail: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.NO_THIS_LESSON),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    getLessonCartQA: {
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.LESSON_QUESTION_ANSWER)
    },
    getLessonCoupon: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.NO_THIS_LESSON),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    postLessonCoupon: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '新增' + JS_CONFIG.TERMS.LESSON_COUPON),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '新增' + JS_CONFIG.TERMS.LESSON_COUPON),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '新增' + JS_CONFIG.TERMS.LESSON_COUPON)
    },
    setLessonCouponStatus: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '無此優惠券'),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '無權修改優惠券')
    },
    getAreas: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.AREA)
    },
    getTopicLabels: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.TOPIC_AREA)
    },
    getLessonUnitTimes: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.LESSON_UNIT_TIME)
    },
    getLessonUnitDetail: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.LESSON_UNIT_TIME),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.LESSON_UNIT_TIME),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.LESSON_UNIT_TIME)
    },
    getLessonClassmates: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.CLASSMATE),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.CLASSMATE),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.CLASSMATE)
    },
    switchFavorite: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.NO_THIS_LESSON),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL)
    },
    getTeacherLessons: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(0),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(0),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(0)
    },

    // message
    getMessages: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.MESSAGE)
    },
    sendMessage: {
        1: '訊息已送出。',
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, '傳送' + JS_CONFIG.TERMS.MESSAGE)
    },

    // order
    getOrders: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.USER + JS_CONFIG.TERMS.ORDER)
    },
    cancelOrder: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, JS_CONFIG.TERMS.CANCEL_ORDER),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, JS_CONFIG.TERMS.CANCEL_ORDER),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, JS_CONFIG.TERMS.CANCEL_ORDER),
        4: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, JS_CONFIG.TERMS.CANCEL_ORDER)
    },
    buyFreeLesson: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, '免費購買'),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, '免費購買'),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, '免費購買')
    },
    cancelLessonExistedOrder: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, '檢查無用訂單'),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, '檢查無用訂單')
    },

    // teacher
    getTeachers: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.TEACHER)
    },
    getTeacher: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.TEACHER)
    },
    applyForTeacher: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, JS_CONFIG.TERMS.APPLY_TEACHER),
        2:
            JS_CONFIG.TERMS.APPLY_TEACHER +
            '必須有' +
            JS_CONFIG.TERMS.NICKNAME +
            '、' +
            JS_CONFIG.TERMS.GENDER +
            '、' +
            JS_CONFIG.TERMS.CELLPHONE +
            '、' +
            JS_CONFIG.TERMS.AVATAR
    },
    updateTeacherDetail: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: '無權設定',
        3: '缺少必填資料',
        4: '作品欄沒填。'
    },

    // rollcall
    getLessonRollcalls: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, JS_CONFIG.TERMS.ERROR.MEMBER_ABNORMAL),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.ROLLCALL + JS_CONFIG.TERMS.DATA)
    },
    getRollcallQRCode: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, '點名 QR code'),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, '點名 QR code')
    },

    // wish
    getMyWishes: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(1, JS_CONFIG.TERMS.PAGE_TITLE.MY_WISH)
    },
    postMyWish: {
        1: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '新增我的願望失敗'),
        2: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '新增我的願望失敗'),
        3: JS_CONFIG.ERROR_MESSAGE_SENTENCE(4, '新增我的願望失敗')
    },
    getMyWishesImages: JS_CONFIG.ERROR_MESSAGE_SENTENCE(
        1,
        JS_CONFIG.TERMS.PAGE_TITLE.MY_WISH + '圖片'
    ),

    // load img file for upload avatar front-end
    loadFileWithFileReader: JS_CONFIG.ERROR_MESSAGE_SENTENCE(2, '若無法順利秀出圖檔')
}

export const alert = {
    strict: true,
    namespaced: true,
    state() {
        return {
            alertMessages: [],
            completeAlertMessage: ''
        }
    },
    actions: {},
    mutations: {
        ADD_ALERT_MESSAGE(state, { api, code, notApi, isError, messageMode }) {
            state.alertMessages.push({
                code: code,
                isError: isError,
                message: messageMode
                    ? api
                    : notApi
                    ? alertMessages[api]
                    : alertMessages[api] && alertMessages[api][code]
                    ? alertMessages[api][code]
                    : JS_CONFIG.ERROR_MESSAGE_SENTENCE(0)
            })
            EventBus.$emit('show-modal-alert')
        },
        CLEAR_ALERT_MESSAGE(state) {
            state.alertMessages = []
        },
        SHOW_COMPLETE_ALERT(state, message) {
            state.completeAlertMessage = ''
            EventBus.$emit('hide-complete-alert')
            state.completeAlertMessage = message
            EventBus.$emit('show-complete-alert')
        },
        CLEAR_COMPLETE_ALERT_MESSAGE(state) {
            state.completeAlertMessage = ''
        }
    }
}
