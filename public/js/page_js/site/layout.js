let firebaseController = firebaseModule();

var layout = (function()
{
  var _const;
  _const = function()
  {
    this._check_authorized = new Array();
    for (var i = 1; i <= 6; i++)
    {
      //Initial Block Authorize Array
      this._check_authorized[i] = false;
    }
    this._construct();
  }
  _const.prototype =
  {
    _construct: function()
    {
      this._unread   = 0;
      this.searching = false;

      //Register Input Colume
      this._reg_account         = $('#reg_account');
      this._reg_nickname        = $('#reg_nickname');
      this._reg_password        = $('#reg_password');
      this._reg_r_password      = $('#reg_r_password');
      this._reg_email           = $('#reg_email');
      this._reg_cellphone       = $('#reg_cellphone');
      this._reg_submit          = $('#reg_submit');
      this._checkbox_agree      = $('#checkbox_agree');
      this._form_reg_account    = $('#form_reg_account');
      this._form_reg_nickname   = $('#form_reg_nickname');
      this._form_reg_password   = $('#form_reg_password');
      this._form_reg_r_password = $('#form_reg_r_password');
      this._form_reg_email      = $('#form_reg_email');
      this._form_reg_cellphone  = $('#form_reg_cellphone');

      //Login Input Colume
      this._log_account       = $('#log_account');
      this._log_password      = $('#log_password');
      this._log_submit        = $('#log_submit');
      this._form_log_account  = $('#form_log_account');
      this._form_log_password = $('#form_log_password');

      //Modal
      this._modal_register    = $('#modal_register');
      this._modal_login       = $('#modal_login');
      this._modal_forget_pwd  = $('#modal_forget_pwd');

      //Button
      this._btn_register    = $('#btn_register');
      this._btn_login       = $('#btn_login');
      this._btn_back_login  = $('#btn_back_login');
      this._btn_forget_pwd  = $('#btn_forget_pwd');
      this._search_password = $('#search_password');
      this._sidebar_login   = $('#sidebar_login');
      this._link_admin      = $('#link_admin');
      this._contact         = $('#contact, #contact-sidebar');

      //Sidebar
      this._body                  = $("body");
      this._wrapper               = $('#wrapper');
      this._data_toggle_offcanvas = $('[data-toggle = "offcanvas"]');
      this._overlay               = $('.overlay');
      this._blank                 = $('.blank');
      this._hamburger             = $('.hamburger');
      this._is_closed             = false;
      this._personal_name         = $('.personal-name');
      this.a_become_teacher       = $('.a_become_teacher');

      //Mail Verify
      this._email_verify  = $('#email_verify');
      this._verify        = $('#verify');

      //Search
      this._btn_input_search = $('#btn_input_search');
      this._btn_search       = $('#btn_search');
      this._btn_search_row   = $('#btn_search_row');
      this._load_animation   = $('#load_animation');
      this._search_close     = $('#search_close');
      this._search_result    = $('#search_result')
      this._search_wrapper   = $('#search_wrapper');
      this._input_search     = $('#input_search');
      this._input_search_row = $('#input_search_row');
      this._oauth_register   = $('#oauth_register');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      firebaseController.initFirebase();
      objThis._initialAll();
    },
    _initialAll: function()
    {
      var path_url = document.location.pathname;
      if (($('#login_account').val() != '') && (path_url != '/profile/message'))
      {
        firebaseController.getRealTimeMessage($('#login_account').val(), this);
      }

      //Banner Link
      $('#intro').on('click', $.proxy(function()
      {
          location.href = '/announcement';
      }, this))

      //If Register Account Via Google or Facebook will popup
      if (this._oauth_register.val() == 'ok')
      {
          $.alert('註冊成功', '歡迎');
      }

      //Contact
      this._contact.on('click', $.proxy(function()
      {
          $.confirm
          ({
              columnClass: 'medium',
              containerFluid: true,
              title: '聯絡客服',
              content:
                '<div class="form-row">' +
                  '<div class="form-group col-md-12">' +
                    '<input id="subject" class="form-control" placeholder="主旨">' +
                  '</div>' +
                  '<div class="form-group col-md-4">' +
                    '<input id="contact_name" class="form-control" placeholder="聯絡姓名(選填)">' +
                  '</div>' +
                  '<div class="form-group col-md-4">' +
                    '<input id="contact_cellphone" class="form-control" maxlength="10" placeholder="聯絡電話(選填)">' +
                  '</div>' +
                  '<div class="form-group col-md-4">' +
                    '<input id="contact_email" class="form-control" placeholder="聯絡信箱(選填)">' +
                  '</div>' +
                  '<div class="form-group col-md-12">' +
                    '<textarea id="content" class="form-control" rows="12" style="resize:none;" placeholder="內文"></textarea>' +
                  '</div>' +
                '</div>',
              onOpenBefore: function()
              {
                  if ((document.documentElement.clientHeight - 50) <= $('.jconfirm-type-animated')[0].clientHeight)
                  {
                      let el    = $('.jconfirm-type-animated')[0];
                      let style =
                      {
                          'max-height': '80vh',
                          'overflow-y': 'scroll',
                          'margin': '0px'
                      }
                      $(el).css(style);
                  }
              },
              buttons:
              {
                  'yes':
                  {
                      'text': '送出',
                      btnClass: 'btn-success',
                      action: function()
                      {
                          var subject = this.$content.find('#subject').val();
                          var content = this.$content.find('#content').val();
                          var contact_name = this.$content.find('#contact_name').val();
                          var contact_email = this.$content.find('#contact_email').val();
                          var contact_cellphone = this.$content.find('#contact_cellphone').val();
                          if (subject == '')
                          {
                              $.alert('請輸入主旨', '錯誤');
                              $('#subject').focus();
                              return false;
                          }
                          else if (content == '')
                          {
                              $.alert('請輸入內容', '錯誤');
                              $('#content').focus();
                              return false;
                          }
                          else
                          {
                              $.ajax
                              ({
                                  type: 'POST',
                                  url: '/ajax/send_contact_mail',
                                  dataType: 'json',
                                  data:
                                  {
                                      subject: subject,
                                      contact_content: content,
                                      contact_name: contact_name,
                                      contact_email: contact_email,
                                      contact_cellphone: contact_cellphone
                                  },
                                  headers:
                                  {
                                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                  },
                                  beforeSend: function()
                                  {
                                      $.dialog
                                      ({
                                          title: '發送意見中',
                                          content: '請稍候...',
                                          draggable: false,
                                          closeIcon: false,
                                          theme: 'material'
                                      })
                                  },
                                  success: function(data)
                                  {
                                      $('.jconfirm-material').hide();
                                      $.alert('意見已送出', '成功')
                                  },
                                  error: function(xhr, type)
                                  {
                                      alert('Ajax error!');
                                  },
                              });
                          }
                      },
                  },
                  'no':
                  {
                      'text': '取消',
                      btnClass: 'btn-red',
                      action: function() {}
                  }
              }
          })
      }, this))

      //Sildebar Personal Name Font Size
      var name = this._personal_name.find('span').text();
      if (this._have_chinese_word(name))
      {
          if (name.length > 16) { this._personal_name.attr('style', 'font-size: 1.8rem;'); }
          else if (name.length > 10) { this._personal_name.attr('style', 'font-size: 1.5rem;'); }
      }
      else
      {
          if (name.length > 18) { this._personal_name.attr('style', 'font-size: 1.2rem;'); }
          else if (name.length > 12) { this._personal_name.attr('style', 'font-size: 1.6rem;'); }
      }

      this._email_verify_situation();

      if (this._verify.val() != '')
      {
        var message = this._verify.val() == '認證成功' ? '成功' : '失敗';
        $.alert(this._verify.val(), message);
      }

      //Verify Identity
      this._link_admin.on('click', $.proxy(function()
      {
          $.confirm
          ({
              title: '請輸入密碼',
              content: '' +
                  '<div class="form-group">' +
                      '<input id="admin_password" type="password" placeholder="Password" class="admin_password form-control" required autofocus/>' +
                  '</div>' +
                  '<script>' +
                      '$("#admin_password").on("keyup", $.proxy(function(e)' +
                      '{' +
                          'var code = (e.keyCode ? e.keyCode : e.which);' +
                          'if (code == 13)' +
                          '{' +
                              '$(".btn-blue").click();' +
                          '}' +
                      '}, this));' +
                  '</script>',
              buttons:
              {
                  '出發！':
                  {
                      btnClass: 'btn-blue',
                      action: function ()
                      {
                          var password = this.$content.find('.admin_password').val();
                          if (!password)
                          {
                              $.alert('請輸入密碼', '錯誤');
                              return false;
                          }
                          else
                          {
                              var objThis = this;
                              $.ajax
                              ({
                                  type: 'POST',
                                  url: '/ajax/loginAdmin',
                                  dataType: 'json',
                                  async: false,
                                  data:
                                  {
                                      password: password
                                  },
                                  headers:
                                  {
                                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                  },
                                  success: function(message)
                                  {
                                      if (message == false)
                                      {
                                          $.confirm
                                          ({
                                              title: '錯誤！',
                                              content: '你輸入的密碼錯誤！',
                                              type: 'red',
                                              typeAnimated: true,
                                              buttons:
                                              {
                                                  tryAgain:
                                                  {
                                                      text: '確定',
                                                      btnClass: 'btn-red',
                                                      action: function() {}
                                                  },
                                              }
                                          });
                                          objThis.$content.find('.admin_password').val('');
                                      }
                                      else if (message == '權限不足')
                                      {
                                          $.confirm
                                          ({
                                              title: '錯誤！',
                                              content: '權限不足',
                                              type: 'red',
                                              typeAnimated: true,
                                              buttons:
                                              {
                                                  getout:
                                                  {
                                                      text: '完成',
                                                      btnClass: 'btn-red',
                                                      action: function() {}
                                                  },
                                              }
                                          });
                                      }
                                      else if (message === true) { location.href = '/admin'; }
                                  },
                                  error: function(xhr, type)
                                  {
                                      this._request_relogin();
                                  }
                              })
                              return false;
                          }
                      }
                  },
                  '取消': {},
              },
          });
      }, this));

      //Open Login Modal
      this._sidebar_login.on('click', $.proxy(function()
      {
          $.ajax
          ({
              type: 'POST',
              url: '/ajax/add_click_data',
              dataType: 'json',
              data:
              {
                  item: 'login'
              },
              headers:
              {
                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
              },
              complete: function()
              {
                  layout._log_account.val('');
                  layout._log_password.val('');
                  layout._form_log_account.removeClass('has-error');
                  layout._form_log_password.removeClass('has-error');
                  layout._form_log_account.removeClass('has-success');
                  layout._form_log_password.removeClass('has-success');
                  layout._modal_forget_pwd.modal('hide');
                  layout._modal_register.modal('hide');
                  layout._modal_login.modal('show');
              }
          })
      }, this));

      //Switch Modal
      this._btn_register.on('click', $.proxy(function()
      {

          $.ajax
          ({
              type: 'POST',
              url: '/ajax/add_click_data',
              dataType: 'json',
              data:
              {
                  item: 'register'
              },
              headers:
              {
                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
              },
              complete: function()
              {
                  layout._reg_account.val('');
                  layout._reg_nickname.val('');
                  layout._reg_password.val('');
                  layout._reg_r_password.val('');
                  layout._reg_email.val('');
                  layout._reg_cellphone.val('');
                  layout._form_reg_account.removeClass('has-error');
                  layout._form_reg_nickname.removeClass('has-error');
                  layout._form_reg_password.removeClass('has-error');
                  layout._form_reg_r_password.removeClass('has-error');
                  layout._form_reg_email.removeClass('has-error');
                  layout._form_reg_cellphone.removeClass('has-error');
                  layout._form_reg_account.removeClass('has-success');
                  layout._form_reg_nickname.removeClass('has-success');
                  layout._form_reg_password.removeClass('has-success');
                  layout._form_reg_r_password.removeClass('has-success');
                  layout._form_reg_email.removeClass('has-success');
                  layout._form_reg_cellphone.removeClass('has-success');
                  layout._modal_login.modal('hide');
                  layout._modal_forget_pwd.modal('hide');
                  layout._modal_register.modal('show');
              }
          })
      }, this));

      this._btn_login.on('click', $.proxy(function()
      {
        this._go_to_login();
      }, this));

      this._btn_back_login.on('click', $.proxy(function()
      {
        this._go_to_login();
      }, this));

      this._btn_forget_pwd.on('click', $.proxy(function()
      {
        this._modal_login.modal('hide');
        this._modal_register.modal('hide');
        this._modal_forget_pwd.modal('show');
      }, this));

      //Register Submit
      this._reg_submit.on('click', $.proxy(function()
      {
          var objThis = this;

          if ((!objThis._check_account_no_empty()) || (!objThis._check_account_all_forma()))
          {
              $.alert
              ({
                  title: '錯誤',
                  content: '欄位錯誤，請填寫完整',
              });
              return;
          }

          $.confirm
          ({
              title: '確認',
              content: '信箱驗證後將無法再次更改信箱，請問您確定要使用這個信箱嗎？',
              buttons:
              {
                  '確定':
                  {
                      'btnClass': 'btn-success',
                      action: function()
                      {
                          if (objThis._check_account_format() === true)
                          {
                              $.ajax
                              ({
                                  type: 'POST',
                                  url: '/register',
                                  dataType: 'json',
                                  data:
                                  {
                                      account: objThis._reg_account.val(),
                                      nickname: objThis._reg_nickname.val(),
                                      password: objThis._reg_password.val(),
                                      email: objThis._reg_email.val(),
                                      cellphone: objThis._reg_cellphone.val()
                                  },
                                  headers:
                                  {
                                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                  },
                                  beforeSend: function()
                                  {
                                      $.dialog
                                      ({
                                          title: '註冊中',
                                          content: '請稍候...',
                                          draggable: false,
                                          closeIcon: false,
                                          theme: 'material'
                                      })
                                  },
                                  success: function(data, status, xhr)
                                  {
                                      if (xhr.status == 200) { location.reload(); }
                                      else
                                      {
                                          $('.jconfirm-material').hide();
                                          $.confirm
                                          ({
                                              title: '錯誤！',
                                              content: data,
                                              type: 'red',
                                              typeAnimated: true,
                                              buttons:
                                              {
                                                  '關閉':
                                                  {
                                                      btnClass: 'btn-red',
                                                      action: function() {}
                                                  },
                                              }
                                          });
                                      }
                                  },
                                  error: function(xhr, type)
                                  {
                                      $('.jconfirm-material').hide();
                                      $.alert('請重新整理後再行註冊', '錯誤');
                                  }
                              })
                          }
                      }
                  },
                  '取消':
                  {
                      'btnClass': 'btn-red',
                      action: function() {}
                  }
              }
          })
      }, this));

      //Login Submit Via Button
      this._log_submit.on('click', $.proxy(function()
      {
        var objThis = this;
        if (this._log_account.val() == '') { this._form_log_account.addClass('has-error') }
        else { this._form_log_account.removeClass('has-error') }

        if (this._log_password.val() == '') { this._form_log_password.addClass('has-error') }
        else { this._form_log_password.removeClass('has-error') }

        if ((this._log_account.val() != '') && (this._log_password.val() != ''))
        {
          this._log_account.attr('disabled', 'disabled');
          this._log_password.attr('disabled', 'disabled');
          this._log_submit.attr('disabled', 'disabled');
          this._btn_register.attr('disabled', 'disabled');
          this._btn_forget_pwd.attr('disabled', 'disabled');
          if (objThis._check_login_situation() === false)
          {
            setTimeout(function () {
              location.reload();
            }, 1000);
          }
          else
          {
            this._log_account.removeAttr('disabled', 'disabled');
            this._log_password.removeAttr('disabled', 'disabled');
            this._log_submit.removeAttr('disabled', 'disabled');
            this._btn_register.removeAttr('disabled', 'disabled');
            this._btn_forget_pwd.removeAttr('disabled', 'disabled');
          }
        }
      }, this));

      this._search_password.on('click', $.proxy(function()
      {
          var account = $('#fog_account').val();
          var email   = $('#fog_email').val();

          $.ajax
          ({
              type: 'POST',
              url: '/ajax/searchPassword',
              dataType: 'json',
              data:
              {
                  account: account,
                  email  : email,
              },
              headers:
              {
                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
              },
              beforeSend: function()
              {
                  $.dialog
                  ({
                      title: '確認中',
                      content: '請稍候...',
                      draggable: false,
                      closeIcon: false,
                      theme: 'material'
                  })
              },
              success: function(message, status, xhr)
              {
                  $('.jconfirm-material').hide();

                  if (xhr.status == 200) { $.alert(message, '成功'); }
                  else if (xhr.status == 202) { $.alert(message, '失敗'); }
              },
              error: function(xhr, type)
              {
                alert('Ajax error!');
              }
          })
      }, this))

      //Login Submit Via Press Enter
      this._log_password.on('keypress', $.proxy(function(e)
      {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13)
        {
          var objThis = this;
          if (this._log_account.val() == '') { this._form_log_account.addClass('has-error'); }
          else { this._form_log_account.removeClass('has-error'); }

          if (this._log_password.val() == '') { this._form_log_password.addClass('has-error'); }
          else { this._form_log_password.removeClass('has-error'); }

          if ((this._log_account.val() != '') && (this._log_password.val() != ''))
          {
            this._log_account.attr('disabled', 'disabled');
            this._log_password.attr('disabled', 'disabled');
            this._log_submit.attr('disabled', 'disabled');
            this._btn_register.attr('disabled', 'disabled');
            this._btn_forget_pwd.attr('disabled', 'disabled');
            if (objThis._check_login_situation() === false)
            {
              setTimeout(function () {
                location.reload();
              }, 1000);
            }
            else
            {
              this._log_account.removeAttr('disabled', 'disabled');
              this._log_password.removeAttr('disabled', 'disabled');
              this._log_submit.removeAttr('disabled', 'disabled');
              this._btn_register.removeAttr('disabled', 'disabled');
              this._btn_forget_pwd.removeAttr('disabled', 'disabled');
            }
          }
        }
      }, this));

      //Check Register Account
      this._reg_account.on('blur', $.proxy(function()
      {
          this._verify_account_forma();
          this._check_account_no_empty();
      }, this));

      this._reg_account.bind('input', function(event)
      {
        var o = $(this),
            v = o.val();
        if (v.length > 20)
        {
          o.val(v.slice(0, 20));
          event.preventDefault();
        }
      })

      // Chcek Register Password
      this._reg_password.on('blur', $.proxy(function()
      {
          this._verify_password_forma();
          this._check_account_no_empty();
      }, this));

      this._reg_password.bind('input', function(event)
      {
        var o = $(this),
            v = o.val();
        if (v.length > 30)
        {
          o.val(v.slice(0, 30));
          event.preventDefault();
        }
      })

      this._reg_r_password.on('blur', $.proxy(function()
      {
          this._verify_r_password_forma();
          this._check_account_no_empty();
      }, this));

      this._reg_r_password.bind('input', function(event)
      {
        var o = $(this),
            v = o.val();
        if (v.length > 30)
        {
          o.val(v.slice(0, 30));
          event.preventDefault();
        }
      })

      //Check Registar Name
      this._reg_nickname.on('blur', $.proxy(function()
      {
          this._verify_nickname_forma();
          this._check_account_no_empty();
      }, this));

      this._reg_nickname.bind('input', function(event)
      {
        var o = $(this),
            v = o.val();
        if (v.length > 20)
        {
          o.val(v.slice(0, 20));
          event.preventDefault();
        }
      })

      //Check Register Email Format
      this._reg_email.on('blur', $.proxy(function()
      {
          this._verify_email_forma();
          this._check_account_no_empty();
      }, this));

      //Check Register Phone Number Format
      this._reg_cellphone.on('blur', $.proxy(function()
      {
          this._verify_cellphone_forma();
          this._check_account_no_empty();
      }, this));

      //Check Checkbox Is Agree Or Not
      this._checkbox_agree.on('click', $.proxy(function()
      {
        var agree = this._checkbox_agree.prop('checked');
        if (agree) { this._check_authorized[6] = true; }
        else { this._check_authorized[6] = false; }
        this._check_account_no_empty();
      }, this));

      //Check Login Account
      this._log_account.on('blur', $.proxy(function()
      {
        if (this._log_account.val() === '') { this._form_log_account.addClass('has-error'); }
        else { this._form_log_account.removeClass('has-error'); }
      }, this));

      this._log_account.bind('input', function(event)
      {
        var o = $(this),
            v = o.val();
        if (v.length > 20)
        {
          o.val(v.slice(0, 20));
          event.preventDefault();
        }
      })

      //Check Login Password
      this._log_password.on('blur', $.proxy(function()
      {
        if (this._log_password.val() === '') { this._form_log_password.addClass('has-error'); }
        else { this._form_log_password.removeClass('has-error'); }
      }, this));

      this._log_password.bind('input', function(event)
      {
        var o = $(this),
            v = o.val();
        if (v.length > 30)
        {
          o.val(v.slice(0, 30));
          event.preventDefault();
        }
      })

      //slidebar Toggle
      this._hamburger.on('click', $.proxy(function()
      {
        if (this._is_closed === true)
        {
          this._overlay.hide();
          this._hamburger.addClass('is-closed');
          this._is_closed = false;
          this._blank.hide();
          this._body.css('overflow', 'visible');
        }
        else
        {
          this._overlay.show();
          this._hamburger.removeClass('is-closed');
          this._is_closed = true;
          this._blank.show();
          this._body.css('overflow', 'hidden');
        }
      }, this));

      this._data_toggle_offcanvas.on('click', $.proxy(function()
      {
        this._wrapper.toggleClass('toggled');
      }, this));

      this._blank.on('click', $.proxy(function()
      {
        this._hamburger.eq(0).trigger('click');
      }, this));

      this._input_search.on('keydown', $.proxy(function(e)
      {
          if (e.key == 'Escape')
          {
              this._close_search_wrapper();
          }
          else if (e.key == 'Enter')
          {
              let search_keyword = this._input_search.val();

              if (search_keyword != '')
              {
                  this._search_wrapper.addClass('scroll-top');
                  this._search_function(search_keyword);
              }
          }
      }, this));

      this._input_search_row.on('keydown', $.proxy(function(e)
      {
          if (e.key == 'Escape')
          {
              this._close_search_wrapper();
          }
          else if (e.key == 'Enter')
          {
              let search_keyword = this._input_search_row.val();

              if (search_keyword != '')
              {
                  this._search_wrapper.addClass('scroll-top');
                  this._search_function(search_keyword);
              }
          }
      }, this));

      this._search_close.on('click', $.proxy(function()
      {
          this._close_search_wrapper();
      }, this));

      this._btn_search.on('click', $.proxy(function()
      {
          let search_keyword = this._input_search.val();

          if (search_keyword != '')
          {
              this._search_wrapper.addClass('scroll-top');
              this._search_function(search_keyword);
          }
      }, this));

      this._btn_search_row.on('click', $.proxy(function()
      {
          let search_keyword = this._input_search_row.val();

          if (search_keyword != '')
          {
              this._search_wrapper.addClass('scroll-top');
              this._search_function(search_keyword);
          }
      }, this));

      // Error Page Btn 404頁面
      $('#btn_help').on('click', $.proxy(function()
      {
        $('.error-page').animate({top: '80%'});
        $('.error-page-help').attr('style', 'opacity: 1;');
        $('#btn_help').text('真是遺憾啊').attr('disabled','');
      }, this));

      var fundraising = $('.js-fundraising');

      // 計算優惠剩餘天數
      for (i = 0; i < fundraising.length; i++)
      {
          if (fundraising[0].dataset.end_fund)
          {
              var left_day = Math.ceil((new Date(fundraising[i].dataset.end_fund).setHours(23, 59, 59, 999) - new Date()) / 1000 / 60 / 60 / 24);

              if (left_day == 1) { fundraising[i].innerHTML += '剩最後一天'; }
              else { fundraising[i].innerHTML += '剩' + left_day + '天'; }
          }
      }

      // Online Lesson Prepare Calc Left Day
      var start_time = $('.js-prepare');

      // 計算再幾天開課(線上)
      for (i = 0; i < start_time.length; i++)
      {
          if (start_time[0].dataset.start_time)
          {
              var left_day = Math.ceil((new Date(start_time[i].dataset.start_time).setHours(0, 0, 0, 0) - new Date()) / 1000 / 60 / 60 / 24);

              if (left_day == 1) { start_time[i].innerHTML += '最後一天'; }
              else { start_time[i].innerHTML += '再' + left_day + '天上線'; }
          }
      }

      // Entity Lesson Prepare Calc Left Day
      var entity_prepare = $('.js-e-prepare');

      // 計算再幾天開課(實體)
      for (i = 0; i < entity_prepare.length; i++)
      {
          if (entity_prepare[0].dataset.start_time)
          {
              var left_day = Math.ceil((new Date(entity_prepare[i].dataset.start_time).setHours(0, 0, 0, 0) - new Date()) / 1000 / 60 / 60 / 24);
              entity_prepare[i].innerHTML += '再' + left_day + '天上課';
          }
      }

      this.a_become_teacher.on('click',$.proxy(function(){
        this._go_to_login();
      },this));
    },
    _verify_account_forma: function()
    {
        var regex_account = /[^\a-\z\A-\Z0-9]/g;
        this._reg_account.val(this._reg_account.val().replace(regex_account, ''));
        var text_reg_account = this._reg_account.val();
        var reg_account_len = text_reg_account.length;
        if ((reg_account_len >= 6) && (reg_account_len <= 20) && (!this._get_special_string(text_reg_account)))
        {
            this._form_reg_account.addClass('has-success');
            this._form_reg_account.removeClass('has-error');
            this._check_authorized[1] = true;
            return true;
        }
        else
        {
            this._form_reg_account.removeClass('has-success');
            this._form_reg_account.addClass('has-error');
            this._check_authorized[1] = false;
            return false;
        }
    },
    _verify_password_forma: function()
    {
        var text_reg_password = this._reg_password.val();
        var reg_password_length = text_reg_password.length;
        if ((reg_password_length >= 8) && (reg_password_length <= 30) && (text_reg_password.match(/\d/)) && (text_reg_password.match(/[a-z]/i)))
        {
            this._form_reg_password.addClass('has-success');
            this._form_reg_password.removeClass('has-error');
            this._check_authorized[2] = true;
            if (text_reg_password === this._reg_r_password.val())
            {
                this._form_reg_r_password.addClass('has-success');
                this._form_reg_r_password.removeClass('has-error');
                this._check_authorized[3] = true;
                $('#text_tip').hide();
                return true;
            }
            else
            {
                this._form_reg_r_password.removeClass('has-success');
                this._form_reg_r_password.addClass('has-error');
                this._check_authorized[3] = false;
                if ($('#text_tip').length == 0) { this._form_reg_password.append('<span id="text_tip" class="color-emphasized2">兩次密碼不相同</span>'); }
                else { $('#text_tip').html('兩次密碼不相同').show(); }
                return false;
            }
        }
        else
        {
            this._form_reg_password.removeClass('has-success');
            this._form_reg_password.addClass('has-error');
            this._check_authorized[2] = false;
            if ($('#text_tip').length == 0) { this._form_reg_password.append('<span id="text_tip" class="color-emphasized2">密碼(8~30字 需含數字英文)</span>'); }
            else { $('#text_tip').html('密碼(8~30字 需含數字英文)').show(); }
            return false;
        }
    },
    _verify_r_password_forma: function()
    {
        var text_reg_r_password = this._reg_r_password.val();
        var reg_r_password_length = text_reg_r_password.length;
        if ((reg_r_password_length >= 8) && (reg_r_password_length <= 30) && (text_reg_r_password.match(/\d/)) && (text_reg_r_password.match(/[a-z]/i)) &&  (text_reg_r_password === this._reg_password.val()))
        {
            this._form_reg_r_password.addClass('has-success');
            this._form_reg_r_password.removeClass('has-error');
            this._check_authorized[3] = true;
            $('#text_tip').hide();
            return true;
        }
        else
        {
            this._form_reg_r_password.removeClass('has-success');
            this._form_reg_r_password.addClass('has-error');
            this._check_authorized[3] = false;
            if ($('#text_tip').length == 0) { this._form_reg_password.append('<span id="text_tip" class="color-emphasized2">兩次密碼不相同</span>'); }
            else { $('#text_tip').html('兩次密碼不相同').show(); }
            return false;
        }
    },
    _verify_nickname_forma: function()
    {
        var regex_nickname = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g
        this._reg_nickname.val(this._reg_nickname.val().replace(regex_nickname, ''))
        var text_reg_nickname = this._reg_nickname.val();
        var reg_nickname_length = text_reg_nickname.length;
        if ((reg_nickname_length >= 2) && (reg_nickname_length <= 20) && (!this._get_special_string(text_reg_nickname)))
        {
            this._form_reg_nickname.addClass('has-success');
            this._form_reg_nickname.removeClass('has-error');
            this._check_authorized[4] = true;
            return true;
        }
        else
        {
            this._form_reg_nickname.removeClass('has-success');
            this._form_reg_nickname.addClass('has-error');
            this._check_authorized[4] = false;
            return false;
        }
    },
    _verify_email_forma: function()
    {
        var regex_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g
        var text_reg_email = this._reg_email.val();
        var reg_email_length = text_reg_email.length;
        if ((regex_email.test(text_reg_email)))
        {
          this._form_reg_email.addClass('has-success');
          this._form_reg_email.removeClass('has-error');
          this._check_authorized[5] = true;
          return true;
        }
        else
        {
          this._form_reg_email.removeClass('has-success');
          this._form_reg_email.addClass('has-error');
          this._check_authorized[5] = false;
          return false;
        }
    },
    _verify_cellphone_forma: function()
    {
        var regex_cellphone = /^[0-9]{8,20}$/g
        var text_reg_cellphone = this._reg_cellphone.val();
        var reg_cellphone_length = text_reg_cellphone.length;
        if ((regex_cellphone.test(text_reg_cellphone)))
        {
            this._form_reg_cellphone.addClass('has-success');
            this._form_reg_cellphone.removeClass('has-error');
            this._check_authorized[5] = true;
            return true;
        }
        else
        {
            this._form_reg_cellphone.removeClass('has-success');
            this._form_reg_cellphone.addClass('has-error');
            this._check_authorized[5] = false;
            return false;
        }
    },
    _go_to_login: function()
    {
        $.ajax
        ({
            type: 'POST',
            url: '/ajax/add_click_data',
            dataType: 'json',
            data:
            {
                item: 'login'
            },
            headers:
            {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            complete: function()
            {
                layout._log_account.val('');
                layout._log_password.val('');
                layout._form_log_account.removeClass('has-error');
                layout._form_log_password.removeClass('has-error');
                layout._form_log_account.removeClass('has-success');
                layout._form_log_password.removeClass('has-success');
                layout._modal_forget_pwd.modal('hide');
                layout._modal_register.modal('hide');
                layout._modal_login.modal('show');
            }
        })
    },
    _check_account_format: function()
    {
      //Check Google Captcha And Account Is Not Repeat
      if (grecaptcha.getResponse() == '')
      {
        $.alert
        ({
          title: '驗證錯誤!',
          content: '請使用google機器人驗證',
        });
				check_register_data_result = false;
			}
      else { check_register_data_result = true; }
      return check_register_data_result;
    },
    _check_account_no_empty: function()
    {
      //Check All Column Is Fill In
      var check_register_data_result = true;
      for (var i = 1; i <= this._check_authorized.length; i++)
      {
        if (this._check_authorized[i] === false)
        {
          this._reg_submit.attr('disabled', 'disabled');
          return false;
        }
      }
      if (($('#reg_account').val() == undefined) || ($('#reg_account').val() == '') || ($('#reg_nickname').val() == undefined) || ($('#reg_nickname').val() == '') || ($('#reg_password').val() == undefined) || ($('#reg_password').val() == '') || ($('#reg_email').val() == undefined) || ($('#reg_email').val() == '') || ($('#reg_cellphone').val() == undefined) || ($('#reg_cellphone').val() == ''))
      {
          this._reg_submit.attr('disabled', 'disabled');
          return false;
      }
      this._reg_submit.removeAttr('disabled');
      return true
    },
    _check_account_all_forma: function()
    {
        //check All forma
        if ((!this._verify_account_forma()) || (!this._verify_password_forma()) || (!this._verify_r_password_forma()) || (!this._verify_nickname_forma()) || (!this._verify_email_forma()) || (!this._verify_cellphone_forma()) || (!$('#checkbox_agree').is(":checked")))
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    _check_account_repeat: function()
    {
      //Check Account Reapet
      this.checked_account = this._reg_account.val();
      var repeat = false;
      $.ajax
      ({
        type: 'POST',
        url: '/ajax/accountExist',
        dataType: 'json',
        async: false,
        data:
        {
          checked_account: this.checked_account
        },
        headers:
        {
          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success: function(data)
        {
          if (data.status === true)
          {
            $.alert
            ({
              title: '帳號重複!',
              content: '該帳號已被使用！',
            });
            repeat = true;
          }
        },
        error: function(xhr, type)
        {
          $.alert('不明原因錯誤，請重新整理後再試一次', '錯誤');
        }
      })
      return repeat;
    },
    _check_login_situation: function()
    {
        //Login Function
        var account = this._log_account.val();
        var password = this._log_password.val();

        $.ajax
        ({
            type: 'POST',
            url: '/login',
            dataType: 'json',
            data:
            {
                account: account,
                password: password
            },
            headers:
            {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            beforeSend: function()
            {
                $.dialog
                ({
                    title: '登入中',
                    content: '請稍候...',
                    draggable: false,
                    closeIcon: false,
                    theme: 'material'
                })
            },
            success: function(data)
            {
                if (JSON.stringify(data) === '{}')
                {
                    firebaseController.loginRecord(layout._log_account.val())
                    .then(() =>
                    {
                        location.reload();
                    });
                }
                else
                {
                    if (typeof (data) == 'object')
                    {
                        location.href = data['url'];
                    }
                    else
                    {
                        $('.jconfirm-material').hide();
                        $.alert(data, '錯誤');
                    }
                }
            },
            error: function(xhr, type)
            {
                $.alert('不明原因錯誤，請重新整理後再試一次', '錯誤');
            }
        })
    },
    _close_search_animation: function()
    {
        $('.animateion-before').hide();
        $('.animateion-after').hide();
    },
    _close_search_wrapper: function()
    {
        this._close_search_animation();
        this._search_result.addClass('transparent').html('');
        this._search_wrapper.removeClass('scroll-top');
        this._input_search.val('').removeAttr('style');
    },
    _create_search_lesson_card: function(lesson_data, lesson_teacher_data)
    {
      let card_html = '',
          now,
          today;

      now = new Date();
      today = new Date(new Date().setHours(0, 0, 0, 0));

      $.each(lesson_data, (key, value) =>
      {
          let label,
              left_fund_day,
              left_start_day,
              lesson_price,
              teacher_data,
              time_address;

          left_fund_day  = Math.ceil((new Date(value.end_fund.replace(/-/g,'/')).setHours(23, 59, 59, 999) - now) / 1000 / 60 / 60 / 24);
          left_start_day = Math.ceil((new Date(value.start_time.replace(/-/g,'/')).setHours(0, 0, 0, 0) - now) / 1000 / 60 / 60 / 24);

          label = labelModule.judgementLabelText(
          {
              cancel_lesson  : value.cancel_lesson,
              today          : today,
              now            : now,
              left_fund_day  : left_fund_day,
              left_start_day : left_start_day,
              start_time     : value.start_time.substring(0, 10),
              type           : value.type,
              l_start_time   : value.last_time,
              l_end_time     : value.end_time,
              max_people     : value.max_people,
              buy_people     : value.buy_people,
              end_fund       : value.end_fund,
              least_people   : value.least_people,
              offer_fee      : value.offer_fee,
              origin_fee     : value.origin_fee
          });

          lesson_price = priceModule.judgementPriceText(
          {
              today     : today,
              end_fund  : value.end_fund,
              offer_fee : value.offer_fee,
              origin_fee: value.origin_fee
          });

          teacher_data = lesson_teacher_data;

          time_address = value.type === 'online'
                        ? 'no address' : value.start_time.substr(0,10) +
                        ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][new Date(value.start_time.substring(0, 10).replace(/-/g,'/')).getDay()] +
                        value.start_time.substr(11,5) +
                        ' <i class="fas fa-map-marker-alt" aria-hidden="true"></i>' +
                        value.location.substring(0, 2);

          card_html += `
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 search-result-card">
                  <div class="thumbnail">
                      <figure class="figure">
                          <a href="/lesson/${value.l_id}">
                              <div class="lesson-type-label">
                                  <span class="lesson-type bg-${value.type}"></span>
                              </div>
                              <div class="img-wrapper">
                                  <img src="/media/${value.l_id}/cover/${value.cover}">
                              </div>
                          </a>
                          <div class="avatar-wrapper">
                              <a href="/#/teacher/${value.t_id}">
                                  <img class="avatar" src="/img/personal/avatar/${teacher_data[value.t_id].avg_img}">
                              </a>
                          </div>
                      </figure>
                      <article class="caption">
                          <span><b>${value.l_name}</b></span>
                          <p class="margin-0 margintop-10">
                              ${teacher_data[value.t_id].nickname}
                              ${!teacher_data[value.t_id].m_name ? '' : ('(' + teacher_data[value.t_id].m_name + ')')}
                          </p>
                          <p class="margin-0 location" ${value.type === 'entity' ? '' : 'style="visibility: hidden"'}>
                              ${time_address}
                          </p>
                          <div>
                              <p class="margin-0" style="height: 26px;">
                                  ${lesson_price}
                              </p>
                              <a href="/lesson/${value.l_id}">
                                  <span class="lesson-type ${label.label_class}">
                                      ${label.label_text}
                                  </span>
                              </a>
                          </div>
                      </article>
                  </div>
              </div>`;
      });

      layout._search_result.append(card_html);
    },
    _email_verify_situation: function()
    {
        if (this._email_verify.val() == 'no')
        {
            $.confirm
            ({
                closeIcon: false,
                columnClass: 'medium',
                title: '信箱驗證',
                content:
                    '<span>會員認證信已寄送至該信箱，如欲使用更多功能還請儘速收信<br>如收不到信請查看是否在<span class="color-emphasized2">垃圾郵件</span>裡面</span>' +
                    '<input class="form-control new_email" value="' + $('#email').val() +  '">',
                onOpenBefore: function()
                {
                    this.buttons.send.addClass('send');
                },
                buttons:
                {
                    'send':
                    {
                        text: '重新發送至此信箱',
                        btnClass: 'btn-info',
                        action: function()
                        {
                            var new_email = this.$content.find('.new_email').val();
                            var regex_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g;

                            if (regex_email.test(new_email))
                            {
                                $.ajax
                                ({
                                    url: '/ajax/resendEmail',
                                    type: 'post',
                                    dataType: 'json',
                                    data:
                                    {
                                        new_email: new_email
                                    },
                                    headers:
                                    {
                                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                    },
                                    beforeSend: function()
                                    {
                                        $('.send').attr('disabled', 'disabled');
                                        $.dialog
                                        ({
                                            title: '重新發送驗證信中',
                                            content: '請稍候...',
                                            draggable: false,
                                            closeIcon: false,
                                            theme: 'material'
                                        })
                                    },
                                    success: function(message)
                                    {
                                        $('.send').removeAttr('disabled', 'disabled');
                                        $('.jconfirm-material').hide();

                                        if (message === 'ok')
                                        {
                                            $.alert('信件已送出', '成功');
                                            return false;
                                        }
                                        else if (message === 'email repeat')
                                        {
                                            $.alert('信箱已有人使用！', '錯誤');
                                            return false;
                                        }
                                    },
                                    error: function()
                                    {
                                        $.alert("好像出了一點狀況", "錯誤");
                                    }
                                })
                                return false;
                            }
                            else
                            {
                                $.alert('信箱格式錯誤或未填寫', '錯誤');
                                return false;
                            }
                        }
                    },
                    'cancel':
                    {
                        text: '關閉',
                        btnClass: 'btn-red',
                        action: function() {}
                    }
                }
           })
        }
    },
    _escape_html_no_br: function(text)
    {
      //Transform Escape Char to Encode Char Besides New Line Char
      text = text.toString();
      var map =
      {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      text = text.replace(/[&<>"']/g, function(m) { return map[m]; });
      return text;
    },
    _get_special_string: function(str)
    {
      //Check Link Is Valid
      var reg = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
      return (reg.test(str));
    },
    _have_chinese_word: function (str)
    {
      return str.search(RegExp("[一-" + String.fromCharCode(40869) + "]")) > -1;
    },
    _request_relogin: function()
    {
        $.confirm
        ({
            title: '錯誤',
            content: '請先登入',
            buttons:
            {
                'ok':
                {
                    text: '確定',
                    btnClass: 'btn-info',
                    action: function()
                    {
                        location.href = '/';
                    }
                }
            }
        })
    },
    _search_function: function(search_keyword)
    {
        try {
            gtag('config', 'UA-127152828-1', {'page_path': '/virtual-search?q=' + search_keyword});
        }catch(e){}

        if (search_keyword == '' || this.searching) { return; }

        if (search_keyword == 'hanabi' || search_keyword == 'fireworks' || search_keyword == '煙火') { this._show_search_animation(); }

        this.searching = true;
        this._search_result.hide();
        this._load_animation.show();

        // 搜尋結果
        $.ajax
        ({
            url:      '/ajax/search',
            type:     'POST',
            dataType: 'json',
            data:
            {
                search_keyword: search_keyword
            },
            headers:
            {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data)
            {
                layout._search_result.removeClass('transparent').html('');
                var lesson_data = data.lesson_data.sort(function(a, b)
                {
                    // l_id 大到小排序
                    if (a.l_id > b.l_id) { return -1; }
                    else { return 1; }
                });
                var lesson_teacher_data = data.lesson_teacher_data;

                if (lesson_data.length == 0) { layout._search_result.append('<div class="item-none col-xs-12"><span>找不到課程資料</span></div>'); }
                else
                {
                    layout._search_result.append(
                      layout._create_search_lesson_card(lesson_data, lesson_teacher_data)
                    );
                }
            },
            complete: function(data)
            {
                layout.searching = false;
                layout._load_animation.hide();
                layout._search_result.show();
            }
        });
    },
    _show_search_animation: function()
    {
        $('.animateion-before').show();
        $('.animateion-after').show();
    },
    _verify_barcode: function(barcode, regex)
    {
        return regex.test(barcode);
    },
    _verify_company_id: function(company_id)
    {
        if ((company_id.length != 8) || (!Number.isInteger(parseInt(company_id)))) { return false; }

        right   = [1, 2, 1, 2, 1, 2, 4, 1];
        company = company_id.split('');
        sum     = 0;

        for (i = 0; i < 8; i++)
        {
            num = company[i] * right[i];

            if (num >= 10)
            {
                num = num.toString().split('');
                sum = sum + parseInt(num[0]) + parseInt(num[1]);
            }
            else { sum += num; }
        }

        if (sum % 10 == 0) { return true; }
        else if ((sum % 10 == 9) && (parseInt(company_id[6]) == 7)) { return true; }
        else { return false; }
    }
  }
  return _const;
}());

function xsDeviceScrollingControllerModule()
{
    var
        $window                     = $(window),
        $search_bar_row             = $('.search-bar-row'),
        $preview_tab_bar            = $('#preview_tab_bar'),
        $mobile_shopping_cart_panel = $('.mobile-shopping-cart-panel'),
        scrollTop                   = $window.scrollTop(),
        lastScrollTop               = scrollTop,
        deltaScrollTop,
        tolerance                   = 120;

    function controll()
    {
        var
            windowWidth     = $window.width(),
            windowHeight    = $window.height();

        if(windowWidth >= 768){ return; }
        scrollTop = $window.scrollTop();

        deltaScrollTop = scrollTop - lastScrollTop;
        if(Math.abs(deltaScrollTop) > tolerance){
            if(deltaScrollTop > 0)
            {
                $search_bar_row.addClass('scrolling');
                if(windowHeight > 750){ $preview_tab_bar.addClass('scrolling'); }
                $mobile_shopping_cart_panel.addClass('folded');
            }
            else
            {
                $search_bar_row.removeClass('scrolling');
                if(windowHeight > 750){ $preview_tab_bar.removeClass('scrolling'); }
                $mobile_shopping_cart_panel.removeClass('folded');
            }
            reset();
        }
    }

    function reset()
    {
        lastScrollTop = scrollTop;
    }

    function init()
    {
        $window.on('scroll', controll);
    }

    return {
        init: init,
        reset: reset
    }
}

var layout,
    labelModule,
    priceModule,
    xsDeviceScrollingController;
$(function()
{
    // [ File path ] js/page_js/site/module/label_module.js
    labelModule = new labelModule();

        // [ File path ] js/page_js/site/module/price_module.js
    priceModule = new priceModule();

    layout = new layout();
    xsDeviceScrollingController = xsDeviceScrollingControllerModule();
    xsDeviceScrollingController.init();
})

function _targer(target)
{
  href = '/profile/message';
  location.href = href;
}

function _before_login()
{
    layout._sidebar_login.click();
}

function _google_login()
{
    location.href = '/oauth/google';
}
