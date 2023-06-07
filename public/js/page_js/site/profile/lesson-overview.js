var lesson_overview = (function() {
    var _const
    _const = function() {
        this._construct()
    }
    _const.prototype = {
        _construct: function() {
            //Menu button
            this._btn_all = $('#all')
            this._btn_entity = $('#entity')
            this._btn_online = $('#online')

            //Overview Lesson Card item
            this._entity = $('.entity')
            this._online = $('.online')
            this._expired = $('#expired')
            this._data_not_found = $('#data_not_found')
            this._start()
        },
        _start: function() {
            var objThis = this
            objThis._initialAll()
        },
        _initialAll: function() {
            if (this._expired.val() != '') {
                $.alert(this._expired.val(), '錯誤')
            }

            this._btn_all.on(
                'click',
                $.proxy(function() {
                    this._data_not_found.hide(500)
                    $('.lesson-overview-crad:hidden')
                        .removeClass('remove')
                        .show(500)
                    $('.lesson-overview-menu-item.active').removeClass('active')
                    this._btn_all.addClass('active')
                }, this)
            )

            this._btn_entity.on(
                'click',
                $.proxy(function() {
                    if (this._entity.length == 0) {
                        this._data_not_found.show(500)
                    } else {
                        this._entity.removeClass('remove').show(500)
                        this._data_not_found.hide(500)
                    }

                    this._online
                        .addClass('remove')
                        .delay(300)
                        .hide(200)
                    $('.lesson-overview-menu-item.active').removeClass('active')
                    this._btn_entity.addClass('active')
                }, this)
            )

            this._btn_online.on(
                'click',
                $.proxy(function() {
                    if (this._online.length == 0) {
                        this._data_not_found.show(500)
                    } else {
                        this._online.removeClass('remove').show(500)
                        this._data_not_found.hide(500)
                    }

                    this._entity
                        .addClass('remove')
                        .delay(300)
                        .hide(200)
                    $('.lesson-overview-menu-item.active').removeClass('active')
                    this._btn_online.addClass('active')
                }, this)
            )
        }
    }
    return _const
})()

var lesson_overview
$(function() {
    lesson_overview = new lesson_overview()
})

function enter_classroom(id) {
    $.ajax({
        url: '/ajax/checkLessonHasRestrict',
        type: 'post',
        data: {
            id: id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success(data) {
            if (data.status == 'pass') {
                location.href = '/#/profile/lesson/classroom/' + id
            } else if (data.status == 'expired') {
                $.alert('觀看期限已到，請重新購買<br>觀看期限：' + data.deadline, '錯誤')
            } else if (data.status == 'request') {
                $.confirm({
                    title: '重要提醒',
                    content:
                        '你確定要進入 <span class="color-emphasized2">' +
                        data.name +
                        '</span> 的課程教室？<br>' +
                        '一旦進入教室以後將無法申請退費該課程，詳細資訊請查看<a href="/contact/terms#refund">退費規定</a>',
                    buttons: {
                        ok: {
                            text: '確定進入',
                            btnClass: 'btn-success',
                            action: function() {
                                $.ajax({
                                    url: '/ajax/restrictLessonUnableRefund',
                                    type: 'post',
                                    dataType: 'json',
                                    async: false,
                                    data: {
                                        l_id: id
                                    },
                                    headers: {
                                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                    },
                                    success(data) {
                                        if (data == 'success') {
                                            location.href = '/#/profile/lesson/classroom/' + id
                                        } else {
                                            $.alert(data, '錯誤')
                                        }
                                    },
                                    error() {
                                        layout._request_relogin()
                                    }
                                })
                            }
                        },
                        exit: {
                            text: '稍後再上課',
                            btnClass: 'btn-red',
                            action: function() {}
                        }
                    }
                })
            } else {
                $.alert(data, '錯誤')
            }
        },
        error() {
            layout._request_relogin()
        }
    })
}
