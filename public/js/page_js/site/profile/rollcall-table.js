// [Dependencies]
// JQuery 3.x
// rollcallModule

;(function()
{
    let
        rollcallTable,
        rollcall,
        mId = memberData.getMemberId();

    $(function()
    {
        rollcallTable = rollcallTableModule();

        if (rollcallModule)
        {
            let 
                select_options = $('.accordion-title'),
                rollcall = rollcallModule(),
                dateUnitData;

            dateUnitData = [];
            select_options.each((key, value) =>
            {
                let
                    find_data,
                    tmp_data,
                    label_data;

                tmp_data = $(value).find('label').text().replace(/\s/g, '');
                label_data = tmp_data.match(/\d{4}\/\d{2}\/\d{2}/)[0];
                unit_label_data = tmp_data.match(/\d{2}\:\d{2}/)[0];

                dateUnitData.push({u_id: key+1, date: label_data, stime: unit_label_data})
            });

            rollcall.getRollcall(mId).then((data) =>
            {
                let rollcall_data = data.unit_data;

                rollcall_data.forEach((v, k) =>
                {
                    dateUnitData.some((v1, k1) =>
                    {
                        if(v1.u_id == v.u_id){
                            v1.rollcall_time = v.rollcall_time.replace(/\-/g,'/');
                            return true;
                        }
                    });
                });
                $('#tableRollCall').append(rollcallTable.drawRollcallTable(dateUnitData));
            },
            () =>
            {
                
            });
        }
    });
})();