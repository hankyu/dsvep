;(function(){
    function getClassmate(){
        let l_id = $('#l_id').val();

        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
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
                success: (data) =>
                {
                    resolve(data);
                },
                error: (e) =>
                {
                    reject(e);
                }
            });
        });
    }

    $(function(){
        getClassmate().then((classmates) =>
        {
            let $tbodyClassmate = $('#tbodyClassmate');

            classmates.forEach((cm) =>
            {
                let $tr;

                $tr = $('<tr>').appendTo($tbodyClassmate);
                $tr.append($('<td>', {text: cm.nickname + '(' + cm.m_name + ')'}));
                $tr.append($('<td>', {text: cm.cellphone}));
                $tr.append($('<td>', {text: cm.email}));
            });
        },
        (e) =>
        {
            $.alert(e);
        });
    });
})();


