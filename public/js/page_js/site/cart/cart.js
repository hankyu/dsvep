var cart = (function()
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
            this._checkout       = $('#checkout');
            this._company_id     = $('#company_id');
            this._label_company  = $('#label_company');
            this._label_donate   = $('#label_donate');
            this._label_mobile   = $('#label_mobile');
            this._label_moica    = $('#label_moica');
            this._love_code      = $('#love_code');
            this._mobile_barcode = $('#mobile_barcode');
            this._moica_barcode  = $('#moica_barcode');
            this._coupon         = $('#coupon');
            this._send           = $('#send');
            this._buyer_phone    = $('#buyer_phone');
            this._btn_refill_cellphone = $('#btn_refill_cellphone');
            this._btn_verify_cellphone = $('#btn_verify_cellphone');
            this._hint_phone = $('#hint_phone');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initialAll();
        },
        _initialAll: function()
        {
            this.cellphoneVertifyStatus = this._btn_verify_cellphone.hasClass('hidden');

            $('[data-toggle="tooltip"]').tooltip();

            $('#goshop').on('click', $.proxy(function()
            {
                location.href = '/';
            }, this));

            this._label_mobile.on('click', $.proxy(function()
            {
                $('#mobile_barcode').focus();
            }, this));

            $('#mobile_barcode').blur(function(e)
            {
                var str = $(this).val();
                str = str.toUpperCase();
                $(this).val(str);
            });

            this._label_moica.on('click', $.proxy(function()
            {
                $('#moica_barcode').focus();
            }, this));

            this._label_donate.on('click', $.proxy(function()
            {
                $('#love_code').focus();
            }, this));

            this._label_company.on('click', $.proxy(function()
            {
                $('#member_data').prop('checked', true);
                $('#company_id').focus();
            }, this));

            this._send.on('click', $.proxy(function()
            {
                if(!this._buyer_phone.attr('disabled')){
                    if(this.oldPhoneNumber == this._buyer_phone.val())
                    {
                        this._switch_cellphone_btns_status(0);
                    }
                    else
                    {
                        closePopup();
                        createPopup
                        ({
                            head: '手機未驗證',
                            body: '購買課程前，必須先驗證手機。',
                            close: true,
                            type: 'danger'
                        });
                        return;
                    }
                }
                var objThis = this;

                let popup_body,
                    popup_head,
                    popup_tail;

                // Set popup head
                popup_head = `
                    提醒`;

                // Set popup body
                popup_body = `
                    當平台收到款項以後，將會在十分鐘內開通課程，付款狀況請至 <a target="_blank" rel="noopener noreferrer" href="/profile/order">我的訂單</a> 來查看訂單狀態 <br />
                    *為維護您的權益 請勿在報名截止後繳費付款 <br />
                    請注意！ <br />
                    一、如欲申請退費，請於購買後七天內申請，逾期則不接受退款。 <br />
                    二、如在線上課程開課後點入課程教室頁面即視同觀看，恕不退款。 <br />
                    更多詳細退費規定請參閱 <a target="_blank" rel="noopener noreferrer" href="/contact/terms#refund">退費規定</a>`;

                // Set popup tail
                popup_tail = $('<buttons>');
                // Set read text of popup tail
                popup_tail.append($('<div>',
                {
                    css:
                    {
                        'line-height': '2em',
                        width: '100%'
                    },
                    id: 'read-percent'
                }));
                // Set buttons of popup tail
                popup_tail.append($('<button>',
                {
                    class: 'btn btn-success',
                    text: '我已了解',
                    click: () =>
                    {
                        let receipt        = $('input[type=radio]:checked').val(),
                            mobile_barcode = objThis._mobile_barcode.val(),
                            moica_barcode  = objThis._moica_barcode.val(),
                            love_code      = objThis._love_code.val(),
                            company_id     = objThis._company_id.val(),
                            coupon         = objThis._coupon.val(),
                            check          = '';

                        switch (receipt)
                        {
                            case 'mobile_barcode':
                                check = layout._verify_barcode(mobile_barcode, /^\/[0-9A-Z]{7}$/);
                            break;
                            case 'moica_barcode':
                                check = layout._verify_barcode(moica_barcode, /^[A-Z]{2}\d{14}$/);
                            break;
                            case 'love_code':
                                check = layout._verify_barcode(love_code, /^\d{3,7}$/);
                            break;
                            case 'company_id':
                                check = layout._verify_company_id(company_id);
                            break;
                            case 'receipt_elec':
                                check = true;
                            break;
                        }

                        var input_required = $('.member-data-content input[required]').filter((n, i) => i.value == '');

                        if (input_required.length != 0)
                        {
                            $.alert('購買人資料填寫不完整或欄位填寫有誤', '錯誤');
                            $('#member_data').prop('checked', true);
                            return;
                        }
                        else
                        {
                            if (receipt == 'company_id')
                            {
                                if ($('#buyer_address').val() == '')
                                {
                                    $.alert('統編地址尚未輸入', '錯誤');
                                    $('#member_data').prop('checked', true);
                                    return;
                                }
                            }

                            $.ajax
                            ({
                                url: '/ajax/checkShopData',
                                type: 'post',
                                data:
                                {
                                    address: $('#buyer_address').val(),
                                    company: $('#buyer_company').val(),
                                    phone: $('#buyer_phone').val(),
                                    coupon: coupon,
                                },
                                headers:
                                {
                                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                },
                                success: function(message, status, xhr)
                                {
                                    if (Number.isInteger(message))
                                    {
                                        let popup_body,
                                            popup_head,
                                            popup_tail;

                                        // Set popup head
                                        popup_head = '確定付款';

                                        // Set popup body
                                        coupon = coupon == '' ? '無' : coupon;
                                        popup_body = `<span>使用優惠券：${coupon}</span><br><span>實付金額：${message}</span>`;

                                        // Set popup tail
                                        popup_tail = $('<buttons>');

                                        popup_tail.append($('<button>',
                                        {
                                            class: 'btn btn-success',
                                            text: '確定',
                                            click: function(){
                                                this.disabled = true;
                                                $('#cart_form').submit();
                                            }
                                        }));

                                        popup_tail.append($('<button>',
                                        {
                                            class: 'btn btn-danger',
                                            text: '取消',
                                            click: () => { closePopup(); }
                                        }));

                                        // Close least
                                        closePopup();

                                        // Create popup card
                                        createPopup
                                        ({
                                            body: popup_body,
                                            head: '確定付款',
                                            tail: popup_tail,
                                            type: 'green'
                                        })
                                    }
                                    else
                                    {
                                        if (xhr.status === 202) { layout._email_verify_situation(); }
                                        else {
                                            // Close least
                                            closePopup();

                                            // Create popup card
                                            createPopup
                                            ({
                                                body: message,
                                                close: true,
                                                head: '錯誤',
                                                type: 'danger'
                                            })
                                        }
                                    }
                                },
                                error: function(e)
                                {
                                    layout._request_relogin();
                                }
                            })
                        }
                    }
                }));

                // Set popup tail
                popup_tail.append($('<button>',
                {
                    class: 'btn btn-danger',
                    text: '關閉',
                    click: () => { closePopup(); }
                }));

                // Create popup card
                createPopup
                ({
                    body: popup_body,
                    close: true,
                    head: popup_head,
                    tail: popup_tail,
                    type: 'default'
                });

                // If popup card too height
                // set the read text
                let popup,
                    popup_card_body;

                popup = $('.popup__background').last();
                popup_card_body = popup.find('.popup__card__body');
                if (popup_card_body[0].scrollTop + popup_card_body[0].clientHeight < popup_card_body[0].scrollHeight - 20)
                {
                    let popup_success_btn = popup.find('.btn-success'),
                        read_percent = popup.find('#read-percent'),
                        scroll_handler;

                    scroll_handler = () =>
                    {
                        if (popup_card_body[0].scrollTop + popup_card_body[0].clientHeight >= popup_card_body[0].scrollHeight - 20)
                        {
                            read_percent.text('已閱讀完');
                            popup_card_body.off('scroll', scroll_handler);
                            popup_success_btn.removeAttr('disabled');
                        }
                    }
                    popup_success_btn.attr('disabled', 'disabled');
                    popup_card_body.on('scroll', scroll_handler);
                    read_percent.text('尚未閱讀完');
                }
            }, this));

            this._btn_refill_cellphone.on('click', $.proxy(() =>
            {
                if(this._btn_refill_cellphone.text() == '修改手機')
                {
                    this.oldPhoneNumber = this._buyer_phone.val();
                    this._switch_cellphone_btns_status(1);
                }
                else
                {
                    this._buyer_phone.val(this.oldPhoneNumber);
                    $('#form_det_cellphone').removeClass('has-error').removeClass('has-success');
                    $('#i_det_cellphone').removeClass('fa-check');
                    this._switch_cellphone_btns_status(0);
                }
            }));

            this._btn_verify_cellphone.on('click', $.proxy(() =>
            {
                this._get_verification_code();
            }));

            this._buyer_phone.on('focus', $.proxy(function()
            {
                this._hint_phone.removeClass('hidden');
            }, this))
            .on('blur',$.proxy(function()
            {
                setTimeout(() => {this._hint_phone.addClass('hidden');}, 200);
            }, this))
            .on('keyup', $.proxy(() =>
            {
                let currPhoneNumber = this._buyer_phone.val().replace(/\D/g, '');
                this._buyer_phone.val(currPhoneNumber);
        
                // have done phone verification, but changing phone number now.
                if(this.oldPhoneNumber)
                {
                    if(currPhoneNumber != this.oldPhoneNumber)
                    {
                        this._btn_verify_cellphone.removeClass('hidden');
                    }
                    else
                    {
                        this._btn_verify_cellphone.addClass('hidden');
                    }
                }
            }));
        },

        _switch_cellphone_btns_status: function(btnStatus)
        {
            switch(btnStatus)
            {
                // when already verified, show 'modify btn', hide 'verify btn'
            case 0:
                this._buyer_phone.attr({disabled: 'disabled'});
                this._btn_verify_cellphone.addClass('hidden');
                this._btn_refill_cellphone.removeClass('hidden').removeClass('btn-danger').addClass('btn-info').text('修改手機');
                break;

            // when modifying cellphone, show 'cancel modify btn', hide 'verify btn'
            case 1:
                this._buyer_phone.attr({disabled: false});
                this._btn_verify_cellphone.addClass('hidden');
                this._btn_refill_cellphone.removeClass('hidden').removeClass('btn-info').addClass('btn-danger').text('取消修改');
                break;
            }
        },

        _show_verify_popup: function()
        {
            let
            $popupBody,
            $btnSet,
            $btnReget;

            $popupBody = $('<div>', {id: 'verifyPopupBody'});
            $btnSet = $('<div>', {class: 'text-center'});

            $popupBody.append($('<p>', {text: '請輸入本站以簡訊傳送至手機(' + this._buyer_phone.val() + ')的驗證碼：'}));
            $popupBody.append($('<p>', {text: '* 若訊號不穩，可能影響簡訊傳送速度，請耐心等待', class: 'smallfont color-emphasized2'}));
            $popupBody.append($('<input>', {type: 'text', id: 'verificationCode', class: 'form-control text-center'}));
            $popupBody.append($('<div>', {id: 'countdowner'}));
            $btnSet.append($('<button>', {id: 'btnVerifyCountdowner', class: 'btn btn-success btnVerify', type: 'button', html: '執行驗證<br><span id="spnCountdownInfo">（<span id="spnVerifyCountdowner"></span>）</span>'})
            .on('click', () =>
            {
                this.countdown.stop();
                this.verifyCountdown.stop();
                this._verify_phone_number();
            }));
            $btnReget = $('<button>', {id: 'btnReget', type: 'button', class: 'btn btn-warning btnVerify', disabled: 'disabled'}).html('重新取得驗證碼<br><span id="spnPlzWait">（請等待<span id="spnCountdowner"></span>）</span>')
            .on('click', () =>
            {
                this.countdown.stop();
                this.verifyCountdown.stop();
                $('#btnReget').attr({disabled: 'disabled'});
                $('#btnVerifyCountdowner').attr({disabled: false});
                $('#spnCountdownInfo').removeClass('hidden');
                this._get_verification_code(true);
            });
            $btnSet.append($btnReget);

            // Create popup card
            createPopup
            ({
                close: true,
                body: $popupBody,
                head: '手機驗證',
                type: 'default',
                tail: $btnSet,
                freezed: 1
            });

            this.verifyCountdown = countdownModule({hh: 0, mm: 10, ss: 0, container: '#spnVerifyCountdowner', finish: function(){
            $('#btnVerifyCountdowner').attr({disabled: 'disabled'});
            $('#spnCountdownInfo').addClass('hidden');
            }});
            this.verifyCountdown.start();

            this.countdown = countdownModule({hh: 0, mm: 1, ss: 0, container: '#spnCountdowner', finish: function(){
            $('#btnReget').attr({disabled: false});
            $('#spnPlzWait').addClass('hidden');
            }});
            this.countdown.start();
            $('#verificationCode').focus();
        },
        _show_rolling_popup: function(msg)
        {
            let $popupBody = $('<div>', {id: 'bodyDeliveringSMS', class: 'bodyDeliveringSMS'});
            rollingLoading.draw($popupBody);
            // Create popup card
            createPopup
            ({
                body: $popupBody,
                head: msg,
                type: 'default',
                freezed: 2
            });
        },
        _get_verification_code: function(retry)
        {
            this._show_rolling_popup('驗證簡訊發送中');

            new Promise((resolve, reject) =>
            {
                $.ajax
                ({
                    url: '/ajax/sendCellphoneVerificationCode',
                    type: 'post',
                    dataType: 'json',
                    data:
                    {
                        cellphone: this._buyer_phone.val()
                    },
                    headers:
                    {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success(data, status, xhr)
                    {
                        if(data == '驗證碼已發送')
                        {
                            resolve(data);
                        }
                        else if(data == '手機號碼已有人使用！')
                        {
                            resolve(data)
                        }
                        else
                        {
                            let e = {apiName: 'sendCellphoneVerificationCode', errorCode: data};
                            reject(e);
                        }
                    },
                    error(e)
                    {
                        reject(e);
                    }
                });
            })
            .then((data) =>
            {
                closePopup({unfreezed: true});
                if(retry)
                {
                    $('#spnPlzWait').removeClass('hidden');
                    this.verifyCountdown.restart();
                    this.countdown.restart();
                }
                if(!retry)
                {
                    this._show_verify_popup();
                }
            },(e) =>
            {
                closePopup({unfreezed: true});
                this._popup_error_message(e);
            });
        },
        _popup_error_message: function(e)
        {
            if(e.apiName)
            {
                let errorMsgArr;
                switch(e.apiName)
                {
                    case 'sendCellphoneVerificationCode':
                    errorMsgArr = {
                        201: '系統發⽣錯誤，請聯絡大俠學習平台平台⼈員',
                        202: '簡訊發送功能暫時停⽌服務，請稍候再試',
                        203: '簡訊內容不得空白',
                        204: '無效的手機號碼',
                        205: '門號有錯誤',
                        206: '逾時未送達'
                    };
                    break;
                    case 'checkCellphoneVerificationCode':
                    errorMsgArr = {
                        201: '該手機號碼已經驗證完成',
                        202: '驗證期限已超過，請重新驗證',
                        203: '手機驗證碼錯誤，請重新輸入'
                    };
                    break;
                }
                errorMessage = errorMsgArr[e.errorCode];
            }
            else if(e.status)
            {
                errorMessage = e.status == 200? e.responseText : e.status + '<br>' + e.statusText;
            }
            else
            {
                errorMessage = e;
            }

            // Create popup card
            createPopup
            ({
                close: true,
                body: errorMessage,
                head: '錯誤',
                type: 'danger'
            });
        },
        _verify_phone_number: function()
        {
            this._show_rolling_popup('手機驗證中...');

            new Promise((resolve, reject) =>
            {
                $.ajax
                ({
                    url: '/ajax/checkCellphoneVerificationCode',
                    type: 'post',
                    dataType: 'json',
                    data:
                    {
                        code: $('#verificationCode').val()
                    },
                    headers:
                    {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success(data, status, xhr)
                    {
                        if(data == 101)
                        {
                            resolve(data);
                        }
                        else
                        {
                            let e = {apiName: 'checkCellphoneVerificationCode', errorCode: data};
                            reject(e);
                        }
                    },
                    error(e)
                    {
                        reject(e);
                    }
                });
            })
            .then((data) =>
            {
                // Close Rest Popup
                closePopup({unfreezed: true});
                closePopup({unfreezed: true});

                this.countdown.stop();
                this.verifyCountdown.stop();
                this._switch_cellphone_btns_status(0);

                // Create popup card
                createPopup
                ({
                    close: true,
                    body: '此手機成功完成驗證，日後若更換手機號碼，則必須重新驗證新手機號碼。',
                    head: '驗證成功',
                    type: 'green'
                });
            },(e) =>
            {
                closePopup({unfreezed: true});
                this._popup_error_message(e);
            });
        }
    }
    return _const;
}());

var cart;
$(function()
{
    rollingLoading = rollingLoadingModule();
    cart = new cart();
})

function _question_enter(el)
{
    $(el).popover('show');
}

function _question_leave(el)
{
    $(el).popover('hide');
}