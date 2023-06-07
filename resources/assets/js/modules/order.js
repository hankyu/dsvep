import Http from '../http'
import { COOKIE_KIT } from '../class/cookieKit'

export const order = {
    strict: true,
    namespaced: true,
    state() {
        return {
            orders: {
                data: [],
                loadStatus: 0
            },
            buyFreeStatus: 0, // 0: init, 1: buying, 2: failed
            cancelOrderStatus: 0 // 0: init, 1 canceling, 2: failed
        }
    },
    actions: {
        getOrders({ commit }) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            commit('LOAD_ORDER_INIT')

            /* axios({
                method: 'post',
                url: 'order/getOrders',
                data: { m_id, remember_token: rToken },
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                }
            }) */
            Http.post('order/getOrders', { m_id, remember_token: rToken })
                .then(response => {
                    if (response.data.status == 0) {
                        let snapshot = response.data.data
                        snapshot.forEach(elm => {
                            if (elm.checkout_time) {
                                elm.filter = 1
                            } else if (elm.delete_time) {
                                elm.filter = 2
                            } else {
                                elm.filter = 0
                            }
                        })
                        commit('SET_ORDERS', snapshot)
                    } else {
                        commit('SET_ORDER_LOAD_STATUS', 2)
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getOrders',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('SET_ORDER_LOAD_STATUS', 2)

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
        buyFreeLesson({ commit }, l_id) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            commit('SET_STATUS', { name: 'buyFreeStatus', status: 1 })

            /* return axios({
                method: 'post',
                url: 'order/buyFreeLesson',
                data: { l_id, m_id, remember_token: rToken },
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                }
            }) */
            return Http.post('order/buyFreeLesson', { l_id, m_id, remember_token: rToken })
        },
        cancelOrder({ commit }, id) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')

            commit('SET_STATUS', { name: 'cancelOrderStatus', status: 1 })

            /* return axios({
                method: 'post',
                url: 'order/cancelOrder',
                data: { id, m_id, remember_token: rToken },
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                }
            }) */
            return Http.post('order/cancelOrder', { id, m_id, remember_token: rToken })
        },
        cancelLessonExistedOrder({ commit }, l_id) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                rToken = COOKIE_KIT.getCookie('r_token')
            /* return axios({
                method: 'post',
                url: 'order/cancelLessonExistedOrder',
                data: { l_id, m_id, remember_token: rToken },
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                }
            }) */
            return Http.post('order/cancelLessonExistedOrder', {
                l_id,
                m_id,
                remember_token: rToken
            })
        }
    },
    getters: {
        ordersData: state => state.orders.data,
        ordersLoadCompleted: state => state.orders.loadStatus == 3
    },
    mutations: {
        LOAD_ORDER_INIT(state) {
            state.orders = {
                data: [],
                loadStatus: 1
            }
        },
        SET_ORDER_LOAD_STATUS(state, status) {
            state.orders.loadStatus = status
        },
        SET_ORDERS(state, data) {
            state.orders = {
                data: data,
                loadStatus: 3
            }
        },
        SET_BUY_FREE_STATUS(state, status) {
            state.buyFreeStatus = status
        },

        SET_STATUS(state, { name, status }) {
            state[name] = status
        }
    }
}
