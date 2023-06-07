<style lang="scss">
@import '../../sass/variables';

.lessonLabel {
    padding: 5px 10px;
    color: $white;
    background-color: #000;

    &.lessonLabel--fund {
        background-color: $brand-primary;
    }
    &.lessonLabel--canceled {
        background-color: $gray;
    }
    &.lessonLabel--fundComplete {
        background-color: $complementary1;
    }
    &.lessonLabel--full {
        background-color: $bs-danger;
    }
    &.lessonLabel--started {
        background-color: $bs-success;
    }
    &.lessonLabel--end {
        background-color: $bs-warning;
    }
}
</style>


<template>
    <span
        :class="labelClass"
        class="lessonLabel"
    >{{ lessonLabel }}</span>
</template>

<script>
import baseLessonLabel from './global/BaseLessonLabel'

export default {
    name: 'LessonCardLabel',
    extends: baseLessonLabel,
    mounted: function() {
        this.getLessonStatusAndLabel()
    },
    props: {
        lessonData: {
            type: Object,
            required: true
        }
    },
    computed: {
        labelClass() {
            let classNames = [
                'lessonLabel--fund',
                'lessonLabel--canceled',
                'lessonLabel--fundComplete',
                'lessonLabel--full',
                'lessonLabel--started',
                'lessonLabel--end'
            ]
            return classNames[this.lessonStatus]
        }
    }
}
</script>