var entity_lesson = (function()
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
      this._type = $('#type');
      this._media_type = $('#media_type');
      this._member_account = $('#member_account').val();

      //Tab Bar Switch
      this._lesson_tab_bar = $('#lesson_tab_bar');
      this._content_bulletin = $('#content_bulletin');
      this._content_chapter = $('#content_chapter');

      //Icon Of Toggle All Chapter
      this._toggle_all_chapter = $('#toggle_all_chapter');

      //Give Evaluation
      this._btn_evaluate = $('#btn_evaluate');
      this._eva_content = $('#eva_content');
      this._evaluated_wrapper = $('.evaluated-wrapper');
      this._eva_wrapper = $('.eva-wrapper');
      this._eva_star = $('.eva-star');

      //Viedo Mask
      this._close_mask = $('#close_mask');
      this._video_mask = $('#video_mask');

      this._btn_add_coupon = $('#btn_add_coupon');
      this._coupon_list = $('#coupon_list');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll: function()
    {
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
      if (this._type.val() == 'online')
      {
        var video_player = videojs('video_player',
        {
          controls: true,
          autoplay: false,
          preload: 'auto'
        });
      }

      if ($('#rollcall_status').val())
      {
        let
            statusValue = $('#rollcall_status').val(),
            content;
        const statusMsg = {
            '101': '課程補點',
            '102': '取消點名',
            '201': '點名重複',
            '202': '無此點名紀錄',
            '203': '該課程無此章節',
            '204': '行政無法點名課程',
            '205': '老師無法點名自己的課程',
            '206': '該會員無購買此課程',
            '207': '該課程今日沒有上課'
        };

        content = statusValue.match(/^\d*$/)? statusMsg[statusValue] : statusValue;
        $.confirm
        ({
          title: '通知',
          content: content,
          buttons:
          {
            '關閉':
            {
              btnClass: 'btn-success',
              action: function() {}
            }
          }
        });
      }

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

      //Check All Checkbox Is Checked
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

      // Close Video Play Mask
      this._close_mask.on('click', $.proxy(function()
      {
        // 關閉影片播放清單
        this._video_mask.attr('style', 'display: none;');
        $('.lesson-video-list-item').removeClass('video-active');
        $('body').attr('style', '');
        videojs('video_player').pause();
        hashBindController.setHash('');
      }, this));

      this._eva_star.on('mouseleave', $.proxy(function()
      {
        $('.select.fa-star-o').attr('style', '').removeClass('select');
        this._eva_star.find('.fa-star').attr('style', 'color: #FD0').addClass('select');
      }, this));

      this._eva_star.find('i').on('click', $.proxy(function()
      {
        this._eva_star.find('i').addClass('fa-star-o').removeClass('fa-star');
        $('.select').toggleClass('fa-star fa-star-o');
        $('.eva-footer').show(600);
      }, this));

      this._btn_evaluate.on('click', $.proxy(function()
      {
        var content = this._eva_content.val();
        var star = $('.select').length;
        $('.eva-title').text('評分結果');
        $('#eva_text').html(content);
        $('.eva-footer').hide();
      }, this));

      // Calc The Video Time Length 計算影片長度
      var viedo_length = $('.video-length');
      for (i = 0; i < viedo_length.length; i++)
      {
        var v_length = this._calc_video_length(viedo_length[i].dataset.video_length);
        viedo_length[i].innerHTML = v_length;
      }

      this._btn_add_coupon.on('click', $.proxy(function()
      {
        var member = $('#coupon_member').val();
        var discount = $('#coupon_discount').val();
        var end_time = $('#coupon_end_time').val();
        var l_id = $('#l_id').val();

        if (member == '') { $.alert('未輸入適用者', '錯誤') }
        else if (discount == '') { $.alert('未輸入折扣後價格', '錯誤') }
        else if (end_time == '') { $.alert('未輸入使用期限', '錯誤') }
        else
        {
          $.ajax
          ({
            url: '/ajax/add_coupon',
            type: 'post',
            dataType: 'json',
            data:
            {
              member: member,
              discount: discount,
              end_time: end_time,
              l_id: l_id
            },
            headers:
            {
              'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success: function(data)
            {
              if (data.status == 'ok')
              {
                $.confirm
                ({
                  title: '成功',
                  content: '新增成功',
                  buttons:
                  {
                    'ok':
                    {
                      btnClass: 'btn-info',
                      action: function()
                      {
                        location.reload();
                      }
                    }
                  }
                });
              }
              else if (data.status == 'member error') { $.alert('無此使用者', '錯誤') }
              else if (data.status == 'price error') { $.alert('輸入的折扣金額不符合規則', '錯誤') }
              else if (data.status == 'expire error') { $.alert('使用期限須大於今天', '錯誤') }
              else { console.log(data.status); }
            },
            error: function(e)
            {
              $.alert('不明原因錯誤', '錯誤');
            }
          })
        }
      }, this));

      $('#coupon_end_time').datepicker(
      {
        language: "zh",
        position: "top left",
        minDate: new Date(),
      });

      // 預設顯示課程介紹
      this._content_chapter.fadeIn();
      // 預設章節全部展開
      this._toggle_all_chapter.click();
    },
    _calc_video_length : function(sec)
    {
      // 轉換時間格式
      const ONE_HOUR = 60 * 60;
      const ONE_MIN = 60;
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
        var min = sec / ONE_MIN < 10 ? '0' + Math.floor(sec / ONE_MIN) : Math.floor(sec / ONE_MIN);
        sec = sec - (min * ONE_MIN);
        sec = sec < 10 ? '0' + sec : sec;
        return  hour + ':' + min + ':' + sec;
      }
    },
    _check_account_exist: function(ms_account)
    {
      // 確認是否有該使用者
      $.ajax
      ({
        type: 'POST',
        url: '/ajax/accountExist',
        dataType: 'json',
        async: false,
        data:
        {
          checked_account: ms_account
        },
        headers:
        {
          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success: function(data)
        {
          result = data.status;
        },
        error: function(e)
        {
          result = e;
        }
      })
      return result;
    },
  }
  return _const;
}());

