<style lang="scss" scoped>
@import '../../sass/variables';

.wishCard {
    padding: 0.5rem;
    cursor: pointer;

    .wishCard__wrapper {
        position: relative;
    }

    .wishCard__title {
        padding: 0.4rem 0;
        font-weight: bold;
        border-bottom: 1px solid $color-border-primary;
        text-align: center;
        @extend .singleLineEllipsis;
    }

    .wishCard__goal {
        text-align: left;
        font-size: 0.8rem;
        line-height: 1.2rem;
        height: 3.6rem;
        padding: 0 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        overflow-y: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
    }

    .wishCard__repliedIcon {
        position: absolute;
        right: -0.3rem;
        top: -1rem;
        color: $white;
        background-color: $gray;
        font-size: 0.8rem;
        font-weight: bold;
        padding: 0.1rem 0.5rem;
        line-height: 1rem;
        border-radius: 0.6rem;
        font-style: normal;
    }

    .wishCard__time {
        font-size: 0.7rem;
        text-align: right;
        color: $lightgray;
        margin-bottom: 0;
    }

    &.wishCard--unread {
        .wishCard__repliedIcon {
            background-color: $emphasized2;
        }
    }
}
</style>


<template>
    <BaseCard
        :class="wishCardClass"
        class="wishCard"
    >
        <div class="wishCard__wrapper">
            <header class="wishCard__title">{{ wishData.title }}</header>
            <div class="wishCard__goal">{{ wishData.goal }}</div>
            <p class="wishCard__time">{{ wishCardTime }}</p>
            <i
                class="wishCard__repliedIcon"
                v-if="wishData.reply"
            >
                <template v-if="wishData.unread">有未讀回覆</template>
                <template v-else>有回覆</template>
            </i>
        </div>
    </BaseCard>
</template>

<script>
export default {
    name: 'WishCard',
    components: {},
    props: {
        wishData: {
            type: Object,
            required: true
        }
    },
    mounted() {},
    computed: {
        wishCardClass() {
            return this.wishData.unread ? 'wishCard--unread' : ''
        },
        wishCardTime() {
            let term = (this.wishData.reply ? '回覆' : '創建') + '時間：'
            return term + this.wishData.updated_at
        }
    },
    methods: {}
}
</script>