<style lang="scss" scoped>
@import '../../../sass/variables';

.shopOrClassroom__title {
    @extend .popupModalHeader;
}

.shopOrClassroom__content {
    position: relative;
    padding: 1rem;
    max-width: 500px;
}

.shopOrClassroom__lessonName {
    font-weight: bold;
}

.shopOrClassroom__btn {
    width: 100%;
    font-size: 0.9rem;
}

.shopOrClassroom__btn + .shopOrClassroom__btn {
    margin-top: 0.5rem;
}

.shopOrClassroom__footer {
    @extend .popupModalFooter;
}
</style>

<template>
    <BaseModal
        class="shopOrClassroom"
        closeEvent="close-shop-or-classroom"
        maskCloseEvent="close-shop-or-classroom"
        v-if="isShow"
    >
        <h2
            class="shopOrClassroom__title"
            slot="header"
        >
            <font-awesome-icon
                class="faIcon"
                icon="book"
            />前往
        </h2>
        <div class="shopOrClassroom__content">
            是否前往「
            <span class="shopOrClassroom__lessonName">{{l_name}}</span>」課程教室，並開始學習呢？
        </div>
        <div
            class="shopOrClassroom__footer"
            slot="footer"
        >
            <b-button
                @click="goShop"
                class="shopOrClassroom__btn"
                variant="info"
            >{{getPageTitle('LESSON_SHOP')}}</b-button>
            <b-button
                class="shopOrClassroom__btn"
                variant="success"
            >{{getPageTitle('LESSON_CLASSROOM')}}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../../event-bus'
import { JS_CONFIG } from '../../config'

export default {
    name: 'TheModalShopOrClassroom',
    created() {
        EventBus.$on('open-shop-or-classroom', this.showModel)
        EventBus.$on('close-shop-or-classroom', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            l_id: null
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
        getPageTitle(name) {
            return JS_CONFIG.TERMS.PAGE_TITLE[name]
        },
        showModel({ l_id, l_name }) {
            this.l_id = l_id
            this.l_name = l_name
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.l_id = null
            this.l_name = ''
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        goShop() {
            this.$router.push('/lesson/' + this.l_id)
            EventBus.$emit('close-shop-or-classroom')
        },
        goClassroom() {
            this.$router.push('/profile/lesson/classroom/' + this.l_id)
            EventBus.$emit('close-shop-or-classroom')
        }
    },
    beforeDestroy() {
        EventBus.$off('open-shop-or-classroom', this.showModel)
        EventBus.$off('close-shop-or-classroom', this.closeModel)
    }
}
</script>