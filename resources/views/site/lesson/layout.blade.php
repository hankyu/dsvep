@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/popup-custom.css') }}
  {{ Html::style('css/loading-animation.css') }}
  {{ Html::style('css/page_css/site/lesson/lesson.css') }}
  {{ Html::style('css/page_css/site/lesson/lesson-qa.css') }}
  {{ Html::style('css/video-js.css') }}
  <input type="hidden" id="path" value="{{ $lesson_data->description }}"/>
  <input type="hidden" id="lesson_id" value="{{ $lesson_data->l_id }}"/>
  <input type="hidden" id="lesson_name" value="{{ $lesson_data->l_name }}"/>
  <input type="hidden" id="cellphone" value="{{ $member_data->cellphone ?? '' }}"/>
  <input type="hidden" id="restrict" value="{{ $restrict}}"/>
  <input type="hidden" id="over_deadline" value="{{ $over_deadline }}"/>
  <script>
      let
        l_data = {};
      @if ($member_data)
        let phoneVerified = {{ $member_data->cellphone_verify_status }};
      @endif

    l_data.l_id = {{$lesson_data->l_id}};
    l_data.l_name = '{{$lesson_data->l_name}}';
    l_data.teacher_data = {};
    l_data.teacher_data.m_id = {{ $l_teacher_data->m_id }},

    memberData = (function (){
      let m_id = {{ $member_data? $member_data->m_id : 'null' }};
      function getMemberId(){
        return m_id;
      }
      return {getMemberId: getMemberId}
    })();
  </script>
  <div class="container">
    <div class="lesson__row">
      <div class="col-md-8 lesson-content">
        @include('site.lesson.content')
      </div>
      <div id="shopping_cart_panel" class="col-md-4 shopping-cart-panel-fixed" data-lesson_data="{{ $lesson_data }}">
        @include('site.lesson.shopping-cart')
      </div>
    </div>
  </div>
  @include('site.lesson.video-mask')
  <div id="mobile_shopping_cart_panel" class="mobile-shopping-cart-panel">
    @include('site.lesson.shopping-cart-mobile')
  </div>
  <script src="/js/page_js/site/module/favorite_module.js"></script>
  <script src="/js/page_js/site/module/image_upload_module.js"></script>
  <script src="/js/page_js/site/module/clear_html_module.js"></script>
  <script src="/js/page_js/site/module/qa_module.js"></script>
  <script src="/js/page_js/site/module/hash_bind_controller.js"></script>
  {{ Html::script('js/page_js/site/module/popup-module.js') }}
  {{ Html::script('js/page_js/site/module/rolling_loading_module.js') }}
  {{ Html::script('js/page_js/site/module/countdown_module.js') }}
  <script src="/js/page_js/site/lesson/lesson.js"></script>
  <script src="https://cdn.quilljs.com/1.3.3/quill.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <script src="/js/videojs-ie8.min.js"></script>
  <script src="/js/video.min.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAf6lxu3iMOhxqhcWquqS_XPBCvqpyrdCE"></script>
@stop
