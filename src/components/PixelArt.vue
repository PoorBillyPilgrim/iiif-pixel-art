<template>
  <div id="pixelart">
    <div>
      <PixelArtSearch 
        class="search block"
      />
      <Viewer 
        :infoJson="image.url"
      />
      <!--<p v-if="loading">loading...</p>
      <div v-else class="img-comp-container">
        <div class="img-comp-img">
          <canvas id="pixelitcanvas"></canvas>
        </div>
        <PixelArtSlider :loadSlider="loadSlider" />
        <div id="img-comp-overlay" class="img-comp-img">
          <img 
            id="pixelitimg"
            :src="image.url"
            @load="onLoad"
            crossOrigin="anonymous"
          />
        </div>
      </div>-->
    </div>
    <div class="pixelart-info columns">
      <PixelArtOptions
        class="box column"
        @updatedPixelSize="updatePixelSize"
        @download="download"
      /> 
      <PixelArtInfo 
        class="column"
        :imageInfo="image"
        :api_id="image.api_id"
      />
    </div>  
  </div>
</template>
<script>
// vendors
import pixelit from '../vendor/pixelit.js'
// components
import Viewer from '@/components/Viewer.vue'
import PixelArtInfo from '@/components/PixelArtInfo.vue'
import PixelArtOptions from '@/components/PixelArtOptions.vue'
//import PixelArtSlider from '@/components/PixelArtSlider.vue'
import PixelArtSearch from '@/components/PixelArtSearch.vue'

export default {
  name: 'PixelArt',
  components: {
    Viewer,
    PixelArtInfo,
    PixelArtOptions,
    //PixelArtSlider,
    PixelArtSearch
  },
  data() {
    return {
      loading: true,
      loadSlider: false,
      image: {
        api_id: 24645,
        iiif_id: null,
        url: null,
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
  mounted: function() {
    this.$root.$on('gallery-click', image => {
      this.loadSlider = false;
      this.image.api_id = image.data.id;
      this.getImage();
      //this.pixelate();
    })
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
      fetch(this.$api_url + "artworks/" + this.image.api_id)
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
      this.image.artist = data.artist_title;
      this.image.title = data.title;
      this.image.origin = data.place_of_origin;
    },
    setImageInfo(data) {
      this.image.iiif_id = data.image_id;
      //this.image.url = this.$iiif_url + this.image.iiif_id + this.$image_full_size;
      this.image.url = this.$iiif_url + this.image.iiif_id +'/info.json'
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
    margin-top: 15px !important;
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
    width: auto;
    max-width: 843px;
  }
}

</style>
