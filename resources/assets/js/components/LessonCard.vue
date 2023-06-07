<style lang="scss">
@import '../../sass/variables';

$pd-lessonCard: 3px;
.lessonCard {
    padding: $pd-lessonCard;
    cursor: pointer;
    width: 300px;

    @media (max-width: $max-w-xs) {
        width: 220px;
    }
}

.lessonCard__wrapper {
    position: relative;
    display: block;
}

$w-folded: 3px;
$h-over: 9px;
.lessonCard__type {
    @extend .lessonTypeShadow;
    position: absolute;
    left: 3px;
    top: -$pd-lessonCard - $h-over;
    padding: 3px 5px;
    color: $white;
    z-index: 3;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: -$w-folded;
        border-bottom: $h-over solid $gray;
        border-top: none;
        border-right: $w-folded solid transparent;
        border-left: none;
        width: $w-folded;
        height: $h-over;
        z-index: 2;
    }
}

.lessonCard__id {
    position: absolute;
    left: 55px;
    top: -23px;
    padding: 3px 5px;
    color: $bs-primary;
    text-shadow: 1px 1px 0 $white;
    font-size: 0.8rem;
    z-index: 2;
}

.lessonCard__imgA {
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    background-color: $gainsboro;
    @extend .coverImgOuter;
    position: relative;
}

.lessonCard__imgContainer {
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    background-color: $gainsboro;
    @extend .coverImgOuter;
    position: relative;
    border-bottom: 1px solid $gainsboro;
}

.lessonCard__img {
    @extend .coverImgInner;
    @extend .hoverScaleBig;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
}

$fsz-lessonName: 1rem;
$h-lessonName: $fsz-lessonName * 2;
$fsz-lessonName-xs: 1rem;
$h-lessonName-xs: $fsz-lessonName-xs * 2;
.lessonCard__name {
    @extend .singleLineEllipsis;
    font-size: $fsz-lessonName;
    line-height: $h-lessonName;
    height: $h-lessonName;
    text-align: center;
    font-weight: bold;
    color: $font-primary;

    @media (max-width: $max-w-xs) {
        font-size: $fsz-lessonName-xs;
        line-height: $h-lessonName-xs;
        height: $h-lessonName-xs;
    }
}

.lessonCard__teacherAvatar {
    position: relative;
    width: 100%;
    height: 0;
    font-size: 0;
    top: 0;
    z-index: 5;
}

.lessonCard__teacherAvatarA {
    display: block;
    position: absolute;
    right: 1px;
    bottom: 1px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: $gainsboro;
    @extend .cardShadow;
}

.lessonCard__teacherName {
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.25;
    margin-bottom: 0;
    color: $font-primary;
}

$h-auditStatusLabel: 28px;
$bdr-auditStatusLabel: $h-auditStatusLabel / 2;
.lessonCard__auditStatus {
    position: relative;
    width: 100%;
    height: 0;
    overflow-y: visible;
    text-align: center;

    .lessonCard__auditStatusLabel {
        position: relative;
        display: inline-block;
        top: -3px - $h-auditStatusLabel;
        border-radius: $bdr-auditStatusLabel;
        min-width: 100px;
        height: $h-auditStatusLabel;
        font-size: 14px;
        line-height: $h-auditStatusLabel;
        z-index: 3;
        color: $white;

        &.lessonCard__auditStatusLabel--gray {
            background-color: $gray;
        }
        &.lessonCard__auditStatusLabel--complementary1 {
            background-color: $complementary1;
        }
        &.lessonCard__auditStatusLabel--bsSuccess {
            background-color: $emphasized4;
        }
        &.lessonCard__auditStatusLabel--emphasized2 {
            background-color: $emphasized2;
        }
    }
}

.lessonCard__timeArea {
    text-align: center;
    font-size: 0.9rem;
    height: 1.125rem;
    line-height: 1.25;
    margin-bottom: 0;
    color: $font-primary;

    @media (max-width: $max-w-xs) {
        font-size: 0.8rem;
        height: 2rem;
    }
}

.lessonCard__price {
    text-align: center;
    margin-bottom: 0;

    @media (max-width: $max-w-xs) {
        margin-bottom: 0.2rem;
    }
}

.lessonCard__currFee {
    margin: 0;
    text-align: center;
    color: $emphasized2;
    font-size: 1rem;
    font-weight: bold;

    &::before {
        content: '$NT';
        display: inline;
        margin-right: 3px;
    }

    @media (max-width: $max-w-xs) {
        font-size: 0.9rem;
    }
    &.lessonCard__currFee--free,
    &.lessonCard__currFee--none {
        &:before {
            content: '';
            display: none;
            margin-right: 0;
        }
    }

    &.lessonCard__currFee--none {
        font-weight: normal;
    }
}

