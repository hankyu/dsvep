@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/page_css/admin/topic/overview.css') }}
  <div class="wrapper">
    <header class="adm_page_header">
      <h2 class="page-title">我的分類</h2>
      <div class="bar_add_topic"><button id="add_topic" class="btn btn-info">新增主題及類別</button></div>
    </header>
    <div class="adm_page_content">
      <div class="topic_scroller_xs">
        <div id="topic_area">
          <div class="topic_list">
            <header onclick="swap_lists(0);">主題<button type="button" class="visible-xs-block" id="swap_category"><span class="fas fa-caret-left"></span></button></header>
            <ul class="ul_topic"></ul>
          </div>
          <div class="category_list">
            <header onclick="swap_lists(1);">類別<button type="button" class="visible-xs-block" id="swap_topic"><span class="fas fa-caret-right"></span></button></header>
            <div class="category_container"><!-- <ul class="ul_category"></ul> --></div>
            
          </div>
        </div>
      </div>
    </div>
      <!-- {{-- @include('admin.topic.overview-table') --}} -->
  </div>
  {{ Html::script('js/page_js/admin/topic/overview.js') }}
@stop