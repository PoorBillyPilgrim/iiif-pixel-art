<template>
  <div id="pixelart">
    <div>
      <PixelArtSearch 
        class="search block"
      />
      <Viewer 
        :urls="urls"
      />
    </div>
    <div class="pixelart-info columns">
      <PixelArtInfo 
        class="box column is-3"
        :imageInfo="image"
        :api_id="image.api_id"
      />
      <PixelArtOptions
        class="column is-3"
        @download="download"
      /> 
    </div>  
  </div>
</template>
<script>
// vendors
//import pixelit from '../vendor/pixelit.js'
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
        iiif_url: null,
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
    })
  },
  computed: {
    urls: function() {
      return { 
        iiif: this.image.iiif_url,
        infoJson: this.image.url
      }
    }
  },
  methods: {
    download(event) {
      if (event) this.pixelImage.saveImage();
    },
    setCanvasSize() {
      this.pixelArtOptions.maxWidth = document.getElementById("pixelitimg").width;
      this.pixelArtOptions.maxHeight = document.getElementById("pixelitimg").height;
    },
    getImage() {
      this.loading = true;
      //const headers = new Headers({ 'AIC-User-Agent': 'iiif-pixel-art (tjjones93@gmail.com)'});

      fetch(this.$api_url + "artworks/" + this.image.api_id, { 
        headers: { 
          'AIC-User-Agent': 'iiif-pixel-art (tjjones93@gmail.com)'
          } 
        })
        .then(res => res.json())
        .then(data => {
          this.setArtistInfo(data.data);
          this.setImageInfo(data.data);
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(err => console.error(err));
    },
    setArtistInfo(data) {
      this.image.artist = data.artist_title;
      this.image.title = data.title;
      this.image.origin = data.place_of_origin;
    },
    setImageInfo(data) {
      this.image.iiif_id = data.image_id;
      this.image.iiif_url = this.$iiif_url + this.image.iiif_id + this.$image_full_size;
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
