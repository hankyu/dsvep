import { EventBus } from '../event-bus.js'
import Http from '../http'
import { COOKIE_KIT } from '../class/cookieKit'

export const member = {
    strict: true,
    namespaced: true,
    state() {
        return {
            /* memberData: {},
            memberLoadStatus: 0, // 0: 未載  1: 載入中, 卸載中   2: 載入失敗  3: 載成功 */
            memberData: {
                data: {},
                loadStatus: 0 // 0: 未載  1: 載入中, 卸載中   2: 載入失敗  3: 載成功 */
            },
            memberFullData: {
                data: {},
                loadStatus: 0 // 0: 未載  1: 載入中, 卸載中   2: 載入失敗  3: 載成功
            }
        }
    },

    actions: {
        signUp({ commit }, { acc, psw, name, email }) {
            return Http.post('member/signUp', { account: acc, password: psw, name, email })
        },
        login({ commit, dispatch }, payload) {
            commit('INIT_MEMBER_LOAD', 'memberData')

            return Http.post('member/login', payload)
        },
        checkLogined({ commit }, { mid, rToken }) {
            return Http.post('member/checkLogin', { m_id: mid, remember_token: rToken })
        },

        logout({ commit }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/logout', { m_id: mid, remember_token: rToken })
        },

        getMemberDetail() {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                remember_token = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/getMemberDetail', { m_id, remember_token })
        },

        sendEmailVerification({}, email) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                remember_token = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/sendEmailVerification', { m_id, remember_token, email })
        },
        uploadAvatar({ commit }, formData) {
            formData.append('m_id', COOKIE_KIT.getCookie('m_id'))
            formData.append('remember_token', COOKIE_KIT.getCookie('r_token'))

            return Http.post('member/uploadAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },

        saveUserData({ commit }, postData) {
            postData.m_id = COOKIE_KIT.getCookie('m_id')
            postData.remember_token = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/updateMemberData', postData)
        },

        updatePassword({ commit }, postData) {
            postData.m_id = COOKIE_KIT.getCookie('m_id')
            postData.remember_token = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/updatePassword', postData)
        },

        updateBankInfo({ commit }, postData) {
            postData.m_id = COOKIE_KIT.getCookie('m_id')
            postData.remember_token = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/updateBankInfo', postData)
        },

        updateDataForTeacher({ commit }, postData) {
            postData.m_id = COOKIE_KIT.getCookie('m_id')
            postData.remember_token = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/updateDataForTeacher', postData)
        },
        getLessonPermission({ commit }, { mid, lid, mode }) {
            let rToken = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/getLessonPermission', {
                m_id: mid,
                remember_token: rToken,
                l_id: lid,
                mode
            })
        },
        getPlainPassword({ commit }, data) {
            return Http.post('member/getPlainPassword', data)
        },
        getPhoneVerificationCodeTime({ commit }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/getPhoneVerificationCodeTime', {
                m_id: mid,
                remember_token: rToken
            })
        },
        getPhoneVerificationCode({ commit }, phone) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/getPhoneVerificationCode', {
                m_id: mid,
                remember_token: rToken,
                cellphone: phone
            })
        },
        checkPhoneVerificationCode({ commit }, code) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            return Http.post('member/checkPhoneVerificationCode', {
                m_id: mid,
                remember_token: rToken,
                code
            })
        },
        contactUs({ commit }, { subject, name, phone, email, content }) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 500, { status: 0 })
            })
                .then(response => {
                    if (response.status == 0) {
                        commit('alert/SHOW_COMPLETE_ALERT', '成功寄出', { root: true })
                        EventBus.$emit('close-contact-us')
                    } else {
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'sendContactEmail',
                                code: response.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
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
        searchMember({ commit }, email) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            let data = [
                {
                    m_id: 1,
                    m_name: '某某某',
                    nickname: '某',
                    email: 'aaaaaaaaaaaaaaaaaaaaa@aaaaaaaaa.aaaaa',
                    cellphone: '0912345678'
                },
                {
                    m_id: 2,
                    m_name: '某某某某某某某某某',
                    nickname: '某某某某某某某',
                    email: 'bbbb@bbb.bbb',
                    cellphone: '0912345678'
                }
            ]
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 500, { data, status: 0 })
            })
        }
    },

    getters: {
        isLoginedMember(state) {
            return state.memberData.data.m_id != null
        },
        isWorker(state) {
            return state.memberData.data.role && state.memberData.data.role & 2 ? true : false
        },
        isTeacher(state) {
            return state.memberData.data.role & 16 ? true : false
        },
        memberData(state) {
            return state.memberData.data
        },
        memberLoadStatus(state) {
            return state.memberData.loadStatus
        },
        memberId(state) {
            return state.memberData.data.m_id || null
        },
        memberAccount(state) {
            return state.memberData.data.account
        },
        memberTid(state) {
            return state.memberData.data.t_id || null
        },
        memberName(state) {
            return state.memberData.data.nickname || ''
        },
        cellphoneVerifyStatus(state) {
            return state.memberData.data.cellphone_verify_status
        },

        memberFullData(state) {
            return state.memberFullData.data
        },
        memberFullDataLoadCompleted(state) {
            return state.memberFullData.loadStatus == 3
        },
        isGoogleLogin(state) {
            return state.memberData.data.reg_method == 'google'
        }
    },

    mutations: {
        INIT_MEMBER_LOAD(state, name) {
            state[name].data = {}
            state[name].loadStatus = 1
        },
        SET_MEMBER_LOAD_STATUS(state, { name, status }) {
            state[name].loadStatus = status
        },
        SET_MEMBER_DATA(state, { name, data }) {
            state[name].data = data
            state[name].loadStatus = 3
        },
        CLEAN_MEMBER_DATA(state, name) {
            state[name].data = {}
            state[name].loadStatus = 0
        },

        SET_CELLPHONE(state, phone) {
            state.memberFullData.data.cellphone = phone
        },
        SWITCH_CELLPHONE_VERIFY_STATUS(state, status) {
            state.memberFullData.data.cellphone_verify_status = status
        },
        SET_EMAIL(state, email) {
            state.memberFullData.data.email = email
        },
        UPDATE_MEMBER_SINGLE_DATA(state, { name, val }) {
            state.memberData.data[name] = val
            state.memberData.data = state.memberData.data
        }
    }
}
