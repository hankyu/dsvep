<style lang="scss">
@import '../../sass/variables';

.rollcallCardLabel {
    color: $emphasized3;
    padding-top: 30px;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>


<template>
    <p class="rollcallCardLabel">{{ rollcallLabel }}</p>
</template>

<script>
export default {
    name: 'rollcallCardLabel',
    props: {
        rollcallLabel: {
            type: String,
            required: true
        }
    }
}
</script>