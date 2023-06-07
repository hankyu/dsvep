<style lang="scss">
@import '../../sass/variables';

.teacherPortfoliosSetup {
}

.teacherPortfoliosSetup__field {
    display: flex;
    border: 1px solid $color-border-primary;
    border-radius: 5px;
    overflow: hidden;
}
.teacherPortfoliosSetup__field + .teacherPortfoliosSetup__field {
    margin-top: 0.5rem;
}

.teacherPortfoliosSetup__decoration {
    width: 2rem;
    background-color: $lightgray;
    color: $white;
    text-align: center;

    @media (max-width: $max-w-xs) {
        width: 1rem;
    }
}

.teacherPortfoliosSetup__content {
    padding: 0.5rem;
    flex: 1;
}

.teacherPortfoliosSetup__header {
    font-size: 1rem;
}

.teacherPortfoliosSetup__header--title {
    display: flex;

    input {
        flex: 1;
        padding-left: 0.25rem;
    }
}

$color-links-border: $brand-primary;
$color-links-bg: $complementary2;
.teacherPortfoliosSetup__list {
    list-style-type: none;
    padding-left: 0;

    &.teacherPortfoliosSetup__list--link {
        font-size: 0.8rem;
        li {
            border: 1px solid $color-links-border;
            background-color: $color-links-bg;
            border-radius: 4px;
            position: relative;
            padding: 0.25rem 0.25rem 0.25rem 1.25rem;
            overflow: hidden;
            display: flex;

            &::before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                width: 1rem;
                top: 0;
                bottom: 0;
                background-color: $color-links-border;
            }
            input {
                flex: 1;
                border: 1px solid $lightgray;
                padding-left: 0.25rem;
                border-right: none;
            }
            button {
                width: 36px;
                height: 36px;
                border: none;
                background-color: $bs-danger;
                color: $white;

                &:hover,
                &:active {
                    background-color: darken($bs-danger, 10%);
                }
            }
        }
        li + li {
            margin-top: 0.25rem;
        }
    }
    &.teacherPortfoliosSetup__list--img {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        li {
            width: 12%;
            height: 0;
            padding-bottom: 12%;
            margin: 0 0.4% 5px 0;
            background-size: cover;
            background-position: center center;
            position: relative;
            border: 1px solid $lightgray;
            border: 5px solid $bs-warning;
            border-radius: 5px;
            overflow: hidden;

            &.deleted {
                opacity: 0.5;
            }

            @media (max-width: $max-w-xs) {
                width: 24%;
                height: 0;
                padding-bottom: 24%;
                margin: 0 0 5px 0.9%;
            }
        }

        button {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 0.8rem;
            background-color: $bs-danger;
            color: $white;
            border: none;

            &:hover,
            &:active {
                background-color: darken($bs-danger, 10%);
            }
        }
    }
}

.teacherPortfoliosSetup__btnBar {
    margin-top: 1rem;
    text-align: right;
}

.teacherPortfoliosSetup__btn {
    font-size: 1rem;

    &.teacherPortfoliosSetup__btn--addField {
        margin-right: 1.5rem;
    }

    @media (max-width: $max-w-xs) {
        font-size: 0.8rem;

        &.teacherPortfoliosSetup__btn--addField {
            margin-right: 1rem;
        }
    }
}
.teacherPortfoliosSetup__btnBar--field {
    .teacherPortfoliosSetup__btn {
        margin-top: 0.5rem;

        @media (max-width: $max-w-xs) {
            font-size: 0.7rem;
        }
    }
}

.teacherPortfoliosSetup__imgFileInput {
    display: none;
}

.field-enter-active {
    transition: max-height 0.5s ease-in, opacity 0.5s ease-in;
}
.field-enter,
.field-leave-to {
    opacity: 0;
    max-height: 0;
}
.field-enter-to,
.field-leave {
    opacity: 1;
    max-height: 600px;
}
</style>

