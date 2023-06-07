let firebaseController = firebaseModule();

var layout = (function()
{
  var _const;
  _const = function()
  {
    this._refresh_num = 0;
    this._construct();
  }
  _const.prototype =
  {
    _construct: function()
    {
      //Sidebar
      this._body = $('body');
      this._wrapper = $('#wrapper');
      this._data_toggle_offcanvas = $('[data-toggle = "offcanvas"]');
      this._overlay = $('.overlay');
      this._blank = $('.blank');
      this._hamburger = $('.hamburger');
      this._is_closed = false;
      this._start();
    },
    _start: function()
    {
      var objThis = this;
      firebaseController.initFirebase();
      objThis._initialAll();
    },
    _initialAll: function()
    {
      this._get_history_note();
      setTimeout(1000);
      setInterval('$("#alertify-logs").empty();', 59500);
      setInterval('layout._get_history_note()', 60000);

      //slidebar Toggle
      this._hamburger.on('click', $.proxy(function()
      {
        if (this._is_closed === true)
        {
          this._overlay.hide();
          this._hamburger.addClass('is-closed');
          this._is_closed = false;
          this._blank.hide();
          this._body.css('overflow', 'visible');
        }
        else
        {
          this._overlay.show();
          this._hamburger.removeClass('is-closed');
          this._is_closed = true;
          this._blank.show();
          this._body.css('overflow', 'hidden');
        }
      }, this))

      this._blank.on('click', $.proxy(function()
      {
        this._hamburger.eq(0).trigger('click');
      }, this));

      this._data_toggle_offcanvas.on('click', $.proxy(function()
      {
        this._wrapper.toggleClass('toggled');
      }, this))
    },
    _get_history_note: function()
    {
      //Get Audit Teacher Data Num To Show Notice
      var href = document.location.pathname;
      firebaseController.getTeacherApplySumNotice();
      firebaseController.getLessonApplySumNotice();
    }
  }
  return _const;
}());

var layout;
$(function()
{
    layout = new layout();
})

function _change_targer(target)
{
  href = '/admin/audit/' + target + '/overview';
  location.href = href;
}
