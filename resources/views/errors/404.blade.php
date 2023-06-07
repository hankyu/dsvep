@extends('site.layout.layout')
@section('content')
    {{ Html::style('css/page_css/errors/error-page.css') }}
    <div class="bg-404">
        <h1>糟糕</h1>
        <p>頁面似乎不存在</p>
        <div>
            <a href="/"><span class="btn btn-primary btn-lg"><i class="fa fa-home"></i> 回首頁</span></a>
        </div>
    </div>
    <script src="/js/page_js/errors/error-page.js"></script>
@stop
