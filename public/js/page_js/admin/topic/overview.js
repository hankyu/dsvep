var topic_overview = (function()
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
            this._topic_data;
            this._add_topic             = $('#add_topic');
            this._topic_overview        = $('#topic_overview');
            this._ul_topic              = $('.ul_topic');
            this._category_container    = $('.category_container');
            this.active_topic_idx       = 0;
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initial();
            objThis._get_topic_list();
        },
        _initial: function()
        {
            this._add_topic.on('click', $.proxy(function()
            {
                $.ajax
                ({
                    url: '/ajax/get_topic_data',
                    type: 'get',
                    dataType: 'json',
                    async: false,
                    success(data)
                    {
                        topicname  = '';
                        topic_data = data.topic_data;

                        for (i = 0; i < topic_data.length; i++)
                        {
                            topicname += '<option value="' + topic_data[i] + '">';
                        }

                        option =
                        '<p>' +
                          '<input class="form-control topic" type="text" list="topicname" placeholder="請選擇或輸入主題">' +
                          '<datalist id="topicname">' +
                          topicname +
                          '</datalist>' +
                        '</p>' +
                        '<input class="form-control category" type="text" placeholder="請輸入類別">';

                        $.confirm
                        ({
                            title: '新增主題',
                            content: option,
                            buttons:
                            {
                               'ok':
                               {
                                  text: '確定',
                                  btnClass: 'btn-success',
                                  action: function()
                                  {
                                      var topic = this.$content.find('.topic').val();
                                      var category = this.$content.find('.category').val();
                                      if (topic == '')
                                      {
                                          $.alert('請輸入主題', '錯誤');
                                          return false;
                                      }
                                      else if (category == '')
                                      {
                                          $.alert('請輸入類別', '錯誤');
                                          return false;
                                      }
                                      else
                                      {
                                          $.ajax
                                          ({
                                              url: '/ajax/add_topic',
                                              type: 'post',
                                              dataType: 'json',
                                              async: false,
                                              data:
                                              {
                                                  topic   : topic,
                                                  category: category
                                              },
                                              headers:
                                              {
                                                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                              },
                                              success(data)
                                              {
                                                  if (data.status == true)
                                                  {
                                                      $.alert('新增成功', '成功');
                                                      topic_overview._get_topic_list();
                                                      $('.category').val('');
                                                  }
                                                  else
                                                  {
                                                      $.alert('分類重複', '錯誤');
                                                      $('.category').val('');
                                                  }
                                              },
                                              error()
                                              {
                                                  $.alert("好像出了一點狀況", "錯誤");
                                              }
                                          })
                                          return false;
                                      }
                                  }
                               },
                               'cancel':
                               {
                                  text: '取消',
                                  btnClass: 'btn-danger',
                                  action: function() {}
                               }
                            }
                        })
                    },
                    error()
                    {
                        $.alert("好像出了一點狀況", "錯誤");
                    }
                })

            }, this))
            $('#swap_category').on('click',function(e){
                e.stopPropagation();
                swap_lists(1);
            });
            $('#swap_topic').on('click',function(e){
                e.stopPropagation();
                swap_lists(0);
            });
        },
        _get_topic_list: function()
        {
            var objThis = this;
            $.ajax
            ({
                type: 'get',
                url: '/ajax/get_topic_list',
                success: function(data)
                {
                    var topic_list = data.topic_list;
                    objThis._set_topic_list(topic_list);
                }
            })
        },
        _set_topic_list: function(topic_list)
        {
            let li_topic,
                li_category,
                ul_category;

            this._topic_list = topic_list;

            swap_lists(0);
            this._ul_topic.html('');
            this._category_container.html('');
            
            for (i = 0, j= topic_list.length; i < j; i++)
            {
                li_topic = $('<li data-tid="'+i+'">').text(topic_list[i]['topic']).appendTo(this._ul_topic);
                li_topic.on('click',function(event){
                    let $this = $(this);
                    console.log(event, this.dataset.tid);
                    $this.addClass('active').siblings().removeClass('active');
                    topic_overview.active_topic_idx = this.dataset.tid;
                    topic_overview._category_container.find('ul[data-tid='+ this.dataset.tid +']').addClass('active').siblings().removeClass('active');
                    swap_lists(0);
                });
                $('<button class="btn_edit" onclick="_edit_topic(' + i + ')"><span class="fas fa-pencil-alt"></span></button>').appendTo(li_topic);
                $('<button class="btn_del" onclick="_delete_topic(' + i + ')"><span class="fas fa-trash-alt"></span></button>').appendTo(li_topic);

                ul_category = $('<ul data-tid="'+i+'">').addClass('ul_category').appendTo(this._category_container);
                if(i == this.active_topic_idx)
                {
                    li_topic.addClass('active');
                    ul_category.addClass('active');
                }

                for (ii = 0, jj = topic_list[i]['num']; ii < jj; ii++)
                {

                    li_category = $('<li onclick="showCategory('+i+')">').text(topic_list[i][ii])
                        .on('click',function(){
                            swap_lists(1);
                        }).appendTo(ul_category);
                    $('<button class="btn_edit" onclick="_edit_category(' + i + ', ' + ii + ')"><span class="fas fa-pencil-alt"></span></button>').appendTo(li_category);
                    $('<button class="btn_del" onclick="_delete_category(' + i + ', ' + ii + ')"><span class="fas fa-trash-alt"></span></button>').appendTo(li_category);
                }
            }
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

var topic_overview;
$(function()
{
    topic_overview = new topic_overview();
})

function _delete_category(topic_id, category_id)
{
    topic = topic_overview._topic_list[topic_id]['topic'];
    category = topic_overview._topic_list[topic_id][category_id];

    $.confirm
    ({
        title: '刪除分類',
        content: '確定要刪除 <span class="color-emphasized2">' + topic + '</span> 底下的分類 <span class="color-emphasized2">' + category + ' </span>嗎？',
        buttons:
        {
            'ok':
            {
                text: '確定',
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/delete_category',
                        type: 'delete',
                        dataType: 'json',
                        async: false,
                        data:
                        {
                            topic   : topic,
                            category: category,
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(data)
                        {
                            if (data.status == 'ok')
                            {
                                $.alert('刪除成功', '成功');
                                topic_overview._get_topic_list();
                            }
                            else
                            {
                                $.alert(data.status, '錯誤');
                            }
                        },
                        error()
                        {
                            $.alert("好像出了一點狀況", "錯誤");
                        }
                   })
                }
            },
            'cancel':
            {
               text: '取消',
               btnClass: 'btn-danger',
               action: function() {}
            }
        }
    })
}

