teachersData<style lang="scss">
@import '../../sass/variables';
.modalTeacherSelector {
    .popupModal__layer {
        width: 600px;
        max-width: 90%;
    }
}

.modalTeacherSelector__header {
    @extend .popupModalHeader;
    padding-left: $half-h-filterBtn;
}

.modalTeacherSelector__headerIcon {
    @extend .faIcon;
    color: $complementary1;
}

.teacherSelector__content {
    padding: $pd-popupModal;
    font-size: 0.8rem;

    @media (max-width: $max-w-xs) {
        padding: $pd-popupModal-xs;
    }
}

.teacherSelector__teacherContainer {
    overflow: auto;
    max-height: 50vh;
}

.teacherSelector__teacherList {
    margin-top: 1rem;
    list-style-type: none;
}

.teacherSelector__teacherCheckbox {
    margin-left: 0.5rem;
}

.teacherSelector__loading {
    min-height: 0;
    height: auto;
}

.teacherSelector__LoadMore {
    width: 100%;
    text-align: center;
    margin-top: 2rem;
}

.teacherSelector__loadMoreBtn {
    height: 40px;
    position: relative;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 0.8rem;
    border: none;
    background-color: $complementary2;
    border-radius: 20px;
}

.teacherSelector__btnLoading {
    position: absolute;
    right: 10px;
    height: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: inline-block;
    min-height: 0;
}

.teacherSelector__footer {
    @extend .popupModalFooter;
    border-top: 1px solid $color-border-light;
}
</style>

<template>
    <BaseModal
        :modalStatus="0"
        class="modalTeacherSelector"
        closeEvent="close-teacher-selector"
        v-if="isShow"
    >
        <h2
            class="modalTeacherSelector__header"
            slot="header"
        >
            <font-awesome-icon
                class="modalTeacherSelector__headerIcon"
                icon="portrait"
            />講師選擇器
        </h2>
        <div class="teacherSelector__content">
            <b-form-input
                :placeholder="'輸入'+getTerm('TEACHER')+'名，快速過濾'"
                v-model="teacherNameFilter"
            ></b-form-input>
            <div class="teacherSelector__teacherContainer">
                <b-form-group class="teacherSelector__teacherList">
                    <b-form-checkbox-group
                        class="teacherSelector__teacherCheckbox"
                        name="flavour-2"
                        v-model="teachers"
                    >
                        <b-form-checkbox
                            :key="teacher.t_id"
                            :value="{tid: teacher.t_id, name: teacher.nickname, nickname: teacher.m_name}"
                            v-for="teacher in filtedTeachers"
                        >{{teacher.nickname+(teacher.m_name?'('+teacher.m_name+')':'')}}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <div class="teacherSelector__LoadMore">
                    <button
                        @click="loadMore"
                        class="teacherSelector__loadMoreBtn"
                        v-show="loadingStatus== 0 || loadingStatus== 1 "
                    >
                        載入更多
                        <LoadingSet
                            :dotSize="4"
                            class="teacherSelector__btnLoading"
                            rollerSize="xxs"
                            v-show="loadingStatus==1"
                        />
                    </button>
                    <button
                        @click="loadAll"
                        class="teacherSelector__loadMoreBtn"
                        v-show="loadingStatus== 0 || loadingStatus== 2 "
                    >
                        載入全部
                        <LoadingSet
                            :dotSize="4"
                            class="teacherSelector__btnLoading"
                            rollerSize="xxs"
                            v-show="loadingStatus==2"
                        />
                    </button>
                    <span
                        class="noData"
                        v-if="loadingStatus==3"
                    >已全部載入</span>
                </div>
            </div>
        </div>
        <div
            class="teacherSelector__footer"
            slot="footer"
        >
            <b-button
                @click="reset"
                class="popupModalFooterBtn"
                variant="warning"
            >全部取消</b-button>
            <b-button
                :disabled="loadingStatus==1 || loadingStatus==2"
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

export default {
    name: 'ModalTeacherSelector',
    components: {
        LoadingSet
    },
    created() {
        EventBus.$on('show-teacher-selector', this.showModel)
        EventBus.$on('close-teacher-selector', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,

            // 0: no loading, 1: loading more, 2: loading all, 3: completed
            loadingStatus: 0,
            teacherNameFilter: '',
            teachers: []
        }
    },
    props: {
        teacherSelected: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.$store.commit('teacher/INIT_TEACHERS') // 清空老師
        this.getTeachers()

        this.teachers = JSON.parse(JSON.stringify(this.teacherSelected))
    },
    computed: {
        filtedTeachers() {
            if (this.teachersData && this.teachersData.length) {
                return this.teachersData.filter(t => {
                    if (this.teacherNameFilter) {
                        let re = new RegExp(this.teacherNameFilter)
                        return t.nickname.match(re) || t.m_name.match(re)
                    } else {
                        return true
                    }
                })
            } else {
                return []
            }
        },
        ...mapGetters({
            teachersData: 'teacher/teachers'
        })
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()

            this.teachers = JSON.parse(JSON.stringify(this.teacherSelected))
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        getTeachers(loadAll) {
            this.loadingStatus = loadAll ? 2 : 1
            this.$store
                .dispatch('teacher/getTeachers', {
                    startIdx: this.teachersData.length,
                    loadAll,
                    mode: 0
                })
                .then(response => {
                    if (response.data.status == 0) {
                        if (!this.teachersData.length || loadAll) {
                            // 第一次 或 載入全部
                            this.$store.commit('teacher/SET_TEACHERS', response.data.data)
                            this.loadingStatus = 0
                        } else {
                            // 加載
                            this.$store.commit('teacher/PUSH_TEACHERS', response.data.data)
                            this.loadingStatus = 0
                        }
                        if (loadAll || response.data.data.length < JS_CONFIG.TEACHERS_PER_LOAD) {
                            // 全部 load
                            this.loadingStatus = 3
                        }
                    } else {
                        this.$store.commit('teacher/SET_TEACHERS_LOAD_STATUS', 2)
                        this.$store.commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'getTeachers',
                                code: response.data.status,
                                isError: true
                            },
                            { root: true }
                        )
                    }
                })
                .catch(e => {
                    this.$store.commit('teacher/SET_TEACHERS_LOAD_STATUS', 2)

                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'unknown',
                        code: e,
                        isError: true
                    })
                })
        },
        loadMore() {
            this.getTeachers()
        },
        loadAll() {
            this.getTeachers(true)
        },
        reset() {
            this.teachers = []
        },
        selectAll() {
            this.teachers = []
            this.teachersData.forEach(teacher => {
                this.teachers.push({
                    tid: teacher.t_id,
                    name: teacher.nickname,
                    nickname: teacher.m_name
                })
            })
        },
        confirm() {
            this.$emit('update:teacherSelected', this.teachers)
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-teacher-selector', this.showModel)
        EventBus.$off('close-teacher-selector', this.closeModel)
    }
}
</script>