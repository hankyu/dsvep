<style lang="scss">
@import '../../sass/variables';

.teacherPortfoliosShow {
}
.teacherPortfoliosShow__field + .teacherPortfoliosShow__field {
    margin-top: 2rem;
}
.teacherPortfoliosShow__fieldTitle {
    font-size: 1rem;
    font-weight: bold;
}
.teacherPortfoliosShow__links {
    list-style-type: none;
    padding-left: 15px;
    font-size: 0.8rem;

    li {
        display: inline;
    }
    li + li {
        margin-left: 1rem;
    }

    a {
        text-decoration: underline;
    }
}
.teacherPortfoliosShow__img {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    border: 1px solid $gainsboro;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
}

$halfGutter-card: 5px;
.teacherPortfoliosShow__container {
    padding-left: $halfGutter-card;
    padding-right: $halfGutter-card;

    .row {
        margin-left: -$halfGutter-card;
        margin-right: -$halfGutter-card;

        .col-sm-3,
        .col-6 {
            padding-left: $halfGutter-card;
            padding-right: $halfGutter-card;
            text-align: center;
            margin-bottom: $halfGutter-card * 2;
        }
    }
}
</style>

<template>
    <div class="teacherPortfoliosShow">
        <template v-if="portfoliosData.length">
            <div
                :key="'field'+fIdx"
                class="teacherPortfoliosShow__field"
                v-for="(field,fIdx) in portfoliosData"
            >
                <h3 class="teacherPortfoliosShow__fieldTitle">{{ field.title? field.title : '無標題' }}</h3>
                <ul
                    class="teacherPortfoliosShow__links"
                    v-if="field.links.length"
                >
                    <li v-for="(link,lIdx) in field.links">
                        <a
                            :href="link"
                            target="_blank"
                        >連結{{lIdx+1}}</a>
                    </li>
                </ul>
                <b-container
                    class="teacherPortfoliosShow__container"
                    v-if="field.imgs.length"
                >
                    <b-row>
                        <b-col
                            :key="'img_'+fIdx+'_'+imgIdx"
                            cols="6"
                            sm="3"
                            v-for="(img,imgIdx) in field.imgs"
                        >
                            <div
                                :style="imgStyle(img)"
                                @click="showLightbox(fIdx,imgIdx)"
                                class="teacherPortfoliosShow__img"
                            />
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </template>
        <div
            class="noData"
            v-else
        >未設定作品</div>
        <ModalLightbox ref="modalLightbox" />
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import ModalLightbox from './ModalLightbox'

export default {
    name: 'TeacherPortfoliosShow',
    components: {
        ModalLightbox
    },
    data: function() {
        return {}
    },

    props: {
        portfoliosData: {
            type: Array,
            required: true
        }
    },
    created() {
        EventBus.$emit('do-resize')
    },

    updated() {
        EventBus.$emit('do-resize')
    },

    methods: {
        imgStyle(img) {
            return 'background-image:url(' + img[0] + ')'
        },
        showLightbox(fIdx, iIdx) {
            EventBus.$emit('show-lightbox-modal', { imgs: this.portfoliosData[fIdx].imgs, iIdx })
        },
        checkBodyScrollStatus() {
            this.$parent.$parent.$parent.$parent.switchBodyScrollStatus(
                this.$refs['modalLightbox'].isShow
            )
        }
    }
}
</script>