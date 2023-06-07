var event_overview = (function()
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
          this._btn_event = $('#btn_event');
          this._event_data;
          this._event_overview = $('#event_overview');
          this._start();
      },
      _start: function()
      {
          var objThis = this;
          objThis._initialAll();
          objThis._initial_event_table();
          objThis._get_event_list();
      },
      _initialAll: function()
      {
          this._btn_event.on('click', $.proxy(function()
          {
              $.confirm
              ({
                  title: '新增不參與活動名單',
                  content:
                    '<div class="form-group">' +
                      '<input class="form-control" id="event_code" placeholder="請輸入活動代號">' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<input class="form-control" id="event_lesson" placeholder="請輸入不參與的課程編號">' +
                    '</div>',
                  buttons:
                  {
                      'ok':
                      {
                          text: '新增',
                          btnClass: 'btn-success',
                          action: function()
                          {
                              event_code   = this.$content.find('#event_code').val();
                              event_lesson = this.$content.find('#event_lesson').val();

                              if (event_code == '')
                              {
                                  $.alert('請輸入活動代號', '錯誤');
                                  return false;
                              }
                              else if (event_lesson == '')
                              {
                                  $.alert('請輸入課程編號', '錯誤');
                                  return false;
                              }
                              else
                              {
                                  $.ajax
                                  ({
                                      type: 'POST',
                                      url: '/ajax/add_event',
                                      dataType: 'json',
                                      data:
                                      {
                                          event_code: event_code,
                                          event_lesson: event_lesson
                                      },
                                      headers:
                                      {
                                          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                      },
                                      success: function(data)
                                      {
                                          if (data.status == true)
                                          {
                                              $.confirm
                                              ({
                                                  title: '成功',
                                                  content: '新增完成',
                                                  buttons:
                                                  {
                                                     '確認':
                                                     {
                                                        btnClass: 'btn-success',
                                                        action: function()
                                                        {
                                                            event_overview._end_init();
                                                        }
                                                     }
                                                  }
                                              });
                                          }
                                          else
                                          {
                                              $.alert(data.status, '錯誤');
                                              return false;
                                          }
                                      },
                                      error: function(xhr, type)
                                      {
                                          $.alert('不明原因錯誤', '錯誤');
                                      }
                                  })
                              }
                          }
                      },
                      'no':
                      {
                          text: '取消',
                          btnClass: 'btn-red',
                          action: function() {}
                      }
                  }
              });
          }, this))
      },
      _initial_event_table: function()
      {
          //Initial Overview Table
          var objThis = this;
          var Table   = objThis._event_overview.dataTable
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
          objThis._event_overview.fnClearTable();
      },
      _get_event_list: function()
      {
          //Get All event List Via Ajax
          var objThis = this;
          $.ajax
          ({
              type: 'get',
              url: '/ajax/get_event_list',
              success: function(data)
              {
                  var event_list = data.event_list;
                  objThis._set_event_list(event_list);
                  objThis._event_data = event_list;
              }
          })
      },
      _set_event_list: function(event_list)
      {
          //Use event Data To Structure Table
          var objThis = this;
          var _td;
          var _tr;
          objThis._event_overview.fnClearTable();
          $.each(event_list, function(i, v)
          {
              _tr = $('<tr />');
              _td_e_id = $('<td />', {'nowrap': 'nowrap', 'text': v.e_id});
              _td_code = $('<td />', {'nowrap': 'nowrap', 'text': v.code});
              _td_except = $('<td />', {'nowrap': 'nowrap', 'text': v.except});
              _td_l_name = $('<td />', {'nowrap': 'nowrap', 'text': v.l_name});
              _td_create_time = $('<td />', {'nowrap': 'nowrap', 'text': v.created_at});
              _td_event_operate = $('<td / style="text-align: center">');
              _edit_event_input =
              $(
                  '<label />',
                  {
                    'class': 'label btn-danger',
                    'id': 'event_delete_' + i,
                    'name': 'event_delete_' + i,
                    'style': 'font-size: 90%; font-weight: 400;',
                    'text': '刪除',
                    'onclick': '_event_delete("' + i + '", ' + v.except + ', "' + v.code + '")'
              });
              _tr.append(_td_e_id);
              _tr.append(_td_code);
              _tr.append(_td_except);
              _tr.append(_td_l_name);
              _tr.append(_td_create_time);
              _td_event_operate.append(_edit_event_input);
              _tr.append(_td_event_operate);
              objThis._event_overview.fnAddData(_tr);
          })
          $('#event_overview_length').addClass('col-sm-6');
          $('#event_overview_filter').addClass('col-sm-6');
          $('#event_overview_info').addClass('col-sm-6');
          $('#event_overview_paginate').addClass('col-sm-6');
      },
      _end_init: function(l_name)
      {
          $('.jconfirm').hide();
          this._get_event_list()
      }
    }
    return _const;
}());

var event_overview;
$(function()
{
    event_overview = new event_overview();
})

function _event_delete(i, id, code)
{
    event_code   = event_overview._event_data[i][id];
    event_lesson = event_overview._event_data[i][code];

    $.confirm
    ({
        title: '確認',
        content: '確定要將 <span class="color-emphasized2">' + id + '</span> 的課程取消參與 <span class="color-emphasized2">' + code + '</span> 的活動嗎？',
        buttons:
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/delete_event',
                        type: 'delete',
                        dataType: 'json',
                        async: false,
                        data:
                        {
                            event_code: code,
                            event_lesson: id
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success: function(data)
                        {
                            if (data.status == 'success')
                            {
                                $.confirm
                                ({
                                    title: '成功',
                                    content: '刪除完成',
                                    buttons:
                                    {
                                       '確認':
                                       {
                                          btnClass: 'btn-success',
                                          action: function()
                                          {
                                              event_overview._end_init();
                                          }
                                       }
                                    }
                                });
                            }
                            else
                            {
                                $.alert('不明原因錯誤', '錯誤');
                                return false;
                            }
                        },
                        error: function(xhr, type)
                        {
                          $.alert('不明原因錯誤', '錯誤');
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
