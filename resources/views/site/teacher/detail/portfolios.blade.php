<div id="portfolios_content" class="teacher-content" style="display: none;">
    <div id="portfolios_card" class="card">
        <div id="portfolios_body" class="card-body portfolios__body"></div>
        <div id="loading_block" class="loading col-xs-12">
            <span>載入作品中</span>
        </div>
    </div>
    @if ($member_data != "" && $member_data->m_id == $teacher_member_data->m_id)
        <div id="portfolios_edit_group">
            <div class="portfolios__edit">
                <div id="edit_btn_group" class="edit__buttons" style="display: none;">
                    <label id="upload_image_btn" class="btn btn-success">
                        <i class="fas fa-image" aria-hidden="true"> 上傳圖片</i>
                        <input id="upload_image" type="file" style="display: none;">
                    </label>
                    <div id="edit_ok" class="btn btn-success edit__ok">
                        確認
                    </div>
                    <div id="edit_cancel" class="btn btn-default edit__cancel">
                        取消
                    </div>
                </div>
                <div class="portfolios__edit__btn__group">
                    <div id="portfolios_edit_btn" class="portfolios__edit__btn">
                        <i class="edit__icon fas fa-pencil-alt"></i>
                        <div>
                            <div class="edit__text">
                                編輯作品集
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upload">
                <div id="uploading__text" class="media__upload__text" style="display: none;">檔案上傳中...
                    <div class="upload__progress">
                        <div id="upload_progress_bar" class="upload__progress__bar"></div>
                    </div>
                </div>
                <div id="uploaded__text" class="media__upload__text" style="display: none;">檔案上傳完成</div>
                <div id="uploadErr__text" class="media__upload__text" style="display: none;">檔案上傳失敗</div>
            </div>
        </div>
    @endif
</div>
