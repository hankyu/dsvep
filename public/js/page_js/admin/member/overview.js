var member_overview = (function()
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
            this._member_data;
            this._member_overview = $('#member_overview');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initial_member_table();
            objThis._get_member_list();
        },
        _initial_member_table: function()
        {
            //Initial Overview Table
            var objThis = this;
            var Table = objThis._member_overview.dataTable
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
            $('#member_overview_length').addClass('col-sm-6');
            $('#member_overview_filter').addClass('col-sm-6');
            $('#member_overview_info').addClass('col-sm-6');
            $('#member_overview_paginate').addClass('col-sm-6');
            objThis._member_overview.fnClearTable();
        },
        _get_member_list: function()
        {
            //Get All Member List Via Ajax
            var objThis = this;

            $.ajax
            ({
                type: 'get',
                url: '/ajax/get_member_list',
                success: function(data)
                {
                    var member_list = data.member_list;
                    objThis._set_member_list(member_list);
                    objThis._member_data = member_list;
                }
            })
        },
        _set_member_list: function(member_list)
        {
            //Use Member Data To Structure Table
            var objThis = this;
            var _td;
            var _tr;
            objThis._member_overview.fnClearTable();
            $.each(member_list, function(i, v)
            {
                _tr = $('<tr />');
                _td_num = $('<td />', {'nowrap': 'nowrap', 'text': v.m_id});
                _td_account = $('<td />', {'nowrap': 'nowrap', 'text': v.account});
                _td_nickname = $('<td />', {'nowrap': 'nowrap', 'text': v.nickname});
                _td_sex = $('<td />', {'nowrap': 'nowrap', 'text': v.sex});
                _td_cellphone = $('<td />', {'nowrap': 'nowrap', 'text': v.cellphone});
                _td_email = $('<td />', {'nowrap': 'nowrap', 'text': v.email});
                _td_authority = $('<td />', {'nowrap': 'nowrap', 'text': objThis._change_real_authority(v.authority)});
                _td_auth_operate = $('<td / style="text-align: center">');
                _edit_auth_input =
                $(
                  '<label />',
                  {
                      'class': 'label btn-success',
                      'id': 'edit_auth_' + i,
                      'name': 'edit_auth_' + i,
                      'style': 'font-size: 90%; font-weight: 400;',
                      'text': '修改權限',
                      'onclick': '_edit_member_authority(' + i + ')'
                });
                _td_operate = $('<td / style="text-align: center">');
                _input =
                $(
                  '<label />',
                  {
                      'class': 'label btn-info',
                      'id': 'candidate_' + i,
                      'name': 'candidate_' + i,
                      'style': 'font-size: 90%; font-weight: 400;',
                      'text': '詳細資料',
                      'onclick': '_check_member_data(' + i + ')'
                });
                _tr.append(_td_num);
                _tr.append(_td_account);
                _tr.append(_td_nickname);
                _tr.append(_td_sex);
                _tr.append(_td_cellphone);
                _tr.append(_td_email);
                _tr.append(_td_authority);
                _td_auth_operate.append(_edit_auth_input);
                _tr.append(_td_auth_operate);
                _td_operate.append(_input);
                _tr.append(_td_operate);
                objThis._member_overview.fnAddData(_tr);
            })
        },
        _change_real_authority: function(authority)
        {
            //It Transform Code Will be change execute method to php
            if (authority == 'yoshocon') { return '網站管理員'; }
            else if (authority == 'saigo') { return '高級管理員'; }
            else if (authority == 'worker') { return '行政人員'; }
            else { return '一般會員'; }
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
        _check_empty: function(text)
        {
            //Check Profile Detail Data Is Empty
            if (text == null) { return '無'; }
            else { return text; }
        },
        _change_real_method: function(method)
        {
            if (method == 'web') { return '使用平台註冊'; }
            else { return method; }
        }
    }
    return _const;
}());

var member_overview;
$(function()
{
    member_overview = new member_overview();
})

