/* --------------------------------- */
/* dependancy:                       */
/* rollcall_table_module.js          */
/* RollingLoadingModule Function     */
/* running_number_module.js (option) */
/* --------------------------------- */
function rollcallReportModule(customize)
{
    let
        defaultSettings = {
            teacherListContainer: '#tbTeacherList',
            container: '#presenceCardsContainer',
            
            runningNumberController: null,
            rollcallTable: null,
        },
        settings,
        mode,   // 0: Student Scope, 1: Teacher Scope, 2: Worker Scope 3: Admin Scope
        m_id,
        t_id,
        lessons,
        lessonsLength,
        teachers,
        gotPresenceNum = 0,
        rollingLoadingController,
        precision = 1,
        $btnCheckAll,
        $container,
        $row,
        $btnCheckAllTeacherRate;

        const ROLLCALL_SYSTEM_ACTIVETIME = (new Date(2019, 4, 10).setHours(0, 0, 0, 0));

    

    function getStudentLessons()
    {
        gotPresenceNum = 0;
        m_id = memberData.getMemberId();
        return new Promise((resolve, reject) => {
            
            $.ajax({
                type: 'post',
                url: '/ajax/getRollcallMemberPossessLessonList',
                dataType: 'json',
                data:
                {
                    m_id: m_id
                },
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(data)
                {
                    resolve(data);
                },
                error: function(e)
                {
                    reject(e);
                }
            }); 
        });
    }

    function getTeacherLessons(tId, admMode)
    {
        if(mode == 1){
            t_id = teacherData.getId();
        }else{
            t_id = tId;
        }
        if(!admMode){ gotPresenceNum = 0; }

        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'post',
                url: '/ajax/getRollcallTeacherLessonList',
                dataType: 'json',
                data:
                {
                    t_id: t_id
                },
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(data)
                {
                    data.sort(function(a, b)
                    {
                        if((new Date(a.start_time.replace('-', '/'))).getTime() > (new Date(b.start_time.replace('-', '/'))).getTime())
                        {
                            return -1;
                        }
                        else if((new Date(a.start_time.replace('-', '/'))).getTime() < (new Date(b.start_time.replace('-', '/'))).getTime())
                        {
                            return 1;
                        }
                        else
                        {
                            return 0;
                        }

                    })
                    resolve(data);
                },
                error: function(e)
                {
                    reject(e);
                }
            });

            
        });
    }

    function getTeachers()
    {
        return new Promise((resolve, reject) => {
            
            $.ajax({
                type: 'post',
                url: '/ajax/getRollcallNeedTeacherList',
                dataType: 'json',
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(data)
                {
                    resolve(data);
                },
                error: function(e)
                {
                    reject(e);
                }
            });   
        });
    }

    function getLessonClassmate(l_id)
    {
        return new Promise((resolve, reject) => {
            
            $.ajax({
                type: 'post',
                url: '/ajax/getLessonClassmate',
                dataType: 'json',
                data:
                {
                    l_id: l_id
                },
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(data)
                {
                    resolve(data);
                },
                error: function(e)
                {
                    reject(e);
                }
            });
        });
    }

    /* -------------------------------------------------- */
    /*     Draw Teacher List for Worker & Admin Scope     */
    /* -------------------------------------------------- */
    function drawTeacherList()
    {
        let
            $teacherListContainer,
            $tb,
            $thead,
            $tbody,
            $tr;

        $teacherListContainer = $(settings.teacherListContainer);
        $teacherListContainer.html('');
        $tb = $('<table>', {class: 'tbTeacherList'}).appendTo($teacherListContainer);
        $thead = $('<thead>').appendTo($tb);
        $tr = $('<tr>').appendTo($thead);
        $tr.append($('<th>', {text: '名稱'}));
        $tr.append($('<th>', {text: '暱稱'}));

        if(mode == 3)
        {
            $tr.append($('<th>', {text: '應出席人次'}));
            $tr.append($('<th>', {text: '出席人次'}));
            $tr.append($('<th>', {text: '出席率'}));
        }
        $tr.append($('<th>', {text: '查看'}));

        teachers.forEach(t =>
        {
            let
                $td,
                $btnCheck;

            $tr = $('<tr>').appendTo($thead);
            $tr.append($('<td>', {text: t.nickname}));
            $tr.append($('<td>', {text: t.m_name}));
            if(mode == 3)
            {
                $tr.append($('<td>', {id: 'tdRollcallTimes' + t.t_id, text: t.presenceRate}));
                $tr.append($('<td>', {id: 'tdPresenceTimes' + t.t_id, text: t.presenceRate}));
                $tr.append($('<td>', {id: 'tdPresenceRate' + t.t_id, text: t.presenceRate}));
            }
            $td = $('<td>');
            $btnCheck = $('<button>', {type: 'button', text: '查看', class: 'btn btn-info'})
            .on('click',function(){
                let t_id = t.t_id;
                showTeacherLessons(t_id);
            })
            .appendTo($td);
            $tr.append($td);
        });
    }

    /* ---------------- */
    /*    Draw Cards    */
    /* ---------------- */
    function drawCardsList(){
        $row.html('');

        if(lessons.length)
        {
            lessons.forEach((lesson, idx) => {
                createSingleCard(lesson, idx);
            });

            if(mode != 2)
            {
                if(!$btnCheckAll)
                {
                    $btnCheckAll = $('<button>',{type: 'button', class: 'btn btn-success', id: 'btnCheckAll', text: '查詢全部'}).on('click',function(){
                        checkAllPresence();
                    });
                    $('#funcBar').append($btnCheckAll);
                }
                else
                {
                    $btnCheckAll.show();
                }
            }
        }
        else
        {
            switchCheckAllBtn(false);
            $row.append($('<div>', {text: '尚無任何有點名資料的課程', class: 'col col-xs-12 presenceCard__noData'}));
        }
    }

    function createSingleCard(l, i){
        let 
            $col,
            $card,
            $presenceRate,
            $btn,
            teacher = `${l.nickname} (${l.m_name})`,
            $presenceCard__card__time,
            href;

        $col = $('<div>', {class: 'col-sm-6 col-md-4'}).appendTo($row);
        $card = $('<div>', {class: 'presenceCard__card'}).appendTo($col);
        href = mode == 2? '/profile/lesson/classroom/' + l.l_id + '#rollcall' : '/#/lesson/'+ l.l_id;
        $card.append($('<a class="aLessonName" href="' + href + '" target="_blank"><h2 class="presenceCard__card__lessonName" title="' +l.l_name+ '">'+ l.l_name +'</h2></a>'));
        $card.append($('<div>', {class: 'presenceCard__card__lessonId', text: l.l_id}));
        
        if(mode == 0)
        {
            $card.append($('<div>', {class: 'presenceCard__card__teacher', text: teacher, title: teacher}));
        }

        $presenceCard__card__time = $('<div>', {class: 'presenceCard__card__time', text: l.start_time}).appendTo($card);
        $presenceCard__card__time.append(' ');
        $presenceCard__card__time.append($('<i class="fas fa-map-marker-alt">'));
        $presenceCard__card__time.append(' ' + l.location.substr(0,3));

        /*---- Not for Worker ----*/
        if(mode != 2)
        {
            $presenceRate = $('<div>', {class: 'presenceCard__card__presenceRate'}).appendTo($card);
            $btn = $('<button>', {type: 'button',class: 'btn btn-info presenceCard__card__btnCheck'}).on('click', function(){
                let idx = i;
                $(this).hide();
                checkPresence(l.l_id, idx);
            });
            $btn.append($('<i>', {class: 'fas fa-chart-pie'})).append(' 查詢');
            $presenceRate.append($btn);
            $card.append($('<div>', {class: 'detailBtnBar'}));
        }
    }


    /* --------------------- */
    /*    Check Presences    */
    /* --------------------- */
    async function checkPresence(l_id, i)
    {
        let
            idx = i,
            $presenceRateContainer = $('.presenceCard__card__presenceRate').eq(idx);

        rollingLoadingController.draw($presenceRateContainer);
        try
        {
            lessons[idx].presenceData = await getRollcallData(l_id);
            if(mode != 0)
            {
                lessons[idx].classmates = await getLessonClassmate(l_id);
            }
        }
        catch(e)
        {
            rollingLoadingController.remove($('.presenceCard__card__presenceRate').eq(idx));
            $('.presenceCard__card__btnCheck').eq(idx).show();
        }
        gotPresenceNum++;
        drawPresenceChart(idx);

        // all lesson checked.
        if(gotPresenceNum == lessonsLength)
        {
            switchCheckAllBtn(false);
            getAveragePresence();
        }
    }

    function checkAllPresence()
    {
        let $btnCheck = $('.presenceCard__card__btnCheck');

        switchCheckAllBtn(false);
        $btnCheck.hide();
        
        lessons.forEach(async function(lesson, idx){
            let i = idx;
            if(!lesson.presenceData)
            {
                checkPresence(lesson.l_id, idx);
            }
        })
    }

    function getRollcallData(l_id)
    {
        return new Promise((resolve, reject) => {
            let postData = {l_id: l_id};
            if(m_id){ postData.m_id = m_id; }
            $.ajax({
                type: 'post',
                url: '/ajax/getRollcallList',
                dataType: 'json',
                data: postData,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(data)
                {
                    let ajaxPresencesData = {
                        rollcalls: data.unit_data.map((elm) =>
                        {
                            elm.status = 'true'
                            return elm;
                        })
                    };
                    ajaxPresencesData.rollCallDates = [];
                    data.unit_time.forEach((v, k) =>
                    {
                        ajaxPresencesData.rollCallDates.push({u_id: k + 1, start_time: v});
                    });
                    

                    resolve(ajaxPresencesData);
                },
                error: function(e)
                {
                    reject(e);
                }
            });
        });
    }
    
    // yyyy-MM-dd or yyyy-MM-dd hh:mm:ss to 2324732472374
    function timeString2Timestamp(ts){
        let
            matchArr,
            timeString,
            dateInfo;

        // if yyyy-MM-dd hh:mm:ss
        if(matchArr = ts.match(/\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}\:\d{2}/))
        {
            let dateTimeInfo;

            timeString = matchArr[0];
            dateInfo = timeString.split(/[\-\s\:]/);
            return (new Date(dateInfo[0], dateInfo[1] - 1, dateInfo[2], dateInfo[3], dateInfo[4], dateInfo[5])).getTime();
        }

        // if yyyy-MM-dd
        else if(matchArr = ts.match(/\d{4}\-\d{2}\-\d{2}/))
        {
            timeString = matchArr[0];
            dateInfo = timeString.split(/[\-\/]/);
            return (new Date(dateInfo[0], dateInfo[1] - 1, dateInfo[2])).getTime();
        }
    }
    
    /* ----------------------------------- */
    /*     Get Effective Rollcall Data     */
    /* ----------------------------------- */
    function getKeypointUnitId(rcDatesArr)
    {
        let 
            now = (new Date()).getTime(),
            returnObj = {activeUid: null, passedUid: null};

        rcDatesArr.forEach(rcd =>
        {
            dateStamp = timeString2Timestamp(rcd.start_time);
            if(!returnObj.activeUid && dateStamp >= ROLLCALL_SYSTEM_ACTIVETIME)
            {
                returnObj.activeUid = rcd.u_id;
            }
            if(returnObj.passedUid == null && dateStamp > now )
            {
                returnObj.passedUid = rcd.u_id - 1;
            }
        });

        // some unit are before rollcall active day, some not.
        if(returnObj.activeUid && returnObj.passedUid == null){
            returnObj.passedUid = rcDatesArr[rcDatesArr.length - 1].u_id;
        }
        return returnObj;
    }

    /* -------------------------------------- */
    /*     show presence rate of a lesson     */
    /* -------------------------------------- */
    function drawPresenceChart(idx)
    {
        let
            now  = (new Date()).getTime(),
            today = (new Date()).setHours(0, 0, 0, 0),
            effectiveMaxUnitId = 0,
            effectiveMinUnitId = 0,
            keypointUids,
            rollCallDatesL,
            $presenceRateContainer = $('.presenceCard__card__presenceRate').eq(idx),
            $detailBtnBar = $('.detailBtnBar').eq(idx),
            currPresenceData = lessons[idx].presenceData,
            rollCallTimes,
            presenceTimes,
            $btn;

        keypointUids = getKeypointUnitId(currPresenceData.rollCallDates);

        // all unit or some unit are after rollcall system active day.
        if(keypointUids.activeUid)
        {
            rollCallDatesL = keypointUids.passedUid - keypointUids.activeUid + 1;
            rollCallTimes = (mode == 0)? rollCallDatesL : (rollCallDatesL * lessons[idx].classmates.length);

            presenceTimes = currPresenceData.rollcalls.filter(rc =>
            {
                if(rc.u_id > keypointUids.passedUid )
                {
                    rollCallTimes ++;
                }
                return (rc.status && rc.u_id >= keypointUids.activeUid);
            }).length;
        }

        // all units are before rollcall active day and passed.
        else
        {
           rollCallDatesL = rollCallTimes = presenceTimes = 0;
        }

        // remove check btn
        $presenceRateContainer.find('.presenceCard__card__btnCheck').remove();
        rollingLoadingController.remove($presenceRateContainer);

        if(rollCallTimes == 0){
            let lessonLabel;
            
            if(rollCallDatesL == 0)
            {
                lessonLabel = (timeString2Timestamp(currPresenceData.rollCallDates[0].start_time) >= now)? '尚未開課' : '無有效資料';
            }
            lessons[idx].presenceTimes = 0;
            lessons[idx].rollCallTimes = 0;
            $presenceRateContainer.append($('<span>',{class: 'noData', text: (rollCallDatesL == 0? lessonLabel : '尚無學員')}));
        }
        else
        {
            lessons[idx].presenceTimes = presenceTimes;
            lessons[idx].rollCallTimes = rollCallTimes;
    
            if(settings.runningNumberController)
            {
                settings.runningNumberController.runNumber($presenceRateContainer,presenceTimes / rollCallTimes * 100, 1, (num, $target, precision) => {
                    let 
                        numArr;
                    numArr = num.toFixed(precision).toString().split('.');
    
                    $target.html('');
                    $target.append($('<p>', {class:'pPresenceRate', text: '出席率'}))
                    $target.append($('<span>', {class: 'spnInt', text: numArr[0]}));
                    $target.append($('<span>', {class: 'spnDeci', text: '.' + numArr[1]}));
                    $target.append($('<span>', {class: 'spnPercent', text: '%'}));
                });
            }
            else
            {
                $presenceRateContainer.text((presenceTimes / rollCallTimes * 100).toFixed(precision)).append($('<span>',{class: 'spnPercent', text: '%'}));
            }
    
            // show detail btn
            $btn = $('<button>', {class: 'btnPresenceData'})
            .on('click',function(){
                showDetail(idx);
            }).appendTo($detailBtnBar);
            if(mode == 0){
                $btn.html(`應出席 ${rollCallTimes} 次<br>實際出席 ${presenceTimes} 次`);
            }
            else
            {
                $btn.html(`應出席 ${rollCallTimes} 人次<br>實際出席 ${presenceTimes} 人次`);
            }
        }
    }

    /* ----------------------------- */
    /*     Average Presence Rate     */
    /* ----------------------------- */
    function getAveragePresence()
    {
        let
            allRollCallTimes = 0,
            allPresenceTimes = 0,
            averagePresenceRate,
            currTeacher;

        // Adm Scope
        if(mode == 3)
        {
            currTeacher = (teachers.find(t => { return (t.t_id == t_id); }));
        }

        lessons.forEach(lesson => {
            allRollCallTimes += lesson.rollCallTimes;
            allPresenceTimes += lesson.presenceTimes;
        });

        if(!allRollCallTimes)
        {
            // Adm Scope
            if(mode == 3)
            {
                currTeacher.presenceRate = 0;
                showRateInTable(t_id, 0, 0, 0);
            }
            return;
        }

        averagePresenceRate = (allPresenceTimes / allRollCallTimes * 100).toFixed(precision);
        $('#totalRollCall').text(allRollCallTimes);
        $('#totalPresence').text(allPresenceTimes);
        $('#rollCallRate').text(averagePresenceRate + '%');
        $('#averageBlock').addClass('unfold');

        // Adm Scope
        if(mode == 3)
        {
            currTeacher.presenceRate = averagePresenceRate;
            showRateInTable(t_id, allRollCallTimes, allPresenceTimes, averagePresenceRate);
        }

        /* ----------------------------------- */
        /*     average presence rate chart     */
        /* ----------------------------------- */
        data = {
            datasets: [{
                data: [allPresenceTimes, allRollCallTimes - allPresenceTimes],
                backgroundColor: ['#5dc0de', '#ff4b68']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                '出席',
                '缺席'
            ]
        };
        var ctx = document.getElementById("canvasChart");
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options:
            {
                legend: {
                    onClick: () => {},
                    position: 'left'
                },
                aspectRatio: 2
            }
        });
    }

    function showDetail(idx)
    {
        let
            lesson = lessons[idx],
            popup_head = '點名細節 - ' + lesson.l_name,
            presenceDetails = [],   // detail datas for draw table
            $popupBody;

        lesson.presenceData.rollCallDates.forEach(d => {
            let
                dateStr = d.start_time.substr(0,10).replace(/\-/g,'/'),
                unitStartTime = d.start_time.substr(11,5);

            presenceDetails.push({u_id: d.u_id, date: dateStr, stime: unitStartTime});
        });


        /*---- for Student Scope ----*/
        if(m_id)
        {
            lesson.presenceData.rollcalls.forEach(v =>
            {
                presenceDetails.some(v1 =>
                {
                    if(v.u_id == v1.u_id)
                    {
                        v1.rollcall_time = v.rollcall_time.replace(/\-/g,'/');
                        return true;
                    }
                });
            });
            $popupBody = settings.rollcallTable.drawRollcallTable(presenceDetails);
        }

        /*---- for Teacher Scope ----*/
        else
        {
            lesson.classmates.forEach(elm1 =>
            {
                elm1.rollcalls = [];
            });
            
            lesson.presenceData.rollcalls.forEach(elm =>
            {
                lesson.classmates.some(elm1 =>
                {
                    if(elm1.m_id == elm.m_id)
                    {
                        elm1.rollcalls.push({u_id: elm.u_id, rollcall_time: elm.rollcall_time.replace(/\-/g, '/')});
                    }
                });
            });
            $popupBody = settings.rollcallTable.drawRollcallTable(presenceDetails, lesson.classmates);
        }

        // Create popup card
        createPopup
        ({
            body: $popupBody,
            close: true,
            head: popup_head,
            // tail: popup_tail,
            type: 'default'
        });

        $('[data-toggle="popover"]').popover('hide');
        
    }


    /* ------------- */
    /*    Initial    */
    /* ------------- */
    ;(function init()
    {
        // settings customize
        settings        = $.extend(true, defaultSettings, customize);
        rollingLoadingController = settings.rollingLoading;
        $btnCheckAll;
        $container = $(settings.container).addClass('presenceCard');
        $row = $('<div>', {class: 'row'}).appendTo($container);
    })();

    async function showStudentLessons()
    {
        mode = 0;
        try
        {
            let tmpLesson = await getStudentLessons();

            lessons = await getStudentLessons();
            lessonsLength = lessons.length;
            
            drawCardsList();
        }
        catch(e)
        {
            $.alert(e);
        }
    }

    function switchCheckAllBtn(bool)
    {
        if($btnCheckAll){
            if(bool)
            {
                $btnCheckAll.show();
            }
            else
            {
                $btnCheckAll.hide();
            }
        }

    }

    function initAverageBlock()
    {
        $('#averageBlock').removeClass('unfold');
        $('#rollCallRate').html('');
        $('#totalRollCall').html('');
        $('#totalPresence').html('');
        switchCheckAllBtn(false);
    }
    function switchPanel(b)
    {
        if(b == true)
        {
            $('#teacherList').hide();
            $('#lessonList').show();
        }
        else
        {
            $('#teacherList').show();
            $('#lessonList').hide();
        }
    }


    async function showTeacherLessons(t_id)
    {
        let teacher;

        if(typeof t_id == 'undefined'){
            mode = 1;
        }
        $row.html('');

        /*---- Worker & Admin Scope ----*/
        if(mode == 2 || mode == 3)
        {
            teacher = teachers.find(t =>
            {
                return (t.t_id == t_id);
            });
            $('#h3TeacherName').text(teacher.nickname + (teacher.m_name? '（' + teacher.m_name + '）' : ''));
            switchPanel(true);
        }

        try
        {
            /*---- Teacher Scope ----*/
            if(mode == 1)
            {
                lessons = await getTeacherLessons();
            }

            /*---- Worker & Admin Scope ----*/
            else if(mode == 2 || 3)
            {
                lessons = await getTeacherLessons(t_id);
            }
        }
        catch(e)
        {
            $.alert(e.message);
        }
        lessonsLength = lessons.length;

        /*---- Admin Scope ----*/
        if(mode == 3 && !lessonsLength){
            teacher.presenceRate = 0;
            showRateInTable(t_id, 0, 0, 0);
        }

        drawCardsList();
    }

    function showRateInTable(tid, r, p, pr)
    {
        $('#tdRollcallTimes'+ tid).text(r);
        $('#tdPresenceTimes'+ tid).text(p);
        $('#tdPresenceRate'+ tid).text(pr + ' %');
    }

    /* --------------------------------------- */
    /*     Entance of Worker & Admin Scope     */
    /* --------------------------------------- */
    async function showTeachers(forWorker)
    {
        mode = forWorker? 2 : 3;
        $('#returnBtn').on('click', () =>
        {
            switchPanel(false);
            initAverageBlock();
        });

        try
        {
            teachers = await getTeachers();
        }
        catch(e)
        {
            $.alert(e);
        }

        /*---- Admin Scope ----*/
        if(mode == 3)
        {
            if(teachers.length)
            {
                $btnCheckAllTeacherRate = $('<button>', {class: 'btn btn-success', type: 'button', text: '所有出席率'})
                .on('click',() =>
                {
                    checkAllTeachersRate();
                });
                $('#teacherListFuncBar').append($btnCheckAllTeacherRate);
            }
        }

        drawTeacherList();
    }

    /* ------------------------ */
    /*     Admin Scope Only     */
    /* ------------------------ */
    function checkAllTeachersRate()
    {
        let processTeachers = teachers.filter(t =>
        {
            return typeof t.presenceRate == 'undefined';
        });

        processTeachers.forEach(async t =>
        {
            let
                tLessons,
                classmatesRequests,
                rollcallRequests,
                classmatesNumArr = [],
                rate,
                rollcallTimes = 0,
                presenceTimes = 0;


            $btnCheckAllTeacherRate.hide();
            tLessons = await getTeacherLessons(t.t_id, true);
            if(tLessons.length == 0)
            {
                t.presenceRate = 0;
                showRateInTable(t.t_id, 0, 0, 0);
            }
            else
            {
                classmatesRequests = tLessons.map(l =>
                {
                    return getLessonClassmate(l.l_id);
                });
    
                // Get all 'Classmates Number' of this teacher's all lessons
                Promise.all(classmatesRequests)
                .then(responses =>
                {
                    responses.forEach((classmates, k) =>
                    {
                        classmatesNumArr[k] = classmates.length;
                    });

                    // map request promise array.
                    // 0 for no classmate lessons.
                    rollcallRequests = tLessons.map((l,k) => (!classmatesNumArr[k])? 0 :getRollcallData(l.l_id));

                    // Get all 'Rollcall Datas' of this Teacher's all lessons,
                    // And calculate 'Students Presence Rate' of the Teacher.
                    Promise.all(rollcallRequests)
                    .then(responses =>
                    {
                        responses.forEach((rollcallDatas, k) =>
                        {   
                            /*---- NO classmate lesson ----*/
                            if(!classmatesNumArr[k])
                            {
                                rollcallTimes += 0;
                                presenceTimes += 0;
                            }

                            /*---- lesson with classmate(s) ----*/
                            else
                            {
                                let
                                    currRollcallTimes,
                                    currPresenceTimes,
                                    rollCallDatesL,
                                    keypointUids = getKeypointUnitId(rollcallDatas.rollCallDates);
            
                                // all unit or some unit are after rollcall system active day.
                                if(keypointUids.activeUid)
                                {
                                    rollCallDatesL = keypointUids.passedUid - keypointUids.activeUid + 1;
                                    currRollcallTimes = rollCallDatesL * classmatesNumArr[k];
                        
                                    currPresenceTimes = rollcallDatas.rollcalls.filter(rc =>
                                    {
                                        if(rc.u_id > keypointUids.passedUid )
                                        {
                                            currRollcallTimes ++;
                                        }
                                        return (rc.status && rc.u_id >= keypointUids.activeUid);
                                    }).length;
                                }

                                // all units are before rollcall active day and passed.
                                else
                                {
                                    rollCallDatesL = currRollcallTimes = currPresenceTimes = 0;
                                }
                                
                                rollcallTimes += currRollcallTimes;
                                presenceTimes += currPresenceTimes;
                            }
                        });
                    })
                    // Record and Render
                    .then(() =>
                    {
                        rate = rollcallTimes == 0? 0 : (presenceTimes / rollcallTimes * 100).toFixed(precision);
                        t.presenceRate = rate;
                        showRateInTable(t.t_id, rollcallTimes, presenceTimes, rate);
                        
                    });
                })
                .catch(e =>
                {
                    $btnCheckAllTeacherRate.show();
                    $.alert(e);
                });
            }
        });
    }

    return {
        showStudentLessons: showStudentLessons,
        showTeacherLessons: showTeacherLessons,
        showTeachers: showTeachers
    }
}