<template>
    <div id="about">
        <p>This is a test, dawg</p>
    </div>
</template>
<script>
export default {
    name: 'About'
}
</script>

<style scoped>
#about {
    margin: auto;
    width: 300px;
}

@media only screen and (min-device-width: 678px) {
  #about {
    width: 800px;
  }
}
</style>