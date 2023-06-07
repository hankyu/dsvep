export default function() {
    function QaClearHTML(html) {
        let determine_html = ``,
            split_arr

        html = html.replace(/<(?!br|p)[^>]*>/g, '')
        html = html.replace(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
            match => {
                let match_arr
                // Determine https
                match = (/^(?:http(s)?:\/\/)/g.test(match) ? '' : 'https://') + match
                match_arr = match.match(/.(jpg|jpeg|png|gif)$/g)
                if (match_arr != null && match_arr.length != 0) {
                    return `
                    <a target="_blank" rel="noopener noreferrer" href="${match}">
                        <img src="${match}">
                    </a>`
                } else {
                    return `
                    <a target="_blank" rel="noopener noreferrer" href="${match}">
                        ${match}
                    </a>`
                }
            }
        )
        split_arr = html.split(/<p>/g)
        split_arr.forEach((value, key) => {
            if (value !== '') {
                determine_html += `<div>${value}</div>`
            }
        })
        return determine_html
    }

    function removeAllTag(text) {
        let re = /<[^><]*>/gi
        return text.replace(re, '')
    }

    function QaPreventConflict(text) {
        let re = /<p>/gi
        return text.replace(re, '&lt;p&gt;')
    }

    function QaClearText(html) {
        let determine_html = html,
            wrap_string_count = 0

        // Remove Superfluous Space
        determine_html = determine_html.replace(/\n/g, '')
        // Remove Space String Before Div Tag
        determine_html = determine_html.replace(/[ ]*<div>/g, '<p>')
        // Remove Space String After Div Tag
        determine_html = determine_html.replace(/<\/div>[ ]*/g, '<p>')
        // Determine URL Of Img Tag
        determine_html = determine_html.replace(/<img[^>]*>/g, match => {
            let img_url = ''

            match.split(/"/g).forEach((value, key, arr) => {
                if (
                    /src=$/gi.test(value) &&
                    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(
                        arr[key + 1]
                    )
                ) {
                    img_url = arr[key + 1]
                }
            })

            return '<p>' + img_url + '<p>'
        })
        // Determine URL Of A Tag
        determine_html = determine_html.replace(/<a[^>]*>[^<]*<\/a>/g, match => {
            let link_url = ''

            link_url = match.replace(/<\/?a[^>]*>/g, '')

            return '<p>' + link_url + '<p>'
        })
        determine_html = determine_html.replace(/<(?!br|p)[^>]*>/g, '')
        determine_html = determine_html.replace(/<br>/g, '<p><br><p>')
        determine_html = determine_html.replace(/(<p>){2,}/g, '<p>')
        determine_html = determine_html.replace(/^<p>/g, '')
        determine_html = determine_html.replace(/<p>$/g, '')

        return determine_html
    }

    function QaNotificationClearHTML(html) {
        return html.replace(/<p>/gi, ' ')
    }

    return {
        QaClearHTML: function(html) {
            return QaClearHTML(html)
        },
        QaClearText: function(html) {
            return QaClearText(html)
        },
        QaNotificationClearHTML: function(html) {
            return QaNotificationClearHTML(html)
        },
        removeAllTag: removeAllTag,
        QaPreventConflict: QaPreventConflict
    }
}
