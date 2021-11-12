<template>
    <div id="container">
        <div id="openseadragon"></div>
        <b-button @click="pixelate">pixelate</b-button>
    </div>
</template>
<script>
// vendors
import OpenSeadragon from 'openseadragon'
import pixelit from '../vendor/pixelit.js'


export default {
    name: 'Viewer',
    props: {
        infoJson: String,
        iiif_url: String
    },
    data() {
        return {
            id: null,
            viewer: null,
            tiledImage: null,
            //overlays: [],
            img: new Image(),
            canvas: document.createElement('canvas'),
            tiles: [],
            pixelImage: null,
            isPixelated: false,
            pixelArtOptions: {
                maxHeight: null,
                maxWidth: null,
                scale: 50
            }
        }
    },
    mounted: function() {
        this.initViewer()
        //this.getImage()
        //console.log(this.iiif_url)
    },
    watch: {
        infoJson: {
            handler() {
                this.viewer.open({
                    tileSource: this.infoJson
                })
            },
            deep: true
        },
        iiif_url: {
            handler() {
                this.img.src = this.iiif_url
                this.img.id = 'pixelitimg'
                console.log(this.img)
            },
            deep: true
        }
    },
    methods: {
        initViewer() {
            this.viewer = OpenSeadragon({
                id: 'openseadragon',
                prefixUrl: '//openseadragon.github.io/openseadragon/images/',
                crossOriginPolicy: 'Anonymous',
                debugMode: true
            })
            this.addOverlay()
            
        },
        getImage() {
            //this.img.src = this.iiif_url
            console.log(this.iiif_url)
        },
        addOverlay() {
            this.viewer.addHandler('open', async () => {
                //this.img.src = 
                //this.img = this.iiif_url
                //let json = await response.json()
                console.log('hello')
                
                //console.log(this.api_id)
                /*this.tiledImage = this.viewer.world.getItemAt(0)
                let imgData
                this.tiledImage.addHandler('fully-loaded-change', () => {
                    imgData = viewer.eventSource.drawer.canvas.toDataURL('image/png')
                    this.img.src = imgData;
                })
                
                this.img.id = 'pixelitimg'
                this.img.className = 'overlay'
                this.img.style.backgroundColor = 'blue'
                this.img.style.opacity = '0.5'
                viewer.eventSource.addOverlay({
                    element: this.img,
                    location: viewer.eventSource.viewport.getBounds()
                })
                this.canvas.id = 'pixelitcanvas'
                viewer.eventSource.addOverlay({
                    element: this.canvas,
                    location: viewer.eventSource.viewport.getBounds()
                })*/
            })
        },
        pixelate() {
            this.pixelImage = new pixelit(this.pixelArtOptions);
            this.pixelImage.draw().pixelate().resizeImage().hideFromImg();
            this.isPixelated = true;
        }
    }
}
</script>
<style scoped>
    #openseadragon {
        height: 500px;
        width: 100%;
    }

    .openseadragon-canvas:focus {
        outline: none;
    }

    .overlay {
        background-color: blue;
    }
</style>