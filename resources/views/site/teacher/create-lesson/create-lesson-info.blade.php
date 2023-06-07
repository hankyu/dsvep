@extends('site.teacher.create-lesson.create-layout')
@section('create-content')
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css?date={{ time() }}" rel="stylesheet">
  <input type="hidden" id="path" value="{{ $lesson_data->description }}"/>
  <div class="col-md-9 lesson-content">
    <div>
      <button class="btn btn-info float-right margin-left-20" id="btn_info_save"><i class="fas fa-save" aria-hidden="true"></i> Save</button>
      <h3><span style="margin-left: 20px">{{ $step }}</span></h3>
    </div>
    <hr />
    <div class="content">
      <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_name">
        <label class="col-form-label">課程標題</label><br />
        <div>
            <input type="text" class="form-control" id="lesson_name" placeholder="輸入課程標題" value="{{ $lesson_data->l_name }}">
        </div>
        <p>*課程標題應簡單明瞭，不宜過長。(13個全形字以內)</p>
      </div>
      <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_sub_name">
        <label class="col-form-label">課程副標題</label><br />
        <div>
          <input type="text" class="form-control" id="lesson_sub_name" placeholder="輸入課程副標題，ex:第一次用單眼就上手" value="{{ $lesson_data->l_sub_name }}">
        </div>
      </div>
      <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_description">
        <label class="col-form-label">課程說明</label><br />
        <div id="lesson_description" data-now="{{ time() }}"></div>
        <div class="col-md-12 update-image">
          <form id="form_upload_image" enctype="multipart/form-data">
            <div class="input-group">
              <label class="input-group-btn">
                <span class="btn btn-primary">
                  <i class="fas fa-image" aria-hidden="true"></i>
                  上傳圖片&hellip; <input type="file" class="hidden" accept="image/*" id="image_upload" name="image_upload">
                </span>
              </label>
              <input type="text" class="form-control" id="image_url" readonly>
            </div>
          </form>
        </div>
        <div>*如果無法修改文字編輯器的內容，請善用 (ctrl + shift + r) 重整</div>
      </div>
    </div>
  </div>
  <script src="https://cdn.quilljs.com/1.3.6/quill.js?date={{ time() }}"></script>
  <script>
    var quill = new Quill('#lesson_description',
    {
      modules:
      {
        toolbar:
        [
          [{ 'font': [] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'align': [] }, 'link']
        ]
      },
      placeholder: 'edit your introduce page...',
      theme: 'snow'
    });
  </script>
@stop
