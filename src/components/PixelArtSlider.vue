<template>
    <div class="img-comp-slider">
    </div>    
</template>

<script>
export default {
    name: 'PixelArtSlider'
}
</script>

<style>
.img-comp-slider {
  position: absolute;
  z-index:9;
  cursor: ew-resize;
  /*set the appearance of the slider:*/
  width: 40px;
  height: 40px;
  background-color: #000;
  opacity: 0.7;
  border-radius: 50%;
}
</style>