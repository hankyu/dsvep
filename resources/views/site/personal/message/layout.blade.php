@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/profile/message.css')}}
  <input type="hidden" id="member_account" value="{{ $member_data->account }}" />
  <div class="container">
    <div class="row">
      <h2 class="margintop-30 text-center">我的訊息</h2>
    </div>
    <div class="row" id="rowMessage">
      @include('site.personal.message.sidebar')
      @include('site.personal.message.content')
    </div>
  </div>
  {{ Html::script('js/page_js/site/profile/message.js') }}
@stop
