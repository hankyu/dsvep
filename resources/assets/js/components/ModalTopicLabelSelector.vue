g<style lang="scss">
@import '../../sass/variables';
.topicLabelSelector {
    .popupModal__layer {
        width: 600px;
        max-width: 90%;
    }
}

.topicLabelSelector__header {
    @extend .popupModalHeader;
    padding-left: $half-h-filterBtn;
}

.topicLabelSelector__headerIcon {
    @extend .faIcon;
    color: $complementary1;
}

.topicLabelSelector__content {
    padding: $pd-popupModal;
    font-size: 0.8rem;

    @media (max-width: $max-w-xs) {
        padding: $pd-popupModal-xs;
    }
}

.topicLabelSelector__topicLabelList {
    margin-top: 1rem;
    overflow: auto;
    max-height: 40vh;
    list-style-type: none;
}

.topicLabelSelector__checkboxSet {
    margin-left: 0.5rem;
}

.topicLabelSelector__loading {
    min-height: 0;
    height: auto;
}

.topicLabelSelector__footer {
    @extend .popupModalFooter;
    border-top: 1px solid $color-border-light;
}
</style>

<template>
    <BaseModal
        :modalStatus="0"
        class="topicLabelSelector"
        closeEvent="close-topicLabel-selector"
        v-if="isShow"
    >
        <h2
            class="topicLabelSelector__header"
            slot="header"
        >
            <font-awesome-icon
                class="topicLabelSelector__headerIcon"
                icon="portrait"
            />領域選擇器
        </h2>
        <div class="topicLabelSelector__content">
            <b-form-input
                :placeholder="'輸入類別名，快速過濾'"
                v-model="filter"
            ></b-form-input>
            <div
                class="topicLabelSelector__topicLabelList"
                v-if="loadStatus==3"
            >
                <CheckboxSetTopicLabels
                    :key="topicLabel.topic"
                    :labels="topicLabel.labels"
                    :ref="topicLabel.topic"
                    :topic="topicLabel.topic"
                    :topicLabelSelected="topicLabelSelected[topicLabel.topic]?topicLabelSelected[topicLabel.topic]:[]"
                    class="topicLabelSelector__checkboxSet"
                    v-for="topicLabel in filtedTopicLabels"
                />
            </div>
            <LoadingSet v-else />
        </div>
        <div
            class="topicLabelSelector__footer"
            slot="footer"
        >
            <b-button
                @click="reset"
                class="popupModalFooterBtn"
                variant="warning"
            >全部取消</b-button>
            <b-button
                :disabled="loadStatus!=3"
                @click="selectAll"
                class="popupModalFooterBtn"
                variant="info"
            >全部選取</b-button>
            <b-button
                @click="confirm"
                class="popupModalFooterBtn"
                variant="success"
            >{{ getTerm('CONFIRM') }}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from './LoadingSet'
import { constants } from 'crypto'
import CheckboxSetTopicLabels from './CheckboxSetTopicLabels'

export default {
    name: 'ModalTopicLabelSelector',
    components: {
        LoadingSet,
        CheckboxSetTopicLabels
    },
    created() {
        EventBus.$on('show-topicLabel-selector', this.showModel)
        EventBus.$on('close-topicLabel-selector', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            filter: '',
            topicLabels: {}
        }
    },
    props: {
        topicLabelSelected: {
            type: Object,
            required: true
        }
    },
    async mounted() {},
    computed: {
        filtedTopicLabels() {
            if (this.topicLabelsData && this.topicLabelsData.length) {
                return this.topicLabelsData.filter(topicLabel => {
                    if (this.filter) {
                        let re = new RegExp(this.filter),
                            str = topicLabel.labels.reduce((accumulator, l) => {
                                return accumulator + '  ' + l
                            }, topicLabel.topic)

                        return str.match(re)
                    } else {
                        return true
                    }
                })
            } else {
                return []
            }
        },
        ...mapGetters({
            topicLabelsData: 'lesson/topicLabelsData',
            loadStatus: 'lesson/topicLabelsLoadStatus'
        })
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        async showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            try {
                let response = await this.$store.dispatch('lesson/getTopicLabels')
                if (response.data.status == 0) {
                    let snapshot = response.data.data

                    snapshot.push({ topic: '其他', labels: [] })
                    snapshot.forEach(elm => {
                        elm.labels.push('其他')
                    })
                    this.$store.commit('lesson/SET_DATAS', {
                        stateName: 'topicLabels',
                        data: snapshot
                    })
                } else {
                    this.$store.commit('lesson/DATAS_STATUS', {
                        stateName: 'topicLabels',
                        status: 2
                    })
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getTopicLabels',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('lesson/DATAS_STATUS', {
                    stateName: 'topicLabels',
                    status: 2
                })

                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
            this.topicLabels = JSON.parse(JSON.stringify(this.topicLabelSelected))
            this.$emit('update:topicLabelSelected', this.topicLabels)
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        reset() {
            this.topicLabelsData.forEach(tl => {
                this.$refs[tl.topic][0].reset()
            })
        },
        selectAll() {
            this.topicLabelsData.forEach(tl => {
                this.$refs[tl.topic][0].selectAll()
            })
        },
        confirm() {
            this.topicLabels = {}
            this.topicLabelsData.forEach(tl => {
                this.topicLabels[tl.topic] = []
                this.$refs[tl.topic][0].selected.forEach(s => {
                    this.topicLabels[tl.topic].push(s)
                })
            })
            this.$emit('update:topicLabelSelected', this.topicLabels)
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-topicLabel-selector', this.showModel)
        EventBus.$off('close-topicLabel-selector', this.closeModel)
    }
}
</script>