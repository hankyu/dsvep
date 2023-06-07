@extends('site.layout.layout')
@section('content')
    {{ Html::style('css/page_css/site/teacher-area/become-teacher.css')}}
    @if (isset($teacher_data['auth_situation']))
        @if ($teacher_data['auth_situation'] == 'success')
            <div class="container">
                <div class="row">
                    <input type="hidden" id="teacher_id" value="{{ $teacher_data['t_id'] }}">
                    @include('site.teacher.becometeacher.audit-result.becometeacher-success')
                </div>
            </div>
        @elseif ($teacher_data['auth_situation'] == 'review')
            <div class="container">
                <div class="row">
                    <div class="auditing-img">
                        <img src="img/becometeacher/auditing.png"/>
                    </div>
                </div>
            </div>
        @elseif ($teacher_data['auth_situation'] == 'fail' ||  'refuel')
            @include('site.teacher.becometeacher.upload-become-teacher-content')
        @endif
    @else
        <input type="hidden" id="new_apply">
        @include('site.teacher.becometeacher.upload-become-teacher-content')
    @endif
    {{ Html::script('js/page_js/site/teacher-area/becometeacher.js') }}
@stop
