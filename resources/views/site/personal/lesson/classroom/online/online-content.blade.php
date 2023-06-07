<div class="entity-header">
    <input type="hidden" id="media_type" value="{{ $media_type }}"/>
    <div class="media-wrapper">
        <div class="lesson-type-label online">
            <span>線上</span>
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
                        <span>募資中</span>
                    </div>

                    <div>
                        <span>開課日期: {{ $lesson_data->start_time }}</span>
                    </div>
                @elseif ((date("Y-m-d") > $lesson_data->end_fund) && (date("Y-m-d") < $lesson_data->start_time))
                    <div class="lesson-status-label fundraising">
                        @if($buy_people_num >= $lesson_data->least_people)
                            <span>備課中</span>
                        @else
                            <span>募資中</span>
                        @endif
                    </div>

                    <div>
                        <span>開課日期：{{ $lesson_data->start_time }}</span>
                    </div>
                @else
                    <div class="lesson-status-label fundraising">
                        <span>上課去</span>
                    </div>
                @endif
            @else
                <div class="lesson-status-label fundraising">
                    <span>取消開班</span>
                </div>
            @endif
        </div>
        <div>
            <span>授課講師: <a href="{{ '/#/teacher/' . $teacher_data_for_lesson->t_id }}">{{ $member_data_for_teacher->m_name }}</a></span>
        </div>

        @if ($lesson_data->type == 'online')
            @if(strtotime(date('Y-m-d')) > strtotime($lesson_data->start_time))
                <div class="watch-deadline">觀看期限：{{ $deadline ? $deadline : '永久' }}</div>
            @endif
        @endif
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
        <label id="label_chapter" for="tab_chapter" onclick="_tab_switch('chapter')">課表時間</label>

        <input id="tab_qa" type="radio" name="tabs">
        <label id="label_qa" for="tab_qa" onclick="_tab_switch('qa')">課程討論</label>

        {{-- <input id="tab_evaluate" type="radio" name="tabs">
            <label id="label_evaluate" for="tab_evaluate" onclick="_tab_switch('evaluate')">評價</label> --}}

        @if (($member_data_for_teacher->m_id == $member_data->m_id) || ($member_data->authority == 'worker'))
            <input id="tab_classmate" type="radio" name="tabs">
            <label id="label_classmate" for="tab_classmate" onclick="_tab_switch('classmate')">同學</label>
        @endif

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
        @include('site.personal.lesson.classroom.online.chapter-content')
    </section>

    <section id="content_qa">
        <div id="qa_content" class="lesson__qa__content">
        </div>
    </section>

    <section id="content_evaluate">
        @include('site.personal.lesson.classroom.evaluate-content')
    </section>

    @if ($member_data_for_teacher->m_id == $member_data->m_id || ($member_data->authority == 'worker'))
      <section id="content_classmate">
          @include('site.personal.lesson.classroom.classmate')
      </section>
    @endif

    @if (($member_data_for_teacher->m_id == $member_data->m_id) || ($member_data->authority == 'worker'))
        <section id="content_coupon">
            @include('site.personal.lesson.classroom.coupon')
        </section>
    @endif
</div>

@include('site.personal.lesson.classroom.online.video-mask')
