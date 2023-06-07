var create_lesson = (function()
{
  var _const;
  _const = function()
  {
    this._chapter_num = new Array();
    this._detail_check = new Array();
    this._unit_use = false;
    this._construct();
  }
  _const.prototype =
  {
    _construct: function()
    {
      this._account           = $('#account').val();
      this._btn_create        = $('#btn_create');
      this._btn_add_condition = $('#btn_add_condition');
      this._btn_add_learn     = $('#btn_add_learn');
      this._btn_add_suit      = $('#btn_add_suit');
      this._btn_add_unit      = $('#btn_add_unit');
      this._btn_info_save     = $('#btn_info_save');
      this._btn_goal_save     = $('#btn_goal_save');
      this._btn_detail_save   = $('#btn_detail_save');
      this._btn_chapter_save  = $('#btn_chapter_save');
      this._btn_media_save    = $('#btn_media_save');
      this._btn_preview       = $('#btn_preview');
      this._btn_submit        = $('#btn_submit');
      this._btn_copy          = $('#btn_copy');
      this._btn_own_copy      = $('#btn_own_copy');
      this._btn_unit_sortable = $('#btn_unit_sortable');
      this._condition_area    = $('#condition_area');
      this._learn_area        = $('#learn_area');
      this._lesson_id         = $('#lesson_id').val();
      this._lesson_start_time = $('#lesson_start_time').val()
      this._lesson_type       = $('#lesson_type');
      this._path              = $('#path');
      this._suit_area         = $('#suit_area');
      this._unit_area         = $('#unit_area');
      this._media             = $('#media');
      this._media_image       = $('#media_image');
      this._media_video       = $('#media_video');
      this._preview_video     = $('#preview_video');
      this._preview_image     = $('#preview_image');

      //Info Page
      this._form_upload_image  = $('#form_upload_image');
      this._lesson_name        = $('#lesson_name');
      this._lesson_sub_name    = $('#lesson_sub_name');
      this._lesson_description = $('#lesson_description');
      this._image_upload       = $('#image_upload');
      this._image_url          = $('#image_url');

      //Goal Page
      this._num_condition_all = $('#num_condition');
      this._num_suit_all      = $('#num_suit');
      this._num_learn_all     = $('#num_learn');
      this._condition_num     = parseInt(this._num_condition_all.val()) + 1;
      this._suit_num          = parseInt(this._num_suit_all.val()) + 1;
      this._learn_num         = parseInt(this._num_learn_all.val()) + 1;

      //Detail Page
      this._form_lesson_fundraising_day = $('#form_lesson_fundraising_day');
      this._form_lesson_start_day       = $('#form_lesson_start_day');
      this._form_lesson_offer_fee       = $('#form_lesson_offer_fee');
      this._form_lesson_origin_fee      = $('#form_lesson_origin_fee');
      this._form_lesson_least_people    = $('#form_lesson_least_people');
      this._form_lesson_max_people      = $('#form_lesson_max_people');
      this._lesson_fundraising_day      = $('#lesson_fundraising_day');
      this._lesson_start_day            = $('#lesson_start_day');
      this._lesson_offer_fee            = $('#lesson_offer_fee');
      this._lesson_origin_fee           = $('#lesson_origin_fee');
      this._lesson_least_people         = $('#lesson_least_people');
      this._lesson_max_people           = $('#lesson_max_people');
      this._area_select                 = $('#area_select');
      this._lesson_location             = $('#lesson_location');
      this._lesson_location_note        = $('#lesson_location_note');
      this._lesson_tag                  = $('#lesson_tag');
      this._unit_num                    = parseInt($('#lesson_unit_num').val());
      this._deadline                    = $('#deadline');
      this._topic                       = $('#topic');
      this._category                    = $('#category');
      this._teacher_fee                 = $('#teacher_fee');
      this._teacher_salary              = $('#teacher_salary');
      this._teacher_commission          = $('#teacher_commission');
      this._form_teacher_fee            = $('#form_teacher_fee');

      //Media Page
      this._form_upload_media = $('#form_upload_media');
      this._media_process_bar = $('#media_process_bar');
      this._cover_process_bar = $('#cover_process_bar');
      this._lesson_is_free    = $('#lesson_is_free');
      this._toggle_unit       = $('#toggle_unit');
      this._is_edited         = false;
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initial_step();
      objThis._initial_description();
      objThis._initial_chapter_num();
      objThis._initial_origin_data();
      objThis._initialAll();
      objThis._initial_category_data();
      objThis._initial_area_select();
      objThis._initial_deadline();
    },
    _initialAll: function()
    {

      this.create_lesson_name = function(){
        $.confirm
        ({
            icon: 'fa fa-warning fa-spin',
            theme: 'Material',
            title: '請輸入課程名稱',
            content:
            '<div>' +
              '<input type="text" class="form-control lesson_name" >' +
              '<select class=" form-control" id="lesson_type" style="margin-top:15px;">' +
                '<option></option>' +
                '<option>線上教學</option>' +
                '<option>實體課程</option>' +
              '</select>' +
            '</div>' +
            '<script>' +
            '$( "#lesson_type" ).change(function()' +
            '{' +
              'if (($("#lesson_type").val() != "") && ($(".lesson_name").val() != ""))' +
              '{' +
                '$(".send").removeAttr("disabled", "disabled")' +
              '}' +
              'else' +
              '{' +
                '$(".send").attr("disabled", "disabled")' +
              '}' +
            '});' +
            '$(".lesson_name").keyup(function(event)' +
            '{' +
              'if (($("#lesson_type").val() != "") && ($(".lesson_name").val() != ""))' +
              '{' +
                '$(".send").removeAttr("disabled", "disabled")' +
              '}' +
              'else' +
              '{' +
                '$(".send").attr("disabled", "disabled")' +
              '}' +
            '})' +
            '</script>',
            onOpenBefore: function()
            {
              this.buttons.ok.disable();
              this.buttons.ok.addClass('send');
            },
            buttons:
            {
              cancel:
              {
                text: '取消',
                action: function(){}
              },
              ok:
              {
                text: '確定',
                btnClass: 'btn-green',
                action: function()
                {
                  this.buttons.ok.disable();
                  var lesson_name = this.$content.find('.lesson_name').val();
                  var lesson_type = this.$content.find('#lesson_type').val();
                  $.ajax
                  ({
                    url: '/ajax/create_lesson',
                    type: 'post',
                    dataType: 'json',
                    async: false,
                    data:
                    {
                      lesson_name: lesson_name,
                      lesson_type: lesson_type
                    },
                    headers:
                    {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success(data)
                    {
                      var post_data =
                      {
                        account: $('#login_account').val(),
                        lesson_id: data.id,
                        time: new Date().getTime()
                      }
                      firebaseController.createLesson(post_data).then(() =>
                      {
                        $.confirm
                        ({
                          title: '成功',
                          content: '創建完成，可以開始進行編輯！',
                          buttons:
                          {
                            '確定':
                            {
                              btnClass: 'btn-info',
                              action: function()
                              {
                                location.href = '/teacher/lesson/manage/' + data.id + '/info';
                              }
                            }
                          }
                        });
                      });
                    },
                    error()
                    {
                      $.alert("好像出了一點狀況", "錯誤");
                    }
                  })
                }
              },
            }
        })
      }

      if ((this._lesson_type.val() == 'entity') && (isNaN(Date.parse(this._lesson_start_time)) == true) && ($('#step').val() == 'step_4'))
      {
          $.confirm
          ({
              title: '錯誤',
              content: '請先輸入課程開始時間後方可進行章節創建',
              buttons:
              {
                  'ok':
                  {
                      text: '移動',
                      btnClass: 'btn-success',
                      action: function()
                      {
                          location.href = '/teacher/lesson/manage/' + create_lesson._lesson_id + '/detail'
                      }
                  }
              }
          })
      }

      //Go Create Lesson Page
      this._btn_create.on('click', $.proxy(function()
      {
        this.create_lesson_name();
      }, this));

      //Check Page Is Modify, If Has Modified, Will Show Notice Before Exit Page
      $(window).on('beforeunload', function()
      {
        //In The Info Page
        if (create_lesson._old_lesson_name != null)
        {
          new_description = quill.getContents();
          if ((create_lesson._old_lesson_name != create_lesson._lesson_name.val()) || (create_lesson._old_lesson_sub_name != create_lesson._lesson_sub_name.val()) || (create_lesson._old_lesson_description != new_description))
          {
            return 'are you sure?';
          }
        }

        //In The Detail Page
        if (create_lesson._lesson_fundraising_day != null)
        {
          if (create_lesson._old_lesson_fundraising_day != create_lesson._lesson_fundraising_day.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._old_lesson_start_day != create_lesson._lesson_start_day.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._old_lesson_offer_fee != create_lesson._lesson_offer_fee.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._old_lesson_origin_fee != create_lesson._lesson_origin_fee.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._old_lesson_least_people != create_lesson._lesson_least_people.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._old_lesson_max_people != create_lesson._lesson_max_people.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._old_lesson_location != create_lesson._lesson_location.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._old_lesson_location_note != create_lesson._lesson_location_note.val())
          {
            return 'are you sure?';
          }

          if (create_lesson._is_edited)
          {
            return 'are you sure?';
          }
        }

        //In The Unit Page
        if (create_lesson._unit_use == true) { return 'are you sure?'; }
      });

      //Create Goal List
      this._btn_add_condition.on('click', $.proxy(function()
      {
        this._condition_area.append(
          '<div id="condition_area_' + this._condition_num + '">' +
            '<p>' +
              '<div class="col-xs-9 col-sm-10">' +
                '<input type="text" class="form-control" id="lesson_condition_' + this._condition_num + '" data-id="no" placeholder="輸入該課程的上課條件">' +
              '</div>' +
              '<button class="btn btn-danger" id="btn_del_condition_' + this._condition_num + '" onclick="_del_condition(' + this._condition_num + ')"><i class="fa fa-trash-alt" aria-hidden="true"></i> 刪除</button>' +
            '</p>' +
          '</div>'
        );
        $('#lesson_condition_' + this._condition_num).focus();
        this._condition_num++;
      }, this));

      this._btn_add_suit.on('click', $.proxy(function()
      {
        this._suit_area.append(
          '<div id="suit_area_' + this._suit_num + '">' +
            '<p>' +
              '<div class="col-xs-9 col-sm-10">' +
                '<input type="text" class="form-control" id="lesson_suit_' + this._suit_num + '" data-id="no" placeholder="輸入適合這課程的學生">' +
              '</div>' +
              '<button class="btn btn-danger" id="btn_del_suit_' + this._suit_num + '" onclick="_del_suit(' + this._suit_num + ')"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除</button>' +
            '</p>' +
          '</div>'
        );
        $('#lesson_suit_' + this._suit_num).focus();
        this._suit_num++;
      }, this));

      this._btn_add_learn.on('click', $.proxy(function()
      {
        this._learn_area.append(
          '<div id="learn_area_' + this._learn_num + '">' +
            '<p>' +
              '<div class="col-xs-9 col-sm-10">' +
                '<input type="text" class="form-control" id="lesson_learn_' + this._learn_num + '" data-id="no" placeholder="輸入該課程的上課條件">' +
              '</div>' +
              '<button class="btn btn-danger" id="btn_del_learn_' + this._learn_num + '" onclick="_del_learn(' + this._learn_num + ')"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除</button>' +
            '</p>' +
          '</div>'
        );
        $('#lesson_learn_' + this._learn_num).focus();
        this._learn_num++;
      }, this));

      //Create Chapter List
      this._btn_add_unit.on('click', $.proxy(function()
      {
          this._unit_use = true;
          var lesson_type  = create_lesson._lesson_type.val();
          var column_class = lesson_type == 'entity' ? 'large' : 'small';
          var content      = lesson_type == 'entity'
          //Entity Table
          ? '<div class="col-md-12">' +
              '<div class="col-md-2"><span>名稱</span><span class="color-emphasized2">*</span></div>' +
              '<div class="col-md-10"><input type="text" class="form-control edit-func" id="unit_name" placeholder="輸入章節名稱" required></div>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<div class="col-md-2"><span>課程開始</span><span class="color-emphasized2">*</span></div>' +
              '<div class="col-md-5"><input class="form-control datepicker-here" id="unit_start_time" placeholder="選擇開始日期" readonly required></div>' +
              '<div class="col-md-5"><select id="sel_unit_start_time" class="form-control" name="" required><option>選擇開始時間</option></select></div>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<div class="col-md-2"><span>課程結束</span><span class="color-emphasized2">*</span></div>' +
              '<div class="col-md-5"><input class="form-control datepicker-here" id="unit_end_time" placeholder="選擇結束日期"  readonly required></div>' +
              '<div class="col-md-5"><select id="sel_unit_end_time" class="form-control" name="" required><option>選擇結束時間</option></select></div>' +
            '</div>' +
            '<div class="col-md-12 marginbot-20">' +
              '<div class="col-md-2"><span>課程描述</span></div>' +
              '<div class="col-md-10"><textarea class="form-control" id="unit_description" rows="15" placeholder="輸入課程描述"></textarea></div>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<div class="col-md-2"><span>備註</span></div>' +
              '<div class="col-md-10"><textarea class="form-control" id="unit_remark" placeholder="輸入注意事項或攜帶器材" maxlength="255"></textarea></div>' +
            '</div>'
          //Online Table
          : '<input type="text" class="form-control edit-func" id="unit_name" placeholder="輸入章節名稱" required>';

          $.confirm
          ({
              title:        '新增章節',
              columnClass:  column_class,
              content:      content,
              onOpenBefore: function()
              {
                this.buttons.send.disable();
                this.buttons.send.addClass('send');

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
                  '關閉': {},
                  send:
                  {
                      btnClass: 'btn-green',
                      text:     '送出',
                      action:   function()
                      {
                          var unit_name                                       = this.$content.find('#unit_name').val();
                          create_lesson._is_edited                            = true;
                          create_lesson._unit_num                             = create_lesson._unit_num + 1;
                          create_lesson._chapter_num[create_lesson._unit_num] = 0;
                          var unit_num                                        = create_lesson._unit_num;

                          if (lesson_type == 'entity')
                          {
                              var start_time      = this.$content.find('#unit_start_time').val() + 'T' + this.$content.find('#sel_unit_start_time').val();
                              var start_timestamp = Date.parse(start_time).valueOf();
                              var end_time        = this.$content.find('#unit_end_time').val() + 'T' + this.$content.find('#sel_unit_end_time').val();
                              var end_timestamp   = Date.parse(end_time).valueOf()
                              var today_timestamp = new Date().getTime();
                              var remark          = this.$content.find('#unit_remark').val();
                              var remark_br       = create_lesson._escape_html_no_br(remark).split(String.fromCharCode(10)).join('<br>');
                              var description     = this.$content.find('#unit_description').val();
                              var description_br  = create_lesson._escape_html_no_br(description).split(String.fromCharCode(10)).join('<br>');

                              if (isNaN(start_timestamp) || isNaN(end_timestamp))
                              {
                                  $.alert('時間範圍為 現在 ~ 2037年底', '錯誤');
                                  return false;
                              }
                              else if ((start_timestamp < today_timestamp) || (end_timestamp < today_timestamp))
                              {
                                  $.alert('時間範圍為 現在 ~ 2037年底', '錯誤');
                                  return false;
                              }
                              else if (end_timestamp < start_timestamp)
                              {
                                  $.alert('結束時間必須大於開始時間', '錯誤');
                                  return false;
                              }
                              else
                              {
                                  var time = start_time + ' ~ ' + end_time;
                                  $('#unit_area').append(
                                    '<li id="unit_' + unit_num + '" class="unit">' +
                                      '<input class="hidden" type="checkbox" id="input_unit_' + unit_num + '">' +
                                      '<label class="unit-name" id="label_unit_name_' + unit_num + '" for="input_unit_' + unit_num + '" data-id="no" data-unit_name="' + create_lesson._escape_html_no_br(unit_name) + '">章節：' + create_lesson._escape_html_no_br(unit_name) + '</label>' +
                                      '<div class="unit-btn-wrapper">' +
                                        '<button class="btn btn-danger btn-float" onclick="_del_unit(' + unit_num + ')"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除章節</button>' +
                                        '<button class="btn btn-success btn-float" onclick="_edit_unit_name(' + unit_num + ')"><i class="fa fa-edit"></i> 編輯章節</button>' +
                                      '</div>' +
                                      '<ul id="unit_area_' + unit_num + '" class="accordion-content">' +
                                        '<li class="chapter">' +
                                          '<div class="chapter-header row">' +
                                            '<div class="col-xs-12">' +
                                              '<span class="col-form-label lesson-time" id="label_unit_time_' + unit_num + '" data-unit_time="' + time + '">上課時間：' + time.replace(/T/g, ' ') + '</span>' +
                                            '</div>' +
                                            '<div class="col-xs-12">' +
                                              '<span class="remark-title">課程描述：</span>' +
                                              '<span class="col-form-label label-remark" rows=15 id="label_description_' + unit_num + '" data-unit_description="' + description +'">' + description_br + '</span>' +
                                            '</div>' +
                                            '<div class="col-xs-12">' +
                                              '<span class="remark-title">備註：</span>' +
                                              '<span class="col-form-label label-remark" id="label_unit_remark_' + unit_num + '" data-unit_remark="' + remark +'">' + remark_br + '</span>' +
                                            '</div>' +
                                          '</div>' +
                                        '</li>' +
                                      '</ul>' +
                                    '</li>'
                                  );
                                  $('#label_unit_name_' + unit_num).click();
                              }
                          }
                          else if (lesson_type == 'online')
                          {
                              $('#unit_area').append(
                                '<li id="unit_' + unit_num + '" class="unit">' +
                                  '<input class="hidden" type="checkbox" id="input_unit_' + unit_num + '">' +
                                  '<label class="unit-name" id="label_unit_name_' + unit_num + '" for="input_unit_' + unit_num + '" data-unit_name="' + create_lesson._escape_html_no_br(unit_name) + '">章節：' + create_lesson._escape_html_no_br(unit_name) + '</label>' +
                                  '<div class="unit-btn-wrapper">' +
                                    '<button class="btn btn-danger btn-float" onclick="_del_unit(' + unit_num + ')"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除章節</button>' +
                                    '<button class="btn btn-success btn-float" onclick="_edit_unit_name(' + unit_num + ')"><i class="fa fa-edit"></i> 編輯章節</button>' +
                                    '<button class="btn btn-warning btn-float" onclick="_add_chapter(' + unit_num + ')"><i class="fa fa-plus" aria-hidden="true"></i> 新增小節</button>' +
                                  '</div>' +
                                  '<div id="error_' + unit_num + '" class="lesson-error">此章節沒有小節內容，將不會被儲存，請新增小節或刪除章節</div>' +
                                  '<ul id="unit_area_' + unit_num + '" class="accordion-content">' +
                                  '</ul>' +
                                '</li>'
                              );
                              $('#label_unit_name_' + unit_num).click();
                          }
                          // 滾動到該項目
                          $('.content').scrollTop($('#unit_area').height());
                      }
                  },
              },
              onContentReady: function()
              {
                  var lesson_timestamp = 0;
                  var lesson_time      = $('.lesson-time');

                  //取得開課當天時間，並從這天00:30開始可以開放選擇章節時間
                  var start_time       = new Date(create_lesson._lesson_start_time.replace(/-/g, '/'));
                  var timestamp_now    = Date.parse(start_time) + 1;
                  lesson_timestamp     = timestamp_now - 1000 * 60 * 30;

                  var start_min_date = ceil_mintues(lesson_timestamp);
                  var unit_name      = $('#unit_name');
                  var start_time     = $('#unit_start_time');
                  var end_time       = $('#unit_end_time');
                  var sel_start_time = $('#sel_unit_start_time');
                  var sel_end_time   = $('#sel_unit_end_time');

                  unit_name.focus();

                  // 設定選擇時間的樣式 套件Air Datepicker
                  start_time.datepicker
                  ({
                      language: "zh",
                      position: "bottom left",
                      minDate:  new Date(start_min_date),
                      onSelect: function()
                      {
                          if (start_time.val() != '')
                          {
                              var s_min_date = new Date(start_min_date);

                              if (new Date(start_time.val()).getTime() == new Date(start_min_date).setHours(8, 0, 0, 0)) { set_select_time_by_value('sel_unit_start_time', (s_min_date.getHours() < 10 ? '0' + s_min_date.getHours() : s_min_date.getHours()) + ':' + s_min_date.getMinutes()); }
                              else { set_select_time_default('sel_unit_start_time'); }
                              start_time.data('datepicker').hide();

                              end_time.data('datepicker').update
                              ({
                                  language: "zh",
                                  position: "bottom right",
                                  minDate:  new Date(start_time.val()),
                                  onSelect: function()
                                  {
                                      if (end_time.val() != '')
                                      {
                                          if ((sel_start_time.val() != 'unknow') && (sel_start_time.val() != null))
                                          {
                                              var s_min_date_ex = new Date(start_min_date + 1000 * 60 * 30);

                                              if (end_time.val() != start_time.val()) { set_select_time_default('sel_unit_end_time'); }
                                              else { set_select_time_by_value('sel_unit_end_time', sel_start_time.val()); }
                                          }
                                          end_time.data('datepicker').hide();
                                      }
                                  }
                              });
                              end_time.data('datepicker').selectDate(new Date(start_time.val()));
                          }
                      }
                  });

                  end_time.datepicker
                  ({
                      language: "zh",
                      position: "bottom right",
                  });

                  unit_name.keyup(function(event)
                  {
                      if ((lesson_type == 'online') && (unit_name.val() == '')) { $('.send').attr('disabled', 'disabled'); }
                      else { check_input_form(); }
                  });

                  start_time.blur(function(event)
                  {
                      check_input_form();
                  });

                  end_time.blur(function(event)
                  {
                      check_input_form();
                  });

                  sel_start_time.change(function()
                  {
                      // 判斷是否同天
                      if (start_time.val() == end_time.val()) { set_select_time_by_value('sel_unit_end_time', sel_start_time.val()); }
                      else { set_select_time_default('sel_unit_end_time'); }
                      check_input_form();
                  });

                  sel_end_time.change(function()
                  {
                      check_input_form();
                  });

                  function ceil_mintues(timestamp)
                  {
                      // 無條件進位至下個30分鐘
                      const THIRTY_MIN = 1000 * 60 * 30;
                      return Math.ceil(timestamp / THIRTY_MIN) * THIRTY_MIN;
                  }

                  function check_input_form()
                  {
                      // 確認欄位資料
                      if ((unit_name.val() == '') || (start_time.val() == '') || (end_time.val() == '')) { $('.send').attr('disabled', 'disabled'); }
                      else if ((sel_start_time.val() == 'unknow') || (sel_end_time.val() == 'unknow')) { $('.send').attr('disabled', 'disabled'); }
                      else { $('.send').removeAttr('disabled', 'disabled'); }
                  }

                  function set_select_time_by_value(target, time_value)
                  {
                      // 設定時間選項 從(time_value + 30min)-23:30
                      var items = '';

                      if ((time_value != null) && (time_value != 'unknow'))
                      {
                          var min_hours = parseInt(time_value.substr(0, 2));
                          var min_min   = parseInt(time_value.substr(3));

                          for (i = 0; i < 24; i++)
                          {
                              if (i < min_hours) { continue; }
                              else if ( i == min_hours && min_min == 30) { continue; }
                              else if ( i == min_hours && min_min == 0) { items += '<option>' + (i < 10 ? '0' + i : i) + ':30</option>'; }
                              else
                              {
                                  items += '<option>' + (i < 10 ? '0' + i : i) + ':00</option>';
                                  items += '<option>' + (i < 10 ? '0' + i : i) + ':30</option>';
                              }
                          }
                      }

                      if (items == '') { items = '<option value="unknow">沒有選項，請更改日期</option>'; }
                      $('#' + target).html('');
                      $('#' + target).append(items);
                  }

                  function set_select_time_default(target)
                  {
                      // 設定時間選項 從00:00-23:30
                      var items = '';

                      for (i = 0; i < 24; i++)
                      {
                          items += '<option>' + (i < 10 ? '0' + i : i) + ':00</option>';
                          items += '<option>' + (i < 10 ? '0' + i : i) + ':30</option>';
                      }
                      $('#' + target).html('');
                      $('#' + target).append(items);
                  }
              }
          });
      }, this));

      //Limit Offer Fee Number
      $('#lesson_offer_fee').keydown(function(event)
      {
        number_check = create_lesson._limit_math_symbol(event.keyCode);

        if (number_check === false) { event.preventDefault(); }
      });

      this._lesson_offer_fee.on('blur', $.proxy(function()
      {
        if ((parseInt(this._lesson_offer_fee.val()) > 1000000) || (parseInt(this._lesson_offer_fee.val()) < 0 ))
        {
          this._form_lesson_offer_fee.addClass('has-error');
        }
        else { this._form_lesson_offer_fee.removeClass('has-error'); }
      }, this));

      //Limit Origin Fee Number
      $('#lesson_origin_fee').keydown(function(event)
      {
        number_check = create_lesson._limit_math_symbol(event.keyCode);

        if (number_check === false) { event.preventDefault(); }
      });

      this._lesson_origin_fee.on('blur', $.proxy(function()
      {
        if ((parseInt(this._lesson_origin_fee.val()) > 1000000) || (parseInt(this._lesson_origin_fee.val()) < 0 ))
        {
          this._form_lesson_origin_fee.addClass('has-error');
        }
        else { this._form_lesson_origin_fee.removeClass('has-error'); }
      }, this));

      //Limit Least People Number
      $('#lesson_least_people').keydown(function(event)
      {
        number_check = create_lesson._limit_math_symbol(event.keyCode);

        if (number_check === false) { event.preventDefault(); }
      });

      this._lesson_least_people.on('blur', $.proxy(function()
      {
        if ((parseInt(this._lesson_least_people.val()) > 100) || (parseInt(this._lesson_least_people.val()) < 0 ))
        {
          this._form_lesson_least_people.addClass('has-error');
        }
        else { this._form_lesson_least_people.removeClass('has-error'); }
      }, this));

      //Limit Max People Number
      $('#lesson_max_people').keydown(function(event)
      {
        number_check = create_lesson._limit_math_symbol(event.keyCode);

        if (number_check === false) { event.preventDefault(); }
      });

      this._lesson_max_people.on('blur', $.proxy(function()
      {
        if ((parseInt(this._lesson_max_people.val()) > 100) || (parseInt(this._lesson_max_people.val()) < 0 ))
        {
          this._form_lesson_max_people.addClass('has-error');
        }
        else { this._form_lesson_max_people.removeClass('has-error'); }
      }, this));

      //Preview Store Page
      this._btn_preview.on('click', $.proxy(function()
      {
        window.open('preview', 'QQ')
      }, this));

      //Upload Image In Content
      $('#image_upload').change(function(event)
      {
        var fake_url = $('#image_upload').val();

        if (fake_url != '')
        {
          create_lesson._image_url.val('圖片上傳中...');
          var image = this.files[0];
          var size  = image.size;

          if (size > 10485760)
          {
            $('#btn_ava_modify').attr('disabled', 'disabled');
            create_lesson._image_url.val('');
            $.alert
            ({
              title: '錯誤!',
              content: '圖片大小不可超過10MB',
            });
          }
          else
          {
            var form = new FormData();
            var imgur_client_ID = '8390218445c1276';
            form.append('image', image);
            $.ajax
            ({
              async: true,
              crossDomain: true,
              url: 'https://api.imgur.com/3/image',
              method: 'post',
              headers:
              {
                'authorization': 'Client-ID ' + imgur_client_ID,
              },
              processData: false,
              contentType: false,
              mimeType: 'multipart/form-data',
              data: form,
              beforeSend: function()
              {
                $('#image_upload').attr('disabled', 'disabled');
              },
              xhr: function()
              {
                var xhr = new window.XMLHttpRequest();
                  // Upload progress
                  xhr.upload.addEventListener("progress", function(evt)
                  {
                      if (evt.lengthComputable)
                      {
                          var percent_complete = (evt.loaded / evt.total * 100).toFixed(2);
                          $('#image_url').val('上傳進度：' + percent_complete + '%');
                      }
                 }, false);
                 return xhr;
              },
            })
            .done(function(response)
            {
              $('#image_upload').removeAttr('disabled', 'disabled');
              var pms = JSON.parse(response);
              var url = pms['data']['link'];
              create_lesson._image_url.val(url);
              $('.ql-editor').append('<a href="' + url + '">' + url + '</a>');
            })
          }
        }
      })

      //Select Topic
      $('#topic').change(function(event)
      {
          topic = $('#topic').val();
          create_lesson._change_category(topic);
      })

      //Preview Media
      $('#media').change(function(event)
      {
        if ($('#media').val() != '')
        {
          var image            = ['jpg', 'jpeg', 'png', 'gif'];
          var extension        = $('#media').val().split('.');
          type                 = (image.indexOf(extension[extension.length - 1].toLowerCase()) != -1)
                               ? 'image'
                               : 'video';
          var media_name_split = $('#media').val().split('\\');
          var media_name       = media_name_split[2];
          create_lesson._media_process_bar.val(media_name);

          if (type == 'image')
          {
            $('#media_image').removeAttr('hidden', 'hidden');
            $('#media_video').attr('hidden', 'hidden');
            create_lesson._read_image_url(this, 'preview_image');
          }
          else if(type == 'video')
          {
            $('#media_image').attr('hidden', 'hidden');
            $('#media_video').removeAttr('hidden', 'hidden');
            var source    = $('#preview_video');
            source[0].src = URL.createObjectURL(this.files[0]);
            source.parent()[0].load();
          }
          $('.no-choose-media').hide();
        }
        else
        {
          $('#media_image').attr('hidden', 'hidden');
          $('#media_video').attr('hidden', 'hidden');
          create_lesson._media_process_bar.val('');
          $('.no-choose-media').show();
        }
      })

      //Preview Cover
      $('#cover').change(function(event)
      {
        if ($('#cover').val() != '')
        {
          var media_name_split = $('#cover').val().split('\\');
          var media_name       = media_name_split[2];
          create_lesson._cover_process_bar.val(media_name);
          create_lesson._read_image_url(this, 'preview_cover');
          $('.no-choose-cover').hide();
        }
        else
        {
          create_lesson._media_process_bar.val('');
          $('.no-choose-cover').show();
        }
      })

      //Save Info Page
      this._btn_info_save.on('click', $.proxy(function()
      {
        if (this._lesson_name.val() != '')
        {
          var path_url                 = document.location.pathname;
          var lesson_description       = quill.getContents();
          var lesson_description_array = new Array();
          var rows                     = lesson_description['ops'].length;

          for (var i = 0 ; i < rows ; i++)
          {
            if (i != rows - 1)
            {
              lesson_description_array[i]    = new Array(2);
              lesson_description_array[i][0] = String.fromCharCode(2) + lesson_description['ops'][i]['insert'] + String.fromCharCode(3);
              lesson_description_array[i][1] = !lesson_description['ops'][i]['attributes'] ? '' : lesson_description['ops'][i]['attributes'];
            }
            else
            {
              lesson_description_array[i]    = new Array(2);
              lesson_description_array[i][0] = String.fromCharCode(2) + lesson_description['ops'][i]['insert'];
              lesson_description_array[i][1] = !lesson_description['ops'][i]['attributes'] ? '' : lesson_description['ops'][i]['attributes'];
              last_string_length             = lesson_description_array[i][0].length;
              var not_new_line               = false;
              last_string_length_step        = last_string_length - 1;

              while (not_new_line == false)
              {
                if (lesson_description_array[i][0].substr(last_string_length_step, 1).charCodeAt() == 10) { last_string_length_step = last_string_length_step - 1; }
                else { not_new_line = true; }
              }
              lesson_description_array[i][0] = lesson_description_array[i][0].substr(0, last_string_length_step + 1);
              lesson_description_array[i][0] = lesson_description_array[i][0] + String.fromCharCode(3);
            }
          }
          $.ajax
          ({
            url:      path_url + '/save',
            type:     'post',
            dataType: 'json',
            data:
            {
              lesson_name:        this._lesson_name.val(),
              lesson_sub_name:    this._lesson_sub_name.val(),
              lesson_description: lesson_description_array
            },
            headers:
            {
              'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success(data)
            {
              if (data.success == 'ok')
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
                        location.reload(true);
                      }
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
        else { $.alert('請輸入課程標題', '錯誤'); }
      }, this));

      //Save Goal Page
      this._btn_goal_save.on('click', $.proxy(function()
      {
        var path_url           = document.location.pathname;
        var condition_array    = new Array();
        var condition_id       = new Array();
        var suit_array         = new Array();
        var suit_id            = new Array();
        var learn_array        = new Array();
        var learn_id           = new Array();
        var real_condition_num = 0;
        var real_suit_num      = 0;
        var real_learn_num     = 0;

        for (var i = 1 ; i < this._condition_num ; i++)
        {
            if ($('#lesson_condition_' + i).length > 0)
            {
                real_condition_num                  = real_condition_num + 1;
                condition_array[real_condition_num] = $('#lesson_condition_' + i).val();
                condition_id[real_condition_num]    = $('#lesson_condition_' + i).data('id');
            }
        }

        for (var i = 1 ; i < this._suit_num ; i++)
        {
            if ($('#lesson_suit_' + i).length > 0)
            {
                real_suit_num             = real_suit_num + 1;
                suit_array[real_suit_num] = $('#lesson_suit_' + i).val();
                suit_id[real_suit_num]    = $('#lesson_suit_' + i).data('id');
            }
        }

        for (var i = 1 ; i < this._learn_num ; i++)
        {
            if ($('#lesson_learn_' + i).length > 0)
            {
                real_learn_num              = real_learn_num + 1;
                learn_array[real_learn_num] = $('#lesson_learn_' + i).val();
                learn_id[real_learn_num]    = $('#lesson_learn_' + i).data('id');
            }
        }
        $.ajax
        ({
          url: path_url + '/save',
          type: 'post',
          dataType: 'json',
          data:
          {
            condition: condition_array,
            condition_id: condition_id,
            suit: suit_array,
            suit_id: suit_id,
            learn: learn_array,
            learn_id: learn_id
          },
          headers:
          {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
          },
          success(data)
          {
            if (data.success == 'ok')
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
                      location.reload();
                    }
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
      }, this));

      //Save Detail Page
      this._btn_detail_save.on('click', $.proxy(function()
      {
        var path_url     = document.location.pathname;
        var offer_fee    = create_lesson._lesson_offer_fee.val();
        var origin_fee   = create_lesson._lesson_origin_fee.val();
        var least_people = create_lesson._lesson_least_people.val();
        var max_people   = create_lesson._lesson_max_people.val();

        if (parseInt(offer_fee) > parseInt(origin_fee)) { $.alert('優惠價須低於原價', '錯誤'); }
        else if (_check_Number(offer_fee) || _check_Number_in_reage(0, 1000000, offer_fee)) { $.alert('募資時期價格', '錯誤'); }
        else if (_check_Number(origin_fee) || _check_Number_in_reage(0, 1000000, origin_fee)) { $.alert('原價', '錯誤'); }
        else if (_check_Number(least_people) || _check_Number_in_reage(0, 100, least_people)) { $.alert('確定開課人數', '錯誤'); }
        else
        {
          create_lesson._check_area_is_county(true);

          $.ajax
          ({
            url: path_url + '/save',
            type: 'post',
            dataType: 'json',
            data:
            {
                category: create_lesson._category.val(),
                fundraising_day: create_lesson._lesson_fundraising_day.val(),
                deadline: create_lesson._deadline.val(),
                lesson_location: create_lesson._lesson_location.val(),
                lesson_location_note: create_lesson._lesson_location_note.val(),
                least_people: create_lesson._lesson_least_people.val(),
                max_people: create_lesson._lesson_max_people.val(),
                offer_fee: create_lesson._lesson_offer_fee.val(),
                origin_fee: create_lesson._lesson_origin_fee.val(),
                start_day: create_lesson._lesson_start_day.val(),
                topic: create_lesson._topic.val()
            },
            headers:
            {
              'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success(data)
            {
              if (data.success == 'ok')
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
                        location.reload();
                      }
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
      }, this));

      //Save Chapter Page
      this._btn_chapter_save.on('click', $.proxy(function()
      {
          if ($('.lesson-time-error').length != 0)
          {
              $.alert('請再次確認課程時間', '無法存檔');
              return false;
          }
          else if ($('.lesson-error').length != 0)
          {
              $.alert('請再次確認章節內容', '無法存檔');
              return false;
          }

          var path_url       = document.location.pathname;
          var unit_array     = new Array();
          var unit_id        = new Array();
          var unit_new_id    = new Array();
          var unit_pos       = new Array();
          var lesson_type    = create_lesson._lesson_type.val();
          var new_unit_id    = 0;
          var new_chapter_id = 0;

          if (lesson_type == 'online')
          {
              for (var i = 1; i <= this._unit_num; i++)
              {
                  if ($('#unit_area_' + i).length > 0)
                  {
                      unit_array[i]  = new Array();
                      new_unit_id    = new_unit_id + 1;
                      new_chapter_id = 0;

                      for (var j = 1; j <= this._chapter_num[i]; j++)
                      {
                          if ($('#label_chapter_name_' + i + '_' + j).length > 0)
                          {
                              new_chapter_id      = new_chapter_id + 1
                              unit_array[i][j]    = new Array();
                              unit_array[i][j][0] = $('#label_unit_name_' + i).data('unit_name').toString();
                              unit_array[i][j][1] = $('#label_chapter_name_' + i + '_' + j).data('chapter_name').toString();
                              unit_array[i][j][2] = $('#label_chapter_remark_' + i + '_' + j).data('chapter_remark').toString().split('<br />').join('');
                              unit_array[i][j][3] = $('#label_chapter_video_public_' + i + '_' + j).length > 0
                                                  ? !!+$('#label_chapter_video_public_' + i + '_' + j).data('chapter_video_public')
                                                  : '';
                              var old_id = $('#label_chapter_name_' + i + '_' + j).data('id') != 'no'
                                         ? $('#label_chapter_name_' + i + '_' + j).data('id')
                                         : null;
                              unit_id.push(old_id);
                              unit_new_id.push(new_unit_id + ',' + new_chapter_id);
                              unit_pos.push(i + ',' + j);
                          }
                      }
                  }
              }
          }
          else if (lesson_type == 'entity')
          {
              for (var i = 1; i <= this._unit_num; i++)
              {
                  if ($('#unit_' + i).length > 0)
                  {
                      unit_array[i]    = new Array();
                      new_unit_id      = new_unit_id + 1;
                      unit_array[i][0] = $('#label_unit_name_' + i).data('unit_name').toString();
                      unit_array[i][1] = $('#label_unit_time_' + i).data('unit_time');
                      unit_array[i][2] = $('#label_unit_remark_' + i).data('unit_remark').toString().split('<br />').join('');
                      unit_array[i][3] = $('#label_description_' + i).data('unit_description').toString().split('<br />').join('');
                  }
              }
          }

          if (unit_array.length > 0)
          {
              if (lesson_type == 'entity')
              {
                  $.ajax
                  ({
                      type: 'POST',
                      url: path_url + '/save',
                      dataType: 'json',
                      async: false,
                      data:
                      {
                          unit: unit_array,
                      },
                      headers:
                      {
                          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                      },
                      success(data)
                      {
                          if (data.success == 'ok')
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
                                              location.reload();
                                          }
                                      }
                                  }
                              })
                          }
                          else
                          {
                              if (data.success == 'GG') { $.alert('該圖片或影片無法上傳', '錯誤'); }
                              else { $.alert(data.success, '錯誤'); }
                          }
                      }
                  })
              }
              else if (lesson_type == 'online')
              {
                  var lesson_video_content = '<div style="line-height: 2em; padding: 10px; max-height: 60vh;">';

                  for (var i = 0; i < unit_new_id.length; i++)
                  {
                      var new_id_split   = unit_new_id[i].split(',');
                      var new_unit_id    = new_id_split[0];
                      var new_chapter_id = new_id_split[1];
                      var pos_split      = unit_pos[i].split(',');
                      var pos_unit_id    = pos_split[0];
                      var pos_chapter_id = pos_split[1];
                      var media_filename = ($('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val() != '') && ($('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val() != undefined)
                                         ? $('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val()
                                         : '未選擇影片';

                      if (media_filename != '未選擇影片')
                      {
                          content              = '<span>' + new_unit_id + '-' + new_chapter_id + '. ' + media_filename + '</span><br>' +
                                                  '<div class="upload__progress">' +
                                                      '<div id="process_text_' + new_unit_id + '_' + new_chapter_id + '" class="upload__progress__text">0%</div>' +
                                                      '<div id="process_' + new_unit_id + '_' + new_chapter_id + '" class="upload__progress__bar color-emphasized2"></div>' +
                                                  '</div>';
                          lesson_video_content = lesson_video_content + content;
                      }
                  }

                  lesson_video_content = lesson_video_content + '<span id="total_process" class="color-emphasized2"></span></div>';
                  $.confirm
                  ({
                      title: '上傳',
                      columnClass: 'large',
                      content: lesson_video_content,
                      onOpenBefore: function()
                      {
                          this.buttons.exit.addClass('exit');
                          this.buttons.check.addClass('check');
                      },
                      buttons:
                      {
                          check:
                          {
                              text: '上傳',
                              btnClass: 'btn-success',
                              action: function()
                              {
                                  $.ajax
                                  ({
                                      type: 'POST',
                                      url: path_url + '/save',
                                      dataType: 'json',
                                      async: false,
                                      data:
                                      {
                                          unit: unit_array,
                                          unit_id: unit_id,
                                          unit_new_id: unit_new_id,
                                          unit_pos: unit_pos
                                      },
                                      headers:
                                      {
                                          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                      },
                                      success(data)
                                      {
                                          if (data.success == 'ok') { success = 'ok'; }
                                          else
                                          {
                                              success = 'nok';
                                          }
                                      }
                                  })

                                  if (success == 'ok')
                                  {
                                      uploaded_video_num = 0;
                                      const startUpload = async () =>
                                      {
                                          await asyncForEach(unit_new_id, async (value, key) =>
                                          {
                                              let new_id_split,
                                                  new_unit_id,
                                                  new_chapter_id,
                                                  pos_split,
                                                  pos_unit_id,
                                                  pos_chapter_id,
                                                  filename,
                                                  image_base64,
                                                  media_filename;

                                              new_id_split       = unit_new_id[key].split(',');
                                              new_unit_id        = new_id_split[0];
                                              new_chapter_id     = new_id_split[1];
                                              pos_split          = unit_pos[key].split(',');
                                              pos_unit_id        = pos_split[0];
                                              pos_chapter_id     = pos_split[1];
                                              filename           = $('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val() != ''
                                                                 ? $('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val()
                                                                 : '';
                                              image_base64       = '';
                                              media_filename     = ($('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val() != '') && ($('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val() != undefined)
                                                                 ? $('#media_filename_' + pos_unit_id + '_' + pos_chapter_id).val()
                                                                 : '未選擇影片';

                                              if (media_filename !== '未選擇影片')
                                              {
                                                  //Make Video Thumbnail
                                                  let thumbnail_canvas    = document.querySelector('#video_canvas_' + pos_unit_id + '_' + pos_chapter_id),
                                                      thumbnail_ctx       = thumbnail_canvas.getContext("2d"),
                                                      thumbnail_video     = document.querySelector("#video_" + pos_unit_id + '_' + pos_chapter_id);
                                                  thumbnail_canvas.width  = 240;
                                                  thumbnail_canvas.height = 135;
                                                  thumbnail_ctx.drawImage(thumbnail_video, 0, 0, thumbnail_video.videoWidth, thumbnail_video.videoHeight, 0, 0, 240, 135);
                                                  image_base64 = thumbnail_canvas.toDataURL().slice(22);
                                              }

                                              updata_info =
                                              {
                                                  path_url: path_url,
                                                  uploaded_video_num: uploaded_video_num,
                                                  unit_new_id: unit_new_id,
                                                  pos_unit_id: pos_unit_id,
                                                  pos_chapter_id: pos_chapter_id,
                                                  new_unit_id: new_unit_id,
                                                  new_chapter_id: new_chapter_id,
                                                  filename: filename,
                                                  image_base64: image_base64
                                              }

                                              uploaded_video_num = await create_lesson._form_upload_video_moudle(updata_info);
                                          });
                                          $('.exit').removeAttr('disabled', 'disabled');
                                          $('#total_process').html('上傳完畢');
                                      }

                                      async function asyncForEach(array, callback)
                                      {
                                          for (let index = 0; index < array.length; index++)
                                          {
                                              await callback(array[index], index);
                                          }
                                      }

                                      startUpload();
                                      return false;
                                  }
                              }
                          },
                          exit:
                          {
                              text: '關閉',
                              btnClass: 'btn-red',
                              action: function()
                              {
                                  if (typeof($(".check").attr("disabled"))!="undefined")
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
                                                      location.reload();
                                                  }
                                              }
                                          }
                                      })
                                  }
                              }
                          }
                      },
                      onContentReady: function()
                      {
                          if ($(lesson_video_content)[0].children.length == 1) { $('#total_process')[0].parentElement.outerHTML = '<span>未選擇任何影片</span></br>' + $('#total_process')[0].parentElement.outerHTML; }
                      }
                  })
              }
          }
          else
          {
              $.ajax
              ({
                  type: 'POST',
                  url: path_url + '/save',
                  dataType: 'json',
                  async: false,
                  data:
                  {
                      del_all: true
                  },
                  headers:
                  {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  },
                  success(data)
                  {
                      if (data.success == 'ok')
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
                                          location.reload();
                                      }
                                  }
                              }
                          })
                      }
                      else if (data.success == 'fail')
                      {
                          $.confirm
                          ({
                              title: '失敗',
                              content: '已發布的課程請至少保留一章節',
                              buttons:
                              {
                                  'ok':
                                  {
                                      btnClass: 'btn-info'
                                  }
                              }
                          })
                      }
                  }
              })
          }
      }, this));

      //Save Media preview_image
      this._btn_media_save.on('click', $.proxy(function()
      {
        var path_url = document.location.pathname;
        var media_filename = this._media_process_bar.val();
        var cover_filename = this._cover_process_bar.val()
        $.ajax
        ({
          url: path_url + '/save',
          type: 'POST',
          cache: false,
          data: new FormData($('#form_upload_media')[0]),
          processData: false,
          contentType: false,
          headers:
          {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
          },
          beforeSend: function()
          {
            $('#media').attr('disabled', 'disabled');
            $('#cover').attr('disabled', 'disabled');
            $('#btn_media_save').attr('disabled', 'disabled');
          },
          xhr: function()
          {
            var xhr = new window.XMLHttpRequest();
              // Upload progress
              xhr.upload.addEventListener("progress", function(evt)
              {
                  if (evt.lengthComputable && ((media_filename != '') || (cover_filename != '')))
                  {
                      var percent_complete = (evt.loaded / evt.total * 100).toFixed(2);
                      var bar_width = Math.floor(percent_complete) + '%';
                      $('#progress').removeClass('hidden');
                      $('#progress_bar').css('width', bar_width);
                      $('#progress_bar').find('span').html(' 上傳進度：' + bar_width);
                  }
             }, false);
             return xhr;
          },
          success(data)
          {
            if (data.success == 'ok')
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
                      location.reload();
                    }
                  }
                }
              })
            }
            else if(data.success == 'GG') { $.alert('上傳的圖片或影片有問題，請換檔案後再試一次', '錯誤'); }
            else if(data.success == 'no')
            {
              $('#media').removeAttr('disabled', 'disabled');
              $('#cover').removeAttr('disabled', 'disabled');
              $('#btn_media_save').removeAttr('disabled', 'disabled');
              $.alert('沒有上傳任何檔案', '訊息');
            }
          }
        })
      }, this));

      //Submit Lesson To Audit
      this._btn_submit.on('click', $.proxy(function()
      {
          $.confirm
          ({
              title: '確認',
              content: '確定要送出審核嗎？送出後如需要再修改請至導師課程進行取消送審喔！',
              onOpenBefore: function()
              {
                  this.buttons.send.addClass('send');
                  this.buttons.no.addClass('no');
              },
              buttons:
              {
                  'no':
                  {
                      text: '取消',
                      action: function() {}
                  },
                  'send':
                  {
                      text: '送出審核',
                      btnClass: 'btn-success',
                      action: function()
                      {
                          var path_url       = document.location.pathname;
                          var path_url_split = path_url.split('/');
                          path_url_split.pop();
                          path_url           = path_url_split.join('/');
                          var reg_code       = btoa(create_lesson._account + create_lesson._lesson_id);
                          $.ajax
                          ({
                              url: path_url + '/submit',
                              type: 'post',
                              data:
                              {
                                  'reg_code': reg_code
                              },
                              headers:
                              {
                                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                              },
                              success(data)
                              {
                                  if (data.message == 'finish')
                                  {
                                      firebaseController.lessonApplyAudit(create_lesson._account, create_lesson._lesson_id).then(() =>
                                      {
                                        $.confirm
                                        ({
                                            title: '完成',
                                            content: '送出完畢',
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
                                      });
                                  }
                                  else
                                  {
                                      $.confirm
                                      ({
                                          title: '錯誤',
                                          content: data.message,
                                          buttons:
                                          {
                                              'ok':
                                              {
                                                  btnClass: 'btn-info',
                                                  action: function()
                                                  {
                                                      $(window).unbind('beforeunload');
                                                      location.href = data.url;
                                                  }
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
              }
          })
      }, this));

      //Toggle All Unit
      this._toggle_unit.on('click', $.proxy(function()
      {
        //Show All
        if (this._toggle_unit.prop('checked'))
        {
          var input = $('.accordion input[type=checkbox]');

          for (i = 0; i < input.length; i++)
          {
            if (!input[i].checked) { $(input[i]).click(); }
          }
        }
        //Hide All
        else
        {
          var input = $('.accordion input[type=checkbox]');

          for (i = 0; i < input.length; i++)
          {
            if (input[i].checked) { $(input[i]).click(); }
          }
        }
      }, this));

      //Copy Same Lesson To Edit
      this._btn_copy.on('click', $.proxy(function()
      {
        $.confirm
        ({
          title: '複製課程',
          content: '你確定要複製一份新的課程嗎？',
          onOpenBefore: function()
          {
            this.buttons.send.addClass('send');
            this.buttons.no.addClass('no');
          },
          buttons:
          {
            'no':
            {
              text: '取消',
              action: function() {}
            },
            'send':
            {
              text: '確定複製',
              btnClass: 'btn-blue',
              action: function()
              {
                $('.send').attr('disabled', 'disabled');
                $('.no').attr('disabled', 'disabled');
                $.ajax
                ({
                  url: '/ajax/get_all_pub_teacher_data',
                  type: 'post',
                  dataType: 'json',
                  headers:
                  {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  },
                  success(data)
                  {
                    if (data.status == 'ok')
                    {
                      select_header  = '<select id="select_teacher" class="form-control">';
                      select_end     = '</select>';
                      select_content = '';
                      $.each(data.teacher_data, function(index, value)
                      {
                          select_content = select_content + '<option value="' + value['t_id'] + '">講師編號：' + value['t_id'] + ', 本名：' + value['member_data']['nickname'] + '</option>'
                      });
                      $.confirm
                      ({
                        title: '請選擇要開課的講師',
                        content:select_header + select_content + select_end,
                        onOpenBefore: function()
                        {
                          this.buttons.send.addClass('send');
                          this.buttons.no.addClass('no');
                        },
                        buttons:
                        {
                          'no':
                          {
                            text: '取消',
                            action: function() {}
                          },
                          'send':
                          {
                            text: '確定',
                            btnClass: 'btn-green',
                            action: function()
                            {
                              $('.send').attr('disabled', 'disabled');
                              $('.no').attr('disabled', 'disabled');
                              t_id = $('#select_teacher').val();
                              $.ajax
                              ({
                                url: '/ajax/copy_lesson',
                                type: 'post',
                                dataType: 'json',
                                data:
                                {
                                  l_id: create_lesson._lesson_id,
                                  t_id: t_id
                                },
                                headers:
                                {
                                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                },
                                success(data)
                                {
                                  if (data.status == 'ok')
                                  {
                                    var post_data =
                                    {
                                      account: data.account,
                                      lesson_id: data.new_id,
                                      time: (new Date()).getTime()
                                    }
                                    firebaseController.createLesson(post_data).then(() =>
                                    {
                                      $.confirm
                                      ({
                                        title: '成功',
                                        content: '複製完成，即將跳轉到新課程頁面',
                                        buttons:
                                        {
                                          '確定':
                                          {
                                            btnClass: 'btn-red',
                                            action: function()
                                            {
                                              $(window).unbind('beforeunload');
                                              location.href = '/teacher/lesson/manage/' + data.new_id + '/info';
                                            }
                                          }
                                        }
                                      })
                                    })
                                  }
                                },
                                error()
                                {
                                  $.alert("好像出了一點狀況", "錯誤");
                                }
                              })
                            }
                          },
                        }
                      })
                    }
                  },
                  error()
                  {
                    $.alert("好像出了一點狀況", "錯誤");
                  }
                })
              }
            }
          }
        })
      }))

      //Copy Same Lesson To Edit For Teacher
      this._btn_own_copy.on('click', $.proxy(function()
      {
          $.confirm
          ({
              title: '複製課程',
              content: '你確定要複製一份新的課程嗎？',
              onOpenBefore: function()
              {
                  this.buttons.send.addClass('send');
                  this.buttons.no.addClass('no');
              },
              buttons:
              {
                  'no':
                  {
                      text: '取消',
                      action: function() {}
                  },
                  'send':
                  {
                      text: '確定複製',
                      btnClass: 'btn-blue',
                      action: function()
                      {
                          $('.send').attr('disabled', 'disabled');
                          $('.no').attr('disabled', 'disabled');
                          $.ajax
                          ({
                              url: '/ajax/copy_lesson',
                              type: 'post',
                              dataType: 'json',
                              data:
                              {
                                  l_id: create_lesson._lesson_id,
                                  t_id: $('#teacher_id').val()
                              },
                              headers:
                              {
                                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                              },
                              success(data)
                              {
                                  if (data.status == 'ok')
                                  {
                                      var post_data =
                                      {
                                          account: data.account,
                                          lesson_id: data.new_id,
                                          time: (new Date()).getTime()
                                      }
                                      firebaseController.createLesson(post_data).then(() =>
                                      {
                                        $.confirm
                                        ({
                                            title: '成功',
                                            content: '複製完成，即將跳轉到新課程頁面',
                                            buttons:
                                            {
                                                '確定':
                                                {
                                                    btnClass: 'btn-red',
                                                    action: function()
                                                    {
                                                        var post_data =
                                                        {
                                                            account: data.account,
                                                            lesson_id: data.new_id,
                                                            time: new Date().getTime()
                                                        }
                                                        $(window).unbind('beforeunload');
                                                        location.href = '/teacher/lesson/manage/' + data.new_id + '/info';
                                                    }
                                                }
                                            }
                                        })
                                      });
                                  }
                              },
                              error()
                              {
                                  $.alert("好像出了一點狀況", "錯誤");
                              }
                          })
                      }
                  }
              }
          })
      }, this))

      // 開啟排序畫面
      var is_change = false;
      this._btn_unit_sortable.on('click', $.proxy(function()
      {
          this._unit_use = true;
          var sort_text = $('#sort_text');
          // 預防資料流失
          if (this._is_edited)
          {
              $.alert('排序前請先存檔', '錯誤');
              return false;
          }

           if (sort_text.text() == '排序')
          {
              var old_unit = $('.unit');
              // 排序畫面 不能新增、編輯、上傳、存檔
              old_unit.filter(function(i, n)
              {
                  $(n).find('.unit-name').prepend('<i class="fas fa-arrows-alt sort-icon" aria-hidden="true"></i>');
                  $(n).find('.btn').attr('disabled', 'disabled');
                  $(n).find('.chapter input').attr('disabled', 'disabled');
              });
              // 讓章節可以拖曳排序 JQuery ui
              $('#unit_area').sortable
              ({
                  revert:   true,
                  handle:   'i.fa-arrows-alt',
                  disabled: false,
                  stop: function(event, ui)
                  {
                      // 重新編排章節ID
                      var new_unit = $('.unit');
                      new_unit.map(function(i, n)
                      {
                          if (old_unit[i].id != n.id)
                          {
                              var id_num    = n.id.substr(5);
                              var reg_id    = RegExp('([a-z]+_)' + id_num, 'g');
                              var reg_click = RegExp( '([(])' + id_num , 'g');
                              var outerHTML = n.outerHTML;
                              outerHTML     = outerHTML.replace(reg_id, '$1' + (i + 1))
                                                       .replace(reg_click, '$1' + (i + 1));
                              n.outerHTML   = outerHTML;
                              is_change     = true;
                          }
                      });
                      create_lesson._reset_unit_chapter_array();

                      if (create_lesson._lesson_type.val() == 'entity') { create_lesson._check_entity_lesson_time(); }
                  }
              });
              sort_text.text('確定');
              this._btn_unit_sortable.toggleClass('btn-info btn-success');
          }
          else
          {
              var unit_items = $('.unit');
              // 回到章節編輯功能
              unit_items.filter(function(i, n)
              {
                  $(n).find('.sort-icon').remove();
                  $(n).find('.btn[disabled]').removeAttr('disabled', 'disabled');
                  $(n).find('.chapter input[disabled]').removeAttr('disabled', 'disabled');
              });
              // 關閉拖曳排序功能
              $('#unit_area').sortable({ disabled: true });
              sort_text.text('排序');
              this._btn_unit_sortable.toggleClass('btn-info btn-success');

              if (is_change)
              {
                  create_lesson._is_edited = true;
                  $.alert('排序完成，請記得按儲存鍵', '完成');
              }
          }
      }, this));

      //Check All Checkbox Is Checked
      $('.accordion input[type=checkbox]').on('click', $.proxy(function()
      {
        var input_check = $('.accordion input[type=checkbox]:checked');
        var input       = $('.accordion input[type=checkbox]');

        //Checkbox All Check
        if ((input_check.length == input.length) && (!this._toggle_unit.prop('checked'))) { this._toggle_unit.prop('checked', true); }
        //Checkbox All Cancel
        if ((input_check.length == 0) && (this._toggle_unit.prop('checked'))) { this._toggle_unit.prop('checked', false); }
      }, this));

      this._lesson_is_free.on('change', $.proxy(function()
      {
        var old_lesson_offer_fee    = this._lesson_offer_fee[0].defaultValue;
        var old_lesson_origin_fee   = this._lesson_origin_fee[0].defaultValue;
        var old_lesson_least_people = this._lesson_least_people[0].defaultValue;

        if (this._lesson_type.val() == 'entity')
        {
            var old_lesson_max_people   = this._lesson_max_people[0].defaultValue;
        }

        if (this._lesson_is_free.prop('checked'))
        {
            this._lesson_offer_fee.val(0).attr('disabled', '');
            this._lesson_origin_fee.val(0).attr('disabled', '');
        }
        else
        {
            this._lesson_offer_fee.val(old_lesson_offer_fee).removeAttr('disabled');
            this._lesson_origin_fee.val(old_lesson_origin_fee).removeAttr('disabled');
        }
      }, this));

      this._area_select.on('change', $.proxy(function()
      {
          create_lesson._check_area_is_county(true);
      }, this));

      this._teacher_salary.on('change', $.proxy(function()
      {
          $('.text-unit').css('opacity', '1');
          $('.text-percentage').css('opacity', '0');
          this._teacher_fee.val('').removeAttr('disabled').attr({'placeholder': '請輸入金額'});
          this._form_teacher_fee.removeClass('has-error');
      }, this));

      this._teacher_commission.on('change', $.proxy(function()
      {
          $('.text-percentage').css('opacity', '1');
          $('.text-unit').css('opacity', '0');
          this._teacher_fee.val('').removeAttr('disabled').attr({'placeholder': '請輸入百分比', 'max': 100});
          this._form_teacher_fee.removeClass('has-error');
      }, this));

      this._teacher_fee.on('change', $.proxy(function()
      {
          if ($('[name=teacher-fee]:checked').val() == 'commission')
          {
              if (this._teacher_fee.val() > 100) { this._form_teacher_fee.addClass('has-error'); }
              else { this._form_teacher_fee.removeClass('has-error'); }
          }
      }, this));

      if (this._lesson_fundraising_day.length != 0)
      {
          var today          = new Date();
          var old_end_fund   = this._lesson_fundraising_day.data('end_fund');
          var old_start_time = this._lesson_start_day.data('start_time');

          this._lesson_fundraising_day.datepicker
          ({
              language:    "zh",
              position:    "bottom left",
              minDate:     today,
              maxDate:     new Date(today.getFullYear() + 2, today.getMonth(), today.getDate()),
              clearButton: true,
              onSelect:    function()
              {
                  var lesson_fundraising_day = $('#lesson_fundraising_day');
                  var lesson_start_day       = $('#lesson_start_day');

                  if (lesson_fundraising_day.val() != '')
                  {
                      lesson_fundraising_day.data('datepicker').hide();
                      var lesson_fundraising = new Date(lesson_fundraising_day.val());
                      lesson_start_day.data('datepicker').update
                      ({
                          language: "zh",
                          position: "bottom left",
                          minDate:  new Date(lesson_fundraising.getFullYear(), lesson_fundraising.getMonth(), lesson_fundraising.getDate() + 1),
                          maxDate:  new Date(lesson_fundraising.getFullYear() + 1, lesson_fundraising.getMonth(), lesson_fundraising.getDate() + 1),
                          onSelect: function()
                          {
                              if (lesson_start_day.val() != '') { lesson_start_day.data('datepicker').hide(); }
                          }
                      });
                  }
              }
          });

          this._lesson_start_day.datepicker
          ({
              language: "zh",
              position: "bottom left",
          });

          if (old_end_fund != '') { this._lesson_fundraising_day.data('datepicker').selectDate(new Date(old_end_fund)); }
          if (old_start_time != '') { this._lesson_start_day.data('datepicker').selectDate(new Date(old_start_time)); }
      }

      this._check_lesson_is_free_or_not();
      $('[data-toggle="tooltip"]').tooltip();
    },
    _change_category: function(topic)
    {
        this._category.empty();
        this._category.removeAttr('disabled', 'disabled');

        for (i = 0; i < this._topic_list.length; i++)
        {
            if (this._topic_list[i]['topic'] == topic)
            {
                this._category.append('<option value="" selected>請選擇類別</option>');
                for (j = 0; j < this._topic_list[i]['num']; j++)
                {
                    this._category.append('<option value=' + topic_list[i][j] + '> ' + topic_list[i][j] + '</option>');
                }

                this._category.append('<option value="其他">其他</option>')
                break;
            }
            else if (topic == '其他')
            {
                this._category.append('<option value="" selected>請選擇類別</option>');
                this._category.append('<option value="其他">其他</option>')
                break;
            }
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
    _initial_area_select: function()
    {
        var options   = '';
        var condition = '';
        var isCounty  = false;
        const areas   = this._get_all_county();

        if ($('#lesson_location').val() != undefined)
        {
            $.each(areas, function(index, value)
            {
                options += '<option>' + value + '</option>'
            });
            $('#area_select').append(options);

            condition = $('#lesson_location').val().slice(0, 2) == '其他' ? $('#lesson_location').val().slice(0, 2) : $('#lesson_location').val().slice(0, 3);

            if (this._check_area_is_county(false)) { condition == '連江縣' ? $('#area_select').val('連江縣(馬祖)') : $('#area_select').val(condition); }
        }
    },
    _initial_category_data: function()
    {
        var objThis = this;
        $.ajax
        ({
            url: '/ajax/get_topic_list',
            type: 'get',
            dataType: 'json',
            success(data)
            {
                topic_list          = data.topic_list;
                objThis._topic_list = topic_list;
                objThis._topic.append('<option value="" selected>請選擇主題</option>');

                for (i = 0; i < topic_list.length; i++)
                {
                    if ($('#old_topic').val() == topic_list[i]['topic'])
                    {
                        objThis._topic.append('<option value="' + topic_list[i]['topic'] + '" selected> ' + topic_list[i]['topic'] + '</option>');
                        objThis._category.removeAttr('disabled', 'disabled');
                        objThis._category.append('<option value="" selected>請選擇類別</option>');

                        for (j = 0; j < topic_list[i]['num']; j++)
                        {
                            if ($('#old_category').val() == topic_list[i][j])
                            {
                                objThis._category.append('<option value="' + topic_list[i][j] + '" selected> ' + topic_list[i][j] + '</option>');
                            }
                            else
                            {
                                objThis._category.append('<option value="' + topic_list[i][j] + '"> ' + topic_list[i][j] + '</option>');
                            }
                        }

                        if ($('#old_category').val() == '其他')
                        {
                            objThis._category.append('<option value="其他" selected>其他</option>')
                        }
                        else
                        {
                            objThis._category.append('<option value="其他">其他</option>')
                        }

                    }
                    else
                    {
                        objThis._topic.append('<option value="' + topic_list[i]['topic'] + '"> ' + topic_list[i]['topic'] + '</option>');
                    }
                }

                if ($('#old_topic').val() == '其他')
                {
                    objThis._topic.append('<option value="其他" selected>其他</option>')
                    objThis._category.append('<option value="">請選擇類別</option>');
                    objThis._category.append('<option value="其他" selected>其他</option>')
                }
                else
                {
                    objThis._topic.append('<option value="其他">其他</option>')
                }
            },
            error()
            {
                $.alert("好像出了一點狀況", "錯誤");
            }
        })
    },
    _initial_chapter_num: function()
    {
      if (this._lesson_type.val() == 'online')
      {
        for (var i = 1; i <= this._unit_num; i++)
        {
          num                  = 1;
          this._chapter_num[i] = 0;

          while (this._chapter_num[i] == 0)
          {
            if ($('#chapter_' + i + '_' + num).length == 0)
            {
              this._chapter_num[i] = num - 1;
              break;
            }
            num = num + 1;
          }
        }
      }
    },
    _initial_deadline: function()
    {
        let deadline = $('#deadline').data('deadline');

        for (i = 6; i <= 24; i = i + 6)
        {
            let insert_HTML;
                insert_HTML = $('<option>', { text: i + '個月', value: i });

            if (deadline === i) { insert_HTML.attr('selected', 'selected'); }

            insert_HTML.appendTo(this._deadline)
        }

        insert_HTML = $('<option>', { text: '永久', value: 999 });

        if (deadline === 999) { insert_HTML.attr('selected', 'selected'); }

        insert_HTML.appendTo(this._deadline)
    },
    _initial_step: function()
    {
      if ($('#step').length > 0)
      {
        step_num = $('#step').val();

        switch (step_num)
        {
          case 'step_1':
            $('#step_1').css(
            {
              'box-shadow': '3px 3px 10px -3px #262626',
              'background': '#5DAD48EE',
            });
            break;
          case 'step_2':
            $('#step_2').css(
            {
              'box-shadow': '3px 3px 10px -3px #262626',
              'background': '#5DAD48EE',
            });
            break;
          case 'step_3':
            $('#step_3').css(
            {
              'box-shadow': '3px 3px 10px -3px #262626',
              'background': '#5DAD48EE',
            });
            break;
          case 'step_4':
            $('#step_4').css(
            {
              'box-shadow': '3px 3px 10px -3px #262626',
              'background': '#5DAD48EE',
            });
            break;
          case 'step_5':
            $('#step_5').css(
            {
              'box-shadow': '3px 3px 10px -3px #262626',
              'background': '#5DAD48EE',
            });
            break;
        }
      }
    },
    _initial_description: function()
    {
      //Only Info Page
      var path_url       = document.location.pathname;
      var path_url_split = path_url.split('/');

      if ((path_url_split[5] == 'info') && (this._path.val() != ''))
      {
        var path = '/json/' + this._path.val();
        $.getJSON(path, function(content)
        {
            description = [];
            element     = new Array();

            for (var i = 0; i < content.length; i++)
            {
                element = [];

                if (content[i][1] == '') { element['insert'] = content[i][0].substr(1, content[i][0].length - 2); }
                else
                {
                    element['insert']     = content[i][0].substr(1, content[i][0].length - 2);
                    element['attributes'] = content[i][1];
                }
                description.push(element);
            }
            quill.setContents(description);
        });
      }
    },
    _initial_origin_data: function()
    {
      //Info Old Data
      this._old_lesson_name        = this._lesson_name.length > 0 ? this._lesson_name.val() : null;
      this._old_lesson_sub_name    = this._lesson_sub_name.length > 0 ? this._lesson_sub_name.val() : null;
      this._old_lesson_description = this._lesson_description.length > 0 ? quill.getContents() : null;
      //Detail Old Data
      this._old_lesson_fundraising_day = this._lesson_fundraising_day.length > 0 ? this._lesson_fundraising_day.val() : null;
      this._old_lesson_start_day       = this._lesson_start_day.length > 0 ? this._lesson_start_day.val() : null;
      this._old_lesson_offer_fee       = this._lesson_offer_fee.length > 0 ? this._lesson_offer_fee.val() : null;
      this._old_lesson_origin_fee      = this._lesson_origin_fee.length > 0 ? this._lesson_origin_fee.val() : null;
      this._old_lesson_least_people    = this._lesson_least_people.length > 0 ? this._lesson_least_people.val() : null;
      this._old_lesson_max_people      = this._lesson_max_people.length > 0 ? this._lesson_max_people.val() : null;
      this._old_lesson_location        = this._lesson_location.length > 0 ? this._lesson_location.val() : null;
      this._old_lesson_location_note   = this._lesson_location_note.length > 0 ? this._lesson_location_note.val() : null;
    },
    _limit_math_symbol: function(ascii)
    {
      math_symbel = new Array();
      math_symbel = [107, 109, 110, 190, 69, 187, 189, 190];  //69, 187, 189, 190  = e, +, -, . For Mac
                                                              //107, 109, 110, 190 = +, -, .    For Windows
      return (math_symbel.indexOf(ascii) == -1) ? true : false
    },
    _read_image_url: function(input, path)
    {
      if (input.files && input.files[0])
      {
        var reader = new FileReader();
        reader.onload = function(e)
        {
          $('#' + path).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    },
    _form_upload_video_moudle: function(updata_info)
    {
        return new Promise((resolve, reject) =>
        {
          let path_url           = updata_info.path_url,
              uploaded_video_num = updata_info.uploaded_video_num,
              unit_new_id        = updata_info.unit_new_id,
              pos_unit_id        = updata_info.pos_unit_id,
              pos_chapter_id     = updata_info.pos_chapter_id,
              new_unit_id        = updata_info.new_unit_id,
              new_chapter_id     = updata_info.new_chapter_id,
              filename           = updata_info.filename,
              image_base64       = updata_info.image_base64;

          let progressDOM     = $('#process_' + unit_new_id[uploaded_video_num].replace(',', '_')),
              progressTextDOM = $('#process_text_' + unit_new_id[uploaded_video_num].replace(',', '_'));

          formdata = new FormData($('#form_upload_media_' + pos_unit_id + '_' + pos_chapter_id)[0]);
          formdata.append('unit_id', new_unit_id);
          formdata.append('chapter_id', new_chapter_id);
          formdata.append('pos_unit_id', pos_unit_id);
          formdata.append('pos_chapter_id', pos_chapter_id);
          formdata.append('filename', filename);
          formdata.append('image_base64', image_base64);
          try
          {
              $.ajax
              ({
                  type: 'POST',
                  url: path_url + '/upload_video',
                  async: true,
                  contentType: false,
                  processData: false,
                  dataType: 'json',
                  data: formdata,
                  headers:
                  {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  },
                  beforeSend: function()
                  {
                      $('.check').attr('disabled', 'disabled');
                      $('.exit').attr('disabled', 'disabled');
                  },
                  xhr: function()
                  {
                      var xhr = new window.XMLHttpRequest();
                      // Upload Progress
                      xhr.upload.addEventListener("progress", function(evt)
                      {
                          if (evt.lengthComputable)
                          {
                              var percent_complete = (evt.loaded / evt.total * 100).toFixed(2);

                              new_id = unit_new_id[uploaded_video_num].replace(',', '-');

                              if ($('#media_filename_' + unit_new_id[uploaded_video_num].replace(',', '_')).val() != '')
                              {
                                  progressDOM.css('width', Math.floor(percent_complete) + '%');
                                  progressTextDOM.text(Math.floor(percent_complete) + '%');
                                  $('#total_process').html(new_id + ' 上傳進度：' + percent_complete + '%');
                              }

                              if (percent_complete == '100.00')
                              {
                                  resolve(uploaded_video_num += 1);
                              }
                          }
                      }, true);
                      return xhr;
                  },
                  success: function(result)
                  {
                      if (result.success == 'fail') { $('#total_process').html(' 上傳失敗'); }
                  }
              })
            }
            catch (e)
            {
                $('#process_' + new_unit_id + '_' + new_chapter_id).html(' 上傳失敗');
            }
        })
    },
    _check_entity_lesson_time: function()
    {
        // 確認實體課程時間
        $('.lesson-time').sort(function(a, b)
        {
            var this_item     = a.innerHTML.trim().substr(24);
            var next_item     = b.innerHTML.trim().substr(5, 16);
            var this_item_num = a.id.substr(15);
            var next_item_num = b.id.substr(15);

            if (this_item_num == '_1') { if ($('#error' + this_item_num).length != 0) { $('#error' + this_item_num).remove(); } }

            if (new Date(this_item) > new Date(next_item))
            {
                if (!$('#input_unit' + this_item_num).prop('checked')) { $('#label_unit_name' + this_item_num).click(); }

                if (!$('#input_unit' + next_item_num).prop('checked')) { $('#label_unit_name' + next_item_num).click(); }
            }
            else { if ($('#error' + next_item_num).length != 0) { $('#error' + next_item_num).remove(); } }
        });
    },
    _check_lesson_is_free_or_not: function()
    {
      var origin_fee = $('#lesson_origin_fee').val();
      var offer_fee  = $('#lesson_offer_fee').val();

      if ((origin_fee === '0') && (offer_fee === '0')) { $('#lesson_is_free').click(); }
    },
    _get_all_county: function()
    {
        return areas =
        [
            '基隆市', '台北市', '新北市', '桃園市', '新竹縣',
            '新竹市', '苗栗縣', '臺中市', '彰化縣', '南投縣',
            '雲林縣', '嘉義縣', '臺南市', '嘉義市', '高雄市',
            '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣',
            '金門縣', '連江縣(馬祖)', '其他'
        ];
    },
    _check_area_is_county: function(need_to_change)
    {
        let condition       = '';
        let isCounty        = false;
        let select_isCounty = false;
        let area_select     = $('#area_select');
        let lesson_location = $('#lesson_location');
        const areas         = this._get_all_county();

        if ($('#lesson_location').val() != undefined)
        {
            condition = $('#lesson_location').val().slice(0, 2) == '其他' || $('#lesson_location').val().slice(0, 2) == '馬祖' ? $('#lesson_location').val().slice(0, 2) : $('#lesson_location').val().slice(0, 3);
            isCounty  = this._filter_area(areas, condition).length == true;
            select_isCounty = this._filter_area(areas, area_select.val()).length == true;

            if (need_to_change && select_isCounty) { this._change_address_text(isCounty); }
        }
        return isCounty;
    },
    _filter_area: function(areas, query)
    {
        return areas.filter(function(area)
        {
            return area.indexOf(query) > -1;
        })
    },
    _change_address_text: function(isCounty)
    {
        let area_select     = $('#area_select');
        let lesson_location = $('#lesson_location');
        let condition       = $('#lesson_location').val().slice(0, 2) == '其他' || $('#lesson_location').val().slice(0, 2) == '馬祖' ? $('#lesson_location').val().slice(0, 2) : $('#lesson_location').val().slice(0, 3);

        if (isCounty)
        {
            if (condition.length == 2) { $('#lesson_location').val($('#area_select').val() + $('#lesson_location').val().slice(2)) }
            else if (condition == '連江縣' && lesson_location.val().slice(3, 4) == '(') { $('#lesson_location').val($('#area_select').val() + $('#lesson_location').val().slice(7)) }
            else { $('#lesson_location').val($('#area_select').val() + $('#lesson_location').val().slice(3)) }
        }
        else
        {
            if (condition == '其他' || condition == '馬祖') { $('#lesson_location').val($('#area_select').val() + $('#lesson_location').val()) }
            else { $('#lesson_location').val($('#area_select').val() + $('#lesson_location').val()) }
        }
    },
    _reset_unit: function()
    {
        // 重新調整章節、小節id的編號，刪除章節之後，避免id缺號導致存檔遺失
        var new_unit = $('.unit');
        new_unit.map(function(i, n)
        {
            var id_num    = n.id.substr(5);
            var reg_id    = RegExp('([a-z]+_)' + id_num, 'g');
            var reg_click = RegExp( '([(])' + id_num , 'g');
            var outerHTML = n.outerHTML;
            outerHTML     = outerHTML.replace(reg_id, '$1' + (i + 1))
                                     .replace(reg_click, '$1' + (i + 1));
            n.outerHTML   = outerHTML;
        });
        create_lesson._reset_unit_chapter_array();
    },
    _reset_unit_chapter_array: function()
    {
        // Modify The Unit And Chpater Number That be Used To Add Or Delete The Unit And Chpater
        // 重新計算章節&小節的數量 用於存檔、新增、刪除
        create_lesson._unit_num = $('.unit').length;

        if (this._lesson_type.val() == 'online')
        {
            for (i = 1; i <= create_lesson._unit_num; i++) { create_lesson._chapter_num[i] = $('#unit_' + i).find('.chapter').length; }
        }
    }
  }
  return _const;
}());

var create_lesson;
$(function()
{
  create_lesson = new create_lesson();
})

function _check_Number(num)
{
    let re = RegExp('[^0-9]+');
    if(re.test(num.toString())) { return true; } else { return false; }
}

function _check_Number_in_reage(min, max, num)
{
    if(num > max || num < min) { return true; } else { return false; }
}

function _change_video(unit_num, chapter_num)
{
    create_lesson._is_edited = true;
    var chapter_real_num     = unit_num + '_' + chapter_num;
    var lesson_video         = $('#media_' + chapter_real_num);

    if (lesson_video.val() != '')
    {
        var filename_split = lesson_video.val().split('\\');
        $('#media_filename_' + chapter_real_num).val(filename_split[filename_split.length - 1]);
        $('#media_video_' + chapter_real_num).removeAttr('hidden', 'hidden');
        var source = $('#preview_video_' + chapter_real_num);
        source[0].src = URL.createObjectURL(lesson_video[0].files[0]);
        source.parent()[0].load();
    }
    else
    {
        $('#media_filename_' + chapter_real_num).val('');
        $('#media_video_' + chapter_real_num).attr('hidden', 'hidden');
    }
}

function _del_condition(id)
{
  condition = $('#lesson_condition_' + id).val();
  if (condition != '')
  {
    $.confirm
    ({
      title: '刪除條件',
      content: '你確定要刪除<span class="color-emphasized2">' + condition + '</span>項目嗎？',
      buttons:
      {
        '取消': {},
        '確定刪除':
        {
          btnClass: 'btn-green',
          action: function()
          {
            $('#condition_area_' + id).remove();
            $.alert('刪除成功，請記得按儲存鍵', '成功');
          }
        },
      }
    })
  }
  else
  {
    $('#condition_area_' + id).remove();
  }
}

function _del_suit(id)
{
  suit = $('#lesson_suit_' + id).val();

  if (suit != '')
  {
    $.confirm
    ({
      title: '刪除適合學生項目',
      content: '你確定要刪除<span class="color-emphasized2">' + suit + '</span>項目嗎？',
      buttons:
      {
        '取消': {},
        '確定刪除':
        {
          btnClass: 'btn-green',
          action: function()
          {
            $('#suit_area_' + id).remove();
            $.alert('刪除成功，請記得按儲存鍵', '成功');
          }
        },
      }
    })
  }
  else { $('#suit_area_' + id).remove(); }
}

function _del_learn(id)
{
  learn = $('#lesson_learn_' + id).val();

  if (learn != '')
  {
    $.confirm
    ({
      title: '刪除學習結果項目',
      content: '你確定要刪除<span class="color-emphasized2">' + learn + '</span>項目嗎？',
      buttons:
      {
        '取消': {},
        '確定刪除':
        {
          btnClass: 'btn-green',
          action: function()
          {
            $('#learn_area_' + id).remove();
            $.alert('刪除成功，請記得按儲存鍵', '成功');
          }
        },
      }
    })
  }
  else { $('#learn_area_' + id).remove(); }
}

function _add_chapter(unit)
{
  create_lesson._unit_use = true;
  create_lesson._chapter_num[unit] = typeof(create_lesson._chapter_num[unit]) == 'undefined' ? 1 : create_lesson._chapter_num[unit] + 1;
  var chapter = create_lesson._chapter_num[unit];
  var lesson_type = create_lesson._lesson_type.val();
  var chapter_real_num = unit + '_' + chapter;

  var common_column =
    //Online Table
    '<div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>小節</span></div>' +
        '<div class="col-md-10"><input class="form-control" type="text" id="chapter_name_' + chapter_real_num + '" placeholder="請輸入小節簡單的說明"></div>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>備註</span></div>' +
        '<div class="col-md-10"><textarea rows=15 class="form-control" id="chapter_remark_' + chapter_real_num + '" placeholder="請輸入注意事項或需要攜帶的器材" maxlength="255"></textarea></div>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>公開</span></div>' +
        '<div class="col-md-10"><input class="check" type="checkbox" id="chapter_video_public_' + chapter_real_num + '"><label for="chapter_video_public_' + chapter_real_num + '">項目勾選時，可以讓所有使用者<span class="checkbox-free">免費</span>觀看此小節的影片</label></div>' +
      '</div>' +
    '</div>';
  var script =
    //Online Table
    '<script>' +
      'c_name = $("#chapter_name_' + chapter_real_num + '");' +
      'c_check = $("#chapter_video_public_' + chapter_real_num + '");' +
      'c_name.keyup(function(event)' +
      '{' +
        'if ((c_name.val() == ""))' +
        '{' +
          '$(".send").attr("disabled", "disabled");' +
        '}' +
        'else' +
        '{' +
          '$(".send").removeAttr("disabled", "disabled");' +
        '}' +
      '});' +
    '</script>';

  $.confirm
  ({
    title: '新增小節',
    columnClass: 'large',
    content: common_column + script,
    onOpenBefore: function()
    {
      this.buttons.send.disable();
      this.buttons.send.addClass('send');
    },
    buttons:
    {
      '取消': {},
      send:
      {
        btnClass: 'btn-green',
        text: '新增',
        action: function()
        {
          //Online Table
          create_lesson._is_edited     = true;
          var chapter_name             = this.$content.find('#chapter_name_' + chapter_real_num).val();
          var remark                   = this.$content.find('#chapter_remark_' + chapter_real_num).val();
          var remark_br                = create_lesson._escape_html_no_br(remark).split(String.fromCharCode(10)).join('<br>');
          var chapter_video_is_checked = $('#chapter_video_public_' + chapter_real_num).prop('checked');
          var checkbox_text            = chapter_video_is_checked ? '<span class="checkbox-free">免費</span>' : '<span class="checkbox-pay">付費</span>';

          $('#error_' + unit).remove();
          $('#unit_area_' + unit).append(
            '<li id="chapter_' + chapter_real_num + '" class="chapter row">' +
              '<div class="chapter-btn-wrapper col-xs-12">' +
                '<button class="btn btn-danger btn-float" onclick="_del_chapter(' + unit + ',' + chapter + ')"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除小節</button>' +
                '<button class="btn btn-success btn-float" onclick="_edit_chapter(' + unit + ',' + chapter + ')"><i class="fa fa-edit"></i> 編輯小節</button>' +
                '<form id="form_upload_media_' + chapter_real_num + '" enctype="multipart/form-data">' +
                  '<button class="btn btn-info btn-float btn-upload-wrapper"><i class="fa fa-upload" aria-hidden="true"></i> 上傳影片' +
                    '<input class="btn-upload" type="file" accept="video/*" id="media_' + chapter_real_num + '" name="media_' + chapter_real_num + '" onchange="_change_video(' + unit + ',' + chapter + ')">' +
                  '</button>' +
                  '<input type="text" class="form-control hidden" id="media_filename_' + chapter_real_num + '" readonly>' +
                '</form>' +
              '</div>' +
              '<div class="col-xs-12 margintop-10">' +
                '<div class="col-xs-10 col-sm-5 col-md-4" id="media_video_' + chapter_real_num + '" hidden="hidden">' +
                  '<video id="video_' + chapter_real_num + '" controls muted loop>' +
                    '<source src="#" id="preview_video_' + chapter_real_num + '"/>' +
                  '</video>' +
                  '<canvas id="video_canvas_' + chapter_real_num + '" class="video-canvas"></canvas>' +
                '</div>' +
                '<div class="col-xs-10 col-sm-6 col-md-7">' +
                  '<div>' +
                    '<span class="col-form-label chapter-name" id="label_chapter_name_' + chapter_real_num + '" data-id="no" data-chapter_name="' + chapter_name + '"><b>小節：' + chapter_name + '</b></span>' +
                  '</div>' +
                  '<span id="label_chapter_video_public_' + chapter_real_num + '" class="fee-wrapper" data-chapter_video_public="' + chapter_video_is_checked + '">影片為' + checkbox_text + '</span>' +
                  '<span class="remark-title">備註：</span>' +
                  '<span class="col-form-label label-remark" id="label_chapter_remark_' + chapter_real_num + '" data-chapter_remark="' + remark + '">' + remark_br + '</span>' +
                '</div>' +
              '</div>' +
            '</li>'
          );
          // 滾動到該項目 沒有setTimeout會回溯(原因不明)
          setTimeout(function ()
          {
              var scroll_top = $('.content').scrollTop() + $('#unit_' + unit).height();
              $('.content').animate({ scrollTop: unit == $('.unit').length ? scroll_top : scroll_top - 100 }, 300);
          }, 300);
        }
      },
    }
  })
}

function _del_unit(unit_num)
{
  create_lesson._unit_use = true;
  unit      = $('#unit_' + unit_num);
  unit_name = $('#label_unit_name_' + unit_num).data('unit_name');
  $.confirm
  ({
    title: '刪除單元',
    content: '你確定要刪除<span class="color-emphasized2">' + unit_name + '</span>章節嗎？',
    buttons:
    {
      '取消': {},
      '確定刪除':
      {
        btnClass: 'btn-green',
        action: function()
        {
          create_lesson._is_edited = true;
          unit.remove();
          create_lesson._reset_unit();
          $.alert('刪除成功，請記得按儲存鍵', '成功');
        }
      },
    }
  })
}

function _del_chapter(unit_num, chapter_num)
{
  create_lesson._unit_use = true;
  chapter_real_num = unit_num + '_' + chapter_num;
  chapter          = $('#chapter_' + chapter_real_num);
  chapter_name     = $('#label_chapter_name_' + chapter_real_num).data('chapter_name');
  $.confirm
  ({
    title: '刪除小節',
    content: '你確定要刪除<span class="color-emphasized2">' + chapter_name + '</span>小節嗎？',
    buttons:
    {
      '取消': {},
      '確定刪除':
      {
        btnClass: 'btn-green',
        action: function()
        {
          create_lesson._is_edited = true;
          chapter.remove();
          $.alert('刪除成功，請記得按儲存鍵', '成功');
          if ($('#unit_' + unit_num).find('.chapter').length == 0) { $('#unit_' + unit_num).append('<div id="error_' + unit_num + '" class="lesson-error">此章節沒有小節內容，將不會被儲存，請新增小節或刪除章節</div>'); }
        }
      },
    }
  })
}

function _edit_unit_name(unit_num)
{
    create_lesson._unit_use = true;
    var old_unit_name = $('#label_unit_name_' + unit_num).data('unit_name');
    var lesson_type   = create_lesson._lesson_type.val();
    var column_class  = lesson_type == 'entity' ? 'large' : 'small';

    if (lesson_type == 'entity')
    {
        var old_unit_time           = $('#label_unit_time_' + unit_num).data('unit_time').replace(/T/g, ' ');
        var temp_old_unit_time      = old_unit_time.split(' ~ ');
        var old_unit_start_time     = temp_old_unit_time[0];
        var old_unit_end_time       = temp_old_unit_time[1];
        var old_unit_remark         = $('#label_unit_remark_' + unit_num).data('unit_remark').toString().split('<br />').join('');
        var old_unit_remark_br      = create_lesson._escape_html_no_br(old_unit_remark).split(String.fromCharCode(10)).join('<br>');
        var old_unit_description    = $('#label_description_' + unit_num).data('unit_description').toString().split('<br />').join('');
        var old_unit_description_br = create_lesson._escape_html_no_br(old_unit_description).split(String.fromCharCode(10)).join('<br>');
    }
    var content = lesson_type == 'entity'
    //Entity Table
    ? '<div class="col-md-12">' +
        '<div class="col-md-2"><span>名稱</span><span class="color-emphasized2">*</span></div>' +
        '<div class="col-md-10"><input type="text" class="form-control edit-func" id="unit_name" value="' + create_lesson._escape_html_no_br(old_unit_name) + '"></div>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>課程開始</span><span class="color-emphasized2">*</span></div>' +
        '<div class="col-md-5"><input class="form-control datepicker-here" id="unit_start_time" placeholder="選擇開始日期" readonly required></div>' +
        '<div class="col-md-5"><select id="sel_unit_start_time" class="form-control" name="" required><option>選擇開始時間</option></select></div>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>課程結束</span><span class="color-emphasized2">*</span></div>' +
        '<div class="col-md-5"><input class="form-control datepicker-here" id="unit_end_time" placeholder="選擇結束日期" readonly required></div>' +
        '<div class="col-md-5"><select id="sel_unit_end_time" class="form-control" name="" required><option>選擇結束時間</option></select></div>' +
      '</div>' +
      '<div class="col-md-12 marginbot-20">' +
        '<div class="col-md-2"><span>課程描述</span></div>' +
        '<div class="col-md-10"><textarea class="form-control" id="unit_description" rows="15" placeholder="請輸入課程描述">' + create_lesson._escape_html_no_br(old_unit_description) + '</textarea></div>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>備註</span></div>' +
        '<div class="col-md-10"><textarea class="form-control" id="unit_remark" placeholder="請輸入注意事項或需要攜帶的器材" maxlength="255">' + create_lesson._escape_html_no_br(old_unit_remark) + '</textarea></div>' +
      '</div>'
    //Online Table
    : '<input type="text" class="form-control edit-func" id="unit_name" value="' + create_lesson._escape_html_no_br(old_unit_name) + '">';
    $.confirm
    ({
        title:       '編輯章節',
        content:     content,
        columnClass: column_class + ' aaa',
        onOpenBefore()
        {
            this.buttons.send.disable();
            this.buttons.send.addClass('send');

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
            '取消': {},
            send:
            {
                text:     '修改',
                btnClass: 'btn-green',
                action:   function()
                {
                    //Common Table
                    create_lesson._is_edited = true;
                    var unit_name            = this.$content.find('#unit_name').val();
                    $('#label_unit_name_' + unit_num).data('unit_name', unit_name);
                    $('#label_unit_name_' + unit_num).html('章節：' + unit_name);

                    //Entity Table
                    if (lesson_type == 'entity')
                    {
                        var start_time      = this.$content.find('#unit_start_time').val() + 'T' + this.$content.find('#sel_unit_start_time').val();
                        var start_timestamp = Date.parse(start_time).valueOf();
                        var end_time        = this.$content.find('#unit_end_time').val() + 'T' + this.$content.find('#sel_unit_end_time').val();
                        var end_timestamp   = Date.parse(end_time).valueOf();
                        var today_timestamp = new Date().getTime();
                        var remark          = this.$content.find('#unit_remark').val();
                        var remark_br       = create_lesson._escape_html_no_br(remark).split(String.fromCharCode(10)).join('<br>');
                        var description     = this.$content.find('#unit_description').val();
                        var description_br  = create_lesson._escape_html_no_br(description).split(String.fromCharCode(10)).join('<br>');

                        if (isNaN(start_timestamp) || isNaN(end_timestamp))
                        {
                            $.alert('時間範圍為 現在 ~ 2037年底', '錯誤');
                            return false;
                        }
                        else if ((start_timestamp < today_timestamp) || (end_timestamp < today_timestamp))
                        {
                            $.alert('時間範圍為 現在 ~ 2037年底', '錯誤');
                            return false;
                        }
                        else
                        {
                            var time = start_time + ' ~ ' + end_time;
                            $('#label_unit_time_' + unit_num).data('unit_time', time);
                            $('#label_unit_time_' + unit_num).html('上課時間：' + time.replace(/T/g, ' '));
                            $('#label_unit_remark_' + unit_num).data('unit_remark', remark);
                            $('#label_unit_remark_' + unit_num).html(remark_br);
                            $('#label_description_' + unit_num).data('unit_description', description);
                            $('#label_description_' + unit_num).html(description_br);
                            create_lesson._check_entity_lesson_time();
                        }
                    }
                }
            },
        },
        onContentReady: function()
        {
            var unit_name      = $('#unit_name');
            var start_time     = $('#unit_start_time');
            var end_time       = $('#unit_end_time');
            var sel_start_time = $('#sel_unit_start_time');
            var sel_end_time   = $('#sel_unit_end_time');

            unit_name.focus();

            if (lesson_type == 'entity')
            {
                var lesson_timestamp = 0;
                var per_unit_num     = parseInt(unit_num) - 1;
                var old_start_date   = new Date(old_unit_start_time);
                var old_start_hour   = old_start_date.getHours() < 10 ? '0' + old_start_date.getHours() : old_start_date.getHours();
                var old_start_min    = old_start_date.getMinutes() == 0 ? '00' : '30';
                var old_end_date     = new Date(old_unit_end_time);
                var old_end_hour     = old_end_date.getHours() < 10 ? '0' + old_end_date.getHours() : old_end_date.getHours();
                var old_end_min      = old_end_date.getMinutes() == 0 ? '00' : '30';



                // 設定選擇時間的樣式 套件Air Datepicker
                var start_min_date = ceil_mintues(lesson_timestamp);
                start_time.datepicker
                ({
                    language: "zh",
                    position: "bottom left",
                    minDate:  new Date(start_min_date),
                    onSelect: function()
                    {
                        if (start_time.val() != '')
                        {
                            var s_min_date = new Date(start_min_date);

                            if (new Date(start_time.val()).getTime() == new Date(start_min_date).setHours(8, 0, 0, 0)) { set_select_time_by_value('sel_unit_start_time', (s_min_date.getHours() < 10 ? '0' + s_min_date.getHours() : s_min_date.getHours()) + ':' + s_min_date.getMinutes()); }
                            else { set_select_time_default('sel_unit_start_time'); }
                            sel_start_time.val(old_start_hour + ':' + old_start_min);
                            start_time.data('datepicker').hide();

                            end_time.data('datepicker').update
                            ({
                                language: "zh",
                                position: "bottom right",
                                minDate:  new Date(start_time.val()),
                                onSelect: function()
                                {
                                    if (end_time.val() != '')
                                    {
                                        if ((sel_start_time.val() != 'unknow') && (sel_start_time.val() != null))
                                        {
                                            if (end_time.val() != start_time.val()) { set_select_time_default('sel_unit_end_time'); }
                                            else { set_select_time_by_value('sel_unit_end_time', sel_start_time.val()); }
                                            sel_end_time.val(old_end_hour + ':' + old_end_min);
                                        }
                                        end_time.data('datepicker').hide();
                                    }
                                }
                            });
                            end_time.data('datepicker').selectDate(new Date(start_time.val()));
                        }
                    }
                });

                end_time.datepicker
                ({
                    language: "zh",
                    position: "bottom left",
                });

                start_time.data('datepicker').selectDate(old_start_date);
                sel_start_time.val(old_start_hour + ':' + old_start_min);

                if (old_start_date.setHours(0, 0, 0) != old_end_date.setHours(0, 0, 0)) { end_time.data('datepicker').selectDate(old_end_date); }
                sel_end_time.val(old_end_hour + ':' + old_end_min);

                unit_name.keyup(function(event)
                {
                    check_input_form();
                });

                start_time.blur(function()
                {
                    check_input_form();
                });

                end_time.blur(function()
                {
                    check_input_form();
                });

                $('#unit_remark').keyup(function()
                {
                    check_input_form();
                });

                $('#unit_description').keyup(function()
                {
                    check_input_form();
                });

                sel_start_time.change(function()
                {
                    // 判斷是否同天
                    if (start_time.val() == end_time.val()) { set_select_time_by_value('sel_unit_end_time', sel_start_time.val()); }
                    else { set_select_time_default('sel_unit_end_time'); }
                    check_input_form();
                });

                sel_end_time.change(function()
                {
                    check_input_form();
                });
            }
            else
            {
                unit_name.keyup(function(event)
                {
                    name = create_lesson._escape_html_no_br(unit_name.val());

                    if ((name == '') || (name == create_lesson._escape_html_no_br(old_unit_name))) { $('.send').attr('disabled', 'disabled'); }
                    else { $('.send').removeAttr('disabled', 'disabled'); }
                });
            }

            function ceil_mintues(timestamp)
            {
                // 無條件進位至下個30分鐘
                const THIRTY_MIN = 1000 * 60 * 30;
                return Math.ceil(timestamp / THIRTY_MIN) * THIRTY_MIN;
            }

            function check_input_form()
            {
                // 確認欄位資料
                var name           = create_lesson._escape_html_no_br(unit_name.val());
                var start          = start_time.val() + ' ' + sel_start_time.val();
                var end            = end_time.val() + ' ' + sel_end_time.val();
                var time           = start + ' ~ ' + end;
                var remark         = create_lesson._escape_html_no_br($('#unit_remark').val().split('<br />').join(''));
                var remark_br      = remark.split(String.fromCharCode(10)).join('<br>');
                var description    = create_lesson._escape_html_no_br($('#unit_description').val().split('<br />').join(''));
                var description_br = description.split(String.fromCharCode(10)).join('<br>');

                if ((name != '') && (start != '') && (end != ''))
                {
                    if ((name == create_lesson._escape_html_no_br(old_unit_name)) && (time == old_unit_time) && (remark_br == old_unit_remark_br) && (description == old_unit_description_br))
                    {
                        $('.send').attr('disabled', 'disabled');
                    }
                    else if ((sel_start_time.val() == null) || (sel_start_time.val() == 'unknow')) { $('.send').attr('disabled', 'disabled'); }
                    else if ((sel_end_time.val() == null) || (sel_end_time.val() == 'unknow')) { $('.send').attr('disabled', 'disabled'); }
                    else { $('.send').removeAttr('disabled', 'disabled'); }
                }
                else { $('.send').attr('disabled', 'disabled'); }
            }

            function set_select_time_by_value(target, time_value)
            {
                // 設定時間選項 從(time_value + 30min)-23:30
                var items = '';

                if ((time_value != null) && (time_value != 'unknow'))
                {
                    var min_hours = parseInt(time_value.substr(0, 2));
                    var min_min   = parseInt(time_value.substr(3));

                    for (i = 0; i < 24; i++)
                    {
                        if (i < min_hours) { continue; }
                        else if ( i == min_hours && min_min == 30) { continue; }
                        else if ( i == min_hours && min_min == 0) { items += '<option>' + (i < 10 ? '0' + i : i) + ':30</option>'; }
                        else
                        {
                            items += '<option>' + (i < 10 ? '0' + i : i) + ':00</option>';
                            items += '<option>' + (i < 10 ? '0' + i : i) + ':30</option>';
                        }
                    }
                }

                if (items == '') { items = '<option value="unknow">沒有選項，請更改日期</option>'; }
                $('#' + target).html('');
                $('#' + target).append(items);
            }

            function set_select_time_default(target)
            {
                // 設定時間選項 從00:00-23:30
                var items = '';

                for (i = 0; i < 24; i++)
                {
                    items += '<option>' + (i < 10 ? '0' + i : i) + ':00</option>';
                    items += '<option>' + (i < 10 ? '0' + i : i) + ':30</option>';
                }
                $('#' + target).html('');
                $('#' + target).append(items);
            }
        }
    });
}

function _edit_chapter(unit_num, chapter_num)
{
  create_lesson._unit_use = true;
  //Online Table
  var lesson_type           = create_lesson._lesson_type.val();
  var chapter_real_num      = unit_num + '_' + chapter_num;
  var old_chapter_name      = $('#label_chapter_name_' + chapter_real_num).data('chapter_name');
  var old_chapter_remark    = $('#label_chapter_remark_' + chapter_real_num).data('chapter_remark').toString().split('<br />').join('');
  var old_chapter_remark_br = create_lesson._escape_html_no_br(old_chapter_remark).split(String.fromCharCode(10)).join('<br>');

  var common_column =
    //Online Table
    '<div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>小節</span></div>' +
      '<div class="col-md-10"><input class="form-control" type="text" id="chapter_name_' + chapter_real_num + '" value="' + create_lesson._escape_html_no_br(old_chapter_name) + '" placeholder="請輸入小節簡單的說明"></div>' +
    '</div>';

  if (lesson_type == 'online')
  {
    old_chapter_video_public = $('#label_chapter_video_public_' + chapter_real_num).data('chapter_video_public');
    checkbox_content         = old_chapter_video_public
    ? '<div class="col-md-10"><input class="check" type="checkbox" id="chapter_video_public_' + chapter_real_num + '" checked><label for="chapter_video_public_' + chapter_real_num + '">項目勾選時，可以讓所有使用者<span class="checkbox-free">免費</span>觀看此小節的影片</label></div>'
    : '<div class="col-md-10"><input class="check" type="checkbox" id="chapter_video_public_' + chapter_real_num + '"><label for="chapter_video_public_' + chapter_real_num + '">項目勾選時，可以讓所有使用者<span class="checkbox-free">免費</span>觀看此小節的影片</label></div>';

    var content_colume =
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>備註</span></div>' +
        '<div class="col-md-10"><textarea rows=15 class="form-control" id="chapter_remark_' + chapter_real_num + '" placeholder="請輸入注意事項或需要攜帶的器材" maxlength="255">' + create_lesson._escape_html_no_br(old_chapter_remark) + '</textarea></div>' +
      '</div>' +
      '<div class="col-md-12">' +
        '<div class="col-md-2"><span>公開</span></div>' + checkbox_content +
      '</div>' +
      '</div>' +
      '<script>';
    var script =
      '$("#chapter_name_' + chapter_real_num + '").keyup(function(event)' +
      '{' +
        'name = $("#chapter_name_' + chapter_real_num + '").val();' +
        'remark = create_lesson._escape_html_no_br($("#chapter_remark_' + chapter_real_num + '").val().split("<br />").join(""));' +
        'remark_br = remark.split(String.fromCharCode(10)).join("<br>");' +
        'chapter_video_is_checked = $("#chapter_video_public_' + chapter_real_num + '").prop("checked");' +
        'if (name != "")' +
        '{' +
          'if ((name == "' + create_lesson._escape_html_no_br(old_chapter_name) + '") && (remark_br == "' + old_chapter_remark_br + '") && (chapter_video_is_checked == ' + old_chapter_video_public + '))' +
          '{' +
            '$(".send").attr("disabled", "disabled");' +
          '}' +
          'else' +
          '{' +
            '$(".send").removeAttr("disabled", "disabled");' +
          '}' +
        '}' +
        'else' +
        '{' +
          '$(".send").attr("disabled", "disabled");' +
        '}' +
      '});' +
      '$("#chapter_remark_' + chapter_real_num + '").keyup(function(event)' +
      '{' +
        'name = $("#chapter_name_' + chapter_real_num + '").val();' +
        'remark = create_lesson._escape_html_no_br($("#chapter_remark_' + chapter_real_num + '").val().split("<br />").join(""));' +
        'remark_br = remark.split(String.fromCharCode(10)).join("<br>");' +
        'chapter_video_is_checked = $("#chapter_video_public_' + chapter_real_num + '").prop("checked");' +
        'if (name != "")' +
        '{' +
          'if ((name == "' + create_lesson._escape_html_no_br(old_chapter_name) + '") && (remark_br == "' + old_chapter_remark_br + '") && (chapter_video_is_checked == ' + old_chapter_video_public + '))' +
          '{' +
            '$(".send").attr("disabled", "disabled");' +
          '}' +
          'else' +
          '{' +
            '$(".send").removeAttr("disabled", "disabled");' +
          '}' +
        '}' +
        'else' +
        '{' +
          '$(".send").attr("disabled", "disabled");' +
        '}' +
      '});' +
      '$("#chapter_video_public_' + chapter_real_num + '").click(function(event)' +
      '{' +
        'name = $("#chapter_name_' + chapter_real_num + '").val();' +
        'remark = create_lesson._escape_html_no_br($("#chapter_remark_' + chapter_real_num + '").val().split("<br />").join(""));' +
        'remark_br = remark.split(String.fromCharCode(10)).join("<br>");' +
        'chapter_video_is_checked = $("#chapter_video_public_' + chapter_real_num + '").prop("checked");' +
        'if (name != "")' +
        '{' +
          'if ((name == "' + create_lesson._escape_html_no_br(old_chapter_name) + '") && (remark_br == "' + old_chapter_remark_br + '") && (chapter_video_is_checked == ' + old_chapter_video_public + '))' +
          '{' +
            '$(".send").attr("disabled", "disabled");' +
          '}' +
          'else' +
          '{' +
            '$(".send").removeAttr("disabled", "disabled");' +
          '}' +
        '}' +
        'else' +
        '{' +
          '$(".send").attr("disabled", "disabled");' +
        '}' +
      '});' +
      '</script>';
  }
  $.confirm
  ({
    title: '編輯小節',
    columnClass: 'large',
    content: common_column + content_colume + script,
    onOpenBefore()
    {
      this.buttons.send.disable();
      this.buttons.send.addClass('send');
    },
    buttons:
    {
      '取消': {},
      send:
      {
        text: '修改',
        btnClass: 'btn-green',
        action: function()
        {
          create_lesson._is_edited = true;

          if (lesson_type == 'online')
          {
              var chapter_name             = this.$content.find('#chapter_name_' + unit_num + '_' + chapter_num).val();
              var remark                   = this.$content.find('#chapter_remark_' + chapter_real_num).val();
              var remark_br                = create_lesson._escape_html_no_br(remark).split(String.fromCharCode(10)).join('<br>');
              var chapter_video_is_checked = $('#chapter_video_public_' + chapter_real_num).prop('checked');
              var checkbox_text            = chapter_video_is_checked ? '<span class="checkbox-free">免費</span>' : '<span class="checkbox-pay">付費</span>';

              $('#label_chapter_name_' + chapter_real_num).data('chapter_name', chapter_name);
              $('#label_chapter_name_' + chapter_real_num).html('<b>小節：' + chapter_name + '</b>');
              $('#label_chapter_remark_' + chapter_real_num).data('chapter_remark', remark);
              $('#label_chapter_remark_' + chapter_real_num).html(remark_br);
              $('#label_chapter_video_public_' + chapter_real_num).data('chapter_video_public', chapter_video_is_checked);
              $('#label_chapter_video_public_' + chapter_real_num).html('影片為' + checkbox_text);
          }
        }
      },
    }
  })
}

function _section_sort(el, id)
{
    var sort_text = $(el).find('span');
    var is_change = false;
    // 預防資料流失
    if (create_lesson._is_edited)
    {
        $.alert('排序前請先存檔', '錯誤');
        return false;
    }

    if (sort_text.text() == '排序')
    {
        var unit        = $('.unit');
        var old_chapter = $('.chapter')
        var select_unit = $('#unit_' + id);
        var stop_btn    = $('.step-action');
        // 排序畫面 不能新增、編輯、上傳、存檔
        unit.filter((i, n) =>
        {
            $(n).find('.btn').attr('disabled', 'disabled');
            $(n).find('.chapter input').attr('disabled', 'disabled');
        });
        stop_btn.filter((i, n) =>
        {
            $(n).find('.btn').attr('disabled', 'disabled');
        });
        select_unit.filter((i, n) =>
        {
            $(n).find('.chapter').prepend('<i class="fas fa-arrows-alt sort-icon" aria-hidden="true"></i>');
            $(n).find('#btn_section_sortable').removeAttr('disabled', 'disabled');
        });
        // 讓章節可以拖曳排序 JQuery ui
        $('#unit_area_' + id).sortable
        ({
            revert:   true,
            handle:   'i.fa-arrows-alt',
            disabled: false,
            stop: function(event, ui)
            {
                // 重新編排章節ID
                var new_chapter = $('#unit_area_' + id).find('li');
                new_chapter.map(function(i, n)
                {
                    if (old_chapter[i].id != n.id)
                    {
                        var id_num    = n.id.substr(10);
                        var reg_id    = RegExp('([a-z]+_[0-9]_)' + id_num, 'g');
                        var reg_click = RegExp( '([,]+[ \t]+)' + id_num , 'g');
                        var outerHTML = n.outerHTML;
                        outerHTML     = outerHTML.replace(reg_id, '$1' + (i + 1))
                                                 .replace(reg_click, '$1' + (i + 1));
                        n.outerHTML   = outerHTML;
                        is_change     = true;
                    }
                });
                create_lesson._reset_unit_chapter_array();

                if (create_lesson._lesson_type.val() == 'entity') { create_lesson._check_entity_lesson_time(); }
            }
        });
        sort_text.text('確定');
        $(el).toggleClass('btn-info btn-success');
    }
    else
    {
        var unit_items = $('.unit');
        var stop_btn = $('.step-action');
        // 回到章節編輯功能
        unit_items.filter((i, n) =>
        {
            $(n).find('.sort-icon').remove();
            $(n).find('.btn[disabled]').removeAttr('disabled', 'disabled');
            $(n).find('.chapter input[disabled]').removeAttr('disabled', 'disabled');
        });
        stop_btn.filter((i, n) =>
        {
            $(n).find('.btn').removeAttr('disabled', 'disabled');
        });
        // 關閉拖曳排序功能
        $('#unit_area').sortable({ disabled: true });
        sort_text.text('排序');
        $(el).toggleClass('btn-info btn-success');

        if (is_change)
        {
            create_lesson._is_edited = true;
            $.alert('排序完成，請記得按儲存鍵', '完成');
        }
    }
}
