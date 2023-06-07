@extends('site.layout.layout')
    @section('content')
    {{ Html::style('css/loading-animation.css') }}
    {{ Html::style('css/popup-custom.css') }}
    {{ Html::style('css/page_css/site/profile/rollcall-report.css') }}
    <script>
    let memberData = (function (){
        let m_id = {{ $member_data? $member_data->m_id : 'null' }};

        function getMemberId(){
            return m_id;
        }

        return {getMemberId: getMemberId};
    })();

    </script>
    <div class="container">
        <div class="center margintop-30">
            <h1>{{ $title }}</h1>
            <hr />
        </div>
    </div>
    <div class="wrapper" id="teacherList">
        <div id="tbTeacherList"></div>
    </div>
    <div id="lessonList" style="display: none;">
        <h3 id="h3TeacherName"></h3>
        <div id="lessonListHead" class="wrapper">
            <div id="funcBar"></div>
            <button id="returnBtn" class="returnTeacherList" type="button"><i class="fas fa-arrow-left"></i> 回導師列表</button>
        </div>
        <div id="averageBlock">
            <div id="averagePresenceChart">
                <canvas id="canvasChart"></canvas>
            </div>
            <div id="averagePresenceInfo">
                <p>平均出席率： <span id="rollCallRate"></span></p>
                <p>總應出席人次： <span id="totalRollCall"></span> </p>
                <p>總實際出席人次： <span id="totalPresence"></span></p>
            </div>
        </div>
        <div class="container" id="presenceCardsContainer"></div>
    </div>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js'></script>
    {{ Html::script('js/page_js/site/module/popup-module.js') }}
    {{ Html::script('js/page_js/site/module/rollcall_table_module.js') }}
    {{ Html::script('js/page_js/site/module/running_number_module.js') }}
    {{ Html::script('js/page_js/site/module/rolling_loading_module.js') }}
    {{ Html::script('js/page_js/site/module/rollcall_report_module.js') }}
    {{ Html::script('js/page_js/site/worker/rollcall-report.js') }}
@stop
