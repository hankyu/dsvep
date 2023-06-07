<style lang="scss" scoped>
@import '../../sass/variables';

.lessonUnitChapter {
    display: flex;
}

.lessonUnitChapter__header {
    flex: 1;
    padding: 0 0.25rem;
    font-size: 1rem;
    line-height: 1.25;
}

.lessonUnitChapter__remark {
    font-size: 0.8rem;
    margin-bottom: 0;
    color: $darkgray;
    font-weight: lighter;
}

.lessonUnitChapter__situation {
    width: 60px;
    height: 45px;
    text-align: center;
    background-size: cover;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 20;
        width: 100%;
        height: 5px;
        background-color: $black;
    }
    .lessonUnitChapter__watched {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 20;
        height: 5px;
        background-color: $bs-danger;
    }

    @media (max-width: $max-w-xs) {
        width: 48px;
        height: 36px;
    }
}

.lessonUnitChapter__freeWatch {
    background-color: $emphasized4;
    font-size: 0.7rem;
    border-radius: 0.6rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}

.lessonUnitChapter__iconPlay {
    display: inline-block;
    color: $brand-primary;
    background-color: $black;
    padding: 0 0.25rem 0 0.3rem;
    border-radius: 0.25rem;
    margin-top: 0.2rem;
}

.lessonUnitChapter--watchable {
    cursor: pointer;
}
.lessonUnitChapter--locked {
    background-color: $gainsboro;
}
</style>


<template>
    <li
        :class="lessonUnitChapterClass"
        @click="onclick"
        class="lessonUnitChapter"
    >
        <div
            :style="situationStyle"
            class="lessonUnitChapter__situation"
        >
            <div
                :style="watchedStyle"
                class="lessonUnitChapter__watched"
            ></div>
            <font-awesome-icon
                icon="lock"
                v-if="!watchable"
            />
            <span
                class="lessonUnitChapter__freeWatch"
                v-else-if="freeWatch()"
            >免費</span>

            <span
                class="lessonUnitChapter__iconPlay"
                v-else
            >
                <font-awesome-icon icon="play" />
            </span>
        </div>
        <header class="lessonUnitChapter__header">
            <!-- <font-awesome-icon
                class="faIcon"
                icon="film"
            />-->
            {{chapter.c_name}}
            <p
                class="lessonUnitChapter__remark"
                v-if="chapter.remark"
            >{{chapter.remark}}</p>
        </header>
        <div class="lessonUnitChapter__duration">{{ lessonDuration }}</div>
    </li>
</template>

<script>
import { EventBus } from '../event-bus'
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    name: 'LessonUnitFoldableItemChapter',
    props: {
        chapter: {
            type: Object,
            default() {
                return {}
            }
        },
        chapterIdx: {
            type: Number,
            required: true
        }
    },
    mounted() {},
    computed: {
        watchedStyle() {
            let watched = this.chapter.time_watched,
                length = this.chapter.c_video_length,
                perc

            perc = watched > length ? 100 : Math.ceil((watched / length) * 100)
            return `width:${perc}%;`
        },
        lessonUnitChapterClass() {
            return this.watchable ? 'lessonUnitChapter--watchable' : 'lessonUnitChapter--locked'
        },
        situationStyle() {
            return this.chapter.image_url ? `background-image:url(${this.chapter.image_url});` : ''
        },
        watchable() {
            return this.freeWatch() || this.chapter.c_video
        },
        lessonDuration() {
            let HH = COMMON_UTILITY.fillZero(Math.floor(this.chapter.c_video_length / 60), 2),
                MM = COMMON_UTILITY.fillZero(this.chapter.c_video_length % 60, 2)
            return HH + ':' + MM
        }
    },
    methods: {
        freeWatch() {
            return this.chapter.c_video_situation == 'free'
        },
        onclick() {
            if (this.watchable) {
                EventBus.$emit('show-video-modal', this.chapterIdx)
            }
        }
    }
}
</script>