// site\teacher\lesson-overview\index.blade.php 課程總覽
// site\teacher\teacher-overview\index.blade.php 王牌講師
var teacher_overview = (function()
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
            //Sort Dom
            this._indList = $('.indList');
            this._item = $('.item');

            //Menu button
            this._btn_all     = $('#all');
            this._btn_draft   = $('#draft');
            this._btn_publish = $('#publish');
            this._btn_audit   = $('#audit');
            this._btn_fail    = $('#fail');

            //Overview Lesson Card item
            this._no_reply        = $('.draft');
            this._publish         = $('.publish');
            this._audit           = $('.audit');
            this._fail            = $('.fail');
            this._data_not_found  = $('#data_not_found');
            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initialAll();
        },
        _initialAll: function()
        {
            this._btn_all.on('click', $.proxy(function()
            {
                $('.overview-menu-item.active').removeClass('active');
                this._btn_all.addClass('active');
            }, this));

            this._btn_draft.on('click', $.proxy(function()
            {
                $('.overview-menu-item.active').removeClass('active');
                this._btn_draft.addClass('active');
            }, this));

            this._btn_publish.on('click', $.proxy(function()
            {
                $('.overview-menu-item.active').removeClass('active');
                this._btn_publish.addClass('active');
            }, this));

            this._btn_audit.on('click', $.proxy(function()
            {
                $('.overview-menu-item.active').removeClass('active');
                this._btn_audit.addClass('active');
            }, this));

            this._btn_fail.on('click', $.proxy(function()
            {
                $('.overview-menu-item.active').removeClass('active');
                this._btn_fail.addClass('active');
            }, this));

            //Bootstrap Tooltip On the Lesson Overview
            $('[data-toggle="tooltip"]').tooltip();
        }
    }
    return _const;
}());

var teacher_overview,
    createLessonCardModule,
    filterModule,
    scrollLoadingModule;
$(function()
{
    teacher_overview       = new teacher_overview();
    createLessonCardModule = createLessonCardModule();
    filterModule           = filterModule();
    scrollLoadingModule    = scrollLoadingModule();

    filterModule.loadingNewDataAndDraw();
})

/**
 * [createLessonCardModule]
 * type = Module
 */
