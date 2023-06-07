<style lang="scss">
@import '../../sass/variables';

.modalWishMaker {
    font-size: 1rem;
    .popupModal__layer {
        min-width: 25rem;

        @media (max-width: $max-w-md) {
            min-width: auto;
            width: 80%;
        }

        @media (max-width: $max-w-xs) {
            min-width: auto;
            width: 90%;
        }
    }
}

.modalWishMaker__content {
    padding: $pd-popupModal;
}

.wishMaker__inputSet + .wishMaker__inputSet {
    margin-top: 10px;
}

.modalWishMaker__selectResult {
    // border: 1px solid $color-border-light;
    // flex: 1;
    // min-height: 50px;
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 0;

    li {
        display: inline-block;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        background-color: $bs-info;
        border-radius: 1.5rem;
        padding-left: 0.75rem;
        margin-bottom: 0.25rem;

        .modalWishMaker__clearBtn {
            background-color: transparent;
            color: $white;
            border: none;
        }
    }
}
.wishMaker__help {
    font-size: 0.7rem;
    color: $emphasized2;
}

.wishMaker__imgFileInputLable {
    font-size: 0.8rem;
}

.wishMaker__imgContainer {
    img {
        width: 120px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 10px;
    }
}

.modalWishMaker__selectBtn {
    background-color: $white;
    border: 1px solid $color-border-layout;
    height: 30px;
    border-radius: 5px;
    margin-left: 0.5rem;
    font-size: 0.8rem;

    &:hover,
    &:active {
        background-color: darken($white, 10%);
    }
}

.modalWishMaker__footer {
    @extend .popupModalFooter;
    border-top: 1px solid $color-border-light;
}

.nowrap {
    white-space: nowrap;
}

.makeWishSet__chkboxType {
    display: inline-block;
}
</style>

<template>
    <div class="makeWishSet">
        <BaseModal
            :z="800"
            class="modalWishMaker"
            closeEvent="close-wish-maker"
            ref="filterSetModal"
            v-if="isShow"
        >
            <h2
                class="popupModalHeader"
                slot="header"
            >
                <font-awesome-icon
                    class="faIcon"
                    icon="dove"
                />許願池
            </h2>

            <div class="modalWishMaker__content">
                <LoadingSet v-if="sending" />
                <template v-else>
                    <InputTextSetMakeWish
                        :inputValidated="true"
                        :inputValue.sync="wishSubject"
                        :isRequired="true"
                        class="wishMaker__inputSet"
                        inputId="wishSubject"
                        inputInvalidFeedback="此欄位必填，且最多 255 字"
                        inputLabel="我想學"
                        inputPlaceholder="例如：寵物攝影、商業攝影、人像攝影..."
                    />

                    <InputTextSetMakeWish
                        :inputValidated="true"
                        :inputValue.sync="wishGoal"
                        :isRequired="true"
                        class="wishMaker__inputSet"
                        inputId="wishGoal"
                        inputInvalidFeedback="此欄位必填，且最多 255 字"
                        inputLabel="學習目標"
                        inputPlaceholder="例如：在戶外捕捉寵物動態、單人完成專案..."
                    />
                    <InputTextSetMakeWish
                        :inputValidated="true"
                        class="wishMaker__inputSet"
                        inputId="wishReference"
                        inputInvalidFeedback="最多 255 字"
                        inputLabel="參考資料"
                        inputPlaceholder="例如：xxx 部落格、xxx 講師、xxx 的作品、網址..."
                        v-bind:inputValue.sync="wishReference"
                    />
                    <div class="wishMaker__inputSet">
                        <label
                            class="btn btn-info wishMaker__imgFileInputLable"
                            for="wishMakerImgFileInput"
                        >選取參考圖片</label>
                        <input
                            @change="fileChanged"
                            accept="image/*"
                            class="d-none"
                            id="wishMakerImgFileInput"
                            multiple
                            type="file"
                        />
                        <div class="wishMaker__imgContainer">
                            <img
                                :key="index"
                                :src="imgSrc"
                                alt="我的願望參考圖片"
                                class="wishMaker__img"
                                v-for="(imgSrc, index) in imgSrcs"
                                v-if="imgSrc"
                            />
                        </div>
                    </div>
                    <div class="wishMaker__inputSet">
                        領域類別：
                        <span class="wishMaker__help">(最多 3 個)</span>
                        <button
                            @click="topicLabelSelector"
                            class="modalWishMaker__selectBtn"
                            title="選擇領域類別"
                        >選擇</button>
                        <button
                            @click="resetTopicLabel"
                            class="modalWishMaker__selectBtn"
                            title="清空領域類別"
                        >清空</button>
                        <ul
                            class="modalWishMaker__selectResult"
                            v-if="topicLabelSelectedModified.length"
                        >
                            <li
                                :key="topicLabelIdx"
                                v-for="(topicLabel,topicLabelIdx) in topicLabelSelectedModified"
                            >
                                {{topicLabel.topic+' / '+topicLabel.label}}
                                <button
                                    @click="clearTopicLabel(topicLabel.topic, topicLabel.label)"
                                    class="modalWishMaker__clearBtn"
                                >
                                    <font-awesome-icon icon="times-circle" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>

            <div
                class="modalWishMaker__footer"
                slot="footer"
                v-show="!sending"
            >
                <b-button
                    :disabled="confirmBtnDisabled"
                    @click="submit"
                    class="modalWishMaker__footerBtn"
                    variant="success"
                >{{ getTerm('SUBMIT')}}</b-button>
            </div>
        </BaseModal>
        <ModalTopicLabelSelectorForWishing v-bind:topicLabelSelected.sync="topicLabelSelected" />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import ModalTopicLabelSelectorForWishing from './ModalTopicLabelSelectorForWishing'
