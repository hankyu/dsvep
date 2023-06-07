<style lang="scss" scoped>
@import '../../sass/variables';
.videoPlayerModal__layer {
    @extend .wrapper;
    @extend .modalShadow;
    /* display: flex;
    flex-flow: column; */
    width: 600px;
    min-width: 0;
    max-width: 100%;
    min-height: 0;
    padding: 0;
    border-top: 0;
    cursor: default;

    &.videoPlayerModal__layer--1 {
        border: 1px solid $dark;
    }

    @media (max-width: $max-w-md) {
        max-width: 80%;
    }

    @media (max-width: $max-w-xs) {
        max-width: 90%;
    }
}

.fade-in-down-enter-active,
.fade-in-down-leave-active {
    transition: transform 0.2s $specialBezier;
}

.fade-in-down-enter,
.fade-in-down-leave-to {
    transform: translateY(-150px);
    opacity: 0;
}
.fade-in-down-enter-to,
.fade-in-down-leave {
    transform: translateY(0px);
}

.videoPlayerModal__header {
    height: 0;
    text-align: right;
}

.videoPlayerModal__closeBtn {
    width: 40px;
    height: 40px;
    background-color: #fff9;
    border-radius: 50%;
    z-index: 20;
    position: relative;
    left: 20px;
    top: -20px;
}

.videoPlayerModal__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    background-color: $font-primary;

    .videoPlayerModal__videoList {
        list-style-type: none;
        padding: 0;
        margin-bottom: 0;
        flex: 1;
        overflow-y: auto;
        background-color: $darkgray;
    }

    .videoPlayerModal__videoListItem {
        padding: 0.5rem;
        color: $white;

        &:hover,
        &:active {
            background-color: darken($darkgray, 10%);
        }

        &.videoPlayerModal__videoListItem--active {
            background-color: $complementary1;
        }
    }

    .videoPlayerModal__videoListItem + .videoPlayerModal__videoListItem {
        border-top: 1px solid $gray;
    }

    @media (max-width: $max-w-xs) {
        .videoPlayerModal__videoListItem {
            font-size: 0.8rem;
        }
    }

    // 手機橫擺
    @media (max-height: 500px) and(min-width: 500px) {
        height: 80vh;
        flex-direction: row;
        align-items: center;

        .videoPlayerModal__plyr {
            width: 50%;
        }
        .videoPlayerModal__videoList {
            height: 100%;
        }
        .videoPlayerModal__videoListItem {
            font-size: 0.8rem;
        }
    }
}

.videoPlayerModal__footer {
    background-color: $dark;
}

.videoPlayerModal__footerBtn {
    background-color: transparent;
    color: $darkgray;
    border: none;
    font-size: 0.8rem;
    padding: 0.25rem;

    &.videoPlayerModal__footerBtn--enable {
        color: $emphasized4;
    }
}
</style>

<template>
    <BaseFullMask
        @shakeModalLayer="shakeModalLayer"
        v-bind="$props"
        v-if="isShow"
    >
        <!-- maskCloseEvent="close-video-modal" -->
        <transition
            appear
            name="fade-in-down"
        >
            <div
                :style="layerStyle"
                @click.stop
                class="videoPlayerModal__layer"
                ref="popupModalLayer"
                v-if="showLayer"
            >
                <div
                    class="videoPlayerModal__header"
                    slot="header"
                >
                    <CloseButton
                        @click="closeModal"
                        class="videoPlayerModal__closeBtn"
                    />
                </div>
                <div class="videoPlayerModal__body">
                    <vue-plyr
                        class="videoPlayerModal__plyr"
                        ref="plyr"
                    >
                        <video
                            :autoplay="autoPlay"
                            :poster="currVideoPoster"
                            :src="currVideoSrc"
                            preload="auto"
                        >
                            <source
                                :src="currVideoSrc"
                                type="video/mp4"
                            />
                            <!-- size="768" -->
                            <!-- <track
                                default
                                kind="subtitles"
                                label="English"
                                src="/subtitles/subtitle_en.vtt"
                                srclang="en"
                            />
                            <track
                                default
                                kind="subtitles"
                                label="Chinese"
                                src="/subtitles/subtitle_tw.vtt"
                                srclang="tw"
                            />-->
                            This browser does not support the HTML5 video element.
                        </video>
                    </vue-plyr>
                    <ul class="videoPlayerModal__videoList">
                        <li
                            :class="chapter.idx == currIdx? 'videoPlayerModal__videoListItem--active':''"
                            @click="changeCurrVideo(idx)"
                            class="videoPlayerModal__videoListItem"
                            v-for="(chapter,idx) in chapters"
                        >
                            <font-awesome-icon
                                icon="play"
                                v-if="chapter.idx == currIdx"
                            />
                            <font-awesome-icon
                                icon="film"
                                v-else
                            />
                            {{ chapter.c_name }}
                        </li>
                    </ul>
                </div>
                <div
                    class="videoPlayerModal__footer text-right"
                    slot="footer"
                >
                    <button
                        :class="btnAutoPlayClass"
                        @click="switchAutoPlay"
                        class="videoPlayerModal__footerBtn"
                        type="button"
                    >自動播放</button>
                </div>
            </div>
        </transition>
    </BaseFullMask>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import BaseModal from './global/BaseModal'
