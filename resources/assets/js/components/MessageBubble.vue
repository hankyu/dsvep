<style lang="scss">
@import '../../sass/variables';
</style>


<template>
    <div>
        <span v-html="bubleText" />
        <router-link
            :to="dialog.href"
            target="_blank"
            v-if="dialog.href"
        >
            <font-awesome-icon
                class="messageSystem__linkIcon"
                icon="external-link-alt"
            ></font-awesome-icon>
        </router-link>
        <p class="messageSystem__bubbleTime">{{ dialog.time }}</p>
    </div>
</template>

<script>
import { JS_CONFIG } from '../config.js'

export default {
    name: 'MessageBubble',

    mixins: [],

    components: {},

    props: {
        dialog: {
            type: Object,
            required: true
        }
    },

    mounted() {},

    computed: {
        bubleText() {
            return this.dialog.content.replace(/\n/gi, '<br>')
        }
    },

    methods: {}
}
</script>