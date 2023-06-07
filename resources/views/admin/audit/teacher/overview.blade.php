@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <center>
        <h2 class="page-title">審核講師</h2>
      </center>
      <hr>
      @include('admin.audit.teacher.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/audit/teacher/overview.js') }}
@stop
