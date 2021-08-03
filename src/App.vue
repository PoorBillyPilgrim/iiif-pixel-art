<template>
  <div id="app">
    <NavBar class="mb-3"/>
    <Hero class="block"/>
    <PixelArt/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Hero from '@/components/Hero.vue'
import PixelArt from '@/components/PixelArt.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Hero,
    PixelArt
  }
}
</script>

<style>
:root {
  --primary: #2c3e50
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary);
}
</style>
