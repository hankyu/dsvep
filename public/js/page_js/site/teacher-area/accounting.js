;(() =>
{
    let
        t_id = teacherInfo.getTeacherId(),
        accounting = accountingModule();

    $(() =>
    {
        $(window).on('resize',function(){
          accounting.setWindowWidth($(this).width());
        });
        accounting.init({tid: t_id});
    });
      
})();

function boxClose()
{
    $('#btnBox').prop('checked', false);
}