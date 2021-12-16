<template>
  <div id="pixelart">
    <div>
      <PixelArtSearch 
        class="search block"
      />
      <div class="columns">
        <Viewer 
          class="column"
          :urls="urls"
        />
        <div class="pixelart-info is-flex-tablet column is-3">
          <PixelArtOptions
            class="options"
            @download="download"
          /> 
          <PixelArtInfo
            class="info"
            :imageInfo="image"
            :api_id="image.api_id"
          />

        </div>
      </div>
    </div> 
  </div>
</template>
<script>
import Viewer from '@/components/Viewer.vue'
import PixelArtInfo from '@/components/PixelArtInfo.vue'
import PixelArtOptions from '@/components/PixelArtOptions.vue'
import PixelArtSearch from '@/components/PixelArtSearch.vue'

export default {
  name: 'PixelArt',
  components: {
    Viewer,
    PixelArtInfo,
    PixelArtOptions,
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
      this.getImage()
      window.addEventListener('resize', this.pixelate)
  },
  mounted: function() {
    // change image in viewer based on gallery or search selection
    this.$root.$on('gallery-click', image => this.changeViewerImage(image))
    this.$root.$on('search-select', option => this.changeViewerImage(option))
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
      if (event) this.pixelImage.saveImage()
    },
    setCanvasSize() {
      this.pixelArtOptions.maxWidth = document.getElementById('pixelitimg').width
      this.pixelArtOptions.maxHeight = document.getElementById('pixelitimg').height
    },
    getImage() {
      this.loading = true
      fetch(this.$api_url + 'artworks/' + this.image.api_id, { 
        headers: { 
          'AIC-User-Agent': 'iiif-pixel-art (tjjones93@gmail.com)'
          } 
        })
        .then(res => res.json())
        .then(data => {
          this.setArtistInfo(data.data)
          this.setImageInfo(data.data)
        })
        .finally(() => {
          this.loading = false
        })
        .catch(err => console.error(err))
    },
    setArtistInfo(data) {
      this.image.artist = data.artist_title
      this.image.title = data.title
      this.image.origin = data.place_of_origin
    },
    setImageInfo(data) {
      this.image.iiif_id = data.image_id
      this.image.iiif_url = this.$iiif_url + this.image.iiif_id + this.$image_full_size
      this.image.url = this.$iiif_url + this.image.iiif_id +'/info.json'
    },
    changeViewerImage(image) {
      this.loadSlider = false
      this.image.api_id = image.data.id
      this.getImage()
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
  margin-top: 0 !important;
}

.options {
  margin-bottom: 1rem;
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
    display: flex;
    flex-direction: column;
  }

  .info {
    margin-top: auto;
  }

  .search {
    width: inherit;
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
