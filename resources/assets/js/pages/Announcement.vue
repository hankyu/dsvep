<style lang="scss">
@import '../../sass/variables';
.announcementBanner {
    width: 100%;
    height: 500px;

    background: {
        image: url(https://i.imgur.com/ImnSG8y.jpg);
        size: cover;
        position: center bottom;
    }
    @media (max-width: $max-w-sm) {
        height: 300px;
    }
}
.announcementArticle {
    font-size: 0.9rem;
    padding-top: 40px;
    padding-bottom: 40px;
}
.announcementArticle + .announcementArticle {
    border-top: 1px solid $lightgray;
}
.announcementArticle__header {
    font-size: 1.5rem;
    font-weight: bold;
}
.announcementArticle__h3 {
    font-size: 1.3rem;
    font-weight: bold;
}
.announcementArticle__ol {
    li + li {
        margin-top: 10px;
    }
}
.announcementArticle__em {
    font-weight: bold;
    color: $complementary1;
}
.announcementArticle__time {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    color: $gray;
    text-align: right;
}
</style>

<template>
    <div class="webPage">
        <div class="announcementBanner"></div>
        <div class="wrapper">
            <h1 class="pageH1">{{ title }}</h1>
        </div>
        <main>
            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">【振興知識一起學!】</h2>
                <p class="announcementArticle__em">輸入活動優惠代碼，立即原價折300元!</p>
                <p>
                    領到振興券了嗎?
                    <br />振興經濟很重要，振興知識也不能漏喔~
                    <br />鼓勵大家一起學，小編要來報好康啦!!😎😎
                </p>
                <p>活動辦法請見下方：</p>
                <p>
                    <span class="announcementArticle__em">優惠代碼： 振興知識</span>
                </p>

                <ul>
                    <li>使用方式：在結帳頁面輸入這組優惠代碼: 振興知識，即可原價折抵300元</li>
                </ul>
                <p>
                    <span class="announcementArticle__em">優惠代碼使用規範：</span>
                </p>
                <ul>
                    <li>活動時間： 即日起~2020/09/30止</li>
                    <li>適用原價 3000元(含)以上的線上/實體課程</li>
                    <li>本優惠不得與其他優惠併用，優惠只能擇一</li>
                </ul>
                <p class="announcementArticle__time">公告時間：2020年07月15日</p>
                <p class="announcementArticle__time">更新時間：2020年07月15日</p>
            </article>
            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">【暑假同學會 揪團上課去】</h2>
                <p class="announcementArticle__em">Show me your 學生證、立即折抵300元!</p>
                <p>
                    準備好怎麼過暑假了嗎?
                    <br />除了在家打game、放空追劇，你還有更多新選擇!
                </p>

                <p>
                    學校沒教的事，趁著暑假學一波，大俠也幫你省一波!
                    <br />
                    <b>即日起只要拿出你的學生證，就能獲得300元實體課程優惠碼喔!</b>
                </p>

                <p>
                    開學別人炫耀遊戲練幾等，你端出神照輕鬆輾壓!
                    <br />不要猶豫學起來 yo~
                </p>
                <p>[活動辦法]</p>
                <p class="announcementArticle__em">在校生如何拿惠碼：</p>
                <ul>
                    <li>加入官方LINE (ID: @dashaphoto)</li>
                    <li>提供學生證照片、平台帳號的Email (需完成驗證) 、想報名的課程，即可索取優惠碼!</li>
                </ul>
                <p class="announcementArticle__em">優惠碼使用規範：</p>
                <ul>
                    <li>2020/6/29-8/31開課之「實體課程」皆可抵用，不限堂數</li>
                    <li>唯獨攝影新手村系列課程，須Level 1+Level 2合報才可使用喔~ (兩堂合報優惠價再折底)</li>
                    <li>本優惠不得與舊生報名優惠或接續報名優惠併用</li>
                </ul>
                <p class="announcementArticle__time">公告時間：2020年06月16日</p>
                <p class="announcementArticle__time">更新時間：2020年06月16日</p>
            </article>
            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">【王牌講師系列講座-高雄場】</h2>
                <p class="announcementArticle__em">高雄的同學我們來啦!!</p>
                <p>
                    ~~高雄場限定! ~~
                    <br />【整體造型職人手冊】線上課的 Yumi 老師要與大家見面啦!
                    <br />英雄薛老師、大俠老師也會跟高雄的同學們現場交流攝影大小事~
                </p>
                <p>
                    ♥️♥️已購買該老師的線上課學員，可免費參加講座♥️♥️
                    <br />是的!! 免、費、喔。(請洽官方LINE - ID: @dashaphoto)
                    <br />不是線上課程學員也不用擔心
                    <br />用少少的錢也能聽到超精彩的內容!
                    <br />名額有限，請把握機會報名!
                </p>↓↓ 更多講座細節 ↓↓
                <p>
                    日期：2020/4/19(日)
                    <br />講座地點：台灣文創-高雄信義館 K134 教室
                    <br />地址：高雄市苓雅區中正二路175號13樓之3 (捷運：信義國小站4號出口50公尺)
                </p>
                <p>
                    【高雄場次表】
                    <br />11:00-12:30 「彩妝師的實戰技巧與攝影師溝通術」- Yumi(菳鈺) 老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/513"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/513</a>
                    <br />13:30-15:00 「創意人像攝影師養成」- HERO(英雄薛) 老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/512"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/512</a>
                    <br />15:30-17:00 「從攝影基礎到全能攝影師」- 大俠 老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/511"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/511</a>
                </p>

                <p class="announcementArticle__time">公告時間：2020年03月18日</p>
                <p class="announcementArticle__time">更新時間：2020年03月18日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">【王牌講師系列講座-台中場】</h2>
                <p class="announcementArticle__em">台中場來囉！</p>
                <p>
                    王牌講師系列講座繼台北場之後，將於 2020/03/14(六) 在台中登場!
                    <br />當天三位線上課王牌講師，與你面對面現場互動~
                    <br />線上課學員還可免費參加!
                    (索取優惠碼請洽官方LINE - ID: @dashaphoto)
                    <br />名額有限，請把握機會報名!
                </p>
                <p>
                    ↓↓ 更多講座細節 ↓↓
                    <br />日期：2020/3/14(六)
                    <br />地點：台灣文創-台中文創館 1301 教室
                    <br />地址：台中市西區台灣大道2段2號13F-1 (台灣大道與五權路交接口，1F為彰化銀行)
                </p>
                <p>
                    【台中場次表】
                    <br />11:00-12:30 「創意人像攝影師養成」- HERO 英雄薛 老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/493"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/493</a>
                    <br />13:30-15:00 「婚攝實戰不NG - 常見錯誤總整理」- 零零 老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/494"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/494</a>
                    <br />15:30-17:00 「從攝影基礎到全能攝影師」- 大俠 老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/495"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/495</a>
                </p>
                <p class="announcementArticle__time">公告時間：2020年02月20日</p>
                <p class="announcementArticle__time">更新時間：2020年02月20日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">全新線上課特別企劃！峰堯直播SHOW！</h2>

                <p class="announcementArticle__em">
                    新鮮出爐的直播主題！
                    <br />跟著老師一起開心學習、玩轉二月！
                </p>

                <!-- <h3 class="announcementArticle__h3">活動內容:</h3>-->
                <p>
                    本月重磅回歸線上課舞台的兩位王牌講師 - 阿峰、堯堯，要來跟大家直播見面囉!
                    <br />準備好了嗎?!
                    <br />跟著小編一起開發老師們的外掛技能，點好點滿!
                </p>
                <p>---</p>
                <p class="announcementArticle__em">
                    直播活動訊息：
                    <br />
                </p>
                <p>
                    ▶ 第一彈：02/14(五)【峰言峰語飆高音 - 閃燈線上問答+K歌點播】
                    <br />▶ 直播時間：02/14(五) 晚上 8:00
                    <br />▶ 直播內容：
                    <br />這次邀請大家在「直播當下提問」，只要跟「閃燈、佈燈相關」的問題都可以喔！
                    <br />提問的人，除了得到老師的專業回覆，
                    <br />還可以從我們準備好的歌單裡，選一個歌曲號碼來進行點歌 ，
                    <br />阿峰老師將
                    live 唱給大家聽!!!
                    <br />預計只開放15個提問、15首歌曲點播，
                    <br />直播時大家務必手腳要快、把握提問&amp;點歌機會!!
                    <br />*注意事項:
                    <br />本次問答以「閃燈、佈燈相關」的問題為主，
                    <br />此範圍以外的問題老師將視情況回答&amp;無點歌優先權唷~
                    <br />
                </p>
                <p>
                    ▶ 第二彈：02/19(三)【Check it 堯! 商品照的誕生！- 手機實拍操作+吃播評圖】
                    <br />▶ 直播時間：02/19(三) 晚上 8:00
                    <br />▶ 直播內容：
                    <br />搭配本次新的線上課程 - 「手機商業攝影」，
                    <br />堯堯老師將在直播現場，實際用手機拍出商品照給你看!
                    <br />你會發現，手機也能拍出好看的商品照喔!
                    <br />實拍示範後，接著是吃播評圖!
                    <br />老師會與大家分享幾張作品進行評圖，跟大家邊吃邊聊!
                </p>
                <p>
                    線上新課資訊看這邊:
                    <br />1- 阿峰老師【離機閃燈練功坊-高質感的光線攻略】
                    <a
                        href="https://www.ds-vep.com/#/lesson/474"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/474</a>
                    <br />2- 堯堯老師【手機商業攝影-拍出高質感商品照】
                    <a
                        href="https://www.ds-vep.com/#/lesson/475"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/475</a>
                </p>
                <p class="announcementArticle__time">公告時間：2020年01月30日</p>
                <p class="announcementArticle__time">更新時間：2020年01月30日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">大俠鼠鼠新年快樂！- 開運紅包送給你！</h2>

                <!-- <p>突擊直播!! 布魯克老師拍攝實況</p>

                <h3 class="announcementArticle__h3">活動內容:</h3>-->

                <p class="announcementArticle__em">小編要來發紅包啦！</p>
                <p>
                    前往 【大俠攝影教室】粉絲專頁的活動貼文:
                    <a
                        href="https://supr.link/Zpx98"
                        target="_blank"
                    >https://supr.link/Zpx98</a>
                    底下留言「大俠鼠鼠新年快樂」+分享這則貼文，
                </p>
                <p>即可獲得500元鼠年開運大紅包！</p>
                <p>小編會私訊您紅包內容(優惠代碼)，</p>
                <p>實體或線上課程都能使用！(是課程「原價」折抵喔~)</p>
                <p>---</p>
                <p>✔紅包發放時間: 1/18~1/22 晚上8:00</p>
                <p>✔紅包使用時間: 1/18~2/5 晚上11:59:59</p>
                <p>
                    紅包這邊領 →
                    <a
                        href="https://supr.link/Zpx98"
                        target="_blank"
                    >https://supr.link/Zpx98</a>
                </p>
                <p>
                    紅包這裡花 →
                    <a href="https://www.ds-vep.com/">https://www.ds-vep.com/</a>
                </p>
                <p>&lt;使用限制&gt;</p>
                <p>1- 僅適用 2600 元以上的線上及實體課程</p>
                <p>2- 不適用 #471 澎湖花火攝影團</p>
                <p>3- 此活動與其他課程優惠，只能擇一使用</p>
                <p class="announcementArticle__time">公告時間：2020年1月18日</p>
                <p class="announcementArticle__time">更新時間：2020年1月18日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">【王牌講師系列講座】</h2>

                <!-- <p>突擊直播!! 布魯克老師拍攝實況</p>

                <h3 class="announcementArticle__h3">活動內容:</h3>-->

                <p class="announcementArticle__em">2020年初特別企劃來囉！</p>
                <p>王牌講師系列講座將於 2020/01/18(六) 登場!</p>
                <p>當天三位線上課王牌講師，與你面對面現場互動~</p>
                <p>線上課學員還可免費參加! (索取優惠碼請洽官方LINE - ID: @dashaphoto)</p>
                <p>名額有限，請把握機會報名!</p>
                <p>
                    <br />
                </p>
                <p>👇👇更多講座細節👇👇</p>
                <p>
                    - 日期：2020/1/18 (六)
                    <br />- 地點：台北市延平南路12號3樓（台北延平教室）
                </p>
                <p>
                    10:00-11:30 【從攝影基礎到全能攝影師】- 大俠老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/465"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/465</a>
                </p>
                <p>
                    13:00-14:30 【閃光燈 Face to Face】- 阿峰老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/463"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/463</a>
                </p>
                <p>
                    15:00-16:30 【人像攝影 Learn Better】- Lane Chen 老師
                    <br />
                    <a
                        href="https://www.ds-vep.com/#/lesson/464"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/464</a>
                </p>
                <p class="announcementArticle__time">公告時間：2019年12月30日</p>
                <p class="announcementArticle__time">更新時間：2019年12月30日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">【小編很NOW】</h2>

                <p>突擊直播!! 布魯克老師拍攝實況</p>

                <h3 class="announcementArticle__h3">活動內容:</h3>

                <p>小編又要去鬧老師了!</p>
                <p>這次要鬧什麼呢???</p>
                <p>來~小編帶大家「直擊」布老師線上課的拍攝實況!</p>
                <p class="announcementArticle__em">12/27(五) 當天不定時直播</p>
                <p class="announcementArticle__em">
                    請隨時關注我們的
                    <a
                        href="https://www.youtube.com/channel/UCFnVApwdtxMIsxiu77h7-gw"
                        target="_blank"
                    >YouTube頻道</a>
                    &amp;
                    <a
                        href="https://www.facebook.com/dashalearning"
                        target="_blank"
                    >FB粉絲專頁</a>!
                </p>
                <p></p>
                <p>--</p>
                <p></p>
                <p>布魯克老師的【全方位風景攝影技巧】線上課程</p>
                <p>早鳥第二波優惠價 2880 元! (原價3600元)</p>
                <p>即日起 ~ 2020/01/03，大家不要錯過囉!</p>
                <p>
                    課程資訊看這裡 →
                    <a
                        href="https://www.ds-vep.com/#/lesson/437"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/437</a>
                </p>
                <p class="announcementArticle__time">公告時間：2019年12月19日</p>
                <p class="announcementArticle__time">更新時間：2019年12月19日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">「布」怕你來問！</h2>
                <p>布魯克老師 快問快答50題 - 線上直播</p>
                <h3 class="announcementArticle__h3">活動內容:</h3>
                <p>風景怎麼拍都少一味? Don't worry~</p>
                <p>
                    前往 【大俠攝影教室】粉絲專頁活動貼文，留言寫下你的問題 →
                    <a
                        href="https://supr.link/3wCBM"
                        target="_blank"
                    >https://supr.link/3wCBM</a>
                </p>
                <p>
                    <em class="announcementArticle__em">12/17(二) 晚上8:00</em>，布老師將在直播中一一解答!
                </p>
                <p>&nbsp;</p>
                <p>別忘了~ 布老師的【全方位風景攝影技巧】線上課程</p>
                <p>早鳥優惠價 2680元，只到 2019/12/16 喔！(原價 3600 元)</p>
                <p>
                    把握機會前往報名 →
                    <a
                        href="https://www.ds-vep.com/#/lesson/437"
                        target="_blank"
                    >https://www.ds-vep.com/#/lesson/437</a>
                </p>

                <p class="announcementArticle__time">公告時間：2019年12月10日</p>
                <p class="announcementArticle__time">更新時間：2019年12月10日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">1+1 學習月 ❤ 就愛一起學 ❤ 限定優惠</h2>
                <p>所有線上課程 1+1 現抵 1000 元！(500元/堂)</p>
                <h3 class="announcementArticle__h3">活動內容:</h3>1+1 學習月專屬優惠，線上課任兩堂即可現折 1000 元！(單堂折抵500元)
                <p>快點揪伴買起來！</p>
                <p>邀請朋友家人一起學，不限時間地點，一南一北、跨國也 ok！</p>
                <p>如果你跟R小編一樣邊緣沒關係(誤)，自己選兩堂也能現折 1000 元喔！(單堂折抵500元)</p>
                <p>
                    ❤活動辦法: 臉書私訊小編 ①學習平台註冊的 email ②手機號碼
                    ③想報名的課程名稱，即可領取專屬優惠碼唷！
                </p>
                <p>❤活動時間: 即日起~11/30(六)</p>
                <p>優惠碼「領取截止」: 11/29(五) 晚上 08:00 前</p>
                <p>優惠碼「使用期限」: 11/30(六) 晚上 12:00 前</p>
                <p>挑好課程後，馬上前往【大俠攝影教室】粉絲專頁 私訊小編 : https://supr.link/aFfdy</p>
                <p>---</p>
                <p>！特別追加！</p>
                <p>❤ 愛分享 ❤ 好禮愛相送 - 臉書抽獎活動</p>
                <p>
                    前往 【大俠攝影教室】粉絲專頁
                    <a
                        href="https://supr.link/aFfdy"
                        target="_blank"
                    >https://supr.link/aFfdy</a>
                </p>
                <p>
                    在活動貼文底下
                    <em class="announcementArticle__em">留言@一位朋友 [ 學攝影就是要找大俠! ]</em>
                    並分享貼文(設為公開)，就有機會獲得攝影周邊好禮！
                </p>
                <p>11/21(四) 晚上 8:00 直播抽獎，將送出 1+1 兩個獎品:</p>
                <ol>
                    <li>BLAZZEO 五合一反光板 (FR80)</li>
                    <li>JENOVA 經典系列功能相機包 (NS-115L)</li>
                </ol>
                <p>快點邀請朋友一起留言分享吧 :)</p>
                <p class="announcementArticle__time">公告時間：2019年11月10日</p>
                <p class="announcementArticle__time">更新時間：2019年11月10日</p>
            </article>

            <article class="wrapper announcementArticle">
                <h2 class="announcementArticle__header">《大俠學習平台》官方網站全新改版上線！</h2>
                <p>感謝各位對《大俠學習平台》的長期支持，為了提供同學更優質的教學內容與服務，即日起我們將推出全新教學平台與大家見面。</p>
                <p class="announcementArticle__h3">詳細改版注意事項</p>
                <ol class="announcementArticle__ol">
                    <li>因應新平台上線，舊有網站報名表將全數關閉，請欲報名課程的同學至新平台註冊會員→登入系統→選擇課程→完成繳費手續即報名成功。</li>
                    <li>新生優待方案、舊生優待方案、任選組合優待方案將從2018年9月7日截止，最後繳費期間為2018年9月14日，若未在最後繳費期間內繳費，則優惠過期取消，恕不另行告知。</li>
                    <li>
                        若欲使用新生優待方案、舊生優待方案、任選組合優待方案的同學，請於2018年9月7日前至新平台完成註冊後透過官方LINE:@dashaphoto
                        或 MAIL:eason.yea@gmail.com
                        提供新平台帳號，由客服人員另提供折扣優惠代碼，並於2018年9月14日前完成繳費。
                    </li>
                    <li>已有報名課程但尚未繳費的同學，請至新平台註冊會員後重新報名課程及完成繳費手續</li>
                    <li>如有報名課程並完成繳費手續，但尚未註冊教學平台會員的同學，請完成註冊後透過官方LINE或MAIL來信提供新平台帳號，由客服人員協助完成資料轉移。</li>
                    <li>《歡慶教學平台全新改版上線》優惠代碼不得與其他優惠合併使用。</li>
                    <li>《歡慶教學平台全新改版上線》優惠代碼僅適用於單價2500元以上課程使用。（此活動截至2018年12月31日）</li>
                    <li>如有任何未盡事宜，本單位《大俠學習平台》得隨時補充修正之。</li>
                </ol>
                <p class="announcementArticle__time">公告時間：2018年9月4日</p>
                <p class="announcementArticle__time">更新時間：2019年3月6日</p>
            </article>
        </main>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'

export default {
    name: 'Announcement',
    data: function() {
        return {
            title: JS_CONFIG.TERMS.PAGE_TITLE.ANNOUNCEMENT
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