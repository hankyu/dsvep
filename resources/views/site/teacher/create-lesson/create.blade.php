@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/teacher-area/create-lesson.css') }}
  <section class="header-pic">
    <div class="animatedParent">
      <div class="header-content animated fadeInUp text-center">
        <p>知識與專業轉化成一堂堂的課程<br />
          在大俠這裏分享、互惠<br />
          馳騁在浩瀚的知識草原中</p>
        <button id="btn_create" class="btn-create btn-scroll animated fadeInDown">開始創建課程</button>
      </div>
    </div>
  </section>
  {{ Html::script('js/page_js/site/teacher-area/create.js') }}
@stop
