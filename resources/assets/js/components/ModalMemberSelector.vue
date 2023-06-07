<style lang="scss">
@import '../../sass/variables';
.modalTeacherSelector {
    .popupModal__layer {
        width: 600px;
        max-width: 90%;
    }
}

.memberSelector__header {
    @extend .popupModalHeader;
    padding-left: $half-h-filterBtn;
}

.memberSelector__headerIcon {
    @extend .faIcon;
    color: $complementary1;
}

.memberSelector__content {
    padding: $pd-popupModal;
    font-size: 0.8rem;

    @media (max-width: $max-w-xs) {
        padding: $pd-popupModal-xs;
    }
}

.memberSelector__searchBar {
    margin-bottom: 1rem;
}

.memberSelector__loading {
    min-height: 200px;
    height: auto;
}

.memberSelector__fail {
    padding: 3rem 0;
    text-align: center;
    color: $bs-danger;
}

.memberSelector__LoadMore {
    width: 100%;
    text-align: center;
    margin-top: 2rem;
}

.memberSelector__loadMoreBtn {
    height: 40px;
    position: relative;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 0.8rem;
    border: none;
    background-color: $complementary2;
    border-radius: 20px;
}

.memberSelector__btnLoading {
    position: absolute;
    right: 10px;
    height: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: inline-block;
    min-height: 0;
}

.memberSelector__footer {
    @extend .popupModalFooter;
    border-top: 1px solid $color-border-light;
}

.memberSelector__resultList {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 0;

    .memberSelector__resultListItem {
    }

    .memberSelector__resultListItem + .memberSelector__resultListItem {
        margin-top: 0.5rem;
    }

    .memberSelector__resultBtn {
        width: 100%;
        @include btnBgColorCustom($brand-primary);

        p {
            margin-bottom: 0;
        }
    }
}
</style>

<template>
    <BaseModal
        :modalStatus="0"
        class="modalMemberSelector"
        closeEvent="close-member-selector"
        v-if="isShow"
    >
        <h2
            class="memberSelector__header"
            slot="header"
        >
            <font-awesome-icon
                class="memberSelector__headerIcon"
                icon="portrait"
            />單一會員選擇器
        </h2>
        <div class="memberSelector__content">
            <b-input-group
                class="memberSelector__searchBar"
                size="md"
            >
                <b-form-input
                    :placeholder="'輸入完整 Email 或手機'"
                    v-model="email"
                ></b-form-input>
                <b-input-group-append>
                    <b-button
                        @click="searchByEmail"
                        size="md"
                        text="Button"
                        variant="success"
                    >查詢</b-button>
                </b-input-group-append>
            </b-input-group>
            <LoadingSet
                class="memberSelector__loading"
                v-if="loadingStatus==1"
            />
            <div
                class="memberSelector__fail"
                v-else-if="loadingStatus==3 && !memberSearched.length"
            >查無資料</div>
            <div
                class="memberSelector__fail"
                v-else-if="loadingStatus==2"
            >查詢發生問題，請稍候重整再試一次。</div>
            <ul
                class="memberSelector__resultList"
                v-else-if="loadingStatus==3"
            >
                <li
                    :key="m.m_id"
                    class="memberSelector__resultListItem"
                    v-for="(m,idx) in memberSearched"
                >
                    <b-button
                        @click="choice(idx)"
                        class="memberSelector__resultBtn"
                    >
                        <p>{{m.nickname+( m.m_name?' ('+m.m_name+')':'')}}</p>
                        <p>{{m.cellphone}}</p>
                    </b-button>
                </li>
            </ul>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from './LoadingSet'

export default {
    name: 'ModalMemberSelector',
    components: {
        LoadingSet
    },
    created() {
        EventBus.$on('show-member-selector', this.showModel)
        EventBus.$on('close-member-selector', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            loadingStatus: 0, // 0: no loading, 1: loading , 2: fail , 3: completed
            email: '',
            memberSearched: [],
            member: null
        }
    },
    props: {
        memberSelected: {
            type: Object,
            required: true
        }
    },
    mounted() {},
    computed: {},
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            this.loadingStatus = 0
            this.email = ''
            this.memberSearched = []
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
            this.member = JSON.parse(JSON.stringify(this.memberSelected))
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        searchByEmail() {
            if (!this.email) {
                return
            }
            this.loadingStatus = 1
            this.$store
                .dispatch('member/searchMember', this.email)
                .then(response => {
                    if (response.status == 0) {
                        this.loadingStatus = 3
                        this.memberSearched = response.data
                    } else {
                        this.loadingStatus = 2
                    }
                })
                .catch(e => {
                    this.loadingStatus = 2
                })
        },
        reset() {
            this.member = null
        },
        choice(idx) {
            this.member = this.memberSearched[idx]
            this.$emit('update:memberSelected', this.member)
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-member-selector', this.showModel)
        EventBus.$off('close-member-selector', this.closeModel)
    }
}
</script>