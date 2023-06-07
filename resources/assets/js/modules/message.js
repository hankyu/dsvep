import firebase from 'firebase/app'

// These imports load individual services into the firebase namespace.
import 'firebase/auth'
import 'firebase/database'

import { firebaseModule } from '../class/firebaseModule'
let firebaseUtil = firebaseModule()
import { COMMON_UTILITY } from '../class/commonUtility'
import { resolve } from 'q'

export const message = {
    strict: true,
    namespaced: true,
    state() {
        return {
            messages: {
                data: [],
                loadStatus: 0
            },
            unread: 0
        }
    },
    actions: {
        getRealTimeMessage({ commit, rootState }) {
            let path = firebaseUtil.getPath('message'),
                acc = rootState.member.memberData.data.account

            firebaseUtil.getRef(path).on('value', snapshot => {
                let data = snapshot.val(),
                    unread = 0,
                    effectiveData = {}

                _.forIn(data, (value, dialogName) => {
                    if (dialogName.split(',').indexOf(acc) != -1) {
                        let currDialog = (effectiveData[dialogName] = value),
                            tokens = Object.keys(currDialog)

                        tokens.reverse()

                        tokens.some(token => {
                            let currDialogObj = currDialog[token]

                            if (currDialogObj.read == 'unread') {
                                unread++
                                return false
                            } else {
                                return true
                            }
                        })
                    }
                })
                commit('SET_MESSAGES', effectiveData)
                commit('SET_UNREAD', unread)
            })
        },

        readedMessage({ commit }, { dialogName, token, data }) {
            let path = firebaseUtil.getPath('message') + '/' + dialogName + '/' + token,
                newData = JSON.parse(JSON.stringify(data))

            newData.read = 'read'
            firebaseUtil.update(path, newData)
        },

        sendMessage({ commit }, { data, systemMsg }) {
            let from = data.from,
                to = data.to,
                dialog = from > to ? from + ',' + to : to + ',' + from,
                path = firebaseUtil.getPath('message') + '/' + dialog

            data.time = COMMON_UTILITY.getNowTimeString()
            data.read = systemMsg ? 'unread' : 'read'
            return firebaseUtil.push(path, data)
        }
    },
    getters: {
        messages(state) {
            return state.messages.data
        },
        messagesLoadCompleted(state) {
            return state.messages.loadStatus == 3
        }
    },
    mutations: {
        INIT_FIREBASE() {
            firebaseUtil.initFirebase(firebase)
        },
        LOAD_MESSAGE_INIT(state) {
            state.messages = {
                data: [],
                loadStatus: 1
            }
            state.unread = 0
        },
        CLEAR_MESSAGE(state) {
            state.messages = {
                data: [],
                loadStatus: 0
            }
            state.unread = 0
        },
        SET_MESSAGE_LOAD_STATUS(state, status) {
            state.messages.loadStatus = status
        },
        SET_MESSAGES(state, data) {
            state.messages = {
                data: data,
                loadStatus: 3
            }
        },
        SET_UNREAD(state, unread) {
            state.unread = unread
        }
    }
}
