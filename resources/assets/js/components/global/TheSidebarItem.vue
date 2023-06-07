<style lang="scss" scoped>
@import '../../../sass/variables';

$fsz-sidebar: 0.9rem;

.sidebarItem__list {
    position: relative;

    &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        width: 0%;
        height: 100%;
        background-color: $brand-primary;
        transition: width ease-out 0.3s;
    }

    &:hover,
    &:active {
        &:before {
            width: 100%;
        }
    }

    .sidebarItem__link {
        position: relative;
        display: block;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 10px;
        color: $font-primary;
        font-size: 0;
        z-index: 2;

        &:hover,
        &:active {
            color: $font-primary;
        }

        .sidebarItem__icon {
            width: 60px;
            font-size: $fsz-sidebar;
        }
        .sidebarItem__term {
            margin-left: 10px;
            font-size: $fsz-sidebar;
        }
        &.sidebarItem__link--active {
            background-color: $brand-primary;
            cursor: default;
        }
    }
}
</style>

<template>
    <li class="sidebarItem__list">
        <router-link
            :to="sidebarItemLinkHref"
            class="sidebarItem__link"
            exact-active-class="sidebarItem__link--active"
            v-if="sidebarItem.type==0"
        >
            <font-awesome-icon
                :icon="sidebarItem.faIcon"
                :rotation="sidebarItem.iconRotation"
                class="sidebarItem__icon"
            />
            <span class="sidebarItem__term">{{ sidebarItem.term }}</span>
        </router-link>
        <a
            :class="sidebarItemLinkClass"
            :href="sidebarItemLinkHref"
            @click="click"
            class="sidebarItem__link"
            v-else
        >
            <font-awesome-icon
                :icon="sidebarItem.faIcon"
                :rotation="sidebarItem.iconRotation"
                class="sidebarItem__icon"
            />
            <span class="sidebarItem__term">{{ sidebarItem.term }}</span>
        </a>
    </li>
</template>
<script>
import { COOKIE_KIT } from '../../class/cookieKit'

export default {
    components: {
        COOKIE_KIT
    },
    props: {
        sidebarItem: {
            type: Object,
            required: true
        }
    },
    computed: {
        sidebarItemLinkClass() {
            return this.$route.path == this.sidebarItem.href ? 'sidebarItem__link--active' : ''
        },
        sidebarItemLinkHref() {
            let specialCondition = this.sidebarItem.href == '/logout',
                isTeacherPage = this.sidebarItem.href == '/teacher/tid'

            return specialCondition
                ? 'javascript:void(0);'
                : isTeacherPage
                ? this.sidebarItem.href.replace(
                      'tid',
                      this.$store.state.member.memberData.data.t_id
                  )
                : this.sidebarItem.href
        }
    },
    methods: {
        click() {
            if (this.sidebarItem.href == '/logout') {
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
            }
        },

        initVisitor() {
            this.$store.commit('member/SET_MEMBER_LOAD_STATUS', {
                name: 'memberData',
                status: 0
            })
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
        }
    }
}
</script>