<style lang="scss">
@import '../../sass/variables';
.aboutUs__banner {
    width: 100%;
    height: 500px;
    margin-bottom: 2rem;

    background: {
        image: url(https://i.imgur.com/N7g2Xg2.jpg);
        size: cover;
        position: center center;
    }
    @media (max-width: $max-w-sm) {
        height: 300px;
    }
}

.pageH1 {
    overflow: hidden;
    height: 0;
    padding: 0;
    border: none;
}

.aboutUs__blockQuote {
    border-left: 4px solid $lightgray;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.aboutUs__quote {
    &:before {
        content: '「';
    }
    &:after {
        content: '」';
    }
}

.aboutUs__talker {
    text-align: right;

    &::before {
        content: '- ';
        display: inline;
    }
}

.aboutUs__featureList {
    padding-left: 0;
    list-style-type: none;

    li {
        padding-left: 50px;
        position: relative;

        &:before {
            position: absolute;
            top: 0;
            left: 0;
            content: attr(showIdx);
            display: inline-block;
        }
    }
}

.aboutUs__banner2 {
    width: 100%;
    height: 500px;

    background: {
        image: url('https://i.imgur.com/9B4nu8n.jpg');
        size: cover;
        position: center center;
    }
    @media (max-width: $max-w-sm) {
        height: 300px;
    }
}
</style>

<template>
    <div class="webPage">
        <div class="aboutUs__banner"></div>
        <div class="wrapper">
            <h1 class="pageH1">{{ title }}</h1>
            <h2>起源</h2>
            <blockquote class="aboutUs__blockQuote">
                <q class="aboutUs__quote">我喜歡拍照，也喜歡教學，為什麼不把這個興趣當工作，把我所會的攝影知識和更多人分享！</q>
                <p class="aboutUs__talker">CEO 大俠</p>
            </blockquote>
            <p>秉持這單純的理念，於2008年創立「大俠攝影教室」，2011年設立「大俠數位攝影有限公司」， 大俠攝影教室是目前全台課程種類最廣泛，師資最多，開班頻率最高，開班地區最多的攝影教學單位。提供豐富的教學資源，秉持著「希望所有學習攝影的朋友，都有正確的攝影觀念」為宗旨，不間斷地提高教學品質，持續在攝影教學的領域中努力。</p>
            <h2>特色</h2>
            <ul class="aboutUs__featureList">
                <li showIdx="(一)">專業開班、提供學員&單位所需的攝影課程內容。</li>
                <li showIdx="(二)">師資及課程種類多、提供最完整的學習。</li>
                <li showIdx="(三)">攝影相關資源多，專業服務人員，品質有保障。</li>
                <li showIdx="(四)">提供專業攝影棚於教學使用。</li>
                <li showIdx="(五)">課堂理論與外拍實習緊密結合，讓學員結業後能獨立拍攝想要的作品。</li>
            </ul>
            <h2>使命</h2>
            <ul class="aboutUs__featureList">
                <li showIdx="(一)">辦理各類室內與戶外攝影交流活動。</li>
                <li showIdx="(二)">辦理攝影講師師資培訓課程，培訓專業攝影講師。</li>
                <li showIdx="(三)">辦理攝影師培訓課程，培訓職業攝影人才。</li>
                <li showIdx="(四)">辦理攝影師評核，對於國內攝影師進行專業認證。</li>
                <li showIdx="(五)">辦理攝影創作比賽，以提升攝影人才創作能力。</li>
            </ul>
        </div>
        <!-- <div class="aboutUs__banner2"></div>
        <ul>
            <li>成為講師</li>
            <li>實體課程</li>
            <li>線上課程</li>
        </ul>-->
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

export default {
    name: 'About',
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
