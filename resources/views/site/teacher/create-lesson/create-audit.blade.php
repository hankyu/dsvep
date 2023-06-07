@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/teacher-area/create-lesson.css') }}
  <div class="auditing-img">
    @if (isset($teacher_data))
      @if ($teacher_data->auth_situation == 'success')
        <h3><a href="/teacher/lesson/overview">←回課程管理頁面</a></h3>
      @else
        <h3><a href="/">←回首頁</a></h3>
      @endif
    @else
      <h3><a href="/">←回首頁</a></h3>
    @endif
    <img src="/img/becometeacher/auditing.png" style="height: 50vmin;"/>
  </div>
@stop
