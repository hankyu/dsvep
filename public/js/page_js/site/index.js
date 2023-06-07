!(function($) {
    let draggable_module = new draggableModule()

    $(document).ready(() => {
        createLesson().then(() => {
            draggable_module.initDraggable()
        })
    })

    function createLesson() {
        return getLesson()
            .then(data => {
                return createLessonComponent(data)
            })
            .catch(e => {
                $.alert({
                    title: 'Oops! 發生錯誤',
                    content: '錯誤代碼：' + e.status + '<br>' + '請聯絡我們'
                })
            })
    }

    function createLessonComponent(data) {
        return new Promise((resolve, reject) => {
            $.each(data, (key, value) => {
                if (value.title == undefined || value.lesson_data.length == 0) {
                    return
                }

                let card_html = '',
                    card_body_html,
                    card_list_html,
                    card_title_html,
                    lesson_section,
                    now,
                    title_html,
                    today,
                    // Button For Previous And Next Card Group
                    next_btn_html,
                    previous_btn_html

                lesson_section = $('<section>')
                title_html = `
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div>
                                    <div class="section-heading text-left">
                                        <h2 class="h-bold index-title margintop-40">
                                            <span>${value.title}</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`

                lesson_section.append(title_html)

                now = new Date()
                today = new Date(new Date().setHours(0, 0, 0, 0))

                $.each(value.lesson_data, (key, value) => {
                    let label,
                        left_fund_day,
                        left_start_day,
                        lesson_price,
                        teacher_data,
                        time_address

                    left_fund_day = Math.ceil(
                        (new Date(value.end_fund.replace(/-/g, '/')).setHours(23, 59, 59, 999) -
                            now) /
                            1000 /
                            60 /
                            60 /
                            24
                    )
                    left_start_day = Math.ceil(
                        (new Date(value.start_time.replace(/-/g, '/')).setHours(0, 0, 0, 0) - now) /
                            1000 /
                            60 /
                            60 /
                            24
                    )
                    label = labelModule.judgementLabelText({
                        cancel_lesson: value.cancel_lesson,
                        today: today,
                        now: now,
                        left_fund_day: left_fund_day,
                        left_start_day: left_start_day,
                        start_time: value.start_time.substring(0, 10),
                        type: value.type,
                        l_start_time: value.last_time,
                        l_end_time: value.end_time,
                        max_people: value.max_people,
                        buy_people: value.buyer,
                        buyer: value.buyer,
                        end_fund: value.end_fund,
                        least_people: value.least_people,
                        offer_fee: value.offer_fee,
                        origin_fee: value.origin_fee
                    })

                    lesson_price = priceModule.judgementPriceText({
                        today: today,
                        end_fund: value.end_fund,
                        offer_fee: value.offer_fee,
                        origin_fee: value.origin_fee
                    })

                    teacher_data = data['teacher_data']

                    time_address =
                        value.type === 'online'
                            ? ''
                            : value.start_time.substr(0, 10) +
                              ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][
                                  new Date(
                                      value.start_time.substring(0, 10).replace(/-/g, '/')
                                  ).getDay()
                              ] +
                              value.start_time.substr(11, 5) +
                              ' <i class="fas fa-map-marker-alt" aria-hidden="true"></i>' +
                              value.location.substring(0, 2)

                    card_html += `
                        <div class="item">
                            <div class="thumbnail">
                                <figure class="figure">
                                    <a href="/lesson/${value.l_id}" draggable="false">
                                        <div class="lesson-type-label">
                                            <span class="lesson-type ${value.type}"></span>
                                        </div>
                                        <div class="img-wrapper">
                                            <img src="/media/${value.l_id}/cover/${
                        value.cover
                    }" draggable="false">
                                        </div>
                                    </a>
                                    <div class="avatar-wrapper">
                                        <a href="/#/teacher/${value.t_id}" draggable="false">
                                            <img class="avatar" src="img/personal/avatar/${
                                                teacher_data[value.t_id].avg_img
                                            }" draggable="false">
                                        </a>
                                    </div>
                                </figure>
                                <article class="caption">
                                    <span><b>${value.l_name}</b></span>
                                    <p class="margin-0 margintop-10">
                                        ${teacher_data[value.t_id].nickname}
                                        ${
                                            !teacher_data[value.t_id].m_name
                                                ? ''
                                                : '(' + teacher_data[value.t_id].m_name + ')'
                                        }
                                    </p>
                                    <p class="margin-0" ${
                                        value.type === 'entity' ? '' : 'style="visibility: hidden"'
                                    }>
                                        ${time_address ? time_address : 'no address'}
                                    </p>
                                    <div>
                                        <p class="margin-0">
                                            ${lesson_price}
                                        </p>
                                        <a href="/lesson/${value.l_id}" draggable="false">
                                            <span class="lesson-type ${label.label_class}">
                                                ${label.label_text}
                                            </span>
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>`
                })

                // more lesson
                card_html += `
                    <div class="item">
                        <a href="/lesson/all">
                            <div class="more-lesson">
                                <span>所有課程</span>
                            </div>
                        </a>
                    </div>`

                // button for previous and next card group
                previous_btn_html = `
                    <div class="previous_container absolute">
                        <button id="previous_btn_${key}" class="previous_btn round" onclick="previous_lesson(${key})">
                            <div class="chevron-container">
                                <i class="fa fa-chevron-left move-left"></i>
                                <i class="fa fa-chevron-left"></i>
                            </div>
                        </button>
                    </div>`

                next_btn_html = `
                    <div class="next_container absolute">
                        <button id="next_btn_${key}" class="next_btn round" onclick="next_lesson(${key})">
                            <div class="chevron-container">
                                <i class="fa fa-chevron-right move-right"></i>
                                <i class="fa fa-chevron-right"></i>
                            </div>
                        </button>
                    </div>`

                card_list_html = `
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 indList list-unstyled">
                                <div id="lesson_list_container_${key}" class="lesson-list-container">
                                    <div id="lesson_list_${key}" class="lesson-list">
                                        ${card_html}
                                    </div>
                                    ${previous_btn_html}
                                    ${next_btn_html}
                                </div>
                            </div>
                        </div>
                    </div>`

                lesson_section.append(card_list_html)

                renderLessonCard(lesson_section)
            })

            $('.body-content').append(`
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 indList list-unstyled">
                            <div class="item">
                                <a href="/lesson/all">
                                    <div class="more-lesson" style="width:100px; margin:30px auto;">
                                        <span>所有課程</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            $('#main-select').remove()
            resolve('success')
        })
    }

    function getLesson() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/ajax/initIndexData',
                type: 'get',
                async: true,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success(data) {
                    resolve(data)
                },
                error(e) {
                    reject(e)
                }
            })
        })
    }

    function renderLessonCard(html) {
        let insert_target

        insert_target = $('.body-content')

        insert_target.append(html)
    }
})(jQuery)
