<style lang="scss">
@import '../../sass/variables';
.areaSelector {
    .popupModal__layer {
        width: 600px;
        max-width: 90%;
    }
}

.areaSelector__header {
    @extend .popupModalHeader;
    padding-left: $half-h-filterBtn;
}

.areaSelector__headerIcon {
    @extend .faIcon;
    color: $complementary1;
}

.areaSelector__content {
    padding: $pd-popupModal;
    font-size: 0.8rem;

    @media (max-width: $max-w-xs) {
        padding: $pd-popupModal-xs;
    }
}

.areaSelector__areaList {
    margin-top: 1rem;
    overflow: auto;
    max-height: 40vh;
    list-style-type: none;
}

.areaSelector__areaCheckbox {
    margin-left: 0.5rem;
}

.areaSelector__loading {
    min-height: 0;
    height: auto;
}

.areaSelector__footer {
    @extend .popupModalFooter;
    border-top: 1px solid $color-border-light;
}
</style>

<template>
    <BaseModal
        :modalStatus="0"
        class="areaSelector"
        closeEvent="close-area-selector"
        v-if="isShow"
    >
        <h2
            class="areaSelector__header"
            slot="header"
        >
            <font-awesome-icon
                class="areaSelector__headerIcon"
                icon="portrait"
            />地區選擇器
        </h2>
        <div class="areaSelector__content">
            <b-form-input
                :placeholder="'輸入地區，快速過濾'"
                v-model="filter"
            ></b-form-input>
            <b-form-group
                class="areaSelector__areaList"
                v-if="loadStatus==3"
            >
                <b-form-checkbox-group
                    class="areaSelector__areaCheckbox"
                    name="flavour-2"
                    v-model="areas"
                >
                    <b-form-checkbox
                        :key="areaIdx"
                        :value="area"
                        v-for="(area,areaIdx) in filtedAreas"
                    >{{area}}</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            <LoadingSet v-else />
        </div>
        <div
            class="areaSelector__footer"
            slot="footer"
        >
            <b-button
                @click="reset"
                class="popupModalFooterBtn"
                variant="warning"
            >全部取消</b-button>
            <b-button
                :disabled="loadStatus!=3"
                @click="selectAll"
                class="popupModalFooterBtn"
                variant="info"
            >全部選取</b-button>
            <b-button
                @click="confirm"
                class="popupModalFooterBtn"
                variant="success"
            >{{ getTerm('CONFIRM') }}</b-button>
        </div>
    </BaseModal>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../event-bus'
import { JS_CONFIG } from '../config'
import LoadingSet from './LoadingSet'

export default {
    name: 'ModalAreaSelector',
    components: {
        LoadingSet
    },
    created() {
        EventBus.$on('show-area-selector', this.showModel)
        EventBus.$on('close-area-selector', this.closeModel)
    },
    data: function() {
        return {
            isShow: false,
            filter: '',
            areas: []
        }
    },
    props: {
        areaSelected: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.areas = JSON.parse(JSON.stringify(this.areaSelected))
    },
    computed: {
        filtedAreas() {
            if (this.areasData && this.areasData.length) {
                return this.areasData.filter(a => {
                    if (this.filter) {
                        let re = new RegExp(this.filter)
                        return a.match(re)
                    } else {
                        return true
                    }
                })
            } else {
                return []
            }
        },
        ...mapGetters({
            areasData: 'lesson/areas',
            loadStatus: 'lesson/areasloadStatus'
        })
    },
    methods: {
        getTerm(name) {
            return JS_CONFIG.TERMS[name]
        },
        showModel() {
            this.isShow = true
            this.$parent.checkBodyScrollStatus()

            if (!(this.areasData && this.areasData.length)) {
                this.$store.dispatch('lesson/getAreas')
            }
            this.areas = JSON.parse(JSON.stringify(this.areaSelected))
        },
        closeModel() {
            this.isShow = false
            this.$parent.checkBodyScrollStatus()
        },
        reset() {
            this.areas = []
        },
        selectAll() {
            this.areas = []
            this.areasData.forEach(area => {
                this.areas.push(area)
            })
        },
        confirm() {
            this.$emit('update:areaSelected', this.areas)
            this.closeModel()
        }
    },
    beforeDestroy() {
        EventBus.$off('show-area-selector', this.showModel)
        EventBus.$off('close-area-selector', this.closeModel)
    }
}
</script>