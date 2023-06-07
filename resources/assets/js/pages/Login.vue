<style>
</style>

<template></template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: 'Login',
    mounted() {
        this.$store.commit('SWITCH_PAGE_CHANGING', false)
        let body = document.documentElement || document.body

        body.scrollTop = 0

        EventBus.$emit('do-resize')
    },
    updated() {
        EventBus.$emit('do-resize')
    },
    computed: {},
    methods: {},
    beforeDestroy() {}
}
</script>
