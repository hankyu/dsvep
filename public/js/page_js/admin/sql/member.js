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
                _td_m_id = $('<td />', {'nowrap': 'nowrap', 'text': v.m_id});
                _td_account = $('<td />', {'nowrap': 'nowrap', 'text': v.account});
                _td_m_name = $('<td />', {'nowrap': 'nowrap', 'text': v.m_name});
                _td_cellphone = $('<td />', {'nowrap': 'nowrap', 'text': v.cellphone});
                _td_email = $('<td />', {'nowrap': 'nowrap', 'text': v.email});
                _td_authority = $('<td />', {'nowrap': 'nowrap', 'text': v.authority});
                _td_last_online_time = $('<td />', {'nowrap': 'nowrap', 'text': v.last_online_time});
                _td_detail = $('<td / style="text-align: center">');
                _input_check =
                $(
                    '<label />',
                    {
                        'class': 'label btn-success',
                        'id': 'candidate_' + i,
                        'name': 'candidate_' + i,
                        'style': 'font-size: 90%; font-weight: 400;',
                        'text': '詳細資料',
                        'onclick': '_check_member_data(' + i + ')'
                });
                _td_operate = $('<td / style="text-align: center">');
                _input_edit =
                $(
                    '<label />',
                    {
                        'class': 'label btn-info',
                        'id': 'candidate_' + i,
                        'name': 'candidate_' + i,
                        'style': 'font-size: 90%; font-weight: 400;',
                        'text': '編輯資料',
                        'onclick': '_edit_member_data(' + i + ')'
                });
                _tr.append(_td_m_id);
                _tr.append(_td_account);
                _tr.append(_td_m_name);
                _tr.append(_td_cellphone);
                _tr.append(_td_email);
                _tr.append(_td_authority);
                _tr.append(_td_last_online_time);
                _td_detail.append(_input_check);
                _tr.append(_td_detail);
                _td_operate.append(_input_edit);
                _tr.append(_td_operate);
                objThis._member_overview.fnAddData(_tr);
            })
            $('#member_overview_length').addClass('col-sm-6');
            $('#member_overview_filter').addClass('col-sm-6');
            $('#member_overview_info').addClass('col-sm-6');
            $('#member_overview_paginate').addClass('col-sm-6');
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
        }
    }
    return _const;
}());

var member_overview;
$(function()
{
    member_overview = new member_overview();
})

chinese =
[
    ' (編號)：', ' (帳號)：', ' (密碼)：', ' (本名)：', ' (權限)：',
    ' (暱稱)：', ' (身分證)：', ' (性別)：', ' (生日)：', ' (電話號碼)：',
    ' (手機號碼)：', ' (地址)：', ' (信箱)：', ' (註冊方法)：', ' (大頭照檔名)：',
    ' (FB連結)：', ' (Line的ID)：', ' (手機載具)：', ' (自然人憑證載具)：', ' (愛心碼)：',
    ' (公司統編)：', ' (公司抬頭)：', ' (銀行代碼)：', ' (分行代碼)：', ' (銀行帳號)：',
    ' (帳戶名字)：', ' (驗證碼)：', ' (驗證狀態)：', ' (記住帳號碼)：', ' (註冊時間)：',
    ' (更新時間)：', ' (最後上線時間)：'
];

function _check_member_data(id)
{
    data    = member_overview._member_data[id];
    content = '';
    num     = 0;

    $.each(data, function(index, val)
    {
        content += index + chinese[num] + data[index] + '<hr />';
        num++;
    });

    $.dialog
    ({
        title      : '帳號 <span class="text-danger">' + data['m_name'] + '</span> 的詳細資料',
        content    : content,
        columnClass: 'large'
    });
}

function _edit_member_data(id)
{
    data           = member_overview._member_data[id];
    content        = '';
    num            = 0;
    disable_column =
    [
        'm_id', 'account', 'password', 'id_code', 'reg_method',
        'avg_img', 'email_verify_code', 'email_verify', 'created_at', 'updated_at',
        'last_online_time', 'authority', 'remember_token'
    ];

    $.each(data, function(index, val)
    {
        if (disable_column.indexOf(index) != '-1')
        {
            content += index + chinese[num] + data[index] + '<hr />';
        }
        else
        {
            content += index + chinese[num] + '<div class="row">' +
            main._get_edit_input(data['m_id'], index, data[index]) + main._get_edit_button(data['m_id'], index, 'member') + '</div>' + '<hr />';
        }
        num++;
    });

    $.dialog
    ({
        title      : '帳號 <span class="text-danger">' + data['m_name'] + '</span> 的詳細資料',
        content    : content,
        columnClass: 'large'
    });
}
