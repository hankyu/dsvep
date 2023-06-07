<style lang="scss">
@import '../../../sass/variables';

.baseCard {
    display: inline-block;
    min-width: $minw-baseCard;
    border: 1px solid $color-card-border;
    border-radius: 5px;
    background-color: $white;
    @extend .cardShadow;

    @media (max-width: $max-w-xs) {
        min-width: $minw-baseCard-xs;
    }
}
</style>

<template>
    <div class="baseCard">
        <slot></slot>
    </div>
</template>