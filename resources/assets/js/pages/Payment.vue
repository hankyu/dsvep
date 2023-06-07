<style lang="scss">
@import '../../sass/variables';
</style>

<template>
    <div class>
        <h2 class="termsAndPolicy__h2">付款方式</h2>

        <ul class="termsAndPolicy__majorList">
            <li class="termsAndPolicy__majorListItem">
                <header class="termsAndPolicy__majorListItemHeader">一、信用卡支付</header>
                <div class="termAndPolicy__listContent">
                    <p>完整支援VISA/MasterCard/JCB/銀聯卡。</p>
                    <p>選擇信用卡支付，填入「信用卡卡號」、「卡片有效月年」、「卡片背面末三碼」、「付款通知信箱」確認交易明細後進行付款，系統將送出至銀行進行授權。</p>
                </div>
            </li>
            <li class="termsAndPolicy__majorListItem">
                <header class="termsAndPolicy__majorListItemHeader">二、ATM轉帳</header>
                <div class="termAndPolicy__listContent">
                    <ul class="termsAndPolicy__minorList">
                        <li class="termsAndPolicy__minorListItem">
                            <header class="termsAndPolicy__minorListItemHeader">ATM</header>

                            <ul class="termAndPolicy__listDisc">
                                <li>玉山銀行</li>
                                <li>台灣銀行</li>
                                <li>台新銀行</li>
                                <li>華南銀行</li>
                                <li>兆豐銀行</li>
                            </ul>
                        </li>
                        <li class="termsAndPolicy__minorListItem">
                            <header class="termsAndPolicy__minorListItemHeader">WebATM</header>請先準備晶片金融卡+晶片讀卡機，藍新金流將引導您至指定金融機構之網路ATM進行轉帳。
                        </li>
                    </ul>
                </div>
            </li>
            <li class="termsAndPolicy__majorListItem">
                <header class="termsAndPolicy__majorListItemHeader">三、超商付款</header>
                <div class="termAndPolicy__listContent">
                    <ul class="termsAndPolicy__minorList">
                        <li class="termsAndPolicy__minorListItem">
                            <header class="termsAndPolicy__minorListItemHeader">代碼繳費</header>結帳時將會收到一組超商代碼，前往超商多媒體機台 (如: 7-ELEVEN門市ibon) 至代碼繳費功能輸入代碼，即可印出繳費單。
                            (參考：
                            <a
                                href="https://www.spgateway.com/website/Page/content/cvs_intro"
                                target="_blank"
                            >超商代碼繳費步驟</a>）
                        </li>
                        <li class="termsAndPolicy__minorListItem">
                            <header class="termsAndPolicy__minorListItemHeader">條碼繳費</header>
                            <p>顧客以雷射印表機印出藍新金流所產出的條碼，前往超商櫃台即可完成繳費。</p>
                            <p>四大超商全部通行</p>
                            <ul class="termAndPolicy__listDisc">
                                <li>7-11</li>
                                <li>全家</li>
                                <li>萊爾富</li>
                                <li>OK</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: 'Payment',
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
