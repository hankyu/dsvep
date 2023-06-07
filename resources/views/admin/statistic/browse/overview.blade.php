@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <center>
        <h2 class="page-title">使用者瀏覽歷程</h2>
      </center>
      <hr>
      @include('admin.statistic.browse.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/statistic/browse.js') }}
@stop
