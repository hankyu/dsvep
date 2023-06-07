var preview_lesson = (function()
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
      this._content = $('.content');
      this._temp_content = $('.temp_content');
      this._path = $('#path');
      this._media_type = $('#media_type');

      //Icon Of Toggle All Chapter
      this._toggle_all_chapter = $('#toggle_all_chapter');

      //Tab Bar Switch
      this._preview_tab_bar = $('#preview_tab_bar');
      this._content_intro = $('#content_intro');

      //Shopping Cart
      this._shopping_cart = $('.shopping-cart');
      this._shop_fund = $('#shop_fund');
      this._shopping_cart_panel = $('#shopping_cart_panel');
      this._lesson_label_wrapper_mobile = $('.lesson-label-wrapper-mobile');
      this._shop_left_day_time = $('#shop_left_day_time');
      this._shop_left_day_time_mobile = $('#shop_left_day_time_mobile');

      //Viedo Mask
      this._close_mask = $('#close_mask');
      this._video_mask = $('#video_mask');

      this._teacher_desc = $('#teacher_desc');
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
      var timestamp = new Date(lesson_data.end_fund.replace(/-/g,'/') + 'T00:00').getTime() - (new Date().getTime());

      if (timestamp > 0)
      {
          // Fundraising 優惠中 計算優惠剩餘天數
          setInterval(function()
          {
              timestamp = timestamp - 1000;
              var time = preview_lesson._calc_left_time(timestamp);
              var html_temp =
                '剩 <span class="text-theme-color">' + time.day + '</span>天' +
                ' <span class="text-theme-color">' + time.hour + '</span>小時' +
                ' <span class="text-theme-color">' + time.min + '</span>分' +
                ' <span class="text-theme-color">' + time.sec + '</span>秒';
              preview_lesson._shop_left_day_time.html(html_temp);
              preview_lesson._shop_left_day_time_mobile.html(html_temp);
          }, 1000);
          $('.shop-fee').show();
          this._create_percentage_progress(this._shop_fund);
      }
      else
      {
          //Fundraising End
          var start_time = new Date(lesson_data.start_time.replace(/-/g,'/') + 'T00:00').getTime() - (new Date().getTime());

          if (start_time > 0)
          {
            var lesson_type_html = ''

            if (lesson_data.type == 'entity') { lesson_type_html = '報名截止'; }
            else { lesson_type_html = '開課'; }

            // Prepare Stage 備課中 計算開課剩餘時間
            setInterval(function()
            {
                start_time = start_time - 1000;
                var time = preview_lesson._calc_left_time(start_time);
                var html_temp =
                  '再 <span class="text-theme-color">' + time.day + '</span>天' +
                  ' <span class="text-theme-color">' + time.hour + '</span>小時' +
                  ' <span class="text-theme-color">' + time.min + '</span>分' +
                  ' <span class="text-theme-color">' + time.sec + '</span>秒 ' + lesson_type_html;
                preview_lesson._shop_left_day_time.html(html_temp);
                preview_lesson._shop_left_day_time_mobile.html(html_temp);
            }, 1000);
            $('.shop-fee').show();
          }
          else
          {
              // Lesson Start 上課中
              $('.shop-fee').show();
          }
          this._create_percentage_progress(this._shop_fund);
      }

      $(function() { $("#accordion").accordion( { collapsible:true, active:false } ); });
      var quill = new Quill('.temp_content', {});
      var path_url = document.location.pathname;
      var path_url_split = path_url.split('/');
      if ((path_url_split[5] == 'preview') && (this._path.val() != ''))
      {
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
      }
      else { $('.content').html('尚無說明'); }

      //Tab Bar & Shop Cart Panel Fixed
      this._content_intro.fadeIn();

      var top_range = this._preview_tab_bar.offset().top;
      var width = 'width: ' + this._content_intro.width() + 'px;';
      top_range = Math.floor(top_range) - 100;

      //Close Video play Mask
      this._close_mask.on('click', $.proxy(function()
      {
        this._video_mask.attr('style', 'display: none;');
        $('.lesson-video-list-item').removeClass('video-active');
        $('body').attr('style', '');
        videojs('video_player').pause();
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
      videojs('video_player',
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
    },
    _create_percentage_progress: function(shop_fund)
    {
      // 計算人數百分比 去小數點 可以超過100%
      var percentage = 100;
      var percentage_content =
        '<div class="progress shop-progress col-xs-12 padding-0">' +
          '<div class="progress-bar" role="progressbar" style="width: ' + percentage + '%;">' +
            percentage + '%' +
          '</div>' +
        '</div>';
      shop_fund.append(percentage_content);
    },
    _calc_left_time : function(left_time)
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
    }
  }
  return _const;
}());

var preview_lesson,
    scrollSpy_module,
    _init_map_module;
$(function()
{
  preview_lesson   = new preview_lesson();
  scrollSpy_module = new scrollSpy_module();
  _init_map_module = _init_map_module();
})

//Play Video
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
}

function _init_map_module()
{
    if ($('#content_map').length !== 0)
    {
        // 設定Google Map 實體課
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
}

function scrollSpy_module()
{
    let scrollSpy_offset = null;

    $('#preview_tab_bar ul a').click(function(event)
    {
        scrollSpy_offset = $('#navigation').outerHeight() + $('#preview_tab_bar ul').outerHeight() + 20;

        event.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView();
        scrollBy(0, -scrollSpy_offset);
    });
}
