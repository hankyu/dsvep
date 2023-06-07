let draggableModule = function()
{
    let initialed = false;

    function initDraggable()
    {
        if (!initialed)
        {
            let list_item = $('.lesson-list');

            $.each(list_item, function(index, value)
            {
                /************************************************
                 * show button of next lesson
                 ************************************************/
                $('#next_btn_' + index).visible();


                /************************************************
                 * use customize draggable function
                 ************************************************/
                $('#' + value.id).drag();
            });

            initialed = true;
        }
    }

    return {
        initDraggable()
        {
            initDraggable();
        }
    }
}

function previous_lesson(index)
{
    let lesson_list_position_left = $('#lesson_list_' + index).position().left;
    let lesson_list_width         = $('#lesson_list_' + index).width();
    let lesson_container_width    = $('#lesson_list_container_' + index).width();
    let displacement              = Math.floor(Math.abs(lesson_list_position_left) / 328) * (-328) + 328;
    let over                      = displacement > -1;

    if (over == true)
    {
        displacement = 0;
        $('#previous_btn_' + index).invisible();
    }

    $('#next_btn_' + index).visible();
    $('#lesson_list_' + index).css
    ({
        'transform': 'translate3d(' + displacement + 'px, 0, 0)',
        'transition': 'all 0s ease 0s'
    });
}

function next_lesson(index)
{
    let lesson_list_position_left = $('#lesson_list_' + index).position().left;
    let lesson_list_width         = $('#lesson_list_' + index).width();
    let lesson_container_width    = $('#lesson_list_container_' + index).width();
    let displacement              = Math.floor(Math.abs(lesson_list_position_left) / 328) * (-328) - 328;
    let diff                      = lesson_container_width - lesson_list_width;
    let over                      = displacement < diff;

    if (over == true)
    {
        displacement = lesson_container_width - lesson_list_width;
        $('#next_btn_' + index).invisible();
    }

    $('#previous_btn_' + index).visible();
    $('#lesson_list_' + index).css
    ({
            'transform': 'translate3d(' + displacement + 'px, 0, 0)',
            'transition': 'all 0s ease 0s'
    });
}

(function($)
{
    var requestAnimationFrame = window.requestAnimationFrame ||         // Firefox 23 / IE 10 / Chrome
                                window.mozRequestAnimationFrame ||      // Firefox < 23
                                window.webkitRequestAnimationFrame ||   // Safari
                                window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    $.fn.invisible = function()
    {
        return this.each(function()
        {
            $(this).css("visibility", "hidden");
        });
    };

    $.fn.visible = function()
    {
        return this.each(function()
        {
            $(this).css("visibility", "visible");
        });
    };

    $.fn.drag = function()
    {
        var object  = this,
            press   = 'mousedown touchstart',
            move    = 'mousemove touchmove',
            release = 'mouseup touchend',
            limit   = this.parent(),
            btn_id  = object[0].id.charAt(object[0].id.length -1),
            now;

        if (window.requestAnimationFrame) var neoteric = true;

        this.on(press, function(e)
        {
            if (e.type == 'mousedown' && e.which != 1) return;
            let lateral_movement = false

            var margin = limit.width()-object.outerWidth(),
                old    = object.position().left,
                touch  = e.originalEvent.touches,
                start  = touch ? touch[0].pageX : e.pageX;

            let displacement = 0;


            $(window).on(move, function(e)
            {
                displacement++;
                object.css('pointer-events', '');

                var contact = e.originalEvent.touches,
                    endX    = contact ? contact[0].pageX : e.pageX;
                    now     = Math.min(0, Math.max(old+endX-start, margin));

                if(displacement > 5)
                {
                    lateral_movement  = true;
                    object.css('pointer-events', 'none');

                    if (neoteric) requestAnimationFrame(setElement);
                    else setElement();
                }

            })
            .one(release, function(e)
            {
                if (now >= 0) $('#previous_btn_' + btn_id).invisible();
                else if (now <= margin) $('#next_btn_' + btn_id).invisible();
                else
                {
                    $('#previous_btn_' + btn_id).visible();
                    $('#next_btn_' + btn_id).visible();
                };

                if (lateral_movement) { e.preventDefault() }

                object.css('pointer-events', '');
                $(this).off(move).off(release);
            });

            e.stopPropagation();
        })

        function setElement()
        {
            object.css
            ({
                    'transform': 'translate3d(' + now + 'px, 0, 0)',
                    'transition': 'all 0s ease 0s'
            });
        }

    }
}(jQuery));
