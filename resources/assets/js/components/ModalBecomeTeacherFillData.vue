<style lang="scss" scoped>
@import '../../sass/variables';

.becomeTeacherFillData__title {
    @extend .popupModalHeader;
}

.becomeTeacherFillData__content {
    position: relative;
    padding: 1rem;
}

.becomeTeacherFillData__input {
    margin-bottom: 1rem;
}

.becomeTeacherFillData__footer {
    @extend .popupModalFooter;
}

.becomeTeacherFillData__footerBtn {
    @extend .popupModalFooterBtn;
}

.becomeTeacherFillData__loading {
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
        closeEvent="close-teacher-fill-data"
        v-if="isShow"
    >
        <h2
            class="becomeTeacherFillData__title"
            slot="header"
        >
            <font-awesome-icon
                :icon="['far', 'address-card']"
                class="faIcon"
            />講師必要資料
        </h2>
        <div class="becomeTeacherFillData__content">
            <!-- <b-form-group class="becomeTeacherFillData__group">
                <b-form-input
                    :state="nicknameState"
                    @input="doValidate()"
                    class="becomeTeacherFillData__input"
                    placeholder="暱稱"
                    required
                    type="text"
                    v-if="ready"
                    v-model="nickname"
                />
                <b-form-invalid-feedback class="becomeTeacherFillData__inputFeedback">暱稱為必填</b-form-invalid-feedback>
            </b-form-group>-->
            <BaseInputTextSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="nickname"
                class="becomeTeacherFillData__input"
                inputId="nickname"
                inputInvalidFeedback="暱稱為成為講師必要資料"
                inputLabel="您的暱稱"
                inputPlaceholder="請輸入您的暱稱"
            />
            <b-form-group
                class="becomeTeacherFillData__group"
                label="您的性別"
            >
                <b-form-radio-group
                    :options="genders"
                    id="gender"
                    v-model="gender"
                ></b-form-radio-group>
            </b-form-group>
            <LoadingSet
                class="becomeTeacherFillData__loading"
                v-if="sendStatus"
            />
        </div>
        <div
            class="becomeTeacherFillData__footer"
            slot="footer"
        >
            <b-button
                @click="closeModel"
                class="becomeTeacherFillData__footerBtn"
                variant="danger"
            >{{ getTerm('CANCEL') }}</b-button>
            <b-button
                :disabled="!isValidatedOK"
                @click="sendApply"
                class="becomeTeacherFillData__footerBtn"
                variant="success"
            >{{ getTerm('CONFIRM') }}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import { validateMixin } from '../mixins/validate'
import LoadingSet from './LoadingSet'

export default {
    name: 'ModalBecomeTeacherFillData',
    components: {
        LoadingSet
    },
    mixins: [validateMixin],
    created() {
        EventBus.$on('show-teacher-fill-data', this.showModel)
        EventBus.$on('close-teacher-fill-data', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            nickname: { value: '', state: null },
            // nicknameState: null,
            sendStatus: false,
            genders: ['男', '女', '其他'],
            gender: '男'
            // ready: false
        }
    },
    props: {},
    mounted() {
        if (this.$store.state.member.memberData.data.m_name) {
            this.nickname.value = this.$store.state.member.memberData.data.m_name
        }
        if (this.$store.state.member.memberData.data.sex) {
            this.gender = this.$store.state.member.memberData.data.sex
        }
        // this.ready = true
    },
    computed: {
        isValidatedOK() {
            return this.nickname.state
        },
        initValidate() {
            return this.$store.state.member.memberData.data.m_name ? true : false
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.nickname = { value: '', state: null }
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        async sendApply() {
            this.sendStatus = true
            let postData = {
                m_name: this.nickname.value,
                sex: this.gender
            }
            try {
                let response = await this.$store.dispatch('member/updateDataForTeacher', postData)
                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '儲存成功')
                    this.$store.commit('member/UPDATE_MEMBER_SINGLE_DATA', {
                        name: 'm_name',
                        val: this.nickname.value
                    })
                    this.$store.commit('member/UPDATE_MEMBER_SINGLE_DATA', {
                        name: 'sex',
                        val: this.gender
                    })
                    EventBus.$emit('become-teacher-data-completed')

                    this.closeModel()
                } else {
                    this.$store.commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'saveUserData',
                            code: response.data.status,
                            isError: true
                        },
                        { root: true }
                    )
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            } finally {
                this.sendStatus = false
            }
        }
        /* doValidate() {
            this.nickname.state = this.validWordNumberLimit(this.nickname, 1)
        } */
    },
    beforeDestroy() {
        EventBus.$off('show-teacher-fill-data', this.showModel)
        EventBus.$off('close-teacher-fill-data', this.closeModel)
    }
}
</script>