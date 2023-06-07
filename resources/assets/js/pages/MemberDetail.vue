<style lang="scss">
@import '../../sass/variables';
@import '../../sass/vendors/bTabs';

.memberDetail {
    margin-top: 0.5rem;
    display: flex;

    .memberDetail__avatarSection {
        width: 200px;
    }

    .memberDetail__avatarBtnBar {
        overflow: visible;
        height: 0;
        position: relative;
        width: 100%;
        margin: auto;
    }

    .memberDetail__avatarBtn {
        position: absolute;
        bottom: 0rem;
        padding: 0;
        margin: 0;
        right: 0.5rem;
        font-size: 2rem;
        color: #ff4b68;
        background-color: transparent;
        border: none;
        width: 40px;
        height: 40px;
        line-height: 1;
    }
    .memberDetail__teacherName {
        font-size: 1rem;
        text-align: center;
        margin-top: 0.5rem;

        span {
            display: block;
        }
    }

    .memberDetail__infoSection {
        flex: 1;
        margin-left: 1rem;
        overflow: hidden;
    }

    .memberDetail__tabContainer {
        padding: 2rem 2rem;
    }

    @media (max-width: $max-w-lg) {
        display: block;

        .memberDetail__avatarSection {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1rem;

            .baseAvatar {
                transform: scale(0.75);
                margin: -20px;
            }
        }

        .memberDetail__avatarBtn {
            font-size: 1.5rem;
        }

        .memberDetail__teacherName {
            text-align: left;
            margin-left: 0.5rem;
        }

        .memberDetail__infoSection {
            width: 100%;
            margin-left: 0;
        }
    }
    @media (max-width: $max-w-sm) {
        .memberDetail__tabContainer {
            padding: 1rem 0.25rem;
        }
    }
    @media (max-width: $max-w-xs) {
        .memberDetail__avatarSection {
            flex-direction: column;
        }
        .memberDetail__teacherName {
            text-align: center;
            margin-left: 0;

            span {
                display: inline;
            }
        }
    }
}
</style>

<template>
    <div class="webPage">
        <div
            class="wrapper memberDetail"
            v-if="loaded"
        >
            <section class="memberDetail__avatarSection">
                <div>
                    <BaseAvatar
                        :avatarImg="memberFullData.avg_img"
                        :avatarWidth="200"
                    />
                    <div class="memberDetail__avatarBtnBar">
                        <button
                            @click="modifyAvatar"
                            class="memberDetail__avatarBtn"
                        >
                            <font-awesome-icon icon="cog" />
                        </button>
                    </div>
                </div>
                <h2 class="memberDetail__teacherName">
                    <span>{{memberFullData.nickname}}</span>
                    <span v-if="memberFullData.m_name">({{memberFullData.m_name}})</span>
                </h2>
            </section>
            <section class="memberDetail__infoSection">
                <UrlParamTabs v-if="loaded">
                    <UrlParamTab>
                        <UrlParamTabLink
                            :active="routeName=='memberInfo'?true:false"
                            link="detail"
                            text="基本資料"
                        />
                    </UrlParamTab>
                    <UrlParamTab>
                        <UrlParamTabLink
                            :active="routeName=='memberPassword'?true:false"
                            link="password"
                            text="更改密碼"
                        />
                    </UrlParamTab>
                    <UrlParamTab>
                        <UrlParamTabLink
                            :active="routeName=='memberCredit'?true:false"
                            link="credit"
                            text="匯款資訊"
                        />
                    </UrlParamTab>
                </UrlParamTabs>
                <UrlParamTabsContent />
            </section>
        </div>
        <LoadingSet v-else />

        <ModalAvatarUpdate
            ref="modalAvatarUpdate"
            v-if="loaded"
        />
        <ModalPhoneVerify
            ref="modalPhoneVerify"
            v-if="loaded"
        />
        <ModalPhoneSetter ref="modalPhoneSetter" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from '../components/LoadingSet'

import UrlParamTabs from '../components/UrlParamTabs'
import UrlParamTab from '../components/UrlParamTab'
import UrlParamTabLink from '../components/UrlParamTabLink'
import UrlParamTabsContent from '../components/UrlParamTabsContent'

import ModalAvatarUpdate from '../components/ModalAvatarUpdate'
import ModalPhoneVerify from '../components/ModalPhoneVerify'
import ModalPhoneSetter from '../components/ModalPhoneSetter'

export default {
    name: 'MemberDetail',

    components: {
        LoadingSet,
        UrlParamTabs,
        UrlParamTab,
        UrlParamTabLink,
        UrlParamTabsContent,
        ModalAvatarUpdate,
        ModalPhoneVerify,
        ModalPhoneSetter
    },

    data: function() {
        return {
            tabName: ''
        }
    },

    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        this.getData()
        EventBus.$on('member-data-updated', this.getData)
        EventBus.$on('upload-avatar-completed', this.reload)

        EventBus.$emit('do-resize')
    },
    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        routeName() {
            return this.$route.name
        },

        memberFullData() {
            return this.$store.state.member.memberFullData.data
        },
        ...mapGetters({
            loaded: 'member/memberFullDataLoadCompleted'
        })
    },

    methods: {
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(
                this.$refs['modalAvatarUpdate'].isShow ||
                    this.$refs['modalPhoneVerify'].isShow ||
                    this.$refs['modalPhoneSetter'].isShow
            )
        },
        async getData() {
            try {
                let response = await this.$store.dispatch('member/getMemberDetail')

                if (response.data.status == 0) {
                    this.$store.commit('member/SET_MEMBER_DATA', {
                        name: 'memberFullData',
                        data: response.data.data
                    })
                } else {
                    this.$store.commit('member/SET_MEMBER_LOAD_STATUS', {
                        name: 'memberFullData',
                        status: 2
                    })
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getMemberDetail',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('SET_MEMBER_LOAD_STATUS', {
                    name: 'memberFullData',
                    status: 2
                })

                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        modifyAvatar() {
            EventBus.$emit('show-modal-avatar-update')
        },
        reload() {
            window.location.reload()
        }
    },

    beforeDestroy() {
        this.$parent.switchBodyScrollStatus(false)
        EventBus.$off('member-data-updated', this.getData)
        EventBus.$off('upload-avatar-completed', this.getData)
    }
}
</script>
