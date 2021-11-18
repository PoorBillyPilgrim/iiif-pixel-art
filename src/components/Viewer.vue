<template>
    <div id="container">
        <div id="openseadragon">
            <div id="line" style="height: 100%; width: 1px; position: absolute; left: 50%; background-color: blue"></div>
            <div id="slider" style="width: 40px; height: 40px; border-radius: 50%; opacity: 0.5; background-color: black; position: absolute; top: 50%; left: 50%; margin-left: -20px; margin-top: 10px;"></div>
        </div>
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
            rox: null
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
            this.pixelitCanvas.style.zIndex = "-1"

            let container = document.getElementById('openseadragon')
            let containerHeight = container.offsetHeight;
            let containerWidth = container.offsetWidth;
            this.middle = new OpenSeadragon.Point(containerWidth/2, containerHeight/2)
            this.fixedMiddle = viewer.eventSource.viewport.viewerElementToViewportCoordinates(this.middle)

            console.log('fixedMid: ', this.fixedMiddle)
            console.log('center: ', viewer.eventSource.viewport.getCenter())
            console.log('center in image coordinates', viewer.eventSource.viewport.viewportToImageCoordinates(viewer.eventSource.viewport.getCenter()))

            this.rox = this.tiledImage.viewportToImageCoordinates(0.5).x
            console.log(this.rox)
            console.log('before clip: ', this.tiledImage.getBounds())
            this.initClip()
            console.log('margins: ', viewer.eventSource.viewport.getMargins())
            let leftMargin = viewer.eventSource.viewport.viewportToViewerElementCoordinates(new OpenSeadragon.Point(0.5, 0))
            console.log(leftMargin)
            let margin = {top: 0, right: 0, bottom: 0, left: 0}
            margin.left = leftMargin.x
            viewer.eventSource.viewport.setMargins({top: 0, right: 0, left: leftMargin.x, bottom: 0})
            /***** 
             * 
             * need to track top-right and/or bottom-left of tiledImage
             * I am able to get the corners of Rect()
             * 
             * 
            ****/
            console.log(viewer.eventSource.viewport.getContainerSize())
            /*viewer.eventSource.addHandler('animation', (e) => {
                margin.left += 0.5
                e.eventSource.viewport.setMargins(margin)
            })*/
            console.log(viewer.eventSource.viewport)
    
            console.log('clip: ', this.tiledImage.getClip())
            console.log(this.clip)
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
        updateClip() {
            this.viewer.addHandler('animation', () => {
                this.tiledImage.setClip(new OpenSeadragon.Rect(0,0,0,0))
            })
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

    #pixelitcanvas {
        z-index: -1;
    }

    @media only screen and (min-device-width: 1024px) {
        #openseadragon {
            height: 600px;
        }
    }
</style>