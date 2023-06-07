@extends('admin.layout.layout')
@section('content')
  {{ Html::style('css/rwdHashTableModule.css') }}
  <!-- {{ Html::style('css/page_css/admin/accounting/accounting.css') }} -->
  {{ Html::style('css/datepicker.min.css') }}
  {{ Html::style('css/page_css/site/teacher-area/accounting.css') }}
  {{ Html::style('css/popup-custom.css') }}
  <div class="wrapper">
    <div class="center">
      <h2 class="margintop-30">{{ $title }}</h2>
    </div>
    <hr>
      
    <ul id="filter_accounting" class="filter">
      <li class="filter__item active">近一個月</li>
      <li class="filter__item"><p class="datepicker_set"><input id="select_time_range" type="text" class="datepicker-here form-control time_selector" data-multiple-dates-separator=" - " placeholder="選擇日期範圍"><i id="clear_select_date" class="fas fa-times clear-date hide" aria-hidden="true"></i></p></li>
    </ul>
    <p id="accounting_bar">區間總收益：<span id="income_sum"></span></p>

    <div class="chart_container">
      <canvas class="chart" id="main_chart"></canvas>
    </div>

    <div id="table_accounting">
      <div id="tableContainer"></div>
    </div>
  </div>



  <input type="checkbox" id="btnBox" class="hidden-checkbox">
  <div class="box-wrapper">
    <div class="box-content">
      <div class="btn-close">
        <i class="fas fa-times" onclick="boxClose()"></i>
      </div>
      <span id="lesson_title" class="chart-title"></span>
      <div class="chart_container">
        <canvas class="chart" id="lesson_chart"></canvas>
      </div>
    </div>
  </div>
  {{ Html::script('js/page_js/site/module/accountingModule.js') }}
  {{ Html::script('js/page_js/site/module/popup-module.js') }}
  {{ Html::script('js/page_js/site/module/rwdHashTableModule.js') }}
  <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js'></script>
  {{ Html::script('js/page_js/admin/accounting/accounting.js') }}
  {{ Html::script('js/datepicker.min.js') }}
  {{ Html::script('js/i18n/datepicker.zh.js') }}
@stop
