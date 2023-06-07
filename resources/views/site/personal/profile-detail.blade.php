<input type="hidden" id="is_teacher" value="{{ isset($teacher_data) }}" />
<div class="col-md-9">
  <ul class="nav nav-tabs">
    <li class="active" id="page_profile_detail"><a href="javascript:void(0);">個人基本資料</a></li>
    @if ($member_data->reg_method == 'web')
      <li id="page_profile_password"><a href="javascript:void(0);">更改密碼</a></li>
    @endif
    <li id="page_profile_credit"><a href="javascript:void(0);">匯款資訊</a></li>
  </ul>
  <div class="profile-content">
    <form id="detail_form">
      <div class="notice">
        <span><i class="fa fa-hand-o-right" aria-hidden="true"></i> 除身分證以外，資料將會顯示在個人頁面</span><br />
        <span><i class="fa fa-hand-o-right" aria-hidden="true"></i> 如要申請講師，暱稱、性別、手機及大頭照為必填</span><br />
      </div>
      <div class="form-group row has-feedback" id="form_det_nickname" data-nickname={{ $member_data->nickname }}>
        <label class="col-sm-2 col-form-label">姓名<i class="must">*</i></label>
        <div class="col-sm-10">
          {!! Form::text('det_nickname', $member_data->nickname, ['id' => 'det_nickname', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '你的姓名', 'maxlength' => '20']) !!}
          <span class="form-control-feedback fa" id="i_det_nickname" aria-hidden="true"></span>
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_name" data-name={{ $member_data->m_name }}>
        <label class="col-sm-2 col-form-label">暱稱</label>
        <div class="col-sm-10">
          {!! Form::text('det_name', $member_data->m_name , ['id' => 'det_name', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '你的暱稱', 'maxlength' => '30']) !!}
          <span class="form-control-feedback fa" id="i_det_name" aria-hidden="true"></span>
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_id_code" data-idcode={{ $identity_code }}>
        <label class="col-sm-2 col-form-label">身分證</label>
        <div class="col-sm-10">
          {!! Form::text('det_id_code', $identity_code, ['id' => 'det_id_code', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '你的身分證(外拍需要)', 'maxlength' => '10']) !!}
          <span class="form-control-feedback fa" id="i_det_id_code" aria-hidden="true"></span>
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_sex" data-sex={{ $member_data->sex }}>
        <label for="inputPassword" class="col-sm-2 col-form-label">性別</label>
        <div class="col-sm-10 select-style">
          {{ Form::select('det_sex', [], '', ['id' => 'det_sex']) }}
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_cellphone" data-cellphone={{ $member_data->cellphone }}>
        <label class="col-sm-2 col-form-label">手機號碼<i class="must">*</i></label>
        <div class="col-sm-10">
          <div class="cellphoneInputSet">
            <div class="cellphoneInputSet__input">
              {!! Form::tel('det_cellphone', $member_data->cellphone, ['id' => 'det_cellphone', 'class' => 'form-control ', 'formnovalidate', 'placeholder' => '最常用的手機號碼', 'maxlength' => '20', 'disabled' => $member_data->cellphone_verify_status == 1? 'disabled': false]) !!}
              <span class="form-control-feedback fa" id="i_det_cellphone" aria-hidden="true"></span>
            </div>
            <div class="cellphoneInputSet__btns">
              <button type="button" id="btn_verify_cellphone" class="btn btn-success{{ $member_data->cellphone_verify_status == 1? ' hidden': '' }}">驗證手機</button>
              <button type="button" id="btn_refill_cellphone" class="btn btn-info{{ $member_data->cellphone_verify_status == 0? ' hidden': '' }}">修改手機</button>
            </div>
          </div>
          <div id="hint_phone" class="hintPhone hidden">
            請輸入數字（不需輸入符號），若非中華民國手機號碼，請在前面直接加入國碼。<br>
            美國1、日本81、中國86、香港852、澳門853、馬來西亞60、新加坡65&hellip;<a href="https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E7%94%B5%E8%AF%9D%E5%8C%BA%E5%8F%B7%E5%88%97%E8%A1%A8" target="_blank">更多</a>
          </div>
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_birthday" data-btd="{{ $member_data->birthday }}">
        <label class="col-sm-2 col-form-label">生日</label>
        <div class="col-sm-10 select-style">
          {{ Form::select('det_birthday_year', [], '', ['id' => 'det_birthday_year']) }}
          {{ Form::select('det_birthday_month', [], '', ['id' => 'det_birthday_month', 'disabled']) }}
          {{ Form::select('det_birthday_day', [], '', ['id' => 'det_birthday_day', 'disabled']) }}
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_email" data-email={{ $member_data->email }}>
        <label class="col-sm-2 col-form-label">信箱<i class="must">*</i></label>
        <div class="col-sm-10">
          {!! Form::email('det_email', $member_data->email, ['id' => 'det_email', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '最常用的信箱', 'disabled']) !!}
          <span class="form-control-feedback fa" id="i_det_email" aria-hidden="true"></span>
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_address" data-address={{ $member_data->address }}>
        <label class="col-sm-2 col-form-label">地址(統編用)</label>
        <div class="col-sm-10 select-style marginbot-20">
          {{ Form::select('det_address_county', [], '', ['id' => 'det_address_county']) }}
          {{ Form::select('det_address_township', [], '', ['id' => 'det_address_township', 'disabled']) }}
          {{ Form::select('det_address_road', [], '', ['id' => 'det_address_road', 'disabled']) }}
          {!! Form::text('det_address_detail','', ['id' => 'det_address_detail', 'class' => 'form-control', 'placeholder' => '詳細地址', 'maxlength' => '20']) !!}
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_fb_link" data-fb={{ $member_data->facebook_link }}>
        <label class="col-sm-2 col-form-label">FB</label>
        <div class="col-sm-10">
          {!! Form::url('det_fb_link', $member_data->facebook_link, ['id' => 'det_fb_link', 'class' => 'form-control', 'formnovalidate', 'placeholder' => 'FB個人頁面或粉絲團網址']) !!}
          <span class="form-control-feedback fa" id="i_det_fb_link" aria-hidden="true"></span>
        </div>
      </div>

      <div class="form-group row has-feedback" id="form_det_line_id" data-line={{ $member_data->line_id }}>
        <label class="col-sm-2 col-form-label">LINE ID</label>
        <div class="col-sm-10">
          {!! Form::text('det_line_id', $member_data->line_id, ['id' => 'det_line_id', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '個人Line ID', 'maxlength' => '20']) !!}
          <span class="form-control-feedback fa" id="i_det_line_id" aria-hidden="true"></span>
        </div>
      </div>

      <div class="form-group row has-feedback">
        <div class="col-sm-12 method">
          <button type="button" class="btn btn-info" id="btn_profile_detail">送出</button>
        </div>
      </div>
    </form>

    <form id="password_form">
      <div id="origin_password_form" class="form-group has-feedback row">
        <label class="col-sm-2 col-form-label">原密碼</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="origin_password" placeholder="輸入原本使用的密碼" maxlength="30">
          <span class="form-control-feedback fa" id="i_det_origin_pwd" aria-hidden="true"></span>
        </div>
      </div>
      <div id="new_password_form" class="form-group has-feedback row">
        <label class="col-sm-2 col-form-label">新密碼</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="new_password" placeholder="輸入想更換的密碼(8~30字 需含數字英文)" maxlength="30">
          <span class="form-control-feedback fa" id="i_det_pwd" aria-hidden="true"></span>
        </div>
      </div>
      <div id="r_new_password_form" class="form-group has-feedback row">
        <label class="col-sm-2 col-form-label">確認新密碼</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="r_new_password" placeholder="確認想更換的密碼(8~30字 需含數字英文)" maxlength="30">
          <span class="form-control-feedback fa" id="i_det_r_pwd" aria-hidden="true"></span>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12 method">
          <button type="button" class="btn btn-info" id="btn_profile_password">送出</button>
        </div>
      </div>
    </form>

    <form id="profile_bank_form">
      <div id="bank_form" class="form-group has-feedback row">
        <label class="col-sm-2 col-form-label">銀行代碼</label>
        <div class="col-sm-10">
          {!! Form::text('bank_id', $member_data->bank_number, ['id' => 'bank_id', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '銀行代碼', 'maxlength' => '5']) !!}
        </div>
      </div>
      <div id="bank_accounting_form" class="form-group has-feedback row">
        <label class="col-sm-2 col-form-label">戶名</label>
        <div class="col-sm-10">
          {!! Form::text('bank_accounting_name', $member_data->account_name, ['id' => 'bank_accounting_name', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '銀行戶名', 'maxlength' => '30']) !!}
        </div>
      </div>
      <div id="bank_accounting_form" class="form-group has-feedback row">
        <label class="col-sm-2 col-form-label">帳號</label>
        <div class="col-sm-10">
          {!! Form::text('bank_accounting', $member_data->account_number, ['id' => 'bank_accounting', 'class' => 'form-control', 'formnovalidate', 'placeholder' => '銀行帳號', 'maxlength' => '20']) !!}
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12 method">
          <button type="button" class="btn btn-info" id="btn_profile_bank">送出</button>
        </div>
      </div>
    </form>
  </div>
</div>
