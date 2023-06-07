<style lang="scss">
@import '../../sass/variables';

.lessonShop__loading {
    margin-top: 10vh;
}

$w-lessonShopSumaryCol: 320px;
$w-lessonShopSumaryCol-lg: 280px;
$gutter-lessonShop: 16px;
$color-border-lessonShop: $color-border-primary;
$bgc-lessonShopDetailCol: $white;
.lessonShop {
    position: relative;

    .lessonShop__sumaryCol {
        position: absolute;
        top: 0;
        right: 0;
        width: $w-lessonShopSumaryCol;
        height: 100%;
    }

    .lessonShop__detailCol {
        position: relative;
        margin-right: $w-lessonShopSumaryCol + $gutter-lessonShop;
        border: 1px solid $color-border-lessonShop;
        background-color: $bgc-lessonShopDetailCol;
        @extend .cartShadow;
    }

    @media (max-width: $max-w-lg) {
        .lessonShop__sumaryCol {
            width: $w-lessonShopSumaryCol-lg;
        }

        .lessonShop__detailCol {
            margin-right: $w-lessonShopSumaryCol-lg + $gutter-lessonShop;
        }
    }

    @media (max-width: $max-w-md) {
        // position: static;

        .lessonShop__sumaryCol {
            display: none;
        }

        .lessonShop__detailCol {
            margin-right: 0;
            border: 1px solid $color-border-lessonShop;
            background-color: $white;
            @extend .cartShadow;
        }
    }
}

$topSticky-lessonShopSumaryCard: $h-header + $mt-lessonShop;
.lessonShop__stickySumary {
    position: sticky;
    left: 0;
    top: $topSticky-lessonShopSumaryCard;
    width: 100%;
}
.lessonShop__sumaryCard {
    border: 1px solid $color-border-lessonShop;
    background-color: $white;
    @extend .cartShadow;
}

$pd-sumaryCard: 0.8rem;
.lessonShop__field {
    padding: $pd-sumaryCard;
    position: relative;
}

.lessonShop__hr {
    height: 1px;
    margin: 0 0.5rem;
    padding: 0;
    border-top: 1px solid $color-border-lessonShop;
}

.lessonShop__no {
    font-size: 0.8rem;
    line-height: 1;
    color: $bs-primary;
}

.lessonShop__location {
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-size: 0.9rem;
}

.lessonShop__lessonName {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0;
}

$sizeX-type-folded: 5px;
$sizeY-type-folded: 3px;
.lessonShop__type,
.lessonShop__label {
    @extend .lessonTypeShadow;
    position: absolute;
    right: -$sizeX-type-folded;
    top: 4px;
    padding: 0.2rem 0.5rem;
    z-index: 20;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: $sizeX-type-folded;
        height: $sizeY-type-folded;
        bottom: -$sizeY-type-folded;
        right: 0;
        border-bottom: $sizeY-type-folded solid transparent;
        border-left: $sizeX-type-folded solid $gray;
    }
}

.lessonShop__type {
    color: $white;
}

.lessonShop__btnFavoriteBar {
    margin-top: 2rem;
}

.lessonShop__btnFavorite {
    width: 100%;
    margin: 0.25rem 0;

    @media (max-width: $max-w-md) {
        width: auto;
    }
}

.lessonShop__linkEditBar {
    font-size: 0.8rem;
    line-height: 1;
}

.lessonShop__linkEdit {
    text-decoration: underline;
}

.lessonShop__price {
    margin-top: 1.5rem;
}

.lessonShop__currFee {
    color: $emphasized2;
    font-size: 1.5rem;
    line-height: 1.25;
    font-weight: 900;

    &::before {
        content: 'NT$';
        display: inline;
    }

    @media (max-width: $max-w-xs) {
        font-size: 1.2rem;
    }
    &.lessonShop__currFee--free {
        &:before {
            content: '';
            display: none;
            margin-right: 0;
        }
    }
}

.lessonShop__originFee {
    display: block;
    color: $gray;
    font-size: 0.7rem;
    text-decoration: line-through;
}

.lessonShop__time {
    font-size: 0.8rem;
    margin-bottom: 0;
}

.lessonShop__btnBuy {
    width: 100%;
    font-size: 1rem;
    margin-top: 1rem;
}

