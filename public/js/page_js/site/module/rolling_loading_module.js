function rollingLoadingModule(settings)
{
    function draw(c)
    {
        $(c).append($('<div class="lds-roller"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>'));
    }
    function remove(c)
    {
        $(c).find('.lds-roller').remove();
    }
    return {
        draw: draw,
        remove: remove
    }
}