@extends('site.layout.layout')
@section('content')
    {{ Html::style('css/load_block.css') }}
    {{ Html::style('css/card-custom.css') }}
    @if ($member_data != "" && $member_data->m_id == $teacher_member_data->m_id)
        {{ Html::style('css/progress.css') }}
    @endif
    {{ Html::style('css/page_css/site/teacher-area/teacher-portfolios.css') }}
    {{ Html::style('css/page_css/site/teacher-area/teacher-detail.css') }}
    <div class="container">
        <div class="row teacher-container">
            <input type="hidden" id="t_id_temp" value="{{ $teacher_search_data->t_id }}" />
            @if ($member_data != "")
                <input type="hidden" id="member_account" value="{{ $member_data->account }}" />
            @else
                <input type="hidden" id="member_account" value="" />
            @endif
            <div class="col-md-4 col-lg-3">
                @include('site.teacher.detail.option')
            </div>
            @include('site.teacher.detail.content')
        </div>
    </div>
    @if ($member_data != "" && $member_data->m_id == $teacher_member_data->m_id)
        {{ Html::script('js/page_js/site/module/image_upload_module.js') }}
    @endif
    {{ Html::script('js/page_js/site/module/hash_bind_controller.js') }}
    {{ Html::script('js/page_js/site/teacher-area/detail.js') }}
    {{ Html::script('js/page_js/site/module/portfolios_module.js') }}
@stop
