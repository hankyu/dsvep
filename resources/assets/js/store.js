/*
 |-------------------------------------------------------------------------------
 | VUEX store.js
 |-------------------------------------------------------------------------------
 | Builds the data store from all of the modules for the Roast app.
 */

/**
 * Adds the promise polyfill for IE 11
 */
require('es6-promise').polyfill()

/**
 * Import Vue and Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 * Initializes Vuex on Vue.
 */
Vue.use(Vuex)

/**
 * Imports all of the modules used in the application to build the data store.
 */
import { member } from './modules/member.js'
import { lesson } from './modules/lesson.js'
import { teacher } from './modules/teacher.js'
import { message } from './modules/message.js'
import { rollcall } from './modules/rollcall.js'
import { order } from './modules/order.js'
import { wish } from './modules/wish.js'
import { alert } from './modules/alert.js'

/**
 * Export the data store.
 */
export default new Vuex.Store({
    strict: true,
    // namespaced: true,

    modules: {
        member,
        lesson,
        teacher,
        message,
        rollcall,
        order,
        wish,
        alert
    },

    state: {
        pageChanging: false,
        loadingItems: [],
        footerFixed: false,
        footerHeight: null,
        routeAfterLogin: '',
        browser: { name: '', version: '', os: '' },

        fireworkPlayed: false
    },
    actions: {},

    mutations: {
        SET_FOOTER_FIXED(state, bool) {
            state.footerFixed = bool
        },
        SET_FOOTER_HEIGHT(state, h) {
            state.footerHeight = h
        },
        ADD_LOADING_ITEM(state, loadingItem) {
            state.loadingItems.push(loadingItem)
        },
        REMOVE_LOADING_ITEM(state, loadingItem) {
            state.loadingItems = state.loadingItems.filter(item => {
                return item != loadingItem
            })
        },
        SET_ROUTE_AFTER_LOGIN(state, path) {
            state.routeAfterLogin = path
        },
        SET_BROWSER_INFO(state, data) {
            state.browser = data
        },
        SWITCH_PAGE_CHANGING(state, bool) {
            state.pageChanging = bool
        },
        SET_FIREWORK_PLAYED(state, bool) {
            state.fireworkPlayed = bool
        }
    },

    getters: {
        isLoading(state) {
            return (
                state.member.memberLoadStatus == 1 ||
                state.member.memberLoadStatus == 2 ||
                state.pageChanging ||
                state.order.buyFreeStatus == 1 ||
                state.order.buyFreeStatus == 2 ||
                state.order.cancelOrderStatus == 1 ||
                state.order.cancelOrderStatus == 2
            )
        }
    }
})
