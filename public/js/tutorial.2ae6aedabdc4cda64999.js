(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1115:function(n,o,r){"use strict";r.r(o);var e=r(51),t=r.n(e),a=r(0),i={data:function(){return{title:"線上教學平台說明",listArr:[{idx:0,item:"0",title:"申請 Gmail 帳號",youtubeSrc:"https://www.youtube.com/embed/UZuAFWgotrM"},{idx:1,item:"1",title:"如何進入網站",youtubeSrc:"https://www.youtube.com/embed/GUWgsfrCeOQ"},{idx:2,item:"2-1",title:'平台註冊 <span class="color-emphasized2">Google</span> 帳號',youtubeSrc:"https://www.youtube.com/embed/pqx2fWsWRpw"},{idx:3,item:"2-2",title:"平台註冊新帳號",youtubeSrc:"https://www.youtube.com/embed/ePDz9NGfueY"},{idx:4,item:"3",title:"如何搜索課程",youtubeSrc:"https://www.youtube.com/embed/7V0DFLHFsnc"},{idx:5,item:"4-1",title:'<span class="color-emphasized2">信用卡</span> 購買課程',youtubeSrc:"https://www.youtube.com/embed/hs6gv6vL4_A"},{idx:6,item:"4-2",title:'<span class="color-emphasized2">ATM</span> 購買課程',youtubeSrc:"https://www.youtube.com/embed/YryhsYRDArY"},{idx:7,item:"4-3",title:'<span class="color-emphasized2">超商</span> 購買課程',youtubeSrc:"https://www.youtube.com/embed/LGJQUVENVUQ"},{idx:8,item:"5",title:"取消訂單重新購買",youtubeSrc:"https://www.youtube.com/embed/oaB6REGk7uU"},{idx:9,item:"6",title:"如何觀看課程",youtubeSrc:"https://www.youtube.com/embed/fnKMIwL30AU"},{idx:10,item:"7",title:'<span class="color-emphasized2">實體</span>課程重聽申請',youtubeSrc:"https://www.youtube.com/embed/TKEaFiSkfQ0"}]}},mounted:function(){this.$store.commit("SWITCH_PAGE_CHANGING",!1),(document.documentElement||document.body).scrollTop=0,a.a.$emit("do-resize")},updated:function(){a.a.$emit("do-resize")},methods:{gotoContent:function(n){var o=document.getElementById("tutorialContent"+n).offsetTop,r=document.querySelector("#youtubeTutorialContent");t()(0),t()(o,{element:r,offset:-100})}}},c=(r(770),r(2)),l=Object(c.a)(i,function(){var n=this,o=n.$createElement,r=n._self._c||o;return r("div",{staticClass:"youtubeTutorial wrapper"},[r("ul",{staticClass:"youtubeTutorial__list"},n._l(n.listArr,function(o){return r("li",{key:o.idx,staticClass:"youtubeTutorial__listItem",attrs:{"li-idx":o.item+"、"},domProps:{innerHTML:n._s(o.title)},on:{click:function(r){return n.gotoContent(o.idx)}}})}),0),n._v(" "),r("div",{staticClass:"youtubeTutorial__content",attrs:{id:"youtubeTutorialContent"}},[r("h1",{staticClass:"pageH1"},[n._v(n._s(n.title))]),n._v(" "),r("ul",{staticClass:"youtubeTutorial__contentlist"},n._l(n.listArr,function(o){return r("li",{key:o.idx,staticClass:"youtubeTutorial__contentlistItem",attrs:{id:"tutorialContent"+o.idx}},[r("header",{staticClass:"youtubeTutorial__contentlistItemHeader",domProps:{innerHTML:n._s(o.item+"、 "+o.title)}}),n._v(" "),r("div",{staticClass:"youtubeTutorial__iframeContainer6x9"},[r("div",{staticClass:"youtubeTutorial__iframeContainer6x9inner"},[r("iframe",{staticClass:"youtubeTutorial__iframe",attrs:{src:o.youtubeSrc,frameborder:"0"}})])])])}),0)])])},[],!1,null,null,null);o.default=l.exports},176:function(n,o,r){var e=r(771);"string"==typeof e&&(e=[[n.i,e,""]]);var t={hmr:!0,transform:void 0,insertInto:void 0};r(4)(e,t);e.locals&&(n.exports=e.locals)},770:function(n,o,r){"use strict";var e=r(176);r.n(e).a},771:function(n,o,r){(n.exports=r(3)(!1)).push([n.i,'/* -------------------- */\n/*                      */\n/*     RWD BOUNDARY     */\n/*                      */\n/* -------------------- */\n/* -------------------- */\n/*                      */\n/*     COLOR SCHEME     */\n/*                      */\n/* -------------------- */\n/* ------------------ */\n/*     bootstraps     */\n/* ------------------ */\n/* ------------------- */\n/*     gray levels     */\n/* ------------------- */\n/* -------------- */\n/*     border     */\n/* -------------- */\n/* -------------------- */\n/*     Shadow color     */\n/* -------------------- */\n/*---------------*/\n/*     color     */\n/*---------------*/\n.color-brand-primary {\n  color: #ff98aa;\n}\n.color-complementary1 {\n  color: #17a2b8;\n}\n.color-complementary2 {\n  color: #ffe3e8;\n}\n.color-complementary3 {\n  color: #fffcb7;\n}\n.color-emphasized1 {\n  color: #fa6c50;\n}\n.color-emphasized2 {\n  color: #ff4b68;\n}\n.color-emphasized3 {\n  color: #5dc0de;\n}\n.color-emphasized4 {\n  color: #89ecda;\n}\n.color-bs-danger {\n  color: #dc3545;\n}\n.color-bs-success {\n  color: #28a745;\n}\n.color-bs-primary {\n  color: #007bff;\n}\n.color-bs-warning {\n  color: #ffc107;\n}\n.color-bs-info {\n  color: #17a2b8;\n}\n.color-black {\n  color: #000;\n}\n.color-font-primary {\n  color: #141414;\n}\n.color-dark {\n  color: #262626;\n}\n.color-darkgray {\n  color: #666;\n}\n.color-gray {\n  color: #999;\n}\n.color-lightgray {\n  color: #ccc;\n}\n.color-gainsboro {\n  color: #eee;\n}\n.color-darkwhite {\n  color: #f9f9f9;\n}\n.color-white {\n  color: #fff;\n}\n\n/*------------------*/\n/*     bg color     */\n/*------------------*/\n.bg-brand-primary {\n  background: #ff98aa;\n}\n.bg-complementary1 {\n  background: #17a2b8;\n}\n.bg-complementary2 {\n  background: #ffe3e8;\n}\n.bg-complementary3 {\n  background: #fffcb7;\n}\n.bg-emphasized1 {\n  background: #fa6c50;\n}\n.bg-emphasized2 {\n  background: #ff4b68;\n}\n.bg-emphasized3 {\n  background: #5dc0de;\n}\n.bg-emphasized4 {\n  background: #89ecda;\n}\n.bg-bs-danger {\n  background: #dc3545;\n}\n.bg-bs-success {\n  background: #28a745;\n}\n.bg-bs-primary {\n  background: #007bff;\n}\n.bg-bs-warning {\n  background: #ffc107;\n}\n.bg-bs-info {\n  background: #17a2b8;\n}\n.bg-black {\n  background: #000;\n}\n.bg-font-primary {\n  background: #141414;\n}\n.bg-dark {\n  background: #262626;\n}\n.bg-darkgray {\n  background: #666;\n}\n.bg-gray {\n  background: #999;\n}\n.bg-lightgray {\n  background: #ccc;\n}\n.bg-gainsboro {\n  background: #eee;\n}\n.bg-darkwhite {\n  background: #f9f9f9;\n}\n.bg-white {\n  background: #fff;\n}\n\n/*-------------*/\n/*     btn     */\n/*-------------*/\n.btn-brand-primary {\n  color: #fff;\n  background-color: #ff98aa;\n  border-color: #ff98aa;\n}\n.btn-brand-primary:hover {\n  background-color: #ff7f95;\n  border-color: #ff7f95;\n}\n.btn-complementary1 {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n.btn-complementary1:hover {\n  background-color: #148ea1;\n  border-color: #148ea1;\n}\n.btn-complementary2 {\n  color: #fff;\n  background-color: #ffe3e8;\n  border-color: #ffe3e8;\n}\n.btn-complementary2:hover {\n  background-color: #ffcad3;\n  border-color: #ffcad3;\n}\n.btn-complementary3 {\n  color: #fff;\n  background-color: #fffcb7;\n  border-color: #fffcb7;\n}\n.btn-complementary3:hover {\n  background-color: #fffb9e;\n  border-color: #fffb9e;\n}\n.btn-emphasized1 {\n  color: #fff;\n  background-color: #fa6c50;\n  border-color: #fa6c50;\n}\n.btn-emphasized1:hover {\n  background-color: #f95737;\n  border-color: #f95737;\n}\n.btn-emphasized2 {\n  color: #fff;\n  background-color: #ff4b68;\n  border-color: #ff4b68;\n}\n.btn-emphasized2:hover {\n  background-color: #ff3253;\n  border-color: #ff3253;\n}\n.btn-emphasized3 {\n  color: #fff;\n  background-color: #5dc0de;\n  border-color: #5dc0de;\n}\n.btn-emphasized3:hover {\n  background-color: #48b8da;\n  border-color: #48b8da;\n}\n.btn-emphasized4 {\n  color: #fff;\n  background-color: #89ecda;\n  border-color: #89ecda;\n}\n.btn-emphasized4:hover {\n  background-color: #73e8d3;\n  border-color: #73e8d3;\n}\n.btn-bs-danger {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-bs-danger:hover {\n  background-color: #d32535;\n  border-color: #d32535;\n}\n.btn-bs-success {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n.btn-bs-success:hover {\n  background-color: #23923d;\n  border-color: #23923d;\n}\n.btn-bs-primary {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-bs-primary:hover {\n  background-color: #006fe6;\n  border-color: #006fe6;\n}\n.btn-bs-warning {\n  color: #fff;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.btn-bs-warning:hover {\n  background-color: #edb100;\n  border-color: #edb100;\n}\n.btn-bs-info {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n.btn-bs-info:hover {\n  background-color: #148ea1;\n  border-color: #148ea1;\n}\n.btn-black {\n  color: #fff;\n  background-color: #000;\n  border-color: #000;\n}\n.btn-black:hover {\n  background-color: black;\n  border-color: black;\n}\n.btn-font-primary {\n  color: #fff;\n  background-color: #141414;\n  border-color: #141414;\n}\n.btn-font-primary:hover {\n  background-color: #070707;\n  border-color: #070707;\n}\n.btn-dark {\n  color: #fff;\n  background-color: #262626;\n  border-color: #262626;\n}\n.btn-dark:hover {\n  background-color: #191919;\n  border-color: #191919;\n}\n.btn-darkgray {\n  color: #fff;\n  background-color: #666;\n  border-color: #666;\n}\n.btn-darkgray:hover {\n  background-color: #595959;\n  border-color: #595959;\n}\n.btn-gray {\n  color: #fff;\n  background-color: #999;\n  border-color: #999;\n}\n.btn-gray:hover {\n  background-color: #8c8c8c;\n  border-color: #8c8c8c;\n}\n.btn-lightgray {\n  color: #fff;\n  background-color: #ccc;\n  border-color: #ccc;\n}\n.btn-lightgray:hover {\n  background-color: #bfbfbf;\n  border-color: #bfbfbf;\n}\n.btn-gainsboro {\n  color: #fff;\n  background-color: #eee;\n  border-color: #eee;\n}\n.btn-gainsboro:hover {\n  background-color: #e1e1e1;\n  border-color: #e1e1e1;\n}\n.btn-darkwhite {\n  color: #fff;\n  background-color: #f9f9f9;\n  border-color: #f9f9f9;\n}\n.btn-darkwhite:hover {\n  background-color: #ececec;\n  border-color: #ececec;\n}\n.btn-white {\n  color: #fff;\n  background-color: #fff;\n  border-color: #fff;\n}\n.btn-white:hover {\n  background-color: #f2f2f2;\n  border-color: #f2f2f2;\n}\n\n/* ---------------------- */\n/*                        */\n/*     LAYOUT SETTING     */\n/*                        */\n/* ---------------------- */\n/* --------------- */\n/*     Sidebar     */\n/* --------------- */\n/* ---------------- */\n/*     BaseCard     */\n/* ---------------- */\n/* ------------------ */\n/*     transition     */\n/* ------------------ */\n/* -------------- */\n/*     header     */\n/* -------------- */\n.br-xxs {\n  display: none;\n}\n@media (max-width: 360px) {\n.br-xxs {\n    display: inline;\n}\n}\n.br-xs {\n  display: none;\n}\n@media (max-width: 575.9px) {\n.br-xs {\n    display: inline;\n}\n}\n\n/* -------------- */\n/*     bubble     */\n/* -------------- */\n/* -------------------- */\n/*     popup modal     */\n/* -------------------- */\n.popupModalHeader {\n  margin-bottom: 0;\n  padding: 0.5rem;\n  line-height: 1.5;\n  font-size: 1.2rem;\n}\n.popupModalBody {\n  padding: 1rem;\n}\n@media (max-width: 575.9px) {\n.popupModalBody {\n    padding: 0.5rem;\n}\n}\n.popupModalFooter {\n  background-color: #fff;\n  padding: 0.5rem 1rem;\n  text-align: right;\n  font-size: 0.9rem;\n  border-top: 1px solid #eee;\n}\n.popupModalFooterBtn {\n  font-size: 0.9rem;\n}\n\n/* ------------------ */\n/*                    */\n/*     Filter Set     */\n/*                    */\n/* ------------------ */\n/* ---------------------- */\n/*     Selector Modal     */\n/* ---------------------- */\n/* ------------------ */\n/*                    */\n/*     Form Style     */\n/*                    */\n/* ------------------ */\n/* --------------- */\n/*                 */\n/*     No Data     */\n/*                 */\n/* --------------- */\n.noData {\n  text-align: center;\n  color: #ccc;\n  margin-top: 2.5rem;\n}\n.noData:before, .noData:after {\n  content: "----";\n  display: inline;\n}\n\n/* ------------------- */\n/*                     */\n/*     FOR @EXTEND     */\n/*                     */\n/* ------------------- */\n.wrapper {\n  width: 1140px;\n  margin-left: auto;\n  margin-right: auto;\n}\n@media (max-width: 1199.9px) {\n.wrapper {\n    width: 940px;\n}\n}\n@media (max-width: 991.9px) {\n.wrapper {\n    width: 720px;\n}\n}\n@media (max-width: 767.9px) {\n.wrapper {\n    width: auto;\n    margin-left: 15px;\n    margin-right: 15px;\n}\n}\n@media (max-width: 575.9px) {\n.wrapper {\n    width: auto;\n    margin-left: 10px;\n    margin-right: 10px;\n}\n}\n.cardShadow {\n  -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);\n}\n.cardShadow:hover, .cardShadow:active {\n  -webkit-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);\n}\n.cartShadow {\n  -webkit-box-shadow: 2px 5px 0px 0 rgba(0, 0, 0, 0.05);\n          box-shadow: 2px 5px 0px 0 rgba(0, 0, 0, 0.05);\n}\n.modalShadow {\n  -webkit-box-shadow: 2px 6px 6px #0006;\n          box-shadow: 2px 6px 6px #0006;\n}\n.lessonTypeShadow {\n  -webkit-box-shadow: 3px 4px 0 -2px rgba(0, 0, 0, 0.05);\n          box-shadow: 3px 4px 0 -2px rgba(0, 0, 0, 0.05);\n}\n.singleLineEllipsis {\n  overflow: hidden;\n  white-space: nowrap;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n}\n.bgSizeCover, .coverImgInner {\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n}\n.coverImgOuter {\n  overflow: hidden;\n}\n.coverImgInner {\n  width: 100%;\n  height: 100%;\n}\n.hoverScaleBig {\n  -webkit-transition: -webkit-transform 0.3s ease-in-out;\n  transition: -webkit-transform 0.3s ease-in-out;\n  -o-transition: transform 0.3s ease-in-out;\n  transition: transform 0.3s ease-in-out;\n  transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;\n  -webkit-transform: scale(1);\n      -ms-transform: scale(1);\n          transform: scale(1);\n}\n.hoverScaleBig:hover {\n  -webkit-transform: scale(1.25);\n      -ms-transform: scale(1.25);\n          transform: scale(1.25);\n}\n.faIcon {\n  margin-right: 5px;\n}\n@media (max-width: 575.9px) {\n.faIcon {\n    margin-right: 3px;\n}\n}\n.afterClearBoth:after {\n  content: "";\n  display: block;\n  clear: both;\n}\n\n/* ------------- */\n/*               */\n/*     MIXIN     */\n/*               */\n/* ------------- */\n.youtubeTutorial {\n  height: 90vh;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.youtubeTutorial .youtubeTutorial__list {\n  width: 320px;\n  border-left: 1px solid #eee;\n  border-right: 2px solid #eee;\n  list-style-type: none;\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  overflow-y: auto;\n}\n.youtubeTutorial .youtubeTutorial__list .youtubeTutorial__listItem {\n  position: relative;\n  width: 100%;\n  padding-left: 60px;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  cursor: pointer;\n}\n.youtubeTutorial .youtubeTutorial__list .youtubeTutorial__listItem:before {\n  position: absolute;\n  left: 0;\n  top: 0;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  width: 50px;\n  content: attr(li-idx);\n  text-align: right;\n}\n.youtubeTutorial .youtubeTutorial__list .youtubeTutorial__listItem:hover, .youtubeTutorial .youtubeTutorial__list .youtubeTutorial__listItem:active {\n  background-color: #f7f7f7;\n}\n.youtubeTutorial .youtubeTutorial__list .youtubeTutorial__listItem + .youtubeTutorial__listItem {\n  border-top: 1px solid #eee;\n}\n@media (max-width: 991.9px) {\n.youtubeTutorial .youtubeTutorial__list {\n    width: 260px;\n    font-size: 0.8rem;\n}\n.youtubeTutorial .youtubeTutorial__list .youtubeTutorial__listItem {\n    padding-left: 50px;\n}\n.youtubeTutorial .youtubeTutorial__list .youtubeTutorial__listItem:before {\n    width: 40px;\n}\n}\n@media (max-width: 767.9px) {\n.youtubeTutorial {\n    display: block;\n}\n.youtubeTutorial .youtubeTutorial__list {\n    display: none;\n    font-size: 0.9rem;\n}\n}\n.youtubeTutorial__content {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  height: 100%;\n  overflow-y: auto;\n  padding-bottom: 30px;\n  border-right: 1px solid #eee;\n}\n@media (max-width: 767.9px) {\n.youtubeTutorial__content {\n    border-right: none;\n}\n.youtubeTutorial__content .youtubeTutorial__contentlist {\n    padding-left: 0;\n    padding-right: 0;\n}\n}\n.youtubeTutorial__contentlist {\n  list-style-type: none;\n  padding-right: 40px;\n  padding-top: 30px;\n}\n.youtubeTutorial__contentlistItem + .youtubeTutorial__contentlistItem {\n  margin-top: 40px;\n}\n.youtubeTutorial__contentlistItemHeader {\n  font-size: 1.2rem;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 10px;\n}\n.youtubeTutorial__iframeContainer6x9 {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 66%;\n}\n.youtubeTutorial__iframeContainer6x9inner {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  border: 1px solid #ccc;\n}\n.youtubeTutorial__iframe {\n  width: 100%;\n  height: 100%;\n}',""])}}]);