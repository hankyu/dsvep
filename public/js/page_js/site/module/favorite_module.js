function favoriteModule()
{
    function addFavorite(l_id)
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'POST',
                url: '/ajax/addFavorite',
                dataType: 'json',
                async: false,
                data:
                {
                    l_id: l_id
                },
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(message)
                {
                    resolve(message);
                },
                error: function()
                {
                    layout._request_relogin();
                }
            })
        })
    }

    function cancelFavorite(l_id)
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'POST',
                url: '/ajax/cancelFavorite',
                dataType: 'json',
                async: false,
                data:
                {
                    l_id: l_id
                },
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success: function(message)
                {
                    resolve(message);
                },
                error: function()
                {
                    layout._request_relogin();
                }
            })
        })
    }

    return {
        addFavorite: function(l_id = null)
        {
            if (l_id != null)
            {
                return new Promise((resolve, reject) =>
                {
                    addFavorite(l_id).then(value =>
                    {
                        resolve(value);
                    });
                });
            }
            else { return Promise.resolve('error'); }
        },
        cancelFavorite: function(l_id = null)
        {
            if (l_id != null)
            {
                return new Promise((resolve, reject) =>
                {
                    cancelFavorite(l_id).then(value =>
                    {
                        resolve(value);
                    });
                });
            }
            else { return Promise.resolve('error'); }
        }
    }
}
