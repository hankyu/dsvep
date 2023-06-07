@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/all-lesson/all-lesson.css')}}
  {{ Html::style('css/datepicker.min.css') }}
  {{ Html::style('css/wishing.css') }}
  <div class="container">
    <div class="center margintop-30">
        <h1>{{ $title }}</h1>
        <hr />
    </div>
    <div id="filter-condition-wrapper" class="container filter-condition-wrapper">
        <p class="filter-condition-title">篩選條件</p>
        <div class="filter-label">
            <ul id="filter-label-list" class="flex-row">
            </ul>
        </div>
        <div class="filter-wrapper">
            <div id="clear_filter_label" class="btn clear-filter-btn" type="button" name="button">清空條件</div>
        </div>
        <hr />
    </div>
    <div class="container menu">
        <a class="menu-filter-item active" id="btn_all"><span>全部</span></a>
        <a class="menu-filter-item" id="btn_type"><span>實體/線上</span></a>
        <a class="menu-filter-item category" id="btn_teacher"><span>講師篩選</span></a>
        <a class="menu-filter-item category" id="btn_category"><span id="category_text">類別篩選</span></a>
        <a class="menu-filter-item category" id="btn_area"><span id="area_text">地區篩選</span></a>
        <span class="menu-filter-item" id="span_time">
            <input id="select_time_range" type="text" class="datepicker-here form-control time_selector" data-multiple-dates-separator=" - " placeholder="選擇課程上課日期範圍">
            <i id="clear_select_date" class="fas fa-times clear-date hide" aria-hidden="true"></i>
        </span>
    </div>
    <div class="type-wrapper">
        <div class="icon-close row">
            <span onclick="_close_type_wrapper()"><i class="fas fa-times" aria-hidden="true"></i></span>
        </div>
        <div class="type-card row">
            <div class="col-md-2">
                <span class="type-title">選擇類型</span>
            </div>
            <div class="type-menu col-md-10">
            </div>
        </div>
    </div>
    <div class="teacher-wrapper">
        <div class="icon-close row">
            <span onclick="_close_teacher_wrapper()"><i class="fas fa-times" aria-hidden="true"></i></span>
        </div>
        <div class="teacher-card row">
            <div class="col-md-2">
                <span class="teacher-title">熱門講師</span>
            </div>
            <div class="hot-teacher-menu col-md-10">
            </div>
        </div>
        <div class="teacher-card row">
            <div class="col-md-2">
                <span class="teacher-title">講師</span>
            </div>
            <div class="teacher-menu col-md-10">
            </div>
        </div>
        <div id="teacher-more-card" class="teacher-more-card row">
            <hr />
            <div class="center">
                <span id="more_teachers">
                    <i class="fas fa-angle-double-down"></i>
                    更多講師
                </span>
                <span id="loading_text" style="display: none;">
                    載入中...
                </span>
            </div>
        </div>
    </div>
    <div class="category-wrapper">
        <div class="icon-close row">
            <span onclick="_close_category_wrapper()"><i class="fas fa-times" aria-hidden="true"></i></span>
        </div>
    </div>
    <div class="area-wrapper">
        <div class="icon-close row">
            <span onclick="_close_area_wrapper()"><i class="fas fa-times" aria-hidden="true"></i></span>
        </div>
        <div class="area-card row">
            <div class="col-md-2">
                <span class="area-title">選擇地區</span>
            </div>
            <div class="area-menu col-md-10">
            </div>
        </div>
    </div>
    <div class="container menu">
        <a class="menu-item bg-default" id="btn_time"><i class="fas fa-sort-up" aria-hidden="true"></i><span>最新</span></a>
        <a class="menu-item bg-popular" id="btn_popular"><i class="fas fa-sort-up" aria-hidden="true"></i><span>熱門</span></a>
        <a class="menu-item bg-complementary1 hidden" id="btn_wishing"><i class="fa" aria-hidden="true"></i><span>許願池</span></a>
        {{-- <a class="menu-item bg-price" id="btn_price"><i class="fa" aria-hidden="true"></i><span>價格</span></a> --}}
        {{-- <a class="menu-item bg-fundraising" id="btn_fundraising"><i class="fas fa-sort-down" aria-hidden="true"></i><span>評價</span></a> --}}
    </div>
    @include('site.all-lesson.all-lesson')
  </div>

  {{ Html::script('js/page_js/site/layout/checkbox_module.js') }}
  {{ Html::script('js/page_js/site/layout/wishing_module.js') }}
  {{ Html::script('js/page_js/site/all-lesson/all-lesson.js') }}
  {{ Html::script('js/datepicker.min.js') }}
  {{ Html::script('js/i18n/datepicker.zh.js') }}
@stop
