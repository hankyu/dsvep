<style lang="scss">
@import '../../sass/variables';
</style>

<template>
    <div class>
        <h2 class="termsAndPolicy__h2">補課/重聽規定</h2>
        <ul class="termsAndPolicy__minorList">
            <li class="termsAndPolicy__minorListItem">
                <ul class="termAndPolicy__listNum">
                    <li>登記重聽/補課，但未出席者，將取消該生免費補課/重聽資格，請同學們注意。</li>
                    <li>補課重聽不須額外支付費用，僅接受同一課程內容補課/重聽，課程名稱相同但內容不同恕無法補課/重聽。例:單眼基礎班程內容相同，可接受不同地區、不同時段、不同講師補課/重聽。</li>
                    <li class="termsAndPolicy__em">確定開班後才能開放補課/重聽申請，開班狀況請注意平台公告。</li>
                    <li>為避免資源浪費，如報名整期重聽者，室內課出席率未達七成，將會取消補課/重聽資格，把資源留給真正想學習的朋友。</li>
                    <li>每期保留2~5個補課/重聽補課名額(按課程規定人數不同)</li>
                    <li>補課/重聽不包含外拍活動，講師會依當期學員參加情形，邀約重聽學員參加。</li>
                    <li>不額外提供補課/重聽者講義，請自備筆記。</li>
                    <li>部份主題課程無法免費重聽，會於網頁上註明。如有不清楚之細節歡迎來電或來信詢問。</li>
                </ul>
            </li>
            <li class="termsAndPolicy__minorListItem">
                <header class="termsAndPolicy__minorListItemHeader">補課/重聽申請流程</header>
                <ul class="termAndPolicy__listNum">
                    <li>
                        請填寫
                        <a
                            href="https://goo.gl/CnQwsa"
                            target="_blank"
                        >補課/重聽申請表</a>。
                    </li>
                    <li>確實填寫申請表格內容</li>
                    <li>填寫完後送出，本網站將進行您的補課/重聽審核。</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: 'Relisten',
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
