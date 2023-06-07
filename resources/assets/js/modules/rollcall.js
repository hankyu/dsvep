import Http from '../http'
import { EventBus } from '../event-bus.js'
import { COOKIE_KIT } from '../class/cookieKit'

export const rollcall = {
    strict: true,
    namespaced: true,
    state() {
        return {
            myRollcall: {}
        }
    },
    actions: {
        getLessonRollcalls({ commit }, { l_id, studentMode }) {
            let data = { l_id }
            if (studentMode) {
                data.m_id = COOKIE_KIT.getCookie('m_id')
                data.remember_token = COOKIE_KIT.getCookie('r_token')
            }

            /* return axios({
                method: 'post',
                url: 'rollcall/getLessonRollcalls',
                data,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                }
            }) */
            return Http.post('rollcall/getLessonRollcalls', data)
        },

        getRollcallQRCode({ commit }, payload) {
            /* return axios({
                method: 'post',
                url: 'rollcall/getRollcallQRCode',
                data: payload,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                }
            }) */
            return Http.post('rollcall/getRollcallQRCode', payload)
        },
        updateRollcall({ commit }, { lid, effectiveData }) {
            let m_id = COOKIE_KIT.getCookie('m_id')

            let requests = effectiveData.map(elm => {
                elm.status = elm.status ? 1 : 0
                elm.rollcall_member = m_id
                elm.l_id = lid
                /* return axios({
                    method: 'post',
                    url: 'rollcall/updateRollcall',
                    data: elm,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                    }
                }) */
                return Http.post('rollcall/updateRollcall', elm)
            })
            Promise.all(requests).then(responses => {
                responses.forEach(response => {
                    let msg, isError
                    switch (response.data.status) {
                        case 0:
                            msg = response.data.data + '，點名成功'
                            isError = false
                            break
                        case 1:
                            msg = response.data.data + '，取消點名成功'
                            isError = false
                            break
                        case 2:
                            msg = response.data.data + '，點名失敗：無此課程。'
                            isError = true
                            break
                        case 3:
                            msg = response.data.data + '，點名失敗：無此章節。'
                            isError = true
                            break
                    }
                    commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            messageMode: true,
                            api: msg,
                            isError: isError
                        },
                        { root: true }
                    )
                })
            })
        }
    },
    getters: {
        myRollcallData(state) {
            return state.myRollcall
        },
        myRollcallDataNum(state) {
            return Object.keys(state.myRollcall).length
        }
    },
    mutations: {
        SET_MY_LESSONS_ROLLCALL(
            state,
            { lid, unit_data, unit_time, presenceTimes, rollcallTimes, presenceRate }
        ) {
            state.myRollcall[lid] = {
                unit_data,
                unit_time,
                presenceTimes,
                rollcallTimes,
                presenceRate
            }
            EventBus.$emit('check-rollcall')
        }
    }
}
