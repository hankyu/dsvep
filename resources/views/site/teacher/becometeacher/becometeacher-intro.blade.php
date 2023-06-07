@extends('site.layout.layout')
@section('content')
    {{ Html::style('css/page_css/site/teacher-area/become-teacher.css')}}
    <div id="summary" class="active">
        <section class="header-pic">
            <div class="animatedParent">
                <div class="header-content animated fadeInUp go text-center">
                    <h1 class="page-title">申請講師資格</h1>
                    <p class="p-over-bgim">全國唯一<br class="visible-xs-inline">線上課程搭配實體課程的學習平台<br>
                    亦有專屬授課教室提供</p>
                    @if ($member_data != '')
                        <button id="btn_become_teacher_introduce" class="btn-become-teacher-introduce btn-create btn-scroll animated fadeInDown go">成為講師</button>
                    @else
                        <button id="btn_become_teacher_login" class="btn-become-teacher-introduce btn-create btn-scroll animated fadeInDown go">成為講師</button>
                    @endif
                </div>
            </div>
        </section>
        <div class="section-slogan">
            <p>
                有滿腹分享的熱誠<br class="visible-xs-inline">卻找不到人交流？<br>
                對於教學有興趣<br class="visible-xs-inline">卻苦於不知如何開始嗎?<br>
                在這裡你可以找到<br class="visible-xs-inline">志同道合的同仁！<br>
                一起帶領同學玩轉新視界<br>
                若你和我們有一樣的熱忱<br class="visible-xs-inline">就加入大俠學習平台一展長才吧！
            </p>
        </div>
        <div class="container" id="features">
            <div class="row">
                <div class="feature-card col-md-3 col-sm-6 text-center">
                    <figure class="feature-icon"><img src="/img/icon-feature-1.svg" alt="多元開課"></figure>
                    <h3>多元開課</h3>
                    <p class="feature-sub-title">任何人都可以開課</p>
                    <p class="feature-desc">只要將您的專長或興趣設計成課程，就可以幫助更多人</p>
                </div>
                <div class="feature-card col-md-3 col-sm-6 text-center">
                    <figure class="feature-icon"><img src="/img/icon-feature-2.svg" alt="線上課程"></figure>
                    <h3>線上課程</h3>
                    <p class="feature-sub-title">創造被動收入</p>
                    <p class="feature-desc">每個月學生持續購買您的課程，就能有被動收入</p>
                    <p class="feature-desc">能教的課程越多，學生就越多，講師的被動收入就越多</p>
                </div>
                <div class="feature-card col-md-3 col-sm-6 text-center">
                    <figure class="feature-icon"><img src="/img/icon-feature-3.svg" alt="線下實做"></figure>
                    <h3>線下實做</h3>
                    <p class="feature-sub-title">翻轉教育提升學習成效</p>
                    <p class="feature-desc">將重覆性的上課內容拍成線上課程，講師就不用一直講一樣的東西</p>
                    <p class="feature-desc">讓講師在實體課程跟學生討論並且實做，直接解決學生遇到的問題</p>
                </div>
                <div class="feature-card col-md-3 col-sm-6 text-center">
                    <figure class="feature-icon"><img src="/img/icon-feature-4.svg" alt="功能齊全"></figure>
                    <h3>功能齊全</h3>
                    <p class="feature-sub-title">提供金流、行政、學員管理等功能</p>
                    <p class="feature-desc">讓講師專心教課、開發新課程，不再被繁鎖的雜事牽絆</p>
                </div>
            </div>
        </div>
        <div class="section-diagram">
            <img class="fadeIn animated go slower" src="/img/diagram-feature.svg" alt="平台特色功能圖">
        </div>
        <div class="section-become-teacher">
            <p class="p-over-bgim">就是如此簡單幾個步驟，即可成為講師</p>
            @if ($member_data != '')
                <button id="btn_become_teacher_introduce_footer" class="btn-become-teacher-introduce btn-create btn-scroll">成為講師</button>
            @else
                <button id="btn_become_teacher_login_footer" class="btn-become-teacher-introduce btn-create btn-scroll">成為講師</button>
            @endif
        </div>
    </div>
    {{ Html::script('js/page_js/site/teacher-area/becometeacher.js') }}
@stop
