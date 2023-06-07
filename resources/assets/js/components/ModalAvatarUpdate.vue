<style lang="scss" scoped>
@import '../../sass/variables';

.avatarUpdate__title {
    @extend .popupModalHeader;
}

.avatarUpdate__content {
    padding: 1rem;

    @media (max-width: $max-w-xs) {
        padding: 0.5rem;
    }
}

.avatarUpdate__originImgContainer {
    width: 402px;
    height: 302px;
    background-color: $dark;
    padding: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: $max-w-xs) {
        width: 302px;
        height: 302px;
    }
    @media (max-width: $max-w-xxs) {
        width: 242px;
        height: 242px;
    }
}

.avatarUpdate__originImg {
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
}

.avatarUpdate__fileInputSet {
    position: relative;
    width: 120px;
    margin: auto;
    margin-top: 0.5rem;
}

.avatarUpdate__fileInputFakeBtn {
    width: 100%;
    font-size: 0.9rem;
}

.avatarUpdate__imgFileInputLable {
    width: 100%;
    font-size: 0.9rem;
}

.avatarUpdate__fileInput {
    display: none;
}

.avatarUpdate__footer {
    @extend .popupModalFooter;
}

.avatarUpdate__footerBtn {
    @extend .popupModalFooterBtn;
}

.avatarUpdate__icon {
    @extend .faIcon;
}

.avatarUpdate__loading {
    min-height: 0;
    margin-top: 10px;
}
</style>

<template>
    <BaseModal
        class="modalAvatarUpdate"
        closeEvent="close-modal-avatar-update"
        v-if="isShow"
    >
        <h2
            class="avatarUpdate__title"
            slot="header"
        >
            <font-awesome-icon
                class="avatarUpdate__icon"
                icon="portrait"
            />上傳大頭照
        </h2>
        <div class="avatarUpdate__content">
            <div class="avatarUpdate__originImgContainer">
                <cropper
                    :src="imgSrc"
                    :stencil-props="{ aspectRatio: 1 }"
                    :stencilComponent="$options.components.CircleStencil"
                    @change="change"
                    class="avatarUpdate__cropper"
                ></cropper>
            </div>
            <div
                class="avatarUpdate__fileInputSet"
                v-if="uploadStatus == 0"
            >
                <label
                    class="btn btn-info avatarUpdate__imgFileInputLable"
                    for="avatarUpdateImgFileInput"
                >上傳圖檔</label>
                <input
                    @change="fileChanged"
                    accept="image/gif, image/jpeg, image/png, image/jpg"
                    class="avatarUpdate__fileInput"
                    id="avatarUpdateImgFileInput"
                    ref="fileInput"
                    type="file"
                />
            </div>
            <LoadingSet
                class="avatarUpdate__loading"
                v-else
            />
        </div>
        <div
            class="avatarUpdate__footer"
            slot="footer"
        >
            <b-button
                @click="closeModel"
                class="avatarUpdate__footerBtn"
                ref="btnClose"
                v-if="uploadStatus == 0"
                variant="danger"
            >{{ getTerm('CANCEL') }}</b-button>
            <b-button
                :disabled="!this.imgSrc"
                @click="uploadAvatar"
                class="avatarUpdate__footerBtn"
                v-if="uploadStatus == 0"
                variant="success"
            >{{ getTerm('CONFIRM') }}</b-button>
            <!-- :disabled="!imgSrc" -->
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import { setTimeout } from 'timers'
import LoadingSet from './LoadingSet'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import EXIF from 'exif-js'

export default {
    name: 'ModalAvatarUpdate',
    components: {
        LoadingSet,
        Cropper,
        CircleStencil
    },
    created() {
        EventBus.$on('show-modal-avatar-update', this.showModel)
        EventBus.$on('close-modal-avatar-update', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            file: null,
            imgSrc: '',
            uploadStatus: 0,
            coordinates: {},
            orientation: null
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
            this.file = null
            this.imgSrc = ''
            this.uploadStatus = 0
            this.coordinates = {}
            this.orientation = null
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        async fileChanged(event) {
            this.file = event.target.files[0]
            this.uploadStatus = 1

            if (this.file.size > JS_CONFIG.IMGUR_SIZE_LIMIT) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    messageMode: true,
                    api: JS_CONFIG.TERMS.IMG_TOO_BIG.replace('FILE_NAME', this.file.name),
                    isError: true
                })

                this.file = null
            } else if (this.file.type.match(/(jpg|jpeg|png|gif)/i) === null) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    messageMode: true,
                    api: JS_CONFIG.TERMS.IMG_WRONG_FORMAT.replace('FILE_NAME', this.file.name),
                    isError: true
                })

                this.file = null
            } else {
                try {
                    let src = await this.loadFile(this.file)
                    let img = await this.loadImg(src)

                    this.imgSrc = src
                    let orientation = await this.loadEXIF(img)
                    this.orientation = orientation || null
                } catch (e) {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'loadFileWithFileReader',
                        code: e,
                        isError: true,
                        notApi: true
                    })
                } finally {
                    this.uploadStatus = 0
                }
            }
        },
        loadFile(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.onload = () => {
                    resolve(reader.result)
                }
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        },

        loadImg(src) {
            return new Promise((resolve, reject) => {
                let img = new Image()
                img.onload = () => resolve(img)
                img.onerror = reject
                img.src = src
            })
        },

        loadEXIF(img) {
            return new Promise((resolve, reject) => {
                try {
                    EXIF.getData(img, function() {
                        let orientation = EXIF.getTag(this, 'Orientation')
                        resolve(orientation)
                    })
                } catch (e) {
                    reject(e)
                }
            })
        },

        getFormData() {
            if (!this.file) {
                return
            }
            let postData = { ...this.coordinates },
                keys = Object.keys(postData),
                formData = new FormData()

            keys.forEach(key => {
                formData.append(key, Math.floor(postData[key]))
            })
            if (this.orientation) {
                formData.append('flip', this.getFlip(this.orientation))
                formData.append('rotate', this.getRotate(this.orientation))
            } else {
                formData.append('flip', 0)
                formData.append('rotate', 0)
            }
            formData.append('file', this.file)

            return formData
        },

        getFlip(orientation) {
            let needflip = [0, 1, 0, 1, 1, 0, 1, 0]
            return needflip[orientation - 1]
        },

        getRotate(orientation) {
            let rotate = [0, 0, 180, 180, 90, 270, 270, 90]
            return rotate[orientation - 1]
        },

        async uploadAvatar() {
            let formData = this.getFormData()

            this.uploadStatus = 1

            try {
                let response = await this.$store.dispatch('member/uploadAvatar', formData)

                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '儲存成功')
                    EventBus.$emit('upload-avatar-completed')
                    this.closeModel()
                } else {
                    this.$store.commit(
                        'alert/ADD_ALERT_MESSAGE',
                        {
                            api: 'uploadAvatar',
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
                this.uploadStatus = 0
            }
        },
        change({ coordinates, canvas }) {
            this.coordinates = coordinates
            this.canvasWidth = canvas.width
        }
    },
    beforeDestroy() {
        EventBus.$off('show-modal-avatar-update', this.showModel)
        EventBus.$off('close-modal-avatar-update', this.closeModel)
    }
}
</script>
