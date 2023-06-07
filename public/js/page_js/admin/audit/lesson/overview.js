var audit_lesson_overview = (function()
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
      this._lesson_list;
      this._audit_lesson_overview = $('#audit_lesson_overview');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initial_audit_lesson_table();
      objThis._get_audit_lesson_list();
    },
    _initial_audit_lesson_table: function()
    {
      //Initial Overview Table
      var objThis = this;
      var Table = objThis._audit_lesson_overview.dataTable
      ({
        dom: 'lBfrtip',
        buttons: [],
        'sLanguage':
        {
          'sSearch': '搜尋： ',
          'sLengthMenu': '<span>顯示筆數:_MENU_</span> ',
          'oPaginate':
          {
            'sFirst': '第一頁',
            'sLast': '最後一頁',
            'sNext': '>',
            'sPrevious': '<'
          },
          'sInfo': '第 _START_ - _END_ 筆資料。總共 _TOTAL_ 筆',
          'sProcessing': '資料讀取中...',
          'sEmptyTable': '查無資料',
          'sSearchPlaceholder': '請輸入關鍵字..',
          'sZeroRecords': '查無資料',
          'sInfoEmpty': ''
        },
        'serverSide': false,
        'deferLoading': 57,
        'iDisplayLength': 10,
        'aLengthMenu': [[10, 25, 50, 100, -1], [10, 25, 50, 100, '全部']]
      })
      objThis._audit_lesson_overview.fnClearTable();
    },
    _get_audit_lesson_list: function()
    {
      //Get All Audit Lesson List Via Ajax
      var objThis = this;
      $.ajax
      ({
        type: 'get',
        url: '/ajax/get_audit_lesson_list',
        success: function(data)
        {
          var lesson_list          = data.lesson_list;
          var member_m_id_list     = data.member_m_id_list;
          var member_nickname_list = data.member_nickname_list;
          var teacher_m_id_list    = data.teacher_m_id_list;
          var teacher_t_id_list    = data.teacher_t_id_list;
          objThis._set_audit_lesson_list(lesson_list, member_m_id_list, member_nickname_list, teacher_m_id_list, teacher_t_id_list);
          objThis._lesson_list = lesson_list;
        }
      })
    },
    _set_audit_lesson_list: function(lesson_list, member_m_id_list, member_nickname_list, teacher_m_id_list, teacher_t_id_list)
    {
      //Use Teacher Data And Member Data To Structure Table
      var objThis = this;
      var _td;
      var _tr;
      objThis._audit_lesson_overview.fnClearTable();
      $.each(lesson_list, function(i, v)
      {
        var t_id            = v.t_id;
        var m_id_index      = teacher_t_id_list.indexOf(t_id);
        var m_id            = teacher_m_id_list[m_id_index];
        var nickname_index  = member_m_id_list.indexOf(m_id);
        var nickname        = member_nickname_list[nickname_index];
        _tr = $('<tr />');
        _td_num = $('<td />', {'nowrap': 'nowrap', 'text': (i+1)});
        _td_apply_name = $('<td />', {'nowrap': 'nowrap', 'text': nickname});
        _td_lesson_name = $('<td />', {'nowrap': 'nowrap', 'text': v.l_name});
        _td_preview = $('<td / style="text-align: center">');
        _input_preview =
        $(
          '<label />' ,
          {
            'class': 'label btn-success',
            'id': 'candidate_' + i,
            'name': 'candidate_' + i,
            'style': 'font-size: 90%; font-weight: 400;',
            'text': '查看預覽',
            'onclick': '_input_preview_click(' + v.l_id + ')',
          }
        );

        _td_operate = $('<td / style="text-align: center">');
        _input_operate =
        $(
          '<label />' ,
          {
            'class': 'label btn-info',
            'id': 'candidate_' + i,
            'name': 'candidate_' + i,
            'style': 'font-size: 90%; font-weight: 400;',
            'text': '進行審核',
            'onclick': '_input_operate_click(' + v.l_id + ')',
          }
        );
        _tr.append(_td_num);
        _tr.append(_td_apply_name);
        _tr.append(_td_lesson_name);
        _td_preview.append(_input_preview);
        _tr.append(_td_preview);
        _td_operate.append(_input_operate);
        _tr.append(_td_operate);
        objThis._audit_lesson_overview.fnAddData(_tr);
      })
      $('#audit_lesson_overview_length').addClass('col-sm-6');
      $('#audit_lesson_overview_filter').addClass('col-sm-6');
      $('#audit_lesson_overview_info').addClass('col-sm-6');
      $('#audit_lesson_overview_paginate').addClass('col-sm-6');
    },
    _audit_end_init: function(l_name)
    {
      //After Audit Teacher, Page Will Show Notice And Auto Refresh Table List
      $('.jconfirm').hide();
      this._get_audit_lesson_list()
      $.alert('<span class="color-emphasized2">' + l_name + '</span>的審核已經完成了', '完成！')
    }
  }
  return _const;
}());

var audit_lesson_overview;
$(function()
{
  audit_lesson_overview = new audit_lesson_overview();
})

function _input_preview_click(l_id)
{
  window.open('/admin/audit/lesson/preview/' + l_id, 'QQ');
}

