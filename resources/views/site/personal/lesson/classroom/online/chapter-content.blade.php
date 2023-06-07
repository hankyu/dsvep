<div class="accordion">
    <ul class="cd-accordion-menu animated">
        @foreach ($unit_num as $num)
            <li class="has-children accordion-title">
                <input type="checkbox" name="group-{{ $num }}" id="group-{{ $num }}">
                <label for="group-{{ $num }}">
                    第{{ $num }}章
                    @foreach ($unit_data as $chapter)
                        @if ($chapter->u_id == $num)
                            - {{ $chapter->u_name }}
                            @break
                        @endif
                    @endforeach
                </label>
                <ul class="accordion-content">
                    @if ((date("Y-m-d") >= $lesson_start_time) || (($teacher_data->t_id ?? null) == $lesson_data->t_id) || ($member_data->authority == 'worker'))
                        @for ($j = 0; $j < count($unit_data); $j++)
                            @if ($unit_data[$j]->u_id == $num)
                                <li>
                                    @if ($unit_data[$j]->c_video != '')
                                        <div class="lesson-list lesson-online-video row" onclick="_zoom_video({{ $j }}, '/media/{{ $lesson_data->l_id }}/lesson/{{ $unit_data[$j]->c_video }}')" >
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
                                        <div class="lesson-list lesson-online-text row">
                                            <i class="fa fa-caret-square-o-right mob-hidden" style="visibility: hidden;"></i>
                                            <div class="lesson-online-chatper col-xs-7 col-sm-8 col-lg-10">
                                                <p class="accordion-sub-content">{{ $unit_data[$j]->c_name }}</p>
                                            </div>
                                            <div class="col-sm-2 col-lg-1 video-time">
                                            </div>
                                            <div class="col-sm-2 col-lg-1 lock">
                                                <span>立即觀看</span>
                                            </div>
                                        </div>
                                    @endif
                                    @if ($unit_data[$j]->remark != '')
                                      <div class="lesson-online-chatper-remark row">
                                        <p class="lesson-online-chatper-remark-title">
                                          備註：
                                        </p>
                                        <p class="lesson-online-chatper-remark-content">{!! nl2br(e(str_replace("<br />", "", $unit_data[$j]->remark))) !!}</p>
                                      </div>
                                    @endif
                                    <hr style="height:1px;border:none;color:#26262633;background-color:#26262633;">
                                </li>
                            @endif
                        @endfor
                    @else
                        @for ($j = 0; $j < count($unit_data); $j++)
                            @if ($unit_data[$j]->u_id == $num)
                                <li>
                                    @if ($unit_data[$j]->c_video_situation == 'free')
                                        <div class="lesson-online-video row" onclick="_zoom_video({{ $j }}, '/media/{{ $lesson_data->l_id }}/lesson/{{ $unit_data[$j]->c_video }}')" >
                                            <i class="fa fa-caret-square-o-right mob-hidden"></i>
                                            <div class="lesson-online-chatper col-xs-7 col-sm-8 col-lg-10">
                                                <p class="accordion-sub-content">{{ $unit_data[$j]->c_name }}</p>
                                            </div>
                                            <div class="col-sm-2 col-lg-1 video-time">
                                                @if ($unit_data[$j]->c_video != '')
                                                    <span class="video-length" data-video_length={{ $unit_data[$j]->c_video_length }}></span>
                                                @endif
                                            </div>
                                            <div class="col-sm-2 col-lg-1 lock">
                                                <span>立即觀看</span>
                                            </div>
                                        </div>
                                    @else
                                        <div class="lesson-online-text row">
                                            <i class="fa fa-caret-square-o-right" style="visibility: hidden;"></i>
                                            <div class="lesson-online-chatper  col-xs-7 col-sm-8 col-lg-10">
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
        @endforeach
    </ul>
</div>
