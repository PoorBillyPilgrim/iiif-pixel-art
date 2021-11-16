<template>
    <div id="container">
        <div id="openseadragon"></div>
        <img id="pixelitimg" :src="urls.iiif"/>
    </div>
</template>
<script>
// vendors
import OpenSeadragon from 'openseadragon'
import pixelit from '../vendor/pixelit.js'


export default {
    name: 'Viewer',
    props: {
        urls: Object
    },
    data() {
        return {
            viewer: null,
            tiledImage: null,
            pixelitCanvas: document.createElement('canvas'),
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
    mounted() {
        this.initViewer()
        
        this.$root.$on('updatedPixelSize', pixelSize => {
            this.pixelArtOptions.scale = pixelSize
            if (this.isPixelated) {
                this.pixelImage = new pixelit(this.pixelArtOptions)
                this.pixelImage.draw().pixelate().resizeImage()
            }
        })
    },
    watch: {
        urls: {
            handler() {
                document.getElementById('pixelitimg').onload = () => {
                    this.viewer.open({
                        tileSource: this.urls.infoJson
                    })
                }
            },
            deep: true
        },

    },
    methods: {
        initViewer() {
            this.viewer = OpenSeadragon({
                id: 'openseadragon',
                prefixUrl: '//openseadragon.github.io/openseadragon/images/',
                crossOriginPolicy: 'Anonymous'
            })
            this.addOverlay()
            
        },
        addOverlay() {
            this.viewer.addHandler('open', async (viewer) => {
                this.tiledImage = this.viewer.world.getItemAt(0)

                this.pixelitCanvas.id = 'pixelitcanvas'

                viewer.eventSource.addOverlay({
                    element: this.pixelitCanvas,
                    location: this.tiledImage.getBounds()
                })
                //console.log(viewer.eventSource.getOverlayById(this.pixelitCanvas.id).getBounds(viewer.eventSource.viewport))
                let el = document.createElement('div')
                el.id = 'test'
                el.style.backgroundColor = 'blue'
                let {height, width} = this.tiledImage.getBounds()
                viewer.eventSource.addOverlay({
                    element: el,
                    location: new OpenSeadragon.Rect(0, 0, (width / 2), height)
                })
                
                this.pixelate()
            })
        },
        pixelate() {
            this.pixelImage = new pixelit(this.pixelArtOptions)
            this.pixelImage.draw().pixelate().hideFromImg()
            this.isPixelated = true
        }
    }
}
</script>
<style scoped>
    #pixelitimg {
        visibility: hidden;
    }

    #openseadragon {
        height: 500px;
        width: 100%;
        border: hsl(0, 0%, 86%) solid 1px;
        border-radius: 6px;
    }

    .openseadragon-canvas:focus {
        outline: none;
    }

    .overlay {
        background-color: blue;
    }

    @media only screen and (min-device-width: 1024px) {
        #openseadragon {
            height: 600px;
        }
    }
</style>