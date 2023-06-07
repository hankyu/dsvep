<style lang="scss">
@import '../../sass/variables';
.teacherIntroSetup {
    .teacherIntroSetup__field + .teacherIntroSetup__field {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid $color-border-light;
    }

    .teacherIntroSetup__itemTitle {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.25rem;

        &.teacherIntroSetup__itemTitle--required:after {
            content: '*';
            color: $emphasized2;
        }
    }

    .teacherIntroSetup__linkInput {
        margin-top: 0.25rem;
    }

    .teacherIntroSetup__btnBar {
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .baseInputTextSet + .teacherIntroSetup__itemTitle {
        margin-top: 1rem;
    }
}
</style>

<template>
    <div class="teacherIntroSetup">
        <!--學歷-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle teacherIntroSetup__itemTitle--required">
                畢業學校
            </h3>
            <BaseInputTextSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="eduSchool"
                :trim="true"
                inputHelp="畢業學校不會顯示於其他使用者"
                inputId="introduceLink"
                inputInvalidFeedback="畢業學校必填！"
                inputPlaceholder="填寫畢業學校"
            />
            <h3 class="teacherIntroSetup__itemTitle teacherIntroSetup__itemTitle--required">
                畢業科系
            </h3>
            <BaseInputTextSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="eduDapartment"
                :trim="true"
                inputHelp="畢業科系不會顯示於其他使用者"
                inputId="introduceLink"
                inputInvalidFeedback="畢業科系必填！"
                inputPlaceholder="填寫畢業科系"
            />
            <h3 class="teacherIntroSetup__itemTitle teacherIntroSetup__itemTitle--required">
                畢業學位
            </h3>
            <BaseInputTextSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="eduDegree"
                :trim="true"
                inputHelp="畢業學位不會顯示於其他使用者"
                inputId="introduceLink"
                inputInvalidFeedback="畢業學位必填！"
                inputPlaceholder="填寫畢業學位"
            />
        </div>
        <!--自我介紹-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle teacherIntroSetup__itemTitle--required">
                自我介紹
            </h3>
            <BaseTextareaSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="introduce"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給使用者更多相關資訊。"
                inputId="introduce"
                inputInvalidFeedback="自我介紹必填！"
                inputPlaceholder="輸入您的自我介紹"
            />
        </div>

        <!--申請講師的 作品-->
        <div class="teacherIntroSetup__field" v-if="applyMode">
            <h3 class="teacherIntroSetup__itemTitle teacherIntroSetup__itemTitle--required">
                作品
            </h3>
            <BaseTextareaSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="worksExp"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給審核人員更多相關資訊。"
                inputId="worksExp"
                inputInvalidFeedback="作品必填！"
                inputPlaceholder="輸入您的作品介紹"
            />
        </div>

        <!--個人經歷-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle">個人經歷</h3>
            <BaseTextareaSet
                :inputValue.sync="workExp"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給使用者更多相關資訊。"
                inputId="workExp"
                inputPlaceholder="輸入您的個人經歷"
            />
        </div>

        <!--我的著作-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle">著作</h3>
            <BaseTextareaSet
                :inputValue.sync="writings"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給使用者更多相關資訊。"
                inputId="writings"
                inputPlaceholder="輸入您的著作介紹"
            />
        </div>

        <!--證書-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle">證書</h3>
            <BaseTextareaSet
                :inputValue.sync="certificate"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給使用者更多相關資訊。"
                inputId="certificate"
                inputPlaceholder="輸入擁有的相關證書"
            />
        </div>

        <!--獎項-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle">獎項</h3>
            <BaseTextareaSet
                :inputValue.sync="awards"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給使用者更多相關資訊。"
                inputId="awards"
                inputPlaceholder="輸入曾贏得的獎項"
            />
        </div>

        <!--報導-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle">報導</h3>
            <BaseTextareaSet
                :inputValue.sync="reported"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給使用者更多相關資訊。"
                inputId="reported"
                inputPlaceholder="簡述曾經被媒體的報導"
            />
        </div>

        <!--公開發表-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle">公開發表</h3>
            <BaseTextareaSet
                :inputValue.sync="publishing"
                inputHelp="文章中填入網址（以換行或空格隔開其他文字）將會成為連結，給使用者更多相關資訊。"
                inputId="publishing"
                inputPlaceholder="簡述曾經公開發表"
            />
        </div>

        <!--教學類型-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle teacherIntroSetup__itemTitle--required">
                教學類型
            </h3>
            <BaseTextareaSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="teachType"
                inputId="teachType"
                inputInvalidFeedback="教學類型必填！"
                inputPlaceholder="輸入您的教學類型"
            />
        </div>

        <!--教學經驗-->
        <div class="teacherIntroSetup__field">
            <h3 class="teacherIntroSetup__itemTitle teacherIntroSetup__itemTitle--required">
                教學經驗
            </h3>
            <BaseTextareaSet
                :initValidate="initValidate"
                :inputValidated="true"
                :inputValue.sync="teachExp"
                inputId="teachExp"
                inputInvalidFeedback="教學經驗必填！"
                inputPlaceholder="輸入您的教學經驗"
            />
        </div>

        <div class="teacherIntroSetup__btnBar">
            <b-button @click="cancel" variant="danger">取消</b-button>
            <b-button :disabled="!allRequiredValidated" @click="save" variant="success">
                {{ applyMode ? '送出申請' : '儲存' }}
            </b-button>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import InputTextSetAccount from './InputTextSetAccount'
import BaseTextareaSet from './global/BaseTextareaSet'

export default {
    name: 'TeacherIntroSetup',
    components: { InputTextSetAccount, BaseTextareaSet },
    data: function() {
        return {
            requiredMaps: [
                ['eduSchool', 'edu_school'],
                ['eduDapartment', 'edu_dapartment'],
                ['eduDegree', 'edu_degree'],

                ['introduce', 'intro_exp'],

                ['teachType', 'teach_type'],
                ['teachExp', 'teach_exp']
            ],
            otherMaps: [
                ['workExp', 'work_exp'],
                ['writings', 'book_exp'],
                ['certificate', 'certificate_exp'],
                ['awards', 'awards_exp'],
                ['reported', 'repo_exp'],
                ['publishing', 'pub_exp']
            ],

            eduSchool: { value: '', state: null },
            eduDapartment: { value: '', state: null },
            eduDegree: { value: '', state: null },

            introduce: { value: '', state: null },
            worksExp: { value: '', state: null },
            workExp: { value: '', state: null },
            writings: { value: '', state: null },
            certificate: { value: '', state: null },
            awards: { value: '', state: null },
            reported: { value: '', state: null },
            publishing: { value: '', state: null },
            teachType: { value: '', state: null },
            teachExp: { value: '', state: null }
        }
    },

    props: {
        teacherDetail: {
            type: Object
        },
        applyMode: {
            type: Boolean,
            default: false
        }
    },
    created() {
        if (this.teacherDetail.t_id) {
            this.reset()
        }
    },
    updated() {},
    computed: {
        allRequiredValidated() {
            let bool = this.requiredMaps.reduce((acc, currValue) => {
                return acc && this[currValue[0]].state
            }, true)

            if (this.applyMode) {
                // 申請講師
                bool = bool && this.worksExp.state
            }

            return bool
        },
        initValidate() {
            return this.teacherDetail.t_id ? true : false
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        reset() {
            this.requiredMaps.forEach(elm => {
                this[elm[0]].value = this.teacherDetail[elm[1]]
            })
            this.otherMaps.forEach(elm => {
                this[elm[0]].value = this.teacherDetail[elm[1]]
            })
            if (this.applyMode) {
                this.worksExp.value = this.teacherDetail.works_exp
            }
        },
        async save() {
            if (!this.allRequiredValidated) {
                return
            }

            let postData = { t_id: this.$route.params['t_id'] }

            this.requiredMaps.forEach(elm => {
                postData[elm[1]] = this[elm[0]].value
            })
            this.otherMaps.forEach(elm => {
                if (
                    (this.applyMode && this[elm[0]].value) ||
                    (!this.applyMode && this[elm[0]].value != this.teacherDetail[elm[1]])
                ) {
                    // 非必填的欄位，只傳有改變的
                    postData[elm[1]] = this[elm[0]].value
                }
            })

            if (this.applyMode) {
                // 申請講師，舊的作品欄 先繼續用
                postData.mode = 1
                postData.works_exp = this.worksExp.value
            }

            try {
                let response = await this.$store.dispatch('teacher/updateTeacherDetail', postData)
                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '儲存成功')
                    EventBus.$emit('updateTeacherDetail-completed')
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'updateTeacherDetail',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit(
                    'alert/ADD_ALERT_MESSAGE',
                    {
                        api: 'unknown',
                        code: e,
                        isError: true
                    },
                    { root: true }
                )
            }
        },
        cancel() {
            EventBus.$emit('cancel-setup-teacher-intro')
        }
    },
    beforeDestroy() {}
}
</script>