function createLessonCardModule()
{
    function createLessonCard(lesson_arr = [])
    {
        let insert_HTML   = '',
            draw_target   = $('#teacher_lesson'),
            now         = new Date(),
            end_fund_day  = '',
            today;

        today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        $.each(lesson_arr, (key, lesson_data) =>
        {
            if (lesson_data.apply_situation == "no apply")
            {
                insert_HTML += '<div class="lesson-card col-lg-3 col-md-4 col-sm-6 col-xs-12 draft">'
            }
            else if (lesson_data.apply_situation == "success")
            {
                insert_HTML += '<div class="lesson-card col-lg-3 col-md-4 col-sm-6 col-xs-12 publish">'
            }
            else
            {
                insert_HTML += '<div class="lesson-card col-lg-3 col-md-4 col-sm-6 col-xs-12 ' + lesson_data.apply_situation + '">'
            }

            insert_HTML += '<section class="thumbnail">' +
                               '<figure>';

            if (lesson_data.apply_situation == 'success')
            {
                insert_HTML += '<a href="/#/lesson/' + lesson_data.l_id + '">'
            }
            else
            {
                insert_HTML += '<a href="/teacher/lesson/manage/' + lesson_data.l_id + '/info">'
            }

            insert_HTML +=          '<div class="lesson-type-label">' +
                                        '<span class="lesson-type ' + lesson_data.type + '"></span>' +
                                    '</div>' +
                                    '<div class="lesson__label__id">' +
                                        '<span class=""># ' + lesson_data.l_id + '</span>' +
                                    '</div>' +
                                    '<div class="img-wrapper">' +
                                        '<div class="pub-status-wrapper">';

            if (lesson_data.pub_situation == false)
            {
                if (lesson_data.apply_situation == 'audit')
                {
                    insert_HTML += '<span class="pub-status-label bg-emphasized3"><i class="far fa-clock" aria-hidden="true"></i> 審核中</span>'
                }
                else if (lesson_data.apply_situation == 'fail')
                {
                    insert_HTML += '<span class="pub-status-label bg-fail"><i class="fas fa-times" aria-hidden="true"></i> 審核失敗</span>'
                }
                else
                {
                    insert_HTML += '<span class="pub-status-label bg-draft"><i class="fas fa-pencil-alt" aria-hidden="true"></i> 草稿</span>'
                }
            }
            else
            {
                insert_HTML += '<span class="pub-status-label bg-emphasized4"><i class="fas fa-check" aria-hidden="true"></i> 已發佈</span>'
            }

            insert_HTML +=              '</div>'


            if (lesson_data.cover == null)
            {
                insert_HTML += '<img src="https://dummyimage.com/1024x768/cccccc/ffffff">'
            }
            else
            {
                insert_HTML += '<img src="/media/' + lesson_data.l_id + '/cover/' + lesson_data.cover + '">'
            }
            insert_HTML +=              '</div>' +
                                    '</a>' +
                                '</figure>' +
                                '<article class="caption">' +
                                    '<h3 class="h4 p0 title">' + lesson_data.l_name + '</h3>';

            if (lesson_data.type == 'entity' && lesson_data.start_time != null)
            {
                let day = new Date((lesson_data.start_time).replace(/-/g, '/')).getDay();
                insert_HTML +=  '<p class="margin-0">' + lesson_data.start_time + ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][new Date(lesson_arr[key].start_time).getDay()];

                if (lesson_data.l_start_time != null) { insert_HTML += lesson_arr[key].l_start_time.substr(11, 5); }

                insert_HTML +=      '<i class="fas fa-map-marker-alt" aria-hidden="true"></i>' +
                                    '<span>' + String(lesson_data.location).substr(0, 2) + '</span>' +
                                '</p>';
            }
            else
            {
                insert_HTML += '<p class="margin-0" style="visibility: hidden">_</p>'
            }

            insert_HTML +=      '</article>';


            if (lesson_data.apply_situation == "success")
            {
                // get label_text and label_class then insert into HTNL
                end_fund_day                    = new Date((lesson_arr[key].end_fund).replace(/-/g, '/'));
                lesson_arr[key].now             = now;
                lesson_arr[key].today           = today;
                lesson_arr[key].left_fund_day   = Math.ceil((new Date(lesson_arr[key].end_fund.replace(/-/g,'/')).setHours(23, 59, 59, 999) - lesson_arr[key].now) / 1000 / 60 / 60 / 24);
                lesson_arr[key].left_start_day  = Math.ceil((new Date(lesson_arr[key].start_time.replace(/-/g,'/')).setHours(0, 0, 0, 0) - lesson_arr[key].now) / 1000 / 60 / 60 / 24);

                let label_result = labelModule.judgementLabelText(lesson_arr[key]);

                insert_HTML +=  '<a class="lesson__card__label" href="/#/lesson/' +  lesson_data.l_id + '">' +
                                    '<span class="lesson-type ' + label_result.label_class + '">' + label_result.label_text + '</span>' +
                                '</a>' +
                                '<div class="row marginbot-10">' +
                                    '<div class="col-xs-12 teacher__function">'+
                                        '<div class="col-xs-4 center">'+
                                            '<a href="/teacher/lesson/manage/' + lesson_data.l_id + '/info"><span class="btn btn-info">編輯</span></a>'+
                                        '</div>'+
                                        '<div class="col-xs-4 center">'+
                                            '<a href="/#/profile/lesson/classroom/' + lesson_data.l_id + '"><span class="btn btn-warning">教室</span></a>'+
                                        '</div>'

                if (lesson_data.type == 'entity')
                {
                    if (new Date() >= new Date((lesson_data.l_start_time).replace(/-/g, '/')))
                    {
                        insert_HTML +=  '<div class="col-xs-4 center">' +
                                            '<span class="buy-people">' +
                                                '<i class="fa fa-users text-theme-color" aria-hidden="true"></i>' +
                                                lesson_data.buy_people + '/' + lesson_data.least_people +
                                            '</span>' +
                                        '</div>'
                    }
                    else
                    {
                        insert_HTML +=  '<div class="col-xs-4 center">' +
                                            '<span class="buy-people">' +
                                                '<i class="fa fa-users text-theme-color" aria-hidden="true"></i>';

                        if (lesson_data.least_people == 0)
                        {
                            insert_HTML += lesson_data.buy_people;
                        }
                        else
                        {
                            insert_HTML += lesson_data.buy_people + '/' + lesson_data.least_people;
                        }

                        insert_HTML +=      '</span>' +
                                        '</div>';
                    }
                }
                else
                {
                    insert_HTML +=  '<div class="col-xs-4 center">' +
                                        '<span class="buy-people">' +
                                            '<i class="fa fa-users text-theme-color" aria-hidden="true"></i>';

                    if (lesson_data.least_people == 0)
                    {
                        insert_HTML += lesson_data.buy_people;
                    }
                    else
                    {
                        insert_HTML += lesson_data.buy_people + '/' + lesson_data.least_people;
                    }

                    insert_HTML +=    '</span>' +
                                    '</div>';
                }

                insert_HTML += '</div>';
            }
            else
            {
                if (lesson_data.apply_situation == "audit")
                {
                    insert_HTML +=  '<div class="lesson__card__label"></div>' +
                                    '<div class="row marginbot-10">' +
                                    '<div class="col-xs-6 center">' +
                                        '<a href="/teacher/lesson/manage/' + lesson_data.l_id + '/preview" target="_blank"><span class="btn btn-success">查看預覽</span></a>' +
                                    '</div>' +
                                    '<div class="col-xs-6 center">' +
                                        '<button onclick="_cancel_audit(' + lesson_data.l_id + ', \'' + lesson_data.l_name + '\')" class="btn btn-darkgray">取消審核</button>' +
                                    '</div>';
                }
                else
                {
                    insert_HTML +=  '<div class="lesson__card__label"></div>' +
                                    '<div class="row marginbot-10">' +
                                    '<div class="col-xs-6 center">' +
                                        '<a href="/teacher/lesson/manage/' + lesson_data.l_id + '/info"><span class="btn btn-info">編輯</span></a>' +
                                    '</div>' +
                                    '<div class="col-xs-6 center">' +
                                        '<button onclick="_delete_lesson(' + lesson_data.l_id + ', \'' + lesson_data.l_name + '\')" class="btn btn-danger">刪除</button>' +
                                    '</div>';
                }
            }

                insert_HTML +=          '</div>' +
                                    '</section>' +
                                '</div>';
        });

        draw_target.append(insert_HTML);
    }

    return {
        createLessonCard: function(lesson_data = [])
        {
            if (lesson_data.length != undefined && lesson_data.length != 0) { createLessonCard(lesson_data); }
        }
    }
}

