@extends('site.teacher.create-lesson.create-layout')
@section('create-content')
  <div class="col-md-9 lesson-content">
    <div>
      <button class="btn btn-info btn-save" id="btn_media_save"><i class="fas fa-save" aria-hidden="true"></i> Save</button>
      <h3><span style="margin-left: 20px">{{ $step }}</span></h3>
    </div>
    <hr />
    <div class="content row">
      <div class="col-md-12">
        <div id="progress" class="progress hidden">
          <div id="progress_bar" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <span class="progress-text">0%</span>
          </div>
        </div>
        <form id="form_upload_media" enctype="multipart/form-data">
          <div class="input-group">
            <label class="input-group-btn">
              <span class="btn btn-primary">
                上傳封面圖片&hellip; <input type="file" style="display: none;" accept="image/*" id="cover" name="cover">
              </span>
            </label>
            <input type="text" class="form-control" id="cover_process_bar" readonly>
          </div>
          <br />
          <div class="input-group">
            <label class="input-group-btn">
              <span class="btn btn-success">
                上傳宣傳圖影&hellip; <input type="file" style="display: none;" accept="video/*, image/*" id="media" name="media">
              </span>
            </label>
            <input type="text" class="form-control" id="media_process_bar" readonly>
          </div>
        </form>
      </div>
      <div class="col-md-12 form-group mdeia-wrapper" id="form_lesson_name">
        <div class="margintop-20">
          <span>封面圖片</span>
          <div id="cover_image">
            @if ($lesson_data->cover != null)
              <img src="/media/{{ $lesson_data->l_id }}/cover/{{ $lesson_data->cover }}" id="preview_cover">
            @else
              <span class="no-choose-cover">尚未選擇封面圖片</span>
              <p class="no-choose-cover margin-0">封面圖片會呈現在首頁、所有課程&hellip;</p>
              <img src="" id="preview_cover">
            @endif
          </div>
        </div>

        <div class="margintop-20">
          <span>課程圖影</span>
          @if ($media_type != '')
            @if ($media_type == 'video')
              <div id="media_video">
                <video controls loop>
                  <source src="/media/{{ $lesson_data->l_id }}/cover/{{ $lesson_data->media }}" id="preview_video"/>
                  </video>
                </div>
              @else
                <div id="media_video" hidden="hidden">
                  <video controls loop>
                    <source src="" id="preview_video"/>
                  </video>
                </div>
              @endif

              @if ($media_type == 'image')
                <div id="media_image">
                  <img src="/media/{{ $lesson_data->l_id }}/cover/{{ $lesson_data->media }}" id="preview_image"/>
                </div>
              @else
                <div id="media_image">
                  <img src="" id="preview_image"/>
                </div>
              @endif
            @else
              <div id="media_video" hidden="hidden">
                <video controls loop>
                  <source src="" id="preview_video"/>
                </video>
              </div>
              <div id="media_image">
                <span class="no-choose-media">尚未選擇課程宣傳媒體(圖片或影片)</span>
                <p class="no-choose-media margin-0">課程圖影會呈現在課程的焦點位置，點擊左側預覽確認位置</p>
                <img src="" id="preview_image"/>
              </div>
            @endif
        </div>
      </div>
    </div>
  </div>
@stop
