<div id="video_mask" class="video-mask">
  <span id='close_mask' class="close"><i class="fas fa-times" aria-hidden="true"></i></span>
  <div class="container padding-0">
    <div id="lesson_video" class="lesson-video">
      <video id="video_player" class="video-js vjs-big-play-centered vjs-default-skin" controls oncontextmenu="return false">
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
      </video>
    </div>
    <div id="lesson_video_list" class="lesson-video-list row">
      @for ($j = 0; $j < count($unit_data); $j++)
        @if (($unit_data[$j]->c_video != '') && ((date("Y-m-d") >= $lesson_start_time) || ($unit_data[$j]->c_video_situation == 'free') || (($teacher_data->t_id ?? null) == $lesson_data->t_id) || ($member_data->authority == 'worker')))
        <div id="video_item_{{ $j }}" class="lesson-video-list-item" onclick="_change_video({{ $j }}, '/media/{{ $lesson_data->l_id }}/lesson/{{ $unit_data[$j]->c_video }}')">
          <div class="lesson-video-card">
            <i class="icon-play fa fa-play-circle-o fa-3x" aria-hidden="true"></i>
            <img src="{{ $unit_data[$j]->image_url }}" alt="">
            <span class="video-length mask-video-length" data-video_length={{ $unit_data[$j]->c_video_length }}></span>
          </div>
          <div class="lesson-online-chatper col-xs-6">
            <p class="accordion-sub-content">{{ $unit_data[$j]->c_name }}</p>
          </div>
        </div>
        @endif
      @endfor
    </div>
  </div>
</div>
