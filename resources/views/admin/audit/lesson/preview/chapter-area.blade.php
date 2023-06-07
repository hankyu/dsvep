<div class="accordion">
  <ul class="cd-accordion-menu animated">
    @for ($i = 0; $i < count($unit_num); $i++)
      <li class="has-children accordion-title">
        <input type="checkbox" name="group-{{ $i }}" id="group-{{ $i }}">
        <label for="group-{{ $i }}">
          第 {{ $unit_num[$i] }}
          @if ($lesson_data->type == 'entity')
            堂
            {{ substr(str_replace('-', '/', $unit_data[$i]->l_start_time), 0, strlen($unit_data[$i]->l_start_time) - 3) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($unit_data[$i]->l_start_time, 0, 10)))] }}
            {{-- 開始時間和結束時間日期相同，只顯示時間 --}}
            @if (substr($unit_data[$i]->l_start_time, 0, 10) == substr($unit_data[$i]->l_end_time, 0, 10))
              ~ {{ substr(str_replace('-', '/', $unit_data[$i]->l_end_time), 11, 5) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($unit_data[$i]->l_start_time, 0, 10)))] }}
            @else
              ~ {{ substr(str_replace('-', '/', $unit_data[$i]->l_end_time), 5, strlen($unit_data[$i]->l_end_time) - 8) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($unit_data[$i]->l_start_time, 0, 10)))] }}
            @endif
            - {{ $unit_data[$i]->u_name }}
          @elseif ($lesson_data->type == 'online')
            章
            @foreach ($unit_data as $chapter)
              @if ($chapter->u_id == $i + 1)
                - {{ $chapter->u_name }}
                @break
              @endif
            @endforeach
          @endif
        </label>
        <ul class="accordion-content">
          @if ($lesson_data->type == 'entity')
            {{-- 空值不顯示 --}}
            @if ($unit_data[$i]->description)
              <li class="remark-content row marginbot-10">
                <span class="remark-label">{!! str_replace(chr(13).chr(10), "<br />", $unit_data[$i]->description) !!}</span>
              </li>
            @endif
            @if ($unit_data[$i]->remark)
              <li class="remark-content row">
                <span class="remark-title">備註：</span>
                <span class="remark-label">{!! str_replace(chr(13).chr(10), "<br />", $unit_data[$i]->remark) !!}</span>
              </li>
            @endif
          @elseif ($lesson_data->type == 'online')
            @for ($j = 0; $j < count($unit_data); $j++)
              @if ($unit_data[$j]->u_id == $unit_num[$i])
                <li>
                    @if (($unit_data[$j]->c_video != '') && ($unit_data[$j]->c_video_situation == 'free'))
                        <div class="lesson-preview-video row" onclick="_zoom_video({{ $j }}, '/media/{{ $lesson_data->l_id }}/lesson/{{ $unit_data[$j]->c_video }}')">
                            <i class="fa fa-caret-square-o-right mob-hidden"></i>
                            <div class="lesson-online-chatper col-xs-7 col-sm-8 col-lg-10">
                                <p class="accordion-sub-content">{{ $unit_data[$j]->c_name }}</p>
                            </div>
                            <div class="col-sm-2 col-lg-1 video-time">
                                <span class="video-length" data-video_length={{ $unit_data[$j]->c_video_length }}></span>
                            </div>
                            <div class="col-sm-2 col-lg-1 lock">
                                <span>立即觀看</span>
                            </div>
                        </div>
                    @else
                        @if ($unit_data[$j]->c_video != '')
                            <div class="lesson-preview-text row" onclick="_zoom_video({{ $j }}, '/media/{{ $lesson_data->l_id }}/lesson/{{ $unit_data[$j]->c_video }}')">
                        @else
                            <div class="lesson-preview-text row">
                        @endif
                            <i class="fa fa-caret-square-o-right mob-hidden" style="visibility: hidden;"></i>
                            <div class="lesson-online-chatper col-xs-7 col-sm-8 col-lg-10">
                                <p class="accordion-sub-content">{{ $unit_data[$j]->c_name }}</p>
                            </div>
                            <div class="col-sm-2 col-lg-1 video-time">
                                @if ($unit_data[$j]->c_video != '')
                                    <span class="video-length" data-video_length={{ $unit_data[$j]->c_video_length }}></span>
                                @endif
                            </div>
                            <div class="col-sm-2 col-lg-1 lock">
                                <i class="fa fa-lock"></i>
                            </div>
                        </div>
                    @endif
                    @if ($unit_data[$j]->remark != '')
                        <div class="lesson-online-chatper-remark row">
                            <p class="lesson-online-chatper-remark-title">
                                備註：
                            </p>
                            <p class="lesson-online-chatper-remark-content">{{ $unit_data[$j]->remark }}</p>
                        </div>
                    @endif
                    <hr style="height:1px;border:none;color:#26262633;background-color:#26262633;">
                </li>
              @endif
            @endfor
          @endif
        </ul>
      </li>
    @endfor
  </ul>
</div>
