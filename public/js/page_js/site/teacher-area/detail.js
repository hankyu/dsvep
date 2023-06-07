var teacher_detail = (function()
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
      //t_id
      this._t_id = $('#t_id_temp');

      //Member Data
      this._member_account = $('#member_account').val();

      //Edit Content
      this._edit_introduce = $('#edit_introduce');
      this._edit_works = $('#edit_works');
      this._edit_books = $('#edit_books');
      this._edit_certificate = $('#edit_certificate');
      this._edit_awards = $('#edit_awards');
      this._edit_reports = $('#edit_reports');
      this._edit_published = $('#edit_published');
      this._edit_type = $('#edit_type');
      this._edit_teach = $('#edit_teach');

      //Span Content
      this._span_intro_exp = $('#span_intro_exp');
      this._span_intro_link = $('#span_intro_link');
      this._span_works_exp = $('#span_works_exp');
      this._span_works_link = $('#span_works_link');
      this._span_books_exp = $('#span_books_exp');
      this._span_books_link = $('#span_books_link');
      this._span_certificate_exp = $('#span_certificate_exp');
      this._span_certificate_link = $('#span_certificate_link');
      this._span_awards_exp = $('#span_awards_exp');
      this._span_awards_link = $('#span_awards_link');
      this._span_reports_exp = $('#span_reports_exp');
      this._span_reports_link = $('#span_reports_link');
      this._span_published_exp = $('#span_published_exp');
      this._span_published_link = $('#span_published_link');
      this._span_type_exp = $('#span_type_exp');
      this._span_teach_exp = $('#span_teach_exp');

      //Send Message To The Teacher Btn
      this._add_message = $('#add_message');

      //Tab Items
      this._tab_teacher = $('#tab_teacher');
      this._tab_portfolios = $('#tab_portfolios');
      this._tab_lesson = $('#tab_lesson');
      this._teacher_content = $('#teacher_content');
      this._portfolios_content = $('#portfolios_content');
      this._lesson_content = $('#lesson_content');

      // Portfolios Items
      this._edit_btn_group  = $('#edit_btn_group')
      this._portfolios_body = $('#portfolios_body');
      this._portfolios_edit = $('#portfolios_edit_btn');

      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll: function()
    {
      this._edit_introduce.on('click', $.proxy(function()
      {
        this._modify_content('修改自我介紹', 'intro', this._span_intro_exp.text(), this._span_intro_link.text())
      }, this));

      this._edit_works.on('click', $.proxy(function()
      {
        this._modify_content('修改作品介紹', 'works', this._span_works_exp.text(), this._span_works_link.text())
      }, this));

      this._edit_books.on('click', $.proxy(function()
      {
        this._modify_content('修改著作介紹', 'book', this._span_books_exp.text(), this._span_books_link.text())
      }, this));

      this._edit_certificate.on('click', $.proxy(function()
      {
        this._modify_content('修改證書介紹', 'certificate', this._span_certificate_exp.text(), this._span_certificate_link.text())
      }, this));

      this._edit_awards.on('click', $.proxy(function()
      {
        this._modify_content('修改獎項介紹', 'awards', this._span_awards_exp.text(), this._span_awards_link.text())
      }, this));

      this._edit_reports.on('click', $.proxy(function()
      {
        this._modify_content('修改報導介紹', 'repo', this._span_reports_exp.text(), this._span_reports_link.text())
      }, this));

      this._edit_published.on('click', $.proxy(function()
      {
        this._modify_content('修改發表介紹', 'pub', this._span_published_exp.text(), this._span_published_link.text())
      }, this));

      this._edit_type.on('click', $.proxy(function()
      {
        this._modify_content('修改教學類型', 'type', this._span_type_exp.text(), '')
      }, this));

      this._edit_teach.on('click', $.proxy(function()
      {
        this._modify_content('修改教學經驗', 'teach', this._span_teach_exp.text(), '')
      }, this));

      this._add_message.on('click', $.proxy(function()
      {
        if (this._member_account == "") { $('#sidebar_login').click(); }
        else
        {
          var objThis = this;
          $.confirm
          ({
            title: '傳送訊息-' + this._add_message.data('nickname'),
            content:
            '<input type=text id="ms_account" class="form-control" style="margin-bottom: 10px;" placeholder="欲傳送的使用者帳號" value="' + this._add_message.data('account') +'" disabled="disabled">' +
            '<textarea id="ms_content" rows="20" class="form-control" placeholder="請輸入內容..."></textarea>',
            columnClass: 'large',
            buttons:
            {
              '取消': {},
              '傳送！':
              {
                btnClass: 'btn-green',
                action: function()
                {
                  var ms_account = this.$content.find('#ms_account').val();
                  var ms_content = this.$content.find('#ms_content').val();
                  account_exist = teacher_detail._check_account_exist(ms_account);
                  if (ms_account != objThis._member_account)
                  {
                    if (account_exist == false)
                    {
                      $.alert('無此用戶', '錯誤');
                      return false;
                    }
                    else if (ms_content == '')
                    {
                      $.alert('未輸入內容', '錯誤');
                      return false;
                    }
                    else
                    {
                      var post_data =
                      {
                        from: objThis._member_account,
                        to: ms_account,
                        content: ms_content
                      }
                      firebaseController.sendInsiteMessage(post_data);
                      $.alert('已送出', '成功');
                    }
                  }
                  else
                  {
                    $.alert('請勿輸入自己的帳號', '錯誤');
                    return false;
                  }
                }
              }
            }
          })
        }
      }, this));

      this._tab_teacher.on('click', $.proxy(function()
      {
        this._lesson_content.hide(100);
        this._portfolios_content.hide(100);
        this._teacher_content.show();
        $('.nav-tabs li').removeClass('active');
        this._tab_teacher.addClass('active');
        hashBindController.setHash('teacher');
      }, this));

      this._tab_portfolios.on('click', $.proxy(function()
      {
          this._teacher_content.hide(100);
          this._lesson_content.hide(100);
          this._portfolios_content.show();
          $('.nav-tabs li').removeClass('active');
          this._tab_portfolios.addClass('active');
          hashBindController.setHash('portfolios');
      }, this));

      this._tab_portfolios.one('click', function()
      {
          portfoliosInitModule.init();
      });

      this._tab_lesson.on('click', $.proxy(function()
      {
        this._teacher_content.hide(100);
        this._portfolios_content.hide(100);
        this._lesson_content.show();
        $('.nav-tabs li').removeClass('active');
        this._tab_lesson.addClass('active');
        hashBindController.setHash('lesson');
      }, this));
    },
    _modify_content: function(title, item, intro_old, link_old)
    {
      intro_old_esc_char = escape(intro_old);
      link_old_esc_char = escape(link_old);
      var objThis = this;
      var intro_old_div = (item != 'teach') && (item != 'type')
                        ? '<div>' +
                            '<div class="form-group">' +
                              '<textarea placeholder="介紹" class="introduce form-control" style="resize: none; height: 40vh;">' + intro_old + '</textarea>' +
                            '</div>' +
                            '<div class="form-group">' +
                              '<input type="text" placeholder="相關連結" value="' + link_old + '" class="link form-control" />' +
                            '</div>' +
                          '</div>'
                        : '<div>' +
                            '<div class="form-group">' +
                              '<textarea placeholder="介紹" class="introduce form-control" style="resize: none; height: 40vh;">' + intro_old + '</textarea>' +
                            '</div>' +
                          '</div>';
      var script = (item != 'teach') && (item != 'type')
                 ? '<script>' +
                     '$(".introduce").keyup(function(event)' +
                     '{' +
                       'if ((escape($(".introduce").val()) == "' + intro_old_esc_char + '") && (escape($(".link").val()) == "' + link_old_esc_char + '"))' +
                       '{' +
                         '$(".send").attr("disabled", "disabled")' +
                       '}' +
                       'else' +
                       '{' +
                         '$(".send").removeAttr("disabled", "disabled")' +
                       '}' +
                     '});' +
                     '$(".link").keyup(function(event)' +
                     '{' +
                       'if ((escape($(".introduce").val()) == "' + intro_old_esc_char + '") && (escape($(".link").val()) == "' + link_old_esc_char + '"))' +
                       '{' +
                         '$(".send").attr("disabled", "disabled");' +
                       '}' +
                       'else' +
                       '{' +
                         '$(".send").removeAttr("disabled", "disabled");' +
                       '}' +
                     '})' +
                   '</script>'
                 : '<script>' +
                     '$(".introduce").keyup(function(event)' +
                     '{' +
                       'if (escape($(".introduce").val()) == "' + intro_old_esc_char + '")' +
                       '{' +
                         '$(".send").attr("disabled", "disabled")' +
                       '}' +
                       'else' +
                       '{' +
                         '$(".send").removeAttr("disabled", "disabled")' +
                       '}' +
                     '});' +
                   '</script>';
      $.confirm
      ({
        columnClass: 'medium',
        title: title,
        containerFluid: true,
        content: intro_old_div + script,
        onOpenBefore: function ()
        {
          this.buttons.fix.disable();
          this.buttons.fix.addClass('send');
        },
        buttons:
        {
          '取消': {},
          fix:
          {
            text: '修改！',
            btnClass: 'btn-blue',
            action: function()
            {
              var intro_new = this.$content.find('.introduce').val();
              if ((item != 'teach') && (item != 'type'))
              {
                var link_new = this.$content.find('.link').val();
                var regex_link = /(https?:\/\/[\w-\.]+(:\d+)?(\/[\w\/\.]*)?(\?\S*)?(#\S*)?)/g;
                t_id = objThis._t_id.val();
                if ((!regex_link.test(link_new)) && (link_new != ''))
                {
                  $.alert('連結的格式錯誤', '錯誤');
                  return false;
                }
                else
                {
                  $.ajax
                  ({
                    url: '/ajax/modify_teacher_detail/' + t_id  + '/' + item,
                    type: 'post',
                    dataType: 'json',
                    async: false,
                    data:
                    {
                      intro: intro_new,
                      link: link_new
                    },
                    headers:
                    {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success(data)
                    {
                      if (data.status == 'success')
                      {
                        $.confirm
                        ({
                          title: '成功',
                          content: '更新講師明細成功',
                          buttons:
                          {
                            close:
                            {
                              btnClass: 'btn-blue',
                              action: function()
                              {
                                location.reload();
                              }
                            }
                          }
                        })
                      }
                      else { $.alert(data.status, '錯誤'); }
                    }
                  })
                }
              }
              else
              {
                t_id = objThis._t_id.val();
                $.ajax
                ({
                  url: '/ajax/modify_teacher_detail/' + t_id  + '/' + item,
                  type: 'post',
                  dataType: 'json',
                  async: false,
                  data:
                  {
                    intro: intro_new,
                  },
                  headers:
                  {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  },
                  success(data)
                  {
                    if (data.status == 'success')
                    {
                      $.confirm
                      ({
                        title: '成功',
                        content: '更新講師明細成功',
                        buttons:
                        {
                          close:
                          {
                            btnClass: 'btn-blue',
                            action: function()
                            {
                              location.reload();
                            }
                          }
                        }
                      })
                    }
                    else { $.alert(data.status, '錯誤'); }
                  }
                })
              }
            }
          },
        }
      });
    },
    _check_account_exist: function(ms_account)
    {
      // 確認是否有該使用者
      $.ajax
      ({
        type: 'POST',
        url: '/ajax/accountExist',
        dataType: 'json',
        async: false,
        data:
        {
          checked_account: ms_account
        },
        headers:
        {
          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success: function(data)
        {
          result = data.status
        },
        error: function(e)
        {
          result = e;
        }
      });
      return result;
    }
  }
  return _const;
}());

function _process_hash(hash)
{
  if(hash == '')
  {
    hashBindController.setHash('teacher');
  }
  else
  {
      teacher_detail['_tab_' + hash].click();
  }
}

var portfoliosModule,
    teacher_detail,
    rollingLoading;

$(function()
{
  portfoliosModule = new portfoliosModule();
  teacher_detail = new teacher_detail();
  hashBindController = hashBindController();
  hashBindController.init(_process_hash);
})

/**
 * Public Function
 */

function _cancel_audit(num, name)
{
    $.confirm
    ({
        title: '確認取消審核',
        content: '你確定要取消 <span class="color-emphasized2">' + name + '</span> 課程的審核嗎',
        buttons :
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/cancel_audit/' + num,
                        type: 'POST',
                        dataType: 'json',
                        data: {},
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(data)
                        {
                            if (data.message == 'finish')
                            {
                                let l_id = num;
                                firebaseController.cancelLessonAudit(l_id).then(() =>
                                {
                                    $.confirm
                                    ({
                                        title: '完成',
                                        content: '取消審核完成',
                                        buttons:
                                        {
                                            '確認':
                                            {
                                                btnClass: 'btn-success',
                                                action: function() { location.reload(); }
                                            }
                                        }
                                    })
                                });
                            }
                            else { $.alert(data.message, '錯誤'); }
                        },
                        error()
                        {
                            $.alert('好像出了一些錯誤', '錯誤');
                        }
                    })
                }
            },
            '取消':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}

