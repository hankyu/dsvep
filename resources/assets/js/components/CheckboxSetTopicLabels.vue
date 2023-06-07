<style lang="scss">
@import '../../sass/variables';
</style>


<template>
    <div>
        <b-form-group>
            <template slot="label">
                <b-form-checkbox
                    :indeterminate="indeterminate"
                    @change="toggleAll"
                    aria-controls="flavours"
                    aria-describedby="flavours"
                    v-model="allSelected"
                >{{topic}}</b-form-checkbox>
            </template>
            <b-form-checkbox-group
                aria-label="labels"
                class="ml-4"
                name="labels"
                stacked
                v-model="selected"
            >
                <b-form-checkbox
                    :key="labelIdx"
                    :value="{topic: topic, label: label}"
                    v-for="(label,labelIdx) in labels"
                >{{label}}</b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: 'CheckboxSetTopicLabels',
    data() {
        return {
            selected: [],
            allSelected: false,
            indeterminate: false
        }
    },
    props: {
        topic: {
            type: String,
            required: true
        },
        labels: {
            type: Array,
            required: true
        },
        topicLabelSelected: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.selected = []
        this.topicLabelSelected.forEach(res => {
            this.selected.push(res)
        })
    },
    methods: {
        toggleAll(checked) {
            if (checked) {
                this.selectAll()
            } else {
                this.selected = []
            }
        },
        selectAll() {
            this.reset()
            this.labels.forEach(l => {
                this.selected.push({ topic: this.topic, label: l })
            })
        },
        reset() {
            this.selected = []
        }
    },
    watch: {
        selected(newVal, oldVal) {
            // Handle changes in individual flavour checkboxes
            if (newVal.length === 0) {
                this.indeterminate = false
                this.allSelected = false
            } else if (newVal.length === this.labels.length) {
                this.indeterminate = false
                this.allSelected = true
            } else {
                this.indeterminate = true
                this.allSelected = false
            }
        }
    }
}
</script>