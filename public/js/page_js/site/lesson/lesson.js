var lesson = (function()
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
            this._check_order         = $('#check_order');
            this._check_order_mob     = $('#check_order_mob');
            this._content             = $('.content');
            this._direct_buy          = $('#direct_buy');
            this._direct_buy_free     = $('#direct_buy_free');
            this._direct_buy_free_mob = $('#direct_buy_free_mob');
            this._direct_buy_mob      = $('#direct_buy_mob');
            this._enter_classroom     = $('#enter_classroom');
            this._enter_classroom_mod = $('#enter_classroom_mob');
            this._lesson_id           = $('#lesson_id');
            this._media_type          = $('#media_type');
            this._path                = $('#path');
            this._question_icon       = $('.fa-question-circle');
            this._restrict            = $('#restrict')
            this._over_deadline       = $('#over_deadline')
            this._temp_content        = $('.temp_content');

            //Icon Of Toggle All Chapter
            this._toggle_all_chapter = $('#toggle_all_chapter');

            //Tab Bar Switch
            this._preview_tab_bar = $('#preview_tab_bar');
            this._content_intro   = $('#content_intro');

            //Shopping Cart
            this._shopping_cart                         = $('.shopping-cart');
            this._shop_fund                             = $('#shop_fund');
            this._shopping_cart_panel                   = $('#shopping_cart_panel');
            this._lesson_label_wrapper_mobile           = $('.lesson-label-wrapper-mobile');
            this._shop_left_day_time                    = $('#shop_left_day_time');
            this._shop_left_day_time_mobile             = $('#shop_left_day_time_mobile');
            this._mobile_shopping_cart_panel_switcher   = $('.mobile-shopping_cart_panel-switcher');
            this._mobile_shopping_cart_panel            = $('.mobile-shopping-cart-panel');
            this._search_bar_row                        = $('.search-bar-row');
            this._preview_tab_bar                       = $('#preview_tab_bar');

            //Viedo Mask
            this._close_mask = $('#close_mask');
            this._video_mask = $('#video_mask');

            // Favorite
            this._favorite   = $('#Favorite');
            this._favorite_m = $('#Favorite_m');

            // QA
            this._qa_img_input   = $('#qa_img_input');
            this._qa_my_input    = $('#qa_my_input');

            this._top_range      = this._preview_tab_bar.offset().top;
            this._teacher_avator = $('#teacher_avator');
            this._teacher_desc   = $('#teacher_desc');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initialAll();
        },
        _initialAll: function()
        {
            // Left Day Time
            var lesson_data = this._shopping_cart_panel.data('lesson_data');
            // 優惠時間到當天23:59:59
            var timestamp = new Date(lesson_data.end_fund.replace(/-/g,'/')).setHours(23, 59, 59, 999) - new Date().getTime();

            if (timestamp > 0)
            {
                // Fundraising 優惠中 計算優惠剩餘天數
                setInterval(function()
                {
                    timestamp     = timestamp - 1000;
                    var time      = lesson._calc_left_time(timestamp);
                    var html_temp =
                        '離募資截止 剩 <span class="text-theme-color">' + time.day + '</span>天' +
                        ' <span class="text-theme-color">' + time.hour + '</span>小時' +
                        ' <span class="text-theme-color">' + time.min + '</span>分' +
                        ' <span class="text-theme-color">' + time.sec + '</span>秒';
                    lesson._shop_left_day_time.html(html_temp);
                    lesson._shop_left_day_time_mobile.html(html_temp);
                }, 1000);
                $('.shop-fee').show();
                // this._create_percentage_progress(this._shop_fund);
            }
            else
            {
                // Fundraising End
                var start_time = new Date(lesson_data.start_time.replace(/-/g,'/')).setHours(0, 0, 0, 0) - new Date().getTime();

                if (start_time > 0)
                {
                    // Prepare Stage 備課中 計算開課剩餘時間
                    var lesson_type_html = ''

                    if (lesson_data.type == 'entity') { lesson_type_html = '報名截止'; }
                    else { lesson_type_html = '開課'; }

                    setInterval(function()
                    {
                        start_time    = start_time - 1000;
                        var time      = lesson._calc_left_time(start_time);
                        var html_temp =
                            '再 <span class="text-theme-color">' + time.day + '</span>天' +
                            ' <span class="text-theme-color">' + time.hour + '</span>小時' +
                            ' <span class="text-theme-color">' + time.min + '</span>分' +
                            ' <span class="text-theme-color">' + time.sec + '</span>秒 ' + lesson_type_html;
                        lesson._shop_left_day_time.html(html_temp);
                        lesson._shop_left_day_time_mobile.html(html_temp);
                    }, 1000);
                    $('.shop-fee').show();
                }
                else
                {
                    // Lesson Start 上課中
                    $('.no-discount').hide();
                    $('.shop-fee').show();
                }
                // this._create_percentage_progress(this._shop_fund);
            }

            var quill = new Quill('.temp_content', {});
            var path = '/json/' + this._path.val();

            $.getJSON(path, function(content)
            {
                description = [];
                element = new Array();
                for (var i = 0; i < content.length; i++)
                {
                    element = [];
                    var content_temp = content[i][0];
                    var image = ['jpeg', '.gif', '.png', '.jpg'];
                    content_temp = content_temp.substr(1, content_temp.length - 2);
                    var index = image.indexOf(content_temp.substr(content_temp.length-4, content_temp.length-1))

                    if (index != -1)
                    {
                        if (content[i][1] != null)
                        {
                            if (content[i][1]['link'] == undefined)
                            {
                                element['insert'] = content_temp;
                                element['attributes'] = content[i][1];
                            }
                            else
                            {
                                element['insert'] = new Array();
                                element['insert']['image'] = content[i][1]['link'];
                            }
                        }
                        else { element['insert'] = content[i][0]; }
                    }
                    else
                    {
                        element['insert'] = content_temp;

                        if (content[i][1] != '') { element['attributes'] = content[i][1]; }
                    }

                    description.push(element);
                }

                quill.setContents(description);
                var content_html = $('.ql-editor').html(this._temp_content);
                $('.ql-editor').removeAttr('contenteditable', true);
                $('.content').html(content_html);
            });

            this._direct_buy.on('click', $.proxy(function()
            {
                this._direct_buy_lesson();
            }, this));

            this._direct_buy_mob.on('click', $.proxy(function()
            {
                this._direct_buy_lesson();
            }, this));

            this._direct_buy_free.on('click', $.proxy(function()
            {
                this._direct_buy_free_lesson();
            }, this));

            this._direct_buy_free_mob.on('click', $.proxy(function()
            {
                this._direct_buy_free_lesson();
            }, this));

            this._enter_classroom.on('click', $.proxy(function()
            {
                this._enter_current_classroom();
            }, this));

            this._enter_classroom_mod.on('click', $.proxy(function()
            {
                this._enter_current_classroom();
            }, this));

            this._check_order.on('click', $.proxy(function()
            {
                location.href = '/profile/order';
            }, this));

            this._check_order_mob.on('click', $.proxy(function()
            {
                location.href = '/profile/order';
            }, this))

            this._question_icon.on('mouseenter', $.proxy(function()
            {
                $('.fa-question-circle').popover('show');
            }, this));

            this._question_icon.on('mouseleave', $.proxy(function()
            {
                $('.fa-question-circle').popover('hide');
            }, this));

            // favorite
            this._favorite.on('click', $.proxy(function()
            {
                this._use_favorite($('#Favorite'))
            }, this));

            this._favorite_m.on('click', $.proxy(function()
            {
                this._use_favorite($('#Favorite_m'))
            }, this));

            // mobile shop chart fold switch
            this._mobile_shopping_cart_panel_switcher.on('click',$.proxy(this._xsDeviceFoldControll,this));

            // Close Video play Mask
            this._close_mask.on('click', $.proxy(function()
            {
                this._video_mask.attr('style', 'display: none;');
                $('.lesson-video-list-item').removeClass('video-active');
                $('body').attr('style', '');
                videojs('video_player').pause();
                hashBindController.setHash('');
            },this));

            this._toggle_all_chapter.on('click', $.proxy(function()
            {
                // Show All 展開所有章節
                if (this._toggle_all_chapter.prop('checked'))
                {
                    var input = $('.accordion input[type=checkbox]');

                    for (i = 0; i < input.length; i++)
                    {
                        if (!input[i].checked) { $(input[i]).click(); }
                    }
                }
                // Hide All 摺疊所有章節
                else
                {
                    var input = $('.accordion input[type=checkbox]');

                    for (i = 0; i < input.length; i++)
                    {
                        if (input[i].checked) { $(input[i]).click(); }
                    }
                }
            }, this));

            // Check All Checkbox Is Checked
            $('.accordion input[type=checkbox]').on('click', $.proxy(function()
            {
                var input_check = $('.accordion input[type=checkbox]:checked');
                var input = $('.accordion input[type=checkbox]');

                // Checkbox All Check 所有章節都展開
                if ((input_check.length == input.length) && (!this._toggle_all_chapter.prop('checked')))
                {
                    this._toggle_all_chapter.prop('checked', true);
                }
                // Checkbox All Cancel 所有章節都摺疊
                if ((input_check.length == 0) && (this._toggle_all_chapter.prop('checked')))
                {
                    this._toggle_all_chapter.prop('checked', false);
                }
            }, this));

            // 預設顯示課程介紹
            this._content_intro.fadeIn();
            // 預設章節全部展開
            this._toggle_all_chapter.click().prop('checked', true);

            // Video-js Default Setting 將影片播放器套上video.js套件樣式
            if (this._media_type.val() == 'video')
            {
                var video_player = videojs('media_video',
                {
                    controls: true,
                    autoplay: false,
                    muted: false,
                    loop: true,
                    preload: 'auto'
                });
            }

            var video_player = videojs('video_player',
            {
                controls: true,
                autoplay: false,
                preload: 'auto'
            });

            // Calc The Video Time Length 計算影片長度
            var viedo_length = $('.video-length');

            for (i = 0; i < viedo_length.length; i++)
            {
                var v_length = this._calc_video_length(viedo_length[i].dataset.video_length);
                viedo_length[i].innerHTML = v_length;
            }

            $('#qa_my_input').one('focus', () => $('#qa_my_row').show());
        },

        _xsDeviceFoldControll: function()
        {
            var
                $window = $(window),
                windowWidth     = $window.width(),
                windowHeight    = $window.height();

            xsDeviceScrollingController.reset();
            if(this._mobile_shopping_cart_panel.hasClass('folded'))
            {
                // sm, xs device need controll preview_tab_bar only when higher than 750px.
                if(windowWidth < 768 && windowHeight > 750){ this._preview_tab_bar.removeClass('scrolling'); }
                this._mobile_shopping_cart_panel.removeClass('folded');
                this._search_bar_row.removeClass('scrolling');
            }
            else
            {
                // sm, xs device need controll preview_tab_bar only when higher than 750px.
                if(windowWidth < 768 && windowHeight > 750){ this._preview_tab_bar.addClass('scrolling'); }
                this._mobile_shopping_cart_panel.addClass('folded');
                this._search_bar_row.addClass('scrolling');
            }
        },

        _xsDeviceSwitchFixedElementsVisible: function(visible)
        {
            if(visible)
            {
                this._mobile_shopping_cart_panel.stop().show();
                this._search_bar_row.stop().show();
                this._preview_tab_bar.stop().show();
            }
            else
            {
                this._mobile_shopping_cart_panel.stop().hide();
                this._search_bar_row.stop().hide();
                this._preview_tab_bar.stop().hide();
            }
        },
        _create_percentage_progress: function(shop_fund)
        {
            // 計算人數百分比 去小數點 可以超過100%
            var least_people = shop_fund.data('least_people');
            var buy_people   = shop_fund.data('buy_people');
            var percentage   = least_people == 0 ? 100 : (buy_people / least_people * 100).toFixed(0);
            var percentage_content =
                '<div class="progress shop-progress col-xs-12 padding-0">' +
                    '<div class="progress-bar" role="progressbar" style="width: ' + (percentage >= 100 ? 100 : percentage) + '%;">' +
                        percentage + '%' +
                    '</div>' +
                '</div>';
            shop_fund.append(percentage_content);
        },
        _calc_left_time: function(left_time)
        {
            // 計算剩餘時間
            const ONE_DAY = 1000 * 60 * 60 * 24;
            const ONE_HOUR = 1000 * 60 * 60;
            const ONE_MIN = 1000 * 60;
            const ONE_SEC = 1000;

            var day = Math.floor(left_time / ONE_DAY);
            left_time = left_time - (day * ONE_DAY);

            var hour = Math.floor(left_time / ONE_HOUR);
            left_time = left_time - (hour * ONE_HOUR);

            var min = Math.floor(left_time / ONE_MIN);
            left_time = left_time - (min * ONE_MIN);

            var sec = Math.floor(left_time / ONE_SEC);
            var time =
            {
                day: day,
                hour: hour,
                min: min,
                sec: sec,
            }
            return time;
        },
        _calc_video_length: function(sec)
        {
            // 轉換時間格式
            const ONE_HOUR = 60 * 60;
            const ONE_MIN  = 60;

            if (sec < ONE_MIN)
            {
                sec = sec < 10 ? '0' + sec : sec;
                return '00:' + sec;
            }
            else if (sec < ONE_HOUR)
            {
                var min = sec / ONE_MIN < 10 ? '0' + Math.floor(sec / ONE_MIN) : Math.floor(sec / ONE_MIN);
                    sec = sec - (min * ONE_MIN);
                    sec = sec < 10 ? '0' + sec : sec;
                return  min + ':' + sec;
            }
            else
            {
                var hour = Math.floor(sec / ONE_HOUR);
                     sec = sec - (hour * ONE_HOUR);
                var  min = sec / ONE_MIN < 10 ? '0' + Math.floor(sec / ONE_MIN) : Math.floor(sec / ONE_MIN);
                     sec = sec - (min * ONE_MIN);
                     sec = sec < 10 ? '0' + sec : sec;
                return  hour + ':' + min + ':' + sec;
            }
        },
        _direct_buy_lesson: function()
        {
            // 直接購買課程
            if (layout._email_verify.val() == 'no') { layout._email_verify_situation(); }
            else { location.href = '/cart/' + $('#lesson_id').val(); }
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
        _direct_buy_free_lesson: function()
        {
            // 購買免費課程
            if (layout._email_verify.val() == 'no') { layout._email_verify_situation(); }
            else
            {
                let
                    $popupBody = $('<div>', {class: 'cellphoneInputContainer'}),
                    $phoneInputSet = $('<div>', {class: 'cellphoneInputSet'}),
                    $cellphoneInputSetInput = $('<div>', {class: 'cellphoneInputSet__input'}).appendTo($phoneInputSet),
                    $cellphoneInputSetBtns = $('<div class="cellphoneInputSet__btns">').appendTo($phoneInputSet),
                    $btnSet = $('<div>',{class: 'buyFreebtnSet'}),
                    $btnOK,
                    $btnCancel;

                $popupBody.append($('<p>', {text: '確定要購買此免費課程嗎？'}));

                this._buyer_phone = $('<input class="form-control float-right" placeholder="請輸入聯絡手機" type="text" id="buyer_cellphone" value="' + $('#cellphone').val() + '"' + (phoneVerified? ' disabled="disabled"' : '') + '>')
                .appendTo($cellphoneInputSetInput);
                $popupBody.append($phoneInputSet);
                this._btn_verify_cellphone = $('<button>', {type: 'button', id: 'btn_verify_cellphone', class: 'btn btn-success' + (phoneVerified? ' hidden' : ''), text: '驗證手機'}).appendTo($cellphoneInputSetBtns),
                this._btn_refill_cellphone = $('<button>', {type: 'button', id: 'btn_refill_cellphone', class: 'btn btn-info' + (phoneVerified? '' : ' hidden'), text: '修改手機'}).appendTo($cellphoneInputSetBtns),
                this._hint_phone = $('<div>', {id:'hint_phone', class:'hintPhone'}).appendTo($popupBody);
                this._hint_phone.append('請輸入數字（不需輸入符號），若非中華民國手機號碼，請在前面直接加入國碼。');
                this._hint_phone.append($('<br>'));
                this._hint_phone.append('美國1、日本81、中國86、香港852、澳門853、馬來西亞60、新加坡65&hellip;');
                this._hint_phone.append($('<a>', {href:'https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E7%94%B5%E8%AF%9D%E5%8C%BA%E5%8F%B7%E5%88%97%E8%A1%A8', target:'_blank', text:'更多'}));

                $btnCancel = $('<button>',{text: '取消', class: 'btn btn-danger', type: 'button'})
                .on('click', () =>
                {
                    closePopup({});
                });
                $btnOK = $('<button>',{text: '確定', class: 'btn btn-success', type: 'button'})
                .on('click', ()=>
                {
                    let phone = this._buyer_phone.val();
                    if(!this._buyer_phone.attr('disabled')){
                        if(this.oldPhoneNumber == phone)
                        {
                            this._switch_cellphone_btns_status(0);
                        }
                        else
                        {
                            createPopup
                            ({
                                body: '購買課程前，必須先驗證手機。',
                                close: true,
                                head: '手機未驗證',
                                type: 'danger'
                            });
                            return;
                        }
                    }

                    $btnOK.attr({disabled: 'disabled'});
                    this._show_rolling_popup('課程購買中...');

                    $.ajax
                    ({
                        url: '/ajax/directBuyFreeLesson',
                        type: 'post',
                        dataType: 'json',
                        data:
                        {
                            l_id: lesson._lesson_id.val(),
                            phone: phone
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(message, status, xhr)
                        {
                            if (xhr.status == 200)
                            {
                                try{
                                    gtag('event', 'buy', { event_category: 'buy lesson', event_action: 'buy', event_label: 'free lesson', value: 200});
                                }catch(e){}

                                closePopup({unfreezed : true, closeAll: true});
                                let $tail = $('<div>', {class: 'text-right'});
                                $tail.append($('<button>', {type: 'button', text: '確定', class: 'btn btn-success'}).on('click', () =>
                                {
                                    location.href = '/#/profile/lesson/classroom/' + lesson._lesson_id.val();
                                }));
                                createPopup
                                ({
                                    close: true,
                                    head: '購買完成',
                                    body: '該課程購買成功。',
                                    type: 'green',
                                    tail: $tail
                                });
                            }
                            else if (xhr.status == 202)
                            {
                                closePopup({unfreezed : true});
                                $.alert(message, '失敗');
                            }
                        },
                        error()
                        {
                            closePopup({unfreezed : true});
                            layout._request_relogin();
                        }
                    });

                    $btnOK.attr({disabled: false});
                });
                $btnSet.append($btnCancel);
                $btnSet.append($btnOK);

                // closePopup({closeAll: true});
                createPopup
                ({
                    head: '購買確認',
                    body: $popupBody,
                    type: 'default',
                    tail: $btnSet,
                    freezed: 1
                });

                this._btn_refill_cellphone.on('click', $.proxy(() =>
                {
                    if(this._btn_refill_cellphone.text() == '修改手機')
                    {
                        this.oldPhoneNumber = this._buyer_phone.val();
                        this._buyer_phone.focus();
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

                this._buyer_phone.on('keyup', $.proxy(() =>
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
            }
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
                    head: '驗證成功',
                    body: '此手機成功完成驗證，日後若更換手機號碼，則必須重新驗證新手機號碼。',
                    type: 'green'
                });
            },(e) =>
            {
                closePopup({unfreezed: true});
                this._popup_error_message(e);
            });
        },
        _enter_current_classroom: function()
        {
            if (this._restrict.val() == '1') { location.href = '/#/profile/lesson/classroom/' + this._lesson_id.val(); }
            else
            {
                if (this._over_deadline.val() == true) { $.alert('本課程已超過觀看期限，請重新購買', '錯誤'); }
                else
                {
                    $.confirm
                    ({
                        title: '重要提醒',
                        content: '你確定要進入 <span class="color-emphasized2">' + $('#lesson_name').val() + '</span> 的課程教室？<br>' +
                                 '一旦進入教室以後將無法申請退費該課程，詳細資訊請查看<a href="/contact/terms#refund">退費規定</a>',
                        buttons:
                        {
                            'ok':
                            {
                                text: '確定進入',
                                btnClass: 'btn-success',
                                action: function()
                                {
                                    $.ajax
                                    ({
                                        url: '/ajax/restrictLessonUnableRefund',
                                        type: 'post',
                                        dataType: 'json',
                                        async: false,
                                        data:
                                        {
                                            l_id: lesson._lesson_id.val(),
                                        },
                                        headers:
                                        {
                                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                        },
                                        success(data)
                                        {
                                            if (data == 'success')
                                            {
                                                location.href = '/#/profile/lesson/classroom/' + lesson._lesson_id.val();
                                            }
                                            else { $.alert(data, '錯誤'); }
                                        }
                                    })
                                }
                            },
                            'exit':
                            {
                                text: '稍後再上課',
                                btnClass: 'btn-red',
                                action: function() {}
                            }
                        }
                    })
                }
            }
        },
        _use_favorite: function(element)
        {
            let arr, l_id;

            arr = document.location.pathname.split('/');

            if (arr.length > 2) { l_id = arr[arr.length - 1]; }

            if (element.hasClass('card__content__favorite__add__btn')) { addFavorite(l_id); }
            else { cancelFavorite(l_id); }
        }
    }
    return _const;
}());

var favoriteModule,
    image_upload_module,
    qaModule,
    clearHtmlModule,
    lesson,
    scrollSpyModule,
    hashBindController,
    _init_map_module,
    systemMessage;


function _process_hash(hash)
{
    if(hash)
    {
        if(hash.search('chapter-') == 0)
        {
            var hashSplit = hash.split('-');
            if(hashSplit.length>1){
                $('.lesson-list').eq(hashSplit[1]).click();
            }
        }
        else
        {
            setTimeout(() => {
                $('#preview_tab_bar ul a[href="#content_' + hash + '"]').click();
            }, 500);
        }
    }
}

$(function()
{
    rollingLoading = rollingLoadingModule();
    lesson = new lesson();
    // set favoriteModule into a singleton
    favoriteModule = new favoriteModule();
    // set imageUploadModule into a singleton
    // imageUploadModule = new imageUploadModule();
    // set qaModule into a singleton
    qaModule = new qaModule();
    clearHtmlModule = new clearHtmlModule();

    scrollSpyModule = new scrollSpyModule();
    _init_map_module = new _init_map_module();

    initQAModule();
    qaModule.initQA();

    hashBindController = hashBindController();
    hashBindController.init(_process_hash);
    systemMessage = systemMessageModule({mode: 1});
})

function addFavorite(l_id)
{
    favoriteModule.addFavorite(l_id).then(value =>
    {
        if (value === 'success')
        {
            let element,
                element_m;

            element   = $('#Favorite');
            element_m = $('#Favorite_m');

            let insert_html = '<i class="far fa-heart" aria-hidden="true"></i>' +
                              ' 取消收藏';

            element.html(insert_html);
            element_m.html(insert_html);
            element.toggleClass('card__content__favorite__add__btn');
            element.toggleClass('card__content__favorite__cancel__btn');
            element_m.toggleClass('card__content__favorite__add__btn');
            element_m.toggleClass('card__content__favorite__cancel__btn');
        }
        else { $.alert(value, '錯誤'); }
    })
}

function cancelFavorite(l_id)
{
    favoriteModule.cancelFavorite(l_id).then(value =>
    {
        if (value === 'success')
        {
            let element,
                element_m;

            element   = $('#Favorite');
            element_m = $('#Favorite_m');

            let insert_html = '<i class="fas fa-heart" aria-hidden="true"></i>' +
                              ' 加入收藏';

            element.html(insert_html);
            element_m.html(insert_html);
            element.toggleClass('card__content__favorite__add__btn');
            element.toggleClass('card__content__favorite__cancel__btn');
            element_m.toggleClass('card__content__favorite__add__btn');
            element_m.toggleClass('card__content__favorite__cancel__btn');
        }
        else { $.alert(value, '錯誤'); }
    })
}

function scrollSpyModule()
{
    var scrollSpy_offset = null;

    $('#preview_tab_bar ul a').click(function(event)
    {
        let href = $(this).attr('href');
        scrollSpy_offset = $('#navigation').outerHeight() + $('#preview_tab_bar ul').outerHeight() + 20;

        event.preventDefault();
        $(href)[0].scrollIntoView();
        scrollBy(0, -scrollSpy_offset);
        hashBindController.setHash(href.replace('content_', ''));
    });
}

function _tab_switch(id)
{
    // 切換課程菜單
    var top_range = Math.floor(lesson._top_range) - 200;
    $('section:eq(' + id + ')').show(600);
    $('html').animate({scrollTop: top_range}, 800);
}

// Play Video
function _zoom_video(id, src)
{
    // 顯示播放清單
    var video_mask = $('#video_mask');
    var video_player = videojs('video_player');
    video_mask.attr('style', 'display: flex;');
    video_player.src(src);
    $('body').attr('style', 'overflow: hidden;');
    $('#video_item_' + id).addClass('video-active');
    $('#lesson_video_list').scrollTop($('#lesson_video_list').scrollTop() + $('#video_item_' + id).position().top);
    hashBindController.setHash('v-'+id);
}

function _change_video(id, src)
{
    // 選取播放清單上的影片 切換影片
    var video_player = videojs('video_player');
    video_player.src(src);
    video_player.ready(function()
    {
        video_player.play();
    });
    $('.lesson-video-list-item').removeClass('video-active');
    $('#video_item_' + id).addClass('video-active');
    $('#lesson_video_list').scrollTop($('#lesson_video_list').scrollTop() + $('#video_item_' + id).position().top);
    hashBindController.setHash('v-'+id);
}

function _before_login(item, l_id)
{
    // 要求使用者登入
    $.ajax
    ({
        type: 'POST',
        url: '/ajax/add_click_data',
        dataType: 'json',
        async: false,
        data:
        {
            item: item,
            l_id: l_id
        },
        headers:
        {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        complete: function()
        {
            layout._sidebar_login.click();
        }
    })
}

function _init_map_module()
{
    if ($('#content_map').length !== 0)
    {
        // 設定Google Map 實體課
        $('#content_map').show(600);

        // 配合show(600)因此setTimeout 500
        setTimeout(function ()
        {
            var address        = $('#lesson_location').text().slice(5);
            var key            = '&key=AIzaSyAf6lxu3iMOhxqhcWquqS_XPBCvqpyrdCE';
            var google_map_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + key;

            // 取得地址所屬的經緯度
            // 將經緯度放入Google Map
            $.get(google_map_url, function(data, status)
            {
                var uluru = data.results[0].geometry.location;
                var map   = new google.maps.Map(document.getElementById('map'),
                {
                    zoom: 16,
                    center: uluru,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var marker = new google.maps.Marker(
                {
                    position: uluru,
                    title: address,
                    map: map
                });
            });
        }, 500);
    }
}

function initQAModule()
{
    // Custom QA Moudle function
    qaModule.initReplyCard = function()
    {
        let qa_img_lab          = $('#qa_img_lab'),
            qa_img_input        = $('#qa_img_input'),
            qa_my_input         = $('#qa_my_input'),
            qa_send             = $('#qa_send'),
            qa_edit_send        = $('#qa_edit_send'),
            upload_progress_bar = $('#upload_progress_bar'),
            uploaded__text      = $('#uploaded__text'),
            uploading__text     = $('#uploading__text'),
            token               = qa_send.data('token') || qa_edit_send.data('token'),
            t_token             = qa_send.data('t_token') || qa_edit_send.data('t_token'),

            // Set Listener Of Input DOM
            targetNode = qa_my_input[0],
            config     = { attributes: true, childList: true, subtree: true },
            checkURL,
            observer;

        qa_img_lab.removeAttr('id');
        qa_img_input.removeAttr('id');
        qa_my_input.removeAttr('id');
        qa_send.removeAttr('id');
        qa_send.removeAttr('data-t_token');
        qa_send.removeAttr('data-token');
        qa_edit_send.removeAttr('id');
        qa_edit_send.removeAttr('data-t_token');
        qa_edit_send.removeAttr('data-token');
        upload_progress_bar.removeAttr('id');
        uploaded__text.removeAttr('id');
        uploading__text.removeAttr('id');

        qa_img_lab.on('click', () =>
        {
            qa_img_input.trigger('click');
        });

        // Upload Image When select File
        qa_img_input.on('change', (e) =>
        {
            if (qa_img_input.val() != '')
            {
                let imageUpload = new imageUploadModule();

                imageUpload.imageUploading = function()
                {
                    $(e.target).attr('disabled', 'disabled');
                    uploading__text.show();
                }

                imageUpload.imageUploadingProgress = function(percent_complete)
                {
                    uploading__text.show();
                    upload_progress_bar.css('width', percent_complete + "%");
                    uploaded__text.hide();
                }

                imageUpload.imageUploaded = function(url)
                {
                    uploading__text.hide();
                    uploaded__text.show();

                    $(e.target).removeAttr('disabled');

                    qa_my_input.append('<img src="' + url + '">');
                }

                imageUpload.imageUpload(qa_img_input[0].files);
            }
        });

        // Block Drop
        qa_my_input.on('drop', (e) =>
        {
            e.preventDefault();
        });

        // Block Shift + Enter
        qa_my_input.on('keydown', (e) =>
        {
            if (e.keyCode == 13 && e.shiftKey)
            {
                e.preventDefault();
            }
        });

        qa_my_input.on('paste', (e) =>
        {
            let HTMLtext,
                temp;

            if (e.originalEvent.clipboardData.getData("text/plain") != '')
            {
                let textArr;

                e.preventDefault();
                HTMLtext = e.originalEvent.clipboardData.getData("text/plain") || e.clipboardData.getData("text/plain");
                temp = document.createElement("div");

                textArr = HTMLtext.split(/\n/g);

                for (let i = 0; i < textArr.length; i++)
                {
                    temp.innerHTML += '<div>' + (/[\S]+/g.test(textArr[i]) ? textArr[i] : '<br>') + '</div>';
                }
                document.execCommand("insertHTML", false, temp.innerHTML);
            }
            else
            {
                e.preventDefault();
            }
        });

        qa_send.on('click', () =>
        {
            if (qa_my_input.html() == '') { return; }

            let insert_HTML = qa_my_input[0].innerHTML,
                send_data = [];

            insert_HTML = clearHtmlModule.QaClearText(insert_HTML);

            send_data =
            {
                text: insert_HTML,
                token: token || null,
                area: 'shop',
            };

            qaModule.sendNewResponse(send_data).then(e =>
            {
                if (e)
                {
                    qaModule.initQA();
                }
                else
                {
                    $.confirm
                    ({
                        title: '錯誤',
                        content: ('錯誤訊息：' + e + '<br />' || null) +
                                 '如有需要協助，請聯絡我們<br />' +
                                 '信箱: <span style="color: red;">eason.yea@gmail.com</span><br />' +
                                 '電話: <span style="color: red;">(02)2955-4564</span>',
                        buttons:
                        {
                            '確定':
                            {
                                btnClass: 'btn-red',
                                action: function() { location.reload(); }
                            }
                        }
                    });
                }
            });
        });

        qa_edit_send.on('click', () =>
        {
            if (qa_my_input.html() == '') { return; }

            let insert_HTML = qa_my_input[0].innerHTML,
                send_data   = [];

            insert_HTML = clearHtmlModule.QaClearText(insert_HTML);

            send_data =
            {
                text: insert_HTML,
                token: token || null,
                t_token: t_token || null,
                area: 'shop',
            };

            qaModule.sendEditResponse(send_data).then(e =>
            {
                if (e)
                {
                    qaModule.initQA();
                }
                else
                {
                    $.confirm
                    ({
                        title: '錯誤',
                        content: '如有需要協助，請聯絡我們<br />' +
                                 '信箱: <span style="color: red;">eason.yea@gmail.com</span><br />' +
                                 '電話: <span style="color: red;">(02)2955-4564</span>',
                        buttons:
                        {
                            '確定':
                            {
                                btnClass: 'btn-red',
                                action: function() { location.reload(); }
                            }
                        }
                    });
                }
            });
        });
    }
}
