var all_lesson = (function()
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
            this._item    = $('.item');

            //Menu button
            this._btn_all         = $('#btn_all');
            this._btn_type        = $('#btn_type');
            this._btn_teacher     = $('#btn_teacher');
            this._btn_category    = $('#btn_category');
            this._btn_area        = $('#btn_area');
            this._span_time       = $('#span_time');
            this._btn_fundraising = $('#btn_fundraising');
            this._btn_popular     = $('#btn_popular');
            this._btn_price       = $('#btn_price');
            this._btn_time        = $('#btn_time');
            this._btn_wishing     = $('#btn_wishing');

            //Filter
            this._btn_clear_filter  = $('#clear_filter_label');
            this._btn_more_teachers = $('#more_teachers');
            this._clear_select_date = $('#clear_select_date')
            this._select_time_range = $('#select_time_range');

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
                _become_default();
                this._btn_all.addClass('active');
                filter_module._reset_search_array_and_load();
            }, this));

            this._btn_type.on('click', $.proxy(function()
            {
                _become_default();
                $('.type-wrapper').show();
            }, this));

            this._btn_teacher.on('click', $.proxy(function()
            {
                _become_default();
                $('.teacher-wrapper').show();
            }, this));

            this._btn_category.on('click', $.proxy(function()
            {
                _become_default();
                $('.category-wrapper').show();
            }, this));

            this._btn_area.on('click', $.proxy(function()
            {
                _become_default();
                $('.area-wrapper').show();
            }, this));

            this._btn_time.on('click', $.proxy(function()
            {
                let btn_time_svg = $(this._btn_time).find('i');

                if (this._btn_time.hasClass('active'))
                {
                    btn_time_svg.toggleClass('fa-sort-down');
                    btn_time_svg.toggleClass('fa-sort-up');
                    filter_module._sort('latest');
                }
                else
                {
                    this._reset_sort_btn_class();
                    // default latest_DESC
                    btn_time_svg.addClass('fa-sort-up');
                    filter_module._sort('latest');
                }

                $('.menu-item.active').removeClass('active');
                this._btn_time.addClass('active');
            }, this));

            this._btn_wishing.on('click', $.proxy(function()
            {
                wishing_module.createForm();
            }, this));

            this._btn_popular.on('click', $.proxy(function()
            {
                let btn_popular_svg = $(this._btn_popular).find('i');

                if (this._btn_popular.hasClass('active'))
                {
                    btn_popular_svg.toggleClass('fa-sort-down');
                    btn_popular_svg.toggleClass('fa-sort-up');
                    filter_module._sort('popular');
                }
                else
                {
                    this._reset_sort_btn_class();
                    // default popular_DESC
                    btn_popular_svg.addClass('fa-sort-up');
                    filter_module._sort('popular');
                }

                $('.menu-item.active').removeClass('active');
                this._btn_popular.addClass('active');
            }, this));

            this._btn_price.on('click', $.proxy(function()
            {
                let btn_price_svg = $(this._btn_price).find('i');

                if (this._btn_price.hasClass('active'))
                {
                    btn_price_svg.toggleClass('fa-sort-down');
                    btn_price_svg.toggleClass('fa-sort-up');
                    filter_module._sort('price');
                }
                else
                {
                    this._reset_sort_btn_class();
                    // default price_DESC
                    btn_price_svg.addClass('fa-sort-up');
                    filter_module._sort('price');
                }

                $('.menu-item.active').removeClass('active');
                this._btn_price.addClass('active');
            }, this));

            this._btn_fundraising.on('click', $.proxy(function()
            {
                $('.menu-item.active').removeClass('active');
                this._btn_fundraising.addClass('active');
            }, this));

            this._btn_more_teachers.on('click', () => { filter_module._more_filter_teachers(); });

            this._btn_clear_filter.on('click', () => { filter_module._reset_search_array_and_load(); });

            this._clear_select_date.on('click', () =>
            {
                filter_module._remove_search_time();
                all_lesson._select_time_range.val('');
                all_lesson._clear_select_date.addClass('hide');
            })

            this._select_time_range.datepicker
            ({
                language:       "zh",
                toggleSelected: false,
                range:          true,
                onSelect: function()
                {
                    let select_time_range = all_lesson._select_time_range.val();

                    if (select_time_range.length == 23)
                    {
                      let time_arr = select_time_range.split(' - ');

                      if (time_arr.length == 2 && Array.isArray(time_arr))
                      {
                          let is_time = true;

                          $.each(time_arr, (index, value) =>
                          {
                              if (new Date(value) == 'Invalid Date') { is_time = false; }
                          })

                          if (is_time)
                          {
                              filter_module._add_search_time(time_arr);
                              all_lesson._clear_select_date.removeClass('hide');
                          }
                      }
                    }
                }
            });
        },
        _reset_sort_btn_class: function()
        {
            let _btn_popular = $('#btn_popular'),
                _btn_price   = $('#btn_price'),
                _btn_time    = $('#btn_time');

            _btn_popular.removeClass('active');
            _btn_price.removeClass('active');
            _btn_time.removeClass('active');
            _btn_popular.find('i').removeClass('fa-sort-down');
            _btn_price.find('i').removeClass('fa-sort-down');
            _btn_time.find('i').removeClass('fa-sort-down');
            _btn_popular.find('i').removeClass('fa-sort-up');
            _btn_price.find('i').removeClass('fa-sort-up');
            _btn_time.find('i').removeClass('fa-sort-up');
        },
        _sort_lesson_asc: function(items_array, order_by)
        {
            //依照order_by升序排列
            if (order_by == 'data-time') { return items_array.sort(function(a, b) {return a.attributes[order_by].nodeValue < b.attributes[order_by].nodeValue ? 1 : -1; }); }
            else { return items_array.sort(function(a, b) {return parseInt(a.attributes[order_by].nodeValue) < parseInt(b.attributes[order_by].nodeValue) ? 1 : -1; }); }
        },
        _sort_lesson_desc: function(items_array, order_by)
        {
            //依照order_by降序排列
            if (order_by == 'data-time') { return items_array.sort(function(a, b) {return a.attributes[order_by].nodeValue > b.attributes[order_by].nodeValue ? 1 : -1; }); }
            else { return items_array.sort(function(a, b) { return parseInt(a.attributes[order_by].nodeValue) > parseInt(b.attributes[order_by].nodeValue) ? 1 : -1; }); }
        }
    }
    return _const;
}());


