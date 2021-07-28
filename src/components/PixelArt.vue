<template>
  <div id="pixelart">
      <button @click="getInfo">get info!</button>
      <p v-if="loading">loading...</p>
      <div v-else>
        <img :src="image" id="pixelitimg"/>
        <button @click="pixelate">pixelate</button>
        <canvas id="pixelitcanvas"></canvas>
      </div>
  </div>
</template>
<script>
import pixelit from '../vendor/pixelit.js'

export default {
  name: 'PixelArt',
  components: {
    
  },
  data() {
    return {
      api_id: 24645,
      iiif_id: null,
      loading: true,
      image: null
    }
  },
  methods: {
    getInfo() {
      this.loading = true;
      fetch(this.$api_url + "artworks/" + this.api_id)
        .then(res => res.json())
        .then(data => {
          this.iiif_id = data.data.image_id;
          this.image = this.$iiif_url + this.iiif_id + this.$image_full_size;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    pixelate() {
      const px = new pixelit({scale: 50});
      px.draw().pixelate();
    }
  }
}
</script>

<style>

</style>
