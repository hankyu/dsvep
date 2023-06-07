var audit_teacher_overview = (function()
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
      this._teachers_data;
      this._members_data;
      this._audit_teacher_overview = $('#audit_teacher_overview');
      this._loading = $('#loading');
      this._no_item = $('#no_item');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      this._loading.hide();
      this._no_item.hide();
      objThis._initial_audit_teacher_table();
      objThis._get_audit_teacher_list();
    },
    _initial_audit_teacher_table: function()
    {
      //Initial Overview Table
      var objThis = this;
      var Table = objThis._audit_teacher_overview.dataTable
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
      objThis._audit_teacher_overview.fnClearTable();
    },
    _get_audit_teacher_list: function()
    {
      //Get All Audit Teacher List Via Ajax
      var objThis = this;
      $.ajax
      ({
        type: 'get',
        url: '/ajax/get_audit_teacher_list',
        success: function(data)
        {
          var teacher_list = data.teacher_list;
          var member_list = data.member_list;
          objThis._set_audit_teacher_list(teacher_list, member_list);
          objThis._teachers_data = teacher_list;
          objThis._members_data = member_list;
        }
      })
    },
    _set_audit_teacher_list: function(teacher_list, member_list)
    {
      //Use Teacher Data And Member Data To Structure Table
      var objThis = this;
      var _td;
      var _tr;
      teacher_list_data = teacher_list;
      objThis._audit_teacher_overview.fnClearTable();
      if (teacher_list != '')
      {
        $.each(member_list, function(i, v)
        {
          $.each(teacher_list, function(j, v2)
          {
            if (member_list[i]['m_id'] == teacher_list[j]['m_id'])
            {
              _tr = $('<tr />');
              _td_num = $('<td />', {'nowrap': 'nowrap', 'text': (i + 1)});
              _td_name = $('<td />', {'nowrap': 'nowrap', 'text': v.m_name});
              _td_nickname = $('<td />', {'nowrap': 'nowrap', 'text': v.nickname});
              _td_sex = $('<td />', {'nowrap': 'nowrap', 'text': v.sex});
              _td_cellphone = $('<td />', {'nowrap': 'nowrap', 'text': v.cellphone});
              _td_email = $('<td />', {'nowrap': 'nowrap', 'text': v.email});
              _td_operate = $('<td / style="text-align: center">');
              _input =
              $(
                '<label />' ,
                {
                  'class': 'label btn-info',
                  'id': 'candidate_' + i,
                  'name': 'candidate_' + i,
                  'style': 'font-size: 90%; font-weight: 400;',
                  'text': '詳細資料',
                  'onclick': '_check_teacher(' + v.m_id + ')',
                }
              );
              _tr.append(_td_num);
              _tr.append(_td_name);
              _tr.append(_td_nickname);
              _tr.append(_td_sex);
              _tr.append(_td_cellphone);
              _tr.append(_td_email);
              _td_operate.append(_input);
              _tr.append(_td_operate);
              objThis._audit_teacher_overview.fnAddData(_tr);
            }
          })
        })
      }
      $('#audit_teacher_overview_length').addClass('col-sm-6');
      $('#audit_teacher_overview_filter').addClass('col-sm-6');
      $('#audit_teacher_overview_info').addClass('col-sm-6');
      $('#audit_teacher_overview_paginate').addClass('col-sm-6');
    },
    _escape_html: function(text)
    {
      //Transform Escape Char to Encode Char
      var map =
      {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      };
      
      text=text?text:''
      text_split_br = text.split('\n');
      text_convert_br_to_newline = '';
      for (var row in text_split_br)
      {
        text_split_br[row] = text_split_br[row].trim();
        if (text_split_br[row] == '<br />') { text_split_br[row] = ''; }
        else
        {
          if (text_split_br[row].substr(text_split_br[row].length - 6, text_split_br[row].length - 1) == '<br />')
          {
            if (text_split_br[row].length != 6)
            {
              text_split_br[row] = text_split_br[row].substr(0, text_split_br[row].length - 6);
            }
            else { text_split_br[row] = ''; }
          }
        }
      }
      text_convert_br_to_newline = text_split_br.join('\n');
      text_convert_br_to_newline = text_convert_br_to_newline.replace(/[&<>"']/g, function(m) { return map[m]; });
      return text_convert_br_to_newline;
    },
    _escape_html_no_br: function(text)
    {
      //Transform Escape Char to Encode Char Besides New Line Char
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
    _audit_end_init: function(account)
    {
      //After Audit Teacher, Page Will Show Notice And Auto Refresh Table List
      $('.jconfirm').hide();
      this._get_audit_teacher_list()
      $.alert('<span class="color-emphasized2">' + account + '</span>的審核已經完成了', '完成！')
    }
  }
  return _const;
}());

