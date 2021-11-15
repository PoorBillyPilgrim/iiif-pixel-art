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
                @typing="getSearchResults"
                @select="option => selected = option">

                <template slot-scope="props">
                    <div class="media">
                        <div class="media-left">
                            <img width="32" src="https://bulma.io/images/placeholders/128x128.png">
                        </div>
                        <div class="media-content">
                            {{ props.option.title }}
                        </div>
                        <br>
                        <small>
                            {{ props.option.artist }}, {{ props.option.origin || "hello"}}
                        </small>
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
                isFetching: false
            }
        },
        methods: {
            getSearchResults: debounce(function (name) {
                if (!name.length) {
                    this.data = []
                    return
                }
                this.isFetching = true
                fetch(this.$api_url + "artworks/search?query[term][is_public_domain]=true&limit=10&page=1")
                    .then(res => res.json())
                    .then(json => {
                        this.data = []
                        json.data.forEach(item => this.data.push(item))
                    })
                    .catch(err => {
                        this.data = []
                        console.error(err)
                    })
                    .finally(() => this.isFetching = false)
            }, 500)
        }
    }
</script>

<style>
.input:focus {
    border-color: #000 !important;
    box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25) !important;
}
</style>