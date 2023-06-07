@extends('site.teacher.create-lesson.create-layout')
@section('create-content')
  {{ Html::style('css/page_css/progress.css') }}
  <input type="hidden" id="lesson_type" value="{{ $lesson_data->type }}"/>
  <input type="hidden" id="lesson_start_time" value="{{ $lesson_data->start_time }}"/>
  <input type="hidden" id="lesson_unit_num" value="{{ count($unit_data) }}"/>
  <div class="col-md-9 lesson-content">
    <div class="row step-header">
      <div class="col-xs-12 col-sm-4">
        <h3><span>{{ $step }}</span></h3>
      </div>
      <div class="col-sm-8 step-action">
        <button class="btn btn-info btn-float" id="btn_chapter_save"><i class="fas fa-save" aria-hidden="true"></i> Save</button>
        <button class="btn btn-primary btn-float" id="btn_add_unit"><i class="fa fa-plus" aria-hidden="true"></i> 新增章節</button>
        <div class="btn btn-info btn-float">
          <input class="toggle-unit" id="toggle_unit" type="checkbox">
          <span><i class="fa fa-chevron-down" aria-hidden="true"></i> 全部</span>
        </div>
        @if ($lesson_data->type == 'online')
          <button class="btn btn-info btn-float" id="btn_unit_sortable"><i class="fas fa-arrows-alt" aria-hidden="true"></i> <span id='sort_text'>排序</span></button>
        @endif
      </div>
    </div>
    <hr />

    <div class="content">
      <div class="accordion">
        <ul id="unit_area" class="cd-accordion-menu animated">
          @for ($i = 1; $i <= count($unit_data); $i++)
            <li id="unit_{{ $i }}" class="unit row">
              <input class="hidden" type="checkbox" id="input_unit_{{ $i }}">
              @if ($lesson_data->type == 'entity')
                <label class="unit-name" id="label_unit_name_{{ $i }}" for="input_unit_{{ $i }}" data-id="{{ $unit_data[$i]->id }}" data-unit_name="{{ $unit_data[$i]->u_name }}">
                  章節：{{ $unit_data[$i]->u_name }}
                </label>
              @else
                <label class="unit-name" id="label_unit_name_{{ $i }}" for="input_unit_{{ $i }}" data-unit_name="{{ $unit_data[$i][1]->u_name }}">
                  章節：{{ $unit_data[$i][1]->u_name }}
                </label>
              @endif
              <div class="unit-btn-wrapper">
                <button class="btn btn-danger btn-float" onclick="_del_unit({{ $i }})"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除章節</button>
                <button class="btn btn-success btn-float" onclick="_edit_unit_name({{ $i }})"><i class="fa fa-edit"></i> 編輯章節</button>
                @if ($lesson_data->type == 'online')
                  <button class="btn btn-warning btn-float" onclick="_add_chapter({{ $i }})"><i class="fa fa-plus" aria-hidden="true"></i> 新增小節</button>
                  <button class="btn btn-info btn-float" id="btn_section_sortable" onclick="_section_sort(this, {{ $i }})"><i class="fas fa-arrows-alt" aria-hidden="true"></i> <span id='section_sort_text'>排序</span></button>
                @endif
              </div>
              <ul id="unit_area_{{ $i }}" class="accordion-content">
                @if ($lesson_data->type == 'entity')
                  <li class="chapter">
                    <div class="chapter-header row">
                      <div class="col-xs-12">
                        <span class="col-form-label lesson-time" id="label_unit_time_{{ $i }}" data-unit_time="{{ str_replace(' ', 'T', substr($unit_data[$i]->l_start_time, 0, strlen($unit_data[$i]->l_start_time) - 3)) }} ~ {{ str_replace(' ', 'T', substr($unit_data[$i]->l_end_time, 0, strlen($unit_data[$i]->l_end_time) - 3)) }}">
                          上課時間：{{ substr($unit_data[$i]->l_start_time, 0, strlen($unit_data[$i]->l_start_time) - 3) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($unit_data[$i]->l_start_time, 0, 10)))] }} ~ {{ substr($unit_data[$i]->l_end_time, 0, strlen($unit_data[$i]->l_end_time) - 3) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($unit_data[$i]->l_start_time, 0, 10)))] }}
                        </span>
                      </div>
                      <div class="col-xs-12">
                        <span class="remark-title">課程描述：</span>
                        <span class="col-form-label label-remark" id="label_description_{{ $i }}" data-unit_description="{!! nl2br(e(str_replace("<br />", "", $unit_data[$i]->description))) !!}">{!! nl2br(e(str_replace("<br />", "", $unit_data[$i]->description))) !!}</span>
                      </div>
                      <div class="col-xs-12">
                        <span class="remark-title">備註：</span>
                        <span class="col-form-label label-remark" id="label_unit_remark_{{ $i }}" data-unit_remark="{!! nl2br(e(str_replace("<br />", "", $unit_data[$i]->remark))) !!}">{!! nl2br(e(str_replace("<br />", "", $unit_data[$i]->remark))) !!}</span>
                      </div>
                    </div>
                  </li>
                @elseif ($lesson_data->type == 'online')
                  @for ($j = 1; $j <= count($unit_data[$i]); $j++)
                    <li id="chapter_{{ $i }}_{{ $j }}" class="chapter row">
                      <div class="chapter-btn-wrapper col-xs-12">
                          <button class="btn btn-danger btn-float" onclick="_del_chapter({{ $i }}, {{ $j }})"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除小節</button>
                        <button class="btn btn-success btn-float" onclick="_edit_chapter({{ $i }}, {{ $j }})"><i class="fa fa-edit"></i> 編輯小節</button>
                        <form id="form_upload_media_{{ $i }}_{{ $j }}" enctype="multipart/form-data">
                          <div class="btn btn-info btn-float btn-upload-wrapper"><i class="fa fa-upload" aria-hidden="true"></i> 上傳影片
                            <input class="btn-upload" type="file" accept="video/*" id="media_{{ $i }}_{{ $j }}" name="media_{{ $i }}_{{ $j }}" onchange="_change_video({{ $i }},{{ $j }})">
                          </div>
                          <input type="text" class="form-control hidden" id="media_filename_{{ $i }}_{{ $j }}" readonly>
                        </form>
                      </div>
                      <div class="col-xs-12 margintop-10">
                        @if ($unit_data[$i][$j]->c_video != null)
                          <div class="col-xs-10 col-sm-5 col-md-4" id="media_video_{{ $i }}_{{ $j }}">
                            <video id="video_{{ $i }}_{{ $j }}" controls muted loop>
                              <source src="/media/{{ $lesson_data->l_id }}/lesson/{{ $unit_data[$i][$j]->c_video }}" id="preview_video_{{ $i }}_{{ $j }}"/>
                            </video>
                            <canvas id="video_canvas_{{ $i }}_{{ $j }}" class="video-canvas"></canvas>
                          </div>
                        @else
                          <div class="col-xs-10 col-sm-5 col-md-4" id="media_video_{{ $i }}_{{ $j }}" hidden="hidden">
                            <video id="video_{{ $i }}_{{ $j }}" controls muted loop>
                              <source src="#" id="preview_video_{{ $i }}_{{ $j }}"/>
                            </video>
                            <canvas id="video_canvas_{{ $i }}_{{ $j }}" class="video-canvas"></canvas>
                          </div>
                        @endif
                        <div class="col-xs-12 col-sm-6 col-md-7">
                          <div>
                            <span class="col-form-label chapter-name" id="label_chapter_name_{{ $i }}_{{ $j }}" data-id="{{ $unit_data[$i][$j]->id }}" data-chapter_name="{{ $unit_data[$i][$j]->c_name }}"><b>小節：{{ $unit_data[$i][$j]->c_name }}</b></span>
                          </div>
                          <span id="label_chapter_video_public_{{ $i }}_{{ $j }}" class="fee-wrapper" data-chapter_video_public={{ $unit_data[$i][$j]->c_video_situation == 'free' ? 1 : 0 }}>
                            影片為<span class="{{ $unit_data[$i][$j]->c_video_situation == 'free' ? 'checkbox-free' : 'checkbox-pay' }}">{{ $unit_data[$i][$j]->c_video_situation == 'free' ? '免費' : '付費' }}</span>
                          </span>
                          <span class="remark-title">備註：</span>
                          <span class="col-form-label label-remark" id="label_chapter_remark_{{ $i }}_{{ $j }}" data-chapter_remark="{!! nl2br(e(str_replace("<br />", "", htmlspecialchars($unit_data[$i][$j]->remark)))) !!}">{!! nl2br(e(str_replace("<br />", "", htmlspecialchars($unit_data[$i][$j]->remark)))) !!}</span>
                        </div>
                      </div>
                    </li>
                  @endfor
                @endif
              </ul>
            </li>
          @endfor
        </ul>
      </div>
    </div>
  </div>
@stop
