<template>
    <section>
        <p class="has-text-left mb-1">Search the Collection</p>
        <b-field>
            <b-autocomplete
                placeholder="Search by keyword, artist, or reference"
                :data="data"
                field="title"
                :loading="isFetching"
                :check-infinite-scroll="true"
                @typing="getSearchResults"
                @select="handleSelect"
                @infinite-scroll="getNextPage">

                <template slot-scope="props">
                    <div class="media">
                        <div class="media-left">
                            <img width="65" :src="`${props.option.config.iiif_url}/${props.option.data.image_id}/full/400,/0/default.jpg`">
                        </div>
                        <div class="media-content">
                            {{ props.option.data.title || "title" }}
                            <br>
                            <small>
                                {{ props.option.data.artist_title || "name"}}, {{ props.option.data.place_of_origin || "origin"}}
                            </small>
                        </div>
                    </div>
                </template>
            </b-autocomplete>
        </b-field>
    </section>    
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  name: 'PixelArtSearch',
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      term: '',
      page: 1
    }
  },
  methods: {
    getSearchResults: debounce(async function (term) {
      // Search term updated
      if(this.term !== term) {
        this.term = term
        this.data = []
        this.page = 1
      }
      // Search bar cleared
      if (!term.length) {
        this.data = []
        this.page = 1
        return
      }
      this.isFetching = true
      try {
        let res = await fetch(`${this.$api_url}artworks/search?query[term][is_public_domain]=true&limit=10&page=${this.page}&q=${term}`, { headers: { 'AIC-User-Agent': 'iiif-pixel-art (tjjones93@gmail.com)' } })
        let { data } = await res.json()
        for (let i = 0; i < data.length; i++) {
          let res = await fetch(data[i].api_link)
          let artwork = await res.json()
          this.data.push(artwork)
        }
        this.page++
      } catch(err) {
        console.error(err)
      } finally {
        this.isFetching = false
      }
    }, 500),
    getNextPage: debounce(function() {
      this.getSearchResults(this.term)
    }, 250),
    handleSelect(option) { 
      this.$root.$emit('search-select', option)
    }
  }
}
</script>

<style>
.input:focus {
    border-color: #000 !important;
    box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25) !important;
}
</style>