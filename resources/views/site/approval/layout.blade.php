@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/rwdHashTableModule.css') }}
  {{ Html::style('css/page_css/admin/member/overview.css') }}
  <link rel="stylesheet" href="{{ asset('https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css') }}" />
  <link rel="stylesheet" href="{{ asset('https://cdn.datatables.net/responsive/2.1.1/css/responsive.bootstrap.min.css') }}" />
  <div class="container">
    <div class="row">
      <div class="center margintop-30">
        <h2>報名管理系統</h2>
      </div>
      <hr>
      <button id="order_search" class="btn btn-primary">查詢訂單</button>
      <button id="expire_search" class="btn btn-success">查詢過期課程</button>
      <button id="member_search" class="btn btn-warning">查詢學生歷程</button>
      <div id="overviewTableContainer"></div>
    </div>
  </div>
  {{ Html::script('js/page_js/site/module/hash_bind_controller.js') }}
  {{ Html::script('js/page_js/site/module/rwdHashTableModule.js') }}
  {{ Html::script('js/page_js/site/approval/approval.js') }}
  {{ Html::script('js/jquery.tablesorter.js') }}
  {{ Html::script('js/jquery.tablesorter.widgets.js') }}
  <script src="{{ asset('https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js') }}"></script>
  <script src="{{ asset('https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap.min.js') }}"></script>
  <script src="{{ asset('https://cdn.datatables.net/responsive/2.1.1/js/dataTables.responsive.min.js') }}"></script>
  <script src="{{ asset('https://cdn.datatables.net/responsive/2.1.1/js/responsive.bootstrap.min.js') }}"></script>
@stop
