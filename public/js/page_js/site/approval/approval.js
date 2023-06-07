var approval_overview = (function()
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
            this._approval_data;
            this._approval_overview = $('#approval_overview');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._get_approval_list();
            objThis._initAll();
        },
        _get_approval_list: function()
        {
            //Get All approval List Via Ajax
            var objThis = this;
            $.ajax
            ({
                type: 'get',
                url: '/ajax/get_approval_list',
                success: function(data)
                {
                    var approval_list = data.approval_list;
                    overviewTable.setData(approval_list);
                    hashController.init(overviewTable.initHash);
                    objThis._approval_data = approval_list;
                }
            })
        },
        _initAll: function()
        {
            this._order_search = $('#order_search');

            $('#order_search').on('click', $.proxy(function()
            {
                $.confirm
                ({
                    title: '請輸入訂單編號',
                    content:  '<input type="text" id="order_id" class="form-control" placeholder="訂單編號" autofocus>' +
                              '<script>' +
                                  '$("#order_id").on("keyup", $.proxy(function(e)' +
                                  '{' +
                                      'var code = (e.keyCode ? e.keyCode : e.which);' +
                                      'if (code == 13){ $(".order-search").click(); }' +
                                  '}, this));' +
                              '</script>',
                    buttons:
                    {
                        '查詢':
                        {
                            btnClass: 'btn-success order-search',
                            action: function()
                            {
                                var order_id = this.$content.find('#order_id').val();

                                $.ajax
                                ({
                                    url: '/ajax/searchOrderData',
                                    type: 'post',
                                    dataType: 'json',
                                    data:
                                    {
                                        order_id: order_id
                                    },
                                    headers:
                                    {
                                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                    },
                                    success: function(data)
                                    {
                                        approval_overview._create_order_search_table(data.order_data, order_id);
                                    },
                                    error: function(e)
                                    {
                                        layout._request_relogin()
                                    }
                                })
                            }
                        },
                        '關閉':
                        {
                            btnClass: 'btn-red',
                            action: function() {}
                        }
                    }
                })
            }, this))

            $('#expire_search').on('click', $.proxy(function()
            {
                location.href = '/approval/expire'
            }, this))

            $('#member_search').on('click', $.proxy(function()
            {
                $.confirm
                ({
                    title: '查詢學生購買歷程',
                    content: '<p><select id="search_mode" class="form-control">' +
                                '<option value="cellphone">手機</option>' +
                                '<option value="account">帳號</option>' +
                                '<option value="email">信箱</option>' +
                             '</select></p>' +
                             '<input id="search_data" class="form-control" placeholder="學員資料">',
                    buttons:
                    {
                        '查詢':
                        {
                            btnClass: 'btn-success',
                            action: function()
                            {
                                var search_mode = this.$content.find('#search_mode').val();
                                var search_data = this.$content.find('#search_data').val();

                                if (search_data == '')
                                {
                                    $.alert('請輸入查詢資料', '錯誤');
                                    return false;
                                }
                                else
                                {
                                    $.ajax
                                    ({
                                        url: '/ajax/searchMemberPurchaseHistory',
                                        type: 'post',
                                        dataType: 'json',
                                        data:
                                        {
                                            search_mode: search_mode,
                                            search_data: search_data
                                        },
                                        headers:
                                        {
                                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                        },
                                        success: function(data)
                                        {
                                            if (data.order_data == 'no data')
                                            {
                                                $.alert('查無資料', '錯誤');
                                                return false;
                                            }
                                            else
                                            {
                                                approval_overview._create_order_search_table(data.order_data, search_data);
                                            }
                                        },
                                        error: function(e)
                                        {
                                            layout._request_relogin()
                                        }
                                    })
                                }
                            }
                        },
                        '關閉':
                        {
                            btnClass: 'btn-red',
                            action: function() {}
                        }
                    }
                })
            }, this))
        },
        _create_order_search_table: function(data, title)
        {
            if (data == '') { $.alert('查無資料', '錯誤'); }
            else
            {
                var icon        = '<i class="fa fa-question-circle padding-left-5 icon-pop" data-container="body" data-toggle="popover" data-html="true" data-placement="top" data-content=';
                var price_icon  = '';
                var refund_icon = '';
                var bank_icon   = '';
                var table       = '<table class="table table-bordered table-condensed table-striped" style="max-height: 90vh; overflow: scroll" id="' + data['hash'] + '">';
                var order_data  = '<thead><tr>' +
                                       '<td>購買人<i class="fa fa-sort icon"></i></td>' +
                                       '<td>聯絡電話<i class="fa fa-sort icon"></i></td>' +
                                       '<td>課程<i class="fa fa-sort icon"></i></td>' +
                                       '<td>講師<i class="fa fa-sort icon"></i></td>' +
                                       '<td>地區<i class="fa fa-sort icon"></i></td>' +
                                       '<td>截止時間<i class="fa fa-sort icon"></i></td>' +
                                       '<td>開課時間<i class="fa fa-sort icon"></i></td>' +
                                       '<td>付款方法<i class="fa fa-sort icon"></i></td>' +
                                       '<td>下訂時間<i class="fa fa-sort icon"></i></td>' +
                                       '<td>購買時間<i class="fa fa-sort icon"></i></td>' +
                                       '<td>取消時間<i class="fa fa-sort icon"></i></td>' +
                                       '<td>退費時間<i class="fa fa-sort icon"></i></td>' +
                                       '<td>收額<i class="fa fa-sort icon"></i></td>' +
                                       '<td>退額<i class="fa fa-sort icon"></i></td>' +
                                       '<td>可否退費<i class="fa fa-sort icon"></i></td>' +
                                       '<td>發票號碼<i class="fa fa-sort icon"></i></td>' +
                                       '<td>備註<i class="fa fa-sort icon"></i></td>' +
                                       '<td>費用處理<i class="fa fa-sort icon"></i></td>' +
                                       '<td>發票作廢<i class="fa fa-sort icon"></i></td>' +
                                   '</tr></thead><tbody>';

                $.each(data, function(index, value)
                {
                    if (value['id'] != undefined)
                    {
                        if (value['price'] != '尚未付款') { price_icon = icon + '"收款人：' + value['payee'] + '"></i>'; }

                        if (value['refund_price'] != '') { refund_icon = icon + '"退款人：' + value['refund_payee'] + '<br>退款理由：' + value['refund_reason'] + '"></i>'; }

                        if (value['bank_data'] != null)
                        {
                            bank_icon = icon + '"銀行代碼：' + value['bank_data']['bank'] + '<br />'
                                             + '銀行帳號：' + value['bank_data']['account'] + '<br />'
                                             + '銀行戶名：' + value['bank_data']['name'] + '"></i>';
                        }

                        email_icon = icon + '"信箱：' + value['email'] + '"></i>'
                        order_data += '<tr>';
                        order_data += '<td>' + value['buyer'] + bank_icon + '</td>';
                        order_data += '<td>' + value['phone'] + email_icon + '</td>';
                        order_data += '<td>' + value['l_name'] + '</td>';
                        order_data += '<td>' + value['t_name'] + '</td>';
                        order_data += '<td>' + value['area'] + '</td>';
                        order_data += '<td>' + value['end_fund'] + '</td>';
                        order_data += '<td>' + value['start_time'] + '</td>';
                        order_data += '<td>' + value['payment'] + '</td>';
                        order_data += '<td>' + value['order'] + '</td>';
                        order_data += '<td>' + value['checkout'] + '</td>';
                        order_data += '<td>' + value['cancel'] + '</td>';
                        order_data += '<td>' + value['refund'] + '</td>';
                        order_data += '<td>' + value['price'] + price_icon + '</td>';
                        order_data += '<td>' + value['refund_price'] + refund_icon + '</td>';
                        order_data += '<td>' + value['restrict'] + '</td>';

                        if (value['receipt'] != '')
                        {
                            if (value['receipt_abort'] == true) { order_data += '<td>' + value['receipt'] + '</td>'; }
                            else
                            {
                                order_data += '<td>' + value['receipt'] + '<i class="fas fa-pencil-alt padding-left-5 cursor-pointer" aria-hidden="true" onclick="_edit_receipt(' + value['id'] + ', `' + value['receipt'] +'`)"></i></td>';
                            }
                        }
                        else { order_data += '<td></td>';}

                        if (value['note'] != null)
                        {
                            order_data += '<td><i class="fa fa-eye padding-left-5 cursor-pointer" aria-hidden="true" onclick="_watch_note(' + value['id'] + ', `' + value['o_id'] + '`, ' + '`' + value['note'] + '`, ' + '`' + value['note_member'] + '`, ' + '`' + value['note_time'] + '`)"></i></td>';
                        }
                        else { order_data += '<td><i class="fas fa-pencil-alt padding-left-5 cursor-pointer" aria-hidden="true" onclick="_edit_note(' + value['id'] + ', `' + value['o_id'] + '`, ' + '`' + value['note'] + '`)"></i></td>'; }

                        if (value['checkout'] && !value['refund'] && !value['cancel'])
                        {
                            order_data += '<td><button onclick="_refund_order(' + value['id'] + ', '  + value['price'] + ')" class="btn btn-danger">退回款項</button></td>';
                        }
                        else { order_data += '<td></td>'; }

                        if (value['checkout'] && !value['cancel'])
                        {
                            if (value['receipt_abort'] == false)
                            {
                                if ((value['price'] != 0) && (value['has_receipt'] == true))
                                {
                                    order_data += '<td><button onclick="_receipt_abort(' + value['id'] + ', `' + value['receipt'] + '`)" class="btn btn-warning">作廢發票</button></td>';
                                }
                                else { order_data += '<td></td>'; }
                            }
                            else { order_data += '<td><button class="btn btn-warning disabled">已作廢</button></td>'; }
                        }
                        else { order_data += '<td></td>'; }

                        order_data += '</tr>';
                    }
                });

                $.confirm
                ({
                    title: '正在查看 <span class="color-emphasized2">' + title + '</span> 的訂單資料',
                    content: '<div class="approval">' + table + order_data + '</tbody></table></div><script>confirm_onopen(`' + data["hash"] + '`);</script>',
                    columnClass: 'col-md-12 col-xs-12',
                    containerFluid: true,
                    class: 'approval',
                    buttons:
                    {
                        'close':
                        {
                            text: '關閉',
                            btnClass: 'btn-red',
                            action: function() {}
                        }
                    }
                })
            }
        }
    }
    return _const;
}());

