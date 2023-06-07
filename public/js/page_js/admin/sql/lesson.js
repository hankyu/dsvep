var lesson_overview = (function()
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
            this._lesson_data;
            this._lesson_overview = $('#lesson_overview');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initial_lesson_table();
            objThis._get_lesson_list();
        },
        _initial_lesson_table: function()
        {
            //Initial Overview Table
            var objThis = this;
            var Table = objThis._lesson_overview.dataTable
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
            objThis._lesson_overview.fnClearTable();
        },
        _get_lesson_list: function()
        {
            //Get All lesson List Via Ajax
            var objThis = this;
            $.ajax
            ({
                type: 'get',
                url: '/ajax/get_all_lesson_data',
                success: function(data)
                {
                    var lesson_list = data.lesson_list;
                    objThis._set_lesson_list(lesson_list);
                    objThis._lesson_data = lesson_list;
                }
            })
        },
        _set_lesson_list: function(lesson_list)
        {
            //Use lesson Data To Structure Table
            var objThis = this;
            var _td;
            var _tr;
            objThis._lesson_overview.fnClearTable();
            $.each(lesson_list, function(i, v)
            {
                _tr = $('<tr />');
                _td_l_id = $('<td />', {'nowrap': 'nowrap', 'text': v.l_id});
                _td_l_name = $('<td />', {'nowrap': 'nowrap', 'text': v.l_name});
                _td_t_id = $('<td />', {'nowrap': 'nowrap', 'text': v.t_id});
                _td_type = $('<td />', {'nowrap': 'nowrap', 'text': v.type});
                _td_pub_situation = $('<td />', {'nowrap': 'nowrap', 'text': v.pub_situation});
                _td_delete_lesson = $('<td />', {'nowrap': 'nowrap', 'text': v.delete_lesson});
                _td_created_at = $('<td />', {'nowrap': 'nowrap', 'text': v.created_at});
                _td_updated_at = $('<td />', {'nowrap': 'nowrap', 'text': v.updated_at});
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
                        'onclick': '_check_lesson_data(' + i + ')'
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
                        'onclick': '_edit_lesson_data(' + i + ')'
                });
                _tr.append(_td_l_id);
                _tr.append(_td_l_name);
                _tr.append(_td_t_id);
                _tr.append(_td_type);
                _tr.append(_td_pub_situation);
                _tr.append(_td_delete_lesson);
                _tr.append(_td_created_at);
                _tr.append(_td_updated_at);
                _td_detail.append(_input_check);
                _tr.append(_td_detail);
                _td_operate.append(_input_edit);
                _tr.append(_td_operate);
                objThis._lesson_overview.fnAddData(_tr);
            })
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

var lesson_overview;
$(function()
{
    lesson_overview = new lesson_overview();
})

chinese =
[
    ' (編號)：', ' (開課講師)：', ' (課程名稱)：', ' (課程副標題)：', ' (課程描述)：',
    ' (課程類型)：', ' (封面圖檔)：', ' (課程圖影)：', ' (最低開班人數)：', ' (最高開班人數)：',
    ' (上課地點)：', ' (上課地點備註)：', ' (原價)：', ' (優惠價)：', ' (當前價格)：',
    ' (開始報名時間)：', ' (確定開班時間)：', ' (開始上課時間)：', ' (主題)：', ' (分類)：',
    ' (公開狀態)：', ' (行政是否編輯)：', ' (申請狀態)：', ' (審核理由)：', ' (審核人員)：',
    ' (審核時間)：', ' (取消開班)：', ' (是否下架課程)：', ' (建立時間)：', '(更新時間)：',
    '(下架課程時間)：'
];

function _check_lesson_data(id)
{
    data    = lesson_overview._lesson_data[id];
    content = '';
    num     = 0;

    $.each(data, function(index, val)
    {
        content += index + chinese[num] + data[index] + '<hr />';
        num++;
    });

    $.dialog
    ({
        title      : '課程 <span class="text-danger">' + data['l_name'] + '</span> 的詳細資料',
        content    : content,
        columnClass: 'large'
    });
}

function _edit_lesson_data(id)
{
    data           = lesson_overview._lesson_data[id];
    content        = '';
    num            = 0;
    disable_column =
    [
        'l_id', 't_id', 'type', 'cover', 'media',
        'start_fund', 'pub_situation', 'worker_edit', 'apply_situation', 'audit_reason',
        'audit_member', 'audit_time', 'created_at', 'updated_at', 'delete_lesson_at'
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
            main._get_edit_input(data['l_id'], index, data[index]) + main._get_edit_button(data['l_id'], index, 'lesson') + '</div>' + '<hr />';
        }
        num++;
    });

    $.dialog
    ({
        title      : '課程 <span class="text-danger">' + data['l_name'] + '</span> 的詳細資料',
        content    : content,
        columnClass: 'large'
    });
}