var clearHtmlModule,
    entity_lesson,
    hashBindController,
    qaModule,
    systemMessage;

function _process_hash(hash)
{
    if(hash != '')
    {
        if(hash.search('chapter') == 0)
        {
            var hashSplit = hash.split('-');
            $('#label_chapter').click();
            if(hashSplit.length>1){
                $('.lesson-list').eq(hashSplit[1]).click();
            }
        }
        else
        {
            $('#label_'+hash).click();
        }
    }
}

$(function()
{
  entity_lesson = new entity_lesson();
  qaModule = new qaModule();
  clearHtmlModule = new clearHtmlModule();
  initQAModule();
  qaModule.initQA();
  hashBindController = hashBindController();
  hashBindController.init(_process_hash);
  systemMessage = systemMessageModule({mode: 1});
})

function _tab_switch(id)
{
  // 切換課程菜單
  $('section').attr('style', 'display: none;');
  var section = $('#content_' + id);
  section.show(600);
  $('html').animate({scrollTop: (section.offset().top - 130)}, 600);
  hashBindController.setHash(id);
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
  hashBindController.setHash('chapter-'+id);
}

function _change_video(id, src)
{
  // 選取播放清單上的影片 切換影片
  var video_player = videojs('video_player');
  var lesson_video = $('#lesson_video');

  video_player.src(src);
  video_player.ready(function()
  {
    video_player.play();
  });
  $('.lesson-video-list-item').removeClass('video-active');
  $('#video_item_' + id).addClass('video-active');
  $('#lesson_video_list').scrollTop($('#lesson_video_list').scrollTop() + $('#video_item_' + id).position().top);
  hashBindController.setHash('chapter-'+id);
}

function _star_over(count)
{
  var eva_star = $('.eva-star');
  eva_star.find('i:lt(' + count + ')').attr('style', 'color: #FD0').addClass('select');
  eva_star.find('i:gt(' + (count - 1) + ')').attr('style', '').removeClass('select');
}

function _init_map()
{
  // 設定Google Map 實體課
  $('section').attr('style', 'display: none;');
  $('#content_map').show(600);

  // 配合show(600)因此setTimeout 500
  setTimeout(function ()
  {
    var address = $('#lesson_location').text().slice(5);
    var key = '&key=AIzaSyAf6lxu3iMOhxqhcWquqS_XPBCvqpyrdCE';
    var google_map_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + key;

    // 取得地址所屬的經緯度
    // 將經緯度放入Google Map
    $.get(google_map_url, function(data, status)
    {
      var uluru = data.results[0].geometry.location;
      var map = new google.maps.Map(document.getElementById('map'),
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

function _send_message(account)
{
    $.confirm
    ({
        title: '發送訊息',
        content:
          '<input type=text id="ms_account" class="form-control" style="margin-bottom: 10px;" placeholder="欲傳送的使用者帳號" value="' + account + '">' +
          '<textarea id="ms_content" rows="20" class="form-control" placeholder="請輸入內容..."></textarea>',
        columnClass: 'large',
        buttons:
        {
          '取消':  {},
          '傳送！':
          {
              btnClass: 'btn-green',
              action:   function()
              {
                  var ms_account    = this.$content.find('#ms_account').val();
                  var ms_content    = this.$content.find('#ms_content').val();
                  var account_exist = entity_lesson._check_account_exist(ms_account);

                  if (ms_account != entity_lesson._member_account)
                  {
                      if (account_exist == false)
                      {
                          $.alert('無此用戶', '錯誤');
                          return false;
                      }
                      else if (ms_content == '')
                      {
                          $.alert('未輸入內容', '錯誤');
                          return false;
                      }
                      else
                      {
                          let post_data =
                          {
                              from:    entity_lesson._member_account,
                              to:      ms_account,
                              content: ms_content
                          }
                          firebaseController.sendInsiteMessage(post_data);
                          $.alert('已送出', '成功');
                      }
                  }
                  else
                  {
                      $.alert('請勿輸入自己的帳號', '錯誤');
                      return false;
                  }
              }
          }
        }
    });
}

function _remove_coupon(code)
{
    $.confirm
    ({
        title: '刪除優惠券',
        content: '你確定要刪除 <span class="color-emphasized2">' + code + '</span> 的優惠券嗎',
        buttons:
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/deleteCoupon',
                        type: 'delete',
                        dataType: 'json',
                        data:
                        {
                            code: code
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success: function(data)
                        {
                            if (data.status == 'success')
                            {
                                $.confirm
                                ({
                                    title: '成功',
                                    content: '移除成功',
                                    buttons:
                                    {
                                        'ok':
                                        {
                                            btnClass: 'btn-info',
                                            action: function()
                                            {
                                                location.reload();
                                            }
                                        }
                                    }
                                });
                            }
                        },
                        error: function(e)
                        {
                            $.alert('不明原因錯誤', '錯誤');
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
                area: 'classroom'
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
                area: 'classroom'
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
