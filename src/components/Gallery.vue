<template>
    <div class="gallery">
        <h2 class="title">Gallery</h2>
        <div class="gallery-images">
            <b-button @click="getGalleryImages">get images</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Gallery',
    data() {
        return {
            page: 1
        }
    },
    methods: {
        getGalleryImages() {
            fetch(this.$api_url + "artworks/search?query[term][is_public_domain]=true&limit=5&page=" + this.page)
                .then(res => res.json())
                .then(data => console.log(data.data))
        }
    }
}
</script>

<style>

</style>