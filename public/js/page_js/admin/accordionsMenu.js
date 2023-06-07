var accordionsMenu = $('.cd-accordion-menu');

if( accordionsMenu.length > 0 )
{
  accordionsMenu.each(function()
  {
    var accordion = $(this);
    accordion.on('change', 'input[type="checkbox"]', function()
    {
      var checkbox = $(this);
      ( checkbox.prop('checked') ) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
    });
  });
}
