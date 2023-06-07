@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/member/overview.css') }}
  <div class="container">
    <div class="row">
      <div class="center margintop-30">
        <h2>使用者列表</h2>
      </div>
      <hr>
      @include('admin.member.overview-table')
    </div>
  </div>
  {{ Html::script('js/page_js/admin/member/overview.js') }}
@stop
