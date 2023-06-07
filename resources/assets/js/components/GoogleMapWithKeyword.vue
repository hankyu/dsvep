<style lang="scss" scoped>
@import '../../sass/variables';

.googleMapWithKeyword {
    width: 100%;
    height: 60vh;
}
</style>

<template>
    <GmapMap
        :center="geometryLocation"
        :zoom="16"
        class="googleMapWithKeyword"
        v-if="geometryLocation"
    >
        <GmapMarker
            :clickable="true"
            :draggable="true"
            :position="geometryLocation"
        />
        <!-- map-type-id="terrain" -->
        <!-- @click="center=m.position" -->
    </GmapMap>
</template>

<script>
import $ from 'jquery'

// import Axios from 'axios'
export default {
    name: 'GoogleMapWithKeyword',
    data() {
        return {
            geometryLocation: null
        }
    },
    props: {
        location: {
            type: String,
            default: ''
        },
        locationNote: {
            type: String,
            default: ''
        }
    },
    mounted() {
        let APIkey = 'AIzaSyAf6lxu3iMOhxqhcWquqS_XPBCvqpyrdCE',
            address = this.location || this.locationNote,
            google_map_url =
                'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                address +
                '&key=' +
                APIkey

        $.get(google_map_url, ({ results, status }) => {
            if (results.length && results[0].geometry && results[0].geometry.location) {
                this.geometryLocation = results[0].geometry.location
            }
        })
    }
}
</script>
