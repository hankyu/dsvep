function qaModule()
{
    let qaData;

    function deleteQACard({t_token = null, token = null})
    {
        return new Promise((resolve, reject) =>
        {
            if (!t_token || !token) { reject('data loss') }

            resolve('success');

            $.ajax
            ({
                type: 'get',
                url: '/ajax/',
                dataType: 'json',
                data: send_data,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                },
                success: function(data)
                {
                },
                error: function(xhr, type)
                {
                },
                complete: function()
                {
                }
            });
        });
    }

    function createNewReplyCard(el, {token = null, t_token = null})
    {
        let insert_HTML = '';

        el = el || $('#qa_content');

        insert_HTML += `
            <div class="qa__new">
                <div class="qa__avatar--2">
                    <img src="${($('.header-avatar-img').attr('src') || '/img/personal/avatar/avatar-vistor.png')}">
                </div>
                <div class="qa__form">
                    <div id="qa_my_input" class="qa__form__input" contenteditable="true" data-text="你在想甚麼呢，${($('.personal-name').find('span')[0].innerText || '親愛的用戶')}？"></div>
                    <div id="qa_my_row" class="qa__form__row">
                        <hr>
                        <div class="qa__form__bar">
                            <div id="qa__form__bar__features" class="qa__form__bar__features">
                                <div class="qa__form__bar__features__photo">
                                    <label id="qa_img_lab" class="upload__media__label">
                                        <i class="fas fa-camera qa__features__btn"></i>
                                    </label>
                                    <input id="qa_img_input" class="upload__media__input" type="file" accept="image/*" multiple>
                                    </input>
                                </div>
                            </div>
                            <div class="qa__form__bar__send">
                                <i id="qa_send" class="fas fa-paper-plane qa__features__btn" aria-hidden="true" data-t_token="${(t_token || null)}" data-token="${(token || null)}"></i>
                            </div>
                        </div>
                        <div class="qa__form__upload">
                            <div id="uploading__text" class="media__upload__text" style="display: none;">檔案上傳中...
                                <div class="upload__progress">
                                    <div id="upload_progress_bar" class="upload__progress__bar"></div>
                                </div>
                            </div>
                            <div id="uploaded__text" class="media__upload__text" style="display: none;">檔案上傳完成</div>
                            <div id="uploadErr__text" class="media__upload__text" style="display: none;">檔案上傳失敗</div>
                        </div>
                    </div>
                </div>
            </div>`;

        el.after(insert_HTML);
        qaModule.initReplyCard();
    }

    function createNewQuestionCard(el)
    {
        let insert_HTML = '';

        el = el || $('#qa_content');

        insert_HTML += `
            <div class="qa__new">
                <div class="qa__avatar">
                    <img src="${($('.header-avatar-img').attr('src') || '/img/personal/avatar/avatar-vistor.png')}">
                </div>
                <div class="qa__form">
                    <div id="qa_my_input" class="qa__form__input" contenteditable="true" data-text="你在想甚麼呢，${($('#user-name').text() || '親愛的用戶')}？"></div>
                    <div id="qa_my_row" class="qa__form__row" style="display:none;">
                        <hr>
                        <div class="qa__form__bar">
                            <div id="qa__form__bar__features" class="qa__form__bar__features">
                                <div class="qa__form__bar__features__photo">
                                    <label id="qa_img_lab" class="upload__media__label">
                                        <i class="fas fa-camera qa__features__btn"></i>
                                    </label>
                                    <input id="qa_img_input" class="upload__media__input" type="file" accept="image/*" multiple>
                                    </input>
                                </div>
                            </div>
                            <div class="qa__form__bar__send">
                                <i id="qa_send" class="fas fa-paper-plane qa__features__btn" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="qa__form__upload">
                            <div id="uploading__text" class="media__upload__text" style="display: none;">檔案上傳中...
                                <div class="upload__progress">
                                    <div id="upload_progress_bar" class="upload__progress__bar"></div>
                                </div>
                            </div>
                            <div id="uploaded__text" class="media__upload__text" style="display: none;">檔案上傳完成</div>
                            <div id="uploadErr__text" class="media__upload__text" style="display: none;">檔案上傳失敗</div>
                        </div>
                    </div>
                </div>
            </div>`;

        el.append(insert_HTML);

        $('#qa_my_input').one('focus', () => $('#qa_my_row').show());
        qaModule.initReplyCard();
    }

    function createQACard(arr, el)
    {
        $.each(arr.reverse(), (key, res) =>
        {
            let insert_HTML = '';
            
            el = el || $('#qa_content');
            
            $.each(res, (key2, value) =>
            {
                let l_id = value.l_id;


                if (key2 == 0)
                {
                    insert_HTML += `
                        <div class="qa__lv__lv1">
                            <div class="qa__avatar">
                                <img src="/img/personal/avatar/${(value.avg_img || 'avatar-vistor.png')}">
                            </div>
                            <div class="qa__lv__form">
                                <div class="qa__form__navbar">
                                    <div class="qa__form__name">
                                        <div>${value.m_name}</div>
                                    </div>`;
                    if (value.self)
                    {
                        insert_HTML += `
                            <div class="dropdown">
                                <div class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span class="caret"></span>
                                </div>
                                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                    <li><a id="editQA" data-t_token="${(value.t_token || null)}" data-token="${(value.token || null)}">編輯</a></li>
                                    ` +
                                      // <li><a id="deleteQA">刪除此留言</a></li>
                                    `
                                </ul>
                            </div>`;
                    }

                    insert_HTML += `
                        </div>
                        <div class="qa__form__navbar">
                            <div class="qa__form__time">
                                ${l_data.teacher_data.m_id == value.m_id ? `<div class="qa__form__teacher">課堂講師</div>` : ``}
                                <div class="qa__form__update__time">
                                    ${value.updated_at.substring(0, 16)}
                                </div>
                            </div>
                        </div>`;

                    if (value.self)
                    {
                        insert_HTML += `
                            <div id="qa-input" class="qa__form__input">${clearHtmlModule.QaClearHTML(value.message)}</div>`;
                    }
                    else
                    {
                        insert_HTML += `
                            <div class="qa__form__input">${clearHtmlModule.QaClearHTML(value.message)}</div>`;
                    }
                }
                else
                {
                    insert_HTML += `
                        <div class="qa__lv__lv2">
                            <div class="qa__avatar--2">
                                <img src="/img/personal/avatar/${value.avg_img}">
                            </div>
                            <div class="qa__lv__form">
                                <div class="qa__form__navbar">
                                    <div class="qa__form__name">
                                        <div>${value.m_name}</div>
                                    </div>`;
                    if (value.self)
                    {
                        insert_HTML += `
                            <div class="dropdown">
                                <div class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span class="caret"></span>
                                </div>
                                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                    <li><a id="editQA" data-t_token="${value.t_token || null}" data-token="${value.token || null}">編輯</a></li>
                                    ` +
                                    // <li><a id="deleteQA">刪除此留言</a></li>
                                    `
                                </ul>
                            </div>`;
                    }

                    insert_HTML += `
                        </div>
                        <div class="qa__form__navbar">
                            <div class="qa__form__time">
                                ${l_data.teacher_data.m_id == value.m_id ? `<div class="qa__form__teacher">課堂講師</div>` : ``}
                                <div class="qa__form__update__time">
                                    ${value.updated_at.substring(0, 16)}
                                </div>
                            </div>
                        </div>`;

                    if (value.self)
                    {
                        insert_HTML += `
                            <div id="qa-input" class="qa__form__input">
                                ${clearHtmlModule.QaClearHTML(value.message)}
                            </div>`;
                    }
                    else
                    {
                        insert_HTML += `
                            <div class="qa__form__input">
                                ${clearHtmlModule.QaClearHTML(value.message)}
                            </div>`;
                    }

                    insert_HTML += `
                            </div>
                        </div>`;
                }
            });

            if ($('#login_account').val())
            {
                insert_HTML +=  '<hr>' +
                                '<div id="qa_reply" class="qa__lv__form">' +
                                    '<div class="qa__reply">' +
                                        '<i class="fas fa-reply"></i>' +
                                        '回覆' +
                                    '</div>' +
                                '</div>';
            }

            insert_HTML +=          '</div>' +
                                '</div>' +
                            '</div>';

            el.append(insert_HTML);

            let reply_el = $('#qa_reply');

            reply_el.one('click', (e) =>
            {
                let element_target = $(e.target),
                    qa_data;

                qa_data =
                {
                    token: res[0].token || null
                }
                createNewReplyCard(element_target, qa_data);
            })

            reply_el.removeAttr('id');

            while (true)
            {
                // Find Element
                // let deleteQA = $('#deleteQA'),
                let editQA   = $('#editQA'),
                    qa_input = $('#qa-input'),
                    t_token  = editQA.data('t_token'),
                    token    = editQA.data('token');

                // If Not Found Element, Break Loop
                if (editQA[0] == undefined) { break; }

                // Remove ID for Element
                // deleteQA.removeAttr('id');
                editQA.removeAttr('id');
                editQA.removeAttr('data-t_token');
                editQA.removeAttr('data-token');
                qa_input.removeAttr('id');

                // Set OnClick Event for Element
                editQA.on('click', (e) =>
                {
                    let cacel_QA,
                        edit_QA = $(e.target),
                        insert_HTML = '',
                        new_QA_form;

                    insert_HTML += `
                        <div id="new_QA_form" class="qa__form">
                            <div id="qa_my_input" class="qa__form__input" contenteditable="true" data-text="你在想甚麼呢？"></div>
                            <div id="qa_my_row" class="qa__form__row">
                                <hr>
                                <div class="qa__form__bar">
                                    <div id="qa__form__bar__features" class="qa__form__bar__features">
                                        <div class="qa__form__bar__features__photo">
                                            <label id="qa_img_lab" class="upload__media__label">
                                                <i class="fas fa-camera qa__features__btn"></i>
                                            </label>
                                            <input id="qa_img_input" class="upload__media__input" type="file" accept="image/*" multiple>
                                            </input>
                                        </div>
                                    </div>
                                    <div class="qa__form__bar__send">
                                        <i id="qa_edit_send" class="fas fa-paper-plane qa__features__btn" aria-hidden="true" data-t_token="${(t_token || null)}" data-token="${(token || null)}"></i>
                                    </div>
                                </div>
                                <div class="qa__form__upload">
                                    <div id="uploading__text" class="media__upload__text" style="display: none;">檔案上傳中...
                                        <div class="upload__progress">
                                            <div id="upload_progress_bar" class="upload__progress__bar"></div>
                                        </div>
                                    </div>
                                    <div id="uploaded__text" class="media__upload__text" style="display: none;">檔案上傳完成</div>
                                    <div id="uploadErr__text" class="media__upload__text" style="display: none;">檔案上傳失敗</div>
                                </div>
                            </div>
                        </div>
                        <div id="cacelQA" class="qa__cancel">
                            取消
                        </div>`;

                    qa_input.after(insert_HTML);
                    $('#qa_my_input').html(qa_input.html());

                    qaModule.initReplyCard();

                    cacel_QA    = $('#cacelQA');
                    new_QA_form = $('#new_QA_form');

                    // Set Only One Click Event For Cancel Button
                    cacel_QA.one('click', () =>
                    {
                        edit_QA.show();
                        qa_input.show();
                        cacel_QA.remove();
                        new_QA_form.remove();
                    });

                    cacel_QA.removeAttr('id');
                    new_QA_form.removeAttr('id');
                    qa_input.hide();
                    edit_QA.hide();
                });

                // deleteQA.on('click', () =>
                // {
                //     let send_data =
                //     {
                //         t_token: t_token,
                //         token: token
                //     };
                //
                //     deleteQACard(send_data).then(e =>
                //     {
                //         $.confirm
                //         ({
                //             title: '成功',
                //             content: '資料已刪除',
                //             buttons:
                //             {
                //                 '確定':
                //                 {
                //                     btnClass: 'btn-red',
                //                     action: function() { location.reload(); }
                //                 }
                //             }
                //         });
                //     }).catch(err =>
                //     {
                //         if (err == 'data loss')
                //         {
                //             $.confirm
                //             ({
                //                 title: '錯誤',
                //                 content: '資料遺漏<br />' +
                //                          '如有需要協助，請聯絡我們<br />' +
                //                          '信箱: <span style="color: red;">eason.yea@gmail.com</span><br />' +
                //                          '電話: <span style="color: red;">(02)2955-4564</span>',
                //                 buttons:
                //                 {
                //                     '確定':
                //                     {
                //                         btnClass: 'btn-red',
                //                         action: function() { location.reload(); }
                //                     }
                //                 }
                //             });
                //         }
                //         else
                //         {
                //             $.confirm
                //             ({
                //                 title: '錯誤',
                //                 content: '未知錯誤<br />' +
                //                          '如有需要協助，請聯絡我們<br />' +
                //                          '信箱: <span style="color: red;">eason.yea@gmail.com</span><br />' +
                //                          '電話: <span style="color: red;">(02)2955-4564</span>',
                //                 buttons:
                //                 {
                //                     '確定':
                //                     {
                //                         btnClass: 'btn-red',
                //                         action: function() { location.reload(); }
                //                     }
                //                 }
                //             });
                //         }
                //     });
                // })
            }
        })
    }

    function getQAResult()
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'get',
                url: '/ajax/getLessonShopResponse?_=' + new Date().getTime(),
                dataType: 'json',
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                },
                success: function(data)
                {
                    resolve(data);
                },
                error: function(xhr, type)
                {
                    reject(xhr)
                },
                complete: function()
                {
                }
            });
        });
    }

    function sendNewResponse(send_data)
    {
        try{ gtag('event', 'qa', { event_category: 'qa', event_action: send_data.area, event_label: 'New Response'});}catch(e){}
        
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'post',
                url: '/ajax/sendNewResponse',
                dataType: 'json',
                data: send_data,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                    $.dialog
                    ({
                        title: '發送回應中',
                        content: '請稍候...',
                        draggable: false,
                        closeIcon: false,
                        theme: 'material'
                    })
                },
                success: function(data)
                {
                    resolve(data);
                    notify(send_data);
                },
                error: function(xhr, type)
                {
                    reject(xhr)
                },
                complete: function()
                {
                    $('.jconfirm-material').hide();
                }
            });
        });
    }

    function sendEditResponse(send_data)
    {
        try{ gtag('event', 'qa', { event_category: 'qa', event_action: send_data.area, event_label: 'Edit Response'});}catch(e){}

        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'post',
                url: '/ajax/sendEditResponse',
                dataType: 'json',
                data: send_data,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                    $.dialog
                    ({
                        title: '發送回應中',
                        content: '請稍候...',
                        draggable: false,
                        closeIcon: false,
                        theme: 'material'
                    })
                },
                success: function(data)
                {
                    resolve(data);
                    notify(send_data, true);
                },
                error: function(xhr, type)
                {
                    reject(xhr)
                },
                complete: function()
                {
                    $('.jconfirm-material').hide();
                }
            })
        });
    }

    // notify by system message
    function notify(send_data, edit)
    {
        let
            notifyData,
            toArr = [],
            poster_m_id = memberData.getMemberId();

        /* If the post is response to a thread, notify all members of the thread */
        if(send_data.token)
        {
            // get thread all members m_id
            qaData.forEach(function(thread){
                if(thread[0].token == send_data.token)
                {
                    toArr = thread.map((x) => {
                        return x.m_id;
                    });
                }
            });
        }

        // If poster is Not the teacher of the lesson, notify the teacher.
        if(poster_m_id != l_data.teacher_data.m_id){ toArr.push(l_data.teacher_data.m_id); }

        // remove poster self
        toArr = toArr.filter(function(x){ return x != poster_m_id });

        // remove repeat m_id
        if(toArr.length > 1)
        {
            toArr = Array.from(new Set(toArr));
        }
        
        if(toArr.length > 0)
        {
            let isLesson = (send_data.area == 'shop');
            send_data.text = clearHtmlModule.QaNotificationClearHTML(send_data.text);
            notifyData = {
                toArr: toArr,
                content: '[' + $('#user-name').text() + '] 在 [' + l_data.l_name + '] 的' + (isLesson? '課程頁面' : '教室頁面') + (edit? '修改' : '') + '發言說：「' + (send_data.text.length > 15? send_data.text.substr(0,15) + '...' : send_data.text) + '」',
                href: isLesson? '/lesson/' + l_data.l_id + '#qa' : '/profile/lesson/classroom/' + l_data.l_id + '#qa'
            };
            systemMessage.sendSystemMessages(notifyData);
        }

    }

    return {
        initQA: function()
        {
            var $qaContent = $('#qa_content').html('');

            createNewQuestionCard();
            getQAResult().then(snap =>
            {
                qaData = snap;
                // Default Element's Id As qa_content
                createQACard(snap, $qaContent);
            });
        },
        initReplyCard: function()
        {

        },
        sendNewResponse: function(send_data)
        {
            return sendNewResponse(send_data);
        },
        sendEditResponse: function(send_data)
        {
            return sendEditResponse(send_data);
        }
    };
}

