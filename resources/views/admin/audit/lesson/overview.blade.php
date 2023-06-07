@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <center>
        <h2 class="page-title">審核課程</h2>
      </center>
      <hr>
      @include('admin.audit.lesson.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/audit/lesson/overview.js') }}
@stop
