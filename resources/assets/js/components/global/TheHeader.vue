<style lang="scss">
@import '../../../sass/variables';

.pageHeader {
    top: 0;
    width: 100%;
    border-top: 4px solid $brand-primary;
    border-bottom: 1px solid $lightgray;
    @include verticalShadow(2px);
    background-color: $white;
    position: fixed;
    z-index: 600;

    .wrapper {
        @extend .afterClearBoth;
    }

    #page_hamburger {
        // display: inline-block;
        height: $h-header;
        float: left;

        @media (max-width: $max-w-xs) {
            height: $h-header-xs;
        }
    }

    #header_brand {
        font-size: 1.8rem;
        margin-top: 9px;
        margin-left: 12px;
        float: left;
        color: $font-primary;
    }

    .headerAvatar {
        float: right;
    }

    #header_avatar {
        width: $radius-header-avatar;
        height: $radius-header-avatar;
        margin-top: ($h-header - $radius-header-avatar) / 2;
    }

    #headerDropdownAvatar {
        .btn-lg {
            padding: 0;
        }

        .dropdown-menu {
            min-width: 7rem;
            font-size: 0.9rem;
        }

        a.dropdown-item {
            &:hover,
            &:focus {
                background-color: $brand-primary;
            }
        }

        .dropdown-divider {
            margin-top: 5px;
            margin-bottom: 5px;
        }
    }

    #btn_login {
        font-size: 0.8rem;
        margin-top: 15px;
    }

    #header_nav {
        float: right;
        margin-right: 35px;
        margin-top: 5px;

        a {
            display: inline-block;
            font-size: 0.9rem;
            margin-top: 32px;

            .fontAwesomeIcon {
                @extend .faIcon;
            }
        }

        a + a {
            margin-left: 20px;
        }
    }

    @media (max-width: $max-w-sm) {
        #header_nav {
            margin-right: 5px;
            margin-top: 8px;

            a {
                display: block;
                margin-top: 0;
                text-align: right;
            }

            a + a {
                margin-left: 10px;
            }
        }
    }

    @media (max-width: $max-w-xs) {
        #header_nav {
            margin-right: 5px;
            margin-top: 8px;

            a {
                display: block;
                font-size: 0.8rem;
                margin-top: 0;
                text-align: right;
            }

            a + a {
                margin-left: 10px;
            }
        }

        #header_brand {
            font-size: 1.2rem;
            margin-left: 0;
            line-height: 2.3rem;
        }

        #btn_login {
            margin-top: 12px;
            padding: 0.3rem 0.3rem;
        }
    }
}

.hamburger {
    background-color: transparent;
    border: none;

    .hamburger__bar {
        display: block;
        background-color: $font-primary;
        height: 3px;
        width: 30px;
        line-height: 0;
        font-size: 0;
        transition: margin-top 0.2s ease-in-out;
    }

    .hamburger__bar + .hamburger__bar {
        margin-top: 7px;
    }

    &:hover,
    &:active {
        .hamburger__bar + .hamburger__bar {
            margin-top: 12px;
        }
    }

    @media (max-width: $max-w-xs) {
        .hamburger__bar {
            width: 20px;
        }
        .hamburger__bar + .hamburger__bar {
            margin-top: 4px;
        }
    }
}
/* ,
.avatar-leave-active */
.avatar-enter-active {
    transform-style: preserve-3d;
    transition: margin-top 0.3s ease-in, opacity 0.3s ease-in, transform 0.3s ease-in;
}
.avatar-enter,
.avatar-leave-to {
    opacity: 0;
    margin-top: -60px;
    transform: rotateY(-360deg);
}
.avatar-enter-to,
.avatar-leave {
    opacity: 1;
    margin-top: -0;
    transform: rotateY(0deg);
}
</style>

