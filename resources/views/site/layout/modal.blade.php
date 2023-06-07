<div class="modal fade mymodal" id="modal_login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h4 class="modal-title" id="myModalLabel">會員登入</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            {!! Form::open(['url' => '/login', 'id' => 'log_form']) !!}
              <div class="form-group" id='form_log_account'>
                {!! Form::text('log_account', null, ['id' => 'log_account', 'class' => 'form-control', 'required', 'formnovalidate', 'title' => 'please enter your account', 'placeholder' => '請輸入你的帳號']) !!}
              </div>
              <div class="form-group" id='form_log_password'>
                {!! Form::password('log_password', ['id' => 'log_password', 'class' => 'form-control', 'required', 'formnovalidate', 'title' => 'Please enter your password', 'placeholder' => '請輸入你的密碼']) !!}
                <span class="help-block"></span>
              </div>
            {!! Form::close() !!}
            <div class="login__icon">
                <i class="fas fa-sign-in-alt"></i>
            </div>
            <button value="login" id="log_submit" class="btn btn-success btn-block btn-member">會員登入</button>
            <div class="login__icon">
                <i class="fab fa-google"></i>
            </div>
            <button class="btn btn-danger btn-block btn-member" onclick="_google_login()">Google 登入</button>
            <hr />
            <button class="btn btn-warning btn-block btn-member" id="btn_forget_pwd" data-toggle="modal" data-dismiss="modal" >忘記密碼</button>
            <button class="btn btn-info btn-block btn-member" id="btn_register" data-toggle="modal" data-dismiss="modal" >還沒有會員</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade mymodal mymodal-mob" id="modal_register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">會員註冊</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="form-group col-md-6" id="form_reg_account">
            {!! Form::text('reg_account', null, ['id' => 'reg_account', 'class' => 'form-control', 'required', 'title' => 'Please enter your account', 'placeholder' => '帳號(6~20字英文數字)']) !!}
          </div>
          <div class="form-group col-md-6" id="form_reg_nickname">
            {!! Form::text('reg_nickname', null, ['id' => 'reg_nickname', 'class' => 'form-control', 'required', 'title' => 'Please enter your name', 'placeholder' => '姓名']) !!}
          </div>
          <div class="form-group col-md-6" id="form_reg_password">
            {!! Form::password('reg_password', ['id' => 'reg_password', 'class' => 'form-control', 'required', 'title' => 'Please enter your password', 'placeholder' => '密碼(8~30字 需含數字英文)']) !!}
            <span class="help-block"></span>
          </div>
          <div class="form-group col-md-6" id="form_reg_r_password">
            {!! Form::password('reg_r_password', ['id' => 'reg_r_password', 'class' => 'form-control', 'required', 'title' => 'Please check your password', 'placeholder' => '確認密碼']) !!}
            <span class="help-block"></span>
          </div>
          <div class="form-group col-md-6" id="form_reg_email">
            {!! Form::email('reg_email', null, ['id' => 'reg_email', 'class' => 'form-control', 'required', 'title' => 'Please enter your email', 'placeholder' => '使用者信箱']) !!}
            <span class="help-block"></span>
          </div>
          <div class="form-group col-md-6" id="form_reg_cellphone">
            {!! Form::tel('reg_cellphone', null, ['id' => 'reg_cellphone', 'class' => 'form-control', 'required', 'title' => 'Please enter your phone number', 'placeholder' => '使用者手機號碼', 'maxlength' => '20']) !!}
            <span class="help-block"></span>
          </div>
          <div class="form-group g-recaptcha col-md-8" data-sitekey="6LdfACgUAAAAAIorFCX5nPyLnf5ljD_dV7cMEAJ9"></div>
          <div class="form-group col-md-8">
            <input type="checkbox" id="checkbox_agree">
            <label for="checkbox_agree">我同意並且已閱讀 <a href="https://www.ds-vep.com/contact/terms" target="_new">隱私政策</a></label>
          </div>

          <div class="col-md-6">
            <button type="button" id="reg_submit" disabled class="btn btn-success btn-block btn-member">會員註冊</button>
            <span class="help-block"></span>
          </div>
          <div class="col-md-6">
            <button type="button" class="btn btn-warning btn-block btn-member" id="btn_login" data-toggle="modal" data-dismiss="modal" >已有會員</button>
            <span class="help-block"></span>
          </div>
          <div class="form-group col-md-6">
              <?php // TODO: oAuth Login ?>
              {{-- 或者你可以使用這些註冊
              <div class="logo">
                {{ HTML::image('img/logo/facebook.png') }}
                {{ HTML::image('img/logo/Google Plus.png') }}
                {{ HTML::image('img/logo/twitter.png') }}
                {{ HTML::image('img/logo/weibo.png') }}
              </div> --}}
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade mymodal" id="modal_forget_pwd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">忘記密碼</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              {!! Form::text('fog_account', null, ['id' => 'fog_account', 'class' => 'form-control', 'required', 'formnovalidate', 'title' => 'please enter your account', 'placeholder' => '請輸入你的帳號']) !!}
            </div>
            <div class="form-group">
              {!! Form::text('fog_email', null, ['id' => 'fog_email', 'class' => 'form-control', 'required', 'formnovalidate', 'title' => 'please enter your account', 'placeholder' => '請輸入你的信箱']) !!}
              <span class="help-block"></span>
            </div>
            <button type="button" id="search_password" value="login" name="fog_email" class="btn btn-success btn-block btn-member">獲得新密碼</button>
            <button type="button" class="btn btn-warning btn-block btn-member" id="btn_back_login" data-toggle="modal" data-dismiss="modal" >回到登入</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
