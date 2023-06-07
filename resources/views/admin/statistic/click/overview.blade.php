@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <center>
        <h2 class="page-title">會員點擊歷程列表</h2>
      </center>
      <hr>
      @include('admin.statistic.click.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/statistic/click.js') }}
@stop