var all_lesson,
    checkbox_module,
    filter_module,
    scroll_loading_module,
    wishing_module,
    scroll_loading_module;


$(function()
{
    $('#input_search').val('');

    all_lesson            = new all_lesson();
    checkbox_module       = new checkbox_module();
    filter_module         = new filter_module();
    scroll_loading_module = new scroll_loading_module();
    wishing_module        = new wishing_module();
})


/**
 * [filter_module is filter for all lesson page]
 */
function filter_module()
{
    // Set search variable
    var init_search_data        = true,
        max_search_result       = null,
        search_array            = [],
        search_is_ready         = false,
        search_limit            = 20,
        search_request_sum      = 0,
        search_start_num        = 0,

        // Set filter variable
        select_filter_num       = 0,
        filter_array            = [],

        // Set teacher variable
        init_teachers_data      = true,
        load_teachers_data_num  = 9,
        loaded_teachers_num     = 0,
        max_teacher             = null,
        max_hot_teachers        = 3,
        hot_teachers            = [],

        // Set URL and history variable
        stateObj                = { filter: 'filter' };
        site_URL                = new URL(window.location),
        site_URL_search         = site_URL.search,
        params                  = site_URL.searchParams,

        // Set target variable from DOM
        filter_wrapper          = $('#filter-condition-wrapper'),
        filter_insert_target    = $('#filter-label-list')
        more_teachers           = $('#more_teachers'),
        loading_text            = $('#loading_text'),
        teacher_more_card       = $('#teacher-more-card'),
        card_insert_target      = $('.indList');

    /*********************************************************
     * Set filter array
     *********************************************************/
    for (var i = 0; i < 5; i++) { filter_array[i] = new Array; }
    // filter_array[0]  =  type
    // filter_array[1]  =  teacher
    // filter_array[2]  =  category
    // filter_array[3]  =  area
    // filter_array[4]  =  time

    _initial_filter_array();

    function _add_filter_label(el, arrayIndex, index, type)
    {
        if (!filter_array[arrayIndex][index][1])
        {
            let filter_text = filter_array[arrayIndex][index][0];
            let target_text = el.children('span')[0].innerHTML;
            let new_li = $('<li />',
            {
                name: target_text,
                click: (el_delete) =>
                {
                    filter_array[arrayIndex][index][1] = false;

                    if (el.hasClass('select-item')) { el.trigger('click'); }
                    else
                    {
                        // rebind filter button on click event
                        el.off('click');
                        el.on('click', (el) =>
                        {
                            let target = el.currentTarget;

                            $(target).toggleClass('select-item');

                            if ($(target).hasClass('select-item'))
                            {
                                filter_wrapper.show();
                                _add_filter_label($(target), arrayIndex, index, type);
                                _add_URL_params(type, index);
                            }
                        })
                        _remove_filter_label(el_delete.currentTarget);
                        _remove_search_array(type, arrayIndex, index);
                        _remove_URL_params(type, index);
                    }
                }
            }).append($('<div />',
            {
                class: 'btn filter-button',
                type: 'button',
                name: 'button',
                text: target_text
            }).append($('<i />',
            {
                class: 'fas fa-times cancel_filter'
            })))

            el.on('click', () =>
            {
                new_li.trigger('click');
            })

            new_li.appendTo(filter_insert_target);

            filter_array[arrayIndex][index][1] = true;
            select_filter_num++;

            _add_search_array(type, arrayIndex, index);
        }
    }

    function _update_btn_active()
    {
        // type
        let type_active = false;
        filter_array[0].forEach((item) => {
            type_active = type_active || item[1];
        });

        if(type_active)
        {
            all_lesson._btn_type.addClass('active');
        }
        else
        {
            all_lesson._btn_type.removeClass('active');
        }

        // teacher
        if(search_array.nickname && search_array.nickname.length)
        {
            all_lesson._btn_teacher.addClass('active');
        }
        else
        {
            all_lesson._btn_teacher.removeClass('active');
        }

        // category
        if(search_array.category && search_array.category.length)
        {
            all_lesson._btn_category.addClass('active');
        }
        else
        {
            all_lesson._btn_category.removeClass('active');
        }

        // area
        if(search_array.area && search_array.area.length)
        {
            all_lesson._btn_area.addClass('active');
        }
        else
        {
            all_lesson._btn_area.removeClass('active');
        }

        // time
        var time_filtering = Boolean(search_array.time && search_array.time.length);
        if(time_filtering)
        {
            all_lesson._span_time.addClass('active');
        }
        else
        {
            all_lesson._span_time.removeClass('active');
        }

        if(select_filter_num || time_filtering)
        {
            all_lesson._btn_all.removeClass('active');
        }
        else
        {
            all_lesson._btn_all.addClass('active');
        }
    }

    function _add_search_array(type, arrayIndex, index)
    {
        var eventLabel;
        switch (type)
        {
            case 'type':
                if (search_array['type'] == undefined || search_array['type'] == '')
                {
                    switch (filter_array[arrayIndex][index][0])
                    {
                        case '實體':
                            search_array['type'] = 'entity';
                            break;
                        case '線上':
                            search_array['type'] = 'online';
                            break;
                        default:
                            // won't do anything
                    }
                }
                else { search_array['type'] = ''; };
                break;
            case 'teacher':
                if (search_array['nickname'] == undefined) { search_array['nickname'] = []; }

                search_array['nickname'].push(filter_array[arrayIndex][index][0]);
                break;
            case 'category':
                if (search_array['category'] == undefined) { search_array['category'] = []; }

                search_array['category'].push(filter_array[arrayIndex][index][0]);
                break;
            case 'area':
                if (search_array['area'] == undefined) { search_array['area'] = []; }

                search_array['area'].push(filter_array[arrayIndex][index][0]);
                break;
            case 'time':
                search_array['time'] = filter_array[arrayIndex][index];
                break;
            default:
                // won't do anything
        }

        try{
            eventLabel = (type=='time') ? filter_array[arrayIndex][index][0] + '~' + filter_array[arrayIndex][index][1] : filter_array[arrayIndex][index][0];
            gtag('event', 'filter', { event_category: 'all lesson '+ type +' filter', event_action: 'filter', event_label: eventLabel});
        }catch(e){}

        _update_btn_active();
    }

    function _add_URL_params(param_name, URL_insert_text)
    {
        let params_text;

        switch (param_name)
        {
            case 'type':
                params_text = params.get('type');
                params_text = params_text == null ? [] : params_text;

                if (params_text.indexOf(URL_insert_text) == -1)
                {
                    params.set('type', ((params.get('type') == null) ? URL_insert_text : ([params.get('type'), URL_insert_text])));
                    history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + '?' + params);
                }

                _loading_new_data_and_draw();
                break;
            case 'teacher':
                params_text = params.get('teacher');
                params_text = params_text == null ? [] : params_text;

                if (params_text.indexOf(URL_insert_text) == -1)
                {
                    params.set('teacher', ((params.get('teacher') == null) ? URL_insert_text : ([params.get('teacher'), URL_insert_text])));
                    history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + '?' + params);
                }

                _loading_new_data_and_draw();
                break;
            case 'category':
                params_text = params.get('category');
                params_text = params_text == null ? [] : params_text;

                if (params_text.indexOf(URL_insert_text) == -1)
                {
                    params.set('category', ((params.get('category') == null) ? URL_insert_text : ([params.get('category'), URL_insert_text])));
                    history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + '?' + params);
                }

                _loading_new_data_and_draw();
                break;
            case 'area':
                params_text = params.get('area');
                params_text = params_text == null ? [] : params_text;

                if (params_text.indexOf(URL_insert_text) == -1)
                {
                    params.set('area', ((params.get('area') == null) ? URL_insert_text : ([params.get('area'), URL_insert_text])));
                    history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + '?' + params);
                }

                _loading_new_data_and_draw();
                break;
            case 'time':
                params_text = params.get('time');
                params_text = params_text == null ? [] : params_text;

                if (params_text.indexOf(URL_insert_text) == -1)
                {
                    params.set('time', URL_insert_text);
                    history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + '?' + params);
                }

                _loading_new_data_and_draw();
                break;
            case 'lesson_sort':
                params_text = params.get('lesson_sort');
                params_text = params_text == null ? [] : params_text;

                if (params_text.indexOf(URL_insert_text) == -1)
                {
                    params.set('lesson_sort', URL_insert_text);
                    history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + '?' + params);
                }

                _loading_new_data_and_draw();
                break;
            default:
                // won't do anything
        }
    }

    function _create_lesson_cards(lesson_arr = [])
    {
        if (lesson_arr.length === 0 && lesson_arr.length === max_search_result) { $('#item_none').removeClass('hidden'); }
        else
        {
            let insert_HTML   = '',
                now         = new Date(),
                end_fund_day  = '',
                today;

            today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

            for (let i = 0; i < lesson_arr.length; i++)
            {
                // get label_text and label_class then insert into HTNL
                end_fund_day                  = new Date((lesson_arr[i].end_fund).replace(/-/g, '/'));
                lesson_arr[i].now             = now;
                lesson_arr[i].today           = today;
                lesson_arr[i].left_fund_day   = Math.ceil((new Date(lesson_arr[i].end_fund.replace(/-/g,'/')).setHours(23, 59, 59, 999) - lesson_arr[i].now) / 1000 / 60 / 60 / 24);
                lesson_arr[i].left_start_day  = Math.ceil((new Date(lesson_arr[i].start_time.replace(/-/g,'/')).setHours(0, 0, 0, 0) - lesson_arr[i].now) / 1000 / 60 / 60 / 24);

                let label_result = labelModule.judgementLabelText(lesson_arr[i]);

                insert_HTML += '<div class="item col-lg-3 col-md-4 col-sm-6 col-xs-12 js-' + lesson_arr[i].type + ' js-' + lesson_arr[i].category + '" data-price="' + lesson_arr[i].end_fund + '" data-time="' + lesson_arr[i].start_time + '" data-click="' + lesson_arr[i].l_id + '">' +
                                   '<section class="thumbnail">' +
                                       '<figure class="figure">' +
                                           '<a href="/#/lesson/' + lesson_arr[i].l_id + '">' +
                                               '<div class="lesson-type-label">' +
                                                   '<span class="lesson-type bg-' + lesson_arr[i].type + '"></span>' +
                                               '</div>' +
                                               '<div class="img-wrapper">' +
                                                   '<img src="/media/' + lesson_arr[i].l_id + '/cover/' + lesson_arr[i].cover + '">' +
                                               '</div>' +
                                           '</a>' +
                                           '<div class="avatar-wrapper">' +
                                               '<a href="/teacher/' + lesson_arr[i].t_id + '">' +
                                               '<img class="avatar" src="/img/personal/avatar/' + lesson_arr[i].avg_img + '">' +
                                               '</a>' +
                                           '</div>' +
                                       '</figure>' +
                                       '<article class="caption">' +
                                           '<span><b>' + lesson_arr[i].l_name + '</b></span>' +
                                           '<p class="margin-0 margintop-10">' + lesson_arr[i].nickname +
                                               ((lesson_arr[i].m_name == null) ? '' : ' ( ' + lesson_arr[i].m_name + ' )') +
                                           '</p>' +
                                           '<p class="margin-0" style="font-size: 19px;">';

                if (lesson_arr[i].type == 'entity')
                {
                    insert_HTML += lesson_arr[i].start_time + ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][new Date(lesson_arr[i].start_time).getDay()] + lesson_arr[i].l_start_time.substr(11, 5);
                }

                if (lesson_arr[i].location != '' && lesson_arr[i].location != undefined)
                {
                    insert_HTML += '<i class="fas fa-map-marker-alt" aria-hidden="true"></i>' +
                                   '<span>' + String(lesson_arr[i].location).substr(0, 2) + '</span>';
                }
                else { insert_HTML += '<i class="fas fa-map-marker-alt" aria-hidden="true" style="visibility: hidden;"></i>'; }

                insert_HTML +=             '</p>' +
                                           '<div>' +
                                               '<p class="margin-0">';

                if (lesson_arr[i].origin_fee === 0) { insert_HTML += '<span class="price">免費</span>'; }
                else
                {
                    if (lesson_arr[i].origin_fee != lesson_arr[i].offer_fee)
                    {
                        if (lesson_arr[i].left_fund_day > 0)
                        {
                            if (lesson_arr[i].offer_fee === 0) { insert_HTML += '<span class="price">免費</span>'; }
                            else { insert_HTML += '<span class="price">NT$ ' + lesson_arr[i].offer_fee + '</span>'; }

                            insert_HTML += '<span class="no-discount">原價 $' + lesson_arr[i].origin_fee + '</span>';
                        }
                        else { insert_HTML += '<span class="price">NT$ ' + lesson_arr[i].origin_fee + '</span>'; }
                    }
                    else { insert_HTML += '<span class="price">NT$ ' +  lesson_arr[i].origin_fee + '</span>'; }
                }

                insert_HTML +=                 '</p>' +
                                               '<a href="/#/lesson/' +  lesson_arr[i].l_id + '">' +
                                               '<span class="lesson-type ' + label_result.label_class + '" data-end_fund="2018-11-17"> ' + label_result.label_text + '</span>' +
                                               '</a>' +
                                           '</div>' +
                                       '</article>' +
                                   '</section>' +
                               '</div>';
            }
            card_insert_target.append(insert_HTML);
        }

        if (max_search_result === search_start_num) { $('#loaded_all_lesson').removeClass('hidden'); }
        else
        {
            scroll_loading_module._reset_params();
            scroll_loading_module._start_listener();
        }

    }

    function _get_all_county()
    {
        return areas =
        [
            /* All County */
            // '基隆市', '臺北市', '新北市', '桃園縣', '新竹縣',
            // '新竹市', '苗栗縣', '臺中市', '彰化縣', '南投縣',
            // '雲林縣', '嘉義縣', '臺南市', '嘉義市', '高雄市',
            // '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣',
            // '金門縣', '連江縣(馬祖)', '其他'

            /* Currently County */
             '台北市', '新北市', '桃園市', '新竹市', '臺中市',
             '臺南市', '高雄市', '其他',
        ];
    }

    function _get_filter_array_category()
    {
        if (filter_array[2].length === 0)
        {
            return new Promise((resolve, reject) =>
            {
                $.ajax
                ({
                    type: 'get',
                    url: '/ajax/get_topic_list',
                    dataType: 'json',
                    headers:
                    {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success: function(data)
                    {
                        resolve(data.topic_list);
                    },
                    error: function(xhr, type)
                    {
                        reject('error');
                    }
                })
            })
        }
        else { return Promise.resolve('error'); }
    }

    function _get_filter_array_teachers()
    {
        if (max_teacher === null || loaded_teachers_num < max_teacher)
        {
            return new Promise((resolve, reject) =>
            {
                $.ajax
                ({
                    type: 'POST',
                    url: '/ajax/get_all_teacher_name',
                    dataType: 'json',
                    data:
                    {
                        start_num: loaded_teachers_num,
                        max_num: load_teachers_data_num,
                        init: init_teachers_data,
                        exclude: hot_teachers
                    },
                    headers:
                    {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    beforeSend: function()
                    {
                        more_teachers.hide();
                        loading_text.show();
                    },
                    success: function(data)
                    {
                        more_teachers.show();
                        loading_text.hide();
                        loaded_teachers_num += load_teachers_data_num;

                        if (data.data.max !== undefined && init_teachers_data)
                        {
                            max_teacher = data.data.max - filter_array[1].length;
                            init_teachers_data   = false;
                        }

                        if (loaded_teachers_num >= max_teacher) { teacher_more_card.hide(); }

                        $('.jconfirm-material').hide();
                        resolve(data.data.teacher_name);
                    },
                    error: function(xhr, type)
                    {
                        reject('error');
                    }
                })
            });
        }
        else { return Promise.resolve('error'); }
    }

    function _get_filter_array_teachers_hot()
    {
        if (init_teachers_data)
        {
            return new Promise((resolve, reject) =>
            {
                $.ajax
                ({
                    type: 'POST',
                    url: '/ajax/get_all_teacher_popular',
                    dataType: 'json',
                    data:
                    {
                        start_num: loaded_teachers_num,
                        max_num: max_hot_teachers,
                        init: init_teachers_data
                    },
                    headers:
                    {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    beforeSend: function()
                    {
                        more_teachers.hide();
                        loading_text.show();
                    },
                    success: function(data)
                    {
                        more_teachers.show();
                        loading_text.hide();
                        $('.jconfirm-material').hide();
                        resolve(data.data);
                    },
                    error: function(xhr, type)
                    {
                        reject('error');
                    }
                })
            });
        }
        else { return Promise.resolve('error'); }
    }

    function _get_filter_search_result(request_num)
    {
        return new Promise((resolve, reject) =>
        {
            let send_data   = {};
            let request_num = search_request_sum;
            send_data.data  =
            {
                type: search_array['type'] ? search_array['type'] : '',
                nickname: search_array['nickname'] ? search_array['nickname'] : [],
                category: search_array['category'] ? search_array['category'] : [],
                location: search_array['area'] ? search_array['area'] : []
            };

            if (send_data.data.nickname.length == filter_array[1].length) { send_data.data.nickname = []; }

            if (send_data.data.category.length == filter_array[2].length) { send_data.data.category = []; }

            if (send_data.data.location.length == filter_array[3].length) { send_data.data.location = []; }

            if (search_array['lesson_sort'] == undefined) { search_array['lesson_sort'] = []; }

            if (search_array['lesson_sort'][0] == undefined) { search_array['lesson_sort'][0] = 'latest_ASC'; }

            if (search_array['lesson_sort'][1] == undefined) { search_array['lesson_sort'][1] = ''; }

            send_data.time_range          = search_array['time'] ? search_array['time'] : [];
            send_data.params              = {};
            send_data.params['start_num'] = (search_start_num ? search_start_num : null);
            send_data.params['limit']     = (search_limit ? search_limit : null);
            send_data.params['init']      = (init_search_data ? init_search_data : null);
            send_data.params['sort']      = (search_array['lesson_sort'][0] ? search_array['lesson_sort'][0] : 'latest_ASC');
            send_data.params['sort']      = ((search_array['lesson_sort'][0] == 'popular') ? 'hot' : search_array['lesson_sort'][0]) + search_array['lesson_sort'][1];
            send_data.all_area            = _get_all_county();

            $.ajax
            ({
                type: 'get',
                url: '/ajax/get_lesson_filter_data',
                dataType: 'json',
                data: send_data,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                    $('#loading_lesson').removeClass('hidden');
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

                        resolve(data.data[0]);
                    }
                },
                error: function(xhr, type)
                {
                    reject('error');
                },
                complete: function()
                {
                    $('#loading_lesson').addClass('hidden');
                }
            })
        });
    }

    function _hidden_filter_wrapper()
    {
        filter_wrapper.hide();
    }

    function _initial_filter_array()
    {
        // Set lessons type for Filter Array
        var p0 = new Promise((resolve, reject) =>
        {
            resolve(_set_filter_array_type());
        })

        // Set teachers data for Filter Array
        var p1 = new Promise((resolve, reject) =>
        {
            resolve(_set_filter_array_teacher());
        })

        // Set category data for Filter Array
        var p2 = new Promise((resolve, reject) =>
        {
            resolve(_set_filter_array_category());
        })

        // Set areas data for Filter Array
        var p3 = new Promise((resolve, reject) =>
        {
            resolve(_set_filter_array_area());
        })

        Promise.all([p0, p1, p2, p3]).then(values =>
        {
            // Set filter array check
            _set_filter_array_check(filter_array).then((value) =>
            {
                if (site_URL_search == '')
                {
                    search_is_ready = true;
                    _loading_new_data_and_draw();
                }
                else
                {
                    for (var key of params.keys())
                    {
                        switch (key)
                        {
                            case 'type':
                                $.each(params.get('type').split(','), (key, value) =>
                                {
                                    $('#type_' + value).trigger('click');
                                });
                                break;
                            case 'teacher':
                                $.each(params.get('teacher').split(','), (key, value) =>
                                {
                                    $('#t_' + value).trigger('click');
                                });
                                break;
                            case 'category':
                                $.each(params.get('category').split(','), (key, value) =>
                                {
                                    $('#c_' + value).trigger('click');
                                });
                                break;
                            case 'area':
                                $.each(params.get('area').split(','), (key, value) =>
                                {
                                    $('#a_' + value).trigger('click');
                                });
                                break;
                            case 'time':
                                let has_error = false;

                                $.each(params.get('time').split(','), (key, value) =>
                                {
                                    if (value.length != 10 || new Date(value) == 'Invalid Date') { has_error = true; }
                                });

                                if (!has_error)
                                {
                                    filter_array[4][0] = params.get('time').split(',');
                                    _add_search_array('time', 4, 0);
                                    $('#select_time_range').val(params.get('time').replace(/\,/g, " - "));
                                    $('#clear_select_date').removeClass('hide');
                                }

                                break;
                            case 'lesson_sort':
                                let lesson_sort_text = params.get('lesson_sort').split('_');
                                let trigger_btn = $('#btn_' + ((lesson_sort_text[0] == 'latest') ? 'time' : lesson_sort_text[0]));

                                switch (lesson_sort_text[1])
                                {
                                  case 'DESC':
                                      trigger_btn.click();
                                      break;
                                  case 'ASC':
                                      trigger_btn.click();
                                      trigger_btn.click();
                                      break;
                                  default:
                                      // won't do anything
                                }
                                break;
                            default:
                                // won't do anything
                        }
                    }
                    search_is_ready = true;
                    _loading_new_data_and_draw();
                }
            });
        })
    }

    function _loading_data_and_draw()
    {
        if (search_is_ready && search_start_num != max_search_result)
        {
            search_request_sum++;
            _get_filter_search_result(search_request_sum).then((data) =>
            {
                _create_lesson_cards(data);
            });
        }
    }

    function _loading_new_data_and_draw()
    {
        init_search_data  = true;
        max_search_result = 0;
        search_limit      = 20;
        search_start_num  = 0;

        if (search_is_ready)
        {
            $('#item_none').addClass('hidden');
            card_insert_target.empty();
            search_request_sum++;
            $('#loaded_all_lesson').addClass('hidden');
            _get_filter_search_result(search_request_sum).then((data) =>
            {
                if (data.length === 0) { $('#item_none').removeClass('hidden'); }
                _create_lesson_cards(data);
            });
        }
    }

    function _remove_filter_label(el)
    {
        el.remove();
        select_filter_num--;

        if (select_filter_num == 0) { _hidden_filter_wrapper(); }
    }

    function _remove_search_array(type, arrayIndex, index)
    {
        switch (type)
        {
            case 'type':
                search_array['type'] = '';
                break;
            case 'teacher':
                if (search_array['nickname'] == undefined) { break; }

                find_index = search_array['nickname'].indexOf(filter_array[arrayIndex][index][0]);

                if (find_index != -1) { search_array['nickname'].splice(find_index, 1); }

                break;
            case 'category':
                if (search_array['category'] == undefined) { break; }

                find_index = search_array['category'].indexOf(filter_array[arrayIndex][index][0]);

                if (find_index != -1) { search_array['category'].splice(find_index, 1); }

                break;
            case 'area':
                if (search_array['area'] == undefined) { break; }

                find_index = search_array['area'].indexOf(filter_array[arrayIndex][index][0]);

                if (find_index != -1) { search_array['area'].splice(find_index, 1); }

                break;
            case 'time':
                search_array['time'] = [];
                break;
            default:
                // won't do anything
        }
        _update_btn_active();
    }

    function _remove_URL_params(param_name, URL_remove_text)
    {
        let params_text = '';
        switch (param_name)
        {
            case 'type':
                params.set('type', ((params.get('type') == null) ? '' : (params.get('type').split(',').filter(word => word != URL_remove_text))));

                if (params.get('type') == '') { params.delete('type'); }

                history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + ((params == '') ? ('') : ('?' + params)));
                _loading_new_data_and_draw();
                break;
            case 'teacher':
                params.set('teacher', ((params.get('teacher') == null) ? '' : (params.get('teacher').split(',').filter(word => word != URL_remove_text))));

                if (params.get('teacher') == '') { params.delete('teacher'); }

                history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + ((params == '') ? ('') : ('?' + params)));
                _loading_new_data_and_draw();
                break;
            case 'category':
                params.set('category', ((params.get('category') == null) ? '' : (params.get('category').split(',').filter(word => word != URL_remove_text))));

                if (params.get('category') == '') { params.delete('category'); }

                history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + ((params == '') ? ('') : ('?' + params)));
                _loading_new_data_and_draw();
                break;
            case 'area':
                params.set('area', ((params.get('area') == null) ? '' : (params.get('area').split(',').filter(word => word != URL_remove_text))));

                if (params.get('area') == '') { params.delete('area'); }

                history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + ((params == '') ? ('') : ('?' + params)));
                _loading_new_data_and_draw();
                break;
            case 'time':
                params.delete('time');
                history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + ((params == '') ? ('') : ('?' + params)));
                _loading_new_data_and_draw();
                break;
            case 'lesson_sort':
                params.delete('lesson_sort');
                history.replaceState(stateObj, '', site_URL.origin + site_URL.pathname + ((params == '') ? ('') : ('?' + params)));
                _loading_new_data_and_draw();
                break;
            default:
                // won't do anything
        }
    }

    function _reset_search_array_and_load()
    {
        // close search function
        search_is_ready = false;

        search_array['type']           = '';
        search_array['nickname']       = [];
        search_array['category']       = [];
        search_array['area']           = [];
        search_array['time']           = [];
        search_array['lesson_sort']    = [];
        search_array['lesson_sort'][0] = '';
        search_array['lesson_sort'][1] = '';


        $.each($('.type-wrapper').find('div'), (key, value) =>
        {
            value_target = $(value);
            if (value_target.hasClass('select-item')) { value_target.trigger('click'); }
        })

        $.each($('.teacher-wrapper').find('div'), (key, value) =>
        {
            value_target = $(value);
            if (value_target.hasClass('select-item')) { value_target.trigger('click'); }
        })

        $.each($('.category-wrapper').find('div'), (key, value) =>
        {
            value_target = $(value);
            if (value_target.hasClass('select-item')) { value_target.trigger('click'); }
        })

        $.each($('.area-wrapper').find('div'), (key, value) =>
        {
            value_target = $(value);
            if (value_target.hasClass('select-item')) { value_target.trigger('click'); }
        })

        $('#clear_select_date').trigger('click');

        all_lesson._reset_sort_btn_class();

        // open search function
        search_is_ready = true;
        $('#btn_time').trigger('click');
    }

    function _set_filter_array_area()
    {
        return new Promise((resolve, reject) =>
        {
            let options   = '';
            let area_menu = $('.area-menu');
            const areas   = _get_all_county();

            filter_array[3] = areas;

            $.each(areas, function(index, value)
            {
                $('<div />',
                {
                    id: 'a_' + index,
                    class: 'area-item col-md-4',
                    click: (el) =>
                    {
                        let target = el.currentTarget;

                        $(target).toggleClass('select-item');

                        if ($(target).hasClass('select-item'))
                        {
                            filter_wrapper.show();
                            _add_filter_label($(target), 3, index, 'area');
                            _add_URL_params('area', index);
                        }
                    }
                }).append($('<i />',
                {
                    class: 'fas fa-check'
                })).append($('<span />',
                {
                    text: value
                })).appendTo(area_menu);
            });
            resolve('success');
        })
    }

    function getAllCategorys(tc)
    {
        let
            topicCategory = tc,
            categorys = [];

        for(let i = 0, j = tc.length; i < j; i++)
        {
            for(let ii = 0; ii< tc[i].num; ii++ )
            {
                categorys.push(tc[i][ii]);
            }
        }

        return categorys;
    }

    function _set_filter_array_category()
    {
        return new Promise((resolve, reject) =>
        {
            _get_filter_array_category().then((value) =>
            {
                let options                        = '';
                let insert_target_category_wrapper = $('.category-wrapper');

                wishing_module.setCategorys(getAllCategorys(value));

                $('#btn_wishing').removeClass('hidden');

                $.each(value, (index, value) =>
                {
                    options = '<div class="category-card row">' +
                                  '<div class="col-md-2">' +
                                      '<span class="category-title">' + value.topic + '</span>' +
                                  '</div>' +
                                  '<div id="c_w_' + index + '" class="category-menu col-md-10">' +
                                  '</div>' +
                              '</div>'

                    insert_target_category_wrapper.append(options);

                    let insert_target_category = $('#c_w_' + index);

                    for (let i = 0; i < value.num; i++)
                    {
                        filter_array[2].push(value[i]);

                        let two_dimensional_index = filter_array[2].length - 1;

                        $('<div />',
                        {
                            id: 'c_' + two_dimensional_index,
                            class: 'category-item col-md-4',
                            click: (el) =>
                            {
                                let target = el.currentTarget;

                                $(target).toggleClass('select-item');

                                if ($(target).hasClass('select-item'))
                                {
                                    filter_wrapper.show();
                                    _add_filter_label($(target), 2, two_dimensional_index, 'category');
                                    _add_URL_params('category', two_dimensional_index);
                                }
                            }
                        }).append($('<i />',
                        {
                            class: 'fas fa-check'
                        })).append($('<span />',
                        {
                            text: value[i]
                        })).appendTo(insert_target_category);
                    }
                })
                resolve('success');
            })
        })
    }

    function _set_filter_array_check(arr)
    {
        return new Promise((resolve, reject) =>
        {
            arr.forEach((item, index, array) =>
            {
                let one_dimensional_index = index;

                item.forEach((item, index, array) =>
                {
                    arr[one_dimensional_index][index]    = [];
                    arr[one_dimensional_index][index][0] = item;
                    arr[one_dimensional_index][index][1] = false;
                })
            })
            resolve('success');
        })
    }

    function _set_filter_array_teacher()
    {
        return new Promise((resolve, reject) =>
        {
            _get_filter_array_teachers_hot().then((value) =>
            {
                if (value != 'error')
                {
                    let options      = '';
                    let teacher_menu = $('.hot-teacher-menu');
                    let arr_length   = filter_array[1].length;

                    $.each(value, function(index, value)
                    {
                        let arr_index    = arr_length + index;
                        let teacher_name = ((value.m_name == null) ? (value.nickname) : (value.nickname + ' (' + value.m_name + ')'));

                        hot_teachers.push(value.nickname);

                        if (loaded_teachers_num <= load_teachers_data_num) { filter_array[1].push(value.nickname); }
                        else { filter_array[1].push([value.nickname, false]); }

                        $('<div />',
                        {
                            id: 't_' + arr_index,
                            class: 'teacher-item col-md-4',
                            click: (el) =>
                            {
                                let target = el.currentTarget;

                                $(target).toggleClass('select-item');

                                if ($(target).hasClass('select-item'))
                                {
                                    filter_wrapper.show();
                                    _add_filter_label($(target), 1, arr_index, 'teacher');
                                    _add_URL_params('teacher', arr_index);
                                }
                            }
                        }).append($('<i />',
                        {
                            class: 'fas fa-check'
                        })).append($('<span />',
                        {
                            text: teacher_name
                        })).appendTo(teacher_menu);
                    });
                }

                _get_filter_array_teachers().then((value) =>
                {
                    if (value != 'error')
                    {
                        let options      = '';
                        let teacher_menu = $('.teacher-menu');
                        let arr_length   = filter_array[1].length;

                        $.each(value, function(index, value)
                        {
                            let teacher_name = ((value.m_name == null) ? (value.nickname) : (value.nickname + ' (' + value.m_name + ')'));

                            if (loaded_teachers_num <= load_teachers_data_num) { filter_array[1].push(value.nickname); }
                            else { filter_array[1].push([value.nickname, false]); }

                            let arr_index = arr_length + index;

                            $('<div />',
                            {
                                id: 't_' + arr_index,
                                class: 'teacher-item col-md-4',
                                click: (el) =>
                                {
                                    let target = el.currentTarget;

                                    $(target).toggleClass('select-item');

                                    if ($(target).hasClass('select-item'))
                                    {
                                        filter_wrapper.show();
                                        _add_filter_label($(target), 1, arr_index, 'teacher');
                                        _add_URL_params('teacher', arr_index);
                                    }
                                }
                            }).append($('<i />',
                            {
                                class: 'fas fa-check'
                            })).append($('<span />',
                            {
                                text: teacher_name
                            })).appendTo(teacher_menu);
                        });
                        resolve('success');
                    }
                    else { resolve('error'); }
                })
            })
        })
    }

    function _set_filter_array_type()
    {
        return new Promise((resolve, reject) =>
        {
            let options       = '';
            let type_menu     = $('.type-menu');
            const lesson_type = ['實體', '線上'];

            $.each(lesson_type, function(index, value)
            {
                $('<div />',
                {
                    id: 'type_' + index,
                    class: 'type-item col-md-4',
                    click: (el) =>
                    {
                        let target = el.currentTarget;

                        $(target).toggleClass('select-item');

                        if ($(target).hasClass('select-item'))
                        {
                            filter_wrapper.show();
                            _add_filter_label($(target), 0, index, 'type');
                            _add_URL_params('type', index);
                        }
                    }
                }).append($('<i />',
                {
                    class: 'fas fa-check'
                })).append($('<span />',
                {
                    text: value
                })).appendTo(type_menu);
            });

            filter_array[0] = lesson_type;
            resolve('success');
        })
    }

    function _sort(sort_text)
    {
        if (search_array['lesson_sort'] == undefined) { search_array['lesson_sort'] = []; }

        if (search_array['lesson_sort'][0] == undefined || search_array['lesson_sort'][0] != sort_text)
        {
            search_array['lesson_sort'][0] = sort_text;
            search_array['lesson_sort'][1] = '_DESC';
            _add_URL_params('lesson_sort', search_array['lesson_sort'][0] + search_array['lesson_sort'][1]);
        }
        else
        {
            (search_array['lesson_sort'][1] == '_ASC') ? (search_array['lesson_sort'][1] = '_DESC') : (search_array['lesson_sort'][1] = '_ASC');

            _add_URL_params('lesson_sort', search_array['lesson_sort'][0] + search_array['lesson_sort'][1]);
        }
    }

    return {
        _add_search_time: function(arr = [])
        {
            filter_array[4][0] = arr;
            _add_search_array('time', 4, 0);
            _add_URL_params('time', arr);
        },
        _loading_data_and_draw: function()
        {
            _loading_data_and_draw();
        },
        _loading_new_data_and_draw: function()
        {
            _loading_new_data_and_draw();
        },
        _more_filter_teachers: function()
        {
            _set_filter_array_teacher();
        },
        _remove_search_time: function()
        {
            _remove_search_array('time', 4, 0);
            _remove_URL_params('time');
        },
        _reset_search_array_and_load: function()
        {
            _reset_search_array_and_load();
        },
        _sort: function(sort_text)
        {
            _sort(sort_text);
        }
    }
}


