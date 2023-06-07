@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/autocomplete-custom.css') }}
  {{ Html::style('css/card-custom.css') }}
  {{ Html::style('css/input-animation-custom.css') }}
  {{ Html::style('css/page_css/site/profile/classroom.css') }}
  {{ Html::style('css/page_css/site/profile/rollcall.css') }}
  {{ Html::style('css/page_css/site/lesson/lesson-qa.css') }}
  {{ Html::style('css/video-js.css') }}
  {{ Html::style('css/datepicker.min.css') }}
  <input type="hidden" id="path" value="{{ $lesson_data->description }}"/>
  <input type="hidden" id="type" value="{{ $lesson_data->type }}"/>
  <input type="hidden" id="l_id" value="{{ $lesson_data->l_id }}"/>
  <input type="hidden" id="member_account" value="{{ $member_data->account }}" />
  <input type="hidden" id="rollcall_status" value="{{ $rollcall_status }}" />
  <script>
    let l_data = {};
    l_data.l_id = {{$lesson_data->l_id}}
    l_data.l_name = '{{$lesson_data->l_name}}';
    l_data.teacher_data = {};
    l_data.teacher_data.m_id = {{ $member_data_for_teacher->m_id }};
      
    memberData = (function (){
      let m_id = {{ $member_data? $member_data->m_id : 'null' }};
      function getMemberId(){
        return m_id;
      }
      return {getMemberId: getMemberId}
    })();
  </script>
  <div class="container">
    @if ($lesson_data->type == 'entity')
      @include('site.personal.lesson.classroom.entity.entity-content')
    @elseif ($lesson_data->type == 'online')
      @include('site.personal.lesson.classroom.online.online-content')
    @endif
  </div>
  <script src="https://cdn.quilljs.com/1.3.3/quill.js"></script>
  <script src="/js/page_js/site/module/image_upload_module.js"></script>
  <script src="/js/page_js/site/module/clear_html_module.js"></script>
  <script src="/js/page_js/site/module/qa_module.js"></script>
  <script src="/js/page_js/site/module/hash_bind_controller.js"></script>
  <script src="/js/page_js/site/profile/classroom.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <script src="/js/videojs-ie8.min.js"></script>
  <script src="/js/video.min.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAf6lxu3iMOhxqhcWquqS_XPBCvqpyrdCE"></script>
  {{ Html::script('js/datepicker.min.js') }}
  {{ Html::script('js/i18n/datepicker.zh.js') }}
@stop
