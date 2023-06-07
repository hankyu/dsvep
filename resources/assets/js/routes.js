/*
 |-------------------------------------------------------------------------------
 | routes.js
 |-------------------------------------------------------------------------------
 | Contains all of the routes for the application
 */

/**
 * Imports Vue and VueRouter to extend with the routes.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'
import { COOKIE_KIT } from './class/cookieKit'

store.commit('message/INIT_FIREBASE')

/**
 * Extends Vue to use Vue Router
 */
Vue.use(VueRouter)

function requireAuth(to, from, next) {
    let rToken, mid

    async function proceed(mid) {
        store.commit('SWITCH_PAGE_CHANGING', true)
        let memberData = store.state.member.memberData.data,
            roles = { account: 1, classroom: 1, teacher: 16, admin: 8 }
        switch (to.meta.permission) {
            case 'account':
            case 'admin':
                if (memberData && memberData.role && memberData.role & roles[to.meta.permission]) {
                    next()
                } else {
                    next('/')
                }
                break
            case 'shop':
                if (to.params.l_id) {
                    try {
                        let response = await store.dispatch('member/getLessonPermission', {
                            lid: to.params.l_id,
                            mode: 0
                        })
                        if (response.data.status == 0 && response.data.data == true) {
                            next()
                        } else if (response.data.status == 3 || response.data.status == 5) {
                            // 無此課程l_id 或 此課程尚未通過審核
                            next('/404')
                        } else {
                            next('/')
                        }
                    } catch (e) {
                        console.log('e', e)
                        next('/')
                    }
                } else {
                    next('/')
                }
                break

            case 'classroom':
                if (to.params.l_id && mid) {
                    try {
                        let response = await store.dispatch('member/getLessonPermission', {
                            mid: mid,
                            lid: to.params.l_id,
                            mode: 1
                        })
                        if (response.data.status == 0 && response.data.data == true) {
                            next()
                        } else if (response.data.status == 3 || response.data.status == 5) {
                            // 無此課程l_id 或 此課程尚未通過審核
                            next('/404')
                        } else {
                            next('/lesson/' + to.params.l_id)
                        }
                    } catch (e) {
                        console.log('e', e)
                        next('/lesson/' + to.params.l_id)
                    }
                } else if (to.params.l_id) {
                    notLogined()
                } else {
                    next('/')
                }
                break
            case 'notTeacher':
                if (
                    !store.state.member.memberData.data.role ||
                    store.state.member.memberData.data.role & 16
                ) {
                    // 沒登入 或 老師身份
                    next('/')
                } else {
                    next()
                }
                break
            default:
                // 'user'
                if (
                    to.name == 'becomeTeacherIntro' &&
                    store.state.member.memberData.data.t_id &&
                    !(store.state.member.memberData.data.role & 16)
                ) {
                    // 申請成為講師，審核中
                    next('/becometeacher')
                } else {
                    next()
                }
        }

        store.commit('SWITCH_PAGE_CHANGING', false)
    }

    async function checkLogined(mid) {
        try {
            let response = await store.dispatch('member/checkLogined', { mid, rToken })
            if (response.data.status == 0) {
                let memberData = response.data.data

                if (memberData && memberData.m_id) {
                    // 仍登入
                    store.commit('member/SET_MEMBER_DATA', { name: 'memberData', data: memberData })
                    store.dispatch('message/getRealTimeMessage')

                    if (
                        (to.name == 'becomeTeacherIntro' || to.name == 'becomeTeacher') &&
                        memberData.role & 16 &&
                        memberData.t_id
                    ) {
                        // 已經是老師，redirect 導師室
                        next('/teacher/' + memberData.t_id)
                    } else {
                        proceed(memberData.m_id)
                    }
                } else {
                    // 登入 已過期
                    notLogined()
                }
            } else {
                notLogined()
            }
        } catch (e) {
            if (!e.response || !e.response.status == 419) {
                store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        }
    }
    function notLogined() {
        store.commit('member/INIT_MEMBER_LOAD', 'memberData')

        COOKIE_KIT.deleteCookie('r_token')
        COOKIE_KIT.deleteCookie('m_id')

        if (to.meta.permission == 'user') {
            store.commit('SET_ROUTE_AFTER_LOGIN', '')
            next()
        } else {
            // 登入 session 已過期
            store.commit('SET_ROUTE_AFTER_LOGIN', to.path)
            next('/login')
        }
    }

    rToken = COOKIE_KIT.getCookie('r_token')
    mid = COOKIE_KIT.getCookie('m_id')
    if (to.name != 'login') {
        store.commit('SET_ROUTE_AFTER_LOGIN', '')
    }
    if (rToken && mid) {
        checkLogined(mid)
    } else {
        proceed()
    }
}

import Layout from './pages/Layout.vue'

/**
 * Makes a new VueRouter that we will use to run all of the routes for the app.
 */
export default new VueRouter({
    routes: [
        {
            path: '/',
            // name: '',
            component: Vue.component('Layout', Layout),
            children: [
                {
                    path: '/',
                    name: 'home',
                    // component: Vue.component('Home', Home),
                    component: () => import(/* webpackChunkName: "Home" */ './pages/Home.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },

                {
                    path: '/login',
                    name: 'login',
                    component: () =>
                        import(/* webpackChunkName: "announcement" */ './pages/Login.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },

                {
                    path: '/announcement',
                    name: 'announcement',
                    component: () =>
                        import(/* webpackChunkName: "announcement" */ './pages/Announcement.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },
                {
                    path: '/lesson/all',
                    name: 'allLesson',
                    component: () =>
                        import(/* webpackChunkName: "allLesson" */ './pages/AllLesson.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },
                {
                    path: '/lesson/:l_id',
                    name: 'lessonShop',
                    component: () =>
                        import(/* webpackChunkName: "lessonShop" */ './pages/LessonShop.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'shop'
                    }
                },
                {
                    path: '/profile/lesson/classroom/:l_id',
                    name: 'lessonClassroom',
                    component: () =>
                        import(
                            /* webpackChunkName: "lessonClassroom" */ './pages/LessonClassroom.vue'
                        ),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'classroom'
                    }
                },
                {
                    path: '/teacher/overview',
                    name: 'teacherOverview',
                    component: () =>
                        import(
                            /* webpackChunkName: "teacherOverview" */ './pages/TeacherOverview.vue'
                        ),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },
                {
                    path: '/tutorial',
                    name: 'tutorial',
                    component: () =>
                        import(/* webpackChunkName: "tutorial" */ './pages/Tutorial.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },
                {
                    path: '/profile/rollcall-report',
                    name: 'myRollcall',
                    component: () =>
                        import(
                            /* webpackChunkName: "myRollcallReport" */ './pages/MyRollcallReport.vue'
                        ),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    }
                },
                {
                    path: '/profile/order',
                    name: 'myOrder',
                    component: () =>
                        import(/* webpackChunkName: "myOrder" */ './pages/MyOrder.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    }
                },
                {
                    path: '/profile/message',
                    name: 'message',
                    component: () =>
                        import(/* webpackChunkName: "message" */ './pages/Message.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    }
                },
                {
                    path: '/profile/favorite',
                    name: 'myFavorite',
                    component: () =>
                        import(/* webpackChunkName: "myFavorite" */ './pages/MyFavorite.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    }
                },
                {
                    path: '/profile/wish',
                    name: 'myWish',
                    component: () => import(/* webpackChunkName: "myWish" */ './pages/MyWish.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    }
                },

                {
                    path: '/teacher-introduce',
                    name: 'becomeTeacherIntro',
                    component: () =>
                        import(
                            /* webpackChunkName: "becomeTeacherIntro" */ './pages/BecomeTeacherIntro.vue'
                        ),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },

                {
                    path: '/becometeacher',
                    name: 'becomeTeacher',
                    component: () =>
                        import(/* webpackChunkName: "becomeTeacher" */ './pages/BecomeTeacher.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'notTeacher'
                    }
                },

                {
                    path: '/profile/lesson/overview',
                    name: 'myLesson',
                    component: () =>
                        import(/* webpackChunkName: "myLesson" */ './pages/MyLesson.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    }
                },

                {
                    path: '/contact/about',
                    name: 'about',
                    component: () => import(/* webpackChunkName: "about" */ './pages/About.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    }
                },

                {
                    path: '/contact/terms',
                    component: () => import(/* webpackChunkName: "terms" */ './pages/Terms.vue'),
                    // beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    },
                    children: [
                        {
                            path: 'privacy',
                            name: 'privacy',
                            component: () =>
                                import(/* webpackChunkName: "privacy" */ './pages/Privacy.vue'),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'service',
                            name: 'service',
                            component: () =>
                                import(/* webpackChunkName: "service" */ './pages/Service.vue'),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'payment',
                            name: 'payment',
                            component: () =>
                                import(/* webpackChunkName: "payment" */ './pages/Payment.vue'),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'question',
                            name: 'question',
                            component: () =>
                                import(/* webpackChunkName: "question" */ './pages/Question.vue'),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'refund',
                            name: 'refund',
                            component: () =>
                                import(/* webpackChunkName: "refund" */ './pages/Refund.vue'),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'relisten',
                            name: 'relisten',
                            component: () =>
                                import(/* webpackChunkName: "relisten" */ './pages/Relisten.vue'),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'teacher',
                            name: 'teacher',
                            component: () =>
                                import(/* webpackChunkName: "teacher" */ './pages/Teacher.vue'),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: '/',
                            redirect: '/privacy'
                        }
                    ]
                },

                {
                    path: '/cart/:l_id',
                    name: 'cart',
                    component: () =>
                        import(/* webpackChunkName: "cart" */ './pages/LessonCart.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    }
                },

                {
                    path: '/teacher/:t_id',
                    component: () =>
                        import(/* webpackChunkName: "teacherDetail" */ './pages/TeacherDetail.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'user'
                    },
                    children: [
                        {
                            path: 'intro',
                            name: 'intro',
                            component: () =>
                                import(
                                    /* webpackChunkName: "teacherIntro" */ './components/TeacherIntro'
                                ),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'portfolios',
                            name: 'portfolios',
                            component: () =>
                                import(
                                    /* webpackChunkName: "teacherPortfolios" */ './components/TeacherPortfolios'
                                ),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: 'lessons',
                            name: 'lessons',
                            component: () =>
                                import(
                                    /* webpackChunkName: "teacherLessons" */ './components/TeacherLessons'
                                ),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'user'
                            }
                        },
                        {
                            path: '/',
                            redirect: 'lessons'
                        }
                    ]
                },

                {
                    path: '/profile/detail',
                    component: () =>
                        import(/* webpackChunkName: "memberDetail" */ './pages/MemberDetail.vue'),
                    beforeEnter: requireAuth,
                    meta: {
                        permission: 'account'
                    },
                    children: [
                        {
                            path: 'detail',
                            name: 'memberInfo',
                            component: () =>
                                import(
                                    /* webpackChunkName: "memberInfo" */ './components/memberInfo'
                                ),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'account'
                            }
                        },
                        {
                            path: 'password',
                            name: 'memberPassword',
                            component: () =>
                                import(
                                    /* webpackChunkName: "memberPassword" */ './components/MemberPassword'
                                ),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'account'
                            }
                        },
                        {
                            path: 'credit',
                            name: 'memberCredit',
                            component: () =>
                                import(
                                    /* webpackChunkName: "memberCredit" */ './components/MemberCredit'
                                ),
                            beforeEnter: requireAuth,
                            meta: {
                                permission: 'account'
                            }
                        },
                        {
                            path: '/',
                            redirect: 'detail'
                        }
                    ]
                },

                {
                    name: '404',
                    path: '/404',
                    component: () => import(/* webpackChunkName: "notFound" */ './pages/NotFound')
                },
                {
                    path: '*',
                    redirect: '/404'
                }
            ]
        }
    ]
})
