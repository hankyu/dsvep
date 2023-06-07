function rollcallModule()
{
    let lesson_id = l_id.value;

    function cancelRollcall(data)
    {
        return new Promise((resolve, reject) =>
        {
            resolve('姆咪的出席已取消');

            $.ajax
            ({
                type: 'GET',
                url: '/ajax/',
                dataType: 'json',
                async: false,
                data:
                {
                    data
                },
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(data)
                {
                    resolve(data.data);
                },
                error: function(e)
                {
                    reject(e);
                }
            });
        });
    }

    function getStudents()
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'post',
                url: '/ajax/getLessonClassmate',
                dataType: 'json',
                data:
                {
                    l_id: lesson_id
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

    function getRollcall(m_id)
    {
        return new Promise((resolve, reject) =>
        {
            let postData = { l_id: lesson_id};
            if(m_id){ postData.m_id = m_id; }

            $.ajax
            ({
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
                    resolve(data);
                },
                error: function(e)
                {
                    reject(e);
                }
            });
        });
    }

    function rollcall(data)
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'post',
                url: '/ajax/sendRollcallData',
                dataType: 'json',
                data:
                {
                    rollcall_data: data
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

    return {
        cancelRollcall: cancelRollcall,
        getStudents: getStudents,
        getRollcall: getRollcall,
        rollcall: rollcall
    }
}
