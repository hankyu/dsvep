<style lang="scss" scoped>
@import '../../sass/variables';

.confirmPhone__title {
    @extend .popupModalHeader;
}

.confirmPhone__content {
    position: relative;
    padding: 1rem;
    width: 400px;

    @media (max-width: $max-w-xs) {
        width: auto;
    }
}

.confirmPhone__group {
    margin-bottom: $mb-inputGroup;
}

.confirmPhone__phoneInputSet {
    margin-bottom: 2rem;
}

.confirmPhone__desc {
    margin-bottom: 2rem;
}

.confirmPhone__footer {
    @extend .popupModalFooter;
}

.confirmPhone__footerBtn {
    @extend .popupModalFooterBtn;
}

.confirmPhone__loading {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: $white-semi-transparent;
}
</style>

<template>
    <BaseModal
        class="becomeTeacherFillData"
        closeEvent="close-confirm-phone"
        v-if="isShow"
    >
        <h2
            class="confirmPhone__title"
            slot="header"
        >
            <font-awesome-icon
                :icon="['far', 'address-card']"
                class="faIcon"
            />確認手機號碼無誤
        </h2>
        <div class="confirmPhone__content">
            <PhoneInputGroup
                :phoneInfo.sync="cellphoneInfo"
                class="confirmPhone__phoneInputSet"
                ref="phoneNumberInput"
            />
            <!-- :phone="cellphone" -->
            <div class="confirmPhone__desc">
                此帳號手機號碼尚未驗證。
                <br />驗證手機號碼，即可購買課程，且能用手機號碼搭配平台密碼登入平台。
            </div>
        </div>
        <div
            class="confirmPhone__footer"
            slot="footer"
        >
            <b-button
                :disabled="!isValidatedOK"
                @click="confirm"
                class="confirmPhone__footerBtn"
                variant="success"
            >驗證手機</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import PhoneInputGroup from './PhoneInputGroup'

export default {
    name: 'ModalConfirmPhone',
    components: {
        PhoneInputGroup
    },
    created() {
        EventBus.$on('show-confirm-phone', this.showModel)
        EventBus.$on('close-confirm-phone', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,

            cellphoneInfo: {
                cellphone: '',
                state: null
            }
        }
    },
    props: {},
    mounted() {},
    computed: {
        isValidatedOK() {
            return this.cellphoneInfo.state
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            this.cellphoneInfo.cellphone = this.$store.state.member.memberData.data.cellphone
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        confirm() {
            console.warn('confirm()')
        }
    },
    beforeDestroy() {
        EventBus.$off('show-confirm-phone', this.showModel)
        EventBus.$off('close-confirm-phone', this.closeModel)
    }
}
</script>