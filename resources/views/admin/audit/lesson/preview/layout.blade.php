@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/lesson/lesson.css') }}
  {{ Html::style('css/video-js.css') }}
  <input type="hidden" id="path" value="{{ $lesson_data->description }}"/>
  <div class="container">
    <div class="row">
      <div class="col-md-8 lesson-content">
        @include('site.teacher.create-lesson.preview.content')
      </div>
      <div id="shopping_cart_panel" class="col-md-4 shopping-cart-panel-fixed" data-lesson_data="{{ $lesson_data }}">
        @include('site.teacher.create-lesson.preview.shopping-cart')
      </div>
    </div>
  </div>
  @include('site.teacher.create-lesson.preview.video-mask')
  <div id="mobile_shopping_cart_panel" class="mobile-shopping-cart-panel">
    @include('site.teacher.create-lesson.preview.shopping-cart-mobile')
  </div>
  <script src="/js/page_js/admin/audit/lesson/preview.js"></script>
  <script src="https://cdn.quilljs.com/1.3.3/quill.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <script src="/js/videojs-ie8.min.js"></script>
  <script src="/js/video.min.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAf6lxu3iMOhxqhcWquqS_XPBCvqpyrdCE"></script>
@stop
