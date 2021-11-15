<template>
  <div id="app">
    <NavBar class="mb-3"/>
    <Hero class="block"/>
    <div class="main block">
      <PixelArt />
      <Gallery />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Hero from '@/components/Hero.vue'
import PixelArt from '@/components/PixelArt.vue'
import Gallery from '@/components/Gallery.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Hero,
    PixelArt,
    Gallery
  }
}
</script>

<style>
:root {
  --primary: #2c3e50
}

.main {
  margin: auto 2rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary);
}

@media only screen and (min-device-width: 678px) {
  .main {
    margin: auto 5rem;
  }
}
</style>
