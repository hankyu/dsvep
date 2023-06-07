var browse_overview = (function()
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
            this._browse_data;
            this._browse_overview = $('#browse_overview');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initial_browse_table();
            objThis._get_browse_list();
        },
        _initial_browse_table: function()
        {
            //Initial Overview Table
            var objThis = this;
            var Table = objThis._browse_overview.dataTable
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
            objThis._browse_overview.fnClearTable();
            setInterval('browse_overview._get_browse_list()', 60000)
        },
        _get_browse_list: function()
        {
            //Get All browse List Via Ajax
            var objThis = this;
            $.ajax
            ({
                type: 'get',
                url: '/ajax/get_browse_list',
                success: function(data)
                {
                    var browse_list = data.browse_list;
                    objThis._set_browse_list(browse_list);
                    objThis._browse_data = browse_list;
                }
            })
        },
        _set_browse_list: function(browse_list)
        {
            //Use browse Data To Structure Table
            var objThis = this;
            var _td;
            var _tr;
            objThis._browse_overview.fnClearTable();
            $.each(browse_list, function(i, v)
            {
                if (v.count > 5)
                {
                    _tr = $('<tr />');
                    _td_id = $('<td />', {'nowrap': 'nowrap', 'text': i + 1});
                    _td_from= $('<td />', {'nowrap': 'nowrap', 'text': v.from});
                    _td_count = $('<td />', {'nowrap': 'nowrap', 'text': v.count});
                    _td_last = $('<td />', {'nowrap': 'nowrap', 'text': v.last});
                    _td_detail = $('<td / style="text-align: center">');
                    _detail_input =
                    $(
                        '<label />',
                        {
                          'class': 'label btn-info',
                          'id': 'edit_auth_' + i,
                          'name': 'edit_auth_' + i,
                          'style': 'font-size: 90%; font-weight: 400;',
                          'text': '查看更多',
                          'onclick': '_check_datail(`' + v.from + '`)'
                    });
                    _tr.append(_td_id);
                    _tr.append(_td_from);
                    _tr.append(_td_count);
                    _tr.append(_td_last);
                    _td_detail.append(_detail_input)
                    _tr.append(_td_detail);
                    objThis._browse_overview.fnAddData(_tr);
                }
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

var browse_overview;
$(function()
{
    browse_overview = new browse_overview();
})

function _check_datail(id)
{
    var content = '';
    var data    = browse_overview._browse_data.find((n) => n.from == id);
    var table   = '<table class="table table-bordered table-condensed table-striped" style="max-height: 90vh; overflow: scroll">';
    var detail  = '<tr>' +
                    '<td>編號</td>' +
                    '<td>瀏覽人</td>' +
                    '<td>IP</td>' +
                    '<td>瀏覽頁面</td>' +
                    '<td>瀏覽時間</td>' +
                  '</tr>';

    for (i = 0; i < data.record.length; i++)
    {
        detail += '<tr>';
        detail += '<td>' + data.record[i]['id'] + '</td>';
        detail += '<td>' + data.record[i]['m_id'] + '</td>';
        detail += '<td>' + data.record[i]['ip'] + '</td>';
        detail += '<td>' + data.record[i]['route'] + '</td>';
        detail += '<td>' + data.record[i]['created_at'] + '</td>';
        detail += '</tr>';
    }

    $.dialog
    ({
        title: data.from,
        content: content = '<div>' + table + detail + '</table></div>',
        columnClass: 'l',
        containerFluid: true,
    })
}
