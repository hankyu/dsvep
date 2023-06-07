<style lang="scss" scoped>
@import '../../sass/variables';

.lessonType {
    &.lessonType--online {
        background-color: $emphasized3;
    }

    &.lessonType--entity {
        background-color: $emphasized1;
    }
}
</style>

<template>
    <span
        :class="lessonTypeClass"
        class="lessonType"
    >{{ lessonTypeText }}</span>
</template>

<script>
export default {
    name: 'LessonType',
    props: {
        lessonType: {
            type: String,
            required: true,
            validator: function(value) {
                return ['online', 'entity'].indexOf(value) !== -1
            }
        }
    },
    computed: {
        lessonTypeText() {
            return this.lessonType == 'online' ? '線上' : '實體'
        },
        lessonTypeClass() {
            return this.lessonType == 'online' ? 'lessonType--online' : 'lessonType--entity'
        }
    }
}
</script>