function _input_operate_click(l_id)
{
  var v = audit_lesson_overview._lesson_list.find((n) => n.l_id == l_id);
  $.confirm
  ({
    title: '審核',
    content: '是否將課程<span class="color-emphasized2">' + v.l_name + '</span>審核通過？',
    buttons:
    {
      '通過':
      {
        btnClass: 'btn-green',
        action: function ()
        {
          $.confirm
          ({
            title: '確認通過審核？',
            content:
            '<div>' +
              '<label>請輸入審核通過理由</label>' +
              '<div class="form-group">' +
                '<input type="text" placeholder="通過理由" class="success_reason form-control" />' +
              '</div>' +
              '<div class="form-group">' +
                '<input type="password" placeholder="確認密碼" class="password form-control" />' +
              '</div>' +
            '</div>',
            buttons:
            {
              '就決定是你了！':
              {
                btnClass: 'btn-green',
                action: function ()
                {
                  success_reason = this.$content.find('.success_reason').val();
                  var password = this.$content.find('.password').val();
                  if (!success_reason)
                  {
                    $.confirm
                    ({
                      title: '錯誤',
                      content: '請輸入審核通過理由！',
                      type: 'red',
                      buttons: {
                        close: function() {}
                      }
                    })
                    return false;
                  }
                  else if (!password)
                  {
                    $.confirm
                    ({
                      title: '錯誤',
                      content: '請輸入確認密碼',
                      type: 'red',
                      buttons:
                      {
                        close: function() {}
                      }
                    })
                    return false;
                  }
                  else
                  {
                    $.ajax
                    ({
                      type: 'POST',
                      url: '/ajax/audit_lesson',
                      dataType: 'json',
                      async: false,
                      data:
                      {
                        password: password,
                        reason: success_reason,
                        result: 'success',
                        l_id: v.l_id
                      },
                      headers:
                      {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                      },
                      success: function(data)
                      {
                        if (data.status == 'fail')
                        {
                          $.confirm
                          ({
                            title: '錯誤',
                            content: '密碼錯誤',
                            type: 'red',
                            buttons:
                            {
                              close: function() {}
                            }
                          })
                        }
                        else if (data.status == 'success')
                        {
                          firebaseController.auditLesson(v.l_id, true, success_reason);
                          audit_lesson_overview._audit_end_init(v.l_name);
                        }
                        else { $.alert(data.status); }
                      },
                      error: function(xhr, type)
                      {
                        alert('Ajax error!');
                      }
                    })
                    return false;
                  }
                }
              },
              '突然猶豫了...':
              {
                btnClass: 'btn-dark',
                action: function() {}
              }
            }
          });
          return false;
        }
      },
      '不通過':
      {
        btnClass: 'btn-red',
        action: function()
        {
          $.confirm
          ({
            title: '確認不通過審核？',
            content:
            '<div>' +
              '<label>請輸入審核不通過理由</label>' +
              '<div class="form-group">' +
                '<input type="text" placeholder="不通過理由" class="fail_reason form-control" />' +
              '</div>' +
              '<div class="form-group">' +
                '<input type="password" placeholder="確認密碼" class="password form-control" />' +
              '</div>' +
            '</div>',
            buttons:
            {
              '只好放棄他了':
              {
                btnClass: 'btn-red',
                action: function ()
                {
                  fail_reason = this.$content.find('.fail_reason').val();
                  var password = this.$content.find('.password').val();
                  if (!fail_reason)
                  {
                    $.confirm
                    ({
                      title: '錯誤',
                      content: '請輸入不審核通過理由！',
                      type: 'red',
                      buttons:
                      {
                        close: function() {}
                      }
                    })
                    return false;
                  }
                  else if (!password)
                  {
                    $.confirm
                    ({
                      title: '錯誤',
                      content: '請輸入確認密碼',
                      type: 'red',
                      buttons:
                      {
                        close: function() {}
                      }
                    })
                    return false;
                  }
                  else
                  {
                    $.ajax
                    ({
                      type: 'POST',
                      url: '/ajax/audit_lesson',
                      dataType: 'json',
                      async: false,
                      data:
                      {
                        password: password,
                        reason: fail_reason,
                        result: 'fail',
                        l_id: v.l_id
                      },
                      headers:
                      {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                      },
                      success: function(data)
                      {
                        if (data.status == 'fail')
                        {
                          $.confirm
                          ({
                            title: '錯誤',
                            content: '密碼錯誤',
                            type: 'red',
                            buttons:
                            {
                              close: function() {}
                            }
                          })
                        }
                        else if (data.status == 'success')
                        {
                          firebaseController.auditLesson(v.l_id, false, fail_reason);
                          audit_lesson_overview._audit_end_init(v.l_name);
                        }
                        else { $.alert(data.status); }
                      },
                      error: function(xhr, type)
                      {
                        alert('Ajax error!');
                      }
                    })
                    return false;
                  }
                }
              },
              '突然猶豫了...':
              {
                btnClass: 'btn-dark',
                action: function() {}
              }
            }
          });
          return false;
        }
      },
      '我再考慮一下': function() {},
    }
  })
}
