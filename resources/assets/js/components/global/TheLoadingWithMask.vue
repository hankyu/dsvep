<style lang="scss">
@import '../../../sass/variables';
</style>

<template>
    <BaseFullMask
        :z="900"
        v-bind="$props"
    >
        <TheLoadingRoller />
    </BaseFullMask>
</template>

<script>
export default {
    name: 'TheLoading',
    props: ['maskColor']
}
</script>