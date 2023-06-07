@extends('site.layout.layout')
@section('content')
    {{-- skeleton animetion --}}
    {{-- {{ Html::style('css/page_css/site/skeleton-screen.css') }} --}}
    {{ Html::style('css/loading-animation.css') }}
    {{ Html::style('css/page_css/site/index.css') }}
    {{-- @include('site.index.index-picture') --}}

    {{-- skeleton animetion --}}
    {{-- <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <div class="skeleton__heading">
                            <h2 class="h-bold skeleton__title margintop-40"><div class="skeleton"></div></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 indList list-unstyled">
                    <div class="lesson-list-container">
                        <div class="">
                            <div class="item">
                                <div class="thumbnail skeleton__thumbnail">
                                    <figure class="figure skeleton skeleton__figure">
                                    </figure>
                                    <article class="caption">
                                        <div class="skeleton skeleton__caption"></div>
                                        <p class="skeleton skeleton__text"></p>
                                        <p class="skeleton skeleton__text"></p>
                                        <p class="skeleton skeleton__text"></p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> --}}

    <section id="main-select">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 loading__animation">
                    <div id="loading-animation" class="loading__animation__content"><div class="lds-roller">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{ Html::script('js/jquery-ui.js') }}
    {{ Html::script('js/jquery.ui.touch-punch.min.js') }}
    {{ Html::script('js/page_js/site/draggable.js') }}
    {{ Html::script('js/page_js/site/index.js') }}
@stop
