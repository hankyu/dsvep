@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/teacher-area/create-lesson.css?date=' . time()) }}
  {{ Html::style('css/datepicker.min.css?date=' . time()) }}
  <input type="hidden" id="_auth_situation" value="{{ session()->get('auth', '') }}" />
  <input type="hidden" id="step" value="{{ $step_num }}" />
  <input type="hidden" id="account" value="{{ $account }}" />
  <input type="hidden" id="lesson_id" value="{{ $lesson_data->l_id }}" />
  <input type="hidden" id="teacher_id" value="{{ $lesson_data->t_id }}"/>
  <input type="hidden" id="pub_s" value="{{ $lesson_data->pub_situation == true ? 1 : 0 }}" />
  <input type="hidden" id="old_topic" value="{{ $lesson_data->topic }}" />
  <input type="hidden" id="old_category" value="{{ $lesson_data->category }}" />
  <input type="hidden" id="old_lesson_expire" value="{{ $lesson_data->lesson_expire }}" />
  <div class="container">
    @if (isset($teacher_data))
      @if ($teacher_data->t_id == $lesson_data->t_id)
        <h3><a href="/teacher/lesson/overview">←回課程管理頁面</a></h3>
      @else
        <h3><a href="/teacher/{{ $lesson_data->t_id }}">←回課程管理頁面</a></h3>
      @endif
    @else
      <h3><a href="/teacher/{{ $lesson_data->t_id }}">←回課程管理頁面</a></h3>
    @endif
    <div class="row page">
      <div class="col-md-3 sidebar">
        @include('site.teacher.create-lesson.sidebar')
      </div>
      <div>
        @yield('create-content')
      </div>
    </div>
  </div>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  {{ Html::script('js/page_js/site/teacher-area/create.js?date=' . time()) }}
  {{ Html::script('js/datepicker.min.js?date=' . time()) }}
  {{ Html::script('js/i18n/datepicker.zh.js?date=' . time()) }}
@stop
