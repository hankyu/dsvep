var becometeacher = (function()
{
  var _const;
  _const = function()
  {
    this._construct();
  }
  _const.prototype =
  {
    _construct: function()
    {
      //Become Teacher Form
      this._become_teacher_form = $('#become_teacher_form');

      //Input Column
      this._edu_school = $('#edu_school');
      this._edu_dapartment = $('#edu_dapartment');
      this._edu_degree = $('#edu_degree');
      this._intro_exp = $('#intro_exp');
      this._intro_link = $('#intro_link');
      this._works_exp = $('#works_exp');
      this._works_link = $('#works_link');
      this._book_exp = $('#book_exp');
      this._book_link = $('#book_link');
      this._cerificate_exp = $('#cerificate_exp');
      this._cerificate_link = $('#cerificate_link');
      this._awards_exp = $('#awards_exp');
      this._awards_link = $('#awards_link');
      this._repo_exp = $('#repo_exp');
      this._repo_link = $('#repo_link');
      this._pub_exp = $('#pub_exp');
      this._pub_link = $('#pub_link');
      this._teach_type = $('#teach_type');
      this._teach_exp = $('#teach_exp');

      //Input Column Form
      this._form_edu_school = $('#form_edu_school');
      this._form_edu_dapartment = $('#form_edu_dapartment');
      this._form_edu_degree = $('#form_edu_degree');
      this._form_intro_link = $('#form_intro_link');
      this._form_works_link = $('#form_works_link');
      this._form_book_link = $('#form_book_link');
      this._form_cerificate_link = $('#form_cerificate_link');
      this._form_awards_link = $('#form_awards_link');
      this._form_repo_link = $('#form_repo_link');
      this._form_pub_link = $('#form_pub_link');

      //Input Column Image
      this._i_edu_school = $('#i_edu_school');
      this._i_edu_dapartment = $('#i_edu_dapartment');
      this._i_edu_degree = $('#i_edu_degree');
      this._i_intro_link = $('#i_intro_link');
      this._i_works_link = $('#i_works_link');
      this._i_book_link = $('#i_book_link');
      this._i_cerificate_link = $('#i_cerificate_link');
      this._i_awards_link = $('#i_awards_link');
      this._i_repo_link = $('#i_repo_link');
      this._i_pub_link = $('#i_pub_link');
      this._i_teach_type = $('#i_teach_type');
      this._btn_become_teacher = $('#btn_become_teacher');
      this._btn_here_refuel = $('#btn_here_refuel');
      this._btn_here_success = $('#btn_here_success');

      //Menu's Content
      this._btn_become_teacher_introduce = $('#btn_become_teacher_introduce, #btn_become_teacher_introduce_footer');
      this._btn_become_teacher_refuel = $('#btn_become_teacher_refuel');
      this._btn_become_teacher_login = $('#btn_become_teacher_login, #btn_become_teacher_login_footer');
      this._summary = $('#summary');
      this._fill_page = $('#fill_page');
      this._scrollspy_done = false;
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll: function()
    {
      //In Fail Page, User Click Here Button
      this._btn_here_refuel.on('click', $.proxy(function()
      {
        $.confirm
        ({
          title: '確認',
          content: '你確定要修改上次的申請資料嗎？',
          buttons:
          {
            '取消': {},
            '確定':
            {
              btnClass: 'btn-green',
              action: function()
              {
                firebaseController.modifyApplyTeacher($('#login_account').val());

                $.ajax
                ({
                  url: '/ajax/become_teacher_refuel',
                  type: 'get',
                  async: false,
                  success: function(data)
                  {
                    if (data.status == 'success')
                    {
                      $('#btn_here_refuel').attr('disabled', 'disabled');
                      setTimeout('becometeacher.showTreaty();',1000);
                    }
                    else
                    {
                      $.alert('好像出了一點狀況');
                    }
                  }
                })
              }
            },
          }
        })
      }, this));

      //In Success Page, User Click Go To Teacher Area Button
      this._btn_here_success.on('click', $.proxy(function()
      {
        $.ajax
        ({
          url: '/ajax/become_teacher_check_rule',
          type: 'get',
          async: false,
          success(data)
          {
            if (data.status == 'success')
            {
              $.confirm
              ({
                title: '成功',
                content: '恭喜，您已經成為講師！選單功能已經更新。',
                type: 'green',
                typeAnimated: true,
                buttons:
                {
                  ok:
                  {
                    text: '確定',
                    btnClass: 'btn-green',
                    action: function()
                    {
                      location.href = '/#/teacher/' + $('#teacher_id').val();
                    }
                  },
                }
              });
            }
            else
            {
              alert('ajax error!');
            }
          }
        })
      }, this));

      //Click Apply Teacher Button
      this._btn_become_teacher.on('click', $.proxy(function()
      {
        if (this._check_data_format() == true)
        {
          firebaseController.applyTeacher($('#login_account').val());
          $.confirm
          ({
            title: '成功！',
            content: '申請講師成功，請等候審核結果！',
            buttons:
            {
              'OK': function()
              {
                $(window).unbind('beforeunload');
                $('#become_teacher_form').submit();
              }
            }
          })
        }
      }, this));

      //Avoid Exit Page Is Not Save About User Fill In Data
      $(window).on('beforeunload', function()
      {
        if (($('#hidden_become_teacher_field').val() != '') && ($('#hidden_become_teacher_field').length > 0))
        {
          return 'Are you sure ?';
        }
      });

      //Education Column
      this._edu_school.on('blur', $.proxy(function()
      {
        var text_edu_school = this._edu_school.val();
        if (text_edu_school == '')
        {
          this._form_edu_school.addClass('has-error');
          this._i_edu_school.addClass('fa-times');
        }
        else
        {
          this._form_edu_school.removeClass('has-error');
          this._i_edu_school.removeClass('fa-times');
        }
      }, this));

      this._edu_dapartment.on('blur', $.proxy(function()
      {
        var text_eud_dapartment = this._edu_dapartment.val();
        if (text_eud_dapartment == '')
        {
          this._form_edu_dapartment.addClass('has-error');
          this._i_edu_dapartment.addClass('fa-times');
        }
        else
        {
          this._form_edu_dapartment.removeClass('has-error');
          this._i_edu_dapartment.removeClass('fa-times');
        }
      }, this));

      this._edu_degree.on('blur', $.proxy(function()
      {
        var text_edu_degree = this._edu_degree.val();
        if (text_edu_degree == '')
        {
          this._form_edu_degree.addClass('has-error');
          this._i_edu_degree.addClass('fa-times');
        }
        else
        {
          this._form_edu_degree.removeClass('has-error');
          this._i_edu_degree.removeClass('fa-times');
        }
      }, this));

      //Introduce Column
      this._intro_exp.on('blur', $.proxy(function()
      {
        var text_intro_exp = this._intro_exp.val();
        if (text_intro_exp != '')
        {
          this._intro_exp.removeClass('textarea-error');
        }
        else
        {
          this._intro_exp.addClass('textarea-error');
        }
      }, this));

      this._intro_link.on('blur', $.proxy(function()
      {
        var text_intro_link = this._intro_link.val();
        if (text_intro_link != '')
        {
          var result_intro_link = this._check_link_format(text_intro_link);
          if (result_intro_link == true)
          {
            this._form_intro_link.removeClass('has-error');
            this._i_intro_link.removeClass('fa-times');
          }
          else
          {
            this._form_intro_link.addClass('has-error');
            this._i_intro_link.addClass('fa-times');
          }
        }
        else
        {
          this._form_intro_link.removeClass('has-error');
          this._i_intro_link.removeClass('fa-times');
        }
      }, this));

      //Works Column
      this._works_exp.on('blur', $.proxy(function()
      {
        var text_works_exp = this._works_exp.val();
        if (text_works_exp != '')
        {
          this._works_exp.removeClass('textarea-error');
        }
        else
        {
          this._works_exp.addClass('textarea-error');
        }
      }, this));

      this._works_link.on('blur', $.proxy(function()
      {
        var text_works_link = this._works_link.val();
        if (text_works_link != '')
        {
          var result_work_link = this._check_link_format(text_works_link);
          if (result_work_link == true)
          {
            this._form_works_link.removeClass('has-error');
            this._i_works_link.removeClass('fa-times');
          }
          else
          {
            this._form_works_link.addClass('has-error');
            this._i_works_link.addClass('fa-times');
          }
        }
        else
        {
          this._form_works_link.removeClass('has-error');
          this._i_works_link.removeClass('fa-times');
        }
      }, this));

      //Books Column
      this._book_link.on('blur', $.proxy(function()
      {
        var text_book_link = this._book_link.val();
        if (text_book_link != '')
        {
          var result_book_link = this._check_link_format(text_book_link);
          if (result_book_link == true)
          {
            this._form_book_link.removeClass('has-error');
            this._i_book_link.removeClass('fa-times');
          }
          else
          {
            this._form_book_link.addClass('has-error');
            this._i_book_link.addClass('fa-times');
          }
        }
        else
        {
          this._form_book_link.removeClass('has-error');
          this._i_book_link.removeClass('fa-times');
        }
      }, this));

      //Cetificates Column
      this._cerificate_link.on('blur', $.proxy(function()
      {
        var text_cerificate_link = this._cerificate_link.val();
        if (text_cerificate_link != '')
        {
          var result_cerificate_link = this._check_link_format(text_cerificate_link);
          if (result_cerificate_link == true)
          {
            this._form_cerificate_link.removeClass('has-error');
            this._i_cerificate_link.removeClass('fa-times');
          }
          else
          {
            this._form_cerificate_link.addClass('has-error');
            this._i_cerificate_link.addClass('fa-times');
          }
        }
        else
        {
          this._form_cerificate_link.removeClass('has-error');
          this._i_cerificate_link.removeClass('fa-check');
        }
      }, this));

      //Awards Column
      this._awards_link.on('blur', $.proxy(function()
      {
        var text_awards_link = this._awards_link.val();
        if (text_awards_link != '')
        {
          var result_awards_link = this._check_link_format(text_awards_link);
          if (result_awards_link == true)
          {
            this._form_awards_link.removeClass('has-error');
            this._i_awards_link.removeClass('fa-times');
          }
          else
          {
            this._form_awards_link.addClass('has-error');
            this._i_awards_link.addClass('fa-times');
          }
        }
        else
        {
          this._form_awards_link.removeClass('has-error');
          this._i_awards_link.removeClass('fa-times');
        }
      }, this));

      //Report Column
      this._repo_link.on('blur', $.proxy(function()
      {
        var text_repo_link = this._repo_link.val();
        if (text_repo_link != '')
        {
          var result_repo_link = this._check_link_format(text_repo_link);
          if (result_repo_link == true)
          {
            this._form_repo_link.removeClass('has-error');
            this._i_repo_link.removeClass('fa-times');
          }
          else
          {
            this._form_repo_link.addClass('has-error');
            this._i_repo_link.addClass('fa-times');
          }
        }
        else
        {
          this._form_repo_link.removeClass('has-error');
          this._i_repo_link.removeClass('fa-times');
        }
      }, this));

      //Published Column
      this._pub_link.on('blur', $.proxy(function()
      {
        var text_pub_link = this._pub_link.val();
        if (text_pub_link != '')
        {
          var result_pub_link = this._check_link_format(text_pub_link);
          if (result_pub_link == true)
          {
            this._form_pub_link.removeClass('has-error');
            this._i_pub_link.removeClass('fa-times');
          }
          else
          {
            this._form_pub_link.addClass('has-error');
            this._i_pub_link.addClass('fa-times');
          }
        }
        else
        {
          this._form_pub_link.removeClass('has-error');
          this._i_pub_link.removeClass('fa-times');
        }
      }, this));

      //Teach Type Column
      this._teach_type.on('blur', $.proxy(function()
      {
        var text_teach_type = this._teach_type.val();
        if (text_teach_type != '')
        {
          this._teach_type.removeClass('textarea-error');
        }
        else
        {
          this._teach_type.addClass('textarea-error');
        }
      }, this));

      //Teach Experience Column
      this._teach_exp.on('blur', $.proxy(function()
      {
        var text_teach_exp = this._teach_exp.val();
        if (text_teach_exp != '')
        {
          this._teach_exp.removeClass('textarea-error');
        }
        else
        {
          this._teach_exp.addClass('textarea-error');
        }
      }, this));

      this._btn_become_teacher_login.on('click', function()
      {
        layout._go_to_login();
      });

      this._btn_become_teacher_introduce.on('click', $.proxy(function()
      {
        this.showTreaty();
      }, this));
      this._btn_become_teacher_refuel.on('click', $.proxy(function()
      {
        this.showTreaty(true);
      }, this));

      this.showTreaty = function(isRefuel)
      {
        $.proxy($.ajax({
          url: "./html/policy.htm",
            cache: false
          })
          .done(function( html ) {
            var confirm_content = html ;
            
            $.confirm
            ({
              title: '講師條款',
              content: confirm_content,
              columnClass: 'large treaty',
              buttons:
              {
                '取消': {
                  action: function(){
                    $('#btn_here_refuel')
                      .unbind( "click" )
                      .addClass('btn-become-teacher-introduce')
                      .attr({
                        'id' : '',
                        'disabled' : false
                      })
                      .on('click', $.proxy(function()
                      {
                        this.showTreaty();
                      }, becometeacher));
                    }
                },
                '我同意':
                {
                  btnClass: 'btn-green',
                  action: function()
                  {
                    if(isRefuel)
                    {
                      becometeacher.switchPage(true);
                    }
                    else
                    {
                      location.href = '/becometeacher';
                    }
                  }
                },
              }
            });
          }), this);
          
      };
      this.switchPage = function (formpage)
      {
        if(formpage)
        {
          this._summary.removeClass('active');
          this._fill_page.addClass('active');

          if(!this._scrollspy_done){
            //Bootstrap ScrollSpy
            $('body').scrollspy({ target: '#become_teacher_menu', offset: 100});
          }
        }
        else
        {
          this._summary.addClass('active');
          this._fill_page.removeClass('active');
        }
      }

      this.switchPage();
    },
    _check_link_format: function(link)
    {
      //Check Link Is Valid
      var regex_link = /(https?:\/\/[\w-\.]+(:\d+)?(\/[\w\/\.]*)?(\?\S*)?(#\S*)?)/g;
      if (regex_link.test(link)) { return true; }
      else { return false; }
    },
    _check_data_format: function()
    {
      //Check The Page Has Not Any Red Block
      this._check_fill_in();
      var textarea_error_num = $('#profile .textarea-error').length;
      var input_error_num = $('#profile .has-error').length;
      if ((textarea_error_num + input_error_num) != 0)
      {
        $.confirm
        ({
          title: '錯誤!',
          content: '必填沒有填滿或連結格式有誤',
          buttons:
          {
            'ok':
            {
              btnClass: 'btn-info',
              action: function()
              {
                var require_array = $('[require]');
                for (i = 0; i < require_array.length; i++)
                {
                  if (require_array[i].value == '')
                  {
                    $('#' + require_array[i].id).focus();
                    $('html').animate({scrollTop: ($('#' + require_array[i].id).offset().top - 180)}, 800);
                    $('.jconfirm').hide();
                    return false;
                  }
                }
              }
            }
          }
        });
        return false;
      }
      return true;
    },
    _check_fill_in: function()
    {
      if (this._intro_exp.val() == '')
      {
        this._intro_exp.addClass('textarea-error');
      }

      if (this._works_exp.val() == '')
      {
        this._works_exp.addClass('textarea-error');
      }

      if (this._teach_type.val() == '')
      {
        this._teach_type.addClass('textarea-error');
      }

      if (this._teach_exp.val() == '')
      {
        this._teach_exp.addClass('textarea-error');
      }

      if (this._edu_school.val() == '')
      {
        this._form_edu_school.addClass('has-error');
      }

      if (this._edu_dapartment.val() == '')
      {
        this._form_edu_dapartment.addClass('has-error');
      }

      if (this._edu_degree.val() == '')
      {
        this._form_edu_degree.addClass('has-error');
      }
    }
  }
  return _const;
}());

var becometeacher;
$(function()
{
  becometeacher = new becometeacher();
  if($('#new_apply').length)
  {
    becometeacher.switchPage(true);
  }
})

//Scroll To Assign Position For The Menu
function _menu_scroll_to(title)
{
  $('html').animate({scrollTop: ($('#' + title).offset().top - 80)}, 800);
}
