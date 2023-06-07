<style lang="scss" scoped>
@import '../../sass/variables';

.StaticBanner {
    height: 640px;
    background-image: url(/img/background/bg-becom-teacher.jpg);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;

    .StaticBanner__content {
        display: inline-block;
        text-align: center;
    }

    .StaticBanner__pageTitle {
        font-size: 2rem;
        letter-spacing: 0.6rem;
        font-weight: bold;
        color: $white;
        text-shadow: 3px 4px 3px black;
    }

    .StaticBanner__text {
        font-size: 1.2rem;
        color: $gainsboro;
        text-shadow: 2px 3px 3px black;
    }

    @media (max-width: $max-w-md) {
        height: 560px;
    }
    @media (max-width: $max-w-sm) {
        height: 320px;
    }
    @media (max-width: $max-w-xs) {
        .StaticBanner__text {
            font-size: 1rem;
        }
    }
}

.bannerContent-enter-active {
    transition: margin 0.5s $specialBezier, opacity 0.5s ease-in-out;
}
.bannerContent-enter {
    opacity: 0;
    margin-top: 30rem;
}
.bannerContent-enter-to {
    opacity: 1;
    margin-top: 0;
}

.becomeTeacher__slogan {
    padding: 4rem;
    background-color: $gainsboro;
    text-align: center;

    p {
        margin-bottom: 0;
    }

    @media (max-width: $max-w-sm) {
        padding: 2rem;
    }
}

.becomeTeacher__features {
    margin-top: 3rem;
}

.becomeTeacher__feature {
    margin-bottom: 30px;
}

.becomeTeacher__featureIcon {
    width: 80%;
    max-width: 200px;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;

    @media (max-width: $max-w-sm) {
        max-width: 180px;
    }
}

.becomeTeacher__featureHeader {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 0.5rem;
}

.becomeTeacher__featureTitle {
    font-weight: bold;
    text-align: center;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
}

.becomeTeacher__featureDesc {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;

    @media (max-width: $max-w-sm) {
        text-align: center;
    }
}

.becomeTeacher__diagram {
    text-align: center;
    padding: 2rem 0;
    background-color: $gainsboro;
}

.becomeTeacher__diagramImg {
    width: 80%;
    max-width: 400px;
}

.becomeTeacher__btnBecome {
    @include btnBgColorCustom($brand-primary);
    color: #fff;
    /* -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out; */
    transition: all 0.2s ease-in-out;
    padding: 10px 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 3px 3px 5px 0 #0006;
    font-weight: bold;
    font-size: 20px;
}

.becomeTeacher__bottomBanner {
    padding: 5rem 1.5rem;
    background-image: url(/img/background/bg-becom-teacher2.jpg);
    background-size: cover;
    background-position: center center;
    text-align: center;

    p {
        font-size: 1.2rem;
        font-weight: 400;
        color: $gainsboro;
        text-shadow: 2px 3px 3px $black;
    }
}
</style>

