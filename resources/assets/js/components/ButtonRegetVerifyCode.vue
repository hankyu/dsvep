<style lang="scss" scoped>
@import '../../sass/variables';
</style>


<template>
    <b-button
        :disabled="btnDisabled || disalbed"
        :variant="variant"
        class="buttonCountdown"
    >
        {{ text}}
        <template v-if="!timeover">{{ '(等待 '+ this.countdownText+')' }}</template>
    </b-button>
</template>

<script>
import BaseButtonCountdown from './global/BaseButtonCountdown'
export default {
    name: 'ButtonRegetVerifyCode',
    extends: BaseButtonCountdown
}
</script>