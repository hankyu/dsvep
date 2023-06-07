@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/teacher-area/overview.css') }}
  <div class="icon-fixed" data-toggle="tooltip" data-placement="bottom" title="新增課程">
    <a href="create">
      <div class="icon-wrapper">
        <i class="fa fa-plus fa-2x"></i>
      </div>
    </a>
  </div>
  <div class="container">
    <div class="row">
      <center>
        <h2 class="margintop-30">課程管理</h2>
      </center>
      <hr>
      <div class="overview-menu">
          <a id="all" class="overview-menu-item click-cursor all active"><span>全部</span></a>
          <a id="draft" class="overview-menu-item click-cursor bg-draft"><span>草稿</span></a>
          <a id="publish" class="overview-menu-item click-cursor bg-emphasized4"><span>已發佈</span></a>
          <a id="audit" class="overview-menu-item click-cursor bg-emphasized3"><span>審核中</span></a>
          <a id="fail" class="overview-menu-item click-cursor bg-fail"><span>審核失敗</span></a>
      </div>
      <div class="overview-menu">
          <div id="sort_create_date" class="overview__menu__item__sort click-cursor sort__create__date active">
              <i class="fas fa-sort-up" aria-hidden="true"></i>
              <span>創建日期</span>
          </div>
      </div>
      <div class="indList list-unstyled">

        <div id="teacher_lesson" class="owl-theme">
        </div>

        <div id="data_not_found" class="not-found row center block">
            <span>找不到任何課程資料</span>
        </div>

        <div id="loading_lesson" class="loading-lesson col-xs-12" style="display: none;">
            <span>載入課程中</span>
        </div>

        <div id="loaded_all_lesson" class="loaded-all-lesson col-xs-12" style="display: none;">
            <span class="loaded-text">已載入所有課程</span>
        </div>

      </div>
    </div>
  </div>
  {{ Html::script('js/page_js/site/teacher-area/overview.js') }}
@stop
