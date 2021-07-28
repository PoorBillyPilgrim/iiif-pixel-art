<template>
  <div id="pixelart" class="container columns">
    <div class="column is-three-quarters">
      <p v-if="loading">loading...</p>
      <div v-else>
        <img :src="image" id="pixelitimg"/>
        <canvas id="pixelitcanvas"></canvas>
      </div>
    </div>
    <div class="container">
      <PixelArtOptions/> 
      <b-button @click="getInfo">get info!</b-button>
      <b-button @click="pixelate">pixelate</b-button>
    </div>  
  </div>
</template>
<script>
import pixelit from '../vendor/pixelit.js'
import PixelArtOptions from '@/components/PixelArtOptions.vue'

export default {
  name: 'PixelArt',
  components: {
    PixelArtOptions
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
      let width = document.getElementById("pixelitimg").width;
      let height = document.getElementById("pixelitimg").height;
      let options = {
        maxHeight: height,
        maxWidth: width,
        scale: 50
      }
      console.log('height: ' + height, 'width: ' + width)
      const px = new pixelit(options);
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
