<template>
    <div id="about">
        <h1>About</h1>
        <p class="block">The <a href="https://iiif.io">International Interoperability Image Framework (IIIF)</a> is a growing standard in cultural heritage organizations for the delivery of high-quality digital content. In providing a consistent and efficient method for sharing images online, IIIF provides organizations an exciting way to share their digital collections. A benefit of IIIF is its flexibiility. IIIF lends itself to more creative kinds of uses, on which this site capitalizes.</p>
        <p class="block">The images provided are made available through the Art Institute of Chicago's public API which uses IIIF to deliver its images.</p>
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