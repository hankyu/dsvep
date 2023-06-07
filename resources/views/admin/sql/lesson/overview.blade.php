@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <div class="center margintop-30">
        <h2>課程管理</h2>
      </div>
      <hr>
      @include('admin.sql.lesson.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/sql/lesson.js') }}
  {{ Html::script('js/page_js/admin/sql/main.js') }}
@stop