var
    approval_overview,
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
        {headTerm: '#', columnKey: 'l_id'},
        {headTerm: '課程名稱', columnKey: 'l_name', freeze: true},
        {headTerm: '講師', columnKey: 'teacher'},
        {headTerm: '地區', columnKey: '', customKey: 'searchLocation', sortMode: 1},
        {headTerm: '購買人數', columnKey: 'buy_count'},
        {headTerm: '截止時間', columnKey: 'end_fund'},
        {headTerm: '開課時間', columnKey: 'start_time'},
        {headTerm: '類別', columnKey: '', customKey: 'searchType'},
        {headTerm: '是否開班', columnKey: '', customKey: 'searchLessonSituation'},
        {headTerm: '點擊', columnKey: 'click'},
        {headTerm: '優惠價', columnKey: 'offer_fee'},
        {headTerm: '原價', columnKey: 'origin_fee'},
        {headTerm: '操作', columnKey: '', freeze: true}
    ];
    columnCustom = [];

    // Lesson Name
    columnCustom[1] = function(data)
    {
        return $('<a>', {href: '/lesson/' + data.l_id, target: '_blank', class: 'aLessonName', text: data.l_name});
    }

    // Location
    columnCustom[3] = function(data)
    {
        return get_location(data.location);
    }

    columnCustom[4] = function(data)
    {
        let max_people = data.max_people == null ? '無上限' : data.max_people;
        return data.buy_count + ' / ' + data.least_people + '(' + max_people + ')';
    }
    
    columnCustom[7] = function(data)
    {
        return data.type == 'online' ? '線上' : '實體';
    }

    columnCustom[8] = function(data)
    {
        let 
            lesson_situation = '',
            date             = new Date(),
            today            = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


        if (Date.parse(today).valueOf() <= Date.parse(data.end_fund).valueOf()) { lesson_situation = '尚未確定'; }
        else
        {
            if (data.cancel_lesson == true) { lesson_situation = '取消開班'; }
            else if (data.cancel_lesson == false ) { lesson_situation = '確定開班'; }
        }
        return lesson_situation;
    }
    
    columnCustom[12] = function(data, idx)
    {
        let d = data;

        let $btn = $('<button>', {class:'btn btn-info', type: 'button', text: '管理'}).on('click',function(){
            _edit_approval_authority(d.l_id);
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

    approval_overview = new approval_overview();
})

function _edit_approval_authority(i)
{
    var content           = '';
    var count             = 0;
    var data              = approval_overview._approval_data.find((n) => n.l_id == i);
    var hash              = MD5(i)
    var icon              = '<i class="fa fa-question-circle padding-left-5 icon-pop" data-container="body" data-toggle="popover" data-html="true" data-placement="top" data-content=';
    var table             = '<table class="table table-bordered table-condensed table-striped" style="max-height: 90vh; overflow: scroll" id="' + hash + '">';
    var buy_people        = '<thead><tr>' +
                                '<td>購買人<i class="fa fa-sort icon"></i></td>' +
                                '<td>聯絡電話<i class="fa fa-sort icon"></i></td>' +
                                '<td>訂單編號<i class="fa fa-sort icon"></i></td>' +
                                '<td>付款方法<i class="fa fa-sort icon"></i></td>' +
                                '<td>下訂時間<i class="fa fa-sort icon"></i></td>' +
                                '<td>購買時間<i class="fa fa-sort icon"></i></td>' +
                                '<td>取消時間<i class="fa fa-sort icon"></i></td>' +
                                '<td>退費時間<i class="fa fa-sort icon"></i></td>' +
                                '<td>收款金額<i class="fa fa-sort icon"></i></td>' +
                                '<td>退款金額<i class="fa fa-sort icon"></i></td>' +
                                '<td>可否退費<i class="fa fa-sort icon"></i></td>' +
                                '<td>發票號碼<i class="fa fa-sort icon"></i></td>' +
                                '<td>備註<i class="fa fa-sort icon"></i></td>' +
                                '<td>費用處理<i class="fa fa-sort icon"></i></td>' +
                                '<td>發票作廢<i class="fa fa-sort icon"></i></td>' +
                            '</tr></thead><tbody>';

    $.each(data.buy_people, function(index, value)
    {
        var price_icon        = '';
        var refund_icon       = '';
        var bank_icon         = '';
        if (value['id'] != undefined)
        {
            if (value['price'] != '尚未付款') { price_icon = icon + '"收款人：' + value['payee'] + '"></i>'; }

            if (value['refund_price'] != '') { refund_icon = icon + '"退款人：' + value['refund_payee'] + '<br>退款理由：' + value['refund_reason'] + '"></i>'; }

            if (value['bank'] === true)
            {
                bank_icon = icon + '"銀行代碼：' + value['bank_id'] + '<br />'
                                 + '銀行帳號：' + value['bank_account'] + '<br />'
                                 + '銀行戶名：' + value['bank_name'] + '"></i>';
            }

            email_icon = icon + '"信箱：' + value['email'] + '"></i>'
            buy_people += '<tr>';
            buy_people += '<td>' + value['buyer'] + bank_icon + '</td>';
            buy_people += '<td>' + value['phone'] + email_icon + '</td>';
            buy_people += '<td>' + value['order_id'] + '</td>';
            buy_people += '<td>' + value['payment'] + '</td>';
            buy_people += '<td>' + value['order'] + '</td>';
            buy_people += '<td>' + value['checkout'] + '</td>';
            buy_people += '<td>' + value['cancel'] + '</td>';
            buy_people += '<td>' + value['refund'] + '</td>';
            buy_people += '<td>' + value['price'] + price_icon + '</td>';
            buy_people += '<td>' + value['refund_price'] + refund_icon + '</td>';
            buy_people += '<td>' + value['restrict'] + '</td>';

            if (value['receipt'] != '')
            {
                if (value['receipt_abort'] == true) { buy_people += '<td>' + value['receipt'] + '</td>'; }
                else
                {
                    buy_people += '<td>' + value['receipt'] + '<i class="fas fa-pencil-alt padding-left-5 cursor-pointer" aria-hidden="true" onclick="_edit_receipt(' + value['id'] + ', `' + value['receipt_number'] + '`)"></i></td>';
                }
            }
            else { buy_people += '<td></td>';}

            if (value['note'] != null)
            {
                buy_people += '<td><i class="fa fa-eye padding-left-5 cursor-pointer" aria-hidden="true" onclick="_watch_note(' + value['id'] + ', `' + value['o_id'] + '`, ' + '`' + value['note'] + '`, ' + '`' + value['note_member'] + '`, ' + '`' + value['note_time'] + '`)"></i></td>';
            }
            else { buy_people += '<td><i class="fas fa-pencil-alt padding-left-5 cursor-pointer" aria-hidden="true" onclick="_edit_note(' + value['id'] + ', `' + value['o_id'] + '`, ' + '`' + value['note'] + '`)"></i></td>'; }

            if (value['checkout'] && !value['refund'] && !value['cancel'])
            {
                buy_people += '<td><button onclick="_refund_order(' + value['id'] + ', '  + value['price'] + ')" class="btn btn-danger">退回款項</button></td>';
            }
            else { buy_people += '<td></td>'; }

            if (value['checkout'] && !value['cancel'])
            {
                if (value['receipt_abort'] == false)
                {
                    if ((value['price'] != 0) && (value['has_receipt'] == true))
                    {
                        buy_people += '<td><button onclick="_receipt_abort(' + value['id'] + ', `' + value['receipt'] + '`)" class="btn btn-warning">作廢發票</button></td>';
                    }
                    else { buy_people += '<td></td>'; }
                }
                else { buy_people += '<td><button class="btn btn-warning disabled">已作廢</button></td>'; }
            }
            else { buy_people += '<td></td>'; }

            buy_people += '</tr>';
            count++;
        }
    });

    if (count == 0) { content = '該課程尚無學員購買'; }
    else { content = '<div class="approval">' + table + buy_people + '</tbody></table></div><script>confirm_onopen(`' + data["hash"] + '`);</script>'; }

    $.confirm
    ({
        title: data.l_name + ' - '  + data.teacher + ', ' + get_location(data.location) + ', ' + data.start_time ,
        content: content,
        columnClass: 'col-md-12 col-xs-12',
        containerFluid: true,
        class: 'approval',
        buttons:
        {
            'cash':
            {
                text: '現金付款',
                btnClass: 'btn-success',
                action: function()
                {
                    $.confirm
                    ({
                        title: '新增現金付款人',
                        content: '<span class="color-emphasized2">注意：請務必收妥現金後再行送出資料</span>' +
                        '<div class="form-group">' +
                          '<input class="form-control" type="text" placeholder="付款人帳號或信箱" id="cash_' + data.l_id + '">' +
                        '</div>' +
                        '<div class="form-group">' +
                          '<input class="form-control" type="text" placeholder="優惠代碼" id="coupon_' + data.l_id + '">' +
                        '</div>' +
                        '<div class="form-group">' +
                          '<select class="form-control" type="text" id="receipt_mode_' + data.l_id + '">' +
                            '<option value="no_select">請選擇發票載具</option>' +
                            '<option value="free">免費課程，無需開立發票</option>' +
                            '<option value="receipt_elec">儲存於平台 (系統將會自動對獎，中獎會通知)</option>' +
                            '<option value="mobile_barcode">手機載具</option>' +
                            '<option value="moica_barcode">自然人憑證</option>' +
                            '<option value="love_code">愛心碼</option>' +
                            '<option value="company_id">統一編號</option>' +
                          '</select>' +
                        '</div>' +
                        '<div class="form-group">' +
                          '<input class="form-control" type="text" placeholder="發票載具/統編 ()如儲存於平台此處留白)" id="receipt_' + data.l_id + '">' +
                        '</div>',
                        buttons:
                        {
                            'send':
                            {
                                text: '送出',
                                btnClass: 'btn-success',
                                action: function()
                                {
                                    var info         = this.$content.find('#cash_' + data.l_id).val();
                                    var coupon       = this.$content.find('#coupon_' + data.l_id).val();
                                    var receipt_mode = this.$content.find('#receipt_mode_' + data.l_id).val();
                                    var receipt      = this.$content.find('#receipt_' + data.l_id).val();

                                    switch (receipt_mode)
                                    {
                                        case 'mobile_barcode':
                                            check = layout._verify_barcode(receipt, /^\/[0-9A-Z]{7}$/);
                                            break;
                                        case 'moica_barcode':
                                            check = layout._verify_barcode(receipt, /^[A-Z]{2}\d{14}$/);
                                            break;
                                        case 'love_code':
                                            check = layout._verify_barcode(receipt, /^\d{3,7}$/);
                                            break;
                                        case 'company_id':
                                            check = layout._verify_company_id(receipt);
                                            break;
                                        default:
                                            check = true;
                                            break;
                                    }

                                    if ((!check) || (check && receipt_mode == 'no_select'))
                                    {
                                        $.confirm
                                        ({
                                            icon: 'fa fa-exclamation-triangle',
                                            title: '錯誤',
                                            content: '載具格式有誤',
                                            type: 'red',
                                            buttons:
                                            {
                                              '關閉':
                                              {
                                                  btnClass: 'btn-red',
                                                  action: function() {}
                                              },
                                            }
                                        });
                                        return false;
                                    }
                                    else
                                    {
                                        $.ajax
                                        ({
                                            url: '/ajax/getOfferPrice',
                                            type: 'post',
                                            dataType: 'json',
                                            async: false,
                                            data:
                                            {
                                                buyer: info,
                                                coupon: coupon,
                                                id: data.l_id,
                                                receipt_mode: receipt_mode
                                            },
                                            headers:
                                            {
                                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                            },
                                            success(message, status, xhr)
                                            {
                                                if (xhr.status == 202)
                                                {
                                                   $.confirm
                                                   ({
                                                       icon: 'fa fa-exclamation-triangle',
                                                       title: '錯誤',
                                                       content: message,
                                                       type: 'red',
                                                       buttons:
                                                       {
                                                         '關閉':
                                                         {
                                                             btnClass: 'btn-red',
                                                             action: function() {}
                                                         },
                                                       }
                                                   });
                                                   return false;
                                                }
                                                else
                                                {
                                                    content = message > 0
                                                            ? '<span class="color-emphasized2">注意：請務必收妥現金後再行送出資料</span>' + '<br>應收金額：' + message
                                                            : '<span>確定要報名該免費課程嗎</span>';
                                                    $.confirm
                                                    ({
                                                        title: '確定',
                                                        content: content,
                                                        buttons:
                                                        {
                                                            '確定':
                                                            {
                                                                btnClass: 'btn-success',
                                                                action: function()
                                                                {
                                                                    $.ajax
                                                                    ({
                                                                        url: '/ajax/addCashBuyer',
                                                                        type: 'post',
                                                                        dataType: 'json',
                                                                        data:
                                                                        {
                                                                            info: info,
                                                                            l_id: data.l_id,
                                                                            price: message,
                                                                            receipt_mode: receipt_mode,
                                                                            receipt: receipt
                                                                        },
                                                                        headers:
                                                                        {
                                                                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                                                        },
                                                                        beforeSend: function()
                                                                        {
                                                                            $.dialog
                                                                            ({
                                                                                title: '處理中',
                                                                                content: '請稍候...',
                                                                                draggable: false,
                                                                                closeIcon: false,
                                                                                theme: 'material'
                                                                            })
                                                                        },
                                                                        success: function(message, status, xhr)
                                                                        {
                                                                            $('.jconfirm-material').hide();
                                                                            if (xhr.status == 200)
                                                                            {
                                                                                $.confirm
                                                                                ({
                                                                                    title: '完成',
                                                                                    content: '<span class="color-emphasized2"> ' + info + '</span> 已購買成功',
                                                                                    buttons:
                                                                                    {
                                                                                        'ok':
                                                                                        {
                                                                                            btnClass: 'btn-success',
                                                                                            action: function()
                                                                                            {
                                                                                                $('.jconfirm').hide();
                                                                                                approval_overview._get_approval_list()
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                            else
                                                                            {
                                                                                $.alert(message, '失敗');
                                                                                return false;
                                                                            }
                                                                        },
                                                                        error: function(e)
                                                                        {
                                                                            alert(e.message);
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
                                                    return false;
                                                }
                                                return false;
                                            },
                                            error(e)
                                            {
                                                alert(e.message);
                                            }
                                        })
                                        return false;
                                    }
                                }
                            },
                            '關閉':
                            {
                                btnClass: 'btn-red',
                                action: function() {}
                            }
                        }
                    });
                    return false;
                }
            },
            'close':
            {
                text: '關閉',
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}

function _refund_order(id, pay_price)
{
    $.confirm
    ({
        title: '退費',
        content: '<span class="color-emphasized2">注意：請務必點清現金後再行送出資料</span><br>' +
                 '<p>退費金額為：<input class="form-control" value="' + pay_price + '" type="text" placeholder="退費金額" id="price"></p>' +
                 '<p>退費原因為：<input class="form-control" value="取消開班" type="text" placeholder="退費原因" id="reason"></p>',
        buttons:
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    var price = this.$content.find('#price').val();
                    var reason = this.$content.find('#reason').val();

                    if ((price != '') && (reason != ''))
                    {
                        $.ajax
                        ({
                            url: '/ajax/orderRefund',
                            type: 'post',
                            dataType: 'json',
                            data:
                            {
                                id: id,
                                price: price,
                                reason: reason
                            },
                            headers:
                            {
                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                            },
                            success: function(data)
                            {
                                if (data == 'success')
                                {
                                    $.confirm
                                    ({
                                        title: '完成',
                                        content: '退款成功',
                                        buttons:
                                        {
                                            'ok':
                                            {
                                                btnClass: 'btn-success',
                                                action: function()
                                                {
                                                    $('.jconfirm').hide();
                                                    approval_overview._get_approval_list()
                                                }
                                            }
                                        }
                                    });
                                }
                                else { $.alert(data, '錯誤'); }
                            },
                            error: function(e)
                            {
                                alert(e.message);
                            }
                        })
                    }
                    else
                    {
                        if (price == '')
                        {
                            $.alert('請輸入退費金額', '錯誤');
                            return false;
                        }
                        else if (reason == '')
                        {
                            $.alert('請輸入退費原因', '錯誤');
                            return false;
                        }
                    }
                }
            },
            '不要':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}

function confirm_onopen(hash)
{
    $('#' + hash).tablesorter();

    $(".icon-pop").popover({ trigger: "manual" , html: true})
        .on("mouseenter", function ()
        {
            var _this = this;
            $('.jconfirm').addClass('z-index-low');
            $('.jconfirm').removeClass('z-index-high');
            $(this).popover("show");
            $(".popover").on("mouseleave", function ()
            {
                $(_this).popover('hide');
            });
        })
        .on("mouseleave", function ()
        {
            var _this = this;
            setTimeout(function ()
            {
                if (!$(".popover:hover").length)
                {
                    $('.jconfirm').addClass('z-index-high');
                    $('.jconfirm').removeClass('z-index-low');
                    $(_this).popover("hide");
                }
            }, 300);
        });
}

function get_location(location)
{
    if (location == null) { return ''; }
    else
    {
        if (location.length > 2) { return location.substr(0, 2); }
    }
}

function _receipt_abort(id, receipt)
{
    $.confirm
    ({
        title: '確認',
        content: '是否已將 <span class="color-emphasized2">' + receipt + '</span> 的發票作廢？',
        buttons:
        {
            '是':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/abortReceipt',
                        type: 'post',
                        dataType: 'json',
                        data:
                        {
                            id: id,
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success: function(data)
                        {
                            if (data == true)
                            {
                                $.confirm
                                ({
                                    title: '成功',
                                    content: '<span class="color-emphasized2">' + receipt + '</span> 作廢註記完成',
                                    buttons:
                                    {
                                        'ok':
                                        {
                                            btnClass: 'btn-success',
                                            action: function()
                                            {
                                                location.reload();
                                            }
                                        }
                                    }
                                });
                            }
                            else if (data == 'no right')
                            {
                                $.alert('權限不足', '錯誤');
                                return false;
                            }
                        },
                        error: function(e)
                        {
                            layout._request_relogin();
                        }
                    })
                }
            },
            '還沒':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}

function _edit_receipt(id, receipt)
{
    $.confirm
    ({
        title: '變更 <span class="color-emphasized2">' + receipt + '</span> 的發票',
        content: '<input type="text" maxlength="10" id="receipt" class="form-control" placeholder="發票號碼" autofocus>' +
                 '<script>' +
                     '$("#receipt").on("keyup", $.proxy(function(e)' +
                     '{' +
                         'var code = (e.keyCode ? e.keyCode : e.which);' +
                         'if (code == 13){ $(".edit-receipt").click(); }' +
                     '}, this));' +
                 '</script>',
        buttons:
        {
            '是':
            {
                btnClass: 'btn-success edit-receipt',
                action: function()
                {
                    var new_receipt = this.$content.find('#receipt').val();

                    $.ajax
                    ({
                        url: '/ajax/editOrderReceiptData',
                        type: 'post',
                        dataType: 'json',
                        data:
                        {
                            id: id,
                            receipt: new_receipt,
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success: function(data)
                        {
                            if (data == true)
                            {
                                $.confirm
                                ({
                                    title: '成功',
                                    content: '已將 <span class="color-emphasized2">' + receipt + '</span> 更改為 <span class="color-emphasized2">' + new_receipt + '</span>',
                                    buttons:
                                    {
                                        'ok':
                                        {
                                            btnClass: 'btn-success',
                                            action: function()
                                            {
                                                location.reload();
                                            }
                                        }
                                    }
                                });
                            }
                            else if (data == 'no right')
                            {
                                $.alert('權限不足', '錯誤');
                                return false;
                            }
                            else
                            {
                                $.alert('發票格式有誤', '錯誤');
                                return false;
                            }
                        },
                        error: function(e)
                        {
                            layout._request_relogin();
                        }
                    })
                }
            },
            '還沒':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}

function _edit_note(id, o_id, note)
{
    if (note == 'null') { note = ''; }

    $.confirm
    ({
        title: '變更 <span class="color-emphasized2">' + o_id + '</span> 的備註',
        content: '<input type="text" id="note" class="form-control" value="' + note + '" placeholder="備註" autofocus>',
        buttons:
        {
            '確定':
            {
                btnClass: 'btn-success edit-receipt',
                action: function()
                {
                    var new_note = this.$content.find('#note').val();

                    $.ajax
                    ({
                        url: '/ajax/editOrderNote',
                        type: 'post',
                        dataType: 'json',
                        data:
                        {
                            id: id,
                            note: new_note,
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success: function(data)
                        {
                            $.confirm
                            ({
                                title: '成功',
                                content: '已將 <span class="color-emphasized2">' + o_id + '</span> 的訂單備註編輯完成',
                                buttons:
                                {
                                    'ok':
                                    {
                                        btnClass: 'btn-success',
                                        action: function() { location.reload(); }
                                    }
                                }
                            });
                        },
                        error: function(e)
                        {
                            layout._request_relogin();
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

function _watch_note(id, o_id, note, member, time)
{
    $.confirm
    ({
        title: '查看 <span class="color-emphasized2">' + o_id + '</span> 的備註',
        content: note + ' (<span class="color-emphasized2">' + member + '</span> 於 <span class="color-emphasized2">' + time + '</span> 時編輯)',
        buttons:
        {
            '編輯':
            {
                btnClass: 'btn-success',
                action: function() { _edit_note(id, o_id, note); }
            },
            '關閉':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    });
}
