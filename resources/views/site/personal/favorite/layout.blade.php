@extends('site.layout.layout')
@section('content')
    {{ Html::style('css/page_css/site/all-lesson/all-lesson.css')}}
    {{ Html::style('css/page_css/site/profile/favorite.css') }}
    <div class="container">
        <div class="center margintop-30">
            <h1>{{ $title }}</h1>
            <hr />
        </div>
        @include('site.personal.favorite.content')
    </div>
    {{ Html::script('js/page_js/site/module/favorite_module.js') }}
    {{ Html::script('js/page_js/site/profile/favorite.js') }}
@stop
