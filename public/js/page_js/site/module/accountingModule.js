/**
 * Filter Module for Accounting
 *
 * @param {*} fId filter container id
 * @param {*} fFn callback function on click filters.
 * @returns
 */
function filterModule(fId, fFn)
{
    var
        filterContainer = $('#'+fId),
        filterElem  = filterContainer.find('.filter__item'),
        filterFn = (typeof fFn == 'function')? filterFn = fFn : null;


    $('body').on('click',function(){
        clearActingFilterElem();
    });

    filterElem.on('click',function(event){
        event.stopPropagation();
        var idx = filterElem.index($(this));
        activingFilterElem(idx);
    });

    function clearActingFilterElem(){
        filterElem.removeClass('activing');
    }

    // add activing Class for pickdater. and do callback function.
    function activingFilterElem(idx)
    {
        filterElem.eq(idx).addClass('activing').siblings().removeClass('activing');
        if(filterFn){ filterFn(idx); }
    }
    // add active Class
    function activeFilterElem(idx)
    {
        clearActingFilterElem();
        filterElem.eq(idx).addClass('active').siblings().removeClass('active');
    }

    return {
        activeFilterElem: activeFilterElem,
        activingFilterElem: activingFilterElem,
        clearActingFilterElem: clearActingFilterElem
    }
}

/**
 * Accounting Module
 * 
 * @Dependancy:
 * rwdHashTableModule
 * filterModule (optional)
 */
