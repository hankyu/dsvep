function rwdHashTableModule(customize)
{
    let
        defaultSetting = {
            container: '#tableContainer',
            pageSwitchMode: true,
            withSearcher: true,
            searchTiming: 0,  // 0: onchange, 1: onkeyup
            searchCaseSensitive: 1, // 0: unsensitive, 1: sensitive,
            searchBy_RE: false,
            RESearchswitcher: true,
            sortMode: true,
            to1stPageAfterSort: true,
            rowPerPage: 10,
            defaultTextAlign: 'center',
            noDataTerm: 'No Data.',
            rwdMode: 0,
            rwdMode1MinCols: 2,
            resizeDelay: 50,
            rowsPerPageOptions: [10, 20, 0],
            currRowsPerPageOptionsIdx: 0
        },
        settings,
        columnInfos,
        columnLength,
        totalRow,
        page,
        totalPage,
        tableData,
        searchKeyword,
        searchedData,
        $container,
        $containerSlider,
        $inputSearch,
        $table,
        $tbody,
        $btnNext,
        $btnPrev,
        $inputCurrPage,
        $spnTotalPage,
        $totalRow,
        drawing = false,
        sortInfo = {key:'', desc: false},
        wrdMode1FoldedColumnNum,
        resizeTimeoutId;


    /* ---------- */
    /*    Data    */
    /* ---------- */
    function setData(d)
    {
        let columnInfos = settings.columnInfos;


        tableData = $.extend(true, [], d);

        /*----- 加入searchKey屬性 -----*/
        tableData.forEach(function(elm, row_idx){
            for(let i = 0; i < columnLength; i++)
            {
                if(columnInfos[i].customKey && settings.columnCustomFn && settings.columnCustomFn[i])
                {
                    let
                        customizeContent = settings.columnCustomFn[i](elm, row_idx),
                        customizeContentType = typeof customizeContent;


                    if(customizeContentType == 'string' || customizeContentType == 'number')
                    {
                        elm[columnInfos[i].customKey] = customizeContent;
                    }
                }
            }

        });
        refleshRowNum(tableData.length);
        drawTable(true);
    }

    function pushData(d)
    {   
        let newData = $.extend(true, [], d);
        tableData.push(newData);
        refleshRowNum(tableData.length);
        drawTable();
    }


    /* ---------------- */
    /*    Draw Table    */
    /* ---------------- */
    function drawTable(clearRows)
    {
        let
            currData = searchKeyword ? searchedData : tableData,
            startIdx,
            dataBoundary;
        
        switchDrawingStatus(true);
        
        if(clearRows){ clearDataRows();}

        if(settings.pageSwitchMode && settings.rowPerPage != 0)
        {
            startIdx = page * settings.rowPerPage;
            dataBoundary = startIdx + settings.rowPerPage;
            totalPage = Math.ceil(currData.length / settings.rowPerPage);
            $spnTotalPage.text(totalPage);
        }
        else
        {
            startIdx = 0;
            dataBoundary = currData.length;
        }

        if(currData.length == 0){
            let $tr = $('<tr>').appendTo($tbody),
                $td = $('<td>', {text: settings.noDataTerm, colSpan: columnLength}).addClass('rwdTableModule__td').addClass('rwdTableModule__noData').appendTo($tr);
        }
        else
        {
            for(let i = startIdx; i < dataBoundary; i++)
            {
                let 
                    $tr = $('<tr>').addClass('rwdTableModule__tr'),
                    $td;

                if(settings.rwdMode == 1)
                {
                    $tr.attr({'data-idx': i});
                }
    
                for(let ii = 0; ii<columnLength; ii++){
                    if(i >= currData.length){
                        tableDrawingFinish();
                        return;
                    }
                    $td = drawColumnContent(currData, i, ii, 0);
                    $tr.append($td);
                }
                $tr.appendTo($tbody);
            };
        }
        tableDrawingFinish();
    }

    function tableDrawingFinish(){
        modifyPageBtnStatus();
        switchDrawingStatus(false);
        resize();
    }

    function drawColumnContent(currData, row_idx, column_idx, mode)
    {
        let
            elm = currData[row_idx],
            $return,
            columnText,
            columnInfos = settings.columnInfos;

        switch(mode)
        {
            case 0:
                if(settings.columnCustomFn && settings.columnCustomFn[column_idx])
                {
                    let customizeContent = settings.columnCustomFn[column_idx](elm, row_idx);
                    $return = $('<td>').addClass('rwdTableModule__td').addClass('text-' + (columnInfos[column_idx].textAlign? columnInfos[column_idx].textAlign : settings.defaultTextAlign)).append(customizeContent);
                }
                else
                {
                    columnText = elm[columnInfos[column_idx].columnKey];
                    $return = $('<td>', {text: typeof(columnText) != 'undefined' ? columnText : ''}).addClass('rwdTableModule__td').addClass('text-' + (columnInfos[column_idx].textAlign? columnInfos[column_idx].textAlign : settings.defaultTextAlign));
                }

                // render fold btn, rwdMode 1.
                if(settings.rwdMode == 1 && column_idx == 0)
                {
                    $return.append($('<button>', {type: 'button'}).addClass('rwdTableModule__foldBtn').on('click',function(){
                        let $foldBtn = $(this);
                        $foldBtn.parent().parent().toggleClass('opened');
                    }));
                }

                // Don't let first Column be foldable, because Fold Button is in there.
                if(column_idx != 0 && settings.rwdMode == 1 && !columnInfos[column_idx].freeze)
                {
                    $return.addClass('tightenedColumn-foldable');
                }
                break;


            case 1:
                $return = $('<div>').addClass('rwdTableModule__foldable_div');
                $return.append($('<span>', {text: columnInfos[column_idx].headTerm + ': '}));
                if(settings.columnCustomFn && settings.columnCustomFn[column_idx])
                {
                    $return.append(settings.columnCustomFn[column_idx](elm, row_idx));
                }
                else
                {
                    columnText = elm[columnInfos[column_idx].columnKey];
                    $return.append($('<span>', {text: typeof(columnText) != 'undefined' ? columnText : ''}));
                }
                break;
        }

        return $return;
        
    }

    function switchDrawingStatus(bool){
        drawing = bool;
    }

    function clearDataRows()
    {
        $tbody.html('');
    }

    function refleshRowNum(n)
    {
        totalRow = n * 1;
        $totalRow.text(n);
    }


    /* ------------------- */
    /*    Page Switcher    */
    /* ------------------- */
    function modifyPageBtnStatus(){
        if(!settings.pageSwitchMode)
        {
            return;
        }
        if(page >= totalPage -1)
        {
            page = totalPage -1;
            $btnNext.attr({disabled: true});
        }
        else
        {
            $btnNext.attr({disabled: false});
        }
        if(page <= 0)
        {
            page = 0;
            $btnPrev.attr({disabled: true});
        }
        else
        {
            $btnPrev.attr({disabled: false});
        }
        $inputCurrPage.val(page + 1);
    }

    function changePage(p, textInput)
    {
        if(p == page){
            return;
        }

        /*---- direct type in page Input ----*/
        if(textInput){
            if(!p.toString().match(/^\d*$/g))
            {
                textInput.value = page +1;
                return;
            }
        }
        page = p;
        if(textInput)
        {
            modifyPageBtnStatus();
        }
        drawTable(true);
    }

    function _escape_html_no_br(text)
    {
        //Transform Escape Char to Encode Char Besides New Line Char
        var map =
        {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        text = text.replace(/[&<>"']/g, function(m) { return map[m]; });
        return text;
    }


    /* ------------------- */
    /*    Rows Per Page    */
    /* ------------------- */
    function changeRowsPerPage(n){
        n = n * 1;
        
        if(page == 0 && n > totalRow && settings.rowPerPage > totalRow )
        {
            settings.rowPerPage = n;
            return;
        }

        settings.rowPerPage = n;
        page = 0;
        drawTable(true);
    }


    /* ---------- */
    /*    Sort    */
    /* ---------- */
    function sortBy(key, th)
    {
        let
            $th,
            currData,
            colIdx;

        page = 0;
        if(sortInfo.key == key)
        {
            sortInfo.desc = !sortInfo.desc;
        }
        else
        {
            sortInfo.key = key;
            sortInfo.desc = false;
        }

        $th = $(th).addClass('rwdTableModule__th--sorting');
        colIdx = $th.get(0).dataset.colidx;
        $th.siblings().removeClass('rwdTableModule__th--sorting').removeClass('rwdTableModule__th--sorting-desc');

        if(sortInfo.desc)
        {
            $th.addClass('rwdTableModule__th--sorting-desc');
        }
        else
        {
            $th.removeClass('rwdTableModule__th--sorting-desc');
        }

        currData = searchKeyword ? searchedData : tableData;
        currData.sort(function(a, b) {
            if(settings.columnInfos[colIdx].sortMode){
                switch(settings.columnInfos[colIdx].sortMode)
                {
                    case 1: // 強制 以字串比較
                        a = new String(a[sortInfo.key]);
                        b = new String(b[sortInfo.key]);

                        if (a > b) {
                            return sortInfo.desc? -1 : 1;
                        }
                        if (a < b) {
                            return sortInfo.desc? 1 : -1;
                        }
                        return 0;
                        break;
                    case 2: // localeCompare
                        a = new String(a[sortInfo.key]);
                        b = new String(b[sortInfo.key]);
                        return a.localeCompare(b);
                        break;
                }
            }
            else
            {
                if (a[sortInfo.key] > b[sortInfo.key]) {
                return sortInfo.desc? -1 : 1;
                }
                if (a[sortInfo.key] < b[sortInfo.key]) {
                return sortInfo.desc? 1 : -1;
                }
                return 0;
            }
        });

        drawTable(true);
        
    }


    /* ------------ */
    /*    Search    */
    /* ------------ */
    function switchRESearch(){
        settings.searchBy_RE = !settings.searchBy_RE;
        if(searchKeyword){
            searching(searchKeyword);
        }
    }

    function searching(sk)
    {
        // hash controll
        if(settings.hashController)
        {
            settings.hashController.setHash(sk);
        }

        if(!sk)
        {
            page = 0;
            searchKeyword = '';
            refleshRowNum(tableData.length);
        }
        else
        {
            let 
                re,
                reStr;

            // init search
            page = 0;
            searchKeyword = sk;
            searchedData = [];


            // Regular Expression Search
            if(settings.searchBy_RE)
            {
                reStr = sk;
            }

            // NOT Regular Expression Search
            else
            {
                // RE Special Characters
                const specialCharacters = '\\^$*+?.()|{}[]'
                // const reSpecialCharacters = /[\+\^\$]/g;
                const reSpecialCharacters = new RegExp('[' + specialCharacters.replace(/./g,'\\$&') + ']','g');

                // make search R.E. string, process RE Special Characters
                reStr = sk.replace(reSpecialCharacters,'\\$&');
            }
            re = new RegExp(reStr, settings.searchCaseSensitive? '' : 'i');

            searchedData = tableData.filter(function(elm){
                for(let i = 0; i < columnLength; i++){
                    let str;


                    if(!columnInfos[i].columnKey && !columnInfos[i].customKey){
                        continue;
                    }
                    if(columnInfos[i].customKey && elm[columnInfos[i].customKey])
                    {
                        str = elm[columnInfos[i].customKey];
                    }
                    else
                    {
                        str = elm[columnInfos[i].columnKey];
                    }
                    str += '';

                    if(str.search(re) >= 0)
                    {
                        return true;
                    }
                }
                return false;
            });
            refleshRowNum(searchedData.length);
        }
        drawTable(true);
    }





    /* ------------- */
    /*    Initial    */
    /* ------------- */
    function init()
    {
        let
            $rwdTableModuleHeader,
            $rowsPerPageGroup,
            $rowsPerPageSelector,
            $spanSearch,
            $options,
            $rwdTableModuleFooter,
            $totalRowDesc,
            $pageGroup,
            $thead,
            $th,
            $tr;
        

        // variable initial
        searchKeyword   = '';
        page            = 0;

        // settings customize
        settings        = $.extend(true, defaultSetting, customize);

        // column infos
        columnInfos     = settings.columnInfos;
        columnLength    = columnInfos.length;

        $container      = $(settings.container);

        // header
        $rwdTableModuleHeader = $('<div>')
        .addClass('rwdTableModule__header')
        .appendTo($container);
        $rowsPerPageGroup = $('<div>',{class: 'rwdTableModule__rowsPerPageGroup'}).appendTo($rwdTableModuleHeader);
        $rowsPerPageGroup.append('每頁筆數：');
        $rowsPerPageSelector = $('<select>').appendTo($rowsPerPageGroup).on('change',function(){
            changeRowsPerPage(this.value);
        });
        settings.rowsPerPageOptions.forEach(function(n, idx){
            $('<option>', {value: n, text: (n ? n : '全部'), selected:(idx == settings.currRowsPerPageOptionsIdx)}).appendTo($rowsPerPageSelector);
        });
        settings.rowPerPage = settings.rowsPerPageOptions[settings.currRowsPerPageOptionsIdx];

        // search
        if(settings.withSearcher)
        {
            $spanSearch = $('<span>', {class:'rwdTableModule__spnSearch'}).appendTo($rwdTableModuleHeader);

            // Regular Expression Search Switcher
            if(settings.RESearchswitcher)
            {
                $spanSearch.append('( ');
                $('<input>', {type: 'checkbox', checked: (settings.searchBy_RE)})
                .on('change',function(){
                    switchRESearch();
                })
                .appendTo($spanSearch);
                $spanSearch.append(' R.E. ) ');
            }
            $('<span>',{text: 'Search:'}).appendTo($spanSearch);
            $inputSearch = $('<input>', {class:'rwdTableModule__inputSearch', type: 'text'}).on(settings.searchTiming? 'keyup' : 'change',function(){
                searching(this.value);
            }).appendTo($spanSearch);
        }


        // slider and table
        $containerSlider    = $('<div>').addClass('rwdTableModule__containerSlider').addClass('rwdTableModule__containerSlider-rwdMode-' + settings.rwdMode).appendTo($container);
        $table          = $('<table>').addClass('rwdTableModule__table').appendTo($containerSlider);

        // thead
        $thead = $('<thead>').appendTo($table);
        $tr = $('<tr>').addClass('rwdTableModule__tr').appendTo($thead);
        columnInfos.forEach(function(elm, idx){
            let columnInfo = elm;
            $th = $('<th>', {text: typeof(columnInfo.headTerm) != 'undefined'? columnInfo.headTerm : '', 'data-Colidx': idx})
            .addClass('rwdTableModule__th');


            if(columnInfo.columnKey || columnInfo.customKey)
            {
                $th.addClass('rwdTableModule__th--sortable').on('click',function(){
                    sortBy(columnInfo.customKey? columnInfo.customKey : columnInfo.columnKey, this);
                });
            }

            // Don't let first Column be foldable, because Fold Button is in there.
            if(idx != 0 && settings.rwdMode == 1 && !settings.columnInfos[idx].freeze)
            {
                $th.addClass('tightenedColumn-foldable');
            }
            $th.appendTo($tr);
        });

        $tbody = $('<tbody>').appendTo($table);

        $rwdTableModuleFooter = $('<div>')
        .addClass('rwdTableModule__footer')
        .appendTo($container);

        // show total data row number
        $totalRowDesc = $('<span></span>').addClass('rwdTableModule__totalRowDesc').appendTo($rwdTableModuleFooter);
        if(settings.pageSwitchMode){ $totalRowDesc.addClass('rwdTableModule__totalRowDesc--pageMode')}
        $totalRow = $('<span>', {id: 'totalRow'});
        $totalRowDesc.append('共 ');
        $spnTotalPage = $('<span>').appendTo($totalRowDesc);
        $totalRowDesc.append(' 頁（ ');
        $totalRowDesc.append($totalRow);
        $totalRowDesc.append(' 筆）');

        if(settings.pageSwitchMode)
        {
            $pageGroup = $('<div>', {class:"rwdTableModule__page_group"}).appendTo($rwdTableModuleFooter);
            // Prev Page Btn
            $btnPrev = $('<button>',{type:'button', class:'btnPrev', text: 'Prev', disabled: true})
                .on('click', function(){
                    changePage(page - 1);
                })
                .appendTo($pageGroup);

            // page info
            $inputCurrPage = $('<input>', {class:'rwdTableModule__inputCurrPage', value: 1})
                .on('change', function(){
                    changePage(this.value - 1, this);
                })
                .appendTo($pageGroup);

            // Next Page Btn
            $btnNext = $('<button>',{type:'button', class:'btnNext', text: 'Next'})
                .addClass('btnNext')
                .on('click', function(){
                    changePage(page + 1);
                })
                .appendTo($pageGroup);
        }

        resize();
    }

    function initHash(hash){
        if(hash)
        {
            hash = decodeURI(hash);
            $inputSearch.val(hash);
            searching(hash);
        }
    }

    init();


    /* ---------------- */
    /*    rwd Resize    */
    /* ---------------- */
    function resize()
    {
        if(resizeTimeoutId){ clearTimeout(resizeTimeoutId)}
        resizeTimeoutId = setTimeout(doResize, settings.resizeDelay);
    }
    
    function doResize()
    {
        if(settings.rwdMode == 1)
        {
            let
                currData = searchKeyword ? searchedData : tableData,
                $rwdTableModuleTR_thead = $table.find('thead .rwdTableModule__tr'),
                $rwdTableModuleTR_tbody = $table.find('tbody .rwdTableModule__tr');


            // initial to no tighten
            $table.find('.rwdTableModule__foldable_tr').remove();
            $table.find('.tightenedColumn-foldable-hidden').addClass('tightenedColumn-foldable').removeClass('tightenedColumn-foldable-hidden');
            wrdMode1FoldedColumnNum = 0;
            $containerSlider.removeClass('tighten');



            // check if need tighten
            while($containerSlider.width() < $table.width()){

                let
                    currColIdx,
                    $foldingCol,
                    colspan;


                // one column don't folded at least
                if(columnLength - wrdMode1FoldedColumnNum == 1){
                    return;
                }

                wrdMode1FoldedColumnNum++;
                colspan = columnLength - wrdMode1FoldedColumnNum;
                $containerSlider.addClass('tighten');
                
                $foldingCol = $rwdTableModuleTR_thead.find('.tightenedColumn-foldable').last();

                // no column can be folded any more
                if($foldingCol.length == 0){ return;}

                $foldingCol.addClass('tightenedColumn-foldable-hidden').removeClass('tightenedColumn-foldable');
                currColIdx = $foldingCol.get(0).dataset.colidx;

                


                $rwdTableModuleTR_tbody.each(function(){
                    let
                        $thisTR = $(this),
                        $foldableTR,
                        $foldableTD;


                    $thisTR.find('.tightenedColumn-foldable').last().addClass('tightenedColumn-foldable-hidden').removeClass('tightenedColumn-foldable');
                    if($thisTR.next().hasClass('rwdTableModule__foldable_tr')){
                        $foldableTR = $thisTR.next();
                        $foldableTD = $foldableTR.find('td').eq(0).attr({colSpan: colspan});
                        $foldableTD.children().first().before(drawColumnContent(currData, this.dataset.idx, currColIdx, 1));
                    }else{
                        $foldableTR = $('<tr>').addClass('rwdTableModule__foldable_tr');
                        $foldableTD = $('<td>').attr({colSpan: colspan}).appendTo($foldableTR);
                        $foldableTD.append(drawColumnContent(currData, this.dataset.idx, currColIdx, 1));
                    }
                    $thisTR.after($foldableTR);
                });
            }
        }
    }

    $(window).resize(function(){
        resize();
    });
    
    
    /* ------------ */
    /*    Return    */
    /* ------------ */
    return {
        setData: setData,
        pushData: pushData,
        initHash: initHash
    }
}