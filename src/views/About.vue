<template>
    <div id="about" class="content">
        <h1>About</h1>
        <p class="block">
            The <a href="https://iiif.io" target="_blank">International Image Interoperability Framework (IIIF)</a> is a growing standard in cultural heritage organizations for delivering high-quality digital content. 
            In providing a consistent and efficient method for sharing images online, IIIF provides organizations a robust method for sharing their digital collections. 
            A benefit of IIIF is its flexibiility which lends itself to more creative kinds of uses. 
            With the help of image viewers like <a href="https://openseadragon.github.io/" target="_blank">OpenSeadragon</a>, which this site utilizes, user can encounter unique viewing experiences.
        </p>
        <p class="block">The images provided are all in the public domain and made available through the <a href="http://api.artic.edu/docs/" target="_blank">Art Institute of Chicago's public API</a> which uses IIIF to deliver its images.</p>
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