<template>
    <div class="gallery columns">
        <div class="column">
            <div class="">
                <h2 class="title">Gallery</h2>
                <div class="gallery-images">
                    <b-button @click="getGalleryImages">get images</b-button>
                </div>
                <div class="columns">
                    <div class="column">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                </div>
            </div>
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

<style scoped>
.column {
    margin: 0 auto;
}

.gallery {
    margin: 0 0.25rem !important;
}

@media only screen and (min-device-width: 678px) {
    .gallery {
        margin: 0 3rem !important;
    }
}
</style>