<template>
  <div id="app">
      <button @click="getInfo">get info!</button>
      <p v-if="loading">loading...</p>
      <img v-else :src="image" />
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      api_id: 24645,
      iiif_id: null,
      loading: true,
      image: null
    }
  },
  methods: {
    getInfo() {
      this.loading = true;
      fetch(this.$api_url + "artworks/" + this.api_id)
        .then(res => res.json())
        .then(data => {
          this.iiif_id = data.data.image_id;
          this.image = this.$iiif_url + this.iiif_id + this.$image_full_size;
        })
        .finally(() => {
          this.loading = false;
          console.log(this.image);
        });
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