.lessonCard__originFee {
    color: $gray;
    font-size: 0.7rem;
    text-decoration: line-through;
    margin-right: 5px;
}

.lessonCard__lessonLabelP {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    .lessonCard__label {
        display: inline-block;
    }

    @media (max-width: $max-w-xs) {
        font-size: 0.8rem;
        margin-bottom: 0;
    }
}

.lessonCard__iconOwned {
    /* position: absolute;
    left: 58px;
    top: 4px;
    z-index: 4; */
    // color: $emphasized2;
    color: $emphasized4;
    background-color: $white;
}

.lessonCard__btnFavorite {
    margin-top: -5px;
    margin-bottom: 5px;
}

.lessonCard__managerZone {
    border-top: 1px dashed $lightgray;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .lessonCard__managerZoneBtn {
        display: block;
        flex: 1;
    }
}

.lessonCard--manager {
    .lessonCard__name {
        font-size: 0.9rem;
        @media (max-width: $max-w-xs) {
            font-size: 0.8rem;
        }
    }

    .lessonCard__teacherName {
        font-size: 0.8rem;
        line-height: 1.25;
    }

    .lessonCard__timeArea {
        text-align: center;
        font-size: 0.8rem;
        height: 1rem;
        line-height: 1rem;
        @media (max-width: $max-w-xs) {
            font-size: 0.8rem;
            height: 2rem;
        }
    }

    .lessonCard__price {
        font-size: 0.8rem;
    }

    .lessonCard__currFee {
        font-size: 0.8rem;
        @media (max-width: $max-w-xs) {
            font-size: 0.8rem;
        }
    }

    .lessonCard__originFee {
        font-size: 0.7rem;
    }

    .lessonCard__lessonLabelP {
        font-size: 0.8rem;

        @media (max-width: $max-w-xs) {
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
        }
    }
}
</style>


