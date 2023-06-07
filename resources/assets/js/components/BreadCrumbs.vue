<style lang="scss" scoped>
@import '../../sass/variables';

.breadCrumbs {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 0;
}

.breadCrumbs__listItem {
    display: inline-block;
    font-size: 0.8rem;
    margin-right: 0.5rem;
}

.breadCrumbs__listItem:nth-child(n + 2):before {
    content: '>';
    display: inline;
    margin-right: 0.5rem;
}
</style>


<template>
    <ul class="breadCrumbs">
        <li
            :key="idx"
            class="breadCrumbs__listItem"
            v-for="(crumb, idx) in crumbs"
        >
            <a
                :href="crumb.link"
                v-if="crumb.link && crumb.aMode"
            >{{crumb.text}}</a>
            <router-link
                :to="crumb.link"
                v-else-if="crumb.link"
            >{{crumb.text}}</router-link>
            <span v-else>{{crumb.text}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'BreadCrumbs',
    props: {
        crumbs: {
            type: Array,
            required: true
        }
    }
}
</script>