import CloseButton from './CloseButton'

export default {
    name: 'ModalVideo',
    extends: BaseModal,
    components: { CloseButton },
    data() {
        return {
            isShow: false,
            currIdx: 0,
            autoPlay: false,
            currListIdx: 0,
            player: null,
            records: {}
        }
    },
    props: {
        chapters: {
            type: Array,
            required: true
        },
        lessonId: {
            required: true
        }
    },
    created() {
        this.recordWatched = () => {
            if (this.player.currentTime) {
                this.records[this.currListIdx] = this.player.currentTime
                this.throttleSendRecord()
            }
        }
        this.throttleRecordWatched = _.throttle(this.recordWatched, 500)
        this.throttleSendRecord = _.throttle(this.sendRecord, 60000)
        this.debounceSendRecord = _.debounce(this.sendRecord, 1000)
    },
    mounted() {
        EventBus.$on('show-video-modal', this.showModal)
        EventBus.$on('close-video-modal', this.closeModal)
    },
    beforeUpdate() {
        if (this.player && !this.isShow) {
            this.sendRecord()
        }
    },
    updated() {
        if (this.isShow) {
            if (!this.player && this.$refs.plyr.player) {
                this.player = this.$refs.plyr.player
                this.player.on(
                    'timeupdate',
                    function() {
                        if (this.player.playing) {
                            this.throttleRecordWatched()
                        }
                    }.bind(this)
                )

                this.player.on('pause', () => {
                    this.debounceSendRecord()
                })

                this.player.on('play', () => {
                    let watched = this.records[this.currListIdx]
                        ? this.records[this.currListIdx]
                        : this.chapters[this.currListIdx].time_watched
                })

                this.player.on(
                    'canplayall',
                    function() {
                        this.player.currentTime(50).capture()
                    }.bind(this)
                )
            }

            /* this.player.on('', () => {
                if (
                    this.chapters[this.currListIdx].c_video_length - watched >
                    JS_CONFIG.VIDEO_IGNORE_TAIL
                ) {
                    this.player.currentTime = watched
                }
            }) */
        }
    },
    computed: {
        currVideoSrc() {
            let currChapter = this.chapters[this.currListIdx]
            return JS_CONFIG.VIDEO_PATH.replace('LESSON_ID', this.lessonId) + currChapter.c_video
        },
        currVideoPoster() {
            let currChapter = this.chapters[this.currListIdx]
            return currChapter.image_url
        },
        btnAutoPlayClass() {
            return this.autoPlay ? 'videoPlayerModal__footerBtn--enable' : ''
        }
    },
    methods: {
        showModal(idx) {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            this.records = {}
            this.currIdx = idx
            this.currListIdx = this.getCurrListIdx(idx)
        },
        closeModal() {
            this.isShow = false
            this.autoPlay = false
            this.player.off('timeupdate')
            this.player.off('ended')
            this.player.off('pause')
            this.$parent.checkBodyScrollStatus()
        },
        changeCurrVideo(idx) {
            this.currListIdx = idx
            this.currIdx = this.chapters[this.currListIdx].idx
        },
        switchAutoPlay() {
            this.autoPlay = !this.autoPlay
            if (this.autoPlay) {
                if (!this.player) {
                    this.player = this.$refs.plyr.player
                }
                this.player.on('ended', this.nextVideo)
                this.currListIdx = this.getCurrListIdx(this.currIdx)
            } else {
                this.player.off('ended', this.nextVideo)
            }
        },
        getCurrListIdx(idx) {
            for (let i = 0, j = this.chapters.length; i < j; i++) {
                if (this.chapters[i].idx == idx) {
                    return i
                }
            }
        },
        nextVideo() {
            if (this.autoPlay && this.currListIdx < this.chapters.length - 1) {
                this.currIdx = this.chapters[++this.currListIdx].idx
            }
        },
        play() {
            this.player.play()
        },
        sendRecord() {
            let keys = Object.keys(this.records),
                mid = this.$store.state.member.memberData.data.m_id

            if (keys.length) {
                keys.forEach(chapterListIdx => {
                    let watched = Math.floor(this.records[chapterListIdx]),
                        u_id = this.chapters[chapterListIdx].u_id,
                        c_id = this.chapters[chapterListIdx].c_id

                    try {
                        this.$store.dispatch('lesson/recordVideoWatched', { u_id, c_id, watched })
                    } catch (e) {}
                })
            }
        }
    },

    beforeDestroy() {
        EventBus.$off('show-video-modal', this.showModal)
        EventBus.$off('close-video-modal', this.closeModal)
    }
}
</script>