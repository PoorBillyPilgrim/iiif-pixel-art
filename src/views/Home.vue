<template>
  <div class="main">
    <Hero class="block"/>
    <div class="block">
      <PixelArt />
      <Gallery />
    </div>
  </div>
</template>
<script>
import Hero from '@/components/Hero.vue'
import PixelArt from '@/components/PixelArt.vue'
import Gallery from '@/components/Gallery.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    PixelArt,
    Gallery
  }
}
</script>

<style>

</style>
