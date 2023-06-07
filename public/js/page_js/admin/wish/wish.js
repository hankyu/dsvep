!function() {
    $(document).ready(() =>
    {
        let wish = new wishModule(),
            wish_data;

        wish.getAllWishing().then(data =>
        {
            drawCard(data);
        });

        function drawCard(arr)
        {
            let bind_el,
                insert_target = $('#wishing-content');

            $.each(arr, (key, value) =>
            {
                let insert_card,
                    insert_HTML = '';

                insert_HTML += '<div class="col-md-3">' +
                                    '<div class="card">' +
                                        '<div class="card-header">' +
                                            '<div><img src="' + '/img/personal/avatar/' + value.avg_img + '"></div>' +
                                            '<div class="card-title">' + value.nickname + '</div>' +
                                        '</div>' +
                                        '<div id="bind_click" class="card-body">' +
                                            '我想學：' + value.title + '<br>' +
                                            '目標：' + value.goal + '<br>' +
                                            (value.content ? '就像：' + value.content + '' : '') +
                                        '</div>' +
                                        '<div class="card-tail">' +
                                            '<div style="line-height: 20px;">' +
                                                '<div style="color: blue;">#' + value.w_id + '</div>' +
                                                '<div>類別</div>' +
                                                '<div>' + value.category + '</div>' +
                                            '</div>' +
                                            '<div>創建時間：' + value.created_at + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

                insert_target.append(insert_HTML);

                bind_el = $('#bind_click');
                bind_el.on('click', () =>
                {
                    drawFullCard(value);
                });
                bind_el.removeAttr('id');
            });
        }

        function drawFullCard(data)
        {
            let card,
                card_body,
                close_icon,
                insertHTML;

            insertHTML = $('<div>',
            {
                class: 'popup__background',
                id: 'popup-background'
            });

            card = $('<div>',
            {
                class: 'popup__card scrollbar-custom',
                click: function(e)
                {
                    e.stopPropagation();
                }
            });

            close_icon = $('<div>',
            {
                class: 'close__contain'
            })
            .append($('<div>',
            {
                class: 'close__icon fa fa-times',
                id: 'close-icon'
            }));

            card_body = $('<div>',
            {
                class: 'popup__card__body',
                id: 'popup-card-body'
            });

            card_body.append($('<div>',
            {
                class: 'pupup__card__body__title',
                text: '我想學'
            }));

            card_body.append($('<br>'));

            card_body.append($('<div>',
            {
                class: 'pupup__card__body__content',
                text: data.title
            }));

            card_body.append($('<div>',
            {
                class: 'pupup__card__body__title',
                text: '目標'
            }));

            card_body.append($('<br>'));

            card_body.append($('<div>',
            {
                class: 'pupup__card__body__content',
                text: data.goal
            }));

            // Insert HTML
            card.append(close_icon);
            card.append(card_body);
            insertHTML.append(card);
            insertHTML.appendTo($('body'));

            // Check has album
            if (data.album !== null || data.content !== null)
            {
                let content_html,
                    insert_target = $('#popup-card-body');

                insert_target.append($('<div>',
                {
                    class: 'pupup__card__body__title',
                    text: '就像'
                }));

                insert_target.append('<div id="loading-animation" class="loading__animation__content"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');

                if (data.content !== null)
                {
                    content_html = data.content.replace(/(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/g, (match) =>
                    {
                        return '<a href="' + match + '">' + match + '</a>';
                    });

                    insert_target.append('<div class="pupup__card__body__content">' + content_html + '</div>');
                }

                if (data.album !== null)
                {
                    wish.getOwnWishingImg(data.album).then((snap) =>
                    {
                        $.each(snap, (key, value) =>
                        {
                            insert_target.append('<img src="' + value + '">');
                        });
                    });
                }
                // Loading Animation Hide
                $('#loading-animation').remove();

                //  Scroll Bar Hidden When It's Too Long
                $('.jconfirm-content-pane').css('overflow-y', 'none');

                card_body.append($('<br>'));
            }

            $('body').css('overflow-y', 'hidden');

            $('#popup-background').on('click', () =>
            {
                $('#popup-background').remove();
                $('body').css('overflow-y', '');
            });

            $('#close-icon').on('click', () =>
            {
                $('#popup-background').trigger('click');
            });
        }
    })
}();
