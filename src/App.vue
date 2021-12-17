<template>
  <div id="main">
    <NavBar class="mb-3"/>
    <router-view />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
:root {
  --primary: #2c3e50
}

.main {
  margin: auto 1rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary);
}

@media only screen and (min-device-width: 678px) {
  .main {
    margin: auto;
    max-width: 2000px;
  }
}
</style>
