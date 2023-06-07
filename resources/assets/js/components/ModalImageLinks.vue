<style lang="scss">
@import '../../sass/variables';

.modalImageLinks__content {
    @extend .popupModalBody;

    .modalImageLinks__list {
        list-style-type: none;
        padding-left: 0;
        margin-bottom: 0;

        li {
            input {
                background-color: $white;
                border: 1px solid $color-border-primary;
                font-size: 0.8rem;
                width: 400px;
                max-width: 100%;
            }
        }
        li + li {
            margin-top: 0.25rem;
        }
    }
}
</style>

<template>
    <BaseModal
        class="modalImageLinks"
        closeEvent="close-img-link-input"
        v-if="isShow"
    >
        <h2
            class="popupModalHeader"
            slot="header"
        >
            <font-awesome-icon
                class="faIcon"
                icon="exclamation-circle"
            />輸入圖片網址
        </h2>
        <div class="modalImageLinks__content">
            <ul class="modalImageLinks__list">
                <li
                    :key="idx"
                    v-for="(imgLink,idx) in data"
                >
                    <input
                        type="text"
                        v-model="imgLink.value"
                    />
                </li>
            </ul>
        </div>
        <div
            class="popupModalFooter"
            slot="footer"
        >
            <b-button
                @click="submit"
                class="popupModalFooterBtn"
                variant="success"
            >{{ getTerm('CONFIRM') }}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

export default {
    name: 'ModalImageLinks',
    created() {},
    data: function() {
        return {
            isShow: false,
            fIdx: null,
            data: [{ value: '' }]
        }
    },
    props: {},
    mounted() {
        EventBus.$on('show-img-link-input', this.showModel)
        EventBus.$on('close-img-link-input', this.closeModel)
    },
    computed: {},
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel({ fIdx, num }) {
            this.isShow = true
            this.fIdx = fIdx

            let tmp = []
            for (let i = 0; i < num; i++) {
                tmp.push({ value: '' })
            }
            this.data = tmp

            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        submit() {
            console.log('submit()')
            let imgLinks = []

            this.data.forEach(link => {
                let trimedLink = link.value.trim()

                if (trimedLink) {
                    imgLinks.push(trimedLink)
                }
            })
            EventBus.$emit('set-img-links', { fIdx: this.fIdx, imgLinks })
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-img-link-input', this.showModel)
        EventBus.$off('close-img-link-input', this.closeModel)
    }
}
</script>