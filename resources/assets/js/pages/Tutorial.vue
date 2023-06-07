<style lang="scss">
@import '../../sass/variables';

$w-youtubeTutorialListItem: 50px;
$w-youtubeTutorialListItem-md: 40px;
.youtubeTutorial {
    height: 90vh;
    display: flex;
    .youtubeTutorial__list {
        width: 320px;
        border-left: 1px solid $gainsboro;
        border-right: 2px solid $gainsboro;
        list-style-type: none;
        padding: 0.5rem 1rem;
        margin-bottom: 0;
        overflow-y: auto;

        .youtubeTutorial__listItem {
            position: relative;
            width: 100%;
            padding-left: $w-youtubeTutorialListItem + 10px;
            padding-top: 1rem;
            padding-bottom: 1rem;
            cursor: pointer;

            &:before {
                position: absolute;
                left: 0;
                top: 0;
                padding-top: 1rem;
                padding-bottom: 1rem;
                width: $w-youtubeTutorialListItem;
                content: attr(li-idx);
                text-align: right;
            }

            &:hover,
            &:active {
                background-color: darken($white, 3%);
            }
        }

        .youtubeTutorial__listItem + .youtubeTutorial__listItem {
            border-top: 1px solid $gainsboro;
        }
    }
    @media (max-width: $max-w-md) {
        .youtubeTutorial__list {
            width: 260px;
            font-size: 0.8rem;

            .youtubeTutorial__listItem {
                padding-left: $w-youtubeTutorialListItem-md + 10px;

                &:before {
                    width: $w-youtubeTutorialListItem-md;
                }
            }
        }
    }
    @media (max-width: $max-w-sm) {
        display: block;

        .youtubeTutorial__list {
            display: none;
            font-size: 0.9rem;
        }
    }
}

.youtubeTutorial__content {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 30px;
    border-right: 1px solid $gainsboro;

    @media (max-width: $max-w-sm) {
        border-right: none;

        .youtubeTutorial__contentlist {
            padding-left: 0;
            padding-right: 0;
        }
    }
}
.youtubeTutorial__contentlist {
    list-style-type: none;
    padding-right: 40px;
    padding-top: 30px;
}
.youtubeTutorial__contentlistItem + .youtubeTutorial__contentlistItem {
    margin-top: 40px;
}
.youtubeTutorial__contentlistItemHeader {
    font-size: 1.2rem;
    text-align: left;
    width: 100%;
    margin-bottom: 10px;
}

.youtubeTutorial__iframeContainer6x9 {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 66%;
}

.youtubeTutorial__iframeContainer6x9inner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 1px solid $color-border-primary;
}

.youtubeTutorial__iframe {
    width: 100%;
    height: 100%;
}
</style>

<template>
    <div class="youtubeTutorial wrapper">
        <ul class="youtubeTutorial__list">
            <li
                :key="list.idx"
                :li-idx="list.item + '、'"
                @click="gotoContent(list.idx)"
                class="youtubeTutorial__listItem"
                v-for="list in listArr"
                v-html="list.title"
            />
        </ul>
        <div
            class="youtubeTutorial__content"
            id="youtubeTutorialContent"
        >
            <h1 class="pageH1">{{ title }}</h1>
            <ul class="youtubeTutorial__contentlist">
                <li
                    :id="'tutorialContent'+list.idx"
                    :key="list.idx"
                    class="youtubeTutorial__contentlistItem"
                    v-for="list in listArr"
                >
                    <header
                        class="youtubeTutorial__contentlistItemHeader"
                        v-html="list.item + '、 ' + list.title"
                    />
                    <div class="youtubeTutorial__iframeContainer6x9">
                        <div class="youtubeTutorial__iframeContainer6x9inner">
                            <iframe
                                :src="list.youtubeSrc"
                                class="youtubeTutorial__iframe"
                                frameborder="0"
                            ></iframe>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import animateScrollTo from 'animated-scroll-to'
import { EventBus } from '../event-bus'

export default {
    data: function() {
        return {
            title: '線上教學平台說明',
            listArr: [
                {
                    idx: 0,
                    item: '0',
                    title: '申請 Gmail 帳號',
                    youtubeSrc: 'https://www.youtube.com/embed/UZuAFWgotrM'
                },
                {
                    idx: 1,
                    item: '1',
                    title: '如何進入網站',
                    youtubeSrc: 'https://www.youtube.com/embed/GUWgsfrCeOQ'
                },
                {
                    idx: 2,
                    item: '2-1',
                    title: '平台註冊 <span class="color-emphasized2">Google</span> 帳號',
                    youtubeSrc: 'https://www.youtube.com/embed/pqx2fWsWRpw'
                },
                {
                    idx: 3,
                    item: '2-2',
                    title: '平台註冊新帳號',
                    youtubeSrc: 'https://www.youtube.com/embed/ePDz9NGfueY'
                },
                {
                    idx: 4,
                    item: '3',
                    title: '如何搜索課程',
                    youtubeSrc: 'https://www.youtube.com/embed/7V0DFLHFsnc'
                },
                {
                    idx: 5,
                    item: '4-1',
                    title: '<span class="color-emphasized2">信用卡</span> 購買課程',
                    youtubeSrc: 'https://www.youtube.com/embed/hs6gv6vL4_A'
                },
                {
                    idx: 6,
                    item: '4-2',
                    title: '<span class="color-emphasized2">ATM</span> 購買課程',
                    youtubeSrc: 'https://www.youtube.com/embed/YryhsYRDArY'
                },
                {
                    idx: 7,
                    item: '4-3',
                    title: '<span class="color-emphasized2">超商</span> 購買課程',
                    youtubeSrc: 'https://www.youtube.com/embed/LGJQUVENVUQ'
                },
                {
                    idx: 8,
                    item: '5',
                    title: '取消訂單重新購買',
                    youtubeSrc: 'https://www.youtube.com/embed/oaB6REGk7uU'
                },
                {
                    idx: 9,
                    item: '6',
                    title: '如何觀看課程',
                    youtubeSrc: 'https://www.youtube.com/embed/fnKMIwL30AU'
                },
                {
                    idx: 10,
                    item: '7',
                    title: '<span class="color-emphasized2">實體</span>課程重聽申請',
                    youtubeSrc: 'https://www.youtube.com/embed/TKEaFiSkfQ0'
                }
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
        gotoContent(idx) {
            let offsetTop = document.getElementById('tutorialContent' + idx).offsetTop,
                elem = document.querySelector('#youtubeTutorialContent')
            animateScrollTo(0)
            animateScrollTo(offsetTop, { element: elem, offset: -100 })
        }
    }
}
</script>
