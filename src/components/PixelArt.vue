<template>
  <div id="pixelart" class="container columns">
    <div class="column is-three-quarters">
      <p v-if="loading">loading...</p>
      <div v-else class="img-comp-container">
        <div class="img-comp-img">
          <img :src="image" id="pixelitimg"/>
        </div>
        <div class="img-comp-img">
          <canvas id="pixelitcanvas"></canvas>
        </div>
      </div>
    </div>
    <div class="container">
      <PixelArtOptions
        @updatedPixelSize="updatePixelSize"
      /> 
      <!---<b-button @click="getImage">get image!</b-button>-->
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
      image: null,
      isPixelated: false,
      pixelArtOptions: {
        maxHeight: null,
        maxWidth: null,
        scale: 50
      }
    }
  },
  created: function() {
      this.getImage();
  },
  methods: {
    updatePixelSize(pixelSize) {
      this.pixelArtOptions.scale = pixelSize;
      if (this.isPixelated) {
        const px = new pixelit(this.pixelArtOptions);
        px.draw().pixelate().resizeImage();
      }
    },
    setCanvasSize() {
      this.pixelArtOptions.maxWidth = document.getElementById("pixelitimg").width;
      this.pixelArtOptions.maxHeight = document.getElementById("pixelitimg").height;
    },
    getImage() {
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
      this.setCanvasSize();
      /*let img = document.getElementById("pixelitimg");
      console.log('height: ' + img.height, 'width: ' + img.width)*/
      const px = new pixelit(this.pixelArtOptions);
      px.draw().pixelate().resizeImage();
      this.isPixelated = true;
    }
  }
}
</script>

<style>
.button:focus, .button.is-focused {
  border-color: #000;
}

/* Image Comparison Slider */
.img-comp-container {
  position: relative;
  height: 578px;
}

.img-comp-img {
  position: absolute;
  width: auto;
  height: auto;
  overflow: hidden;
}

.img-comp-img img,
.img-comp-img canvas {
  display: block;
}
</style>
