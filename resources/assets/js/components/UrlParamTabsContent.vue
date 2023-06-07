<style lang="scss">
@import '../../sass/variables';
@import '../../sass/components/_urlParamTabs.scss';
</style>

<template>
    <div class="urlParamTabs__content">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'UrlParamTabsContent'
}
</script>