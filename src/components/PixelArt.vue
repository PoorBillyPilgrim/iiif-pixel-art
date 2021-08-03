<template>
  <div id="pixelart" class="columns">
    <div class="column is-two-thirds">
      <PixelArtSearch 
        class="search block"
      />
      <p v-if="loading">loading...</p>
      <div v-else class="img-comp-container">
        <div class="img-comp-img">
          <canvas id="pixelitcanvas"></canvas>
        </div>
        <PixelArtSlider :loadSlider="loadSlider" />
        <div id="img-comp-overlay" class="img-comp-img">
          <img 
            id="pixelitimg"
            :src="image"
            @load="onLoad"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
    <div class="pixelart-info column">
      <PixelArtInfo 
        :imageInfo="imageInfo"
        :api_id="api_id"
      />
      <PixelArtOptions
        class="box"
        @updatedPixelSize="updatePixelSize"
        @download="download"
      /> 
    </div>  
  </div>
</template>
<script>
import pixelit from '../vendor/pixelit.js'
import PixelArtInfo from '@/components/PixelArtInfo.vue'
import PixelArtOptions from '@/components/PixelArtOptions.vue'
import PixelArtSlider from '@/components/PixelArtSlider.vue'
import PixelArtSearch from '@/components/PixelArtSearch.vue'

export default {
  name: 'PixelArt',
  components: {
    PixelArtInfo,
    PixelArtOptions,
    PixelArtSlider,
    PixelArtSearch
  },
  data() {
    return {
      api_id: 24645,
      iiif_id: null,
      loading: true,
      loadSlider: false,
      image: null,
      imageInfo: {
        title: null,
        artist: null,
        origin: null
      },
      pixelImage: null,
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
      window.addEventListener('resize', this.pixelate)
  },
  methods: {
    updatePixelSize(pixelSize) {
      this.pixelArtOptions.scale = pixelSize;
      if (this.isPixelated) {
        this.pixelImage = new pixelit(this.pixelArtOptions);
        this.pixelImage.draw().pixelate().resizeImage();
      }
    },
    download(event) {
      if (event) this.pixelImage.saveImage();
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
          this.setArtistInfo(data.data);
          this.setImageInfo(data.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    pixelate() {
      this.setCanvasSize();
      /*let img = document.getElementById("pixelitimg");
      console.log('height: ' + img.height, 'width: ' + img.width)*/
      this.pixelImage = new pixelit(this.pixelArtOptions);
      this.pixelImage.draw().pixelate().resizeImage();
      this.isPixelated = true;
    },
    onLoad() {
      this.loadSlider = true;
      this.pixelate();
    },
    setArtistInfo(data) {
      this.imageInfo.artist = data.artist_title;
      this.imageInfo.title = data.title;
      this.imageInfo.origin = data.place_of_origin;
    },
    setImageInfo(data) {
      this.iiif_id = data.image_id;
      this.image = this.$iiif_url + this.iiif_id + this.$image_full_size;
    }
  }
}
</script>

<style>
:root {
  --w: 843px;
  --primary: #000;
}

#pixelart {
  margin: 0 0.25rem;
}

.pixelart-info {
  margin-top: 245px;
}

img {
  max-width: none !important;
}
/* Image Comparison Slider */
.img-comp-container {
  position: relative;
  height: auto;
}

.img-comp-img {
  position: absolute;
  width: auto;
  height: auto;
  overflow: hidden;
}

.img-comp-img img,
.img-comp-img canvas {
  height: auto;
  width: 350px;
  
  display: block;
}

@media only screen and (min-device-width: 678px) {
  #pixelart {
    margin: 0 3rem;
  }

  .pixelart-info {
    margin-top: auto;
  }
  
  .search {
    width: var(--w);
  }
  
  .img-comp-container {
    height: 578px;
  }

  .img-comp-img img,
  .img-comp-img canvas {
    height: 578px;
    width: var(--w);
  }
}

</style>
