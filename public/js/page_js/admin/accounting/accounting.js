;(() =>
{
    let accounting = accountingModule();

    $(() =>
    {
        $(window).on('resize',function(){
          accounting.setWindowWidth($(this).width());
        });
        accounting.init({tid: null, manager: true});
    });
      
})();

function boxClose()
{
    $('#btnBox').prop('checked', false);
}