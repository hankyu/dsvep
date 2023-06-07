<style lang="scss">
// Variables
@import '../../sass/variables';

html,
body {
    position: relative;
    font-family: 'Noto Sans TC', 'Roboto', '微軟正黑體', sans-serif;
    line-height: 1.5;
    font-size: 20px;
    color: $font-primary;
    height: 100%;
    background-color: $darkwhite;

    @media (max-width: $max-w-xs) {
        font-size: 18px;
    }
}

a {
    color: $emphasized2;

    &:hover,
    &:active {
        color: $emphasized2;
        text-decoration: none;
    }
}

button:focus,
a:focus {
    outline: 0;
}

.pageH1 {
    text-align: center;
    font-size: 1.4rem;
    line-height: 1.5;
    padding: 20px 0 10px;
    font-weight: bold;
    border-bottom: 1px solid $gainsboro;
}

#app-layout {
    padding-top: $h-header + 4px;

    @media (max-width: $max-w-xs) {
        padding-top: $h-header-xs + 4px;
    }
}

.webPage {
    padding-bottom: 40px;
}

.lineA {
    display: block;
    position: fixed;
    left: 0;
    top: 6rem;
    background-color: $bs-warning;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    color: $white;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    box-shadow: 3px 3px 3px #0003;
    z-index: 570;
    overflow: hidden;

    &:before,
    &:after {
        position: absolute;
        content: '';
        display: block;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
    &:before {
        right: 0px;
        border-top: 300px solid transparent;
        border-right: 300px solid #0001;
    }

    &:after {
        left: 0px;
        border-top: 300px solid transparent;
        border-left: 300px solid #0001;
    }
    &:hover {
        color: $white;
        &:before {
            border-right: 300px solid #6661;
        }

        &:after {
            border-left: 300px solid #6661;
        }
    }

    @media (max-width: $max-w-xs) {
        font-size: 0.8rem;
        padding: 5px;
    }
}
</style>


<template>
    <div
        :style="marginBottom"
        id="app-layout"
    >
        <TheHeader />
        <TheCompleteAlert />
        <RouterView v-if="!routeAfterLogin" />
        <TheFooter ref="footer" />
        <TheSidebar ref="sidebar" />
        <TheLoadingWithMask
            maskColor="#fffe"
            v-if="isLoading"
        />
        <TheModalLogin ref="modalLogin" />
        <TheModalSignUp ref="modalSignUp" />
        <TheModalPasswordGetter ref="modalPasswordGetter" />
        <TheModalAlert ref="modalAlert" />
        <!-- <TheModalShopOrClassroom ref="theModalShopOrClassroom" /> -->
        <TheModalStartStudy ref="theModalStartStudy" />
        <TheModalContactUs ref="theModalContactUs" />
        <TheModalBrowserLimit ref="theModalBrowserLimit" />
        <TheModalEnableCookie ref="theModalEnableCookie" />
        <TheMessageNotice />
        <TheFixedButtons />
        <a
            class="lineA"
            href="https://line.me/R/ti/p/%40cqq7970i"
            target="_blank"
        >
            線上
            <br />客服
        </a>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import LoadingSet from '../components/LoadingSet'
import { COOKIE_KIT } from '../class/cookieKit'
import { COMMON_UTILITY } from '../class/commonUtility'

import { detect } from 'detect-browser'
const browser = detect()

export default {
    components: { LoadingSet },
    data: function() {
        return {
            bodyScroll: true,
            pageModalOpened: false
        }
    },
    created: function() {
        this.doResize = () => {
            this.checkFooterFixed()
        }
        this.debounceDoResize = _.debounce(this.doResize, 300)
        EventBus.$on(
            'do-resize',
            function() {
                if (this.footerFixed) {
                    this.$store.commit('SET_FOOTER_FIXED', false)
                }
                this.debounceDoResize()
            }.bind(this)
        )
    },
    mounted() {
        this.$store.commit('SET_BROWSER_INFO', browser)

        if (!COMMON_UTILITY.isMobile()) {
            let version = browser.version.match(/^\d*\.\d*/)[0] * 1,
                conditions = [],
                condition

            conditions.push(browser.name == 'chrome' && version >= 56) // 桌機和Android chrome position:sticky
            conditions.push(browser.name == 'crios' && version >= 75) // iOS chrome position:sticky
            conditions.push(browser.name == 'ios' && version >= 10) // iOS safari position:sticky
            conditions.push(browser.name == 'firefox' && version >= 54) // 桌機 firefox ES6
            conditions.push(browser.name == 'safari' && version >= 10) // Mac safari ES6
            conditions.push(browser.name == 'edge' && version >= 16) // edge position:sticky
            conditions.push(browser.name == 'samsung' && version >= 6.2) // edge position:sticky
            // conditions.push(browser.name == 'fxios' && version > 16) // iOS firefox position:sticky
            // conditions.push(browser.name == 'opera' && version > 42) // position:sticky
            condition = conditions.some(elm => elm)

            if (!condition) {
                // if (browser.name == 'chrome') {
                EventBus.$emit('show-modal-browser-limit')
            }
        } else if (!COOKIE_KIT.isCookieEnable()) {
            EventBus.$emit('show-modal-enable-cookie')
        }
        window.addEventListener('resize', this.debounceDoResize)
        this.debounceDoResize()
    },
    updated() {
        this.debounceDoResize()
        if (this.routeAfterLogin) {
            EventBus.$emit('prompt-login')
            this.$store.commit('SWITCH_PAGE_CHANGING', false)
        }
    },
    computed: {
        marginBottom() {
            return this.footerFixed ? 'margin-bottom:' + this.footerHeight + 'px' : ''
        },
        showSignUpModal() {
            EventBus.$emit('signup')
        },
        ...mapGetters({
            isLoading: 'isLoading'
        }),
        ...mapState({
            routeAfterLogin: state => state.routeAfterLogin,
            footerFixed: 'footerFixed',
            footerHeight: 'footerHeight'
        })
    },
    methods: {
        checkFooterFixed() {
            this.$refs.footer.setFooterHeightToState()

            let bool =
                document.documentElement.clientHeight == document.documentElement.scrollHeight

            this.$store.commit('SET_FOOTER_FIXED', bool)
        },
        modalControll(name, bool) {
            switch (name) {
                case 'login':
                    this.modalLogin = bool
                    break
                case 'password-getter':
                    this.modalPasswordGetter = bool
                    break
                case 'signup':
                    this.modalSignUp = bool
                    break
            }
        },

        checkBodyScrollStatus() {
            let checks = [
                    'modalLogin',
                    'modalSignUp',
                    'modalPasswordGetter',
                    'modalAlert',
                    'sidebar',
                    'theModalStartStudy',
                    'theModalContactUs',
                    'theModalBrowserLimit',
                    'theModalEnableCookie'
                ],
                scrollHidden = checks.some(item => {
                    return this.$refs[item].isShow
                })

            if (scrollHidden || this.pageModalOpened) {
                document.body.style.overflowY = 'hidden'
            } else {
                document.body.style.overflowY = 'auto'
            }
        },
        switchBodyScrollStatus(bool) {
            this.pageModalOpened = bool
            this.checkBodyScrollStatus()
        }
    },
    watch: {}
}
</script>