/**
 * [filterModule]
 * type = Module
 */
function filterModule()
{
    var init_search_data   = true,
        max_search_result  = null,
        search_array       = [],
        search_is_ready    = true,
        search_limit       = 20,
        search_request_sum = 0,
        search_start_num   = 0,

        insert_target      = $('#teacher_lesson');

    search_array['type'] = '';
    search_array['sort'] = 'create_DESC';

    init();

    function init()
    {
        setButtonFunction();
    }

    function setButtonFunction()
    {
        $('#all').on('click', () =>
        {
            search_array['type'] = 'all';
            loadingNewDataAndDraw();
        });

        $('#draft').on('click', () =>
        {
            search_array['type'] = 'draft';
            loadingNewDataAndDraw();
        });

        $('#publish').on('click', () =>
        {
            search_array['type'] = 'public';
            loadingNewDataAndDraw();
        });

        $('#audit').on('click', () =>
        {
            search_array['type'] = 'audit';
            loadingNewDataAndDraw();
        });

        $('#fail').on('click', () =>
        {
            search_array['type'] = 'fail';
            loadingNewDataAndDraw();
        });

        $('#sort_create_date').on('click', () =>
        {
            let sort_icon;

            sort_icon = $('#sort_create_date').find('i')
            sort_icon.toggleClass('fa-sort-up');
            sort_icon.toggleClass('fa-sort-down');

            search_array['sort'] = search_array['sort'] == 'create_DESC' ? 'create_ASC' : 'create_DESC';

            loadingNewDataAndDraw();
        });
    }

    function getFilterSearchResult(request_num)
    {
        return new Promise((resolve, reject) =>
        {
            let send_data   = {};
            let request_num = search_request_sum;

            send_data['type'] = search_array['type'];
            send_data['sort'] = search_array['sort'];

            send_data.params              = {};
            send_data.params['start_num'] = (search_start_num ? search_start_num : null);
            send_data.params['limit']     = (search_limit ? search_limit : null);
            send_data.params['init']      = (init_search_data ? init_search_data : null);

            $.ajax
            ({
                type: 'get',
                url: '/ajax/getTeacherLesson',
                dataType: 'json',
                data: send_data,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                    $('#loading_lesson').show();
                },
                success: function(data)
                {
                    if (request_num == search_request_sum)
                    {
                        let data_length_diff = 0;

                        if (data.data[1] != undefined && init_search_data === true)
                        {
                            max_search_result = data.data[1];
                            init_search_data  = false;
                        }

                        search_start_num  = search_start_num + data.data[0].length;
                        data_length_diff  = max_search_result - search_start_num;
                        search_limit      = ((data_length_diff < search_limit) ? data_length_diff : search_limit);

                        if (search_start_num != max_search_result) { scrollLoadingModule.startListener(); }
                        else if (search_start_num === max_search_result) { $('#loaded_all_lesson').show(); }

                        resolve(data.data[0]);
                    }
                },
                error: function(xhr, type)
                {
                    reject('error');
                },
                complete: function()
                {
                    $('#loading_lesson').hide();
                }
            })
        });
    }


    function loadingDataAndDraw()
    {
        if (search_is_ready && search_start_num < max_search_result)
        {
            search_request_sum++;
            getFilterSearchResult(search_request_sum).then((data) =>
            {
                createLessonCardModule.createLessonCard(data);
            });
        }
    }

    function loadingNewDataAndDraw()
    {
        init_search_data  = true;
        max_search_result = 0;
        search_limit      = 20;
        search_start_num  = 0;

        if (search_is_ready)
        {
            $('#data_not_found').hide();
            insert_target.empty();
            search_request_sum++;
            $('#loaded_all_lesson').hide();
            getFilterSearchResult(search_request_sum).then((data) =>
            {
                if (data.length === 0)
                {
                    $('#data_not_found').show();
                    $('#item_none').removeClass('hidden');
                }
                else { createLessonCardModule.createLessonCard(data); }
            });
        }
    }

    return {
        loadingDataAndDraw: function()
        {
            loadingDataAndDraw();
        },
        loadingNewDataAndDraw: function()
        {
            loadingNewDataAndDraw();
        }
    }
}

