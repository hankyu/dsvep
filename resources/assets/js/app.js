window._ = require('lodash')
// try {
//     window.$ = window.jQuery = require('jquery');
//     require('foundation-sites');
// } catch (e) {}

window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

/* let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
} */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

// window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import router from './routes.js'
import store from './store.js'
import { EventBus } from './event-bus.js'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// import Navigation from './components/global/Navigation.vue'
// import Searchbar from './components/global/Searchbar.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faSearch,
    faMapMarkerAlt,
    faMapMarkedAlt,
    faChalkboardTeacher,
    faUser,
    faBullhorn,
    faBookmark,
    faLandmark,
    faBook,
    faCalendarCheck,
    faComment,
    faListAlt,
    faDove,
    faBoxOpen,
    faHome,
    faSignOutAlt,
    faBookReader,
    faDollarSign,
    faExchangeAlt,
    faEnvelope,
    faCog,
    faEdit,
    faRocket,
    faMobile,
    faAngleUp,
    faChartPie,
    faTimesCircle,
    faCheckCircle,
    faExclamationCircle,
    faExternalLinkAlt,
    faCheckSquare,
    faSatelliteDish,
    faPortrait,
    faFilter,
    faShoppingBasket,
    faBookOpen,
    faChevronDown,
    faFilm,
    faLock,
    faPlay,
    faQrcode,
    faTicketAlt,
    faSortAmountDown,
    faSortAmountUp,
    faUserCheck,
    faEye,
    faEyeSlash,
    faTimes,
    faUndoAlt
} from '@fortawesome/free-solid-svg-icons'

import { faFacebookSquare, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {
    faCommentDots,
    faHeart,
    faCreditCard,
    faAddressCard
} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch)
library.add(faMapMarkerAlt)
library.add(faMapMarkedAlt)
library.add(faChalkboardTeacher)
library.add(faUser)
library.add(faBullhorn)
library.add(faBookmark)
library.add(faLandmark)
library.add(faBook)
library.add(faCalendarCheck)
library.add(faComment)
library.add(faListAlt)
library.add(faDove)
library.add(faBoxOpen)
library.add(faHome)
library.add(faSignOutAlt)
library.add(faBookReader)
library.add(faDollarSign)
library.add(faExchangeAlt)
library.add(faEnvelope)
library.add(faCog)
library.add(faEdit)
library.add(faRocket)
library.add(faMobile)
library.add(faFacebookSquare)
library.add(faYoutube)
library.add(faAngleUp)
library.add(faChartPie)
library.add(faTimesCircle)
library.add(faCheckCircle)
library.add(faExclamationCircle)
library.add(faExternalLinkAlt)
library.add(faCommentDots)
library.add(faCheckSquare)
library.add(faHeart)
library.add(faCreditCard)
library.add(faSatelliteDish)
library.add(faPortrait)
library.add(faAddressCard)
library.add(faFilter)
library.add(faShoppingBasket)
library.add(faBookOpen)
library.add(faChevronDown)
library.add(faFilm)
library.add(faLock)
library.add(faPlay)
library.add(faQrcode)
library.add(faTicketAlt)
library.add(faSortAmountDown)
library.add(faSortAmountUp)
library.add(faUserCheck)
library.add(faEyeSlash)
library.add(faEye)
library.add(faTimes)
library.add(faUndoAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAf6lxu3iMOhxqhcWquqS_XPBCvqpyrdCE',
        libraries: 'places' // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then set installComponents to 'false'.
    //// If you want to automatically install all the components this property must be set to 'true':
    installComponents: true
})

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css' // only if your build system can import css, otherwise import it wherever you would import your css.
Vue.use(VuePlyr)

const requireComponent = require.context(
    // The relative path of the components folder
    './components/global',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /(Base|The)[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName)

    // Get PascalCase name of component
    const componentName = upperFirst(
        camelCase(
            // Gets the file name regardless of folder depth
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    )

    // Register component globally
    Vue.component(
        componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig
    )
})

let vm = new Vue({
    router,
    store
}).$mount('#app')

router.beforeEach((to, from, next) => {
    EventBus.$emit('close-sidebar')
    next()
})
