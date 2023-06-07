!(function(){
    $(document).ready(function(){
        if(_check_browser())
        {
            _block_IE();
        }
    });
    function _check_browser()
    {
        return /*@cc_on!@*/false || !!document.documentMode;
    }

    function _block_IE()
    {
        let _dialog_promise = new Promise(function(resolve, reject)
        {
            resolve($.dialog('本平台不支援IE，請使用其他瀏覽器。', '錯誤'));
        });
        _dialog_promise.then(function()
        {
            $('.jconfirm-closeIcon').css('display', 'none');
        })
    }
})();
