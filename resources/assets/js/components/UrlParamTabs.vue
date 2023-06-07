<style lang="scss">
@import '../../sass/variables';
@import '../../sass/components/_urlParamTabs.scss';
</style>

<template>
    <ul class="urlParamTabs__tabs">
        <slot></slot>
    </ul>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: 'UrlParamTabs'
}
</script>