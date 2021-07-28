<template>
  <div id="app">
      <button @click="getInfo">get info!</button>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      api_id: 24645
    }
  },
  methods: {
    getInfo() {
      fetch(this.$api_url + "artworks/" + this.api_id)
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
