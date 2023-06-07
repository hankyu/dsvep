<style lang="scss">
</style>

<template>
    <BaseModal
        :modalStatus="0"
        class="topicLabelSelector"
        closeEvent="close-topicLabel-selector-wishing"
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
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from './LoadingSet'
import ModalTopicLabelSelector from './ModalTopicLabelSelector'
import CheckboxSetTopicLabels from './CheckboxSetTopicLabels'

export default {
    name: 'ModalTopicLabelSelectorForWishing',
    extends: ModalTopicLabelSelector,
    created() {
        EventBus.$off('show-topicLabel-selector', this.showModel)
        EventBus.$off('close-topicLabel-selector', this.closeModel)
        EventBus.$on('show-topicLabel-selector-wishing', this.showModel)
        EventBus.$on('close-topicLabel-selector-wishing', this.closeModel)
    },
    beforeDestroy() {
        EventBus.$off('show-topicLabel-selector-wishing', this.showModel)
        EventBus.$off('close-topicLabel-selector-wishing', this.closeModel)
    }
}
</script>