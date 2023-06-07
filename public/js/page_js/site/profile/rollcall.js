// [Dependencies]
// JQuery 3.x
// rollcallModule
// popup-module

!function()
{
    $(document).ready(() =>
    {
        if (rollcallModule)
        {
            let select_el,
                select_unit,
                select_options,
                btn_qrcode,
                students,
                qrcodeURLs = [],
                currUnitIdx,
                allowQRcode;

            select_el      = $('#select-u_id');
            btn_qrcode     = $('#btn-rollcall-qrcode');
            select_options = $('.accordion-title');

            // [Do]
            // Set Module
            // [Why Do]
            // Convert A Function To An Object For Use
            rollcallModule = new rollcallModule();
            saveModule = new saveModule();

            // [Do]
            // Set Module Manager
            // [Why Do]
            // Convert A Function To An Object For Use
            // 'moduleManager' Management Dropdown Options And 'rollcallUserModule' Module
            moduleManager = new moduleManager();

            // [Do]
            // Get All Student Data
            // [Why Do]
            // Get All Student Data Once For Roll Call
            rollcallModule.getStudents().then((students_data) =>
            {
                // [Do]
                // Store Student Data
                // [Why Do]
                // Avoid Duplicate Storage
                students = students_data;

                // [Do]
                // Get All Roll Call Data
                // [Why Do]
                // Get All Roll Call Data Once For Modules
                rollcallModule.getRollcall().then((rollcall_data) =>
                {
                    let 
                        unitNum,
                        attend_data,
                        phoneNumberComponent,
                        registeredRollcallModule,
                        saveComponent;


                    dropdownlistModule = new dropdownlistModule('select-u_id',
                    {
                        select_el: select_el,
                        select_options: select_options
                    });

                    unitNum = dropdownlistModule.getUnitNum();

                    select_unit = $('#select-unit');
                    currUnitIdx = select_unit.val();
                    attend_data = {};

                    /* ------------------------ */
                    /*     Make attend_data     */
                    /* ------------------------ */
                    for(let i = 1; i<= unitNum; i++)
                    {
                        attend_data[i] = {};
                    }
                    rollcall_data.unit_data.forEach((value, key) =>
                    {
                        attend_data[value.u_id] = attend_data[value.u_id] || {};
                        attend_data[value.u_id][value.m_id] = true;
                    });

                    /* ----------------------------------------------------- */
                    /*     Set registeredRollcallModule in moduleManager     */
                    /* ----------------------------------------------------- */
                    Object.keys(attend_data).forEach((value, key) =>{
                        registeredRollcallModule = new rollcallUserModule('rollcall-user',
                        {
                            attend_data: attend_data[value],
                            u_id: value
                        });

                        moduleManager.add(
                        {
                            module: registeredRollcallModule,
                            name: value
                        });
                    });

                    /* ------------------------------------------------- */
                    /*     Bind Listerner to Selector and QRcode Btn     */
                    /* ------------------------------------------------- */
                    select_el.on('change', (e) =>
                    {
                        dropdownlistModule.drawUnitOption(e.target.value);
                        currUnitIdx = select_unit.val();
                        setRollcallHtml(currUnitIdx);
                    });

                    select_unit.on('change', (e) =>
                    {
                        currUnitIdx = select_unit.val();
                        setRollcallHtml(currUnitIdx);
                    });
                    currUnitIdx = select_unit.val();
                    setRollcallHtml(currUnitIdx);

                    btn_qrcode.on('click', () =>
                    {
                        if(!allowQRcode){ return; }
                        let selectUnitVal = select_unit.val();

                        if(qrcodeURLs[selectUnitVal])
                        {
                            popupQRcode(qrcodeURLs[selectUnitVal]);
                        }
                        else
                        {
                            new Promise((resolve, reject) => {
                                $.ajax
                                ({
                                    type: 'post',
                                    url: '/ajax/getRollcallQRCode',
                                    dataType: 'json',
                                    data:
                                    {
                                        l_id: l_id.value,
                                        u_id: select_unit.val(),
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

                            }).then(
                                (data) => {
                                    qrcodeURLs[selectUnitVal] = data.replace('../public', '');
                                    popupQRcode(qrcodeURLs[selectUnitVal]);
                                },
                                (e) => {
                                    $.alert(e);
                                }
                            );
                        }
                    });
                    
                    /* --------------------------- */
                    /*     Phone Number Filter     */
                    /* --------------------------- */
                    phoneNumberComponent = $('#phoneNumber-input');
                    phoneNumberComponent.on('input', () =>
                    {
                        let
                            filterData,
                            phoneNumber;

                        phoneNumber = phoneNumberComponent.val();
                        filterData = moduleManager.modules[currUnitIdx].filterData(
                        {
                            data: students,
                            phoneNumber: phoneNumber
                        });

                        setRollcallHtml(currUnitIdx, filterData || undefined);
                    });

                    /* ---------------------- */
                    /*     Save Roll Call     */
                    /* ---------------------- */
                    saveComponent = saveModule.getComponent();
                    saveComponent.on('click', () =>
                    {
                        let
                            modules,
                            modifiedModules,
                            canceledList,
                            redeemList,
                            today;

                        today = (new Date()).setHours(0, 0 , 0 ,0);
                        modules = moduleManager.val();
                        modifiedModules = [];

                        /*---- Find Modified Module data ----*/
                        Object.keys(modules).forEach((v) =>
                        {
                            if(modules[v].old_data)
                            {
                                let m = modules[v];
                                Object.keys(m.old_data).forEach((v2) =>
                                {
                                    if(m.attend_data[v2] != m.old_data[v2])
                                    {
                                        modifiedModules.push({l_id: l_id.value, u_id: v, m_id: v2, status: m.attend_data[v2].toString()})
                                    }
                                })
                            }
                        });

                        /*---- Find Cancelled List and Reddeem List, and Popup Confirm. ----*/
                        if(modifiedModules.length)
                        {
                            canceledList = modifiedModules.filter((elm) =>
                            {
                                return elm.status == 'false';
                            });

                            redeemList = modifiedModules.filter((elm) =>
                            { 
                                if(elm.status == 'true')
                                {
                                    let u_date;
                                    u_date = dropdownlistModule.getUnitDate(elm.u_id).split('/');
                                    u_date = (new Date(u_date[0], u_date[1] * 1 - 1, u_date[2])).getTime();
                                    return (u_date < today)
                                }
                            });

                            let confirmHtml = '';
                            if(canceledList.length)
                            {
                                confirmHtml += '<p class="pConfirm">取消以下點名</p>';
                                canceledList.forEach((elm) =>
                                {
                                    confirmHtml += ('<p class="pConfirm">' + dropdownlistModule.getUnitDate(elm.u_id) + ' ' + dropdownlistModule.getUnitStartTime(elm.u_id) + ' ' + getStudentNameAndAcc(elm.m_id) + '</p>');
                                });
                            }

                            
                            if(redeemList.length)
                            {
                                confirmHtml += (confirmHtml? '<p class="pConfirm"><br></p>' : '');
                                confirmHtml += '<p class="pConfirm">補點以下點名</p>';
                                redeemList.forEach((elm) =>
                                {
                                    confirmHtml += ('<p class="pConfirm">' + dropdownlistModule.getUnitDate(elm.u_id) + ' ' + dropdownlistModule.getUnitStartTime(elm.u_id) + ' ' + getStudentNameAndAcc(elm.m_id) + '</p>');
                                });
                            }


                            if(confirmHtml)
                            {
                                let $btnSet = $('<div>', {class: 'confirmBtnSet'});
                                $('<button>', {type: 'button', class: 'btn btn-success', text: '確認'}).on('click', () =>
                                {
                                    doSave(modifiedModules);
                                }).appendTo($btnSet);$('<button>', {type: 'button', class: 'btn btn-danger', text: '取消'}).on('click', () =>
                                {
                                    closePopup();
                                }).appendTo($btnSet);

                                // Close Rest Popup
                                closePopup();
            
                                // Create popup card
                                createPopup
                                ({
                                    close: true,
                                    body: confirmHtml,
                                    head: '確認執行',
                                    type: 'danger',
                                    tail: $btnSet
                                });
                            }
                            else
                            {
                                doSave(modifiedModules);
                            }
                        }
                    });

                    /* --------------------------------------------- */
                    /*     Do Save, and Process Datas after Save     */
                    /* --------------------------------------------- */
                    function doSave(modifiedModules){
                        saveModule.save(modifiedModules).then((saveReturn) =>
                        {
                            modules = moduleManager.val();
                            Object.keys(modules).forEach((v)=>
                            {
                                if(modules[v].old_data)
                                {
                                    let currReturnData = saveReturn.find((elm) => (elm.u_id == v))

                                    if(currReturnData && currReturnData.status > 201)
                                    {
                                        modules[v].attend_data[currReturnData.m_id] = false;
                                    }
                                    delete modules[v].old_data;
                                }
                            });
                            setRollcallHtml(currUnitIdx);
                        });

                    }

                    function setRollcallHtml(u_id, data)
                    {
                        let
                            setRollcallModule = moduleManager.modules[u_id],
                            rollcall_html     = '',
                            now               = new Date(),
                            currUnitDate      = dropdownlistModule.getUnitDate(u_id),
                            currUnitTime      = dropdownlistModule.getUnitStartTime(u_id),
                            currUnitDatetime,
                            isDisabled;

                        currUnitDate = currUnitDate.split('/');
                        currUnitTime = currUnitTime.split(':');
                        currUnitDatetime = new Date(currUnitDate[0], currUnitDate[1] * 1 - 1, currUnitDate[2], currUnitTime[0] * 1 - 1, currUnitTime[1]);
                        isDisabled = now.getTime() < currUnitDatetime;

                        if (data !== undefined) { rollcall_html = setRollcallModule.drawCardHTML(data, isDisabled); }
                        else {
                            rollcall_html = setRollcallModule.drawCardHTML(students, isDisabled);
                        }

                        setRollcallModule.renderHtml(rollcall_html);
                        switchQRcodeBtnDisplay();
                    }

                    // Hide QRcode Btn when Select the Unit before today.
                    function switchQRcodeBtnDisplay()
                    {
                        let 
                            today = (new Date()).setHours(0, 0, 0, 0),
                            currDate = dropdownlistModule.getUnitDate(currUnitIdx).split('/');
                            
                        currDate = (new Date(currDate[0], currDate[1] - 1, currDate[2])).getTime();
                        if(today > currDate)
                        {
                            allowQRcode = false;
                            btn_qrcode.hide();
                        }
                        else
                        {
                            allowQRcode = true;
                            btn_qrcode.show();
                        }
                    }

                    function getStudentNameAndAcc(m_id)
                    {
                        let student;

                        student = students.filter((v, k) =>
                        {
                            return v.m_id == m_id;
                        });
                        return student[0].nickname + '(' + student[0].account + ')';
                    }
                });

                /* --------------- */
                /*     QR Code     */
                /* --------------- */
                function popupQRcode(qrcodeUrl){

                    let
                        popup_body,
                        popup_head;

                    // Set popup head
                    popup_head = 'QR code 點名';

                    // Set popup body
                    popup_body = `<img class="imgQRcode" src="${qrcodeUrl}">`;

                    // Close Rest Popup
                    closePopup();

                    // Create popup card
                    createPopup
                    ({
                        close: true,
                        body: popup_body,
                        head: popup_head,
                        type: 'green'
                    })
                }
            });
        }
    });

    function dropdownlistModule(elementName, options)
    {
        let
            dropdownlistComponent,
            objThis,
            options_key,
            label_data_arr,
            dateUnitData;

        objThis = this;
        this.options_key = options_key = [];

        setComponent();

        function setComponent()
        {
            if (elementName === undefined) { elementName = 'select-u_id'}

            dropdownlistComponent = $('#' + elementName);
            objThis.dropdownlistComponent = dropdownlistComponent;

            if (dropdownlistComponent.length != 0) { setOptions(options); }
        }

        function setOptions(options)
        {
            const startRollCallHourBefore = 1;    // allow rollcalling at 1 hr before.

            let
                selectedIdx = -1,
                unitSelectedIdx = -1,
                flatData = [],
                selectedFlatIdx = -1,
                currFlatIdx = 0,

                now = new Date(),
                nowTimestamp = now.getTime(),
                todayTimestamp = now.setHours(0, 0, 0, 0);

            label_data_arr = [];
            dateUnitData = [];

            options.select_options.each((key, value) =>
            {
                let
                    find_data,
                    tmp_data,
                    label_data,
                    unit_label_data;

                tmp_data = $(value).find('label').text().replace(/\s/g, '');
                label_data = tmp_data.match(/\d{4}\/\d{2}\/\d{2}/)[0];
                unit_label_data = tmp_data.match(/\d{2}\:\d{2}/)[0];

                find_data = label_data_arr.find((val) =>
                {
                    if(val == label_data)
                    {
                        if(!dateUnitData.length)
                        {
                            dateUnitData.push([unit_label_data]);
                        }
                        else
                        {
                            dateUnitData[dateUnitData.length -1].push(unit_label_data);
                        }
                        return true;
                    }
                });

                if (find_data === undefined)
                {
                    label_data_arr.push(label_data);
                    dateUnitData.push([unit_label_data]);
                }
            });

            /*---- get unit start timestamp datas (minus 1 hour) ----*/
            dateUnitData.forEach((v1, k1) =>
            {
                let dayInfo = label_data_arr[k1].split('/');
                
                flatData[k1] = [];
                v1.forEach((v2, k2) =>
                {
                    let timeInfo = v2.split(':');
                    flatData[k1][k2] = (new Date(dayInfo[0], dayInfo[1] * 1 - 1, dayInfo[2], timeInfo[0] * 1 - startRollCallHourBefore, timeInfo[1], 0)).getTime();
                });
            });
            flatData = flatData.flat(2);
            for(let i = flatData.length -1; i >=0 ; i--)
            {
                if(nowTimestamp > flatData[i])
                {
                    selectedFlatIdx = i
                    break;
                }
            }

            // still not set default selected unit yet.
            if(selectedFlatIdx < 0){
                // all unit not start yet.
                if(flatData[0]> nowTimestamp)
                {
                    selectedFlatIdx = 0;
                }
                // all unit passed.
                else
                {
                    selectedFlatIdx = flatData.length -1;
                }
            }

            label_data_arr.forEach((value, key, arr) =>
            {
                let option = '';

                option = $(`<option value="${key}">${value}</option>`);

                /*---- find selected idx, if not found yet. ----*/
                if(selectedIdx < 0)
                {
                    dateUnitData[key].forEach((v, k) =>
                    {
                        if(selectedIdx < 0)
                        {
                            if(currFlatIdx == selectedFlatIdx)
                            {
                                selectedIdx = key;
                                unitSelectedIdx = k;
                                option.attr({selected: true});
                            }
                            else
                            {
                                currFlatIdx ++;
                            }
                        }
                    });
                }
                options.select_el.append(option);
                options_key.push(key);
            });

            drawUnitOption(selectedIdx, unitSelectedIdx);
        }

        function drawUnitOption(idx, selectedIdx){

            let
                num = dateUnitData[idx].length,
                bias = 0,
                $opt;

            if(!selectedIdx){ selectedIdx = 0; }
            // count number of units before this day
            $('#select-unit').html('');
            for(let i = 0; i< idx; i++)
            {
                bias += dateUnitData[i].length;
            }
            // if first day has 3 unit, value of first unit of second day is 4
            for(let i = 0; i< num; i++)
            {
                $opt = $('<option>', {value: i + bias + 1, text: dateUnitData[idx][i]});
                if(i == selectedIdx){ $opt.attr({'selected': 'selected'}); }
                $('#select-unit').append($opt);
            }
        }

        function getUnitNum(){
            return dateUnitData.flat(2).length;
        }

        function getUnitDate(u_id){
            let
                dateIdx;
            dateUnitData.some((value, key) =>
            {
                if((u_id -= value.length) <= 0)
                {
                    dateIdx = key;
                    return true;
                }
            });
            return label_data_arr[dateIdx]
        }
        
        function getUnitStartTime(u_id)
        {
            let tmpData = dateUnitData.flat(2);
            return tmpData[u_id-1];
        }

        return {
            drawUnitOption: drawUnitOption,
            getUnitNum: getUnitNum,
            getUnitDate: getUnitDate,
            getUnitStartTime: getUnitStartTime
        }
    }

    ;(function()
    {
        this.getComponent = function()
        {
            return this.dropdownlistComponent;
        };
        this.getKeys = function()
        {
            return this.options_key;
        };
        this.val = function()
        {
            return this.val;
        };
    }).call(dropdownlistModule.prototype);

    function moduleManager()
    {
        this.modules = {};
    }

    ;(function()
    {
        this.add = function(options)
        {
            if (options.module != undefined && options.name != undefined)
            {
                this.modules[options.name] = options.module;
            }
        };
        this.rm = function(key)
        {
            delete this.modules[key];
        };
        this.val = function(key = null)
        {
            if (key === null) { return this.modules; }
            else { return this.modules[key]; }
        };
    }).call(moduleManager.prototype);


    function rollcallUserModule(elementName, options)
    {
        let
            objThis,
            rollcallUserComponent;

        objThis = this;

        if (!options) { options = {} }

        setComponent();

        function setComponent()
        {
            if (elementName === undefined) { elementName = 'rollcall-user'}

            rollcallUserComponent = $('#' + elementName);

            if (rollcallUserComponent.length != 0) { setOptions(); }
        }

        function setOptions()
        {
            if (options.attend_data)
            {
                let card_list;

                objThis.setAttendData(options.attend_data);
            }

            if (options.u_id !== undefined || options.u_id !== null) { objThis.u_id = options.u_id; }
        }
    }

    ;(function()
    {
        this.drawCardHTML = function(data, isDisabled)
        {
            let
                card = '',
                html = $('<div class="card_list">'),
                objThis = this;

            data.forEach((value, key) =>
            {
                let attend;
                attend = objThis.attend_data ? (objThis.attend_data[value.m_id] || false) : false;

                card = $(`
                    <div class="card">
                        <div class="card-body user_list">
                            <div  class="user_key">${key + 1}</div>
                            <div class="user_datas">
                                <div class="user_datas__name">${value.nickname}</div>
                                <div class="user_datas__phoneNumber">${value.cellphone}</div>
                                <div class="user_datas__email">${value.email}</div>
                                <div class="user_datas__attend">
                                    <div>出席：</div>
                                    <label class="switch">
                                        <input type="checkbox" ${attend ? 'checked' : ''} ${isDisabled? 'disabled' : ''}>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>`);
                card.find('.switch').on('change', (e) =>
                {

                    if(!objThis.old_data)
                    {
                        objThis.old_data = {};
                    }
                    if(typeof objThis.old_data[value.m_id] != 'boolean')
                    {
                        objThis.old_data[value.m_id] = Boolean(objThis.attend_data[value.m_id]);
                    }


                    if (e.target.checked)
                    {
                        objThis.attend_data[value.m_id] = true;
                    }
                    else
                    {
                        objThis.attend_data[value.m_id] = false;
                    }
                });
                html.append(card);
            });

            return html;
        };
        this.filterData = function(options)
        {
            let filterData,
                regexObj;

            if (!options) { options = {}; }

            if (options.data && (options.phoneNumber || options.phoneNumber === 0))
            {
                regexObj = new RegExp(options.phoneNumber);
                filterData = options.data.filter(value =>
                {
                    return regexObj.test(value.cellphone);
                });
                return filterData;
            }
        };
        this.getComponent = function()
        {
            return this.rollcallUserComponent;
        };
        this.getAttendData = function()
        {
            return this.attend_data;
        };
        this.setAttendData = function(attend_data)
        {
            this.attend_data = attend_data;
        };
        this.sortData = function(options)
        {
            if (!options) { options = {}; }
        };
        this.renderHtml = function(html, el)
        {
            if (typeof el === 'string')
            {
                $('#' + el).html(html);
            }
            else
            {
                $('#rollcall-user').html(html);
            }
        }
    }).call(rollcallUserModule.prototype);

    function saveModule(elementName)
    {
        let
            saveComponent,
            objThis;

        objThis = this;

        setComponent();

        function setComponent()
        {
            if (elementName === undefined) { elementName = 'rollcall-save'}

            saveComponent = $('#' + elementName);
            objThis.saveComponent = saveComponent;
        }
    }

    (function()
    {
        this.getComponent = function()
        {
            return this.saveComponent;
        };
        this.save = function(data)
        {
            return rollcallModule.rollcall(data).then((snap) =>
            {
                let
                    alertData = {},
                    alertHtml = '',
                    returnDataAllFail = true;

                const statusMsg = {
                    '101': '課程補點',
                    '102': '取消點名',
                    '201': '點名重複',
                    '202': '無此點名紀錄',
                    '203': '該課程無此章節',
                    '204': '行政無法點名課程',
                    '205': '老師無法點名自己的課程',
                    '206': '該會員無購買此課程',
                    '207': '該課程今日沒有上課'
                };

                for(let v of snap)
                {
                    if(!alertData[v.status])
                    {
                        alertData[v.status] = [];
                    }
                    alertData[v.status].push(`${v.nickname} (${v.m_name}) ${dropdownlistModule.getUnitDate(v.u_id)} ${dropdownlistModule.getUnitStartTime(v.u_id)}`)
                    if(returnDataAllFail && v.status < 200){ returnDataAllFail = true; }
                };

                for(let k in alertData)
                {
                    alertHtml += `<p class="pRollcallException">${statusMsg[k]}</p>`;
                    alertHtml += '<ul class="ulRollcallException">';
                    for(let v1 of alertData[k])
                    {
                        alertHtml += `<li>${v1}</li>`;
                    }
                    alertHtml += '</ul>';
                }

                // Close Rest Popup
                closePopup();

                if(alertHtml)
                {
                    let headColor = 'yellow';
                    if(data.length > snap.length)
                    {
                        alertHtml += '<p class="pRollcallException">其餘同學皆點名成功。</p>';
                    }
                    else if(returnDataAllFail)
                    {
                        headColor = 'danger';
                    }

                    // Create popup card
                    createPopup
                    ({
                        close: true,
                        body: alertHtml,
                        head: '訊息',
                        type: headColor
                    });
                }
                else
                {
                    // Create popup card
                    createPopup
                    ({
                        close: true,
                        body: '點名成功',
                        type: 'green'
                    });
                }
                return snap;
            })
            .catch(e =>
            {
                // Close Rest Popup
                closePopup();

                // Create popup card
                createPopup
                ({
                    close: true,
                    body: e.status != 200? '連線伺服器不成功，請稍後再試。' : '',
                    type: 'danger'
                });
            });
        };
    }).call(saveModule.prototype);
}();
