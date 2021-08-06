<template>
    <div id="pixelartoptions" class="has-text-left">
        <section>
            <b-field label="pixel size">
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
            this.$emit("updatedPixelSize", this.pixelSize);
        },
        download() {
            this.$emit("download", event)
        }
    }
}
</script>

<style>

</style>