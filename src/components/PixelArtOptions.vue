<template>
    <div id="pixelartoptions">
        <section>
            <b-field label="pixel size">
                <b-slider
                    :value="25"
                    :max="50"
                ></b-slider>
            </b-field>
        </section>
    </div>
</template>

<script>
export default {
    name: 'PixelArtOptions'
}
</script>

<style>
</style>