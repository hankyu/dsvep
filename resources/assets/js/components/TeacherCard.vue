<style lang="scss">
@import '../../sass/variables';

.teacherCard {
    padding: 3px;
    width: 100%;
    min-width: 0;
    max-width: 300px;
    margin: auto;
    margin-bottom: 30px;
    color: #141414;
}
.teacherCard__avatar {
    margin: 10px auto 0 auto;
    width: 160px;
    height: 160px;
    padding-bottom: 0;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
.teacherCard__name {
    font-size: 1rem;
    line-height: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0;
}
.teacherCard__descBlock {
    padding: 0 10px 5px;
    overflow-x: hidden;
}
.teacherCard__desc1 {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #999;
    padding-bottom: 5px;
}
.teacherCard__desc2 {
    margin-top: 10px;
    font-size: 0.8rem;
}
.teacherCard__desc2 header {
    font-size: 0.9rem;
}
.teacherCard__desc2Centent {
    overflow: hidden;
    height: 3.6rem;
    line-height: 1.2rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
}
</style>


<template>
    <router-link :to="'/teacher/' + teacherData.t_id">
        <BaseCard class="teacherCard">
            <div
                :style="teacherCardAvatarStyle"
                alt
                class="teacherCard__avatar"
            />
            <h2
                :title="teacherNameAndNickname"
                class="teacherCard__name"
            >{{ teacherNameAndNickname }}</h2>
            <div class="teacherCard__descBlock">
                <div
                    :title="introExpTextOnly"
                    class="teacherCard__desc1"
                >{{ introExpTextOnly }}</div>
                <div class="teacherCard__desc2">
                    <header>教學類型</header>
                    <div
                        class="teacherCard__desc2Centent"
                        v-html="teachType"
                    />
                </div>
            </div>
        </BaseCard>
    </router-link>
</template>

<script>
import { JS_CONFIG } from '../config.js'

export default {
    name: 'TeacherCard',
    components: {},
    props: {
        teacherData: {
            type: Object,
            required: true
        }
    },
    computed: {
        teacherCardAvatarStyle() {
            return `background-image: url(${JS_CONFIG.PERSONAL_AVATAR_PATH +
                this.teacherData.avg_img});`
        },
        teacherNameAndNickname() {
            return (
                this.teacherData.nickname +
                (this.teacherData.m_name ? '(' + this.teacherData.m_name + ')' : '')
            )
        },
        introExpTextOnly() {
            return this.teacherData.intro_exp.replace(/\n/g, ' ')
        },
        teachType() {
            return this.teacherData.teach_type.replace(/\n/g, '<br />')
        }
    },
    methods: {}
}
</script>