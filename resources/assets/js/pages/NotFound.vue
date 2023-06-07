<style lang="scss">
@import '../../sass/variables';
.webPage {
    padding-bottom: 0;
}
.notfound__banner {
    text-align: center;
    padding-top: 30vh;
    padding-bottom: 30vh;

    background-image: url('/img/background/bg-404.jpg');
    background-size: cover;
    background-position: center center;
}
</style>

<template>
    <div class="webPage">
        <div class="notfound__banner">
            糟糕
            <br />頁面似乎不存在
        </div>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

export default {
    name: 'NotFound',
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.ABOUT
        }
    },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')
    },
    updated() {
        EventBus.$emit('do-resize')
    }
}
</script>
