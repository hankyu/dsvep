export const COOKIE_KIT = {
    setCookie(name, value, options = {}) {
        /* options = {
            //   path: '/',
            // add other defaults here if necessary
            ...options
        } */

        if (options.expires && options.expires.toUTCString) {
            options.expires = options.expires.toUTCString()
        }

        let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

        for (let optionKey in options) {
            updatedCookie += '; ' + optionKey
            let optionValue = options[optionKey]
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue
            }
        }

        document.cookie = updatedCookie
    },
    getCookie(name) {
        let matches = document.cookie.match(
            new RegExp(
                '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
            )
        )
        return matches ? decodeURIComponent(matches[1]) : undefined
    },
    deleteCookie(name) {
        this.setCookie(name, '', {
            'max-age': -1
        })
    },
    deleteAllCookies(Only) {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
        if (keys) {
            keys.forEach(key => {
                document.cookie = key + '=0;expires=' + new Date(0).toUTCString()
            })
        }
    },

    deleteAllCookiesBesides(besides) {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
        if (keys) {
            keys.forEach(key => {
                if (besides.indexOf(key) < 0) {
                    document.cookie = key + '=0;expires=' + new Date(0).toUTCString()
                }
            })
        }
    },

    /**
     * Check if browser cookie function is enabled.
     *
     */
    isCookieEnable() {
        try {
            this.deleteCookie('testCookieAvailable')
            if (this.getCookie('testCookieAvailable')) {
                // deleteCookie 失敗
                return false
            }

            this.setCookie('testCookieAvailable', 'aaa')
            if (this.getCookie('testCookieAvailable') !== 'aaa') {
                // setCookie 或 getCookie 失敗
                return false
            }

            return true
        } catch (e) {
            return false
        }
    }
}
