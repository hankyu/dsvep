@extends('admin.layout.layout')
@section('content')
    {{ Html::style('css/card-custom.css') }}
    {{ Html::style('css/popup-custom.css') }}
    {{ Html::style('css/scrollbar-custom.css') }}
    {{ Html::style('css/loading-animation.css') }}
    {{ Html::style('css/jquery-confirm-scroll.css') }}
    {{ Html::style('css/wish.css') }}
    {{ Html::style('css/page_css/admin/wish/wish.css') }}
    <div class="container">
        <div class="center margintop-30 marginbot-30">
            <h1>{{ $title }}</h1>
            <hr />
            <div id="wishing-content" class="wishing__content">
            </div>
        </div>
    </div>
    <script src="/js/page_js/site/module/wish_module.js"></script>
    <script src="/js/page_js/admin/wish/wish.js"></script>
@stop
