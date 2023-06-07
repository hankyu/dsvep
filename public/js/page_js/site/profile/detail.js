var detail = (function()
{
  var _const;
  _const = function()
  {
    //Initial Block Authorize Array
    this._construct();
  }
  _const.prototype =
  {
    _construct: function()
    {
      //Detail Page
      this._is_teacher = $('#is_teacher');
      this._page_profile_detail = $('#page_profile_detail');
      this._page_profile_password = $('#page_profile_password');
      this._page_profile_credit = $('#page_profile_credit');

      //Personal Detail
      this._detail_form = $('#detail_form');
      this._form_det_name = $('#form_det_name');
      this._form_det_nickname = $('#form_det_nickname');
      this._form_det_id_code = $('#form_det_id_code');
      this._form_det_sex = $('#form_det_sex');
      this._form_det_cellphone = $('#form_det_cellphone');
      this._form_det_birthday = $('#form_det_birthday');
      this._form_det_email = $('#form_det_email');
      this._form_det_address = $('#form_det_address');
      this._form_det_fb_link = $('#form_det_fb_link');
      this._form_det_line_id = $('#form_det_line_id');
      this._det_name = $('#det_name');
      this._det_nickname = $('#det_nickname');
      this._det_id_code = $('#det_id_code');
      this._det_sex = $('#det_sex');
      this._det_cellphone = $('#det_cellphone');
      this._det_birthday_year = $('#det_birthday_year');
      this._det_birthday_month = $('#det_birthday_month');
      this._det_birthday_day = $('#det_birthday_day');
      this._det_email = $('#det_email');
      this._det_address_county = $('#det_address_county');
      this._det_address_township = $('#det_address_township');
      this._det_address_road = $('#det_address_road');
      this._det_address_detail = $('#det_address_detail');
      this._det_fb_link = $('#det_fb_link');
      this._det_line_id = $('#det_line_id');
      this._i_det_name = $('#i_det_name');
      this._i_det_nickname = $('#i_det_nickname');
      this._i_det_id_code = $('#i_det_id_code');
      this._i_det_cellphone = $('#i_det_cellphone');
      this._i_det_email = $('#i_det_email');
      this._i_det_fb_link = $('#i_det_fb_link');
      this._i_det_line_id = $('#i_det_line_id');
      this._btn_profile_detail = $('#btn_profile_detail');
      this._btn_refill_cellphone = $('#btn_refill_cellphone');
      this._btn_verify_cellphone = $('#btn_verify_cellphone');
      this._hint_phone = $('#hint_phone');

      //Change Avatar
      this._ava_form = $('#ava_form');
      this._ava_edit_btn = $('#ava_edit_btn');
      this._btn_ava_modify = $('#btn_ava_modify');
      this._btn_ava_cancel = $('#btn_ava_cancel');
      this._ava_hidden_crop_image = $('#ava_hidden_crop_image');
      this._modal_avatar_modify = $('#modal_avatar_modify');

      //Change Password
      this._password_form = $('#password_form');
      this._origin_password_form = $('#origin_password_form');
      this._new_password_form = $('#new_password_form');
      this._r_new_password_form = $('#r_new_password_form');
      this._origin_password = $('#origin_password');
      this._new_password = $('#new_password');
      this._r_new_password = $('#r_new_password');
      this._btn_profile_password = $('#btn_profile_password');
      this._i_det_origin_pwd = $('#i_det_origin_pwd');
      this._i_det_pwd = $('#i_det_pwd');
      this._i_det_r_pwd = $('#i_det_r_pwd');

      // Profile bank
      this._bank_accounting      = $('#bank_accounting');
      this._bank_accounting_name = $('#bank_accounting_name');
      this._bank_branch_id       = $('#bank_branch_id');
      this._bank_id              = $('#bank_id');
      this._btn_profile_bank   = $('#btn_profile_bank');
      this._profile_bank_form  = $('#profile_bank_form');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      this._password_form.hide();
      this._profile_bank_form.hide();
      objThis._initial_birthday();
      objThis._initial_sex();
      objThis._initial_address();
      objThis._initial_nickname();
      objThis._initialAll();
    },
    _initialAll: function()
    {
      //From Become Teacher Page To Detail Page About Has Empty
      if ($('#_auth_situation').val() != '')
      {
        $.alert
        ({
          title: '講師個人資料不足!',
          content: '欲成為講師者，需填寫「' + $('#_auth_situation').val() + '」後方可申請',
        });
      }

      //Default Modal Can Not Hide And Must X Button Will Close Modal
      this._modal_avatar_modify.modal({backdrop: 'static', keyboard: false});
      this._modal_avatar_modify.modal('hide');

      //Image Crop Function
      $('.image-editor').cropit
      ({
        imageState: {},
      });

      var _URL = window.URL || window.webkitURL;

      //Check Image Format Is Valid
      $('#ava_file').change(function(e)
      {
        $('#btn_ava_modify').attr('disabled', 'disabled');
        var ava_file = this.files[0];
        var size = ava_file.size;
        if (size > 10485760)
        {
          $('#btn_ava_modify').attr('disabled', 'disabled');
          $.alert
          ({
            title: '錯誤!',
            content: '圖片大小不可超過10MB',
          });
          $('.cropit-preview-image').attr('src', '');
        }
        else
        {
          img = new Image();
          img.onload = function()
          {
            if ((this.width >= 200) && (this.height >= 200))
            {
              $('#btn_ava_modify').removeAttr('disabled', 'disabled');
            }
            else
            {
              $('#btn_ava_modify').attr('disabled', 'disabled');
              $.alert
              ({
                title: '錯誤!',
                content: '圖片兩邊像素皆須大於200像素',
              });
              $('.cropit-preview-image').attr('src', '');
            }
          };
          img.onerror = function()
          {
            alert('not a valid file: ' + file.type);
          };
          img.src = _URL.createObjectURL(ava_file);
        }
      })

      //Export Image Crop
      $('.export').click(function()
      {
        var ava_crop_image = $('.image-editor').cropit('export',
        {
          type: 'image/png',
          quality: 1,
          originalSize: false,
          fillBg: '#FFF',
        });
        $('#ava_hidden_crop_image').val(ava_crop_image);
      });

      //Change Page To Profile Detail
      this._page_profile_detail.on('click', $.proxy(function()
      {
        this._detail_form.show();
        this._password_form.hide();
        this._profile_bank_form.hide();
        this._page_profile_detail.addClass('active').siblings().removeClass('active');
        hashBindController.setHash('detail');
      }, this));

      //Change Page To Password Manage Page
      this._page_profile_password.on('click', $.proxy(function()
      {
        this._password_form.show();
        this._detail_form.hide();
        this._profile_bank_form.hide();
        this._page_profile_password.addClass('active').siblings().removeClass('active');
        hashBindController.setHash('password');
      }, this));

      //Change Page To Profile credit Page
      this._page_profile_credit.on('click', $.proxy(function()
      {
        this._profile_bank_form.show();
        this._detail_form.hide();
        this._password_form.hide();
        this._page_profile_credit.addClass('active').siblings().removeClass('active');
        hashBindController.setHash('credit');
      }, this));

      //Submit Form About Modify Detail
      this._btn_profile_detail.on('click', $.proxy(function()
      {
          this._check_det_id_code_form();

          if (this._check_data_format())
          {
              var objThis = this;
              var address_detail = objThis._det_address_detail.val() == '' ? '' :  objThis._det_address_detail.val();
              var address = objThis._det_address_county.val() == '' ? address_detail : objThis._det_address_county.val() + '-' + objThis._det_address_township.val() + '-' + objThis._det_address_road.val() + '-' + address_detail;
              var birthday = objThis._det_birthday_year.val() == '' ? '' : objThis._det_birthday_year.val() + '-' + objThis._det_birthday_month.val() + '-' + objThis._det_birthday_day.val();
              $.ajax
              ({
                  url: '/profile/modifyProfileData',
                  type: 'post',
                  dataType: 'json',
                  data:
                  {
                      m_name: objThis._det_name.val(),
                      nickname: objThis._det_nickname.val(),
                      id_code: objThis._det_id_code.val(),
                      sex: objThis._det_sex.val(),
                      cellphone: objThis._det_cellphone.val(),
                      birthday: birthday,
                      address: address,
                      facebook_link: objThis._det_fb_link.val(),
                      line_id: objThis._det_line_id.val()
                  },
                  headers:
                  {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  },
                  success(data, status, xhr)
                  {
                      if (xhr.status == '200')
                      {
                          $(window).unbind('beforeunload');
                          $.confirm
                          ({
                              title: '成功',
                              content: '儲存成功',
                              buttons:
                              {
                                  'ok':
                                  {
                                      btnClass: 'btn-info',
                                      action: function()
                                      {
                                          if ($('#_auth_situation').val() != '')
                                          {
                                              location.href = '/becometeacher';
                                          }
                                          else
                                          {
                                              location.reload();
                                          }
                                      }
                                  }
                              }
                          })
                      }
                      else
                      {
                          $.alert(data, '錯誤');
                      }
                  },
                  error()
                  {
                      layout._request_relogin();
                  }
              })
          }
      }, this));


      this._btn_refill_cellphone.on('click', $.proxy(() =>
      {
        if(this._btn_refill_cellphone.text() == '修改手機')
        {
          this.oldPhoneNumber = this._det_cellphone.val();
          this._det_cellphone.attr({disabled: false}).focus();
          this._switch_cellphone_btns_status(1);
        }
        else
        {
          this._det_cellphone.val(this.oldPhoneNumber);
          $('#form_det_cellphone').removeClass('has-error').removeClass('has-success');
          $('#i_det_cellphone').removeClass('fa-check');
          this._det_cellphone.attr({disabled: 'disabled'});
          this._switch_cellphone_btns_status(0);
        }
      }));

      this._btn_verify_cellphone.on('click', $.proxy(() =>
      {
        this._get_verification_code();
      }));

      this._det_cellphone.on('focus', $.proxy(function()
      {
          this._hint_phone.removeClass('hidden');
      }, this));

      this._btn_profile_password.on('click', $.proxy(function()
      {
          var origin_password = this._origin_password.val();
          var new_password = this._new_password.val();
          var new_password_len = new_password.length;
          var r_new_password = this._r_new_password.val();
          var has_error = this._password_form.find('.has-error').length > 0;

          this._check_password_form();
          if (has_error || !this._check_password_format(8, 30, new_password, new_password_len)) { $.alert( '欄位輸入錯誤', '錯誤'); }
          else if (origin_password == '' || new_password == '' || r_new_password == '')
          {
              $.alert( '未填寫完整', '錯誤');
          }
          else
          {
              $.ajax
              ({
                  url: '/ajax/changePassword',
                  type: 'post',
                  dataType: 'json',
                  data:
                  {
                      password: origin_password,
                      new_password: new_password,
                  },
                  headers:
                  {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  },
                  success(message)
                  {
                      if (message == '密碼更改成功')
                      {
                          $.confirm
                          ({
                              title: '成功',
                              content: message,
                              buttons:
                              {
                                  'ok':
                                  {
                                      btnClass: 'btn-info',
                                      action: function()
                                      {
                                          $(window).unbind('beforeunload');
                                          location.reload();
                                      }
                                  }
                              }
                          })
                      }
                      else { $.alert(message, '錯誤'); }
                  },
                  error()
                  {
                      layout._request_relogin();
                  }
              })
          }
      }, this));

      this._btn_profile_bank.on('click', $.proxy(function()
      {
          var bank_id              = this._bank_id.val();
          var bank_branch_id       = this._bank_branch_id.val();
          var bank_accounting_name = this._bank_accounting_name.val();
          var bank_accounting      = this._bank_accounting.val();

          if (bank_id == '請選擇銀行') { $.alert('請輸入銀行', '錯誤'); }
          else if (bank_accounting_name == '') { $.alert('請輸入銀行戶名', '錯誤'); }
          else if (bank_accounting == '') { $.alert('請輸入銀行帳號', '錯誤'); }
          else
          {
              $.ajax
              ({
                  url: '/ajax/edit_profile_bank',
                  type: 'POST',
                  dataType: 'json',
                  data:
                  {
                      bank_id: bank_id,
                      bank_accounting_name: bank_accounting_name,
                      bank_accounting: bank_accounting
                  },
                  headers:
                  {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  },
                  success(data)
                  {
                      if (data.status == 'ok')
                      {
                          $.confirm
                          ({
                              title: '成功',
                              content: '銀行帳戶儲存成功',
                              buttons:
                              {
                                  'ok':
                                  {
                                      btnClass: 'btn-info',
                                      action: function()
                                      {
                                          $(window).unbind('beforeunload');
                                          location.reload();
                                      }
                                  }
                              }
                          })
                      }
                      else { $.alert('不明原因錯誤', '錯誤'); }
                  }
              })
          }

      }, this))

      this._origin_password.on('blur', $.proxy(function()
      {
        if (this._origin_password.val() != '')
        {
          this._origin_password_form.removeClass('has-error');
          this._i_det_origin_pwd.removeClass('fa-times');
        }
      }, this));

      this._new_password.on('blur', $.proxy(function()
      {
        this._check_password_form();
      }, this));

      this._r_new_password.on('blur', $.proxy(function()
      {
        var new_password = this._new_password.val();
        var r_new_password = this._r_new_password.val();

        if (new_password == '')
        {
          this._new_password_form.removeClass('has-success').addClass('has-error');
          this._i_det_pwd.removeClass('fa-check').addClass('fa-times');
          this._new_password.focus();
        }
        else
        {
          if (new_password === r_new_password)
          {
            this._r_new_password_form.removeClass('has-error').addClass('has-success');
            this._i_det_r_pwd.removeClass('fa-times').addClass('fa-check');
            if (this._origin_password.val() == '')
            {
              this._origin_password_form.addClass('has-error');
              this._i_det_origin_pwd.addClass('fa-times');
            }
          }
          else
          {
            this._r_new_password_form.removeClass('has-success').addClass('has-error');
            this._i_det_r_pwd.removeClass('fa-check').addClass('fa-times');
          }
        }
      }, this));

      //Check Page Is Modify, If Has Modified, Will Show Notice Before Exit Page
      $(window).on('beforeunload', function()
      {
        var address_array = $('#form_det_address').data('address').split('-');
        var birthday_array = $('#form_det_birthday').data('btd').split('-');
        if ((address_array[0] != $('#det_address_county').val()) || (address_array[1] != $('#det_address_township').val()) || (address_array[2] != $('#det_address_road').val()))
        {
          return 'are you sure?'
        }
        else if ((birthday_array[0] != $('#det_birthday_year').val()) || (birthday_array[1] != $('#det_birthday_month').val()) || (birthday_array[2] != $('#det_birthday_day').val()))
        {
          return 'are you sure?'
        }
        else if (($('.has-success').get().length > 0) || ($('.has-error').get().length > 0) || ($('#det_sex').val() != $('#form_det_sex').data('sex')))
        {
          return 'are you sure?'
        }
      });

      //Click Avatar
      this._ava_edit_btn.on('click', $.proxy(function()
      {
        if ($('.profile-content .has-success')['length'] != 0)
        {
          $.alert({
            title: '選擇大頭照',
            content: '您尚未儲存個人資料，請先儲存',
          });
        }
        else
        {
          this._modal_avatar_modify.modal('show');
        }
      }, this));

      //Submit New Avatar
      this._btn_ava_modify.on('click', $.proxy(function()
      {
        if ($('#ava_file').val() == '' || !$('.cropit-preview-image').attr('src'))
        {
          $.alert({
            title: '選擇大頭照',
            content: '您尚未選擇大頭照，請先選擇檔案',
          });
          this._btn_ava_modify.attr('disabled', 'disabled');
        }
        else
        {
          this._btn_ava_modify.attr('disabled', 'disabled');
          this._btn_ava_cancel.attr('disabled', 'disabled');
          $('#ava_form').submit();
        }
      }, this));

      //Cancel Modify Avatar
      this._btn_ava_cancel.on('click', $.proxy(function()
      {
        this._modal_avatar_modify.modal('hide');
        $('#ava_file').val('');
        $('.cropit-preview-image').attr('src', '');
      }, this));

      //Check Name Modify
      this._det_name.on('blur', $.proxy(function()
      {
        if (this._det_name.val() == this._form_det_name.data('name'))
        {
          this._form_det_name.removeClass('has-success');
          this._form_det_name.removeClass('has-error');
          this._i_det_name.removeClass('fa-check');
          this._i_det_name.removeClass('fa-times');
        }
        else if (this._is_teacher.val() == true)
        {
          if (this._det_name.val() == '')
          {
            this._form_det_name.removeClass('has-success');
            this._form_det_name.addClass('has-error');
            this._i_det_name.removeClass('fa-check');
            this._i_det_name.addClass('fa-times');
          }
          else
          {
            this._form_det_name.addClass('has-success');
            this._form_det_name.removeClass('has-error');
            this._i_det_name.addClass('fa-check');
            this._i_det_name.removeClass('fa-times');
          }
        }
        else
        {
          this._form_det_name.addClass('has-success');
          this._form_det_name.removeClass('has-error');
          this._i_det_name.addClass('fa-check');
          this._i_det_name.removeClass('fa-times');
        }
      }, this));

      //Check Nickname
      this._det_nickname.on('blur', $.proxy(function()
      {
          this._check_det_nickname_form();
      }, this));

      //Check Identity Code
      this._det_id_code.on('blur', $.proxy(function()
      {
          this._check_det_id_code_form();
      }, this));

      //Check Cellphone
      this._det_cellphone.on('blur', $.proxy(function()
      {
          this._check_det_cellphone_form();
          setTimeout(() => {this._hint_phone.addClass('hidden');}, 200);
      }, this))
      .on('keyup', $.proxy(() =>
      {
        let currPhoneNumber = this._det_cellphone.val().replace(/\D/g, '');
        this._det_cellphone.val(currPhoneNumber);

        // have done phone verification, but changing phone number now.
        if(this.oldPhoneNumber)
        {
          if(currPhoneNumber != this.oldPhoneNumber)
          {
            this._btn_verify_cellphone.removeClass('hidden');
          }
          else
          {
            this._btn_verify_cellphone.addClass('hidden');
          }
        }
      }));

      //Birthday Modify
      this._det_birthday_year.on('change', $.proxy(function()
      {
        this._det_birthday_month.empty();
        this._det_birthday_day.empty();
        this._det_birthday_month.append('<option value="" label=""></option>');
        var date = new Date();
        if (this._det_birthday_year.val() != '')
        {
          this._det_birthday_month.removeAttr('disabled');
          var repeat_month = this._det_birthday_year.val() == date.getFullYear() ? (date.getMonth() + 1) : 12;
          for (var i = 1; i <= repeat_month; i++)
          {
            this._det_birthday_month.append('<option value=' + this._pad_left(i) + '>' + this._pad_left(i) + '</option>');
          }
        }
      }, this));

      this._det_birthday_month.on('change', $.proxy(function()
      {
        this._det_birthday_day.empty();
        this._det_birthday_day.append('<option value="" label=""></option>');
        var local_day = this._check_day(this._det_birthday_month.val(), this._det_birthday_year.val());
        if (this._det_birthday_month.val() != '')
        {
          this._det_birthday_day.removeAttr('disabled');
          for (var i = 1; i <= local_day; i++)
          {
            this._det_birthday_day.append('<option value=' + this._pad_left(i) + '> ' + this._pad_left(i) + '</option>');
          }
        }
      }, this));

      //Address Modify
      this._det_address_county.on('change', $.proxy(function()
      {
        var objThis = this;
        this._det_address_township.empty();
        this._det_address_road.empty();
        this._det_address_road.attr('disabled');
        if (this._det_address_county.val() != '')
        {
          this._det_address_township.removeAttr('disabled');
          this._det_address_township.append('<option value="" label="">請選擇</option>');
          $.getJSON('/json/region.json', function(address_data)
          {
            for (var i = 0; i < address_data.length; i++)
            {
              if (objThis._det_address_county.val() == address_data[i]['CityName'])
              {
                for (var j = 0; j < address_data[i]['AreaList'].length; j++)
                {
                  objThis._det_address_township.append('<option value='+ address_data[i]['AreaList'][j]['AreaName'] +'>'+ address_data[i]['AreaList'][j]['AreaName']+'</option>');
                }
              }
            }
          })
        }
        else
        {
          this._det_address_township.attr('disabled');
        }
      }, this));

      this._det_address_township.on('change', $.proxy(function()
      {
        var objThis = this;
        this._det_address_road.empty();
        if (this._det_address_township.val() != '')
        {
          this._det_address_road.removeAttr('disabled');
          this._det_address_road.append('<option value="" label="">請選擇</option>');
          $.getJSON('/json/region.json', function(address_data)
          {
            for (var i = 0; i < address_data.length; i++)
            {
              if (objThis._det_address_county.val() == address_data[i]['CityName'])
              {
                for (var j = 0; j < address_data[i]['AreaList'].length; j++)
                {
                  if (objThis._det_address_township.val() == address_data[i]['AreaList'][j]['AreaName'])
                  {
                    for (var k = 0; k < address_data[i]['AreaList'][j]['RoadList'].length; k++)
                    {
                      objThis._det_address_road.append('<option value='+ address_data[i]['AreaList'][j]['RoadList'][k]['RoadName'] +'>'+ address_data[i]['AreaList'][j]['RoadList'][k]['RoadName'] +'</option>');
                    }
                  }
                }
              }
            }
          })
        }
        else
        {
          this._det_address_road.attr('disabled');
        }
      }, this));


      //Check Faacebook Link
      this._det_fb_link.on('blur', $.proxy(function()
      {
        regex_fb_link = /(https?:\/\/[\w-\.]+(:\d+)?(\/[\w\/\.]*)?(\?\S*)?(#\S*)?)/g;
        var text_det_fb_link = this._det_fb_link.val();
        if (this._det_fb_link.val() == this._form_det_fb_link.data('fb'))
        {
          this._form_det_fb_link.removeClass('has-success');
          this._form_det_fb_link.removeClass('has-error');
          this._i_det_fb_link.removeClass('fa-check');
          this._i_det_fb_link.removeClass('fa-times');
        }
        else
        {
          if (regex_fb_link.test(text_det_fb_link))
          {
            this._form_det_fb_link.addClass('has-success');
            this._form_det_fb_link.removeClass('has-error');
            this._i_det_fb_link.addClass('fa-check');
            this._i_det_fb_link.removeClass('fa-times');
          }
          else
          {
            this._form_det_fb_link.removeClass('has-success');
            this._form_det_fb_link.addClass('has-error');
            this._i_det_fb_link.removeClass('fa-check');
            this._i_det_fb_link.addClass('fa-times');
          }
        }
      }, this));

      //Check Line ID
      this._det_line_id.on('blur', $.proxy(function()
      {
        regex_line_id = /[^a-zA-Z0-9_\.]/g;
        this._det_line_id.val(this._det_line_id.val().replace(regex_line_id, ''));
        var text_det_line_id = this._det_line_id.val();
        var det_line_id_length = text_det_line_id.length;
        if (this._det_line_id.val() == this._form_det_line_id.data('line'))
        {
          this._form_det_line_id.removeClass('has-success');
          this._form_det_line_id.removeClass('has-error');
          this._i_det_line_id.removeClass('fa-check');
          this._i_det_line_id.removeClass('fa-times');
        }
        else
        {
          if ((det_line_id_length == 0) || ((det_line_id_length >= 4) && (det_line_id_length <= 20) && (!this._get_special_string_for_line(text_det_line_id))))
          {
            this._form_det_line_id.addClass('has-success');
            this._form_det_line_id.removeClass('has-error');
            this._i_det_line_id.addClass('fa-check');
            this._i_det_line_id.removeClass('fa-times');
          }
          else
          {
            this._form_det_line_id.removeClass('has-success');
            this._form_det_line_id.addClass('has-error');
            this._i_det_line_id.removeClass('fa-check');
            this._i_det_line_id.addClass('fa-times');
          }
        }

        this._det_line_id.val(this._det_line_id.val().toLowerCase());
      }, this));
    },
    _initial_sex: function()
    {
      //Initall Sex Option
      var sex = this._form_det_sex.data('sex');
      var sex_array = ['男', '女', '其他'];
      this._det_sex.append('<option value=""></option>');
      for (var i = 0; i < 3; i++)
      {
        if (sex == sex_array[i])
        {
          this._det_sex.append('<option value=' + sex_array[i] + ' selected>' + sex_array[i] + '</option>');
        }
        else
        {
          this._det_sex.append('<option value=' + sex_array[i] + '>' + sex_array[i] + '</option>');
        }
      }
    },
    _initial_birthday: function()
    {
      //Initial Birthday Option From 1911/01/01 To Today
      var birthday = this._form_det_birthday.data('btd');
      var date = new Date();
      var local_day = '';
      if (birthday != '')
      {
        this._det_birthday_month.removeAttr('disabled');
        this._det_birthday_day.removeAttr('disabled');
        var birthday_array = birthday.split('-');

        //Year
        for (var i = date.getFullYear(); i >= 1911; i--)
        {
          if (i == birthday_array[0])
          {
            this._det_birthday_year.append('<option value=' + i + ' selected>' + i + '</option>');
          }
          else
          {
            this._det_birthday_year.append('<option value=' + i + '>' + i + '</option>');
          }
        }

        //Month
        var repeat_month = birthday_array[0] == date.getFullYear() ? (date.getMonth() + 1) : 12;
        for (var i = 1; i <= repeat_month; i++)
        {
          if (i == birthday_array[1])
          {
            this._det_birthday_month.append('<option value=' + this._pad_left(i) + ' selected>' + this._pad_left(i) + '</option>');
          }
          else
          {
            this._det_birthday_month.append('<option value=' + this._pad_left(i) + '>' + this._pad_left(i) + '</option>');
          }
        }

        //Day
        local_day = this._check_day(birthday_array[1], birthday_array[0]);
        for (var i = 1; i <= local_day; i++)
        {
          if (i == birthday_array[2])
          {
            this._det_birthday_day.append('<option value=' + this._pad_left(i) + ' selected>'+this._pad_left(i) + '</option>');
          }
          else
          {
            this._det_birthday_day.append('<option value=' + this._pad_left(i)+'>' + this._pad_left(i) + '</option>');
          }
        }
      }
      else
      {
        this._det_birthday_year.append('<option value=""></option>');
        for (var i = date.getFullYear(); i >= 1911; i--)
        {
          this._det_birthday_year.append('<option value=' + i + '>' + i + '</option>');
        }
      }
    },
    _initial_address: function()
    {
      //Initial Address About Taiwan All Location
      var objThis = this;
      var address = this._form_det_address.data('address').toString();
      if (address != '' && address.search(/-/) != -1)
      {
        this._det_address_township.removeAttr('disabled');
        this._det_address_road.removeAttr('disabled');
        var address_array = address.split('-');
        objThis._det_address_county.append('<option value=""></option>');
        if (address_array[3])
        {
          this._det_address_detail.val(address_array[3]);
        }
        $.getJSON('/json/region.json', function(address_data)
        {
          for (var i = 0; i < address_data.length; i++)
          {
            if (address_data[i]['CityName'] == address_array[0])
            {
              objThis._det_address_county.append('<option value=' + address_data[i]['CityName'] + ' selected>'+ address_data[i]['CityName'] + '</option>');
              for (var j = 0; j < address_data[i]['AreaList'].length; j++)
              {
                if (address_data[i]['AreaList'][j]['AreaName'] == address_array[1])
                {
                  objThis._det_address_township.append('<option value=' + address_data[i]['AreaList'][j]['AreaName'] + ' selected>' + address_data[i]['AreaList'][j]['AreaName'] + '</option>');
                  for (var k = 0; k < address_data[i]['AreaList'][j]['RoadList'].length; k++)
                  {
                    if (address_data[i]['AreaList'][j]['RoadList'][k]['RoadName'] == address_array[2])
                    {
                      objThis._det_address_road.append('<option value=' + address_data[i]['AreaList'][j]['RoadList'][k]['RoadName'] + ' selected>' + address_data[i]['AreaList'][j]['RoadList'][k]['RoadName'] + '</option>');
                    }
                    else
                    {
                      objThis._det_address_road.append('<option value=' + address_data[i]['AreaList'][j]['RoadList'][k]['RoadName'] + '>' + address_data[i]['AreaList'][j]['RoadList'][k]['RoadName'] + '</option>');
                    }
                  }
                }
                else
                {
                  objThis._det_address_township.append('<option value=' + address_data[i]['AreaList'][j]['AreaName'] + '>' + address_data[i]['AreaList'][j]['AreaName'] + '</option>');
                }
              }
            }
            else
            {
              objThis._det_address_county.append('<option value=' + address_data[i]['CityName'] + '>' + address_data[i]['CityName'] + '</option>');
            }
          }
        })
      }
      else
      {
        $.getJSON('/json/region.json', function(address_data)
        {
          objThis._det_address_county.append('<option value="">請選擇</option>');
          for (var i = 0; i < address_data.length; i++)
          {
            objThis._det_address_county.append('<option value=' + address_data[i]['CityName'] + '>' + address_data[i]['CityName'] + '</option>');
          }
        })

        if (address != '') { objThis._det_address_detail.val(address); }
      }
    },
    _initial_nickname: function()
    {
      //Initial Nickname Font Size Below Avatar
      if (this._form_det_nickname.data('nickname').length > 15)
      {
        $('#avatar_nickname').css('font-size', '20px');
      }
    },
    _check_day: function(month, year)
    {
      //Birthday Will Not Over Than Today
      var date = new Date();
      if ((year == date.getFullYear()) && (month == date.getMonth() + 1))
      {
        local_day = date.getDate();
        return local_day;
      }

      //Transform Days About Different Month
      switch (month)
      {
        case '1': case '01': case '3': case '03': case '5': case '05': case '7': case '07': case '8': case '08': case '10': case '12':
          var local_day = 31;
          break;
        case '4': case '04': case '6': case '06': case '9': case '09': case '11':
          var local_day = 30;
          break;
        case '2': case '02':
          var local_day = this._check_leap_year(year);
          break;
        default:
          var local_day = 0;
          break;
      }
      return local_day;
    },
    _check_leap_year: function(year)
    {
      //Check Choose Year Is Leap Year Or Not
      if (((year % 4 == 0 ) && (year % 100 != 0)) || (year % 400 == 0))
      {
        return 29;
      }
      else
      {
        return 28;
      }
    },
    _check_identity_code: function(id)
    {
      //Check Identity Format Is Valid
			var city = new Array(1,10,19,28,37,46,55,64,39,73,82,2,11,20,48,29,38,47,56,65,74,83,21,3,12,30)
			id = id.toUpperCase();
			if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1)
      {
				return false;
			}
      else
			{
				id = id.split('');
				var total = city[id[0].charCodeAt(0) - 65];
				for(var i = 1; i <= 8; i++)
        {
					total += eval(id[i] * (9 - i));
				}
				total += eval(id[9]);
				return (total % 10 == 0);
			}
		},
    _check_det_nickname_form: function()
    {
        if (!this._check_det_nickname_format()) { return false; }
        var text_det_nickname = this._det_nickname.val();
        var det_nickname_length = text_det_nickname.length;
        if(text_det_nickname == this._form_det_nickname.data('nickname') && (det_nickname_length != 0))
        {
            this._form_det_nickname.removeClass('has-success');
            this._form_det_nickname.removeClass('has-error');
            this._i_det_nickname.removeClass('fa-check');
            this._i_det_nickname.removeClass('fa-times');

            return true;
        }
        else
        {
            if (((det_nickname_length >= 2) && (det_nickname_length <= 20) && (!this._get_special_string(text_det_nickname))))
            {
                this._form_det_nickname.addClass('has-success');
                this._form_det_nickname.removeClass('has-error');
                this._i_det_nickname.addClass('fa-check');
                this._i_det_nickname.removeClass('fa-times');

                return true;
            }
            else
            {
                this._form_det_nickname.removeClass('has-success');
                this._form_det_nickname.addClass('has-error');
                this._i_det_nickname.removeClass('fa-check');
                this._i_det_nickname.addClass('fa-times');

                return false;
            }
        }
    },
    _check_det_nickname_format: function()
    {
        var regex_nickname = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g
        this._det_nickname.val(this._det_nickname.val().replace(regex_nickname, ''))
        return ($('#det_nickname').length > 0)
    },
    _check_det_id_code_form: function()
    {
        if (!this._check_det_id_code_format()) { return false; }
        if (this._det_id_code.val() == this._form_det_id_code.data('idcode'))
        {
            this._form_det_id_code.removeClass('has-success');
            this._form_det_id_code.removeClass('has-error');
            this._i_det_id_code.removeClass('fa-check');
            this._i_det_id_code.removeClass('fa-times');

            return true;
        }
        else
        {
            if ((this._check_identity_code(this._det_id_code.val())) || this._det_id_code.val() == '')
            {
                this._form_det_id_code.addClass('has-success');
                this._form_det_id_code.removeClass('has-error');
                this._i_det_id_code.addClass('fa-check');
                this._i_det_id_code.removeClass('fa-times');

                return true;
            }
            else
            {
                this._form_det_id_code.removeClass('has-success');
                this._form_det_id_code.addClass('has-error');
                this._i_det_id_code.removeClass('fa-check');
                this._i_det_id_code.addClass('fa-times');

                return false;
            }
        }
    },
    _check_det_id_code_format: function()
    {
        this._det_id_code.val(this._det_id_code.val().replace(/[^\a-\z\A-\Z0-9]/g,''));
        this._det_id_code.val(this._det_id_code.val().toUpperCase());
        return ($('#det_id_code').length > 0)
    },
    _check_det_cellphone_form: function()
    {
        if (!this._check_det_cellphone_format()) { return false; }
        var format_cellphone = /^[0-9]{8,20}/g;
        var text_det_cellphone = this._det_cellphone.val();
        var det_cellphone_length = text_det_cellphone.length;
        if (this._det_cellphone.val() == this._form_det_cellphone.data('cellphone'))
        {
            this._form_det_cellphone.removeClass('has-success');
            this._form_det_cellphone.removeClass('has-error');
            this._i_det_cellphone.removeClass('fa-check');
            this._i_det_cellphone.removeClass('fa-times');
            return true;
        }
        else
        {
          if ((20 >= det_cellphone_length) && (format_cellphone.test(this._det_cellphone.val())))
          {
              this._form_det_cellphone.addClass('has-success');
              this._form_det_cellphone.removeClass('has-error');
              this._i_det_cellphone.addClass('fa-check');
              this._i_det_cellphone.removeClass('fa-times');
              return true;
          }
          else
          {
              this._form_det_cellphone.removeClass('has-success');
              this._form_det_cellphone.addClass('has-error');
              this._i_det_cellphone.removeClass('fa-check');
              this._i_det_cellphone.addClass('fa-times');
              return false;
          }
        }
    },
    _check_det_cellphone_format: function()
    {
        var regex_cellphone = /[^0-9]/g
        this._det_cellphone.val(this._det_cellphone.val().replace(regex_cellphone, ''))
        return ($('#det_cellphone').length > 0)
    },
    _check_password_form: function()
    {
        var new_pwd = this._new_password.val();
        var new_pwd_len = new_pwd.length;
        if (this._check_password_format(8, 30, new_pwd, new_pwd_len))
        {
            this._new_password_form.removeClass('has-error').addClass('has-success');
            this._i_det_pwd.removeClass('fa-times').addClass('fa-check');
            if (new_pwd === this._r_new_password.val())
            {
                this._r_new_password_form.removeClass('has-error').addClass('has-success');
                this._i_det_r_pwd.removeClass('fa-times').addClass('fa-check');
                if (this._origin_password.val() == '')
                {
                  this._origin_password_form.addClass('has-error');
                  this._i_det_origin_pwd.addClass('fa-times');
                }
            }
            else if (this._r_new_password.val() == '')
            {
                this._r_new_password.focus();
            }
            else
            {
                this._r_new_password_form.removeClass('has-success').addClass('has-error');
                this._i_det_r_pwd.removeClass('fa-check').addClass('fa-times');
            }
        }
        else
        {
          this._new_password_form.removeClass('has-success').addClass('has-error');
          this._i_det_pwd.removeClass('fa-check').addClass('fa-times');
        }
    },
    _check_password_format: function(min, max, new_pwd, new_pwd_len)
    {
        return ((new_pwd_len >= min) && (new_pwd_len <= max) && (new_pwd.match(/\d/)) && (new_pwd.match(/[a-z]/i)) && !(new_pwd.match(/\s/)))

    },
    _get_special_string: function(str)
    {
      //If String Include Special Char Will Be Empty
      var reg = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
      return (reg.test(str));
    },
    _get_special_string_for_line: function(str)
    {
      //If String Include Special Char Will Be Empty
      var reg = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\/)(\<)(\>)(\?)(\)]+/);
      return (reg.test(str));
    },
    _check_data_format: function()
    {
      // check the all IDs are appeared
      let _det_form = $('#det_name').length +
                      $('#det_nickname').length +
                      $('#det_id_code').length +
                      $('#det_sex').length +
                      $('#det_cellphone').length +
                      $('#det_birthday_year').length +
                      $('#det_birthday_month').length +
                      $('#det_birthday_day').length +
                      $('#det_email').length +
                      $('#det_address_county').length +
                      $('#det_address_township').length +
                      $('#det_address_road').length +
                      $('#det_address_detail').length +
                      $('#det_fb_link').length +
                      $('#det_line_id').length;
      if (_det_form != 15)
      {
          $.alert
          ({
              title: '錯誤!',
              content: '網頁錯誤，請重新整理',
          });
          return false;
      }

      if (!this._check_det_nickname_form() || !this._check_det_id_code_form() || !this._check_det_cellphone_form())
      {
          $.alert
          ({
              title: '錯誤!',
              content: '填寫欄位格式有誤',
          });
          return false;
      }


      //Check The Page Has Not Any Red Block
      for (var i = 1; i <= 7; i++)
      {
        if ($('.profile-content .has-error').length > 0)
        {
          $.alert
          ({
            title: '錯誤!',
            content: '填寫欄位格式有誤',
          });
          return false;
        }
      }


      if ((this._det_birthday_year.val() != '') && (this._det_birthday_month.val() == '' || this._det_birthday_day.val() == ''))
      {
        $.alert
        ({
          title: '錯誤!',
          content: '生日未填完整！',
        });
        return false;
      }

      if ((this._det_address_county.val() != '') && (this._det_address_township.val() == '' || this._det_address_road.val() == '' || this._det_address_detail.val() == ''))
      {
        $.alert
        ({
          title: '錯誤!',
          content: '地址未填完整！',
        });
        return false;
      }
      return true;
    },
    _pad_left: function(str)
    {
      //In Birthday, If Month Or Days Only 1 Char, This Function Will Be Transform To 2 Chars
      var str_num = '';
      if (str.toString().length == 1)
      {
        str_num = '0' + str;
        return str_num;
      }
      else
      {
        return str;
      }
    },
    _switch_cellphone_btns_status: function(btnStatus)
    {
      switch(btnStatus)
      {
        // when already verified, show 'modify btn', hide 'verify btn'
        case 0:
          this._det_cellphone.attr({disabled: 'disabled'});
          this._btn_verify_cellphone.addClass('hidden');
          this._btn_refill_cellphone.removeClass('hidden').removeClass('btn-danger').addClass('btn-info').text('修改手機');
          break;

        // when modifying cellphone, show 'cancel modify btn', hide 'verify btn'
        case 1:
          this._det_cellphone.attr({disabled: false});
          this._btn_verify_cellphone.addClass('hidden');
          this._btn_refill_cellphone.removeClass('hidden').removeClass('btn-info').addClass('btn-danger').text('取消修改');
          break;
      }
    },
    _show_verify_popup: function()
    {
      let
        $popupBody,
        $btnSet,
        $btnReget;

      $popupBody = $('<div>', {id: 'verifyPopupBody'});
      $btnSet = $('<div>', {class: 'text-center'});

      $popupBody.append($('<p>', {text: '請輸入本站以簡訊傳送至手機(' + this._det_cellphone.val() + ')的驗證碼：'}));
      $popupBody.append($('<p>', {text: '* 若訊號不穩，可能影響簡訊傳送速度，請耐心等待', class: 'smallfont color-emphasized2'}));
      $popupBody.append($('<input>', {type: 'text', id: 'verificationCode', class: 'form-control text-center'}));
      $popupBody.append($('<div>', {id: 'countdowner'}));
      $btnSet.append($('<button>', {id: 'btnVerifyCountdowner', class: 'btn btn-success btnVerify', type: 'button', html: '執行驗證<br><span id="spnCountdownInfo">（<span id="spnVerifyCountdowner"></span>）</span>'})
      .on('click', () =>
      {
        this.countdown.stop();
        this.verifyCountdown.stop();
        this._verify_phone_number();
      }));
      $btnReget = $('<button>', {id: 'btnReget', type: 'button', class: 'btn btn-warning btnVerify', disabled: 'disabled'}).html('重新取得驗證碼<br><span id="spnPlzWait">（請等待<span id="spnCountdowner"></span>）</span>')
        .on('click', () =>
        {
          this.countdown.stop();
          this.verifyCountdown.stop();
          $('#btnReget').attr({disabled: 'disabled'});
          $('#btnVerifyCountdowner').attr({disabled: false});
          $('#spnCountdownInfo').removeClass('hidden');
          this._get_verification_code(true);
        });
      $btnSet.append($btnReget);

      // Create popup card
      createPopup
      ({
          close: true,
          body: $popupBody,
          head: '手機驗證',
          type: 'default',
          tail: $btnSet,
          freezed: 1
      });

      this.verifyCountdown = countdownModule({hh: 0, mm: 10, ss: 0, container: '#spnVerifyCountdowner', finish: function(){
        $('#btnVerifyCountdowner').attr({disabled: 'disabled'});
        $('#spnCountdownInfo').addClass('hidden');
      }});
      this.verifyCountdown.start();

      this.countdown = countdownModule({hh: 0, mm: 1, ss: 0, container: '#spnCountdowner', finish: function(){
        $('#btnReget').attr({disabled: false});
        $('#spnPlzWait').addClass('hidden');
      }});
      this.countdown.start();
      $('#verificationCode').focus();
    },
    _get_verification_code: function(retry)
    {
      this._show_rolling_popup('驗證簡訊發送中');

      new Promise((resolve, reject) =>
      {
        $.ajax
        ({
            url: '/ajax/sendCellphoneVerificationCode',
            type: 'post',
            dataType: 'json',
            data:
            {
              cellphone: this._det_cellphone.val()
            },
            headers:
            {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success(data, status, xhr)
            {
              if(data == '驗證碼已發送')
              {
                resolve(data);
              }
              else if(data == '手機號碼已有人使用！')
              {
                resolve(data)
              }
              else
              {
                let e = {apiName: 'sendCellphoneVerificationCode', errorCode: data};
                reject(e);
              }
            },
            error(e)
            {
              reject(e);
            }
        });
      })
      .then((data) =>
      {
        closePopup({unfreezed: true});
        if(retry)
        {
          $('#spnPlzWait').removeClass('hidden');
          this.verifyCountdown.restart();
          this.countdown.restart();
        }
        if(!retry)
        {
            this._show_verify_popup();
        }
      },(e) =>
      {
        closePopup({unfreezed: true});
        this._popup_error_message(e);
      });
    },
    _popup_error_message: function(e)
    {
      if(e.apiName)
      {
        let errorMsgArr;
        switch(e.apiName)
        {
          case 'sendCellphoneVerificationCode':
            errorMsgArr = {
              201: '系統發⽣錯誤，請聯絡大俠學習平台平台⼈員',
              202: '簡訊發送功能暫時停⽌服務，請稍候再試',
              203: '簡訊內容不得空白',
              204: '無效的手機號碼',
              205: '門號有錯誤',
              206: '逾時未送達'
            };
            break;
          case 'checkCellphoneVerificationCode':
            errorMsgArr = {
              201: '該手機號碼已經驗證完成',
              202: '驗證期限已超過，請重新驗證',
              203: '手機驗證碼錯誤，請重新輸入'
            };
            break;
        }
        errorMessage = errorMsgArr[e.errorCode];
      }
      else if(e.status)
      {
        errorMessage = e.status == 200? e.responseText : e.status + '<br>' + e.statusText;
      }
      else
      {
        errorMessage = e;
      }

      // Create popup card
      createPopup
      ({
          close: true,
          body: errorMessage,
          head: '錯誤',
          type: 'danger'
      });
    },
    _show_rolling_popup: function(msg)
    {
        let $popupBody = $('<div>', {id: 'bodyDeliveringSMS', class: 'bodyDeliveringSMS'});
        rollingLoading.draw($popupBody);
        // Create popup card
        createPopup
        ({
            body: $popupBody,
            head: msg,
            type: 'default',
            freezed: 2
        });
    },
    _verify_phone_number: function()
    {
      this._show_rolling_popup('手機驗證中...');

      new Promise((resolve, reject) =>
      {
        $.ajax
        ({
            url: '/ajax/checkCellphoneVerificationCode',
            type: 'post',
            dataType: 'json',
            data:
            {
              code: $('#verificationCode').val()
            },
            headers:
            {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success(data, status, xhr)
            {
              if(data == 101)
              {
                resolve(data);
              }
              else
              {
                let e = {apiName: 'checkCellphoneVerificationCode', errorCode: data};
                reject(e);
              }
            },
            error(e)
            {
              reject(e);
            }
        });
      })
      .then((data) =>
      {
        // Close Rest Popup
        closePopup({unfreezed: true});
        closePopup({unfreezed: true});
        this.countdown.stop();
        this.verifyCountdown.stop();
        this._switch_cellphone_btns_status(0);

        // Create popup card
        createPopup
        ({
            close: true,
            body: '此手機成功完成驗證，日後若更換手機號碼，則必須重新驗證新手機號碼。',
            head: '驗證成功',
            type: 'green'
        });

      },(e) =>
      {
        closePopup({unfreezed: true});
        this._popup_error_message(e);
      });
    }
  }
  return _const;
}());

function _process_hash(hash)
{
  if(hash == '')
  {
    hashBindController.setHash('detail');
  }
  else
  {
    $('#page_profile_' + hash).click();
  }
}

var 
  hashBindController,
  detail,
  rollingLoading;

$(function()
{
  detail = new detail();
  rollingLoading = rollingLoadingModule();
  hashBindController = hashBindController();
  hashBindController.init(_process_hash);
})
