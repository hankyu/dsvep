function checkbox_module()
{
    let init              = false,
        selectArr         = [],
        selectChangeClass = false,
        selectMax         = 0,
        selectSum         = 0;

    return {
        addArray: function(str)
        {
            if (init && Array.isArray(selectArr)){ selectArr.push(String(str)); }
        },
        getArray: function()
        {
            if (init) { return selectArr; }
        },
        getSelectArray: function()
        {
            if (init)
            {
                let resultArr = [];

                $.each(selectArr, (key, value) =>
                {
                    if (value[1] === true) { resultArr.push(value[0]); }
                });

                return resultArr;
            }
        },
        initArray: function(arr = [], { changeClass = false, max = 0 })
        {
            init = true;
            selectChangeClass = changeClass;
            selectMax = max;
            selectSum = 0;

            $.each(arr, (key, value) =>
            {
                selectArr[key] = [];
                selectArr[key].push(value);
                selectArr[key].push(false);
            });
        },
        selectCheckbox: function(el, num)
        {
            if (init)
            {
                if (selectArr[num][1] === true)
                {
                    selectSum--;
                    selectArr[num][1] = false;
                    $(el).toggleClass('select');
                }
                else if (selectSum < selectMax && selectChangeClass)
                {
                    selectSum++;
                    selectArr[num][1] = true;
                    $(el).toggleClass('select');
                }
            }
        }
    }
}
