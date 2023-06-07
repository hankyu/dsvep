@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <div class="center margintop-30">
        <h2>活動管理</h2>
      </div>
      <hr>
      <center>
        <button id="btn_event" class="btn btn-info">新增不參與課程</button>
      </center>
      @include('admin.event.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/event/overview.js') }}
@stop
