<style lang="scss">
@import '../../../sass/variables';

.pageFooter {
    font-size: 0.8rem;
    background-color: $dark;
    color: $white;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    &.pageFooter--fixed {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
    }

    .pageFooter__header {
        font-size: 1rem;
        font-weight: bold;
    }

    p {
        text-align: left;
        margin-bottom: 0;
    }

    p + p {
        margin-top: 1rem;
    }

    ul {
        padding: 0;
        list-style-type: none;

        &.pageFooter__wordLinkUL {
            a {
                color: $white;

                &:hover,
                &:active {
                    color: $white;
                    text-decoration: underline;
                }
            }
        }
    }
    .pageFooter__qrcode {
        height: 5rem;
        margin-top: 0.5rem;
    }

    .MINI #twcad2 {
        left: auto;
        right: 0;
        top: -30px;
    }
}
.pageFooter__followUsA {
    color: $white;
    text-decoration: none;

    &:hover,
    &:active {
        color: $brand-primary;
    }
}
#twcaseal {
    margin-top: 1.5rem;
    text-align: right !important;
}
#twcad3 {
    left: auto !important;
    right: 0 !important;
}
.pageFooter__copyright {
    font-size: 0.7rem;
    text-align: right;
}
</style>


<template>
    <footer
        :class="footerFixed"
        class="pageFooter"
        ref="page_footer"
    >
        <b-container class="bv-example-row">
            <b-row class="text-center">
                <b-col
                    cols="12"
                    md="6"
                >
                    <header class="pageFooter__header">大俠學習簡介</header>
                    <p>
                        大俠學習平台承襲了大俠攝影教室十多年來的辦學經驗，榮獲政府人才發展品質管理系統之肯定(TTQS)，
                        提供一個優質的學習平台環境，豐富的教學資源、結合線上與線下的學習，讓所有想進修的朋友，都能找到適合自己的課程。
                        讓大家不論是在生活中、職場上都能保有持續學習的動力，創造個人的影響力。
                    </p>
                </b-col>
                <b-col
                    cols="12"
                    md="3"
                    sm="6"
                >
                    <header class="pageFooter__header">支援中心</header>
                    <ul class="pageFooter__wordLinkUL">
                        <li>
                            <router-link to="/contact/about">關於我們</router-link>
                        </li>
                        <li>
                            <router-link to="/contact/terms/service">服務條款</router-link>
                        </li>
                        <li>
                            <!-- 器材展暫時隱藏 -->
                            <!-- <a
                                @click="contactUs"
                                href="javascript:void(0)"
                            >聯絡客服</a>-->
                        </li>
                        <li>
                            <router-link to="/tutorial">網站使用教學</router-link>
                        </li>
                        <li>
                            <a
                                href="https://line.me/R/ti/p/%40cqq7970i"
                                target="_blank"
                            >
                                <img
                                    class="pageFooter__qrcode"
                                    src="https://i.imgur.com/LMOfbfT.jpg"
                                />
                            </a>
                        </li>
                    </ul>
                </b-col>
                <b-col
                    cols="12"
                    md="3"
                    sm="6"
                >
                    <header class="pageFooter__header">聯絡我們</header>
                    <ul class="pageFooter__wordLinkUL">
                        <li>
                            <a href="mailto:eason.yea@gmail.com">eason.yea@gmail.com</a>
                        </li>
                        <li>新北市板橋區中山路二段70號2樓</li>
                        <li>(02)2955-4564</li>
                    </ul>
                    <header class="pageFooter__header">追蹤我們</header>
                    <a
                        class="pageFooter__followUsA"
                        href="https://www.facebook.com/%E5%A4%A7%E4%BF%A0%E6%94%9D%E5%BD%B1%E6%95%99%E5%AE%A4-144053375660756/"
                        target="_blank"
                    >
                        <font-awesome-icon
                            :icon="['fab', 'facebook-square']"
                            size="lg"
                        />
                    </a>
                    <a
                        class="pageFooter__followUsA"
                        href="https://www.youtube.com/channel/UCFnVApwdtxMIsxiu77h7-gw"
                        target="_blank"
                    >
                        <font-awesome-icon
                            :icon="['fab', 'youtube']"
                            size="lg"
                        />
                    </a>
                    <div
                        class="MINI"
                        id="twcaseal"
                    >
                        <img src="/img/MINI.gif" />
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="pageFooter__copyright">&copy;Copyright - Dasha. All Rights Reserved</b-col>
            </b-row>
        </b-container>
    </footer>
</template>

<script>
import { EventBus } from '../../event-bus'

export default {
    name: 'TheFooter',
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '//ssllogo.twca.com.tw/twcaseal_v3.js')
        document.head.appendChild(recaptchaScript)
    },
    computed: {
        footerFixed() {
            return this.$store.state.footerFixed ? 'pageFooter--fixed' : ''
        }
    },
    methods: {
        setFooterHeightToState() {
            this.$store.commit('SET_FOOTER_HEIGHT', this.$refs.page_footer.clientHeight)
        },
        contactUs() {
            console.log('contactUs')
            EventBus.$emit('show-contact-us')
        }
    }
}
</script>