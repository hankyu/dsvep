<div>
    <input type="hidden" id="media_type" value="{{ $media_type }}"/>
    <div class="preview-header">
      @if ($lesson_data->media == '')
        <div class="media-example">
          <span>課程圖影</span>
        </div>
      @else
        @if ($media_type == 'video')
          <video id="media_video" class="video-js vjs-big-play-centered vjs-default-skin">
            <source src="/media/{{ $lesson_data->l_id }}/cover/{{ $lesson_data->media }}" />
            您的瀏覽器不支援HTML 5影片播放標籤<video>格式。
            Your browser doesn't support the <video> tag.
          </video>
        @else
          <img src="/media/{{ $lesson_data->l_id }}/cover/{{ $lesson_data->media }}" />
        @endif
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

        <nav id="preview_tab_bar" class="lesson__menu__bar--preview">
            <ul class="lesson-menu-input">
              <a href="#content_intro"><li id="tab_intro" class="lesson-menu-item" for="tab_intro">課程介紹</li></a>
              <a href="#content_chapter"><li id="tab_chapter" class="lesson-menu-item" for="tab_chapter">課表時間</li></a>
              <a href="#content_teacher"><li id="tab_teacher" class="lesson-menu-item" for="tab_teacher">講師介紹</li></a>
              @if ($lesson_data->type == "entity")
                  <a href="#content_map"><li id="tab_map" class="lesson-menu-item" for="tab_map">教室位置</li></a>
              @endif
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
                @include('site.teacher.create-lesson.preview.fit-area')
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
                <div class="row margin-0 marginbot-10">
                    <span class="btn btn-info btn-float">
                        <input class="toggle-all" id="toggle_all_chapter" type="checkbox">
                        <span><i class="fa fa-chevron-down" aria-hidden="true"></i> 全部</span>
                    </span>
                </div>
                @include('site.teacher.create-lesson.preview.chapter-area')
            </section>

            <section id="content_teacher" class="section-content">
                <div class="lesson-preview-bar center">
                    <span>講師介紹</span>
                </div>
                @include('site.teacher.create-lesson.preview.teacher-area')
            </section>

            @if ($lesson_data->type == "entity")
                <section id="content_map" class="section-content">
                    <div class="lesson-preview-bar center">
                        <span>教室位置</span>
                    </div>
                    <span id="lesson_location">上課地點：{{ $lesson_data->location }}</span>
                    @if ($lesson_data->location_note)
                        <span>({{ $lesson_data->location_note }})</span>
                    @endif
                    <div id="map"></div>
                </section>
            @endif
        </div>
    </div>
</div>
