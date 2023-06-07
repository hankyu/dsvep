@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/contact/about.css') }}
  <header class="header header-about">
  </header>
  <div class="container">
    <div class="row body">
      <h5>起源</h5>
      <blockquote>
        「我喜歡拍照，也喜歡教學，為什麼不把這個興趣當工作，把我所會的攝影知識和更多人分享！」。
        <label class="quote-name"> - CEO 大俠</label>
      </blockquote>
      <article class="marginbot-10">
        秉持這單純的理念，於2008年創立「大俠學習平台」，2011年設立「大俠數位攝影有限公司」，
        大俠學習平台是目前全台課程種類最廣泛，師資最多，開班頻率最高，開班地區最多的攝影教學單位。提供豐富的教學資源，秉持著「希望所有學習攝影的朋友，都有正確的攝影觀念」為宗旨，不間斷地提高教學品質，持續在攝影教學的領域中努力。
      </article>
      <div>
        <ul>
          <li><h5>特色</h5></li>
          <li>(一)專業開班、提供學員&amp;單位所需的攝影課程內容。</li>
          <li>(二)師資及課程種類多、提供最完整的學習。</li>
          <li>(三)攝影相關資源多，專業服務人員，品質有保障。</li>
          <li>(四)提供專業攝影棚於教學使用。</li>
          <li>(五)課堂理論與外拍實習緊密結合，讓學員結業後能獨立拍攝想要的作品。</li>
        </ul>
      </div>
      <hr>
      <div>
        <ul>
          <li><h5>使命</h5></li>
          <li>(一)辦理各類室內與戶外攝影交流活動。</li>
          <li>(二)辦理攝影講師師資培訓課程，培訓專業攝影講師。</li>
          <li>(三)辦理攝影師培訓課程，培訓職業攝影人才。</li>
          <li>(四)辦理攝影師評核，對於國內攝影師進行專業認證。</li>
          <li>(五)辦理攝影創作比賽，以提升攝影人才創作能力。</li>
        </ul>
      </div>
    </div>
  </div>
  <header class="header header-sevrice">
  </header>
  <div class="container">
    <div class="body">
      <div class="diamond">
        <div class="item"><a href="/becometeacher"><div class="inner">成為講師</div></a></div>
        <div class="item"><a href="/lesson/all?type=0"><div class="inner">實體課程</div></a></div>
        <div class="item"><a href="/lesson/all?type=1"><div class="inner">線上課程</div></a></div>
      </div>
    </div>
  </div>
@stop
