<style lang="scss">
@import '../../sass/variables';

.qaSender {
    margin-bottom: 0;
    background-color: $white;
    border: 2px solid $bs-warning;
    border-radius: $radius-bubble;
    padding: 1rem;
    position: relative;

    &:after {
        position: absolute;
        top: 8px;
        left: -14px;
        content: '';
        width: 15px;
        height: 15px;
        background-image: url(/img/talk-bubble-tail-border-yellow.svg);
        background-size: 20px 14px;
    }
}

.qaSender__editor {
    min-height: 3.5rem;
    max-height: 50vh;
    overflow-y: auto;
    border: 1px solid $color-border-light;
    text-align: left;
    padding: 0.25rem;

    &:after {
        content: attr(placeholder);
        display: inline;
        color: $gray;
    }

    &:focus {
        outline: none;
        border: 1px solid $bs-input;
    }

    img {
        max-width: 200px;
    }
}

.qaSender__funcBar {
    padding-top: 0.5rem;
    font-size: 0.9rem;
    text-align: right;
}

.qaSender__fileInput {
    display: none;
}

.qaSender__btn {
    font-size: 0.9rem;
    margin-bottom: 0;
}
</style>


<template>
    <div class="qaSender">
        <div
            :placeholder="placeholder"
            @blur="onblur"
            @drop.prevent
            @focus="onfocus"
            @keydown.enter.shift.prevent
            @paste.prevent="pasteToEditor"
            class="qaSender__editor"
            contenteditable="true"
            ref="qaEditor"
        />
        <!-- @drag="onDrag"
        @drop="onDrop"-->
        <ProgressSet
            :progress="imageUploadProgress"
            v-if="imageUploadProgress>0 && imageUploadProgress<100"
        />
        <div class="qaSender__funcBar">
            <label
                :for="'fileInput' + token"
                class="qaSender__btn btn btn-info"
            >
                插入圖片
                <input
                    :id="'fileInput' + token"
                    @change="imgFileOnChange"
                    accept="image/*"
                    class="qaSender__fileInput"
                    multiple
                    ref="imageFileInput"
                    type="file"
                />
            </label>
            <b-button
                @click="sendQA"
                class="qaSender__btn"
                variant="success"
            >送出</b-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProgressSet from './ProgressSet'
import ImgurUpload from '../class/imgurUpload'
import ClearHtml from '../class/clearHtml'
import $ from 'jquery'
import { constants } from 'crypto'
import { JS_CONFIG } from '../config'
import { EventBus } from '../event-bus'
import { send } from 'q'

let upload = new ImgurUpload(),
    clearHtml = new ClearHtml()