<template>
    <div>
        <div class="StaticBanner">
            <transition
                appear
                name="bannerContent"
            >
                <div
                    class="StaticBanner__content"
                    v-if="bannerContentShow"
                >
                    <h1 class="StaticBanner__pageTitle">申請講師資格</h1>
                    <p class="StaticBanner__text">
                        全國唯一
                        <br class="d-block d-sm-none" />線上課程搭配實體課程的學習平台
                        <br />亦有專屬授課教室提供
                    </p>
                    <b-button
                        @click="becomeTeacher"
                        class="becomeTeacher__btnBecome"
                    >成為講師</b-button>
                </div>
            </transition>
        </div>
        <div class="becomeTeacher__slogan">
            <p>
                有滿腹分享的熱誠
                <br class="d-block d-sm-none" />卻找不到人交流？
                <br />對於教學有興趣
                <br class="d-block d-sm-none" />卻苦於不知如何開始嗎?
                <br />在這裡你可以找到
                <br class="d-block d-sm-none" />志同道合的同仁！
                <br />一起帶領同學玩轉新視界
                <br />若你和我們有一樣的熱忱
                <br class="d-block d-sm-none" />就加入大俠來一展長才吧！
            </p>
        </div>
        <div class="container becomeTeacher__features">
            <div class="row">
                <div class="col-12 col-lg-3 col-md-6 becomeTeacher__feature">
                    <figure class="becomeTeacher__featureIcon">
                        <img
                            alt="多元開課"
                            src="/img/icon-feature-1.svg"
                        />
                    </figure>
                    <h3 class="becomeTeacher__featureHeader">多元開課</h3>
                    <p class="becomeTeacher__featureTitle">任何人都可以開課</p>
                    <p class="becomeTeacher__featureDesc">只要將您的專長或興趣設計成課程，就可以幫助更多人</p>
                </div>
                <div class="col-12 col-lg-3 col-md-6 becomeTeacher__feature">
                    <figure class="becomeTeacher__featureIcon">
                        <img
                            alt="線上課程"
                            src="/img/icon-feature-2.svg"
                        />
                    </figure>
                    <h3 class="becomeTeacher__featureHeader">線上課程</h3>
                    <p class="becomeTeacher__featureTitle">創造被動收入</p>
                    <p class="becomeTeacher__featureDesc">每個月學生持續購買您的課程，就能有被動收入</p>
                    <p class="becomeTeacher__featureDesc">能教的課程越多，學生就越多，講師的被動收入就越多</p>
                </div>
                <div class="col-12 col-lg-3 col-md-6 becomeTeacher__feature">
                    <figure class="becomeTeacher__featureIcon">
                        <img
                            alt="線上課程"
                            src="/img/icon-feature-3.svg"
                        />
                    </figure>
                    <h3 class="becomeTeacher__featureHeader">線下實做</h3>
                    <p class="becomeTeacher__featureTitle">翻轉教育提升學習成效</p>
                    <p class="becomeTeacher__featureDesc">將重覆性的上課內容拍成線上課程，講師就不用一直講一樣的東西</p>
                    <p class="becomeTeacher__featureDesc">讓講師在實體課程跟學生討論並且實做，直接解決學生遇到的問題</p>
                </div>
                <div class="col-12 col-lg-3 col-md-6 becomeTeacher__feature">
                    <figure class="becomeTeacher__featureIcon">
                        <img
                            alt="線上課程"
                            src="/img/icon-feature-4.svg"
                        />
                    </figure>
                    <h3 class="becomeTeacher__featureHeader">功能齊全</h3>
                    <p class="becomeTeacher__featureTitle">提供金流、行政、學員管理等功能</p>
                    <p class="becomeTeacher__featureDesc">讓講師專心教課、開發新課程，不再被繁鎖的雜事牽絆</p>
                </div>
            </div>
        </div>
        <div class="becomeTeacher__diagram">
            <img
                alt="平台特色功能圖"
                class="becomeTeacher__diagramImg"
                src="/img/diagram-feature.svg"
            />
        </div>
        <div class="becomeTeacher__bottomBanner">
            <p>就是如此簡單幾個步驟，即可成為講師</p>
            <b-button
                @click="becomeTeacher"
                class="becomeTeacher__btnBecome"
            >成為講師</b-button>
        </div>
        <ModalBecomeTeacherPolicy ref="becomeTeacherPolicy" />
        <ModalBecomeTeacherFillData ref="becomeTeacherFillData" />
        <ModalAvatarUpdate ref="modalAvatarUpdate" />
        <ModalPhoneSetter ref="modalPhoneSetter" />
        <ModalPhoneVerify ref="modalPhoneVerify" />
        <ModalEmailVerifySender ref="modalEmailVerifySender" />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import ModalBecomeTeacherPolicy from '../components/ModalBecomeTeacherPolicy'
