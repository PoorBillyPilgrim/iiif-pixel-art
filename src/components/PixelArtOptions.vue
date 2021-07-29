<template>
    <div id="pixelartoptions">
        <section>
            <b-field label="pixel size">
                <b-slider
                    @dragend="updatePixelSize"
                    v-model="pixelSize"
                    :max="50"
                ></b-slider>
            </b-field>
        </section>
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
        }
    }
}

</script>

<style>
</style>