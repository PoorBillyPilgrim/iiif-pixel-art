<template>
    <div id="pixelartoptions" class="has-text-left">
        <section>
            <b-field label="Pixel Size">
                <b-slider
                    @input="updatePixelSize"
                    v-model="pixelSize"
                    :max="50"
                    :min="10"
                    type="is-dark"
                ></b-slider>
            </b-field>
        </section>
        <b-button  
            icon-right="download"
            @click="download">
            download
        </b-button>
    </div>
</template>

<script>
export default {
    name: 'PixelArtOptions',
    data() {
        return {
            pixelSize: 25
        }
    },
    methods: {
        updatePixelSize() {
            this.$root.$emit('updatedPixelSize', this.pixelSize)
        },
        download() {
            this.$root.$emit('download', event)
        }
    }
}
</script>

<style>

</style>