function accountingModule(){
    let
        t_id,
        mainChartFilter,
        accountingTable,
        managerScope       = false,
        $select_time_range = $('#select_time_range'),
        $clear_select_date = $('#clear_select_date'),

        LessonChart,
        mainChart,
        data_time_range,
        time_dataset       = [],
        chart_mode,
        max_data = 61,
        accountingData,
        window_w           = $(window).width();

        
    /*---- filter: the Instance of filterModule ----*/
    /*---- manager: (optional)send true if account role is manager. ----*/
    function init({tid, manager})
    {
        if(manager){ managerScope = manager};
        mainChartFilter = filterModule('filter_accounting', mainFilterFn);
        t_id = tid;

        /* ----------------------- */
        /*     Set Date Picker     */
        /* ----------------------- */
        $select_time_range.datepicker
        ({
            language:       "zh",
            toggleSelected: false,
            range:          true,
            maxDate:        new Date(),
            onSelect: function()
            {
                let select_time_range = $select_time_range.val();

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
                            set_time_range(time_arr);
                            $clear_select_date.removeClass('hide');
                        }
                    }
                }
            }
        });

        $clear_select_date.on('click', (ev) =>
        {
            ev.stopPropagation();
            $select_time_range.datepicker( "refresh" );
            mainChartFilter.clearActingFilterElem();
            set_time_range_default();
            $select_time_range.val('');
            $clear_select_date.addClass('hide');
        });

        initTable();
        set_time_range_default();
    }

    /* --------------------------------- */
    /*     initial lesson list table     */
    /* --------------------------------- */
    function initTable()
    {
        let
            columns = [],
            columnCustom,
            customize;

        columns.push({headTerm: '課程名稱', columnKey: 'l_name'});
        if(managerScope){ columns.push({headTerm: '課程導師', columnKey: 't_name'}); }
        columns.push({headTerm: '類別', columnKey: 'type', customKey: 'typeTerm', sortMode: 1});
        columns.push({headTerm: '狀態', columnKey: 'lesson_status', sortMode: 1});
        columns.push({headTerm: '開課日', columnKey: 'l_start_time'});
        columns.push({headTerm: '訂單數', columnKey: 'order_num', freeze: true});
        if(managerScope){ columns.push({headTerm: '取消數', columnKey: 'delete_num', freeze: true}); }
        columns.push({headTerm: '退款數', columnKey: 'refund_num', freeze: true});
        columns.push({headTerm: '小計', columnKey: 'lesson_income', freeze: true});
        columns.push({headTerm: '退費', columnKey: 'refund_price', freeze: true});
        columns.push({headTerm: '收益', columnKey: '', customKey: 'lessonIncome', freeze: true});
        columns.push({headTerm: '詳細', columnKey: '', textAlign: 'center', freeze: true});

        columnCustom = [];
    
        columnCustom[0] = function(data)
        {
            return $('<a class="aLname" href="../lesson/' + data.l_id +'" target="_blank">' + data.l_name + '</a> <span class="spnLid">#' + data.l_id + '</span>');
        }
    
        columnCustom[managerScope? 2 : 1] = function(data)
        {
            return data.type == 'entity' ? '實體' : '線上';
        }
        
        // 訂單數
        columnCustom[managerScope? 5 : 4] = function(data)
        {
            if(data.order_num)
            {
                $btn = $('<button>',
                {
                    'class': 'btnOrderNum',
                    'text': data.order_num
                })
                .on('click',() =>
                {
                    checkLessonOrders(data.l_id);
                });
                return $btn;
            }
            else
            {
                return data.order_num;
            }
        }

        columnCustom[managerScope? 10 : 8] = function(data)
        {
            return (data.lesson_income - data.refund_price);
        }
        
        columnCustom[managerScope? 11: 9] = function(data, idx)
        {
            let 
                $btn,
                $return = $('<div>');

            $btn = $('<label>',
            {
                'class': 'label btn-info',
                'style': 'font-size: 90%; font-weight: 400;',
                'text': '查看',
            })
            .on('click',() =>
            {
                checkLessonDetail(data.l_id);
            }).appendTo($return);

            $btn = $('<label>',
            {
                'class': 'label btn-info',
                'style': 'font-size: 90%; font-weight: 400;',
                'text': '圖表',
                'for': 'btnBox'
            })
            .on('click',() =>
            {
                showLessonChart(data.l_id, data.l_name);
            }).appendTo($return);
            return $return;
        }
    
        customize = {
            container: '#tableContainer',
            columnInfos: columns,
            rowPerPage: 10,
            hashController: null,
            noDataTerm: '無任何資料',
            columnCustomFn: columnCustom,
            rwdMode: 1,
            rowsPerPageOptions: [10, 20, 50],
            currRowsPerPageOptionsIdx: 0,
            searchTiming: 1,
            searchCaseSensitive: 0
        };
        accountingTable = rwdHashTableModule(customize);
    }

    
    async function set_time_range(time_arr)
    {
        var
            today,
            YYYY,
            MM,
            dd,
            lastMonthDays,
            start_date;

        data_time_range = {};
        chart_mode = 0;


        // Default Time Range is '1 month'.
        if(time_arr == null)
        {
            today = new Date();
            today.setHours(0, 0, 0, 0);
            YYYY           = today.getFullYear();
            MM             = today.getMonth();
            dd             = today.getDate();

            lastMonthDays = new Date(YYYY, MM, 0).getDate();
            start_date = dd+1;
            start_date = start_date > lastMonthDays ? lastMonthDays : start_date;
            data_time_range.start = new Date(YYYY, MM-1, start_date);
            data_time_range.end = today;
            mainChartFilter.activeFilterElem(0);
        }

        // Customize Time Range.
        else if(time_arr instanceof Array)
        {
            var
            ta0 = time_arr[0].split('-'),
            ta1 = time_arr[1].split('-');
            data_time_range.start = new Date(ta0[0], ta0[1] * 1 - 1, ta0[2]);
            data_time_range.end = new Date(ta1[0], ta1[1] * 1 - 1, ta1[2]);
            mainChartFilter.activeFilterElem(1);
        }

        get_time_axis_dataset();
    }

    function set_time_range_default()
    {
        set_time_range(null);
    }


    // Called by Filter Module of accounting.
    function mainFilterFn(idx)
    {
        $select_time_range.get(0);
        switch(idx)
        {
            case 0:
            $clear_select_date.click();
            break;
            case 1:
            $select_time_range.focus();
            break;
        }
    }

    function fillZero(num, digits)
    {
        let compareNum = 10 ** (digits - 1);
        return num < compareNum? '0' + num : num;
    }

    function get_time_axis_dataset()
    {
        var
            timeAxis = [],
            tempDate,
            MM,
            dd,
            tempDateStr,
            data_nums = ((data_time_range.end - data_time_range.start)/86400000) + 1;

        chart_mode = data_nums <= max_data ? 0 : 1;

        for(var i = 0; i < data_nums; i++)
        {
            tempDate = new Date(data_time_range.start.getTime() + 86400000 * i);
            MM = tempDate.getMonth() + 1;
            MM = MM <10? '0'+ MM : MM;
            dd = tempDate.getDate();
            dd = dd <10? '0'+ dd : dd;
            tempDateStr = tempDate.getFullYear() + '/' + MM + '/' + dd;
            timeAxis.push(tempDateStr);
        }
        time_dataset = timeAxis;
        getChartDataset();
    }

    async function getChartDataset()
    {
        try
        {
            accountingData = await getAccountingData();
        }
        catch(e)
        {
            $.alert(e);
        }

        makeUpChartDataset();
        makeUpListData();
    }

    function getAccountingData()
    {
        return new Promise((resolve, reject) =>
        {
            let
                stime = data_time_range.start,
                etime = data_time_range.end,
                postData;
            
            stime = stime.getFullYear() + '-' + fillZero(stime.getMonth() + 1, 2) + '-' + fillZero(stime.getDate(), 2) + ' 00:00:00';
            etime = etime.getFullYear() + '-' + fillZero(etime.getMonth() + 1, 2) + '-' + fillZero(etime.getDate(), 2) + ' 23:59:59';
            postData = {
                start_time: stime,
                end_time: etime
            }
            if(t_id)
            {
                postData.t_id = t_id
            }
            
            $.ajax
            ({
                type: 'get',
                url: '/ajax/getPlatformIncomeData',
                dataType: 'json',
                data: postData,
                async: false,
                success: function(data)
                {
                    resolve(data);
                },
                error: e =>
                {
                    reject(e);
                }
            });
        });
    }

    /* ------------------------------- */
    /*     Make up datas for chart     */
    /* ------------------------------- */
    function makeUpChartDataset(l_id)
    {
        let
            allClickData = [],
            allBuyData = [],
            click_dataset = [],
            buy_dataset = [];

        accountingData.forEach(l =>
        {
            let boolcurrLesson = l_id? (l_id == l.lesson_data.l_id) : true;

            l.click_data.forEach(c =>
            {
                if(boolcurrLesson)
                {
                    allClickData.push(c);
                }
            });

            l.order_list.forEach(o =>
            {
                if(boolcurrLesson && o.checkout_time && !o.delete_time)
                {
                    allBuyData.push(o);
                }
            });
        });


        for(let i = 0, j = time_dataset.length; i<j; i++){
            let
                currDate,
                clickNum,
                buyNum;

            currDate = time_dataset[i];
            clickNum = allClickData.filter(c =>
            {
                return c.created_at.substring(0, 10).replace(/-/g,'/') == currDate;
            }).length;
            click_dataset.push(clickNum);

            buyNum = allBuyData.filter(o =>
            {
                return o.order_time.substring(0, 10).replace(/-/g,'/') == currDate;
            }).length;
            buy_dataset.push(buyNum);
        }
        createLineChart(time_dataset, buy_dataset, click_dataset, typeof l_id != 'undefined');
    }

    function createLineChart(x, y1, y2, isLessonChart)
    {
        let chart = isLessonChart? LessonChart : mainChart;

        // 更新圖表
        if(chart){
            chart.data.labels = x;
            chart.data.datasets[0].data = y1;
            chart.data.datasets[1].data = y2;

            chart.options.elements.point.radius = (chart_mode == 1 || window_w < 768)? 0 : 2;
            chart.options.elements.point.hitRadius = (chart_mode == 1 || window_w < 768)? 2 : 5;

            chart.update();

        // 產生圖表
        }else{
            /*------ refer to : https://www.chartjs.org/ ------*/
            var ctx = document.getElementById(isLessonChart? "lesson_chart":"main_chart");
            chart = Chart.Line(ctx, {
                data: {
                    labels: x,
                    datasets: [{
                    label: '購買數',
                    data: y1,
                    backgroundColor: '#ff98aa',
                    borderColor: '#ff98aa',
                    pointBackgroundColor: '#ff98aa',
                    fill: false,
                    borderWidth: 1,
                    yAxisID: 'y-axis-1'
                    },
                    {
                    label: '點擊數',
                    data: y2,
                    backgroundColor: '#5dc0de',
                    borderColor: '#5dc0de',
                    pointBackgroundColor: '#5dc0de',
                    fill: false,
                    borderWidth: 1,
                    yAxisID: 'y-axis-2'
                    }]
                },
                options: {
                    stacked: false,
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        },
                        point: {
                            radius: (chart_mode == 1 || window_w < 768) ? 0 : 2,
                            hitRadius: (chart_mode == 1 || window_w < 768) ? 2 : 5
                        }
                    },
                    tooltips: {
                        mode: 'index'
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontColor: '#666666',
                            fontSize: $(window).width() < 768 ? 14 : 18
                        }
                    },
                    title: {
                        display: false,
                        // text: 'Custom Chart Title'
                    },
                    scales: {
                        fontSize: 5,
                        yAxes: [{
                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                labelString: '購買數'
                            },
                            id: 'y-axis-1',
                            ticks: {
                                min: 0
                            }
                        },
                        {
                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            position: 'right',
                            scaleLabel: {
                                display: true,
                                labelString: '點擊數'
                            },
                            id: 'y-axis-2',
                            ticks: {
                                min: 0
                            }
                        }],
                    },
                    aspectRatio: $(window).width() < 768 ? 1.5 : 3,
                    onResize: function(c, size){
                        if(size.width < 768)
                        {
                            c.aspectRatio = 1.5;
                            c.options.legend.labels.fontSize = 14;
                            c.options.elements.point.radius = 0;
                            c.options.elements.point.hitRadius = 2;
                        }
                        else
                        {
                            c.aspectRatio = 3;
                            c.options.legend.labels.fontSize = 18;
                            c.options.elements.point.radius = 2;
                            c.options.elements.point.hitRadius = 5;
                        }

                    }
                }
            });
            if(isLessonChart){ LessonChart = chart;}else{ mainChart = chart;}
        }
    }

    /*---- yyyy/mm/dd to 23432432423142 ----*/
    function datestring2Timestamp(s){
        return new Date(s).setHours(0, 0, 0, 0);
    }

    function getLessonStatus(lesson)
    {
        let
            today = new Date().setHours(0, 0, 0, 0),
            now = new Date().getTime(),
            lData = lesson.lesson_data,
            lesson_status;

        // 超過募資時間
        if (now > new Date(lData.end_fund.replace(/-/g,'/')).setHours(23, 59, 59, 999))
        {
            
            // 人數足夠
            if (lesson.order_count >= lData.least_people)
            {
                if (today < datestring2Timestamp(lData.start_time.replace(/-/g,'/')))
                {
                    if (lData.type == 'entity') { lesson_status = '確定開班'; }
                    else { lesson_status = '備課中'; }
                }
                else
                {
                    if ((lData.type == 'entity') && (now > datestring2Timestamp(lData.l_end_time.replace(/-/g,'/')))) { lesson_status = '已結業'; }
                    else { lesson_status = '上課中'; }
                }
            }

            // 人數不足
            else { lesson_status = '取消開班'; }
        }
        else
        {
            // 人數足夠
            if (lesson.order_count >= lData.least_people)
            {
                if (lData.type == 'entity') { lesson_status = '確定開班'; }
                else { lesson_status = '優惠中'; }
            }

            // 人數不足
            else { lesson_status = '優惠中'; }
        }
        return lesson_status;
    }
    
    /* ------------------------------ */
    /*     Make up datas for list     */
    /* ------------------------------ */
    function makeUpListData(){
        let
            ListData = [],
            sumIncome = 0;

        accountingData.forEach(l =>
        {
            let
                lData = l.lesson_data,
                lOrders = l.order_list,
                checkoutAmount = 0,
                refundAmount = 0,
                deleteOrdersNum = 0,
                refundOrdersNum = 0;

            lOrders.forEach(o =>
            {
                if(o.checkout_time && !o.delete_time)
                {
                    checkoutAmount += o.price * 1;
                    sumIncome += o.price * 1;
                }
                else
                {
                    deleteOrdersNum += 1;
                }
                if(o.refund_time)
                {
                    refundOrdersNum += 1;
                    sumIncome -= o.price * 1;
                }
                refundAmount += o.refund_price? o.refund_price * 1 : 0;
            });

            // show Sum Income
            $('#income_sum').text('NT$ ' + sumIncome);

            ListData.push({
                l_id: lData.l_id,
                l_name: lData.l_name,
                t_name: l.teacher_data.nickname,
                type: lData.type,
                lesson_status: getLessonStatus(l),
                location: lData.location,
                start_fund: lData.start_fund,   // 上架日
                l_start_time: lData.l_start_time == null ? lData.start_time : lData.l_start_time.substr(0, 10),
                l_end_time: lData.l_end_time? lData.l_end_time.substr(0,10) : '',   // 結束日  
                order_num: managerScope? lOrders.length : lOrders.length - deleteOrdersNum,
                delete_num: deleteOrdersNum,
                refund_num: refundOrdersNum,
                lesson_income: checkoutAmount, // 小計
                refund_price: refundAmount  // 退費
            });
        });

        drawAccountingList(ListData);
    }

    function drawAccountingList(lData){
        accountingTable.setData(lData);
    }

    /* --------------------- */
    /*      Popup Chart      */
    /* --------------------- */
    function showLessonChart(l_id, l_name)
    {
        // 顯示視窗圖表
        $('#lesson_title').text(l_name);
        makeUpChartDataset(l_id);
    }

    /* ----------------------------------- */
    /*      Popup Check Lesson Detail      */
    /* ----------------------------------- */
    function checkLessonDetail(l_id)
    {
        let
            currLesson = accountingData.find(l => l.lesson_data.l_id == l_id),
            currLessonData = currLesson.lesson_data,
            currTeacher = currLesson.teacher_data,
            currOrder = currLesson.order_list,
            priceArray = [],
            peopleSum = 0,
            start_time = currLessonData.l_start_time == null ? currLessonData.start_time : currLessonData.l_start_time.substr(0, 10),
            end_time = currLessonData.l_start_time == null ? '<span class="hide"></span>' : '<p class="margin-0">課程結束日：' + currLessonData.l_start_time.substr(0, 10) + '</p>',
            $content = $('<div>', {class: 'popupLessonInfo__content'}),
            $tb,
            $tr,
            $td;

        currOrder.forEach((o, idx, arr) =>
        {
            if(o.checkout_time && !o.delete_time)
            {
                let currPrice = priceArray.find(elm => elm.price == o.price);
                if(typeof currPrice == 'undefined')
                {
                    priceArray.push({price: o.price, quantity: 1});
                }
                else{
                    currPrice.quantity ++;
                }
                peopleSum ++;
            }
        });

        $tb = $('<table>', {class: 'popupLessonInfo__table'}).appendTo($content);
        $tb.append($('<tr><th>課程編號：</th><td>' + currLessonData.l_id + '</td></tr>'));
        $tb.append($('<tr><th>課程名稱：</th><td>' + currLessonData.l_name + '</td></tr>'));
        $tb.append($('<tr><th>課程類別：</th><td>' + (currLessonData.type == 'online'? '線上' : '實體') + '</td></tr>'));
        if(currLessonData.location)
        {
            $tb.append($('<tr><th>課程地區：</th><td>' + currLessonData.location + '</td></tr>'));
        }
        $tb.append($('<tr><th>課程狀態：</th><td>' + getLessonStatus(currLesson) + '</td></tr>'));
        $tb.append($('<tr><th>總人數：</th><td>' + peopleSum + '</td></tr>'));
        if(currLessonData.least_people)
        { $tb.append($('<tr><th>確定開課人數：</th><td>' + currLessonData.least_people + '</td></tr>')); }
        $tb.append($('<tr><th>上架日：</th><td>' + currLessonData.start_fund + '</td></tr>'));
        $tb.append($('<tr><th>確定開班日：</th><td>' + currLessonData.start_time + '</td></tr>'));
        $tb.append($('<tr><th>正式開班日：</th><td>' + start_time + '</td></tr>')); 
        $tb.append($('<tr><th>結束日：</th><td>' + (currLessonData.l_end_time? currLessonData.l_end_time.substr(0,10) : '') + '</td></tr>'));

        // Close least
        closePopup();

        // Create popup card
        createPopup
        ({
            body: $content,
            head: '查看課程',
            close: true,
            type: 'green'
        });
    }

    /* ----------------------------------- */
    /*      Popup Check Lesson Orders      */
    /* ----------------------------------- */
    function checkLessonOrders(l_id)
    {
        let
            currLesson = accountingData.find(l => l.lesson_data.l_id == l_id),
            origin_fee = currLesson.lesson_data.origin_fee,
            currOrder,
            priceArray = [],
            $content = $('<div>'),
            $priceKind = $('<div>', {id: 'priceKind', class: 'popupLessonOrders__priceKind'}).appendTo($content);

        $('<div>', {id: 'popupLessonOrders',class: 'popupLessonOrders__content'}).appendTo($content);

        if(managerScope)
        {
            currOrder = currLesson.order_list
        }
        else
        {
            currOrder = currLesson.order_list.filter(o => {
                return !o.delete_time;
            });
        }
        
        priceArray.push({price: origin_fee, quantity: 0});

        currOrder.forEach((o, idx, arr) =>
        {
            if(o.checkout_time && !o.delete_time && !o.refund_time)
            {
                let currPrice = priceArray.find(elm => elm.price == o.price);
                if(typeof currPrice == 'undefined')
                {
                    priceArray.push({price: o.price, quantity: 1});
                }
                else{
                    currPrice.quantity ++;
                }
            }
        });

        let
            deleted,
            refunded;

        currOrder.forEach((o, idx, arr) =>
        {
            if(o.delete_time)
            {
                if(!deleted)
                {
                    priceArray.push({deleted: true, quantity: 1});
                    deleted = priceArray[priceArray.length - 1];
                }
                else
                {
                    deleted.quantity ++;
                }
            }
            else if(o.refund_time)
            {
                if(!refunded)
                {
                    priceArray.push({refunded: true, quantity: 1});
                    refunded = priceArray[priceArray.length - 1];
                }
                else
                {
                    refunded.quantity ++;
                }
            }
        });

        priceArray.forEach(elm => {
            if(elm.deleted)
            {
                $priceKind.append($('<p>', {text: '取消訂單 － ' + elm.quantity + ' 人'}));   
            }
            else if(elm.refunded)
            {
                $priceKind.append($('<p>', {text: '退訂單 － ' + elm.quantity + ' 人'}));   
            }
            else
            {
                let priceKind = (elm.price == origin_fee)? '原價' : ' 優惠價'
                $priceKind.append($('<p>', {text: priceKind + ' NT$ ' + elm.price + ' － ' + elm.quantity + ' 人'}));
            }
        });

        // Close least
        closePopup();

        // Create popup card
        createPopup
        ({
            body: $content,
            head: '課程訂單',
            close: true,
            type: 'green'
        });


        let
            columns,
            columnCustom,
            customize,
            ordersTable;
            
        columns = [
            {headTerm: '購買人', columnKey: 'nickname', customKey: 'buyer'},
            {headTerm: '訂單金額', columnKey: 'price'},
            {headTerm: '退費金額', columnKey: 'refund_price'},
            {headTerm: '訂單日期', columnKey: 'order_time', sortMode: 1},
            {headTerm: '結帳日期', columnKey: 'checkout_time', sortMode: 1},
            {headTerm: '退費日期', columnKey: 'refund_time', sortMode: 1}
        ];

        /* only manager need delete_date */
        if(managerScope)
        {
            columns.push({headTerm: '取消日期', columnKey: 'delete_time', sortMode: 1});
        }

        columnCustom = [];
        columnCustom[0] = (data) =>
        {
            return data.nickname + (data.m_name? ' (' + data.m_name + ')' : '');
        }

        columnCustom[3] = (data) =>
        {
            return data.order_time? data.order_time.substr(0, 10) : '';
        }
        
        columnCustom[4] = (data) =>
        {
            return data.checkout_time? data.checkout_time.substr(0, 10) : '';
        }
        
        columnCustom[5] = (data) =>
        {
            return data.refund_time? data.refund_time.substr(0, 10) : '';
        }
        
        columnCustom[6] = (data) =>
        {
            return data.delete_time? data.delete_time.substr(0, 10) : '';
        }

        customize = {
            container: '#popupLessonOrders',
            columnInfos: columns,
            rowPerPage: 1,
            hashController: null,
            noDataTerm: '無任何訂單',
            columnCustomFn: columnCustom,
            rwdMode: 10,
            rowsPerPageOptions: [10, 20, 50],
            currRowsPerPageOptionsIdx: 0,
            searchTiming: 1,
            searchCaseSensitive: 0,
            withSearcher: false
        };
        ordersTable = rwdHashTableModule(customize);
        ordersTable.setData(currOrder);
    }

    function setWindowWidth(w)
    {
        window_w = w;
    }

    return {
        init: init, 
        // mainFilterFn: mainFilterFn,
        setWindowWidth: setWindowWidth,
        showLessonChart: showLessonChart,
        checkLessonDetail: checkLessonDetail,
        checkLessonOrders: checkLessonOrders
    }
}