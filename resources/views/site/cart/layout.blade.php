@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/popup-custom.css') }}
  {{ Html::style('css/loading-animation.css') }}
  {{ Html::style('css/page_css/site/cart/cart.css') }}
  <div class="container">
    <div class="row cart-content">
      <div class="cart-title">
      </div>
      @if ($lesson_data->type == "entity")
        <div class="col-xs-12 col-sm-4 cart-item-image entity">
          {{ Html::image('media/' . $lesson_data->l_id . '/cover/' . $lesson_data->cover) }}
          <div class="lesson-type-label">
            <span>實體</span>
          </div>
        </div>
      @elseif ($lesson_data->type == "online")
        <div class="col-xs-12 col-sm-4 cart-item-image online">
          {{ Html::image('media/' . $lesson_data->l_id . '/cover/' . $lesson_data->cover) }}
          <div class="lesson-type-label">
            <span>線上</span>
          </div>
        </div>
      @endif
      <div class="col-xs-0 col-sm-8 lesson-data">
        <span>{{ $title }}</span><br>
        <span>開課時間：{{ $lesson_data->start_time }}</span><br>
        <span>付款金額：{{ strtotime(date('Y-m-d')) > strtotime($lesson_data->end_fund) ? $lesson_data->origin_fee : $lesson_data->offer_fee }}</span><br>
      </div>
    </div>

    {!! Form::open(['url' => 'cart/direct/spgateway', 'id' => 'cart_form', 'method' => 'post']) !!}
      <div class="member-wrapper row">
        <div class="member-card">
          <input id="member_data" type="checkbox" class="hidden" checked>
          <label class="member-label" for="member_data"><i class="fa fa-chevron-down"></i> 購買人資料</label>
          <div class="member-data-content row">
            <div class="col-xs-12 col-sm-6 marginbot-20">
              <span class="input-title">買受人<span class="color-emphasized2">*</span></span>
              <input class="form-control" id="buyer_name" type="text" value="{{ $member_data->nickname }}" required>
            </div>
            <div class="col-xs-12 col-sm-6 marginbot-20">
              <span class="input-title">公司抬頭</span>
              <input class="form-control" id="buyer_company" type="text" value="{{ $member_data->company_name }}">
            </div>
            <div class="col-xs-12 col-sm-6 marginbot-20">
              <span class="input-title">信箱<span class="color-emphasized2">*</span></span>
              <input class="form-control" name="buyer_mail" id="buyer_mail" type="text" value="{{ $member_data->email }}" required>
            </div>
            <div class="col-xs-12 col-sm-6 marginbot-20">
              <span class="input-title">手機(不需加符號)<span class="color-emphasized2">*</span></span>
              <div class="cellphoneInputContainer">
                <div class="cellphoneInputSet">
                  <div class="cellphoneInputSet__input">
                    <input class="form-control" id="buyer_phone" type="text" value="{{ $member_data->cellphone }}" {{ $member_data->cellphone_verify_status == 1? 'disabled="disabled"' : '' }} required>
                  </div>
                  <div class="cellphoneInputSet__btns">
                    <button type="button" id="btn_verify_cellphone" class="btn btn-success{{ $member_data->cellphone_verify_status == 1? ' hidden': '' }}">驗證手機</button>
                    <button type="button" id="btn_refill_cellphone" class="btn btn-info{{ $member_data->cellphone_verify_status == 0? ' hidden': '' }}">修改手機</button>
                  </div>
                </div>
                <div id="hint_phone" class="hintPhone hidden">
                  請輸入數字（不需輸入符號），若非中華民國手機號碼，請在前面直接加入國碼。<br>
                  美國1、日本81、中國86、香港852、澳門853、馬來西亞60、新加坡65&hellip;<a href="https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E7%94%B5%E8%AF%9D%E5%8C%BA%E5%8F%B7%E5%88%97%E8%A1%A8" target="_blank">更多</a>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 marginbot-20">
              <span class="input-title">地址(統編需要)</span>
              <input class="form-control" id="buyer_address" type="text" value="{!! str_replace('-', '', $member_data->address) !!}">
            </div>
          </div>
        </div>
      </div>

      <div class="row cart-content cart-check">
        @include('site.cart.total')
      </div>
    {!! Form::close() !!}
  </div>
  {{ Html::script('js/page_js/site/module/popup-module.js') }}
  {{ Html::script('js/page_js/site/module/rolling_loading_module.js') }}
  {{ Html::script('js/page_js/site/module/countdown_module.js') }}
  {{ Html::script('js/page_js/site/module/rolling_loading_module.js') }}
  {{ Html::script('js/page_js/site/cart/cart.js') }}
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
@stop