function systemMessageModule(customize)
{
    let
        settings,
        getAccount = false,
        defaultSettings = {
            mode: 0 // 1: qa
        },
        MessageData;

    /**
     * Batch get Accounts by ids.
     * @param [] arr Reciever member id Array
     * @returns Promise. resolve: Reciever member Account Array.
     */
    function id2Account(arr)
    {
        return promise = new Promise((resolve, reject) => {
            $.ajax
            ({
                type: 'get',
                url: '/ajax/getMemberData',
                dataType: 'json',
                data: {m_id: arr, key: ['account']},
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                beforeSend: function()
                {
                },
                success: function(data)
                {
                    resolve(data);
                },
                error: function(xhr, type)
                {
                    reject(xhr)
                },
                complete: function()
                {
                }
            });
        });
    }

    /**
     * Batch send system message to multiple reciever in toArr property.
     * @param {Object} messageData Object with message datas properties and toArr property (required) indicate message reciever's m_id.
     */
    function sendSystemMessages(messageData)
    {
        // need to trans m_id to account
        if(getAccount)
        {
            id2Account(messageData.toArr).then(arr => {
                messageData.toArr = [];
                arr.forEach(to => {
                    messageData.toArr.push(to.account);
                });

                // batch send message
                messageData.toArr.forEach(to => {
                    let
                        sendData;
    
                    switch(settings.mode)
                    {
                        case 1:
                            sendData = {
                                to: to,
                                content: messageData.content,
                                href: messageData.href
                            }
                            break;
                    }
                    firebaseController.sendInsiteSystemMessage(sendData);
                });
            },
            // 不處理通知的錯誤
            e => {});
        }
        else
        {
            messageData.toArr.forEach(to => {
                let
                    sendData;
                sendData.to = to;
                // set something message data else...
                firebaseController.sendInsiteSystemMessage(sendData);
            });
        }
    }
    
    (function init()
    {
        // settings customize
        settings        = $.extend(true, defaultSettings, customize);
        getAccount = settings.mode == 1;
    })();

    return {
        sendSystemMessages
    }
}