import ModalBecomeTeacherFillData from '../components/ModalBecomeTeacherFillData'
import ModalAvatarUpdate from '../components/ModalAvatarUpdate'
import ModalPhoneSetter from '../components/ModalPhoneSetter'
import ModalPhoneVerify from '../components/ModalPhoneVerify'
import ModalEmailVerifySender from '../components/ModalEmailVerifySender'

export default {
    name: 'BecomeTeacherIntro',
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.BECOME_TEACHER,
            bannerContentShow: false,
            needRefill: {}
        }
    },
    components: {
        ModalBecomeTeacherPolicy,
        ModalBecomeTeacherFillData,
        ModalAvatarUpdate,
        ModalPhoneSetter,
        ModalPhoneVerify,
        ModalEmailVerifySender
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        this.bannerContentShow = true
        EventBus.$on('policy-confirmed', this.checkDataLack)
        EventBus.$on('upload-avatar-completed', this.avatarCompleted)
        EventBus.$on('become-teacher-data-completed', this.teacherDataCompleted)
        EventBus.$on('phone-verfiy-completed', this.phoneVerifyCompleted)
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        ...mapState({
            memberFullData: state => state.member.memberFullData.data
        }),
        ...mapGetters({
            isLoginedMember: 'member/isLoginedMember'
        })
    },
    methods: {
        becomeTeacher() {
            if (this.isLoginedMember) {
                // 登入
                EventBus.$emit('show-teacher-policy')
            } else {
                // 未登入
                EventBus.$emit('prompt-login')
            }
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(
                this.$refs['becomeTeacherPolicy'].isShow ||
                    this.$refs['becomeTeacherFillData'].isShow ||
                    this.$refs['modalAvatarUpdate'].isShow ||
                    this.$refs['modalPhoneSetter'].isShow ||
                    this.$refs['modalPhoneVerify'].isShow ||
                    this.$refs['modalEmailVerifySender'].isShow
            )
        },
        async checkDataLack() {
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

            this.needRefill = {}
            this.checkEmail()
            this.checkAvatar()
            this.checkNicknameGender()
            this.checkcellphone()
            this.refillData()
        },
        checkEmail() {
            if (!this.memberFullData.email_verify) {
                this.needRefill.email = true
            }
        },
        checkAvatar() {
            if (!this.memberFullData.avg_img) {
                this.needRefill.avg_img = true
                // 缺照片
            }
        },
        checkNicknameGender() {
            if (!(this.memberFullData.sex && this.memberFullData.m_name)) {
                // 缺暱稱、性別
                this.needRefill.nickname = true
            }
        },
        checkcellphone() {
            if (!(this.memberFullData.cellphone && this.memberFullData.cellphone_verify_status)) {
                // 缺手機或沒驗證
                this.needRefill.cellphone = true
            }
        },
        refillData() {
            let datas = ['email', 'avg_img', 'nickname', 'cellphone'],
                events = [
                    'show-email-verify-sender',
                    'show-modal-avatar-update',
                    'show-teacher-fill-data',
                    'show-phone-setter'
                ],
                needRefill = datas.some((elm, idx) => {
                    if (this.needRefill[elm]) {
                        EventBus.$emit(events[idx])
                        return true
                    }
                })

            if (!needRefill) {
                this.goApply()
            }
        },
        avatarCompleted() {
            this.needRefill.avg_img = null
            this.refillData()
        },
        teacherDataCompleted() {
            this.needRefill.nickname = null
            this.refillData()
        },
        phoneVerifyCompleted() {
            this.needRefill.cellphone = null
            this.goApply()
        },
        goApply() {
            this.$router.push('/becometeacher')
        }
    },
    beforeDestroy() {
        this.$parent.switchBodyScrollStatus(false)
        EventBus.$off('policy-confirmed', this.checkDataLack)
        EventBus.$off('upload-avatar-completed', this.avatarCompleted)
        EventBus.$off('become-teacher-data-completed', this.teacherDataCompleted)
        EventBus.$off('phone-verfiy-completed', this.phoneVerifyCompleted)
    }
}
</script>