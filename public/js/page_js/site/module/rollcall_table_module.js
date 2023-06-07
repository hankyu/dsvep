function rollcallTableModule()
{
    /*---- yyyy-MM-dd or yyyy-MM-dd hh:mm:ss to 2324732472374 ----*/
    function timeString2Timestamp(ts){
        let
            matchArr,
            timeString,
            dateInfo;

        // if yyyy-MM-dd hh:mm:ss
        if(matchArr = ts.match(/\d{4}[\-\/]\d{2}[\-\/]\d{2} \d{2}\:\d{2}\:\d{2}/))
        {
            timeString = matchArr[0];
            dateInfo = timeString.split(/[\/\-\s\:]/);
            return (new Date(dateInfo[0], dateInfo[1] - 1, dateInfo[2], dateInfo[3], dateInfo[4], dateInfo[5])).getTime();
        }

        // if yyyy-MM-dd
        else if(matchArr = ts.match(/\d{4}[\-\/]\d{2}[\-\/]\d{2}/))
        {
            timeString = matchArr[0];
            dateInfo = timeString.split(/[\-\/]/);
            return (new Date(dateInfo[0], dateInfo[1] - 1, dateInfo[2])).getTime();
        }
    }

    function drawRollcallTable(dateUnitData, classmates)
    {
        /* 
        [Student Scope:]
        dateUnitData = [
            {
                date: "2019/04/26",
                rollcall_time: "2019/05/02 18:13:38",
                stime: "00:00",
                u_id: 1
            },
            ....
        ]

        [Teacher Scope:]
        dateUnitData = [
            {
                date: "2019/04/26",
                stime: "00:00",
                u_id: 1
            },
            ....
        ]
        classmates = [
            {
                m_id: 4,
                m_name: "aaaaaa",
                nickname: "bbbbbbbb"
                rollcalls: [
                    {
                        u_id: 4,
                        rollcall_time: "2019-05-02 17:31:46"
                    }
                ]
            },
            ...
        ]
        */

        let
            now = (new Date()).getTime(),
            $tbSlider,
            $tb,
            $th,
            $tbody;

        const ROLLCALL_SYSTEM_ACTIVETIME = (new Date(2019, 4, 10).setHours(0, 0, 0, 0));
        
        $tbSlider = $('<div>', {class: 'tableRollCall__slider', id: 'slider'});
        $tb = $('<table>').appendTo($tbSlider);

        /* ------------------------- */
        /*     for Student Scope     */
        /* ------------------------- */
        if(typeof classmates == 'undefined')
        {
            $tb.append($('<thead><tr><th>日期</th><th>開課時間</th><th>出席狀況</th><th>點名時間</th></tr></thead>'));
            $tbody = $('<tbody>').appendTo($tb);

            dateUnitData.forEach((v, k, arr) =>
            {
                let
                    $tr,
                    $td,
                    timestamp = timeString2Timestamp(v.date + ' ' + v.stime + ':00');

                $tr = $('<tr>').appendTo($tbody);
                if(k > 0 && v.date == arr[k-1].date){
                    let rowspan = $th.attr('rowspan') * 1 + 1;
                    $th.attr({'rowspan': rowspan});
                }
                else
                {
                    $th = $($('<th>', {rowspan: 1, text: v.date}))
                    $tr.append($th);
                }

                $tr.append($('<td>', {text: v.stime}));
                $td = $('<td>').appendTo($tr);


                if(timestamp < ROLLCALL_SYSTEM_ACTIVETIME)
                {
                    $td.addClass('color-gray');
                    $td.append(' 無資料');
                }
                else if(v.rollcall_time)
                {
                    $td.append($('<i>', {class: 'presenceMark fas fa-check-circle'}));
                    $td.append(' 出席');
                }
                else
                {
                    if(now > timestamp)
                    {
                        $td.addClass('color-emphasized2');
                        $td.append($('<i>', {class: 'presenceMark fas fa-times-circle'}));
                        $td.append(' 缺席');
                    }
                }
                $tr.append($('<td>', {text: v.rollcall_time}));
            });
        }

        /* ------------------------------ */
        /*     for Teacher, Adm Scope     */
        /* ------------------------------ */
        else
        {
            let
                $thead = $('<thead>', {class:'aaa'}).appendTo($tb),
                $tr,
                $th,
                $td;
            
            /*---- thead ----*/
            $tr = $('<tr>').append($('<th>', {text: '學生', rowspan: 2})).appendTo($thead);
            
            dateUnitData.forEach((v, k, arr) =>
            {
                if(k && v.date == arr[k - 1].date)
                {
                    let colspan = $th.attr('colspan') * 1 + 1;
                    $th.attr({colspan: colspan});
                }
                else
                {
                    $th = $('<th>', {colspan: 1, text: v.date}).appendTo($tr);
                }
            });

            $tr = $('<tr>').appendTo($thead);
            dateUnitData.forEach((v, k, arr) =>
            {
                $th = $('<th>', {text: v.stime}).appendTo($tr);
            });

            classmates.forEach(classmate =>
            {
                $tr = $('<tr>').appendTo($thead);
                $tr.append($('<td>', {text: classmate.nickname, class: 'text-nowrap'}));
                
                dateUnitData.forEach(rollcall_unit =>
                {
                    let
                        timestamp = timeString2Timestamp(rollcall_unit.date + ' ' + rollcall_unit.stime + ':00');
                        
                    $td = $('<td>').appendTo($tr);

                    if(timestamp < ROLLCALL_SYSTEM_ACTIVETIME)
                    {
                        $td.append('<i class="presenceMark fas fa-info-circle" data-container="#slider" data-toggle="popover" data-html="true" data-placement="top" data-content="無資料"></i>');
                    }
                    else
                    {
                        let bool = classmate.rollcalls.some(rc =>
                        {
                            if(rc.u_id == rollcall_unit.u_id)
                            {
                                $td.append('<i class="presenceMark fas fa-check-circle" data-container="#slider" data-toggle="popover" data-html="true" data-placement="top" data-content="' + rc.rollcall_time + '"></i>');
                                return true;
                            }
                        });
                        if(!bool)
                        {
                            if(now > timestamp)
                            {
                                $td.append($('<i class="presenceMark fas fa-times-circle"></i>'));
                            }
                        }
                    }
                });
            });


        }
        return $tbSlider;
    }

    return {
        drawRollcallTable: drawRollcallTable
    }
}