var audit_teacher_overview;
$(function()
{
  audit_teacher_overview = new audit_teacher_overview();
})

function _check_teacher(m_id)
{
  var _teachers_data = audit_teacher_overview._teachers_data.find((n) => n.m_id == m_id);
  var _members_data = audit_teacher_overview._members_data.find((n) => n.m_id == m_id);
  var i = m_id;

  //Put Education Data
  var education =
    '<span style="color: red; font-size: 20px">學歷</span>' + '<br>' +
    '<table class="table table-bordered table-condensed table-striped">' +
      '<tr>' +
        '<td width="20%">學校</td>' +
        '<td>' + audit_teacher_overview._escape_html_no_br(_teachers_data.edu_school) + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td>科系</td>' +
        '<td>' + audit_teacher_overview._escape_html_no_br(_teachers_data.edu_dapartment) + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td>學位</td>' +
        '<td>' + audit_teacher_overview._escape_html_no_br(_teachers_data.edu_degree) + '</td>' +
      '</tr>' +
    '</table>';

  //Put Introduce Data
  var introduce = _teachers_data.intro_link != null
  ? '<span style="color: red; font-size: 20px">自我介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.intro_exp) + '</p>' +
    '<a href="' + _teachers_data.intro_link + '">相關連結</a>' + '<br>'
  : '<span style="color: red; font-size: 20px">自我介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.intro_exp) + '</p>';

  //Put Works Data
  var works = _teachers_data.works_link != null
  ? '<span style="color: red; font-size: 20px">作品介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.works_exp) + '</p>' +
    '<a href="' + _teachers_data.works_link + '">相關連結</a>' + '<br>'
  : '<span style="color: red; font-size: 20px">作品介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.works_exp) + '</p>';

  //Put books Data
  var books = _teachers_data.book_exp == ''
  ? ''
  : '<span style="color: red; font-size: 20px">著作介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.book_exp) + '</p>' +
    '<div id="book_' + i + '" data-book' + i + '="' + _teachers_data.book_link + '">' +
      '<a href="' + _teachers_data.book_link + '">相關連結</a>' + '<br>' +
    '</div>';

  //Put Certificates Data
  var certificates = _teachers_data.certificate_exp == ''
  ? ''
  : '<span style="color: red; font-size: 20px">證書介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.certificate_exp) + '</p>' +
    '<div id="certificate_' + i + '" data-certificate_' + i + '="' + _teachers_data.certificate_link + '">' +
      '<a href="' + _teachers_data.certificate_link + '">相關連結</a>' + '<br>' +
    '</div>';

  //Put Awards Data
  var awards = _teachers_data.awards_exp == ''
  ? ''
  : '<span style="color: red; font-size: 20px">獎項介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.awards_exp) + '</p>' +
    '<div id="awards_' + i + '" data-awards_' + i + '="' + _teachers_data.awards_link + '">' +
      '<a href="' + _teachers_data.awards_link + '">相關連結</a>' + '<br>' +
    '</div>';

  //Put Reports Data
  var reports = _teachers_data.repo_exp == ''
  ? ''
  : '<span style="color: red; font-size: 20px">報導介紹</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.repo_exp) + '</p>' +
    '<div id="repo_' + i + '" data-repo_' + i + '="' + _teachers_data.repo_link + '">' +
      '<a href="' + _teachers_data.repo_link + '">相關連結</a>' + '<br>' +
    '</div>';

  //Put Published Data
  var published = _teachers_data.pub_exp == ''
  ? ''
  : '<span style="color: red; font-size: 20px">公開發表</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.pub_exp) + '</p>' +
    '<div id="pub_' + i + '" data-pub_' + i + '="' + _teachers_data.pub_link + '">' +
      '<a href="' + _teachers_data.pub_link + '">相關連結</a>' + '<br>' +
    '</div>';

  //Put Teach Data
  var teach =
    '<span style="color: red; font-size: 20px">可授課類型</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.teach_type) + '</p>' +
    '<span style="color: red; font-size: 20px">授課經驗</span>' + '<br>' +
    '<p>' + audit_teacher_overview._escape_html(_teachers_data.teach_exp) + '</p>';

  //If Data Is Empty Will Not Be Display
  var script =
    '<script>' +
      'if ($("#book_" + ' + i + ').data("book_" + ' + i + ')==null) {$("#book_" + ' + i + ').css("display", "none");}' +
      'if ($("#certificate_" + ' + i + ').data("certificate_" + ' + i + ')==null) {$("#certificate_" + ' + i + ').css("display", "none");}' +
      'if ($("#awards_" + ' + i + ').data("awards_" + ' + i + ')==null) {$("#awards_" + ' + i + ').css("display", "none");}' +
      'if ($("#repo_" + ' + i + ').data("repo_" + ' + i + ')==null) {$("#repo_" + ' + i + ').css("display", "none");}' +
      'if ($("#pub_" + ' + i + ').data("pub_" + ' + i + ')==null) {$("#pub_" + ' + i + ').css("display", "none");}' +
    '</script>';

  $.confirm
  ({
    columnClass: 'medium',
    title: '<span style="color: #F0F">' +  audit_teacher_overview._escape_html_no_br(_members_data.m_name) + '</span>的申請資訊!',
    containerFluid: true,
    content:
    //Put Ajax Need Data In Hidden
    '<input type="hidden" id="account_' + i + '" value="' + _members_data.account + '">' +
    '<input type="hidden" id="m_id_' + i + '" value="' + _members_data.m_id + '">' +
    '<div class="center">' +
      '<img src="/img/personal/avatar/' + _members_data.avg_img + '">' +
    '</div>' +
    education + introduce + works + books + certificates +
    awards + reports + published + teach + script,
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
                  var success_reason = this.$content.find('.success_reason').val();
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
                      url: '/ajax/audit_teacher',
                      dataType: 'json',
                      async: false,
                      data:
                      {
                        password: password,
                        reason: success_reason,
                        result: 'success',
                        m_id: $('#m_id_' + i).val()
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
                          firebaseController.auditTeacher($('#account_' + i).val(), success_reason, true);
                          audit_teacher_overview._audit_end_init($('#account_' + i).val());
                        }
                        else
                        {
                          $.alert(data.status);
                        }
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
      '拒絕':
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
                  var fail_reason = this.$content.find('.fail_reason').val();
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
                      url: '/ajax/audit_teacher',
                      dataType: 'json',
                      async: false,
                      data:
                      {
                        password: password,
                        reason: fail_reason,
                        result: 'fail',
                        m_id: $('#m_id_' + i).val()
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
                          firebaseController.auditTeacher($('#account_' + i).val(), fail_reason, false);
                          audit_teacher_overview._audit_end_init($('#account_' + i).val());
                        }
                        else
                        {
                          $.alert(data.status);
                        }
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
  });
}