function _delete_lesson(num, name)
{
    $.confirm
    ({
        title: '確認刪除課程',
        content: '你確定要刪除 <span class="color-emphasized2">' + name + '</span> 課程嗎',
        buttons :
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/delete_lesson/' + num,
                        type: 'delete',
                        dataType: 'json',
                        data: {},
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(data)
                        {
                            if (data.message == 'finish')
                            {
                                $.confirm
                                ({
                                    title: '完成',
                                    content: '刪除課程完成',
                                    buttons:
                                    {
                                        '確認':
                                        {
                                            btnClass: 'btn-success',
                                            action: function() { location.reload(); }
                                        }
                                    }
                                })
                            }
                        },
                        error()
                        {
                            $.alert('好像出了一些錯誤', '錯誤');
                        }
                    })
                }
            },
            '取消':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}

/**
 * Custom Module
 */

/**
 * [portfoliosInitModule]
 * @type {Module}
 * Init portfoliosInitModule
 */
portfoliosInitModule = new portfoliosInitModule();

function portfoliosInitModule()
{
    let
        old_data = '',
        // Limit Init Times Once
        initCount = 0,
        // Check HTML Has Edit Element
        isTeacher = $('.portfolios__edit').length ? true : false;


    function initAll()
    {
        let loading_block = $('#loading_block'),
            portfolios_edit = $('#portfolios_edit_btn');

        initCount++;

        portfoliosModule.getPortfolios().then((data) =>
        {
            let insert_target = $('#portfolios_body');

            if (isTeacher)
            {
                portfolios_edit.on('click', (e) =>
                {
                    let edit_btn_group        = $('#edit_btn_group'),
                        edit_cancel           = $('#edit_cancel'),
                        edit_ok               = $('#edit_ok'),
                        portfolios_body       = $('#portfolios_body'),
                        portfolios_card       = $('#portfolios_card'),
                        portfolios_edit_btn   = $('#portfolios_edit_btn'),
                        portfolios_edit_group = $('#portfolios_edit_group'),

                        // Edit Element
                        edit_textarea,
                        edit_preview;

                    edit_btn_group.show();
                    portfolios_edit_btn.hide();
                    portfolios_card.hide();

                    // Create Edit Element
                    edit_textarea = $('<textarea>', {
                        class: 'edit__textarea',
                        id: 'edit_textarea',
                        placeholder: '請在這裡添加您的作品網址或上傳圖片',
                        text: data
                    });

                    edit_preview = $('<div>', {
                        class: 'edit__preview card-body portfolios__body',
                        id: 'edit_preview'
                    });

                    // Insert HTML To DOM
                    portfolios_edit_group.before(edit_textarea);
                    portfolios_edit_group.after(edit_preview);

                    // Init Textarea And Preview Of Edit
                    initEditPreview();
                    initEditTextarea();
                });

                portfolios_edit.one('click', (e) =>
                {
                    // Init Edit OK And Cancel Button
                    initEditCancel();
                    initEditOk();
                    // Init ImageUpload
                    initImageUpload();
                });
            }

            // Teacher Portfolios Is Null
            if (data == null)
            {
                loading_block.hide();
                $('#portfolios_body').attr('data-text', '講師尚未新增作品');
                // Leave The Execution Scope
                return;
            }

            insert_target.append(replaceHTMLTag(data));
            old_data = $('#portfolios_body').html();

            loading_block.hide();
        })
        .catch((e) =>
        {
            $.alert({
                title: 'Oops! 發生錯誤',
                content: '發生事件：' + e.statusText + '<br>' + '請聯絡我們'
            });

            loading_block.hide();
        });
    }

    function initEditCancel()
    {
        let edit_btn_group      = $('#edit_btn_group'),
            edit_cancel         = $('#edit_cancel'),
            portfolios_card     = $('#portfolios_card'),
            portfolios_edit_btn = $('#portfolios_edit_btn');

        edit_cancel.on('click', () =>
        {
            let edit_preview    = $('#edit_preview'),
                edit_textarea   = $('#edit_textarea'),
                portfolios_body = $('#portfolios_body');

            if (edit_textarea.val())
            {
                $.confirm({
                    buttons:
                    {
                        確定:
                        {
                            action: () =>
                            {
                                cancelEdit();
                            },
                            btnClass: 'btn-red',
                            text: '確定'
                        },
                        取消: {}
                    },
                    content: '您正在編輯內容，確定要取消編輯?',
                    title: '取消編輯',
                    type: 'red'
                })
            }
            else { cancelEdit(); }
        });

        function cancelEdit()
        {
            let edit_preview  = $('#edit_preview'),
                edit_textarea = $('#edit_textarea');

            edit_btn_group.hide();
            portfolios_card.show();
            portfolios_edit_btn.show();

            // Remove Textarea And Preview Of Edit
            edit_preview.remove();
            edit_textarea.remove();
        }
    }

    function initEditOk()
    {
        let edit_btn_group      = $('#edit_btn_group'),
            edit_ok             = $('#edit_ok'),
            edit_textarea       = $('#edit_textarea'),
            portfolios_card     = $('#portfolios_card'),
            portfolios_edit_btn = $('#portfolios_edit_btn'),

            old_data = edit_textarea.val();

        edit_ok.on('click', () =>
        {
            // Check If Textarea Has Been Modifyed
            if (old_data == edit_textarea.val())
            {
                $.alert({
                    title: 'Oops! 發生錯誤',
                    content: '尚未修改文字'
                });
                // Break
                return;
            }

            portfoliosModule.changePortfolios(edit_textarea.val()).then((data) =>
            {
                switch (data)
                {
                    case true:
                        old_data = edit_textarea.val();

                        $.alert({
                            buttons:
                            {
                                確定:
                                {
                                    action: () =>
                                    {
                                        location.reload();
                                    }
                                }
                            },
                            content: '<div class="color: red;">成功儲存<div>',
                            title: '成功儲存',
                            type: 'green'
                        });

                        break;
                    default:
                        $.alert({
                            title: 'Oops! 發生錯誤',
                            content: '未知錯誤' + '<br>' + '錯誤代碼：' + data + '<br>' + '請聯絡我們'
                        });
                }
            })
            .catch((e) =>
            {
                $.alert({
                    title: 'Oops! 發生錯誤',
                    content: '發生事件：' + e.statusText + '<br>' + '請聯絡我們'
                });
            });
        })
    }

    function initEditPreview()
    {
        resetPreview();
    }

    function initEditTextarea()
    {
        let edit_textarea = $('#edit_textarea');

        edit_textarea.on('keydown drop', () =>
        {
            setTimeout(() =>
            {
                resetPreview();
            });
        });
    }

    function initImageUpload()
    {
        let
            imageUpload         = new imageUploadModule(),
            edit_textarea       = $('#edit_textarea'),
            upload_image        = $('#upload_image'),
            upload_progress_bar = $('#upload_progress_bar'),uploadErr__text
            uploaded__text      = $('#uploaded__text'),
            uploading__text     = $('#uploading__text');

        // Initialize
        upload_image.on('change', () =>
        {
            imageUpload.imageUpload(upload_image[0].files);
        });

        edit_textarea.on('drop', (e) =>
        {
            if(e.originalEvent.dataTransfer.files.length != 0)
            {
                e.preventDefault();
                e.stopPropagation();
                imageUpload.imageUpload(e.originalEvent.dataTransfer.files);
            }
        });

        /**
         * Initialize Upload Image Function Of /public/js/page_js/site/module/portfolios_module.js
         */
        imageUpload.imageUploading = function()
        {
            upload_image.attr('disabled', 'disabled');
            uploading__text.show();
        }

        imageUpload.imageUploadingProgress = function(percent_complete)
        {
            uploading__text.show();
            upload_progress_bar.css('width', percent_complete + "%");
            uploaded__text.hide();
        }

        imageUpload.imageUploaded = function(url)
        {
            uploading__text.hide();
            uploaded__text.show();

            upload_image.removeAttr('disabled');

            edit_textarea.val(edit_textarea.val() + '\n' + url);
            resetPreview();
        }
    }

    function resetPreview()
    {
        let edit_preview  = $('#edit_preview'),
            edit_textarea = $('#edit_textarea');

        edit_preview.html(replaceHTMLTag(edit_textarea.val()));
    }

    return {
        init()
        {
            if (!initCount)
            {
                initAll();
            }
        }
    }
}

/**
 * [replaceHTMLTag]
 * @param  {[String]} data [Processing string]
 * @return {[String]}      [Add HTML Tag]
 */
function replaceHTMLTag(data)
{
    let data_arr = [],
        determine_HTML = '';

    data_arr = data.split(/\n/g);

    $.each(data_arr, (key, value) =>
    {
        if (!value) { determine_HTML += '<br>' }

        value = value.replace(/[\u00A0-\u9999<>\&]/gim, (match) =>
        {
            return '&#' + match.charCodeAt(0) + ';';
        });

        // Determine It Is URL
        if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(value))
        {
            if(/.(jpg|jpeg|png|gif)$/g.test(value))
            {
                determine_HTML += '<img src="' + value + '">';
            }
            else
            {
                if(/^(?!http)[\S]+/g.test(value))
                {
                    determine_HTML += '<a target="_blank" rel="noopener noreferrer" href="https://' + value + '">' + value + '</a>';
                }
                else
                {
                    determine_HTML += '<a target="_blank" rel="noopener noreferrer" href="' + value + '">' + value + '</a>';
                }
            }
        }
        else
        {
            determine_HTML += '<div>' + value + '</div>';
        }
    });

    return determine_HTML;
}
