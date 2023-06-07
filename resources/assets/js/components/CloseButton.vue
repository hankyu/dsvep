<style lang="scss">
@import '../../sass/variables';

.closeBtn {
    text-indent: -99999px;
    position: relative;
    width: 1.8rem;
    height: 1.8rem;
    border: none;
    background-color: transparent;

    &:before {
        position: absolute;
        content: '';
        display: block;
        height: 2px;
        width: 1.25rem;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: $font-primary;
        transform-origin: center;
        transform: rotate(45deg);
    }

    &:after {
        position: absolute;
        content: '';
        display: block;
        height: 2px;
        width: 1.25rem;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: $font-primary;
        transform-origin: center;
        transform: rotate(-45deg);
    }
}
</style>


<template>
    <button
        @click="onClick"
        class="closeBtn"
        type="button"
    >close</button>
</template>

<script>
export default {
    name: 'CloseButton',
    props: {
        clickEvent: ''
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>