function loadLessonModule() {
    // Set search variable
    var init_search_data = true,
        search_array = [],
        // Set target variable from DOM
        loading_text = $('#loading_text'),
        card_insert_target = $('.indList')

    function _create_lesson_cards(lesson_arr = []) {
        if (lesson_arr.length === 0) {
            $('#item_none').show()
        } else {
            let insert_HTML = '',
                now = new Date(),
                end_fund_day = '',
                today

            today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())

            for (let i = 0; i < lesson_arr.length; i++) {
                // get label_text and label_class then insert into HTNL
                end_fund_day = new Date(lesson_arr[i].end_fund.replace(/-/g, '/'))
                lesson_arr[i].now = now
                lesson_arr[i].today = today
                lesson_arr[i].left_fund_day = Math.ceil(
                    (new Date(lesson_arr[i].end_fund.replace(/-/g, '/')).setHours(23, 59, 59, 999) -
                        lesson_arr[i].now) /
                        1000 /
                        60 /
                        60 /
                        24
                )
                lesson_arr[i].left_start_day = Math.ceil(
                    (new Date(lesson_arr[i].start_time.replace(/-/g, '/')).setHours(0, 0, 0, 0) -
                        lesson_arr[i].now) /
                        1000 /
                        60 /
                        60 /
                        24
                )

                let label_result = labelModule.judgementLabelText(lesson_arr[i])

                insert_HTML +=
                    '<div class="item col-lg-3 col-md-4 col-sm-6 col-xs-12 js-' +
                    lesson_arr[i].type +
                    ' js-' +
                    lesson_arr[i].category +
                    '" data-price="' +
                    lesson_arr[i].end_fund +
                    '" data-time="' +
                    lesson_arr[i].start_time +
                    '" data-click="' +
                    lesson_arr[i].l_id +
                    '">' +
                    '<section class="thumbnail">' +
                    '<figure class="figure">' +
                    '<a href="/#/lesson/' +
                    lesson_arr[i].l_id +
                    '">' +
                    '<div class="lesson-type-label">' +
                    '<span class="lesson-type bg-' +
                    lesson_arr[i].type +
                    '"></span>' +
                    '</div>' +
                    '<div class="img-wrapper">' +
                    '<img src="/media/' +
                    lesson_arr[i].l_id +
                    '/cover/' +
                    lesson_arr[i].cover +
                    '">' +
                    '</div>' +
                    '</a>' +
                    '<div class="avatar-wrapper">' +
                    '<a href="/#/teacher/' +
                    lesson_arr[i].t_id +
                    '">' +
                    '<img class="avatar" src="/img/personal/avatar/' +
                    lesson_arr[i].avg_img +
                    '">' +
                    '</a>' +
                    '</div>' +
                    '</figure>' +
                    '<article class="caption">' +
                    '<span><b>' +
                    lesson_arr[i].l_name +
                    '</b></span>' +
                    '<p class="margin-0 margintop-10">' +
                    lesson_arr[i].nickname +
                    (lesson_arr[i].m_name == null ? '' : ' ( ' + lesson_arr[i].m_name + ' )') +
                    '</p>' +
                    '<p class="margin-0" style="font-size: 19px;">'

                if (lesson_arr[i].type == 'entity') {
                    insert_HTML +=
                        lesson_arr[i].start_time +
                        ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][
                            new Date(lesson_arr[i].start_time.replace(/-/g, '/')).getDay()
                        ] +
                        lesson_arr[i].l_start_time.substr(11, 5)
                }

                if (lesson_arr[i].location != '' && lesson_arr[i].location != undefined) {
                    insert_HTML +=
                        '<i class="fas fa-map-marker-alt" aria-hidden="true"></i>' +
                        '<span>' +
                        String(lesson_arr[i].location).substr(0, 2) +
                        '</span>'
                } else {
                    insert_HTML +=
                        '<i class="fas fa-map-marker-alt" aria-hidden="true" style="visibility: hidden;"></i>'
                }

                insert_HTML += '</p>' + '<div>' + '<p class="margin-0">'

                if (lesson_arr[i].origin_fee === 0) {
                    insert_HTML += '<span class="price">免費</span>'
                } else {
                    if (lesson_arr[i].origin_fee != lesson_arr[i].offer_fee) {
                        if (lesson_arr[i].left_fund_day >= 0) {
                            if (lesson_arr[i].offer_fee === 0) {
                                insert_HTML += '<span class="price">免費</span>'
                            } else {
                                insert_HTML +=
                                    '<span class="price">NT$ ' + lesson_arr[i].offer_fee + '</span>'
                            }

                            insert_HTML +=
                                '<span class="no-discount">原價 $' +
                                lesson_arr[i].origin_fee +
                                '</span>'
                        } else {
                            insert_HTML +=
                                '<span class="price">NT$ ' + lesson_arr[i].origin_fee + '</span>'
                        }
                    } else {
                        insert_HTML +=
                            '<span class="price">NT$ ' + lesson_arr[i].origin_fee + '</span>'
                    }
                }

                insert_HTML +=
                    '</p>' +
                    '<a href="/#/lesson/' +
                    lesson_arr[i].l_id +
                    '">' +
                    '<span class="lesson-type ' +
                    label_result.label_class +
                    '" data-end_fund="2018-11-17"> ' +
                    label_result.label_text +
                    '</span>' +
                    '</a>' +
                    '<div id="favorite_' +
                    lesson_arr[i].l_id +
                    '" class="card__content__favorite">' +
                    '<button class="btn card__content__favorite__cancel__btn" onclick="changeFavorite(' +
                    lesson_arr[i].l_id +
                    ')">' +
                    '<i class="far fa-heart" aria-hidden="true"></i>' +
                    '取消收藏' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</article>' +
                    '</section>' +
                    '</div>'
            }

            card_insert_target.append(insert_HTML)
        }

        $('#loaded_all_lesson').show()
    }

    function _loading_favorite_lesson_data() {
        return new Promise((resolve, reject) => {
            let send_data = {}

            $.ajax({
                type: 'get',
                url: '/ajax/getFavoriteLessonData',
                dataType: 'json',
                data: send_data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function() {
                    $('#loading_lesson').show()
                },
                success: function(data) {
                    resolve(data)
                },
                error: function(xhr, type) {
                    reject('error')
                },
                complete: function() {
                    $('#loading_lesson').hide()
                }
            })
        })
    }

    function _loading_data_and_draw() {
        _loading_favorite_lesson_data().then(data => {
            _create_lesson_cards(data)
        })
    }

    function _loading_new_data_and_draw() {
        init_search_data = true

        $('#item_none').hide()
        card_insert_target.empty()
        $('#loaded_all_lesson').hide()
        _loading_favorite_lesson_data().then(data => {
            if (data.length === 0) {
                $('#item_none').show()
            }

            _create_lesson_cards(data)
        })
    }

    return {
        _loading_data_and_draw: function() {
            _loading_data_and_draw()
        },
        _loading_new_data_and_draw: function() {
            _loading_new_data_and_draw()
        },
        _create_lesson_cards: function(arr = []) {
            _create_lesson_cards(arr)
        }
    }
}

