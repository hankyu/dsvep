<style lang="scss">
@import '../../sass/variables';
@import '../../sass/components/_urlParamTabs.scss';
</style>

<template>
    <router-link
        :class="active?'active':''"
        :to="link"
        class="urlParamTabs__link"
    >{{text}}</router-link>
</template>
<script>
export default {
    name: 'UrlParamTabLink',
    props: {
        link: {
            type: String,
            defaul: '#'
        },
        text: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>