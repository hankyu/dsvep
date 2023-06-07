@extends('site.layout.layout')
@section('content')
  <input type="hidden" id="named" />
  {{ Html::script('js/page_js/site/worker/create.js') }}
@stop
