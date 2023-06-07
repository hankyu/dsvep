var order_overview = (function()
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
            this._order_data;
            this._order_overview = $('#order_overview');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._get_order_list();
        },
        _get_order_list: function()
        {
            //Get All order List Via Ajax
            var objThis = this;
            $.ajax
            ({
                type: 'get',
                url: '/ajax/getAllOrderData',
                success: function(order_list)
                {
                    overviewTable.setData(order_list);
                    hashController.init(overviewTable.initHash);
                    objThis._order_data = order_list;
                }
            })
        },
    }
    return _const;
}());

var
    order_overview,
    overviewTable,
    hashController;

$(function()
{
    let
        columns,
        columnCustom,
        customize;


    hashController = hashBindController();
    columns = [
        {headTerm: '#', columnKey: 'id'},
        {headTerm: '訂單編號', columnKey: 'o_id', freeze: true},
        {headTerm: '購買人', columnKey: 'm_id'},
        {headTerm: '購買課程', columnKey: 'l_id'},
        {headTerm: '付款方法', columnKey: 'payment'},
        {headTerm: '結帳時間', columnKey: 'checkout_time'},
        {headTerm: '取消時間', columnKey: 'delete_time'},
        {headTerm: '查看', columnKey: '', freeze: true},
        {headTerm: '編輯', columnKey: '', freeze: true}
    ];

    columnCustom = [];
    columnCustom[7] = function(data, idx)
    {
        let
            d = data;

        let $btn = $('<button>', {class:'btn btn-info', type: 'button', text: '查看'}).on('click',function(){
            _check_order_data(d.id);
        });
        return $btn;
    }
    columnCustom[8] = function(data, idx)
    {
        let
            d = data;

        let $btn = $('<button>', {class:'btn btn-success', type: 'button', text: '編輯'}).on('click',function(){
            _edit_order_data(d.id);
        });
        return $btn;
    }
    customize = {
        container: '#overviewTableContainer',
        columnInfos: columns,
        rowPerPage: 10,
        hashController: hashController,
        noDataTerm: '無任何資料',
        columnCustomFn: columnCustom,
        rwdMode: 1,
        rowsPerPageOptions: [10, 20, 50],
        currRowsPerPageOptionsIdx: 0,
        searchTiming: 1,
        searchCaseSensitive: 0
    };
    overviewTable = rwdHashTableModule(customize);

    order_overview = new order_overview();
})


const chinese =
[
    '(編號)：', '(訂單編號)：', '(會員編號)：', '(課程編號)：', '(付款金額)：',
    '(退款金額)：', '(付款方法)：', '(下訂時間)：', '(取消時間)：', '(結帳時間)：',
    '(發票狀態)：', '(發票載具)：', '(發票號碼)：', '(發票隨機碼)：', '(發票作廢)：',
    '(過期時間)：', '(退費時間)：', '(申請退費)：', '(取消開班信)：', '(通知上課信)：',
    '(收款人員)：', '(退款人員)：', '(退款理由)：', '(退款限制)：', '(備註)：', '(備註人)：', '(備註時間)：'
    , '(建立時間)：', '(更新時間)：'
];

function _check_order_data(id)
{
    data = order_overview._order_data.find(o =>
    {
        return o.id == id;
    });

    content = '';
    num     = 0;

    $.each(data, function(index, val)
    {
        content += index + chinese[num] + data[index] + '<hr />';
        num++;
    });

    $.dialog
    ({
        title      : '訂單 <span class="text-danger">' + data['o_id'] + '</span> 的詳細資料',
        content    : content,
        columnClass: 'large'
    });
}

function _edit_order_data(id)
{   
    data = order_overview._order_data.find(o =>
    {
        return o.id == id;
    });
    content        = '';
    num            = 0;
    disable_column =
    [
        'id', 'o_id', 'm_id', 'l_id', 'order_time',
        'receipt', 'receipt_number', 'receipt_rand_number', 'cancel_email', 'notice_mail',
        'created_at', 'updated_at', 'restrict'
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
            main._get_edit_input(data['id'], index, data[index]) + main._get_edit_button(data['id'], index, 'order') + '</div>' + '<hr />';
        }
        num++;
    });

    $.dialog
    ({
        title      : '訂單 <span class="text-danger">' + data['o_id'] + '</span> 的詳細資料',
        content    : content,
        columnClass: 'large'
    });
}
