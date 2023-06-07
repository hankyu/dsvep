var order = (function()
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
      //Menu button
      this._btn_all = $('#all');
      this._btn_pay = $('#pay');
      this._btn_not_pay = $('#not_pay');
      this._btn_cancel = $('#cancel');

      //Overview Lesson Card item
      this._pay = $('.pay');
      this._not_pay = $('.not-pay');
      this._cancel = $('.cancel');
      this._data_not_found = $('#data_not_found');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll: function()
    {
      this._btn_all.on('click', $.proxy(function()
      {
        this._data_not_found.hide(500);
        this._btn_all.addClass('active').siblings().removeClass('active');
        $('.order-card').show();
      }, this));

      this._btn_pay.on('click', $.proxy(function()
      {
        if (this._pay.length == 0) { this._data_not_found.show(500); }
        else
        {
          this._pay.show(500);
          this._data_not_found.hide(500);
        }
        this._not_pay.hide(500);
        this._cancel.hide(500);
        $('.order-menu-item.active').removeClass('active');
        this._btn_pay.addClass('active');
      }, this));

      this._btn_not_pay.on('click', $.proxy(function()
      {
        if (this._not_pay.length == 0) { this._data_not_found.show(500); }
        else
        {
          this._not_pay.show(500);
          this._data_not_found.hide(500);
        }
        this._pay.hide(500);
        this._cancel.hide(500);
        $('.order-menu-item.active').removeClass('active');
        this._btn_not_pay.addClass('active');
      }, this));

      this._btn_cancel.on('click', $.proxy(function()
      {
        if (this._cancel.length == 0) { this._data_not_found.show(500); }
        else
        {
          this._cancel.show(500);
          this._data_not_found.hide(500);
        }
        this._pay.hide(500);
        this._not_pay.hide(500);
        $('.order-menu-item.active').removeClass('active');
        this._btn_cancel.addClass('active');
      }, this));

      this._btn_cancel.on('mouseenter', $.proxy(function()
      {
          this._btn_cancel.popover('show');
      }, this))

      this._btn_cancel.on('mouseleave', $.proxy(function()
      {
          this._btn_cancel.popover('hide');
      }, this))
    }
  }
  return _const;
}());

var order;
$(function()
{
  order = new order();
})

function _cancel_order(id)
{
    $.confirm
    ({
        title: '確認',
        content: '你確定要取消<span class="color-emphasized2"> ' + id + ' </span>的訂單嗎？',
        buttons:
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/cancelOwnOrderViaId',
                        type: 'post',
                        dataType: 'json',
                        data:
                        {
                            id: id
                        },
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(data)
                        {
                            if (data == 'success')
                            {
                                $.confirm
                                ({
                                    title: '成功',
                                    content: '訂單取消成功',
                                    buttons:
                                    {
                                        '確認':
                                        {
                                            btnClass: 'btn-success',
                                            action: function(){ location.reload(); }
                                        }
                                    }
                                })
                            }
                            else
                            {
                                $.confirm
                                ({
                                    title: '錯誤',
                                    content: data,
                                    type: 'red',
                                    typeAnimated: true,
                                    buttons:
                                    {
                                        '關閉':
                                        {
                                            btnClass: 'btn-red',
                                            action: function() { location.reload(); }
                                        }
                                    }
                                })
                            }
                        },
                        error(e)
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