<template>
    <div class="teacherPortfoliosSetup">
        <LoadingSet v-if="saving" />
        <template v-else>
            <transition-group
                name="field"
                tag="div"
            >
                <div
                    :key="'field'+fIdx"
                    class="teacherPortfoliosSetup__field"
                    v-for="(field,fIdx) in data"
                >
                    <div class="teacherPortfoliosSetup__decoration">{{fIdx+1}}</div>
                    <div class="teacherPortfoliosSetup__content">
                        <h2 class="teacherPortfoliosSetup__header teacherPortfoliosSetup__header--title">
                            <span>標題：</span>
                            <input
                                placeholder="輸入標題"
                                type="text"
                                v-model="field.title"
                            />
                        </h2>
                        <div
                            class="teacherPortfoliosSetup__section"
                            v-if="field.links.length"
                        >
                            <h2 class="teacherPortfoliosSetup__header">
                                連結：
                                <small>最多 {{max_links}} 個</small>
                            </h2>
                            <ul class="teacherPortfoliosSetup__list teacherPortfoliosSetup__list--link">
                                <li
                                    :key="'field_'+fIdx+'_link_'+lIdx"
                                    v-for="(link,lIdx) in field.links"
                                >
                                    <input
                                        placeholder="請輸入連結網址"
                                        type="text"
                                        v-model="link.value"
                                    />
                                    <button>
                                        <font-awesome-icon
                                            @click="deleteLink(fIdx, lIdx)"
                                            icon="times"
                                        />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div
                            class="teacherPortfoliosSetup__section"
                            v-if="field.imgs.length"
                        >
                            <h2 class="teacherPortfoliosSetup__header">
                                圖片：
                                <small>最多 {{max_imgs}} 張</small>
                            </h2>
                            <ul class="teacherPortfoliosSetup__list teacherPortfoliosSetup__list--img">
                                <li
                                    :class="img.deleted? 'deleted':''"
                                    :key="'field_'+fIdx+'_img_'+iIdx"
                                    :style="'background-image:url('+img.value+');'"
                                    v-for="(img,iIdx) in field.imgs"
                                >
                                    <button @click="switchDeleted(fIdx, iIdx)">
                                        <font-awesome-icon :icon="img.deleted?'undo-alt':'times'" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="teacherPortfoliosSetup__btnBar teacherPortfoliosSetup__btnBar--field">
                            <b-button
                                @click="addLink(fIdx)"
                                class="btn-brand-primary teacherPortfoliosSetup__btn"
                                size="sm"
                                v-if="field.links.length < max_links"
                                variant="info"
                            >增加連結</b-button>
                            <b-button
                                @click="addLinkingImg(fIdx)"
                                class="teacherPortfoliosSetup__btn"
                                size="sm"
                                v-if="field.imgs.length < max_imgs"
                                variant="warning"
                            >增加圖片網址</b-button>
                            <input
                                :data-fidx="fIdx"
                                :id="'file_'+fIdx"
                                @change="imgFileChange"
                                accept="image/*"
                                class="teacherPortfoliosSetup__imgFileInput"
                                multiple
                                type="file"
                            />
                            <label
                                :for="'file_'+fIdx"
                                class="btn btn-warning btn-sm mb-0 teacherPortfoliosSetup__btn"
                                size="sm"
                                v-if="field.imgs.length < max_imgs"
                            >上傳圖片</label>
                            <br class="d-block d-sm-none" />
                            <b-button
                                @click="deleteField(fIdx)"
                                class="teacherPortfoliosSetup__btn"
                                size="sm"
                                variant="danger"
                            >刪除區塊</b-button>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div class="teacherPortfoliosSetup__btnBar">
                <b-button
                    @click="addField"
                    class="teacherPortfoliosSetup__btn teacherPortfoliosSetup__btn--addField"
                    v-if="data.length< max_fields"
                    variant="info"
                >增加區塊</b-button>
                <b-button
                    @click="cancel"
                    class="teacherPortfoliosSetup__btn"
                    variant="danger"
                >放棄編輯</b-button>
                <b-button
                    @click="uploadNewImg"
                    class="teacherPortfoliosSetup__btn"
                    variant="success"
                >儲存編輯</b-button>
            </div>
        </template>
        <ModalImageLinks ref="modalImageLinks" />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import ImgurUploader from '../class/imgurUpload'
import LoadingSet from './LoadingSet'
import ModalImageLinks from './ModalImageLinks'

let imgurUPloader = new ImgurUploader()

const MAX_LINKS_PER_FIELD = 10,
    MAX_IMGS_PER_FIELD = 40,
    MAX_FIELDS = 20

