<div>
    <input type="hidden" id="media_type" value="{{ $media_type }}"/>
    <div class="preview-header">
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

    <div class="introduce">
        <div class="lesson-title center">
            <p>
                {{ $lesson_data->l_name }}
                @if ($lesson_data->l_sub_name != '')
                    - {{ $lesson_data->l_sub_name }}
                @endif
            </p>
        </div>

        <nav id="preview_tab_bar" class="lesson-menu-bar">
            <ul class="lesson-menu-input">
              <a href="#content_intro"><li id="tab_intro" class="lesson-menu-item" for="tab_intro">課程介紹</li></a>
              <a href="#content_chapter"><li id="tab_chapter" class="lesson-menu-item" for="tab_chapter">課表時間</li></a>
              <a href="#content_teacher"><li id="tab_teacher" class="lesson-menu-item" for="tab_teacher">講師介紹</li></a>
              @if ($lesson_data->type == "entity")
                  <a href="#content_map"><li id="tab_map" class="lesson-menu-item" for="tab_map">教室位置</li></a>
              @endif
              <a href="#content_qa"><li id="tab_qa" class="lesson-menu-item" for="tab_qa">課程問答</li></a>
            </ul>
        </nav>

        <div class="lesson-info-content" data-spy="scroll" data-target="#preview_tab_bar">
            <div class="visible-xs visible-sm">
              @if (date('Y-m-d') <= $lesson_data->end_fund)
                <span class="span-block">募資結束日期：{{ $lesson_data->end_fund }}</span>
              @endif
              <span class="span-block">課程開始日期：{{ $lesson_data->start_time }}</span>
              <hr>
            </div>

            <div id="content_intro">
                @include('site.lesson.fit-area')
                <section id="content_description" class="section-content">
                    <div class="lesson-preview-bar center">
                        <span>課程說明</span>
                    </div>
                    <div class="temp_content" hidden="hidden"></div>
                    <div class="content"></div>
                </section>
            </div>

            <section id="content_chapter" class="section-content">
                <div class="lesson-preview-bar center">
                    <span>課表時間</span>
                </div>
                @if ($lesson_data->type == "entity")
                    <div class="row margin-0 marginbot-10">
                        <span class="btn btn-info btn-float" onclick="window.open('{{
                                'http://www.google.com/calendar/event?' .
                                'action=TEMPLATE'.
                                '&text=' . str_replace(' ', '+', $lesson_data->l_name) .
                                '&dates=' .
                                date('Ymd\THis\Z', strtotime($unit_data[0]->l_start_time) - 28800) .
                                '/' .
                                date('Ymd\THis\Z', strtotime($unit_data[count($unit_num)-1]->l_end_time) - 28800) .
                                '&details=' . str_replace(' ', '+', $lesson_data->l_name) . '+今日上課' .
                                '&location=' . str_replace(' ', '+', $lesson_data->location) .
                                '&trp=false' .
                                '&sprop=' .
                                '&sprop=name:'
                            }}')">
                            <i class="far fa-calendar-alt"></i>
                            加入google行事曆
                        </span>
                    </div>
                @endif
                <div class="row margin-0 marginbot-10">
                    <span class="btn btn-info btn-float">
                        <input class="toggle-all" id="toggle_all_chapter" type="checkbox">
                        <span><i class="fa fa-chevron-down" aria-hidden="true"></i> 全部</span>
                    </span>
                </div>
                @include('site.lesson.chapter-area')
            </section>

            <section id="content_teacher" class="section-content">
                <div class="lesson-preview-bar center">
                    <span>講師介紹</span>
                </div>
                @include('site.lesson.teacher-area')
            </section>

            @if ($lesson_data->type == "entity")
                <section id="content_map" class="section-content">
                    <div class="lesson-preview-bar center">
                        <div class="head-block"></div>
                        <span>教室位置</span>
                    </div>
                    <span id="lesson_location">上課地點：{{ $lesson_data->location }}</span>
                    @if ($lesson_data->location_note)
                        <span>({{ $lesson_data->location_note }})</span>
                    @endif
                    <div id="map"></div>
                </section>
            @endif

            <section id="content_qa" class="section-content">
                <hr>
                <div class="lesson__qa__title center">
                    <span>課程問答</span>
                </div>
                @include('site.lesson.qa')
            </section>
        </div>
    </div>
</div>
