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
      <input id="tab_intro" class="lesson-menu-input" type="radio" name="tabs" checked>
      <label class="lesson-menu-item" for="tab_intro" onclick="_tab_switch(0)">課程介紹</label>

      <input id="tab_chapter" class="lesson-menu-input" type="radio" name="tabs">
      <label class="lesson-menu-item" for="tab_chapter" onclick="_tab_switch(1)">課表時間</label>

      <input id="tab_teacher" class="lesson-menu-input" type="radio" name="tabs">
      <label class="lesson-menu-item" for="tab_teacher" onclick="_tab_switch(2)">講師介紹</label>

      @if ($lesson_data->type == "entity")
        <input id="tab_map" class="lesson-menu-input" type="radio" name="tabs">
        <label class="lesson-menu-item" for="tab_map" onclick="_init_map()">教室位置</label>
      @endif
    </nav>

    <section id="content_intro">
      @include('admin.audit.lesson.preview.fit-area')
      <div class="lesson-preview-bar center">
        <span>課程說明</span>
      </div>
      <div class="temp_content" hidden="hidden"></div>
      <div class="content"></div>
    </section>

    <section id="content_chapter">
      <div class="row margin-0 marginbot-10">
        <span class="btn btn-info btn-float">
          <input class="toggle-all" id="toggle_all_chapter" type="checkbox">
          <span><i class="fa fa-chevron-down" aria-hidden="true"></i> 全部</span>
        </span>
      </div>
      @include('admin.audit.lesson.preview.chapter-area')
    </section>

    <section id="content_teacher">
      @include('admin.audit.lesson.preview.teacher-area')
    </section>

    @if ($lesson_data->type == "entity")
      <section id="content_map">
        <span id="lesson_location">上課地點：{{ $lesson_data->location }}</span>
        @if ($lesson_data->location_note)
          <span>({{ $lesson_data->location_note }})</span>
        @endif
        <div id="map"></div>
      </section>
    @endif
  </div>
</div>
