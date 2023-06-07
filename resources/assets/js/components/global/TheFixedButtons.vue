<style lang="scss">
@import '../../../sass/variables';

$size-fixedButtonsPageTop: 3rem;
$size-fixedButtonsPageTop-xs: 2rem;
.fixedButtons {
    position: fixed;
    right: 0.5rem;
    bottom: 6rem;
    z-index: 500;

    .fixedButtons__pageTop {
        width: $size-fixedButtonsPageTop;
        height: $size-fixedButtonsPageTop;
        font-size: 0;
        background: $brand-primary;
        border: none;
        line-height: 1;
        color: #fff;
        border-radius: 50%;

        .fontAwesomeIcon {
            font-size: 2rem;
        }
    }

    @media (max-width: $max-w-xs) {
        right: 0;

        .fixedButtons__pageTop {
            width: $size-fixedButtonsPageTop-xs;
            height: $size-fixedButtonsPageTop-xs;

            .fontAwesomeIcon {
                font-size: 1.5rem;
            }
        }
    }
}
</style>


<template>
    <div class="fixedButtons">
        <button
            @click="scrollPageTop"
            class="fixedButtons__pageTop"
            type="button"
            v-if="showPageTop"
        >
            <font-awesome-icon
                class="fontAwesomeIcon"
                icon="angle-up"
            />
        </button>
    </div>
</template>

<script>
import animateScrollTo from 'animated-scroll-to'

export default {
    name: 'TheFixedButtons',
    data() {
        return {
            showPageTop: false
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0

            if (scrollTop > 300) {
                this.showPageTop = true
            } else {
                this.showPageTop = false
            }
        })
    },
    computed: {
        footerFixed() {
            return this.$store.state.footerFixed ? 'pageFooter--fixed' : ''
        }
    },
    methods: {
        scrollPageTop() {
            animateScrollTo(0)
        }
    }
}
</script>