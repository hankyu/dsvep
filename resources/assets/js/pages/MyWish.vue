<style lang="scss" scoped>
@import '../../sass/variables';

$halfGutter-card: 5px;
.myWish {
    .col-12 {
        text-align: center;
    }
}

.myWish__card {
    margin: 30px auto 0 auto;
    width: 100%;
    width: 100%;
    min-width: 0;
    max-width: 300px;
}

.myWish__wishBar {
    text-align: right;
}

.myWish__btnWish {
    font-size: 0.9rem;
}
</style>

<template>
    <div class="wrapper webPage">
        <h1 class="pageH1">{{ title }}</h1>
        <BaseBtnBar class="myWish__wishBar">
            <b-button
                @click="makeWish"
                class="myWish__btnWish"
                variant="success"
            >許願池</b-button>
        </BaseBtnBar>
        <LoadingSet
            class="myWish__loading"
            v-if="!loadCompleted"
        />
        <b-container
            class="myWish"
            v-else
        >
            <b-row>
                <b-col
                    :key="wish.w_id"
                    cols="12"
                    lg="4"
                    sm="6"
                    v-for="(wish, idx) in myWishes"
                    xl="3"
                >
                    <WishCard
                        :wishData="wish"
                        @click.native="showDetail(idx)"
                        class="myWish__card"
                    />
                </b-col>
            </b-row>
        </b-container>
        <ModalWishDetail
            :wishDetail="wishDetail"
            :wishIdx="currPopupIdx == null? 0: currPopupIdx"
            class="myWish__popupDetail"
            ref="wishPopupDetail"
        />
        <MakeWishSet />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from '../components/LoadingSet'
import WishCard from '../components/WishCard'
import ModalWishDetail from '../components/ModalWishDetail'
import MakeWishSet from '../components/MakeWishSet'

export default {
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.MY_WISH,
            currPopupIdx: null
        }
    },
    components: { LoadingSet, WishCard, ModalWishDetail, MakeWishSet },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        this.mid = this.$store.state.member.memberData.data.m_id
        if (!this.loadCompleted) {
            this.$store.dispatch('wish/getMyWishes')
        }
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {
        wishDetail() {
            if (this.currPopupIdx == null || this.currPopupIdx >= this.myWishes.length) {
                return {}
            } else {
                return this.myWishes[this.currPopupIdx]
            }
        },
        ...mapGetters({
            loadCompleted: 'wish/myWishesLoadCompleted',
            myWishes: 'wish/myWishes'
        })
    },
    methods: {
        showDetail(idx) {
            this.currPopupIdx = idx
            EventBus.$emit('show-wish-detail')
        },
        makeWish() {
            EventBus.$emit('show-wish-maker')
        },
        checkBodyScrollStatus() {
            this.$parent.switchBodyScrollStatus(this.$refs['wishPopupDetail'].isShow)
        }
    },
    beforeDestroy() {
        this.$parent.switchBodyScrollStatus(false)
    }
}
</script>