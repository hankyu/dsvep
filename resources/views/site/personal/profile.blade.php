@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/profile/profile-detail.css') }}
  {{ Html::style('css/loading-animation.css') }}
  {{ HTML::script('js/page_js/site/profile/jquery.cropit.js') }}
  {{ Html::style('css/popup-custom.css') }}
  <input type="hidden" id="_auth_situation" value="{{ session()->get('auth', '') }}" />
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        @include('site.personal.avatar')
      </div>
      @include('site.personal.profile-detail')
    </div>
  </div>
  {{ Html::script('js/page_js/site/module/rolling_loading_module.js') }}
  {{ Html::script('js/page_js/site/module/popup-module.js') }}
  {{ Html::script('js/page_js/site/module/hash_bind_controller.js') }}
  {{ Html::script('js/page_js/site/module/countdown_module.js') }}
  {{ Html::script('js/page_js/site/profile/detail.js') }}
  @include('site.personal.avatar-modify-modal')
@stop
