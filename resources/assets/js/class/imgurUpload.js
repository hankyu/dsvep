import $ from 'jquery'

export default function() {
    this.cID = '8390218445c1276'

    this.imageUpload = function(files) {
        if (files) {
            let filter_length = files.length >= 10 ? 10 : files.length

            for (var i = 0; i < filter_length; i++) {
                let image = files[i],
                    size = image.size

                if (size > 10485760) {
                    $.alert({
                        content: '圖片大小不可超過10MB',
                        title: '錯誤!'
                    })
                } else if (image.type.match(/(jpg|jpeg|png|gif)/) === null) {
                    $.alert({
                        content: '格式不支援',
                        title: '錯誤!'
                    })
                } else {
                    let form = new FormData(),
                        // imgur_client_ID = '',
                        objThis = this

                    form.append('image', image)
                    $.ajax({
                        async: true,
                        crossDomain: true,
                        // url: 'localhost:3000',
                        url: 'https://api.imgur.com/3/image',
                        method: 'post',
                        headers: {
                            authorization: 'Client-ID ' + this.cID
                        },
                        processData: false,
                        contentType: false,
                        mimeType: 'multipart/form-data',
                        data: form,
                        beforeSend: function() {
                            objThis.imageUploading()
                        },
                        xhr: function() {
                            let xhr = new window.XMLHttpRequest()
                            // Upload progress
                            xhr.upload.addEventListener(
                                'progress',
                                function(evt) {
                                    if (evt.lengthComputable) {
                                        let percent_complete = (
                                            (evt.loaded / evt.total) *
                                            100
                                        ).toFixed(2)
                                        // $('#image_url').val('上傳進度：' + percent_complete + '%');
                                        objThis.imageUploadingProgress(percent_complete)
                                    }
                                },
                                false
                            )
                            return xhr
                        }
                    }).done(function(response) {
                        let pms = JSON.parse(response),
                            url = pms['data']['link']

                        objThis.imageUploaded(url)
                    })
                }
            }
        }
    }

    this.imageUpload2 = function(files) {
        let requests,
            formDatas = [],
            // imgur_client_ID = '',
            objThis = this

        for (let i = 0, j = files.length; i < j; i++) {
            let file = files[i],
                size = file.size

            if (size > 10485760) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    messageMode: true,
                    api: JS_CONFIG.TERMS.IMG_TOO_BIG.replace('FILE_NAME', file.name),
                    isError: true
                })
            } else if (file.type.match(/(jpg|jpeg|png|gif)/i) === null) {
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    messageMode: true,
                    api: JS_CONFIG.TERMS.IMG_WRONG_FORMAT.replace('FILE_NAME', file.name),
                    isError: true
                })
            } else {
                let formData = new FormData()
                formData.append('image', file)
                formDatas.push(formData)
            }
        }

        requests = formDatas.map(formData => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: 'https://api.imgur.com/3/image',
                    method: 'post',
                    headers: {
                        authorization: 'Client-ID ' + this.cID
                    },
                    processData: false,
                    contentType: false,
                    mimeType: 'multipart/form-data',
                    data: formData,
                    xhr: function() {
                        let xhr = new window.XMLHttpRequest()
                        // Upload progress
                        xhr.upload.addEventListener(
                            'progress',
                            function(evt) {
                                if (evt.lengthComputable) {
                                    let percent_complete = Math.ceil((evt.loaded / evt.total) * 100)
                                    objThis.imageUploadingProgress(percent_complete)
                                }
                            },
                            false
                        )
                        return xhr
                    }
                }).done(function(response) {
                    resolve(response)
                })
            })
        })

        Promise.all(requests).then(responses => {
            responses.forEach(response => {
                let pms = JSON.parse(response),
                    url = pms['data']['link'],
                    deletehash = pms['data']['deletehash']
                this.imageUploaded(url, deletehash)
            })
            this.imageAllUploaded()
        })
    }

    this.imageAllUploaded = function() {
        // Custom
        // Do Something
    }

    this.imageUploaded = function(url) {
        // Custom
        // Do Something
    }

    this.imageUploading = function() {
        // Custom
        // Do Something
    }

    this.imageUploadingProgress = function(percent_complete) {
        // Custom
        // Do Something
    }

    this.imageUploadErr = function() {
        // Custom
        // Do Something
    }

    this.deleteImage = function(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                async: true,
                crossDomain: true,
                url: 'https://api.imgur.com/3/image/' + id,
                // method: 'DELETE',
                type: 'DELETE',
                headers: {
                    authorization: 'Client-ID ' + this.cID
                },
                processData: false,
                contentType: false,
                data: { id }
            }).done(function(response) {
                console.log('response', response)
                resolve(response)
            })
        })
    }
}
