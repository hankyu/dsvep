<style lang="scss">
@import '../../sass/variables';

.lessonDescription.ql-editor {
    padding: 0.5rem 0;

    span {
        line-height: 1;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin-bottom: 0;
        line-height: 1.4;
    }
    img {
        max-width: 100%;
        height: auto;
        margin: 0.25rem auto;
    }

    @media (max-width: 767px) {
        h1 {
            font-size: 28px;
        }
        h2 {
            font-size: 26px;
        }
        h3 {
            font-size: 24px;
        }
        h4 {
            font-size: 22px;
        }
        h5 {
            font-size: 20px;
        }
        h6 {
            font-size: 18px;
        }
    }
}
</style>

<template>
    <div
        class="lessonDescription ql-editor ql-snow"
        ref="lessonDescriptionContainer"
    ></div>
</template>

<script>
import { JS_CONFIG } from '../config.js'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export default {
    name: 'LessonDescription',
    data: function() {
        return {}
    },
    props: {
        description: {
            type: Array,
            required: true
        }
    },
    mounted() {
        let delta = [],
            deltaElm

        this.description.forEach(elm => {
            let tmpContent = elm[0].substr(1, elm[0].length - 2),
                exts = ['jpeg', '.gif', '.png', '.jpg'],
                isImg =
                    exts.indexOf(tmpContent.substr(tmpContent.length - 4, tmpContent.length - 1)) !=
                    -1

            deltaElm = []

            if (isImg) {
                if (elm[1] != null) {
                    if (elm[1]['link']) {
                        deltaElm['insert'] = []
                        deltaElm['insert']['image'] = elm[1]['link']
                    } else {
                        deltaElm['insert'] = tmpContent
                        deltaElm['attributes'] = elm[1]
                    }
                } else {
                    deltaElm['insert'] = elm[0]
                }
            } else {
                deltaElm['insert'] = tmpContent

                if (elm[1] != '') {
                    deltaElm['attributes'] = elm[1]
                }
            }
            delta.push(deltaElm)
        })

        let cfg = {},
            converter = new QuillDeltaToHtmlConverter(delta, cfg),
            html = converter.convert()

        this.$refs.lessonDescriptionContainer.innerHTML = html
    },
    methods: {}
}
</script>