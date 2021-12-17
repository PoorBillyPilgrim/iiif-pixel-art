<template>
    <b-navbar :shadow="true">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{path: '/'}">
                <img src="../assets/logo.png" alt="pixelated thumbnail of The Great Wave" width="75">
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="router-link" :to="{path: '/about' }">
                About
            </b-navbar-item>
            <b-navbar-item tag="a" href="http://api.artic.edu/docs/" target="_blank">
                Art Institute of Chicago API <b-icon class="ml-1" icon="open-in-new" size="is-small"></b-icon>
            </b-navbar-item>
            <b-navbar-item tag="a" href="https://github.com/PoorBillyPilgrim/iiif-pixel-art" target="_blank">
                <b-icon
                    icon="github"
                    size="is-medium">
                </b-icon>
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
}
</style>