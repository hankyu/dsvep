@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/profile/order.css') }}
  <input type="hidden" id="m_id" value='{{ $member_data->m_id }}' />
  <div class="container">
    <div class="center margintop-30">
      <h1>我的訂單</h1>
      <hr />
    </div>
    @if (count($order_data) == 0)
      <div class="no-content">
        <span>找不到任何訂單資料</span>
      </div>
    @else
      <div class="order-menu">
        <a class="order-menu-item active" href="#" id="all"><span>全部</span></a>
        <a class="order-menu-item bg-not-pay" href="#" id="not_pay"><span>未付款</span></a>
        <a class="order-menu-item bg-pay" href="#" id="pay"><span>已付款</span></a>
        <a class="order-menu-item bg-cancel" href="#" id="cancel" data-container="body" data-toggle="popover" data-placement="bottom" data-content="訂單逾期未繳費，或付款資料輸入錯誤。"><span>已失效</span></a>
      </div>
      <div id="data_not_found" class="no-content block">
        <span>找不到任何訂單資料</span>
      </div>
      @include('site.personal.order.order-list')
    @endif
  </div>
  {{ Html::script('js/page_js/site/profile/order.js') }}
@stop
