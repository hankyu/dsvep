<style lang="scss">
@import '../../sass/variables';

.lessonQAThread {
    list-style-type: none;
    padding-left: 0;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0;
    border-top: 1px dashed $color-border-primary;

    // &:nth-of-type(even) {
    //     background-color: $darkwhite;
    // }

    @media (max-width: $max-w-xs) {
        padding: 0;
    }
}

.lessonQAThread__qa {
    margin-left: 50px;
    display: flex;
    padding: 0.5rem 0;

    &:nth-child(1) {
        margin-left: 0;
    }
}

$pl-lessonQAContent: 0.5rem;
.lessonQAThread__content {
    flex: 1;
    padding-left: $pl-lessonQAContent;
    line-height: 1;
    overflow-x: hidden;
}

.lessonQAThread__name {
    margin-bottom: 0;
}

.lessonQAThread__teacherTagBar {
    font-size: 0.6rem;
    line-height: 0.8rem;
    margin-bottom: 0;
}

.lessonQAThread__teacherTag {
    display: inline-block;
    padding: 0 0.4rem;
    background-color: $emphasized4;
    border-radius: 0.4rem;
    margin-bottom: 0.2rem;
}

.lessonQAThread__time {
    color: $gray;
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
    text-align: right;
}

.lessonQAThread__message {
    margin-bottom: 0;
    background-color: $white;
    border: 1px solid $color-border-primary;
    border-radius: $radius-bubble;
    padding: 0.5rem 1rem;
    position: relative;
    margin-top: 0.25rem;
    line-height: 1.5;

    &:after {
        position: absolute;
        top: 8px;
        left: -14px;
        content: '';
        width: 15px;
        height: 14px;
        background-image: url(/img/talk-bubble-tail-border.svg);
        background-size: 20px 14px;
    }

    img {
        max-width: 100%;
    }
    a {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    @media (max-width: $max-w-xs) {
        padding: 0.25rem 0.5rem;
    }
}

.lessonQAThread__replyBar {
    text-align: right;
    padding: 1rem 0 0.5rem;
    margin-left: 60px;

    @media (max-width: $max-w-xs) {
        margin-left: 0;
    }
}

.lessonQAThread__btnNewReply {
    font-size: 0.9rem;
    line-height: 1;
    border-radius: $radius-bubble;
}

.lessonQAThread__newReply {
    width: 100%;
}
</style>


<template>
    <ul class="lessonQAThread">
        <li
            class="lessonQAThread__qa"
            v-for="qa in threadData"
        >
            <BaseAvatar
                :avatarImg="qa.avg_img"
                :avatarWidth="40"
                class="lessonQAThread__avatar"
            />
            <div class="lessonQAThread__content">
                <p
                    class="lessonQAThread__teacherTagBar"
                    v-if="qa.self"
                >
                    <span class="lessonQAThread__teacherTag">課程導師</span>
                </p>
                <p class="lessonQAThread__name">{{ qa.nickname + (qa.m_name?' ('+ qa.m_name+ ')':'') }}</p>
                <div
                    class="lessonQAThread__message"
                    v-html="qaMessage(qa)"
                />
                <p class="lessonQAThread__time">{{qa.updated_at}}</p>
            </div>
        </li>
        <li class="lessonQAThread__replyBar">
            <transition
                apear
                mode="out-in"
                name="qasender"
            >
                <LessonQASender
                    :notify="doNotify"
                    :notifyMid="notifyMid"
                    :replyMode="1"
                    :token="threadToken"
                    class="lessonQAThread__newReply"
                    v-if="newReply"
                />
                <b-button
                    @click="showNewThreadForm"
                    class="lessonQAThread__btnNewReply"
                    v-else
                    variant="warning"
                >
                    <font-awesome-icon
                        :icon="['far','comment-dots']"
                        class="faIcon"
                    />回覆
                </b-button>
            </transition>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import LessonQASender from './LessonQASender'
import ClearHtml from '../class/clearHtml'

let clearHtml = new ClearHtml()

export default {
    name: 'LessonQAThread',
    components: {
        LessonQASender
    },
    data() {
        return {
            newReply: false,
            notifyMid: -1
        }
    },
    props: {
        threadData: {
            type: Array,
            default: []
        }
    },
    mounted() {},
    computed: {
        threadToken() {
            return this.threadData[0].token
        },
        doNotify() {
            if (this.memberId != this.teacherMId) {
                // 老師回復才要通知學生
                return 0
            }

            // 老師身份
            let already = this.threadData.some(t => {
                // 老師是否已經回覆過，或由老師開的話題，就不通知開話題的同學了
                return t.m_id == this.teacherMId
            })
            if (!already) {
                this.notifyMid = this.threadData[0].m_id * 1
            }
            return already ? 0 : 2
        },
        ...mapGetters({
            logined: 'member/isLoginedMember',
            memberId: 'member/memberId',
            teacherMId: 'teacher/lessonShopTeacherMid'
        })
    },
    methods: {
        showNewThreadForm() {
            if (this.logined) {
                this.newReply = true
            } else {
                EventBus.$emit('prompt-login')
            }
        },
        qaMessage(qa) {
            return clearHtml.QaClearHTML(qa.message)
        },
        getThreadMembersId() {
            let mids = []

            if (this.teacherMId != this.memberId) {
                mids.push(this.teacherMId)
            }

            this.threadData.forEach(item => {
                if (
                    item.m_id != this.memberId &&
                    !mids.some(mid => {
                        return mid == item.m_id
                    })
                ) {
                    mids.push(item.m_id)
                }
            })
            return mids
        }
    }
}
</script>