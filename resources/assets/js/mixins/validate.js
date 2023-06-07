export let validateMixin = {
    methods: {
        isFilled(inputString) {
            return inputString != ''
        },
        isAllEnglishAndNumber(str) {
            let re = /^[a-z\d]*$/i
            return str.search(re) == 0
        },
        validWordNumberLimit(string, min, max) {
            let bool,
                stringLen = string.length

            return stringLen <= max && stringLen >= min
        },
        isEmail(email) {
            let re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g
            return re.test(email)
        },
        isCellPhone(phoneNumber) {
            let re = /^\+?\d{8,}$/g
            return re.test(phoneNumber)
        },
        isMobileBarCode(code) {
            let re = /^\/[0-9A-Z]{7}$/
            return re.test(code)
        },
        isMoicaBarCode(code) {
            let re = /^[A-Z]{2}\d{14}$/
            return re.test(code)
        },
        isLoveCode(code) {
            let re = /^\d{3,7}$/
            return re.test(code)
        },

        isCompanyId(code) {
            if (code.length != 8 || !Number.isInteger(parseInt(code))) {
                return false
            }

            let sum = this.calculateCompanyId(code)

            return this.isCompanyIdSumLegal(sum)
        },
        calculateCompanyIdSumWithRight(acc, elm, idx) {
            let right = [1, 2, 1, 2, 1, 2, 4, 1],
                sum = elm * right[idx]

            if (sum < 10) {
                return acc + sum
            } else {
                sum = sum.toString().split('')
                return acc + parseInt(sum[0]) + parseInt(sum[1])
            }
        },
        isCompanyIdSumLegal(sum) {
            return sum % 10 == 0 || (sum % 10 == 9 && parseInt(code[6]) == 7)
        },
        calculateCompanyId(code) {
            let codeArr = code.split('')

            return codeArr.reduce(this.calculateCompanyIdSumWithRight, 0)
        }
    }
}
