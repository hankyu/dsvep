<style lang="scss" scoped>
@import '../../sass/variables';

.progressSet {
    height: 0.5rem;
    border: 1px solid $color-border-light;
    background-color: $darkwhite;
    text-align: center;
    position: relative;
}

.progressSet__bar {
    content: '';
    display: inline-block;
    background: $bs-warning;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0px 3px 0 0px #fff3 inset, 2px 0 0 $shadow;
    // transition: width 0.3s ease-in-out;
}
</style>

<template>
    <div class="progressSet">
        <div
            :style="barStyle"
            class="progressSet__bar"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'ProgressSet',
    props: {
        progress: {
            type: Number,
            default: 0
        }
    },
    computed: {
        barStyle() {
            return `width: ${this.progress}%;`
        }
    }
}
</script>