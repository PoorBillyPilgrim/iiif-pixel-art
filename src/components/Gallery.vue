<template>
    <div class="gallery columns">
        <div class="column">
            <div class="">
                <h2 class="title">Gallery</h2>
                <h3 class="subtitle">Try a different image from the collection</h3>
                <div class="level">
                    <div class="level-left"></div>
                    <div class="level-right">
                        <b-button v-if="page > 1" @click="prev" class="level-item">previous</b-button>
                        <b-button @click="next" class="level-item">next</b-button>
                    </div>
                </div>
                <div v-if="isLoading" class="columns">
                    <div v-for="n in 5" :key="n" class="column">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                        <p>loading...</p>
                    </div>
                </div>
                <div v-else class="columns">
                    <div v-for="image in images" :key="image.data.id" class="column">
                        <figure class="image">
                            <img :src="thumbnail(image)" :alt="image.data.thumbnail.alt_text">
                        </figure>
                        <p>{{image.data.title}}</p>
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
            isLoading: true,
            page: 1,
            images: []
        }
    },
    created: function() {
        this.setGalleryImages();
    },
    methods: {
        async setGalleryImages() {
            let results = await this.getSearchResults(); 
            for (let i = 0; i < results.data.length; i++) {
                let res = await fetch(results.data[i].api_link);
                let artwork = await res.json();
                this.images.push(artwork);
            }
            this.isLoading = false;
        },
        async getSearchResults() {
            this.isLoading = true;
            let response = await fetch(this.$api_url + "artworks/search?query[term][is_public_domain]=true&limit=5&page=" + this.page);
            let results = await response.json();
            return results;
        },
        next() {
            this.page++;
            this.images = [];
            this.setGalleryImages();
        },
        prev() {
            if (this.page == 1) return;
            this.page--;
            this.images = [];
            this.setGalleryImages();
        },
        thumbnail(image) {
            return image.config.iiif_url + '/' + image.data.image_id + this.$image_thumbnail
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