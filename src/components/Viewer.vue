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
        infoJson: String
    },
    data() {
        return {
            viewer: null,
            canvas: null,
            img: (new Image()),
            tiledImage: null,
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
    },
    watch: {
        infoJson: {
            handler() {
                this.viewer.open({
                    tileSource: this.infoJson
                })
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
        addOverlay() {
            this.viewer.addHandler('open', (viewer) => {
                this.tiledImage = this.viewer.world.getItemAt(0)
                let croppedImage = new Image()
                this.tiledImage.addHandler('fully-loaded-change', () => {
                    /*this.img.src = viewer.eventSource.drawer.canvas.toDataURL('image/png')
                    let { height, width } = this.tiledImage.getBounds()
                    this.img.height = height
                    this.img.width = width*/
                    let viewportRect = viewer.eventSource.viewport.getBounds()
                    var rect = viewer.eventSource.viewport.viewportToViewerElementRectangle(viewportRect);
                    const { x, y, width, height } = rect
                    const { canvas } = viewer.eventSource.drawer;

                    this.img.onload = () => {
                        let croppedCanvas = document.createElement('canvas');
                        let ctx = croppedCanvas.getContext('2d');
                        croppedCanvas.width = width;
                        croppedCanvas.height = height;

                        const pixelDens = OpenSeadragon.pixelDensityRatio;
                        ctx.drawImage(this.img, x*pixelDens, y*pixelDens, width*pixelDens, height*pixelDens, 0, 0, width, height);
                        croppedImage.src = croppedCanvas.toDataURL(); 
                    }
                    this.img.src = canvas.toDataURL();
                })

        
                //this.canvas = document.createElement("canvas")
                //console.log(this.tiledImage)
                // test adding tags to overlay
                //this.canvas.id = 'pixelitcanvas'
                //this.canvas.className = 'overlay'
                //this.canvas.style.backgroundColor = 'blue'
                //this.canvas.style.opacity = '0.5'
                this.img.id = 'pixelitcanvas'
                this.img.className = 'overlay'
                this.img.style.backgroundColor = 'blue'
                this.img.style.opacity = '0.5'
                viewer.eventSource.addOverlay({
                    element: croppedImage,
                    location: this.tiledImage.getBounds()
                })
            })
        },
        pixelate() {
            //this.setCanvasSize();

            this.pixelImage = new pixelit(this.pixelArtOptions);
            this.pixelImage.draw().pixelate().resizeImage();
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