<style lang="scss">
@import '../../sass/variables';
</style>

<template>
    <div class>
        <h2 class="termsAndPolicy__h2">退款規定</h2>
        <p>學生註冊繳費後離班者，應依下列規定退費：</p>

        <ul class="termsAndPolicy__minorList">
            <li class="termsAndPolicy__minorListItem">
                <header class="termsAndPolicy__minorListItemHeader">帶狀課程退費規定</header>
                <ul class="termAndPolicy__listNum">
                    <li>實際開課日前三十日（含）以前申請退費者，應全額退還已繳費用。</li>
                    <li>實際開課日前二十九日內申請退費者，應退還已繳費用之百分之九十。</li>
                    <li>實際開課日後五日內申請退費者，應退還已繳費用之百分之七十。</li>
                    <li>實際開課日後第六日起，但未逾三分之一，申請退費者，應退還已繳費用之百分之五十。</li>
                    <li>在班期間已逾三分之一者，得不予退費。</li>
                </ul>
            </li>
            <li class="termsAndPolicy__minorListItem">
                <header class="termsAndPolicy__minorListItemHeader">講座/一日班 退費規定</header>
                <ul class="termAndPolicy__listNum">
                    <li>因只有單堂短期課程，若報名講座不克參加請提前告知。</li>
                    <li>活動前一至三天(不包含活動當天)告知，可選擇退費七成。</li>
                    <li>開課當天告知無法出席，恕無法退費，但可找人替補名額，敬請見諒！</li>
                </ul>
            </li>
            <li class="termsAndPolicy__minorListItem">
                <header class="termsAndPolicy__minorListItemHeader">線上課程 退費規定</header>
                <ul class="termAndPolicy__listNum">
                    <li>
                        如欲申請退費，請於購買後
                        <em class="termsAndPolicy__em">七天內</em>申請，逾期則不接受退款。
                    </li>
                    <li>
                        如在線上課程開課後
                        <span class="termsAndPolicy__em">點入課程教室頁面即視同觀看</span>，恕不退款。
                    </li>
                </ul>
            </li>
            <li class="termsAndPolicy__minorListItem">
                <header class="termsAndPolicy__minorListItemHeader">退費申請流程</header>
                <ul class="termAndPolicy__listNum">
                    <li>
                        請填寫
                        <a
                            href="https://goo.gl/J5mFc5"
                            target="_blank"
                        >退費申請表</a>。
                    </li>
                    <li>確實填寫申請表格內容。</li>
                    <li>填寫完後送出，本網站進行您的退費審核。</li>
                    <li>平台將於申請時間後工作天7-14天匯入帳戶。</li>
                </ul>
            </li>
            <li class="termsAndPolicy__minorListItem">
                <header class="termsAndPolicy__minorListItemHeader">退費注意事項</header>
                <ul class="termAndPolicy__listDisc">
                    <li>如因人數不足取消課程則全額進行退費</li>
                    <li>如因個人因素取消課程需要退費，除按退費規定外將會再另扣除行政處理費100元</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: 'Refund',
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
