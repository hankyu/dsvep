<style lang="scss" scopeed>
@import '../../sass/variables';
$h-lessonSlider__header: 28px;
$pt-lessonSlider: 30px;

.lessonSlider {
    position: relative;
}

.lessonSlider__header {
    text-align: center;
    position: relative;

    &::before {
        content: '';
        display: block;
        height: 2px;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: $lightgray;
        z-index: 1;
        margin: auto;
    }

    .lessonSlider__h2 {
        font-weight: bold;
        display: inline-block;
        font-size: 1.4rem;
        position: relative;
        z-index: 10;
        padding-left: 10px;
        padding-right: 10px;
        background-color: $darkwhite;
    }
}

$mlr-lessonSliderContainer: 25px;
$mlr-lessonSliderContainer-xs: 21px;
.lessonSlider__container {
    position: relative;
    overflow-x: auto;
    overflow-y: visible;
    margin-left: $mlr-lessonSliderContainer;
    margin-right: $mlr-lessonSliderContainer;
    padding-bottom: 25px;
    padding-top: 10px;
    min-height: 438px;

    @media (max-width: $max-w-xs) {
        margin-left: $mlr-lessonSliderContainer-xs;
        margin-right: $mlr-lessonSliderContainer-xs;
        min-height: 360px;
    }
}
.lessonSlider__loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
}
.lessonSlider__inner {
    white-space: nowrap;
    display: inline-block;

    &:before {
        content: '';
        display: inline-block;
        width: 0;
        min-height: 408px;
        vertical-align: middle;

        @media (max-width: $max-w-xs) {
            min-height: 328px;
        }
    }
}

.lessonSlider__card {
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
}

$d-btnSlider-animation: 13px;
$scale-btnSlider-animation: 1;
@keyframes btnSliderR {
    0% {
        transform: translate(0);
    }
    50% {
        transform: translate(0);
    }
    80% {
        opacity: 1;
    }
    100% {
        transform: translate($d-btnSlider-animation) scale($scale-btnSlider-animation);
        opacity: 0;
    }
}

@keyframes btnSliderL {
    0% {
        transform: translate(0);
    }
    50% {
        transform: translate(0);
    }
    80% {
        opacity: 1;
    }
    100% {
        transform: translate(-$d-btnSlider-animation) scale($scale-btnSlider-animation);
        opacity: 0;
    }
}

$w-btnSlider: 40px;
.btnSlider {
    position: absolute;
    width: $w-btnSlider;
    height: $w-btnSlider;
    border-radius: 50%;
    border: 1px solid $color-border-primary;
    color: $gainsboro;
    background-color: $white;
    box-shadow: 0 0 2px -1px $color-card-shadow;
    margin: auto;
    top: $h-lessonSlider__header;
    bottom: 0;
    z-index: 20;

    &:not([disabled]) {
        border: 1px solid $color-border-layout;
        color: $gray;

        &:hover,
        &:active {
            box-shadow: 0 0 0 3px $color-card-shadow;
        }

        &.btnSlider__right {
            &:before {
                content: '>';
                display: inline-block;
                line-height: $w-btnSlider - 2px;
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                color: $lightgray;
                z-index: -1;
                animation: btnSliderR 0.7s ease-out infinite;
            }
        }

        &.btnSlider__left {
            &:before {
                content: '<';
                display: inline-block;
                line-height: $w-btnSlider - 2px;
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                color: $lightgray;
                z-index: -1;
                animation: btnSliderL 0.7s ease-out infinite;
            }
        }
    }

    &.btnSlider__left {
        left: -20px;

        @media (max-width: $max-w-sm) {
            left: -10px;
        }
    }

    &.btnSlider__right {
        right: -20px;

        @media (max-width: $max-w-sm) {
            right: -10px;
        }
    }
}

.lessonSlider__moreLesson {
    display: inline-block;
    // background-color: $bs-danger;
    vertical-align: middle;
    margin: auto;
}
</style>


