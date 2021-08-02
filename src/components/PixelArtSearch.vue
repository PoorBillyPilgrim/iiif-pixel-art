<template>
    <section>
        <p class="has-text-left mb-1">The Art Institute of Chicago Collection</p>
        <b-field>
            <b-autocomplete
                placeholder="Search by keyword, artist, or reference"
            ></b-autocomplete>
        </b-field>
    </section>    
</template>

<script>
    export default {
        name: 'PixelArtSearch'
    }
</script>

<style>
.input:focus {
    border-color: #000 !important;
    box-shadow: 0 0 0 0.125em rgba(0, 0, 0, 0.25) !important;
}
</style>