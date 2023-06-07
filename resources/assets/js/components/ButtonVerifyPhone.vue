<style lang="scss" scoped>
@import '../../sass/variables';
</style>


<template>
    <b-button
        :disabled="btnDisabled || disalbed"
        :variant="variant"
        class="buttonCountdown"
        v-if="!timeover"
    >{{ text+ '(限時 '+ this.countdownText+')' }}</b-button>
</template>

<script>
import BaseButtonCountdown from './global/BaseButtonCountdown'
export default {
    name: 'ButtonVerifyPhone',
    extends: BaseButtonCountdown
}
</script>