export default {
    name: 'LessonQASender',
    components: { ProgressSet },
    data() {
        return {
            hidePlaceholder: false,
            imageUploadProgress: 0
            /* ,
            dragFromEditor: false */
        }
    },
    props: {
        token: {
            type: String,
            default: ''
        },
        replyMode: {
            type: Number,
            default: 0 // 新討論串
        },
        notify: {
            type: Number,
            default: 0
        },
        notifyMid: {
            type: Number,
            default: -1
        }
    },
    mounted() {
        upload.imageUploadingProgress = progress => {
            this.imageUploadProgress = progress
        }
        upload.imageUploaded = url => {
            this.insertImg(url)
        }
    },
    computed: {
        placeholder() {
            return this.hidePlaceholder
                ? ''
                : `${this.memberName}，請輸入您的${this.replyMode ? '回覆' : '想法'}。`
        },
        ...mapGetters({
            memberName: 'member/memberName',
            memberId: 'member/memberId',
            lessonShopTeacherMid: 'teacher/lessonShopTeacherMid',
            lessonName: 'lesson/lessonDetailLessonName'
        })
    },
    methods: {
        onfocus() {
            this.hidePlaceholder = true
        },
        onblur(evt) {
            if (evt.target.innerHTML == '') {
                this.hidePlaceholder = false
            }
        },
        imgFileOnChange(evt) {
            let files = evt.target.files
            if (files.length) {
                let requests,
                    formDatas = [],
                    imgur_client_ID = '8390218445c1276'

                for (let i = 0, j = files.length; i < j; i++) {
                    let file = files[i],
                        size = file.size

                    if (size > 10485760) {
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
                        let formData = new FormData()
                        formData.append('image', file)
                        formDatas.push(formData)
                    }
                }

                requests = formDatas.map(formData => {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            async: true,
                            crossDomain: true,
                            url: 'https://api.imgur.com/3/image',
                            method: 'post',
                            headers: {
                                authorization: 'Client-ID ' + imgur_client_ID
                            },
                            processData: false,
                            contentType: false,
                            mimeType: 'multipart/form-data',
                            data: formData,
                            xhr: function() {
                                let xhr = new window.XMLHttpRequest()
                                // Upload progress
                                xhr.upload.addEventListener(
                                    'progress',
                                    function(evt) {
                                        if (evt.lengthComputable) {
                                            let percent_complete = Math.ceil(
                                                (evt.loaded / evt.total) * 100
                                            )
                                            upload.imageUploadingProgress(percent_complete)
                                        }
                                    },
                                    false
                                )
                                return xhr
                            }
                        }).done(function(response) {
                            resolve(response)
                        })
                    })
                })

                Promise.all(requests).then(responses =>
                    responses.forEach(response => {
                        let pms = JSON.parse(response),
                            url = pms['data']['link']
                        upload.imageUploaded(url)
                    })
                )
            }
        },
        /* 
        onDrag() {
            this.dragFromEditor = true
        },
        onDrop(evt) {
            if (!this.dragFromEditor) {
                evt.preventDefault()
            }
        }, */

        pasteToEditor(evt) {
            let text = evt.originalEvent
                ? evt.originalEvent.clipboardData.getData('text/plain')
                : evt.clipboardData.getData('text/plain')

            if (text) {
                text = clearHtml.removeAllTag(text)

                let textArr = text.split(/\n/g),
                    userSelection,
                    range

                if (window.getSelection) {
                    userSelection = window.getSelection()
                } else if (document.selection) {
                    // should come last; Opera!
                    userSelection = document.selection.createRange()
                }

                range = userSelection.getRangeAt(0)
                range.deleteContents()

                textArr.forEach(itm => {
                    let content = itm.trim()
                    if (content) {
                        let newElement = document.createElement('div')
                        newElement.innerHTML = content
                        range.insertNode(newElement)

                        if (userSelection.setBaseAndExtent) {
                            userSelection.setBaseAndExtent(newElement, 1, newElement, 1)
                            range = userSelection.getRangeAt(0)
                        }
                    }
                })
            }
        },
        insertImg(url) {
            let newElement = document.createElement('img')
            newElement.src = url
            this.$refs.qaEditor.append(newElement)
            this.hidePlaceholder = true
        },

        async sendQA() {
            let html = this.$refs.qaEditor.innerHTML,
                send_data

            if (!html) {
                return
            }
            html = this.$refs.qaEditor.innerHTML.replace(/\&amp;/i, '&')
            html = clearHtml.QaPreventConflict(html)
            html = clearHtml.QaClearText(html)

            send_data = {
                text: html,
                token: this.token || null,
                area: this.$route.name == 'lessonShop' ? 'shop' : 'classroom',
                l_id: this.$route.params.l_id
            }

            if (this.notify && this.notifyMid != -1) {
                send_data.notify = this.notify
                send_data.notify_mid = this.notifyMid
            }

            try {
                gtag('event', 'qa', {
                    event_category: 'qa',
                    event_action: send_data.area,
                    event_label: send_data.token ? 'New Response' : 'New thread'
                })
            } catch (e) {
                console.log('sendQA gtag e', e)
            }

            try {
                let response = await this.$store.dispatch('lesson/sendLessonShopQA', send_data)
                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '送出成功')
                    EventBus.$emit('qa-send-completed')

                    // 送站內訊息
                    let toArr = []

                    if (send_data.token) {
                        // 回覆討論串
                        toArr = this.$parent.getThreadMembersId()
                    } else {
                        if (this.lessonShopTeacherMid != this.memberId) {
                            toArr = [this.lessonShopTeacherMid]
                        }
                    }

                    toArr.forEach(to => {
                        let briefContent =
                                send_data.text.length > 15
                                    ? send_data.text.substr(0, 15) + '...'
                                    : send_data.text,
                            sendData = {
                                to: to,
                                from: 'system',
                                content: `[${this.memberName}] 在 [${this.lessonName}] 的' ${
                                    send_data.area ? '課程頁面' : '教室頁面'
                                }發言說：「${briefContent}」`,
                                href:
                                    send_data == 'shop'
                                        ? '/lesson/' + this.$route.params.l_id
                                        : '/profile/lesson/classroom/' + this.$route.params.l_id
                            }

                        // this.$store
                        //     .dispatch('message/sendMessage', { data: sendData, systemMsg: true })
                        //     .catch(e => {
                        //         console.warn('sendQA message/sendMessage e', e)
                        //     })
                    })
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'sendLessonShopQA',
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
        }
    }
}
</script>