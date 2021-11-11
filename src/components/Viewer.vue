<template>
    <div>
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
                crossOriginPolicy: 'Anonymous'
            })
            this.addOverlay()
            
        },
        addOverlay() {
            this.viewer.addHandler('open', (viewer) => {
                this.tiledImage = this.viewer.world.getItemAt(0)
                this.canvas = document.createElement("canvas")
                // test adding tags to overlay
                this.canvas.id = 'pixelitcanvas'
                this.canvas.className = 'overlay'
                this.canvas.style.backgroundColor = 'blue'
                this.canvas.style.opacity = '0.5'
                viewer.eventSource.addOverlay({
                    element: this.canvas,
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