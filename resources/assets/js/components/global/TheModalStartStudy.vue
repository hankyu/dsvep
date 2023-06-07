<style lang="scss" scoped>
@import '../../../sass/variables';

.startStudy__title {
    @extend .popupModalHeader;
}

.startStudy__content {
    position: relative;
    padding: 1rem;
    max-width: 500px;
}

.startStudy__lessonName {
    font-weight: bold;
}

.startStudy__footer {
    @extend .popupModalFooter;
}
</style>

<template>
    <BaseModal
        class="startStudy"
        closeEvent="close-start-study"
        maskCloseEvent="close-start-study"
        v-if="isShow"
    >
        <h2
            class="startStudy__title"
            slot="header"
        >
            <font-awesome-icon
                class="faIcon"
                icon="book"
            />確認
        </h2>
        <div class="startStudy__content">
            <p>
                「
                <span class="startStudy__lessonName">{{l_name}}</span>」為
                <template v-if="deadline=='999'">永久觀看之課程</template>
                <template v-else>
                    <span class="color-emphasized2">{{deadline}} 個月</span>限期觀看之課程（從開始學習日起算）。
                </template>
            </p>
            <p>
                一旦進入教室以後將無法申請退費該課程，詳細資訊請查看
                <router-link
                    target="_blank"
                    to="/contact/terms/refund"
                >退費規定</router-link>
            </p>
            <p>是否進入課程教室，並開始學習呢？</p>
        </div>
        <div
            class="startStudy__footer"
            slot="footer"
        >
            <b-button
                @click="closeModel"
                class="startStudy__btn"
                variant="danger"
            >{{getTerm('CANCEL')}}</b-button>
            <b-button
                @click="start"
                class="startStudy__btn"
                variant="success"
            >{{getTerm('CONFIRM')}}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'

export default {
    name: 'TheModalStartStudy',
    created() {
        EventBus.$on('open-start-study', this.showModel)
        EventBus.$on('close-start-study', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            l_id: null,
            l_name: '',
            deadline: null
        }
    },
    props: {},
    mounted() {},
    computed: {
        isValidatedOK() {
            return this.nicknameState && this.$refs.phoneNumberInput.phoneState
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel({ l_id, l_name, deadline }) {
            this.l_id = l_id
            this.l_name = l_name
            this.deadline = deadline
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.l_id = null
            this.l_name = ''
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        async start() {
            this.$router.push('/profile/lesson/classroom/' + this.l_id)
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('open-start-study', this.showModel)
        EventBus.$off('close-start-study', this.closeModel)
    }
}
</script>