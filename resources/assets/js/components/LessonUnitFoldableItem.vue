<style lang="scss">
@import '../../sass/variables';

.lessonUnitFoldable__unit {
    position: relative;
    // border: 1px solid $color-border-primary;
}

.lessonUnitFoldable__unit + .lessonUnitFoldable__unit {
    margin-top: 0.5rem;
}

.lessonUnitFoldable__BtnFold {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    right: 0;
    top: 0;
    color: $white;
    border: none;
    background-color: transparent;
    transition: transform 0.1s ease-in-out;
}

.lessonUnitFoldable__unitheader--folded .lessonUnitFoldable__BtnFold {
    transform: rotate(90deg);
}

.lessonUnitFoldable__unitheader {
    background-color: $bs-warning;
    padding: 0.5rem 2.5rem 0.5rem 0.5rem;
    // color: $white;
}

.lessonUnitFoldable__unitTitle {
    font-size: 1rem;
    margin-bottom: 0;
}

.lessonUnitFoldable__unitTime {
    margin-bottom: 0;
    font-size: 1rem;
}

.lessonUnitFoldable__unitContent--entity {
    padding: 0.5rem;
    font-size: 1rem;
    background-color: lighten($bs-warning, 37.5%);
}

.lessonUnitFoldable__unitheader--folded .lessonUnitFoldable__unitContent {
    display: none;
}

.lessonUnitFoldable__unitDescription {
    margin-bottom: 0;
}

.lessonUnitFoldable__unitRemark {
    border-top: 1px solid $white;
    margin-bottom: 0;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
}

.lessonUnitFoldable__chapters {
    list-style-type: none;
    padding: 0;
    margin-bottom: 0;
}

.lessonUnitFoldable__chapter {
    background-color: lighten($bs-warning, 37.5%);
    padding: 0.5rem;

    @media (max-width: $max-w-xs) {
        padding: 0.25re;
    }
}

.lessonUnitFoldable__chapter + .lessonUnitFoldable__chapter {
    margin-top: 1px;
}
</style>


<template>
    <div
        :class="lessonUnitFoldableClass"
        class="lessonUnitFoldable__unit"
    >
        <button
            @click="switchFoldStatus"
            class="lessonUnitFoldable__BtnFold"
        >
            <font-awesome-icon icon="chevron-down" />
        </button>
        <header class="lessonUnitFoldable__unitheader">
            <h4
                class="lessonUnitFoldable__unitTitle"
            >第 {{idx+1}} {{ lessonType=='entity'?' 堂 '+unit.u_name: ' 章 '+chapters[0].u_name }}</h4>
            <p
                class="lessonUnitFoldable__unitTime"
                v-if="lessonType=='entity'"
            >
                {{ startTime }} ~
                <br class="br-xxs" />
                {{ endTime }}
            </p>
        </header>
        <div
            class="lessonUnitFoldable__unitContent lessonUnitFoldable__unitContent--entity"
            v-if="lessonType=='entity' && (unit.description || unit.remark)"
        >
            <p
                class="lessonUnitFoldable__unitDescription"
                v-html="unitDescription"
                v-if="unit.description"
            />
            <p
                class="lessonUnitFoldable__unitRemark"
                v-html="unitRemark"
                v-if="unit.remark"
            />
        </div>
        <ul
            class="lessonUnitFoldable__unitContent lessonUnitFoldable__chapters"
            v-else
        >
            <LessonUnitFoldableItemChapter
                :chapter="chapter"
                :chapterIdx="chapter.idx"
                :key="chapter.idx"
                class="lessonUnitFoldable__chapter"
                v-for="chapter in chapters"
            />
        </ul>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import LessonUnitFoldableItemChapter from './LessonUnitFoldableItemChapter'
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    name: 'LessonUnitFoldableItem',
    components: { LessonUnitFoldableItemChapter },
    data() {
        return {
            folded: false
        }
    },
    props: {
        idx: {
            type: Number,
            required: true
        },
        unit: {
            type: Object,
            default() {
                return {}
            }
        },
        chapters: {
            type: Array,
            default() {
                return []
            }
        },
        lessonType: {
            type: String,
            default: 'online'
        }
    },
    mounted() {
        EventBus.$on('fold-all', this.fold)
        EventBus.$on('unfold-all', this.unfold)
    },
    computed: {
        lessonUnitFoldableClass() {
            return this.folded ? 'lessonUnitFoldable__unitheader--folded' : ''
        },
        unitDescription() {
            return this.unit.description.replace(/\n/g, '<br />')
        },
        unitRemark() {
            return this.unit.remark.replace(/\n/g, '<br />')
        },
        startTime() {
            return COMMON_UTILITY.timeString2timeStringWithChinesWeekDay(this.unit.l_start_time)
        },
        endTime() {
            return COMMON_UTILITY.timeString2timeStringWithChinesWeekDay(this.unit.l_end_time)
        }
    },
    methods: {
        fold() {
            this.folded = true
            EventBus.$emit('change-fold-status', { idx: this.idx, folded: this.folded })
        },
        unfold() {
            this.folded = false
            EventBus.$emit('change-fold-status', { idx: this.idx, folded: this.folded })
        },
        switchFoldStatus() {
            if (this.folded) {
                this.unfold()
            } else {
                this.fold()
            }
        }
    },

    beforeDestroy() {
        this.folded = false
    }
}
</script>