<template>
    <BaseCard
        :class="managerMode?'lessonCard--manager':''"
        class="lessonCard"
    >
        <router-link
            :to="cardUrl"
            class="lessonCard__wrapper"
            v-if="cardUrl"
        >
            <LessonCardType
                :lessonType="lessonData.type"
                class="lessonCard__type"
            />

            <span class="lessonCard__id">#{{ lessonData.l_id }}</span>
            <div class="lessonCard__imgContainer">
                <div
                    :style="lessonCardImgStyle"
                    class="lessonCard__img"
                />
            </div>
        </router-link>
        <div
            @click="startStudy"
            class="lessonCard__wrapper"
            v-else
        >
            <LessonCardType
                :lessonType="lessonData.type"
                class="lessonCard__type"
            />

            <span class="lessonCard__id">#{{ lessonData.l_id }}</span>
            <div class="lessonCard__imgContainer">
                <div
                    :style="lessonCardImgStyle"
                    class="lessonCard__img"
                />
            </div>
        </div>
        <div
            class="lessonCard__teacherAvatar"
            v-if="!noTeacherAvatar"
        >
            <router-link
                :title="teacherFullName"
                :to="teacherURL"
                class="lessonCard__teacherAvatarA"
            >
                <BaseAvatar
                    :avatarImg="lessonData.t_avg_img"
                    :avatarWidth="60"
                    :borderW="2"
                    borderC="#fff"
                >
                    <div style="font-size: .8rem;text-align: center">a</div>
                </BaseAvatar>
            </router-link>
        </div>

        <router-link
            :to="cardUrl"
            class="lessonCard__wrapper"
            v-if="cardUrl"
        >
            <div
                class="lessonCard__auditStatus"
                v-if="showAuditStatus"
            >
                <span
                    :class="lessonAuditClass"
                    class="lessonCard__auditStatusLabel"
                >{{ lessonAuditStatus }}</span>
            </div>
            <header
                :title="lessonData.l_name"
                class="lessonCard__name"
            >{{ lessonData.l_name }}</header>
            <p class="lessonCard__teacherName">{{ teacherFullName }}</p>
            <p class="lessonCard__timeArea">
                {{ lessonStartTime }}
                <br class="d-block d-sm-none" />
                <font-awesome-icon
                    icon="map-marker-alt"
                    v-if="lessonData.location"
                />
                {{ lessonArea }}
            </p>
            <p
                class="lessonCard__price"
                v-if="myLessonMode"
            >
                <del
                    class="lessonCard__originFee"
                    v-if="hasDifferentOriginFee"
                >$NT {{ lessonData.origin_fee }}</del>
                <span
                    class="lessonCard__currFee"
                    v-if="lessonData.orderPrice"
                >{{ lessonData.orderPrice }}</span>
                <span
                    class="lessonCard__currFee lessonCard__currFee--free"
                    v-else
                >免費</span>
            </p>
            <p
                class="lessonCard__price"
                v-else
            >
                <del
                    class="lessonCard__originFee"
                    v-if="hasDifferentOriginFee"
                >$NT {{ lessonData.origin_fee }}</del>
                <span
                    class="lessonCard__currFee"
                    v-if="lessonData.current_fee"
                >{{ lessonData.current_fee }}</span>
                <span
                    class="lessonCard__currFee lessonCard__currFee--none"
                    v-else-if="lessonData.apply_situation=='no apply'"
                >價格未定</span>
                <span
                    class="lessonCard__currFee lessonCard__currFee--free"
                    v-else
                >免費</span>
                <font-awesome-icon
                    class="lessonCard__iconOwned"
                    icon="check-square"
                    title="已擁有"
                    v-if="lessonData.owned==2"
                ></font-awesome-icon>
            </p>
            <p class="lessonCard__lessonLabelP">
                <LessonCardLabel
                    :lessonData="lessonData"
                    class="lessonCard__label"
                />
            </p>
            <ButtonFavorite
                :favorite="lessonData.favorite"
                @click.native.stop="switchFavorite"
                class="lessonCard__btnFavorite"
                v-if="favoriteMode"
            />
        </router-link>
        <div
            @click="startStudy"
            class="lessonCard__wrapper"
            v-else
        >
            <div
                class="lessonCard__auditStatus"
                v-if="showAuditStatus"
            >
                <span
                    :class="lessonAuditClass"
                    class="lessonCard__auditStatusLabel"
                >{{ lessonAuditStatus }}</span>
            </div>
            <header
                :title="lessonData.l_name"
                class="lessonCard__name"
            >{{ lessonData.l_name }}</header>
            <p class="lessonCard__teacherName">{{ teacherFullName }}</p>
            <p class="lessonCard__timeArea">
                {{ lessonStartTime }}
                <br class="d-block d-sm-none" />
                <font-awesome-icon
                    icon="map-marker-alt"
                    v-if="lessonData.location"
                />
                {{ lessonArea }}
            </p>
            <p
                class="lessonCard__price"
                v-if="myLessonMode"
            >
                <del
                    class="lessonCard__originFee"
                    v-if="hasDifferentOriginFee"
                >$NT {{ lessonData.origin_fee }}</del>
                <span
                    class="lessonCard__currFee"
                    v-if="lessonData.orderPrice"
                >{{ lessonData.orderPrice }}</span>
                <span
                    class="lessonCard__currFee lessonCard__currFee--free"
                    v-else
                >免費</span>
            </p>
            <p
                class="lessonCard__price"
                v-else
            >
                <del
                    class="lessonCard__originFee"
                    v-if="hasDifferentOriginFee"
                >$NT {{ lessonData.origin_fee }}</del>
                <span
                    class="lessonCard__currFee"
                    v-if="lessonData.current_fee"
                >{{ lessonData.current_fee }}</span>
                <span
                    class="lessonCard__currFee lessonCard__currFee--free"
                    v-else
                >免費</span>
                <font-awesome-icon
                    class="lessonCard__iconOwned"
                    icon="check-square"
                    title="已擁有"
                    v-if="lessonData.owned==2"
                ></font-awesome-icon>
            </p>
            <p class="lessonCard__lessonLabelP">
                <LessonCardLabel
                    :lessonData="lessonData"
                    class="lessonCard__label"
                />
            </p>
            <ButtonFavorite
                :favorite="lessonData.favorite"
                @click.native.stop="switchFavorite"
                class="lessonCard__btnFavorite"
                v-if="favoriteMode"
            />
        </div>

        <!-- 講師本人或行政 功能 -->
        <div
            class="lessonCard__managerZone"
            v-if="managerMode"
        >
            <!-- <router-link
                :to="'/teacher/lesson/manage/'+lessonData.l_id+'/info'"
                class="btn lessonCard__managerZoneBtn btn-info btn-sm"
            >編輯</router-link>-->
            <a
                :href="'/teacher/lesson/manage/'+lessonData.l_id+'/info'"
                class="btn lessonCard__managerZoneBtn btn-info btn-sm"
            >編輯</a>
            <b-button
                @click="deleteLesson(lessonData.l_id)"
                class="lessonCard__managerZoneBtn"
                size="sm"
                v-if="lessonData.apply_situation=='no apply'"
                variant="danger"
            >刪除</b-button>
        </div>
    </BaseCard>
</template>

<script>
import { COMMON_UTILITY } from '../class/commonUtility'
import { JS_CONFIG } from '../config.js'
import { EventBus } from '../event-bus'
import LessonCardType from './LessonCardType'
import LessonCardLabel from './LessonCardLabel'
import ButtonFavorite from './ButtonFavorite'
import { goClassroomOrShop } from '../mixins/goClassroomOrShop'

