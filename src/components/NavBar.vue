<template>
    <b-navbar :spaced="false" :shadow="true">
        <template #brand>
            <b-navbar-item>
                <img src="../assets/brand-2.png" alt="pixelated thumbnail of The Great Wave" width="75">
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="#">
                About
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="a">
                AIC Public API
            </b-navbar-item>
            <b-navbar-item tag="a">
                <a href="https://github.com/PoorBillyPilgrim/iiif-pixel-art" target="_blank">
                    <b-icon
                    icon="github"
                    size="is-medium">
                    </b-icon>
                </a>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
a {
    color: var(--primary) !important;
}

.navbar-item img {
    max-height: none !important;
    border-radius: 100%;
}
</style>