function _delete_topic(topic_id)
{
    topic = topic_overview._topic_list[topic_id]['topic'];

    $.confirm
    ({
        title: '刪除主題',
        content: '確定要刪除 <span class="color-emphasized2">' + topic + '</span> 的主題嗎？刪除後相關類別將被刪除且無法被復原！',
        buttons:
        {
            'ok':
            {
                text: '確定',
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/delete_topic',
                        type: 'delete',
                        dataType: 'json',
                        async: false,
                        data:
                        {
                           topic: topic,
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(data)
                        {
                            if (data.status == 'ok')
                            {
                                $.alert('刪除成功', '成功');
                                topic_overview._get_topic_list();
                            }
                            else
                            {
                                $.alert(data.status, '錯誤');
                            }
                        },
                        error()
                        {
                            $.alert("好像出了一點狀況", "錯誤");
                        }
                   })
                }
            },
            'cancel':
            {
               text: '取消',
               btnClass: 'btn-danger',
               action: function() {}
            }
        }
    })
}

function _edit_topic(topic_id)
{
    old_topic = topic_overview._topic_list[topic_id]['topic'];

    $.confirm
    ({
        title: '修改主題名稱',
        content: '<input type="text" class="form-control topic">',
        buttons:
        {
            'ok':
            {
                text: '確定',
                btnClass: 'btn-success',
                action: function()
                {
                    var new_topic = this.$content.find('.topic').val();
                    if (new_topic == '')
                    {
                        $.alert('請輸入主題', '錯誤');
                        return false;
                    }
                    else
                    {
                        $.ajax
                        ({
                            url: '/ajax/edit_topic',
                            type: 'post',
                            dataType: 'json',
                            async: false,
                            data:
                            {
                               old_topic: old_topic,
                               new_topic: new_topic,
                            },
                            headers:
                            {
                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                            },
                            success(data)
                            {
                                if (data.status == 'ok')
                                {
                                    $.alert('修改成功', '成功');
                                    topic_overview._get_topic_list();
                                }
                                else
                                {
                                    $.alert(data.status, '錯誤');
                                }
                            },
                            error()
                            {
                                $.alert("好像出了一點狀況", "錯誤");
                            }
                       })
                    }
                }
            },
            'cancel':
            {
               text: '取消',
               btnClass: 'btn-danger',
               action: function() {}
            }
        }
    })
}

function _edit_category(topic_id, category_id)
{
    topic = topic_overview._topic_list[topic_id]['topic'];
    old_category = topic_overview._topic_list[topic_id][category_id];

    $.confirm
    ({
        title: '修改 <span class="color-emphasized2">' + topic + '</span> 的 <span class="color-emphasized2">' + old_category +'</span> 分類名稱',
        content: '<input type="text" class="form-control category">',
        buttons:
        {
            'ok':
            {
                text: '確定',
                btnClass: 'btn-success',
                action: function()
                {
                    var new_category = this.$content.find('.category').val();
                    if (new_category == '')
                    {
                        $.alert('請輸入分類', '錯誤');
                        return false;
                    }
                    else
                    {
                        $.ajax
                        ({
                            url: '/ajax/edit_category',
                            type: 'post',
                            dataType: 'json',
                            async: false,
                            data:
                            {
                               topic       : topic,
                               old_category: old_category,
                               new_category: new_category,
                            },
                            headers:
                            {
                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                            },
                            success(data)
                            {
                                if (data.status == 'ok')
                                {
                                    $.alert('修改成功', '成功');
                                    topic_overview._get_topic_list();
                                }
                                else
                                {
                                    $.alert(data.status, '錯誤');
                                }
                            },
                            error()
                            {
                                $.alert("好像出了一點狀況", "錯誤");
                            }
                       })
                    }
                }
            },
            'cancel':
            {
               text: '取消',
               btnClass: 'btn-danger',
               action: function() {}
            }
        }
    })
}

// swap to see topic/category list for small size devices.
function swap_lists(direct)
{
    var $topic_area = $('#topic_area').clearQueue().stop();

    if(direct)  // swap to see category
    {
        $topic_area.animate({left:$('.topic_scroller_xs').width()-$('#topic_area').width()},400);
    }
    else       // swap to see topic
    {
        $topic_area.animate({left:0},400);
    }
}

$(window).resize(function(){
    swap_lists(0);
});