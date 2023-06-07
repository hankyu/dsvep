@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/profile/lesson-overview.css') }}
  <input type="hidden" id="expired" value="{{ $expired ?? '' }}">
  <div class="container lesson-overview-wrapper">
    <div class="center">
      <h1>我的課程</h1>
      <hr />
    </div>
    <div class="container lesson-overview-menu">
      <a class="lesson-overview-menu-item active" href="#" id="all"><span>全部</span></a>
      <a class="lesson-overview-menu-item" href="#" id="entity"><span>實體<span class="hidden-xs">課程</span></span></a>
      <a class="lesson-overview-menu-item" href="#" id="online"><span>線上<span class="hidden-xs">課程</span></span></a>
    </div>
    @include('site.personal.lesson.overview.lesson-overview')
  </div>
  {{ Html::script('js/page_js/site/profile/lesson-overview.js') }}
@stop
