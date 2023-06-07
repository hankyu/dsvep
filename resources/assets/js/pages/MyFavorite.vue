<style lang="scss" scoped>
@import '../../sass/variables';

$halfGutter-card: 5px;
.myFavorite {
    padding-top: 30px;
    padding-bottom: 20px;
    padding-left: $halfGutter-card;
    padding-right: $halfGutter-card;

    .row {
        margin-left: -$halfGutter-card;
        margin-right: -$halfGutter-card;

        .col-12 {
            padding-left: $halfGutter-card;
            padding-right: $halfGutter-card;
            text-align: center;
        }
    }
}
.myFavorite__card {
    width: 100%;
    min-width: 0;
    margin: 0 auto 30px;

    @media (max-width: $max-w-xs) {
        max-width: 280px;
    }
}
</style>

<template>
    <div class="wrapper webPage">
        <h1 class="pageH1">{{ title }}</h1>
        <LoadingSet
            class="myFavorite__loading"
            v-if="!loadCompleted"
        />
        <b-container
            class="myFavorite"
            v-else
        >
            <b-row>
                <b-col
                    :key="lesson.l_id"
                    cols="12"
                    lg="4"
                    sm="6"
                    v-for="lesson in myFavoriteLesson"
                    xl="3"
                >
                    <LessonCard
                        :favoriteMode="true"
                        :lessonData="lesson"
                        class="myFavorite__card"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from '../components/LoadingSet'
import LessonCard from '../components/LessonCard'

export default {
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.MY_FAVORITE
        }
    },
    components: { LoadingSet, LessonCard },
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0
        EventBus.$emit('do-resize')

        this.mid = this.$store.state.member.memberData.data.m_id
        if (!this.loadCompleted) {
            this.$store.dispatch('lesson/getMyFavoriteLessons')
        }
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: mapGetters({
        loadCompleted: 'lesson/myFavoriteLessonsLoadCompleted',
        myFavoriteLesson: 'lesson/myFavoriteLesson'
    }),
    methods: {},
    beforeDestroy() {}
}
</script>