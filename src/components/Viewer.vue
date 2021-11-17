<template>
    <div id="container">
        <div id="openseadragon">
            <div id="line" style="height: 100%; width: 1px; position: absolute; left: 50%; background-color: blue"></div>
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
            middle: null
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
                this.pixelitCanvas.style.zIndex = "-1"
                //console.log(viewer.eventSource.getOverlayById(this.pixelitCanvas.id).getBounds(viewer.eventSource.viewport))
                /*let el = document.createElement('div')
                el.id = 'test'
                el.style.backgroundColor = 'blue'
                
                //let canvas = document.getElementById('pixelitcanvas')
                //let ctx = canvas.getContext('2d')
                //ctx.rect(0, 0, (canvas.style.width / 2), canvas.style.height)
                //ctx.clip()

                //let {height, width} = this.tiledImage.getBounds()
                let view = document.getElementById('openseadragon')
                let height = view.offsetHeight;
                let width = view.offsetWidth;
                this.middle = new OpenSeadragon.Point(width/2, height/2)
                viewer.eventSource.addOverlay({
                    element: el,
                    location: new OpenSeadragon.Point(0, 0),
                    checkResize: false,
                    width: width/2,
                    height: height
                })*/
                //let lox = viewer.eventSource.viewport.viewportToImageCoordinates(this.middle).x
                /*let rightRect = viewer.eventSource.viewport.getBounds()
                rightRect.x = 0.5
                rightRect.width = rightRect.width/2
                let el = document.createElement('div')
                el.id = 'test'
                el.style.backgroundColor = 'blue'
                viewer.eventSource.addOverlay({
                    element: el,
                    location: rightRect,
                    checkResize: false
                })*/
                //let leftRect = viewer.eventSource.viewport.imageToViewportRectangle(0, 0, this.middle.x, height)
                //leftRect.height = height
                //leftRect.width = width
                //leftRect.x = lox
                //console.log('with margins: ', viewer.eventSource.viewport.getBoundsWithMargins())
                console.log('image bounds: ', this.tiledImage.getBounds())
                //console.log('container size: ', viewer.eventSource.viewport.getContainerSize())
                console.log(this.tiledImage.getContentSize())
                //console.log(this.tiledImage.viewportToImageCoordinates(this.middle))
                //this.tiledImage.setClip(rightRect)
                let container = document.getElementById('openseadragon')
                let containerHeight = container.offsetHeight;
                let containerWidth = container.offsetWidth;
                this.middle = new OpenSeadragon.Point(containerWidth/2, containerHeight/2)
                let fixedMiddle = viewer.eventSource.viewport.viewerElementToViewportCoordinates(this.middle)
                console.log('fixedMid: ', fixedMiddle)
                console.log('center: ', viewer.eventSource.viewport.getCenter())
                let rox = this.tiledImage.viewportToImageCoordinates(0.5).x
                console.log(rox)
                let rightRect = new OpenSeadragon.Rect(0,0,0,0)
                rightRect.height = this.tiledImage.getContentSize().y
                rightRect.x = rox
                rightRect.width = this.tiledImage.getContentSize().x - rox
                this.tiledImage.setClip(rightRect)
                //console.log(''rox)
                console.log(rightRect)
                this.pixelate()
              
                
                
                
            })
        },
        pixelate() {
            this.pixelImage = new pixelit(this.pixelArtOptions)
            this.pixelImage.draw().pixelate().hideFromImg()
            this.isPixelated = true
        },
        createClip() {
            // reference notes
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