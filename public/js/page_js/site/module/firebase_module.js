/**
 * Firebase Module
 * @dependency alertify.min.js
 */
function firebaseModule()
{
    // Check Opreate Environment
    let
        host = document.location.host,
        pathPrefix = '';

        if(host.indexOf('test.ds-vep.com') >= 0)
        {
            pathPrefix = '/beta';
        }
        else if(host.indexOf('localhost') >= 0 || host.indexOf('127.0.0.1') >= 0)
        {
            pathPrefix = '/develop';
        }

    const
        PATH_MESSAGE = pathPrefix + '/message',
        PATH_AUDIT_LESSON = pathPrefix + '/audit/lesson',
        PATH_AUDIT_TEACHER = pathPrefix + '/audit/teacher',
        PATH_RECORD_LOGIN = pathPrefix + '/record/login';

    let pathname = document.location.pathname;


    /**
     * inintial firebase app
     *
     */
    function initFirebase()
    {
        //Check Opreate Environment
        let config =
            {
                apiKey: 'AIzaSyBxPOcNEqkCh1x2wz_SApbfq1rpw6Gmx4g',
                authDomain: 'dasha-173705.firebaseapp.com',
                databaseURL: 'https://dasha-173705.firebaseio.com',
                projectId: 'dasha-173705',
                storageBucket: 'dasha-173705.appspot.com',
                messagingSenderId: '749664310345'
            };
        firebase.initializeApp(config);
    }

    /**
     * get Firebase path
     *
     * @param {*} mode - 'message' only now.
     * @returns {String} Firebase path
     */
    function getPath(mode)
    {
        switch(mode)
        {
            case 'message':
                return PATH_MESSAGE;
                break;
        }
    }

    /**
     * Firebase database ref path
     *
     * @param {String} path
     * @returns {Promise}
     */
    function getRef(path)
    {
        return firebase.database().ref(path)
    }
    
    /**
     * Firebase database ref path, and then push data.
     *
     * @param {String} path
     * @param {Object} data
     * @returns {Promise}
     */
    function push(path, data)
    {
        return getRef(path).push(data);
    }
    
    /**
     * Firebase database ref path, and then update data.
     *
     * @param {String} path
     * @param {Object} data
     * @returns {Promise}
     */
    function update(path, data)
    {
        return getRef(path).update(data);
    }

    /**
     * Firebase database ref path, and then remove data.
     *
     * @param {String} path
     * @returns {Promise}
     */
    function remove(path)
    {
        return getRef(path).remove();
    }

    /**
     * Get Time String of Now.
     *
     * @returns {String} time string, YYYY/MM/DD hh:mm:ss
     * @returns {Promise}
     */
    function getNowTimeString()
    {
        let nowTime = new Date()
        return nowTime.getFullYear() + '/' + (nowTime.getMonth() + 1) + '/' + nowTime.getDate() + ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds();
    }

    /**
     * record login times to firebase.
     *
     * @param {String} acc
     * @returns {Promise}
     */
    function loginRecord(acc)
    {
        return push(PATH_RECORD_LOGIN, { account: acc, time: getNowTimeString() });
    }


    /* --------------- */
    /*                 */
    /*     Message     */
    /*                 */
    /* --------------- */
    /**
     * Send In-sit Message.
     *
     * @param {Object} data - propertys: from, to, content, href(optional)
     * @returns {Promise}
     */
    function sendInsiteMessage(data)
    {
        let
            from =  data.from,
            to = data.to,
            dialog = from > to ? from + ',' + to : to + ',' + from,
            path = PATH_MESSAGE + '/' + dialog;

        data.time = getNowTimeString();
        data.read = 'unread';
        return push(path, data);
    }

    /**
     * Send In-sit system Message.
     *
     * @param {Object} data - propertys: to, content, href(optional)
     * @returns {Promise}
     */
    function sendInsiteSystemMessage(data)
    {
        data.from = '系統';
        return sendInsiteMessage(data);
    }

    /**
     * Get Real-time Message
     *
     * @param {String} acc - login account
     * @param {*} thisEntity - point to variable: layout
     * @returns {Promise}
     */
    function getRealTimeMessage(acc, thisEntity)
    {
        return getRef(PATH_MESSAGE).on('value', (snapshot) =>
        {
            let
                allDialog = [];
                data = snapshot.val();
            $.each(data, function(dialog, dialogToken)
            {
                var memberExist = dialog.split(',').indexOf(acc);
                if (memberExist != -1)
                {
                    let currDialog;

                    allDialog.push([]);
                    currDialog = allDialog[allDialog.length - 1];

                    $.each(dialogToken, function(key, value)
                    {
                        currDialog.push(value);
                    });
                }
            });

            let unread = 0;
            for (let i = 0, j= allDialog.length; i < j; i++)
            {
                let message = allDialog[i][allDialog[i].length - 1];
                unread = (message['to'] == acc) ? (message['read'] == 'unread' ? unread + 1 : unread) : unread;
            }

            if (unread)
            {
                let popupJqElment = $('.popup');
                
                function getNoticeTemplate(num)
                {
                    return '<span>有 ' + num + ' 個新通知！</span>';
                }
                
                if (popupJqElment.length == 0)
                {
                    var message =
                    '<div class="popup" onclick="_targer()">' + getNoticeTemplate(unread) + '</div>';
                    var log = alertify.log(message, '', 0);
                }
                else
                {
                    if (unread != this._unread)
                    {
                        popupJqElment.html(getNoticeTemplate(unread));
                    }
                }
            }
            thisEntity._unread = unread;
        });
    }


    /* --------------- */
    /*                 */
    /*     Teacher     */
    /*                 */
    /* --------------- */
    /**
     * Add data to firebase when apply to be a teacher.
     *
     * @param {*} acc - Account of teacher applyer.
     * @returns {Promise}
     */
    function applyTeacher(acc)
    {
        var postData =
        {
          account: acc,
          time: (new Date()).getTime(),
          review_situation: 'no audit',
        }
        return push(PATH_AUDIT_TEACHER, postData);
    }

    /**
     * Add data to firebase when want to modify data of apply teacher.
     *
     * @param {*} acc
     * @returns {Promise}
     */
    function modifyApplyTeacher(acc)
    {
        let ref = getRef(PATH_AUDIT_TEACHER).orderByChild('account').equalTo(acc);
        return ref.once('value').then((snapshot) =>
        {
            if(snapshot.exists())
            {   
                snapshot.forEach((childSnapshot) =>
                {
                    let path = PATH_AUDIT_TEACHER + '/' + childSnapshot.key;
                    remove(path);
                });
            }
        });
    }

    /**
     * Get Audit Teacher Data Num To Show Notice
     * 
     * @dependency alertify.min.js
     * @returns {Promise}
     */
    function getTeacherApplySumNotice()
    {
        if (pathname != '/admin/audit/teacher/overview')
        {
            let ref = getRef(PATH_AUDIT_TEACHER).orderByChild('review_situation').equalTo('no audit');

            return ref.once('value').then(function(snap)
            {
                let numTeacher = snap.numChildren();

                if (numTeacher)
                {
                    let message =
                        '<div class="admin-popup" onclick="_change_targer(`teacher`)">' +
                        '<span>有 ' + numTeacher + ' 個人申請講師中</span>' +
                        '</div>';
                    alertify.log(message, '', 0);
                }
            });
        }
        else{
            return new Promise((resolve, reject) => {});
        }
    }

    /**
     * Firebase data process when audit teacher.
     *
     * @param {String} acc - account of teacher applyer.
     * @param {Boolean} success - True for teacher audit success , false for fail.
     * @param {String} reason - reason of audit.
     * @returns {Boolean} True for find data in firebase , false for not.
     */
    function auditTeacher(acc, reason, success)
    {
        // Send Message
        let postData =
        {
            to: acc,
            content: success? `因「${reason}」，審核講師完成, 請至成為講師頁面確認。` : `因「${reason}」，審核講師失敗, 請至成為講師頁面確認。`
        };
        sendInsiteSystemMessage(postData);

        let ref = getRef(PATH_AUDIT_TEACHER).orderByChild('account').equalTo(acc);
        return ref.once('value').then((snapshot) =>
        {
            if(snapshot.exists())
            {   
                snapshot.forEach((childSnapshot) =>
                {
                    let path = PATH_AUDIT_TEACHER + '/' + childSnapshot.key;
                    remove(path);
                });
            }
        });
    }


    /* -------------- */
    /*                */
    /*     Lesson     */
    /*                */
    /* -------------- */
    /**
     * Process firebase data when create lesson.
     *
     * @param {Object} data - {account, lesson_id, time}
     */
    function createLesson(data)
    {
        data.lesson_id = data.lesson_id * 1
        data.review_situation = 'no audit';
        return push(PATH_AUDIT_LESSON, data);
    }

    /**
     * process firebase when lesson  apply audit.
     *
     * @param {String} acc
     * @param {Number} l_id
     */
    function lessonApplyAudit(acc, l_id)
    {
        l_id = l_id * 1;
        let ref = getRef(PATH_AUDIT_LESSON).orderByChild('lesson_id').equalTo(l_id);

        return ref.once('value').then(function(snapshot)
        {

            let count = 0;
            snapshot.forEach(childSnapshot =>
            {
                count ++;
                getRef(PATH_AUDIT_LESSON + '/' + childSnapshot.key).update({ review_situation: 'auditing' });
            })
            if(!count)
            {
                let pushData =
                {
                    account: acc,
                    lesson_id: l_id,
                    review_situation: 'auditing',
                    time: 0
                };
                getRef(PATH_AUDIT_LESSON).push(pushData);
            }
        });
    }

    function cancelLessonAudit(l_id)
    {
        let ref = getRef(PATH_AUDIT_LESSON).orderByChild('lesson_id').equalTo(l_id * 1);

        return ref.once('value').then(snapshot =>
        {
            snapshot.forEach(childSnapshot =>
            {
                getRef(PATH_AUDIT_LESSON + '/' + childSnapshot.key).update({ review_situation: 'no audit' });
            })
        })
    }

    /**
     * Get Audit Lesson Data Num To Show Notice
     *
     * @dependency alertify.min.js
     */
    function getLessonApplySumNotice()
    {

        if (pathname != '/admin/audit/lesson/overview')
        {
            let ref = getRef(PATH_AUDIT_LESSON).orderByChild('review_situation').equalTo('auditing');

            return ref.once('value').then(snapshot =>
            {
                let numLesson = snapshot.numChildren();

                if (numLesson)
                {
                    var message =
                        '<div class="admin-popup" onclick="_change_targer(`lesson`)">' +
                        '<span>有 ' + numLesson + ' 個課程申請中</span>' +
                        '</div>';
                    var log = alertify.log(message, '', 0);
                }
            })
        }
        else{
            return new Promise((resolve, reject) => {});
        }
    }

    /**
     * Firebase data process when audit lessons.
     *
     * @param {Number} l_id - id of the lesson.
     * @param {Boolean} success - True for audit success, false for fail.
     * @param {String} reason - The Reason of audit success or fail.
     * @returns {Boolean} - True for firebase data process success , false for fail.
     */
    function auditLesson(l_id, success, reason)
    {
        let ref = getRef(PATH_AUDIT_LESSON).orderByChild('lesson_id').equalTo(l_id * 1);

        return ref.once('value').then((snapshot) =>
        {   
            let
                acc,
                postData;

            snapshot.forEach(childSnapshot =>
            {
                // for Send Message
                if(!acc)
                {
                    acc = childSnapshot.child('account').val();
                }

                let path = PATH_AUDIT_LESSON + '/' + childSnapshot.key;
                if(success)
                {
                    remove(path);
                }
                else
                {
                    updateData = { review_situation: 'fail' };
                    update(path, updateData);
                }
            });

            // Send Message
            if(acc)
            {
                postData=
                {
                    to: acc,
                    content: success? '課程因「' + reason + '」之考量，已審核通過。請至課程頁面確認。' : '課程因「' + reason + '」之考量，未能審核通過，請至課程頁面確認。'
                };
                sendInsiteSystemMessage(postData);
            }
        });
    }

    return {
        initFirebase,
        getPath,
        push,
        loginRecord,
        sendInsiteMessage,
        sendInsiteSystemMessage,
        getRealTimeMessage,
        applyTeacher,
        modifyApplyTeacher,
        getTeacherApplySumNotice,
        auditTeacher,
        createLesson,
        lessonApplyAudit,
        cancelLessonAudit,
        getLessonApplySumNotice,
        auditLesson
    }
}