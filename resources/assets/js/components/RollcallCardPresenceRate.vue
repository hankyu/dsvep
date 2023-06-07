<style lang="scss">
@import '../../sass/variables';

.rollcallCardPresenceRate {
    color: $emphasized3;

    .rollcallCardPresenceRate__integer {
        font-weight: bold;
        font-size: 3rem;
    }
    .rollcallCardPresenceRate__decimal {
        font-weight: bold;
    }
}
.rollcallCardPresenceRate__pers {
    font-size: 1.5rem;
    color: $emphasized3;
}
</style>


<template>
    <p>
        <BaseRunNumber
            class="rollcallCardPresenceRate"
            decimalClass="rollcallCardPresenceRate__decimal"
            dotClass="rollcallCardPresenceRate__dot"
            integerClass="rollcallCardPresenceRate__integer"
            v-bind="$props"
        />
        <span class="rollcallCardPresenceRate__pers">%</span>
    </p>
</template>

<script>
export default {
    name: 'rollcallCardPresenceRate',
    props: {
        stepDuration: {
            type: Number,
            default: 2
        },
        targetNumber: {
            type: Number,
            required: true
        }
    }
}
</script>