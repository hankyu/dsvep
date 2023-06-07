<style lang="scss">
@import '../../sass/variables';
@import '../../sass/components/_urlParamTabs.scss';
</style>

<template>
    <li class="urlParamTabs__tab">
        <slot></slot>
    </li>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    name: 'UrlParamTab'
}
</script>