<style lang="scss">
@import '../../sass/variables';

.btnFavorite {
    font-size: 0.8rem;
    padding: 0 1rem;
    height: 1.6rem;
    border-radius: 0.8rem;
    border: none;

    &.btnFavorite--refavorite {
        background-color: $brand-primary;
    }
}

.btnFavorite__iconHeart {
    @extend .faIcon;
}
</style>


<template>
    <b-button
        :class="btnFavoriteClass"
        class="btnFavorite"
    >
        <font-awesome-icon
            :icon="['far', 'heart']"
            class="btnFavorite__iconHeart"
        />
        {{ btnFavoriteText }}
    </b-button>
</template>

<script>
export default {
    name: 'ButtonFavorite',
    props: {
        favorite: {
            type: Number,
            default: 0
        }
    },
    mounted() {},
    computed: {
        btnFavoriteClass() {
            return this.favorite ? '' : 'btnFavorite--refavorite'
        },
        btnFavoriteText() {
            return this.favorite ? '取消收藏' : '加入收藏'
        }
    }
}
</script>