.lessonShop__callForStartedLesson {
    color: $emphasized2;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
.lessonShop__callForStartedLesson--sm {
    color: $emphasized2;
}

.lessonShop__deadline {
    font-size: 0.8rem;
    color: $bs-info;
    margin-bottom: 0;
}

/* ------------------ */
/*                    */
/*     Detail Col     */
/*                    */
/* ------------------ */
.lessonShop__mainMedia {
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    background-size: cover;
    background-position: center center;
    border-bottom: 1px solid $color-border-lessonShop;
    @include verticalShadow(3px);
}

.lessonShop__mainVideoMedia {
    width: 100%;
    border-bottom: 1px solid $color-border-lessonShop;
    @include verticalShadow(3px);
}

$pd-lessonShopDetailContent: 1rem;
.lessonShop__detailContent {
    padding: $pd-lessonShopDetailContent;
    font-size: 0.9rem;

    @media (max-width: $max-w-md) {
        padding-top: 0;
    }
}

.lessonShop__detailHeader {
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
}

$max-h-no-pagination: 600px;
.lessonShop__sumarySmallDevice {
    position: relative;
    margin-left: -$pd-lessonShopDetailContent;
    margin-right: -$pd-lessonShopDetailContent;
    padding-left: $pd-lessonShopDetailContent;
    padding-right: $pd-lessonShopDetailContent;
    padding-top: $pd-lessonShopDetailContent;

    .lessonShop__btnBuy {
        position: fixed;
        bottom: 10px;
        right: -5px;
        width: auto;
        z-index: 150;
        text-align: left;
        @include verticalShadow(3px);
    }

    @media (max-height: $max-h-no-pagination) {
        padding-bottom: $pd-lessonShopDetailContent;
        border-bottom: 1px solid $color-border-lessonShop;
    }
}

.lessonShop__sumarySmallDeviceInner {
    @extend .afterClearBoth;

    .lessonShop__sumarySmallDeviceLesson {
        float: left;
        width: 70%;
    }

    .lessonShop__sumarySmallDeviceTeacher {
        float: right;
        width: 29%;
        padding-top: 3rem;
        text-align: center;

        .lessonShop__avatar {
            margin: auto;
        }

        .lessonShop__teacherInfo {
            padding-left: 0;
            .lessonShop__Linkteacher--name {
                text-align: center;
            }
            .lessonShop__Linkteacher--workout {
                text-align: center;
            }
        }
    }

    @media (max-width: $max-w-xs) {
        .lessonShop__sumarySmallDeviceLesson {
            .lessonShop__price {
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
            }
        }
    }
    @media (max-width: $max-w-xxs) {
        .lessonShop__sumarySmallDeviceLesson {
            float: none;
            width: auto;
        }

        .lessonShop__sumarySmallDeviceTeacher {
            float: none;
            width: auto;
            padding-top: 0.5rem;
            margin-top: 0.5rem;
            border-top: 1px solid $color-border-lessonShop;
        }
    }
}

$bt-lessonShopPagination: $mt-lessonShop + 5px;
$topSticky-lessonShopPagination: $topSticky-lessonShopSumaryCard - $bt-lessonShopPagination;
$topSticky-lessonShopPagination-xs: $h-header-xs + $mt-lessonShop - $bt-lessonShopPagination;
.lessonShop__pagination {
    @include verticalShadow(2px);
    position: sticky;
    border-top: $bt-lessonShopPagination solid $bgc-lessonShopDetailCol;
    background-color: $brand-primary;
    top: $topSticky-lessonShopPagination;
    margin-left: -$pd-lessonShopDetailContent;
    margin-right: -$pd-lessonShopDetailContent;
    z-index: 100;

    @media (max-width: $max-w-xs) {
        top: $topSticky-lessonShopPagination-xs;
    }

    @media (max-height: $max-h-no-pagination) {
        display: none;
    }
}

.lessonShop__paginationItem {
    .nav-link {
        color: $white;
        padding: 0.5rem 0.5rem;

        &:hover,
        &:active,
        &.active {
            background-color: $emphasized2;
        }
    }
}

.lessonShop__detailSection {
    margin-top: 1rem;
    padding-top: 1rem;
}

.lessonShop__detailSection + .lessonShop__detailSection {
    border-top: 1px solid $color-border-lessonShop;
}

.lessonShop__detailSectionHeader {
    font-size: 1.2rem;
    font-weight: bold;
}

.lessonShop__gmapIcon {
    width: 30px;
    height: auto;
    vertical-align: bottom;
}

.lessonShop__QAloading {
    height: 200px;
}

.lessonShop__remainFundTime {
    margin-top: 0.25rem;
    margin-bottom: 0;
    font-size: 0.8rem;
    text-align: right;
}

.teacherDescHeader {
    @extend .lessonShop__detailSectionHeader;
}

#teacherDesc {
    @extend .afterClearBoth;

    .lessonShop__detailSectionAvatar {
        position: sticky;
        top: $topSticky-lessonShopPagination + 90px;
        float: left;
        width: 30%;
    }

    .lessonShop__detailSectionTeacherInfo {
        float: right;
        width: 67%;
    }

    @media (max-width: $max-w-xs) {
        .lessonShop__detailSectionTeacherInfo {
            float: none;
            width: 100%;
        }
    }
}

.lessonShop__linkAddToGoogleCalendar {
    font-size: 0.8rem;
    font-weight: normal;
    text-decoration: underline;
}

.lessonShop__unitSet {
    margin-top: -0.8rem;
}

/* ------------------- */
/*                     */
/*     Teacher Card    */
/*                     */
/* ------------------- */
.lessonShop__teacherLoading {
    min-height: 0;
    width: 100%;
    height: 50px;
}
.lessonShop__teacherCard {
    padding: $pd-sumaryCard;
    display: flex;
    margin-top: 0.5rem;
}

