var create_lesson = (function()
{
  var _const;
  _const = function()
  {
    this._chapter_num = new Array();
    this._detail_check = new Array();
    this._construct();
  }
  _const.prototype =
  {
    _construct: function()
    {
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll: function()
    {
      if ($('#named').length > 0)
      {

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
              select_header = '<select id="lesson_teacher" class="form-control" style="margin-top:15px;">';
              select_empty = '<option value=""></option>'
              select_end = '</select>';
              select_content = '';
              $.each(data.teacher_data, function(index, value)
              {
                  select_content = select_content + '<option value="' + value['t_id'] + '">講師編號：' + value['t_id'] + ', 本名：' + value['member_data']['nickname'] + '</option>'
              });
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
                    select_header + select_empty + select_content + select_end +
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
                    ok:
                    {
                      text: '確定',
                      btnClass: 'btn-info',
                      action: function()
                      {
                        this.buttons.ok.disable();
                        var lesson_name = this.$content.find('.lesson_name').val();
                        var lesson_type = this.$content.find('#lesson_type').val();
                        var lesson_teacher = this.$content.find('#lesson_teacher').val();
                        $.ajax
                        ({
                          url: '/ajax/create_lesson',
                          type: 'post',
                          dataType: 'json',
                          async: false,
                          data:
                          {
                            lesson_name: lesson_name,
                            lesson_type: lesson_type,
                            lesson_teacher: lesson_teacher
                          },
                          headers:
                          {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                          },
                          success(data)
                          {
                            let post_data =
                            {
                              account: $('#login_account').val(),
                              lesson_id: data.id,
                              time: (new Date()).getTime()
                            }
                            firebaseController.createLesson(post_data).then(() =>
                            {
                              $.confirm
                              ({
                                title: '成功',
                                content: '創建完成，可以開始進行編輯！',
                                buttons:
                                {
                                  'ok':
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
                    cancel:
                    {
                      text: '取消',
                      btnClass: 'btn-red',
                      action: function()
                      {
                        location.href = '/';
                      }
                    }
                  }
              })
            }
            else
            {
              console.log(data.status);
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
  return _const;
}());

var create_lesson;
$(function()
{
  create_lesson = new create_lesson();
})
