<style lang="scss" scoped>
@import '../../sass/variables';

.lessonUnitFoldableSet__funcBar {
    text-align: right;
    padding: 0.25rem 0;
}

.lessonUnitFoldableSet__btnSwitchFoldAll {
    font-size: 0.8rem;
    color: $white;
}
</style>


<template>
    <div class="lessonUnitFoldableSet">
        <div class="lessonUnitFoldableSet__funcBar">
            <b-button
                @click="switchFold"
                class="lessonUnitFoldableSet__btnSwitchFoldAll"
                variant="warning"
            >{{ btnSwitchAllFolderText }}</b-button>
        </div>
        <div v-if="lessonType=='entity' && units.length">
            <LessonUnitFoldableItem
                :idx="idx"
                :key="idx"
                :ref="'unit'+idx"
                :unit="unit"
                class="lessonUnitFoldableSet__unit"
                lessonType="entity"
                v-for="(unit,idx) in units"
            />
        </div>
        <div v-if="lessonType=='online' && units.length">
            <LessonUnitFoldableItem
                :chapters="unit"
                :idx="idx"
                :key="idx"
                :ref="'unit'+idx"
                class="lessonUnitFoldableSet__unit"
                lessonType="online"
                v-for="(unit,idx) in units"
            />
        </div>
    </div>
</template>

<script>
import LessonUnitFoldableItem from './LessonUnitFoldableItem'
import { EventBus } from '../event-bus'

export default {
    name: 'LessonUnitFoldableSet',

    components: {
        LessonUnitFoldableItem
    },

    data: function() {
        return {
            switchAllStatus: true,
            folderStatus: []
        }
    },

    props: {
        units: {
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
        this.units.forEach(elm => {
            this.folderStatus.push(false)
        })

        EventBus.$on('change-fold-status', this.checkAllStatus)
    },

    computed: {
        btnSwitchAllFolderText() {
            return this.switchAllStatus ? '全部摺疊' : '全部展開'
        }
    },

    methods: {
        unitDescription(description) {
            return description.replace(/\r\n/g, '<br />')
        },

        switchFold() {
            EventBus.$emit(this.switchAllStatus ? 'fold-all' : 'unfold-all')
        },

        checkAllStatus({ idx, folded }) {
            this.folderStatus[idx] = folded
            if (
                !this.folderStatus.some(status => {
                    return status != this.switchAllStatus
                })
            ) {
                this.switchAllStatus = !this.switchAllStatus
            }
        }
    },

    beforeDestroyed() {
        this.folderStatus = []
        EventBus.$off('change-fold-status', this.checkAllStatus)
    }
}
</script>