import Http from '../http'
import { COOKIE_KIT } from '../class/cookieKit'
import { JS_CONFIG } from '../config'

import { COMMON_UTILITY } from '../class/commonUtility'

// 所有課程
const _TMP_ALL_LESSONS_T_ID = 1,
    _TMP_ALL_LESSONS_ORIGIN_FEE = 2000,
    _TMP_ALL_LESSONS_OFFER_FEE = 1000,
    _TMP_ALL_LESSONS_CURRENT_FEE = 1000,
    _TMP_ALL_LESSONS_OWNED = 0,
    _TMP_ALL_LESSONS_DEADLINE = 999,
    _TMP_ALL_LESSONS_ORDER_DEADLINE = null,
    // getLessonDetail
    _TMP_GET_LESSON_DETAIL_T_ID = 2,
    _TMP_GET_LESSON_DETAIL_ORIGIN_FEE = 2000,
    _TMP_GET_LESSON_DETAIL_OFFER_FEE = 1000,
    _TMP_GET_LESSON_DETAIL_CURRENT_FEE = 10,
    _TMP_GET_LESSON_DETAIL_START_FUND = '2019-08-24',
    _TMP_GET_LESSON_DETAIL_END_FUND = '2019-09-20',
    _TMP_GET_LESSON_DETAIL_START_TIME = '2019-09-21',
    _TMP_GET_LESSON_DETAIL_OWNED = 0,
    _TMP_GET_LESSON_DETAIL_DEADLINE = 999,
    _TMP_GET_LESSON_DETAIL_L_START_TIME = '2019-10-15 09:00:00',
    _TMP_GET_LESSON_DETAIL_L_END_TIME = '2019-11-15 09:00:00',
    _TMP_GET_LESSON_DETAIL_LESSON_CANCELED = -1,
    _TMP_GET_LESSON_DETAIL_ORDER_DEADLINE = null,
    _TMP_AVG_IMG = 'dannyyu_ava.jpeg'

