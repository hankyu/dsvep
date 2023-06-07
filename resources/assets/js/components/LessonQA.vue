<style lang="scss">
@import '../../sass/variables';

.lessonQA__newThread {
    margin-bottom: 1rem;
}

.lessonQA__btnNewThread {
    font-size: 0.9rem;
    line-height: 1;
    border-radius: $radius-bubble;
    margin-bottom: 1rem;
}

.qasender-enter-active,
.qasender-leave-active {
    transition: margin 0.5s $specialBezier, opacity 0.3s ease-in-out;
}

.qasender-enter,
.qasender-leave-to {
    opacity: 0;
    margin-top: -3rem;
}

.qasender-enter-to,
.qasender-leave {
    opacity: 1;
    margin-top: 0;
}

.lessonQA__noData {
    @extend .noData;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
}
</style>


<template>
    <div class="lessonQA">
        <transition
            apear
            mode="out-in"
            name="qasender"
        >
            <LessonQASender
                :notify="doNotify"
                :notifyMid="notifyMid"
                class="lessonQA__newThread"
                v-if="newThread"
            />
            <b-button
                @click="showNewThreadForm"
                class="lessonQA__btnNewThread"
                v-else
                variant="warning"
            >
                <font-awesome-icon
                    :icon="['far','comment-dots']"
                    class="faIcon"
                />開新話題
            </b-button>
        </transition>
        <LessonQAThread
            :key="idx"
            :threadData="thread"
            class="lessonQA__threads"
            v-for="(thread, idx) in qaData"
        />
        <div
            class="lessonQA__noData"
            v-if="!qaData.length"
        >尚無任何內容</div>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import LessonQAThread from './LessonQAThread'
import LessonQASender from './LessonQASender'
import { mapGetters } from 'vuex'

export default {
    name: 'LessonQA',
    components: { LessonQAThread, LessonQASender },
    data() {
        return {
            newThread: false,
            notifyMid: -1
        }
    },
    props: {
        qaData: {
            type: Array,
            default: []
        }
    },
    mounted() {},
    computed: {
        doNotify() {
            // 由同學開的話題，才要通知老師
            if (this.memberId != this.lessonShopTeacherMid) {
                this.notifyMid = this.lessonShopTeacherMid * 1
                return 1
            } else {
                return 0
            }
        },
        ...mapGetters({
            memberId: 'member/memberId',
            lessonShopTeacherMid: 'teacher/lessonShopTeacherMid'
        })
    },
    methods: {
        showNewThreadForm() {
            if (this.memberId) {
                this.newThread = true
            } else {
                EventBus.$emit('prompt-login')
            }
        }
    }
}
</script>