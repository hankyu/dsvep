<style lang="scss">
@import '../../../sass/variables';
@keyframes dotRotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loadingRoller__container {
    display: inline-block;
    position: relative;
    font-size: 0;

    &:before {
        content: '';
        display: block;
    }
}
.loadingRoller__rotator {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    transform-origin: center;

    animation-name: dotRotate;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
}

.loadingRoller__dot {
    display: inline-block;
    border-radius: 50%;
}

.loadingRoller__container--xxs {
    &:before,
    .loadingRoller__rotator {
        width: 20px;
        height: 20px;
    }
}

.loadingRoller__container--xs {
    &:before,
    .loadingRoller__rotator {
        width: 30px;
        height: 30px;
    }
}
.loadingRoller__container--s {
    &:before,
    .loadingRoller__rotator {
        width: 50px;
        height: 50px;
    }
}
.loadingRoller__container--m {
    &:before,
    .loadingRoller__rotator {
        width: 100px;
        height: 100px;
    }
}
.loadingRoller__container--l {
    &:before,
    .loadingRoller__rotator {
        width: 150px;
        height: 150px;
    }
}
.loadingRoller__container--xl {
    &:before,
    .loadingRoller__rotator {
        width: 250px;
        height: 250px;
    }
}
</style>

<template>
    <div
        :class="containerClass"
        class="loadingRoller__container"
    >
        <div class="text-center">
            <slot />
        </div>
        <div
            :key="n"
            :style="rotatorStyle(n)"
            class="loadingRoller__rotator"
            v-for="n in dotNum"
        >
            <span
                :style="dotsStyle"
                class="loadingRoller__dot"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheLoadingRoller',
    data: function() {
        return {
            finaldotColor: '',
            presetColors: {
                primary: '#ff98aa',
                white: '#fff',
                black: '#000',
                gray: '#999'
            }
        }
    },
    props: {
        dotColor: {
            type: String,
            default: '#5dc0de'
        },
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
        },
        rollerSpeed: {
            type: Number,
            default: 1200,
            validator: function(value) {
                return value > 0 && value % 1 == 0
            }
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading
        },
        dotsStyle() {
            if (!this.finaldotColor) {
                this.finaldotColor = this.getDotHexColor(this.dotColor)
            }
            return `width: ${this.dotSize}px; height: ${this.dotSize}Px; background-color: ${this.finaldotColor};`
        },
        containerClass() {
            return `loadingRoller__container--${this.rollerSize}`
        }
    },
    methods: {
        getDotHexColor(c) {
            let color,
                keys = Object.keys(this.presetColors),
                idx = keys.indexOf(c)

            if (idx !== -1) {
                return this.presetColors[keys[idx]]
            } else if (c.search(/^#[a-f0-9]{3,8}$/i) == 0) {
                return c
            } else {
                return '#000'
            }
            return
        },
        rotatorStyle(n) {
            let delay = Math.ceil((this.rollerSpeed / this.dotNum / 2) * n)
            return `animation-duration: ${Math.ceil(this.rollerSpeed)}ms;
                    animation-delay: ${delay}ms;`
        }
    }
}
</script>