import InputTextSetMakeWish from './InputTextSetMakeWish'
import LoadingSet from './LoadingSet'

export default {
    name: 'MakeWishSet',
    components: {
        ModalTopicLabelSelectorForWishing,
        InputTextSetMakeWish,
        LoadingSet
    },
    data() {
        return {
            isShow: false,
            wishSubject: { value: '', state: null },
            wishGoal: { value: '', state: null },
            wishReference: { value: '', state: true },
            // imgFiles: [],
            imgSrcs: [],
            topicLabelSelected: {},
            sending: false
        }
    },
    props: {},
    mounted() {
        EventBus.$on('show-wish-maker', this.showModal)
        EventBus.$on('close-wish-maker', this.closeModal)
    },
    computed: {
        confirmBtnDisabled() {
            return !(
                this.wishSubject.state &&
                this.wishGoal.state &&
                this.topicLabelSelectedModified.length
            )
        },
        topicLabelSelectedModified() {
            let keys = Object.keys(this.topicLabelSelected),
                returnArr = [],
                tmp = {},
                num = 0

            for (let i = 0, j = keys.length; i < j; i++) {
                let key = keys[i],
                    thisTopic = this.topicLabelSelected[key]

                tmp[key] = []
                for (let ii = 0, jj = thisTopic.length; ii < jj; ii++) {
                    num++
                    let { topic, label } = thisTopic[ii]
                    tmp[key].push({ topic, label })

                    if (num == 3) {
                        break
                    }
                }
                if (num == 3) {
                    break
                }
            }

            this.topicLabelSelected = tmp
            keys = Object.keys(this.topicLabelSelected)

            keys.forEach(key => {
                this.topicLabelSelected[key].forEach(result => {
                    returnArr.push(result)
                })
            })

            return returnArr
        }
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        closeModal() {
            this.wishSubject = { value: '', state: null }
            this.wishGoal = { value: '', state: null }
            this.wishReference = { value: '', state: true }
            // this.imgFiles = []
            this.imgSrcs = []
            this.topicLabelSelected = {}
            this.isShow = false
            this.checkBodyScrollStatus()
            this.sending = false
        },
        showModal() {
            this.isShow = true
            this.checkBodyScrollStatus()
        },

        checkBodyScrollStatus() {
            this.$parent.checkBodyScrollStatus()
        },

        topicLabelSelector() {
            EventBus.$emit('show-topicLabel-selector-wishing')
        },
        resetTopicLabel() {
            this.topicLabelSelected = {}
        },
        clearTopicLabel(clearTopic, clearedLabel) {
            let keys = Object.keys(this.topicLabelSelected),
                tmp = {}

            keys.forEach(key => {
                tmp[key] = []
                this.topicLabelSelected[key].forEach(result => {
                    if (result.label != clearedLabel) {
                        tmp[key].push(result)
                    }
                })
            })
            this.topicLabelSelected = tmp
        },
        fileChanged(event) {
            let files = Array.from(event.target.files)

            files.forEach(async file => {
                if (file.size > JS_CONFIG.IMGUR_SIZE_LIMIT) {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        messageMode: true,
                        api: JS_CONFIG.TERMS.IMG_TOO_BIG.replace('FILE_NAME', file.name),
                        isError: true
                    })
                } else if (file.type.match(/(jpg|jpeg|png|gif)/i) === null) {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        messageMode: true,
                        api: JS_CONFIG.TERMS.IMG_WRONG_FORMAT.replace('FILE_NAME', file.name),
                        isError: true
                    })
                } else {
                    try {
                        let src = await this.loadFile(file)
                        // this.imgFiles.push(file)
                        this.imgSrcs.push(src)
                    } catch (e) {
                        this.$store.commit(
                            'alert/ADD_ALERT_MESSAGE',
                            {
                                api: 'loadFileWithFileReader',
                                code: e,
                                isError: true,
                                notApi: true
                            },
                            { root: true }
                        )
                    }
                }
            })
        },
        loadFile(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        },
        submit() {
            if (
                this.wishSubject.state &&
                this.wishGoal.state &&
                this.topicLabelSelectedModified.length
            ) {
                this.sending = true

                let categorys = this.topicLabelSelectedModified.map(itm => {
                    return { topic: itm.topic, label: itm.label }
                })

                this.$store
                    .dispatch('wish/postMyWish', {
                        title: this.wishSubject.value,
                        goal: this.wishGoal.value,
                        content: this.wishReference.value,
                        categorys: categorys,
                        // image_files: this.imgFiles
                        image_files: this.imgSrcs
                    })
                    .then(response => {
                        if (response.data.status == 0) {
                            this.$store.dispatch('wish/getMyWishes')
                            this.$store.commit('alert/SHOW_COMPLETE_ALERT', '送出願望完成。')
                            this.closeModal()
                        } else {
                            this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                                api: 'postMyWish',
                                code: response.data.status,
                                isError: true
                            })
                        }
                    })
                    .catch(e => {
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'unknown',
                            code: e,
                            isError: true
                        })
                    })
            }
        }
    },
    beforeDestroy() {
        EventBus.$off('show-wish-maker', this.showModal)
        EventBus.$off('close-wish-maker', this.closeModal)
    }
}
</script>