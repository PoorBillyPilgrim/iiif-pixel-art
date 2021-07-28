<template>
  <div id="pixelart">
    <div class="container">
      <b-button @click="getInfo">get info!</b-button>
      <b-button @click="pixelate">pixelate</b-button>
    </div>
      <p v-if="loading">loading...</p>
      <div v-else>
        <img :src="image" id="pixelitimg"/>
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
.button:focus, .button.is-focused {
  border-color: #000;
}
</style>
