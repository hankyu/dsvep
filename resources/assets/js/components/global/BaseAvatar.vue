<style lang="scss">
@import '../../../sass/variables';

.baseAvatar {
    border-radius: 50%;
    background-color: $lightgray;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    @extend .coverImgOuter;

    .baseAvatar__img {
        @extend .hoverScaleBig;
        @extend .coverImgInner;
        border-radius: 50%;
    }
}
</style>

<template>
    <div
        :style="avatarStyle"
        class="baseAvatar"
    >
        <div
            :style="avatarImgStyle"
            class="baseAvatar__img"
            key="memberAvatar"
            ref="baseAvatarImg"
            v-if="avatarImg"
        ></div>
        <div
            :style="avatarImgVisitorStyle"
            class="baseAvatar__img"
            key="visitorAvatar"
            v-else
        ></div>
    </div>
</template>

<script>
import { JS_CONFIG } from '../../config.js'

export default {
    name: 'BaseAvatar',
    props: {
        borderW: {
            type: Number,
            default: 1
        },
        borderC: {
            type: String,
            default: '#999'
        },
        avatarWidth: {
            type: Number,
            default: 60
        },
        avatarImg: {
            type: String
        }
    },
    computed: {
        avatarClass() {},
        avatarStyle() {
            let ret = {}
            ret.width = ret.minWidth = ret.height = `${this.avatarWidth}px`
            ret.borderWidth = `${this.borderW}px`
            ret.borderStyle = 'solid'
            ret.borderColor = this.borderC
            return ret
        },
        avatarImgStyle() {
            return `background-image: url(${JS_CONFIG.PERSONAL_AVATAR_PATH + this.avatarImg});`
        },
        avatarImgVisitorStyle() {
            return `background-image: url(${JS_CONFIG.PERSONAL_AVATAR_PATH}avatar-vistor.png);`
        }
    },
    methods: {}
}
</script>