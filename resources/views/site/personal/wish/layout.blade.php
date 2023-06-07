@extends('site.layout.layout')
@section('content')
    {{ Html::style('css/card-custom.css') }}
    {{ Html::style('css/popup-custom.css') }}
    {{ Html::style('css/scrollbar-custom.css') }}
    {{ Html::style('css/loading-animation.css') }}
    {{ Html::style('css/jquery-confirm-scroll.css') }}
    {{ Html::style('css/wish.css') }}
    {{ Html::style('css/wishing.css') }}
    <div class="container">
        <div class="center margintop-30 marginbot-30">
            <h1>{{ $title }}</h1>
            <hr />
            <div class="funcBar"></div>
            <div id="wishing-content" class="wishing__content">
            </div>
        </div>
    </div>
    {{ Html::script('js/page_js/site/layout/checkbox_module.js') }}
    {{ Html::script('js/page_js/site/layout/wishing_module.js') }}
    <script src="/js/page_js/site/module/wish_module.js"></script>
    <script src="/js/page_js/site/profile/wish.js"></script>
@stop