.lessonShop__teacherInfo {
    min-width: 0;
    padding-left: 1rem;
    flex: 1;
}
.lessonShop__headerTeacher {
    font-size: 0.8rem;
    line-height: 1;

    @media (max-width: $max-w-md) {
        margin-top: 0.5em;
    }
}

.lessonShop__Linkteacher {
    display: block;
    width: 100%;
    @extend .singleLineEllipsis;
    text-align: left;
    text-decoration: underline;
    color: $font-primary;

    &:hover,
    &:active {
        color: $font-primary;
    }

    &.lessonShop__Linkteacher--name {
        margin-top: 2px;
        font-size: 0.9rem;
    }
    &.lessonShop__Linkteacher--workout {
        font-size: 0.8rem;
    }
}
</style>

<template>
    <div class="webPage">
        <BreadCrumbs
            :crumbs="[{text: '首頁', link: '/'},{text: '講師所有課程', link: '/teacher/'+lessonDetail.t_id+'/lessons'},{text: '課程商店'}]"
            class="wrapper"
        />
        <LoadingSet
            class="lessonShop__loading"
            v-if="!lessondLoaded"
        />
        <div
            class="lessonShop wrapper"
            v-else
        >
            <div class="lessonShop__detailCol">
                <LessonCardType
                    :lessonType="lessonDetail.type"
                    class="lessonShop__type d-block d-lg-none"
                />
                <div
                    :style="mainMediaStyle"
                    class="lessonShop__mainMedia"
                    v-if="mainMediaIIsImg"
                />
                <video
                    :poster="lessonCover"
                    :src="mainVideoSrc"
                    class="lessonShop__mainVideoMedia"
                    controls
                    preload="auto"
                    v-else-if="mainVideoSrc"
                >
                    <source
                        :src="mainVideoSrc"
                        type="video/mp4"
                    />Your browser does not support the video tag.
                </video>
                <div class="lessonShop__detailContent">
                    <header
                        class="lessonShop__detailHeader d-none d-lg-block"
                    >{{lessonDetail.l_name}} - {{lessonDetail.l_sub_name}}</header>

                    <div class="lessonShop__sumarySmallDevice d-block d-lg-none">
                        <LessonCardLabel
                            :lessonData="lessonDetail"
                            class="lessonShop__label"
                        />
                        <div class="lessonShop__sumarySmallDeviceInner">
                            <div class="lessonShop__sumarySmallDeviceLesson">
                                <div class="lessonShop__linkEditBar">
                                    <!-- 器材展閹割 -->
                                    <!-- <router-link
                                        class="lessonShop__linkEdit"
                                        to
                                        v-if="isLessonTeacher"
                                    >-->
                                    <a
                                        :href="'teacher/lesson/manage/'+lessonDetail.l_id+'/info'"
                                        class="lessonShop__linkEdit"
                                        v-if="isTeacherOrWorker"
                                    >
                                        <font-awesome-icon
                                            class="faIcon"
                                            icon="cog"
                                        />編輯課程
                                    </a>
                                    <!-- 器材展閹割 -->
                                    <!-- </router-link> -->
                                    &nbsp;
                                </div>
                                <p class="lessonShop__location">{{lessonArea}}</p>
                                <h1 class="lessonShop__lessonName">{{lessonDetail.l_name}}</h1>
                                <p class="lessonShop__no">#{{lessonDetail.l_id}}</p>
                                <p class="lessonShop__price">
                                    <del
                                        class="lessonShop__originFee"
                                        v-if="hasOriginFee"
                                    >NT$ {{ lessonDetail.origin_fee }}</del>
                                    <span
                                        class="lessonShop__currFee"
                                        v-if="lessonDetail.current_fee"
                                    >{{ lessonDetail.current_fee }}</span>
                                    <span
                                        class="lessonShop__currFee lessonShop__currFee--free"
                                        v-else
                                    >免費</span>
                                </p>
                                <p
                                    class="lessonShop__time"
                                    v-if="stillFunding"
                                >{{fundText}}截止日期：{{lessonDetail.end_fund.replace(/-/g,'/')}}</p>
                                <p class="lessonShop__time">課程開始日期：{{lessonDetail.start_time.replace(/-/g,'/')}}</p>
                                <ButtonFavorite
                                    :favorite="lessonDetail.favorite"
                                    @click.native.stop="switchFavorite"
                                    class="lessonShop__btnFavorite"
                                />
                                <div
                                    class="lessonShop__callForStartedLesson--sm"
                                    v-if="!fulledEntityLesson && startedEntityLesson && lessonDetail.owned!=2"
                                >
                                    <font-awesome-icon
                                        class="faIcon"
                                        icon="exclamation-circle"
                                    />課程已開始，若想報名請電洽：(02)2955-4564，由專人為您服務。
                                </div>
                                <p
                                    class="lessonShop__deadline"
                                    v-if="isOnlineLesson && lessonDetail.orderDeadline"
                                >觀看截止日：{{ lessonDetail.orderDeadline.replace(/-/g,'/')}}</p>

                                <!-- 線上課程沒買或是買了還沒開始看 -->
                                <p
                                    class="lessonShop__deadline"
                                    v-else-if="isOnlineLesson"
                                >觀看期限：{{ watchDeadline}}</p>
                            </div>
                            <div
                                class="lessonShop__sumarySmallDeviceTeacher"
                                v-if="!teacherLoaded"
                            >
                                <LoadingSet class="lessonShop__teacherLoading" />
                            </div>
                            <div
                                class="lessonShop__sumarySmallDeviceTeacher"
                                v-else
                            >
                                <BaseAvatar
                                    :avatarImg="avatarImgSrc"
                                    :avatarWidth="60"
                                    class="lessonShop__avatar"
                                />
                                <div class="lessonShop__teacherInfo">
                                    <!-- 器材展閹割 -->
                                    <!-- <router-link
                                        :to="'/teacher/'+teacher.t_id+'#teacher'"
                                        class="lessonShop__Linkteacher lessonShop__Linkteacher--name"
                                        target="_blank"
                                    >{{teacherName}}</router-link>
                                    <router-link
                                        :to="'/teacher/'+teacher.t_id+'#portfolios'"
                                        class="lessonShop__Linkteacher lessonShop__Linkteacher--workout"
                                        target="_blank"
                                    >查看作品</router-link>-->

                                    <header class="lessonShop__headerTeacher">課程講師</header>
                                    <a
                                        :href="'/teacher/'+teacher.t_id+'#teacher'"
                                        class="lessonShop__Linkteacher lessonShop__Linkteacher--name"
                                        target="_blank"
                                    >{{teacherFullName}}</a>
                                    <a
                                        :href="'/teacher/'+teacher.t_id+'#portfolios'"
                                        class="lessonShop__Linkteacher lessonShop__Linkteacher--workout"
                                        target="_blank"
                                    >查看作品</a>
                                </div>
                            </div>
                        </div>
                        <b-button
                            @click="goClassroom"
                            class="lessonShop__btnBuy"
                            v-if="classroomPermission"
                            variant="info"
                        >
                            進入
                            <br />教室
                        </b-button>
                        <b-button
                            @click="goClassroom"
                            class="lessonShop__btnBuy"
                            v-else-if="lessonDetail.owned==1 && lessonDetail.payment"
                            variant="warning"
                        >
                            查看
                            <br />訂單
                        </b-button>
                        <b-button
                            @click="checkBuyCellphone"
                            class="lessonShop__btnBuy"
                            v-else-if="!startedEntityLesson"
                            variant="success"
                        >
                            <span v-if="lessonDetail.current_fee">
                                購買
                                <br />課程
                            </span>
                            <span v-else>
                                免費
                                <br />購買
                            </span>
                        </b-button>
                    </div>
                    <b-nav
                        class="lessonShop__pagination"
                        v-b-scrollspy="170"
                    >
                        <b-nav-item
                            @click="scrollIntoView"
                            class="lessonShop__paginationItem"
                            href="#lessonDesc"
                        >課程說明</b-nav-item>
                        <!-- to="#lessonDesc" -->

                        <!-- 課表時間 -->
                        <b-nav-item
                            @click="scrollIntoView"
                            class="lessonShop__paginationItem"
                            href="#lessonSchedule"
                        >{{ getTerm('LESSON_UNIT_TIME') }}</b-nav-item>
                        <!-- to="#lessonSchedule" -->

                        <!-- 教室位置 -->
                        <b-nav-item
                            @click="scrollIntoView"
                            class="lessonShop__paginationItem"
                            href="#ClassroomLocation"
                            v-if="isEntityLesson"
                        >{{ getTerm('CLASSROOM_LOCATION') }}</b-nav-item>
                        <!-- to="#ClassroomLocation" -->

                        <!-- 課程問答 -->
                        <b-nav-item
                            @click="scrollIntoView"
                            class="lessonShop__paginationItem"
                            href="#lessonQA"
                        >{{ getTerm('LESSON_QUESTION_ANSWER') }}</b-nav-item>
                        <!-- to="#lessonQA" -->
                    </b-nav>
                    <section
                        class="lessonShop__detailSection"
                        id="lessonDesc"
                    >
                        <section
                            class="lessonShop__detailSectionLesson"
                            v-if="conditions.length"
                        >
                            <h3 class="lessonShop__detailSectionHeader">上課條件</h3>
                            <ul>
                                <li
                                    :key="idx"
                                    class="lessonShop__listItems"
                                    v-for="(condition,idx) in conditions"
                                >{{ condition }}</li>
                            </ul>
                        </section>
                        <section
                            class="lessonShop__detailSectionLesson"
                            v-if="suits.length"
                        >
                            <h3 class="lessonShop__detailSectionHeader">目標學生</h3>
                            <ul>
                                <li
                                    :key="idx"
                                    class="lessonShop__listItems"
                                    v-for="(suit,idx) in suits"
                                >{{ suit }}</li>
                            </ul>
                        </section>
                        <section
                            class="lessonShop__detailSectionLesson"
                            v-if="learns.length"
                        >
                            <h3 class="lessonShop__detailSectionHeader">課程收穫</h3>
                            <ul>
                                <li
                                    :key="idx"
                                    class="lessonShop__listItems"
                                    v-for="(learn,idx) in learns"
                                >{{ learn }}</li>
                            </ul>
                        </section>
                        <section>
                            <h3 class="lessonShop__detailSectionHeader">課程說明</h3>
                            <LessonDescription
                                :description="descriptionData"
                                v-if="descriptionData!=null"
                            />
                            <LoadingSet v-else />
                        </section>
                    </section>

                    <!-- 課表時間 -->
                    <section
                        class="lessonShop__detailSection"
                        id="lessonSchedule"
                    >
                        <h3 class="lessonShop__detailSectionHeader">
                            {{ getTerm('LESSON_UNIT_TIME') }}
                            <a
                                :href="createCalendarEventLink"
                                class="lessonShop__linkAddToGoogleCalendar"
                                target="_blank"
                                v-if="isEntityLesson"
                                variant="info"
                            >加入 Google 行事曆</a>
                        </h3>
                        <LessonUnitFoldableSet
                            :lessonType="lessonDetail.type"
                            :units="lessonUnitDetail"
                            class="lessonShop__unitSet"
                        />
                    </section>

                    <!-- 教室位置 -->
                    <section
                        class="lessonShop__detailSection"
                        id="ClassroomLocation"
                        v-if="isEntityLesson"
                    >
                        <h3 class="lessonShop__detailSectionHeader">{{ getTerm('CLASSROOM_LOCATION') }}</h3>
                        <p>上課地點：{{ fullLocation}}</p>
                        <GoogleMapWithKeyword
                            :location="lessonLocation"
                            :locationNote="lessonDetail.location_note"
                            v-if="lessonLocation || lessonDetail.location_note"
                        />
                    </section>

                    <!-- 課程問答 -->
                    <section
                        class="lessonShop__detailSection"
                        id="lessonQA"
                    >
                        <h3 class="lessonShop__detailSectionHeader">{{ getTerm('LESSON_QUESTION_ANSWER') }}</h3>
                        <LoadingSet
                            class="lessonShop__QAloading"
                            v-if="!lessonShopQALoaded"
                        />
                        <LessonQA
                            :qaData="lessonShopQA"
                            v-else
                        />
                    </section>
                </div>
            </div>
            <div class="lessonShop__sumaryCol">
                <div class="lessonShop__stickySumary">
                    <div class="lessonShop__sumaryCard">
                        <div class="lessonShop__field">
                            <div class="lessonShop__linkEditBar">
                                <!-- <router-link
                                    class="lessonShop__linkEdit"
                                    to
                                    v-if="isLessonTeacher"
                                >-->
                                <a
                                    :href="'teacher/lesson/manage/'+lessonDetail.l_id+'/info'"
                                    class="lessonShop__linkEdit"
                                    v-if="isTeacherOrWorker"
                                >
                                    <font-awesome-icon
                                        class="faIcon"
                                        icon="cog"
                                    />編輯課程
                                </a>
                                <!-- </router-link> -->
                                &nbsp;
                            </div>
                            <p class="lessonShop__location">{{lessonArea}}</p>
                            <h1 class="lessonShop__lessonName">{{lessonDetail.l_name}}</h1>
                            <p class="lessonShop__no">#{{lessonDetail.l_id}}</p>
                            <LessonCardType
                                :lessonType="lessonDetail.type"
                                class="lessonShop__type"
                            />
                            <div class="lessonShop__btnFavoriteBar">
                                <ButtonFavorite
                                    :favorite="lessonDetail.favorite"
                                    @click.native.stop="switchFavorite"
                                    class="lessonShop__btnFavorite"
                                />
                            </div>
                        </div>
                        <hr class="lessonShop__hr" />
                        <div class="lessonShop__field">
                            <LessonCardLabel
                                :lessonData="lessonDetail"
                                class="lessonShop__label"
                            />
                            <p class="lessonShop__price">
                                <del
                                    class="lessonShop__originFee"
                                    v-if="hasOriginFee"
                                >NT$ {{ lessonDetail.origin_fee }}</del>
                                <span
                                    class="lessonShop__currFee"
                                    v-if="lessonDetail.current_fee"
                                >{{ lessonDetail.current_fee }}</span>
                                <span
                                    class="lessonShop__currFee lessonShop__currFee--free"
                                    v-else
                                >免費</span>
                            </p>
                            <p
                                class="lessonShop__time"
                                v-if="stillFunding"
                            >{{fundText}}截止日期：{{lessonDetail.end_fund.replace(/-/g,'/')}}</p>
                            <p class="lessonShop__time">課程開始日期：{{lessonDetail.start_time.replace(/-/g,'/')}}</p>

                            <b-button
                                @click="goClassroom"
                                class="lessonShop__btnBuy"
                                v-if="classroomPermission"
                                variant="info"
                            >
                                <font-awesome-icon
                                    class="faIcon"
                                    icon="book-open"
                                />進入教室
                            </b-button>
                            <b-button
                                @click="goMyOrder"
                                class="lessonShop__btnBuy"
                                v-else-if="lessonDetail.owned==1 && lessonDetail.payment"
                                variant="warning"
                            >
                                <font-awesome-icon
                                    class="faIcon"
                                    icon="list-alt"
                                />查看訂單
                            </b-button>
                            <div
                                class="lessonShop__callForStartedLesson"
                                v-else-if="!fulledEntityLesson && startedEntityLesson"
                            >
                                <font-awesome-icon
                                    class="faIcon"
                                    icon="exclamation-circle"
                                />課程已開始，若想報名請電洽：(02)2955-4564，由專人為您服務。
                            </div>
                            <b-button
                                @click="checkBuyCellphone"
                                class="lessonShop__btnBuy"
                                v-else-if="!fulledEntityLesson"
                                variant="success"
                            >
                                <font-awesome-icon
                                    class="faIcon"
                                    icon="shopping-basket"
                                />
                                <span v-if="lessonDetail.current_fee">購買此課程</span>
                                <span v-else>免費購買</span>
                            </b-button>

                            <p
                                class="lessonShop__deadline"
                                v-if="isOnlineLesson && lessonDetail.orderDeadline"
                            >觀看截止日：{{ lessonDetail.orderDeadline.replace(/-/g,'/')}}</p>

                            <!-- 線上課程沒買或是買了還沒開始看 -->
                            <p
                                class="lessonShop__deadline"
                                v-else-if="isOnlineLesson"
                            >觀看期限：{{ watchDeadline}}</p>
                        </div>
                    </div>
                    <p
                        class="lessonShop__remainFundTime"
                        v-if="stillFunding"
                    >
                        離募資截止剩：
                        <RemainTimeInfo :timeString="lessonDetail.end_fund + ' 23:59:59'" />
                    </p>
                    <div
                        class="lessonShop__sumaryCard lessonShop__teacherCard"
                        v-if="!teacherLoaded"
                    >
                        <LoadingSet class="lessonShop__teacherLoading" />
                    </div>
                    <div
                        class="lessonShop__sumaryCard lessonShop__teacherCard"
                        v-else
                    >
                        <BaseAvatar
                            :avatarImg="avatarImgSrc"
                            class="lessonShop__avatar"
                        />
                        <div class="lessonShop__teacherInfo">
                            <header class="lessonShop__headerTeacher">課程講師</header>

                            <router-link
                                :to="'/teacher/'+teacher.t_id+'/intro'"
                                class="lessonShop__Linkteacher lessonShop__Linkteacher--name"
                                target="_blank"
                            >{{teacherFullName}}</router-link>
                            <router-link
                                :to="'/teacher/'+teacher.t_id+'/portfolios'"
                                class="lessonShop__Linkteacher lessonShop__Linkteacher--workout"
                                target="_blank"
                            >查看作品</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalVideo
            :chapters="freeChapters"
            :lessonId="lessonId"
            ref="modalVideo"
            v-if="lessondLoaded && !isEntityLesson"
        />
        <ModalPhoneSetter
            ref="modalPhoneSetter"
            v-if="!cellphoneVerifyStatus"
        />
        <ModalPhoneVerify
            ref="modalPhoneVerify"
            v-if="!cellphoneVerifyStatus"
        />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import BaseAvatar from '../components/global/BaseAvatar'
