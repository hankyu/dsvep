function imageUploadModule()
{
    this.imageUpload = function(files)
    {
        if (files)
        {
            let filter_length = files.length >= 10 ? 10 : files.length;

            for (var i = 0; i < filter_length; i++)
            {
                let image = files[i],
                    size  = image.size;

                if (size > 10485760)
                {
                    $.alert
                    ({
                        content: '圖片大小不可超過10MB',
                        title: '錯誤!'
                    });
                }
                else if (image.type.match(/(jpg|jpeg|png|gif)/) === null)
                {
                    $.alert
                    ({
                        content: '格式不支援',
                        title: '錯誤!'
                    });
                }
                else
                {
                    let form            = new FormData(),
                        imgur_client_ID = '8390218445c1276',
                        objThis         = this;

                    form.append('image', image);
                    $.ajax
                    ({
                        async: true,
                        crossDomain: true,
                        // url: 'localhost:3000',
                        url: 'https://api.imgur.com/3/image',
                        method: 'post',
                        headers:
                        {
                            'authorization': 'Client-ID ' + imgur_client_ID,
                        },
                        processData: false,
                        contentType: false,
                        mimeType: 'multipart/form-data',
                        data: form,
                        beforeSend: function()
                        {
                            objThis.imageUploading();
                        },
                        xhr: function()
                        {
                            let xhr = new window.XMLHttpRequest();
                            // Upload progress
                            xhr.upload.addEventListener("progress", function(evt)
                            {
                                if (evt.lengthComputable)
                                {
                                    let percent_complete = (evt.loaded / evt.total * 100).toFixed(2);
                                    // $('#image_url').val('上傳進度：' + percent_complete + '%');
                                    objThis.imageUploadingProgress(percent_complete);
                                }
                            }, false);
                            return xhr;
                        },
                    })
                    .done(function(response)
                    {
                        let pms = JSON.parse(response),
                            url = pms['data']['link'];

                        objThis.imageUploaded(url);
                    })
                }
            }
        }
    }

    this.imageUploaded = function(url)
    {
        // Custom
        // Do Something
    }

    this.imageUploading = function()
    {
        // Custom
        // Do Something
    }

    this.imageUploadingProgress = function(percent_complete)
    {
        // Custom
        // Do Something
    }

    this.imageUploadErr = function()
    {
        // Custom
        // Do Something
    }
}
