<template>
    <section>
        <p><b>Selected:</b></p>
        <p class="has-text-left mb-1">Search the Collection</p>
        <b-field>
            <b-autocomplete
                placeholder="Search by keyword, artist, or reference"
                :data="data"
                field="title"
                :loading="isFetching"
                :check-infinite-scroll="true"
                @typing="getSearchResults"
                @select="option => selected = option"
                @infinite-scroll="getNextPage">

                <template slot-scope="props">
                    <div class="media">
                        <div class="media-left">
                            <img width="32" src="https://bulma.io/images/placeholders/128x128.png">
                        </div>
                        <div class="media-content">
                            {{ props.option.title }}
                            <br>
                            <small>
                                {{ props.option.artist || "name"}}, {{ props.option.origin || "origin"}}
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
                    let json = await res.json()
                    json.data.forEach(item => this.data.push(item))
                    this.page++
                } catch(err) {
                    console.error(err)
                } finally {
                    this.isFetching = false
                }
            }, 500),
            getNextPage: debounce(function() {
                this.getSearchResults(this.term)
            }, 250)
        }
    }
</script>

<style>
.input:focus {
    border-color: #000 !important;
    box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25) !important;
}
</style>