<template>
    <div id="container">
        <div id="openseadragon"></div>
        <div id="slider"></div>
        <img id="pixelitimg" crossOrigin="Anonymous" :src="urls.iiif"/>
    </div>
</template>
<script>
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
            slider: document.getElementById('slider'),
            mouseTracker: null
        }
    },
    mounted() {
        
        // open viewer
        this.initViewer()
        this.viewer.addHandler('open', (viewer) => {
            this.slider = viewer.eventSource.getOverlayById('slider')
            this.slider.update({location: viewer.eventSource.viewport.getCenter()})
            this.pixelateTiledImage(viewer)
        })

        // change pixel size
        this.$root.$on('updatedPixelSize', pixelSize => {
            this.pixelArtOptions.scale = pixelSize
            if (this.isPixelated) {
                this.pixelImage = new pixelit(this.pixelArtOptions)
                this.pixelImage.draw().pixelate().resizeImage()
            }
        })

        this.$root.$on('download', () => {
            this.pixelImage.saveImage()
        })
    },
    watch: {
        urls: {
            handler() {
                document.getElementById('pixelitimg').onload = () => {
                    // destroy MouseTracker to reset drag speed for each image
                    if (this.mouseTracker != null) this.mouseTracker.destroy()
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
                crossOriginPolicy: 'Anonymous',
                visibilityRatio: -5, // disables image from bouncing back
                defaultZoomLevel: 0.75,
                overlays: [{
                    id: 'slider'
                }]
            })
        },
        pixelateTiledImage(viewer) {
            
            this.tiledImage = this.viewer.world.getItemAt(0)

            // add canvas on which pixelit draws pixelated image
            this.pixelitCanvas.id = 'pixelitcanvas'
            viewer.eventSource.addOverlay({
                element: this.pixelitCanvas,
                location: this.tiledImage.getBounds()
            })
            this.pixelitCanvas.style.zIndex = '-1'

            // create draggable overlay that clips image on drag
            this.mouseTracker = new OpenSeadragon.MouseTracker({
                element: document.getElementById('slider'),
                dragHandler: (e) => {
                    var overlay = this.viewer.getOverlayById('slider')
                    var delta = this.viewer.viewport.deltaPointsFromPixels(e.delta)
                    overlay.update({ location: overlay.location.plus(delta) })
                    overlay.drawHTML(this.viewer.overlaysContainer, this.viewer.viewport)
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
            this.tiledImage.setClip(this.clip)
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

    #slider {
        display: block !important;
        width: 50px; 
        height: 50px; 
        background-color: #363636;
        border: 4px solid #fff; 
        border-radius: 50%; 
        margin-left: -20px; 
        margin-top: -20px;
    }

    #pixelitcanvas {
        z-index: -1;
    }

    @media only screen and (min-device-width: 1024px) {
        #openseadragon {
            height: 800px;
        }
    }
</style>