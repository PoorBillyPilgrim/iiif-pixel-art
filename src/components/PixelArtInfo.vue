<template>
    <div class="box">
        <h3 class="title is-4 is-spaced">{{imageInfo.title}}</h3>
        <p class="subtitle is-6">{{imageInfo.artist}}, {{imageInfo.origin}}</p>
        <a :href="url" target="_blank">View at the Art Institute's website</a>
    </div>
</template>

<script>
export default {
    name: 'PixelArtInfo',
    props: {
        imageInfo: Object,
        api_id: Number
    },
    computed: {
        url: function () {
            return this.$aic_website + this.api_id;
        }
    }
}
</script>

<style></style>