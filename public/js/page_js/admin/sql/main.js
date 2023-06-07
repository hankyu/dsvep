var main = (function()
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
            this._start();
        },
        _start: function()
        {
            var objThis = this;
        },
        _get_edit_input: function(id, column, text)
        {
            input = '<div class="col-md-10" style="float: left">' +
                        '<input type="text" class="form-control" id="' + id+ '_' + column + '" value="' + text + '">' +
                    '</div>';
            return input;
        },
        _get_edit_button: function(id, text, path)
        {
            button = '<div class="col-md-2">' +
                         '<button type="button" onclick="_change_data(' + id + ', `' + text + '`, `' + path +'`)" class="btn btn-info">修改</button>' +
                     '</div>';
            return button;
        }
    }
    return _const;
}());

var main;
$(function()
{
    main = new main();
})

function _change_data(id, column, path)
{
    $.ajax
    ({
        url: '/ajax/update/' + path,
        type: 'post',
        dataType: 'json',
        async: false,
        data:
        {
            id    : id,
            column: column,
            data  : $("#" + id + "_" + column).val()
        },
        headers:
        {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success(data)
        {
            if (data == 'ok')
            {
                $.alert('更新 <span class="text-danger">' + column + '</span> 成功', "成功");
            }
            else
            {
                $.alert('請洽資訊人員：' + data, '錯誤');
            }
        },
        error()
        {
            $.alert("發生了一些錯誤，請洽資訊人員", "錯誤");
        }
    })
}