var favoriteModule, loadLessonModule

$(function() {
    // The path of this file is
    // [ File path ] js/page_js/site/module/favorite_module.js
    favoriteModule = new favoriteModule()

    // The path of this file is

    loadLessonModule = new loadLessonModule()

    loadLessonModule._loading_new_data_and_draw()
})

function changeFavorite(l_id) {
    let changeElement = $('#favorite_' + l_id)

    if (changeElement.length != 0) {
        if (changeElement.children('button').hasClass('card__content__favorite__add__btn')) {
            favoriteModule.addFavorite(l_id).then(value => {
                if (value === 'success') {
                    let element, element_m

                    element = $('#favorite_' + l_id).children('button')

                    let insert_html =
                        '<i class="far fa-heart" aria-hidden="true"></i>' + ' 取消收藏'

                    element.html(insert_html)
                    element.toggleClass('card__content__favorite__add__btn')
                    element.toggleClass('card__content__favorite__cancel__btn')
                }
            })
        } else {
            favoriteModule.cancelFavorite(l_id).then(value => {
                if (value === 'success') {
                    let element, element_m

                    element = $('#favorite_' + l_id).children('button')

                    let insert_html =
                        '<i class="fas fa-heart" aria-hidden="true"></i>' + ' 加入收藏'

                    element.html(insert_html)
                    element.toggleClass('card__content__favorite__add__btn')
                    element.toggleClass('card__content__favorite__cancel__btn')
                }
            })
        }
    }
}
