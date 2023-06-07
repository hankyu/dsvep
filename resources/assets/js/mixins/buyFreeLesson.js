import { EventBus } from '../event-bus'

export let buyFreeLesson = {
    methods: {
        async buyFreeLesson({ l_id, deadline, type }) {
            try {
                let response = await this.$store.dispatch('order/buyFreeLesson', l_id)
                if (response.data.status == 0) {
                    this.$store.commit('alert/SHOW_COMPLETE_ALERT', '免費購買成功')

                    this.$store.commit('order/SET_STATUS', { name: 'buyFreeStatus', status: 0 })
                    if (deadline == 999 || type == 'entity') {
                        // 永久觀看，直接去教室(其實已包含實體課)
                        this.$router.push('/profile/lesson/classroom/' + l_id)
                    } else {
                        // 去我的課程
                        this.$router.push('/profile/lesson/overview')
                    }
                } else {
                    this.$store.commit('order/SET_STATUS', { name: 'buyFreeStatus', status: 2 })
                    this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                        api: 'buyFreeLesson',
                        code: response.data.status,
                        isError: true
                    })
                }
            } catch (e) {
                this.$store.commit('order/SET_STATUS', { name: 'buyFreeStatus', status: 2 })
                this.$store.commit('alert/ADD_ALERT_MESSAGE', {
                    api: 'unknown',
                    code: e,
                    isError: true
                })
            }
        }
    }
}
