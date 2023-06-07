<style lang="scss">
@import '../../../sass/variables';

.sidebar__mask {
    position: fixed;
    top: 0;
    // bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #0007;
    z-index: 700;
}

.sidebar {
    position: fixed;
    top: 0;
    // bottom: 0;
    left: 0;
    width: $w-sidebar;
    height: 100vh;
    border-top: 4px solid $emphasized2;
    border-bottom: 1px solid $gainsboro;
    background-color: #fff;
    transition: left 0.2s ease-out;
    box-shadow: 3px 0 5px 0 $shadow;
    z-index: 701;
    overflow-y: auto;
    overflow-x: hidden;
}

.sidebar__close {
    position: absolute;
    right: 0;
    top: 0;
    height: 2.5rem;
    border: none;
    background-color: transparent;
    font-size: 24px;
}
.sidebar__header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $gainsboro;
    padding-left: 10px;
    background-color: $white;
    margin-bottom: 5px;
}
.sidebar__avatar {
    width: $radius-header-avatar;
    height: $radius-header-avatar;
    margin-top: ($h-header - $radius-header-avatar) / 2;
    margin-bottom: ($h-header - $radius-header-avatar) / 2;
    float: left;
    border-radius: 50%;
    background-color: $lightgray;
    border: 1px solid $color-border-layout;
    overflow: hidden;
}
.sidebar__nameBlock {
    flex: 1;
    padding-left: 10px;
    padding-right: 40px;
    min-width: 0;

    .sidebar__userName {
        color: $font-primary;
        margin-bottom: 0;
        font-size: 1.2rem;
        @extend .singleLineEllipsis;
    }
    .sidebar__description {
        color: $lightgray;
        margin-bottom: 0;
        font-size: 0.7rem;
    }
}

.sidebar-transition-enter,
.sidebar-transition-leave-to {
    left: -300px;
}
.sidebar__ul {
    list-style-type: none;
    padding-left: 0;
    padding-bottom: 2rem;
}
.sidebar__hr {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>

<template>
    <div>
        <div
            @click.stop="closeSidebar"
            class="sidebar__mask"
            v-if="isShow"
        ></div>
        <transition name="sidebar-transition">
            <aside
                class="sidebar"
                v-if="isShow"
            >
                <CloseButton
                    @click="closeSidebar"
                    class="sidebar__close"
                />
                <router-link
                    key="sidebarHeaderWithLogined"
                    to="/profile/detail"
                    v-if="logined"
                >
                    <header class="sidebar__header">
                        <BaseAvatar
                            :avatarImg="avatarImgSrc"
                            class="sidebar__avatar"
                        ></BaseAvatar>
                        <div class="sidebar__nameBlock">
                            <p
                                :title="userNameWithNickname"
                                class="sidebar__userName"
                            >{{ this.$store.state.member.memberData.data.nickname }}</p>
                            <p class="sidebar__description">{{'編輯'+getPageTitle('BASIC_DATA')}}</p>
                        </div>
                    </header>
                </router-link>
                <header
                    class="sidebar__header"
                    key="sidebarHeaderWithoutLogined"
                    v-else
                >
                    <BaseAvatar class="sidebar__avatar"></BaseAvatar>
                    <div class="sidebar__nameBlock">
                        <p class="sidebar__userName">訪客</p>
                    </div>
                </header>
                <ul class="sidebar__ul">
                    <!-- 一般 -->
                    <TheSidebarItem
                        :key="item.id"
                        :sidebarItem="item"
                        v-for="item in activeCommonList"
                    />
                    <hr
                        class="sidebar__hr"
                        v-if="activeMemberList.length"
                    />
                    <!-- 會員 -->
                    <TheSidebarItem
                        :key="item.id"
                        :sidebarItem="item"
                        v-for="item in activeMemberList"
                    />
                    <hr
                        class="sidebar__hr"
                        v-if="activeTeacherList.length"
                    />
                    <!-- 老師 -->
                    <TheSidebarItem
                        :key="item.id"
                        :sidebarItem="item"
                        v-for="item in activeTeacherList"
                    />
                    <hr
                        class="sidebar__hr"
                        v-if="activeAdmAndWorkerList.length"
                    />
                    <!-- 管理員 -->
                    <TheSidebarItem
                        :key="item.id"
                        :sidebarItem="item"
                        v-for="item in activeAdmAndWorkerList"
                    />
                    <hr class="sidebar__hr" />
                    <!-- 其他 -->
                    <TheSidebarItem
                        :key="item.id"
                        :sidebarItem="item"
                        v-for="item in sidebarListOthers"
                    />
                    <hr
                        class="sidebar__hr"
                        v-if="logined"
                    />
                    <TheSidebarItem
                        :sidebarItem="{
                            faIcon: 'sign-out-alt',
                            iconRotation: 180,
                            term: this.logoutTerm(),
                            href: '/logout'
                        }"
                        key="100"
                        v-if="logined"
                    />
                </ul>
            </aside>
        </transition>
    </div>
</template>
<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'
import CloseButton from '../CloseButton'
import TheSidebarItem from './TheSidebarItem'

