<style lang="scss">
@import '../../sass/variables';

.messageSystem__readSpn {
    color: $lightgray;
}
</style>


<template>
    <li>
        <BaseAvatar
            avatarImg="avatar-vistor.png"
            class="messageSystem__avatar"
        />
        <div class="messageSystem__info">
            <h2 class="messageSystem__name">{{ itemText }}</h2>
            <p class="messageSystem__unread">
                <span
                    class="messageSystem__unreadSpn"
                    v-if="unreadNum"
                >有 {{ unreadNum }} 則未讀</span>
                <span
                    class="messageSystem__readSpn"
                    v-else
                >已讀</span>
            </p>
        </div>
    </li>
</template>

<script>
import { JS_CONFIG } from '../config.js'

export default {
    name: 'MessageListItem',

    mixins: [],

    components: {},

    props: {
        contents: {
            type: Object,
            required: true
        },
        dialogName: {
            type: String,
            required: true
        }
    },

    mounted() {},

    computed: {
        itemText() {
            let acc = this.$store.state.member.memberData.data.account,
                arr = this.dialogName.split(','),
                idx = arr.indexOf(acc)
            return arr[idx == 0 ? 1 : 0]
        },
        unreadNum() {
            let keys = Object.keys(this.contents),
                unread = 0

            keys.reverse().some(key => {
                unread += this.contents[key].read == 'unread' ? 1 : 0
                return this.contents[key].read == 'read'
            })
            return unread
        }
    },

    methods: {}
}
</script>