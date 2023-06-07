function wishing_module()
{
    let 
        initForm = false,
        image    = [],
        categorys    = [];

    function createForm()
    {
        let
            // Insert HTML
            wishingForm = '',

            // Insert Target
            insert_target = $('body');


        // Use Checkbox Module
        checkbox_module.initArray(categorys,
        {
            changeClass: true,
            max: 3
        })

        wishingForm = '<div id="wishingForm" class="wishing">' +
                          '<div class="wishing__form">' +
                              '<div class="form__close" onclick="wishing_module.closeForm()"><i class="fa fa-times"></i></div>' +
                              '<div class="wishing__form__card">' +
                                  '<div class="wishing__form__title">' +
                                  '</div>' +
                                  '<div class="wishing__form__content">' +
                                      '<div class="wishing__form__content__row">' +
                                          '<h5>' +
                                              '我想學' +
                                              '<i class="required__text">*</i>' +
                                          '</h5>' +
                                          '<div class="wishing__form__content__row__content">' +
                                              '<input id="wishingWant" class="wishing__form__content__input" placeholder="例如：寵物攝影、商業攝影、人像攝影...etc" maxlength="255"' +
                                              'required minlength="1">' +
                                              '<div class="wishing__form__content__input__border__bottom"></div>' +
                                          "</div>" +
                                      '</div>' +
                                      '<div class="wishing__form__content__row">' +
                                          '<h5>' +
                                              '目標' +
                                              '<i class="required__text">*</i>' +
                                          '</h5>' +
                                          '<div class="wishing__form__content__row__content">' +
                                              '<input id="wishingGoal" class="wishing__form__content__input" placeholder="例如：在戶外捕捉寵物動態、單人完成一份專案...etc" maxlength="255"' +
                                              'required minlength="1">' +
                                              '<div class="wishing__form__content__input__border__bottom"></div>' +
                                          "</div>" +
                                      '</div>' +
                                      '<div class="wishing__form__content__row">' +
                                          '<h5>' +
                                              '就像這樣' +
                                          '</h5>' +
                                          '<div class="wishing__form__content__row__content">' +
                                              '<textarea id="wishingLike" class="wishing__form__content__textarea" rows="3" placeholder="例如：XXX講師、XXX部落客、XXX的作品、網址...etc" maxlength="255"></textarea>' +
                                          "</div>" +
                                          '<div class="wishing__form__content__row__content">' +
                                              '<div class="wishing__form__content__media">' +
                                                  '<div class="wishing__form__content__media__buttons">' +
                                                      '<label id="" class="btn btn-success wishing__form__content__media__button">' +
                                                          '<i class="fas fa-image" aria-hidden="true"></i>' +
                                                          '上傳圖片' +
                                                          '<input type="file" style="display: none;" multiple="multiple" accept="image/*" id="cover" name="cover[]">' +
                                                      '</label>' +
                                                  '</div>' +
                                                  '<div id="media_preview" class="wishing__form__content__media__preview">' +
                                                  '</div>' +
                                              '</div>' +
                                          "</div>" +
                                      '</div>' +
                                      '<div class="wishing__form__content__row">' +
                                          '<h5>' +
                                              '類別 (最多選三個)' +
                                              '<i class="required__text">*</i>' +
                                          '</h5>' +
                                          '<ul class="flex-row wishing__form__content__category">';

        $.each(categorys, (key, value) =>
        {
            wishingForm +=                    '<li>' +
                                                  '<div class="wishing__form__content__category__option" onclick="checkbox_module.selectCheckbox(this, ' + key + ')">' +
                                                      '<i class="fa fa-check">' +
                                                      '</i>' +
                                                      '<span>' + value +
                                                      '</span>' +
                                                  '</div>' +
                                              '</li>';
        })

        wishingForm +=                    '</ul>' +
                                      '</div>' +
                                  '</div>' +
                              '</div>' +
                              '<div class="wishing__form__buttons">' +
                                  '<div class="btn btn-muted wishing__form__button__cancel" onclick="wishing_module.closeForm()">' +
                                      '取消' +
                                  '</div>' +
                                  '<div class="btn btn-primary wishing__form__button__send" onclick="wishing_module.sendWishingForm(this);">' +
                                      '送出' +
                                  '</div>' +
                              '</div>' +
                          '</div>' +
                      '</div>';

        insert_target.append(wishingForm);

        //Preview Cover
        $('#cover').change(function(event)
        {
            if ($('#cover').val() != '')
            {
                let media_name_split = $('#cover').val().split('\\'),
                    media_name       = media_name_split[2];

                readImageURL(this, 'preview_media');
            }
        })

        initForm = true;
    }

    function readImageURL(input, path)
    {
        image = [];

        if (input.files && input.files[0])
        {
            if (input.files.length > 10)
            {
                $.confirm
                ({
                    title: '失敗',
                    content: '圖片上傳最多10張',
                    type: 'red',
                    buttons:
                    {
                        '關閉':
                        {
                            btnClass: 'btn-red',
                            action: function() {}
                        }
                    }
                })
                return false;
            }
            $('#media_preview').html('');

            for (i = 0; i < input.files.length; i++)
            {
                if (input.files[i].size > 10485760)
                {
                    $.confirm
                    ({
                        title: '失敗',
                        content: '圖片大小不可超過10MB',
                        type: 'red',
                        buttons:
                        {
                            '關閉':
                            {
                                btnClass: 'btn-red',
                                action: function() { }
                            }
                        }
                    })

                    return false;
                }
                else
                {
                    let reader = new FileReader();

                    reader.onload = function(e)
                    {
                        let insert_HTML = '';

                        insert_HTML = '<img id="preview_media" class="" src="' + e.target.result + '">';
                        img = e.target.result.slice(22)
                        image.push(img);
                        $('#media_preview').append(insert_HTML);
                    }

                    reader.readAsDataURL(input.files[i]);
                }
            }
        }
    }

    function setCategorys(c){
        categorys = c;
        categorys.push('其他');
    }

    return {
        createForm: function()
        {
            if (!initForm) { createForm(); }
            else { $('#wishingForm').show(); }
        },
        closeForm: function()
        {
            $('#wishingForm').hide();
        },

        setCategorys: setCategorys,

        sendWishingForm: function()
        {
            let send_data = [];

            want     = $('#wishingWant').val();
            goal     = $('#wishingGoal').val();
            like     = $('#wishingLike').val();
            category = checkbox_module.getSelectArray();

            category.forEach(function(elm){
                try{ gtag('event', 'wishing', { event_category: 'wishing category', event_action: 'wishing', event_label: elm});}catch(e){}
            });

            if (want.length > 255 || goal.length > 255 || like.length > 255)
            {
                $.dialog({
                    animation: 'scale',
                    backgroundDismiss: true,
                    closeAnimation: 'scale',
                    closeIcon: true,
                    content: '字數限制為255個字',
                    title: '錯誤',
                    type: 'red',
                })
                return;
            }

            $.ajax
            ({
                type: 'post',
                url: '/ajax/addWishesData',
                dataType: 'json',
                data:
                {
                    want: want,
                    goal: goal,
                    like: like,
                    category: category,
                    image: image
                },
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                    $.dialog
                    ({
                        title: '新增中',
                        content: '請稍候...',
                        draggable: false,
                        closeIcon: false,
                        theme: 'material'
                    })
                },
                success: function(message, status, xhr)
                {
                    $('.jconfirm-material').hide();

                    if (xhr.status == 200)
                    {
                        $.confirm
                        ({
                            title: '成功',
                            content: '新增願望成功',
                            type: 'green',
                            buttons:
                            {
                                '關閉':
                                {
                                    btnClass: 'btn-success',
                                    action: function() { location.reload(); }
                                }
                            }
                        })
                    }
                    else
                    {
                        $.confirm
                        ({
                            title: '失敗',
                            content: message,
                            type: 'red',
                            buttons:
                            {
                                '關閉':
                                {
                                    btnClass: 'btn-red',
                                    action: function() {}
                                }
                            }
                        })
                        return false;
                    }
                },
                error: function()
                {
                    $('.jconfirm-material').hide();
                    layout._request_relogin();
                }
            })
        }
    }
}
