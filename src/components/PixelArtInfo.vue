<template>
    <div>
        <h3 class="title is-4">{{imageInfo.title}}</h3>
        <p class="subtitle is-6">{{imageInfo.artist}}</p>
        <p class="subtitle is-6">{{imageInfo.origin}}</p>
        <p class="subtitle is-6"><a :href="url" target="_blank">View Online</a></p>
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
      return this.$aic_website + this.api_id
    }
  }
}
</script>

<style scoped>
.subtitle {
    margin-top: -1.25rem;
}
</style>