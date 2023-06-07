var terms = (function()
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
            this._content_privacy = $('#content_privacy');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initialAll();
        },
        _initialAll: function()
        {
            var hashtag = location.hash;
            var hashtag = hashtag.split('#');

            if( hashtag.length<2 )
            {
                $('#btn_privacy').click();
                location.hash='privacy';
            }
            else if( hashtag[1])
            {
                $('#btn_'+hashtag[1]).click();
            }
        }
    }
    return _const;
}());

var terms;
$(function()
{
    terms = new terms();
})

function change_section(id)
{
    $('section').hide();
    $('#content_' + id).show(400);
    $('.menu-item').removeClass('active');
    $('#btn_' + id).addClass('active');
}
