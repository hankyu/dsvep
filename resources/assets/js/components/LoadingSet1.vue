<style lang="scss">
@import '../../sass/variables';

.loadingSet {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 200px;
}

@keyframes flipX {
    0% {
        transform: rotateX(0deg);
    }
    25% {
        transform: rotateX(0deg);
    }
    50% {
        transform: rotateX(180deg);
    }
    75% {
        transform: rotateX(180deg);
    }
    100% {
        transform: rotateX(0deg);
    }
}

@keyframes flipY {
    0% {
        transform: rotateY(0deg);
    }
    25% {
        transform: rotateY(180deg);
    }
    50% {
        transform: rotateY(180deg);
    }
    75% {
        transform: rotateY(0deg);
    }
    100% {
        transform: rotateY(0deg);
    }
}

$light-face1: lighten($brand-primary, 10%);
$dark-face1: darken($brand-primary, 10%);
@keyframes face1 {
    0% {
        background-color: $brand-primary;
    }
    13% {
        background-color: $dark-face1;
    }
    25% {
        background-color: $light-face1;
    }
    37% {
        background-color: $light-face1;
    }
    50% {
        background-color: $brand-primary;
    }
    63% {
        background-color: $light-face1;
    }
    75% {
        background-color: $dark-face1;
    }
    87% {
        background-color: $dark-face1;
    }
    100% {
        background-color: $brand-primary;
    }
}

$light-face2: lighten($complementary1, 10%);
$dark-face2: darken($complementary1, 10%);
@keyframes face2 {
    0% {
        background-color: $light-face2;
    }
    12% {
        background-color: $light-face2;
    }
    25% {
        background-color: $complementary1;
    }
    37% {
        background-color: $dark-face2;
    }
    50% {
        background-color: $light-face2;
    }
    62% {
        background-color: $light-face2;
    }
    75% {
        background-color: $complementary1;
    }
    87% {
        background-color: $light-face2;
    }
    100% {
        background-color: $light-face2;
    }
}

$duration-loadingSet1: 2s;
.loadingSet__flipX {
    perspective: 240;
    width: 120px;
    height: 120px;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-in-out;
    animation: flipX $duration-loadingSet1 ease-in-out infinite;
}
.loadingSet__flipY {
    perspective: 240;
    position: relative;
    display: inline-block;
    width: 120px;
    height: 120px;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-in-out;
    animation: flipY $duration-loadingSet1 ease-in-out infinite;
}

.loadingSet__face {
    display: inline-block;
    width: 60px;
    height: 60px;
    position: absolute;
    left: 0;
    right: 0;
    backface-visibility: hidden;
    transition: background-color 0.5s ease-in-out;
}

.loadingSet__face1 {
    animation: face1 $duration-loadingSet1 ease-in-out infinite;
    box-shadow: 0 3px 0 $shadow;
}

.loadingSet__face2 {
    animation: face2 $duration-loadingSet1 ease-in-out infinite;
    box-shadow: 0 3px 0 $shadow;
    transform: rotateY(180deg);
}
</style>

<template>
    <div class="loadingSet">
        <div class="loadingSet__flipX">
            <div class="loadingSet__flipY">
                <span class="loadingSet__face loadingSet__face1"></span>
                <span class="loadingSet__face loadingSet__face2"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingSet'
}
</script>