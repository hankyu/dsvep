export const JS_CONFIG = {
    PERSONAL_AVATAR_PATH: 'img/personal/avatar/',
    MEDIA_PATH: 'media/LESSON_ID/cover/',
    VIDEO_PATH: 'media/LESSON_ID/lesson/',
    JSON_PATH: 'json/',

    // 完成通知
    COMPLETE_ALERT_DURATION: 3000,

    // 點名系統
    ROLLCALL_SYSTEM_ACTIVE_TIME: new Date(2019, 4, 10).setHours(0, 0, 0, 0), // 點名系統 2019/5/10 上線
    START_ROLLCALL_HOUR_BEFORE: 1, // allow rollcalling at 1 hr before.
    PRESENCE_RATE_PRECISION: 1, // 出席率小數點後位數

    VIDEO_IGNORE_TAIL: 2, // 只剩下 2 秒，就當作看完了，下次 play 就從頭

    IMGUR_SIZE_LIMIT: 10485760, // imgur 圖片大小不可超過10MB

    // 優惠券
    EXPIRE_TIME: 7,

    // 課程
    LESSONS_PER_LOAD: 24, // 一次 api 要幾個課程

    // 講師
    TEACHERS_PER_LOAD: 24, // 一次 api 要幾個講師

    TERMS: {
        WEBSITE_TITLE: {
            FULL: '大俠學習平台',
            BRIEF: '大俠學習'
        },
        PAGE_TITLE: {
            ANNOUNCEMENT: '最新公告',
            HOT_TEACHER: '王牌講師',
            ALL_LESSON: '所有課程',
            BECOME_TEACHER: '成為講師',
            BASIC_DATA: '基本資料',
            MY_LESSON: '我的課程',
            MY_ROLLCALL_REPORT: '我的出席',
            MY_MESSAGE: '我的訊息',
            MY_ORDER: '我的訂單',
            MY_WISH: '我的願望',
            MY_FAVORITE: '我的收藏',
            TEACHER_PROFILE: '導師室',
            CREATE_LESSON: '創建課程',
            LESSON_MANAGEMENT: '課程管理',
            LESSON_ROLLCALL_REPORT: '課程出席',
            LESSON_ACCOUNTING: '課程收益',
            CREATE_LESSON_AS_AGENT: '代創課程',
            ROLLCALL_MANAGEMENT: '點名管理',
            PLATFORM_MANAGEMENT: '平台管理後台',
            APPLY_MANAGEMENT: '報名管理系統',
            TUTORIAL: '網站使用教學',
            CONTACT: '聯絡客服',
            LOGOUT: '登出',
            LESSON_SHOP: '課程商店',
            LESSON_CLASSROOM: '課程教室',
            ACCOUNT_SETTING: '帳號設定',
            ABOUT: '關於我們',
            LESSON_CART: '課程購買'
        },
        ERROR: {
            MEMBER_ABNORMAL: '會員身份有異',
            NO_THIS_LESSON: '無此課程'
        },
        SUBMIT: '送出',
        CONFIRM: '確認',
        CANCEL: '取消',
        USER: '使用者',
        LOGIN: '登入',
        MEMBER_LOGIN: '會員登入',
        FORGET_PASSWORD: '忘記密碼',
        SIGNUP: '註冊會員',
        INPUT_PLATFORM_ACCOUNT: '請輸入您的平台帳號',
        INPUT_EMAIL: '請輸入您的 Email',
        INPUT_PLATFORM_PASSWORD: '請輸入您的平台密碼',
        REQUIRED: '必填',
        ACCOUNT_FORMAT_WRONG: '帳號必填（6~20 個英文、數字，勿用標點符號）',
        EMAIL_FORMAT_WRONG: 'Email 格式不正確',
        PASSWORD_FORMAT_WRONG: '密碼格式不正確',
        PASSWORD_FORMAT_WRONG_DETAIL: '密碼必須 8~30 個字',
        DATA: '資訊',
        MESSAGE: '站內訊息',
        RECENT_LESSONS: '近期開課課程',
        HOT_LESSONS: '本月熱門課程',
        RECENT_FREE_LESSONS: '近期免費課程',
        NEWEST_ENTITY_LESSONS: '實體最新課程',
        NEWEST_ONLINE_LESSONS: '線上最新課程',
        UNKNOWN_REASON: '不明原因',
        TRY_AGAIN: '請重整瀏覽器，再試一次',
        CANCEL_FAVORITE: '取消收藏',
        ADD_FAVORITE: '加入收藏',
        ORDER: '訂單',
        CANCEL_ORDER: '取消訂單',
        ROLLCALL: '點名',
        LESSON_QUESTION_ANSWER: '課程問答',
        CLASSROOM_LOCATION: '教室位置',
        LESSON_COUPON: '優惠券',
        DISCOUNT: '優惠金額',
        CLASSMATE: '同學',
        CLASSROOM_QA: '課堂討論',
        LESSON_UNIT_TIME: '課表時間',
        TEACHER: '講師',
        AREA: '地區',
        TOPIC_AREA: '課程領域',
        APPLY_TEACHER: '申請成為講師',
        NICKNAME: '暱稱',
        GENDER: '性別',
        CELLPHONE: '手機',
        AVATAR: '大頭照',
        PHONE_VERIFY_CODE: '手機驗證碼',
        PHONE_VERIFIED: '手機驗證',
        DELIVER: '發送',

        PRIVACY: '隱私策略',
        SERVICE_RULE: '服務條款',
        PAYMENT: '付款方式',
        COMMON_QUESTION: '常見問題',
        REFUND_RULE: '退款規定',
        RE_LISTEN: '補課/重聽規定',
        TEACHER_RULE: '講師條款',
        IMG_TOO_BIG: '圖片「FILE_NAME」大小超過10MB',
        IMG_WRONG_FORMAT: '圖片「FILE_NAME」格式不支援，應為 jpg|jpeg|png|gif',

        RESEND_EMAIL_VALIDATION: '重發 Email 驗證信'
    },
    ERROR_MESSAGE_SENTENCE: function(idx, name) {
        switch (idx) {
            case 0:
                return '與伺服器連線可能出現了問題，' + this.TERMS.TRY_AGAIN
                break
            case 1:
                return `讀取「${name}」發生問題，${this.TERMS.TRY_AGAIN}。`
                break
            case 2:
                return `${name}發生問題，${this.TERMS.TRY_AGAIN}。`
                break
            case 3:
                return `更新「${name}」發生問題，${this.TERMS.TRY_AGAIN}。`
                break
            case 4:
                return `${name}，${this.TERMS.TRY_AGAIN}。`
                break
        }
    }
}
