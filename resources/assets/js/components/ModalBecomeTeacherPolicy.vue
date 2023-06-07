<style lang="scss" scoped>
@import '../../sass/variables';

.becomeTeacherPolicy__content {
    padding: 2rem 1rem 1rem;
}

.becomeTeacherPolicy__contentInner {
    width: 100%;
    height: 50vh;
    overflow-y: auto;
    border: 1px solid $color-border-primary;
}

.becomeTeacherPolicy__article {
    padding: 0.5rem 1rem;
}

.becomeTeacherPolicy__footer {
    @extend .popupModalFooter;
}

.becomeTeacherPolicy__chkboxRead {
    display: inline-block;
}

.becomeTeacherPolicy__chkboxRead + .becomeTeacherPolicy__footerBtn {
    margin-left: 10px;
}

.becomeTeacherPolicy__footerBtn {
    @extend .popupModalFooterBtn;
}
</style>

<template>
    <BaseModal
        :modalHeaderWithBorder="false"
        class="becomeTeacherPolicy"
        maskCloseEvent="close-teacher-policy"
        v-if="isShow"
    >
        <div class="becomeTeacherPolicy__content">
            <div
                class="becomeTeacherPolicy__contentInner"
                ref="contentInner"
            >
                <becomeTeacherPolicy class="becomeTeacherPolicy__article" />
            </div>
        </div>
        <div
            class="becomeTeacherPolicy__footer"
            slot="footer"
        >
            <b-form-checkbox
                :unchecked-value="false"
                :value="true"
                @change="autoReadAll"
                class="becomeTeacherPolicy__chkboxRead"
                v-model="readStatus"
            >我已閱讀條款</b-form-checkbox>
            <b-button
                @click="closeModel"
                class="becomeTeacherPolicy__footerBtn"
                variant="danger"
            >{{ getTerm('CANCEL') }}</b-button>
            <b-button
                :disabled="!readStatus"
                @click="confirmPolicy"
                class="becomeTeacherPolicy__footerBtn"
                variant="success"
            >{{ getTerm('CONFIRM') }}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import animateScrollTo from 'animated-scroll-to'
import becomeTeacherPolicy from './becomeTeacherPolicy'

export default {
    name: 'BecomeTeacherPopupPolicy',
    components: {
        becomeTeacherPolicy
    },
    created() {
        EventBus.$on('show-teacher-policy', this.showModel)
        EventBus.$on('close-teacher-policy', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            readStatus: false
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        autoReadAll(val) {
            if (val) {
                let container = this.$refs.contentInner,
                    t = container.scrollHeight
                animateScrollTo(t, { element: container })
            }
        },
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.readStatus = false
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        confirmPolicy() {
            this.closeModel()
            EventBus.$emit('policy-confirmed')
        }
    },
    beforeDestroy() {
        EventBus.$off('show-teacher-policy', this.showModel)
        EventBus.$off('close-teacher-policy', this.closeModel)
    }
}
</script>