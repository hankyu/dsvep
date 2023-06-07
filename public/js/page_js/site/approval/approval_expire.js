var approval_expire_overview = (function()
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
            this._approval_expire_overview = $('#approval_expire_overview');
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
                url: '/ajax/expire_search',
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
            $('#approval_search').on('click', $.proxy(function()
            {
                location.href = '/approval'
            }, this));

            this._order_search = $('#order_search');

            $('#expire_search').on('click', $.proxy(function()
            {
                location.href = '/approval/expire'
            }, this))
        }
    }
    return _const;
}());

var
    approval_expire_overview,
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
        {headTerm: '類別', columnKey: 'type'},
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
            _edit_approval_expire_authority(d.l_id);
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

    approval_expire_overview = new approval_expire_overview();
})

function _edit_approval_expire_authority(i)
{
    var content           = '';
    var count             = 0;
    var data              = approval_expire_overview._approval_data.find((n) => n.l_id == i);
    var hash              = MD5(i)
    var icon              = '<i class="fa fa-question-circle padding-left-5 icon-pop" data-container="body" data-toggle="popover" data-html="true" data-placement="top" data-content=';
    var price_icon        = '';
    var refund_icon       = '';
    var bank_icon         = '';
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
                    buy_people += '<td>' + value['receipt'] + '<i class="fas fa-pencil-alt padding-left-5 cursor-pointer" aria-hidden="true" onclick="_edit_receipt(' + value['id'] + ', `' + value['receipt_number'] +'`)"></i></td>';
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
