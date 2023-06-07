var errors = (function()
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
      this._btn_help = $('#btn_help');
      this._error_page = $('.error-page');
      this._error_page_help = $('.error-page-help');
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      objThis._initialAll();
    },
    _initialAll: function()
    {
      // Error Page Btn
      this._btn_help.on('click', $.proxy(function()
      {
        this._error_page.animate({top: '80%'});
        this._error_page_help.attr('style', 'opacity: 1;');
        this._btn_help.text('真是遺憾啊').attr('disabled', '');
      }, this));
    }
  }
  return _const;
}());

var errors;
$(function()
{
  errors = new errors();
})