/**
 * [scroll_loading_module control user scroll loading]
 */
function scroll_loading_module()
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
        _start_listener();
    }

    function _scroll_feedback(){
        _stop_listener();
        scroll_diff = body_content_height - listener_target.scrollTop();

        if (scroll_diff <= bottom_distance)
        {
            filter_module._loading_data_and_draw();
            _stop_listener();
        }
        else { _start_listener(); }
    }
    function _start_listener()
    {
        listener_target.scroll(
            _scroll_feedback
        );
    }

    function _stop_listener()
    {
        listener_target.off('scroll',_scroll_feedback);
    }

    function _reset_params()
    {
        body_content_height = body_content.height();
    }

    return {
        _start_listener: function()
        {
            _start_listener();
        },
        _stop_listener: function()
        {
            _stop_listener();
        },
        _reset_params: function()
        {
            _reset_params();
        }
    }
}


/**
 * [All of the following functions are global]
 */
function _become_default()
{
    $('.item:hidden').show();
    $('.type-wrapper').hide();
    $('.teacher-wrapper').hide();
    $('.category-wrapper').hide();
    $('.area-wrapper').hide();
    $('#item_none').addClass('hidden');
}

function _close_type_wrapper()
{
    $('.type-wrapper').hide();
}

function _close_teacher_wrapper()
{
    $('.teacher-wrapper').hide();
}

function _close_category_wrapper()
{
    $('.category-wrapper').hide();
}

function _close_area_wrapper()
{
    $('.area-wrapper').hide();
}