export default {
    name: 'LessonCard',

    mixins: [goClassroomOrShop],
    components: {
        LessonCardLabel,
        LessonCardType,
        ButtonFavorite
    },
    data() {
        return {
            cardUrl: ''
        }
    },

    props: {
        lessonData: {
            type: Object,
            required: true
        },

        showAuditStatus: {
            type: Boolean,
            default: false
        },

        favoriteMode: {
            type: Boolean,
            default: false
        },

        myLessonMode: {
            type: Boolean,
            default: false
        },

        managerMode: {
            type: Boolean,
            default: false
        },
        noTeacherAvatar: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        this.getCardUrl()
    },

    computed: {
        cardTo() {
            return 'javascript:void(0)'
        },
        lessonURL() {
            return '/lesson/' + this.lessonData.l_id
        },

        teacherURL() {
            return '/teacher/' + this.lessonData.t_id
        },

        teacherFullName() {
            return (
                this.lessonData.t_nickname +
                (this.lessonData.t_name ? '(' + this.lessonData.t_name + ')' : '')
            )
        },

        lessonType() {
            return this.lessonData.type == 'online' ? '線上' : '實體'
        },

        lessonStartTime() {
            let l_start_time = this.lessonData.l_start_time

            return l_start_time
                ? l_start_time.substr(0, 16) +
                      ` (${COMMON_UTILITY.timeString2ChinesWeekDay(l_start_time)})`
                : ' '
        },

        hasDifferentOriginFee() {
            return this.myLessonMode
                ? this.lessonData.orderPrice != this.lessonData.origin_fee
                : this.lessonData.current_fee != this.lessonData.origin_fee
        },

        lessonCardImgStyle() {
            return `background-image:url(${JS_CONFIG.MEDIA_PATH.replace(
                'LESSON_ID',
                this.lessonData.l_id
            ) + this.lessonData.cover});`
        },

        lessonAuditStatus() {
            let label

            switch (this.lessonData.apply_situation) {
                case 'no apply':
                    label = '草稿'
                    break
                case 'audit':
                    label = '審核中'
                    break
                case 'success':
                    label = '已發佈'
                    break
                case 'fail':
                    label = '審核失敗'
                    break
            }
            return label
        },
        lessonAuditClass() {
            let labelColor, labelStyle

            switch (this.lessonData.apply_situation) {
                case 'no apply':
                    labelColor = 'gray'
                    break
                case 'audit':
                    labelColor = 'complementary1'
                    break
                case 'success':
                    labelColor = 'bsSuccess'
                    break
                case 'fail':
                    labelColor = 'emphasized2'
                    break
            }

            labelStyle = 'lessonCard__auditStatusLabel--' + labelColor

            return labelStyle
        },

        isOtherArea() {
            return this.lessonData.location
                ? this.lessonData.location.substr(0, 2) === '其他'
                : false
        },

        lessonArea() {
            let loca = this.lessonData.location

            return loca ? (this.isOtherArea ? '其他' : loca.substr(0, 3)) : ''
        }
    },

    methods: {
        async switchFavorite() {
            try {
                let favorite = this.lessonData.favorite ? 0 : 1,
                    response = await this.$store.dispatch('lesson/switchFavorite', {
                        lid: this.lessonData.l_id,
                        favorite
                    })
                if (response.data.status == 0) {
                    this.$store.commit('lesson/FAVORITE', { l_id: this.lessonData.l_id, favorite })
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'switchFavorite',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        startStudy() {
            EventBus.$emit('open-start-study', {
                l_id: this.lessonData.l_id,
                l_name: this.lessonData.l_name,
                deadline: this.lessonData.deadline
            })
        },
        getCardUrl() {
            let memberData = this.$store.state.member.memberData.data,
                tmpUrl = this.getGoClassroomOrShopUrl({
                    l_id: this.lessonData.l_id,
                    l_name: this.lessonData.l_name,
                    l_Type: this.lessonData.type,
                    owned: this.lessonData.owned,
                    deadline: this.lessonData.deadline,
                    orderDeadline: this.lessonData.orderDeadline,
                    orderRestrict: this.lessonData.restrict,
                    t_id: this.lessonData.t_id,
                    m_t_id: memberData.t_id,
                    role: memberData.role,
                    start_time: this.lessonData.start_time
                })

            if (tmpUrl == 'open-start-study') {
                this.cardUrl = ''
            } else {
                this.cardUrl = tmpUrl
            }
        },
        deleteLesson(l_id) {
            this.$parent.deleteLesson(l_id)
        }
    }
}
</script>