export default {
    name: 'TeacherPortfoliosSetup',
    components: {
        LoadingSet,
        ModalImageLinks
    },
    data: function() {
        return {
            data: [],
            max_links: MAX_LINKS_PER_FIELD,
            max_imgs: MAX_IMGS_PER_FIELD,
            max_fields: MAX_FIELDS,
            newFileIdxs: [],
            saving: false
        }
    },

    props: {
        portfoliosData: {
            type: Array,
            required: true
        }
    },
    created() {
        let tmp = []
        this.portfoliosData.forEach(field => {
            tmp.push({ title: field.title, links: [], imgs: [] })
            let tmpField = tmp[tmp.length - 1]

            field.links.forEach(link => {
                tmpField.links.push({ value: link })
            })

            field.imgs.forEach(img => {
                tmpField.imgs.push({ value: img[0], dh: img[1] ? img[1] : '', deleted: false })
            })
        })
        this.data = tmp
        EventBus.$emit('do-resize')
    },

    mounted() {
        EventBus.$on('set-img-links', this.setLinkingImg)
        imgurUPloader.imageUploaded = (url, deletehash) => {
            let currImgIdx = this.newFileIdxs.splice(0, 1)[0],
                currImg = this.data[currImgIdx.fIdx].imgs[currImgIdx.iIdx]

            currImg.value = url
            currImg.dh = deletehash
        }
        imgurUPloader.imageAllUploaded = () => {
            this.save()
        }
    },

    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {},
    methods: {
        addField() {
            this.data.push({ title: '', links: [], imgs: [] })
        },
        addLink(fIdx) {
            this.data[fIdx].links.push({ value: '' })
        },
        addLinkingImg(fIdx) {
            let num = this.max_imgs - this.data[fIdx].imgs.length
            EventBus.$emit('show-img-link-input', { fIdx, num })
            // this.data[fIdx].imgs.push({ value: '', deleted: false })
        },
        setLinkingImg({ fIdx, imgLinks }) {
            imgLinks.forEach(link => {
                this.data[fIdx].imgs.push({ value: link, deleted: false, dh: '' })
            })
        },
        imgFileChange(evt) {
            let fidx = evt.target.dataset.fidx * 1

            let files = Array.from(event.target.files)

            try {
                files.forEach(async file => {
                    let src = await this.loadFile(file)
                    this.data[fidx].imgs.push({ value: src, file, dh: '', deleted: false })
                })
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'loadFileWithFileReader',
                    code: e,
                    isError: true,
                    notApi: true
                })
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

        deleteField(fIdx) {
            this.data.splice(fIdx, 1)
        },
        deleteLink(fIdx, lIdx) {
            this.data[fIdx].links.splice(lIdx, 1)
        },
        switchDeleted(fIdx, iIdx) {
            this.data[fIdx].imgs[iIdx].deleted = !this.data[fIdx].imgs[iIdx].deleted
        },

        cancel() {
            this.$parent.editing = false
        },

        uploadNewImg() {
            this.saving = true
            let newImgs = []
            this.data.forEach((field, fIdx) => {
                field.imgs.forEach((img, iIdx) => {
                    if (img.file && !img.deleted) {
                        this.newFileIdxs.push({ fIdx, iIdx })
                        newImgs.push(img.file)
                    }
                })
            })
            imgurUPloader.imageUpload2(newImgs)
        },
        async save() {
            let str = ''

            this.deleteRequests = []

            this.data.forEach(field => {
                if (field.links.length || field.imgs.length) {
                    /* str += (str ? '\n' : '') + '[[TIT]]'
                    str += field.title ? field.title : '無標題' */
                    let fieldStr = field.links.reduce((acc, link) => {
                        let linkTrimed = ''
                        if (link.value) {
                            linkTrimed = link.value.trim()
                        }
                        if (linkTrimed) {
                            return acc + (acc ? '\n' : '') + '[[LINK]]' + linkTrimed
                        } else {
                            return ''
                        }
                    }, '')

                    fieldStr = field.imgs.reduce((acc, img) => {
                        let imgTrimed = img.value ? img.value.trim() : ''
                        if (imgTrimed && !img.deleted) {
                            return (acc +=
                                (acc ? '\n' : '') +
                                '[[IMG]]' +
                                imgTrimed +
                                (img.dh ? '[[,]]' + img.dh : ''))
                        } else {
                            if (img.dh && img.deleted) {
                                this.deleteRequests.push(imgurUPloader.deleteImage(img.dh))
                            }
                            return acc + ''
                        }
                    }, fieldStr)
                    if (fieldStr) {
                        let title = field.title.trim()
                        fieldStr = (str ? '\n' : '') + '[[TIT]]' + title + '\n' + fieldStr
                        str += fieldStr
                    }
                }
            })
            try {
                let response = await this.$store.dispatch('teacher/updatePortfolios', {
                    portfolios: str,
                    t_id: this.$route.params['t_id']
                })
                if (response.data.status == 0) {
                    Promise.all(this.deleteRequests)
                        .then(res => {
                            this.$store.commit('alert/SHOW_COMPLETE_ALERT', '儲存成功')
                            this.$parent.editing = false
                            this.saving = false
                            EventBus.$emit('portfolios-saved')
                        })
                        .catch(e => {})
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'updatePortfolios',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        checkBodyScrollStatus() {
            this.$parent.$parent.$parent.$parent.$parent.switchBodyScrollStatus(
                this.$refs['modalImageLinks'].isShow
            )
        }
    }
}
</script>