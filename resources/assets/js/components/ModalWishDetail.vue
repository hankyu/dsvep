<style lang="scss">
@import '../../sass/variables';

.wishDetail {
    .popupModal__layer {
        min-width: 20rem;
        @media (max-width: $max-w-xxs) {
            min-width: 70%;
        }
    }
}

$fz-modalHeader: 1.2rem;
$fz-title: 1.2rem;
$fz-sectionHeader: 1rem;
$fz-text: 0.9rem;
.wishDetail__header {
    margin-bottom: 0;
}

.wishDetail__content {
    padding: 0 2rem 2rem 2rem;

    @media (max-width: $max-w-xxs) {
        padding: 0 1rem 2rem 1rem;
    }
}

.wishDetail__wishTitle {
    @extend .popupModalHeader;
    line-height: 1.5;
    font-weight: bold;
    padding-left: 2.4rem;
    position: relative;
}

.wishDetailTitleIcon {
    position: absolute;
    left: 0.8rem;
    top: 0.9rem;
    font-size: 1rem;
}

.wishDetail__section {
    font-size: $fz-text;
    padding: 0.25rem;
    margin-top: 1rem;

    &.wishDetail__section--reply {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        background-color: $complementary2;
    }
}

.wishDetail__sectionTitle {
    font-size: $fz-sectionHeader;
    font-weight: bold;
    margin-bottom: 0;
}

.wishDetail__imgContainer {
    text-align: center;
    padding-top: 1re;
}

.wishDetail__img {
    display: block;
    max-width: 300px;
    margin: 5px auto;

    @media (max-width: $max-w-xxs) {
        max-width: 100%;
    }
}

.wishDetail__categoryList {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 0;
}

.wishDetail__categoryItem {
    font-size: $fz-text;
    display: inline;
}

.wishDetail__categoryItem + .wishDetail__categoryItem {
    &:before {
        content: '、';
        display: inline;
    }
}
</style>

<template>
    <BaseModal
        class="wishDetail"
        closeEvent="close-wish-detail"
        maskCloseEvent="close-wish-detail"
        v-if="isShow"
    >
        <h2
            class="wishDetail__wishTitle"
            slot="header"
        >
            <font-awesome-icon
                class="wishDetailTitleIcon"
                icon="dove"
            />
            {{wishDetail.title }}
        </h2>
        <div class="wishDetail__content">
            <section
                class="wishDetail__section wishDetail__section--reply"
                v-if="wishDetail.reply"
            >
                <h3 class="wishDetail__sectionTitle">平台回覆：</h3>
                {{wishDetail.reply }}
            </section>
            <section class="wishDetail__section">
                <h3 class="wishDetail__sectionTitle">學習目標：</h3>
                {{wishDetail.goal }}
            </section>
            <section class="wishDetail__section">
                <h3 class="wishDetail__sectionTitle">參考資料：</h3>
                {{wishDetail.content }}
                <div class="wishDetail__imgContainer">
                    <img
                        :src="img"
                        alt
                        class="wishDetail__img"
                        v-for="img in wishDetail.imgs"
                    />
                </div>
            </section>
            <section class="wishDetail__section">
                <h3 class="wishDetail__sectionTitle">類別：</h3>
                <ul class="wishDetail__categoryList">
                    <li
                        class="wishDetail__categoryItem"
                        v-for="topicLabel in wishDetail.category"
                    >{{ (topicLabel[0]?topicLabel[0]+'/':'')+topicLabel[1] }}</li>
                </ul>
            </section>
        </div>
    </BaseModal>
</template>

<script>
import { EventBus } from '../event-bus.js'
import { JS_CONFIG } from '../config.js'

export default {
    name: 'ModalWishDetail',
    created() {
        EventBus.$on('show-wish-detail', this.showModel)
        EventBus.$on('close-wish-detail', this.closeModel)
    },
    data: function() {
        return {
            isShow: false
        }
    },
    props: {
        wishDetail: {
            type: Object,
            required: true
        },
        wishIdx: {
            type: Number,
            required: true
        }
    },
    mounted() {
        this.getImages()
    },
    updated() {
        this.getImages()
    },
    methods: {
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        getImages() {
            if (this.wishDetail.album && !this.wishDetail.imgs.length && this.wishDetail.album) {
                this.$store.dispatch('wish/getImages', {
                    album: this.wishDetail.album,
                    wishIdx: this.wishIdx
                })
            }
        }
    },
    beforeDestroy() {
        EventBus.$off('show-wish-detail', this.showModel)
        EventBus.$off('close-wish-detail', this.closeModel)
    }
}
</script>