import Http from '../http'
import { COOKIE_KIT } from '../class/cookieKit'

export const wish = {
    strict: true,
    namespaced: true,
    state() {
        return {
            myWishes: {
                data: [],
                loadStatus: 0
            }
        }
    },
    actions: {
        getMyWishes({ commit }) {
            let m_id = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token')

            commit('LOAD_WISHES_INIT')
            Http.post('wish/getMyWishes', { m_id, remember_token: r_token })
                .then(response => {
                    if (response.data.status == 0) {
                        let snapshot = response.data.data
                        snapshot.forEach(elm => {
                            elm.imgs = []
                        })
                        commit('SET_WISHES', snapshot)
                    } else {
                        commit('SET_WISHES_STATUS', 2)
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getMyWishes',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit('SET_WISHES_STATUS', 2)

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
        getImages({ commit }, { album, wishIdx }) {
            Http.post('wish/getWishImage', { album: album })
                .then(respose => {
                    if (respose.data.status == 0) {
                        commit('SET_WISH_IMG', { data: respose.data.data, idx: wishIdx })
                    } else {
                        commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getMyWishesImages',
                                code: respose.data.status,
                                isError: true,
                                notApi: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'getMyWishesImages',
                            code: e,
                            isError: true,
                            notApi: true
                        },
                        { root: true }
                    )
                })
        },
        postMyWish({ commit }, { title, goal, content, categorys, image_files }) {
            let mid = COOKIE_KIT.getCookie('m_id'),
                r_token = COOKIE_KIT.getCookie('r_token'),
                postData = {
                    m_id: mid,
                    remember_token: r_token,
                    title,
                    goal,
                    content,
                    categorys,
                    image_files: []
                }

            image_files.forEach(fileSrc => {
                postData.image_files.push(fileSrc.slice(22))
            })

            try {
                category.forEach(function(elm) {
                    gtag('event', 'wishing', {
                        event_category: 'wishing category',
                        event_action: 'wishing',
                        event_label: elm
                    })
                })
            } catch (e) {}

            return Http.post('wish/postMyWish', postData)
        }
    },
    getters: {
        myWishesLoadCompleted: state => state.myWishes.loadStatus == 3,
        myWishes: state => state.myWishes.data
    },
    mutations: {
        LOAD_WISHES_INIT(state) {
            state.myWishes = {
                data: [],
                loadStatus: 1
            }
        },
        SET_WISHES(state, data) {
            state.myWishes = {
                data: data,
                loadStatus: 3
            }
        },
        SET_WISHES_STATUS(state, status) {
            state.myWishes.loadStatus = status
        },
        SET_WISH_IMG(state, { data, idx }) {
            state.myWishes.data[idx].imgs = data
        }
    }
}
