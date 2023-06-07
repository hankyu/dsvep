import Http from '../http'
import { JS_CONFIG } from '../config.js'
import { COOKIE_KIT } from '../class/cookieKit'

export const teacher = {
    strict: true,
    namespaced: true,
    state() {
        return {
            teachers: {
                data: [],
                loadStatus: 0
            },
            teacherDetail: {
                data: {},
                loadStatus: 0
            },
            lessonShopTeacher: {
                data: {},
                loadStatus: 0
            }
        }
    },
    actions: {
        getTeachers({ commit }, { startIdx, mode, asc, loadAll }) {
            let postData = {
                mode,
                asc: 0
            }
            if (!loadAll) {
                postData.start_index = startIdx
                postData.limit_num = JS_CONFIG.TEACHERS_PER_LOAD
            }
            if (!startIdx) {
                commit('INIT_TEACHERS')
            }
            commit('SET_TEACHERS_LOAD_STATUS', 1)
            return Http.post('teacher/getTeachers', postData)
        },
        applyForTeacher({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 1500, { data: true, status: 0 })
            })
        },
        getTeacherDetail({ commit }, t_id) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                remember_token = COOKIE_KIT.getCookie('r_token')

            commit('INIT_DETAIL_LOAD_STATUS', 'teacherDetail')

            return Http.post('teacher/getTeacherDetail', { t_id, m_id, remember_token })
        },

        getTeacher({ commit }, l_id) {
            commit('INIT_DETAIL_LOAD_STATUS', 'lessonShopTeacher')

            Http.post('teacher/getTeacher', { l_id })
                .then(response => {
                    if (response.data.status == 0) {
                        commit('SET_DETAIL', {
                            stateName: 'lessonShopTeacher',
                            data: response.data.data
                        })
                    } else {
                        commit('SET_DETAIL_LOAD_STATUS', {
                            stateName: 'lessonShopTeacher',
                            status: 2
                        })
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getTeacherDetail',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('SET_DETAIL_LOAD_STATUS', { stateName: 'lessonShopTeacher', status: 2 })

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
        updateTeacherDetail({ commit }, postData) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                remember_token = COOKIE_KIT.getCookie('r_token')

            postData.m_id = m_id
            postData.remember_token = remember_token

            return Http.post('teacher/updateTeacherDetail', postData)
        },
        updatePortfolios({ commit }, postData) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                remember_token = COOKIE_KIT.getCookie('r_token')

            postData.m_id = m_id
            postData.remember_token = remember_token

            return Http.post('teacher/updatePortfolios', postData)
        }
    },
    getters: {
        lessonShopTeacherLoadCompleted: state => state.lessonShopTeacher.loadStatus == 3,
        lessonShopTeacher: state => state.lessonShopTeacher.data,
        lessonShopTeacherMid: state => state.lessonShopTeacher.data.m_id,
        lessonShopTeacherFullName: state => {
            if (state.lessonShopTeacher.loadStatus == 3) {
                return (
                    state.lessonShopTeacher.data.nickname +
                    (state.lessonShopTeacher.data.m_name
                        ? ' (' + state.lessonShopTeacher.data.m_name + ')'
                        : '')
                )
            } else {
                return ''
            }
        },
        lessonShopTeacherAvatarImgSrc: state => state.lessonShopTeacher.data.avg_img,

        teacherDetail: state => state.teacherDetail.data,
        teacherDetailLoadCompleted: state => state.teacherDetail.loadStatus == 3,
        teacherDetailFullName: state =>
            state.teacherDetail.data.nickname +
            (state.teacherDetail.data.m_name ? '(' + state.teacherDetail.data.m_name + ')' : ''),

        teachers: state => state.teachers.data,
        teachersLoadStatus: state => state.teachers.loadStatus
    },
    mutations: {
        SET_TEACHERS_LOAD_STATUS(state, status) {
            state.teachers.loadStatus = status
        },
        SET_TEACHERS(state, data) {
            state.teachers.data = data
            state.teachers.loadStatus = 3
        },
        INIT_TEACHERS(state) {
            state.teachers = { data: [], loadStatus: 0 }
        },
        PUSH_TEACHERS(state, data) {
            data.forEach(item => {
                state.teachers.data.push(item)
            })
            state.teachers.loadStatus = 3
        },
        INIT_DETAIL_LOAD_STATUS(state, stateName) {
            state[stateName] = {
                data: {},
                loadStatus: 0
            }
        },
        SET_DETAIL_LOAD_STATUS(state, { stateName, status }) {
            state[stateName].loadStatus = status
        },
        SET_DETAIL(state, { stateName, data }) {
            state[stateName] = {
                data: data,
                loadStatus: 3
            }
        }
    }
}