import LoadingSet from '../components/LoadingSet'
import LessonCardType from '../components/LessonCardType'
import ButtonFavorite from '../components/ButtonFavorite'
import LessonCardLabel from '../components/LessonCardLabel'
import RemainTimeInfo from '../components/RemainTimeInfo'
import GoogleMapWithKeyword from '../components/GoogleMapWithKeyword'
import LessonUnitFoldableSet from '../components/LessonUnitFoldableSet'
import LessonQA from '../components/LessonQA'
import animateScrollTo from 'animated-scroll-to'
import ModalVideo from '../components/ModalVideo'
import ModalPhoneSetter from '../components/ModalPhoneSetter'
import ModalPhoneVerify from '../components/ModalPhoneVerify'
import LessonDescription from '../components/LessonDescription'
import BreadCrumbs from '../components/BreadCrumbs'
import { goClassroomOrShop } from '../mixins/goClassroomOrShop'
import { buyFreeLesson } from '../mixins/buyFreeLesson'
import { COMMON_UTILITY } from '../class/commonUtility'

export default {
    name: 'LessonShop',
    components: {
        BaseAvatar,
        LoadingSet,
        LessonCardType,
        ButtonFavorite,
        LessonCardLabel,
        RemainTimeInfo,
        GoogleMapWithKeyword,
        LessonUnitFoldableSet,
        LessonQA,
        ModalVideo,
        ModalPhoneSetter,
        ModalPhoneVerify,
        LessonDescription,
        BreadCrumbs
    },

    mixins: [goClassroomOrShop, buyFreeLesson],

    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.LESSON_SHOP + this.$route.params['l_id'],
            isMounted: false,
            descriptionData: null,
            mediaVideo: null
        }
    },

    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body
        body.scrollTop = 0

        EventBus.$on('qa-send-completed', this.getQA)
        EventBus.$on('phone-verfiy-completed', this.phoneVerfiyCompleted)
        EventBus.$on('reload-lessons', this.init)

        this.isMounted = true
        this.getQA()

        this.$store.commit('lesson/CLEAN_DATAS', 'lessonUnitDetail')

        this.init()

        EventBus.$emit('do-resize')
    },

    updated() {
        EventBus.$emit('do-resize')
    },

    computed: {
        mainMediaStyle() {
            return `background-image: url(${JS_CONFIG.MEDIA_PATH.replace(
                'LESSON_ID',
                this.lessonDetail.l_id
            ) + this.lessonDetail.media});`
        },

        lessonId() {
            return this.lessonDetail.l_id
        },

        isLessonTeacher() {
            return this.$store.getters['member/memberTid'] == this.lessonDetail.t_id
        },

        fundText() {
            return this.isEntityLesson ? '報名' : '募資'
        },

        conditions() {
            return this.lessonDetail.condition
        },

        suits() {
            return this.lessonDetail.suit
        },

        learns() {
            return this.lessonDetail.learn
        },
        lessonUnitDetail() {
            return this.$store.state.lesson.lessonUnitDetail.data
        },

        freeChapters() {
            let units = this.lessonUnitDetail,
                chapters = []

            units.forEach(unit => {
                unit.forEach(chapter => {
                    if (chapter.c_video_situation == 'free') {
                        chapters.push(chapter)
                    }
                })
            })
            return chapters
        },
        isTeacherOrWorker() {
            return this.isLessonTeacher || this.isWorker
        },

        classroomPermission() {
            return this.lessonDetail.owned == 2 || this.isTeacherOrWorker
        },

        watchDeadline() {
            if (this.lessonDetail.deadline == 999) {
                return '永久觀看'
            } else {
                return this.lessonDetail.deadline + ' 個月'
            }
        },
        ...mapState({
            lessonDetail: state => state.lesson.lessonDetail.data
        }),
        ...mapGetters({
            isLoginedMember: 'member/isLoginedMember',
            cellphoneVerifyStatus: 'member/cellphoneVerifyStatus',
            lessondLoaded: 'lesson/lessonDetailLoadComplete',
            lessonShopQALoaded: 'lesson/lessonShopQALoadComplete',
            isWorker: 'member/isWorker',
            mainMediaIIsImg: 'lesson/lessonDetailMainMediaIIsImg',
            lessonCover: 'lesson/lessonDetailCover',
            mainVideoSrc: 'lesson/lessonDetailMainVideoSrc',
            lessonArea: 'lesson/lessonDetailArea',
            lessonLocation: 'lesson/lessonDetailLocation',
            isEntityLesson: 'lesson/lessonDetailIsEntityLesson',
            isOnlineLesson: 'lesson/lessonDetailIsOnlineLesson',
            startedEntityLesson: 'lesson/lessonDetailIsStartedEntityLesson',
            fulledEntityLesson: 'lesson/lessonDetailIsFulledEntityLesson',
            fullLocation: 'lesson/lessonDetailFullLocation',
            stillFunding: 'lesson/lessonDetailIsStillFunding',
            notFree: 'lesson/lessonDetailNotFree',
            lessonShopQA: 'lesson/lessonShopQA',
            teacher: 'teacher/lessonShopTeacher',
            teacherLoaded: 'teacher/lessonShopTeacherLoadCompleted',
            hasOriginFee: 'lesson/lessonDetailHasOriginFee',
            teacherFullName: 'teacher/lessonShopTeacherFullName',
            avatarImgSrc: 'teacher/lessonShopTeacherAvatarImgSrc'
        }),
        createCalendarEventLink() {
            let stime = this.lessonDetail.l_start_time.split(' '),
                etime = this.lessonDetail.l_end_time.split(' '),
                date =
                    stime[0].replace(/-/g, '') +
                    'T' +
                    stime[1].replace(/:/g, '') +
                    '/' +
                    etime[0].replace(/-/g, '') +
                    'T' +
                    etime[1].replace(/:/g, '')

            return `http://www.google.com/calendar/event?action=TEMPLATE&text=${this.lessonDetail.l_name.replace(
                /\s/g,
                '+'
            )}&dates=${date}&location=${this.fullLocation.replace(
                /\s/g,
                '+'
            )}&trp=false&sprop=&sprop=name:`
        }
    },

    methods: {
        getTerm(term) {
            return JS_CONFIG.TERMS[term]
        },
        checkBodyScrollStatus(bool) {
            this.$parent.switchBodyScrollStatus(
                (this.$refs['modalVideo'] && this.$refs['modalVideo'].isShow) ||
                    (this.$refs['modalPhoneSetter'] && this.$refs['modalPhoneSetter'].isShow) ||
                    (this.$refs['modalPhoneVerify'] && this.$refs['modalPhoneVerify'].isShow)
            )
        },

        async init() {
            try {
                let response = await this.$store.dispatch(
                    'lesson/getLessonDetail',
                    this.$route.params['l_id']
                )

                if (response.data.status == 0) {
                    let snapshot = response.data.data

                    snapshot.cancel_lesson =
                        snapshot.cancel_lesson_init && !snapshot.cancel_lesson
                            ? 2
                            : snapshot.cancel_lesson
                    snapshot.current_fee = COMMON_UTILITY.isPast(snapshot.end_fund, true)
                        ? snapshot.origin_fee
                        : snapshot.offer_fee

                    axios.get(JS_CONFIG.JSON_PATH + snapshot.description).then(snapshot => {
                        this.descriptionData = snapshot.data
                    })
                    this.$store.commit('lesson/SET_DATAS', {
                        stateName: 'lessonDetail',
                        data: snapshot
                    })
                    // this.$store.dispatch('teacher/getTeacher', snapshot.t_id)
                    this.$store.dispatch('teacher/getTeacher', snapshot.l_id)
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getLessonDetail',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }

            try {
                let response = await this.$store.dispatch('lesson/getLessonUnitDetail', {
                    l_id: this.$route.params['l_id'],
                    mode: 0
                })
                if (response.data.status == 0) {
                    let snapshot = response.data.data

                    if (this.isOnlineLesson) {
                        let uData = [],
                            tmpUnit = [],
                            idx = 0

                        snapshot.forEach(chapter => {
                            chapter.idx = idx++
                            console.warn('器材展閹割')
                            chapter.time_watched = 0
                            if (uData.length && uData[uData.length - 1][0].u_id == chapter.u_id) {
                                uData[uData.length - 1].push(chapter)
                            } else {
                                uData.push([chapter])
                            }
                        })

                        this.$store.commit('lesson/SET_DATAS', {
                            stateName: 'lessonUnitDetail',
                            data: uData
                        })
                    } else {
                        this.$store.commit('lesson/SET_DATAS', {
                            stateName: 'lessonUnitDetail',
                            data: snapshot
                        })
                    }
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'getLessonUnitDetail',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },
        getQA() {
            this.$store.dispatch('lesson/getLessonShopQA', {
                l_id: this.$route.params['l_id'],
                area: 'shop'
            })
        },

        scrollIntoView(evt) {
            evt.preventDefault()
            const href = evt.target.getAttribute('href')
            const el = href ? document.querySelector(href) : null
            if (el) {
                animateScrollTo(el.offsetTop - 40)
            }
        },

        async switchFavorite() {
            try {
                let favorite = this.lessonDetail.favorite ? 0 : 1,
                    response = await this.$store.dispatch('lesson/switchFavorite', {
                        l_id: this.lessonDetail.l_id,
                        favorite
                    })
                if (response.data.status == 0) {
                    this.$store.commit('lesson/FAVORITE', {
                        lid: this.lessonDetail.l_id,
                        favorite,
                        shopMode: true
                    })
                } else {
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'switchFavorite',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        },

        goClassroom() {
            let memberData = this.$store.state.member.memberData.data

            this.decideGoClassroomOrShop({
                l_id: this.lessonDetail.l_id,
                l_name: this.lessonDetail.l_name,
                l_Type: this.lessonDetail.type,
                owned: this.lessonDetail.owned,
                deadline: this.lessonDetail.deadline,
                orderDeadline: this.lessonDetail.orderDeadline,
                orderRestrict: this.lessonDetail.restrict,
                t_id: this.lessonDetail.t_id,
                m_t_id: memberData.t_id,
                role: memberData.role,
                start_time: this.lessonDetail.start_time
            })
        },

        goMyOrder() {
            this.$router.push('/profile/order/')
        },

        checkBuyCellphone() {
            if (this.isLoginedMember) {
                if (this.cellphoneVerifyStatus) {
                    this.buy()
                } else {
                    EventBus.$emit('show-phone-setter')
                }
            } else {
                EventBus.$emit('prompt-login')
            }
        },
        phoneVerfiyCompleted() {
            this.$store.commit('member/UPDATE_MEMBER_SINGLE_DATA', {
                name: 'cellphone_verify_status',
                val: 1
            })
            this.buy()
        },
        buy() {
            if (!this.lessonDetail.l_id) {
                return
            }
            if (this.lessonDetail.current_fee) {
                this.$store
                    .dispatch('order/cancelLessonExistedOrder', this.lessonDetail.l_id)
                    .then(response => {
                        if (response.data.status == 0) {
                            console.warn('器材展閹割')
                            // this.$router.push('/cart/' + this.lessonDetail.l_id)
                            document.location.href = '/cart/' + this.lessonDetail.l_id
                        } else {
                            this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                                api: 'cancelLessonExistedOrder',
                                code: response.data.status,
                                isError: true
                            })
                        }
                    })
                    .catch(e => {
                        this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                            api: 'unknown',
                            code: e,
                            isError: true
                        })
                    })
            } else {
                this.buyFreeLesson({
                    l_id: this.$route.params['l_id'],
                    deadline: this.lessonDetail.deadline,
                    type: this.lessonDetail.type
                })
            }
        }
    },

    beforeDestroy() {
        this.isMounted = false
        this.$store.commit('lesson/LOAD_LESSON_DETAIL_INIT')
        this.$parent.switchBodyScrollStatus(false)
        EventBus.$off('phone-verfiy-completed', this.buy)
        EventBus.$off('qa-send-completed', this.getQA)
        EventBus.$off('reload-lessons', this.init)

        this.$store.commit('order/SET_STATUS', { name: 'buyFreeStatus', status: 0 })
    }
}
</script>
