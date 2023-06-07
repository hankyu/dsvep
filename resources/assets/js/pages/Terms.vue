<style lang="scss">
@import '../../sass/variables';
.termsAndPolicy__banner {
    width: 100%;
    padding: 15vh 3rem;

    background: {
        image: url(https://i.imgur.com/ALZOhIA.jpg);
        size: cover;
        position: center center;
    }

    .pageH1 {
        color: $white;
        font-size: 3rem;
        border: none;
    }
    @media (max-width: $max-w-sm) {
        // height: 300px;
        padding: 5vh 1rem;

        .pageH1 {
            font-size: 2rem;
        }
    }
}

$topSticky-termsList: $h-header + $mt-lessonShop;
.termsAndPolicy__main {
    display: flex;

    .termsAndPolicy__listContainer {
        padding-top: 2.5rem;
    }
    .termsAndPolicy__list {
        list-style-type: none;
        padding-left: 0;
        position: sticky;
        top: $topSticky-termsList;
    }

    .termsAndPolicy__listItem {
        a {
            color: $font-primary;
        }
        .router-link-exact-active {
            color: #f00;
        }
    }

    .termsAndPolicy__contentContainer {
        background-color: $white;
        flex: 1;
        border: 1px solid $color-border-primary;
        padding: 2rem;
        margin-top: 0.5rem;
        margin-left: 2rem;
    }

    .termsAndPolicy__h2 {
        font-size: 1.4rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
    }

    .termsAndPolicy__majorList {
        list-style-type: none;
        padding-left: 0;
    }
    .termsAndPolicy__majorListItem {
        padding-bottom: 1.5rem;
    }

    .termAndPolicy__listContent {
        padding-left: 1rem;
    }

    .termsAndPolicy__majorListItemHeader {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .termsAndPolicy__minorList {
        list-style-type: none;
        padding-left: 0;
    }

    .termsAndPolicy__minorListItem {
        padding-bottom: 1rem;
    }
    .termsAndPolicy__minorListItemHeader {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
    }

    .termAndPolicy__listNum {
        list-style-type: decimal;
    }

    .termAndPolicy__listDisc {
        list-style-type: disc;
    }

    @media (max-width: $max-w-xs) {
        .termsAndPolicy__listContainer {
            padding-top: 1.25rem;
            font-size: 0.8rem;
        }

        .termsAndPolicy__contentContainer {
            padding: 0.5rem;
            margin-top: 0.25rem;
            margin-left: 1rem;
            font-size: 0.8rem;
        }

        .termsAndPolicy__h2 {
            font-size: 1.2rem;
        }

        .termAndPolicy__listContent {
            padding-left: 0.5rem;
        }

        .termsAndPolicy__majorListItemHeader {
            font-size: 1rem;
        }

        .termsAndPolicy__minorListItem {
            padding-bottom: 1rem;
        }
        .termsAndPolicy__minorListItemHeader {
            font-size: 0.9rem;
        }
        .termAndPolicy__listNum {
            padding-left: 1rem;
        }

        .termAndPolicy__listDisc {
            padding-left: 1rem;
        }
    }
}

.termsAndPolicy__em {
    font-weight: bold;
    color: $bs-danger;
}
</style>

<template>
    <div class="webPage">
        <div class="termsAndPolicy__banner">
            <h1 class="pageH1">
                服務條款 與
                <br class="br-xs" />隱私策略
            </h1>
        </div>
        <main class="wrapper termsAndPolicy__main">
            <div class="termsAndPolicy__listContainer">
                <ul class="termsAndPolicy__list">
                    <li
                        class="termsAndPolicy__listItem"
                        v-for="term in terms"
                    >
                        <router-link :to="'/contact/terms/'+term.to">{{getTerm(term.term)}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="termsAndPolicy__contentContainer">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

export default {
    name: 'Terms',
    data: function() {
        return {
            terms: [
                { term: 'PRIVACY', to: 'privacy' },
                { term: 'SERVICE_RULE', to: 'service' },
                { term: 'PAYMENT', to: 'payment' },
                { term: 'COMMON_QUESTION', to: 'question' },
                { term: 'REFUND_RULE', to: 'refund' },
                { term: 'RE_LISTEN', to: 'relisten' },
                { term: 'TEACHER_RULE', to: 'teacher' }
            ]
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
    },
    methods: {
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        }
    }
}
</script>