export const lesson = {
    strict: true,
    namespaced: true,
    // modules: { UTILITY },
    state() {
        return {
            recentLessons: {
                data: [],
                loadStatus: 0, // 0: 未載  1: 載入中   2: 載入失敗  3: 載成功
                loadTimestamp: null
            },
            monthHotLessons: {
                data: [],
                loadStatus: 0,
                loadTimestamp: null
            },
            recentFreeLessons: {
                data: [],
                loadStatus: 0,
                loadTimestamp: null
            },
            recentEntityLessons: {
                data: [],
                loadStatus: 0,
                loadTimestamp: null
            },
            recentOnlineLessons: {
                data: [],
                loadStatus: 0,
                loadTimestamp: null
            },
            myLessons: {
                data: [],
                loadStatus: 0
            },
            myFavoriteLessons: {
                data: [],
                loadStatus: 0
            },
            allLessons: {
                data: [],
                loadStatus: 0
            },
            lessonDetail: {
                data: {},
                loadStatus: 0
            },
            lessonUnitDetail: {
                data: [],
                loadStatus: 0
            },
            lessonShopQA: {
                data: [],
                loadStatus: 0
            },
            lessonClassmates: {
                data: [],
                loadStatus: 0
            },
            areas: {
                data: [],
                loadStatus: 0
            },
            topicLabels: {
                data: [],
                loadStatus: 0
            }
        }
    },
    actions: {
        getPromotingLessons({ commit }, mode) {
            let stateNames = [
                'recentLessons',
                'monthHotLessons',
                'recentFreeLessons',
                'recentEntityLessons',
                'recentOnlineLessons'
            ]

            commit('LOAD_PROMOTING_DATAS_INIT', stateNames[mode])

            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            Http.post('lesson/getPromotingLessons', { m_id: mid, remember_token: rToken, mode })
                .then(response => {
                    if (response.data.status == 0) {
                        let snapshot = response.data.data

                        snapshot.forEach(lesson => {
                            lesson.cancel_lesson =
                                lesson.cancel_lesson_init && !lesson.cancel_lesson
                                    ? 2
                                    : lesson.cancel_lesson
                            lesson.current_fee = COMMON_UTILITY.isPast(lesson.end_fund, true)
                                ? lesson.origin_fee
                                : lesson.current_fee
                        })

                        commit('SET_PROMOTING_DATAS', {
                            stateName: stateNames[mode],
                            data: snapshot
                        })
                    } else {
                        commit('DATAS_STATUS', { stateName: stateNames[mode], status: 2 })
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getPromotingLessons',
                                code: e,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('DATAS_STATUS', { stateName: stateNames[mode], status: 2 })
                    commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'unknown',
                            code: e,
                            isError: true
                        },
                        { root: true }
                    )
                })
        },

        getMyLessons({ commit }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            commit('LOAD_DATAS_INIT', 'myLessons')
            Http.post('lesson/getMyLessons', { m_id: mid, remember_token: rToken })
                .then(response => {
                    if (response.data.status == 0) {
                        let snapshot = response.data.data

                        snapshot.forEach(lesson => {
                            lesson.cancel_lesson =
                                lesson.cancel_lesson_init && !lesson.cancel_lesson
                                    ? 2
                                    : lesson.cancel_lesson
                            lesson.current_fee = COMMON_UTILITY.isPast(lesson.end_fund, true)
                                ? lesson.origin_fee
                                : lesson.current_fee
                        })
                        commit('SET_DATAS', {
                            stateName: 'myLessons',
                            data: snapshot
                        })
                    } else {
                        commit('DATAS_STATUS', { stateName: 'myLessons', status: 2 })
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getMyLessons',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('DATAS_STATUS', { stateName: 'myLessons', status: 2 })
                    commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'unknown',
                            code: e,
                            isError: true
                        },
                        { root: true }
                    )
                })
        },
        getLessonUnitTimes({ commit }, l_id) {
            return Http.post('lesson/getLessonUnitTimes', { l_id })
        },
        getMyFavoriteLessons({ commit }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token')

            commit('LOAD_DATAS_INIT', 'myFavoriteLessons')
            console.warn('要幫每一個課程加上 favorite : 1 屬性')
            let data = [
                {
                    l_id: 1,
                    type: 'entity',
                    cover: '162763b60b5293feb6f2226ee7d865b4.jpg',
                    l_name: '某某某某某某某某某某某某課',
                    end_fund: '2019-06-09 09:00:00',
                    start_time: '2019-06-10 09:00:00',
                    location: '台北市大安區',
                    origin_fee: 2000,
                    offer_fee: 1000,
                    current_fee: 1000,
                    least_people: 3,
                    buyers: 10,
                    max_people: 10,
                    l_start_time: '2020-06-14 09:00:00',
                    l_end_time: '2020-07-15 09:00:00',
                    cancel_lesson: 0,
                    cancel_lesson_init: 0,
                    deadline: 999,
                    apply_situation: 'success',
                    t_id: 1,
                    t_name: '余丹尼',
                    t_nickname: '丹尼老師傅',
                    t_avg_img: _TMP_AVG_IMG,
                    owned: 2,
                    favorite: 1,
                    orderDeadline: null
                },
                // 確定開班, start_time 後（含當天）, 實體, l_start_time 後, l_end_time 後, 「已結業」
                {
                    l_id: 2,
                    type: 'entity',
                    cover: '162763b60b5293feb6f2226ee7d865b4.jpg',
                    l_name: '「已結業」',
                    end_fund: '2019-06-09 09:00:00',
                    start_time: '2019-06-10 09:00:00',
                    location: '台北市大安區',
                    origin_fee: 2000,
                    offer_fee: 1000,
                    current_fee: 1000,
                    least_people: 3,
                    buyers: 10,
                    max_people: 10,
                    l_start_time: '2019-06-01 09:00:00',
                    l_end_time: '2019-06-13 01:47:00',
                    cancel_lesson: 0,
                    cancel_lesson_init: 0,
                    deadline: 999,
                    apply_situation: 'success',
                    t_id: 1,
                    t_name: '余丹尼',
                    t_nickname: '丹尼老師傅',
                    t_avg_img: _TMP_AVG_IMG,
                    owned: 2,
                    favorite: 1,
                    orderDeadline: null
                },
                // 確定開班, start_time 後（含當天）, 線上, 「上課去」
                {
                    l_id: 3,
                    type: 'online',
                    cover: '162763b60b5293feb6f2226ee7d865b4.jpg',
                    l_name: '上課去，永久，已學習',
                    end_fund: '2019-06-09 09:00:00',
                    start_time: '2019-06-10 09:00:00',

                    origin_fee: 2000,
                    offer_fee: 1000,
                    current_fee: 1000,
                    least_people: 3,
                    buyers: 10,
                    max_people: null,
                    l_start_time: '2020-06-15 09:00:00',
                    l_end_time: null,
                    cancel_lesson: 0,
                    cancel_lesson_init: 0,
                    deadline: 999,
                    apply_situation: 'success',
                    t_id: 1,
                    t_name: '余丹尼',
                    t_nickname: '丹尼老師傅',
                    t_avg_img: _TMP_AVG_IMG,
                    owned: 2,
                    favorite: 1,
                    orderDeadline: '2019-12-01'
                },
                // 尚未確定, 人數達標, 原價, 「確定開班 再 X 天上課」
                {
                    l_id: 4,
                    type: 'entity',
                    cover: '162763b60b5293feb6f2226ee7d865b4.jpg',
                    l_name: '確定開班 再 X 天上課',
                    end_fund: '2020-06-09 09:00:00',
                    start_time: '2020-06-10 09:00:00',
                    location: '台北市大安區',
                    origin_fee: 2000,
                    offer_fee: 1000,
                    current_fee: 2000,
                    least_people: 3,
                    buyers: 3,
                    max_people: 10,
                    l_start_time: '2020-06-15 09:00:00',
                    l_end_time: '2020-07-15 09:00:00',
                    cancel_lesson: 0,
                    cancel_lesson_init: 1,
                    deadline: 999,
                    apply_situation: 'success',
                    t_id: 1,
                    t_name: '余丹尼',
                    t_nickname: '丹尼老師傅',
                    t_avg_img: _TMP_AVG_IMG,
                    favorite: 1
                },
                // 「取消開班」
                {
                    l_id: 5,
                    type: 'entity',
                    cover: '162763b60b5293feb6f2226ee7d865b4.jpg',
                    l_name: '「取消開班」',
                    end_fund: '2019-06-09 09:00:00',
                    start_time: '2020-06-10 09:00:00',
                    location: '台北市大安區',
                    origin_fee: 2000,
                    offer_fee: 1000,
                    current_fee: 2000,
                    least_people: 2,
                    buyers: 3,
                    max_people: 10,
                    l_start_time: '2020-06-15 09:00:00',
                    l_end_time: '2020-07-15 09:00:00',
                    cancel_lesson: 1,
                    cancel_lesson_init: 1,
                    deadline: 999,
                    apply_situation: 'success',
                    t_id: 1,
                    t_name: '余丹尼',
                    t_nickname: '丹尼老師傅',
                    t_avg_img: _TMP_AVG_IMG,
                    favorite: 1
                }
            ]
            new Promise((resolve, reject) => {
                setTimeout(resolve, 1000, { data, status: 0 })
            })
                .then(response => {
                    if (response.status == 0) {
                        commit('SET_DATAS', { stateName: 'myFavoriteLessons', data: response.data })
                    } else {
                        commit('DATAS_STATUS', { stateName: 'myFavoriteLessons', status: 2 })
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getMyFavoriteLessons',
                                code: response.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('DATAS_STATUS', { stateName: 'myFavoriteLessons', status: 2 })
                    commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'unknown',
                            code: e,
                            isError: true
                        },
                        { root: true }
                    )
                })
        },
        switchFavorite({ commit }, { l_id, favorite }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            return Http.post('lesson/switchFavorite', {
                l_id,
                m_id: mid,
                remember_token: rToken,
                favorite
            })
        },

        // 所有課程
        getLessons({ commit, state }, { filters, startIdx, teacherLessonsMode }) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token'),
                postData

            if (teacherLessonsMode) {
                postData = {
                    startIndex: 0
                }
            } else {
                if (startIdx == 0) {
                    // 剛設 filter，第一 load
                    commit('LOAD_DATAS_INIT', 'allLessons')
                } else {
                    // scroll load
                    commit('DATAS_STATUS', { stateName: 'allLessons', status: 1 })
                }
                postData = {
                    startIndex: startIdx,
                    limitNum: JS_CONFIG.LESSONS_PER_LOAD
                }

                if (filters.price != 0) {
                    postData.pay_type = filters.price
                }
                let prices = ['全部', '付費', '免費']
                try {
                    gtag('event', 'filter', {
                        event_category: 'all lesson price filter',
                        event_action: 'filter',
                        event_label: prices[filters.price]
                    })
                } catch (e) {}

                if (filters.type != 0) {
                    postData.type = filters.type
                }
                let types = ['全部', '線上', '實體']
                try {
                    gtag('event', 'filter', {
                        event_category: 'all lesson type filter',
                        event_action: 'filter',
                        event_label: types[filters.type]
                    })
                } catch (e) {}

                if (filters.areas.length) {
                    postData.areas = filters.areas

                    try {
                        filters.areas.forEach(a => {
                            gtag('event', 'filter', {
                                event_category: 'all lesson area filter',
                                event_action: 'filter',
                                event_label: a
                            })
                        })
                    } catch (e) {}
                }

                if (filters.topicLabels.length) {
                    postData.topicLabels = filters.topicLabels

                    try {
                        filters.topicLabels.forEach(tl => {
                            gtag('event', 'filter', {
                                event_category: 'all lesson category filter',
                                event_action: 'filter',
                                event_label: tl.topic + '/' + tl.label
                            })
                        })
                    } catch (e) {}
                }
            }
            if (m_id) {
                postData.m_id = m_id
                postData.remember_token = rToken
            }

            if (filters.keyword) {
                postData.keyword = filters.keyword

                try {
                    gtag('event', 'filter', {
                        event_category: 'all lesson keyword filter',
                        event_action: 'filter',
                        event_label: filters.keyword
                    })
                } catch (e) {}
            }

            if (filters.startTime) {
                postData.rangeStartTime = COMMON_UTILITY.dateObject2DateString(
                    filters.startTime,
                    '-'
                )
            }
            if (filters.endTime) {
                postData.rangeEndTime = COMMON_UTILITY.dateObject2DateString(filters.endTime, '-')
            }

            /* if (filters.success != 0) {
                postData.cancel_lesson = filters.success == 1 ? 0 : 2
            } */

            if (filters.teachers.length) {
                postData.teachers = filters.teachers

                try {
                    filters.teachers.forEach(t => {
                        gtag('event', 'filter', {
                            event_category: 'all lesson teacher filter',
                            event_action: 'filter',
                            event_label: t
                        })
                    })
                } catch (e) {}
            }

            return Http.post('lesson/getLessons', postData)
        },

        getTeacherLessons({ commit, state }, { t_id, public_only }) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                remember_token = COOKIE_KIT.getCookie('r_token'),
                postData = { t_id, m_id, remember_token }

            if (public_only) {
                postData.public_only = public_only
            }

            return Http.post('lesson/getTeacherLessons', postData)
        },
        deleteLesson({ commit }, l_id) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                remember_token = COOKIE_KIT.getCookie('r_token')

            return Http.post('lesson/deleteLesson', { l_id, m_id, remember_token })
        },
        getLessonDetail({ commit }, l_id) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            commit('LOAD_LESSON_DETAIL_INIT')
            return Http.post('lesson/getLessonDetail', { m_id, remember_token: rToken, l_id })
        },

        getLessonUnitDetail({ commit }, { l_id, mode }) {
            let data = {
                mode,
                l_id
            }

            if (mode) {
                // 教室
                data.m_id = COOKIE_KIT.getCookie('m_id')
                data.remember_token = COOKIE_KIT.getCookie('r_token')
            }

            commit('LOAD_DATAS_INIT', 'lessonUnitDetail')
            return Http.post('lesson/getLessonUnitDetail', data)
        },
        getLessonShopQA({ commit }, { l_id, area }) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            commit('LOAD_DATAS_INIT', 'lessonShopQA')
            Http.post('lesson/getLessonShopQA', { m_id, remember_token: rToken, l_id, area })
                .then(response => {
                    if (response.data.status == 0) {
                        commit('SET_DATAS', { stateName: 'lessonShopQA', data: response.data.data })
                    } else {
                        commit('DATAS_STATUS', { stateName: 'lessonShopQA', status: 2 })
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getLessonShopQA',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('DATAS_STATUS', { stateName: 'lessonShopQA', status: 2 })
                    commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'unknown',
                            code: e,
                            isError: true
                        },
                        { root: true }
                    )
                })
        },
        sendLessonShopQA({ commit }, postData) {
            postData.m_id = COOKIE_KIT.getCookie('m_id')
            postData.remember_token = COOKIE_KIT.getCookie('r_token')

            commit('LOAD_DATAS_INIT', 'lessonShopQA')
            return Http.post('lesson/sendLessonShopQA', postData)
        },
        getLessonClassmates({ commit }, l_id) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')
            commit('LOAD_DATAS_INIT', 'lessonClassmates')

            return Http.post('lesson/getLessonClassmates', { l_id, m_id, remember_token: rToken })
        },
        getLessonClassmates1({ commit }, l_id) {
            commit('LOAD_DATAS_INIT', 'lessonClassmates')

            let data = [
                {
                    m_id: 1,
                    m_name: 'aaaaa',
                    nickname: '暱稱阿',
                    cellphone: '0910279930',
                    email: 'aaaaaa@aaaaa.aaa',
                    buy_times: 1
                },
                {
                    m_id: 2,
                    m_name: 'bbbb',
                    nickname: '暱稱阿',
                    cellphone: '0910379930',
                    email: 'bbb@aaaaa.aaa',
                    buy_times: 2
                },
                {
                    m_id: 3,
                    m_name: 'ccc cccc ccc cccc cccc ccccc',
                    nickname: '暱稱阿',
                    cellphone: '0911279930',
                    email: 'ccccccccccccc@aaaaaaaa.aaaaaaaaaaaaaa',
                    buy_times: 1
                },
                {
                    m_id: 4,
                    m_name: 'ddddd ddd',
                    nickname: '暱稱阿',
                    cellphone: '0912279930',
                    email: 'ddd@aaaaa.aaa',
                    buy_times: 3
                }
            ]

            return new Promise((resolve, reject) => {
                setTimeout(resolve, 1500, { data, status: 0 })
            })
        },
        getLessonCoupon({ commit }, lid) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token')
            console.log('lesson.js getLessonCoupon: lid', lid, 'mid', mid, 'r_token', r_token)

            let data = [
                {
                    cp_id: 1,
                    code: '8A5B66',
                    creator: 'AAAAA',
                    l_id: lid,
                    expire_time: '2019-09-30',
                    object: 'all',
                    price: 500,
                    situation: true,
                    created_at: '2019-08-06',
                    updated_at: '2019-08-06'
                },
                {
                    cp_id: 2,
                    code: '8A5B66',
                    creator: 'AAAAA',
                    l_id: lid,
                    expire_time: '2019-09-30',
                    object: 'all',
                    price: 500,
                    situation: false,
                    created_at: '2019-08-06',
                    updated_at: '2019-08-06'
                }
            ]
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 500, { data, status: 0 })
            })
        },
        getLessonCoupon1({ commit }, lid) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token')
            console.log('lesson.js getLessonCoupon: lid', lid, 'mid', mid, 'r_token', r_token)

            let data = [
                {
                    code: '8A5B66',
                    price: 300
                },
                {
                    code: '8A5B67',
                    price: 400
                }
            ]
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 500, { data, status: 0 })
            })
        },
        postLessonCoupon({ commit }, { lid, object, expire_time, price }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token')

            return new Promise((resolve, reject) => {
                setTimeout(resolve, 500, { status: 0 })
            })
        },
        setLessonCouponStatus({ commit }, cp_id) {
            console.log('setLessonCouponStatus cp_id', cp_id)

            return new Promise((resolve, reject) => {
                setTimeout(resolve, 1000, { status: 0 })
                // setTimeout(reject, 500, 3)
            })
        },
        checkLessonCoupon({ commit }, { lid, code }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token')

            return new Promise((resolve, reject) => {
                setTimeout(resolve, 1000, { data: 600, status: 0 })
                // setTimeout(reject, 500, 3)
            })
        },
        getAreas({ commit }, aid) {
            commit('LOAD_DATAS_INIT', 'areas')
            Http.post('lesson/getAreas')
                .then(response => {
                    if (response.data.status == 0) {
                        let withOthers = false,
                            snapshot = response.data.data.filter(area => {
                                if (area.substr(0, 2) == '其他') {
                                    withOthers = true
                                    return false
                                } else {
                                    return true
                                }
                            })
                        if (withOthers) {
                            snapshot.push('其他')
                        }
                        commit('SET_DATAS', { stateName: 'areas', data: snapshot })
                    } else {
                        commit('DATAS_STATUS', { stateName: 'areas', status: 2 })
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getAreas',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('DATAS_STATUS', { stateName: 'areas', status: 2 })
                })
        },
        getTopicLabels({ commit }) {
            commit('LOAD_DATAS_INIT', 'topicLabels')
            return Http.post('lesson/getTopicLabels')
        },

        recordVideoWatched({ commit }, { u_id, c_id, watched }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token')

            console.warn(
                'recordVideoWatched',
                'u_id',
                u_id,
                'watched',
                watched,
                'c_id',
                c_id,
                'mid',
                mid,
                'r_token',
                r_token
            )
            console.warn('攝影展閹割')
            new Promise((resolve, reject) => {
                setTimeout(resolve, 0, { status: 0 })
            })
        }
    },
    getters: {
        recentLessonsLoadComplete: state => state.recentLessons.loadStatus == 3,
        monthHotLessonsLoadComplete: state => state.monthHotLessons.loadStatus == 3,
        recentFreeLessonsLoadComplete: state => state.recentFreeLessons.loadStatus == 3,
        recentEntityLessonsLoadComplete: state => state.recentEntityLessons.loadStatus == 3,
        recentOnlineLessonsLoadComplete: state => state.recentOnlineLessons.loadStatus == 3,

        lessonDetail: state => state.lessonDetail.data,
        lessonDetailLoadComplete: state => state.lessonDetail.loadStatus == 3,
        lessonDetailLessonName: state => state.lessonDetail.data.l_name,
        lessonDetailMainMediaIIsImg: state =>
            state.lessonDetail.data.media.match(/(jpg|jpeg|png|gif)$/i), // 主圖是否違圖片（非宣傳影片）
        lessonDetailCover: state =>
            JS_CONFIG.MEDIA_PATH.replace('LESSON_ID', state.lessonDetail.data.l_id) +
            state.lessonDetail.data.cover, // 封面 path
        lessonDetailMainVideoSrc: state =>
            state.lessonDetail.data.media
                ? JS_CONFIG.MEDIA_PATH.replace('LESSON_ID', state.lessonDetail.data.l_id) +
                  state.lessonDetail.data.media
                : '', // 宣傳影片 path
        lessonDetailHasOriginFee: state => {
            let lessonDetailData = state.lessonDetail.data
            return lessonDetailData.current_fee != lessonDetailData.origin_fee
        }, // 是否特價、原價不同
        lessonDetailIsOtherArea: state => state.lessonDetail.data.location.substr(0, 2) === '其他', // 地區是否為其他
        lessonDetailArea: state => {
            let loca = state.lessonDetail.data.location,
                isOtherArea

            if (loca) {
                isOtherArea = loca.substr(0, 2) === '其他'
                return loca ? (isOtherArea ? '其他' : loca.substr(0, 3)) : ''
            } else {
                return ''
            }
        }, // 地區
        lessonDetailLocation: state => {
            let loca = state.lessonDetail.data.location,
                isOtherArea

            if (loca) {
                isOtherArea = loca.substr(0, 2) === '其他'
                return loca ? (isOtherArea ? loca.substr(2, loca.length - 2) : loca) : ''
            } else {
                return ''
            }
        }, // 地址
        lessonDetailFullLocation: state => {
            let loca = state.lessonDetail.data.location,
                isOtherArea,
                location = ''

            if (loca) {
                isOtherArea = loca.substr(0, 2) === '其他'
                location = loca ? (isOtherArea ? loca.substr(2, loca.length - 2) : loca) : ''
            }
            return (
                location +
                (state.lessonDetail.data.location_note
                    ? '（' + state.lessonDetail.data.location_note + '）'
                    : '')
            )
        }, // 完整地址（帶地點備註）
        lessonDetailIsEntityLesson: state => state.lessonDetail.data.type == 'entity', // 實體課
        lessonDetailIsOnlineLesson: state => state.lessonDetail.data.type == 'online', // 實體課
        lessonDetailNotFree: state => state.lessonDetail.data.current_fee > 0, // 非免費課
        lessonDetailIsStartedEntityLesson: state =>
            state.lessonDetail.data.type == 'entity' &&
            COMMON_UTILITY.isPast(state.lessonDetail.data.start_time), // 實體課超過開課日
        lessonDetailIsStillFunding: state =>
            !COMMON_UTILITY.isPast(state.lessonDetail.data.end_fund, true), // 募資中
        lessonDetailIsFulledEntityLesson: state =>
            state.lessonDetail.data.type == 'entity' &&
            state.lessonDetail.data.buyers >= state.lessonDetail.data.max_people, // 額滿的實體課
        lessonShopQALoadComplete: state => state.lessonShopQA.loadStatus == 3,
        lessonFavoriteStatus: state => lid => {
            return state.myFavoriteLessons.data.find(lesson => {
                return lesson.l_id == lid
            }).favorite
        },
        lessonShopQA: state => state.lessonShopQA.data,

        myFavoriteLessonsLoadCompleted: state => state.myFavoriteLessons.loadStatus == 3,
        myFavoriteLesson: state => state.myFavoriteLessons.data,

        myLessonsData: state => state.myLessons.data,
        myEntityLessons: state =>
            state.myLessons.data.filter(l => {
                return l.type == 'entity'
            }),
        myLessonsLoadStatus: state => state.myLessons.loadStatus,
        myLessonsLoadComplete: state => state.myLessons.loadStatus == 3,

        lessonClassmates: state => state.lessonClassmates.data,
        lessonClassmatesLoadCompleted: state => state.lessonClassmates.loadStatus == 3,

        areas: state => state.areas.data,
        areasloadStatus: state => state.areas.loadStatus,

        topicLabelsData: state => state.topicLabels.data,
        topicLabelsLoadStatus: state => state.topicLabels.loadStatus
    },
    mutations: {
        LOAD_DATAS_INIT(state, stateName) {
            state[stateName] = {
                data: [],
                loadStatus: 1
            }
        },
        DATAS_STATUS(state, { stateName, status }) {
            state[stateName].loadStatus = status
        },
        SET_DATAS(state, { stateName, data }) {
            state[stateName] = {
                data: data,
                loadStatus: 3
            }
        },
        CLEAN_DATAS(state, stateName) {
            state[stateName] = {
                data: [],
                loadStatus: 0
            }
        },

        LOAD_PROMOTING_DATAS_INIT(state, stateName) {
            state[stateName] = {
                data: [],
                loadStatus: 1,
                loadTimestamp: null
            }
        },

        INIT_ALL_PROMOTING_DATAS(state) {
            let stateNames = [
                'recentLessons',
                'monthHotLessons',
                'recentFreeLessons',
                'recentEntityLessons',
                'recentOnlineLessons'
            ]
            stateNames.forEach(name => {
                state[name] = {
                    data: [],
                    loadStatus: 0,
                    loadTimestamp: null
                }
            })
        },

        SET_PROMOTING_DATAS(state, { stateName, data }) {
            state[stateName] = {
                data: data,
                loadStatus: 3,
                loadTimestamp: new Date().getTime()
            }
        },

        PUSH_LESSONS(state, { stateName, data }) {
            data.forEach(item => {
                state[stateName].data.push(item)
            })
            state[stateName].loadStatus = 3
        },
        FAVORITE(state, { lid, favorite, shopMode }) {
            if (shopMode) {
                state.lessonDetail.data.favorite = favorite
            } else {
                state.myFavoriteLessons.data.find((lesson, i) => {
                    return lesson.l_id == lid
                }).favorite = favorite
            }
        },
        LOAD_LESSON_DETAIL_INIT(state) {
            state.lessonDetail = {
                data: {},
                loadStatus: 1
            }
        }
    }
}
