var message = (function()
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
      this._dialog = '';
      this._match_member = '';
      this._firebase_path = firebaseController.getPath('message');
      this._add_message = $('#add_message');
      this._member_account = $('#member_account').val();
      this._icon_top = $('#icon_top');
      this._btn_send = $('#btn_send');
      this._close_message = $('#close_message');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll: function()
    {
      //Bootstrap Tooltip On the Lesson Overview
      $('[data-toggle="message"]').tooltip();

      //Listen Firebase Message Data
      var message_ref = firebase.database().ref(this._firebase_path);
      message_ref.on('value', function(snapshot)
      {
        $('#all_message_list').html('');
        all_dialog = new Array();
        dialog_name = new Array();
        var data = snapshot.val();
        $.each(data, function(dialog, dialog_token)
        {
          var dialog = dialog;
          var dialog_split = dialog.split(',');
          var member_exist = dialog_split.indexOf(message._member_account);
          if (member_exist != -1)
          {
            all_dialog.push(dialog_token);
            dialog_name.push(dialog);
            all_dialog[all_dialog.length - 1] = new Array();
            $.each(dialog_token, function(key, value)
            {
              all_dialog[all_dialog.length - 1].push(value);
            })
          }
        })

        if (all_dialog.length > 1)
        {
          for (i = 0; i < all_dialog.length - 1; i++)
          {
            first_time = all_dialog[i][all_dialog[i].length - 1]['time'];
            second_time = all_dialog[i + 1][all_dialog[i + 1].length - 1]['time'];
            if (first_time < second_time)
            {
              temp_data = all_dialog[i];
              all_dialog[i] = all_dialog[i + 1];
              all_dialog[i + 1] = temp_data;

              temp_name = dialog_name[i];
              dialog_name[i] = dialog_name[i + 1];
              dialog_name[i + 1] = temp_name;
            }
          }
        }

        dialog_num = all_dialog.length;

        /* -------------------------- */
        /*     render dialog list     */
        /* -------------------------- */
        for (let i = 0; i < all_dialog.length; i++)
        {
          let
            $dialogBox,
            $avatar,
            
            unread = 0;


          from_member = all_dialog[i][all_dialog[i].length - 1]['from'];
          to_member = all_dialog[i][all_dialog[i].length - 1]['to'];
          look_member = $('#member_account').val();
          while(all_dialog[i].length - 1 - unread >= 0 && all_dialog[i][all_dialog[i].length - 1 - unread]['read'] == 'unread')
          {
            unread ++;
          }

          $dialogBox = $('<figure>', {id: 'dialog_box_' + i, class: 'message-list'});
          $avatar = $('<div class="avatar">').appendTo($dialogBox);
          if (from_member == look_member)
          {
            $avatar.append($('<img>',{src: '/img/personal/avatar/' + to_member +'_ava.jpeg', class: 'imgAvatar'}).on('error', function()
            {
              this.src = '/img/personal/avatar/avatar-vistor.png';
            }));
            $dialogBox.append($('<figcaption><div class="from">' + to_member + '</div><div class="status">訊息已送出</div></figcaption>'));
          }
          else
          {
            if(unread){ $dialogBox.addClass('unread'); }
            if(from_member == '系統')
            {
              $avatar.append($('<span class="imgAvatar sys"><i class="fas fa-satellite-dish"></i></span>'));
            }
            else
            {
              $avatar.append($('<img>',{src: '/img/personal/avatar/' + from_member +'_ava.jpeg', class: 'imgAvatar'}).on('error', function()
              {
                this.src = '/img/personal/avatar/avatar-vistor.png';
              }))
            }
            $dialogBox.append($('<figcaption><div class="from">' + from_member + '</div><div class="status">' + (unread? unread + ' 則新訊息！' : '訊息已讀') + '</div></figcaption>'));
          }
          $dialogBox.on('click', $.proxy(function(e)
          {
            $('#reply_box').val('');
            message._refresh_content(all_dialog[i], i, dialog_num, dialog_name[i]);
            $('#reply_box').focus();

            if ($(window).width() < 768)
            {
              $('.message-content').addClass('showContent');
              $('.message-content-text').scrollTop($('.message-content-text')[0].scrollHeight);
            }
          }, this));

          $('#all_message_list').append($dialogBox);
        }

        if (message._dialog != '')
        {
          for (i = 0; i < all_dialog.length; i++)
          {
            first_member = all_dialog[i][0]['from'];
            second_member = all_dialog[i][0]['to'];
            temp_dialog = first_member > second_member ? first_member + ',' + second_member : second_member + ',' + first_member;
            if (temp_dialog == message._dialog)
            {
              message._refresh_content(all_dialog[i], i, dialog_num, dialog_name[i]);
              break;
            }
          }
        }
      })

      this._add_message.on('click', $.proxy(function()
      {
        var objThis = this;
        $.confirm
        ({
          title: '新增訊息',
          content:
            '<input type=text id="ms_account" class="form-control" style="margin-bottom: 10px;" placeholder="欲傳送的使用者帳號">' +
            '<textarea id="ms_content" rows="20" class="form-control" placeholder="請輸入內容..."></textarea>',
          columnClass: 'large',
          buttons:
          {
            '取消': {},
            '傳送！':
            {
              btnClass: 'btn-green',
              action: function()
              {
                var ms_account = this.$content.find('#ms_account').val();
                var ms_content = this.$content.find('#ms_content').val();
                account_exist = message._check_account_exist(ms_account);
                if (ms_account != objThis._member_account)
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
                    var post_data =
                    {
                      from: objThis._member_account,
                      to: ms_account,
                      content: ms_content
                    }

                    try{
                      gtag('event', 'userMessage', { event_category: 'message', event_action: 'userMessage', event_label: objThis._member_account, value: ms_account});
                    }catch(e){}

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
        })
      }, this));

      this._close_message.on('click', $.proxy(function()
      {
        $('.message-content').removeClass('showContent');
      }, this));
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
          result = data.status
        },
        error: function(e)
        {
          result = e;
        }
      });
      return result;
    },
    _refresh_content: function(all_dialog, id, dialog_num, dialog)
    {
      let
        $messageContent = $('#message_content'),
        $currDialogBox = $('#dialog_box_' + id);

      look_member = $('#member_account').val();
      match_member = all_dialog[0]['from'] == look_member ? all_dialog[0]['to'] : all_dialog[0]['from'];
      this._dialog = dialog;
      this._match_member = match_member;

      //Resize Content Height
      if (match_member == '系統')
      {
        $('#message_content').addClass('sys')
        $('#message_content').removeClass('no-sys')
      }
      else
      {
        $('#message_content').removeClass('sys')
        $('#message_content').addClass('no-sys')
      }

      if ((all_dialog[all_dialog.length - 1]['from'] == match_member) && (all_dialog[all_dialog.length - 1]['read'] == 'unread'))
      {
        //Read Message
        post_data =
        {
          read: 'read'
        };
        var path = this._firebase_path + '/' + dialog;
        firebase.database().ref(path).once('value').then(function(e)
        {
          var data = e.val();
          $.each(data, function(token, list)
          {
            $.each(list, function(key, value)
            {
              if ((key == 'from') && (value == match_member))
              {
                firebase.database().ref(path + '/' + token).update(post_data);
              }
            })
          })
        })

        //Refresh This Dialog Box
        $currDialogBox.addClass('unread').find('.status').text('訊息已讀');
      }

      //Active Dialog Box
      $currDialogBox.addClass('message-list-active').siblings().removeClass('message-list-active');


      /* ----------------------- */
      /*     Get All Message     */
      /* ----------------------- */
      $('#user_name').html('<span>' + match_member + '</span>');
      $('#message_content').html('');
      for (i = 0; i < all_dialog.length; i++)
      {
        let from = all_dialog[i]['from'];
        var temp_content = all_dialog[i]['content'];
        var temp_content_has_html_tag = this._html_encode(temp_content);
        var height = 35 + (temp_content_has_html_tag.split('\n').length - 1) * 24;
        var content = temp_content_has_html_tag.split('\n').join('<br>')
        var message_class = from == match_member ? 'receive-detail' : 'send-detail';
        var send_time = message._format_time(all_dialog[i]['time']);
        var place = from == match_member ? 'right' : 'left';
        $messageContentP = $('<p>', {class: message_class});
        if(from == match_member)
        {
          if(from == '系統')
          {
            $messageContentP.append($('<i class="fas fa-satellite-dish fasAvatar"></i>'));
          }
          else
          {
            $messageContentP.append($('<img class="imgAvatar" src="/img/personal/avatar/'+all_dialog[i]['from']+'_ava.jpeg">').on('error', function()
            {
              this.src = '/img/personal/avatar/avatar-vistor.png';
            }));
          }
        }
        $messageContentLabel = $('<label data-toggle="message" data-placement="' + place + '" title="' + send_time + '" class="col-form-label">' + content + '</label>').appendTo($messageContentP);
        if(all_dialog[i].href)
        {
          $messageContentLabel.append($('<a target="_blank" href="' + all_dialog[i].href + '"><i class="fas fa-external-link-alt"></i></a>'));
        }
        $messageContent.append($messageContentP);
      }

      $("#message_content").scrollTop($('#message_content')[0].scrollHeight);

      //Show Input Box
      if (match_member != '系統')
      {
        $('#message_input_box').show();
        $('#reply_box').keypress(function(event)
        {
          key = event.keyCode;
          if (key == 13)
          {
            if (!event.shiftKey)
            {
              event.preventDefault();
              content = this.value.trim();
              match_member = $(this).data('reply_member');

              if ((content != '') && (message._match_member != '') && (message._match_member != '系統'))
              {
                var post_data =
                {
                  from: look_member,
                  to: match_member,
                  content: content
                }

                try{
                  gtag('event', 'userMessage', { event_category: 'message', event_action: 'userMessage', event_label: look_member, value: match_member});
                }catch(e){}
                
                firebaseController.sendInsiteMessage(post_data);
                $('#reply_box').val('');
              }
            }
          }
        })

        $('#btn_send').click(function()
        {
          content = $('#reply_box').val().trim();
          match_member = $(this).data('reply_member');

          if ((content != '') && (message._match_member != '') && (message._match_member != '系統'))
          {
            var post_data =
            {
              from: look_member,
              to: message._match_member,
              content: content
            }

            try{
              gtag('event', 'userMessage', { event_category: 'message', event_action: 'userMessage', event_label: look_member, value: message._match_member});
            }catch(e){}

            firebaseController.sendInsiteMessage(post_data);
            $('#reply_box').val('');
          }
        })
      }
      else
      {
        $('#message_input_box').hide();
      }
    },
    _html_encode: function(content)
    {
      content = $.trim(content);
      return content.replace(/[&"'\<\>]/g, function(c)
      {
        switch (c)
        {
          case '&': return '&amp;';
          case "'": return '&#39;';
          case '"': return '&quot;';
          case '<': return '&lt;';
          case '>': return '&gt;';
        }
      });
    },
    _format_time: function(time)
    {
      time_split = time.split(' ');
      date = time_split[0].split('/');
      time = time_split[1].split(':');
      date = date.map(this._pad_left)
      time = time.map(this._pad_left)
      date = date.join('/');
      time = time.join(':');
      return date + ' ' + time;
    },
    _pad_left: function(str)
    {
      return str.toString().length == 1 ? '0' + str : str;
    }
  }
  return _const;
}());

var message;
$(function()
{
  message = new message();
})
