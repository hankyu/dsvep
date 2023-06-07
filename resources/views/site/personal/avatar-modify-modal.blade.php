<div class="modal fade mymodal" id="modal_avatar_modify" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myModalLabel">更換大頭照</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            {!! Form::open(['url' => '/avatar_modify', 'id' => 'ava_form', 'enctype' => 'multipart/form-data']) !!}
              <div class="image-editor">
                <div class="cropit-preview"></div>
                <input type="range" class="cropit-image-zoom-input">
                <input type="hidden" name="ava_hidden_crop_image" id="ava_hidden_crop_image" value="" />
                <div class="upload-img-wrapper">
                  <label class="upload-img-label" for="ava_file">
                    <i class="fa fa-upload fa-2x"></i>
                    上傳檔案
                  </label>
                  <input name="ava_file" id="ava_file" type="file" class="cropit-image-input">
                  <span class="avatar-remind">小提醒：大於200*200px / 10MB以下</span>
                </div>
                <button type="button" id="btn_ava_modify" class="export btn btn-info btn-block">確定</button>
                <button type="button" id="btn_ava_cancel" class="btn btn-success btn-block">取消</button>
              </div>
            {!! Form::close() !!}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
