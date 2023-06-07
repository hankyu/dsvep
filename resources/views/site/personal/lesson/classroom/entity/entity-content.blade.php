<div class="entity-header">
    <input type="hidden" id="media_type" value="{{ $media_type }}"/>
    <div class="media-wrapper">
        <div class="lesson-type-label entity">
          <span>實體</span>
        </div>

        @if ($media_type == 'video')
            <video id="media_video" class="video-js vjs-big-play-centered vjs-default-skin">
                <source src="/media/{{ $lesson_data->l_id }}/cover/{{ $lesson_data->media }}" />
                您的瀏覽器不支援HTML 5影片播放標籤<video>格式。
                Your browser doesn't support the <video> tag.
            </video>
        @else
            <img src="/media/{{ $lesson_data->l_id }}/cover/{{ $lesson_data->media }}" />
        @endif
    </div>

    <div class="dec-wrapper">
        <div class="title">
            @if ($lesson_data->l_sub_name == '')
                <span>{{ $lesson_data->l_name }}</span>
            @else
                <span>{{ $lesson_data->l_name }} - {{ $lesson_data->l_sub_name }}</span>
            @endif
        </div>

        <div>
            @if ($lesson_data->cancel_lesson == false)
                @if (date("Y-m-d") <= $lesson_data->end_fund)
                    <div class="lesson-status-label fundraising">
                        <span>招生中</span>
                    </div>
                    <div>
                        <span>開課日期：{{ substr(str_replace('-', '/', $unit_data[0]->l_start_time), 0, strlen($unit_data[0]->l_start_time) - 3) }}</span>
                    </div>
                @elseif ((date("Y-m-d") > $lesson_data->end_fund) && (date("Y-m-d") < $lesson_data->start_time))
                    <div class="lesson-status-label fundraising">
                        <span>準備中</span>
                    </div>
                    <div>
                        <span>開課日期：{{ $lesson_data->start_time }}</span>
                    </div>
                @else
                    @if (date('Y-m-d') == $lesson_data->start_time)
                        <div class="lesson-status-label bg-emphasized1">
                            <span>今日上課</span>
                        </div>
                    @elseif (date("Y-m-d H:i:s") < $lesson_last_unit)
                        <div class="lesson-status-label fundraising">
                            <span>上課中</span>
                        </div>
                    @else
                        <div class="lesson-status-label fundraising">
                            <span>已結業</span>
                        </div>
                    @endif
                @endif
            @else
                <div class="lesson-status-label fundraising">
                    <span>取消開班</span>
                </div>
            @endif
        </div>
        <div>
            <span>授課講師：<a href="{{ '/#/teacher/' . $teacher_data_for_lesson->t_id }}">
                {{ $member_data_for_teacher->nickname }}

                @if (!is_null($member_data_for_teacher->m_name))
                    ( {{ $member_data_for_teacher->m_name }} )
                @endif
            </a></span>
        </div>

        <div>
            <span id="lesson_location">上課地點：{{ $lesson_data->location }}</span>
        </div>
    </div>

    @if ($member_data_for_teacher->m_id != $member_data->m_id)
        @include('site.personal.lesson.classroom.evaluation')
    @endif
</div>

<div class="introduce">
    <nav id="lesson_tab_bar" class="lesson-tab-bar">
        {{-- <input id="tab_bulletin" type="radio" name="tabs" checked>
        <label id="label_bulletin" for="tab_bulletin" onclick="_tab_switch('bulletin')">公告</label> --}}

        <input id="tab_chapter" type="radio" name="tabs" checked>
        <label id="label_chapter" for="tab_chapter" onclick="_tab_switch('chapter')">課表</label>

        <input id="tab_map" type="radio" name="tabs">
        <label id="label_map" for="tab_map" onclick="_init_map()">教室地圖</label>

        <input id="tab_qa" type="radio" name="tabs">
        <label id="label_qa" for="tab_qa" onclick="_tab_switch('qa')">課程討論</label>

        {{-- <input id="tab_evaluate" type="radio" name="tabs">
        <label id="label_evaluate" for="tab_evaluate" onclick="_tab_switch('evaluate')">評價</label> --}}

        @if (($member_data_for_teacher->m_id == $member_data->m_id) || ($member_data->authority == 'worker'))
            <input id="tab_classmate" type="radio" name="tabs">
            <label id="label_classmate" for="tab_classmate" onclick="_tab_switch('classmate')">同學</label>
        @endif
            <input id="tab_rollcall" type="radio" name="tabs">
            <label id="label_rollcall" for="tab_rollcall" onclick="_tab_switch('rollcall')">點名</label>

        @if (($member_data_for_teacher->m_id == $member_data->m_id) || ($member_data->authority == 'worker'))
            @if ($lesson_data->origin_fee > 0)
                <input id="tab_coupon" type="radio" name="tabs">
                <label id="label_coupon" for="tab_coupon" onclick="_tab_switch('coupon')">優惠券</label>
            @endif
        @endif
    </nav>

    {{-- <section id="content_bulletin">
        @if ($member_data_for_teacher->m_id == $member_data->m_id)
            <div class="btn-editor">
                <button class="btn btn-success" type="button" name="button">編輯</button>
            </div>
        @endif
        <span>公告</span>
    </section> --}}

    <section id="content_chapter">
        <span class="btn btn-info btn-float">
            <input class="toggle-all" id="toggle_all_chapter" type="checkbox">
            <span><i class="fa fa-chevron-down" aria-hidden="true"></i> 全部</span>
        </span>
        @include('site.personal.lesson.classroom.entity.chapter-content')
    </section>

    <section id="content_map">
        <span>地址：{{ $lesson_data->location }}</span>

        @if ($lesson_data->location_note != '')
            <span>({{ $lesson_data->location_note }})</span>
        @endif

        <div id="map"></div>
    </section>

    <section id="content_qa">
        <div id="qa_content" class="lesson__qa__content">
        </div>
    </section>

    <section id="content_evaluate">
        @include('site.personal.lesson.classroom.evaluate-content')
    </section>

    <section id="content_classmate">
        @include('site.personal.lesson.classroom.classmate')
    </section>

    @if (($member_data_for_teacher->m_id == $member_data->m_id) || ($member_data->authority == 'worker'))
        <section id="content_rollcall">
            @include('site.personal.lesson.classroom.rollcall')
        </section>

        <section id="content_coupon">
            @include('site.personal.lesson.classroom.coupon')
        </section>
    @else
        <section id="content_rollcall">
            @include('site.personal.lesson.classroom.rollcall-table')
        </section>
    @endif
</div>