/**
 * [scrollLoadingModule control user scroll loading]
 * type = Module
 */
function scrollLoadingModule()
{
    let
        scroll_diff         = 0;
        default_listener    = false;
        bottom_distance     = 1800;
        listener_target     = $(window);
        body_content        = $('.body-content');
        body_content_height = 0;


    if (default_listener)
    {
        body_content_height = body_content.height();
        startListener();
    }

    function startListener()
    {
        // if (need_listener)
        listener_target.scroll(() =>
        {
            stopListener();
            scroll_diff = body_content_height - listener_target.scrollTop();

            if (scroll_diff <= bottom_distance)
            {
                // call function of loadingData
                filterModule.loadingDataAndDraw();
                stopListener();
            }
            else { startListener(); }
        });
    }

    function stopListener()
    {
        listener_target.off('scroll');
    }

    function resetParams()
    {
        body_content_height = body_content.height();
    }

    return {
        startListener: function()
        {
            startListener();
        },
        stopListener: function()
        {
            stopListener();
        },
        resetParams: function()
        {
            resetParams();
        }
    }
}

/**
 * [_cancel_audit]
 * type = global function
 *
 * @param       {[type]} num  [lesson id]
 * @param       {[type]} name [lesson name]
 *
 */
function _cancel_audit(num, name)
{
    $.confirm
    ({
        title: '確認取消審核',
        content: '你確定要取消 <span class="color-emphasized2">' + name + '</span> 課程的審核嗎',
        buttons :
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/cancel_audit/' + num,
                        type: 'POST',
                        dataType: 'json',
                        data: {},
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(data)
                        {
                            if (data.message == 'finish')
                            {
                                let l_id = num;
                                firebaseController.cancelLessonAudit(l_id).then(() =>
                                {
                                    $.confirm
                                    ({
                                        title: '完成',
                                        content: '取消審核完成',
                                        buttons:
                                        {
                                            '確認':
                                            {
                                                btnClass: 'btn-success',
                                                action: function() { location.reload(); }
                                            }
                                        }
                                    })
                                });
                            }
                            else { $.alert(data.message, '錯誤'); }
                        },
                        error()
                        {
                            $.alert('好像出了一些錯誤', '錯誤');
                        }
                    })
                }
            },
            '取消':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}


/**
 * [_delete_lesson]
 * type = global function
 *
 * @param       {[type]} num  [lesson id]
 * @param       {[type]} name [lesson name]
 */
function _delete_lesson(num, name)
{
    $.confirm
    ({
        title: '確認刪除課程',
        content: '你確定要刪除 <span class="color-emphasized2">' + name + '</span> 課程嗎',
        buttons :
        {
            '確定':
            {
                btnClass: 'btn-success',
                action: function()
                {
                    $.ajax
                    ({
                        url: '/ajax/delete_lesson/' + num,
                        type: 'delete',
                        dataType: 'json',
                        data: {},
                        headers:
                        {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        },
                        success(data)
                        {
                            if (data.message == 'finish')
                            {
                                $.confirm
                                ({
                                    title: '完成',
                                    content: '刪除課程完成',
                                    buttons:
                                    {
                                        '確認':
                                        {
                                            btnClass: 'btn-success',
                                            action: function() { location.reload(); }
                                        }
                                    }
                                })
                            }
                            else { $.alert(data.message, '錯誤'); }
                        },
                        error()
                        {
                            $.alert('好像出了一些錯誤', '錯誤');
                        }
                    })
                }
            },
            '取消':
            {
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    })
}
