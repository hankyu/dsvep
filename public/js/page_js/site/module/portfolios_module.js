function portfoliosModule()
{
    function changePortfolios(portfolios)
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'post',
                url: '/ajax/changeTeacherPortfolios',
                dataType: 'json',
                async: false,
                data:
                {
                    t_id: window.location.pathname.replace(/[^0-9]/g, ''),
                    portfolios: portfolios
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

    function getPortfolios()
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                type: 'GET',
                url: '/ajax/getTeacherPortfolios',
                dataType: 'json',
                async: false,
                data:
                {
                    t_id: window.location.pathname.replace(/[^0-9]/g, '')
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

    return {
        changePortfolios: function(portfolios)
        {
            return new Promise((resolve, reject) =>
            {
                changePortfolios(portfolios).then((data) =>
                {
                    resolve(data);
                })
                .catch((e) =>
                {
                    reject(e);
                });
            });
        },
        getPortfolios: function()
        {
            return new Promise((resolve, reject) =>
            {
                getPortfolios().then((data) =>
                {
                    resolve(data);
                })
                .catch((e) =>
                {
                    reject(e);
                });
            });
        }
    }
}