<template>
    <header class="pageHeader">
        <div class="wrapper">
            <button
                @click="switchHamburger"
                class="hamburger"
                id="page_hamburger"
                type="button"
            >
                <span class="hamburger__bar"></span>
                <span class="hamburger__bar"></span>
                <span class="hamburger__bar"></span>
            </button>

            <router-link to="/">
                <header id="header_brand">{{getWebsiteTitle('FULL')}}</header>
            </router-link>

            <transition name="avatar">
                <b-dropdown
                    class="headerAvatar d-none d-sm-block"
                    id="headerDropdownAvatar"
                    no-caret
                    right
                    size="lg"
                    toggle-class="text-decoration-none"
                    v-if="logined"
                    variant="link"
                >
                    <template slot="button-content">
                        <BaseAvatar
                            :avatarImg="avatarImgSrc"
                            id="header_avatar"
                        />
                    </template>
                    <b-dropdown-item to="/profile/detail">{{getPageTitle('BASIC_DATA')}}</b-dropdown-item>
                    <b-dropdown-item to="/profile/lesson/overview">{{getPageTitle('MY_LESSON')}}</b-dropdown-item>
                    <b-dropdown-item to="/profile/rollcall-report">{{getPageTitle('MY_ROLLCALL_REPORT')}}</b-dropdown-item>
                    <b-dropdown-item to="/profile/message">{{getPageTitle('MY_MESSAGE')}}</b-dropdown-item>
                    <b-dropdown-item to="/profile/order">{{getPageTitle('MY_ORDER')}}</b-dropdown-item>
                    <b-dropdown-item to="/profile/wish">{{getPageTitle('MY_WISH')}}</b-dropdown-item>
                    <!-- 器材展暫時
                    <b-dropdown-item to="/profile/favorite">{{getPageTitle('MY_FAVORITE')}}</b-dropdown-item>
                    -->
                    <li>
                        <a
                            class="dropdown-item"
                            href="/profile/favorite"
                        >{{getPageTitle('MY_FAVORITE')}}</a>
                    </li>
                    <b-dropdown-divider />
                    <b-dropdown-item
                        @click="logout"
                        href="javascript:void(0)"
                    >{{getPageTitle('LOGOUT')}}</b-dropdown-item>
                </b-dropdown>
            </transition>
            <b-button
                @click="showLoginModal()"
                class="headerAvatar"
                id="btn_login"
                v-if="visitor"
                variant="info"
            >登入</b-button>
            <nav id="header_nav">
                <router-link
                    to="/teacher-introduce"
                    v-if="visitor || !isTeacher"
                >
                    <font-awesome-icon
                        class="fontAwesomeIcon"
                        icon="chalkboard-teacher"
                    />
                    {{getPageTitle('BECOME_TEACHER')}}
                </router-link>
                <router-link
                    to="/lesson/all"
                    v-if="$route.name!='allLesson'"
                >
                    <font-awesome-icon
                        class="fontAwesomeIcon"
                        icon="search"
                    />找課程?
                </router-link>
            </nav>
        </div>
    </header>
</template>
<script>
import { EventBus } from '../../event-bus.js'
import { JS_CONFIG } from '../../config'
import { COOKIE_KIT } from '../../class/cookieKit'

export default {
    name: 'TheHeader',
    components: { COOKIE_KIT },
    computed: {
        visitor() {
            return this.$store.getters['member/isLoginedMember'] ? false : true
        },
        logined() {
            return this.$store.getters['member/isLoginedMember']
        },
        avatarImgSrc() {
            return this.$store.state.member.memberData.data.avg_img
        },
        isTeacher() {
            return this.$store.state.member.memberData.data.role & 16
        }
    },
    methods: {
        switchHamburger() {
            EventBus.$emit('show-sidebar')
        },
        showLoginModal() {
            EventBus.$emit('prompt-login')
        },
        logout() {
            this.$store
                .dispatch('member/logout')
                .then(response => {
                    if (response.data.status != 0) {
                        console.log('logout status', response.data.status)
                    }
                })
                .catch(e => {
                    console.log('logout e', e)
                })
                .finally(() => {
                    this.initVisitor()
                })
        },
        initVisitor() {
            this.$store.commit('member/CLEAN_MEMBER_DATA', 'memberData')

            COOKIE_KIT.deleteCookie('r_token')
            COOKIE_KIT.deleteCookie('m_id')

            // 若在有權限限制的頁面
            if (
                this.$route.meta &&
                this.$route.meta.permission &&
                this.$route.meta.permission != 'user'
            ) {
                // 器材展閹割
                // this.$router.replace('/')
                document.location.replace('/')
            } else {
                document.location.reload()
            }
        },
        getPageTitle(name) {
            return JS_CONFIG.TERMS.PAGE_TITLE[name]
        },
        getWebsiteTitle(name) {
            return JS_CONFIG.TERMS.WEBSITE_TITLE[name]
        }
    }
}
</script>