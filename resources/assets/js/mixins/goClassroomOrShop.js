import { EventBus } from '../event-bus'
import { COMMON_UTILITY } from '../class/commonUtility'

export let goClassroomOrShop = {
    methods: {
        // role: 0: visitor, 1: member, 2: worker, 4: administer, 8: superior, 16: teacher
        decideGoClassroomOrShop({
            l_id,
            l_name,
            l_Type,
            owned,
            deadline,
            orderDeadline,
            orderRestrict,
            t_id,
            m_t_id,
            role,
            start_time
        }) {
            let tmpUrl = this.getGoClassroomOrShopUrl({
                l_id,
                l_name,
                l_Type,
                owned,
                deadline,
                orderDeadline,
                orderRestrict,
                t_id,
                m_t_id,
                role,
                start_time
            })

            if (tmpUrl == 'open-start-study') {
                EventBus.$emit('open-start-study', { l_id, l_name, deadline })
            } else {
                this.$router.push(tmpUrl)
            }
        },
        getGoClassroomOrShopUrl({
            l_id,
            l_name,
            l_Type,
            owned,
            deadline,
            orderDeadline,
            orderRestrict,
            t_id,
            m_t_id,
            role,
            start_time
        }) {
            let returnVal
            if (typeof role == 'undefined') {
                returnVal = '/lesson/' + l_id
            } else {
                if ((role & 16 && m_t_id == t_id) || role & 2) {
                    // 該課程老師或行政進入教室
                    returnVal = '/profile/lesson/classroom/' + l_id
                } else {
                    if (owned == 2) {
                        // 完成購買且還沒過期
                        if (l_Type == 'entity') {
                            returnVal = '/profile/lesson/classroom/' + l_id
                        } else {
                            // 線上課
                            if (
                                !COMMON_UTILITY.isPast(start_time, false) ||
                                orderRestrict ||
                                orderDeadline
                            ) {
                                // 課程還沒開始，或已開始學習
                                returnVal = '/profile/lesson/classroom/' + l_id
                            } else {
                                // 尚未開始學習
                                returnVal = 'open-start-study'
                            }
                        }
                    } else {
                        returnVal = '/lesson/' + l_id
                    }
                }
            }
            return returnVal
        }
    }
}
