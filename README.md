<h1 align="center">Pixel Art Institute of Chicago</h1>
<p align="center">
<img src="https://github.com/PoorBillyPilgrim/iiif-pixel-art/blob/gt/src/assets/iiif-pixel-art.gif" alt="A pixelated version of the painting The Great Wave">
</p>

<p style="opacity: 0.7;" align="center">Seeing the collection through pixels
</p>

## About
The [International Image Interoperability Framework (IIIF)](https://iiif.io) is a growing standard in cultural heritage organizations for delivering high-quality digital content. In providing a consistent and efficient method for sharing images online, IIIF provides organizations a robust method for sharing their digital collections. A benefit of IIIF is its flexibiility which lends itself to more creative kinds of uses. With the help of image viewers like [OpenSeadragon](https://openseadragon.github.io/), which this site utilizes, user can encounter unique viewing experiences.

The images provided are all in the public domain and made available through the Art Institute of Chicago's public API which uses IIIF to deliver its images.

This project fetches images from the Art Institute of Chicago using its public API, pixelates the image using [Pixel It](https://giventofly.github.io/pixelit/), and loads both the IIIF image and the pixelated image into the OpenSeadragon viewer.

## Acknowledgments
[OpenSeadragon](https://openseadragon.github.io/)  
[IIIF](https://iiif.io)  
[Pixel It](https://giventofly.github.io/pixelit/)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
