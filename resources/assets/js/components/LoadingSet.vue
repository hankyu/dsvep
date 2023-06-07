<style lang="scss">
@import '../../sass/variables';

.loadingSet {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 200px;
}
</style>

<template>
    <div class="loadingSet">
        <TheLoadingRoller v-bind="$props" />
    </div>
</template>

<script>
export default {
    name: 'LoadingSet',
    props: {
        dotSize: {
            type: Number,
            default: 8,
            validator: function(value) {
                return value > 0 && value % 1 == 0
            }
        },
        dotNum: {
            type: Number,
            default: 6,
            validator: function(value) {
                return value > 0 && value % 1 == 0
            }
        },
        rollerSize: {
            type: String,
            default: 's',
            validator: function(value) {
                return ['xxs', 'xs', 's', 'm', 'l', 'xl'].indexOf(value) !== -1
            }
        }
    }
}
</script>