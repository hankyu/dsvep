@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <center>
        <h2 class="page-title">瀏覽歷程統計</h2>
      </center>
      <hr>
      @include('admin.statistic.browse_analyze.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/statistic/browse_analyze.js') }}
@stop