function _check_member_data(i)
{
    // Show The Member Data Detail
    var member_list = member_overview._member_data[i];
    var avatar = member_list.avg_img == null ? 'avatar-vistor.png' : member_list.avg_img;
    $.dialog
    ({
        columnClass: 'medium',
        title: '<span style="color: #F0F">' + member_overview._escape_html_no_br('#' + (i + 1) + ' - ' + member_list.nickname) + '</span>的使用者資料!',
        containerFluid: true,
        content:
        '<input type="hidden" id="account_' + i + '" value="' + member_list.account + '">' +
        '<div class="img-wrapper">' +
          '<img src="/img/personal/avatar/' + avatar + '">' +
        '</div>' +
        '<div class="text-area">' +
            '<p>暱稱：' + member_overview._check_empty(member_list.nickname) + '</p>' +
            '<p>生日：' + member_overview._check_empty(member_list.birthday) + '</p>' +
            '<p>市話：' + member_overview._check_empty(member_list.telephone) + '</p>' +
            '<p>地址：' + member_overview._check_empty(member_list.address).replace(/-/g, '') + '</p>' +
            '<p>銀行代碼：' + member_overview._check_empty(member_list.bank_number).replace(/-/g, '') + '</p>' +
            '<p>銀行戶頭：' + member_overview._check_empty(member_list.account_number).replace(/-/g, '') + '</p>' +
            '<p>銀行戶名：' + member_overview._check_empty(member_list.account_name).replace(/-/g, '') + '</p>' +
            '<p>註冊方法：' + member_overview._change_real_method(member_list.reg_method) + '</p>' +
            '<p>FB連結：' + member_overview._check_empty(member_list.facebook_link) + '</p>' +
            '<p>Line ID：' + member_overview._check_empty(member_list.line_id) + '</p>' +
            '<p>建立帳號時間：' + member_list.created_at + '</p>' +
            '<p>最後更新時間：' + member_list.updated_at + '</p>' +
            '<p>email 已驗證：' +
                (
                    member_list.email_verify
                    ? '<i class="fas fa-check" style="color:green"></i>'
                    : '<i class="fas fa-times" style="color:red"></i>'
                ) +
            '</p>' +
            '<p>手機已驗證：' +
                (
                    member_list.cellphone_verify_status
                    ? '<i class="fas fa-check" style="color:green"></i>'
                    : '<i class="fas fa-times" style="color:red"></i>'
                ) +
            '</p>' +
        '</div>'
    });
}

function _edit_member_authority(i)
{
    // 修改使用者權限
    var member_list = member_overview._member_data[i];
    var avatar = member_list.avg_img == null ? 'avatar-vistor.png' : member_list.avg_img;

    if (member_list.authority == 'yoshocon')
    {
        $.confirm
        ({
            columnClass: 'small',
            title: '<span class="color-emphasized2">' + member_overview._escape_html_no_br(member_list.nickname) + '</span>的權限',
            content:
                '<input type="hidden" id="account_' + i + '" value="' + member_list.account + '">' +
                '<div class="img-avatar center">' +
                    '<img src="/img/personal/avatar/' + avatar + '">' +
                '</div>' +
                '<div class="center">' +
                    '<span><i class="fa fa-flag" aria-hidden="true"></i>最高權限</span>' +
                '</div>',
            buttons:
            {
              ok:
              {
                  text: 'OK',
                  btnClass: 'btn btn-blue',
              }
            }
        });
    }
    else
    {
        $.confirm
        ({
            columnClass: 'small',
            title: '<span class="color-emphasized2">' + member_overview._escape_html_no_br(member_list.nickname) + '</span>的權限',
            content:
                '<input type="hidden" id="account_' + i + '" value="' + member_list.account + '">' +
                '<div class="img-avatar center">' +
                    '<img src="/img/personal/avatar/' + avatar + '">' +
                '</div>' +
                '<div class="center">' +
                    '<span>修改權限：</span>' +
                    '<select id="member_auth_' + i +'">' +
                        '<option value="passers-by">一般會員</option>' +
                        '<option value="worker">行政人員</option>' +
                        '<option value="saigo">高級管理員</option>' +
                    '</select>' +
                '</div>' +
                '<script>' +
                    '$("#member_auth_' + i + '").val("' + member_list.authority + '");' +
                '</script>',
            buttons:
            {
                ok:
                {
                  text: '確定',
                  btnClass: 'btn btn-success',
                  action: function()
                  {
                      var authority = $('#member_auth_' + i).val();
                      var account = $('#account_' + i).val();
                      $.ajax
                      ({
                          type: 'POST',
                          url: '/ajax/changeAuthority',
                          dataType: 'json',
                          data:
                          {
                              authority: authority,
                              account: account,
                          },
                          headers:
                          {
                              'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                          },
                          success: function(message, status, xhr)
                          {
                              if (xhr.status === 200)
                              {
                                  $.confirm
                                  ({
                                      title: '成功',
                                      content: message,
                                      buttons:
                                      {
                                          '確認':
                                          {
                                              btnClass: 'btn-success',
                                              action: function() { member_overview._get_member_list(); }
                                          }
                                      }
                                  })
                              }
                              else { $.alert(message, '失敗'); }
                          },
                          error: function(xhr, type)
                          {
                              alert('Ajax error!');
                          }
                      })
                    }
                },
                cancle:
                {
                    text: '取消',
                    btnClass: 'btn btn-danger',
                }
            }
        });
    }
}
