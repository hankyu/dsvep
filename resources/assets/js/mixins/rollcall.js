import { JS_CONFIG } from '../config.js'

export let rollcallMixin = {
    methods: {
        /**
         * trans time string to Date Object
         *
         * @param {*} ts time string. 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm:ss'
         * @returns {Date}
         */
        timeString2DateObject(ts) {
            let matchArr, timeString, dateInfo

            // if yyyy-MM-dd hh:mm:ss
            if ((matchArr = ts.match(/\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}\:\d{2}/))) {
                let dateTimeInfo

                timeString = matchArr[0]
                dateInfo = timeString.split(/[\-\s\:]/)
                return new Date(
                    dateInfo[0],
                    dateInfo[1] - 1,
                    dateInfo[2],
                    dateInfo[3],
                    dateInfo[4],
                    dateInfo[5]
                )
            }

            // if yyyy-MM-dd
            else if ((matchArr = ts.match(/\d{4}\-\d{2}\-\d{2}/))) {
                timeString = matchArr[0]
                dateInfo = timeString.split(/[\-\/]/)
                return new Date(dateInfo[0], dateInfo[1] - 1, dateInfo[2], 0, 0, 0, 0)
            }
        },

        /**
         * trans time string to timestamp
         *
         * @param {*} ts time string. 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm:ss'
         * @returns timestamp
         */
        timeString2Timestamp(ts) {
            let date = this.timeString2DateObject(ts)

            return date.getTime()
        },

        /**
         * Get Effective Rollcall Data
         *
         * @param {*} rcDatetimes Rollcall datetime Array
         * @returns { activeUid , passedUid }
         */
        getKeyPointUnitId(rcDatetimes) {
            let now = new Date().getTime(),
                returnObj = { activeUid: null, passedUid: null }

            rcDatetimes.forEach((rcd, idx) => {
                let dateStamp = this.timeString2Timestamp(rcd)
                if (!returnObj.activeUid && dateStamp >= JS_CONFIG.ROLLCALL_SYSTEM_ACTIVE_TIME) {
                    returnObj.activeUid = idx + 1
                }
                if (!returnObj.passedUid && dateStamp > now) {
                    returnObj.passedUid = idx
                }
            })

            // some unit are before rollcall active day, some not.
            if (returnObj.activeUid && returnObj.passedUid == null) {
                returnObj.passedUid = rcDatetimes.length
            }
            return returnObj
        }
    }
}
