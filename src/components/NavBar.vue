<template>
    <b-navbar spaced="true" shadow="true">
        <template #brand>
            <b-navbar-item>
                <img class="is-rounded" src="../assets/brand.png" alt="" width="100" height="100">
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="#">
                about
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
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

a:hover {
    opacity: 0.8 !important;
}

.navbar-item img {
    max-height: none !important;
}
</style>