export default {
    data: function() {
        return {
            isShow: false,
            // role: 0: visitor, 1: member, 2: teacher, 4: worker, 8: yoshocon, 16: saigo
            // role: 0: visitor, 1: member, 2: worker, 4: administer, 8: superior, 16: teacher
            sidebarListCommon: [
                {
                    id: 1,
                    faIcon: 'bullhorn',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.ANNOUNCEMENT,
                    href: '/announcement',
                    type: 0
                },
                {
                    id: 2,
                    faIcon: 'bookmark',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.HOT_TEACHER,
                    href: '/teacher/overview',
                    type: 0
                },
                {
                    id: 3,
                    faIcon: 'landmark',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.ALL_LESSON,
                    href: '/lesson/all',
                    type: 0
                },
                {
                    id: 4,
                    excludeRole: 16,
                    faIcon: 'chalkboard-teacher',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.BECOME_TEACHER,
                    href: '/teacher-introduce',
                    type: 0
                }
            ],
            sidebarListMember: [
                {
                    id: 5,
                    faIcon: 'book',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.MY_LESSON,
                    href: '/profile/lesson/overview',
                    type: 0
                },
                {
                    id: 6,
                    faIcon: 'calendar-check',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.MY_ROLLCALL_REPORT,
                    href: '/profile/rollcall-report',
                    type: 0
                },
                {
                    id: 7,
                    faIcon: 'comment',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.MY_MESSAGE,
                    href: '/profile/message',
                    type: 0
                },
                {
                    id: 8,
                    faIcon: 'list-alt',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.MY_ORDER,
                    href: '/profile/order',
                    type: 0
                },
                {
                    id: 9,
                    faIcon: 'dove',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.MY_WISH,
                    href: '/profile/wish',
                    type: 0
                },
                {
                    id: 10,
                    faIcon: 'box-open',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.MY_FAVORITE,
                    href: '/profile/favorite',
                    type: 1
                }
            ],
            sidebarListTeacher: [
                {
                    id: 11,
                    faIcon: 'home',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.TEACHER_PROFILE,
                    href: '/teacher/tid',
                    type: 0
                },
                {
                    id: 12,
                    faIcon: 'sign-out-alt',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.CREATE_LESSON,
                    href: '/teacher/lesson/create',
                    type: 1
                },
                {
                    id: 13,
                    faIcon: 'book-reader',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.LESSON_MANAGEMENT,
                    href: '/teacher/lesson/overview',
                    type: 1
                },
                {
                    id: 14,
                    faIcon: 'calendar-check',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.LESSON_ROLLCALL_REPORT,
                    href: '/teacher/rollcall-report',
                    type: 1
                },
                {
                    id: 15,
                    faIcon: 'dollar-sign',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.LESSON_ACCOUNTING,
                    href: '/teacher/accounting',
                    type: 1
                }
            ],
            sidebarListAdmAndWorder: [
                {
                    id: 16,
                    role: 2, // worker
                    faIcon: 'exchange-alt',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.CREATE_LESSON_AS_AGENT, // 代創課程
                    href: '/worker/create',
                    type: 1
                },
                {
                    id: 17,
                    role: 2, // worker
                    faIcon: 'calendar-check',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.ROLLCALL_MANAGEMENT, // 出席管理
                    href: '/worker/rollcall-report',
                    type: 1
                },
                {
                    id: 18,
                    role: 12, // admin, superior
                    faIcon: 'cog',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.PLATFORM_MANAGEMENT, // 平台管理
                    href: 'javascript:void(0);',
                    type: 1
                },
                {
                    id: 19,
                    role: 14, // worker, admin, superior
                    faIcon: 'edit',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.APPLY_MANAGEMENT, // 報名管理
                    href: '/approval',
                    type: 1
                }
            ],
            sidebarListOthers: [
                {
                    id: 20,
                    role: 0,
                    faIcon: 'rocket',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.TUTORIAL,
                    href: '/tutorial',
                    type: 0
                }
                /* ,
                {
                    id: 21,
                    role: 0,
                    faIcon: 'envelope',
                    term: JS_CONFIG.TERMS.PAGE_TITLE.CONTACT,
                    href: 'javascript:void(0);',
                    type: 1
                } */
            ]
        }
    },
    components: {
        CloseButton,
        TheSidebarItem
    },
    mounted() {
        EventBus.$on('show-sidebar', this.showSidebar)
        EventBus.$on('close-sidebar', this.closeSidebar)
    },
    computed: {
        activeCommonList() {
            return this.sidebarListCommon.filter(item => {
                return item.excludeRole ? !(item.excludeRole & this.getMemberRole) : true
            })
        },
        activeMemberList() {
            return this.sidebarListMember.filter(item => {
                return 1 & this.getMemberRole
            })
        },
        activeTeacherList() {
            return this.sidebarListTeacher.filter(item => {
                return 16 & this.getMemberRole
            })
        },
        activeAdmAndWorkerList() {
            return this.sidebarListAdmAndWorder.filter(item => {
                return item.role & this.getMemberRole
            })
        },
        userNameWithNickname() {
            let mData = this.$store.state.member.memberData.data
            return mData.nickname + (mData.m_name ? '(' + mData.m_name + ')' : '')
        },
        logined() {
            return this.$store.getters['member/isLoginedMember']
        },
        avatarImgSrc() {
            return this.$store.state.member.memberData.data.avg_img
        },
        getMemberRole() {
            return this.$store.state.member.memberData.data.role
                ? this.$store.state.member.memberData.data.role
                : 0
        }
    },
    methods: {
        getPageTitle(term) {
            return JS_CONFIG.TERMS.PAGE_TITLE[term]
        },
        showSidebar() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeSidebar() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        logoutTerm() {
            return JS_CONFIG.TERMS.PAGE_TITLE.LOGOUT
        }
    },
    beforeDestroy() {
        EventBus.$off('show-sidebar', this.showSidebar)
        EventBus.$off('close-sidebar', this.closeSidebar)
    }
}
</script>