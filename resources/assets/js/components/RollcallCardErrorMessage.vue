<style>
</style>


<template>
    <p>{{errorMessage}}</p>
</template>

<script>
export default {
    name: 'RollcallCardErrorMessage',
    props: {
        errorMessage: {
            type: String,
            required: true
        }
    }
}
</script>