<template>
    <div class="lessonSlider">
        <header class="lessonSlider__header">
            <h2 class="lessonSlider__h2">{{ sliderTitle }}</h2>
        </header>
        <div
            class="lessonSlider__container"
            ref="lessonSliderContainer"
        >
            <LoadingSet
                class="lessonSlider__loading"
                v-if="!complete"
            />
            <div
                class="lessonSlider__inner"
                ref="lessonSliderInner"
            >
                <lesson-card
                    :key="lesson.l_id"
                    :lessonData="lesson"
                    class="lessonSlider__card"
                    v-for="lesson in lessons"
                />
                <!-- :showAuditStatus="true" -->
                <router-link
                    :to="moreLessonHref"
                    class="lessonSlider__moreLesson btn btn-lg btn-danger"
                    v-if="moreLessonHref && complete"
                >更多課程</router-link>
            </div>
        </div>
        <button
            :disabled="disableBtnSliderLeft"
            @click.stop="slider(0)"
            class="btnSlider btnSlider__left"
            ref="btnSliderL"
        >&lt;</button>
        <button
            :disabled="disableBtnSliderRight"
            @click.stop="slider(1)"
            class="btnSlider btnSlider__right"
            ref="btnSliderR"
        >&gt;</button>
    </div>
</template>

<script>
import lessonCard from './LessonCard'
import animateScrollTo from 'animated-scroll-to'
import LoadingSet from './LoadingSet'

export default {
    components: {
        lessonCard,
        LoadingSet
    },
    data() {
        return {
            scrollX: 0,
            containerW: 0,
            innerW: 0,
            maxScroll: 0,
            tolence: 10
        }
    },
    props: {
        sliderTitle: {
            type: String,
            required: true
        },
        lessons: {
            type: Array,
            default: []
        },
        complete: {
            type: Boolean,
            default: false
        },
        moreLessonHref: {
            type: String
        }
    },
    created() {
        this.doResize = () => {
            if (this.lessons && this.lessons.length) {
                this.containerW = this.getContainerWidth()
                this.innerW = this.getInnerWidth()
                this.maxScroll = this.innerW - this.containerW
                this.updateScrollX()
            }
        }
        this.debounceDoResize = _.debounce(this.doResize, 100)
        this.updateScrollX = () => {
            if (this.lessons && this.lessons.length) {
                this.scrollX = this.container.scrollLeft
            }
        }
        this.debounceUpdateScrollX = _.debounce(this.updateScrollX, 100)
    },
    mounted() {
        this.container = this.$refs['lessonSliderContainer']

        this.doResize()
        this.container.addEventListener('scroll', this.debounceUpdateScrollX)
        window.addEventListener('resize', this.debounceDoResize)
    },
    updated() {
        this.doResize()
    },
    computed: {
        disableBtnSliderLeft() {
            return this.scrollX > this.tolence ? false : 'disabled'
        },
        disableBtnSliderRight() {
            return this.scrollX > this.maxScroll - this.tolence ? 'disabled' : false
        }
    },
    methods: {
        getContainerWidth() {
            return this.$refs['lessonSliderContainer'].clientWidth
        },
        getInnerWidth() {
            return this.$refs['lessonSliderInner'].offsetWidth
        },
        slider(sliderRight) {
            let container = this.$refs['lessonSliderContainer'],
                children = container.children[0].children,
                scrollL,
                l

            if (sliderRight) {
                l = container.scrollLeft + this.containerW

                // 兩張課程卡及所有課程按鈕
                if (children.length > 2) {
                    let cardWidthWithMargin = children[0].offsetWidth + 20
                    l -= l % cardWidthWithMargin
                }
                scrollL = _.min([l, this.maxScroll])
            } else {
                l = container.scrollLeft - this.containerW

                // 兩張課程卡及所有課程按鈕
                if (children.length > 2 && l > 0) {
                    let cardWidthWithMargin = children[0].offsetWidth + 20
                    l -= l % cardWidthWithMargin
                    l += cardWidthWithMargin
                }
                scrollL = _.max([l, 0])
            }
            animateScrollTo(scrollL, { element: container, horizontal: true })
        }
    },
    beforeDestroy() {
        this.container.removeEventListener('scroll', this.debounceUpdateScrollX)
        window.removeEventListener('resize', this.debounceDoResize)
    }
}
</script>