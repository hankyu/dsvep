export const COMMON_UTILITY = {
    /**
     * Check if the device is a mobile device
     *
     */
    isMobile() {
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36

        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            return true
        } else {
            return false
        }
    },

    /**
     *
     *
     * @param {*} num
     * @param {*} digits arbitrary digits
     * @returns String in arbitrary digits string
     */
    fillZero(num, digits) {
        let compareNum = 10 ** (digits - 1)
        return num < compareNum ? '0' + num : num
    },

    /**
     * Get now time string ('YYYY/MM/dd hh:mm:ss')
     *
     * @returns time string ('YYYY/MM/dd hh:mm:ss')
     */
    getNowTimeString() {
        let now = new Date()
        return (
            now.getFullYear() +
            '/' +
            this.fillZero(now.getMonth() + 1, 2) +
            '/' +
            this.fillZero(now.getDate(), 2) +
            ' ' +
            this.fillZero(now.getHours(), 2) +
            ':' +
            this.fillZero(now.getMinutes(), 2) +
            ':' +
            this.fillZero(now.getSeconds(), 2)
        )
    },

    /**
     * Transfer time string to week day name in Chinese.
     *
     * @param {*} timeString. 'YYYY/MM/DD hh:mm:ss' or 'YYYY-MM-DD hh:mm:ss' or 'YYYY/MM/DD' or 'YYYY-MM-DD'
     * @returns week day name in Chinese.
     */
    timeString2ChinesWeekDay(timeString) {
        let weekdays = ['日', '一', '二', '三', '四', '五', '六'],
            weekday /* ,
            dateInfo

        dateInfo = timeString.split(/[-/\s:]/)
        weekday = new Date(dateInfo[0], dateInfo[1] - 1, dateInfo[2], 0, 0, 0, 0).getDay() */

        weekday = this.timeString2DateObject(timeString.substr(0, 10)).getDay()

        return weekdays[weekday]
    },

    timeString2timeStringWithChinesWeekDay(timeString) {
        let tmp = timeString
            .replace(/\-/g, '/')
            .substr(0, 16)
            .split(/[\s]/)

        return (
            tmp[0] +
            ' (' +
            this.timeString2ChinesWeekDay(tmp[0]) +
            ')' +
            (tmp[1] ? ' ' + tmp[1] : '')
        )
    },

    /**
     * trans time string to Date Object
     *
     * @param {*} ts time string. 'YYYY-MM-dd' or 'YYYY-MM-dd hh:mm:ss'
     * @returns {Date}
     */
    timeString2DateObject(ts) {
        let matchArr, timeString, dateInfo

        // if YYYY-MM-dd hh:mm:ss
        if ((matchArr = ts.match(/\d{4}[\-\/]\d{2}[\-\/]\d{2} \d{2}\:\d{2}\:\d{2}/))) {
            let dateTimeInfo

            timeString = matchArr[0]
            dateInfo = timeString.split(/[\-\/\s\:]/)
            return new Date(
                dateInfo[0],
                dateInfo[1] - 1,
                dateInfo[2],
                dateInfo[3],
                dateInfo[4],
                dateInfo[5]
            )
        }

        // if YYYY-MM-dd
        else if ((matchArr = ts.match(/\d{4}[\-\/]\d{2}[\-\/]\d{2}/))) {
            timeString = matchArr[0]
            dateInfo = timeString.split(/[\-\/]/)
            return new Date(dateInfo[0], dateInfo[1] - 1, dateInfo[2], 0, 0, 0, 0)
        }
    },

    /**
     * trans time string to timestamp
     *
     * @param {*} ts time string. 'YYYY-MM-dd' or 'YYYY-MM-dd hh:mm:ss' or 'YYYY/MM/DD' or 'YYYY-MM-DD'
     * @returns timestamp
     */
    timeString2Timestamp(ts, dayMode) {
        if (dayMode) {
            ts = ts.substr(0, 10)
        }

        return this.timeString2DateObject(ts).getTime()
    },

    /**
     * time duration in micro-seconds trans to time duration text
     *
     * @param {Number} ms micro-seconds
     * @param {Number} mode 1:day 2:hour 3:minute 4:second 5:mSecond
     * @returns {String} returnVal time duration text
     */
    microSecond2TimeString(ms, mode) {
        const timeInfo = [86400000, 3600000, 60000, 1000]
        let remainMS,
            returnInfo = [],
            returnVal = ''

        remainMS = ms
        for (let i = 0, j = mode > 4 ? 4 : mode; i < j; i++) {
            returnInfo[i] = Math.floor(remainMS / timeInfo[i])
            remainMS = remainMS % timeInfo[i]
        }

        returnInfo.forEach((item, idx) => {
            let units = ['天', '小時', '分', '秒', '']
            returnVal +=
                (returnVal ? ' ' : '') +
                (item
                    ? (idx == 1 || idx == 2 || idx == 3 ? this.fillZero(item, 2) : item) +
                      ' ' +
                      units[idx]
                    : '')
        })
        return returnVal
    },

    /**
     * Transform Date object to date string with arbitrary separator
     *
     * @param {*} d Date object
     * @param {*} separator arbitrary separator
     * @returns Date string with arbitrary separator 'YYYY/MM/dd' or 'YYYY-MM-dd'....
     */
    dateObject2DateString(d, separator) {
        let sep = separator || '/'
        return (
            d.getFullYear() +
            sep +
            this.fillZero(d.getMonth() + 1, 2) +
            sep +
            this.fillZero(d.getDate(), 2)
        )
    },

    /**
     * Transform Datetime object to date string with arbitrary separator
     *
     * @param {*} d Date object
     * @param {*} separator arbitrary separator
     * @returns Datetime string with arbitrary separator 'YYYY/MM/dd' or 'YYYY-MM-dd'....
     */
    dateObject2DatetimeString(d, separator) {
        let sep = separator || '/'
        return (
            d.getFullYear() +
            sep +
            this.fillZero(d.getMonth() + 1, 2) +
            sep +
            this.fillZero(d.getDate(), 2) +
            ' ' +
            this.fillZero(d.getHours(), 2) +
            ':' +
            this.fillZero(d.getMinutes(), 2) +
            ':' +
            this.fillZero(d.getSeconds(), 2)
        )
    },

    timestamp2DateString(ts, separator) {
        return this.dateObject2DateString(new Date(ts), separator)
    },

    timestamp2DatetimeString(ts, separator) {
        return this.dateObject2DatetimeString(new Date(ts), separator)
    },

    /**
     * Transform full time string ('YYYY-MM-dd hh:mm:ss' or 'YYYY/MM/dd hh:mm:ss') to date string ('YYYY/MM/dd')
     *
     * @param {*} ts full time string ('YYYY-MM-dd hh:mm:ss' or 'YYYY/MM/dd hh:mm:ss')
     * @returns date string ('YYYY/MM/dd')
     */
    fullTimeString2DateString(ts) {
        return ts.substr(0, 10).replace(/-/g, '/')
    },

    /**
     * Check if the datetime is past.
     *
     * @param {*} dt arbitrary Datetime or timestring or timestamp
     * @param {*} includeThatDay If true, check for the arbitrary datetime's tomorrow 00:00:00
     * @returns
     */
    isPast(dt, includeThatDay) {
        let now = new Date(),
            datetimestamp

        if (dt instanceof Date) {
            datetimestamp = dt.getTime()
        } else if (typeof dt === 'number') {
            datetimestamp = dt
        } else if (dt.match(/^\d{4}[\-\/]\d{2}[\-\/]\d{2}$/)) {
            let infos = dt.split(/[\-\/]/)

            datetimestamp = new Date(
                infos[0],
                infos[1] - 1 + '',
                infos[2] * 1 + (includeThatDay ? 1 : 0),
                0,
                0,
                0,
                0
            ).getTime()
        } else if (dt.match(/^\d{4}[\-\/]\d{2}[\-\/]\d{2}\s\d{2}\:\d{2}\:\d{2}$/)) {
            let infos = dt.split(/[\-\/\:\s]/)
            datetimestamp = new Date(
                infos[0],
                infos[1] - 1,
                infos[2],
                infos[3],
                infos[4],
                infos[5],
                0
            ).getTime()
        } else {
            return false
        }

        return now.getTime() > datetimestamp
    },
    nl2br(text) {
        return text.replace(/\n|\r\n/g, '<br>')
    },
    text2link(text) {
        let re = /(http:\/\/|https:\/\/)([^\s\r\n]*)/gi
        return text.replace(re, '<a href="$1$2" target="_blank">$1$2</a>')
    },
    text2htmlWithLinks(text) {
        let returnVal = this.nl2br(this.text2link(text))

        return returnVal
    }
}
