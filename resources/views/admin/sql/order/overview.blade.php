@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/rwdHashTableModule.css') }}
  {{ Html::style('css/page_css/admin/audit.css') }}
  <div class="container">
    <div class="row">
      <div class="center margintop-30">
        <h2>訂單管理</h2>
      </div>
      <hr>
      <div id="overviewTableContainer">

      </div>
    </div>
  </div>
  {{ Html::script('js/page_js/site/module/hash_bind_controller.js') }}
  {{ Html::script('js/page_js/site/module/rwdHashTableModule.js') }}
  {{ Html::script('js/page_js/admin/sql/order.js') }}
  {{ Html::script('js/page_js/admin/sql/main.js') }}
@stop
