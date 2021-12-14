<template>
    <div id="container">
        <div id="openseadragon">
            <div id="line" style="height: 100%; width: 1px; position: absolute; left: 50%; background-color: blue"></div>
        </div>
        <div id="slider" style="width: 40px; height: 40px; background-color: black; border-radius: 50%; margin-left: -20px; margin-top: -20px"></div>
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
            },
            middle: null,
            fixedMiddle: null,
            clip: null,
            rox: null,
            slider: null
        }
    },
    mounted() {
        this.initViewer()
        
        this.viewer.addHandler('open', (viewer) => {
            this.pixelateTiledImage(viewer)
        })

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
        },
        pixelateTiledImage(viewer) {
    
            this.tiledImage = this.viewer.world.getItemAt(0)

            this.pixelitCanvas.id = 'pixelitcanvas'

            viewer.eventSource.addOverlay({
                element: this.pixelitCanvas,
                location: this.tiledImage.getBounds()
            })
            this.pixelitCanvas.style.zIndex = '-1'

            viewer.eventSource.addOverlay({
                element: document.getElementById('slider'),
                location: viewer.eventSource.viewport.getCenter()
            })

            new OpenSeadragon.MouseTracker({
                element: document.getElementById('slider'),
                dragHandler: (e) => {
                    // drag the overlay
                    var overlay = this.viewer.getOverlayById('slider')
                    var delta = this.viewer.viewport.deltaPointsFromPixels(e.delta)
                    overlay.update({ location: overlay.location.plus(delta) })
                    overlay.drawHTML(this.viewer.overlaysContainer, this.viewer.viewport )
                    console.log('x: ', overlay.location.x)

                    
                    this.updateClip(overlay.location.x)

                }
            })

            this.rox = this.tiledImage.viewportToImageCoordinates(0.5).x
            this.initClip()


            this.pixelate()

        },
        pixelate() {
            this.pixelImage = new pixelit(this.pixelArtOptions)
            this.pixelImage.draw().pixelate().hideFromImg()
            this.isPixelated = true
        },
        initClip() {
            this.clip = new OpenSeadragon.Rect(0,0,0,0)
            this.clip.height = this.tiledImage.getContentSize().y
            this.clip.x = this.rox
            this.clip.width = this.tiledImage.getContentSize().x - this.rox
            this.tiledImage.setClip(this.clip)
        },
        updateClip(rox) {
            
            this.rox = this.tiledImage.viewportToImageCoordinates(rox).x
            this.clip.x = this.rox
            this.clip.width = this.tiledImage.getContentSize().x - this.rox
            console.log(this.rox)
            this.tiledImage.setClip(this.clip)
            /*this.viewer.addHandler('animation', () => {
                this.tiledImage.setClip(new OpenSeadragon.Rect(0,0,0,0))
            })*/
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
        position: relative;
    }

    .openseadragon-canvas:focus {
        outline: none;
    }

    .overlay {
        background-color: blue;
    }

    .slider {
        background-color: #000;
        width: 1px;
        height: 100%;
    }

    #pixelitcanvas {
        z-index: -1;
    }

    @media only screen and (min-device-width: 1024px) {
        #openseadragon {
            height: 600px;
        }
    }
</style>