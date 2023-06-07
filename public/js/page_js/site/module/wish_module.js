function wishModule()
{
    this.getOwnWishing = function()
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                url: '/ajax/getOwnWishData',
                type: 'get',
                async: false,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success(data)
                {
                    resolve(data);
                }
            });
        });
    }

    this.getOwnWishingImg = function(album)
    {
        return new Promise((resolve, reject) =>
        {
            if (album != null)
            {
                $.ajax
                ({
                    url: '/ajax/getWishImage',
                    type: 'post',
                    async: true,
                    data:
                    {
                        album: album
                    },
                    headers:
                    {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    },
                    success(data)
                    {
                        resolve(data);
                    }
                });
            }
            else { resolve(''); }
        });
    }

    this.getAllWishing = function()
    {
        return new Promise((resolve, reject) =>
        {
            $.ajax
            ({
                url: '/ajax/getAllWishData',
                type: 'get',
                async: false,
                headers:
                {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success(data)
                {
                    resolve(data);
                }
            });
        });
    }
}
